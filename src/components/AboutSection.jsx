import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Award, Briefcase, Zap, Code2, GitBranch, Heart } from 'lucide-react';
import { aboutData } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const aboutCardRef = useRef(null);
  const profileImgCardRef = useRef(null);
  const mobileProfileDialRef = useRef(null);
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

      // Initial entry animations when header scrolls into view
      if (line1Ref.current) {
        gsap.fromTo(
          line1Ref.current,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
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
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
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
      // SCROLL-DRIVEN PIN & ZOOM TIMELINE (Active on Mobile and Desktop)
      // ----------------------------------------------------------------------
      const isMobile = window.innerWidth < 768;
      const targetScale = isMobile ? 18 : 28;

      const getTargetEl = () => {
        if (isMobile) {
          return mobileProfileDialRef.current || profileImgCardRef.current;
        }
        return profileImgCardRef.current || mobileProfileDialRef.current;
      };

      const calculateAboutOffset = () => {
        const el = getTargetEl();
        if (!el) return { moveX: 0, moveY: 0 };
        const rect = el.getBoundingClientRect();
        const targetCenterX = rect.left + rect.width / 2;
        const targetCenterY = rect.top + rect.height / 2;
        const vpCenterX = window.innerWidth / 2;
        const vpCenterY = window.innerHeight / 2;
        return {
          moveX: vpCenterX - targetCenterX,
          moveY: vpCenterY - targetCenterY,
        };
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=85%" : "+=140%",
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 0.4 : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // PHASE 1: Fade out Header and Left Card Content (excluding the zooming dial)
      tl.to(
        [headerRef.current, ".about-fade-content"],
        {
          opacity: 0,
          y: -25,
          filter: "blur(6px)",
          duration: 0.22,
          ease: "power2.inOut",
        },
        0
      );

      // PHASE 2: Translate and Scale Profile Picture Card into Viewport Center
      const targetEl = getTargetEl();
      if (targetEl) {
        tl.to(
          targetEl,
          {
            x: () => calculateAboutOffset().moveX,
            y: () => calculateAboutOffset().moveY,
            scale: targetScale,
            borderRadius: isMobile ? "9999px" : "8px",
            boxShadow: "0 0 100px rgba(207,203,194,0.9)",
            ease: "power2.inOut",
            transformOrigin: "center center",
            duration: 0.75,
          },
          0.05
        );
      }

      // Fade out inner picture elements smoothly
      tl.to(
        ".profile-inner-img",
        {
          opacity: 0,
          scale: 0.6,
          filter: "blur(6px)",
          duration: 0.2,
          ease: "power1.out",
        },
        0.05
      );

      // PHASE 3: Portal Aperture reveals Next Section (Skills Entrance)
      tl.fromTo(
        portalSectionRef.current,
        {
          opacity: 0,
          scale: 0.7,
          clipPath: "inset(25% round 32px)",
          pointerEvents: "none",
        },
        {
          opacity: 1,
          scale: 1,
          clipPath: "inset(0% round 0px)",
          pointerEvents: "none",
          ease: "power2.out",
          duration: 0.55,
        },
        0.35
      );

      tl.fromTo(
        ".about-portal-heading",
        { opacity: 0, y: 40, filter: "blur(8px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power2.out" },
        0.45
      );

      tl.fromTo(
        ".about-portal-desc",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.35, ease: "power2.out" },
        0.52
      );

      tl.fromTo(
        ".about-portal-cta",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" },
        0.58
      );

    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef} 
      className="relative w-full min-h-screen overflow-x-clip overflow-y-visible flex flex-col justify-center px-4 sm:px-8 lg:px-12 pt-12 pb-24 sm:pt-14 sm:pb-28 bg-[#eae7e1] text-[#43413d] select-none transition-colors touch-pan-y"
    >
      {/* Exact Neumorphic Soft UI Styles from SoftUiWidgets.jsx */}
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

      <div className="container mx-auto max-w-5xl relative z-10 my-auto">
        {/* Header: Styled exactly like SoftUiGreeting */}
        <div ref={headerRef} className="text-center mb-4 sm:mb-8 px-2 sm:px-4 will-change-[transform,opacity,filter]">
          <div ref={line1Ref} className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1">
            <span className="w-2 h-2 rounded-full bg-[#f06292]" />
            <span>About.Me</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-1 leading-tight tracking-tight text-[#43413d]">
            <span>{aboutData?.title || "Transforming"} </span>
            <span
              ref={line2Ref}
              className="text-[#e59845] font-handwriting font-bold"
            >
              {aboutData?.subtitle || "Ideas Into Reality"}
            </span>
          </h2>

          <p
            ref={line3Ref}
            className="text-xs sm:text-sm text-[#78756e] font-medium font-handwriting max-w-xl mx-auto leading-relaxed mt-1"
          >
            {aboutData?.bio || "Building digital experiences that combine innovation, performance, and elegance."}
          </p>
        </div>

        {/* Main Soft UI Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-7 items-stretch">
          
          {/* Card 1 (Left / Primary Card on mobile) */}
          <div
            ref={aboutCardRef}
            className="lg:col-span-7 soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-5 sm:p-8 md:p-9 flex flex-col justify-between text-left relative overflow-hidden"
          >
            <div className="relative z-10 flex flex-col justify-center">
              
              {/* Mobile Profile Header Row with Circular Dial (< lg only) */}
              <div className="flex lg:hidden items-center gap-3.5 sm:gap-4 mb-3.5">
                <div
                  ref={mobileProfileDialRef}
                  className="shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-full soft-ui-raised p-1.5 flex items-center justify-center relative will-change-[transform,opacity,box-shadow]"
                >
                  <div className="absolute top-1 w-2 h-2 rounded-full bg-[#f06292] shadow-sm pointer-events-none" />
                  <div className="w-full h-full rounded-full soft-ui-inset p-1 flex items-center justify-center overflow-hidden">
                    <img
                      src={aboutData?.profileImage || "/profile-logo.jpeg"}
                      alt={aboutData?.name || "Ayan Manna"}
                      width="96"
                      height="96"
                      className="w-full h-full object-cover rounded-full profile-inner-img shadow-sm"
                    />
                  </div>
                </div>

                <div className="about-fade-content flex-1 min-w-0">
                  <h3 className="text-2xl sm:text-3xl font-black text-[#383a3d] font-digital tracking-tight truncate">
                    {aboutData?.name || "Ayan Manna"}
                  </h3>
                  <div className="soft-ui-inset-subtle rounded-full px-3 py-0.5 text-xs font-bold text-[#5a5751] font-handwriting inline-flex items-center gap-1.5 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e59845]" />
                    <span className="truncate">{aboutData?.role || "Full Stack Developer"}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#10b981] font-handwriting mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                    <span>Open for Opportunities</span>
                  </div>
                </div>
              </div>

              {/* Desktop Name & Role Badge (lg:block only) */}
              <div className="about-fade-content hidden lg:block mb-4">
                <h3 className="text-3xl sm:text-4xl font-black text-[#383a3d] font-digital tracking-tight">
                  {aboutData?.name || "Ayan Manna"}
                </h3>
                <div className="soft-ui-inset-subtle rounded-full px-3.5 py-1 text-xs font-bold text-[#5a5751] font-handwriting inline-flex items-center gap-1.5 mt-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e59845]" />
                  <span>{aboutData?.role || "Full Stack Developer"}</span>
                </div>
              </div>

              {/* Bio Paragraphs */}
              <div className="about-fade-content space-y-2 text-xs sm:text-[13px] md:text-sm text-[#66635d] font-normal leading-relaxed">
                <p>
                  Detail-oriented Web Developer with strong skills in modern frontend and backend architectures. Maintained 1500+ contributions on GitHub and solved 700+ LeetCode problems, demonstrating algorithmic problem-solving and rigorous engineering habits.
                </p>
                <p className="hidden sm:block">
                  Passionate about crafting intuitive interfaces, writing clean scalable code, and building experiences that live every day with ease.
                </p>
              </div>

              {/* 4 Clay Metric Chips */}
              <div className="about-fade-content grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
                {[
                  { label: "Hackathons", value: "8+", icon: Award, color: "text-[#e59845]" },
                  { label: "Projects", value: "14+", icon: Briefcase, color: "text-[#528cc7]" },
                  { label: "Freelancing", value: "1+", icon: Zap, color: "text-[#f06292]" },
                  { label: "LeetCode", value: "710+", icon: Code2, color: "text-[#3b8a6a]" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-2.5 sm:p-3 rounded-[20px] soft-ui-inset-subtle flex flex-col items-center justify-center text-center"
                  >
                    <item.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${item.color} mb-1`} />
                    <span className="text-sm sm:text-lg font-black text-[#383a3d] font-digital leading-none">
                      {item.value}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#78756e] font-handwriting mt-0.5 sm:mt-1">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2 (Right): Profile Picture Dial Frame (Desktop only) */}
          <div
            ref={profileImgCardRef}
            className="hidden lg:flex lg:col-span-5 soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 flex-col items-center justify-center will-change-[transform,opacity,box-shadow] relative overflow-hidden group min-h-full"
          >
            <div className="relative profile-inner-img will-change-[transform,opacity,filter] flex flex-col items-center">
              {/* Circular Soft UI Bevel Dial (inspired by SoftUiClock) */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full soft-ui-raised p-3 flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                {/* Center Pivot Accent Dot like SoftUiClock */}
                <div className="absolute top-2 w-2.5 h-2.5 rounded-full bg-[#f06292] shadow-sm pointer-events-none" />

                {/* Inset Circular Bezel */}
                <div className="w-full h-full rounded-full soft-ui-inset p-2 flex items-center justify-center overflow-hidden">
                  <img 
                    src={aboutData?.profileImage || "/profile-logo.jpeg"} 
                    alt={aboutData?.name || "Ayan Manna - Full-Stack Engineer"} 
                    loading="lazy"
                    decoding="async"
                    width="208"
                    height="208"
                    className="w-full h-full object-cover rounded-full shadow-sm"
                  />
                </div>
              </div>

              {/* Status Badge */}
              <div className="soft-ui-inset-subtle rounded-full px-4 py-1.5 mt-5 flex items-center gap-2 text-xs font-bold text-[#5a5751] font-handwriting">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                <span>Open for Opportunities</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ================================================================== */}
      {/* PORTAL REVEAL OVERLAY (Camera passes into the next section)        */}
      {/* ================================================================== */}
      <div
        ref={portalSectionRef}
        aria-label="Skills Section Portal View"
        className="flex absolute inset-0 z-40 flex-col items-center justify-center bg-[#eae7e1] px-4 sm:px-8 py-8 overflow-hidden pointer-events-none will-change-[transform,opacity,clip-path]"
        style={{ opacity: 0 }}
      >
        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting">
            <span className="w-2 h-2 rounded-full bg-[#f06292]" />
            <span>Next.Chapter</span>
          </div>

          <h2 className="about-portal-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#43413d] leading-[1.15] will-change-[transform,opacity,filter]">
            Mastery Built Through{" "}
            <span className="font-handwriting text-[#e59845] block sm:inline mt-1 sm:mt-0">
              Deep Practice
            </span>
          </h2>

          <p className="about-portal-desc text-[#78756e] font-handwriting text-base sm:text-xl max-w-2xl mx-auto leading-relaxed will-change-[transform,opacity,filter]">
            From real-time architectures and modern frontend systems to deep learning pipelines.
          </p>

          <div 
            onClick={() => {
              const skillsSection = document.getElementById("skills");
              if (skillsSection) {
                if (window.lenis && typeof window.lenis.scrollTo === "function") {
                  window.lenis.scrollTo(skillsSection, { offset: -40, duration: 1.2 });
                } else {
                  skillsSection.scrollIntoView({ behavior: "smooth" });
                }
              }
            }}
            className="about-portal-cta pt-2 flex items-center gap-2 text-xs font-bold text-[#e59845] font-handwriting uppercase tracking-wider animate-bounce cursor-pointer pointer-events-auto will-change-[transform,opacity]"
          >
            <span>Explore Technical Arsenal</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
