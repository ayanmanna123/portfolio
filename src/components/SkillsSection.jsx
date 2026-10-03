import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2 } from "lucide-react";
import { skillsData, iconImages } from "@/data";

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

// Single Playing Card Component: ONLY mid position has border, side cards are borderless
const ToolkitCard = React.memo(({ skill, isActive, smoothProgress = 1, onClick }) => {
  const [imgError, setImgError] = useState(false);
  const meta = skillMetaMap[skill.name] || {
    color: "#EC844D",
    tag: (skill.category || "TECH").toUpperCase(),
    type: "Engineering"
  };

  const status = getProficiencyStatus(skill.level);
  const iconSrc = iconImages[skill.icon] || skill.icon;

  // Mid position detection: active or close to apex
  const isMid = isActive || smoothProgress > 0.88;

  const shadowGlow = isMid
    ? `0 24px 50px -10px rgba(236, 132, 77, 0.45), 0 0 0 1.5px rgba(236, 132, 77, 0.65)`
    : undefined;

  const glowOpacity = 0.12 + 0.45 * Math.pow(smoothProgress, 2);

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
      className="toolkit-card group relative select-none cursor-pointer transition-shadow duration-300 ease-out w-[160px] sm:w-[195px] md:w-[225px]"
      style={{
        aspectRatio: "295 / 417"
      }}
    >
      {/* Outer Card Body: border ONLY in mid position, side cards are border-transparent */}
      <div
        className={`relative w-full h-full rounded-[22px] p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
          isMid
            ? "border-2 border-[#EC844D] bg-card ring-4 ring-[#EC844D]/35 shadow-[0_22px_50px_rgba(236,132,77,0.35)]"
            : "border-2 border-transparent bg-card/90 shadow-md hover:shadow-lg"
        }`}
        style={{
          boxShadow: isMid ? shadowGlow : undefined
        }}
      >
        {/* Warm Theme Radial Glow scaling with depth proximity */}
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity duration-300 group-hover:opacity-60"
          style={{
            backgroundColor: meta.color || "#EC844D",
            opacity: glowOpacity
          }}
        />

        {/* Diagonal Light Sheen Glare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.04] via-white/[0.08] to-transparent pointer-events-none" />

        {/* Top Status Capsule Pill Badge */}
        <div className="relative z-10 flex justify-between items-center w-full">
          <span
            className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border transition-all duration-300"
            style={{
              borderColor: `${meta.color}60`,
              color: meta.color,
              backgroundColor: `${meta.color}15`,
              transform: isMid ? "scale(1.04)" : "scale(1)"
            }}
          >
            {status}
          </span>

          <span
            className={`text-[10px] sm:text-xs font-semibold tabular-nums transition-colors duration-300 ${
              isMid ? "text-foreground font-bold" : "text-muted-foreground"
            }`}
          >
            {skill.level}%
          </span>
        </div>

        {/* Centerpiece: Skill Brand Logo & Typography */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-1.5 text-center">
          {/* Logo container with warm glow */}
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center mb-2.5 transition-transform duration-300 ease-out group-hover:scale-110 shadow-sm bg-secondary/40 dark:bg-white/5 border border-border/40 dark:border-white/10"
            style={{
              boxShadow: `0 8px 24px -6px ${meta.color}40`,
              transform: isMid ? "scale(1.06)" : "scale(1)"
            }}
          >
            {!imgError && iconSrc ? (
              <img
                src={iconSrc}
                alt={skill.name}
                onError={() => setImgError(true)}
                className="w-7 h-7 sm:w-10 sm:h-10 object-contain drop-shadow"
                loading="lazy"
              />
            ) : (
              <Code2 className="w-7 h-7 sm:w-8 sm:h-8" style={{ color: meta.color }} />
            )}
          </div>

          {/* Skill Title */}
          <h3
            className={`font-extrabold text-sm sm:text-lg md:text-xl tracking-tight transition-colors duration-300 line-clamp-1 group-hover:text-primary ${
              isMid ? "text-foreground font-black" : "text-foreground/90 font-bold"
            }`}
            title={skill.name}
          >
            {skill.name}
          </h3>

          <p className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5 font-medium line-clamp-1">
            {meta.type}
          </p>

          {/* Micro Progress Bar with theme gradient */}
          <div className="w-20 sm:w-28 h-1.5 bg-secondary/50 rounded-full mt-2.5 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500 ease-out bg-gradient-to-r from-[#EC844D] to-[#FFD8B2]"
              style={{
                width: `${skill.level}%`,
                boxShadow: isMid ? "0 0 10px rgba(236,132,77,0.7)" : "none"
              }}
            />
          </div>
        </div>

        {/* Bottom Classification Solid Pill Badge */}
        <div className="relative z-10 flex justify-center w-full">
          <span
            className="px-3 py-1 sm:py-1.5 rounded-full text-[9px] sm:text-[11px] font-black tracking-wider uppercase shadow-sm transition-transform duration-300 group-hover:scale-105 bg-gradient-to-r from-[#EC844D] to-[#DE6F36] text-white"
            style={{
              transform: isMid ? "scale(1.05)" : "scale(1)"
            }}
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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const containerRef = useRef(null);
  const wheelRef = useRef(null);
  const dragStartXRef = useRef(0);
  const currentDragDeltaRef = useRef(0);
  const isTouchRef = useRef(false);

  // All skills displayed in the continuous horizontal journey
  const currentSkills = skillsData;
  const count = currentSkills.length;

  // Responsive Wheel Dimensions
  const [wheelConfig, setWheelConfig] = useState({
    radius: 1250,
    stepAngle: 10.5,
    apexTop: 70,
    containerHeight: 520,
    visibleAngle: 50,
    scrollPerCard: 300
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
          scrollPerCard: 240
        });
      } else if (width < 1024) {
        setWheelConfig({
          radius: 980,
          stepAngle: 12.5,
          apexTop: 60,
          containerHeight: Math.min(520, height * 0.6),
          visibleAngle: 46,
          scrollPerCard: 280
        });
      } else {
        setWheelConfig({
          radius: 1250,
          stepAngle: 10.5,
          apexTop: 70,
          containerHeight: Math.min(560, height * 0.62),
          visibleAngle: 50,
          scrollPerCard: 320
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Compute total vertical scroll distance to scrub through all cards
  const scrollDistance = Math.max(0, (count - 1) * wheelConfig.scrollPerCard);
  const trackHeight = count > 1 ? `calc(100vh + ${scrollDistance}px)` : "auto";

  // Master GSAP ScrollTrigger Pinned Lock & Scroll Scrubbing
  useEffect(() => {
    if (!trackRef.current || !stageRef.current) return;
    if (count <= 1) {
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
        scrub: 0.6,
        anticipatePin: 1,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [count, wheelConfig.scrollPerCard]);

  // Continuous floating index derived from vertical scroll progress
  // Scroll down -> cards move from RIGHT to LEFT continuously
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
    color: "#EC844D",
    tag: "TECH",
    type: "Engineering"
  };

  // Subtitle dynamically tracks the active card's category
  const activeCategory = activeSkill?.category || "all";
  const subtitleInfo = categorySubtitles[activeCategory] || categorySubtitles.all;

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="toolkit-wheel-section relative w-full bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5 selection:bg-[#EC844D] selection:text-white transition-colors duration-500"
    >
      {/* Scroll Track: Vertical height provides the scrub distance for pinning */}
      <div
        ref={trackRef}
        className="relative w-full"
        style={{ height: trackHeight }}
      >
        {/* Pinned Stage: Locks to 100vh during the horizontal card journey */}
        <div
          ref={stageRef}
          className="relative w-full overflow-hidden flex flex-col justify-between h-screen min-h-[660px] max-h-[1080px] py-4 sm:py-6 px-3 sm:px-6 lg:px-12"
        >
          {/* Portfolio Theme Ambient Background Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute w-60 sm:w-96 h-60 sm:h-96 bg-[#EC844D]/10 rounded-full blur-3xl" />
            <div className="absolute w-52 sm:w-80 h-52 sm:h-80 bg-[#FFD8B2]/20 dark:bg-[#EC844D]/10 rounded-full blur-3xl right-0 bottom-0" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
          </div>

          <div className="container mx-auto px-2 sm:px-6 relative z-10 max-w-6xl w-full flex-1 flex flex-col justify-between">
            {/* Section Header with Signature Portfolio Theme Typography */}
            <div className="text-center pt-2 sm:pt-4 mb-2 sm:mb-4 px-2 sm:px-6">
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-foreground">
                  Technical
                </span>
                <span
                  className="block font-rakyat text-2xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-0.5 sm:mt-1 pb-1 font-normal"
                  style={{ fontFamily: "'Rakyat', cursive" }}
                >
                  Toolkit & Skills
                </span>
              </h2>

              {/* Dynamic Category Subtitle that changes as you scroll */}
              <div className="h-6 sm:h-8 flex items-center justify-center overflow-hidden my-0.5">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeCategory}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs sm:text-sm md:text-base font-medium text-foreground/85"
                  >
                    {subtitleInfo.title}
                  </motion.p>
                </AnimatePresence>
              </div>

              <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed hidden sm:block">
                {subtitleInfo.desc}
              </p>
            </div>

            {/* Cinematic Scroll-Locked 3D Carousel with Soft Edge Dissolve */}
            <div className="relative flex-1 flex flex-col justify-between">
              {/* Wheel Viewport Container with Soft Vignette Gradient Mask to dissolve left/right cards */}
              <div
                ref={containerRef}
                className="toolkit-wheel-container relative w-full flex-1 select-none min-h-[380px]"
                style={{
                  perspective: "1800px",
                  transformStyle: "preserve-3d",
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
                    transform: "translate(-50%, 0)",
                    transformOrigin: "50% 50%",
                    transformStyle: "preserve-3d"
                  }}
                >
                  {currentSkills.map((skill, index) => {
                    // Scroll-controlled continuous horizontal movement: RIGHT -> LEFT
                    const relativeAngle = (index - rawIndex) * wheelConfig.stepAngle + dragOffset;
                    const isVisible = Math.abs(relativeAngle) <= wheelConfig.visibleAngle;

                    // Normalized distance from center (0.0 at center, 1.0 at visible limit)
                    const normalizedDist = Math.min(1, Math.abs(relativeAngle) / wheelConfig.visibleAngle);

                    // Smooth cosine easing curve for volumetric 3D carousel traveling
                    const smoothProgress = Math.cos((normalizedDist * Math.PI) / 2);

                    // 1. Scale: smoothly increases to 1.12 at center, reduces to 0.74 at edges
                    const scale = 0.74 + 0.38 * Math.pow(smoothProgress, 1.3);

                    // 2. Opacity: high (1.0) at center, smoothly decays to 0 at edges (cards slowly become invisible)
                    const opacity = isVisible ? Math.max(0, Math.pow(smoothProgress, 1.6)) : 0;

                    // 3. Depth-of-Field Blur: 0px at center, smoothly increases up to 4.8px in periphery
                    const blur = (1 - smoothProgress) * 4.8;

                    // 4. Subtle atmospheric brightness: center is radiant, periphery is softly dimmed
                    const brightness = 0.80 + 0.25 * smoothProgress;

                    // 5. 3D translateZ: brings center card forward toward the camera (+75px to -70px)
                    const translateZ = (smoothProgress - 0.5) * 150;

                    // 6. 3D Perspective Rotation: cards turn slightly inward towards viewer
                    const rotateY = -relativeAngle * 0.38;

                    // 7. Dynamic Z-Index: center card has highest priority
                    const zIndex = Math.round(15 + smoothProgress * 35);

                    const isCurrentActive = index === activeIndex;

                    return (
                      <div
                        key={skill.name}
                        className="toolkit-slot absolute inset-0 pointer-events-none"
                        style={{
                          transform: `rotate(${relativeAngle}deg)`,
                          transformOrigin: "50% 50%",
                          transformStyle: "preserve-3d",
                          visibility: isVisible && opacity > 0.01 ? "visible" : "hidden",
                          zIndex: zIndex
                        }}
                      >
                        {/* Card wrapper with 3D translation, depth blur, scale, and perspective */}
                        <div
                          className={`absolute top-0 left-1/2 pointer-events-auto ${
                            isDragging ? "transition-none" : "transition-transform duration-200 ease-out"
                          }`}
                          style={{
                            transform: `translate(-50%, -50%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                            transformStyle: "preserve-3d",
                            opacity: opacity,
                            filter: `blur(${blur.toFixed(1)}px) brightness(${brightness.toFixed(2)})`
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

              {/* Active Card Spotlight HUD */}
              <div className="mt-2 p-3 sm:p-4 rounded-2xl bg-card/85 border border-border/60 max-w-xl mx-auto backdrop-blur-md shadow-lg flex items-center justify-between gap-3 w-full">
                <div className="flex items-center gap-3 text-left">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 bg-secondary/50 border-[#EC844D]/30"
                  >
                    <img
                      src={iconImages[activeSkill.icon] || activeSkill.icon}
                      alt={activeSkill.name}
                      className="w-6 h-6 object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base text-foreground">{activeSkill.name}</h4>
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase bg-gradient-to-r from-[#EC844D] to-[#DE6F36]"
                      >
                        {activeMeta.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Proficiency: <span className="font-semibold text-foreground">{activeSkill.level}%</span> • {getProficiencyStatus(activeSkill.level)}
                    </p>
                  </div>
                </div>

                {/* Card Index Indicator */}
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-muted-foreground font-mono">
                    <span className="text-foreground font-bold">{String(activeIndex + 1).padStart(2, "0")}</span> / {String(count).padStart(2, "0")}
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