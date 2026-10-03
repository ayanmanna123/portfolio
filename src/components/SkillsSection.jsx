import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  LayoutGrid,
  Sparkles,
  Code2,
  SlidersHorizontal,
  Compass,
  Filter
} from "lucide-react";
import { skillsData, skillCategories, iconImages } from "@/data";

gsap.registerPlugin(ScrollTrigger);

// Metadata map for each skill: brand color, classification tag, and category label
const skillMetaMap = {
  HTML: { color: "#E34F26", tag: "MARKUP", type: "Core Web" },
  CSS: { color: "#1572B6", tag: "STYLING", type: "Core Web" },
  JavaScript: { color: "#F7DF1E", tag: "LANGUAGE", type: "Frontend / Full Stack" },
  SCSS: { color: "#CC6699", tag: "PREPROCESSOR", type: "CSS Extension" },
  React: { color: "#58C3DC", tag: "LIBRARY", type: "Frontend UI" },
  Figma: { color: "#F24E1E", tag: "DESIGN", type: "UI / UX Design" },
  Bootstrap: { color: "#7952B3", tag: "FRAMEWORK", type: "CSS Framework" },
  "Tailwind CSS": { color: "#38BDF8", tag: "FRAMEWORK", type: "Utility CSS" },
  Redux: { color: "#764ABC", tag: "STATE MGMT", type: "State Container" },
  Python: { color: "#3776AB", tag: "LANGUAGE", type: "Backend & AI" },
  C: { color: "#A8B9CC", tag: "LANGUAGE", type: "Systems" },
  "C++": { color: "#00599C", tag: "LANGUAGE", type: "High-Performance" },
  MySQL: { color: "#4479A1", tag: "DATABASE", type: "Relational DB" },
  MongoDB: { color: "#47A248", tag: "DATABASE", type: "NoSQL DB" },
  Express: { color: "#E5E7EB", tag: "BACKEND", type: "Node.js Framework" },
  "MongoDB Atlas": { color: "#00ED64", tag: "CLOUD DB", type: "Managed Database" },
  "VS Code": { color: "#007ACC", tag: "DEV TOOL", type: "Code Editor" },
  Vite: { color: "#646CFF", tag: "BUILD TOOL", type: "Next-Gen Bundler" },
  "Google Cloud": { color: "#4285F4", tag: "CLOUD", type: "Cloud Platform" },
  Vercel: { color: "#9CA3AF", tag: "DEPLOYMENT", type: "Edge Platform" },
  Netlify: { color: "#00C7B7", tag: "DEPLOYMENT", type: "Hosting & CI" },
  AWS: { color: "#FF9900", tag: "CLOUD", type: "Cloud Infrastructure" },
  Git: { color: "#F05032", tag: "VCS", type: "Version Control" },
  GitHub: { color: "#9CA3AF", tag: "PLATFORM", type: "Collaboration" },
  GitLab: { color: "#FC6D26", tag: "DEVOPS", type: "CI / CD DevOps" },
  n8n: { color: "#EA4B71", tag: "AUTOMATION", type: "Workflow Automation" },
  NumPy: { color: "#4DABCF", tag: "DATA SCIENCE", type: "Numerical Computing" },
  Pandas: { color: "#E70488", tag: "DATA ANALYSIS", type: "Data Wrangling" },
  OpenCV: { color: "#5C3EE8", tag: "VISION", type: "Computer Vision" },
  Seaborn: { color: "#748CAB", tag: "VISUALIZATION", type: "Statistical Graphics" },
  Matplotlib: { color: "#11557C", tag: "PLOTTING", type: "Data Visualization" },
  "Scikit-learn": { color: "#F7931E", tag: "ML", type: "Machine Learning" },
  TensorFlow: { color: "#FF6F00", tag: "DEEP LEARNING", type: "ML Framework" },
  Transformers: { color: "#FFD21E", tag: "LLM / NLP", type: "Hugging Face" },
  PyTorch: { color: "#EE4C2C", tag: "DEEP LEARNING", type: "Dynamic Tensors" },
  Keras: { color: "#D00000", tag: "NEURAL NETS", type: "Deep Learning" },
  "React Native": { color: "#61DAFB", tag: "MOBILE", type: "Cross-Platform" },
  "Android Studio": { color: "#3DDC84", tag: "IDE / MOBILE", type: "Android SDK" },
  Capacitor: { color: "#119EFF", tag: "CROSS PLATFORM", type: "Native Web" },
  "Hugging Face": { color: "#FFD21E", tag: "AI HUB", type: "Model Repository" },
  LangChain: { color: "#2E933C", tag: "AI AGENTS", type: "LLM Framework" },
  "OpenAI API": { color: "#10A37F", tag: "GEN AI", type: "GPT & Embeddings" },
  LlamaIndex: { color: "#A855F7", tag: "RAG", type: "Data for LLMs" },
  NCP: { color: "#EC844D", tag: "AI COMPUTING", type: "Neural Policies" }
};

