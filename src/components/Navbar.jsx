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
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Dock from "./Dock";

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
        title: "Experience the Vibe 🎵",
        description: "Would you like to enable background music for a better experience?",
        action: (
          <ToastAction altText="Enable Music" onClick={toggleMusic}>
            Enable
          </ToastAction>
        ),
        duration: 8000,
      });
      hasShownToast.current = true;
    }
  }, [isAudioReady, toast]);

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

      // Detect active section with viewport calculation
      const sections = navItems
        .map((item) => item.href)
        .filter((href) => href.startsWith("#"));
      
      const scrollPosition = currentScrollY + 160;

      for (const section of sections) {
        const element = document.querySelector(section);
        if (element) {
          const top = element.offsetTop;
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
      const element = document.querySelector(href);
      if (element) {
        if (window.lenis) {
          window.lenis.scrollTo(element, {
            offset: -40,
            duration: 1.3,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        } else {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
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
      className: activeSection === item.href ? "text-primary font-bold" : "text-gray-500",
    })),
    {
      icon: isDark ? <Sun className="w-5 h-5 pointer-events-none" /> : <Moon className="w-5 h-5 pointer-events-none" />,
      label: isDark ? "Light Mode" : "Dark Mode",
      onClick: toggleTheme,
    },
  ];

  return (
    <>
      {/* Top Header Bar for Mobile & Desktop */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 transition-all duration-300 pointer-events-none"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-end pointer-events-auto">
          {/* Top Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme Toggle Button */}
            <motion.button
              onClick={toggleTheme}
              className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-md",
                "text-gray-700 hover:bg-muted dark:text-gray-300 dark:hover:bg-muted/50",
                "border border-border shadow-sm",
                "flex items-center justify-center cursor-pointer"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
              aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 pointer-events-none" />
              ) : (
                <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-700 pointer-events-none" />
              )}
            </motion.button>

            {/* GitHub Button - Desktop */}
            <motion.a
              href="https://github.com/ayanmanna123"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "hidden sm:flex w-10 h-10 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-md",
                "text-gray-700 hover:bg-muted dark:text-gray-300 dark:hover:bg-muted/50",
                "border border-border shadow-sm",
                "items-center justify-center"
              )}
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
              className={cn(
                "hidden sm:flex w-10 h-10 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-md",
                "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40",
                "border border-border shadow-sm",
                "items-center justify-center"
              )}
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
              className={cn(
                "hidden sm:flex w-10 h-10 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-md",
                "text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40",
                "border border-border shadow-sm",
                "items-center justify-center"
              )}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="YouTube Channel"
              aria-label="YouTube Channel"
            >
              <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.a>

            {/* Music Button */}
            <motion.button
              onClick={toggleMusic}
              disabled={!isAudioReady}
              className={cn(
                "w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-md",
                "text-primary hover:bg-primary/10",
                "border border-border shadow-sm",
                "flex items-center justify-center cursor-pointer",
                !isAudioReady && "opacity-50 cursor-not-allowed"
              )}
              whileHover={{ scale: isAudioReady ? 1.05 : 1 }}
              whileTap={{ scale: isAudioReady ? 0.95 : 1 }}
              title={isAudioReady ? (isMusicPlaying ? "Pause music" : "Play music") : "Loading music..."}
              aria-label={isAudioReady ? (isMusicPlaying ? "Pause music" : "Play music") : "Loading music"}
            >
              {isMusicPlaying ? (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary animate-pulse" />
              ) : (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              )}
            </motion.button>

            {/* Mobile Menu Toggle Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "flex md:hidden w-9 h-9 rounded-full bg-background/80 dark:bg-card/80 backdrop-blur-md",
                "text-foreground hover:bg-muted border border-border shadow-sm",
                "items-center justify-center cursor-pointer",
                mobileMenuOpen && "border-primary text-primary bg-primary/10"
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

      {/* Full-Screen Mobile Drawer / Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-background/95 dark:bg-slate-950/95 backdrop-blur-xl flex flex-col md:hidden pt-20 pb-8 px-6 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex flex-col flex-1 justify-between max-w-sm mx-auto w-full">
              {/* Menu Links */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-3 px-3">
                  Quick Navigation
                </div>
                {navItems.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeSection === item.href;
                  return (
                    <motion.button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={cn(
                        "w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all",
                        isActive
                          ? "bg-[#EC844D]/15 text-[#EC844D] dark:text-[#FFAE80] font-bold border border-[#EC844D]/30 shadow-sm"
                          : "text-foreground hover:bg-muted/70"
                      )}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.03 }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={cn("w-4 h-4", isActive ? "text-[#EC844D] dark:text-[#FFAE80]" : "text-muted-foreground")} />
                        <span className="text-sm font-medium">{item.name}</span>
                      </div>
                      {isActive && (
                        <div className="w-2 h-2 rounded-full bg-[#EC844D] shadow-[0_0_8px_#EC844D]" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Social & Resume Links in Mobile Drawer */}
              <div className="pt-6 border-t border-border mt-6 space-y-4">
                <div className="flex items-center justify-around gap-2 bg-muted/40 p-2.5 rounded-2xl border border-border/50">
                  <a
                    href="https://github.com/ayanmanna123"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl text-muted-foreground hover:text-foreground hover:bg-background transition-colors flex flex-col items-center gap-1"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                    <span className="text-[10px] font-mono">GitHub</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ayan-manna-4a67ab34a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl text-blue-500 hover:bg-background transition-colors flex flex-col items-center gap-1"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                    <span className="text-[10px] font-mono">LinkedIn</span>
                  </a>
                  <a
                    href="https://www.youtube.com/@ayanmanna1007"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl text-red-500 hover:bg-background transition-colors flex flex-col items-center gap-1"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-5 h-5" />
                    <span className="text-[10px] font-mono">YouTube</span>
                  </a>
                </div>

                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#EC844D] to-[#DE743C] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#EC844D]/25"
                >
                  <Download className="w-4 h-4" />
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
          "hidden md:block fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40",
          "transition-transform duration-300 ease-in-out",
          showNavbar || isHoveringBottom ? "translate-y-0" : "translate-y-full"
        )}
        style={{ willChange: "transform" }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Dock
          items={dockItems}
          panelHeight={68}
          baseItemSize={50}
          magnification={70}
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
          className="w-full bg-background/85 dark:bg-card/90 backdrop-blur-xl border border-border shadow-xl rounded-2xl p-1.5 flex items-center justify-between gap-1"
        >
          {primaryMobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.href;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={cn(
                  "flex-1 py-2 px-1 flex flex-col items-center justify-center rounded-xl transition-all relative text-xs",
                  isActive
                    ? "text-[#EC844D] dark:text-[#FFAE80] font-bold bg-[#EC844D]/10"
                    : "text-muted-foreground hover:text-foreground"
                )}
                aria-label={item.name}
              >
                <Icon className={cn("w-4 h-4 mb-0.5", isActive && "stroke-[2.5px]")} />
                <span className="text-[10px] leading-tight truncate">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileActiveTab"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#EC844D]"
                  />
                )}
              </button>
            );
          })}
          {/* More / Menu trigger in mobile dock */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "flex-1 py-2 px-1 flex flex-col items-center justify-center rounded-xl transition-all relative text-xs",
              mobileMenuOpen
                ? "text-[#EC844D] dark:text-[#FFAE80] font-bold bg-[#EC844D]/10"
                : "text-muted-foreground hover:text-foreground"
            )}
            aria-label="More sections"
          >
            <Menu className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] leading-tight">More</span>
          </button>
        </nav>
      </motion.div>
    </>
  );
};

