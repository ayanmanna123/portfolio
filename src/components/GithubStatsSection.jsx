import React, { useEffect, useState, useRef } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { githubUsername } from "@/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Fallback data in case API fails
const fallbackData = [
    {
        name: "React-Portfolio",
        description: "A modern, interactive portfolio website built with React and Three.js.",
        html_url: "https://github.com/ayanmanna123",
        stargazers_count: 12,
        forks_count: 4,
        language: "JavaScript"
    },
    {
        name: "E-Commerce-App",
        description: "Full-stack e-commerce solution using MERN stack.",
        html_url: "https://github.com/ayanmanna123",
        stargazers_count: 8,
        forks_count: 2,
        language: "TypeScript"
    },
    {
        name: "AI-Chat-Bot",
        description: "Intelligent chatbot powered by OpenAI API.",
        html_url: "https://github.com/ayanmanna123",
        stargazers_count: 25,
        forks_count: 5,
        language: "Python"
    }
];

const GithubStatsSection = () => {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";
    const [contributions, setContributions] = useState([]);
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

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

                // Fetch Repos
                const reposRes = await fetch(`https://api.github.com/users/${user}/repos?sort=updated&per_page=6`);
                const reposData = await reposRes.json();

                if (Array.isArray(reposData)) {
                    // Filter out forks if desired, or just take top 3 sorted by stars
                    const topRepos = reposData
                        .sort((a, b) => b.stargazers_count - a.stargazers_count)
                        .slice(0, 3);
                    setRepos(topRepos.length > 0 ? topRepos : fallbackData);
                } else {
                    setRepos(fallbackData);
                }

            } catch (error) {
                console.error("Error fetching GitHub data:", error);
                setRepos(fallbackData);
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
    const reposTitleRef = useRef(null);
    const cardsContainerRef = useRef(null);
    const cardRefs = useRef([]);

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

            // Featured Repositories Title
            if (reposTitleRef.current) {
                gsap.fromTo(
                    reposTitleRef.current,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.4,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: reposTitleRef.current,
                            start: "top 76%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Featured Repository Cards multi-directional entrance & visible reverse
            cardRefs.current.forEach((card, index) => {
                if (!card) return;

                let fromVars = { opacity: 0 };
                let duration = 1.4;
                let triggerStart = "top 68%";

                const colIndex = index % 3;
                if (colIndex === 0) {
                    // Left Column: Left to Right
                    fromVars = { x: -300, opacity: 0 };
                    duration = 2;
                    triggerStart = "top 120%";
                } else if (colIndex === 1) {
                    // Center Column: Bottom to Top
                    fromVars = { y: 200, opacity: 0 };
                    duration = 2;
                    triggerStart = "top 120%";
                } else {
                    // Right Column: Right to Left
                    fromVars = { x: 300, opacity: 0 };
                    duration = 2;
                    triggerStart = "top 100%";
                }

                gsap.fromTo(
                    card,
                    fromVars,
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: duration,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsContainerRef.current || card,
                            start: triggerStart,
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [repos]);

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
                        A snapshot of my open source contributions and active repositories.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:gap-12">

                    {/* Contribution Graph */}
                    <motion.div
                        className="bg-card/50 backdrop-blur-sm border border-border/50 p-4 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col items-center justify-center overflow-hidden"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        <div className="w-full flex items-center justify-between mb-4 sm:mb-6">
                            <h3 className="text-base sm:text-xl font-semibold text-foreground">Contribution Map</h3>
                            <span className="text-[10px] sm:text-xs text-muted-foreground md:hidden font-mono bg-muted/60 px-2 py-0.5 rounded-full">
                                ← Scroll to explore →
                            </span>
                        </div>
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
                    </motion.div>

                    {/* Top Repositories */}
                    <div className="space-y-6 sm:space-y-8 text-left">
                        <h3
                            ref={reposTitleRef}
                            className="text-xl sm:text-2xl font-bold text-center lg:text-left will-change-transform will-change-opacity"
                        >
                            Featured Repositories
                        </h3>

                        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {repos.map((repo, index) => (
                                <div
                                    key={repo.name}
                                    ref={(el) => (cardRefs.current[index] = el)}
                                    className="group relative bg-card/40 hover:bg-card/60 border border-border/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#EC844D]/40 hover:shadow-[#EC844D]/10 flex flex-col justify-between will-change-transform will-change-opacity"
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-3 sm:mb-4">
                                            <div className="p-2 bg-[#EC844D]/10 rounded-lg text-[#EC844D] group-hover:bg-[#EC844D] group-hover:text-white transition-colors duration-300">
                                                <GitFork className="w-4 h-4 sm:w-5 sm:h-5" />
                                            </div>
                                            <div className="flex items-center gap-1 text-muted-foreground text-xs sm:text-sm">
                                                <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                                                <span>{repo.stargazers_count}</span>
                                            </div>
                                        </div>

                                        <h4 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 group-hover:text-[#EC844D] dark:group-hover:text-[#FFAE80] transition-colors truncate">{repo.name}</h4>
                                        <p className="text-muted-foreground text-xs sm:text-sm mb-4 line-clamp-2 sm:line-clamp-3">
                                            {repo.description || "No description available."}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-border/30 mt-auto">
                                        <span className="text-[11px] sm:text-xs font-mono text-[#EC844D] dark:text-[#FFAE80] bg-[#EC844D]/10 border border-[#EC844D]/20 px-2 py-0.5 rounded">
                                            {repo.language || "Code"}
                                        </span>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs sm:text-sm font-medium hover:text-[#EC844D] dark:hover:text-[#FFAE80] transition-colors"
                                        >
                                            View <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GithubStatsSection;
