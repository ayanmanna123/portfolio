import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Award, ExternalLink, BadgeCheck, Sparkles, ChevronUp, ArrowRight, RotateCw } from "lucide-react";
import { certificates } from "@/data";
import FlipCard from "./FlipCard";

gsap.registerPlugin(ScrollTrigger);

const getCertAspectRatio = (cert) => {
    if (cert?.image?.includes('certificates1')) return '3334 / 2480';
    if (cert?.image?.includes('certificates2')) return '4800 / 2960';
    if (cert?.image?.includes('certificates3')) return '2000 / 1125';
    if (cert?.image?.includes('certificates4')) return '3125 / 2209';
    return '1754 / 1240';
};

const CertificateCard = ({ cert, cardRef }) => {
    const [aspectRatio, setAspectRatio] = useState(() => getCertAspectRatio(cert));

    return (
        <div
            ref={cardRef}
            className="w-full flex justify-center will-change-transform will-change-opacity select-none"
        >
            <div className="w-full soft-ui-raised rounded-[28px] sm:rounded-[32px] p-3 sm:p-4 bg-[#eae7e1] transition-all duration-300">
                <FlipCard
                    width="100%"
                    aspectRatio={aspectRatio}
                    radius={20}
                    axis="y"
                    flipOnClick
                    draggable
                    dragDistance={0}
                    tilt
                    tiltMax={8}
                    glare
                    glareOpacity={0.12}
                    hoverScale={1.02}
                    perspective={1100}
                    stiffness={170}
                    damping={20}
                    background="#e4e1d9"
                    color="#43413d"
                    shadow={false}
                    className="w-full"
                    front={
                        cert.image ? (
                            <div className="w-full h-full soft-ui-inset rounded-[20px] p-2 bg-[#e4e1d9] flex flex-col justify-between overflow-hidden relative group">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    onLoad={(e) => {
                                        const { naturalWidth, naturalHeight } = e.currentTarget;
                                        if (naturalWidth && naturalHeight) {
                                            setAspectRatio(`${naturalWidth} / ${naturalHeight}`);
                                        }
                                    }}
                                    className="w-full h-full object-cover block rounded-[14px] shadow-sm"
                                    loading="lazy"
                                />

                                {/* Subtle Flip Prompt in corner */}
                                <div className="absolute bottom-3 right-3 soft-ui-inset-subtle rounded-full px-2.5 py-1 text-[9px] font-bold text-[#5a5751] font-handwriting flex items-center gap-1 bg-[#e6e3dc]/90 backdrop-blur-sm pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                                    <span>Details</span>
                                    <RotateCw size={10} className="text-[#e59845]" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center soft-ui-inset rounded-[20px] bg-[#e4e1d9] text-[#78756e] p-4">
                                <BadgeCheck className="w-12 h-12 text-[#e59845]" />
                                <span className="text-xs font-handwriting font-bold mt-2">Certificate Document</span>
                            </div>
                        )
                    }
                    back={
                        <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 soft-ui-inset rounded-[20px] bg-[#e4e1d9] text-left overflow-y-auto custom-scrollbar">
                            <div>
                                {/* Header: Date + Flip Indicator */}
                                <div className="flex items-center justify-between mb-2.5">
                                    <span className="text-[10px] sm:text-[11px] text-[#5a5751] font-handwriting font-bold soft-ui-inset-subtle px-2.5 py-0.5 rounded-full bg-[#e6e3dc]">
                                        {cert.date}
                                    </span>

                                    <span className="inline-flex items-center gap-1 text-[10px] font-handwriting font-bold text-[#78756e] soft-ui-inset-subtle px-2 py-0.5 rounded-full bg-[#e6e3dc]">
                                        <span>Flip</span>
                                        <span>↺</span>
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xs sm:text-sm md:text-base font-bold text-[#383a3d] font-digital mb-1.5 leading-snug line-clamp-2">
                                    {cert.title}
                                </h3>

                                {/* Description */}
                                <p className="text-[11px] sm:text-xs text-[#66635d] font-normal leading-relaxed line-clamp-3 mb-3">
                                    {cert.description || "Validated professional skill and course completion certification."}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    <span className="text-[10px] font-handwriting font-bold px-2.5 py-0.5 rounded-full soft-ui-raised bg-[#eae7e1] text-[#5a5751]">
                                        {cert.category}
                                    </span>
                                    {cert.featured && (
                                        <span className="text-[10px] font-handwriting font-bold px-2.5 py-0.5 rounded-full soft-ui-raised bg-[#eae7e1] text-[#e59845]">
                                            ★ Featured
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Action Button: Verify Credential */}
                            <div className="pt-2 border-t border-[#cdc8be]/50 flex items-center justify-between gap-2 mt-auto">
                                {cert.verificationLink ? (
                                    <a
                                        href={cert.verificationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        data-no-flip
                                        className="soft-ui-raised hover:scale-105 active:scale-95 inline-flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#eae7e1] text-[#383a3d] text-[11px] sm:text-xs font-bold font-handwriting border border-[#dedad1] transition-all cursor-pointer w-full"
                                        title="Verify Certificate"
                                    >
                                        <span>Verify Credential</span>
                                        <ExternalLink size={12} className="text-[#e59845]" />
                                    </a>
                                ) : (
                                    <div className="w-full flex items-center justify-between text-[11px] text-[#78756e] font-handwriting py-0.5">
                                        <span className="italic">Academic / Event Record</span>
                                        <span className="text-[#e59845] font-bold">Verified ✓</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                />

                {/* Bottom title & metadata outside the flip */}
                <div className="mt-3 px-1.5 flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-[#383a3d] font-digital truncate max-w-[70%]">
                        {cert.title}
                    </span>
                    <span className="text-[10px] font-handwriting font-bold text-[#78756e] soft-ui-inset-subtle px-2 py-0.5 rounded-full bg-[#e6e3dc]">
                        {cert.category || "Skill"}
                    </span>
                </div>
            </div>
        </div>
    );
};

export const CertificatesSection = () => {
    const [showAll, setShowAll] = useState(false);
    const displayedCertificates = showAll ? certificates : certificates.slice(0, 3);

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

                let fromVars = { opacity: 0, y: 40 };
                let duration = 1.0;

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
                            start: "top 75%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [showAll]);

    return (
        <section
            id="certifications"
            ref={sectionRef}
            className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-12 bg-[#eae7e1] text-[#43413d] overflow-hidden select-none transition-colors"
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

            <div className="container mx-auto px-2 sm:px-6 max-w-7xl relative z-10">
                {/* Header: Styled like SoftUiGreeting */}
                <div ref={headerRef} className="text-center mb-12 sm:mb-16 px-2 sm:px-6">
                    <div ref={line1Ref} className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1">
                        <span className="w-2 h-2 rounded-full bg-[#f06292]" />
                        <span>Credentials.Archive</span>
                    </div>

                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-1 leading-tight tracking-tight text-[#43413d]">
                        <span>Verified </span>
                        <span
                            ref={line2Ref}
                            className="text-[#e59845] font-handwriting font-bold"
                        >
                            Certifications
                        </span>
                    </h2>

                    <p
                        ref={line3Ref}
                        className="text-xs sm:text-sm text-[#78756e] font-medium font-handwriting max-w-2xl mx-auto leading-relaxed mt-1"
                    >
                        A collection of professional certifications validating technical expertise and commitment to continuous learning. Click any card to explore credential details.
                    </p>
                </div>

                {/* Grid */}
                <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
                    {displayedCertificates.map((cert, index) => (
                        <CertificateCard
                            key={cert.id || index}
                            cert={cert}
                            cardRef={(el) => (cardRefs.current[index] = el)}
                        />
                    ))}
                </div>

                {/* Toggle View More Button */}
                {certificates.length > 3 && (
                    <motion.div
                        className="text-center mt-10 sm:mt-14"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="soft-ui-raised rounded-2xl px-6 sm:px-8 py-3 font-bold text-xs sm:text-sm text-[#43413d] font-handwriting inline-flex items-center gap-2 hover:scale-105 active:scale-95 transition-all bg-[#eae7e1] border border-[#dedad1] cursor-pointer"
                        >
                            {showAll ? (
                                <>
                                    <ChevronUp size={16} className="text-[#e59845]" />
                                    <span>Show Less</span>
                                </>
                            ) : (
                                <>
                                    <span>View All ({certificates.length}) Certificates</span>
                                    <ArrowRight size={16} className="text-[#e59845]" />
                                </>
                            )}
                        </button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default CertificatesSection;
