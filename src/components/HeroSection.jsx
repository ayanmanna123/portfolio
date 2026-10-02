import { ArrowDown, MousePointerClick, Sparkles, Code, Palette, Rocket, Award, Download, Calendar, Shield, Zap, Users, TrendingUp, Briefcase, Mail } from "lucide-react";
import { CountUp } from "./CountUp";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { heroData, heroAchievements, projects } from "@/data";


// Realistic JS Syntax Highlighter for Code Snippet Card
const highlightJsCode = (codeText) => {
  if (!codeText) return null;

  if (codeText.trim().startsWith("//")) {
    return <span className="text-slate-500 dark:text-slate-400/80 italic font-mono whitespace-pre">{codeText}</span>;
  }

  const tokenRegex = /('(?:\\[\s\S]|[^'\\])*'?|"(?:\\[\s\S]|[^"\\])*"?|`(?:\\[\s\S]|[^`\\])*`?|\/\/.*|\b(?:import|from|const|new|await|function|return|export|default|class|if|else)\b|\b(?:console)\b|\b[A-Za-z_$][A-Za-z0-9_$]*(?=\s*:)|[A-Za-z_$][A-Za-z0-9_$]*|[0-9]+|[{}(),;:[\]=.]|\s+|.+?)/g;

  const tokens = [];
  let match;
  let keyIndex = 0;

  while ((match = tokenRegex.exec(codeText)) !== null) {
    const token = match[0];
    const rest = codeText.slice(tokenRegex.lastIndex);

    if (token.startsWith("'") || token.startsWith('"') || token.startsWith("`")) {
      tokens.push(
        <span key={keyIndex++} className="text-amber-600 dark:text-amber-300 whitespace-pre">
          {token}
        </span>
      );
    } else if (token.startsWith("//")) {
      tokens.push(
        <span key={keyIndex++} className="text-slate-500 dark:text-slate-400/80 italic whitespace-pre">
          {token}
        </span>
      );
    } else if (["import", "from", "const", "new", "await", "function", "return", "export", "default", "class", "if", "else"].includes(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-purple-600 dark:text-purple-400 font-semibold whitespace-pre">
          {token}
        </span>
      );
    } else if (token === "console") {
      tokens.push(
        <span key={keyIndex++} className="text-cyan-600 dark:text-cyan-400 font-medium whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(token) && rest.trimStart().startsWith("(")) {
      tokens.push(
        <span key={keyIndex++} className="text-amber-600 dark:text-yellow-300 font-medium whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(token) && rest.trimStart().startsWith(":")) {
      tokens.push(
        <span key={keyIndex++} className="text-sky-600 dark:text-sky-300 whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[A-Z][A-Za-z0-9_$]*$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-emerald-600 dark:text-emerald-400 font-semibold whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[a-z_$][A-Za-z0-9_$]*$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-blue-600 dark:text-blue-300 whitespace-pre">
          {token}
        </span>
      );
    } else if (/^\d+$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-teal-600 dark:text-cyan-300 whitespace-pre">
          {token}
        </span>
      );
    } else if (/^[{}(),;:[\]=.]+$/.test(token)) {
      tokens.push(
        <span key={keyIndex++} className="text-slate-700 dark:text-slate-300 font-mono whitespace-pre">
          {token}
        </span>
      );
    } else {
      tokens.push(<span key={keyIndex++} className="text-foreground dark:text-slate-200 whitespace-pre">{token}</span>);
    }
  }

  return tokens;
};

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [currentCodeLine, setCurrentCodeLine] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [stats, setStats] = useState({
    contributions: 0,
    repos: 0,
    projects: projects.length,
    leetcode: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const ghUser = heroData.githubUsername || "ayanmanna123";
        const ltUser = heroData.leetcodeUsername || "ayanmanna123";

        // Github Contributions
        const contribRes = await fetch(`https://github-contributions-api.jogruber.de/v4/${ghUser}?y=last`);
        const contribData = await contribRes.json();
        // Sum total contributions
        const totalContribs = contribData.contributions?.reduce((acc, curr) => acc + curr.count, 0) || 0;

        // Github Repos
        const reposRes = await fetch(`https://api.github.com/users/${ghUser}`);
        const reposData = await reposRes.json();
        const publicRepos = reposData.public_repos || 0;

        // LeetCode
        const leetRes = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${ltUser}`);
        const leetData = await leetRes.json();
        const totalSolved = leetData.totalSolved || 0;

        setStats({
          contributions: totalContribs,
          repos: publicRepos,
          projects: projects.length,
          leetcode: totalSolved
        });

      } catch (error) {
        console.error("Error fetching hero stats:", error);
      }
    };
    fetchStats();
  }, []);

  const { codeSnippets } = heroData;

  useEffect(() => {
    const currentLine = codeSnippets[currentCodeLine];
    if (displayedCode.length < currentLine.length) {
      setTimeout(() => {
        setDisplayedCode(currentLine.slice(0, displayedCode.length + 1));
      }, 30);
    } else {
      setTimeout(() => {
        if (currentCodeLine < heroData.codeSnippets.length - 1) {
          setCurrentCodeLine(prev => prev + 1);
          setDisplayedCode("");
        } else {
          setTimeout(() => {
            setCurrentCodeLine(0);
            setDisplayedCode("");
          }, 5000);
        }
      }, 800);
    }
  }, [displayedCode, currentCodeLine, codeSnippets]);

  const handleViewResume = () => {
    // Open resume in new tab
    window.open(heroData.resumeUrl || '/resume.pdf', '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-start justify-center px-3 sm:px-8 lg:px-12 xl:px-16 pt-5 sm:pt-6 lg:pt-8 pb-28 sm:pb-36 overflow-hidden bg-gradient-to-br from-background via-background/95 to-[#FFD8B2]/20 dark:to-[#EC844D]/10" ref={ref}>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(236,132,77,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(236,132,77,0.08)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-[#EC844D]/15 to-[#FFD8B2]/20 rounded-2xl"
            style={{
              width: Math.random() * 40 + 15 + 'px',
              height: Math.random() * 40 + 15 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 40],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}

        <motion.div className="absolute top-16 left-5 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-gradient-to-r from-[#EC844D]/20 to-[#FFD8B2]/30 blur-[80px] sm:blur-[110px]" animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity }} />
        <motion.div className="absolute bottom-16 right-5 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-gradient-to-r from-[#FFD8B2]/25 to-[#EC844D]/20 blur-[80px] sm:blur-[110px]" animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, delay: 2 }} />
      </div>

      <div className="w-full max-w-[1600px] mx-auto mt-0">
        <motion.div className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 lg:gap-14 xl:gap-16" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } } }}>

          <div className="flex-1 text-center lg:text-left max-w-2xl xl:max-w-3xl mx-auto lg:mx-0 w-full pt-0">
            <motion.h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
              <span className="block text-foreground">{heroData.title}</span>
              <motion.span className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal tracking-normal" animate={{ backgroundPosition: ['0%', '100%', '0%'] }} transition={{ duration: 8, repeat: Infinity }} style={{ backgroundSize: '200% 100%', fontFamily: "'Rakyat', cursive" }}>
                {heroData.subtitle}
              </motion.span>
            </motion.h1>

            <motion.p className="text-sm sm:text-lg md:text-xl text-muted-foreground mt-4 sm:mt-6 leading-relaxed max-w-2xl mx-auto lg:mx-0" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
              {heroData.description}
            </motion.p>

            {/* Achievements Grid */}
            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 my-6 sm:my-8" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
              {heroAchievements.map((achievement, index) => (
                <div key={index} className="text-center p-3 sm:p-4 rounded-xl bg-background/70 border border-border/60 backdrop-blur-sm hover:border-[#EC844D]/50 hover:shadow-[0_4px_25px_rgba(236,132,77,0.18)] transition-all duration-300">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
                    <span className="text-[#EC844D] dark:text-[#FFAE80] scale-90 sm:scale-100">{achievement.icon}</span>
                    <div className="text-lg sm:text-2xl font-bold text-foreground">
                      {index === 0 ? <CountUp value={stats.contributions} suffix="+" /> :
                        index === 1 ? <CountUp value={stats.repos} suffix="+" /> :
                          index === 2 ? <CountUp value={stats.projects} suffix="+" /> :
                            index === 3 ? <CountUp value={stats.leetcode} suffix="+" /> :
                              achievement.number}
                    </div>
                  </div>
                  <div className="text-[11px] sm:text-xs text-muted-foreground leading-tight">{achievement.label}</div>
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
              <motion.a href="#projects" className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold bg-[#EC844D] hover:bg-[#DE743C] text-white shadow-lg shadow-[#EC844D]/30 hover:shadow-[0_0_25px_rgba(236,132,77,0.45)] text-sm flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-300 active:scale-95" whileHover={{ scale: 1.03, y: -2 }}>
                <Code className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                <span>View Case Studies</span>
                <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform text-white" />
              </motion.a>

              <motion.a href="#contact" className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold border border-[#EC844D]/50 text-foreground hover:border-[#EC844D] hover:bg-[#EC844D]/10 hover:text-[#EC844D] dark:hover:text-[#FFAE80] transition-all duration-300 bg-background/80 backdrop-blur-sm text-sm flex items-center justify-center gap-2.5 sm:gap-3 active:scale-95" whileHover={{ scale: 1.03, y: -2 }}>
                <Mail className="h-4 w-4 text-[#EC844D] dark:text-[#FFAE80]" />
                <span>Technical Interview</span>
              </motion.a>

              <motion.button
                onClick={handleViewResume}
                className="group relative overflow-hidden px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-semibold border border-border text-muted-foreground hover:border-[#EC844D]/40 hover:text-[#EC844D] dark:hover:text-[#FFAE80] transition-all duration-300 bg-background/60 backdrop-blur-sm text-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                whileHover={{ scale: 1.03, y: -2 }}
              >
                <Download className="h-4 w-4" />
                <span>View Resume</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Right Side Code Terminal */}
          <motion.div className="flex-1 flex justify-center lg:justify-end w-full pt-4 sm:pt-6 lg:pt-8" variants={{ hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6 } } }}>
            <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-[510px]">
              {/* Code Snippet Card Window */}
              <motion.div
                className="bg-card/40 dark:bg-card/20 backdrop-blur-md border border-border/70 dark:border-stone-800/80 rounded-2xl p-4 sm:p-7 shadow-xl w-full group hover:shadow-[0_0_35px_rgba(236,132,77,0.15)] transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Window Header */}
                <div className="flex items-center justify-between mb-3 sm:mb-5">
                  <div className="flex gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#FFD8B2]"></div>
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#EC844D]"></div>
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-foreground/80 dark:text-stone-300">
                    portfolio.js
                  </div>
                  <div className="w-8 sm:w-12"></div>
                </div>

                {/* Code Container */}
                <div className="font-mono text-[11px] sm:text-xs md:text-sm bg-background/50 dark:bg-black/30 rounded-lg border border-border/60 dark:border-stone-800/70 min-h-[260px] sm:min-h-[420px] flex shadow-inner overflow-x-auto custom-scrollbar">
                  <div className="p-3 sm:p-5 w-full">
                    <div className="grid grid-cols-1 gap-1 sm:gap-1.5 h-full content-start text-left">
                      {heroData.codeSnippets.map((line, index) => (
                        <div
                          key={index}
                          className={`
                            min-h-[18px] sm:min-h-[22px] py-0.5 whitespace-pre font-mono leading-relaxed flex items-center flex-wrap
                            ${index < currentCodeLine ? 'opacity-100' : 'opacity-0'}
                            ${index === currentCodeLine ? 'opacity-100' : ''}
                            transition-opacity duration-150 ease-in-out
                          `}
                        >
                          {index < currentCodeLine ? highlightJsCode(line) : ''}
                          {index === currentCodeLine ? (
                            <>
                              {highlightJsCode(displayedCode)}
                              <motion.span
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="ml-0.5 text-[#EC844D] dark:text-[#FFAE80] inline-block font-bold"
                              >
                                ▊
                              </motion.span>
                            </>
                          ) : ''}
                          {line === '' && <span className="inline-block min-h-[18px] sm:min-h-[22px]">&nbsp;</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corner Accents - scaled nicely for mobile */}
                <motion.div className="absolute -bottom-2.5 -right-2.5 sm:-bottom-3 sm:-right-3 w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-r from-[#EC844D] to-[#DE743C] rounded-xl flex items-center justify-center border-2 border-background shadow-xl shadow-[#EC844D]/35" animate={{ y: [0, -4, 0], scale: [1, 1.03, 1] }} transition={{ duration: 4, repeat: Infinity }}>
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </motion.div>

                <motion.div className="hidden sm:flex absolute -top-3 -left-3 bg-background/95 backdrop-blur-sm px-3.5 py-1.5 rounded-xl border border-border shadow-lg items-center gap-2" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2, type: "spring" }}>
                  <Award className="h-4 w-4 text-[#EC844D] dark:text-[#FFAE80]" />
                  <span className="text-xs font-semibold text-foreground">Solutions</span>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <motion.div 
        className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20 pointer-events-auto" 
        onClick={() => {
          const aboutSection = document.getElementById('about');
          if (aboutSection) {
            if (window.lenis) {
              window.lenis.scrollTo(aboutSection, {
                offset: -40,
                duration: 1.3,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            } else {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }}
        initial={{ opacity: 0, y: 10 }} 
        animate={{ opacity: [0, 1, 1, 0], y: [0, 6, 0, -6] }} 
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-4 h-7 sm:w-5 sm:h-8 border-2 border-[#EC844D]/40 rounded-full flex justify-center hover:border-[#EC844D] transition-colors">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-1.5 sm:h-2 bg-[#EC844D] rounded-full mt-1.5" />
        </motion.div>
      </motion.div>
    </section>
  );
};