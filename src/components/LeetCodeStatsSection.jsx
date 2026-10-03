import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Trophy, Target, ArrowUpRight, Award, Calendar } from "lucide-react";
import { leetcodeUsername } from "../data";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// 4 Days Cache Duration: 4 * 24 * 60 * 60 * 1000 = 345,600,000 ms
const BADGES_CACHE_DURATION = 4 * 24 * 60 * 60 * 1000;
const BADGES_CACHE_KEY = "leetcode_badges_4days_cache";

export const LeetCodeStatsSection = () => {
    // Default fallback stats (zero hardcoded badges)
    const fallbackStats = {
        totalSolved: 710,
        totalQuestions: 3300,
        easySolved: 221,
        totalEasy: 968,
        mediumSolved: 375,
        totalMedium: 2122,
        hardSolved: 114,
        totalHard: 979,
        ranking: 95272,
        acceptanceRate: "98.75",
        badges: []
    };

    const [stats, setStats] = useState(fallbackStats);
    const [calendarData, setCalendarData] = useState(() => {
        const today = new Date();
        const list = [];
        for (let i = 364; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            list.push({
                date: date.toISOString().split("T")[0],
                count: 0,
                level: 0
            });
        }
        return list;
    });

    useEffect(() => {
        const fetchAllData = async () => {
            const today = new Date();
            const dateMap = new Map();
            for (let i = 0; i < 365; i++) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dateString = date.toISOString().split('T')[0];
                dateMap.set(dateString, 0);
            }

            const formatData = (map) => Array.from(map.entries()).map(([date, count]) => ({
                date,
                count,
                level: count === 0 ? 0 : Math.min(4, Math.ceil(count / 3))
            })).sort((a, b) => new Date(a.date) - new Date(b.date));

            const CACHE_KEY = "leetcode_data";
            const STATS_CACHE_DURATION = 24 * 60 * 60 * 1000; // 1 day for stats

            try {
                // 1. Fetch / Cache Stats & Submission Calendar
                const cachedStats = localStorage.getItem(CACHE_KEY);
                let useCachedStats = false;

                if (cachedStats) {
                    const { data, timestamp } = JSON.parse(cachedStats);
                    if (Date.now() - timestamp < STATS_CACHE_DURATION) {
                        setStats(prev => ({ ...prev, ...data.stats }));
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

                if (!useCachedStats) {
                    try {
                        const response = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${leetcodeUsername}`);
                        if (response.ok) {
                            const data = await response.json();

                            let acceptanceRate = "98.75";
                            if (data.matchedUserStats?.acSubmissionNum?.[0]?.count && data.matchedUserStats?.totalSubmissionNum?.[0]?.count) {
                                acceptanceRate = (data.matchedUserStats.acSubmissionNum[0].count / data.matchedUserStats.totalSubmissionNum[0].count * 100).toFixed(2);
                            }

                            const statsPayload = {
                                totalSolved: data.totalSolved || fallbackStats.totalSolved,
                                totalQuestions: data.totalQuestions || fallbackStats.totalQuestions,
                                easySolved: data.easySolved || fallbackStats.easySolved,
                                totalEasy: data.totalEasy || fallbackStats.totalEasy,
                                mediumSolved: data.mediumSolved || fallbackStats.mediumSolved,
                                totalMedium: data.totalMedium || fallbackStats.totalMedium,
                                hardSolved: data.hardSolved || fallbackStats.hardSolved,
                                totalHard: data.totalHard || fallbackStats.totalHard,
                                ranking: data.ranking || fallbackStats.ranking,
                                acceptanceRate: acceptanceRate
                            };

                            setStats(prev => ({ ...prev, ...statsPayload }));

                            if (data.submissionCalendar) {
                                const submissionMap = data.submissionCalendar;
                                Object.keys(submissionMap).forEach(timestamp => {
                                    const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
                                    if (dateMap.has(date)) {
                                        dateMap.set(date, submissionMap[timestamp]);
                                    }
                                });
                                setCalendarData(formatData(dateMap));

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

                // 2. Fetch / Cache Badges (Stored for exactly 4 days)
                const cachedBadges = localStorage.getItem(BADGES_CACHE_KEY);
                let useCachedBadges = false;

                if (cachedBadges) {
                    try {
                        const { badges, timestamp } = JSON.parse(cachedBadges);
                        // If within 4 days and valid badges array exists, use cache directly without calling API
                        if (Array.isArray(badges) && badges.length > 0 && Date.now() - timestamp < BADGES_CACHE_DURATION) {
                            setStats(prev => ({ ...prev, badges: badges }));
                            useCachedBadges = true;
                        }
                    } catch (e) {
                        // ignore corrupt cache
                    }
                }

                // Call API one time and store for 4 days; after 4 days call API again
                if (!useCachedBadges) {
                    let remoteBadges = [];

                    // Try 1: LeetCode GraphQL Proxy (configured in vite.config.js & vercel.json)
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
                        const res = await fetch('/leetcode-proxy/graphql', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                query: badgesQuery,
                                variables: { username: leetcodeUsername }
                            })
                        });
                        if (res.ok) {
                            const json = await res.json();
                            const list = json?.data?.matchedUser?.badges;
                            if (Array.isArray(list) && list.length > 0) {
                                remoteBadges = list;
                            }
                        }
                    } catch (e) {
                        // try fallback endpoint below
                    }

                    // Try 2: alfa-leetcode-api fallback
                    if (remoteBadges.length === 0) {
                        try {
                            const res = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/badges`);
                            if (res.ok) {
                                const data = await res.json();
                                if (Array.isArray(data?.badges) && data.badges.length > 0) {
                                    remoteBadges = data.badges;
                                }
                            }
                        } catch (e) {
                            console.warn("Could not fetch badges from remote:", e);
                        }
                    }

                    // If API returned badges, normalize icon URLs and cache for 4 days
                    if (remoteBadges.length > 0) {
                        const normalized = remoteBadges.map(b => ({
                            ...b,
                            icon: b.icon?.startsWith('http') ? b.icon : `https://leetcode.com${b.icon?.startsWith('/') ? '' : '/'}${b.icon}`
                        }));
                        setStats(prev => ({ ...prev, badges: normalized }));
                        localStorage.setItem(BADGES_CACHE_KEY, JSON.stringify({
                            badges: normalized,
                            timestamp: Date.now()
                        }));
                    }
                }
            } catch (error) {
                console.error("Critical error in LeetCode section:", error);
            }
        };

        fetchAllData();
    }, []);

    // Soft UI Rose/Clay Theme for the calendar
    const softUiCalendarTheme = {
        light: ['#e4e1d9', '#f7c8d3', '#f48fb1', '#f06292', '#e8527a'],
        dark: ['#e4e1d9', '#f7c8d3', '#f48fb1', '#f06292', '#e8527a'],
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
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (line2Ref.current) {
                gsap.fromTo(
                    line2Ref.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 65%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (line3Ref.current) {
                gsap.fromTo(
                    line3Ref.current,
                    { y: 30, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 55%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, headerRef);

        return () => ctx.revert();
    }, []);

    // Solved Ratio calculation for circle
    const totalSolved = stats?.totalSolved || 710;
    const totalQuestions = stats?.totalQuestions || 3300;
    const solvedRatio = Math.min(1, Math.max(0, totalSolved / (totalQuestions || 1)));
    
    // Circle radius & circumference matching SoftUiClock
    const radius = 54;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (solvedRatio * circumference * 0.75);

    return (
        <section
            className="py-16 sm:py-24 relative overflow-hidden bg-[#eae7e1] text-[#43413d] select-none transition-colors"
            id="leetcode-stats"
        >
            {/* Exact Neumorphic Soft UI Styles from SoftUiWidgets.jsx */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Quicksand:wght@500;600;700&family=Fredoka:wght@500;600;700&display=swap');
                    
                    .font-handwriting {
                        font-family: 'Gaegu', 'Quicksand', cursive, sans-serif;
                    }
                    .font-digital {
                        font-family: 'Fredoka', 'Quicksand', sans-serif;
                    }
                    .soft-ui-raised {
                        background: #eae7e1;
                        box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
                    }
                    .soft-ui-raised-card {
                        background: #eae7e1;
                        box-shadow: 12px 12px 24px #cfcbc2, -12px -12px 24px #ffffff;
                    }
                    .soft-ui-raised-hover:hover {
                        box-shadow: 14px 14px 28px #c8c4bb, -14px -14px 28px #ffffff;
                    }
                    .soft-ui-inset {
                        background: #e4e1d9;
                        box-shadow: inset 4px 4px 8px #cac5bb, inset -4px -4px 8px #ffffff;
                    }
                    .soft-ui-inset-subtle {
                        background: #e6e3dc;
                        box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
                    }
                `
            }} />

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                {/* Section Header: Styled like SoftUiGreeting */}
                <div ref={headerRef} className="text-center mb-12 sm:mb-16">
                    <div ref={line1Ref} className="inline-flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-[#43413d] tracking-tight">
                        <span className="text-[#e59845] font-mono font-bold text-2xl sm:text-3xl">&lt;/&gt;</span>
                        <span className="font-digital">LeetCode</span>
                    </div>

                    <h2
                        ref={line2Ref}
                        className="text-4xl sm:text-6xl md:text-7xl font-bold text-[#e59845] font-handwriting my-1 sm:my-2 tracking-wide"
                    >
                        Problem Solving
                    </h2>

                    <p
                        ref={line3Ref}
                        className="text-xs sm:text-sm text-[#78756e] font-medium font-handwriting max-w-xl mx-auto tracking-wide"
                    >
                        My comprehensive problem-solving statistics and achievements on LeetCode.
                    </p>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-10">
                    {/* Left Main Card: Solved Ring + 3 Difficulty Pods */}
                    <motion.div
                        className="lg:col-span-8 soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-center transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                            {/* Radial Solved Gauge (built like SoftUiClock) */}
                            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full flex items-center justify-center soft-ui-raised shrink-0">
                                <svg className="w-full h-full transform -rotate-135 p-2.5">
                                    {/* Background track circle */}
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke="#cdc8be"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={circumference * 0.25}
                                        strokeLinecap="round"
                                        className="opacity-70"
                                    />
                                    {/* Active filled arc (soft charcoal like clock hands) */}
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke="#484a4d"
                                        strokeWidth="9"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        className="transition-all duration-1000 ease-out"
                                    />
                                </svg>

                                {/* Center Pivot Accent Dot like SoftUiClock */}
                                <div className="absolute top-4 w-2.5 h-2.5 rounded-full bg-[#f06292] shadow-sm pointer-events-none" />

                                {/* Center Solved Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl sm:text-4xl font-black text-[#383a3d] font-digital tracking-tight">
                                        {stats.totalSolved}
                                    </span>
                                    <span className="text-xs font-semibold text-[#78756e] font-handwriting tracking-wide mt-0.5">
                                        Solved
                                    </span>
                                </div>
                            </div>

                            {/* 3 Difficulty Pods */}
                            <div className="flex-1 w-full grid grid-cols-3 gap-2.5 sm:gap-4">
                                {[
                                    {
                                        label: "Easy",
                                        count: stats.easySolved,
                                        total: stats.totalEasy,
                                        colorClass: "text-[#3b8a6a]",
                                        fillGradient: "from-[#34d399] to-[#10b981]",
                                    },
                                    {
                                        label: "Medium",
                                        count: stats.mediumSolved,
                                        total: stats.totalMedium,
                                        colorClass: "text-[#e59845]",
                                        fillGradient: "from-[#f59e0b] to-[#fbbf24]",
                                    },
                                    {
                                        label: "Hard",
                                        count: stats.hardSolved,
                                        total: stats.totalHard,
                                        colorClass: "text-[#f06292]",
                                        fillGradient: "from-[#e8527a] via-[#f06292] to-[#f48fb1]",
                                    },
                                ].map((item) => {
                                    const percent = Math.min(100, Math.round((item.count / (item.total || 1)) * 100));

                                    return (
                                        <div
                                            key={item.label}
                                            className="p-3 sm:p-4 rounded-[22px] soft-ui-inset-subtle flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className={`text-xs sm:text-sm font-bold ${item.colorClass} font-handwriting mb-1 sm:mb-2`}>
                                                    {item.label}
                                                </div>
                                                <div className="text-lg sm:text-2xl font-black text-[#383a3d] font-digital">
                                                    {item.count}
                                                </div>
                                                <div className="text-[10px] sm:text-xs font-semibold text-[#78756e] tracking-tight mt-0.5">
                                                    / {item.total}
                                                </div>
                                            </div>

                                            {/* Sunken Neumorphic Progress Groove (like SoftUiProgressBar) */}
                                            <div className="w-full h-2 sm:h-2.5 soft-ui-inset rounded-full mt-3 overflow-hidden p-0.5 bg-[#e5e2da]">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${percent}%` }}
                                                    transition={{ duration: 0.9, ease: "easeOut" }}
                                                    viewport={{ once: true }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${item.fillGradient} shadow-[0_1px_4px_rgba(240,98,146,0.3)]`}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: 3 Stacked Soft UI Cards */}
                    <div className="lg:col-span-4 flex flex-col justify-between gap-4 sm:gap-5">
                        {/* 1. Global Ranking */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true }}
                            className="soft-ui-raised soft-ui-raised-hover rounded-[26px] p-4 sm:p-5 flex items-center gap-4 transition-all duration-300"
                        >
                            <div className="w-13 h-13 rounded-[18px] soft-ui-inset flex items-center justify-center shrink-0 text-[#e59845] p-3">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-[11px] sm:text-xs font-bold text-[#78756e] font-handwriting tracking-wider uppercase">
                                    Global Ranking
                                </div>
                                <div className="text-xl sm:text-2xl font-black text-[#383a3d] font-digital tracking-tight mt-0.5">
                                    #{typeof stats.ranking === "number" ? stats.ranking.toLocaleString() : stats.ranking}
                                </div>
                            </div>
                        </motion.div>

                        {/* 2. Acceptance Rate */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true }}
                            className="soft-ui-raised soft-ui-raised-hover rounded-[26px] p-4 sm:p-5 flex items-center gap-4 transition-all duration-300"
                        >
                            <div className="w-13 h-13 rounded-[18px] soft-ui-inset flex items-center justify-center shrink-0 text-[#528cc7] p-3">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-[11px] sm:text-xs font-bold text-[#78756e] font-handwriting tracking-wider uppercase">
                                    Acceptance Rate
                                </div>
                                <div className="text-xl sm:text-2xl font-black text-[#383a3d] font-digital tracking-tight mt-0.5">
                                    {stats.acceptanceRate}%
                                </div>
                            </div>
                        </motion.div>

                        {/* 3. View Profile (Interactive Link) */}
                        <motion.a
                            href={`https://leetcode.com/${leetcodeUsername}/`}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            viewport={{ once: true }}
                            className="group soft-ui-raised soft-ui-raised-hover rounded-[26px] p-4 sm:p-5 flex items-center justify-between transition-all duration-300 active:scale-[0.98] cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-13 h-13 rounded-[18px] soft-ui-inset flex items-center justify-center shrink-0 text-[#e59845] p-3 group-hover:scale-105 transition-transform">
                                    <span className="font-mono font-black text-lg">&lt;/&gt;</span>
                                </div>
                                <div>
                                    <div className="text-[11px] sm:text-xs font-bold text-[#78756e] font-handwriting tracking-wider uppercase">
                                        View Profile
                                    </div>
                                    <div className="text-base sm:text-lg font-black text-[#383a3d] font-digital tracking-tight group-hover:text-[#e59845] transition-colors">
                                        LeetCode
                                    </div>
                                </div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-[#78756e] group-hover:text-[#e59845] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </motion.a>
                    </div>
                </div>

                {/* Badges Section */}
                {stats?.badges && stats.badges.length > 0 && (
                    <motion.div
                        className="mb-8 sm:mb-10 soft-ui-raised rounded-[32px] p-6 sm:p-7"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="w-4 h-4 text-[#e59845]" />
                            <h3 className="text-sm sm:text-base font-bold text-[#43413d] font-handwriting">
                                Badges & Achievements
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                            {stats.badges.map((badge, index) => {
                                const iconUrl = badge.icon?.startsWith("http")
                                    ? badge.icon
                                    : `https://leetcode.com${badge.icon?.startsWith("/") ? "" : "/"}${badge.icon}`;

                                return (
                                    <div
                                        key={badge.id || index}
                                        className="flex flex-col items-center text-center p-3.5 sm:p-4 rounded-[24px] soft-ui-raised bg-[#eae7e1] border border-[#dedad1] group hover:-translate-y-1 hover:shadow-md transition-all duration-300 select-none"
                                        title={badge.displayName || badge.name}
                                    >
                                        <div className="w-14 h-14 sm:w-16 sm:h-16 mb-2.5 rounded-2xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] p-2 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                                            <img
                                                src={iconUrl}
                                                alt={`LeetCode Badge: ${badge.displayName || badge.name}`}
                                                className="w-full h-full object-contain filter drop-shadow-sm"
                                                loading="lazy"
                                                decoding="async"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    if (e.currentTarget.parentElement) {
                                                        e.currentTarget.parentElement.innerHTML = '<span class="text-2xl select-none">🏅</span>';
                                                    }
                                                }}
                                            />
                                        </div>
                                        <span className="text-xs sm:text-sm font-bold text-[#383a3d] font-digital line-clamp-1 group-hover:text-[#e59845] transition-colors">
                                            {badge.displayName || badge.name}
                                        </span>
                                        <span className="text-[10px] text-[#78756e] font-handwriting mt-0.5">
                                            {badge.creationDate || "Achievement"}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* Submission Map (Activity Heatmap) */}
                <motion.div
                    className="soft-ui-raised rounded-[32px] p-6 sm:p-8 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-[#e59845]" />
                            <h3 className="text-sm sm:text-base font-bold text-[#43413d] font-handwriting">
                                Submission Map
                            </h3>
                        </div>
                        <span className="text-[10px] text-[#78756e] font-handwriting bg-[#e4e1d9] px-2.5 py-0.5 rounded-full md:hidden">
                            ← Scroll to explore →
                        </span>
                    </div>

                    <div className="w-full overflow-x-auto pb-1 pt-1 custom-scrollbar">
                        <div className="min-w-[700px] flex justify-center py-2 soft-ui-inset rounded-[22px] px-4">
                            {calendarData && calendarData.length > 0 ? (
                                <ActivityCalendar
                                    data={calendarData}
                                    theme={softUiCalendarTheme}
                                    colorScheme="light"
                                    blockSize={13}
                                    blockMargin={4}
                                    fontSize={12}
                                    hideColorLegend={false}
                                    hideTotalCount={false}
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
                            ) : (
                                <div className="h-24 flex items-center justify-center text-xs text-[#78756e] font-handwriting animate-pulse">
                                    Loading submission calendar...
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default LeetCodeStatsSection;
