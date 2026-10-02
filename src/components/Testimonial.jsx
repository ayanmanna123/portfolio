"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data";

export const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  // Fill empty slots on last page if needed
  while (visibleTestimonials.length < itemsPerPage) {
    visibleTestimonials.push(testimonials[visibleTestimonials.length]);
  }

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const cardsContainerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (line1Ref.current) {
        gsap.fromTo(
          line1Ref.current,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (line2Ref.current) {
        gsap.fromTo(
          line2Ref.current,
          { y: 150, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 40%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (line3Ref.current) {
        gsap.fromTo(
          line3Ref.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Testimonial Cards multi-directional entrance & visible reverse
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        let fromVars = { opacity: 0 };
        let duration = 1.4;
        let triggerStart = "top 68%";
        const colPos = index % 3;

        if (colPos === 0) {
          // Card 1 (Left): Left to Right
          fromVars = { x: -300, opacity: 0 };
          duration = 1.4;
          triggerStart = "top 68%";
        } else if (colPos === 1) {
          // Card 2 (Center): Bottom to Top
          fromVars = { y: 200, opacity: 0 };
          duration = 1.6;
          triggerStart = "top 64%";
        } else {
          // Card 3 (Right): Right to Left
          fromVars = { x: 300, opacity: 0 };
          duration = 1.8;
          triggerStart = "top 60%";
        }

        gsap.fromTo(
          card,
          fromVars,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: duration,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current || card,
              start: triggerStart,
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [currentIndex, itemsPerPage]);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-14 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-background via-background to-[#FFD8B2]/10 dark:to-[#EC844D]/5"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-60 sm:w-72 h-60 sm:h-72 bg-[#EC844D]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-[#FFD8B2]/15 dark:bg-[#EC844D]/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:64px_64px]" />
      </div>

      <div className="container max-w-6xl mx-auto">
        <div className="space-y-12 sm:space-y-16">
          <div ref={headerRef} className="text-center mb-12 sm:mb-16 md:mb-20 px-2 sm:px-6">
            <div className="text-sm sm:text-base font-mono text-primary mb-3 sm:mb-4 inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20">
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
              Client Feedback
              <Star className="h-3 w-3 sm:h-4 sm:w-4" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-3 sm:mb-6 leading-tight">
              <span ref={line1Ref} className="block text-foreground will-change-transform will-change-opacity">
                What
              </span>
              <span
                ref={line2Ref}
                className="block font-rakyat text-3xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-[#EC844D] via-[#F59E6B] to-[#DE6F36] bg-clip-text text-transparent mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
                style={{ fontFamily: "'Rakyat', cursive" }}
              >
                People Say
              </span>
            </h2>
            <p
              ref={line3Ref}
              className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed will-change-transform will-change-opacity"
            >
              What Clients Will Say About Working with Me.
            </p>
          </div>

          <div className="relative">
            <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${currentIndex}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="bg-card/80 backdrop-blur-sm border border-border/80 rounded-2xl p-5 sm:p-8 shadow-sm hover:shadow-md transition-all h-full flex flex-col group hover:border-primary/40 will-change-transform will-change-opacity"
                >
                  <div className="flex flex-col h-full">
                    <Quote className="h-6 w-6 sm:h-8 sm:w-8 text-primary/30 mb-3 sm:mb-4 group-hover:text-primary/50 transition-colors shrink-0" />

                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-4 sm:mb-6 flex-1 leading-relaxed">
                      "{testimonial.content}"
                    </p>

                    <div className="mt-auto pt-3 border-t border-border/40">
                      <div className="flex mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${i < testimonial.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'}`}
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-3 sm:gap-4 mt-2 sm:mt-3">
                        <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-full border-2 border-primary/20 group-hover:border-primary/50 overflow-hidden transition-all shrink-0">
                          {testimonial.image ? (
                            <img
                              src={testimonial.image}
                              alt={testimonial.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary/70 font-bold text-sm">
                              {testimonial.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-sm sm:text-base truncate">{testimonial.name}</p>
                          <p className="text-xs sm:text-sm text-muted-foreground truncate">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Navigation Arrows - Show only when needed */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 p-2.5 sm:p-3 rounded-full border border-border hover:border-primary/50 bg-background/90 backdrop-blur-md transition-all shadow-lg z-10 hidden sm:flex items-center justify-center hover:scale-110 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 p-2.5 sm:p-3 rounded-full border border-border hover:border-primary/50 bg-background/90 backdrop-blur-md transition-all shadow-lg z-10 hidden sm:flex items-center justify-center hover:scale-110 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Navigation Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 sm:hidden pt-2">
              <button
                onClick={prevTestimonial}
                className="p-2.5 rounded-xl border border-border bg-card/80 backdrop-blur-sm transition-all hover:bg-muted active:scale-95 cursor-pointer touch-manipulation"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2 px-2">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentIndex === index ? 'w-6 bg-[#EC844D]' : 'w-2 bg-muted-foreground/30'}`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2.5 rounded-xl border border-border bg-card/80 backdrop-blur-sm transition-all hover:bg-muted active:scale-95 cursor-pointer touch-manipulation"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Animated gradient background elements */}
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.12 }}
        transition={{ delay: 1, duration: 1.5 }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gradient-to-r from-[#EC844D] to-[#FFD8B2] blur-[80px] sm:blur-[100px] opacity-30"
          animate={{
            x: [0, 20, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-gradient-to-r from-[#FFD8B2] to-[#EC844D] blur-[80px] sm:blur-[100px] opacity-30"
          animate={{
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
            delay: 5
          }}
        />
      </motion.div>
    </section>
  );
};