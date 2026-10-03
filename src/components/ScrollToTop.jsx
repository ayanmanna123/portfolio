import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        let ticking = false;

        const updateVisibility = () => {
            const shouldBeVisible = window.scrollY > 300;
            setIsVisible((prev) => (prev !== shouldBeVisible ? shouldBeVisible : prev));
            ticking = false;
        };

        const toggleVisibility = () => {
            if (!ticking) {
                requestAnimationFrame(updateVisibility);
                ticking = true;
            }
        };

        window.addEventListener("scroll", toggleVisibility, { passive: true });
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
                    className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 p-3 rounded-full soft-ui-raised bg-[#eae7e1] border border-[#dedad1] text-[#5a5751] hover:text-[#e59845] shadow-[6px_6px_14px_#cfcbc2,-6px_-6px_14px_#ffffff] transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    aria-label="Scroll to top"
                >
                    <ArrowUp className="w-5 h-5 text-[#e59845]" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};
