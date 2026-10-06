import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroLeft } from "./HeroLeft";
import { HeroCodeTerminal } from "./HeroCodeTerminal";
import { ArrowDown } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef(null);
  const ambientBgRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  const portalSectionRef = useRef(null);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // GSAP Scroll-Driven Zoom Animation
  useGSAP(
    () => {
      // Accessibility: Respect reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const isMobile = window.innerWidth < 768;
      const targetScale = isMobile ? 18 : 42;

      // Calculate translation offset so the CTA button centers exactly in the viewport
      const calculateHeroOffset = () => {
        const ctaEl = containerRef.current?.querySelector(".hero-zoom-cta");
        if (!ctaEl) return { moveX: 0, moveY: 0 };
        const rect = ctaEl.getBoundingClientRect();
        const ctaCenterX = rect.left + rect.width / 2;
        const ctaCenterY = rect.top + rect.height / 2;
        const vpCenterX = window.innerWidth / 2;
        const vpCenterY = window.innerHeight / 2;
        return {
          moveX: vpCenterX - ctaCenterX,
          moveY: vpCenterY - ctaCenterY,
        };
      };

      // Master Scroll-driven Timeline (Active on both Mobile and Desktop)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=85%" : "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: isMobile ? 0.4 : 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // PHASE 1: Fade out hero text & secondary UI
      tl.to(
        ".hero-fade-element",
        {
          opacity: 0,
          y: -40,
          filter: "blur(8px)",
          duration: 0.2,
          ease: "power2.inOut",
        },
        0
      )
        .to(
          scrollIndicatorRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.1,
            ease: "power1.out",
          },
          0
        )
        .to(
          ambientBgRef.current,
          {
            opacity: 0.05,
            scale: 1.25,
            duration: 0.5,
            ease: "none",
          },
          0
        );

      // PHASE 2: Translate and Scale the Soft UI CTA Card to Viewport Center
      tl.to(
        ".hero-zoom-cta",
        {
          x: () => calculateHeroOffset().moveX,
          y: () => calculateHeroOffset().moveY,
          scale: targetScale,
          borderRadius: "8px",
          boxShadow: "0 0 100px rgba(207,203,194,0.9)",
          ease: "power2.inOut",
          transformOrigin: "center center",
          duration: 0.75,
        },
        0.06
      );

      // Fade out inner text of button early so it smoothly turns into clay canvas
      tl.to(
        ".hero-cta-inner",
        {
          opacity: 0,
          scale: 0.6,
          filter: "blur(4px)",
          duration: 0.2,
          ease: "power1.out",
        },
        0.05
      );

      // PHASE 3: Portal Aperture reveals About Section Entrance
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
          pointerEvents: "none",
          ease: "power2.out",
          duration: 0.55,
        },
        0.35
      );

      // Heading Line 1: "Where Technical Precision Meets"
      tl.fromTo(
        ".portal-title-line1",
        { opacity: 0, y: 50, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.45, ease: "power3.out" },
        0.46
      );

      // Heading Line 2: "Creative Engineering" (Cursive warm caramel accent)
      tl.fromTo(
        ".portal-title-line2",
        { opacity: 0, y: 60, scale: 0.9, filter: "blur(12px)" },
        { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.5, ease: "power3.out" },
        0.52
      );

      // Description text
      tl.fromTo(
        ".portal-desc",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power2.out" },
        0.58
      );

      // Explore Case Studies cue
      tl.fromTo(
        ".portal-cta",
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.5)" },
        0.64
      );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full min-h-[100dvh] overflow-x-clip overflow-y-visible flex flex-col justify-between px-3 sm:px-8 lg:px-12 xl:px-16 pt-5 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 bg-[#eae7e1] text-[#2d2b28] touch-pan-y"
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
            box-shadow: 6px 6px 14px #cfcbc2, -6px -6px 14px #ffffff;
          }
          .soft-ui-raised-card {
            background: #eae7e1;
            box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
          }
          .soft-ui-inset {
            background: #e4e1d9;
            box-shadow: inset 3px 3px 6px #cac5bb, inset -3px -3px 6px #ffffff;
          }
          .soft-ui-inset-subtle {
            background: #e6e3dc;
            box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
          }
        `
      }} />

      {/* Ambient Organic Soft Clay Floating Accents */}
      <div ref={ambientBgRef} className="absolute inset-0 -z-10 overflow-hidden pointer-events-none will-change-[transform,opacity]">
        {/* Soft subtle grid */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(#dedad1_1px,transparent_1px),linear-gradient(90deg,#dedad1_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_45%,black,transparent)]" />

        {/* Tactile soft clay floating discs */}
        <motion.div
          className="absolute top-12 left-8 w-44 h-44 rounded-full soft-ui-inset-subtle opacity-60"
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-16 right-10 w-64 h-64 rounded-full soft-ui-inset-subtle opacity-50"
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Main Hero Grid */}
      <div className="w-full max-w-[1600px] mx-auto my-auto">
        <motion.div
          ref={ref}
          className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 sm:gap-12 lg:gap-14 xl:gap-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 },
            },
          }}
        >
          {/* Left Side Content (With the Soft UI Zoom CTA Button) */}
          <HeroLeft />

          {/* Right Side Code Terminal (Soft UI Clay Workstation - Desktop/Tablet) */}
          <div className="hero-fade-element hidden lg:flex w-full lg:w-auto flex-1 justify-center lg:justify-end">
            <HeroCodeTerminal />
          </div>
        </motion.div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-20 flex flex-col items-center justify-center cursor-pointer pointer-events-auto pb-1"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            if (window.lenis) {
              window.lenis.scrollTo(aboutSection, {
                offset: -40,
                duration: 1.3,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            } else {
              aboutSection.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
      >
        <div className="flex flex-col items-center gap-1.5 text-[#78756e] text-[10px] sm:text-xs font-digital font-bold tracking-widest uppercase">
          <span>Scroll to Explore</span>
          <div className="w-5 h-8 soft-ui-raised bg-[#eae7e1] border border-[#dedad1] rounded-full flex justify-center items-start pt-1.5 shadow-sm">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-2 bg-[#f06292] rounded-full shadow-[0_0_6px_rgba(240,98,146,0.8)]"
            />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* PORTAL REVEAL OVERLAY (Camera passes through the clay CTA)        */}
      {/* Reveals the AboutSection Entrance in pure Soft UI clay aesthetic   */}
      {/* ================================================================== */}
      <div
        ref={portalSectionRef}
        aria-label="About Section Portal View"
        className="flex absolute inset-0 z-40 flex-col items-center justify-center bg-[#eae7e1] px-4 sm:px-8 py-8 overflow-hidden pointer-events-none will-change-[transform,opacity,clip-path]"
        style={{ opacity: 0 }}
      >
        <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-5">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#2d2b28] leading-[1.15] font-digital">
            <span className="portal-title-line1 block will-change-[transform,opacity,filter]">
              Where Technical Precision Meets
            </span>{" "}
            <span 
              className="portal-title-line2 font-handwriting text-[#e59845] block mt-1 sm:mt-2 pb-1 will-change-[transform,opacity,filter]"
            >
              Creative Engineering
            </span>
          </h2>
          <p className="portal-desc text-[#5a5751] text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-mono will-change-[transform,opacity,filter]">
            Deep dives into <span className="text-[#2d2b28] font-bold">high-performance systems</span>, scalable architectures, and <span className="text-[#2d2b28] font-bold">pixel-crafted digital experiences</span>.
          </p>
          <div className="portal-cta pt-3 flex items-center gap-2 text-xs font-digital font-bold text-[#e59845] uppercase tracking-widest animate-bounce will-change-[transform,opacity]">
            <span>Explore Case Studies</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;