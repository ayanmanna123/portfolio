import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HeroLeft } from "./HeroLeft";
import { HeroCodeTerminal } from "./HeroCodeTerminal";

export const HeroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-start justify-center px-3 sm:px-8 lg:px-12 xl:px-16 pt-5 sm:pt-6 lg:pt-8 pb-28 sm:pb-36 overflow-hidden bg-transparent dark:bg-gradient-to-br dark:from-background dark:via-background/95 dark:to-[#EC844D]/10"
    >
      {/* Background Animated Ambient Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hidden dark:block absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(236,132,77,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(236,132,77,0.08)_1px,transparent_1px)] bg-[size:50px_50px] sm:bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
        </div>

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-gradient-to-r from-[#EC844D]/15 to-[#FFD8B2]/20 rounded-2xl"
            style={{
              width: Math.random() * 40 + 15 + "px",
              height: Math.random() * 40 + 15 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              rotate: Math.random() * 360,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 40],
              x: [0, (Math.random() - 0.5) * 30],
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}

        <motion.div
          className="absolute top-16 left-5 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-gradient-to-r from-[#EC844D]/20 to-[#FFD8B2]/30 blur-[80px] sm:blur-[110px]"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-16 right-5 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-gradient-to-r from-[#FFD8B2]/25 to-[#EC844D]/20 blur-[80px] sm:blur-[110px]"
          animate={{ x: [0, -40, 0], y: [0, 40, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity, delay: 2 }}
        />
      </div>

      <div className="w-full max-w-[1600px] mx-auto mt-0">
        <motion.div
          className="flex flex-col lg:flex-row items-start justify-between gap-8 sm:gap-12 lg:gap-14 xl:gap-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.3 },
            },
          }}
        >
          {/* Left Side Content */}
          <HeroLeft />

          {/* Right Side Code Terminal */}
          <HeroCodeTerminal />
        </motion.div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <motion.div
        className="absolute bottom-16 sm:bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer z-20 pointer-events-auto"
        onClick={() => {
          const aboutSection = document.getElementById("about");
          if (aboutSection) {
            if (window.lenis) {
              window.lenis.scrollTo(aboutSection, {
                offset: -40,
                duration: 1.3,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            } else {
              aboutSection.scrollIntoView({ behavior: "smooth" });
            }
          }
        }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: [0, 1, 1, 0], y: [0, 6, 0, -6] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-4 h-7 sm:w-5 sm:h-8 border-2 border-[#EC844D]/40 rounded-full flex justify-center hover:border-[#EC844D] transition-colors"
        >
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1.5 sm:h-2 bg-[#EC844D] rounded-full mt-1.5"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;