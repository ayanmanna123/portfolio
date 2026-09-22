import {
  ArrowUp,
  Linkedin,
  Instagram,
  Youtube,
  Github,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { socialLinks, quickLinks, contactInfo } from "@/data";
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
    <footer className="px-6 py-12 mt-20">
      <div className="max-w-6xl mx-auto">
        {/* Glass background container */}
        <motion.div
          className="backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 rounded-xl p-8 border border-white/20 dark:border-gray-700/50 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Branding */}
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="flex items-center gap-3">
                <img src="/logo.svg" alt="Logo" className="w-8 h-8 object-contain" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">AYAN MANNA</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Digital designer & developer creating meaningful experiences.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-300"
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
              <h4 className="text-gray-900 dark:text-white font-medium mb-4 text-sm uppercase tracking-wider">Navigation</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.href}
                      className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-sm text-gray-600 dark:text-gray-300"
                    >
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={itemVariants}>
              <h4 className="text-gray-900 dark:text-white font-medium mb-4 text-sm uppercase tracking-wider">Contact</h4>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start space-x-3 text-sm"
                    whileHover={{ scale: 1.02 }}
                  >
                    <span className="text-gray-600 dark:text-gray-400 mt-0.5">{info.icon}</span>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="hover:text-gray-900 dark:hover:text-white transition-colors duration-300 text-gray-600 dark:text-gray-300"
                      >
                        {info.text}
                      </a>
                    ) : (
                      <span className="text-gray-600 dark:text-gray-300">{info.text}</span>
                    )}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className="text-gray-900 dark:text-white font-medium text-sm uppercase tracking-wider">Newsletter</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Subscribe to get updates on my latest work.
              </p>
              <form className="space-y-3" onSubmit={handleNewsletterSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:bg-gray-800/50 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-900 dark:focus:ring-gray-300 focus:border-gray-900 dark:focus:border-gray-300 w-full"
                  required
                  disabled={isSubmitting || isSuccess}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className="bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-200 dark:text-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 w-full flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Subscribing..." : isSuccess ? "Subscribed!" : "Subscribe"}
                </button>
                {isSuccess && (
                  <p className="text-green-600 dark:text-green-400 text-sm">Thanks for subscribing!</p>
                )}
                {isError && (
                  <p className="text-red-600 dark:text-red-400 text-sm">Subscription failed. Please try again.</p>
                )}
              </form>
            </motion.div>
          </div>

          {/* Bottom bar */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700/50 flex flex-col items-center text-xs text-gray-600 dark:text-gray-400 space-y-4 sm:space-y-0 sm:flex-row sm:justify-between"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div>
              <p>© {currentYear} Ayan Manna. All rights reserved.</p>
            </div>

            <div className="flex items-center space-x-6">
              <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms</Link>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white transition-colors">Cookies</a>
              <motion.a
                href="#hero"
                aria-label="Back to top"
                className="p-2 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300"
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