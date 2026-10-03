import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GraduationCap, Calendar, Award, ArrowRight, ArrowUpRight, ExternalLink, Github,
  ChevronUp, Star, Code, Play, Eye, X, Info
} from 'lucide-react';
import { educationData, projects, categoryColors } from '../data';
import { ProjectDetailsModal } from './ProjectDetailsModal';
import { VideoPlayer } from './VideoPlayer';

gsap.registerPlugin(ScrollTrigger);

// Curated Soft UI Neumorphic particle palette matching SoftUiWidgets.jsx
const PARTICLE_PALETTE = [
  '#e59845', // Warm Caramel Amber
  '#f06292', // Rose Pink Accent
  '#43413d', // Soft Clay Charcoal
  '#6d6a64', // Muted Clay Slate
  '#bbb7ad', // Light Stone
  '#ffffff', // Light Specular Reflection
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
          <div className="w-1.5 h-1.5 bg-[#e59845] rounded-full shrink-0" />
          <span className="text-[#66635d] line-clamp-1">{highlight}</span>
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
  // Exact Header and Card coordinates sampled directly from live DOM elements
  const generateParticles = useCallback((w, h) => {
    const isMobile = w < 640;
    const isTablet = w >= 640 && w < 1024;

    const totalCount = isMobile ? 1500 : isTablet ? 2800 : 4800;
    const particles = [];
    const rnd = (min, max) => min + Math.random() * (max - min);

    // Try measuring real DOM coordinates relative to stage
    const stage = stageRef.current;
    const sRect = stage ? stage.getBoundingClientRect() : null;

    // Academic Header Fallback (centered vertically on screen with cards below it)
    const acadBlockCenterY = h * 0.5;
    const estAcadH1Y = Math.max(160, acadBlockCenterY - (isMobile ? 240 : 210));

    const acadH1El = stage?.querySelector('[data-morph="acad-h1"]');
    const acadH2El = stage?.querySelector('[data-morph="acad-h2"]');
    const acadDescEl = stage?.querySelector('[data-morph="acad-desc"]');

    const acadH1 = acadH1El && sRect ? {
      x: acadH1El.getBoundingClientRect().left - sRect.left + acadH1El.getBoundingClientRect().width * 0.5,
      y: acadH1El.getBoundingClientRect().top - sRect.top + acadH1El.getBoundingClientRect().height * 0.5,
      w: acadH1El.getBoundingClientRect().width,
    } : {
      x: w * 0.5,
      y: estAcadH1Y,
      w: isMobile ? 180 : 260,
    };

    const acadH2 = acadH2El && sRect ? {
      x: acadH2El.getBoundingClientRect().left - sRect.left + acadH2El.getBoundingClientRect().width * 0.5,
      y: acadH2El.getBoundingClientRect().top - sRect.top + acadH2El.getBoundingClientRect().height * 0.5,
      w: acadH2El.getBoundingClientRect().width,
    } : {
      x: w * 0.5,
      y: estAcadH1Y + 44,
      w: isMobile ? 260 : 420,
    };

    const acadH3 = acadDescEl && sRect ? {
      x: acadDescEl.getBoundingClientRect().left - sRect.left + acadDescEl.getBoundingClientRect().width * 0.5,
      y: acadDescEl.getBoundingClientRect().top - sRect.top + acadDescEl.getBoundingClientRect().height * 0.5,
      w: acadDescEl.getBoundingClientRect().width,
    } : {
      x: w * 0.5,
      y: estAcadH1Y + 84,
      w: isMobile ? 240 : 360,
    };

    // Projects Header
    const projH1El = stage?.querySelector('[data-morph="proj-h1"]');
    const projH2El = stage?.querySelector('[data-morph="proj-h2"]');
    const projDescEl = stage?.querySelector('[data-morph="proj-desc"]');

    const projH1 = projH1El && sRect ? {
      x: projH1El.getBoundingClientRect().left - sRect.left + projH1El.getBoundingClientRect().width * 0.5,
      y: projH1El.getBoundingClientRect().top - sRect.top + projH1El.getBoundingClientRect().height * 0.5,
      w: projH1El.getBoundingClientRect().width,
    } : {
      x: w * 0.5,
      y: Math.max(64, h * 0.08),
      w: isMobile ? 160 : 230,
    };

    const projH2 = projH2El && sRect ? {
      x: projH2El.getBoundingClientRect().left - sRect.left + projH2El.getBoundingClientRect().width * 0.5,
      y: projH2El.getBoundingClientRect().top - sRect.top + projH2El.getBoundingClientRect().height * 0.5,
      w: projH2El.getBoundingClientRect().width,
    } : {
      x: w * 0.5,
      y: Math.max(110, h * 0.13),
      w: isMobile ? 220 : 340,
    };

    const projH3 = projDescEl && sRect ? {
      x: projDescEl.getBoundingClientRect().left - sRect.left + projDescEl.getBoundingClientRect().width * 0.5,
      y: projDescEl.getBoundingClientRect().top - sRect.top + projDescEl.getBoundingClientRect().height * 0.5,
      w: projDescEl.getBoundingClientRect().width,
    } : {
      x: w * 0.5,
      y: Math.max(154, h * 0.175),
      w: isMobile ? 250 : 420,
    };

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

    // 4. Cards Geometry (3 Columns, measured from live DOM with exact responsive fallback)
    const cardPool = totalCount - particles.length;
    const perCard = Math.floor(cardPool / 3);

    const maxContainerW = Math.min(1440, w - (isMobile ? 24 : 64));
    const cardGap = isMobile ? 16 : isTablet ? 20 : 32;
    const defCardW = isMobile ? maxContainerW : isTablet ? (maxContainerW - cardGap) / 2 : (maxContainerW - cardGap * 2) / 3;
    const defCardH = isMobile ? Math.min(320, h * 0.44) : Math.min(400, h * 0.52);

    for (let c = 0; c < 3; c++) {
      // Academic Card Rect
      const acadCardEl = stage?.querySelector(`[data-morph="acad-card-${c}"]`);
      let cardX0, cardY0, cardW0 = defCardW, cardH0 = defCardH;

      if (acadCardEl && sRect) {
        const cRect = acadCardEl.getBoundingClientRect();
        cardX0 = cRect.left - sRect.left + cRect.width * 0.5;
        cardY0 = cRect.top - sRect.top + cRect.height * 0.5;
        cardW0 = cRect.width;
        cardH0 = cRect.height;
      } else {
        const acadCardTopY = estAcadH1Y + (isMobile ? 120 : 130);
        cardY0 = acadCardTopY + defCardH * 0.5;
        if (isMobile) {
          cardX0 = w * 0.5;
          cardY0 += (c - 1) * 18;
        } else if (isTablet) {
          cardX0 = c < 2 ? (w - maxContainerW) * 0.5 + c * (defCardW + cardGap) + defCardW * 0.5 : w * 0.5;
        } else {
          cardX0 = (w - maxContainerW) * 0.5 + c * (defCardW + cardGap) + defCardW * 0.5;
        }
      }

      // Project Card Rect
      const projCardEl = stage?.querySelector(`[data-morph="proj-card-${c}"]`);
      let cardX1, cardY1, cardW1 = defCardW, cardH1 = defCardH;

      if (projCardEl && sRect) {
        const pRect = projCardEl.getBoundingClientRect();
        cardX1 = pRect.left - sRect.left + pRect.width * 0.5;
        cardY1 = pRect.top - sRect.top + pRect.height * 0.5;
        cardW1 = pRect.width;
        cardH1 = pRect.height;
      } else {
        const projCardTopY = Math.max(projH3.y + 36, h * 0.23);
        cardY1 = projCardTopY + defCardH * 0.5;
        if (isMobile) {
          cardX1 = w * 0.5;
          cardY1 += (c - 1) * 18;
        } else if (isTablet) {
          cardX1 = c < 2 ? (w - maxContainerW) * 0.5 + c * (defCardW + cardGap) + defCardW * 0.5 : w * 0.5;
        } else {
          cardX1 = (w - maxContainerW) * 0.5 + c * (defCardW + cardGap) + defCardW * 0.5;
        }
      }

      for (let i = 0; i < perCard; i++) {
        // --- Academic Card Origin Coordinates ---
        const randOrigin = Math.random();
        let relX0 = 0, relY0 = 0;

        if (randOrigin < 0.35) {
          // Perimeter Border Outline of Academic Card
          const perimeterU = rnd(0, 4);
          const halfW = cardW0 * 0.48;
          const halfH = cardH0 * 0.48;
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
            relX0 = -cardW0 * 0.35 + rnd(-16, 16);
            relY0 = -cardH0 * 0.36 + rnd(-14, 14);
          } else {
            relX0 = cardW0 * 0.32 + rnd(-20, 20);
            relY0 = -cardH0 * 0.36 + rnd(-8, 8);
          }
        } else if (randOrigin < 0.80) {
          // Text Content lines & Degrees
          const lineIndex = Math.floor(rnd(0, 4));
          const lineY = -cardH0 * 0.16 + lineIndex * (cardH0 * 0.18);
          relX0 = rnd(-cardW0 * 0.42, cardW0 * 0.42);
          relY0 = lineY + rnd(-4, 4);
        } else {
          // Interior Card Body
          relX0 = rnd(-cardW0 * 0.44, cardW0 * 0.44);
          relY0 = rnd(-cardH0 * 0.44, cardH0 * 0.44);
        }

        // --- Explosive Shatter Impulse (Physics vector radiating outward from card center) ---
        const burstAngle = Math.atan2(relY0, relX0) + rnd(-0.35, 0.35);
        const burstSpeed = rnd(50, 140);
        const shatterVx = Math.cos(burstAngle) * burstSpeed;
        const shatterVy = Math.sin(burstAngle) * burstSpeed - rnd(25, 75); // Upward blast & lift

        // --- Project Card Destination Coordinates ---
        const randDest = Math.random();
        let relX1 = 0, relY1 = 0;

        if (randDest < 0.45) {
          // Rounded Rectangle Perimeter of the Project Card
          const perimeterU = rnd(0, 4);
          const halfW = cardW1 * 0.48;
          const halfH = cardH1 * 0.48;
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
        } else if (randDest < 0.65) {
          // Card Upper Header / Image Surface
          relX1 = rnd(-cardW1 * 0.44, cardW1 * 0.44);
          relY1 = -cardH1 * 0.28 + rnd(-cardH1 * 0.14, cardH1 * 0.14);
        } else if (randDest < 0.85) {
          // Bottom Title & Category Banner
          const isCategory = Math.random() > 0.6;
          if (isCategory) {
            relX1 = -cardW1 * 0.28 + rnd(-24, 24);
            relY1 = cardH1 * 0.24 + rnd(-3, 3);
          } else {
            relX1 = -cardW1 * 0.15 + rnd(-cardW1 * 0.25, cardW1 * 0.25);
            relY1 = cardH1 * 0.32 + rnd(-5, 5);
          }
        } else {
          // Author Row & View Arrow (↗) below card
          const isArrow = Math.random() > 0.5;
          if (isArrow) {
            // Action arrow (↗) at bottom right of card
            relX1 = cardW1 * 0.38 + rnd(-8, 8);
            relY1 = cardH1 * 0.30 + rnd(-8, 8);
          } else {
            // Author avatar & name row
            relX1 = -cardW1 * 0.25 + rnd(-cardW1 * 0.15, cardW1 * 0.15);
            relY1 = cardH1 * 0.48 + rnd(-4, 4);
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
          className="relative w-full transition-colors duration-500 bg-[#eae7e1] text-[#43413d] min-h-screen overflow-x-hidden select-none"
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
                className="text-center mb-6 sm:mb-8 px-2 sm:px-6 transition-all duration-150"
                style={{
                  opacity: academicHeaderOpacity,
                  transform: `translate3d(0, -${(1 - academicHeaderOpacity) * 20}px, 0)`,
                }}
              >
                <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1">
                  <span className="w-2 h-2 rounded-full bg-[#f06292]" />
                  <span>Academic.Journey</span>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-1 leading-tight tracking-tight text-[#43413d]">
                  <span data-morph="acad-h1" className="block text-[#43413d]">
                    Academic
                  </span>
                  <span
                    data-morph="acad-h2"
                    className="block font-handwriting text-2xl sm:text-4xl md:text-5xl text-[#e59845] font-bold mt-0.5 pb-0.5"
                  >
                    Education & Degrees
                  </span>
                </h2>
                <p data-morph="acad-desc" className="text-xs sm:text-sm text-[#78756e] font-handwriting font-medium max-w-xl mx-auto leading-relaxed mt-1">
                  My academic background, qualifications, and formal milestones.
                </p>
              </div>

              {/* 3 Education Cards */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-stretch transition-all duration-75 select-none"
                style={{
                  opacity: academicCardsOpacity,
                  filter: cardBlur > 0.4 ? `blur(${cardBlur}px)` : 'none',
                  transform: `translate3d(${cardJitterX}px, ${academicCardsY + cardJitterY}px, 0)`,
                }}
              >
                {educationData.map((item, index) => (
                  <div key={item.id || index} data-morph={`acad-card-${index}`} className="w-full flex">
                    <div className="soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-7 bg-[#eae7e1] text-[#43413d] flex flex-col justify-between text-left w-full transition-all duration-300">
                      <div>
                        {/* Top: Icon Well + Year Pill */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-[18px] soft-ui-inset flex items-center justify-center shrink-0 text-[#e59845] p-2.5 bg-[#e4e1d9]">
                            <GraduationCap className="w-6 h-6" />
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-bold text-[#6d6a64] font-digital soft-ui-inset-subtle px-3.5 py-1 rounded-full bg-[#e6e3dc]">
                            <Calendar className="w-3.5 h-3.5 text-[#e59845]" />
                            <span>{item.year}</span>
                          </div>
                        </div>

                        {/* Institution Name */}
                        <h3 className="text-base sm:text-lg font-black text-[#383a3d] font-digital mb-1.5 leading-snug">
                          {item.institution}
                        </h3>

                        {/* Degree Title */}
                        <p className="text-[#e59845] font-digital font-bold text-xs sm:text-sm mb-2.5 tracking-wide">
                          {item.degree}
                        </p>

                        {/* Description */}
                        <p className="text-[#66635d] text-xs sm:text-[13px] leading-relaxed mb-5 font-normal">
                          {item.description}
                        </p>
                      </div>

                      {/* Score / Milestone Slot */}
                      {item.score && (
                        <div className="mt-auto pt-3 border-t border-[#cdc8be]/40">
                          <div className="w-full h-9 soft-ui-inset rounded-full px-3.5 py-1 flex items-center justify-between bg-[#e4e1d9]">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting">
                              <Award className="w-3.5 h-3.5 text-[#e59845]" />
                              <span>Academic Milestone</span>
                            </div>
                            <span className="soft-ui-raised rounded-full px-3 py-0.5 text-xs font-black text-[#383a3d] font-digital bg-[#eae7e1]">
                              {item.score}
                            </span>
                          </div>
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
              opacity: scrollProgress < 0.45 ? 0 : 1,
            }}
          >
            <div className="w-full max-w-[1440px] mx-auto px-2 sm:px-4 lg:px-6 relative">
              {/* 1. Header ("Featured" & "Projects") */}
              <div className="text-center mb-4 sm:mb-6 px-2 sm:px-6">
                <div
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1.5 transition-all duration-200"
                  style={{
                    opacity: isMorphComplete ? 1 : projH1Opacity,
                    transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projH1Opacity) * 20}px, 0)`,
                  }}
                >
                  <span className="w-2 h-2 rounded-full bg-[#f06292]" />
                  <span>Portfolio.Works</span>
                </div>

                <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-1 leading-tight tracking-tight text-[#43413d]">
                  <span
                    data-morph="proj-h1"
                    className="block text-[#43413d] transition-all duration-200"
                    style={{
                      opacity: isMorphComplete ? 1 : projH1Opacity,
                      transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projH1Opacity) * 25}px, 0)`,
                    }}
                  >
                    Featured
                  </span>
                  <span
                    data-morph="proj-h2"
                    className="block font-handwriting text-2xl sm:text-4xl md:text-5xl text-[#e59845] font-bold mt-0.5 pb-0.5 transition-all duration-200"
                    style={{
                      opacity: isMorphComplete ? 1 : projH2Opacity,
                      transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projH2Opacity) * 20}px, 0)`,
                    }}
                  >
                    Projects & Products
                  </span>
                </h2>

                {/* 2. Description */}
                <p
                  data-morph="proj-desc"
                  className="text-xs sm:text-sm text-[#78756e] font-handwriting font-medium max-w-xl mx-auto leading-relaxed transition-all duration-200 mb-4 sm:mb-6"
                  style={{
                    opacity: isMorphComplete ? 1 : projDescOpacity,
                    transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projDescOpacity) * 15}px, 0)`,
                  }}
                >
                  A curated collection of full-stack applications, modern architectures, and interactive digital experiences.
                </p>

                {/* 3. Category Filter Pills */}
                <div
                  className="flex justify-center mb-4 sm:mb-6 overflow-x-auto pb-2 scrollbar-none transition-all duration-200"
                  style={{
                    opacity: isMorphComplete ? 1 : projDescOpacity,
                    transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projDescOpacity) * 15}px, 0)`,
                    pointerEvents: isMorphComplete ? 'auto' : 'none',
                  }}
                >
                  <div className="inline-flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 px-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleFilterChange(category)}
                        className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold font-handwriting transition-all cursor-pointer ${
                          activeFilter === category
                            ? "soft-ui-inset-subtle bg-[#e6e3dc] text-[#e59845] scale-105"
                            : "soft-ui-raised bg-[#eae7e1] text-[#6d6a64] hover:text-[#e59845] border border-[#dedad1]/60"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Real Projects Grid - Soft UI Raised Cards */}
              <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-9 transition-all duration-200"
                style={{
                  opacity: isMorphComplete ? 1 : projCardsOpacity,
                  transform: isMorphComplete ? 'none' : `translate3d(0, ${(1 - projCardsOpacity) * 25}px, 0) scale(${projCardsScale})`,
                }}
              >
                <AnimatePresence>
                  {displayedProjects.map((project, index) => (
                    <div
                      key={project.id}
                      data-morph={`proj-card-${index}`}
                      className="group text-left will-change-transform will-change-opacity h-full flex"
                    >
                      <div className="soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-5 sm:p-6 bg-[#eae7e1] text-[#43413d] flex flex-col justify-between w-full transition-all duration-300 hover:scale-[1.015] select-none">
                        <div>
                          {/* Top: Sunken Bezel Image Frame */}
                          <div className="soft-ui-inset rounded-[24px] p-2.5 sm:p-3 bg-[#e4e1d9] relative overflow-hidden aspect-[16/10] mb-4">
                            <Link to={`/project/${project.id}`} className="block w-full h-full overflow-hidden rounded-[18px] relative">
                              <motion.img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                            </Link>

                            {/* Top-Right Quick Demo Action Button */}
                            {project.demoUrl && project.demoUrl !== "#" && (
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  window.open(project.demoUrl, "_blank", "noopener,noreferrer");
                                }}
                                title="Visit Live Website"
                                className="soft-ui-raised absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-[14px] flex items-center justify-center text-[#e59845] hover:text-[#43413d] hover:scale-110 active:scale-95 transition-all bg-[#eae7e1] shadow-md border border-[#dedad1] cursor-pointer z-20"
                              >
                                <ArrowUpRight size={18} className="stroke-[2.5]" />
                              </button>
                            )}
                          </div>

                          {/* Project Title */}
                          <Link to={`/project/${project.id}`}>
                            <h3 className="text-base sm:text-lg md:text-xl font-black text-[#383a3d] font-digital tracking-tight mb-3 leading-snug hover:text-[#e59845] transition-colors truncate">
                              {project.title}
                            </h3>
                          </Link>

                          {/* Tech Stack Pills in Soft UI Debossed Groove */}
                          {project.tags && project.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {project.tags.slice(0, 3).map((tag, tagIdx) => (
                                <span
                                  key={tagIdx}
                                  className="soft-ui-inset-subtle px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold text-[#6d6a64] font-digital bg-[#e6e3dc]"
                                >
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="soft-ui-inset-subtle px-2 py-0.5 rounded-full text-[10px] font-bold text-[#78756e] font-digital bg-[#e6e3dc]">
                                  +{project.tags.length - 3}
                                </span>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Bottom Milestone Slot & Detail Action Button */}
                        <div className="mt-auto pt-3 border-t border-[#cdc8be]/40">
                          <div className="w-full h-11 soft-ui-inset rounded-full p-1.5 flex items-center justify-between bg-[#e4e1d9]">
                            <div className="flex items-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting pl-3">
                              <Code className="w-3.5 h-3.5 text-[#e59845]" />
                              <span>{project.status || "Live Build"}</span>
                            </div>

                            <Link
                              to={`/project/${project.id}`}
                              className="soft-ui-raised rounded-full px-4 py-1 text-xs font-bold text-[#383a3d] font-handwriting bg-[#eae7e1] hover:text-[#e59845] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 border border-[#dedad1] cursor-pointer"
                            >
                              <span>Explore</span>
                              <ArrowRight size={13} className="text-[#e59845]" />
                            </Link>
                          </div>
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
                    className="soft-ui-raised inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-[#383a3d] font-handwriting hover:text-[#e59845] border border-[#dedad1] shadow-md transition-all cursor-pointer bg-[#eae7e1]"
                  >
                    {showAll ? (
                      <>
                        <ChevronUp size={16} className="text-[#e59845]" />
                        <span>Show Less Projects</span>
                      </>
                    ) : (
                      <>
                        <span>View More Projects ({filteredProjects.length - 3} more)</span>
                        <ArrowRight size={16} className="text-[#e59845]" />
                      </>
                    )}
                  </motion.button>
                </div>
              )}

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
                          : "bg-[#e59845] text-white hover:bg-[#d48937]"
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
                          : "bg-background text-foreground border-border hover:border-[#e59845] hover:text-[#e59845]"
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
