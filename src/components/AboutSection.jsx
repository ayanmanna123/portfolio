import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { achievements, tabContent, aboutData } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const aboutCardRef = useRef(null);
  const profileImgCardRef = useRef(null);
  const portalSectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(portalSectionRef.current, { 
          opacity: 1, 
          scale: 1, 
          clipPath: "inset(0% round 0px)", 
          pointerEvents: "auto" 
        });
        return;
      }

      // Initial entry animations when section first scrolls into view
      if (line1Ref.current) {
        gsap.fromTo(
          line1Ref.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (line2Ref.current) {
        gsap.fromTo(
          line2Ref.current,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
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
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ----------------------------------------------------------------------
      // MASTER SCROLL-DRIVEN CINEMATIC PIN & ZOOM TIMELINE
      // (Mirroring the Hero Section Zoom & Portal Reveal)
      // ----------------------------------------------------------------------
      const isMobile = window.innerWidth < 768;
      const targetScale = isMobile ? 18 : 28;

      const targetEl = profileImgCardRef.current;
      let moveX = 0;
      let moveY = 0;
      if (targetEl) {
        const rect = targetEl.getBoundingClientRect();
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        const vpCenterX = window.innerWidth / 2;
        const vpCenterY = window.innerHeight / 2;
        moveX = vpCenterX - targetCenterX;
        moveY = vpCenterY - targetCenterY;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=110%" : "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // PHASE 1: Fade out Header and Left Text Card smoothly
      tl.to(
        [headerRef.current, aboutCardRef.current],
        {
          opacity: 0,
          y: -35,
          filter: "blur(8px)",
          duration: 0.22,
          ease: "power2.inOut",
        },
        0
      );

      // PHASE 2: Translate and Scale Profile Picture Card into Viewport Center
      tl.to(
        profileImgCardRef.current,
        {
          x: moveX,
          y: moveY,
          scale: targetScale,
          borderRadius: "8px",
          boxShadow: "0 0 140px rgba(236,132,77,0.95)",
          ease: "power2.inOut",
          transformOrigin: "center center",
          duration: 0.75,
        },
        0.05
      );

      // Fade out inner picture elements so it smoothly turns into an orange canvas portal
      tl.to(
        ".profile-inner-img",
        {
          opacity: 0,
          scale: 0.5,
          filter: "blur(6px)",
          duration: 0.2,
          ease: "power1.out",
        },
        0.05
      );

      // PHASE 3: Portal Aperture reveals Next Section (Skills & Arsenal)
      tl.fromTo(
        portalSectionRef.current,
        {
          opacity: 0,
          scale: 0.6,
          clipPath: "inset(25% round 32px)",
          pointerEvents: "none",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% round 0px)",
          pointerEvents: "auto",
          ease: "power2.out",
          duration: 0.55,
        },
        0.35
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-center px-4 sm:px-8 lg:px-12 pt-12 pb-24 sm:pt-14 sm:pb-28 bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5"
    >
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-60 sm:w-96 h-60 sm:h-96 bg-[#EC844D]/10 rounded-full blur-3xl transition-all duration-1000 ease-out" 
          style={{ transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` }} 
        />
        <div 
          className="absolute w-52 sm:w-80 h-52 sm:h-80 bg-[#FFD8B2]/20 dark:bg-[#EC844D]/10 rounded-full blur-3xl transition-all duration-1500 ease-out" 
          style={{ transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)` }} 
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
        <div className="hidden sm:block absolute top-16 right-8 sm:top-20 sm:right-20 animate-float-3s">
          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#EC844D]/20 rounded-lg rotate-45" />
        </div>
        <div className="hidden sm:block absolute bottom-32 left-8 sm:bottom-40 sm:left-20 animate-float-3s animation-delay-2000">
          <div className="w-5 sm:w-6 h-5 sm:h-6 bg-[#EC844D]/20 rounded-full" />
        </div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 my-auto">
        {/* Header (Streamlined to fit comfortably in viewport) */}
        <div ref={headerRef} className="text-center mb-4 sm:mb-6 px-2 sm:px-4 will-change-[transform,opacity,filter]">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 leading-tight">
            <span ref={line1Ref} className="block text-foreground will-change-transform will-change-opacity">
              {aboutData?.title || "Transforming"}
            </span>
            <span
              ref={line2Ref}
              className="block font-rakyat text-2xl sm:text-3xl md:text-5xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-0.5 sm:mt-1 pb-1 font-normal will-change-transform will-change-opacity"
              style={{ fontFamily: "'Rakyat', cursive" }}
            >
              {aboutData?.subtitle || "Ideas Into Reality"}
            </span>
          </h2>
          <p
            ref={line3Ref}
            className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed will-change-transform will-change-opacity"
          >
            {aboutData?.bio || (
              <>Building digital experiences that combine <span className="text-primary font-semibold">innovation</span>, <span className="text-primary font-semibold">performance</span>, and <span className="text-primary font-semibold">elegance</span></>
            )}
          </p>
        </div>

        {/* 2 Separate Cards with a Space in Between */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          
          {/* Card 1 (Left): All Text, Achievements & Tabs */}
          <div
            ref={aboutCardRef}
            className="lg:col-span-7 bg-card/60 border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-7 backdrop-blur-xl shadow-lg transition-colors duration-300 hover:border-primary/40 flex flex-col justify-between text-left will-change-[transform,opacity,filter] relative overflow-hidden"
          >
            {/* Decorative Background Circles */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 right-0 w-28 h-28 bg-primary rounded-full -translate-y-12 translate-x-12" />
            </div>

            <div className="relative">
              {/* Name & Role */}
              <div className="mb-3 sm:mb-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
                  {aboutData?.name || "Ayan Manna"}
                </h3>
                <p className="text-primary text-xs sm:text-sm md:text-base font-semibold mt-0.5">
                  {aboutData?.role || "Full Stack Developer"}
                </p>
              </div>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-3.5 sm:mb-4">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className="p-2 sm:p-2.5 rounded-xl bg-background/60 border border-border/70 transition-all duration-300 hover:border-primary/40 shadow-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="scale-90 text-primary">{achievement.icon}</span>
                      <div>
                        <div className="font-bold text-xs sm:text-sm text-foreground">{achievement.number}{achievement.suffix}</div>
                        <div className="text-[10px] sm:text-[11px] text-muted-foreground leading-none">{achievement.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border/80 mb-2.5 sm:mb-3">
                {['personal', 'professional', 'approach'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-1.5 sm:py-2 px-2 text-[11px] sm:text-xs font-semibold transition-all duration-300 cursor-pointer ${
                      activeTab === tab 
                        ? 'text-primary border-b-2 border-primary font-bold' 
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-[50px] sm:min-h-[65px]">
                <AnimatePresence mode="sync">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed"
                  >
                    {tabContent[activeTab]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Card 2 (Right): Profile Picture in its own Separate Card (Zoom Target) */}
          <div
            ref={profileImgCardRef}
            className="lg:col-span-5 bg-card/60 border border-border/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-xl shadow-lg transition-colors duration-300 hover:border-primary/40 flex items-center justify-center will-change-[transform,opacity,box-shadow] relative overflow-hidden group min-h-[220px] lg:min-h-full"
          >
            {/* Decorative Background Circles */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-28 h-28 bg-primary rounded-full translate-x-8 translate-y-8" />
            </div>

            <div className="relative profile-inner-img will-change-[transform,opacity,filter]">
              {/* Glowing Ambient Aura */}
              <div 
                className="absolute -inset-3 bg-gradient-to-tr from-[#EC844D] via-[#F59E6B] to-[#FFD8B2] opacity-60 blur-lg group-hover:opacity-90 transition-opacity duration-500"
                style={{ borderRadius: "48% 52% 68% 32% / 38% 45% 55% 62%" }}
              />
              
              {/* Profile Picture Frame */}
              <div 
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-60 lg:h-60 overflow-hidden bg-gradient-to-tr from-[#EC844D] to-[#FFD8B2] p-1 shadow-xl transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-1 relative z-10"
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
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* PORTAL REVEAL OVERLAY (Camera passes through the orange portal)     */}
      {/* Reveals the Skills Section Entrance during the zoom                */}
      {/* ================================================================== */}
      <div
        ref={portalSectionRef}
        aria-label="Skills Section Portal View"
        className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/95 dark:bg-[#0c0c0f]/95 backdrop-blur-2xl px-4 sm:px-8 py-8 overflow-hidden pointer-events-none will-change-[transform,opacity,clip-path]"
        style={{ opacity: 0 }}
      >
        {/* Subtle Ambient Backlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#EC844D]/25 to-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EC844D]/15 border border-[#EC844D]/30 text-[#EC844D] text-xs font-mono uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNICAL ARSENAL & CORE CAPABILITIES</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-[1.15]">
            Mastery Built Through{" "}
            <span className="font-rakyat bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent block sm:inline mt-1 sm:mt-0">
              Deep Practice
            </span>
          </h2>

          <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            From <span className="text-foreground font-medium">real-time architectures</span> and modern frontend systems to <span className="text-foreground font-medium">deep learning pipelines</span>.
          </p>

          <div 
            onClick={() => {
              const skillsSection = document.getElementById("skills");
              if (skillsSection) {
                if (window.lenis) {
                  window.lenis.scrollTo(skillsSection, { offset: -40, duration: 1.2 });
                } else {
                  skillsSection.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="pt-3 flex items-center gap-2 text-xs font-mono text-[#EC844D] uppercase tracking-widest animate-bounce cursor-pointer pointer-events-auto"
          >
            <span>Explore Technical Arsenal</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};
