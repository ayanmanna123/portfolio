import React, { useEffect, useState, useRef } from "react";

export const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Only enable on desktop devices with fine mouse pointer
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    const onMouseMove = (e) => {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Instant 1:1 hardware transform with zero lag/delay
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`;
      }

      // Check for interactive elements
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

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    document.documentElement.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      document.documentElement.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after, body, a, button, input, textarea, select, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Instant Soft Pink Aura Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isHovered ? "32px" : "20px",
          height: isHovered ? "32px" : "20px",
          borderRadius: "50%",
          border: "1.5px solid rgba(240, 98, 146, 0.5)",
          backgroundColor: isHovered ? "rgba(240, 98, 146, 0.1)" : "transparent",
          transition: "width 0.12s ease-out, height 0.12s ease-out, background-color 0.12s ease-out, border 0.12s ease-out, opacity 0.15s ease-out",
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
        }}
      />

      {/* Instant Center Pink Dot (Zero Lag) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99999] ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: isClicked ? "6px" : isHovered ? "9px" : "7px",
          height: isClicked ? "6px" : isHovered ? "9px" : "7px",
          borderRadius: "50%",
          backgroundColor: "#f06292",
          boxShadow: isHovered 
            ? "0 0 10px rgba(240, 98, 146, 0.95), 0 0 3px rgba(240, 98, 146, 1)" 
            : "0 0 6px rgba(240, 98, 146, 0.8)",
          transition: "width 0.1s ease-out, height 0.1s ease-out, box-shadow 0.15s ease-out, opacity 0.15s ease-out",
          transform: "translate3d(-100px, -100px, 0)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CustomCursor;
