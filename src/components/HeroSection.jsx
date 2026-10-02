import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HeroLeft } from "./HeroLeft";
import { HeroCodeTerminal } from "./HeroCodeTerminal";
import { Sparkles, ArrowDown } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);
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

      if (prefersReducedMotion) {
        gsap.set(portalSectionRef.current, { opacity: 1, scale: 1, clipPath: "inset(0% round 0px)", pointerEvents: "auto" });
        return;
      }

      const isMobile = window.innerWidth < 768;
      const targetScale = isMobile ? 24 : 42;
      const endScroll = isMobile ? "+=140vh" : "+=180vh";

      // Calculate translation offset so the CTA button centers exactly in the viewport
      const ctaEl = containerRef.current.querySelector(".hero-zoom-cta");
      let moveX = 0;
      let moveY = 0;
      if (ctaEl) {
        const rect = ctaEl.getBoundingClientRect();
        const ctaCenterX = rect.left + rect.width / 2;
        const ctaCenterY = rect.top + rect.height / 2;
        const vpCenterX = window.innerWidth / 2;
        const vpCenterY = window.innerHeight / 2;
        moveX = vpCenterX - ctaCenterX;
        moveY = vpCenterY - ctaCenterY;
      }

      // Create the Master Scroll-driven Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=100%" : "+=120%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // ----------------------------------------------------------------------
      // PHASE 1: Rapidly fade out ambient particles, hero text, and secondary UI
      // Fades out completely by 20% scroll progress to eliminate any text overlap!
      // ----------------------------------------------------------------------
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

      // ----------------------------------------------------------------------
      // PHASE 2: Translate and Scale the Orange CTA Card to Viewport Center
      // ----------------------------------------------------------------------
      tl.to(
        ".hero-zoom-cta",
        {
          x: moveX,
          y: moveY,
          scale: targetScale,
          borderRadius: "8px",
          boxShadow: "0 0 120px rgba(236,132,77,0.9)",
          ease: "power2.inOut",
          transformOrigin: "center center",
          duration: 0.75,
        },
        0.06
      );

      // Fade out inner text of button early so it smoothly turns into an orange canvas
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

      // ----------------------------------------------------------------------
      // PHASE 3: Portal Aperture reveals About Section Entrance
      // ----------------------------------------------------------------------
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
    },
    { scope: containerRef }
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-between px-3 sm:px-8 lg:px-12 xl:px-16 pt-5 sm:pt-6 lg:pt-8 pb-12 sm:pb-16 bg-transparent dark:bg-gradient-to-br dark:from-background dark:via-background/95 dark:to-[#EC844D]/10"
    >
        {/* Ambient Animated Particles & Grid */}
        <div ref={ambientBgRef} className="absolute inset-0 -z-10 overflow-hidden will-change-[transform,opacity]">
          <div className="hidden dark:block absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(236,132,77,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(236,132,77,0.08)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
          </div>

          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute bg-gradient-to-r from-[#EC844D]/15 to-[#FFD8B2]/20 rounded-2xl"
              style={{
                width: Math.random() * 40 + 15 + "px",
                height: Math.random() * 40 + 15 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                rotate: Math.random() * 360,
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 40],
                x: [0, (Math.random() - 0.5) * 30],
                opacity: [0.15, 0.35, 0.15],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: Math.random() * 6 + 4,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          <motion.div
            className="absolute top-16 left-5 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-gradient-to-r from-[#EC844D]/20 to-[#FFD8B2]/30 blur-[80px] sm:blur-[110px]"
            animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-16 right-5 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-gradient-to-r from-[#FFD8B2]/25 to-[#EC844D]/20 blur-[80px] sm:blur-[110px]"
            animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, delay: 2 }}
          />
        </div>

        {/* Top Spacer / Subtle Tag */}
        <div className="w-full flex justify-center hero-fade-element pt-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#EC844D]/25 bg-[#EC844D]/10 text-[#EC844D] text-[11px] font-mono tracking-wider uppercase backdrop-blur-md">
            <Sparkles className="w-3 h-3 animate-pulse" />
            <span>Portfolio 2026 Edition</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="w-full max-w-[1600px] mx-auto my-auto">
          <motion.div
            ref={ref}
            className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 lg:gap-14 xl:gap-16"
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
            {/* Left Side Content (With the Orange Zoom Button) */}
            <HeroLeft />

            {/* Right Side Code Terminal (Tagged to fade out as zoom engages) */}
            <div className="hero-fade-element w-full lg:w-auto flex-1 flex justify-center lg:justify-end">
              <HeroCodeTerminal />
            </div>
          </motion.div>
        </div>

        {/* Scroll Down Mouse Indicator */}
        <div
          ref={scrollIndicatorRef}
          className="relative z-20 flex flex-col items-center justify-center cursor-pointer pointer-events-auto pb-2"
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
          <div className="flex flex-col items-center gap-1.5 text-muted-foreground text-[10px] sm:text-xs font-mono tracking-widest uppercase">
            <span>Scroll to Enter</span>
            <div className="w-4 h-7 sm:w-5 sm:h-8 border-2 border-[#EC844D]/40 rounded-full flex justify-center hover:border-[#EC844D] transition-colors">
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-1.5 sm:h-2 bg-[#EC844D] rounded-full mt-1.5"
              />
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* PORTAL REVEAL OVERLAY (Camera passes through the orange CTA)       */}
        {/* Reveals the AboutSection Header during the zoom                     */}
        {/* ================================================================== */}
        <div
          ref={portalSectionRef}
          aria-label="About Section Portal View"
          className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-background/95 dark:bg-[#0c0c0f]/95 backdrop-blur-2xl px-4 sm:px-8 py-8 overflow-hidden pointer-events-none will-change-[transform,opacity,clip-path]"
          style={{ opacity: 0 }}
        >
          {/* Subtle Ambient Backlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-[#EC844D]/25 to-amber-500/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative z-10 max-w-4xl w-full mx-auto flex flex-col items-center text-center space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EC844D]/15 border border-[#EC844D]/30 text-[#EC844D] text-xs font-mono uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>About My Work</span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-foreground leading-tight">
              Transforming <span className="font-rakyat bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent">Ideas Into Reality</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Building digital experiences that combine <span className="text-foreground font-medium">innovation</span>, <span className="text-foreground font-medium">performance</span>, and <span className="text-foreground font-medium">elegance</span>.
            </p>
            <div className="pt-4 flex items-center gap-2 text-xs font-mono text-[#EC844D] uppercase tracking-widest animate-bounce">
              <span>Entering Profile</span>
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </div>
    </section>
  );
};

export default HeroSection;