// Subtitle texts for each category (inspired by Guillaume Zhu's creative discipline titles)
const categorySubtitles = {
  all: {
    title: "Full-Stack Arsenal & AI Architecture",
    desc: "Interactive playing cards displaying engineering toolkits, languages, frameworks, and deep learning models"
  },
  frontend: {
    title: "Creative Front-End & UI Engineering",
    desc: "Crafting fluid, high-fidelity interfaces with reactive motion and modern design systems"
  },
  backend: {
    title: "Backend Architecture & Distributed Systems",
    desc: "Architecting high-throughput APIs, scalable microservices, and persistent databases"
  },
  tools: {
    title: "DevOps, Cloud Infrastructure & Tooling",
    desc: "Cloud environments, continuous deployment pipelines, and developer developer workflows"
  },
  aiml: {
    title: "Machine Learning & Scientific Computing",
    desc: "Statistical modeling, predictive algorithms, data processing, and computer vision"
  },
  appdev: {
    title: "Mobile & Cross-Platform Development",
    desc: "Building native and hybrid mobile experiences for iOS and Android ecosystems"
  },
  deeplearning: {
    title: "Deep Learning, LLMs & Autonomous Agents",
    desc: "Large language models, generative AI pipelines, neural networks, and agentic workflows"
  }
};

const getProficiencyStatus = (level) => {
  if (level >= 88) return "MASTERED";
  if (level >= 78) return "EXPERIENCED";
  if (level >= 68) return "PROFICIENT";
  return "IN PROGRESS";
};

