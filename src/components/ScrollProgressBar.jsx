import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#EC844D] via-[#FFAE80] to-[#EC844D] z-[9999] pointer-events-none shadow-[0_0_12px_rgba(236,132,77,0.7)]"
    />
  );
};

export default ScrollProgressBar;
