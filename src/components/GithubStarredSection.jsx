import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  GitFork,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Github,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Clock,
  Calendar
} from "lucide-react";
import { githubUsername } from "@/data";

// Fallback starred repos in case of API rate limits or network issues (ordered newest first)
const fallbackStarredRepos = [
  {
    id: 101,
    name: "react",
    full_name: "facebook/react",
    owner: {
      login: "facebook",
      avatar_url: "https://avatars.githubusercontent.com/u/69631?v=4"
    },
    description: "The library for web and native user interfaces.",
    html_url: "https://github.com/facebook/react",
    stargazers_count: 226000,
    forks_count: 45000,
    language: "JavaScript",
    created_at: "2026-09-01T00:00:00Z",
    topics: ["react", "frontend", "ui", "javascript"]
  },
  {
    id: 102,
    name: "next.js",
    full_name: "vercel/next.js",
    owner: {
      login: "vercel",
      avatar_url: "https://avatars.githubusercontent.com/u/14985020?v=4"
    },
    description: "The React Framework for the Web.",
    html_url: "https://github.com/vercel/next.js",
    stargazers_count: 124000,
    forks_count: 26000,
    language: "JavaScript",
    created_at: "2026-08-15T00:00:00Z",
    topics: ["nextjs", "react", "framework", "ssr"]
  },
  {
    id: 103,
    name: "tailwindcss",
    full_name: "tailwindlabs/tailwindcss",
    owner: {
      login: "tailwindlabs",
      avatar_url: "https://avatars.githubusercontent.com/u/67109815?v=4"
    },
    description: "A utility-first CSS framework for rapid UI development.",
    html_url: "https://github.com/tailwindlabs/tailwindcss",
    stargazers_count: 81000,
    forks_count: 4300,
    language: "TypeScript",
    created_at: "2026-07-20T00:00:00Z",
    topics: ["css", "tailwindcss", "styling", "ui"]
  },
  {
    id: 104,
    name: "vite",
    full_name: "vitejs/vite",
    owner: {
      login: "vitejs",
      avatar_url: "https://avatars.githubusercontent.com/u/65600975?v=4"
    },
    description: "Next generation frontend tooling. It's fast!",
    html_url: "https://github.com/vitejs/vite",
    stargazers_count: 68000,
    forks_count: 5800,
    language: "TypeScript",
    created_at: "2026-06-10T00:00:00Z",
    topics: ["vite", "build-tool", "frontend", "bundler"]
  },
  {
    id: 105,
    name: "framer-motion",
    full_name: "framer/motion",
    owner: {
      login: "framer",
      avatar_url: "https://avatars.githubusercontent.com/u/1878065?v=4"
    },
    description: "Open source, production-ready animation library for React on the web.",
    html_url: "https://github.com/framer/motion",
    stargazers_count: 24000,
    forks_count: 900,
    language: "TypeScript",
    created_at: "2026-05-01T00:00:00Z",
    topics: ["react", "animation", "framer-motion", "ui"]
  },
  {
    id: 106,
    name: "lucide",
    full_name: "lucide-icons/lucide",
    owner: {
      login: "lucide-icons",
      avatar_url: "https://avatars.githubusercontent.com/u/66872957?v=4"
    },
    description: "Beautiful & consistent icon toolkit made by the community.",
    html_url: "https://github.com/lucide-icons/lucide",
    stargazers_count: 14500,
    forks_count: 600,
    language: "TypeScript",
    created_at: "2026-04-12T00:00:00Z",
    topics: ["icons", "svg", "ui-components", "react"]
  }
];

// Map language to badge styling
const languageColors = {
  JavaScript: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  TypeScript: "bg-blue-500/10 text-blue-500 border-blue-500/30",
  Python: "bg-emerald-500/10 text-emerald-500 border-emerald-500/30",
  HTML: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  CSS: "bg-indigo-500/10 text-indigo-500 border-indigo-500/30",
  Java: "bg-red-500/10 text-red-500 border-red-500/30",
  Go: "bg-cyan-500/10 text-cyan-500 border-cyan-500/30",
  CPlusPlus: "bg-purple-500/10 text-purple-500 border-purple-500/30",
  Default: "bg-primary/10 text-primary border-primary/30"
};

