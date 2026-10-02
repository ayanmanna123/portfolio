import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillsData, skillCategories, iconImages } from "@/data";
import { ChevronDown, Filter } from "lucide-react";

const SkillBar = ({ level }) => (
  <div className="w-full h-2.5 sm:h-3 bg-secondary/20 rounded-full overflow-hidden">
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: `${level}%` }}
      transition={{ duration: 1.5, delay: 0.2 }}
      className={`h-full rounded-full ${level > 75 ? 'bg-gradient-to-r from-[#EC844D] to-[#FFD8B2]' :
        level > 50 ? 'bg-gradient-to-r from-[#E07238] to-[#EC844D]' :
          'bg-gradient-to-r from-amber-400 to-[#FFAE80]'
        }`}
    />
  </div>
);

const InfiniteScrollSkills = ({ skills }) => {
  const duplicatedSkills = [...skills, ...skills, ...skills];

  return (
    <div className="overflow-hidden py-4 sm:py-8">
      <motion.div
        className="flex gap-4 sm:gap-8 mb-4 sm:mb-8"
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {duplicatedSkills.map((skill, index) => (
          <div key={`${skill.name}-${index}`} className="flex-shrink-0 flex flex-col items-center gap-1.5 sm:gap-2">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl sm:rounded-full bg-card border border-primary/30 flex items-center justify-center shadow-md hover:border-primary hover:shadow-primary/20 hover:scale-110 transition-all duration-300">
              <img src={iconImages[skill.icon] || skill.icon} alt={skill.name} className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center">{skill.name}</span>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex gap-4 sm:gap-8"
        animate={{ x: ["-100%", "0%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      >
        {[...duplicatedSkills].reverse().map((skill, index) => (
          <div key={`${skill.name}-reverse-${index}`} className="flex-shrink-0 flex flex-col items-center gap-1.5 sm:gap-2">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl sm:rounded-full bg-card border border-primary/30 flex items-center justify-center shadow-md hover:border-primary hover:shadow-primary/20 hover:scale-110 transition-all duration-300">
              <img src={iconImages[skill.icon] || skill.icon} alt={skill.name} className="w-6 h-6 sm:w-8 sm:h-8 object-contain" />
            </div>
            <span className="text-xs sm:text-sm font-medium text-center">{skill.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredSkills = skillsData.filter(skill =>
    activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-16 sm:py-24 md:py-28 px-3 sm:px-6 bg-gradient-to-br from-background via-secondary/5 to-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-10 sm:mb-16 md:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="block text-foreground">Technical</span>
            <span className="block font-rakyat text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal" style={{ fontFamily: "'Rakyat', cursive" }}>
              Skills & Expertise
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-lg">
            Technologies I've mastered and my proficiency levels
          </p>
        </motion.div>

        {/* Category Filter Pills (Desktop & Tablet) */}
        <div className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-16">
          {skillCategories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border border-transparent hover:shadow-lg transition-all cursor-pointer ${activeCategory === category.id
                ? `${category.color} text-white shadow-md shadow-primary/25 font-bold`
                : "bg-secondary/50 text-foreground hover:bg-secondary/70"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </motion.button>
          ))}
        </div>

        {/* Mobile Category Dropdown Selector */}
        <div className="sm:hidden mb-8 max-w-xs mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-primary">
              <Filter className="h-4 w-4" />
            </div>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full pl-10 pr-10 py-3 rounded-2xl bg-card border border-border text-foreground font-semibold text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm cursor-pointer"
            >
              {skillCategories.map((category) => (
                <option key={category.id} value={category.id} className="bg-background text-foreground">
                  {category.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-muted-foreground">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>

        {activeCategory === "all" ? (
          <InfiniteScrollSkills skills={skillsData} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-card p-4 sm:p-6 rounded-2xl border border-border/40 hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/10 group text-left"
                >
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-5">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-full bg-card border-2 border-primary/40 flex items-center justify-center shrink-0">
                      <img src={iconImages[skill.icon] || skill.icon} alt={skill.name} className="w-5 h-5 sm:w-6 sm:h-6 object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                        <h3 className="font-semibold text-sm sm:text-lg group-hover:text-primary transition-colors truncate">
                          {skill.name}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${skill.level > 75 ? 'bg-[#EC844D]/15 text-[#EC844D] dark:text-[#FFAE80] border border-[#EC844D]/25' :
                          skill.level > 50 ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                            'bg-pink-500/10 text-pink-500 border border-pink-500/20'
                          }`}>
                          {skill.level}%
                        </span>
                      </div>
                      <SkillBar level={skill.level} />
                      <div className="mt-1.5 sm:mt-2 flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                        <span>Basic</span>
                        <span>Advanced</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};