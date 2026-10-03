import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Trophy, Target, TrendingUp, Calendar as CalendarIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { leetcodeUsername } from "../data";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LeetCodeStatsSection = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [stats, setStats] = useState(null);
    const [calendarData, setCalendarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async () => {
            setLoading(true);

            // 1. Initialize Default/Fallback Calendar Data (Last 365 days empty)
            const today = new Date();
            const dateMap = new Map();
            for (let i = 0; i < 365; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dateString = date.toISOString().split('T')[0];
                dateMap.set(dateString, 0);
            }

            // Helper to format map to array
            const formatData = (map) => Array.from(map.entries()).map(([date, count]) => ({
                date,
                count,
                level: count === 0 ? 0 : Math.min(4, Math.ceil(count / 3))
            })).sort((a, b) => new Date(a.date) - new Date(b.date));

            // Set initial empty calendar
            setCalendarData(formatData(dateMap));

            const CACHE_KEY = "leetcode_data";
            const BADGES_CACHE_KEY = "leetcode_badges";
            const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

            try {
                // --- Check Cache for Stats & Calendar ---
                const cachedStats = localStorage.getItem(CACHE_KEY);
                let useCachedStats = false;

                if (cachedStats) {
                    const { data, timestamp } = JSON.parse(cachedStats);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        console.log("Using cached LeetCode stats");
                        setStats(prev => ({ ...prev, ...data.stats }));

                        // Process cached calendar
                        if (data.submissionCalendar) {
                            const submissionMap = data.submissionCalendar;
                            Object.keys(submissionMap).forEach(timestamp => {
                                const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
                                if (dateMap.has(date)) {
                                    dateMap.set(date, submissionMap[timestamp]);
                                }
                            });
                            setCalendarData(formatData(dateMap));
                        }
                        useCachedStats = true;
                    }
                }

                // If no valid cache, fetch from API
                if (!useCachedStats) {
                    try {
                        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`);
                        if (response.ok) {
                            const data = await response.json();

                            // Calculate Acceptance Rate
                            let acceptanceRate = 0;
                            if (data.matchedUserStats?.acSubmissionNum?.[0]?.count && data.matchedUserStats?.totalSubmissionNum?.[0]?.count) {
                                acceptanceRate = (data.matchedUserStats.acSubmissionNum[0].count / data.matchedUserStats.totalSubmissionNum[0].count * 100).toFixed(2);
                            }

                            const statsPayload = {
                                totalSolved: data.totalSolved,
                                totalQuestions: data.totalQuestions,
                                easySolved: data.easySolved,
                                totalEasy: data.totalEasy,
                                mediumSolved: data.mediumSolved,
                                totalMedium: data.totalMedium,
                                hardSolved: data.hardSolved,
                                totalHard: data.totalHard,
                                ranking: data.ranking,
                                acceptanceRate: acceptanceRate
                            };

                            setStats(prev => ({ ...prev, ...statsPayload }));

                            // Process Calendar Data
                            if (data.submissionCalendar) {
                                const submissionMap = data.submissionCalendar;
                                Object.keys(submissionMap).forEach(timestamp => {
                                    const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
                                    if (dateMap.has(date)) {
                                        dateMap.set(date, submissionMap[timestamp]);
                                    }
                                });
                                setCalendarData(formatData(dateMap));

                                // Save to Cache
                                localStorage.setItem(CACHE_KEY, JSON.stringify({
                                    data: { stats: statsPayload, submissionCalendar: submissionMap },
                                    timestamp: Date.now()
                                }));
                            }
                        }
                    } catch (e) {
                        console.warn("Failed to fetch LeetCode data:", e);
                    }
                }

                // --- Check Cache for Badges ---
                const cachedBadges = localStorage.getItem(BADGES_CACHE_KEY);
                let useCachedBadges = false;

                if (cachedBadges) {
                    const { badges, timestamp } = JSON.parse(cachedBadges);
                    if (Date.now() - timestamp < CACHE_DURATION) {
                        console.log("Using cached LeetCode badges");
                        setStats(prev => ({ ...prev, badges: badges }));
                        useCachedBadges = true;
                    }
                }

                if (!useCachedBadges) {
                    try {
                        const badgesQuery = `
                            query userBadges($username: String!) {
                                matchedUser(username: $username) {
                                    badges {
                                        id
                                        name
                                        shortName
                                        displayName
                                        icon
                                        creationDate
                                    }
                                }
                            }
                        `;

                        const response = await fetch('/leetcode-proxy/graphql', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                query: badgesQuery,
                                variables: { username: leetcodeUsername }
                            })
                        });

                        if (response.ok) {
                            const data = await response.json();
                            const badges = data?.data?.matchedUser?.badges || [];

                            setStats(prev => ({ ...prev, badges: badges }));

                            // Save Badges to Cache
                            localStorage.setItem(BADGES_CACHE_KEY, JSON.stringify({
                                badges: badges,
                                timestamp: Date.now()
                            }));
                        }
                    } catch (e) {
                        console.warn("Failed to fetch LeetCode badges:", e);
                    }
                }

            } catch (error) {
                console.error("Critical error in LeetCode section:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllData();
    }, []);

    const difficultyColor = {
        Easy: "text-emerald-400",
        Medium: "text-yellow-400",
        Hard: "text-rose-400"
    };

    const difficultyBg = {
        Easy: "bg-emerald-400/20",
        Medium: "bg-yellow-400/20",
        Hard: "bg-rose-400/20"
    };

    // LeetCode Orange Theme for the graph
    const leetCodeTheme = {
        light: ['#ebedf0', '#ffd8b2', '#f9a878', '#ec844d', '#c2531d'],
        dark: ['#1f140d', '#4a2815', '#8a441e', '#ec844d', '#ffa07a'],
    };

    const headerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);

    useEffect(() => {
        if (!headerRef.current) return;

        const ctx = gsap.context(() => {
            if (line1Ref.current) {
                gsap.fromTo(
                    line1Ref.current,
                    { y: 150, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 60%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (line2Ref.current) {
                gsap.fromTo(
                    line2Ref.current,
                    { y: 150, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 40%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (line3Ref.current) {
                gsap.fromTo(
                    line3Ref.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 20%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, headerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="py-14 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5" id="leetcode-stats">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-60 sm:w-72 h-60 sm:h-72 bg-[#EC844D]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
            </div>

            <div className="container mx-auto px-3 sm:px-6 relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
                        <span ref={line1Ref} className="inline-flex items-center justify-center gap-2 sm:gap-3 text-foreground will-change-transform will-change-opacity">
                            <Code2 className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#EC844D] dark:text-[#FFAE80] inline-block" />
                            <span>LeetCode</span>
                        </span>
                        <span
                            ref={line2Ref}
                            className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
                            style={{ fontFamily: "'Rakyat', cursive" }}
                        >
                            Problem Solving
                        </span>
                    </h2>
                    <p
                        ref={line3Ref}
                        className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
                    >
                        My comprehensive problem-solving statistics and achievements on LeetCode.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
                    {/* Main Stats Card */}
                    <motion.div
                        className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col justify-center"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 items-center justify-between">
                            {/* Circle Chart Area */}
                            <div className="relative w-36 h-36 sm:w-48 sm:h-48 flex items-center justify-center shrink-0">
                                {loading ? (
                                    <div className="animate-pulse w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-muted/20" />
                                ) : (
                                    <>
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="50%" cy="50%" r="42%" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                                            <circle
                                                cx="50%"
                                                cy="50%"
                                                r="42%"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={2 * Math.PI * 70}
                                                strokeDashoffset={2 * Math.PI * 70 * (1 - (stats?.totalSolved || 0) / (stats?.totalQuestions || 1))}
                                                className="text-primary transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-2xl sm:text-4xl font-bold">{stats?.totalSolved || 0}</span>
                                            <span className="text-xs sm:text-sm text-muted-foreground">Solved</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Details Grid */}
                            <div className="flex-1 w-full grid grid-cols-3 sm:grid-cols-3 gap-2 sm:gap-4 text-left">
                                {[
                                    { label: "Easy", count: stats?.easySolved || 0, total: stats?.totalEasy || 0, color: "Easy" },
                                    { label: "Medium", count: stats?.mediumSolved || 0, total: stats?.totalMedium || 0, color: "Medium" },
                                    { label: "Hard", count: stats?.hardSolved || 0, total: stats?.totalHard || 0, color: "Hard" }
                                ].map((item) => (
                                    <div key={item.label} className="flex flex-col p-2.5 sm:p-4 rounded-xl bg-background/50 border border-border/30">
                                        <div className={`text-xs sm:text-sm font-medium mb-1 sm:mb-2 ${difficultyColor[item.color]}`}>{item.label}</div>
                                        <div className="text-base sm:text-2xl font-bold mb-0.5">{loading ? "-" : item.count}</div>
                                        <div className="text-[10px] sm:text-xs text-muted-foreground">/ {loading ? "-" : item.total}</div>
                                        {/* Progress Bar */}
                                        <div className="w-full h-1 sm:h-1.5 bg-muted/30 rounded-full mt-2 sm:mt-3 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${difficultyBg[item.color].replace("bg-", "bg-opacity-100 bg-")}`}
                                                style={{ width: `${(item.count / (item.total || 1)) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Stats */}
                    <motion.div
                        className="space-y-3 sm:space-y-6"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: false }}
                    >
                        {/* Ranking Card */}
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-6 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 text-left">
                            <div className="p-2.5 sm:p-3 bg-yellow-500/10 rounded-xl text-yellow-500 shrink-0">
                                <Trophy className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <div className="text-xs sm:text-sm text-muted-foreground">Global Ranking</div>
                                <div className="text-lg sm:text-2xl font-bold">{loading ? "Loading..." : `#${stats?.ranking?.toLocaleString() || "N/A"}`}</div>
                            </div>
                        </div>

                        {/* Acceptance Rate */}
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-6 rounded-2xl shadow-xl flex items-center gap-3 sm:gap-4 text-left">
                            <div className="p-2.5 sm:p-3 bg-blue-500/10 rounded-xl text-blue-500 shrink-0">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div>
                                <div className="text-xs sm:text-sm text-muted-foreground">Acceptance Rate</div>
                                <div className="text-lg sm:text-2xl font-bold">{loading ? "Loading..." : `${stats?.acceptanceRate || 0}%`}</div>
                            </div>
                        </div>

                        {/* Profile Link */}
                        <a
                            href={`https://leetcode.com/${leetcodeUsername}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-6 rounded-2xl shadow-xl flex items-center justify-between hover:border-primary/50 transition-colors text-left">
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <div className="p-2.5 sm:p-3 bg-orange-500/10 rounded-xl text-orange-500 shrink-0">
                                        <Code2 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <div className="text-xs sm:text-sm text-muted-foreground">View Profile</div>
                                        <div className="text-sm sm:text-base font-semibold group-hover:text-primary transition-colors">LeetCode</div>
                                    </div>
                                </div>
                                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </a>
                    </motion.div>
                </div>

                {/* Badges Section */}
                {stats?.badges && stats.badges.length > 0 && (
                    <motion.div
                        className="mb-8 sm:mb-12 bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: false }}
                    >
                        <div className="flex items-center gap-2 mb-4 sm:mb-6">
                            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                            <h3 className="text-base sm:text-xl font-semibold text-foreground">Badges & Medals</h3>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-6">
                            {stats.badges.map((badge, index) => (
                                <div key={index} className="flex flex-col items-center text-center group p-2 rounded-xl hover:bg-background/40 transition-all">
                                    <div className="w-14 h-14 sm:w-20 sm:h-20 mb-2 sm:mb-3 relative flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                                        <img
                                            src={badge.icon.startsWith("http") ? badge.icon : `https://leetcode.com${badge.icon}`}
                                            alt={badge.displayName}
                                            className="w-full h-full object-contain drop-shadow-md"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium text-foreground/90 line-clamp-1">{badge.displayName}</span>
                                    <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5">{badge.creationDate}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Activity Calendar */}
                <motion.div
                    className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col items-center justify-center overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: false }}
                >
                    <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
                        <h3 className="text-base sm:text-xl font-semibold text-foreground">Submission Map</h3>
                        <span className="text-[10px] sm:text-xs text-muted-foreground md:hidden font-mono bg-muted/60 px-2 py-0.5 rounded-full">
                            ← Scroll to explore →
                        </span>
                    </div>
                    {loading ? (
                        <div className="h-[140px] sm:h-[160px] w-full flex items-center justify-center text-muted-foreground animate-pulse text-sm">Loading activity...</div>
                    ) : (
                        <div className="w-full overflow-x-auto pb-2 pt-1 custom-scrollbar">
                            <div className="min-w-[700px] flex justify-center py-2">
                                <ActivityCalendar
                                    data={calendarData}
                                    theme={leetCodeTheme}
                                    colorScheme={isDark ? "dark" : "light"}
                                    blockSize={13}
                                    blockMargin={4}
                                    fontSize={13}
                                    hideColorLegend={false}
                                    hideTotalCount={false}
                                    loading={loading}
                                    labels={{
                                        legend: {
                                            less: 'Less',
                                            more: 'More',
                                        },
                                        months: [
                                            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                                        ],
                                        totalCount: '{{count}} submissions in the last year',
                                    }}
                                    renderBlock={(block, activity) =>
                                        React.cloneElement(block, {
                                            "data-tooltip-id": "leetcode-tooltip",
                                            "data-tooltip-content": `${activity.count} submissions on ${activity.date}`,
                                        })
                                    }
                                >
                                    <Tooltip id="leetcode-tooltip" />
                                </ActivityCalendar>
                            </div>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default LeetCodeStatsSection;
