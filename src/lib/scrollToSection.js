import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Robust scroll utility that handles standard section elements and pinned GSAP ScrollTrigger morph sections (like #projects inside #education)
 * Features an intelligent polling retry engine to guarantee scroll accuracy even across lazy-loaded React chunks.
 */
export const scrollToSection = (targetId, options = {}) => {
  if (!targetId) return;
  const hash = targetId.startsWith("#") ? targetId : `#${targetId}`;

  // When navigating to Home (#hero, #home, or #), always scroll directly to the absolute top of the page (0)
  if (hash === "#hero" || hash === "#home" || hash === "#") {
    if (window.lenis && typeof window.lenis.scrollTo === "function") {
      window.lenis.scrollTo(0, {
        duration: options.duration || 1.6,
        easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return;
  }

  // Special handling for #projects pinned morph section
  if (hash === "#projects") {
    let attempts = 0;
    const maxAttempts = 40;
    const tryScrollToProjects = () => {
      // 1. Try GSAP ScrollTrigger instances first (most accurate for pinned sections)
      let targetPos = null;
      try {
        const triggers = ScrollTrigger.getAll();
        const morphTrigger = triggers.find((t) => {
          const trigEl = t.trigger;
          return (
            trigEl &&
            (trigEl.id === "education" ||
              trigEl.closest?.("#education") ||
              trigEl.id === "projects" ||
              trigEl.closest?.("#projects") ||
              trigEl.querySelector?.("#projects") ||
              (t.pin && t.pin.querySelector?.("[data-morph='proj-card-0']")))
          );
        });

        if (morphTrigger && morphTrigger.end > 0) {
          // Target the end of the morph where projects are 100% assembled
          targetPos = morphTrigger.end - (options.offset !== undefined ? options.offset : 60);
        }
      } catch (e) {
        // Fallback below
      }

      // 2. DOM Measurement Fallback if ScrollTrigger not ready or not found
      if (targetPos === null) {
        const eduEl = document.getElementById("education");
        const projEl = document.getElementById("projects");
        const targetEl = projEl || eduEl;
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          if (targetEl.offsetHeight > 800) {
            targetPos = scrollTop + rect.top + Math.max(0, targetEl.offsetHeight - window.innerHeight);
          } else if (targetEl.offsetTop > 0) {
            targetPos = targetEl.offsetTop;
          }
        }
      }

      if (targetPos !== null && targetPos > 0) {
        if (window.lenis && typeof window.lenis.scrollTo === "function") {
          window.lenis.scrollTo(targetPos, {
            duration: options.duration || 1.5,
            easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
          });
        } else {
          window.scrollTo({ top: targetPos, behavior: "smooth" });
        }
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(tryScrollToProjects, 75);
      }
    };

    tryScrollToProjects();
    return;
  }

  // Standard Section Element with Lazy-Loading Retry
  let attempts = 0;
  const maxAttempts = 40;
  const tryScrollToElement = () => {
    const element = document.querySelector(hash);
    if (element) {
      if (window.lenis && typeof window.lenis.scrollTo === "function") {
        window.lenis.scrollTo(element, {
          offset: options.offset !== undefined ? options.offset : -30,
          duration: options.duration || 1.6,
          easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else if (attempts < maxAttempts) {
      attempts++;
      setTimeout(tryScrollToElement, 75);
    }
  };
  tryScrollToElement();
};
