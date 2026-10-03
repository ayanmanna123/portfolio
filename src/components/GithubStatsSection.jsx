import React, { useEffect, useState, useRef } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { useTheme } from "next-themes";
import { githubUsername } from "@/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubSpaceShooter } from "./GithubSpaceShooter";

gsap.registerPlugin(ScrollTrigger);

const GithubStatsSection = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [contributions, setContributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState("arcade");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = githubUsername || "ayanmanna123";
                // Fetch Contributions
                const contributionsRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`);
                const contributionsData = await contributionsRes.json();
                if (contributionsData.contributions) {
                    setContributions(contributionsData.contributions);
                }
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Theme colors
    const calendarTheme = {
        light: ['#ebedf0', '#ffd8b2', '#f9a878', '#ec844d', '#c2531d'],
        dark: ['#1f140d', '#4a2815', '#8a441e', '#ec844d', '#ffa07a'],
    };

    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            if (line1Ref.current) {
                gsap.fromTo(
                    line1Ref.current,
                    { y: 150, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.8,
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
                        duration: 1.8,
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
                        duration: 1.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 20%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-14 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5" id="github-stats">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-0 w-60 sm:w-72 h-60 sm:h-72 bg-[#EC844D]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
            </div>

            <div className="container mx-auto px-3 sm:px-6 relative z-10">

                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
                        <span ref={line1Ref} className="inline-flex items-center justify-center gap-2 sm:gap-3 text-foreground will-change-transform will-change-opacity">
                            <Github className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#EC844D] dark:text-[#FFAE80] inline-block" />
                            <span>GitHub</span>
                        </span>
                        <span
                            ref={line2Ref}
                            className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
                            style={{ fontFamily: "'Rakyat', cursive" }}
                        >
                            Activity & Contributions
                        </span>
                    </h2>
                    <p
                        ref={line3Ref}
                        className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
                    >
                        A snapshot of my open source contributions and commit activity.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:gap-12">

                    {/* Contribution Activity Showcase */}
                    <motion.div
                        className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-7 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        {/* Header with View Switcher */}
                        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-6">
                            <div>
                                <h3 className="text-base sm:text-xl font-semibold text-foreground">
                                    Contribution Activity
                                </h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    Interactive view of commit activity and retro arcade space defender
                                </p>
                            </div>

                            {/* View Mode Switcher */}
                            <div className="inline-flex items-center p-1 rounded-xl bg-muted/60 border border-border/40 text-xs font-medium self-start sm:self-auto">
                                <button
                                    onClick={() => setViewMode("arcade")}
                                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                                        viewMode === "arcade"
                                            ? "bg-background text-foreground shadow-sm font-semibold text-[#EC844D] dark:text-[#FFAE80]"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    Space Shooter
                                </button>
                                <button
                                    onClick={() => setViewMode("heatmap")}
                                    className={`px-3 py-1.5 rounded-lg transition-all duration-200 ${
                                        viewMode === "heatmap"
                                            ? "bg-background text-foreground shadow-sm font-semibold text-[#EC844D] dark:text-[#FFAE80]"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    Heatmap
                                </button>
                            </div>
                        </div>

                        {/* Content Based on View Mode */}
                        {viewMode === "arcade" ? (
                            <GithubSpaceShooter />
                        ) : (
                            <div className="w-full">

                                {loading ? (
                                    <div className="h-[140px] sm:h-[160px] w-full flex items-center justify-center text-muted-foreground animate-pulse text-sm">Loading contributions...</div>
                                ) : (
                                    <div className="w-full overflow-x-auto pb-2 pt-1 custom-scrollbar">
                                        <div className="min-w-[700px] flex justify-center py-2">
                                            <ActivityCalendar
                                                data={contributions}
                                                theme={calendarTheme}
                                                colorScheme={isDark ? "dark" : "light"}
                                                blockSize={13}
                                                blockMargin={4}
                                                fontSize={13}
                                                hideColorLegend={false}
                                                hideTotalCount={false}
                                                renderBlock={(block, activity) =>
                                                    React.cloneElement(block, {
                                                        "data-tooltip-id": "react-tooltip",
                                                        "data-tooltip-content": `${activity.count} activities on ${activity.date}`,
                                                    })
                                                }
                                            >
                                                <Tooltip id="react-tooltip" />
                                            </ActivityCalendar>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default GithubStatsSection;
