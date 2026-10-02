import React, { useState, useEffect } from 'react';
import {
  Briefcase,
  Code,
  User,
  Download,
  Calendar,
  Sparkles,
  Target,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Star,
  Heart,
  ChevronDown,
  ChevronUp,
  Globe,
  Server,
  Cloud,
  Cpu,
  Smartphone,
  Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievements, techStack, features, socialLinks, tabContent, hobbies, aboutData } from "@/data";

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [counter, setCounter] = useState(0);

  // Accordion dropdown state for Tech Stack categories (first category open by default)
  const [openCategories, setOpenCategories] = useState({ 0: true });

  const toggleCategory = (index) => {
    setOpenCategories((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const allOpen = techStack.every((_, idx) => !!openCategories[idx]);

  const toggleAllCategories = () => {
    if (allOpen) {
      setOpenCategories({});
    } else {
      const all = {};
      techStack.forEach((_, idx) => {
        all[idx] = true;
      });
      setOpenCategories(all);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = (category || "").toLowerCase();
    if (cat.includes("front") || cat.includes("web") || cat.includes("ui")) return <Globe className="h-3.5 sm:h-4 w-3.5 sm:w-4" />;
    if (cat.includes("back") || cat.includes("server") || cat.includes("api") || cat.includes("data")) return <Server className="h-3.5 sm:h-4 w-3.5 sm:w-4" />;
    if (cat.includes("cloud") || cat.includes("tool") || cat.includes("devops")) return <Cloud className="h-3.5 sm:h-4 w-3.5 sm:w-4" />;
    if (cat.includes("ai") || cat.includes("ml") || cat.includes("deep") || cat.includes("learning") || cat.includes("llm")) return <Cpu className="h-3.5 sm:h-4 w-3.5 sm:w-4" />;
    if (cat.includes("app") || cat.includes("mobile") || cat.includes("android") || cat.includes("ios")) return <Smartphone className="h-3.5 sm:h-4 w-3.5 sm:w-4" />;
    return <Code className="h-3.5 sm:h-4 w-3.5 sm:w-4" />;
  };


  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);


  // Programmatic download function
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = aboutData?.resumeUrl || '/resume.pdf'; // Must be in public folder
    link.download = 'resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="about" className="relative py-14 sm:py-20 md:py-28 px-3 sm:px-6 lg:px-12 bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5 overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-60 sm:w-96 h-60 sm:h-96 bg-[#EC844D]/10 rounded-full blur-3xl transition-all duration-1000 ease-out" style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }} />
        <div className="absolute w-52 sm:w-80 h-52 sm:h-80 bg-[#FFD8B2]/20 dark:bg-[#EC844D]/10 rounded-full blur-3xl transition-all duration-1500 ease-out" style={{ transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` }} />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
        <div className="hidden sm:block absolute top-16 right-8 sm:top-20 sm:right-20 animate-float-3s"><div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#EC844D]/20 rounded-lg rotate-45" /></div>
        <div className="hidden sm:block absolute bottom-32 left-8 sm:bottom-40 sm:left-20 animate-float-3s animation-delay-2000"><div className="w-5 sm:w-6 h-5 sm:h-6 bg-[#EC844D]/20 rounded-full" /></div>
      </div>

      <div className="container mx-auto max-w-7xl relative">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
            <span className="block text-foreground">{aboutData?.title || "Transforming"}</span>
            <span className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal" style={{ fontFamily: "'Rakyat', cursive" }}>
              {aboutData?.subtitle || "Ideas Into Reality"}
            </span>
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {aboutData?.bio || (
              <>Building digital experiences that combine <span className="text-primary font-semibold">innovation</span>, <span className="text-primary font-semibold">performance</span>, and <span className="text-primary font-semibold">elegance</span></>
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
          {/* Left Column */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            {/* About Card */}
            <div className="bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-xl shadow-xl sm:shadow-2xl transition-all duration-500 hover:border-primary/40 hover:bg-card/60 relative overflow-hidden group">
              {/* Decorative Circles */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary rounded-full -translate-y-16 translate-x-16" />
                <div className="absolute bottom-0 left-0 w-20 sm:w-24 h-20 sm:h-24 bg-primary rounded-full -translate-x-16 translate-y-16" />
              </div>

              <div className="relative">
                <div className="flex flex-col md:flex-row items-center gap-5 sm:gap-8">
                  {/* Profile Image */}
                  <div className="relative flex-shrink-0 group">
                    <div 
                      className="absolute -inset-2 bg-gradient-to-tr from-[#EC844D] via-[#F59E6B] to-[#FFD8B2] opacity-60 blur-md group-hover:opacity-90 transition-opacity duration-500"
                      style={{ borderRadius: "48% 52% 68% 32% / 38% 45% 55% 62%" }}
                    />
                    
                    <div 
                      className="w-24 h-24 sm:w-36 sm:h-36 overflow-hidden bg-gradient-to-tr from-[#EC844D] to-[#FFD8B2] p-1 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:rotate-1 relative z-10"
                      style={{ borderRadius: "48% 52% 68% 32% / 38% 45% 55% 62%" }}
                    >
                      <img 
                        src={aboutData?.profileImage || "/profile-logo.jpeg"} 
                        alt={aboutData?.name || "Ayan Manna"} 
                        className="w-full h-full object-cover" 
                        style={{ borderRadius: "46% 54% 66% 34% / 40% 47% 53% 60%" }}
                      />
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="flex-1 text-center md:text-left w-full">
                    <h3 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">{aboutData?.name || "Ayan Manna"}</h3>
                    <p className="text-primary text-sm sm:text-lg font-semibold mb-3 sm:mb-4">{aboutData?.role || "Full Stack Developer"}</p>
                    <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-3 sm:mb-6">
                      {achievements.map((achievement, index) => (
                        <div key={index} className="p-2 sm:p-3 rounded-xl bg-background/50 border border-border transition-all duration-300 hover:scale-105 hover:border-primary/30">
                          <div className="flex items-center gap-1.5 sm:gap-2 justify-center md:justify-start">
                            <span className="scale-90 sm:scale-100 text-primary">{achievement.icon}</span>
                            <div className="text-left">
                              <div className="font-bold text-xs sm:text-base md:text-lg">{achievement.number}{achievement.suffix}</div>
                              <div className="text-[9px] sm:text-xs text-muted-foreground leading-tight">{achievement.label}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-border mb-3 sm:mb-6 mt-4 sm:mt-0">
                  {['personal', 'professional', 'approach'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-base font-medium transition-all duration-300 cursor-pointer ${activeTab === tab ? 'text-primary border-b-2 border-primary font-bold' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="min-h-[90px] sm:min-h-[120px] text-left">
                  <AnimatePresence mode="sync">
                    <motion.p
                      key={activeTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                      className="text-xs sm:text-base md:text-lg text-muted-foreground leading-relaxed"
                    >
                      {tabContent[activeTab]}
                    </motion.p>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Tech Stack Dropdown Accordion */}
            <div className="bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-7 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-primary/40 hover:bg-card/60 text-left">
              <div className="flex items-center justify-between gap-2 mb-4 sm:mb-6 flex-wrap">
                <h3 className="text-base sm:text-2xl font-bold flex items-center gap-2 sm:gap-3">
                  <Code className="h-4 sm:h-6 w-4 sm:w-6 text-primary" />
                  <span>Tech Stack Overview</span>
                </h3>

                {/* Expand / Collapse All Toggle */}
                <button
                  type="button"
                  onClick={toggleAllCategories}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 border border-primary/20 transition-all cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>{allOpen ? "Collapse All" : "Expand All"}</span>
                </button>
              </div>

              {/* Accordion Dropdowns Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {techStack.map((stack, index) => {
                  const isOpen = !!openCategories[index];
                  const itemCount = stack.items?.length || 0;

                  return (
                    <div
                      key={index}
                      className={`bg-background/60 border rounded-xl sm:rounded-2xl transition-all duration-300 overflow-hidden shadow-sm ${
                        isOpen
                          ? "border-primary/50 bg-background/90 shadow-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      {/* Dropdown Header / Trigger */}
                      <button
                        type="button"
                        onClick={() => toggleCategory(index)}
                        className="w-full p-3.5 sm:p-4 flex items-center justify-between gap-3 text-left transition-colors duration-200 hover:bg-accent/30 cursor-pointer select-none"
                        aria-expanded={isOpen}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                          <div
                            className={`p-1.5 sm:p-2 rounded-lg transition-colors ${
                              isOpen
                                ? "bg-primary text-primary-foreground"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            {getCategoryIcon(stack.category)}
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-semibold text-xs sm:text-sm truncate">
                              {stack.category}
                            </h4>
                            <span className="text-[10px] sm:text-[11px] text-muted-foreground font-mono">
                              {itemCount} {itemCount === 1 ? "skill" : "skills"}
                            </span>
                          </div>
                        </div>

                        {/* Animated Chevron Indicator */}
                        <div
                          className={`p-1 rounded-full border transition-transform duration-300 shrink-0 ${
                            isOpen
                              ? "rotate-180 bg-primary/10 text-primary border-primary/30"
                              : "text-muted-foreground border-transparent"
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      {/* Dropdown Content with AnimatePresence */}
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-3.5 pb-3.5 sm:px-4 sm:pb-4 pt-1 border-t border-border/40">
                              <div className="flex flex-wrap gap-1.5 sm:gap-2 pt-2">
                                {stack.items.map((item, itemIndex) => {
                                  const name =
                                    typeof item === "string"
                                      ? item
                                      : item?.name || item?.item || String(item);
                                  return (
                                    <div
                                      key={itemIndex}
                                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-card border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all text-[11px] sm:text-xs text-muted-foreground hover:text-foreground font-medium shadow-xs"
                                    >
                                      <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shrink-0" />
                                      <span>{name}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-8">
            {/* Work Together */}
            <div className="bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-8 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-primary/40 hover:bg-card/60">
              <h3 className="text-base sm:text-2xl font-bold mb-3 sm:mb-6 text-center">Let's Work Together</h3>
              <div className="flex flex-col sm:flex-row xl:flex-col gap-2.5 sm:gap-3">
                <a href="#contact" className="w-full p-3 sm:p-4 bg-[#EC844D] text-white rounded-xl text-center font-bold text-xs sm:text-sm transition-all duration-300 hover:bg-[#DE743C] active:scale-95 shadow-lg shadow-[#EC844D]/25 group">
                  <div className="flex items-center justify-center gap-2"><User className="h-4 w-4 group-hover:scale-110 transition-transform duration-300" />Start a Project</div>
                </a>

                <button
                  onClick={handleDownload}
                  className="w-full p-3 sm:p-4 border border-border rounded-xl text-center font-semibold text-xs sm:text-sm transition-all duration-300 hover:bg-accent hover:border-primary/30 active:scale-95 group cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="h-4 w-4 group-hover:translate-y-0.5 transition-transform duration-300" />
                    Download Resume
                  </div>
                </button>
              </div>

              {/* Quick Connect Social Links */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-background/50 rounded-xl border border-border">
                <h4 className="font-semibold mb-2 text-center text-xs sm:text-sm text-muted-foreground">Quick Connect</h4>
                <div className="flex flex-wrap justify-center gap-2">
                  {socialLinks.map((social, index) => (
                    <a key={index} href={social.href} target="_blank" rel="noopener noreferrer" className="p-2 bg-background rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 hover:scale-110 active:scale-95" aria-label={social.label || "Social link"}>
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Why Choose Me */}
            <div className="bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-primary/40 hover:bg-card/60 text-left">
              <h3 className="text-sm sm:text-lg font-bold mb-2.5 sm:mb-4 flex items-center gap-2"><Star className="h-4 w-4 text-primary" />Why Choose Me</h3>
              <div className="space-y-1.5 sm:space-y-2.5">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-1 rounded-lg transition-all duration-300 hover:bg-background/50">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shrink-0" />
                    <span className="text-[11px] sm:text-xs text-muted-foreground hover:text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobbies & Interests */}
            <div className="bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-xl transition-all duration-500 hover:border-primary/40 hover:bg-card/60 text-left">
              <h3 className="text-sm sm:text-lg font-bold mb-2.5 sm:mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4 text-primary" />
                Beyond Code
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {hobbies.map((hobby, index) => (
                  <div key={index} className="flex flex-col p-2 rounded-xl bg-background/40 border border-border/50 hover:bg-background/70 transition-colors duration-300">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <div className="text-primary scale-75 sm:scale-90">{hobby.icon}</div>
                      <span className="font-medium text-[11px] sm:text-xs truncate">{hobby.name}</span>
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-muted-foreground truncate">{hobby.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
