'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SplitText = ({
  text = '',
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'left',
  tag = 'span',
  onLetterAnimationComplete,
  showCallback = false,
}) => {
  const containerRef = useRef(null);
  const animatedRef = useRef(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    if (document.fonts?.status === 'loaded') {
      setFontsLoaded(true);
    } else if (document.fonts?.ready) {
      document.fonts.ready.then(() => setFontsLoaded(true));
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !text || !fontsLoaded) return;
    if (animatedRef.current) return;

    const el = containerRef.current;

    let targets = [];
    if (splitType.includes('chars')) {
      targets = el.querySelectorAll('.split-char');
    } else if (splitType.includes('words')) {
      targets = el.querySelectorAll('.split-word');
    } else {
      targets = el.querySelectorAll('.split-char');
    }

    if (!targets || targets.length === 0) return;

    animatedRef.current = true;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: from.opacity !== undefined ? from.opacity : 0,
          y: from.y !== undefined ? from.y : 40,
          x: from.x !== undefined ? from.x : 0,
          scale: from.scale !== undefined ? from.scale : 1,
        },
        {
          opacity: to.opacity !== undefined ? to.opacity : 1,
          y: to.y !== undefined ? to.y : 0,
          x: to.x !== undefined ? to.x : 0,
          scale: to.scale !== undefined ? to.scale : 1,
          duration: duration || 1.25,
          ease: ease || 'power3.out',
          stagger: (delay || 50) / 1000,
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            once: true,
          },
          onComplete: () => {
            if (onLetterAnimationComplete) {
              onLetterAnimationComplete();
            }
          },
        }
      );
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    threshold,
    rootMargin,
    fontsLoaded,
    showCallback,
    onLetterAnimationComplete,
  ]);

  const Tag = tag || 'span';
  const words = typeof text === 'string' ? text.split(' ') : [];

  return (
    <Tag
      ref={containerRef}
      className={`split-parent inline-block ${className}`}
      style={{
        textAlign,
        wordBreak: 'normal',
        overflowWrap: 'break-word',
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="split-word inline-block whitespace-nowrap"
          style={{ marginRight: wordIndex < words.length - 1 ? '0.28em' : '0' }}
        >
          {Array.from(word).map((char, charIndex) => (
            <span
              key={charIndex}
              className="split-char inline-block will-change-transform will-change-opacity bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent"
              style={{
                fontFamily: "'Rakyat', cursive, sans-serif",
              }}
            >
              {char}
            </span>
          ))}
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
