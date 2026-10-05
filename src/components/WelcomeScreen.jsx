import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Terminal, ArrowRight } from "lucide-react";
import { startPreloadPipeline } from "@/lib/preloadManager";

const WelcomeScreen = ({ onWelcomeComplete }) => {
  const [phase, setPhase] = useState(0);
  const [progress, setProgress] = useState(15);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [dynamicStatus, setDynamicStatus] = useState("Initializing System Pipeline...");
  const onCompleteRef = useRef(onWelcomeComplete);

  useEffect(() => {
    onCompleteRef.current = onWelcomeComplete;
  }, [onWelcomeComplete]);

  const portfolioUrl = "www.ayanmanna.in";
  const welcomeMessages = [
    "Initializing Soft UI Architecture...",
    "Rendering Skeuomorphic Canvas...",
    "Crafting Digital Experiences...",
    "Welcome to Ayan Manna's Space"
  ];

  const handleFinish = () => {
    if (exitAnimation) return;
    setExitAnimation(true);
    setTimeout(() => {
      if (onCompleteRef.current) {
        onCompleteRef.current();
      }
    }, 700);
  };

  // Real preloading pipeline & synchronized progress
  useEffect(() => {
    let isMounted = true;

    startPreloadPipeline((pct, msg) => {
      if (!isMounted) return;
      setProgress((prev) => Math.max(prev, pct));
      if (msg) setDynamicStatus(msg);
      if (pct >= 40 && pct < 75) setPhase(1);
      else if (pct >= 75 && pct < 99) setPhase(2);
      else if (pct >= 100) setPhase(3);
    }).then(() => {
      if (!isMounted) return;
      setProgress(100);
      setPhase(3);
      setDynamicStatus("All Systems Loaded & Primed!");
      setTimeout(() => {
        if (isMounted) handleFinish();
      }, 800);
    });

    const minTimer = setTimeout(() => {
      if (isMounted) {
        setProgress((prev) => Math.max(prev, 45));
        setPhase(1);
      }
    }, 1100);

    // Guaranteed fallback so the intro never stalls
    const autoDone = setTimeout(() => {
      if (isMounted) handleFinish();
    }, 4500);

    return () => {
      isMounted = false;
      clearTimeout(minTimer);
      clearTimeout(autoDone);
    };
  }, []);


  // Typing effect for the portfolio URL
  useEffect(() => {
    if (phase >= 1) {
      let i = 0;
      const interval = setInterval(() => {
        i++;
        if (i <= portfolioUrl.length) {
          setTypedText(portfolioUrl.substring(0, i));
        } else {
          clearInterval(interval);
        }
      }, 45);

      return () => clearInterval(interval);
    }
  }, [phase]);

  // Mini clock angle simulation for the analog badge
  const [clockAngle, setClockAngle] = useState(45);
  useEffect(() => {
    const timer = setInterval(() => {
      setClockAngle((prev) => (prev + 6) % 360);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#eae7e1] text-[#2d2b28] select-none flex items-center justify-center p-4 sm:p-6">
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
            box-shadow: 12px 12px 28px #cfcbc2, -12px -12px 28px #ffffff;
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 -left-16 w-80 h-80 rounded-full soft-ui-inset-subtle opacity-35" />
        <div className="absolute bottom-1/4 -right-16 w-96 h-96 rounded-full soft-ui-inset-subtle opacity-30" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(#dedad1_1px,transparent_1px),linear-gradient(90deg,#dedad1_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      </div>

      {/* Top Controls: Status pill & Skip button */}
      <div className="fixed top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between z-50 pointer-events-auto">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] text-xs font-mono font-medium text-[#5a5751] shadow-inner">
          <span className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)] animate-pulse" />
          <span className="hidden sm:inline">SYSTEM BOOT:</span>
          <span>ONLINE</span>
        </div>

        <motion.button
          onClick={handleFinish}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-1.5 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-xs font-digital font-bold text-[#43413d] hover:text-[#e59845] transition-all shadow-sm cursor-pointer flex items-center gap-1.5"
          aria-label="Skip welcome screen"
        >
          <span>Skip Intro</span>
          <ArrowRight size={13} className="text-[#e59845]" />
        </motion.button>
      </div>

      {/* Central Skeuomorphic Soft UI Console Chassis */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={
          exitAnimation
            ? { opacity: 0, scale: 0.95, y: -40, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
            : { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
        }
        className="w-full max-w-xl soft-ui-raised-card rounded-[38px] sm:rounded-[46px] p-6 sm:p-10 md:p-12 border border-[#dedad1] text-center relative z-20"
      >
        {/* Analog Mini Dial Socket & Pill */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center relative shadow-inner">
            {/* Clock Hand simulation */}
            <div
              className="absolute w-0.5 h-3.5 bg-[#484a4d] rounded-full origin-bottom"
              style={{
                transform: `rotate(${clockAngle}deg)`,
                bottom: "50%",
              }}
            />
            {/* Center Pivot Pin with pink dot */}
            <div className="w-2.5 h-2.5 rounded-full bg-[#eae7e1] border border-[#484a4d] flex items-center justify-center z-10">
              <div className="w-1 h-1 rounded-full bg-[#f06292]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-xs font-digital font-bold text-[#e59845] shadow-sm">
            <Sparkles size={13} className="text-[#f06292]" />
            <span>PORTFOLIO OS v2.0</span>
          </div>
        </div>

        {/* The Animated "Hello" Vector Loading Stroke */}
        <motion.div
          className="w-full max-w-[270px] sm:max-w-[350px] md:max-w-[420px] mx-auto py-1 sm:py-2 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <svg
            className="w-full h-auto overflow-visible"
            viewBox="0 0 1230.94 414.57"
            style={{ filter: "drop-shadow(2px 3px 6px rgba(207, 203, 194, 0.9))" }}
          >
            <defs>
              <linearGradient id="softUiHelloGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e59845" />
                <stop offset="60%" stopColor="#d48835" />
                <stop offset="100%" stopColor="#f06292" />
              </linearGradient>
            </defs>
            <motion.path
              d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31"
              transform="translate(311.08 476.02)"
              fill="none"
              stroke="url(#softUiHelloGradient)"
              strokeLinecap="round"
              strokeMiterlimit={10}
              strokeWidth="40px"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 2.2, ease: "easeInOut" },
                opacity: { duration: 0.4 }
              }}
            />
          </svg>
        </motion.div>

        {/* Portfolio Author Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-digital text-[#2d2b28] tracking-tight mb-1">
            Ayan Manna
          </h1>
          <p className="text-xs sm:text-sm font-mono text-[#78756e] uppercase tracking-wider mb-5">
            Software Engineer & Full Stack Architect
          </p>
        </motion.div>

        {/* Debossed Inset Terminal Readout Screen */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="soft-ui-inset rounded-[24px] p-4 sm:p-5 bg-[#e4e1d9] border border-[#cdc8be] mb-5 text-left relative shadow-inner"
        >
          <div className="flex items-center justify-between border-b border-[#cdc8be]/60 pb-2 mb-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#78756e]">
              <Terminal size={13} className="text-[#e59845]" />
              <span>terminal.sh</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#f06292]" />
              <span className="w-2 h-2 rounded-full bg-[#e59845]" />
              <span className="w-2 h-2 rounded-full bg-[#6d6a64]" />
            </div>
          </div>

          {/* Typing URL text */}
          <div className="font-mono text-sm sm:text-base font-bold text-[#383a3d] flex items-center mb-1.5">
            <span className="text-[#e59845] mr-2">&gt;</span>
            <span>{typedText || "..."}</span>
            <span className="w-2 h-4 bg-[#e59845] ml-1 inline-block animate-pulse" />
          </div>

          {/* Rotating Message */}
          <p className="font-mono text-xs sm:text-sm text-[#5a5751] h-5 flex items-center overflow-hidden">
            <span className="transition-all duration-300">
              {dynamicStatus || welcomeMessages[Math.min(phase, welcomeMessages.length - 1)]}
            </span>
          </p>
        </motion.div>

        {/* Soft UI Progress Bar (Inspired by SoftUiProgressBar in SoftUiWidgets.jsx) */}
        <div className="w-full flex flex-col gap-1.5 mb-5">
          <div className="flex justify-between items-center px-1 text-xs font-digital font-bold text-[#6d6a64]">
            <span>System Initialization</span>
            <span className="text-[#f06292] font-mono">{progress}%</span>
          </div>

          {/* Sunken debossed track */}
          <div className="w-full h-3.5 soft-ui-inset rounded-full p-0.5 flex items-center overflow-hidden bg-[#e5e2da] border border-[#cdc8be]/60 shadow-inner">
            <motion.div
              initial={{ width: "15%" }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-[#e8527a] via-[#f06292] to-[#f48fb1] shadow-[0_1px_4px_rgba(240,98,146,0.35)]"
            />
          </div>
        </div>

        {/* Tactile Enter Button */}
        <motion.button
          onClick={handleFinish}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          className="soft-ui-raised rounded-2xl px-8 py-3 font-digital font-bold text-sm sm:text-base text-[#383a3d] hover:text-[#e59845] border border-[#dedad1] shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 mx-auto w-full sm:w-auto"
        >
          <span>Enter Portfolio</span>
          <ArrowRight size={16} className="text-[#e59845]" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;