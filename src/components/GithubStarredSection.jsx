import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
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

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Line 1: "Timeline of"
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

      // Line 2: "Starred Projects"
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

      // Line 3: Description
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

      // Starred Repository Cards with distinct multi-directional timing & visible reverse triggers
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        let fromVars = { opacity: 0 };
        let duration = 1.4;
        let triggerStart = "top 68%";
        const colPos = index % 3;

        if (colPos === 0) {
          // Card 1 (Left): Left to Right
          fromVars = { x: -260, opacity: 0 };
          duration = 1.4;
          triggerStart = "top 68%";
        } else if (colPos === 1) {
          // Card 2 (Center): Bottom to Top
          fromVars = { y: 80, opacity: 0 };
          duration = 1.6;
          triggerStart = "top 64%";
        } else {
          // Card 3 (Right): Right to Left
          fromVars = { x: 260, opacity: 0 };
          duration = 1.8;
          triggerStart = "top 60%";
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
  }, [showAll, starredRepos, loading]);

  return (
    <section id="github-starred" ref={sectionRef} className="relative py-14 sm:py-20 md:py-28 pb-28 sm:pb-36 md:pb-48 overflow-hidden bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5 z-10">
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[30%] left-[5%] w-60 sm:w-80 h-60 sm:h-80 bg-amber-500/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-[20%] right-[5%] w-72 sm:w-96 h-72 sm:h-96 bg-[#EC844D]/5 rounded-full blur-3xl opacity-60" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
            <span ref={line1Ref} className="block text-foreground will-change-transform will-change-opacity">
              Timeline of
            </span>
            <span
              ref={line2Ref}
              className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
              style={{ fontFamily: "'Rakyat', cursive" }}
            >
              Starred Projects
            </span>
          </h2>
          <p
            ref={line3Ref}
            className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
          >
            A chronological timeline of inspiring repositories I've starred, starting with the newest additions.
          </p>
        </div>

        {/* Repositories Timeline Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-60 sm:h-64 rounded-2xl bg-card/40 border border-border/50 animate-pulse p-5 sm:p-6 flex flex-col justify-between"
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
          <div ref={cardsContainerRef} className="space-y-8 sm:space-y-12 md:space-y-20 relative">
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
                    } gap-6 md:gap-8 items-stretch`}
                  >
                    {rowRepos.map((repo, itemIndex) => {
                      const globalIndex = rowIndex * 3 + itemIndex;
                      const hasNextInRow = itemIndex < rowRepos.length - 1;
                      const isEndOfRowOfThree = itemIndex === 2;
                      const langColorClass =
                        languageColors[repo.language] || languageColors.Default;
                      const dateText = formatDate(repo.starred_at || repo.created_at || repo.pushed_at);

                      return (
                        <div
                          key={repo.id || repo.name}
                          ref={(el) => (cardRefs.current[globalIndex] = el)}
                          className="relative flex-1 w-full min-w-0 will-change-transform will-change-opacity"
                        >
                          {/* Card Content */}
                          <div className="group relative h-full bg-card/60 hover:bg-card/95 backdrop-blur-md border border-border/60 hover:border-amber-500/40 rounded-2xl p-4 sm:p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-1">
                            {/* Top Info */}
                            <div>
                              {/* Timeline Badge & Owner */}
                              <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                                <div className="flex items-center gap-2 overflow-hidden">
                                  {dateText && (
                                    <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground flex items-center gap-1 shrink-0">
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
                              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                                {repo.owner?.avatar_url ? (
                                  <img
                                    src={repo.owner.avatar_url}
                                    alt={repo.owner.login}
                                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-border/60"
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
                              <h3 className="text-lg sm:text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors line-clamp-1">
                                {repo.name}
                              </h3>

                              {/* Description */}
                              <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-4 sm:min-h-[56px]">
                                {repo.description || "No description provided for this repository."}
                              </p>
                            </div>

                            {/* Bottom Metadata & Link */}
                            <div className="pt-3.5 sm:pt-4 border-t border-border/40 flex items-center justify-between gap-2 mt-2">
                              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                                {repo.language && (
                                  <span className={`text-[11px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border ${langColorClass}`}>
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
                                className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-amber-400 transition-colors py-1 px-2 rounded-lg hover:bg-amber-500/10 shrink-0"
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

                          {/* Mobile Connecting Node/Arrow */}
                          {globalIndex < displayedRepos.length - 1 && (
                            <div className="flex md:hidden flex-col items-center my-2 text-amber-400/80">
                              <div className="w-0.5 h-3 bg-gradient-to-b from-amber-500/60 to-amber-400/80" />
                              <div className="p-1 rounded-full bg-amber-500/10 border border-amber-500/30">
                                <ArrowDown className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
                              </div>
                              <div className="w-0.5 h-3 bg-gradient-to-b from-amber-400/80 to-amber-500/60" />
                            </div>
                          )}
                        </div>
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
            className="text-center mt-12 sm:mt-16 md:mt-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 shadow-lg cursor-pointer ${
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
