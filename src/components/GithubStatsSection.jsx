import React, { useEffect, useState, useRef } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import { Github, Flame, Gamepad2, Calendar as CalendarIcon } from "lucide-react";
import { githubUsername } from "@/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GithubSpaceShooter } from "./GithubSpaceShooter";
import { fetchWithCache, getCachedData } from "@/lib/apiCache";

gsap.registerPlugin(ScrollTrigger);

const GithubStatsSection = () => {
    const user = githubUsername || "ayanmanna123";
    const cachedData = getCachedData(`gh_contributions_${user}`);

    const [contributions, setContributions] = useState(() => cachedData?.contributions || []);
    const [loading, setLoading] = useState(() => !cachedData?.contributions);
    const [viewMode, setViewMode] = useState("arcade");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const contributionsData = await fetchWithCache(
                    `https://github-contributions-api.jogruber.de/v4/${user}?y=last`,
                    {},
                    { key: `gh_contributions_${user}` }
                );
                if (contributionsData?.contributions) {
                    setContributions(contributionsData.contributions);
                }
            } catch (error) {
                console.error("Error fetching GitHub data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    // Soft UI Clay Calibrated Palette for Heatmap tiles
    const calendarTheme = {
        light: ['#dedad1', '#c7c2b6', '#e59845', '#cf7b2b', '#9e5015'],
        dark: ['#dedad1', '#c7c2b6', '#e59845', '#cf7b2b', '#9e5015'],
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
                    { y: 80, opacity: 0 },
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
                    { y: 80, opacity: 0 },
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
        }, sectionRef.current);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="py-16 sm:py-24 md:py-32 relative overflow-hidden bg-[#eae7e1] text-[#2d2b28]"
            id="github-stats"
        >
            {/* Exact Soft UI Styles from SoftUiWidgets.jsx */}
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
                    box-shadow: 6px 6px 14px #cfcbc2, -6px -6px 14px #ffffff;
                  }
                  .soft-ui-raised-card {
                    background: #eae7e1;
                    box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
                  }
                  .soft-ui-inset {
                    background: #e4e1d9;
                    box-shadow: inset 3px 3px 6px #cac5bb, inset -3px -3px 6px #ffffff;
                  }
                  .soft-ui-inset-subtle {
                    background: #e6e3dc;
                    box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
                  }
                `
            }} />

            {/* Ambient Soft Clay Inset Discs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-1/4 left-4 w-72 h-72 rounded-full soft-ui-inset-subtle opacity-35" />
                <div className="absolute bottom-1/4 right-4 w-80 h-80 rounded-full soft-ui-inset-subtle opacity-30" />
                <div className="absolute inset-0 opacity-25 bg-[linear-gradient(#dedad1_1px,transparent_1px),linear-gradient(90deg,#dedad1_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-16 px-2 sm:px-6">
                    {/* Pill Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-xs font-digital font-bold text-[#e59845] mb-4 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" />
                        <span>OPEN SOURCE & CODE COMMITS</span>
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                        <span ref={line1Ref} className="inline-flex items-center justify-center gap-3 text-[#2d2b28] font-digital will-change-transform will-change-opacity">
                            <span className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] inline-flex items-center justify-center text-[#5a5751] shadow-md">
                                <Github className="w-6 h-6 sm:w-7 sm:h-7 text-[#e59845]" />
                            </span>
                            <span>GitHub</span>
                        </span>
                        <span
                            ref={line2Ref}
                            className="block font-handwriting text-[#e59845] mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
                        >
                            Activity & Contributions
                        </span>
                    </h2>
                    <p
                        ref={line3Ref}
                        className="text-sm sm:text-base md:text-lg text-[#5a5751] font-mono max-w-2xl mx-auto leading-relaxed will-change-transform will-change-opacity mt-2"
                    >
                        A continuous snapshot of my open source commit activity and engineering cadence.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Soft UI Raised Contribution Showcase Card */}
                    <motion.div
                        className="soft-ui-raised-card bg-[#eae7e1] border border-[#dedad1] p-5 sm:p-8 rounded-3xl shadow-[10px_10px_22px_#cfcbc2,-10px_-10px_22px_#ffffff] flex flex-col overflow-hidden"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        {/* Header with View Switcher */}
                        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                            <div>
                                <h3 className="text-lg sm:text-xl font-bold font-digital text-[#2d2b28] flex items-center gap-2">
                                    <span>Contribution Activity</span>
                                    <span className="w-2 h-2 rounded-full bg-[#f06292]" />
                                </h3>
                                <p className="text-xs text-[#78756e] font-mono mt-0.5">
                                    Interactive commit heatmap and retro arcade space defender
                                </p>
                            </div>

                            {/* Tactile Soft UI View Mode Switcher */}
                            <div className="inline-flex items-center p-1.5 rounded-2xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] shadow-inner self-start sm:self-auto gap-1">
                                <button
                                    onClick={() => setViewMode("arcade")}
                                    className={`px-3.5 py-1.5 rounded-xl font-digital font-bold text-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                                        viewMode === "arcade"
                                            ? "soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#e59845] shadow-md"
                                            : "text-[#6d6a64] hover:text-[#2d2b28]"
                                    }`}
                                >
                                    <Gamepad2 className="w-3.5 h-3.5" />
                                    <span>Space Shooter</span>
                                </button>
                                <button
                                    onClick={() => setViewMode("heatmap")}
                                    className={`px-3.5 py-1.5 rounded-xl font-digital font-bold text-xs flex items-center gap-1.5 transition-all duration-200 cursor-pointer ${
                                        viewMode === "heatmap"
                                            ? "soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#e59845] shadow-md"
                                            : "text-[#6d6a64] hover:text-[#2d2b28]"
                                    }`}
                                >
                                    <CalendarIcon className="w-3.5 h-3.5" />
                                    <span>Heatmap</span>
                                </button>
                            </div>
                        </div>

                        {/* Debossed Inset Clay Display Window */}
                        <div className="w-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] rounded-2xl p-4 sm:p-6 shadow-[inset_3px_3px_6px_#cac5bb,inset_-3px_-3px_6px_#ffffff] min-h-[200px] flex items-center justify-center overflow-hidden">
                            {viewMode === "arcade" ? (
                                <GithubSpaceShooter />
                            ) : (
                                <div className="w-full">
                                    {loading ? (
                                        <div className="h-[140px] sm:h-[160px] w-full flex items-center justify-center text-[#78756e] font-digital animate-pulse text-sm">
                                            Loading contributions...
                                        </div>
                                    ) : (
                                        <div className="w-full overflow-x-auto pb-2 pt-1 custom-scrollbar">
                                            <div className="min-w-[700px] flex justify-center py-2">
                                                <ActivityCalendar
                                                    data={contributions}
                                                    theme={calendarTheme}
                                                    colorScheme="light"
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
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default GithubStatsSection;
