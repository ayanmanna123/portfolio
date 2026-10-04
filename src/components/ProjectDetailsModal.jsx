import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ExternalLink,
  Github,
  ChevronRight,
  Layers,
  Cpu,
  AlertTriangle,
  Monitor,
  Smartphone,
  Globe,
  ArrowUpRight,
  Terminal,
  Check,
  Code2
} from "lucide-react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

export const ProjectDetailsModal = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("desktop");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock scroll & Lenis when modal is open
  useEffect(() => {
    if (isOpen && project) {
      document.body.style.overflow = "hidden";
      if (window.lenis) {
        window.lenis.stop();
      }
    } else {
      document.body.style.overflow = "unset";
      if (window.lenis) {
        window.lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "unset";
      if (window.lenis) {
        window.lenis.start();
      }
    };
  }, [isOpen, project]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          data-lenis-prevent="true"
          data-lenis-prevent-wheel="true"
          data-lenis-prevent-touch="true"
          className="fixed inset-0 z-[100000] flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 select-auto"
          style={{ background: "rgba(18, 17, 16, 0.72)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          onClick={onClose}
        >
          {/* Subtle Soft UI Styles & Modal Scrollbar */}
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
                box-shadow: 4px 4px 10px #d1ccc2, -2px -2px 6px rgba(255, 255, 255, 0.5);
              }
              .soft-ui-raised-card {
                background: #eae7e1;
                box-shadow: 6px 6px 14px #d1ccc2, -3px -3px 8px rgba(255, 255, 255, 0.5);
              }
              .soft-ui-inset {
                background: #e4e1d9;
                box-shadow: inset 3px 3px 6px #cbc6bc, inset -2px -2px 5px rgba(255, 255, 255, 0.5);
              }
              .soft-ui-inset-subtle {
                background: #e6e3dc;
                box-shadow: inset 2px 2px 5px #cec9bf, inset -1px -1px 3px rgba(255, 255, 255, 0.5);
              }
              .modal-scrollbar::-webkit-scrollbar {
                width: 6px;
              }
              .modal-scrollbar::-webkit-scrollbar-track {
                background: #e4e1d9;
                border-radius: 9999px;
              }
              .modal-scrollbar::-webkit-scrollbar-thumb {
                background: #cac5bb;
                border-radius: 9999px;
              }
              .modal-scrollbar::-webkit-scrollbar-thumb:hover {
                background: #e59845;
              }
              .modal-scrollbar {
                scrollbar-width: thin;
                scrollbar-color: #cac5bb #e4e1d9;
              }
            `
          }} />

          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 40 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            data-lenis-prevent="true"
            data-lenis-prevent-wheel="true"
            data-lenis-prevent-touch="true"
            className="w-full max-w-5xl bg-[#eae7e1] border border-[#dedad1] rounded-t-[32px] sm:rounded-[32px] overflow-hidden shadow-[0_24px_60px_-12px_rgba(0,0,0,0.45)] flex flex-col max-h-[92vh] sm:max-h-[90vh] text-left relative select-auto pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#dedad1] bg-[#eae7e1]/95 backdrop-blur-md sticky top-0 z-30 shrink-0">
              <div className="pr-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] text-[11px] font-digital font-bold text-[#e59845] mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f06292]" />
                  <span>{project.category || "Project Specification"}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black font-digital text-[#2d2b28] line-clamp-1">
                  {project.title}
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onClose}
                className="w-10 h-10 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] flex items-center justify-center text-[#43413d] hover:text-[#e59845] transition-colors cursor-pointer shrink-0 shadow-sm"
                aria-label="Close modal"
              >
                <X size={18} />
              </motion.button>
            </div>

            {/* Scrollable Content Body */}
            <div
              data-lenis-prevent="true"
              data-lenis-prevent-wheel="true"
              data-lenis-prevent-touch="true"
              className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 modal-scrollbar overscroll-contain"
              style={{
                WebkitOverflowScrolling: "touch",
                touchAction: "pan-y"
              }}
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {/* Sunken Bezel Hero Image Frame */}
              <div className="soft-ui-inset rounded-[28px] p-3 sm:p-4 bg-[#e4e1d9] border border-[#cdc8be] overflow-hidden shadow-inner">
                <div className="relative h-48 sm:h-72 md:h-80 w-full overflow-hidden rounded-[20px] bg-[#dfdbd2] border border-[#cdc8be]/60">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover sm:object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 bg-gradient-to-t from-[#2d2b28]/85 via-[#2d2b28]/45 to-transparent">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 bg-[#eae7e1]/95 backdrop-blur-sm border border-[#dedad1] rounded-xl text-[10px] sm:text-xs font-digital font-bold text-[#2d2b28] shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Description Inset Readout Console */}
              <div className="soft-ui-inset rounded-[24px] p-5 sm:p-6 bg-[#e4e1d9] border border-[#cdc8be] shadow-inner">
                <div className="flex items-center gap-2 mb-2.5">
                  <Terminal className="w-4 h-4 text-[#e59845]" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#78756e]">
                    Full Project Description & Overview
                  </span>
                </div>
                <p className="text-xs sm:text-sm md:text-base font-mono text-[#383a3d] leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Project Overview: Problem & Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="soft-ui-raised rounded-2xl p-5 sm:p-6 bg-[#eae7e1] border border-[#dedad1] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shadow-inner">
                      <AlertTriangle size={18} />
                    </div>
                    <h3 className="font-digital font-bold text-base text-[#2d2b28]">The Problem</h3>
                  </div>
                  <div className="soft-ui-inset-subtle rounded-xl p-3.5 bg-[#e6e3dc]/70 border border-[#dedad1]/60">
                    <p className="font-mono text-xs sm:text-sm text-[#43413d] leading-relaxed">
                      {project.details?.problem || "Traditional approaches lacked seamless integration, scalability, high latency handling, and modern interactivity."}
                    </p>
                  </div>
                </div>

                <div className="soft-ui-raised rounded-2xl p-5 sm:p-6 bg-[#eae7e1] border border-[#dedad1] space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#f06292] shadow-inner">
                      <Layers size={18} />
                    </div>
                    <h3 className="font-digital font-bold text-base text-[#2d2b28]">The Solution</h3>
                  </div>
                  <div className="soft-ui-inset-subtle rounded-xl p-3.5 bg-[#e6e3dc]/70 border border-[#dedad1]/60">
                    <p className="font-mono text-xs sm:text-sm text-[#43413d] leading-relaxed">
                      {project.details?.solution || "Engineered an end-to-end modern solution delivering robust performance, intuitive UX, optimized queries, and real-time responsiveness."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Project Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-5 rounded-full bg-[#e59845]" />
                    <h3 className="text-base sm:text-lg font-black font-digital text-[#2d2b28]">
                      Key Project Highlights
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="soft-ui-raised rounded-xl p-3.5 sm:p-4 bg-[#eae7e1] border border-[#dedad1] flex items-start gap-3"
                      >
                        <div className="w-6 h-6 rounded-lg soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shrink-0 mt-0.5 shadow-inner">
                          <Check size={13} className="stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm font-mono text-[#43413d] leading-relaxed">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features & Architecture */}
              {project.details?.features && project.details.features.length > 0 && (
                <div className="soft-ui-raised-card rounded-[28px] p-5 sm:p-7 bg-[#eae7e1] border border-[#dedad1]">
                  <h3 className="text-base sm:text-lg font-black font-digital text-[#2d2b28] mb-4 flex items-center gap-2">
                    <Globe size={18} className="text-[#e59845]" />
                    <span>Key Features & Architecture</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {project.details.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="soft-ui-raised rounded-xl p-4 bg-[#eae7e1] border border-[#dedad1]"
                      >
                        <div className="w-6 h-6 rounded-lg soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] font-digital font-bold text-[11px] mb-2 shadow-inner">
                          {String(idx + 1).padStart(2, "0")}
                        </div>
                        <h4 className="font-digital font-bold text-xs sm:text-sm text-[#2d2b28] mb-1.5">
                          {feature.title}
                        </h4>
                        <p className="font-mono text-xs text-[#5a5751] leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Architecture */}
              {project.details?.techStack && (
                <div>
                  <h3 className="text-base sm:text-lg font-black font-digital text-[#2d2b28] mb-4 flex items-center gap-2">
                    <Cpu size={18} className="text-[#e59845]" />
                    <span>Technical Architecture & Tech Stack</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    {Object.entries(project.details.techStack).map(([category, techs], idx) => (
                      <div key={idx} className="space-y-2 p-3.5 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1]">
                        <h4 className="text-[11px] font-digital font-bold text-[#78756e] uppercase tracking-wider">
                          {category.replace("_", " ")}
                        </h4>
                        <div className="flex flex-wrap gap-1.5">
                          {techs.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="soft-ui-inset-subtle px-2 py-0.5 rounded-lg text-[11px] font-mono font-bold text-[#43413d] bg-[#e6e3dc] border border-[#cdc8be]/60"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges */}
              {project.details?.challenges && project.details.challenges.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-base sm:text-lg font-black font-digital text-[#2d2b28] flex items-center gap-2">
                    <span className="w-2 h-5 rounded-full bg-[#f06292]" />
                    <span>Technical Challenges & Learnings</span>
                  </h3>
                  <div className="space-y-2.5">
                    {project.details.challenges.map((challenge, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 rounded-xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1]"
                      >
                        <div className="w-5 h-5 rounded-md soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shrink-0 mt-0.5">
                          <ChevronRight size={14} className="stroke-[3]" />
                        </div>
                        <span className="text-xs sm:text-sm font-mono text-[#43413d] leading-relaxed">
                          {challenge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Screenshots Gallery */}
              {project.details?.screenshots && (
                <div className="space-y-4 pt-4 border-t border-[#dedad1]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-black font-digital text-[#2d2b28]">
                      Project Gallery
                    </h3>
                    <div className="soft-ui-inset rounded-xl p-1 bg-[#e4e1d9] border border-[#cdc8be] inline-flex gap-1">
                      <button
                        onClick={() => setActiveTab("desktop")}
                        className={`px-3 py-1 rounded-lg text-xs font-digital font-bold transition-all cursor-pointer ${
                          activeTab === "desktop"
                            ? "soft-ui-raised bg-[#eae7e1] text-[#e59845] shadow-sm"
                            : "text-[#78756e] hover:text-[#2d2b28]"
                        }`}
                      >
                        <Monitor size={13} className="inline mr-1" /> Desktop
                      </button>
                      <button
                        onClick={() => setActiveTab("mobile")}
                        className={`px-3 py-1 rounded-lg text-xs font-digital font-bold transition-all cursor-pointer ${
                          activeTab === "mobile"
                            ? "soft-ui-raised bg-[#eae7e1] text-[#e59845] shadow-sm"
                            : "text-[#78756e] hover:text-[#2d2b28]"
                        }`}
                      >
                        <Smartphone size={13} className="inline mr-1" /> Mobile
                      </button>
                    </div>
                  </div>

                  <div className="soft-ui-inset rounded-2xl p-3 bg-[#e4e1d9] border border-[#cdc8be]">
                    {project.details.screenshots[activeTab]?.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {project.details.screenshots[activeTab].map((shot, idx) => (
                          <img
                            key={idx}
                            src={shot}
                            alt={`${activeTab} screenshot ${idx + 1}`}
                            className="w-full rounded-xl shadow-sm border border-[#cdc8be]/60"
                            loading="lazy"
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10 text-xs sm:text-sm font-mono text-[#78756e]">
                        <p>No {activeTab} screenshots available.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-[#dedad1] bg-[#eae7e1] flex flex-col sm:flex-row gap-3 sm:gap-4 justify-between items-center sticky bottom-0 z-30 shrink-0">
              <p className="text-xs font-mono text-[#78756e] hidden sm:block">
                View the live application or source code repository
              </p>
              <div className="flex w-full sm:w-auto gap-2.5 sm:gap-3">
                {project.demoUrl && project.demoUrl !== "#" && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] font-digital font-bold text-xs sm:text-sm text-[#e59845] hover:text-[#2d2b28] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <ExternalLink size={15} />
                    <span>Live Demo</span>
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== "#" && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] font-digital font-bold text-xs sm:text-sm text-[#43413d] hover:text-[#e59845] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                  >
                    <Github size={15} />
                    <span>View Code</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};
