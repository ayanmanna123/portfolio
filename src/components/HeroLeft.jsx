import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Download, TrendingUp, Mail } from "lucide-react";
import { CountUp } from "./CountUp";
import { heroData, heroAchievements, projects } from "@/data";
import SplitText from "./SplitText";

export const HeroLeft = () => {
  const [stats, setStats] = useState({
    contributions: 0,
    repos: 0,
    projects: projects.length,
    leetcode: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const ghUser = heroData.githubUsername || "ayanmanna123";
        const ltUser = heroData.leetcodeUsername || "ayanmanna123";

        // Github Contributions
        const contribRes = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${ghUser}?y=last`
        );
        const contribData = await contribRes.json();
        const totalContribs =
          contribData.contributions?.reduce((acc, curr) => acc + curr.count, 0) || 0;

        // Github Repos
        const reposRes = await fetch(`https://api.github.com/users/${ghUser}`);
        const reposData = await reposRes.json();
        const publicRepos = reposData.public_repos || 0;

        // LeetCode
        const leetRes = await fetch(
          `https://leetcode-api-faisalshohag.vercel.app/${ltUser}`
        );
        const leetData = await leetRes.json();
        const totalSolved = leetData.totalSolved || 0;

        setStats({
          contributions: totalContribs,
          repos: publicRepos,
          projects: projects.length,
          leetcode: totalSolved,
        });
      } catch (error) {
        console.error("Error fetching hero stats:", error);
      }
    };
    fetchStats();
  }, []);

  const handleViewResume = () => {
    window.open(heroData.resumeUrl || "/resume.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex-1 text-center lg:text-left max-w-2xl xl:max-w-3xl mx-auto lg:mx-0 w-full pt-0">
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
        <motion.span
          className="block text-foreground"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
          }}
        >
          {heroData.title}
        </motion.span>
        <SplitText
          text={heroData.subtitle || "Full-Stack Engineer"}
          className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal"
          delay={50}
          duration={1.25}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
          tag="span"
          onLetterAnimationComplete={() => {
            console.log('All letters have animated!');
          }}
          showCallback
        />
      </h1>

      <motion.p
        className="text-sm sm:text-lg md:text-xl text-muted-foreground mt-4 sm:mt-6 leading-relaxed max-w-2xl mx-auto lg:mx-0"
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
        }}
      >
        {heroData.description}
      </motion.p>

      {/* Achievements Grid */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 my-6 sm:my-8"
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
        }}
      >
        {heroAchievements.map((achievement, index) => (
          <div
            key={index}
            className="text-center p-3 sm:p-4 rounded-xl bg-background/70 border border-border/60 backdrop-blur-sm hover:border-[#EC844D]/50 hover:shadow-[0_4px_25px_rgba(236,132,77,0.18)] transition-all duration-300"
          >
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
              <span className="text-[#EC844D] dark:text-[#FFAE80] scale-90 sm:scale-100">
                {achievement.icon}
              </span>
              <div className="text-lg sm:text-2xl font-bold text-foreground">
                {index === 0 ? (
                  <CountUp value={stats.contributions} suffix="+" />
                ) : index === 1 ? (
                  <CountUp value={stats.repos} suffix="+" />
                ) : index === 2 ? (
                  <CountUp value={stats.projects} suffix="+" />
                ) : index === 3 ? (
                  <CountUp value={stats.leetcode} suffix="+" />
                ) : (
                  achievement.number
                )}
              </div>
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground leading-tight">
              {achievement.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
        }}
      >
        <motion.a
          href="#projects"
          className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold bg-[#EC844D] hover:bg-[#DE743C] text-white shadow-lg shadow-[#EC844D]/30 hover:shadow-[0_0_25px_rgba(236,132,77,0.45)] text-sm flex items-center justify-center gap-2.5 sm:gap-3 transition-all duration-300 active:scale-95"
          whileHover={{ scale: 1.03, y: -2 }}
        >
          <Code className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          <span>View Case Studies</span>
          <TrendingUp className="h-4 w-4 group-hover:translate-x-1 transition-transform text-white" />
        </motion.a>

        <motion.a
          href="#contact"
          className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold border border-[#EC844D]/50 text-foreground hover:border-[#EC844D] hover:bg-[#EC844D]/10 hover:text-[#EC844D] dark:hover:text-[#FFAE80] transition-all duration-300 bg-background/80 backdrop-blur-sm text-sm flex items-center justify-center gap-2.5 sm:gap-3 active:scale-95"
          whileHover={{ scale: 1.03, y: -2 }}
        >
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
  );
};

export default HeroLeft;
