import { motion } from "framer-motion";
import { useState } from "react";
import { Award, ExternalLink, BadgeCheck, Calendar, Sparkles, ChevronUp, ArrowRight } from "lucide-react";
import { certificates } from "@/data";

export const CertificatesSection = () => {
    const [showAll, setShowAll] = useState(false);
    const displayedCertificates = showAll ? certificates : certificates.slice(0, 3);

    return (
        <section id="certifications" className="relative py-16 sm:py-24 md:py-32 overflow-hidden bg-background">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-60 sm:w-72 h-60 sm:h-72 bg-[#EC844D]/10 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[20%] left-[10%] w-72 sm:w-96 h-72 sm:h-96 bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-3 sm:px-6 max-w-7xl relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-10 sm:mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-[#EC844D]/10 text-[#EC844D] dark:text-[#FFAE80] border border-[#EC844D]/20 text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-[0_0_15px_rgba(236,132,77,0.15)]"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Award className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                        Certifications
                    </motion.div>

                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-6 leading-tight">
                        <span className="block text-foreground">Verified</span>
                        <span className="block font-rakyat text-3xl sm:text-5xl md:text-6xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal" style={{ fontFamily: "'Rakyat', cursive" }}>
                            Certifications
                        </span>
                    </h2>
                    <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                        A collection of professional certifications validating my technical expertise and commitment to continuous learning.
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {displayedCertificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border/60 bg-card hover:border-[#EC844D]/40 hover:shadow-xl hover:shadow-[#EC844D]/10 transition-all duration-500 text-left flex flex-col justify-between"
                        >
                            <div className="flex flex-col h-full">
                                {/* Image Section */}
                                {cert.image ? (
                                    <div className="relative w-full bg-muted/20 border-b border-border/50 overflow-hidden">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-auto object-contain block transition-transform duration-500 group-hover:scale-102"
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-video flex items-center justify-center bg-muted/30 border-b border-border/50">
                                        <BadgeCheck className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground/30" />
                                    </div>
                                )}

                                {/* Info Section */}
                                <div className="flex-1 flex flex-col p-4 sm:p-6 relative">
                                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                                        <div className="p-1.5 sm:p-2 rounded-xl bg-[#EC844D]/10 text-[#EC844D] dark:text-[#FFAE80] border border-[#EC844D]/20">
                                            <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#EC844D] dark:text-[#FFAE80]" />
                                        </div>
                                        <span className="text-[11px] sm:text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                                            {cert.date}
                                        </span>
                                    </div>

                                    <div className="mb-3 sm:mb-4">
                                        <h3 className={`font-bold text-foreground mb-1 leading-snug group-hover:text-[#EC844D] dark:group-hover:text-[#FFAE80] transition-colors ${cert.featured ? "text-base sm:text-xl" : "text-sm sm:text-lg"}`}>
                                            {cert.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-muted-foreground font-medium">
                                            {cert.issuer}
                                        </p>
                                    </div>

                                    {cert.featured && (
                                        <p className="text-xs sm:text-sm text-muted-foreground/80 line-clamp-2 mb-3 sm:mb-4">
                                            {cert.description}
                                        </p>
                                    )}

                                    <div className="mt-auto pt-3 sm:pt-4 flex items-center justify-between border-t border-border/40">
                                        <span className="text-[11px] sm:text-xs font-medium text-muted-foreground">{cert.category}</span>
                                        <a
                                            href={cert.verificationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1 text-xs font-medium text-[#EC844D] dark:text-[#FFAE80] hover:underline"
                                            title="Verify Certificate"
                                        >
                                            Verify <ExternalLink size={12} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Load More Button */}
                {certificates.length > 3 && (
                    <motion.div
                        className="text-center mt-8 sm:mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
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