// Single Playing Card Component themed to the portfolio's aesthetic
const ToolkitCard = React.memo(({ skill, isActive, isGrid = false, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const meta = skillMetaMap[skill.name] || {
    color: "#EC844D",
    tag: (skill.category || "TECH").toUpperCase(),
    type: "Engineering"
  };

  const status = getProficiencyStatus(skill.level);
  const iconSrc = iconImages[skill.icon] || skill.icon;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={`toolkit-card group relative select-none cursor-pointer transition-all duration-300 ease-out ${
        isGrid ? "w-full max-w-[280px] mx-auto" : "w-[170px] sm:w-[210px] md:w-[240px]"
      }`}
      style={{
        aspectRatio: "295 / 417"
      }}
    >
      {/* Outer Card Body matching portfolio theme */}
      <div
        className={`relative w-full h-full rounded-[22px] p-4 sm:p-5 flex flex-col justify-between overflow-hidden border transition-all duration-300 ${
          isActive
            ? "border-[#EC844D] bg-card shadow-[0_20px_45px_rgba(236,132,77,0.35)] ring-2 ring-[#EC844D]/40"
            : "border-border/60 bg-card/95 hover:border-[#EC844D]/60 hover:shadow-lg hover:shadow-[#EC844D]/15"
        }`}
      >
        {/* Warm Theme Radial Glow */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 h-44 rounded-full blur-3xl opacity-25 dark:opacity-35 pointer-events-none transition-opacity duration-300 group-hover:opacity-50"
          style={{ backgroundColor: meta.color || "#EC844D" }}
        />

        {/* Diagonal Light Sheen Glare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-white/[0.08] to-transparent pointer-events-none" />

        {/* Top Status Capsule Pill Badge */}
        <div className="relative z-10 flex justify-between items-center w-full">
          <span
            className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border transition-colors duration-300"
            style={{
              borderColor: `${meta.color}60`,
              color: meta.color,
              backgroundColor: `${meta.color}15`
            }}
          >
            {status}
          </span>

          <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground tabular-nums">
            {skill.level}%
          </span>
        </div>

        {/* Centerpiece: Skill Brand Logo & Typography */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2 text-center">
          {/* Logo container with warm glow */}
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 ease-out group-hover:scale-110 shadow-sm bg-secondary/40 dark:bg-white/5 border border-border/50 dark:border-white/10"
            style={{
              boxShadow: `0 8px 24px -6px ${meta.color}35`
            }}
          >
            {!imgError && iconSrc ? (
              <img
                src={iconSrc}
                alt={skill.name}
                onError={() => setImgError(true)}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow"
                loading="lazy"
              />
            ) : (
              <Code2 className="w-8 h-8" style={{ color: meta.color }} />
            )}
          </div>

          {/* Skill Title */}
          <h3
            className="font-extrabold text-base sm:text-xl tracking-tight text-foreground transition-colors duration-300 line-clamp-1 group-hover:text-primary"
            title={skill.name}
          >
            {skill.name}
          </h3>

          <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 font-medium line-clamp-1">
            {meta.type}
          </p>

          {/* Micro Progress Bar with theme gradient */}
          <div className="w-24 sm:w-28 h-1.5 bg-secondary/50 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-[#EC844D] to-[#FFD8B2]"
              style={{
                width: `${skill.level}%`
              }}
            />
          </div>
        </div>

        {/* Bottom Classification Solid Pill Badge */}
        <div className="relative z-10 flex justify-center w-full">
          <span
            className="px-3.5 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider uppercase shadow-sm transition-transform duration-300 group-hover:scale-105 bg-gradient-to-r from-[#EC844D] to-[#DE6F36] text-white"
          >
            {meta.tag}
          </span>
        </div>
      </div>
    </div>
  );
});

ToolkitCard.displayName = "ToolkitCard";

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState("wheel"); // 'wheel' | 'grid'
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const dragStartXRef = useRef(0);
  const currentDragDeltaRef = useRef(0);
  const isTouchRef = useRef(false);

  // Filter skills for current category
  const currentSkills = useMemo(() => {
    if (activeCategory === "all") return skillsData;
    return skillsData.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  // Total count of current deck
  const count = currentSkills.length;

  // Responsive Wheel Dimensions
  const [wheelConfig, setWheelConfig] = useState({
    radius: 1250,
    stepAngle: 11,
    apexTop: 90,
    containerHeight: 660,
    visibleAngle: 36
  });

  // Calculate dimensions based on viewport width
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setWheelConfig({
          radius: 650,
          stepAngle: 16.5,
          apexTop: 70,
          containerHeight: 520,
          visibleAngle: 42
        });
      } else if (width < 1024) {
        setWheelConfig({
          radius: 980,
          stepAngle: 12.5,
          apexTop: 80,
          containerHeight: 600,
          visibleAngle: 38
        });
      } else {
        setWheelConfig({
          radius: 1300,
          stepAngle: 10.5,
          apexTop: 95,
          containerHeight: 680,
          visibleAngle: 35
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // When changing category, reset active index to center
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    setActiveIndex(0);
    setDragOffset(0);
  };

  // Step rotation helpers
  const nextCard = useCallback(() => {
    setActiveIndex((prev) => (prev + 1 < count ? prev + 1 : 0));
    setDragOffset(0);
  }, [count]);

  const prevCard = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 >= 0 ? prev - 1 : count - 1));
    setDragOffset(0);
  }, [count]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== "wheel") return;
      if (e.key === "ArrowRight") {
        nextCard();
      } else if (e.key === "ArrowLeft") {
        prevCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextCard, prevCard, viewMode]);

  // Pointer drag/swipe interactions for spinning the rotary wheel
  const handlePointerDown = (clientX, isTouch = false) => {
    setIsDragging(true);
    isTouchRef.current = isTouch;
    dragStartXRef.current = clientX;
    currentDragDeltaRef.current = 0;
  };

  const handlePointerMove = (clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - dragStartXRef.current;
    currentDragDeltaRef.current = deltaX;

    // Convert pixel deltaX into rotational angle
    const angleDelta = (deltaX / wheelConfig.radius) * (180 / Math.PI) * 0.9;
    setDragOffset(angleDelta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = currentDragDeltaRef.current;
    const threshold = 35; // minimum drag pixels to step

    if (Math.abs(deltaX) > threshold) {
      const steps = Math.round(-dragOffset / wheelConfig.stepAngle);
      let targetIndex = activeIndex + steps;

      if (steps === 0) {
        targetIndex = deltaX > 0 ? activeIndex - 1 : activeIndex + 1;
      }

      // Clamp target index
      targetIndex = Math.max(0, Math.min(count - 1, targetIndex));
      setActiveIndex(targetIndex);
    }

    setDragOffset(0);
    currentDragDeltaRef.current = 0;
  };

  // GSAP Entrance Animations matching the portfolio's signature ScrollTrigger header
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const filterContainerRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
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
              toggleActions: "play none none reverse"
            }
          }
        );
      }

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
              toggleActions: "play none none reverse"
            }
          }
        );
      }

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
              toggleActions: "play none none reverse"
            }
          }
        );
      }

      if (filterContainerRef.current) {
        gsap.fromTo(
          filterContainerRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: filterContainerRef.current,
              start: "top 76%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activeSkill = currentSkills[activeIndex] || currentSkills[0] || {};
  const activeMeta = skillMetaMap[activeSkill?.name] || {
    color: "#EC844D",
    tag: "TECH",
    type: "Engineering"
  };

  const subtitleInfo = categorySubtitles[activeCategory] || categorySubtitles.all;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="toolkit-wheel-section relative py-14 sm:py-20 md:py-28 px-3 sm:px-6 lg:px-12 bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5 overflow-hidden transition-colors duration-500"
    >
      {/* Portfolio Theme Ambient Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-60 sm:w-96 h-60 sm:h-96 bg-[#EC844D]/10 rounded-full blur-3xl" />
        <div className="absolute w-52 sm:w-80 h-52 sm:h-80 bg-[#FFD8B2]/20 dark:bg-[#EC844D]/10 rounded-full blur-3xl right-0 bottom-0" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
      </div>

      <div className="container mx-auto px-2 sm:px-6 relative z-10 max-w-6xl">
        {/* Section Header with Signature Portfolio Theme Typography */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 px-2 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EC844D]/10 border border-[#EC844D]/25 text-[#EC844D] dark:text-[#FFAE80] text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#EC844D]" />
            <span>Interactive Arsenal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
            <span ref={line1Ref} className="block text-foreground will-change-transform will-change-opacity">
              Technical
            </span>
            <span
              ref={line2Ref}
              className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
              style={{ fontFamily: "'Rakyat', cursive" }}
            >
              Toolkit & Skills
            </span>
          </h2>

          {/* Dynamic Category Subtitle */}
          <div className="h-8 sm:h-10 flex items-center justify-center overflow-hidden my-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={activeCategory}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-sm sm:text-lg md:text-xl font-medium text-foreground/85"
              >
                {subtitleInfo.title}
              </motion.p>
            </AnimatePresence>
          </div>

          <p
            ref={line3Ref}
            className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
          >
            {subtitleInfo.desc}
          </p>
        </div>

        {/* Category Filter Pills Container & View Mode Controls */}
        <div ref={filterContainerRef} className="will-change-transform will-change-opacity mb-8 sm:mb-12">
          {/* Desktop & Tablet Category Bar */}
          <div className="hidden sm:flex flex-wrap items-center justify-between gap-4 border-b border-border/40 pb-6">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium border border-transparent hover:shadow-lg transition-all cursor-pointer ${
                    activeCategory === category.id
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

            {/* View Mode Switcher */}
            <div className="flex items-center gap-1.5 bg-secondary/50 p-1.5 rounded-full border border-border/50 text-xs font-semibold shrink-0">
              <button
                onClick={() => setViewMode("wheel")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === "wheel"
                    ? "bg-[#EC844D] text-white font-bold shadow-md shadow-[#EC844D]/25"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>3D Wheel</span>
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#EC844D] text-white font-bold shadow-md shadow-[#EC844D]/25"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All Grid</span>
              </button>
            </div>
          </div>

          {/* Mobile Category Dropdown + Mode Toggle */}
          <div className="sm:hidden flex flex-col gap-3 max-w-xs mx-auto mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#EC844D]">
                <Filter className="h-4 w-4" />
              </div>
              <select
                value={activeCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-card border border-border text-foreground font-semibold text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#EC844D]/50 shadow-sm cursor-pointer"
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

            <div className="flex items-center justify-center gap-2 bg-secondary/50 p-1.5 rounded-full border border-border/50 text-xs font-semibold">
              <button
                onClick={() => setViewMode("wheel")}
                className={`flex-1 py-1.5 rounded-full text-center transition-all ${
                  viewMode === "wheel"
                    ? "bg-[#EC844D] text-white font-bold shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                3D Wheel
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex-1 py-1.5 rounded-full text-center transition-all ${
                  viewMode === "grid"
                    ? "bg-[#EC844D] text-white font-bold shadow-sm"
                    : "text-muted-foreground"
                }`}
              >
                All Grid
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Guillaume Zhu 3D Rotary Arch Wheel */}
        {viewMode === "wheel" ? (
          <div className="relative">
            {/* Wheel Viewport Container */}
            <div
              ref={containerRef}
              className="toolkit-wheel-container relative w-full overflow-hidden select-none"
              style={{
                height: `${wheelConfig.containerHeight}px`
              }}
              onMouseDown={(e) => handlePointerDown(e.clientX, false)}
              onMouseMove={(e) => handlePointerMove(e.clientX)}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, true)}
              onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
              onTouchEnd={handlePointerUp}
            >
              {/* Top Horizon Line Subtle Arc Guide */}
              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full border border-[#EC844D]/15 pointer-events-none opacity-40 dark:opacity-20"
                style={{
                  top: `${wheelConfig.apexTop + 140}px`,
                  width: `${wheelConfig.radius * 2}px`,
                  height: `${wheelConfig.radius * 2}px`
                }}
              />

              {/* The Giant Rotating Wheel Element */}
              <div
                ref={wheelRef}
                className="toolkit-wheel absolute rounded-full pointer-events-none transition-transform"
                style={{
                  width: `${wheelConfig.radius * 2}px`,
                  height: `${wheelConfig.radius * 2}px`,
                  left: "50%",
                  top: `${wheelConfig.apexTop + 140}px`,
                  transform: "translate(-50%, 0)",
                  transformOrigin: "50% 50%"
                }}
              >
                {currentSkills.map((skill, index) => {
                  // Angle of this slot relative to active index
                  const relativeIndex = index - activeIndex;
                  const cardAngle = relativeIndex * wheelConfig.stepAngle + dragOffset;
                  const isVisible = Math.abs(cardAngle) <= wheelConfig.visibleAngle;
                  const isCurrentActive = index === activeIndex;

                  // Dynamic scaling and opacity based on distance from center
                  const normalizedAngle = Math.abs(cardAngle);
                  const scale = isCurrentActive
                    ? 1.05
                    : Math.max(0.72, 1 - (normalizedAngle / wheelConfig.visibleAngle) * 0.28);
                  const opacity = isVisible
                    ? isCurrentActive
                      ? 1
                      : Math.max(0.35, 1 - (normalizedAngle / wheelConfig.visibleAngle) * 0.65)
                    : 0;

                  return (
                    <div
                      key={skill.name}
                      className="toolkit-slot absolute inset-0 pointer-events-none"
                      style={{
                        transform: `rotate(${cardAngle}deg)`,
                        transformOrigin: "50% 50%",
                        visibility: isVisible ? "visible" : "hidden",
                        zIndex: isCurrentActive ? 30 : Math.round(20 - normalizedAngle)
                      }}
                    >
                      {/* Card positioned at the top circumference of this slot */}
                      <div
                        className="absolute top-0 left-1/2 pointer-events-auto transition-transform duration-200"
                        style={{
                          transform: `translate(-50%, -50%) scale(${scale})`,
                          opacity: opacity
                        }}
                      >
                        <ToolkitCard
                          skill={skill}
                          isActive={isCurrentActive}
                          onClick={() => {
                            setActiveIndex(index);
                            setDragOffset(0);
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Left & Right Floating Arch Navigation Arrows */}
              <button
                onClick={prevCard}
                aria-label="Previous Skill Card"
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/95 border border-border/80 text-foreground flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-40 backdrop-blur-md cursor-pointer hover:border-[#EC844D] hover:text-[#EC844D]"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={nextCard}
                aria-label="Next Skill Card"
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/95 border border-border/80 text-foreground flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all z-40 backdrop-blur-md cursor-pointer hover:border-[#EC844D] hover:text-[#EC844D]"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Bottom Drag Instruction Hint */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2 text-xs text-muted-foreground/80 bg-card/75 backdrop-blur px-4 py-1.5 rounded-full border border-border/40 shadow-sm">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#EC844D]" />
                <span>Drag horizontally or use arrows to spin the wheel</span>
              </div>
            </div>

            {/* Active Card Spotlight HUD */}
            <div className="mt-4 p-4 sm:p-6 rounded-2xl bg-card/85 border border-border/60 max-w-2xl mx-auto backdrop-blur-md shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-left">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center border shrink-0 bg-secondary/50 border-[#EC844D]/30"
                >
                  <img
                    src={iconImages[activeSkill.icon] || activeSkill.icon}
                    alt={activeSkill.name}
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg text-foreground">{activeSkill.name}</h4>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white uppercase bg-gradient-to-r from-[#EC844D] to-[#DE6F36]"
                    >
                      {activeMeta.tag}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Proficiency: <span className="font-semibold text-foreground">{activeSkill.level}%</span> • {getProficiencyStatus(activeSkill.level)}
                  </p>
                </div>
              </div>

              {/* Card Index Indicator */}
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs text-muted-foreground font-mono">
                  <span className="text-foreground font-bold">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={prevCard}
                    className="p-1.5 rounded-lg border border-border hover:bg-secondary transition-colors cursor-pointer hover:border-[#EC844D]"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextCard}
                    className="p-1.5 rounded-lg border border-border hover:bg-secondary transition-colors cursor-pointer hover:border-[#EC844D]"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* View Mode 2: Responsive Grid Deck */
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-4"
          >
            {currentSkills.map((skill) => (
              <ToolkitCard
                key={skill.name}
                skill={skill}
                isActive={false}
                isGrid={true}
              />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};