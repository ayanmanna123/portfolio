import { Navbar } from "../components/Navbar";
import { Helmet } from "react-helmet-async";
import { StarBackground } from "@/components/StarBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ScrollToTop } from "../components/ScrollToTop";
import React, { Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Lazy loaded components
const SkillsSection = React.lazy(() => import("../components/SkillsSection").then(module => ({ default: module.SkillsSection })));
const TimelineSection = React.lazy(() => import("../components/TimelineSection"));
const EducationToProjectsMorph = React.lazy(() => import("../components/EducationToProjectsMorph"));
const CertificatesSection = React.lazy(() => import("../components/CertificatesSection").then(module => ({ default: module.CertificatesSection })));
const GithubStatsSection = React.lazy(() => import("../components/GithubStatsSection"));
const GithubStarredSection = React.lazy(() => import("../components/GithubStarredSection"));
const LeetCodeStatsSection = React.lazy(() => import("../components/LeetCodeStatsSection"));
const TestimonialSection = React.lazy(() => import("../components/Testimonial").then(module => ({ default: module.TestimonialSection })));
const ContactSection = React.lazy(() => import("../components/ContactSection").then(module => ({ default: module.ContactSection })));
const Footer = React.lazy(() => import("../components/Footer").then(module => ({ default: module.Footer })));

const Loader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-10 h-10 border-4 border-[#e59845] border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const timer = setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          if (window.lenis) {
            window.lenis.scrollTo(el, {
              offset: -20,
              duration: 1.6,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [location.hash]);
  return (
    <div className="min-h-screen bg-[#eae7e1] text-[#2d2b28] selection:bg-[#e59845]/25 selection:text-[#2d2b28] overflow-x-hidden">
      <Helmet>
        <title>Home | Ayan Manna | Portfolio</title>
        <meta name="description" content="Welcome to Ayan Manna's portfolio. Explore projects, skills, and achievements." />
        <link rel="canonical" href="https://ayanmanna.in/" />
      </Helmet>
      {/* Theme Toggle */}
      {/* Background Effects */}
      <StarBackground />

      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <Suspense fallback={<Loader />}>
          <SkillsSection />
          <TimelineSection />
          <EducationToProjectsMorph />
          <CertificatesSection />
          <GithubStatsSection />
          <GithubStarredSection />
          <LeetCodeStatsSection />
          <TestimonialSection />
          <ContactSection />
        </Suspense>
      </main>

      {/* Footer */}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>

      {/* Scroll To Top */}
      <ScrollToTop />
    </div>
  );
};
