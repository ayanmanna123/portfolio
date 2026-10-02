import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useTheme } from "next-themes";

const WelcomeScreen = ({ onWelcomeComplete }) => {
  const [phase, setPhase] = useState(0);
  const [exitAnimation, setExitAnimation] = useState(false);
  const [typedText, setTypedText] = useState("");
  const { theme } = useTheme();

  const typingIntervalRef = useRef(null);
  const typingStartedRef = useRef(false);
  const onCompleteRef = useRef(onWelcomeComplete);

  useEffect(() => {
    onCompleteRef.current = onWelcomeComplete;
  }, [onWelcomeComplete]);

  // Theme-based colors
  const colors = {
    light: {
      primary: "hsl(222.2 47.4% 11.2%)",
      secondary: "#EC844D",
      background: "hsl(0 0% 100%)",
      muted: "hsl(215.4 16.3% 46.9%)",
      link: "#EC844D"
    },
    dark: {
      primary: "hsl(210 40% 98%)",
      secondary: "#EC844D",
      background: "hsl(222.2 47.4% 11.2%)",
      muted: "hsl(215 20.2% 65.1%)",
      link: "#EC844D"
    }
  };

  const currentColors = colors[theme] || colors.dark;
  const portfolioUrl = "www.ayanmanna.in";
  const welcomeMessages = [
    "Crafting digital experiences",
    "Software Engineer",
    "Full-stack development",
    "Welcome to my portfolio"
  ];

  useEffect(() => {
    const phase1 = setTimeout(() => setPhase(1), 800);
    const phase2 = setTimeout(() => setPhase(2), 1600);
    const phase3 = setTimeout(() => setPhase(3), 2800);
    const complete = setTimeout(() => {
      setExitAnimation(true);
      setTimeout(() => {
        if (onCompleteRef.current) {
          onCompleteRef.current();
        }
      }, 1000);
    }, 4800);

    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
      clearTimeout(phase3);
      clearTimeout(complete);
    };
  }, []);

  useEffect(() => {
    if (phase >= 2 && !typingStartedRef.current) {
      typingStartedRef.current = true;
      let i = 0;
      typingIntervalRef.current = setInterval(() => {
        i++;
        if (i <= portfolioUrl.length) {
          setTypedText(portfolioUrl.substring(0, i));
        } else {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
      }, 40);
    }
  }, [phase]);

  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    },
    exit: {
      y: "-100vh",
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const contentVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        delay: 0.8,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const cursorVariants = {
    blinking: {
      opacity: [0, 0, 1, 1],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatDelay: 0
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Welcome Screen */}
      <motion.div
        className="h-full w-full flex items-center justify-center p-4"
        style={{ backgroundColor: currentColors.background }}
        variants={containerVariants}
        initial="hidden"
        animate={exitAnimation ? "exit" : "visible"}
      >
        {/* Animated background elements - scaled down for mobile */}
        <motion.div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
          <motion.div
            className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full blur-[50px] md:blur-[100px]"
            style={{
              background: `linear-gradient(to right, ${currentColors.primary}, #EC844D)`
            }}
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
          <motion.div
            className="absolute top-1/3 right-1/4 w-36 h-36 md:w-72 md:h-72 rounded-full blur-[60px] md:blur-[120px]"
            style={{
              background: `linear-gradient(to right, #EC844D, #FFD8B2)`
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut'
            }}
          />
        </motion.div>

        <div className="w-full max-w-2xl mx-auto text-center px-4">
          <motion.div className="space-y-4 md:space-y-8">
            {phase >= 0 && (
              <motion.div variants={contentVariants}>
                <motion.div
                  className="text-sm md:text-lg lg:text-xl font-mono mb-2 md:mb-4 inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 rounded-full border"
                  style={{
                    color: currentColors.primary,
                    backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4" />
                  {welcomeMessages[Math.min(phase, welcomeMessages.length - 1)]}
                </motion.div>
              </motion.div>
            )}

            {phase >= 1 && (
              <motion.div
                className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[500px] mx-auto py-2"
                variants={contentVariants}
              >
                <svg
                  className="w-full h-auto overflow-visible"
                  viewBox="0 0 1230.94 414.57"
                  style={{ filter: "drop-shadow(0 0 15px rgba(236, 132, 77, 0.35))" }}
                >
                  <defs>
                    <linearGradient id="helloSvgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#EC844D" />
                      <stop offset="50%" stopColor="#F59E6B" />
                      <stop offset="100%" stopColor="#FFD8B2" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d="M-293.58-104.62S-103.61-205.49-60-366.25c9.13-32.45,9-58.31,0-74-10.72-18.82-49.69-33.21-75.55,31.94-27.82,70.11-52.22,377.24-44.11,322.48s34-176.24,99.89-183.19c37.66-4,49.55,23.58,52.83,47.92a117.06,117.06,0,0,1-3,45.32c-7.17,27.28-20.47,97.67,33.51,96.86,66.93-1,131.91-53.89,159.55-84.49,31.1-36.17,31.1-70.64,19.27-90.25-16.74-29.92-69.47-33-92.79,16.73C62.78-179.86,98.7-93.8,159-81.63S302.7-99.55,393.3-269.92c29.86-58.16,52.85-114.71,46.14-150.08-7.44-39.21-59.74-54.5-92.87-8.7-47,65-61.78,266.62-34.74,308.53S416.62-58,481.52-130.31s133.2-188.56,146.54-256.23c14-71.15-56.94-94.64-88.4-47.32C500.53-375,467.58-229.49,503.3-127a73.73,73.73,0,0,0,23.43,33.67c25.49,20.23,55.1,16,77.46,6.32a111.25,111.25,0,0,0,30.44-19.87c37.73-34.23,29-36.71,64.58-127.53C724-284.3,785-298.63,821-259.13a71,71,0,0,1,13.69,22.56c17.68,46,6.81,80-6.81,107.89-12,24.62-34.56,42.72-61.45,47.91-23.06,4.45-48.37-.35-66.48-24.27a78.88,78.88,0,0,1-12.66-25.8c-14.75-51,4.14-88.76,11-101.41,6.18-11.39,37.26-69.61,103.42-42.24,55.71,23.05,100.66-23.31,100.66-23.31"
                    transform="translate(311.08 476.02)"
                    fill="none"
                    stroke="url(#helloSvgGradient)"
                    strokeLinecap="round"
                    strokeMiterlimit={10}
                    strokeWidth="38px"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      pathLength: { duration: 2.2, ease: "easeInOut" },
                      opacity: { duration: 0.3 }
                    }}
                  />
                </svg>
              </motion.div>
            )}

            {phase >= 2 && (
              <motion.div
                className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed font-light"
                style={{ color: currentColors.muted }}
                variants={contentVariants}
              >
                <motion.div
                  className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg font-mono flex justify-center items-center"
                  style={{ color: currentColors.link }}
                >
                  {typedText}
                  {phase >= 2 && (
                    <motion.span
                      className="ml-0.5 h-4 sm:h-5 md:h-6 w-0.5 sm:w-1 inline-block"
                      style={{ backgroundColor: currentColors.link }}
                      variants={cursorVariants}
                      animate="blinking"
                    />
                  )}
                </motion.div>
                <motion.p
                  className="mt-2 sm:mt-4 text-xs sm:text-sm md:text-base"
                  style={{ color: currentColors.muted }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  (This is my portfolio website)
                </motion.p>
              </motion.div>
            )}


          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;