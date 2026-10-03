import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { journeyData } from '../data';
import { journeyImages, journeyCategories } from '../data/journeyImages';
import { 
    Briefcase, 
    ChevronDown, 
    GraduationCap, 
    ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const trackRef = useRef(null);
    const stageRef = useRef(null);
    const slidesRef = useRef([]);
    const textCardsRef = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);

    const items = useMemo(() => {
        return journeyData.map((item, idx) => ({
            ...item,
            image: journeyImages[idx] || journeyImages[0],
            category: journeyCategories[idx] || "Milestone"
        }));
    }, []);

    useEffect(() => {
        if (!trackRef.current || !stageRef.current) return;

        const ctx = gsap.context(() => {
            // Header entrance animations
            if (line1Ref.current) {
                gsap.fromTo(
                    line1Ref.current,
                    { y: 200, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 60%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (line2Ref.current) {
                gsap.fromTo(
                    line2Ref.current,
                    { y: 200, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 40%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (line3Ref.current) {
                gsap.fromTo(
                    line3Ref.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 20%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            const totalSlides = items.length;
            if (totalSlides <= 1) return;

            // Pin the viewport stage for the duration of the track
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: trackRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: stageRef.current,
                    pinSpacing: false,
                    scrub: 0.6,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        setScrollProgress(self.progress);
                        // Calculate active slide index
                        const rawIndex = self.progress * (totalSlides - 1);
                        const currentIndex = Math.min(totalSlides - 1, Math.round(rawIndex));
                        setActiveIndex(currentIndex);
                    }
                }
            });

            // Set initial states for slide layers
            slidesRef.current.forEach((slide, i) => {
                if (i === 0) {
                    gsap.set(slide, { clipPath: "inset(0% 0% 0% 0%)", zIndex: 10 });
                } else {
                    gsap.set(slide, { clipPath: "inset(100% 0% 0% 0%)", zIndex: 10 + i });
                }
            });

            // Master curtain reveal timeline
            for (let i = 1; i < totalSlides; i++) {
                const prevSlide = slidesRef.current[i - 1];
                const currentSlide = slidesRef.current[i];
                const prevText = textCardsRef.current[i - 1];
                const currentText = textCardsRef.current[i];
                const innerImg = currentSlide ? currentSlide.querySelector('.journey-bg-img') : null;
                const prevInnerImg = prevSlide ? prevSlide.querySelector('.journey-bg-img') : null;

                const stepDuration = 1;
                const stepStart = (i - 1) * stepDuration;

                // Curtain reveal from bottom to top (Floema signature transition)
                tl.fromTo(
                    currentSlide,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    { 
                        clipPath: "inset(0% 0% 0% 0%)", 
                        duration: stepDuration, 
                        ease: "power2.inOut" 
                    },
                    stepStart
                );

                // Subtle inner image zoom/parallax
                if (innerImg) {
                    tl.fromTo(
                        innerImg,
                        { scale: 1.1, y: "4%" },
                        { scale: 1, y: "0%", duration: stepDuration, ease: "power2.out" },
                        stepStart
                    );
                }

                if (prevInnerImg) {
                    tl.to(
                        prevInnerImg,
                        { scale: 1.05, y: "-2%", duration: stepDuration, ease: "power2.out" },
                        stepStart
                    );
                }

                // Text cross-fade transitions
                if (prevText) {
                    tl.to(
                        prevText,
                        { opacity: 0, y: -25, filter: "blur(4px)", duration: stepDuration * 0.4, ease: "power2.in" },
                        stepStart
                    );
                }

                if (currentText) {
                    tl.fromTo(
                        currentText,
                        { opacity: 0, y: 35, filter: "blur(6px)" },
                        { opacity: 1, y: 0, filter: "blur(0px)", duration: stepDuration * 0.5, ease: "power2.out" },
                        stepStart + stepDuration * 0.3
                    );
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [items]);

    // Handle click on milestone index to jump directly
    const scrollToMilestone = (index) => {
        if (!trackRef.current) return;
        const totalSlides = items.length;
        if (totalSlides <= 1) return;

        const rect = trackRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const trackTop = rect.top + scrollTop;
        const trackHeight = trackRef.current.offsetHeight;
        const targetScroll = trackTop + (index / (totalSlides - 1)) * (trackHeight - window.innerHeight);

        if (window.lenis) {
            window.lenis.scrollTo(targetScroll, {
                duration: 1.2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    };

    return (
        <section 
            id="journey" 
            ref={sectionRef} 
            className="relative w-full bg-background text-foreground selection:bg-[#EC844D] selection:text-white"
        >
            {/* Introductory Section Header */}
            <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6 pt-16 sm:pt-24 max-w-5xl mx-auto">
                <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
                    <span ref={line1Ref} className="block text-foreground will-change-transform will-change-opacity">
                        Professional
                    </span>
                    <span
                        ref={line2Ref}
                        className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
                        style={{ fontFamily: "'Rakyat', cursive" }}
                    >
                        Journey
                    </span>
                </h2>

                <p
                    ref={line3Ref}
                    className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
                >
                    A cinematic walkthrough of leadership, technical milestones, hackathons, and foundational education. Scroll to explore the chapters.
                </p>
            </div>

            {/* Scroll Track: Height provides the scrub distance */}
            <div 
                ref={trackRef} 
                className="relative w-full"
                style={{ height: `${items.length * 100}vh` }}
            >
                {/* Pinned Stage: Locks to 100vh during track scroll */}
                <div 
                    ref={stageRef} 
                    className="relative w-full h-screen overflow-hidden bg-black text-white"
                >
                    {/* Background Slide Curtain Layers */}
                    {items.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => (slidesRef.current[index] = el)}
                            className="absolute inset-0 w-full h-full pointer-events-none will-change-[clip-path]"
                        >
                            {/* Inner Image with Parallax Scale - Clear, Sharp & Vibrant */}
                            <img
                                src={item.image}
                                alt={item.role}
                                className="journey-bg-img absolute inset-0 w-full h-full object-cover object-center will-change-transform brightness-[0.98] contrast-[1.03]"
                                loading={index < 2 ? "eager" : "lazy"}
                            />

                            {/* Clean, Gentle Scrim Only Behind Content (Preserves Full Image Clarity) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/30 z-[1]" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/15 to-transparent z-[1]" />
                        </div>
                    ))}

                    {/* Stage UI Content & Controls (Layered on top of images) */}
                    <div className="relative z-20 w-full h-full flex flex-col justify-end p-5 sm:p-8 md:p-12 lg:p-16 pointer-events-none">
                        
                        {/* Narrative Content & Controls */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end my-auto pb-4">
                            
                            {/* Center Narrative Block: Animated Titles & Descriptions */}
                            <div className="lg:col-span-8 xl:col-span-9 relative min-h-[260px] sm:min-h-[280px] md:min-h-[320px] flex items-end">
                                {items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        ref={(el) => (textCardsRef.current[idx] = el)}
                                        className={`w-full text-left pointer-events-auto transition-all ${
                                            idx === 0 
                                                 ? 'opacity-100 relative' 
                                                 : 'opacity-0 absolute inset-x-0 bottom-0 pointer-events-none'
                                        }`}
                                    >
                                        {/* Company / Institution Header */}
                                        <div className="flex items-center gap-1.5 text-white/90 font-semibold text-xs sm:text-sm md:text-base tracking-wide uppercase drop-shadow-md mb-2.5">
                                            {item.company.includes('School') || item.company.includes('Vidyapith') || item.company.includes('Institute') ? (
                                                <GraduationCap className="w-4 h-4 shrink-0 text-[#EC844D]" />
                                            ) : (
                                                <Briefcase className="w-4 h-4 shrink-0 text-[#EC844D]" />
                                            )}
                                            <span className="line-clamp-1">{item.company}</span>
                                        </div>

                                        {/* Large Role Title */}
                                        <h3 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-white leading-tight tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                                            {item.role}
                                        </h3>

                                        {/* Narrative Description */}
                                        <p className="text-white/85 text-xs sm:text-sm md:text-base max-w-2xl mt-3 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)] line-clamp-3 sm:line-clamp-none font-normal">
                                            {item.description}
                                        </p>

                                        {/* Skill Tags */}
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 pt-1">
                                            {item.skills.map((skill, sIdx) => (
                                                <span
                                                    key={sIdx}
                                                    className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-black/40 backdrop-blur-md border border-white/25 text-white/95 shadow-sm hover:border-[#EC844D]/60 hover:bg-[#EC844D]/20 transition-colors"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Right Column: Floema-Style Floating Highlight Card */}
                            <div className="hidden lg:flex lg:col-span-4 xl:col-span-3 justify-end pointer-events-auto">
                                <motion.div 
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.94, y: 15 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="w-full max-w-[280px] p-4 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col gap-3 group hover:border-[#EC844D]/50 transition-colors"
                                >
                                    {/* Thumbnail Preview with Live Glowing Border */}
                                    <div className="relative w-full h-36 rounded-xl overflow-hidden border border-white/10">
                                        <img 
                                            src={items[activeIndex].image} 
                                            alt={items[activeIndex].role}
                                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                                        />
                                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-[#FFAE80] text-[10px] font-mono font-bold border border-white/15">
                                            {items[activeIndex].year}
                                        </div>
                                    </div>

                                    {/* Card Details */}
                                    <div>
                                        <div className="text-[11px] font-mono text-[#FFAE80] uppercase tracking-wider">
                                            Chapter 0{activeIndex + 1}
                                        </div>
                                        <div className="text-sm font-bold text-white line-clamp-1 mt-0.5">
                                            {items[activeIndex].role}
                                        </div>
                                        <div className="text-xs text-white/60 line-clamp-2 mt-1">
                                            {items[activeIndex].company}
                                        </div>
                                    </div>

                                    {/* Next Step / Jump Button */}
                                    <button 
                                        onClick={() => scrollToMilestone((activeIndex + 1) % items.length)}
                                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-white/10 hover:bg-[#EC844D] text-white text-xs font-medium transition-colors group/btn"
                                    >
                                        <span>
                                            {activeIndex === items.length - 1 ? "Back to start" : "Next Milestone"}
                                        </span>
                                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </motion.div>
                            </div>

                        </div>

                        {/* Bottom Scrubber & Hint Bar */}
                        <div className="w-full pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/60 pointer-events-auto">
                            <div className="flex items-center gap-2">
                                <span className="font-mono text-white/90">01</span>
                                <div className="w-28 sm:w-44 h-1.5 bg-white/15 rounded-full overflow-hidden">
                                    <div 
                                        className="h-full bg-gradient-to-r from-[#EC844D] to-[#FFAE80] rounded-full transition-all duration-100 ease-out shadow-[0_0_6px_#EC844D]"
                                        style={{ width: `${scrollProgress * 100}%` }}
                                    />
                                </div>
                                <span className="font-mono text-white/90">0{items.length}</span>
                            </div>

                            <div className="flex items-center gap-2 text-white/70">
                                <span className="hidden sm:inline">Scroll to scrub journey</span>
                                <ChevronDown className="w-4 h-4 text-[#FFAE80] animate-bounce" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
