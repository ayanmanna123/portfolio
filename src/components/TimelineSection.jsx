import React, { useEffect, useRef, useState, useMemo } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { journeyData } from '../data';
import { journeyImages, journeyCategories } from '../data/journeyImages';
import { 
    Briefcase, 
    GraduationCap, 
    ArrowRight,
    ArrowLeft
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const TimelineSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const trackRef = useRef(null);
    const stageRef = useRef(null);
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
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.4,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            if (line2Ref.current) {
                gsap.fromTo(
                    line2Ref.current,
                    { y: 80, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.4,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 65%",
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
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 55%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            const totalSlides = items.length;
            if (totalSlides <= 1) return;

            // Pin the viewport stage for the duration of the track
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
                    const rawIndex = self.progress * (totalSlides - 1);
                    const currentIndex = Math.min(totalSlides - 1, Math.round(rawIndex));
                    setActiveIndex(currentIndex);
                }
            });
        }, sectionRef.current);

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
                duration: 1.0,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
    };

    const totalSlides = items.length;
    const currentItem = items[activeIndex] || items[0];

    // Handle clicking anywhere along the loading track to seek to milestone
    const handleTrackClick = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const fraction = Math.max(0, Math.min(1, clickX / rect.width));
        const targetIndex = Math.round(fraction * (totalSlides - 1));
        scrollToMilestone(targetIndex);
    };

    return (
        <section 
            id="journey" 
            ref={sectionRef} 
            className="relative w-full bg-[#eae7e1] text-[#43413d] select-none transition-colors duration-500 overflow-hidden"
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

            {/* Scroll Track: Height provides the scrub distance */}
            <div 
                ref={trackRef} 
                className="relative w-full"
                style={{ height: `${items.length * 100}vh` }}
            >
                {/* Pinned Stage: Locks to 100vh during track scroll */}
                <div 
                    ref={stageRef} 
                    className="relative w-full h-screen overflow-hidden flex flex-col justify-between py-4 sm:py-6 px-3 sm:px-6 lg:px-12 bg-[#eae7e1]"
                >
                    <div className="container mx-auto px-2 sm:px-6 relative z-10 max-w-6xl w-full flex-1 flex flex-col justify-between">
                        
                        {/* Section Header with Soft UI Clay Typography */}
                        <div ref={headerRef} className="text-center pt-2 sm:pt-4 mb-2 sm:mb-3 px-2 sm:px-6">
                            <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1">
                                <span className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" />
                                <span>Career.Timeline</span>
                            </div>

                            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight tracking-tight text-[#43413d]">
                                <span ref={line1Ref} className="block text-[#43413d] will-change-transform will-change-opacity">
                                    Professional
                                </span>
                                <span
                                    ref={line2Ref}
                                    className="block font-handwriting text-2xl sm:text-4xl md:text-5xl text-[#e59845] font-bold mt-0.5 pb-0.5 will-change-transform will-change-opacity"
                                >
                                    Journey & Milestones
                                </span>
                            </h2>

                            <p
                                ref={line3Ref}
                                className="text-xs sm:text-sm text-[#78756e] font-handwriting font-medium max-w-xl mx-auto leading-relaxed mt-1 will-change-transform will-change-opacity"
                            >
                                A chronological walkthrough of engineering leadership, hackathons, and technical milestones.
                            </p>

                            {/* Milestone Chapter Pills Scrubber */}
                            <div className="flex items-center justify-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 scrollbar-none mt-3 sm:mt-4 z-20 relative">
                                {items.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => scrollToMilestone(idx)}
                                        className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                                            activeIndex === idx
                                                ? "soft-ui-inset-subtle bg-[#e6e3dc] text-[#e59845] scale-105 font-digital font-black shadow-inner border border-[#cdc8be]"
                                                : "soft-ui-raised bg-[#eae7e1] text-[#78756e] hover:text-[#e59845] font-handwriting border border-[#dedad1]/60"
                                        }`}
                                    >
                                        <span className={`w-1.5 h-1.5 rounded-full transition-colors ${activeIndex === idx ? "bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" : "bg-[#bbb7ad]"}`} />
                                        <span>{item.year}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Central Soft UI Milestone Showcase Card */}
                        <div className="relative flex-1 flex items-center justify-center my-auto pb-3">
                            <div className="w-full max-w-4xl soft-ui-raised-card rounded-[32px] sm:rounded-[38px] p-5 sm:p-7 md:p-8 bg-[#eae7e1] text-[#43413d] border border-[#dedad1]/70 transition-all duration-300">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
                                    
                                    {/* Left: Sunken Bezel Picture Frame */}
                                    <div className="lg:col-span-6 flex flex-col justify-center">
                                        <div className="soft-ui-inset rounded-[24px] sm:rounded-[28px] p-2.5 sm:p-3 bg-[#e4e1d9] relative overflow-hidden aspect-[16/11]">
                                            <AnimatePresence mode="wait">
                                                <motion.img 
                                                    key={activeIndex}
                                                    src={currentItem.image} 
                                                    alt={currentItem.role}
                                                    initial={{ opacity: 0, scale: 1.04 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.96 }}
                                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                                    className="w-full h-full object-cover object-center rounded-[18px] sm:rounded-[20px]"
                                                />
                                            </AnimatePresence>

                                            {/* Sunken Year Badge */}
                                            <div className="soft-ui-inset-subtle absolute top-4 left-4 sm:top-5 sm:left-5 px-3 py-1 rounded-full text-xs font-black text-[#e59845] font-digital bg-[#e6e3dc]/95 backdrop-blur-sm shadow-sm pointer-events-none">
                                                {currentItem.year}
                                            </div>

                                            {/* Sunken Category Badge */}
                                            <div className="soft-ui-inset-subtle absolute top-4 right-4 sm:top-5 sm:right-5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5a5751] font-handwriting bg-[#e6e3dc]/95 backdrop-blur-sm shadow-sm pointer-events-none">
                                                {currentItem.category}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Narrative Details & Controls */}
                                    <div className="lg:col-span-6 flex flex-col justify-between text-left h-full py-1">
                                        <div>
                                            {/* Company / Institution Header */}
                                            <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-[#78756e] font-handwriting mb-2">
                                                {currentItem.company.includes('School') || currentItem.company.includes('Vidyapith') || currentItem.company.includes('Institute') ? (
                                                    <GraduationCap className="w-4 h-4 text-[#e59845] shrink-0" />
                                                ) : (
                                                    <Briefcase className="w-4 h-4 text-[#e59845] shrink-0" />
                                                )}
                                                <span className="line-clamp-1">{currentItem.company}</span>
                                            </div>

                                            {/* Role Title */}
                                            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-[#383a3d] font-digital tracking-tight mb-2.5 leading-snug">
                                                {currentItem.role}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-[#66635d] text-xs sm:text-[13px] leading-relaxed mb-4 font-normal">
                                                {currentItem.description}
                                            </p>

                                            {/* Skills Tags */}
                                            <div className="flex flex-wrap gap-1.5 mb-5">
                                                {currentItem.skills.map((skill, sIdx) => (
                                                    <span 
                                                        key={sIdx}
                                                        className="soft-ui-inset-subtle px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold text-[#6d6a64] font-digital bg-[#e6e3dc]"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom Action / Navigation Bar with Arrow Loading Bar (No text, No percentage) */}
                                        <div className="w-full h-12 soft-ui-inset rounded-full p-1.5 flex items-center justify-between bg-[#e4e1d9] border border-[#cdc8be]/60 mt-auto shadow-inner gap-2.5 sm:gap-3">
                                            {/* Prev Button */}
                                            <button
                                                onClick={() => scrollToMilestone(Math.max(0, activeIndex - 1))}
                                                disabled={activeIndex === 0}
                                                className={`soft-ui-raised rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-bold font-handwriting transition-all flex items-center gap-1.5 border border-[#dedad1] cursor-pointer active:scale-95 shrink-0 ${
                                                    activeIndex === 0 ? "opacity-35 cursor-not-allowed text-[#99948a]" : "text-[#6d6a64] hover:text-[#e59845] bg-[#eae7e1]"
                                                }`}
                                                title="Scroll to previous milestone"
                                            >
                                                <ArrowLeft size={13} className="text-[#e59845]" />
                                                <span>Prev</span>
                                            </button>

                                            {/* Full-width Neumorphic Arrow Loading Progress Bar (No text, No percentage) */}
                                            <div 
                                                onClick={handleTrackClick}
                                                className="flex-1 relative flex items-center h-6 px-1 min-w-0 cursor-pointer group"
                                                title="Click anywhere to seek along journey"
                                            >
                                                {/* Sunken Channel Track */}
                                                <div className="w-full h-4 soft-ui-inset rounded-full bg-[#dedad1] p-0.5 relative flex items-center overflow-hidden border border-[#cdc8be]/70 shadow-inner">
                                                    {/* Background Directional Arrow Track */}
                                                    <div className="absolute inset-0 flex items-center justify-around px-3 sm:px-6 opacity-25 pointer-events-none select-none">
                                                        <ArrowRight size={10} className="text-[#78756e]" />
                                                        <ArrowRight size={10} className="text-[#78756e]" />
                                                        <ArrowRight size={10} className="text-[#78756e]" />
                                                        <ArrowRight size={10} className="text-[#78756e]" />
                                                        <ArrowRight size={10} className="text-[#78756e]" />
                                                        <ArrowRight size={10} className="text-[#78756e]" />
                                                    </div>

                                                    {/* Dynamic Glowing Progress Fill */}
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-[#e59845] via-[#f06292] to-[#e59845] shadow-[0_1px_5px_rgba(240,98,146,0.5)] transition-[width] duration-150 ease-out relative flex items-center justify-end pr-0.5 min-w-[20px]"
                                                        style={{ width: `${Math.max(4, Math.min(100, scrollProgress * 100))}%` }}
                                                    >
                                                        {/* Animated Arrow Chevron Flow inside bar */}
                                                        <div className="absolute inset-0 overflow-hidden flex items-center justify-end pr-5 opacity-40 pointer-events-none select-none">
                                                            <span className="text-[8px] font-black text-white tracking-widest animate-pulse font-mono">
                                                                &gt;&gt;&gt;
                                                            </span>
                                                        </div>

                                                        {/* Leading Edge Arrow Head Indicator */}
                                                        <div className="w-3.5 h-3.5 rounded-full bg-[#eae7e1] border-2 border-[#e59845] flex items-center justify-center shadow-sm shrink-0 z-10">
                                                            <ArrowRight size={8} className="text-[#e59845] stroke-[3]" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Next Button */}
                                            <button
                                                onClick={() => scrollToMilestone(activeIndex === totalSlides - 1 ? 0 : activeIndex + 1)}
                                                className="soft-ui-raised rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-bold text-[#383a3d] font-handwriting bg-[#eae7e1] hover:text-[#e59845] transition-all flex items-center gap-1.5 border border-[#dedad1] cursor-pointer active:scale-95 shrink-0 group shadow-sm hover:shadow-md"
                                                title={activeIndex === totalSlides - 1 ? "Restart Timeline" : "Scroll to next milestone"}
                                            >
                                                <span>{activeIndex === totalSlides - 1 ? "Restart" : "Next"}</span>
                                                <ArrowRight size={13} className="text-[#e59845] group-hover:translate-x-0.5 transition-transform" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;
