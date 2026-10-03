import React, { useEffect, useState, useRef } from "react";

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer (mouse), disable on touch devices
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let rafId = null;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }

      // Check if hovering over interactive elements
      const target = e.target;
      if (target) {
        const interactive = target.closest(
          'a, button, input, textarea, select, [role="button"], [tabindex="0"], .cursor-pointer'
        );
        setIsHovered(!!interactive);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth trailing ring loop with lerp
    const render = () => {
      ringX += (mouseX - ringX) * 0.22;
      ringY += (mouseY - ringY) * 0.22;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          body, a, button, input, textarea, select, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Trailing Soft Pink Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isHovered ? "36px" : "24px",
          height: isHovered ? "36px" : "24px",
          borderRadius: "50%",
          border: "1.5px solid rgba(240, 98, 146, 0.45)",
          backgroundColor: isHovered ? "rgba(240, 98, 146, 0.08)" : "transparent",
          transition: "width 0.2s ease-out, height 0.2s ease-out, background-color 0.2s ease-out, border 0.2s ease-out, opacity 0.3s ease-out",
          transform: "translate(-100px, -100px)",
          willChange: "transform",
        }}
      />

      {/* Center Small Pink Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isClicked ? "6px" : isHovered ? "10px" : "8px",
          height: isClicked ? "6px" : isHovered ? "10px" : "8px",
          borderRadius: "50%",
          backgroundColor: "#f06292",
          boxShadow: isHovered 
            ? "0 0 12px rgba(240, 98, 146, 0.9), 0 0 4px rgba(240, 98, 146, 1)" 
            : "0 0 8px rgba(240, 98, 146, 0.75)",
          transition: "width 0.15s ease-out, height 0.15s ease-out, box-shadow 0.2s ease-out, opacity 0.2s ease-out",
          transform: "translate(-100px, -100px)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
