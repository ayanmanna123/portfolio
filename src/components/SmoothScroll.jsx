import { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

import { scrollToSection } from "@/lib/scrollToSection";

gsap.registerPlugin(ScrollTrigger);

function LenisSync() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      window.lenis = lenis;

      // Perfect Frame Synchronization with GSAP Ticker & ScrollTrigger
      const update = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);

      // Sync Lenis scroll position with GSAP ScrollTrigger to eliminate any jitter
      lenis.on("scroll", ScrollTrigger.update);

      return () => {
        gsap.ticker.remove(update);
        lenis.off("scroll", ScrollTrigger.update);
      };
    }
  }, [lenis]);

  useEffect(() => {
    // Intercept standard anchor clicks for buttery smooth scrolling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      e.preventDefault();
      scrollToSection(href);
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return null;
}

export const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.058, // Luxuriously damped, silky momentum interpolation
        duration: 1.6, // Extended organic deceleration
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.62, // Speed governor: caps max scroll displacement per wheel tick
        touchMultiplier: 0.9,  // Governs trackpad/mobile fling velocity
        syncTouch: false,
        infinite: false,
      }}
    >
      <LenisSync />
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;
