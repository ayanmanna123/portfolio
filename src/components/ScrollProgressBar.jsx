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
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#e59845] via-[#f06292] to-[#e59845] z-[9999] pointer-events-none shadow-[0_0_10px_rgba(229,152,69,0.5)]"
    />
  );
};

export default ScrollProgressBar;
