import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, GitFork, ExternalLink, ChevronDown, ChevronUp, Github, Sparkles, Code2, Eye } from "lucide-react";
import { githubUsername } from "@/data";

// Fallback starred repos in case of API rate limits or network issues
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
        // Fetch starred repositories for the user
        const res = await fetch(`https://api.github.com/users/${user}/starred?per_page=100`);
        
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setStarredRepos(data);
          } else {
            // Fallback: If no starred repos or rate-limited, try user's own repos sorted by stars
            const fallbackRes = await fetch(`https://api.github.com/users/${user}/repos?sort=stars&per_page=100`);
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

  return (
    <section id="github-starred" className="relative py-20 md:py-32 overflow-hidden bg-background/50 z-10">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-[5%] w-80 h-80 bg-amber-500/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[20%] right-[5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-60" />
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
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" />
            GitHub Starred Repositories
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-primary to-purple-500">
            Starred & Inspired Projects
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            A curated collection of awesome repositories and open-source projects that I follow, star, and draw inspiration from.
          </p>
        </motion.div>

        {/* Repositories Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {displayedRepos.map((repo, index) => {
                const langColorClass =
                  languageColors[repo.language] || languageColors.Default;

                return (
                  <motion.div
                    key={repo.id || repo.name}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative bg-card/50 hover:bg-card/80 backdrop-blur-md border border-border/50 hover:border-amber-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1"
                  >
                    {/* Top Info */}
                    <div>
                      {/* Owner & Stars */}
                      <div className="flex items-center justify-between gap-3 mb-4">
                        <div className="flex items-center gap-2 overflow-hidden">
                          {repo.owner?.avatar_url ? (
                            <img
                              src={repo.owner.avatar_url}
                              alt={repo.owner.login}
                              className="w-7 h-7 rounded-full border border-border/60"
                            />
                          ) : (
                            <div className="p-1.5 bg-primary/10 rounded-lg text-primary">
                              <Github className="w-4 h-4" />
                            </div>
                          )}
                          <span className="text-xs font-mono text-muted-foreground truncate">
                            {repo.owner?.login || repo.full_name?.split('/')[0] || "github"}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2.5 py-1 rounded-full text-xs font-semibold shrink-0">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                          <span>{repo.stargazers_count?.toLocaleString()}</span>
                        </div>
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

        {/* View More / Show Less Button */}
        {!loading && starredRepos.length > 3 && (
          <motion.div
            className="text-center mt-12"
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
