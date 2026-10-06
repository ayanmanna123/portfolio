import { useState, useEffect } from "react";
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
  const [isTouchDevice, setIsTouchDevice] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches
    );
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTouch = () => {
      const isTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches;
      setIsTouchDevice(isTouch);

      if (isTouch && typeof document !== "undefined") {
        window.lenis = {
          start: () => {},
          stop: () => {},
          scrollTo: (target, opts) => {
            if (typeof target === "number") {
              window.scrollTo({ top: target, behavior: opts?.immediate ? "auto" : "smooth" });
            } else if (typeof target === "string") {
              const el = document.querySelector(target);
              if (el) el.scrollIntoView({ behavior: opts?.immediate ? "auto" : "smooth" });
            } else if (target && typeof target.getBoundingClientRect === "function") {
              target.scrollIntoView({ behavior: opts?.immediate ? "auto" : "smooth" });
            }
          },
          raf: () => {},
          on: () => {},
          off: () => {},
        };
        ScrollTrigger.config({ ignoreMobileResize: true });
        document.documentElement.classList.remove(
          "lenis",
          "lenis-smooth",
          "lenis-stopped",
          "lenis-scrolling"
        );
        document.body.classList.remove(
          "lenis",
          "lenis-smooth",
          "lenis-stopped",
          "lenis-scrolling"
        );
      }
    };

    checkTouch();
  }, []);

  if (isTouchDevice) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      autoRaf={false}
      options={{
        lerp: 0.08,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.8,
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
