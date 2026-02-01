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
        const fetchLeetCodeStats = async () => {
            try {
                const response = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/solved`);
                const data = await response.json();

                const profileResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}`);
                const profileData = await profileResponse.json();

                if (data && profileData) {
                    setStats({ ...data, ...profileData });
                }

                // Fetch Calendar Data
                const calendarResponse = await fetch(`https://alfa-leetcode-api.onrender.com/${leetcodeUsername}/calendar`);
                const calendarJson = await calendarResponse.json();

                if (calendarJson && calendarJson.submissionCalendar) {
                    const submissionMap = JSON.parse(calendarJson.submissionCalendar);

                    // Generate last 365 days to match GitHub's size
                    const today = new Date();
                    const dateMap = new Map();

                    for (let i = 0; i < 365; i++) {
                        const date = new Date(today);
                        date.setDate(date.getDate() - i);
                        const dateString = date.toISOString().split('T')[0];
                        dateMap.set(dateString, 0);
                    }

                    // Fill in actual submissions
                    Object.keys(submissionMap).forEach(timestamp => {
                        const date = new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0];
                        if (dateMap.has(date)) {
                            dateMap.set(date, submissionMap[timestamp]);
                        }
                    });

                    // Convert to array and sort
                    const formattedData = Array.from(dateMap.entries()).map(([date, count]) => ({
                        date,
                        count,
                        level: count === 0 ? 0 : Math.min(4, Math.ceil(count / 3))
                    })).sort((a, b) => new Date(a.date) - new Date(b.date));

                    setCalendarData(formattedData);
                }

            } catch (error) {
                console.error("Error fetching LeetCode stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeetCodeStats();
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

    // LeetCode Green Theme for the graph (matching GitHub's contribution green)
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
                                                strokeDashoffset={2 * Math.PI * 80 * (1 - (stats?.solvedProblem || 0) / (stats?.totalQuestions || 1))}
                                                className="text-primary transition-all duration-1000 ease-out"
                                            />
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-4xl font-bold">{stats?.solvedProblem || 0}</span>
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

                {/* Activity Calendar */}
                <motion.div
                    className="bg-card/50 backdrop-blur-sm border border-border/50 p-8 rounded-2xl shadow-xl flex flex-col items-center justify-center overflow-x-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-xl font-semibold mb-6 self-start text-foreground">Submission Map</h3>
                    {loading ? (
                        <div className="h-[160px] w-full flex items-center justify-center text-muted-foreground animate-pulse">Loading activity...</div>
                    ) : (
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
                    )}
                </motion.div>
            </div>
        </section>
    );
};

export default LeetCodeStatsSection;
