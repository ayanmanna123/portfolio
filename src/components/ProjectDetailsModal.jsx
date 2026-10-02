import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, ChevronRight, Layers, Cpu, AlertTriangle, Monitor, Smartphone, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState("desktop");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen && project) {
            console.log("ProjectDetailsModal open for:", project?.title);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen, project]);

    if (!mounted) return null;

    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpen && project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6"
                    style={{ background: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(10px)' }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 30 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 30 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="w-full max-w-5xl bg-background border border-border rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] text-left"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background/95 backdrop-blur-md sticky top-0 z-20">
                            <div className="pr-4">
                                <h2 className="text-lg sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 line-clamp-1">
                                    {project.title}
                                </h2>
                                <p className={`text-xs sm:text-sm font-medium bg-gradient-to-r ${project.accentColor} bg-clip-text text-transparent`}>
                                    {project.category}
                                </p>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
                                aria-label="Close modal"
                            >
                                <X size={20} className="sm:size-6" />
                            </motion.button>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            {/* Hero Section */}
                            <div className="relative h-48 sm:h-72 md:h-80 w-full overflow-hidden group bg-muted">
                                <div className={`absolute inset-0 bg-gradient-to-r ${project.accentColor} opacity-20`} />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover sm:object-center transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 bg-gradient-to-t from-background to-transparent">
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {project.tags.map((tag, i) => (
                                            <span key={i} className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-background/80 backdrop-blur-sm border border-border rounded-full text-[10px] sm:text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 sm:p-8 space-y-6 sm:space-y-10">
                                {/* Project Overview */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                                    <div className="space-y-2 sm:space-y-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/15">
                                        <div className="flex items-center gap-2 text-amber-500 font-semibold text-sm sm:text-base">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-amber-500/10">
                                                <AlertTriangle size={18} />
                                            </div>
                                            <h3>The Problem</h3>
                                        </div>
                                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                                            {project.details?.problem || "No problem statement available."}
                                        </p>
                                    </div>
                                    <div className="space-y-2 sm:space-y-4 p-4 rounded-xl bg-[#EC844D]/5 border border-[#EC844D]/15">
                                        <div className="flex items-center gap-2 text-[#EC844D] dark:text-[#FFAE80] font-semibold text-sm sm:text-base">
                                            <div className="p-1.5 sm:p-2 rounded-lg bg-[#EC844D]/10">
                                                <Layers size={18} className="text-[#EC844D] dark:text-[#FFAE80]" />
                                            </div>
                                            <h3>The Solution</h3>
                                        </div>
                                        <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                                            {project.details?.solution || "No solution description available."}
                                        </p>
                                    </div>
                                </div>

                                {/* Key Features */}
                                {project.details?.features && (
                                    <div className="bg-muted/30 rounded-2xl p-4 sm:p-6 border border-border/50">
                                        <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-2">
                                            <Globe size={18} className="text-[#EC844D] dark:text-[#FFAE80]" />
                                            Key Features
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                                            {project.details.features.map((feature, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className="bg-background p-3.5 sm:p-4 rounded-xl border border-border shadow-sm"
                                                >
                                                    <h4 className="font-semibold text-foreground text-xs sm:text-sm mb-1 sm:mb-2">{feature.title}</h4>
                                                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tech Stack */}
                                <div>
                                    <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 flex items-center gap-2">
                                        <Cpu size={18} className="text-[#EC844D] dark:text-[#FFAE80]" />
                                        Technical Architecture
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                                        {project.details?.techStack && Object.entries(project.details.techStack).map(([category, techs], idx) => (
                                            <div key={idx} className="space-y-2 p-3 rounded-xl bg-background/50 border border-border/50">
                                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{category.replace('_', ' ')}</h4>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {techs.map((tech, tIdx) => (
                                                        <span key={tIdx} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-md text-[11px] font-medium">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Challenges */}
                                {project.details?.challenges && (
                                    <div className="space-y-3 sm:space-y-4">
                                        <h3 className="text-base sm:text-lg font-bold flex items-center gap-2">
                                            <div className="w-1.5 sm:w-2 h-5 sm:h-6 bg-[#EC844D] rounded-full" />
                                            Technical Challenges & Learnings
                                        </h3>
                                        <ul className="grid gap-2.5 sm:gap-3">
                                            {project.details.challenges.map((challenge, idx) => (
                                                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-muted-foreground">
                                                    <ChevronRight size={16} className="text-[#EC844D] dark:text-[#FFAE80] mt-0.5 shrink-0" />
                                                    <span>{challenge}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Screenshots Gallery */}
                                {project.details?.screenshots && (
                                    <div className="space-y-4 sm:space-y-6 pt-4 border-t border-border">
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-base sm:text-lg font-bold">Project Gallery</h3>
                                            <div className="bg-muted p-1 rounded-lg inline-flex">
                                                <button
                                                    onClick={() => setActiveTab("desktop")}
                                                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer ${activeTab === "desktop" ? "bg-background shadow-sm text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                                                        }`}
                                                >
                                                    <Monitor size={14} className="inline mr-1.5" /> Desktop
                                                </button>
                                                <button
                                                    onClick={() => setActiveTab("mobile")}
                                                    className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all cursor-pointer ${activeTab === "mobile" ? "bg-background shadow-sm text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                                                        }`}
                                                >
                                                    <Smartphone size={14} className="inline mr-1.5" /> Mobile
                                                </button>
                                            </div>
                                        </div>

                                        <div className="bg-muted/50 rounded-xl p-2 border border-border">
                                            {project.details.screenshots[activeTab]?.length > 0 ? (
                                                <div className="grid grid-cols-1 gap-4">
                                                    {project.details.screenshots[activeTab].map((shot, idx) => (
                                                        <img
                                                            key={idx}
                                                            src={shot}
                                                            alt={`${activeTab} screenshot ${idx + 1}`}
                                                            className="w-full rounded-lg shadow-sm border border-border"
                                                            loading="lazy"
                                                        />
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="text-center py-10 text-xs sm:text-sm text-muted-foreground">
                                                    <p>No {activeTab} screenshots available.</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="p-4 sm:p-6 border-t border-border bg-background/95 backdrop-blur-md flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center sticky bottom-0 z-20">
                            <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                                View the live application or source code
                            </p>
                            <div className="flex w-full sm:w-auto gap-2.5 sm:gap-3">
                                <a
                                    href={project.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${project.demoUrl === "#"
                                        ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                                        : "bg-[#EC844D] hover:bg-[#DE743C] text-white shadow-lg shadow-[#EC844D]/25"
                                        }`}
                                    onClick={(e) => project.demoUrl === "#" && e.preventDefault()}
                                >
                                    <ExternalLink size={16} />
                                    Live Demo
                                </a>
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all ${project.githubUrl === "#"
                                        ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                                        : "bg-background text-foreground border-border hover:border-[#EC844D] hover:bg-[#EC844D]/5 hover:text-[#EC844D]"
                                        }`}
                                    onClick={(e) => project.githubUrl === "#" && e.preventDefault()}
                                >
                                    <Github size={16} />
                                    View Code
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};
