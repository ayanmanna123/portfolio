import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Code2, Trophy, Target, ArrowUpRight, TrendingUp, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { leetcodeUsername } from "../data";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const LeetCodeStatsSection = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    
    // Default fallback values matching the design screenshot
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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAllData = async () => {
            // 1. Initialize Default/Fallback Calendar Data (Last 365 days)
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

            setCalendarData(formatData(dateMap));

            const CACHE_KEY = "leetcode_data";
            const BADGES_CACHE_KEY = "leetcode_badges";
            const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

            try {
                // Check Cache for Stats & Calendar
                const cachedStats = localStorage.getItem(CACHE_KEY);
                let useCachedStats = false;

                if (cachedStats) {
                    const { data, timestamp } = JSON.parse(cachedStats);
                    if (Date.now() - timestamp < CACHE_DURATION) {
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

                // If no valid cache, fetch from API
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

                // Check Cache for Badges
                const cachedBadges = localStorage.getItem(BADGES_CACHE_KEY);
                let useCachedBadges = false;

                if (cachedBadges) {
                    const { badges, timestamp } = JSON.parse(cachedBadges);
                    if (Date.now() - timestamp < CACHE_DURATION) {
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
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                query: badgesQuery,
                                variables: { username: leetcodeUsername }
                            })
                        });

                        if (response.ok) {
                            const data = await response.json();
                            const badges = data?.data?.matchedUser?.badges || [];
                            setStats(prev => ({ ...prev, badges: badges }));
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
            }
        };

        fetchAllData();
    }, []);

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
                    { y: 60, opacity: 0 },
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
                    { y: 60, opacity: 0 },
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
                    { y: 40, opacity: 0 },
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
    
    // Circle radius & circumference
    const radius = 56;
    const circumference = 2 * Math.PI * radius;
    // We display an arc: strokeDasharray & strokeDashoffset
    const strokeDashoffset = circumference - (solvedRatio * circumference * 0.75); // 75% arc gauge

    return (
        <section
            className="py-16 sm:py-24 relative overflow-hidden bg-[#faf8f5] dark:bg-[#121316] text-[#2c2a26] dark:text-[#edebe6] transition-colors"
            id="leetcode-stats"
        >
            {/* Neumorphic Soft UI Styles Embedded */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    /* Light Mode Neumorphism */
                    .soft-card-raised {
                        background: #ffffff;
                        box-shadow: 14px 14px 30px #e1dcd3, -14px -14px 30px #ffffff;
                    }
                    .soft-card-subtle {
                        background: #ffffff;
                        box-shadow: 8px 8px 18px #e4dfd6, -8px -8px 18px #ffffff;
                    }
                    .soft-groove-inset {
                        background: #ede9e1;
                        box-shadow: inset 3px 3px 6px #d8d3c8, inset -3px -3px 6px #ffffff;
                    }
                    .soft-dial-raised {
                        background: #faf8f5;
                        box-shadow: 8px 8px 18px #dfdad0, -8px -8px 18px #ffffff;
                    }
                    .soft-icon-well {
                        box-shadow: inset 2px 2px 5px rgba(0,0,0,0.06), inset -2px -2px 5px rgba(255,255,255,0.9);
                    }

                    /* Dark Mode Neumorphism */
                    .dark .soft-card-raised {
                        background: #181920;
                        box-shadow: 12px 12px 28px #0d0e12, -12px -12px 28px #232530;
                    }
                    .dark .soft-card-subtle {
                        background: #181920;
                        box-shadow: 8px 8px 18px #0d0e12, -8px -8px 18px #232530;
                    }
                    .dark .soft-groove-inset {
                        background: #131418;
                        box-shadow: inset 3px 3px 6px #0b0b0e, inset -3px -3px 6px #1e2029;
                    }
                    .dark .soft-dial-raised {
                        background: #181920;
                        box-shadow: 6px 6px 16px #0d0e12, -6px -6px 16px #232530;
                    }
                    .dark .soft-icon-well {
                        box-shadow: inset 2px 2px 5px rgba(0,0,0,0.4), inset -2px -2px 5px rgba(255,255,255,0.05);
                    }
                `
            }} />

            {/* Subtle background ambient mesh */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                <div className="absolute top-1/4 -right-16 w-80 h-80 bg-[#f97316]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -left-16 w-96 h-96 bg-[#ea844d]/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808018_1px,transparent_1px),linear-gradient(to_bottom,#80808018_1px,transparent_1px)] bg-[size:48px_48px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-12 sm:mb-16">
                    <div ref={line1Ref} className="inline-flex items-center justify-center gap-2 text-2xl sm:text-3xl font-black text-[#2e2b26] dark:text-[#f4f2ee] tracking-tight">
                        <span className="text-[#f97316] font-mono font-bold text-2xl sm:text-3xl">&lt;/&gt;</span>
                        <span>LeetCode</span>
                    </div>

                    <h2
                        ref={line2Ref}
                        className="text-4xl sm:text-6xl md:text-7xl font-normal text-[#e68e54] font-handwriting my-2 sm:my-3 select-none tracking-wide"
                        style={{ fontFamily: "'Gaegu', 'Rakyat', cursive, sans-serif" }}
                    >
                        Problem Solving
                    </h2>

                    <p
                        ref={line3Ref}
                        className="text-xs sm:text-base text-[#757169] dark:text-[#9e9b93] font-medium max-w-xl mx-auto tracking-wide"
                    >
                        My comprehensive problem-solving statistics and achievements on LeetCode.
                    </p>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch mb-10">
                    {/* Left Main Card: Solved Ring + 3 Difficulty Cards */}
                    <motion.div
                        className="lg:col-span-8 soft-card-raised rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-center transition-all duration-300"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                            {/* Radial Solved Gauge */}
                            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full flex items-center justify-center soft-dial-raised shrink-0 select-none">
                                <svg className="w-full h-full transform -rotate-135 p-2">
                                    {/* Background track circle */}
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={circumference * 0.25}
                                        strokeLinecap="round"
                                        className="text-[#e8e4db] dark:text-[#252834]"
                                    />
                                    {/* Active filled arc */}
                                    <circle
                                        cx="50%"
                                        cy="50%"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="9"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        className="text-[#2b2d31] dark:text-[#f4f2ed] transition-all duration-1000 ease-out"
                                    />
                                </svg>

                                {/* Center Text */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-3xl sm:text-4xl font-black text-[#26282c] dark:text-[#ffffff] tracking-tight">
                                        {stats.totalSolved}
                                    </span>
                                    <span className="text-xs sm:text-sm font-semibold text-[#827d73] dark:text-[#99948a] mt-0.5">
                                        Solved
                                    </span>
                                </div>
                            </div>

                            {/* Difficulty Stats Mini Cards */}
                            <div className="flex-1 w-full grid grid-cols-3 gap-2.5 sm:gap-4 select-none">
                                {[
                                    {
                                        label: "Easy",
                                        count: stats.easySolved,
                                        total: stats.totalEasy,
                                        colorClass: "text-[#10b981]",
                                        fillGradient: "from-[#059669] to-[#10b981]",
                                        shadowGlow: "shadow-[0_1px_4px_rgba(16,185,129,0.3)]",
                                    },
                                    {
                                        label: "Medium",
                                        count: stats.mediumSolved,
                                        total: stats.totalMedium,
                                        colorClass: "text-[#f59e0b]",
                                        fillGradient: "from-[#d97706] to-[#fbbf24]",
                                        shadowGlow: "shadow-[0_1px_4px_rgba(245,158,11,0.3)]",
                                    },
                                    {
                                        label: "Hard",
                                        count: stats.hardSolved,
                                        total: stats.totalHard,
                                        colorClass: "text-[#f43f5e]",
                                        fillGradient: "from-[#e11d48] to-[#fb7185]",
                                        shadowGlow: "shadow-[0_1px_4px_rgba(244,63,94,0.3)]",
                                    },
                                ].map((item) => {
                                    const percent = Math.min(100, Math.round((item.count / (item.total || 1)) * 100));

                                    return (
                                        <div
                                            key={item.label}
                                            className="p-3 sm:p-4 rounded-2xl bg-[#faf8f5]/60 dark:bg-[#16171d]/60 border border-[#e8e4db]/60 dark:border-[#262834]/60 flex flex-col justify-between"
                                        >
                                            <div>
                                                <div className={`text-xs sm:text-sm font-bold ${item.colorClass} mb-1 sm:mb-2`}>
                                                    {item.label}
                                                </div>
                                                <div className="text-lg sm:text-2xl font-black text-[#2a2c30] dark:text-[#f4f2ee]">
                                                    {item.count}
                                                </div>
                                                <div className="text-[10px] sm:text-xs font-semibold text-[#8a857b] dark:text-[#88857f] mt-0.5">
                                                    / {item.total}
                                                </div>
                                            </div>

                                            {/* Sunken Neumorphic Progress Groove */}
                                            <div className="w-full h-1.5 sm:h-2 soft-groove-inset rounded-full mt-3 overflow-hidden p-0.5">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${percent}%` }}
                                                    transition={{ duration: 0.9, ease: "easeOut" }}
                                                    viewport={{ once: true }}
                                                    className={`h-full rounded-full bg-gradient-to-r ${item.fillGradient} ${item.shadowGlow}`}
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
                            className="soft-card-subtle rounded-2xl sm:rounded-[26px] p-4 sm:p-5 flex items-center gap-4 transition-all duration-300 hover:scale-[1.01]"
                        >
                            <div className="w-12 h-12 rounded-xl soft-icon-well bg-[#fffbeb] dark:bg-[#221c12] border border-[#fef3c7] dark:border-[#382b15] flex items-center justify-center shrink-0 text-[#f59e0b]">
                                <Trophy className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-[11px] sm:text-xs font-bold text-[#868177] dark:text-[#969288] tracking-wider uppercase">
                                    Global Ranking
                                </div>
                                <div className="text-xl sm:text-2xl font-black text-[#26282c] dark:text-[#f4f2ee] tracking-tight mt-0.5">
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
                            className="soft-card-subtle rounded-2xl sm:rounded-[26px] p-4 sm:p-5 flex items-center gap-4 transition-all duration-300 hover:scale-[1.01]"
                        >
                            <div className="w-12 h-12 rounded-xl soft-icon-well bg-[#eff6ff] dark:bg-[#121c29] border border-[#dbeafe] dark:border-[#1e3047] flex items-center justify-center shrink-0 text-[#3b82f6]">
                                <Target className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-[11px] sm:text-xs font-bold text-[#868177] dark:text-[#969288] tracking-wider uppercase">
                                    Acceptance Rate
                                </div>
                                <div className="text-xl sm:text-2xl font-black text-[#26282c] dark:text-[#f4f2ee] tracking-tight mt-0.5">
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
                            className="group soft-card-subtle rounded-2xl sm:rounded-[26px] p-4 sm:p-5 flex items-center justify-between transition-all duration-300 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl soft-icon-well bg-[#fff7ed] dark:bg-[#251910] border border-[#ffedd5] dark:border-[#422915] flex items-center justify-center shrink-0 text-[#f97316] group-hover:scale-105 transition-transform">
                                    <span className="font-mono font-bold text-lg">&lt;/&gt;</span>
                                </div>
                                <div>
                                    <div className="text-[11px] sm:text-xs font-bold text-[#868177] dark:text-[#969288] tracking-wider uppercase">
                                        View Profile
                                    </div>
                                    <div className="text-base sm:text-lg font-black text-[#26282c] dark:text-[#f4f2ee] tracking-tight group-hover:text-[#f97316] transition-colors">
                                        LeetCode
                                    </div>
                                </div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-[#868177] dark:text-[#969288] group-hover:text-[#f97316] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                        </motion.a>
                    </div>
                </div>

                {/* Badges Section (if present) */}
                {stats?.badges && stats.badges.length > 0 && (
                    <motion.div
                        className="mb-8 sm:mb-10 soft-card-subtle rounded-[28px] sm:rounded-[32px] p-5 sm:p-7"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <Trophy className="w-4 h-4 text-[#f59e0b]" />
                            <h3 className="text-sm sm:text-base font-bold text-[#2e2b26] dark:text-[#f4f2ee]">
                                Badges & Achievements
                            </h3>
                        </div>

                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
                            {stats.badges.map((badge, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center text-center p-3 rounded-2xl bg-[#faf8f5]/60 dark:bg-[#15161c]/60 border border-[#e8e4db]/50 dark:border-[#262834]/50 group hover:scale-105 transition-all"
                                >
                                    <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2 relative flex items-center justify-center drop-shadow-md">
                                        <img
                                            src={badge.icon.startsWith("http") ? badge.icon : `https://leetcode.com${badge.icon}`}
                                            alt={badge.displayName}
                                            className="w-full h-full object-contain"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="text-[11px] sm:text-xs font-bold text-[#35332f] dark:text-[#e4e1da] line-clamp-1">
                                        {badge.displayName}
                                    </span>
                                    <span className="text-[9px] sm:text-[10px] text-[#868177] dark:text-[#8a867c] mt-0.5">
                                        {badge.creationDate}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Submission Map (Activity Heatmap) */}
                <motion.div
                    className="soft-card-subtle rounded-[28px] sm:rounded-[32px] p-5 sm:p-7 overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm sm:text-base font-bold text-[#2e2b26] dark:text-[#f4f2ee]">
                            Submission Map
                        </h3>
                        <span className="text-[10px] text-[#868177] dark:text-[#8a867c] font-mono bg-[#eee9e0] dark:bg-[#20222b] px-2 py-0.5 rounded-full md:hidden">
                            ← Scroll to explore →
                        </span>
                    </div>

                    <div className="w-full overflow-x-auto pb-1 pt-1 custom-scrollbar">
                        <div className="min-w-[700px] flex justify-center py-2">
                            {calendarData && calendarData.length > 0 ? (
                                <ActivityCalendar
                                    data={calendarData}
                                    theme={leetCodeTheme}
                                    colorScheme={isDark ? "dark" : "light"}
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
                                <div className="h-24 flex items-center justify-center text-xs text-muted-foreground animate-pulse">
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
