import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Calendar, Award, ArrowRight, ArrowUpRight, ExternalLink, Github,
  ChevronUp, Star, Code, Play, Eye, X, Info, Bookmark
} from 'lucide-react';
import { educationData, projects, categoryColors, logo } from '../data';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { VideoPlayer } from './VideoPlayer';

gsap.registerPlugin(ScrollTrigger);

// Curated portfolio theme particle palette
const PARTICLE_PALETTE = [
  '#EC844D', // Portfolio Signature Terracotta
  '#FFAE80', // Radiant Warm Amber
  '#FFD8B2', // Soft Peach Accent
  '#F59E6B', // Mid Orange Gradient
  '#FFFFFF', // Digital Sparkle Highlight
  '#DE6F36', // Deep Terracotta
];

export const EducationToProjectsMorph = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const stageRef = useRef(null);
  const canvasRef = useRef(null);

  // Scroll & Animation State
  const [scrollProgress, setScrollProgress] = useState(0);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const rafIdRef = useRef(null);
  const particlesRef = useRef([]);

  // ==========================================
  // REAL PROJECTS SECTION STATE & HANDLERS
  // ==========================================
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDeepDiveProject, setSelectedDeepDiveProject] = useState(null);

  // Responsive Viewport Dimensions
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter & Displayed Projects calculation
  const filteredProjects = useMemo(() => {
    return activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const displayedProjects = useMemo(() => {
    return showAll ? filteredProjects : filteredProjects.slice(0, 3);
  }, [showAll, filteredProjects]);

  const categories = useMemo(() => {
    return ["All", ...new Set(projects.map((project) => project.category))];
  }, []);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setShowAll(false);
  };

  const handleVideoPlay = (project) => {
    setSelectedVideo(project);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleOpenDeepDive = (project) => {
    setSelectedDeepDiveProject(project);
  };

  const handleCloseDeepDive = () => {
    setSelectedDeepDiveProject(null);
  };

  // Highlights subcomponent - compact 2 items
  const ProjectHighlights = ({ highlights }) => (
    <div className="space-y-1">
      {highlights.slice(0, 2).map((highlight, index) => (
        <div key={index} className="flex items-center gap-1.5 text-xs">
          <div className="w-1.5 h-1.5 bg-[#EC844D] rounded-full shrink-0" />
          <span className="text-muted-foreground line-clamp-1">{highlight}</span>
        </div>
      ))}
    </div>
  );

  // Responsive scroll scrub distance
  const scrollDistance = useMemo(() => {
    if (viewport.width < 640) return 1400;
    if (viewport.width < 1024) return 1800;
    return 2200;
  }, [viewport.width]);

  // =========================================================================
  // ADVANCED PARTICLE MORPHING ALGORITHM:
  // Samples real Academic element coordinates and morphs them to real Projects element coordinates
  // =========================================================================
  const generateParticles = useCallback((w, h) => {
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;

    const totalCount = isMobile ? 950 : isTablet ? 1750 : 3000;
    const particles = [];
    const rnd = (min, max) => min + Math.random() * (max - min);

    // Header Dimensions (compact coordinates so cards fit 100% on viewport)
    const acadH1 = { x: w * 0.5, y: Math.max(48, h * 0.08), w: isMobile ? 180 : 260 };
    const acadH2 = { x: w * 0.5, y: Math.max(84, h * 0.13), w: isMobile ? 260 : 420 };
    const acadH3 = { x: w * 0.5, y: Math.max(120, h * 0.18), w: isMobile ? 240 : 360 };

    const projH1 = { x: w * 0.5, y: Math.max(46, h * 0.075), w: isMobile ? 160 : 230 };
    const projH2 = { x: w * 0.5, y: Math.max(80, h * 0.12), w: isMobile ? 220 : 340 };
    const projH3 = { x: w * 0.5, y: Math.max(114, h * 0.165), w: isMobile ? 250 : 420 };

    // 1. Line 1: "Academic" -> "Featured"
    const h1Count = Math.round(totalCount * 0.08);
    for (let i = 0; i < h1Count; i++) {
      const u = i / h1Count;
      const x0 = acadH1.x + (u - 0.5) * acadH1.w + rnd(-8, 8);
      const y0 = acadH1.y + rnd(-10, 10);
      const x1 = projH1.x + (u - 0.5) * projH1.w + rnd(-8, 8);
      const y1 = projH1.y + rnd(-10, 10);

      particles.push({
        x0, y0, x1, y1,
        midX: (x0 + x1) * 0.5 + rnd(-60, 60),
        midY: (y0 + y1) * 0.5 - rnd(60, 160),
        scatterAmpX: rnd(20, 65),
        scatterAmpY: rnd(25, 75),
        phase: rnd(0, Math.PI * 2),
        freq: rnd(1.8, 3.2),
        tStart: rnd(0.08, 0.20),
        tEnd: rnd(0.55, 0.70), // "Featured" arrives 1st
        radius: rnd(1.2, 2.3),
        color: PARTICLE_PALETTE[Math.floor(rnd(0, PARTICLE_PALETTE.length))],
        type: 'h1',
      });
    }

    // 2. Line 2: "Education & Degrees" (cursive) -> "Projects" (cursive)
    const h2Count = Math.round(totalCount * 0.13);
    for (let i = 0; i < h2Count; i++) {
      const u = i / h2Count;
      const x0 = acadH2.x + (u - 0.5) * acadH2.w + rnd(-10, 10);
      const y0 = acadH2.y + rnd(-14, 14);
      const x1 = projH2.x + (u - 0.5) * projH2.w + rnd(-10, 10);
      const y1 = projH2.y + rnd(-14, 14);

      particles.push({
        x0, y0, x1, y1,
        midX: (x0 + x1) * 0.5 + rnd(-80, 80),
        midY: (y0 + y1) * 0.5 - rnd(70, 200),
        scatterAmpX: rnd(30, 85),
        scatterAmpY: rnd(35, 95),
        phase: rnd(0, Math.PI * 2),
        freq: rnd(1.9, 3.5),
        tStart: rnd(0.12, 0.24),
        tEnd: rnd(0.60, 0.76), // "Projects" arrives 2nd
        radius: rnd(1.3, 2.6),
        color: Math.random() > 0.25 ? '#EC844D' : '#FFAE80',
        type: 'h2',
      });
    }

    // 3. Line 3: Academic Subtitle -> Projects Subtitle
    const h3Count = Math.round(totalCount * 0.08);
    for (let i = 0; i < h3Count; i++) {
      const u = i / h3Count;
      const x0 = acadH3.x + (u - 0.5) * acadH3.w + rnd(-6, 6);
      const y0 = acadH3.y + rnd(-8, 8);
      const x1 = projH3.x + (u - 0.5) * projH3.w + rnd(-6, 6);
      const y1 = projH3.y + rnd(-8, 8);

      particles.push({
        x0, y0, x1, y1,
        midX: (x0 + x1) * 0.5 + rnd(-65, 65),
        midY: (y0 + y1) * 0.5 - rnd(55, 175),
        scatterAmpX: rnd(20, 60),
        scatterAmpY: rnd(25, 70),
        phase: rnd(0, Math.PI * 2),
        freq: rnd(2.0, 3.6),
        tStart: rnd(0.14, 0.28),
        tEnd: rnd(0.65, 0.80), // Description arrives 3rd
        radius: rnd(1.1, 2.2),
        color: '#FFD8B2',
        type: 'h3',
      });
    }

    // 4. Cards Geometry (3 Columns on Desktop, Responsive Grid)
    const cardPool = totalCount - particles.length;
    const perCard = Math.floor(cardPool / 3);

    const maxContainerW = Math.min(1280, w - (isMobile ? 24 : 64));
    const cardGap = isMobile ? 14 : isTablet ? 18 : 24;
    const cardW = isMobile ? maxContainerW : isTablet ? (maxContainerW - cardGap) / 2 : (maxContainerW - cardGap * 2) / 3;
    const cardH = isMobile ? Math.min(290, h * 0.42) : Math.min(340, h * 0.48);
    const cardTopY = Math.max(projH3.y + 36, h * 0.23);

    for (let c = 0; c < 3; c++) {
      let cardX0, cardX1;
      let cardY0 = cardTopY + cardH * 0.5;
      let cardY1 = cardTopY + cardH * 0.5;

      if (isMobile) {
        cardX0 = w * 0.5;
        cardX1 = w * 0.5;
        cardY0 = cardTopY + cardH * 0.5 + (c - 1) * 18;
        cardY1 = cardY0;
      } else if (isTablet) {
        if (c < 2) {
          cardX0 = (w - maxContainerW) * 0.5 + c * (cardW + cardGap) + cardW * 0.5;
        } else {
          cardX0 = w * 0.5;
          cardY0 = cardTopY + cardH * 0.5 + 30;
        }
        cardX1 = cardX0;
        cardY1 = cardY0;
      } else {
        cardX0 = (w - maxContainerW) * 0.5 + c * (cardW + cardGap) + cardW * 0.5;
        cardX1 = cardX0;
      }

      for (let i = 0; i < perCard; i++) {
        const randZone = Math.random();
        let relX0 = 0, relY0 = 0;
        let relX1 = 0, relY1 = 0;

        if (randZone < 0.40) {
          // Perimeter Border of Card
          const perimeterU = rnd(0, 4);
          const halfW = cardW * 0.48;
          const halfH = cardH * 0.48;
          if (perimeterU < 1) {
            relX0 = (perimeterU - 0.5) * 2 * halfW;
            relY0 = -halfH;
          } else if (perimeterU < 2) {
            relX0 = halfW;
            relY0 = (perimeterU - 1.5) * 2 * halfH;
          } else if (perimeterU < 3) {
            relX0 = (2.5 - perimeterU) * 2 * halfW;
            relY0 = halfH;
          } else {
            relX0 = -halfW;
            relY0 = (3.5 - perimeterU) * 2 * halfH;
          }
          relX1 = relX0;
          relY1 = relY0;
        } else if (randZone < 0.60) {
          // Top Badges & Icons
          const isLeft = Math.random() > 0.5;
          if (isLeft) {
            relX0 = -cardW * 0.35 + rnd(-16, 16);
            relY0 = -cardH * 0.36 + rnd(-16, 16);
            relX1 = -cardW * 0.35 + rnd(-18, 18);
            relY1 = -cardH * 0.36 + rnd(-12, 12);
          } else {
            relX0 = cardW * 0.32 + rnd(-24, 24);
            relY0 = -cardH * 0.36 + rnd(-8, 8);
            relX1 = cardW * 0.32 + rnd(-24, 24);
            relY1 = -cardH * 0.36 + rnd(-8, 8);
          }
        } else if (randZone < 0.85) {
          // Content lines & Titles
          const lineIndex = Math.floor(rnd(0, 4));
          const lineY = -cardH * 0.16 + lineIndex * (cardH * 0.18);
          relX0 = rnd(-cardW * 0.42, cardW * 0.42);
          relY0 = lineY + rnd(-4, 4);
          relX1 = rnd(-cardW * 0.42, cardW * 0.42);
          relY1 = lineY + rnd(-4, 4);
        } else {
          // Internal surface shimmers
          relX0 = rnd(-cardW * 0.44, cardW * 0.44);
          relY0 = rnd(-cardH * 0.44, cardH * 0.44);
          relX1 = rnd(-cardW * 0.44, cardW * 0.44);
          relY1 = rnd(-cardH * 0.44, cardH * 0.44);
        }

        const x0 = cardX0 + relX0;
        const y0 = cardY0 + relY0;
        const x1 = cardX1 + relX1;
        const y1 = cardY1 + relY1;

        const sideBloom = c === 0 ? -rnd(40, 150) : c === 2 ? rnd(40, 150) : rnd(-40, 40);

        particles.push({
          x0, y0, x1, y1,
          midX: (x0 + x1) * 0.5 + sideBloom,
          midY: (y0 + y1) * 0.5 - rnd(75, 230),
          scatterAmpX: rnd(25, 75),
          scatterAmpY: rnd(35, 95),
          phase: rnd(0, Math.PI * 2),
          freq: rnd(1.6, 3.4),
          tStart: rnd(0.18, 0.34), // Cards disintegrate after header
          tEnd: rnd(0.78, 0.98),   // Project cards assemble 5th (final solidifying layer)
          radius: rnd(1.2, 2.5),
          color: PARTICLE_PALETTE[Math.floor(rnd(0, PARTICLE_PALETTE.length))],
          type: `card_${c}`,
        });
      }
    }

    return particles;
  }, []);

  // Update particles on resize
  useEffect(() => {
    particlesRef.current = generateParticles(viewport.width, viewport.height);
  }, [viewport, generateParticles]);

  // High-performance 120 FPS requestAnimationFrame canvas render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let active = true;

    const render = () => {
      if (!active) return;

      const target = targetProgressRef.current;
      const current = progressRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.00004) {
        progressRef.current = current + diff * 0.16;
        setScrollProgress(progressRef.current);
      } else if (current !== target) {
        progressRef.current = target;
        setScrollProgress(target);
      }

      const p = progressRef.current;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Only draw particles within active morph threshold
      if (p > 0.02 && p < 0.99) {
        const fieldAlpha = p < 0.12
          ? (p - 0.02) / 0.10
          : p > 0.90
            ? (0.99 - p) / 0.09
            : 1.0;

        const particles = particlesRef.current;
        const pLen = particles.length;

        for (let i = 0; i < pLen; i++) {
          const pt = particles[i];
          const tStart = pt.tStart;
          const tEnd = pt.tEnd;

          let u = 0;
          if (p <= tStart) {
            u = 0;
          } else if (p >= tEnd) {
            u = 1;
          } else {
            u = (p - tStart) / (tEnd - tStart);
          }

          const uEased = u * u * (3 - 2 * u);
          const invU = 1 - uEased;
          let currentX = invU * invU * pt.x0 + 2 * invU * uEased * pt.midX + uEased * uEased * pt.x1;
          let currentY = invU * invU * pt.y0 + 2 * invU * uEased * pt.midY + uEased * uEased * pt.y1;

          const flightFactor = Math.sin(u * Math.PI);
          if (flightFactor > 0.001) {
            currentX += Math.sin(u * pt.freq * Math.PI + pt.phase) * pt.scatterAmpX * flightFactor;
            currentY += Math.cos(u * pt.freq * Math.PI + pt.phase) * pt.scatterAmpY * flightFactor;
          }

          let pAlpha = 1.0;
          if (u === 0) {
            pAlpha = Math.max(0, (p - 0.02) / (tStart - 0.02));
          } else if (u === 1) {
            pAlpha = Math.max(0, (0.99 - p) / (0.99 - tEnd));
          } else {
            pAlpha = 0.95;
          }

          const finalAlpha = Math.max(0, Math.min(1, pAlpha * fieldAlpha));
          if (finalAlpha <= 0.01) continue;

          ctx.beginPath();
          ctx.arc(currentX, currentY, pt.radius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = finalAlpha;
          ctx.fill();

          if (i % 4 === 0 && finalAlpha > 0.35) {
            ctx.beginPath();
            ctx.arc(currentX, currentY, pt.radius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFAE80';
            ctx.globalAlpha = finalAlpha * 0.28;
            ctx.fill();
          }
        }
      }

      ctx.restore();
      rafIdRef.current = requestAnimationFrame(render);
    };

    rafIdRef.current = requestAnimationFrame(render);
    return () => {
      active = false;
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // GSAP ScrollTrigger Pinned Lock
  useEffect(() => {
    if (!trackRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: stageRef.current,
        pinSpacing: true,
        scrub: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          targetProgressRef.current = self.progress;
        },
      });
    }, containerRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [scrollDistance]);

  // Refresh ScrollTrigger when projects expand or category filter changes
  // Ensures pin-spacer height always matches the full height of the Projects section with ZERO overlap with Certifications!
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [showAll, activeFilter, displayedProjects.length]);

  // Progressive DOM dissolve for Academic Section (0.08 -> 0.35)
  const academicHeaderOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.08) / 0.16));
  const academicCardsOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.16) / 0.18));
  const academicCardsY = Math.max(-50, (scrollProgress - 0.16) * -180);

  // Progressive DOM formation for the REAL Projects Section in requested reveal order:
  // 1. Featured heading (0.55 -> 0.69)
  // 2. Projects cursive heading (0.61 -> 0.75)
  // 3. Description (0.67 -> 0.81)
  // 4. Project cards (0.74 -> 0.94)
  // 5. View more & CTA (0.84 -> 0.96)
  const projH1Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.55) / 0.14));
  const projH2Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.61) / 0.14));
  const projDescOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.67) / 0.14));
  const projCardsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.74) / 0.20));
  const projCardsScale = 0.96 + projCardsOpacity * 0.04;
  const projCtaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.84) / 0.12));

  const isMorphComplete = scrollProgress >= 0.95;

  return (
    <div id="education" ref={containerRef} className="relative w-full">
      {/* Scroll Scrub Track: Pins stageRef while user scrolls */}
      <div ref={trackRef} className="relative w-full">
        {/* Pinned Stage: Always min-h-screen with full natural height so GSAP pin spacer measures full Projects height */}
        <div
          ref={stageRef}
          className="relative w-full transition-colors duration-500 bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5 min-h-screen overflow-x-hidden"
        >
          {/* Ambient Glow Background Shapes */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#EC844D]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 left-0 w-80 sm:w-[450px] h-80 sm:h-[450px] bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl" />
            <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
          </div>

          {/* ============================================================== */}
          {/* LAYER 1: ACADEMIC EDUCATION SECTION (DISSOLVES INTO PARTICLES) */}
          {/* ============================================================== */}
          <div
            className="absolute inset-0 w-full h-screen z-10 flex flex-col justify-center items-center pointer-events-none"
            style={{
              opacity: scrollProgress > 0.36 ? 0 : 1,
              display: scrollProgress > 0.38 ? 'none' : 'flex',
            }}
          >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col justify-center">
              {/* Header */}
              <div
                className="text-center mb-4 sm:mb-6 md:mb-8 px-2 sm:px-6 transition-all duration-150"
                style={{
                  opacity: academicHeaderOpacity,
                  transform: `translate3d(0, -${(1 - academicHeaderOpacity) * 20}px, 0)`,
                }}
              >
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-2 leading-tight">
                  <span className="block text-foreground">
                    Academic
                  </span>
                  <span
                    className="block font-rakyat text-2xl sm:text-4xl md:text-5xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-0.5 pb-0.5 font-normal"
                    style={{ fontFamily: "'Rakyat', cursive" }}
                  >
                    Education & Degrees
                  </span>
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  My academic background and qualifications.
                </p>
              </div>

              {/* 3 Education Cards */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 justify-items-center transition-all duration-150"
                style={{
                  opacity: academicCardsOpacity,
                  transform: `translate3d(0, ${academicCardsY}px, 0)`,
                }}
              >
                {educationData.map((item, index) => (
                  <div key={item.id || index} className="w-full">
                    <div className="bg-card/90 dark:bg-slate-900/60 border border-border rounded-2xl p-4 sm:p-5 backdrop-blur-md shadow-lg h-full flex flex-col justify-between text-left">
                      <div>
                        <div className="flex items-start justify-between mb-3">
                          <div className="p-2 rounded-xl bg-[#EC844D]/10 text-[#EC844D] dark:text-[#FFAE80]">
                            <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/80 dark:bg-black/40 px-2.5 py-0.5 rounded-full border border-border dark:border-white/5">
                            <Calendar className="w-3 h-3" />
                            {item.year}
                          </div>
                        </div>

                        <h3 className="text-sm sm:text-base font-bold text-foreground mb-1">
                          {item.institution}
                        </h3>

                        <p className="text-[#EC844D] dark:text-[#FFAE80] font-medium mb-1.5 text-xs sm:text-sm">
                          {item.degree}
                        </p>

                        <p className="text-muted-foreground text-xs leading-relaxed mb-3 line-clamp-3">
                          {item.description}
                        </p>
                      </div>

                      {item.score && (
                        <div className="flex items-center gap-1.5 text-xs font-medium text-[#EC844D] dark:text-[#FFAE80] bg-[#EC844D]/10 border border-[#EC844D]/20 px-2.5 py-0.5 rounded-lg w-fit mt-auto">
                          <Award className="w-3.5 h-3.5 text-[#EC844D] dark:text-[#FFAE80]" />
                          {item.score}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* LAYER 2: HIGH-DPI CANVAS PARTICLE MORPH (THE TRANSFORMATION) */}
          {/* ============================================================== */}
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-screen pointer-events-none z-20"
            style={{
              display: scrollProgress > 0.02 && scrollProgress < 0.99 ? 'block' : 'none',
            }}
          />

          {/* ============================================================== */}
          {/* LAYER 3: ACTUAL, REAL, FULL FEATURED PROJECTS SECTION           */}
          {/* Formed directly by the particles, fully interactive at end     */}
          {/* ============================================================== */}
          <section
            id="projects"
            className="relative w-full z-10 pt-4 sm:pt-6 md:pt-8 pb-16 sm:pb-24 px-3 sm:px-6 lg:px-8 flex flex-col items-center"
            style={{
              pointerEvents: isMorphComplete ? 'auto' : 'none',
            }}
          >
            <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 relative">
              {/* 1. Header ("Featured" & "Projects") */}
              <div className="text-center mb-3 sm:mb-4 px-2 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-1 sm:mb-1.5 leading-tight">
                  <span
                    className="block text-foreground transition-all duration-200"
                    style={{
                      opacity: isMorphComplete ? 1 : projH1Opacity,
                      transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projH1Opacity) * 25}px, 0)`,
                    }}
                  >
                    Featured
                  </span>
                  <span
                    className="block font-rakyat text-2xl sm:text-4xl md:text-5xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-0.5 pb-0.5 font-normal transition-all duration-200"
                    style={{
                      fontFamily: "'Rakyat', cursive",
                      opacity: isMorphComplete ? 1 : projH2Opacity,
                      transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projH2Opacity) * 20}px, 0)`,
                    }}
                  >
                    Projects
                  </span>
                </h2>

                {/* 2. Description */}
                <p
                  className="text-xs sm:text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-200 mb-2 sm:mb-3"
                  style={{
                    opacity: isMorphComplete ? 1 : projDescOpacity,
                    transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projDescOpacity) * 15}px, 0)`,
                  }}
                >
                  A collection of projects I've built to showcase my skills in full-stack development and modern web technologies.
                </p>
              </div>

              {/* 3. Real Projects Grid */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 transition-all duration-200"
                style={{
                  opacity: isMorphComplete ? 1 : projCardsOpacity,
                  transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projCardsOpacity) * 25}px, 0) scale(${projCardsScale})`,
                }}
              >
                <AnimatePresence>
                  {displayedProjects.map((project) => (
                    <div
                      key={project.id}
                      className="group text-left will-change-transform will-change-opacity"
                    >
                      {/* Main Card Box - Clicking opens /project/:id in the SAME website */}
                      <Link
                        to={`/project/${project.id}`}
                        className="block rounded-2xl overflow-hidden aspect-[16/10] sm:aspect-[4/3] bg-muted shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50 relative cursor-pointer"
                      >
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Status Badge in Top Right */}
                        <div className="absolute top-3 right-3 z-10">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold backdrop-blur-md shadow-sm border ${
                              project.status === "Live"
                                ? "bg-black/50 text-emerald-400 border-emerald-500/30"
                                : "bg-black/50 text-amber-400 border-amber-500/30"
                            }`}
                          >
                            {project.status || "LIVE"}
                          </span>
                        </div>

                        {/* Dark Gradient Overlay at Bottom */}
                        <div className="absolute inset-x-0 bottom-0 pt-16 pb-3.5 px-4 sm:px-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end justify-between z-10">
                          <div className="pr-2 min-w-0">
                            <span className="block text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white/70 mb-0.5">
                              {project.category ? project.category.split('/')[0].trim().toUpperCase() : "WEBSITE"}
                            </span>
                            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white tracking-tight leading-snug drop-shadow-sm truncate group-hover:text-white/95 transition-colors">
                              {project.title}
                            </h3>
                          </div>

                          {/* Right Action Icons: View Website Arrow (↗) on Hover & Bookmark */}
                          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                            {/* Website Arrow (↗) - animated on hover */}
                            <span
                              onClick={(e) => {
                                if (project.demoUrl && project.demoUrl !== "#") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.demoUrl, "_blank", "noopener,noreferrer");
                                }
                              }}
                              title="Visit Live Website"
                              className="p-1.5 sm:p-2 rounded-lg bg-white/10 hover:bg-[#EC844D] text-white backdrop-blur-md border border-white/20 transition-all duration-300 transform group-hover:scale-110 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shadow-md flex items-center justify-center cursor-pointer"
                            >
                              <ArrowUpRight size={17} className="stroke-[2.5]" />
                            </span>

                            {/* Bookmark / Info Icon */}
                            <span
                              title="View Project Details & Architecture"
                              className="p-1.5 sm:p-2 rounded-lg bg-white/10 text-white/80 backdrop-blur-md border border-white/10 transition-all duration-300 flex items-center justify-center opacity-70 group-hover:opacity-100"
                            >
                              <Bookmark size={15} />
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Author / Metadata Row Below Card */}
                      <div className="flex items-center justify-between pt-2.5 px-1">
                        {/* Author Profile */}
                        <Link
                          to={`/project/${project.id}`}
                          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                        >
                          <img
                            src={logo}
                            alt="Ayan Manna"
                            className="w-5 h-5 rounded-full object-cover border border-border/80 bg-muted p-0.5"
                          />
                          <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-[#EC844D] transition-colors">
                            Ayan Manna
                          </span>
                          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                            PRO
                          </span>
                        </Link>

                        {/* Badges on right side */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-border text-muted-foreground uppercase tracking-wide">
                            DEV
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border border-[#EC844D]/40 text-[#EC844D] dark:text-[#FFAE80] uppercase tracking-wide">
                            {project.status === "Live" ? "LIVE" : "SOTD"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </AnimatePresence>
              </div>

              {/* 5. Load More Toggle */}
              {filteredProjects.length > 3 && (
                <div
                  className="text-center mt-8 sm:mt-10 transition-all duration-200"
                  style={{
                    opacity: isMorphComplete ? 1 : projCtaOpacity,
                    transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projCtaOpacity) * 20}px, 0)`,
                  }}
                >
                  <motion.button
                    onClick={() => setShowAll(!showAll)}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 relative z-30 cursor-pointer ${
                      showAll
                        ? "bg-muted text-foreground border border-border"
                        : "bg-[#EC844D] hover:bg-[#DE743C] text-white shadow-lg shadow-[#EC844D]/25"
                    }`}
                  >
                    {showAll ? (
                      <>
                        <ChevronUp size={16} />
                        Show Less
                      </>
                    ) : (
                      <>
                        View More Projects ({filteredProjects.length - 3} more)
                        <ArrowRight size={16} />
                      </>
                    )}
                  </motion.button>
                </div>
              )}

              {/* 6. Real Projects CTA Banner */}
              <div
                className="text-center mt-12 sm:mt-14 mb-4 transition-all duration-200"
                style={{
                  opacity: isMorphComplete ? 1 : projCtaOpacity,
                  transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projCtaOpacity) * 25}px, 0)`,
                }}
              >
                <div className="bg-card/70 border border-border/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 max-w-4xl mx-auto backdrop-blur-md shadow-xl">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                    Have a Project in Mind? Let's Work Together
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm max-w-2xl mx-auto mb-5">
                    I'm always open to discussing new opportunities, innovative ideas, or creative collaborations.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <motion.a
                      href="#contact"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-[#EC844D] hover:bg-[#DE743C] text-white shadow-md shadow-[#EC844D]/25 transition-all duration-300 cursor-pointer"
                    >
                      Contact Me
                      <ArrowRight size={16} />
                    </motion.a>

                    <motion.a
                      href="https://github.com/ayanmanna123"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-medium text-xs sm:text-sm border border-border text-foreground hover:border-[#EC844D] hover:bg-[#EC844D]/5 transition-all duration-300"
                    >
                      <Github size={16} />
                      View GitHub
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Video Demo Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-background rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedVideo.title} Demo
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedVideo.category}
                  </p>
                </div>
                <motion.button
                  onClick={handleCloseVideo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close video"
                  className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                >
                  <X size={24} />
                </motion.button>
              </div>

              <div className="w-full h-full bg-black">
                <VideoPlayer src={selectedVideo.video} onEnded={handleCloseVideo} />
              </div>

              <div className="p-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-muted-foreground text-sm flex-1">
                    Watch the demo of {selectedVideo.title} in action
                  </p>
                  <div className="flex gap-3">
                    <motion.a
                      href={selectedVideo.demoUrl || "#"}
                      target={(!selectedVideo.demoUrl || selectedVideo.demoUrl === "#") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        (!selectedVideo.demoUrl || selectedVideo.demoUrl === "#")
                          ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                          : "bg-[#EC844D] text-white hover:bg-[#DE743C]"
                      }`}
                      onClick={(e) => {
                        if (!selectedVideo.demoUrl || selectedVideo.demoUrl === "#") {
                          e.preventDefault();
                          alert("Website is not available");
                        }
                      }}
                    >
                      Visit Live Site
                    </motion.a>
                    <motion.a
                      href={selectedVideo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                        selectedVideo.githubUrl === "#"
                          ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                          : "bg-background text-foreground border-border hover:border-[#EC844D] hover:bg-[#EC844D]/5"
                      }`}
                      onClick={(e) => selectedVideo.githubUrl === "#" && e.preventDefault()}
                    >
                      View Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Architecture Deep Dive Modal */}
      <ProjectDetailsModal
        project={selectedDeepDiveProject}
        isOpen={!!selectedDeepDiveProject}
        onClose={handleCloseDeepDive}
      />
    </div>
  );
};

export default EducationToProjectsMorph;
