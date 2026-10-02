import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);

        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        if (window.lenis) {
            window.lenis.scrollTo(0, {
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 p-2.5 sm:p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-110 active:scale-95"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
