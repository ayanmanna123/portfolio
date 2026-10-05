import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code, Download, TrendingUp, Mail } from "lucide-react";
import { CountUp } from "./CountUp";
import { heroData, heroAchievements, projects } from "@/data";
import SplitText from "./SplitText";
import { scrollToSection } from "@/lib/scrollToSection";
import { fetchWithCache, getCachedData } from "@/lib/apiCache";

export const HeroLeft = () => {
  const ghUser = heroData.githubUsername || "ayanmanna123";
  const ltUser = heroData.leetcodeUsername || "ayanmanna123";

  const [stats, setStats] = useState(() => {
    const cachedContrib = getCachedData(`gh_contributions_${ghUser}`);
    const cachedGh = getCachedData(`gh_user_${ghUser}`);
    const cachedLeet = getCachedData(`leetcode_stats_${ltUser}`);

    return {
      contributions: cachedContrib?.contributions?.reduce((acc, curr) => acc + curr.count, 0) || 0,
      repos: cachedGh?.public_repos || 0,
      projects: projects.length,
      leetcode: cachedLeet?.totalSolved || 0,
    };
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Github Contributions
        const contribData = await fetchWithCache(
          `https://github-contributions-api.jogruber.de/v4/${ghUser}?y=last`,
          {},
          { key: `gh_contributions_${ghUser}` }
        );
        const totalContribs =
          contribData?.contributions?.reduce((acc, curr) => acc + curr.count, 0) || 0;

        // Github Repos
        const reposData = await fetchWithCache(
          `https://api.github.com/users/${ghUser}`,
          {},
          { key: `gh_user_${ghUser}` }
        );
        const publicRepos = reposData?.public_repos || 0;

        // LeetCode
        const leetData = await fetchWithCache(
          `https://leetcode-api-faisalshohag.vercel.app/${ltUser}`,
          {},
          { key: `leetcode_stats_${ltUser}` }
        );
        const totalSolved = leetData?.totalSolved || 0;

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
  }, [ghUser, ltUser]);

  const handleViewResume = () => {
    window.open(heroData.resumeUrl || "/resume.pdf", "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex-1 text-center lg:text-left max-w-2xl xl:max-w-3xl mx-auto lg:mx-0 w-full pt-0">
      <div className="hero-fade-element">
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          <motion.span
            className="block text-[#2d2b28] font-digital"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
            }}
          >
            {heroData.title}
          </motion.span>
          <SplitText
            text={heroData.subtitle || "Full-Stack Engineer"}
            className="block font-caveat-brush text-5xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[6.5rem] leading-[0.95] text-[#e59845] mt-2 sm:mt-3 pb-1 sm:pb-3 font-normal"
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
          />
        </h1>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-[#5a5751] font-mono mt-4 sm:mt-6 leading-relaxed max-w-2xl mx-auto lg:mx-0"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
          }}
        >
          {heroData.description}
        </motion.p>

        {/* Achievements Soft UI Clay Grid */}
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
              className="text-center p-3 sm:p-4 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] hover:shadow-[8px_8px_18px_#cfcbc2,-8px_-8px_18px_#ffffff] transition-all duration-300"
            >
              <div className="text-lg sm:text-2xl font-bold font-digital text-[#2d2b28] mb-1">
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
              <div className="text-[10px] sm:text-xs text-[#78756e] font-digital font-medium uppercase tracking-wider">
                {achievement.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-center"
        variants={{
          hidden: { y: 20, opacity: 0 },
          visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
        }}
      >
        {/* Soft UI Case Studies CTA / Zoom Target */}
        <div className="relative group/cta">
          <motion.a
            href="#projects"
            id="hero-zoom-cta"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#projects");
            }}
            className="hero-zoom-cta relative z-10 overflow-hidden px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-bold soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#2d2b28] hover:text-[#e59845] flex items-center justify-between gap-3.5 shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 will-change-transform cursor-pointer"
            whileHover={{ scale: 1.03, y: -2 }}
          >
            <div className="hero-cta-inner flex items-center gap-3 will-change-[transform,opacity,filter]">
              <div className="flex items-center justify-center w-7 h-7 rounded-xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] text-[#e59845]">
                <Code className="h-4 w-4 stroke-[2.5]" />
              </div>
              <div className="text-left font-digital leading-tight tracking-tight text-xs sm:text-sm font-bold text-[#383a3d]">
                <div>View Case</div>
                <div>Studies</div>
              </div>
              <TrendingUp className="h-4 w-4 text-[#e59845] group-hover/cta:translate-x-1 group-hover/cta:-translate-y-0.5 transition-transform stroke-[2.5] ml-1" />
            </div>
          </motion.a>
        </div>

        <motion.a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("#contact");
          }}
          className="hero-fade-element group relative overflow-hidden px-5 sm:px-6 py-3.5 rounded-2xl font-bold soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#383a3d] hover:text-[#e59845] transition-all duration-300 text-xs sm:text-sm font-digital flex items-center justify-center gap-2 active:scale-95 shadow-md cursor-pointer"
          whileHover={{ scale: 1.03, y: -2 }}
        >
          <Mail className="h-4 w-4 text-[#e59845]" />
          <span>Technical Interview</span>
        </motion.a>

        <motion.button
          onClick={handleViewResume}
          className="hero-fade-element group relative overflow-hidden px-5 sm:px-6 py-3.5 rounded-2xl font-bold soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#6d6a64] hover:text-[#e59845] transition-all duration-300 text-xs sm:text-sm font-digital flex items-center justify-center gap-2 active:scale-95 cursor-pointer shadow-md"
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
