import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

export const CountUp = ({
    value,
    className = "",
    suffix = "",
    prefix = "",
    damping = 90,
    stiffness = 100
}) => {
    const ref = useRef(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping,
        stiffness,
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView && typeof value === 'number') {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = prefix + Math.floor(latest).toLocaleString() + suffix;
            }
        });
    }, [springValue, prefix, suffix]);

    return <span className={className} ref={ref}>{prefix + "0" + suffix}</span>;
};
