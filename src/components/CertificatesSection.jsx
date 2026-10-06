import React, { useState, useEffect, useRef, useMemo } from "react";
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

const IssuerBadge = ({ issuer }) => {
    const iss = (issuer || '').toLowerCase();
    if (iss.includes('google')) {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc]">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" />
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.16 0 9.97 0 12c0 2.03.45 3.84 1.25 5.42l4.03-3.15z" />
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span className="text-[11px] font-digital font-bold text-[#383a3d]">Google</span>
            </div>
        );
    }
    if (iss.includes('tata')) {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc]">
                <span className="w-2 h-2 rounded-full bg-[#1b365d]" />
                <span className="text-[11px] font-digital font-bold text-[#1b365d] tracking-wide">Tata Group</span>
            </div>
        );
    }
    if (iss.includes('jio')) {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc]">
                <span className="w-2 h-2 rounded-full bg-[#0a58ca]" />
                <span className="text-[11px] font-digital font-bold text-[#0a58ca]">JioPC</span>
            </div>
        );
    }
    if (iss.includes('coursera') || iss.includes('credly')) {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc]">
                <span className="w-2 h-2 rounded-full bg-[#0056D2]" />
                <span className="text-[11px] font-digital font-bold text-[#0056D2]">Coursera</span>
            </div>
        );
    }
    if (iss.includes('unstop')) {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc]">
                <span className="w-2 h-2 rounded-full bg-[#1c49c2]" />
                <span className="text-[11px] font-digital font-bold text-[#1c49c2]">Unstop</span>
            </div>
        );
    }
    if (iss.includes('udemy')) {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc]">
                <span className="w-2 h-2 rounded-full bg-[#a435f0]" />
                <span className="text-[11px] font-digital font-bold text-[#a435f0]">Udemy</span>
            </div>
        );
    }
    if (iss.includes('kaggle')) {
        return (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc]">
                <span className="w-2 h-2 rounded-full bg-[#20beff]" />
                <span className="text-[11px] font-digital font-bold text-[#008abc]">Kaggle</span>
            </div>
        );
    }
    return (
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc]">
            <Award size={12} className="text-[#e59845]" />
            <span className="text-[11px] font-digital font-bold text-[#5a5751] truncate max-w-[120px]">{issuer || 'Credential'}</span>
        </div>
    );
};

