import {
  ArrowUp,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Send,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { socialLinks, quickLinks, contactInfo, mapUrl } from "@/data";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mzdvrklp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          subject: "Newsletter Subscription"
        }),
      });

      if (response.ok) {
        toast({
          title: "Subscribed! 🎉",
          description: "Thank you for subscribing to my newsletter.",
        });
        setEmail("");
        setIsSuccess(true);
        setIsError(false);
      } else {
        throw new Error('Failed to subscribe');
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        variant: "destructive",
      });
      setIsError(true);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="relative px-4 sm:px-6 py-12 sm:py-16 md:py-20 bg-[#eae7e1] text-[#2d2b28] overflow-hidden">
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

      {/* Ambient Tactile Inset Rings */}
      <div className="absolute inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 rounded-full soft-ui-inset-subtle opacity-30" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full soft-ui-inset-subtle opacity-30" />
        <div className="absolute inset-0 opacity-25 bg-[linear-gradient(#dedad1_1px,transparent_1px),linear-gradient(90deg,#dedad1_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Soft UI Raised Clay Container */}
        <motion.div
          className="soft-ui-raised-card bg-[#eae7e1] border border-[#dedad1] rounded-3xl p-6 sm:p-10 md:p-12 shadow-[12px_12px_26px_#cfcbc2,-12px_-12px_26px_#ffffff]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-10">
            {/* Branding Column */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center shadow-inner p-1.5">
                  <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-xl font-bold font-digital text-[#2d2b28] leading-tight">
                    AYAN MANNA
                  </h3>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f06292] shadow-[0_0_6px_rgba(240,98,146,0.8)]" />
                    <span className="text-[10px] font-digital font-bold text-[#78756e] tracking-wider uppercase">
                      Full-Stack Engineer
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-[#5a5751] text-xs sm:text-sm font-mono leading-relaxed">
                Designing & engineering performant full-stack systems, creative interfaces, and tactile experiences.
              </p>

              {/* Social Clay Discs */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-2xl soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#5a5751] hover:text-[#e59845] transition-all flex items-center justify-center shadow-md active:scale-95 cursor-pointer"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="w-4 h-4 flex items-center justify-center">
                      {social.icon}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation Column */}
            <motion.div variants={itemVariants} className="text-left">
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#e59845]" />
                <h4 className="text-[#383a3d] font-bold text-xs sm:text-sm font-digital uppercase tracking-wider">
                  Navigation
                </h4>
              </div>
              <ul className="p-0 m-0 list-none space-y-2 text-left">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    className="p-0 m-0 text-left"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm font-digital text-[#5a5751] hover:text-[#e59845] transition-colors duration-200 block py-1"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact & Map Column */}
            <motion.div variants={itemVariants} className="space-y-4 text-left">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e59845]" />
                <h4 className="text-[#383a3d] font-bold text-xs sm:text-sm font-digital uppercase tracking-wider">
                  Contact
                </h4>
              </div>

              <ul className="p-0 m-0 list-none space-y-2.5 text-left">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    className="flex items-center gap-2.5 text-xs sm:text-sm"
                    whileHover={{ x: 2 }}
                  >
                    <span className="w-7 h-7 rounded-xl soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] flex items-center justify-center text-[#e59845] shrink-0 shadow-inner">
                      {info.icon}
                    </span>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="text-[#5a5751] font-mono hover:text-[#e59845] transition-colors truncate"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-[#5a5751] font-mono truncate">{info.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>

              {/* Interactive Kolkata Map Preview */}
              <div className="pt-1">
                <motion.a
                  href={mapUrl || "https://maps.app.goo.gl/xBHkkrbX2DACnEt16"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Kolkata in Google Maps"
                  className="group relative block w-full h-24 sm:h-28 rounded-2xl overflow-hidden soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] shadow-inner transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <iframe
                    title="Kolkata Map"
                    src="https://maps.google.com/maps?q=Kolkata,West+Bengal,India&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 pointer-events-none opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d2b28]/80 via-transparent to-transparent flex items-end justify-between p-2.5">
                    <div className="flex items-center gap-1.5 text-white">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f06292] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f06292]"></span>
                      </span>
                      <span className="text-[11px] font-digital font-bold tracking-tight">Kolkata, India</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xl soft-ui-raised bg-[#eae7e1] text-[#2d2b28] border border-[#dedad1] text-[10px] font-digital font-bold shadow-sm">
                      Map
                      <ExternalLink className="w-2.5 h-2.5 text-[#e59845]" />
                    </span>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Newsletter Column */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e59845]" />
                <h4 className="text-[#383a3d] font-bold text-xs sm:text-sm font-digital uppercase tracking-wider">
                  Newsletter
                </h4>
              </div>

              <p className="text-[#5a5751] text-xs sm:text-sm font-mono leading-relaxed">
                Subscribe for occasional updates on web experiments, open source code, and design architecture.
              </p>

              <form className="space-y-2.5" onSubmit={handleNewsletterSubmit}>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm font-mono text-[#2d2b28] placeholder-[#8a867c] soft-ui-inset bg-[#e4e1d9] border border-[#cdc8be] rounded-2xl focus:outline-none focus:border-[#e59845] transition-all shadow-[inset_2px_2px_4px_#cac5bb,inset_-2px_-2px_4px_#ffffff]"
                    required
                    disabled={isSubmitting || isSuccess}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="w-full py-2.5 px-4 rounded-2xl font-digital font-bold text-xs sm:text-sm soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#383a3d] hover:text-[#e59845] flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-60 cursor-pointer min-h-[42px]"
                >
                  <Send className="w-3.5 h-3.5 text-[#e59845]" />
                  <span>{isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed! 🎉" : "Subscribe"}</span>
                </button>
                {isSuccess && (
                  <p className="text-emerald-700 text-xs font-digital font-bold">Thanks for subscribing!</p>
                )}
                {isError && (
                  <p className="text-rose-600 text-xs font-digital font-bold">Subscription failed. Please try again.</p>
                )}
              </form>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#dedad1] flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs font-digital text-[#78756e] text-center sm:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-1.5 flex-wrap justify-center sm:justify-start">
              <span>© {currentYear} Ayan Manna.</span>
              <span className="hidden sm:inline">•</span>
              <span>Crafted with Neumorphic Clay</span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <Link to="/privacy" className="hover:text-[#e59845] transition-colors py-1">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-[#e59845] transition-colors py-1">Terms of Service</Link>
              <motion.a
                href="#hero"
                aria-label="Back to top"
                className="w-9 h-9 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#5a5751] hover:text-[#e59845] flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp size={15} className="text-[#e59845]" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;