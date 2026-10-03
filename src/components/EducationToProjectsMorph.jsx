import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Calendar, Award, ArrowRight, ArrowUpRight, ExternalLink, Github,
  ChevronUp, Star, Code, Play, Eye, X, Info
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

  // Responsive scroll scrub distance - extended duration for a cinematic, luxurious progression
  const scrollDistance = useMemo(() => {
    if (viewport.width < 640) return 2200;
    if (viewport.width < 1024) return 2800;
    return 3600;
  }, [viewport.width]);

  // =========================================================================
  // ADVANCED CINEMATIC PARTICLE SHATTER & CONSTRUCTION ALGORITHM:
  // 1. Academic section shatters into thousands of kinetic fragments with explosive velocity
  // 2. Swirling vortex of glowing energy embers and trails
  // 3. Particles magnetically assemble and outline the exact wireframe of the Project cards
  // =========================================================================
  const generateParticles = useCallback((w, h) => {
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;

    const totalCount = isMobile ? 1500 : isTablet ? 2800 : 4800;
    const particles = [];
    const rnd = (min, max) => min + Math.random() * (max - min);

    // Exact Header coordinates matching the DOM layout
    const acadH1 = { x: w * 0.5, y: Math.max(50, h * 0.08), w: isMobile ? 180 : 260 };
    const acadH2 = { x: w * 0.5, y: Math.max(88, h * 0.13), w: isMobile ? 260 : 420 };
    const acadH3 = { x: w * 0.5, y: Math.max(124, h * 0.18), w: isMobile ? 240 : 360 };

    const projH1 = { x: w * 0.5, y: Math.max(48, h * 0.075), w: isMobile ? 160 : 230 };
    const projH2 = { x: w * 0.5, y: Math.max(84, h * 0.12), w: isMobile ? 220 : 340 };
    const projH3 = { x: w * 0.5, y: Math.max(118, h * 0.165), w: isMobile ? 250 : 420 };

    // 1. Line 1: "Academic" -> "Featured" (Letters crumble into upward-drifting dust)
    const h1Count = Math.round(totalCount * 0.07);
    for (let i = 0; i < h1Count; i++) {
      const u = i / h1Count;
      const x0 = acadH1.x + (u - 0.5) * acadH1.w + rnd(-8, 8);
      const y0 = acadH1.y + rnd(-10, 10);
      const x1 = projH1.x + (u - 0.5) * projH1.w + rnd(-8, 8);
      const y1 = projH1.y + rnd(-10, 10);

      particles.push({
        x0, y0, x1, y1,
        shatterVx: rnd(-25, 25),
        shatterVy: rnd(-55, -20), // Initial upward thermal draft
        midX: (x0 + x1) * 0.5 + rnd(-60, 60),
        midY: Math.min(y0, y1) - rnd(70, 160),
        scatterAmpX: rnd(20, 60),
        scatterAmpY: rnd(25, 65),
        phase: rnd(0, Math.PI * 2),
        freq: rnd(1.8, 3.2),
        tEmit: rnd(0.08, 0.18),
        tArrive: rnd(0.60, 0.72),
        radius: rnd(1.1, 2.2),
        color: PARTICLE_PALETTE[Math.floor(rnd(0, PARTICLE_PALETTE.length))],
        isGlow: Math.random() > 0.6,
        type: 'h1',
      });
    }

    // 2. Line 2: "Education & Degrees" (cursive) -> "Projects"
    const h2Count = Math.round(totalCount * 0.11);
    for (let i = 0; i < h2Count; i++) {
      const u = i / h2Count;
      const x0 = acadH2.x + (u - 0.5) * acadH2.w + rnd(-10, 10);
      const y0 = acadH2.y + rnd(-14, 14);
      const x1 = projH2.x + (u - 0.5) * projH2.w + rnd(-10, 10);
      const y1 = projH2.y + rnd(-14, 14);

      particles.push({
        x0, y0, x1, y1,
        shatterVx: rnd(-35, 35),
        shatterVy: rnd(-65, -25),
        midX: (x0 + x1) * 0.5 + rnd(-80, 80),
        midY: Math.min(y0, y1) - rnd(80, 190),
        scatterAmpX: rnd(30, 80),
        scatterAmpY: rnd(35, 85),
        phase: rnd(0, Math.PI * 2),
        freq: rnd(1.9, 3.4),
        tEmit: rnd(0.10, 0.22),
        tArrive: rnd(0.64, 0.76),
        radius: rnd(1.2, 2.5),
        color: Math.random() > 0.3 ? '#EC844D' : '#FFAE80',
        isGlow: Math.random() > 0.5,
        type: 'h2',
      });
    }

    // 3. Line 3: Academic Subtitle -> Projects Subtitle
    const h3Count = Math.round(totalCount * 0.07);
    for (let i = 0; i < h3Count; i++) {
      const u = i / h3Count;
      const x0 = acadH3.x + (u - 0.5) * acadH3.w + rnd(-6, 6);
      const y0 = acadH3.y + rnd(-8, 8);
      const x1 = projH3.x + (u - 0.5) * projH3.w + rnd(-6, 6);
      const y1 = projH3.y + rnd(-8, 8);

      particles.push({
        x0, y0, x1, y1,
        shatterVx: rnd(-25, 25),
        shatterVy: rnd(-45, -15),
        midX: (x0 + x1) * 0.5 + rnd(-60, 60),
        midY: Math.min(y0, y1) - rnd(60, 160),
        scatterAmpX: rnd(20, 55),
        scatterAmpY: rnd(25, 60),
        phase: rnd(0, Math.PI * 2),
        freq: rnd(2.0, 3.5),
        tEmit: rnd(0.12, 0.25),
        tArrive: rnd(0.68, 0.80),
        radius: rnd(1.0, 2.0),
        color: '#FFD8B2',
        isGlow: Math.random() > 0.7,
        type: 'h3',
      });
    }

    // 4. Cards Geometry (3 Columns, identical to DOM layout)
    const cardPool = totalCount - particles.length;
    const perCard = Math.floor(cardPool / 3);

    const maxContainerW = Math.min(1440, w - (isMobile ? 24 : 64));
    const cardGap = isMobile ? 16 : isTablet ? 20 : 32;
    const cardW = isMobile ? maxContainerW : isTablet ? (maxContainerW - cardGap) / 2 : (maxContainerW - cardGap * 2) / 3;
    const cardH = isMobile ? Math.min(320, h * 0.44) : Math.min(400, h * 0.52);
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
        // --- Academic Card Origin Coordinates ---
        const randOrigin = Math.random();
        let relX0 = 0, relY0 = 0;

        if (randOrigin < 0.35) {
          // Perimeter Border Outline of Academic Card
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
        } else if (randOrigin < 0.55) {
          // Top Badges, Graduation Icon, & Year Pill
          const isLeft = Math.random() > 0.5;
          if (isLeft) {
            relX0 = -cardW * 0.35 + rnd(-16, 16);
            relY0 = -cardH * 0.36 + rnd(-14, 14);
          } else {
            relX0 = cardW * 0.32 + rnd(-20, 20);
            relY0 = -cardH * 0.36 + rnd(-8, 8);
          }
        } else if (randOrigin < 0.80) {
          // Text Content lines & Degrees
          const lineIndex = Math.floor(rnd(0, 4));
          const lineY = -cardH * 0.16 + lineIndex * (cardH * 0.18);
          relX0 = rnd(-cardW * 0.42, cardW * 0.42);
          relY0 = lineY + rnd(-4, 4);
        } else {
          // Interior Card Body
          relX0 = rnd(-cardW * 0.44, cardW * 0.44);
          relY0 = rnd(-cardH * 0.44, cardH * 0.44);
        }

        // --- Explosive Shatter Impulse (Physics vector radiating outward from card center) ---
        const burstAngle = Math.atan2(relY0, relX0) + rnd(-0.35, 0.35);
        const burstSpeed = rnd(50, 140);
        const shatterVx = Math.cos(burstAngle) * burstSpeed;
        const shatterVy = Math.sin(burstAngle) * burstSpeed - rnd(25, 75); // Upward blast & lift

        // --- Project Card Destination Coordinates ---
        // Assembles the exact silhouette and wireframe of the Project Card:
        // 40% Card Frame, 20% Top Badge, 20% Bottom Title Banner, 20% Author Row & Arrow
        const randDest = Math.random();
        let relX1 = 0, relY1 = 0;

        if (randDest < 0.40) {
          // Rounded Rectangle Perimeter of the Project Card
          const perimeterU = rnd(0, 4);
          const halfW = cardW * 0.48;
          const halfH = cardH * 0.48;
          if (perimeterU < 1) {
            relX1 = (perimeterU - 0.5) * 2 * halfW;
            relY1 = -halfH;
          } else if (perimeterU < 2) {
            relX1 = halfW;
            relY1 = (perimeterU - 1.5) * 2 * halfH;
          } else if (perimeterU < 3) {
            relX1 = (2.5 - perimeterU) * 2 * halfW;
            relY1 = halfH;
          } else {
            relX1 = -halfW;
            relY1 = (3.5 - perimeterU) * 2 * halfH;
          }
        } else if (randDest < 0.60) {
          // Card Upper Header / Image Surface
          relX1 = rnd(-cardW * 0.44, cardW * 0.44);
          relY1 = -cardH * 0.28 + rnd(-cardH * 0.14, cardH * 0.14);
        } else if (randDest < 0.80) {
          // Bottom Title & Category Banner
          const isCategory = Math.random() > 0.6;
          if (isCategory) {
            relX1 = -cardW * 0.28 + rnd(-24, 24);
            relY1 = cardH * 0.24 + rnd(-3, 3);
          } else {
            relX1 = -cardW * 0.15 + rnd(-cardW * 0.25, cardW * 0.25);
            relY1 = cardH * 0.32 + rnd(-5, 5);
          }
        } else {
          // Author Row & View Arrow (↗) below card
          const isArrow = Math.random() > 0.5;
          if (isArrow) {
            // Action arrow (↗) at bottom right of card
            relX1 = cardW * 0.38 + rnd(-8, 8);
            relY1 = cardH * 0.30 + rnd(-8, 8);
          } else {
            // Author avatar & name row
            relX1 = -cardW * 0.25 + rnd(-cardW * 0.15, cardW * 0.15);
            relY1 = cardH * 0.48 + rnd(-4, 4);
          }
        }

        const x0 = cardX0 + relX0;
        const y0 = cardY0 + relY0;
        const x1 = cardX1 + relX1;
        const y1 = cardY1 + relY1;

        // Dynamic vortex side blooms
        const sideBloom = c === 0 ? -rnd(60, 160) : c === 2 ? rnd(60, 160) : rnd(-50, 50);

        // Domino shatter start & sequential assembly by card index
        const tEmit = rnd(0.12 + c * 0.04, 0.26 + c * 0.04);
        const tArrive = rnd(0.72 + c * 0.03, 0.86 + c * 0.03);

        particles.push({
          x0, y0, x1, y1,
          shatterVx,
          shatterVy,
          midX: (x0 + x1) * 0.5 + sideBloom,
          midY: Math.min(y0, y1) - rnd(85, 230),
          scatterAmpX: rnd(25, 75),
          scatterAmpY: rnd(35, 90),
          phase: rnd(0, Math.PI * 2),
          freq: rnd(1.6, 3.4),
          tEmit,
          tArrive,
          radius: rnd(1.1, 2.5),
          color: PARTICLE_PALETTE[Math.floor(rnd(0, PARTICLE_PALETTE.length))],
          isGlow: Math.random() > 0.5,
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

      // Only draw particles once disintegration begins (p >= 0.08) and before DOM solidifies (p < 0.97)
      if (p >= 0.08 && p < 0.97) {
        const particles = particlesRef.current;
        const pLen = particles.length;

        for (let i = 0; i < pLen; i++) {
          const pt = particles[i];
          const tEmit = pt.tEmit;
          const tArrive = pt.tArrive;

          // 1. Particle has NOT broken off yet: stays invisible inside solid card!
          if (p < tEmit) continue;

          // 2. Flight progress u from 0 (shatter birth) to 1 (locked into project)
          let u = 0;
          if (p >= tArrive) {
            u = 1;
          } else {
            u = (p - tEmit) / (tArrive - tEmit);
          }

          // Smooth cubic ease
          const uEased = u < 0.5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2;
          const invU = 1 - uEased;

          // Core Bezier path
          let currentX = invU * invU * pt.x0 + 2 * invU * uEased * pt.midX + uEased * uEased * pt.x1;
          let currentY = invU * invU * pt.y0 + 2 * invU * uEased * pt.midY + uEased * uEased * pt.y1;

          // Explosive shatter burst during the first 35% of flight
          if (u < 0.35) {
            const burstProgress = u / 0.35;
            const burstImpulse = Math.sin(burstProgress * Math.PI) * (1 - burstProgress);
            currentX += pt.shatterVx * burstImpulse;
            currentY += pt.shatterVy * burstImpulse;
          }

          // Vortex turbulence in mid-flight
          const flightFactor = Math.sin(u * Math.PI);
          if (flightFactor > 0.001) {
            currentX += Math.sin(u * pt.freq * Math.PI + pt.phase) * pt.scatterAmpX * flightFactor;
            currentY += Math.cos(u * pt.freq * Math.PI + pt.phase) * pt.scatterAmpY * flightFactor;
          }

          // Magnetic snap pulse when arriving at target project position
          let currentRadius = pt.radius;
          if (u > 0.90 && u < 1.0) {
            const snapProgress = (u - 0.90) / 0.10;
            currentRadius = pt.radius * (1 + Math.sin(snapProgress * Math.PI) * 0.9);
          }

          // Dynamic particle opacity:
          // - Rapid birth upon card break (0 to 1 over 0.03 scroll progress)
          // - Shimmering energy in flight
          // - Gracefully fuses into the solid DOM project cards once assembled
          let pAlpha = 1.0;
          if (p < tEmit + 0.03) {
            pAlpha = (p - tEmit) / 0.03;
          } else if (p >= tArrive) {
            // Once project cards materialize (0.78 -> 0.95), particles dissolve into the solid card
            pAlpha = Math.max(0, (0.96 - p) / (0.96 - Math.max(tArrive, 0.82)));
          }

          if (pAlpha <= 0.01) continue;

          // Draw the radiant particle
          ctx.beginPath();
          ctx.arc(currentX, currentY, currentRadius, 0, Math.PI * 2);
          ctx.fillStyle = pt.color;
          ctx.globalAlpha = pAlpha;
          ctx.fill();

          // Motion trailing ember glow
          if (pt.isGlow && pAlpha > 0.35) {
            ctx.beginPath();
            ctx.arc(currentX, currentY, currentRadius * 2.2, 0, Math.PI * 2);
            ctx.fillStyle = '#FFAE80';
            ctx.globalAlpha = pAlpha * 0.28;
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

  // GSAP ScrollTrigger Pinned Lock with smooth scrub
  useEffect(() => {
    if (!trackRef.current || !stageRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: "top top",
        end: `+=${scrollDistance}`,
        pin: stageRef.current,
        pinSpacing: true,
        scrub: 1.2, // Smooth, luxurious scrubbing
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

  // =========================================================================
  // DOM DISINTEGRATION & RECONSTRUCTION PHYSICS:
  // =========================================================================
  const isBreaking = scrollProgress >= 0.08 && scrollProgress < 0.36;
  const breakRatio = Math.max(0, Math.min(1, (scrollProgress - 0.08) / 0.24));

  // Academic header dissolves into rising dust (0.08 -> 0.22)
  const academicHeaderOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.08) / 0.16));

  // Academic cards fracture with subtle vibration and blur before bursting into particles (0.12 -> 0.32)
  const academicCardsOpacity = Math.max(0, Math.min(1, 1 - (scrollProgress - 0.12) / 0.20));
  const academicCardsY = Math.max(-60, (scrollProgress - 0.12) * -160);
  const cardJitterX = isBreaking ? Math.sin(scrollProgress * 95) * (breakRatio * 3.5) : 0;
  const cardJitterY = isBreaking ? Math.cos(scrollProgress * 80) * (breakRatio * 2.5) : 0;
  const cardBlur = breakRatio * 4;

  // Progressive DOM formation for the REAL Projects Section:
  // 1. Featured heading (0.62 -> 0.74)
  // 2. Projects cursive heading (0.66 -> 0.78)
  // 3. Description (0.70 -> 0.82)
  // 4. Project cards assemble from particles (0.76 -> 0.94)
  // 5. View more & CTA (0.86 -> 0.96)
  const projH1Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.62) / 0.12));
  const projH2Opacity = Math.max(0, Math.min(1, (scrollProgress - 0.66) / 0.12));
  const projDescOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.70) / 0.12));
  const projCardsOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.76) / 0.18));
  const projCardsScale = 0.95 + projCardsOpacity * 0.05;
  const projCtaOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.86) / 0.10));

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
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
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

              {/* 3 Education Cards - Fractures with vibration and blur as particles burst out */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center transition-all duration-75"
                style={{
                  opacity: academicCardsOpacity,
                  filter: cardBlur > 0.4 ? `blur(${cardBlur}px)` : 'none',
                  transform: `translate3d(${cardJitterX}px, ${academicCardsY + cardJitterY}px, 0)`,
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
            <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 relative">
              {/* 1. Header ("Featured" & "Projects") */}
              <div className="text-center mb-4 sm:mb-6 px-2 sm:px-6">
                <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-1 sm:mb-2 leading-tight">
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
                    className="block font-rakyat text-2xl sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-0.5 pb-0.5 font-normal transition-all duration-200"
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
                  className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed transition-all duration-200 mb-2 sm:mb-4"
                  style={{
                    opacity: isMorphComplete ? 1 : projDescOpacity,
                    transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projDescOpacity) * 15}px, 0)`,
                  }}
                >
                  A collection of projects I've built to showcase my skills in full-stack development and modern web technologies.
                </p>
              </div>

              {/* 3. Real Projects Grid - Enlarged Cards */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-9 transition-all duration-200"
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
                        className="block rounded-2xl sm:rounded-3xl overflow-hidden aspect-[16/11] sm:aspect-[4/3] bg-muted shadow-md hover:shadow-2xl transition-all duration-500 border border-border/60 hover:border-[#EC844D]/50 relative cursor-pointer"
                      >
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />

                        {/* Dark Gradient Overlay at Bottom */}
                        <div className="absolute inset-x-0 bottom-0 pt-20 sm:pt-28 pb-4 sm:pb-5 px-5 sm:px-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent flex items-end justify-between z-10">
                          <div className="pr-3 min-w-0">
                            <span className="block text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
                              {project.category ? project.category.split('/')[0].trim().toUpperCase() : "WEBSITE"}
                            </span>
                            <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white tracking-tight leading-snug drop-shadow-sm truncate group-hover:text-white/95 transition-colors">
                              {project.title}
                            </h3>
                          </div>

                          {/* Right Action: View Website Arrow (↗) - Only Visible on Hover */}
                          <div className="flex items-center shrink-0">
                            <span
                              onClick={(e) => {
                                if (project.demoUrl && project.demoUrl !== "#") {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.demoUrl, "_blank", "noopener,noreferrer");
                                }
                              }}
                              title="Visit Live Website"
                              className="p-2 sm:p-2.5 rounded-xl bg-white/20 hover:bg-[#EC844D] text-white backdrop-blur-md border border-white/30 transition-all duration-300 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transform translate-y-1 group-hover:translate-y-0 group-hover:scale-110 shadow-xl flex items-center justify-center cursor-pointer"
                            >
                              <ArrowUpRight size={20} className="stroke-[2.5]" />
                            </span>
                          </div>
                        </div>
                      </Link>

                      {/* Author / Metadata Row Below Card */}
                      <div className="flex items-center justify-between pt-3 px-1.5">
                        {/* Author Profile */}
                        <Link
                          to={`/project/${project.id}`}
                          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity"
                        >
                          <img
                            src={logo}
                            alt="Ayan Manna"
                            className="w-6 h-6 rounded-full object-cover border border-border/80 bg-muted p-0.5"
                          />
                          <span className="text-sm sm:text-base font-semibold text-foreground group-hover:text-[#EC844D] transition-colors">
                            Ayan Manna
                          </span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                            PRO
                          </span>
                        </Link>

                        {/* Badges on right side */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded border border-border text-muted-foreground uppercase tracking-wide">
                            DEV
                          </span>
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded border border-[#EC844D]/40 text-[#EC844D] dark:text-[#FFAE80] uppercase tracking-wide">
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
