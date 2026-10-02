import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
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

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Line 1: "Transforming" - triggers on entering section
      if (line1Ref.current) {
        gsap.fromTo(
          line1Ref.current,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Line 2: "Ideas Into Reality" - triggers on entering section
      if (line2Ref.current) {
        gsap.fromTo(
          line2Ref.current,
          { y: 150, opacity: 0 },
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

      // Line 3: "Building digital experiences..." - requires deep scrolling
      if (line3Ref.current) {
        gsap.fromTo(
          line3Ref.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Left Card: Text & Achievements - Smooth entrance
      if (aboutCardRef.current) {
        gsap.fromTo(
          aboutCardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: aboutCardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Right Card: Profile Picture - Smooth entrance
      if (profileImgCardRef.current) {
        gsap.fromTo(
          profileImgCardRef.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.4,
            delay: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: profileImgCardRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative pt-6 sm:pt-10 md:pt-12 pb-14 sm:pb-20 md:pb-28 px-3 sm:px-6 lg:px-12 bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5 overflow-hidden"
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

      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
            <span ref={line1Ref} className="block text-foreground will-change-transform will-change-opacity">
              {aboutData?.title || "Transforming"}
            </span>
            <span
              ref={line2Ref}
              className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
              style={{ fontFamily: "'Rakyat', cursive" }}
            >
              {aboutData?.subtitle || "Ideas Into Reality"}
            </span>
          </h2>
          <p
            ref={line3Ref}
            className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
          >
            {aboutData?.bio || (
              <>Building digital experiences that combine <span className="text-primary font-semibold">innovation</span>, <span className="text-primary font-semibold">performance</span>, and <span className="text-primary font-semibold">elegance</span></>
            )}
          </p>
        </div>

        {/* 2 Separate Cards with a Space in Between */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Card 1 (Left): All Text, Achievements & Tabs */}
          <div
            ref={aboutCardRef}
            className="lg:col-span-7 bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 backdrop-blur-xl shadow-xl sm:shadow-2xl transition-colors duration-300 hover:border-primary/40 hover:bg-card/60 flex flex-col justify-between text-left will-change-transform will-change-opacity relative overflow-hidden"
          >
            {/* Decorative Background Circles */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute top-0 right-0 w-36 h-36 bg-primary rounded-full -translate-y-16 translate-x-16" />
            </div>

            <div className="relative">
              {/* Name & Role */}
              <h3 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight mb-1 sm:mb-2">
                {aboutData?.name || "Ayan Manna"}
              </h3>
              <p className="text-primary text-base sm:text-xl font-semibold mb-5 sm:mb-6">
                {aboutData?.role || "Full Stack Developer"}
              </p>

              {/* Achievements Grid */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5 mb-6">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className="p-3 sm:p-3.5 rounded-xl bg-background/60 border border-border/80 transition-all duration-300 hover:scale-[1.02] hover:border-primary/40 shadow-xs"
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="scale-95 sm:scale-105 text-primary">{achievement.icon}</span>
                      <div>
                        <div className="font-bold text-sm sm:text-base text-foreground">{achievement.number}{achievement.suffix}</div>
                        <div className="text-[11px] sm:text-xs text-muted-foreground leading-tight">{achievement.label}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-border mb-4">
                {['personal', 'professional', 'approach'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2 sm:py-2.5 px-2 text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
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
              <div className="min-h-[85px] sm:min-h-[105px]">
                <AnimatePresence mode="sync">
                  <motion.p
                    key={activeTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed"
                  >
                    {tabContent[activeTab]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Card 2 (Right): Profile Picture in its own Separate Card */}
          <div
            ref={profileImgCardRef}
            className="lg:col-span-5 bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-xl sm:shadow-2xl transition-colors duration-300 hover:border-primary/40 hover:bg-card/60 flex items-center justify-center will-change-transform will-change-opacity relative overflow-hidden group min-h-[350px] lg:min-h-full"
          >
            {/* Decorative Background Circles */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-primary rounded-full translate-x-12 translate-y-12" />
            </div>

            <div className="relative">
              {/* Glowing Ambient Aura */}
              <div 
                className="absolute -inset-4 bg-gradient-to-tr from-[#EC844D] via-[#F59E6B] to-[#FFD8B2] opacity-60 blur-xl group-hover:opacity-90 transition-opacity duration-500"
                style={{ borderRadius: "48% 52% 68% 32% / 38% 45% 55% 62%" }}
              />
              
              {/* Profile Picture Frame (Large & Crisp) */}
              <div 
                className="w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 overflow-hidden bg-gradient-to-tr from-[#EC844D] to-[#FFD8B2] p-1.5 shadow-2xl transition-all duration-500 group-hover:scale-[1.03] group-hover:rotate-1 relative z-10"
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
    </section>
  );
};