const CertificateCard = ({ cert, cardRef }) => {
    const [aspectRatio, setAspectRatio] = useState(() => getCertAspectRatio(cert));
    const [imgError, setImgError] = useState(false);

    const hasValidImage = cert.image && !imgError;

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
                        hasValidImage ? (
                            <div className="w-full h-full soft-ui-inset rounded-[20px] p-2 bg-[#e4e1d9] flex flex-col justify-between overflow-hidden relative group">
                                <img
                                    src={cert.image}
                                    alt={`Certificate: ${cert.title} - issued by ${cert.issuer || 'Ayan Manna'}`}
                                    loading="lazy"
                                    decoding="async"
                                    onError={() => setImgError(true)}
                                    onLoad={(e) => {
                                        const { naturalWidth, naturalHeight } = e.currentTarget;
                                        if (naturalWidth && naturalHeight) {
                                            setAspectRatio(`${naturalWidth} / ${naturalHeight}`);
                                        }
                                    }}
                                    className="w-full h-full object-cover block rounded-[14px] shadow-sm"
                                />

                                {/* Subtle Flip Prompt in corner */}
                                <div className="absolute bottom-3 right-3 soft-ui-inset-subtle rounded-full px-2.5 py-1 text-[9px] font-bold text-[#5a5751] font-handwriting flex items-center gap-1 bg-[#e6e3dc]/90 backdrop-blur-sm pointer-events-none opacity-90 group-hover:opacity-100 transition-opacity">
                                    <span>Details</span>
                                    <RotateCw size={10} className="text-[#e59845]" />
                                </div>
                            </div>
                        ) : (
                            <div className="w-full h-full soft-ui-inset rounded-[20px] p-4 sm:p-5 bg-[#e4e1d9] flex flex-col justify-between overflow-hidden relative group border border-[#dfdbd1]">
                                {/* Top Header: Issuer + Verified Badge */}
                                <div className="flex items-center justify-between gap-2">
                                    <IssuerBadge issuer={cert.issuer} />
                                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full soft-ui-inset-subtle bg-[#e6e3dc] text-[10px] font-bold text-[#e59845] font-digital">
                                        <BadgeCheck size={12} className="text-[#e59845]" />
                                        <span>VERIFIED</span>
                                    </div>
                                </div>

                                {/* Center: Title & Credential ID */}
                                <div className="my-auto py-3 text-center flex flex-col items-center">
                                    <span className="text-[10px] uppercase tracking-widest text-[#78756e] font-mono font-bold mb-1">
                                        Digital Certificate
                                    </span>
                                    <h3 className="text-sm sm:text-base font-bold text-[#383a3d] font-digital leading-snug line-clamp-2 max-w-[90%]">
                                        {cert.title}
                                    </h3>
                                    {cert.credentialId && (
                                        <div className="mt-2.5 inline-flex items-center gap-1 soft-ui-inset-subtle px-2.5 py-0.5 rounded-full bg-[#e6e3dc] text-[10px] font-mono text-[#5a5751]">
                                            <span className="text-[#78756e] font-bold">ID:</span>
                                            <span className="font-semibold truncate max-w-[140px]">{cert.credentialId}</span>
                                        </div>
                                    )}
                                </div>

                                {/* Bottom bar: Issuer & Date + Flip Prompt */}
                                <div className="flex items-center justify-between text-[10px] text-[#78756e] font-handwriting font-bold pt-2 border-t border-[#cdc8be]/40">
                                    <span className="truncate max-w-[60%]">{cert.issuer} • {cert.date}</span>
                                    <div className="soft-ui-inset-subtle rounded-full px-2 py-0.5 text-[9px] font-bold text-[#5a5751] flex items-center gap-1 bg-[#e6e3dc]">
                                        <span>Details</span>
                                        <RotateCw size={10} className="text-[#e59845]" />
                                    </div>
                                </div>
                            </div>
                        )
                    }
                    back={
                        <div className="w-full h-full flex flex-col justify-between p-4 sm:p-5 soft-ui-inset rounded-[20px] bg-[#e4e1d9] text-left overflow-y-auto custom-scrollbar">
                            <div>
                                {/* Header: Date + Flip Indicator */}
                                <div className="flex items-center justify-between mb-2">
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

                                {/* Credential ID if present */}
                                {cert.credentialId && (
                                    <div className="mb-2 inline-flex items-center gap-1.5 soft-ui-inset-subtle px-2.5 py-1 rounded-lg bg-[#e6e3dc] text-[10px] font-mono text-[#43413d] w-full">
                                        <span className="font-bold text-[#78756e]">Credential ID:</span>
                                        <span className="truncate select-all font-semibold">{cert.credentialId}</span>
                                    </div>
                                )}

                                {/* Description */}
                                <p className="text-[11px] sm:text-xs text-[#66635d] font-normal leading-relaxed line-clamp-3 mb-2.5">
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

const getColumnCount = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
};

export const CertificatesSection = () => {
    const [showAll, setShowAll] = useState(false);
    const displayedCertificates = showAll ? certificates : certificates.slice(0, 3);
    const [columnsCount, setColumnsCount] = useState(getColumnCount);

    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const line1Ref = useRef(null);
    const line2Ref = useRef(null);
    const line3Ref = useRef(null);
    const cardsContainerRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const handleResize = () => {
            setColumnsCount(getColumnCount());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const columns = useMemo(() => {
        const cols = Array.from({ length: columnsCount }, () => []);
        displayedCertificates.forEach((cert, index) => {
            cols[index % columnsCount].push({ cert, index });
        });
        return cols;
    }, [displayedCertificates, columnsCount]);

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
        }, sectionRef.current);

        return () => ctx.revert();
    }, [showAll, columnsCount]);

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

                {/* Masonry Columns */}
                <div ref={cardsContainerRef} className="flex gap-6 sm:gap-7 items-start w-full">
                    {columns.map((columnCards, colIdx) => (
                        <div key={colIdx} className="flex flex-col gap-6 sm:gap-7 flex-1 min-w-0">
                            {columnCards.map(({ cert, index }) => (
                                <CertificateCard
                                    key={cert.id || index}
                                    cert={cert}
                                    cardRef={(el) => (cardRefs.current[index] = el)}
                                />
                            ))}
                        </div>
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
