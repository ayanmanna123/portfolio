"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star, ChevronLeft, ChevronRight, MessageSquareQuote } from "lucide-react";
import { testimonials } from "@/data";

gsap.registerPlugin(ScrollTrigger);

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
  while (visibleTestimonials.length < itemsPerPage && visibleTestimonials.length < testimonials.length) {
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
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (line2Ref.current) {
        gsap.fromTo(
          line2Ref.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 65%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (line3Ref.current) {
        gsap.fromTo(
          line3Ref.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 55%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Testimonial Cards multi-directional entrance
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        let fromVars = { opacity: 0, y: 50 };
        const colPos = index % 3;

        if (colPos === 0) {
          fromVars = { x: -60, y: 30, opacity: 0 };
        } else if (colPos === 1) {
          fromVars = { y: 60, opacity: 0 };
        } else {
          fromVars = { x: 60, y: 30, opacity: 0 };
        }

        gsap.fromTo(
          card,
          fromVars,
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current || card,
              start: "top 72%",
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
      className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#eae7e1] text-[#2d2b28]"
    >
      {/* Exact Soft UI Styles from SoftUiWidgets.jsx */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @import url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&family=Quicksand:wght@500;600;700&family=Fredoka:wght@500;600;700&display=swap');
          
          .font-handwriting {
            font-family: 'Gaegu', 'Quicksand', cursive, sans-serif;
          }
          .font-digital {
            font-family: 'Fredoka', 'Quicksand', sans-serif;
          }
          .soft-ui-raised {
            background: #eae7e1;
            box-shadow: 6px 6px 14px #cfcbc2, -6px -6px 14px #ffffff;
          }
          .soft-ui-raised-card {
            background: #eae7e1;
            box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
          }
          .soft-ui-inset {
            background: #e4e1d9;
            box-shadow: inset 3px 3px 6px #cac5bb, inset -3px -3px 6px #ffffff;
          }
          .soft-ui-inset-subtle {
            background: #e6e3dc;
            box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
          }
        `
      }} />

      {/* Ambient Soft Clay Inset Discs */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 right-4 w-72 h-72 rounded-full soft-ui-inset-subtle opacity-35" />
        <div className="absolute bottom-1/4 left-4 w-80 h-80 rounded-full soft-ui-inset-subtle opacity-30" />
        <div className="absolute inset-0 opacity-30 bg-[linear-gradient(#dedad1_1px,transparent_1px),linear-gradient(90deg,#dedad1_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container max-w-6xl mx-auto">
        <div className="space-y-12 sm:space-y-16">
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-10 sm:mb-14 md:mb-16 px-2 sm:px-6">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-xs font-digital font-bold text-[#e59845] mb-4 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" />
              <span>TESTIMONIALS & FEEDBACK</span>
            </div>

            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span ref={line1Ref} className="block text-[#2d2b28] font-digital will-change-transform will-change-opacity">
                What
              </span>
              <span
                ref={line2Ref}
                className="block font-handwriting text-[#e59845] mt-1 sm:mt-2 pb-1 sm:pb-3 font-normal will-change-transform will-change-opacity"
              >
                People Say
              </span>
            </h2>
            <p
              ref={line3Ref}
              className="text-sm sm:text-base md:text-lg text-[#5a5751] font-mono max-w-2xl mx-auto leading-relaxed will-change-transform will-change-opacity mt-2"
            >
              Feedback and reflections from engineers, founders, and creative collaborators.
            </p>
          </div>

          {/* Testimonial Cards Carousel Container */}
          <div className="relative">
            <div ref={cardsContainerRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {visibleTestimonials.map((testimonial, index) => (
                <div
                  key={`${testimonial.id}-${currentIndex}`}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="soft-ui-raised-card bg-[#eae7e1] border border-[#dedad1] rounded-3xl p-6 sm:p-8 shadow-[10px_10px_22px_#cfcbc2,-10px_-10px_22px_#ffffff] hover:shadow-[14px_14px_28px_#cfcbc2,-14px_-14px_28px_#ffffff] transition-all h-full flex flex-col group will-change-transform will-change-opacity"
                >
                  <div className="flex flex-col h-full">
                    {/* Top Row: Debossed Quote Badge & Star Ratings */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shadow-[inset_2px_2px_4px_#cac5bb,inset_-2px_-2px_4px_#ffffff]">
                        <Quote className="h-5 w-5 stroke-[2.2]" />
                      </div>
                      <div className="flex items-center gap-1 soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] px-2.5 py-1.5 rounded-xl">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < testimonial.rating
                                ? "text-[#e59845] fill-[#e59845]"
                                : "text-[#cdc8be]"
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Quote */}
                    <p className="text-sm sm:text-base text-[#43413d] font-mono mb-6 flex-1 leading-relaxed italic">
                      "{testimonial.content}"
                    </p>

                    {/* Author Footer */}
                    <div className="mt-auto pt-4 border-t border-[#dedad1] flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] p-0.5 overflow-hidden shrink-0 flex items-center justify-center shadow-inner">
                        {testimonial.image ? (
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover rounded-full"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        <div
                          className="w-full h-full font-digital font-bold text-sm text-[#e59845] flex items-center justify-center"
                          style={{ display: testimonial.image ? 'none' : 'flex' }}
                        >
                          {testimonial.name.charAt(0)}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-digital font-bold text-sm sm:text-base text-[#2d2b28] group-hover:text-[#e59845] transition-colors truncate">
                          {testimonial.name}
                        </p>
                        <p className="font-digital text-xs text-[#78756e] truncate">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Navigation Arrows */}
            {totalPages > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-12 h-12 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#5a5751] hover:text-[#e59845] transition-all shadow-md z-10 hidden sm:flex items-center justify-center active:scale-95 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextTestimonial}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-12 h-12 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#5a5751] hover:text-[#e59845] transition-all shadow-md z-10 hidden sm:flex items-center justify-center active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}
          </div>

          {/* Navigation Dots / Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 pt-4">
              <button
                onClick={prevTestimonial}
                className="sm:hidden w-10 h-10 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#5a5751] flex items-center justify-center active:scale-95 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be]">
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      currentIndex === index
                        ? "w-7 bg-[#e59845] shadow-sm"
                        : "w-2.5 bg-[#cdc8be] hover:bg-[#b0aba0]"
                    }`}
                    aria-label={`Go to page ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="sm:hidden w-10 h-10 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#5a5751] flex items-center justify-center active:scale-95 cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;