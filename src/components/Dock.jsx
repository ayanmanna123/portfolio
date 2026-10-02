'use client';

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import './Dock.css';

function DockItem({
  icon,
  label,
  isActive,
  onClick,
  mouseX,
  spring,
  distance = 140,
  magnification = 68,
  baseItemSize = 46,
}) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Compute distance from mouseX to center of this item
  const mouseDistance = useTransform(mouseX, (val) => {
    if (val === Infinity || val === -Infinity || isNaN(val) || !ref.current) {
      return distance + 100;
    }
    const rect = ref.current.getBoundingClientRect();
    return val - (rect.left + rect.width / 2);
  });

  // Calculate scaled target size with clamping to prevent negative or infinite extrapolations
  const targetSize = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [baseItemSize, magnification, baseItemSize],
    { clamp: true }
  );

  const size = useSpring(targetSize, spring);

  return (
    <div className="dock-item-wrapper">
      {/* Tooltip Label */}
      <AnimatePresence>
        {isHovered && label && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.85 }}
            animate={{ opacity: 1, y: -6, scale: 1 }}
            exit={{ opacity: 0, y: 0, scale: 0.85 }}
            transition={{ duration: 0.15 }}
            className="dock-label"
            role="tooltip"
          >
            {label}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        ref={ref}
        type="button"
        style={{
          width: size,
          height: size,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.88 }}
        className={`dock-item ${isActive ? 'dock-item-active' : ''}`}
        aria-label={label}
      >
        <div className="dock-icon">
          {icon}
        </div>
      </motion.button>

      {/* Active Indicator Dot */}
      {isActive && (
        <motion.div
          layoutId="dockActiveDot"
          className="dock-active-dot"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </div>
  );
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 170, damping: 14 },
  magnification = 68,
  distance = 140,
  baseItemSize = 46,
}) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="dock-outer">
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className={`dock-panel ${className}`}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={item.label || index}
            icon={item.icon}
            label={item.label}
            isActive={item.isActive}
            onClick={item.onClick}
            mouseX={mouseX}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
          />
        ))}
      </motion.nav>
    </div>
  );
}


