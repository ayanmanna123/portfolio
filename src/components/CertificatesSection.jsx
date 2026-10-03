import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { motion } from "framer-motion";
import { Award, ExternalLink, BadgeCheck, Calendar, Sparkles, ChevronUp, ArrowRight } from "lucide-react";
import { certificates } from "@/data";
import FlipCard from "./FlipCard";

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
            className="w-full flex justify-center will-change-transform will-change-opacity"
        >
            <FlipCard
                width="100%"
                aspectRatio={aspectRatio}
                radius={16}
                axis="y"
                flipOnClick
                draggable
                dragDistance={0}
                tilt
                tiltMax={10}
                glare
                glareOpacity={0.16}
                hoverScale={1.02}
                perspective={1100}
                stiffness={170}
                damping={20}
                background="transparent"
                color="inherit"
                shadow
                shadowColor="#EC844D"
                shadowOpacity={0.14}
                className="w-full"
                front={
                    cert.image ? (
                        <img
                            src={cert.image}
                            alt={cert.title}
                            onLoad={(e) => {
                                const { naturalWidth, naturalHeight } = e.currentTarget;
                                if (naturalWidth && naturalHeight) {
                                    setAspectRatio(`${naturalWidth} / ${naturalHeight}`);
                                }
                            }}
                            className="w-full h-full object-cover block rounded-[16px] border border-border/70 shadow-sm"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-card border border-border/70 rounded-[16px] text-muted-foreground/40 p-4">
                            <BadgeCheck className="w-12 h-12" />
                            <span className="text-xs font-mono">Certificate Document</span>
                        </div>
                    )
                }
                back={
                    <div className="w-full h-full flex flex-col justify-between p-3.5 sm:p-4 md:p-5 bg-card/95 border border-border/80 rounded-[16px] backdrop-blur-xl text-left overflow-y-auto">
                        <div>
                            {/* Header: Date + Flip indicator */}
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[11px] sm:text-xs text-muted-foreground font-mono bg-muted/60 px-2.5 py-0.5 rounded-full border border-border">
                                    {cert.date}
                                </span>

                                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-mono text-muted-foreground bg-muted/60 px-2 py-0.5 rounded-full border border-border">
                                    <span>Flip</span>
                                    <span>↺</span>
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xs sm:text-sm md:text-base font-bold text-foreground mb-1 leading-snug line-clamp-2">
                                {cert.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2">
                                {cert.description || "Validated professional skill and course completion certification."}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-2">
                                <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground border border-border/60">
                                    {cert.category}
                                </span>
                                {cert.featured && (
                                    <span className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#EC844D]/15 text-[#EC844D] border border-[#EC844D]/30 font-medium">
                                        Featured
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Action Button: Verify Credential */}
                        <div className="pt-2 border-t border-border/50 flex items-center justify-between gap-2 mt-auto">
                            {cert.verificationLink ? (
                                <a
                                    href={cert.verificationLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-no-flip
                                    className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#EC844D] to-[#DE6F36] text-white text-[11px] sm:text-xs font-bold shadow-md hover:shadow-[#EC844D]/30 hover:brightness-110 transition-all cursor-pointer w-full"
                                    title="Verify Certificate"
                                >
                                    <span>Verify Credential</span>
                                    <ExternalLink size={12} />
                                </a>
                            ) : (
                                <div className="w-full flex items-center justify-between text-[11px] text-muted-foreground py-0.5">
                                    <span className="italic">Academic / Event Record</span>
                                    <span className="text-[#EC844D] font-mono font-medium">Verified</span>
                                </div>
                            )}
                        </div>
                    </div>
                }
            />
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
            // Line 1: "Verified"
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

            // Line 2: "Certifications"
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

            // Line 3: Description
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

            // Individual Certificate Cards with distinct timing, directions, and visible reverse trigger
            cardRefs.current.forEach((card, index) => {
                if (!card) return;

                let fromVars = { opacity: 0 };
                let duration = 1.4;
                let triggerStart = "top 68%";
                const colPos = index % 3;

                if (colPos === 0) {
                    // Card 1 (Left): Left to Right
                    fromVars = { x: -260, opacity: 0 };
                    duration = 1.4;
                    triggerStart = "top 68%";
                } else if (colPos === 1) {
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
    }, [showAll]);

    return (
        <section id="certifications" ref={sectionRef} className="relative py-14 sm:py-20 md:py-28 px-3 sm:px-6 lg:px-12 bg-transparent dark:bg-transparent overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-60 sm:w-72 h-60 sm:h-72 bg-[#EC844D]/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[20%] left-[10%] w-72 sm:w-96 h-72 sm:h-96 bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-3 sm:px-6 max-w-7xl relative">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6">
                    <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
                        <span ref={line1Ref} className="block text-foreground will-change-transform will-change-opacity">
                            Verified
                        </span>
                        <span
                            ref={line2Ref}
                            className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
                            style={{ fontFamily: "'Rakyat', cursive" }}
                        >
                            Certifications
                        </span>
                    </h2>
                    <p
                        ref={line3Ref}
                        className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
                    >
                        A collection of professional certifications validating my technical expertise and commitment to continuous learning. Click any card to explore credential details.
                    </p>
                </div>

                {/* Grid */}
                <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
                    {displayedCertificates.map((cert, index) => (
                        <CertificateCard
                            key={cert.id || index}
                            cert={cert}
                            cardRef={(el) => (cardRefs.current[index] = el)}
                        />
                    ))}
                </div>

                {/* Load More Button */}
                {certificates.length > 3 && (
                    <motion.div
                        className="text-center mt-8 sm:mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: false }}
                    >
                        <motion.button
                            onClick={() => setShowAll(!showAll)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 cursor-pointer ${showAll
                                ? "bg-muted text-foreground border border-border hover:bg-muted/80"
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
                                    View All Certificates
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};
