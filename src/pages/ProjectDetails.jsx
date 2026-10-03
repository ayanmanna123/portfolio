import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Layers,
  Cpu,
  AlertTriangle,
  Monitor,
  Smartphone,
  Globe,
  ChevronRight,
  Star,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Code,
  Sparkles,
  Terminal,
  ShieldCheck,
  Check
} from "lucide-react";
import { projects } from "../data";
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
      <div className="min-h-screen bg-[#eae7e1] text-[#2d2b28] flex flex-col justify-center items-center px-4 font-digital">
        <Helmet>
          <title>Project Not Found | Ayan Manna</title>
        </Helmet>
        <div className="soft-ui-raised-card rounded-[32px] p-8 sm:p-12 max-w-md w-full text-center border border-[#dedad1]">
          <div className="w-16 h-16 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] mx-auto flex items-center justify-center text-[#e59845] mb-4">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black mb-2 text-[#2d2b28]">Project Not Found</h1>
          <p className="text-sm font-mono text-[#5a5751] mb-6">
            The project you are looking for does not exist or has been moved.
          </p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#2d2b28] hover:text-[#e59845] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft size={16} />
            <span>Back to Portfolio</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#eae7e1] text-[#2d2b28] selection:bg-[#e59845]/25 selection:text-[#2d2b28] overflow-x-hidden">
      <Helmet>
        <title>{project.title} | Projects | Ayan Manna</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* Embedded Neumorphic Styles from SoftUiWidgets.jsx */}
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
            box-shadow: 6px 6px 14px #cfcbc2, -6px -6px 14px #ffffff;
          }
          .soft-ui-raised-card {
            background: #eae7e1;
            box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
          }
          .soft-ui-inset {
            background: #e4e1d9;
            box-shadow: inset 3px 3px 6px #cac5bb, inset -3px -3px 6px #ffffff;
          }
          .soft-ui-inset-subtle {
            background: #e6e3dc;
            box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
          }
        `
      }} />

      {/* Ambient Neumorphic Inset Discs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full soft-ui-inset-subtle opacity-30" />
        <div className="absolute top-2/3 -right-20 w-96 h-96 rounded-full soft-ui-inset-subtle opacity-25" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#dedad1_1px,transparent_1px),linear-gradient(90deg,#dedad1_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Top Sticky Soft UI Header */}
      <header className="sticky top-0 z-40 bg-[#eae7e1]/90 backdrop-blur-md border-b border-[#dedad1]">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl h-16 sm:h-20 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-xs sm:text-sm font-digital font-bold text-[#43413d] hover:text-[#e59845] transition-all active:scale-95 shadow-sm group"
          >
            <ArrowLeft size={16} className="text-[#e59845] transition-transform group-hover:-translate-x-1" />
            <span>Back to Projects</span>
          </Link>

          {/* Project Title Status Indicator */}
          <div className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] text-xs font-mono font-semibold text-[#5a5751]">
            <span className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" />
            <span className="truncate max-w-[200px]">{project.title}</span>
          </div>

          <div className="flex items-center gap-3">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-xs sm:text-sm font-digital font-bold text-[#e59845] hover:text-[#2d2b28] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Live Demo</span>
                <ArrowUpRight size={14} className="stroke-[2.5]" />
              </a>
            )}

            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 sm:p-2.5 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#43413d] hover:text-[#e59845] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
                aria-label="View Source on GitHub"
                title="View Source on GitHub"
              >
                <Github size={18} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Project Content */}
      <main className="container mx-auto px-4 sm:px-6 max-w-5xl py-8 sm:py-14">
        {/* Project Title Header */}
        <div className="mb-8 sm:mb-12 text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-xs font-digital font-bold text-[#e59845] mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" />
            <span>PROJECT SPECIFICATION</span>
            <span className="text-[#8e8a82]">/</span>
            <span className="text-[#5a5751]">{project.category || "Full-Stack"}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#2d2b28] font-digital mb-3">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg font-handwriting text-[#e59845] font-normal mb-6">
            Detailed architecture, engineering challenges, problem breakdown, and implementation review.
          </p>

          {/* Project Description Inset Console Readout */}
          <div className="soft-ui-inset rounded-[28px] p-6 sm:p-8 bg-[#e4e1d9] border border-[#cdc8be] relative shadow-inner">
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-[#e59845]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#78756e]">
                Project Overview & Brief
              </span>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-[#383a3d] font-mono leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Full Size Project Showcase Image with Soft UI Sunken Bezel */}
        <div className="soft-ui-inset rounded-[32px] sm:rounded-[40px] p-3 sm:p-5 bg-[#e4e1d9] border border-[#cdc8be] mb-10 sm:mb-14 overflow-hidden shadow-inner">
          <div className="w-full overflow-hidden rounded-[22px] sm:rounded-[28px] border border-[#cdc8be]/60 relative bg-[#dfdbd2]">
            <img
              src={project.image}
              alt={`${project.title} - ${project.category} Project Showcase`}
              className="w-full h-auto max-h-[580px] object-cover object-top"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        {/* Action Links & Tech Stack Bar */}
        <div className="soft-ui-raised-card rounded-[28px] p-5 sm:p-7 bg-[#eae7e1] border border-[#dedad1] mb-10 sm:mb-14 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-digital font-bold text-[#78756e] uppercase tracking-wider mr-1">
              Tech Stack:
            </span>
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="soft-ui-inset-subtle px-3 py-1 rounded-xl text-xs font-digital font-bold text-[#43413d] bg-[#e6e3dc] border border-[#cdc8be]/60 flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#f06292]" />
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] font-digital font-bold text-xs sm:text-sm text-[#e59845] hover:text-[#2d2b28] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <span>Visit Live Application</span>
                <ArrowUpRight size={16} />
              </a>
            )}

            {project.githubUrl && project.githubUrl !== "#" && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] font-digital font-bold text-xs sm:text-sm text-[#43413d] hover:text-[#e59845] shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Github size={16} />
                <span>Source Code</span>
              </a>
            )}
          </div>
        </div>

        {/* The Problem & The Solution Skeuomorphic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-14 text-left">
          {/* Problem Card */}
          <div className="soft-ui-raised-card rounded-[32px] p-6 sm:p-8 bg-[#eae7e1] border border-[#dedad1] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shadow-inner">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#78756e] block">Diagnosis</span>
                  <h2 className="text-xl font-black font-digital text-[#2d2b28]">The Problem</h2>
                </div>
              </div>
              <div className="soft-ui-inset-subtle rounded-2xl p-4 bg-[#e6e3dc]/70 border border-[#dedad1]/60">
                <p className="text-sm font-mono text-[#43413d] leading-relaxed">
                  {project.details?.problem || "Traditional approaches lacked seamless integration, scalability, high latency handling, and modern interactivity."}
                </p>
              </div>
            </div>
          </div>

          {/* Solution Card */}
          <div className="soft-ui-raised-card rounded-[32px] p-6 sm:p-8 bg-[#eae7e1] border border-[#dedad1] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#f06292] shadow-inner">
                  <Layers size={20} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#78756e] block">Architecture</span>
                  <h2 className="text-xl font-black font-digital text-[#2d2b28]">The Solution</h2>
                </div>
              </div>
              <div className="soft-ui-inset-subtle rounded-2xl p-4 bg-[#e6e3dc]/70 border border-[#dedad1]/60">
                <p className="text-sm font-mono text-[#43413d] leading-relaxed">
                  {project.details?.solution || "Engineered an end-to-end modern solution delivering robust performance, intuitive UX, optimized queries, and real-time responsiveness."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Project Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <div className="mb-10 sm:mb-14 text-left">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-6 rounded-full bg-[#e59845]" />
              <h2 className="text-xl sm:text-2xl font-black font-digital text-[#2d2b28]">
                Key Project Highlights
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="soft-ui-raised-card rounded-2xl p-4 sm:p-5 bg-[#eae7e1] border border-[#dedad1] flex items-start gap-3.5"
                >
                  <div className="w-7 h-7 rounded-xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shrink-0 mt-0.5 shadow-inner">
                    <Check size={14} className="stroke-[3]" />
                  </div>
                  <span className="text-xs sm:text-sm font-mono font-medium text-[#383a3d] leading-relaxed">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Core Architecture & Features Breakdown */}
        {project.details?.features && project.details.features.length > 0 && (
          <div className="mb-10 sm:mb-14 text-left">
            <div className="flex items-center gap-2.5 mb-5">
              <Globe size={22} className="text-[#e59845]" />
              <h2 className="text-xl sm:text-2xl font-black font-digital text-[#2d2b28]">
                Core Architecture & Features
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.details.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="soft-ui-raised-card rounded-[28px] p-5 sm:p-6 bg-[#eae7e1] border border-[#dedad1] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-8 h-8 rounded-xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] font-digital font-bold text-xs mb-3 shadow-inner">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-black font-digital text-[#2d2b28] text-base sm:text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#5a5751] leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Stack & Tools Breakdown */}
        {project.details?.techStack && (
          <div className="mb-10 sm:mb-14 text-left">
            <div className="flex items-center gap-2.5 mb-5">
              <Cpu size={22} className="text-[#e59845]" />
              <h2 className="text-xl sm:text-2xl font-black font-digital text-[#2d2b28]">
                Technical Stack & Infrastructure
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(project.details.techStack).map(([category, techs], idx) => (
                <div
                  key={idx}
                  className="soft-ui-raised rounded-2xl p-4 bg-[#eae7e1] border border-[#dedad1] space-y-2.5"
                >
                  <h4 className="text-[11px] font-digital font-bold text-[#78756e] uppercase tracking-wider">
                    {category.replace('_', ' ')}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {techs.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="soft-ui-inset-subtle px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-[#43413d] bg-[#e6e3dc] border border-[#cdc8be]/60"
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

        {/* Engineering Challenges & Learnings */}
        {project.details?.challenges && project.details.challenges.length > 0 && (
          <div className="mb-12 sm:mb-16 text-left">
            <div className="flex items-center gap-2 mb-5">
              <span className="w-2.5 h-6 rounded-full bg-[#f06292]" />
              <h2 className="text-xl sm:text-2xl font-black font-digital text-[#2d2b28]">
                Engineering Challenges & Learnings
              </h2>
            </div>
            <div className="space-y-3.5">
              {project.details.challenges.map((challenge, idx) => (
                <div
                  key={idx}
                  className="soft-ui-raised-card rounded-2xl p-4 sm:p-5 bg-[#eae7e1] border border-[#dedad1] flex items-start gap-3.5"
                >
                  <div className="w-6 h-6 rounded-lg soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shrink-0 mt-0.5 shadow-inner">
                    <ChevronRight size={14} className="stroke-[3]" />
                  </div>
                  <p className="text-xs sm:text-sm font-mono text-[#43413d] leading-relaxed">
                    {challenge}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Tactile Soft UI CTA Card */}
        <div className="soft-ui-raised-card rounded-[36px] p-8 sm:p-12 bg-[#eae7e1] border border-[#dedad1] text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] text-xs font-digital font-bold text-[#e59845] mb-4">
            <Sparkles size={14} className="text-[#f06292]" />
            <span>PROJECT COMPLETED & DEPLOYED</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-digital text-[#2d2b28] mb-3">
            Interested in {project.title}?
          </h2>

          <p className="text-sm sm:text-base font-mono text-[#5a5751] max-w-xl mx-auto mb-8 leading-relaxed">
            Explore the live product, examine the open-source repository on GitHub, or get in touch to discuss the engineering approach.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {project.demoUrl && project.demoUrl !== "#" && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] font-digital font-bold text-sm text-[#e59845] hover:text-[#2d2b28] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
              >
                <span>Launch Live Application</span>
                <ArrowUpRight size={16} className="stroke-[2.5]" />
              </a>
            )}

            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] font-digital font-bold text-sm text-[#43413d] hover:text-[#e59845] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
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
