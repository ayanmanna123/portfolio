import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2 } from "lucide-react";
import { skillsData, iconImages } from "@/data";

gsap.registerPlugin(ScrollTrigger);

// Metadata map for each skill: brand color, classification tag, and category label
const skillMetaMap = {
  HTML: { color: "#e59845", tag: "MARKUP", type: "Core Web" },
  CSS: { color: "#43413d", tag: "STYLING", type: "Core Web" },
  JavaScript: { color: "#e59845", tag: "LANGUAGE", type: "Frontend / Full Stack" },
  SCSS: { color: "#f06292", tag: "PREPROCESSOR", type: "CSS Extension" },
  React: { color: "#43413d", tag: "LIBRARY", type: "Frontend UI" },
  Figma: { color: "#f06292", tag: "DESIGN", type: "UI / UX Design" },
  Bootstrap: { color: "#6d6a64", tag: "FRAMEWORK", type: "CSS Framework" },
  "Tailwind CSS": { color: "#43413d", tag: "FRAMEWORK", type: "Utility CSS" },
  Redux: { color: "#6d6a64", tag: "STATE MGMT", type: "State Container" },
  Python: { color: "#e59845", tag: "LANGUAGE", type: "Backend & AI" },
  C: { color: "#6d6a64", tag: "LANGUAGE", type: "Systems" },
  "C++": { color: "#43413d", tag: "LANGUAGE", type: "High-Performance" },
  MySQL: { color: "#e59845", tag: "DATABASE", type: "Relational DB" },
  MongoDB: { color: "#43413d", tag: "DATABASE", type: "NoSQL DB" },
  Express: { color: "#6d6a64", tag: "BACKEND", type: "Node.js Framework" },
  "MongoDB Atlas": { color: "#43413d", tag: "CLOUD DB", type: "Managed Database" },
  "VS Code": { color: "#43413d", tag: "DEV TOOL", type: "Code Editor" },
  Vite: { color: "#f06292", tag: "BUILD TOOL", type: "Next-Gen Bundler" },
  "Google Cloud": { color: "#e59845", tag: "CLOUD", type: "Cloud Platform" },
  Vercel: { color: "#43413d", tag: "DEPLOYMENT", type: "Edge Platform" },
  Netlify: { color: "#6d6a64", tag: "DEPLOYMENT", type: "Hosting & CI" },
  AWS: { color: "#e59845", tag: "CLOUD", type: "Cloud Infrastructure" },
  Git: { color: "#f06292", tag: "VCS", type: "Version Control" },
  GitHub: { color: "#43413d", tag: "PLATFORM", type: "Collaboration" },
  GitLab: { color: "#e59845", tag: "DEVOPS", type: "CI / CD DevOps" },
  n8n: { color: "#f06292", tag: "AUTOMATION", type: "Workflow Automation" },
  NumPy: { color: "#43413d", tag: "DATA SCIENCE", type: "Numerical Computing" },
  Pandas: { color: "#f06292", tag: "DATA ANALYSIS", type: "Data Wrangling" },
  OpenCV: { color: "#6d6a64", tag: "VISION", type: "Computer Vision" },
  Seaborn: { color: "#43413d", tag: "VISUALIZATION", type: "Statistical Graphics" },
  Matplotlib: { color: "#6d6a64", tag: "PLOTTING", type: "Data Visualization" },
  "Scikit-learn": { color: "#e59845", tag: "ML", type: "Machine Learning" },
  TensorFlow: { color: "#e59845", tag: "DEEP LEARNING", type: "ML Framework" },
  "BERT / NLP": { color: "#e59845", tag: "NLP / AI", type: "Language Models" },
  Transformers: { color: "#e59845", tag: "LLM / NLP", type: "Hugging Face" },
  PyTorch: { color: "#f06292", tag: "DEEP LEARNING", type: "Dynamic Tensors" },
  Keras: { color: "#f06292", tag: "NEURAL NETS", type: "Deep Learning" },
  "React Native": { color: "#43413d", tag: "MOBILE", type: "Cross-Platform" },
  "Android Studio": { color: "#43413d", tag: "IDE / MOBILE", type: "Android SDK" },
  Capacitor: { color: "#43413d", tag: "CROSS PLATFORM", type: "Native Web" },
  "Hugging Face": { color: "#e59845", tag: "AI HUB", type: "Model Repository" },
  LangChain: { color: "#43413d", tag: "AI AGENTS", type: "LLM Framework" },
  "OpenAI API": { color: "#43413d", tag: "GEN AI", type: "GPT & Embeddings" },
  LlamaIndex: { color: "#6d6a64", tag: "RAG", type: "Data for LLMs" },
  NCP: { color: "#e59845", tag: "AI COMPUTING", type: "Neural Policies" }
};

