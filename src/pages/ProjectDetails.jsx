import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, ExternalLink, Github, Layers, Cpu, AlertTriangle,
  Monitor, Smartphone, Globe, ChevronRight, Star, CheckCircle2,
  Calendar, ArrowUpRight, Share2, Eye
} from "lucide-react";
import { projects } from "../data";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the project by id or fallback to title slug
  const project = projects.find(
    (p) => String(p.id) === String(id) || p.title.toLowerCase().replace(/\s+/g, "-") === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center px-4">
        <Helmet>
          <title>Project Not Found | Ayan Manna</title>
        </Helmet>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">The project you are looking for does not exist or has been moved.</p>
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#EC844D] text-white font-bold hover:bg-[#DE743C] transition-all"
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-[#EC844D]/30 selection:text-foreground">
      <Helmet>
        <title>{project.title} | Projects | Ayan Manna</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Top Floating Navigation */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/60">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl h-16 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-[#EC844D] hover:bg-[#DE743C] text-white shadow-sm shadow-[#EC844D]/25 transition-all"
              >
                <span>Live Site</span>
                <ArrowUpRight size={14} />
              </a>
            )}

            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-border text-foreground hover:border-[#EC844D] hover:text-[#EC844D] transition-colors"
                aria-label="View Source on GitHub"
              >
                <Github size={16} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Project Content */}
      <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 sm:py-12">
        {/* Title Header */}
        <div className="mb-6 sm:mb-8 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            {project.description}
          </p>
        </div>

        {/* Full Size Project Showcase Image */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-border/80 shadow-2xl bg-muted mb-10 sm:mb-14">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-auto object-cover object-top"
          />
        </div>

        {/* Action Links & Tech Tags Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-card border border-border mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-1">
              Tech Stack:
            </span>
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary text-secondary-foreground border border-border/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm bg-[#EC844D] hover:bg-[#DE743C] text-white shadow-md shadow-[#EC844D]/25 transition-all"
              >
                <span>Visit Live Website</span>
                <ArrowUpRight size={16} />
              </a>
            )}

            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm border border-border hover:border-[#EC844D] hover:text-[#EC844D] transition-colors"
              >
                <Github size={16} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* Problem & Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14 text-left">
          <div className="p-6 sm:p-8 rounded-2xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-center gap-2.5 text-amber-500 font-bold text-base sm:text-lg mb-3">
              <div className="p-2 rounded-lg bg-amber-500/10">
                <AlertTriangle size={20} />
              </div>
              <h2>The Problem</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.details?.problem || "Traditional approaches lacked seamless integration, scalability, and modern interactivity."}
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-[#EC844D]/5 border border-[#EC844D]/20">
            <div className="flex items-center gap-2.5 text-[#EC844D] dark:text-[#FFAE80] font-bold text-base sm:text-lg mb-3">
              <div className="p-2 rounded-lg bg-[#EC844D]/10">
                <Layers size={20} />
              </div>
              <h2>The Solution</h2>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {project.details?.solution || "Engineered an end-to-end modern solution delivering robust performance, intuitive UX, and real-time responsiveness."}
            </p>
          </div>
        </div>

        {/* Key Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-10 sm:mb-14 text-left">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-[#EC844D] rounded-full" />
              Key Project Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border shadow-sm"
                >
                  <CheckCircle2 size={18} className="text-[#EC844D] shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-foreground">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Features Breakdown */}
        {project.details?.features && project.details.features.length > 0 && (
          <div className="mb-10 sm:mb-14 text-left">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <Globe size={22} className="text-[#EC844D] dark:text-[#FFAE80]" />
              Core Architecture & Features
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {project.details.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="font-bold text-foreground text-base mb-2">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Architecture Breakdown */}
        {project.details?.techStack && (
          <div className="mb-10 sm:mb-14 text-left">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <Cpu size={22} className="text-[#EC844D] dark:text-[#FFAE80]" />
              Technical Stack & Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(project.details.techStack).map(([category, techs], idx) => (
                <div key={idx} className="p-4 rounded-xl bg-card border border-border space-y-2">
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {category.replace('_', ' ')}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[#EC844D]/10 text-[#EC844D] dark:text-[#FFAE80] border border-[#EC844D]/20"
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

        {/* Technical Challenges */}
        {project.details?.challenges && project.details.challenges.length > 0 && (
          <div className="mb-12 sm:mb-16 text-left">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
              <div className="w-2 h-6 bg-[#EC844D] rounded-full" />
              Engineering Challenges & Learnings
            </h2>
            <div className="space-y-3">
              {project.details.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border"
                >
                  <ChevronRight size={18} className="text-[#EC844D] shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-card to-[#FFD8B2]/10 dark:to-[#EC844D]/5 border border-border text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
            Interested in {project.title}?
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-6">
            Explore the live product, examine the open-source repository, or get in touch to discuss the architecture.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-[#EC844D] hover:bg-[#DE743C] text-white shadow-lg shadow-[#EC844D]/25 transition-all"
              >
                <span>Launch Live Site</span>
                <ArrowUpRight size={16} />
              </a>
            )}
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm border border-border text-foreground hover:border-[#EC844D] hover:bg-[#EC844D]/5 transition-all"
            >
              <ArrowLeft size={16} />
              <span>Back to All Projects</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectDetails;
