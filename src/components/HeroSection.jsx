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
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-8 lg:px-12 xl:px-16 overflow-hidden bg-gradient-to-br from-background via-background/95 to-primary/10" ref={ref}>

      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-lg"
            style={{
              width: Math.random() * 60 + 20 + 'px',
              height: Math.random() * 60 + 20 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              rotate: Math.random() * 360
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 60],
              x: [0, (Math.random() - 0.5) * 40],
              opacity: [0.1, 0.25, 0.1],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}

        <motion.div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-gradient-to-r from-primary/10 to-purple-600/10 blur-[100px]" animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity }} />
        <motion.div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-gradient-to-r from-cyan-400/10 to-emerald-500/10 blur-[100px]" animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }} transition={{ duration: 20, repeat: Infinity, delay: 2 }} />
      </div>

      <div className="w-full max-w-[1600px] mx-auto mt-16 sm:mt-0">
        <motion.div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 xl:gap-20" initial="hidden" animate={isInView ? "visible" : "hidden"} variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.5 } } }}>

          <div className="flex-1 text-center lg:text-left max-w-2xl xl:max-w-3xl mx-auto lg:mx-0">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 backdrop-blur-sm" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              <Briefcase className="h-4 w-4" /> {heroData.status}
            </motion.div>

            <motion.h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              <span className="block text-foreground">{heroData.title}</span>
              <motion.span className="block bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent mt-2" animate={{ backgroundPosition: ['0%', '100%', '0%'] }} transition={{ duration: 8, repeat: Infinity }} style={{ backgroundSize: '200% 100%' }}>
                {heroData.subtitle}
              </motion.span>
            </motion.h1>

            <motion.p className="text-lg sm:text-xl text-muted-foreground mt-6 leading-relaxed max-w-2xl" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              {heroData.description}
            </motion.p>

            <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              {heroAchievements.map((achievement, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-background/60 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {achievement.icon}
                    <div className="text-2xl font-bold text-foreground">
                      {index === 0 ? <CountUp value={stats.contributions} suffix="+" /> :
                        index === 1 ? <CountUp value={stats.repos} suffix="+" /> :
                          index === 2 ? <CountUp value={stats.projects} suffix="+" /> :
                            index === 3 ? <CountUp value={stats.leetcode} suffix="+" /> :
                              achievement.number}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{achievement.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              <motion.a href="#projects" className="group relative overflow-hidden px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-3" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Code className="h-5 w-5" />
                <span>View Case Studies</span>
                <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </motion.a>

              <motion.a href="#contact" className="group relative overflow-hidden px-8 py-4 rounded-xl font-semibold border border-primary/50 text-foreground hover:border-primary transition-all duration-300 bg-background/80 backdrop-blur-sm text-sm flex items-center justify-center gap-3" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Mail className="h-4 w-4" />
                <span>Technical Interview</span>
              </motion.a>

              <motion.button
                onClick={handleViewResume}
                className="group relative overflow-hidden px-6 py-4 rounded-xl font-semibold border border-border text-muted-foreground hover:border-primary/30 transition-all duration-300 bg-background/60 backdrop-blur-sm text-sm flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="h-4 w-4" />
                <span>View Resume</span>
              </motion.button>
            </motion.div>

            <motion.div className="mt-6 text-center lg:text-left" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
              <div className="text-sm text-muted-foreground">
                🚀 <span className="text-primary font-semibold">{heroData.status || "Available Immediately"}</span> for {heroData.roles || "Full-Stack and Frontend roles"}
              </div>
            </motion.div>
          </div>

          <motion.div className="flex-1 flex justify-center lg:justify-end w-full" variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.8 } } }}>
            <div className="relative w-full max-w-md sm:max-w-xl lg:max-w-[510px]">
              {/* Code Snippet Card Window */}
              <motion.div
                className="bg-card/95 dark:bg-[#0b0f19]/90 border border-border dark:border-slate-800 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-2xl w-full group hover:shadow-3xl transition-all duration-300"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Window Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="text-sm font-mono font-semibold text-foreground/80 dark:text-slate-300">portfolio.js</div>
                  </div>
                  <div className="w-4 h-4 bg-green-500/20 dark:bg-green-400/20 rounded-full animate-pulse"></div>
                </div>

                {/* Code Container */}
                <div className="font-mono text-xs sm:text-sm bg-muted/50 dark:bg-[#050811] rounded-lg border border-border/80 dark:border-slate-800/80 min-h-[300px] flex shadow-inner overflow-x-auto">
                  <div className="p-4 sm:p-5 w-full">
                    <div className="grid grid-cols-1 gap-1.5 h-full content-start">
                      {heroData.codeSnippets.map((line, index) => (
                        <div
                          key={index}
                          className={`
                            min-h-[22px] py-0.5 whitespace-pre font-mono leading-relaxed flex items-center flex-wrap
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
                                className="ml-0.5 text-primary dark:text-amber-400 inline-block font-bold"
                              >
                                ▊
                              </motion.span>
                            </>
                          ) : ''}
                          {line === '' && <span className="inline-block min-h-[22px]">&nbsp;</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <motion.div className="absolute -bottom-3 -right-3 w-14 h-14 bg-gradient-to-r from-primary to-purple-600 rounded-xl flex items-center justify-center border-2 border-background shadow-2xl" animate={{ y: [0, -5, 0], rotate: [0, -2, 0], scale: [1, 1.03, 1] }} transition={{ duration: 4, repeat: Infinity }}>
                  <Code className="h-5 w-5 text-white" />
                </motion.div>

                <motion.div className="absolute -top-3 -left-3 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-border shadow-lg flex items-center gap-2" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 1.5, type: "spring" }}>
                  <Award className="h-4 w-4 text-amber-500" />
                  <span className="text-sm font-semibold text-foreground">Solutions</span>
                </motion.div>

                <motion.div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-background/90 backdrop-blur-sm px-4 py-2 rounded-xl border border-border shadow-lg text-center" initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ delay: 2, type: "spring" }}>
                  <div className="text-xs font-mono text-muted-foreground">Built with</div>
                  <div className="text-sm font-bold text-foreground">Modern Tech</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: [0, 1, 1, 0], y: [0, 6, 0, -6] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}>
        <motion.div className="text-xs text-primary mb-3 flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-lg" whileHover={{ scale: 1.05 }}>
          <MousePointerClick className="h-3 w-3" />
          <span>Explore Technical Portfolio</span>
        </motion.div>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-8 border-2 border-primary/30 rounded-full flex justify-center">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 h-2 bg-primary rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
};