// Subtitle texts for each category
const categorySubtitles = {
  all: {
    title: "Full-Stack Arsenal & AI Architecture",
    desc: "Interactive 3D playing cards displaying engineering toolkits, languages, frameworks, and deep learning models"
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
    desc: "Cloud environments, continuous deployment pipelines, and developer workflows"
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

// Single Soft UI Playing Card Component
const ToolkitCard = React.memo(({ skill, isActive, smoothProgress = 1, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const meta = skillMetaMap[skill.name] || {
    color: "#e59845",
    tag: (skill.category || "TECH").toUpperCase(),
    type: "Engineering"
  };

  const iconSrc = iconImages[skill.icon] || skill.icon;
  const isMid = isActive || smoothProgress > 0.88;

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
      className="toolkit-card group relative select-none cursor-pointer transition-all duration-300 ease-out w-[165px] sm:w-[195px] md:w-[225px]"
      style={{
        aspectRatio: "295 / 417"
      }}
    >
      {/* Outer Card Body: Soft UI Clay with raised double shadow */}
      <div
        className={`relative w-full h-full rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 flex flex-col justify-between overflow-hidden transition-all duration-200 ${
          isMid
            ? "soft-ui-raised-card bg-[#eae7e1] border-2 border-[#e59845] shadow-[14px_14px_28px_#cfcbc2,-14px_-14px_28px_#ffffff]"
            : "soft-ui-raised bg-[#eae7e1] border border-[#dedad1]/60"
        }`}
        style={{
          willChange: "transform, opacity",
          backfaceVisibility: "hidden"
        }}
      >
        {/* Top: Classification Chip + Percentage Badge */}
        
        {/* Centerpiece: Sunken Debossed Icon Well & Typography */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-1 text-center">
          {/* Logo container with debossed soft UI well */}
          <div
            className="soft-ui-inset w-14 h-14 sm:w-18 sm:h-18 rounded-[20px] sm:rounded-[24px] flex items-center justify-center mb-2 bg-[#e4e1d9] p-3 transition-transform duration-300"
            style={{
              transform: isMid ? "scale(1.08)" : "scale(1)"
            }}
          >
            {!imgError && iconSrc ? (
              <img
                src={iconSrc}
                alt={skill.name}
                onError={() => setImgError(true)}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain drop-shadow-sm"
                loading="lazy"
              />
            ) : (
              <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#e59845]" />
            )}
          </div>

          {/* Skill Title */}
          <h3
            className={`font-black text-sm sm:text-base md:text-lg font-digital tracking-tight line-clamp-1 transition-colors ${
              isMid ? "text-[#383a3d]" : "text-[#55524c]"
            }`}
            title={skill.name}
          >
            {skill.name}
          </h3>

          <p className="text-[10px] sm:text-[11px] text-[#78756e] font-handwriting font-medium mt-0.5 line-clamp-1">
            {meta.type}
          </p>

          {/* Micro Progress Bar in debossed track */}
          <div className="w-24 sm:w-32 h-2.5 sm:h-3 soft-ui-inset rounded-full p-0.5 flex items-center overflow-hidden bg-[#e5e2da] mt-2">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-[#e59845] to-[#f06292]"
              style={{
                width: `${skill.level}%`
              }}
            />
          </div>
        </div>

        {/* Bottom Milestone Slot */}
        <div className="relative z-10 flex justify-center w-full">
          <div className="soft-ui-inset-subtle rounded-full px-3 py-1 flex items-center gap-1.5 bg-[#e6e3dc]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#f06292]" />
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#6d6a64] font-digital">
              {getProficiencyStatus(skill.level)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

ToolkitCard.displayName = "ToolkitCard";

export const SkillsSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const tabsContainerRef = useRef(null);
  const dragStartXRef = useRef(0);
  const currentDragDeltaRef = useRef(0);
  const isTouchRef = useRef(false);

  // All 20 skills rendered smoothly on the continuous 3D wheel
  const currentSkills = skillsData;
  const count = currentSkills.length;

  // Responsive Wheel Dimensions
  const [wheelConfig, setWheelConfig] = useState({
    radius: 1250,
    stepAngle: 10.5,
    apexTop: 70,
    containerHeight: 520,
    visibleAngle: 50,
    scrollPerCard: 170
  });

  // Calculate dimensions based on viewport width
  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (width < 640) {
        setWheelConfig({
          radius: 650,
          stepAngle: 16.5,
          apexTop: 50,
          containerHeight: Math.min(460, height * 0.55),
          visibleAngle: 48,
          scrollPerCard: 130
        });
      } else if (width < 1024) {
        setWheelConfig({
          radius: 980,
          stepAngle: 12.5,
          apexTop: 60,
          containerHeight: Math.min(520, height * 0.6),
          visibleAngle: 46,
          scrollPerCard: 150
        });
      } else {
        setWheelConfig({
          radius: 1250,
          stepAngle: 10.5,
          apexTop: 70,
          containerHeight: Math.min(560, height * 0.62),
          visibleAngle: 50,
          scrollPerCard: 170
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const rafIdRef = useRef(null);

  // Reset progress when category changes
  useEffect(() => {
    targetProgressRef.current = 0;
    currentProgressRef.current = 0;
    setScrollProgress(0);
  }, [selectedCategory]);

  // High-performance 120fps V-Sync requestAnimationFrame lerp loop
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;
      const target = targetProgressRef.current;
      const current = currentProgressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.00004) {
        currentProgressRef.current = current + diff * 0.16;
        setScrollProgress(currentProgressRef.current);
      } else if (current !== target) {
        currentProgressRef.current = target;
        setScrollProgress(target);
      }

      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Compute total vertical scroll distance to scrub through all cards
  const scrollDistance = Math.max(0, (count - 1) * wheelConfig.scrollPerCard);
  const trackHeight = count > 1 ? `calc(100vh + ${scrollDistance}px)` : "auto";

  // Master GSAP ScrollTrigger Pinned Lock & Ultra-Responsive Scrubbing
  useEffect(() => {
    if (!trackRef.current || !stageRef.current) return;
    if (count <= 1) {
      targetProgressRef.current = 0;
      currentProgressRef.current = 0;
      setScrollProgress(0);
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: stageRef.current,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        }
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [count, wheelConfig.scrollPerCard, selectedCategory]);

  const rawIndex = scrollProgress * Math.max(0, count - 1);
  const activeIndex = Math.min(count - 1, Math.max(0, Math.round(rawIndex)));

  // Smooth scroll jump to a specific card index
  const scrollToCard = useCallback((targetIndex) => {
    if (!trackRef.current || count <= 1) return;
    const clampedIndex = Math.max(0, Math.min(count - 1, targetIndex));
    const rect = trackRef.current.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const trackTop = rect.top + scrollTop;
    const trackH = trackRef.current.offsetHeight;
    const dist = trackH - window.innerHeight;
    const targetScroll = trackTop + (clampedIndex / (count - 1)) * dist;

    if (window.lenis) {
      window.lenis.scrollTo(targetScroll, {
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, [count]);

  // Pointer drag/swipe interactions
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
    const angleDelta = (deltaX / wheelConfig.radius) * (180 / Math.PI) * 0.9;
    setDragOffset(angleDelta);
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = currentDragDeltaRef.current;
    const threshold = 30;

    if (Math.abs(deltaX) > threshold) {
      const steps = Math.round(-dragOffset / wheelConfig.stepAngle);
      let targetIndex = activeIndex + steps;
      if (steps === 0) {
        targetIndex = deltaX > 0 ? activeIndex - 1 : activeIndex + 1;
      }
      scrollToCard(targetIndex);
    }

    setDragOffset(0);
    currentDragDeltaRef.current = 0;
  };

  const activeSkill = currentSkills[activeIndex] || currentSkills[0] || {};
  const activeMeta = skillMetaMap[activeSkill?.name] || {
    color: "#e59845",
    tag: "TECH",
    type: "Engineering"
  };

  const activeCategory = activeSkill?.category || "frontend";
  const subtitleInfo = categorySubtitles[activeCategory] || categorySubtitles.all;

  const categoryTabs = [
    { id: "all", label: "All Skills" },
    { id: "frontend", label: "Frontend" },
    { id: "backend", label: "Backend" },
    { id: "tools", label: "Tools & Cloud" },
    { id: "aiml", label: "AI & ML" },
    { id: "appdev", label: "Mobile" },
    { id: "deeplearning", label: "Deep Learning" }
  ];

  // Auto-scroll the pill strip to keep the active category visible
  useEffect(() => {
    if (tabsContainerRef.current) {
      const activeBtn = tabsContainerRef.current.querySelector('[data-active="true"]');
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
      }
    }
  }, [activeCategory]);

  const handleCategoryClick = useCallback((catId) => {
    if (catId === "all") {
      scrollToCard(0);
      return;
    }
    const targetIdx = currentSkills.findIndex((s) => s.category === catId);
    if (targetIdx !== -1) {
      scrollToCard(targetIdx);
    }
  }, [currentSkills, scrollToCard]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="toolkit-wheel-section relative w-full bg-[#eae7e1] text-[#43413d] select-none transition-colors duration-500 overflow-hidden"
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
            box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
          }
          .soft-ui-raised-card {
            background: #eae7e1;
            box-shadow: 12px 12px 24px #cfcbc2, -12px -12px 24px #ffffff;
          }
          .soft-ui-inset {
            background: #e4e1d9;
            box-shadow: inset 4px 4px 8px #cac5bb, inset -4px -4px 8px #ffffff;
          }
          .soft-ui-inset-subtle {
            background: #e6e3dc;
            box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
          }
        `
      }} />

      {/* Scroll Track: Vertical height provides the scrub distance for pinning */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: trackHeight }}
      >
        {/* Pinned Stage: Locks to 100vh during the horizontal card journey */}
        <div
          ref={stageRef}
          className="relative w-full overflow-hidden flex flex-col justify-between h-screen min-h-[660px] max-h-[1080px] py-4 sm:py-6 px-3 sm:px-6 lg:px-12 bg-[#eae7e1]"
        >
          <div className="container mx-auto px-2 sm:px-6 relative z-10 max-w-6xl w-full flex-1 flex flex-col justify-between">
            {/* Section Header with Soft UI Clay Typography */}
            <div className="text-center pt-2 sm:pt-3 mb-1 sm:mb-2 px-2 sm:px-6">
              <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1">
                <span className="w-2 h-2 rounded-full bg-[#f06292]" />
                <span>Skills.Arsenal</span>
              </div>

              <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-[#43413d]">
                <span className="block text-[#43413d]">
                  Technical
                </span>
                <span className="block font-handwriting text-2xl sm:text-4xl md:text-5xl text-[#e59845] font-bold mt-0.5 pb-0.5">
                  Toolkit & Expertise
                </span>
              </h2>

              {/* Dynamic Category Subtitle */}
              <div className="h-5 sm:h-6 flex items-center justify-center overflow-hidden my-0.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeCategory}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-xs sm:text-sm font-bold text-[#e59845] font-digital"
                  >
                    {subtitleInfo.title}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Category Filter Switcher - Soft UI Neumorphic Pill Strip */}
              <div className="w-full flex justify-center mt-2.5 mb-1.5 px-2 z-20 relative">
                <div ref={tabsContainerRef} className="soft-ui-inset bg-[#e4e1d9] p-1 sm:p-1.5 rounded-full border border-[#cdc8be]/60 max-w-full overflow-x-auto scrollbar-none flex items-center shadow-inner">
                  <div className="flex items-center gap-1 sm:gap-1.5 px-1 min-w-max">
                    {categoryTabs.map((cat) => {
                      const isSelected = cat.id === activeCategory || (cat.id === "all" && activeIndex === 0);
                      return (
                        <button
                          key={cat.id}
                          data-active={isSelected ? "true" : "false"}
                          onClick={() => handleCategoryClick(cat.id)}
                          className={`whitespace-nowrap shrink-0 px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                            isSelected
                              ? "soft-ui-inset-subtle bg-[#e6e3dc] text-[#e59845] font-digital font-black shadow-inner border border-[#cdc8be] scale-[1.03]"
                              : "soft-ui-raised bg-[#eae7e1] text-[#6d6a64] hover:text-[#e59845] font-handwriting border border-[#dedad1]/60 active:scale-95"
                          }`}
                        >
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" />
                          )}
                          <span>{cat.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Cinematic Scroll-Locked 3D Carousel with Soft Edge Dissolve */}
            <div className="relative flex-1 flex flex-col justify-between">
              {/* Wheel Viewport Container */}
              <div
                ref={containerRef}
                className="toolkit-wheel-container relative w-full flex-1 select-none min-h-[360px]"
                style={{
                  perspective: "1800px",
                  transformStyle: "preserve-3d",
                  willChange: "transform",
                  contain: "layout paint",
                  WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 8%, black 22%, black 78%, rgba(0,0,0,0.15) 92%, transparent 100%)",
                  maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 8%, black 22%, black 78%, rgba(0,0,0,0.15) 92%, transparent 100%)"
                }}
                onMouseDown={(e) => handlePointerDown(e.clientX, false)}
                onMouseMove={(e) => handlePointerMove(e.clientX)}
                onMouseUp={handlePointerUp}
                onMouseLeave={handlePointerUp}
                onTouchStart={(e) => handlePointerDown(e.touches[0].clientX, true)}
                onTouchMove={(e) => handlePointerMove(e.touches[0].clientX)}
                onTouchEnd={handlePointerUp}
              >
                {/* The Giant Rotating Wheel Element with 3D Transform */}
                <div
                  ref={wheelRef}
                  className="toolkit-wheel absolute rounded-full pointer-events-none"
                  style={{
                    width: `${wheelConfig.radius * 2}px`,
                    height: `${wheelConfig.radius * 2}px`,
                    left: "50%",
                    top: `${wheelConfig.apexTop + 140}px`,
                    transform: "translate3d(-50%, 0, 0)",
                    transformOrigin: "50% 50%",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                    backfaceVisibility: "hidden"
                  }}
                >
                  {currentSkills.map((skill, index) => {
                    const relativeAngle = (index - rawIndex) * wheelConfig.stepAngle + dragOffset;
                    
                    if (Math.abs(relativeAngle) > wheelConfig.visibleAngle + 6) {
                      return null;
                    }

                    const normalizedDist = Math.min(1, Math.abs(relativeAngle) / wheelConfig.visibleAngle);
                    const smoothProgress = Math.cos((normalizedDist * Math.PI) / 2);
                    const scale = 0.74 + 0.38 * Math.pow(smoothProgress, 1.3);
                    const opacity = Math.max(0, Math.pow(smoothProgress, 1.6));
                    if (opacity <= 0.01) return null;

                    const blur = (1 - smoothProgress) * 3.5;
                    const brightness = 0.88 + 0.15 * smoothProgress;
                    const translateZ = (smoothProgress - 0.5) * 150;
                    const rotateY = -relativeAngle * 0.38;
                    const zIndex = Math.round(15 + smoothProgress * 35);
                    const isCurrentActive = index === activeIndex;

                    const filterStyle = blur > 0.8
                      ? `blur(${Math.min(3, blur).toFixed(1)}px) brightness(${brightness.toFixed(2)})`
                      : brightness < 0.99 ? `brightness(${brightness.toFixed(2)})` : "none";

                    return (
                      <div
                        key={`${skill.name}-${skill.category}-${index}`}
                        className="toolkit-slot absolute inset-0 pointer-events-none"
                        style={{
                          transform: `rotate(${relativeAngle}deg)`,
                          transformOrigin: "50% 50%",
                          transformStyle: "preserve-3d",
                          willChange: "transform",
                          backfaceVisibility: "hidden",
                          zIndex: zIndex
                        }}
                      >
                        <div
                          className="absolute top-0 left-1/2 pointer-events-auto transition-none"
                          style={{
                            transform: `translate3d(-50%, -50%, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                            transformStyle: "preserve-3d",
                            willChange: "transform, opacity",
                            backfaceVisibility: "hidden",
                            opacity: opacity,
                            filter: filterStyle
                          }}
                        >
                          <ToolkitCard
                            skill={skill}
                            isActive={isCurrentActive}
                            smoothProgress={smoothProgress}
                            onClick={() => scrollToCard(index)}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Card Spotlight HUD - Soft UI Raised Bar */}
              <div className="mt-2 p-3 sm:p-4 rounded-[26px] soft-ui-raised-card bg-[#eae7e1] border border-[#dedad1] max-w-xl mx-auto shadow-md flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3 text-left">
                  <div className="w-11 h-11 rounded-[16px] soft-ui-inset bg-[#e4e1d9] flex items-center justify-center shrink-0 p-2">
                    <img
                      src={iconImages[activeSkill.icon] || activeSkill.icon}
                      alt={`${activeSkill.name} skill icon`}
                      loading="lazy"
                      decoding="async"
                      width="28"
                      height="28"
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base text-[#383a3d] font-digital">{activeSkill.name}</h4>
                      <span className="text-[9px] font-bold px-2.5 py-0.5 rounded-full text-[#e59845] soft-ui-inset-subtle bg-[#e6e3dc] uppercase font-handwriting">
                        {activeMeta.tag}
                      </span>
                    </div>
                    <p className="text-xs text-[#78756e] font-handwriting font-medium">
                      Proficiency: <span className="font-bold text-[#383a3d] font-digital">{activeSkill.level}%</span> • {getProficiencyStatus(activeSkill.level)}
                    </p>
                  </div>
                </div>

                {/* Card Index Indicator in Debossed Groove */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="soft-ui-inset-subtle rounded-full px-3 py-1 text-xs text-[#6d6a64] font-digital bg-[#e6e3dc]">
                    <span className="text-[#383a3d] font-black">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;