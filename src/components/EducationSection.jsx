import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import { educationData } from '../data';
import { GraduationCap, Calendar, Award } from 'lucide-react';

const EducationSection = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const cardsContainerRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Line 1: "Academic"
            if (line1Ref.current) {
                gsap.fromTo(
                    line1Ref.current,
                    { y: 150, opacity: 0 },
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

            // Line 2: "Education & Degrees"
            if (line2Ref.current) {
                gsap.fromTo(
                    line2Ref.current,
                    { y: 150, opacity: 0 },
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

            // Line 3: Description text
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

            // Individual Education Cards with distinct timing, directions, and visible reverse trigger
            cardRefs.current.forEach((card, index) => {
                if (!card) return;

                let fromVars = { opacity: 0 };
                let duration = 1.4;
                let triggerStart = "top 68%";

                if (index === 0) {
                    // Card 1 (Left): Left to Right
                    fromVars = { x: -260, opacity: 0 };
                    duration = 1.4;
                    triggerStart = "top 68%";
                } else if (index === 1) {
                    // Card 2 (Center): Bottom to Top
                    fromVars = { y: 80, opacity: 0 };
                    duration = 1.6;
                    triggerStart = "top 64%";
                } else {
                    // Card 3 (Right): Right to Left
                    fromVars = { x: 260, opacity: 0 };
                    duration = 1.8;
                    triggerStart = "top 60%";
                }

                gsap.fromTo(
                    card,
                    fromVars,
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: duration,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsContainerRef.current || card,
                            start: triggerStart,
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="education" ref={sectionRef} className="py-14 sm:py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 right-0 w-60 sm:w-72 h-60 sm:h-72 bg-[#EC844D]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
                        <span ref={line1Ref} className="block text-foreground will-change-transform will-change-opacity">
                            Academic
                        </span>
                        <span
                            ref={line2Ref}
                            className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
                            style={{ fontFamily: "'Rakyat', cursive" }}
                        >
                            Education & Degrees
                        </span>
                    </h2>
                    <p
                        ref={line3Ref}
                        className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
                    >
                        My academic background and qualifications.
                    </p>
                </div>

                <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-center">
                    {educationData.map((item, index) => (
                        <div
                            key={item.id || index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="w-full will-change-transform will-change-opacity"
                        >
                            <div className="bg-card/90 dark:bg-slate-900/60 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-lg hover:shadow-xl hover:border-[#EC844D]/40 transition-all duration-300 h-full flex flex-col justify-between text-left group">
                                <div>
                                    <div className="flex items-start justify-between mb-5">
                                        <div className="p-2.5 sm:p-3 rounded-xl bg-[#EC844D]/10 text-[#EC844D] dark:text-[#FFAE80] group-hover:bg-[#EC844D] group-hover:text-white transition-colors duration-300">
                                            <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground bg-muted/80 dark:bg-black/40 px-2.5 sm:px-3 py-1 rounded-full border border-border dark:border-white/5 backdrop-blur-md">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {item.year}
                                        </div>
                                    </div>

                                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 group-hover:text-[#EC844D] dark:group-hover:text-[#FFAE80] transition-colors">
                                        {item.institution}
                                    </h3>

                                    <p className="text-[#EC844D] dark:text-[#FFAE80] font-medium mb-3 text-xs sm:text-sm">
                                        {item.degree}
                                    </p>

                                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-5">
                                        {item.description}
                                    </p>
                                </div>

                                {item.score && (
                                    <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#EC844D] dark:text-[#FFAE80] bg-[#EC844D]/10 border border-[#EC844D]/20 px-3 py-1.5 rounded-lg w-fit backdrop-blur-sm mt-auto">
                                        <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#EC844D] dark:text-[#FFAE80]" />
                                        {item.score}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EducationSection;
