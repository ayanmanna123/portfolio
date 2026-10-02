import React, { useEffect, useState } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import { Tooltip } from "react-tooltip";
import { motion } from "framer-motion";
import { Github, Star, GitFork, ExternalLink } from "lucide-react";
import { useTheme } from "next-themes";
import { githubUsername } from "@/data";

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

    return (
        <section className="py-20 relative z-10" id="github-stats">
            <div className="container mx-auto px-6">

                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: false }}
                >
                    <div className="flex flex-col items-center justify-center mb-4">
                        <div className="flex items-center gap-2 mb-2">
                            <Github className="w-7 h-7 text-[#EC844D] dark:text-[#FFAE80]" />
                            <span className="text-3xl md:text-4xl font-bold text-foreground">GitHub</span>
                        </div>
                        <span className="block font-rakyat text-4xl md:text-5xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent pb-2 sm:pb-3 font-normal" style={{ fontFamily: "'Rakyat', cursive" }}>
                            Activity & Contributions
                        </span>
                    </div>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        A snapshot of my open source contributions and active repositories.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">

                    {/* Contribution Graph */}
                    <motion.div
                        className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center overflow-x-auto"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        <h3 className="text-xl font-semibold mb-6 self-start text-foreground">Contribution Map</h3>
                        {loading ? (
                            <div className="h-[160px] w-full flex items-center justify-center text-muted-foreground animate-pulse">Loading contributions...</div>
                        ) : (
                            <ActivityCalendar
                                data={contributions}
                                theme={calendarTheme}
                                colorScheme={isDark ? "dark" : "light"}
                                blockSize={14}
                                blockMargin={4}
                                fontSize={14}
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
                        )}
                    </motion.div>

                    {/* Top Repositories */}
                    <div className="space-y-8">
                        <motion.h3
                            className="text-2xl font-bold text-center lg:text-left"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: false }}
                        >
                            Featured Repositories
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {repos.map((repo, index) => (
                                <motion.div
                                    key={repo.name}
                                    className="group relative bg-card/40 hover:bg-card/60 border border-border/50 rounded-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:border-[#EC844D]/40 hover:shadow-[#EC844D]/10"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    viewport={{ once: false }}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="p-2 bg-[#EC844D]/10 rounded-lg text-[#EC844D] group-hover:bg-[#EC844D] group-hover:text-white transition-colors duration-300">
                                            <GitFork className="w-5 h-5" />
                                        </div>
                                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span>{repo.stargazers_count}</span>
                                        </div>
                                    </div>

                                    <h4 className="text-lg font-bold mb-2 group-hover:text-[#EC844D] dark:group-hover:text-[#FFAE80] transition-colors">{repo.name}</h4>
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-3 h-[60px]">
                                        {repo.description || "No description available."}
                                    </p>

                                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                                        <span className="text-xs font-mono text-[#EC844D] dark:text-[#FFAE80] bg-[#EC844D]/10 border border-[#EC844D]/20 px-2 py-1 rounded">
                                            {repo.language || "Code"}
                                        </span>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-sm font-medium hover:text-[#EC844D] dark:hover:text-[#FFAE80] transition-colors"
                                        >
                                            View <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default GithubStatsSection;
