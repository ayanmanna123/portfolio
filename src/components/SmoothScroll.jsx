import { useEffect, useRef } from "react";
import { ReactLenis } from "lenis/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "lenis/dist/lenis.css";

gsap.registerPlugin(ScrollTrigger);

export const SmoothScroll = ({ children }) => {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenisInstance = lenisRef.current?.lenis;
    if (lenisInstance) {
      window.lenis = lenisInstance;

      // Sync Lenis scroll position with GSAP ScrollTrigger to prevent jitter
      lenisInstance.on("scroll", ScrollTrigger.update);

      // Tell GSAP to use Lenis's raf for buttery 120fps synchronization
      const updateScrollTrigger = (time) => {
        lenisInstance.raf(time * 1000);
      };

      gsap.ticker.lagSmoothing(0);
    }

    // Intercept standard anchor clicks for buttery smooth scrolling
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]');
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      const element = document.querySelector(href);
      if (element && window.lenis) {
        e.preventDefault();
        window.lenis.scrollTo(element, {
          offset: -40,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.09,
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.95,
        touchMultiplier: 1.5,
        syncTouch: false,
        infinite: false,
      }}
    >
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;

