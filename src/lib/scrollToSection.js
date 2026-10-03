/**
 * Robust scroll utility that handles standard section elements and pinned GSAP ScrollTrigger morph sections (like #projects inside #education)
 */
export const scrollToSection = (targetId, options = {}) => {
  if (!targetId) return;
  const hash = targetId.startsWith("#") ? targetId : `#${targetId}`;

  // When navigating to Home (#hero, #home, or #), always scroll directly to the absolute top of the page (0)
  if (hash === "#hero" || hash === "#home" || hash === "#") {
    if (window.lenis) {
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
    const eduEl = document.getElementById("education");
    if (eduEl) {
      const rect = eduEl.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      // Scroll to the end of the pinned morph track where projects is 100% visible and interactive
      const targetPos = scrollTop + rect.top + Math.max(0, eduEl.offsetHeight - window.innerHeight);
      if (window.lenis) {
        window.lenis.scrollTo(targetPos, {
          duration: options.duration || 1.6,
          easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        });
      } else {
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
      return;
    }
  }

  const element = document.querySelector(hash);
  if (element) {
    if (window.lenis) {
      window.lenis.scrollTo(element, {
        offset: options.offset !== undefined ? options.offset : -30,
        duration: options.duration || 1.6,
        easing: options.easing || ((t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
      });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};