export const GithubStarredSection = () => {
  const [starredRepos, setStarredRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchStarredRepos = async () => {
      try {
        const user = githubUsername || "ayanmanna123";
        // Fetch starred repositories sorted by created/starred date descending so newest is first
        const res = await fetch(`https://api.github.com/users/${user}/starred?per_page=100&sort=created&direction=desc`);
        
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Ensure data is sorted newest first by starred/created date
            const sorted = [...data].sort((a, b) => {
              const dA = new Date(a.starred_at || a.created_at || a.pushed_at || 0).getTime();
              const dB = new Date(b.starred_at || b.created_at || b.pushed_at || 0).getTime();
              return dB - dA;
            });
            setStarredRepos(sorted);
          } else {
            // Fallback: fetch user's repos sorted by pushed date
            const fallbackRes = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed&direction=desc&per_page=100`);
            if (fallbackRes.ok) {
              const fallbackData = await fallbackRes.json();
              if (Array.isArray(fallbackData) && fallbackData.length > 0) {
                setStarredRepos(fallbackData);
              } else {
                setStarredRepos(fallbackStarredRepos);
              }
            } else {
              setStarredRepos(fallbackStarredRepos);
            }
          }
        } else {
          setStarredRepos(fallbackStarredRepos);
        }
      } catch (error) {
        console.error("Error fetching starred repositories:", error);
        setStarredRepos(fallbackStarredRepos);
      } finally {
        setLoading(false);
      }
    };

    fetchStarredRepos();
  }, []);

  const displayedRepos = showAll ? starredRepos : starredRepos.slice(0, 3);

  // Group displayed repositories into chunks of 3 for serpentine row layout
  const chunkedRows = [];
  for (let i = 0; i < displayedRepos.length; i += 3) {
    chunkedRows.push(displayedRepos.slice(i, i + 3));
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return null;
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  return (
    <section id="github-starred" className="relative py-20 md:py-32 pb-44 md:pb-52 overflow-hidden bg-background/50 z-10">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-[5%] w-80 h-80 bg-amber-500/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-60" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 text-amber-500 text-sm font-medium mb-6 border border-amber-500/20"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Clock className="h-4 w-4 text-amber-500" />
            GitHub Starred Timeline
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-primary to-purple-500">
            Timeline of Starred Projects
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A chronological serpentine timeline of repositories I've starred, starting with the newest additions.
          </p>
        </motion.div>

        {/* Repositories Timeline Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-64 rounded-2xl bg-card/40 border border-border/50 animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-6 w-3/4 bg-muted rounded-md" />
                  <div className="h-4 w-full bg-muted/60 rounded-md" />
                  <div className="h-4 w-2/3 bg-muted/60 rounded-md" />
                </div>
                <div className="h-8 w-full bg-muted/40 rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-20 relative">
            <AnimatePresence>
              {chunkedRows.map((rowRepos, rowIndex) => {
                const isEvenRow = rowIndex % 2 === 0;
                const hasNextRow = rowIndex < chunkedRows.length - 1;
                const placeholdersNeeded = 3 - rowRepos.length;

                return (
                  <div
                    key={rowIndex}
                    className={`relative flex flex-col ${
                      isEvenRow ? "md:flex-row" : "md:flex-row-reverse"
                    } gap-8 items-stretch`}
                  >
                    {rowRepos.map((repo, itemIndex) => {
                      const globalIndex = rowIndex * 3 + itemIndex;
                      const hasNextInRow = itemIndex < rowRepos.length - 1;
                      const isEndOfRowOfThree = itemIndex === 2;
                      const langColorClass =
                        languageColors[repo.language] || languageColors.Default;
                      const dateText = formatDate(repo.starred_at || repo.created_at || repo.pushed_at);

                      return (
                        <motion.div
                          key={repo.id || repo.name}
                          className="relative flex-1 w-full min-w-0"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.4, delay: globalIndex * 0.05 }}
                        >
                          {/* Card Content */}
                          <div className="group relative h-full bg-card/60 hover:bg-card/95 backdrop-blur-md border border-border/60 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                            {/* Top Info */}
                            <div>
                              {/* Timeline Badge & Owner */}
                              <div className="flex items-center justify-between gap-3 mb-4">
                                <div className="flex items-center gap-2 overflow-hidden">
                                  {globalIndex === 0 ? (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md flex items-center gap-1 shrink-0">
                                      <Sparkles className="w-3 h-3" /> #1 NEWEST
                                    </span>
                                  ) : (
                                    <span className="px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
                                      #{globalIndex + 1}
                                    </span>
                                  )}

                                  {dateText && (
                                    <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 shrink-0">
                                      <Calendar className="w-3 h-3" /> {dateText}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0">
                                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                                  <span>{repo.stargazers_count?.toLocaleString()}</span>
                                </div>
                              </div>

                              {/* Owner avatar & login */}
                              <div className="flex items-center gap-2 mb-3">
                                {repo.owner?.avatar_url ? (
                                  <img
                                    src={repo.owner.avatar_url}
                                    alt={repo.owner.login}
                                    className="w-6 h-6 rounded-full border border-border/60"
                                  />
                                ) : (
                                  <div className="p-1 bg-primary/10 rounded-lg text-primary">
                                    <Github className="w-3.5 h-3.5" />
                                  </div>
                                )}
                                <span className="text-xs font-mono text-muted-foreground truncate">
                                  {repo.owner?.login || repo.full_name?.split('/')[0] || "github"}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors line-clamp-1">
                                {repo.name}
                              </h3>

                              {/* Description */}
                              <p className="text-muted-foreground text-sm line-clamp-3 mb-4 min-h-[60px]">
                                {repo.description || "No description provided for this repository."}
                              </p>
                            </div>

                            {/* Bottom Metadata & Link */}
                            <div className="pt-4 border-t border-border/40 flex items-center justify-between gap-2 mt-2">
                              <div className="flex items-center gap-3 overflow-hidden">
                                {repo.language && (
                                  <span className={`text-xs font-medium px-2.5 py-1 rounded-md border ${langColorClass}`}>
                                    {repo.language}
                                  </span>
                                )}
                                {repo.forks_count !== undefined && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <GitFork className="w-3.5 h-3.5" />
                                    <span>{repo.forks_count}</span>
                                  </div>
                                )}
                              </div>

                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-amber-400 transition-colors py-1 px-2 rounded-lg hover:bg-amber-500/10"
                                title="View on GitHub"
                              >
                                View Repo <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>

                          {/* Desktop Horizontal Arrow within Row */}
                          {hasNextInRow && (
                            isEvenRow ? (
                              <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-20 items-center pointer-events-none">
                                <div className="w-4 h-0.5 bg-gradient-to-r from-amber-500 to-amber-400" />
                                <ArrowRight className="w-5 h-5 text-amber-400 animate-pulse -ml-1" />
                              </div>
                            ) : (
                              <div className="hidden md:flex absolute top-1/2 -left-6 -translate-y-1/2 z-20 items-center pointer-events-none">
                                <ArrowLeft className="w-5 h-5 text-amber-400 animate-pulse -mr-1" />
                                <div className="w-4 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500" />
                              </div>
                            )
                          )}

                          {/* Desktop U-Turn Curve at End of Row */}
                          {isEndOfRowOfThree && hasNextRow && (
                            isEvenRow ? (
                              // Right U-Turn Curve (loops around right side down into Row 1 rightmost card)
                              <div className="hidden md:flex absolute -bottom-16 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
                                <svg width="56" height="64" viewBox="0 0 56 64" fill="none" className="text-amber-400">
                                  <path
                                    d="M 28 2 C 54 2, 54 58, 28 58"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeDasharray="5 3"
                                    fill="none"
                                  />
                                  <polygon points="32,52 20,58 32,64" fill="currentColor" />
                                </svg>
                              </div>
                            ) : (
                              // Left U-Turn Curve (loops around left side down into Row 2 leftmost card)
                              <div className="hidden md:flex absolute -bottom-16 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
                                <svg width="56" height="64" viewBox="0 0 56 64" fill="none" className="text-amber-400">
                                  <path
                                    d="M 28 2 C 2 2, 2 58, 28 58"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeDasharray="5 3"
                                    fill="none"
                                  />
                                  <polygon points="24,52 36,58 24,64" fill="currentColor" />
                                </svg>
                              </div>
                            )
                          )}

                          {/* Mobile Downward Arrow */}
                          {globalIndex < displayedRepos.length - 1 && (
                            <div className="flex md:hidden justify-center my-3 text-amber-400">
                              <ArrowDown className="w-5 h-5 text-amber-400 animate-bounce" />
                            </div>
                          )}
                        </motion.div>
                      );
                    })}

                    {/* Placeholders for rows with fewer than 3 items to preserve 3-column spacing */}
                    {placeholdersNeeded > 0 &&
                      [...Array(placeholdersNeeded)].map((_, pIdx) => (
                        <div key={`placeholder-${pIdx}`} className="hidden md:block flex-1 min-w-0" />
                      ))}
                  </div>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {/* View More / Show Less Button */}
        {!loading && starredRepos.length > 3 && (
          <motion.div
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
                showAll
                  ? "bg-muted text-foreground border border-border hover:bg-muted/80"
                  : "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-600 hover:to-orange-600 shadow-amber-500/25"
              }`}
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Show Less Repositories
                </>
              ) : (
                <>
                  View More Repositories ({starredRepos.length - 3} More)
                  <ChevronDown className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default GithubStarredSection;
