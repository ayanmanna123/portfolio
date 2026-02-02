import { motion } from "framer-motion";
import { useState } from "react";
import { Award, ExternalLink, BadgeCheck, Calendar, Sparkles, ChevronUp, ArrowRight } from "lucide-react";
import { certificates } from "@/data";

export const CertificatesSection = () => {
    const [showAll, setShowAll] = useState(false);
    const displayedCertificates = showAll ? certificates : certificates.slice(0, 3);

    // Featured items span 2x2 or 2x1 based on index/design
    // Using Tailwind's grid-row-span and grid-col-span

    return (
        <section id="certifications" className="relative py-20 md:py-32 overflow-hidden bg-background">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-50" />
                <div className="absolute bottom-[20%] left-[10%] w-96 h-96 bg-purple-500/5 rounded-full blur-3xl opacity-50" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <Award className="h-4 w-4" />
                        Certifications
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        Verified <span className="text-primary">Skills</span>
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        A collection of professional certifications validating my technical expertise and commitment to continuous learning.
                    </p>
                </motion.div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayedCertificates.map((cert, index) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`
                                group relative overflow-hidden rounded-3xl border border-border/50 bg-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500
                                md:col-span-1
                            `}
                        >
                            <div className="flex flex-col">
                                {/* Top: Image Section */}
                                {cert.image ? (
                                    <div className="relative w-full bg-white/5 border-b border-border/50">
                                        <img
                                            src={cert.image}
                                            alt={cert.title}
                                            className="w-full h-auto object-contain block"
                                        />
                                        {/* Overlay Gradient on Image Only */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                                    </div>
                                ) : (
                                    <div className="w-full aspect-video flex items-center justify-center bg-muted/30 border-b border-border/50">
                                        <BadgeCheck className={`w-12 h-12 text-muted-foreground/30`} />
                                    </div>
                                )}

                                {/* Bottom: Info Section */}
                                <div className="flex-1 flex flex-col p-6 relative">
                                    {/* Header: Icon & Date */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-2 rounded-xl bg-primary/10 text-primary border border-primary/20`}>
                                            <BadgeCheck className="w-5 h-5" />
                                        </div>
                                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground border border-border">
                                            {cert.date}
                                        </span>
                                    </div>

                                    {/* Title & Issuer */}
                                    <div className="mb-4">
                                        <h3 className={`font-bold text-foreground mb-1 leading-tight group-hover:text-primary transition-colors ${cert.featured ? "text-xl md:text-2xl" : "text-lg"}`}>
                                            {cert.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground font-medium">
                                            {cert.issuer}
                                        </p>
                                    </div>

                                    {/* Description (Featured) */}
                                    {cert.featured && (
                                        <p className="text-sm text-muted-foreground/80 line-clamp-2 mb-4">
                                            {cert.description}
                                        </p>
                                    )}

                                    {/* Footer Action */}
                                    <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/40">
                                        <span className="text-xs font-medium text-muted-foreground">{cert.category}</span>
                                        <a
                                            href={cert.verificationLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
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
                        className="text-center mt-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.button
                            onClick={() => setShowAll(!showAll)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${showAll
                                ? "bg-muted text-foreground border border-border hover:bg-muted/80"
                                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                                }`}
                        >
                            {showAll ? (
                                <>
                                    <ChevronUp size={18} />
                                    Show Less
                                </>
                            ) : (
                                <>
                                    View All Certificates
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};
