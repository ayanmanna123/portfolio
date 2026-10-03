import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationData } from '../data';
import { GraduationCap, Calendar, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const EducationSection = () => {
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
                    { y: 50, opacity: 0 },
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

            // Line 2: "Education & Degrees"
            if (line2Ref.current) {
                gsap.fromTo(
                    line2Ref.current,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headerRef.current,
                            start: "top 65%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // Line 3: Description text
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
                            start: "top 55%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            cardRefs.current.forEach((card, index) => {
                if (!card) return;

                gsap.fromTo(
                    card,
                    { opacity: 0, y: 40 },
                    {
                        x: 0,
                        y: 0,
                        opacity: 1,
                        duration: 1.0,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: cardsContainerRef.current || card,
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            id="education"
            ref={sectionRef}
            className="py-16 sm:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden bg-[#eae7e1] text-[#43413d] select-none transition-colors"
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

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header: Styled like SoftUiGreeting */}
                <div ref={headerRef} className="text-center mb-12 sm:mb-16 px-2 sm:px-6">
                    <div ref={line1Ref} className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#f06292]" />
                        <span>Academic.Journey</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-1 leading-tight tracking-tight text-[#43413d]">
                        <span>Academic </span>
                        <span
                            ref={line2Ref}
                            className="text-[#e59845] font-handwriting font-bold"
                        >
                            Education & Degrees
                        </span>
                    </h2>

                    <p
                        ref={line3Ref}
                        className="text-xs sm:text-sm text-[#78756e] font-medium font-handwriting max-w-xl mx-auto leading-relaxed mt-1"
                    >
                        My academic background, qualifications, and formal milestones.
                    </p>
                </div>

                <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-stretch">
                    {educationData.map((item, index) => (
                        <div
                            key={item.id || index}
                            ref={(el) => (cardRefs.current[index] = el)}
                            className="w-full flex"
                        >
                            <div className="soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 flex flex-col justify-between text-left w-full transition-all duration-300 hover:scale-[1.01]">
                                <div>
                                    {/* Top Row: Icon Well + Year Pill */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-13 h-13 rounded-[18px] soft-ui-inset flex items-center justify-center shrink-0 text-[#e59845] p-3">
                                            <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7" />
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#5a5751] font-handwriting soft-ui-inset-subtle px-3 py-1 rounded-full bg-[#e6e3dc]">
                                            <Calendar className="w-3.5 h-3.5 text-[#e59845]" />
                                            <span>{item.year}</span>
                                        </div>
                                    </div>

                                    {/* Institution Name */}
                                    <h3 className="text-lg sm:text-xl font-bold text-[#383a3d] font-digital mb-1 leading-snug">
                                        {item.institution}
                                    </h3>

                                    {/* Degree Title */}
                                    <p className="text-[#e59845] font-handwriting font-bold text-sm sm:text-base mb-2.5">
                                        {item.degree}
                                    </p>

                                    {/* Description */}
                                    <p className="text-[#66635d] text-xs sm:text-sm leading-relaxed mb-5 font-normal">
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
        </section>
    );
};

export default EducationSection;
