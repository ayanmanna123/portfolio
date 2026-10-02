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
      // Using the user's real Formspree endpoint
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
          className: "bg-green-600 text-white dark:bg-green-500 border border-green-700 shadow-lg",
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
    <footer className="px-4 sm:px-6 py-8 sm:py-12 mt-12 sm:mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Glass background container */}
        <motion.div
          className="backdrop-blur-lg bg-card/90 dark:bg-gray-900/70 rounded-2xl p-5 sm:p-8 border border-border shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Branding */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Logo" className="w-8 h-8 object-contain" />
                <h3 className="text-xl font-bold text-foreground">AYAN MANNA</h3>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Digital designer & developer creating meaningful and performant experiences.
              </p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-accent/60 text-muted-foreground hover:text-foreground transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={itemVariants}>
              <h4 className="text-foreground font-semibold mb-4 text-xs sm:text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="hover:text-foreground transition-colors duration-300 text-sm text-muted-foreground block py-0.5"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-foreground font-semibold text-xs sm:text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-3 text-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-muted-foreground mt-0.5 shrink-0">{info.icon}</span>
                    {info.href ? (
                      <a
                        href={info.href}
                        target={info.href.startsWith("http") ? "_blank" : undefined}
                        rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="hover:text-foreground transition-colors duration-300 text-muted-foreground hover:underline truncate"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-muted-foreground truncate">{info.text}</span>
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
                  className="group relative block w-full h-24 sm:h-28 rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <iframe
                    title="Kolkata Map"
                    src="https://maps.google.com/maps?q=Kolkata,West+Bengal,India&t=&z=11&ie=UTF8&iwloc=&output=embed"
                    className="w-full h-full border-0 pointer-events-none filter dark:invert-[0.9] dark:hue-rotate-180 dark:contrast-125 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-between p-2.5">
                    <div className="flex items-center gap-1.5 text-white">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                      </span>
                      <span className="text-xs font-semibold tracking-tight drop-shadow">Kolkata, India</span>
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-medium text-white group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                      Open Map
                      <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-foreground font-semibold text-xs sm:text-sm uppercase tracking-wider">Newsletter</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Subscribe to get updates on my latest projects and tech articles.
              </p>
              <form className="space-y-2.5" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3.5 py-2.5 text-base sm:text-sm border border-input text-foreground bg-background rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary w-full"
                  required
                  disabled={isSubmitting || isSuccess}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-300 w-full flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-sm cursor-pointer min-h-[42px]"
                >
                  {isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed! 🎉" : "Subscribe"}
                </button>
                {isSuccess && (
                  <p className="text-green-600 dark:text-green-400 text-xs sm:text-sm">Thanks for subscribing!</p>
                )}
                {isError && (
                  <p className="text-red-600 dark:text-red-400 text-xs sm:text-sm">Subscription failed. Please try again.</p>
                )}
              </form>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border flex flex-col-reverse sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground text-center sm:text-left"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <p>© {currentYear} Ayan Manna. All rights reserved.</p>
            </div>

            <div className="flex items-center gap-4 sm:gap-6 flex-wrap justify-center">
              <Link to="/privacy" className="hover:text-foreground transition-colors py-1">Privacy</Link>
              <Link to="/terms" className="hover:text-foreground transition-colors py-1">Terms</Link>
              <motion.a
                href="#hero"
                aria-label="Back to top"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 transition-all duration-300"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowUp size={16} />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};