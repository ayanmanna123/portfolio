import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Star,
  GitFork,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Github,
  ArrowRight,
  ArrowLeft,
  ArrowDown,
  Calendar,
  Sparkles
} from "lucide-react";
import { githubUsername } from "@/data";

gsap.registerPlugin(ScrollTrigger);

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

export const GithubStarredSection = () => {
  const [starredRepos, setStarredRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchStarredRepos = async () => {
      try {
        const user = githubUsername || "ayanmanna123";
        const res = await fetch(`https://api.github.com/users/${user}/starred?per_page=100&sort=created&direction=desc`);
        
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const sorted = [...data].sort((a, b) => {
              const dA = new Date(a.starred_at || a.created_at || a.pushed_at || 0).getTime();
              const dB = new Date(b.starred_at || b.created_at || b.pushed_at || 0).getTime();
              return dB - dA;
            });
            setStarredRepos(sorted);
          } else {
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

      // Starred Repository Cards entrance
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        let fromVars = { opacity: 0, y: 50 };
        const colPos = index % 3;

        if (colPos === 0) {
          fromVars = { x: -60, y: 30, opacity: 0 };
        } else if (colPos === 1) {
          fromVars = { y: 60, opacity: 0 };
        } else {
          fromVars = { x: 60, y: 30, opacity: 0 };
        }

        gsap.fromTo(
          card,
          fromVars,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current || card,
              start: "top 72%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [showAll, starredRepos, loading]);

  return (
    <section
      id="github-starred"
      ref={sectionRef}
      className="relative py-16 sm:py-24 md:py-32 pb-24 sm:pb-32 overflow-hidden bg-[#eae7e1] text-[#2d2b28] z-10"
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
        <div className="absolute top-1/3 left-6 w-72 h-72 rounded-full soft-ui-inset-subtle opacity-35" />
        <div className="absolute bottom-1/4 right-6 w-80 h-80 rounded-full soft-ui-inset-subtle opacity-30" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(#dedad1_1px,transparent_1px),linear-gradient(90deg,#dedad1_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-16 px-2 sm:px-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-xs font-digital font-bold text-[#e59845] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" />
            <span>CHRONOLOGICAL REPOSITORIES</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span ref={line1Ref} className="block text-[#2d2b28] font-digital will-change-transform will-change-opacity">
              Timeline of
            </span>
            <span
              ref={line2Ref}
              className="block font-handwriting text-[#e59845] mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
            >
              Starred Projects
            </span>
          </h2>
          <p
            ref={line3Ref}
            className="text-sm sm:text-base md:text-lg text-[#5a5751] font-mono max-w-2xl mx-auto leading-relaxed will-change-transform will-change-opacity mt-2"
          >
            A chronological timeline of inspiring repositories and tools, starting with the newest additions.
          </p>
        </div>

        {/* Repositories Timeline Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-60 sm:h-64 rounded-3xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] animate-pulse p-6 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-6 w-3/4 rounded-xl soft-ui-inset bg-[#e4e1d9]" />
                  <div className="h-4 w-full rounded-lg soft-ui-inset bg-[#e4e1d9]" />
                  <div className="h-4 w-2/3 rounded-lg soft-ui-inset bg-[#e4e1d9]" />
                </div>
                <div className="h-8 w-full rounded-xl soft-ui-inset bg-[#e4e1d9]" />
              </div>
            ))}
          </div>
        ) : (
          <div ref={cardsContainerRef} className="space-y-8 sm:space-y-12 md:space-y-16 relative">
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
                      const dateText = formatDate(repo.starred_at || repo.created_at || repo.pushed_at);

                      return (
                        <div
                          key={repo.id || repo.name}
                          ref={(el) => (cardRefs.current[globalIndex] = el)}
                          className="relative flex-1 w-full min-w-0 will-change-transform will-change-opacity"
                        >
                          {/* Soft UI Raised Clay Repository Card */}
                          <div className="group relative h-full soft-ui-raised-card bg-[#eae7e1] border border-[#dedad1] rounded-3xl p-5 sm:p-7 flex flex-col justify-between shadow-[10px_10px_22px_#cfcbc2,-10px_-10px_22px_#ffffff] hover:shadow-[14px_14px_28px_#cfcbc2,-14px_-14px_28px_#ffffff] transition-all duration-300 hover:-translate-y-1">
                            {/* Top Info */}
                            <div>
                              {/* Date & Stars Pill */}
                              <div className="flex items-center justify-between gap-2 mb-3.5 sm:mb-4">
                                <div className="flex items-center gap-1.5 overflow-hidden">
                                  {dateText && (
                                    <span className="text-[11px] font-mono text-[#78756e] flex items-center gap-1 shrink-0">
                                      <Calendar className="w-3 h-3 text-[#e59845]" /> {dateText}
                                    </span>
                                  )}
                                </div>

                                <div className="flex items-center gap-1.5 soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] px-2.5 py-1 rounded-xl text-xs font-digital font-bold text-[#e59845] shrink-0 shadow-inner">
                                  <Star className="w-3.5 h-3.5 fill-[#e59845] text-[#e59845]" />
                                  <span>{repo.stargazers_count?.toLocaleString()}</span>
                                </div>
                              </div>

                              {/* Owner avatar & login */}
                              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                                {repo.owner?.avatar_url ? (
                                  <div className="w-6 h-6 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] p-0.5 overflow-hidden flex items-center justify-center shrink-0">
                                    <img
                                      src={repo.owner.avatar_url}
                                      alt={repo.owner.login}
                                      className="w-full h-full object-cover rounded-full"
                                    />
                                  </div>
                                ) : (
                                  <div className="w-6 h-6 rounded-xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shrink-0">
                                    <Github className="w-3.5 h-3.5" />
                                  </div>
                                )}
                                <span className="text-xs font-mono text-[#78756e] truncate">
                                  {repo.owner?.login || repo.full_name?.split('/')[0] || "github"}
                                </span>
                              </div>

                              {/* Title */}
                              <h3 className="text-lg sm:text-xl font-bold font-digital text-[#2d2b28] group-hover:text-[#e59845] transition-colors mb-2 line-clamp-1">
                                {repo.name}
                              </h3>

                              {/* Description */}
                              <p className="text-[#5a5751] font-mono text-xs sm:text-sm line-clamp-2 sm:line-clamp-3 mb-4 sm:min-h-[54px] leading-relaxed">
                                {repo.description || "No description provided for this repository."}
                              </p>
                            </div>

                            {/* Bottom Metadata & Link */}
                            <div className="pt-3.5 sm:pt-4 border-t border-[#dedad1] flex items-center justify-between gap-2 mt-2">
                              <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
                                {repo.language && (
                                  <span className="text-[11px] font-digital font-bold px-2.5 py-1 rounded-xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#43413d] shadow-sm">
                                    {repo.language}
                                  </span>
                                )}
                                {repo.forks_count !== undefined && (
                                  <div className="flex items-center gap-1 text-xs font-digital text-[#78756e]">
                                    <GitFork className="w-3.5 h-3.5 text-[#e59845]" />
                                    <span>{repo.forks_count}</span>
                                  </div>
                                )}
                              </div>

                              <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-digital font-bold soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#383a3d] hover:text-[#e59845] transition-all py-1.5 px-3 rounded-xl shadow-sm active:scale-95 shrink-0 cursor-pointer"
                                title="View on GitHub"
                              >
                                <span>Repo</span>
                                <ExternalLink className="w-3 h-3 text-[#e59845]" />
                              </a>
                            </div>
                          </div>

                          {/* Desktop Horizontal Arrow within Row */}
                          {hasNextInRow && (
                            isEvenRow ? (
                              <div className="hidden md:flex absolute top-1/2 -right-6 -translate-y-1/2 z-20 items-center pointer-events-none text-[#e59845]">
                                <div className="w-4 h-0.5 bg-[#e59845]/60" />
                                <ArrowRight className="w-4 h-4 animate-pulse -ml-1 text-[#e59845]" />
                              </div>
                            ) : (
                              <div className="hidden md:flex absolute top-1/2 -left-6 -translate-y-1/2 z-20 items-center pointer-events-none text-[#e59845]">
                                <ArrowLeft className="w-4 h-4 animate-pulse -mr-1 text-[#e59845]" />
                                <div className="w-4 h-0.5 bg-[#e59845]/60" />
                              </div>
                            )
                          )}

                          {/* Desktop U-Turn Curve at End of Row */}
                          {isEndOfRowOfThree && hasNextRow && (
                            isEvenRow ? (
                              <div className="hidden md:flex absolute -bottom-14 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
                                <svg width="56" height="56" viewBox="0 0 56 64" fill="none" className="text-[#e59845]">
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
                              <div className="hidden md:flex absolute -bottom-14 left-1/2 -translate-x-1/2 z-20 flex-col items-center pointer-events-none">
                                <svg width="56" height="56" viewBox="0 0 56 64" fill="none" className="text-[#e59845]">
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

                          {/* Mobile Connecting Arrow */}
                          {globalIndex < displayedRepos.length - 1 && (
                            <div className="flex md:hidden flex-col items-center my-3 text-[#e59845]">
                              <div className="w-0.5 h-3 bg-[#e59845]/50" />
                              <div className="p-1 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1]">
                                <ArrowDown className="w-3.5 h-3.5 text-[#e59845] animate-bounce" />
                              </div>
                              <div className="w-0.5 h-3 bg-[#e59845]/50" />
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
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl font-digital font-bold text-xs sm:text-sm soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#383a3d] hover:text-[#e59845] transition-all duration-300 shadow-md active:scale-95 cursor-pointer"
            >
              {showAll ? (
                <>
                  <ChevronUp className="w-4 h-4 text-[#e59845]" />
                  <span>Show Less Repositories</span>
                </>
              ) : (
                <>
                  <span>View More Repositories ({starredRepos.length - 3} More)</span>
                  <ChevronDown className="w-4 h-4 text-[#e59845]" />
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
