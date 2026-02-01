import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Code2, Trophy, Target, TrendingUp, Calendar as CalendarIcon } from "lucide-react";
import { leetcodeUsername } from "../data";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";

const LeetCodeStatsSection = () => {
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
                        const badgesRes = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/badges`);
                        if (badgesRes.ok) {
                            const badgesJson = await badgesRes.json();
                            if (badgesJson && badgesJson.badges) {
                                setStats(prev => ({ ...prev, badges: badgesJson.badges }));

                                // Save Badges to Cache
                                localStorage.setItem(BADGES_CACHE_KEY, JSON.stringify({
                                    badges: badgesJson.badges,
                                    timestamp: Date.now()
                                }));
                            }
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

    // LeetCode Green Theme for the graph
    const leetCodeTheme = {
        dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
    };

    return (
        <section className="py-20 relative z-10" id="leetcode-stats">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center gap-2 mb-4">
                        <Code2 className="w-8 h-8 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-yellow-600">
                            Problem Solving
                        </h2>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        My comprehensive problem-solving statistics and achievements on LeetCode.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                    {/* Main Stats Card */}
                    <motion.div
                        className="lg:col-span-2 bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-2xl shadow-xl"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                            {/* Circle Chart Area */}
                            <div className="relative w-48 h-48 flex items-center justify-center">
                                {loading ? (
                                    <div className="animate-pulse w-32 h-32 rounded-full bg-muted/20" />
                                ) : (
                                    <>
                                        <svg className="w-full h-full transform -rotate-90">
                                            <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-muted/20" />
                                            <circle
                                                cx="96"
                                                cy="96"
                                                r="80"
                                                stroke="currentColor"
                                                strokeWidth="8"
                                                fill="transparent"
                                                strokeDasharray={2 * Math.PI * 80}
                                                strokeDashoffset={2 * Math.PI * 80 * (1 - (stats?.totalSolved || 0) / (stats?.totalQuestions || 1))}
                                                className="text-primary transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-bold">{stats?.totalSolved || 0}</span>
                                            <span className="text-sm text-muted-foreground">Solved</span>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Details Grid */}
                            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {[
                                    { label: "Easy", count: stats?.easySolved || 0, total: stats?.totalEasy || 0, color: "Easy" },
                                    { label: "Medium", count: stats?.mediumSolved || 0, total: stats?.totalMedium || 0, color: "Medium" },
                                    { label: "Hard", count: stats?.hardSolved || 0, total: stats?.totalHard || 0, color: "Hard" }
                                ].map((item) => (
                                    <div key={item.label} className="flex flex-col p-4 rounded-xl bg-background/50 border border-border/30">
                                        <div className={`text-sm font-medium mb-2 ${difficultyColor[item.color]}`}>{item.label}</div>
                                        <div className="text-2xl font-bold mb-1">{loading ? "-" : item.count}</div>
                                        <div className="text-xs text-muted-foreground">/ {loading ? "-" : item.total}</div>
                                        {/* Progress Bar */}
                                        <div className="w-full h-1.5 bg-muted/30 rounded-full mt-3 overflow-hidden">
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
                        className="space-y-6"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        {/* Ranking Card */}
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                            <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Global Ranking</div>
                                <div className="text-2xl font-bold">{loading ? "Loading..." : `#${stats?.ranking?.toLocaleString() || "N/A"}`}</div>
                            </div>
                        </div>

                        {/* Acceptance Rate */}
                        <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-2xl shadow-xl flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Acceptance Rate</div>
                                <div className="text-2xl font-bold">{loading ? "Loading..." : `${stats?.acceptanceRate || 0}%`}</div>
                            </div>
                        </div>

                        {/* Profile Link */}
                        <a
                            href={`https://leetcode.com/${leetcodeUsername}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block group"
                        >
                            <div className="bg-card/50 backdrop-blur-sm border border-border/50 p-6 rounded-2xl shadow-xl flex items-center justify-between hover:border-primary/50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-500/10 rounded-xl text-orange-500">
                                        <Code2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">View Profile</div>
                                        <div className="font-semibold group-hover:text-primary transition-colors">LeetCode</div>
                                    </div>
                                </div>
                                <TrendingUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </a>
                    </motion.div>
                </div>

                {/* Badges Section */}
                {stats?.badges && stats.badges.length > 0 && (
                    <motion.div
                        className="mb-12 bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-2xl shadow-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-6">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <h3 className="text-xl font-semibold text-foreground">Badges</h3>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {stats.badges.map((badge, index) => (
                                <div key={index} className="flex flex-col items-center text-center group">
                                    <div className="w-20 h-20 mb-3 relative flex items-center justify-center transition-transform group-hover:scale-110 duration-300">
                                        <img
                                            src={badge.icon.startsWith("http") ? badge.icon : `https://leetcode.com${badge.icon}`}
                                            alt={badge.displayName}
                                            className="w-full h-full object-contain drop-shadow-lg"
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-foreground/90">{badge.displayName}</span>
                                    <span className="text-xs text-muted-foreground mt-1">{badge.creationDate}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Activity Calendar */}
                <motion.div
                    className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center overflow-x-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-2 self-start mb-6">
                        <CalendarIcon className="w-5 h-5 text-muted-foreground" />
                        <h3 className="text-xl font-semibold text-foreground">Submission Map</h3>
                    </div>
                    {loading ? (
                        <div className="h-[160px] w-full flex items-center justify-center text-muted-foreground animate-pulse">Loading activity...</div>
                    ) : (
                        <div className="w-full flex justify-center min-w-[800px]">
                            <ActivityCalendar
                                data={calendarData}
                                theme={leetCodeTheme}
                                colorScheme="dark"
                                blockSize={14}
                                blockMargin={4}
                                fontSize={14}
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
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default LeetCodeStatsSection;
