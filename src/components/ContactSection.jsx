import React, { useState, useEffect, useRef } from "react";
import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitter,
  Github,
  Loader2,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { contactInfo, socialLinks } from "@/data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const headerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    const ctx = gsap.context(() => {
      if (line1Ref.current) {
        gsap.fromTo(
          line1Ref.current,
          { y: 50, opacity: 0 },
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
          { y: 50, opacity: 0 },
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
          { y: 30, opacity: 0 },
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
    }, headerRef.current);

    return () => ctx.revert();
  }, []);

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Name is required",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Email is required",
        variant: "destructive"
      });
      return false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        title: "Invalid email format",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.message.trim() || formData.message.length < 10) {
      toast({
        title: "Message must be at least 10 characters",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mzdvrklp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Message sent! 🎉",
          description: "I'll get back to you within 24 hours.",
          variant: "success",
          className: "bg-[#e59845] text-white border-none shadow-lg"
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Oops! Something went wrong",
        description: "Please try again or email me directly at mannaayan777@gmail.com",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#eae7e1] text-[#43413d] select-none transition-colors"
    >
      {/* Exact Neumorphic Soft UI Styles from SoftUiWidgets.jsx */}
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
            box-shadow: 10px 10px 22px #cfcbc2, -10px -10px 22px #ffffff;
          }
          .soft-ui-raised-card {
            background: #eae7e1;
            box-shadow: 12px 12px 24px #cfcbc2, -12px -12px 24px #ffffff;
          }
          .soft-ui-inset {
            background: #e4e1d9;
            box-shadow: inset 4px 4px 8px #cac5bb, inset -4px -4px 8px #ffffff;
          }
          .soft-ui-inset-subtle {
            background: #e6e3dc;
            box-shadow: inset 2px 2px 5px #cdc8be, inset -2px -2px 5px #ffffff;
          }
        `
      }} />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header: Styled like SoftUiGreeting */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16 px-2 sm:px-6">
          <div ref={line1Ref} className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#78756e] font-handwriting mb-1">
            <span className="w-2 h-2 rounded-full bg-[#f06292]" />
            <span>Let's.Connect</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-1 leading-tight tracking-tight text-[#43413d]">
            <span>Get In </span>
            <span
              ref={line2Ref}
              className="text-[#e59845] font-handwriting font-bold"
            >
              Touch
            </span>
          </h2>

          <p
            ref={line3Ref}
            className="text-xs sm:text-sm text-[#78756e] font-medium font-handwriting max-w-xl mx-auto leading-relaxed mt-1"
          >
            Have a project in mind, a question, or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* Card 1: Contact Details & Social Links */}
          <div className="soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-9 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#383a3d] font-digital mb-6">
                Contact Details
              </h3>

              <div className="space-y-3.5 sm:space-y-4">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="soft-ui-inset-subtle rounded-[22px] p-3.5 sm:p-4 flex items-center gap-4 bg-[#e6e3dc] transition-all hover:scale-[1.01]"
                  >
                    <div className="soft-ui-raised w-11 h-11 rounded-[16px] flex items-center justify-center shrink-0 bg-[#eae7e1] text-[#e59845]">
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-[#78756e] font-handwriting font-bold uppercase tracking-wider">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm sm:text-base font-bold text-[#383a3d] font-digital hover:text-[#e59845] transition-colors truncate block"
                        >
                          {info.text}
                        </a>
                      ) : (
                        <span className="text-sm sm:text-base font-bold text-[#383a3d] font-digital truncate block">
                          {info.text}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links Strip */}
            <div className="pt-6 sm:pt-8 mt-6 border-t border-[#cdc8be]/40">
              <h4 className="font-bold mb-3 text-xs text-[#78756e] font-handwriting uppercase tracking-wider">
                Find me on
              </h4>
              <div className="flex flex-wrap gap-2.5 sm:gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="soft-ui-raised w-11 h-11 rounded-[16px] flex items-center justify-center text-[#5a5751] hover:text-[#e59845] hover:scale-105 active:scale-95 transition-all bg-[#eae7e1] border border-[#dedad1]"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Contact Form */}
          <div className="soft-ui-raised-card rounded-[32px] sm:rounded-[36px] p-6 sm:p-9 flex flex-col justify-between">
            <h3 className="text-2xl sm:text-3xl font-black text-[#383a3d] font-digital mb-6">
              Send Me a Message
            </h3>

            <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-bold text-[#78756e] font-handwriting block pl-1"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl soft-ui-inset bg-[#e4e1d9] text-[#383a3d] font-medium text-sm border-none focus:outline-none focus:ring-2 focus:ring-[#e59845]/40 placeholder:text-[#99948c] transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-bold text-[#78756e] font-handwriting block pl-1"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-2xl soft-ui-inset bg-[#e4e1d9] text-[#383a3d] font-medium text-sm border-none focus:outline-none focus:ring-2 focus:ring-[#e59845]/40 placeholder:text-[#99948c] transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="text-xs font-bold text-[#78756e] font-handwriting block pl-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl soft-ui-inset bg-[#e4e1d9] text-[#383a3d] font-medium text-sm border-none focus:outline-none focus:ring-2 focus:ring-[#e59845]/40 placeholder:text-[#99948c] transition-all resize-none"
                  placeholder="Hey, I'd love to collaborate on..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "w-full soft-ui-raised rounded-2xl py-3.5 px-6 font-bold text-sm sm:text-base text-[#383a3d] font-handwriting flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98] transition-all bg-[#eae7e1] border border-[#dedad1] cursor-pointer mt-2",
                  isSubmitting && "opacity-75 cursor-not-allowed"
                )}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-[#e59845]" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={15} className="text-[#e59845]" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;