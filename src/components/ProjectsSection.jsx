import { ArrowRight, ArrowUpRight, ExternalLink, Github, ChevronUp, Star, Code, ChevronDown, Play, Eye, X, Info } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import { projects } from "@/data";
import { ProjectDetailsModal } from "./ProjectDetailsModal";
import { VideoPlayer } from "./VideoPlayer";

export const ProjectsSection = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [selectedDeepDiveProject, setSelectedDeepDiveProject] = useState(null);
  const sectionRef = useRef(null);

  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const filterContainerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Line 1: "Featured"
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

      // Line 2: "Projects & Products"
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

      // Line 3: Description
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

      // Filter Pills Container
      if (filterContainerRef.current) {
        gsap.fromTo(
          filterContainerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: filterContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Project Cards
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        let fromVars = { opacity: 0, y: 50 };
        const colPos = index % 3;

        if (colPos === 0) {
          fromVars = { x: -60, opacity: 0 };
        } else if (colPos === 1) {
          fromVars = { y: 60, opacity: 0 };
        } else {
          fromVars = { x: 60, opacity: 0 };
        }

        gsap.fromTo(
          card,
          fromVars,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef.current);

    return () => ctx.revert();
  }, [activeFilter, showAll]);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 3);

  const categories = ["All", ...new Set(projects.map(project => project.category))];

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setShowAll(false);
  };

  const handleVideoPlay = (project) => {
    setSelectedVideo(project);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  const handleOpenDeepDive = (project) => {
    setSelectedDeepDiveProject(project);
  };

  const handleCloseDeepDive = () => {
    setSelectedDeepDiveProject(null);
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen py-16 sm:py-24 px-3 sm:px-6 lg:px-12 bg-[#eae7e1] text-[#43413d] overflow-hidden select-none"
      ref={sectionRef}
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

      <div className="container mx-auto px-3 sm:px-6 max-w-7xl relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-10 sm:mb-14 px-2 sm:px-6">
          <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#f06292]" />
            <span>Portfolio.Works</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-1 leading-tight tracking-tight text-[#43413d]">
            <span ref={line1Ref} className="block text-[#43413d] will-change-transform will-change-opacity">
              Featured
            </span>
            <span
              ref={line2Ref}
              className="block font-handwriting text-2xl sm:text-4xl md:text-5xl text-[#e59845] font-bold mt-0.5 pb-0.5 will-change-transform will-change-opacity"
            >
              Projects & Products
            </span>
          </h2>

          <p
            ref={line3Ref}
            className="text-xs sm:text-sm text-[#78756e] font-handwriting font-medium max-w-xl mx-auto leading-relaxed mt-1 will-change-transform will-change-opacity"
          >
            A curated collection of full-stack applications, modern architectures, and interactive digital experiences.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          ref={filterContainerRef}
          className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none will-change-transform will-change-opacity"
        >
          <div className="inline-flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 px-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilterChange(category)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold font-handwriting transition-all cursor-pointer ${
                  activeFilter === category
                    ? "soft-ui-inset-subtle bg-[#e6e3dc] text-[#e59845] scale-105"
                    : "soft-ui-raised bg-[#eae7e1] text-[#6d6a64] hover:text-[#e59845] border border-[#dedad1]/60"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Real Projects Grid */}
        <div ref={cardsContainerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className="group text-left will-change-transform will-change-opacity h-full flex"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className="soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-5 sm:p-6 bg-[#eae7e1] text-[#43413d] flex flex-col justify-between w-full transition-all duration-300 hover:scale-[1.015]">
                  <div>
                    {/* Top: Sunken Bezel Image Frame */}
                    <div className="soft-ui-inset rounded-[24px] p-2.5 sm:p-3 bg-[#e4e1d9] relative overflow-hidden aspect-[16/10] mb-4">
                      <button
                        type="button"
                        onClick={() => handleOpenDeepDive(project)}
                        className="block w-full h-full overflow-hidden rounded-[18px] relative cursor-pointer text-left focus:outline-none"
                        aria-label={`View details for ${project.title}`}
                      >
                        <motion.img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                      </button>

                      {/* Top-Right Quick Demo Action Button */}
                      {project.demoUrl && project.demoUrl !== "#" && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            window.open(project.demoUrl, "_blank", "noopener,noreferrer");
                          }}
                          title="Visit Live Website"
                          className="soft-ui-raised absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 sm:w-10 sm:h-10 rounded-[14px] flex items-center justify-center text-[#e59845] hover:text-[#43413d] hover:scale-110 active:scale-95 transition-all bg-[#eae7e1] shadow-md border border-[#dedad1] cursor-pointer z-20"
                        >
                          <ArrowUpRight size={18} className="stroke-[2.5]" />
                        </button>
                      )}
                    </div>

                    {/* Project Title */}
                    <button
                      type="button"
                      onClick={() => handleOpenDeepDive(project)}
                      className="text-left w-full cursor-pointer focus:outline-none group/title"
                    >
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-[#383a3d] font-digital tracking-tight mb-2.5 leading-snug group-hover/title:text-[#e59845] transition-colors truncate">
                        {project.title}
                      </h3>
                    </button>

                    {/* Project Description Inset Console Box */}
                    {project.description && (
                      <div
                        onClick={() => handleOpenDeepDive(project)}
                        className="soft-ui-inset-subtle rounded-2xl p-3 mb-3 bg-[#e6e3dc]/70 border border-[#dedad1]/60 min-h-[54px] flex items-center cursor-pointer hover:border-[#e59845]/40 transition-colors"
                      >
                        <p className="text-[#5a5751] font-mono text-xs line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack Pills in Soft UI Debossed Groove */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.slice(0, 3).map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="soft-ui-inset-subtle px-2.5 py-0.5 rounded-full text-[10px] sm:text-[10.5px] font-bold text-[#6d6a64] font-digital bg-[#e6e3dc]"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="soft-ui-inset-subtle px-2 py-0.5 rounded-full text-[10px] font-bold text-[#78756e] font-digital bg-[#e6e3dc]">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Bottom Milestone Slot & Detail Action Button */}
                  <div className="mt-auto pt-3 border-t border-[#cdc8be]/40">
                    <div className="w-full h-11 soft-ui-inset rounded-full p-1.5 flex items-center justify-between bg-[#e4e1d9]">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting pl-3">
                        <Code className="w-3.5 h-3.5 text-[#e59845]" />
                        <span>{project.status || "Live Build"}</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleOpenDeepDive(project)}
                        className="soft-ui-raised rounded-full px-4 py-1 text-xs font-bold text-[#383a3d] font-handwriting bg-[#eae7e1] hover:text-[#e59845] hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 border border-[#dedad1] cursor-pointer"
                      >
                        <span>Explore</span>
                        <ArrowRight size={13} className="text-[#e59845]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More Toggle */}
        {filteredProjects.length > 3 && (
          <div className="text-center mt-12 sm:mt-16">
            <motion.button
              onClick={() => setShowAll(!showAll)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="soft-ui-raised inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-[#383a3d] font-handwriting hover:text-[#e59845] border border-[#dedad1] shadow-md transition-all cursor-pointer bg-[#eae7e1]"
            >
              {showAll ? (
                <>
                  <ChevronUp size={16} className="text-[#e59845]" />
                  <span>Show Less Projects</span>
                </>
              ) : (
                <>
                  <span>View More Projects ({filteredProjects.length - 3} more)</span>
                  <ArrowRight size={16} className="text-[#e59845]" />
                </>
              )}
            </motion.button>
          </div>
        )}

        {/* Soft UI CTA Card */}
        <div className="mt-16 sm:mt-24">
          <div className="soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-8 sm:p-12 max-w-4xl mx-auto bg-[#eae7e1] text-[#43413d] text-center border border-[#dedad1]/60">
            <div className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-2">
              <span className="w-2 h-2 rounded-full bg-[#f06292]" />
              <span>Collaborate</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-3 font-digital text-[#383a3d]">
              Have a Project in Mind?
            </h3>
            <p className="text-xs sm:text-sm text-[#66635d] font-handwriting font-medium mb-8 max-w-xl mx-auto leading-relaxed">
              I'm always open to discussing modern full-stack systems, creative UI experiences, and engineering opportunities.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="#contact"
                className="soft-ui-raised inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-[#383a3d] font-handwriting hover:text-[#e59845] border border-[#dedad1] transition-all cursor-pointer bg-[#eae7e1]"
              >
                <span>Get in Touch</span>
                <ArrowRight size={16} className="text-[#e59845]" />
              </a>

              <a
                href="https://github.com/ayanmanna123"
                target="_blank"
                rel="noopener noreferrer"
                className="soft-ui-raised inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl font-bold text-xs sm:text-sm text-[#6d6a64] font-handwriting hover:text-[#e59845] border border-[#dedad1] transition-all cursor-pointer bg-[#eae7e1]"
              >
                <Github size={16} />
                <span>View GitHub Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={handleCloseVideo}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative bg-background rounded-2xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {selectedVideo.title} Demo
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {selectedVideo.category}
                  </p>
                </div>
                <motion.button
                  onClick={handleCloseVideo}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close video"
                  className="p-2 rounded-full hover:bg-muted transition-colors duration-200"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Video Player */}
              <div className="w-full h-full bg-black">
                <VideoPlayer src={selectedVideo.video} onEnded={handleCloseVideo} />
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <p className="text-muted-foreground text-sm flex-1">
                    Watch the demo of {selectedVideo.title} in action
                  </p>
                  <div className="flex gap-3">
                    <motion.a
                      href={selectedVideo.demoUrl || "#"}
                      target={(!selectedVideo.demoUrl || selectedVideo.demoUrl === "#") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        (!selectedVideo.demoUrl || selectedVideo.demoUrl === "#")
                          ? "bg-muted text-muted-foreground cursor-not-allowed border border-border"
                          : "bg-[#e59845] text-white hover:bg-[#d48937]"
                      }`}
                      onClick={(e) => {
                        if (!selectedVideo.demoUrl || selectedVideo.demoUrl === "#") {
                          e.preventDefault();
                          alert("Website is not available");
                        }
                      }}
                    >
                      Visit Live Site
                    </motion.a>
                    <motion.a
                      href={selectedVideo.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-6 py-2 rounded-lg text-sm font-medium border transition-all duration-300 ${
                        selectedVideo.githubUrl === "#"
                          ? "bg-muted text-muted-foreground cursor-not-allowed border-border"
                          : "bg-background text-foreground border-border hover:border-[#e59845] hover:text-[#e59845]"
                      }`}
                      onClick={(e) => selectedVideo.githubUrl === "#" && e.preventDefault()}
                    >
                      View Code
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deep Dive Modal */}
      <ProjectDetailsModal
        project={selectedDeepDiveProject}
        isOpen={!!selectedDeepDiveProject}
        onClose={handleCloseDeepDive}
      />
    </section>
  );
};

export default ProjectsSection;