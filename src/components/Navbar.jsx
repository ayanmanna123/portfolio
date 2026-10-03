import { useEffect, useState, useRef } from "react";
import {
  Home,
  User,
  Code,
  Briefcase,
  MessageSquare,
  Mail,
  Sun,
  Moon,
  Youtube,
  Volume2,
  VolumeX,
  Pause,
  Play,
  Music,
  Github,
  Linkedin,
  Award,
  Code2,
  Menu,
  X,
  Download,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Dock from "./Dock";
import { scrollToSection } from "@/lib/scrollToSection";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: User },
  { name: "Skills", href: "#skills", icon: Code },
  { name: "Projects", href: "#projects", icon: Briefcase },
  { name: "Certifications", href: "#certifications", icon: Award },
  { name: "GitHub", href: "#github-stats", icon: Github },
  { name: "LeetCode", href: "#leetcode-stats", icon: Code2 },
  { name: "Testimonials", href: "#testimonials", icon: MessageSquare },
  { name: "Contact", href: "#contact", icon: Mail },
];

export const Navbar = () => {
  const { toast } = useToast();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("#hero");
  const [showNavbar, setShowNavbar] = useState(true);
  const [isHoveringBottom, setIsHoveringBottom] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollYRef = useRef(0);
  const audioRef = useRef(null);
  const hasShownToast = useRef(false);

  const mouseX = useMotionValue(Infinity);
  const musicUrl = "/music.mp3";

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? ((resolvedTheme || theme) === "dark") : false;

  const toggleTheme = () => {
    const current = resolvedTheme || theme;
    setTheme(current === "dark" ? "light" : "dark");
  };

  // Audio Logic
  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio(musicUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;
      audioRef.current.preload = "auto";

      const handleCanPlay = () => setIsAudioReady(true);
      audioRef.current.addEventListener("canplaythrough", handleCanPlay);

      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("canplaythrough", handleCanPlay);
          audioRef.current = null;
        }
      };
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current || !isAudioReady) return;

    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }

    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (e.clientY > window.innerHeight - 150) {
        setIsHoveringBottom(true);
      } else {
        setIsHoveringBottom(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isAudioReady && !hasShownToast.current) {
      toast({
        title: (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)] animate-pulse" />
            <span>Experience the Vibe 🎵</span>
          </span>
        ),
        description: "Would you like to enable ambient background music for a better experience?",
        action: (
          <ToastAction altText="Enable Music" onClick={toggleMusic}>
            Enable
          </ToastAction>
        ),
        duration: 8000,
      });
      hasShownToast.current = true;
    }
  }, [isAudioReady, toggleMusic, toast]);

  useEffect(() => {
    let ticking = false;

    const updateScrollMetrics = () => {
      const currentScrollY = window.scrollY;

      // Show/Hide navbar based on scroll direction
      if (currentScrollY > lastScrollYRef.current && currentScrollY > 100) {
        setShowNavbar((prev) => (prev ? false : prev));
      } else {
        setShowNavbar((prev) => (!prev ? true : prev));
      }
      lastScrollYRef.current = currentScrollY;

      // When near the top, always mark #hero as active
      if (currentScrollY < 120) {
        setActiveSection("#hero");
        ticking = false;
        return;
      }

      // Detect active section with viewport calculation
      const sections = navItems
        .map((item) => item.href)
        .filter((href) => href.startsWith("#"));
      
      const scrollPosition = currentScrollY + 250;

      for (const section of sections) {
        if (section === "#projects") {
          const eduEl = document.getElementById("education");
          if (eduEl) {
            const rect = eduEl.getBoundingClientRect();
            const top = rect.top + currentScrollY;
            const height = eduEl.offsetHeight;
            if (scrollPosition >= top + height * 0.45 && scrollPosition < top + height) {
              setActiveSection((prev) => (prev !== "#projects" ? "#projects" : prev));
              break;
            }
          }
          continue;
        }

        const element = document.querySelector(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const top = rect.top + currentScrollY;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection((prev) => (prev !== section ? section : prev));
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollMetrics);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href) => {
    if (href.startsWith("#")) {
      if (location.pathname !== "/" && location.pathname !== "") {
        navigate("/" + href);
        setMobileMenuOpen(false);
        return;
      }

      scrollToSection(href);
    } else {
      window.open(href, "_blank", "noopener,noreferrer");
    }
    setMobileMenuOpen(false);
  };

  // Primary mobile items for compact floating dock
  const primaryMobileNavItems = [
    { name: "Home", href: "#hero", icon: Home },
    { name: "About", href: "#about", icon: User },
    { name: "Projects", href: "#projects", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Contact", href: "#contact", icon: Mail },
  ];

  // Prepare Dock Items for desktop
  const dockItems = [
    ...navItems.map((item) => ({
      icon: <item.icon className="w-5 h-5 pointer-events-none" />,
      label: item.name,
      onClick: () => handleNavClick(item.href),
      isActive: activeSection === item.href,
    })),
    {
      icon: isDark ? (
        <Sun className="w-5 h-5 pointer-events-none text-[#e59845]" />
      ) : (
        <Moon className="w-5 h-5 pointer-events-none text-[#43413d]" />
      ),
      label: isDark ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme,
      isActive: false,
    },
  ];

  return (
    <>
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

      {/* Top Header Bar with Soft UI Clay Discs for Mobile & Desktop */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3.5 transition-all duration-300 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-end pointer-events-auto">
          {/* Top Right Soft UI Clay Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full soft-ui-raised bg-[#eae7e1] text-[#5a5751] hover:text-[#e59845] border border-[#dedad1] flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-[#e59845] pointer-events-none" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-[#43413d] pointer-events-none" />
              )}
            </motion.button>

            {/* GitHub Button - Desktop */}
            <motion.a
              href="https://github.com/ayanmanna123"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-10 h-10 rounded-full soft-ui-raised bg-[#eae7e1] text-[#5a5751] hover:text-[#e59845] border border-[#dedad1] items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            {/* LinkedIn Button - Desktop */}
            <motion.a
              href="https://www.linkedin.com/in/ayan-manna-4a67ab34a/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-10 h-10 rounded-full soft-ui-raised bg-[#eae7e1] text-[#5a5751] hover:text-[#e59845] border border-[#dedad1] items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            {/* YouTube Button - Desktop */}
            <motion.a
              href="https://www.youtube.com/@ayanmanna1007"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-10 h-10 rounded-full soft-ui-raised bg-[#eae7e1] text-[#5a5751] hover:text-[#e59845] border border-[#dedad1] items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="YouTube Channel"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            {/* Music Button / Active Audio Pill in Top Navbar */}
            <AnimatePresence mode="wait">
              {isMusicPlaying ? (
                <motion.div
                  key="audio-active-pill"
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="h-10 soft-ui-raised rounded-full px-3 sm:px-4 bg-[#eae7e1] border border-[#dedad1] flex items-center gap-2 sm:gap-2.5 shadow-md select-none"
                >
                  {/* Animated Equalizer Waves */}
                  <div className="flex items-end gap-1 h-3.5 pb-0.5">
                    <span className="w-1 bg-[#e59845] rounded-full animate-bounce [animation-delay:0ms] h-3" />
                    <span className="w-1 bg-[#f06292] rounded-full animate-bounce [animation-delay:150ms] h-3.5" />
                    <span className="w-1 bg-[#e59845] rounded-full animate-bounce [animation-delay:300ms] h-2" />
                  </div>

                  <span className="text-xs font-digital font-bold text-[#43413d] hidden sm:inline whitespace-nowrap">
                    Audio Active
                  </span>

                  <button
                    onClick={toggleMusic}
                    className="w-7 h-7 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] hover:text-[#2d2b28] cursor-pointer shadow-inner active:scale-95 transition-transform ml-0.5"
                    title="Pause music"
                    aria-label="Pause music"
                  >
                    <Pause className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="audio-idle-btn"
                  onClick={toggleMusic}
                  disabled={!isAudioReady}
                  className={cn(
                    "w-10 h-10 rounded-full border border-[#dedad1] flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95",
                    "soft-ui-raised bg-[#eae7e1] text-[#78756e] hover:text-[#e59845]",
                    !isAudioReady && "opacity-50 cursor-not-allowed"
                  )}
                  whileHover={{ scale: isAudioReady ? 1.05 : 1 }}
                  whileTap={{ scale: isAudioReady ? 0.95 : 1 }}
                  title={isAudioReady ? "Enable background music" : "Loading music..."}
                  aria-label={isAudioReady ? "Enable background music" : "Loading music"}
                >
                  <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-[#78756e]" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "flex md:hidden w-10 h-10 rounded-full border border-[#dedad1] items-center justify-center cursor-pointer shadow-md transition-all active:scale-95",
                mobileMenuOpen
                  ? "soft-ui-inset bg-[#e4e1d9] text-[#e59845]"
                  : "soft-ui-raised bg-[#eae7e1] text-[#5a5751] hover:text-[#e59845]"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={mobileMenuOpen ? "Close Menu" : "Open Menu"}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Soft UI Drawer / Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#eae7e1]/98 backdrop-blur-xl flex flex-col md:hidden pt-20 pb-8 px-6 overflow-y-auto text-[#43413d]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col flex-1 justify-between max-w-sm mx-auto w-full">
              {/* Menu Links */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-2 px-1">
                  <span className="w-2 h-2 rounded-full bg-[#f06292]" />
                  <span>Quick Navigation</span>
                </div>
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all cursor-pointer",
                        isActive
                          ? "soft-ui-inset bg-[#e4e1d9] text-[#e59845] font-black border border-[#cdc8be] shadow-inner"
                          : "soft-ui-raised bg-[#eae7e1] text-[#43413d] font-handwriting font-bold hover:text-[#e59845] border border-[#dedad1]/60"
                      )}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("w-4 h-4", isActive ? "text-[#e59845]" : "text-[#78756e]")} />
                        <span className="text-sm font-medium font-digital">{item.name}</span>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_8px_rgba(240,98,146,0.8)]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Social & Resume Links in Mobile Drawer */}
              <div className="pt-5 border-t border-[#cdc8be]/50 mt-6 space-y-4">
                <div className="flex items-center justify-around gap-2 soft-ui-inset rounded-2xl p-2.5 bg-[#e4e1d9]">
                  <a
                    href="https://github.com/ayanmanna123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl text-[#6d6a64] hover:text-[#e59845] transition-colors flex flex-col items-center gap-1 font-digital text-[11px]"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ayan-manna-4a67ab34a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl text-[#6d6a64] hover:text-[#e59845] transition-colors flex flex-col items-center gap-1 font-digital text-[11px]"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@ayanmanna1007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl text-[#6d6a64] hover:text-[#e59845] transition-colors flex flex-col items-center gap-1 font-digital text-[11px]"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                    <span>YouTube</span>
                  </a>
                </div>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-6 rounded-2xl soft-ui-raised bg-[#eae7e1] text-[#383a3d] hover:text-[#e59845] font-bold text-sm font-handwriting flex items-center justify-center gap-2 border border-[#dedad1] shadow-md transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#e59845]" />
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop macOS Dock Bottom Navbar */}
      <motion.div
        className={cn(
          "hidden md:block fixed bottom-4 left-1/2 -translate-x-1/2 z-40",
          "transition-transform duration-300 ease-in-out",
          showNavbar || isHoveringBottom ? "translate-y-0" : "translate-y-28"
        )}
        style={{ willChange: "transform" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Dock
          items={dockItems}
          baseItemSize={46}
          magnification={68}
          distance={140}
        />
      </motion.div>

      {/* Mobile Floating Bottom Bar for Quick Navigation */}
      <motion.div
        className={cn(
          "flex md:hidden fixed bottom-3 left-1/2 transform -translate-x-1/2 z-40",
          "transition-transform duration-300 ease-in-out w-[92%] max-w-sm",
          showNavbar ? "translate-y-0" : "translate-y-24"
        )}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <nav
          aria-label="Mobile Navigation"
          className="w-full soft-ui-raised-card bg-[#eae7e1] border border-[#dedad1] shadow-xl rounded-2xl p-1.5 flex items-center justify-between gap-1"
        >
          {primaryMobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "flex-1 py-2 px-1 flex flex-col items-center justify-center rounded-xl transition-all relative text-xs cursor-pointer",
                  isActive
                    ? "soft-ui-inset bg-[#e4e1d9] text-[#e59845] font-bold shadow-inner"
                    : "text-[#6d6a64] hover:text-[#383a3d]"
                )}
                aria-label={item.name}
              >
                <Icon className={cn("w-4 h-4 mb-0.5", isActive && "stroke-[2.5px] text-[#e59845]")} />
                <span className="text-[10px] leading-tight truncate font-digital">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]"
                  />
                )}
              </button>
            );
          })}
          {/* More / Menu trigger in mobile dock */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "flex-1 py-2 px-1 flex flex-col items-center justify-center rounded-xl transition-all relative text-xs cursor-pointer",
              mobileMenuOpen
                ? "soft-ui-inset bg-[#e4e1d9] text-[#e59845] font-bold shadow-inner"
                : "text-[#6d6a64] hover:text-[#383a3d]"
            )}
            aria-label="More sections"
          >
            <Menu className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] leading-tight font-digital">More</span>
          </button>
        </nav>
      </motion.div>
    </>
  );
};

export default Navbar;
