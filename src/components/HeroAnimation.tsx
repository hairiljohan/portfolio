import React, { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const HeroAnimation: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate stable random values for particles to prevent hydration mismatches
  // and ensure they don't default to (0,0) due to render inconsistencies.
  const particles = useMemo(() => {
    return [...Array(6)].map(() => ({
      r: Math.random() * 2 + 1,
      cx: Math.random() * 100, // Percentage for horizontal position
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 20,
    }));
  }, []);

  // When users prefer reduced motion, render static graphics without animations
  const animated = !prefersReducedMotion;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id="hero-grid-pattern"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="2"
              cy="2"
              r="1"
              className="fill-charcoal/15 dark:fill-cream/15"
            />
          </pattern>
        </defs>

        {/* Subtle Grid Background */}
        <rect width="100%" height="100%" fill="url(#hero-grid-pattern)" />

        {/* 
          Main Kinetic System 
          Positioned towards the right on desktop, centered on mobile 
        */}
        <g className="translate-x-[50%] translate-y-[50%] md:translate-x-[75%] md:translate-y-[50%]">
          {/* Outer Dashed Ring - Slow Rotate Clockwise */}
          <motion.circle
            cx="0"
            cy="0"
            r="300"
            className="stroke-charcoal/20 dark:stroke-cream/20 fill-none"
            strokeWidth="1"
            strokeDasharray="10 10"
            animate={animated ? { rotate: 360 } : false}
            transition={
              animated
                ? { duration: 120, repeat: Infinity, ease: "linear" }
                : undefined
            }
          />

          {/* Middle Arc - Medium Rotate Counter-Clockwise */}
          <motion.circle
            cx="0"
            cy="0"
            r="250"
            className="stroke-charcoal/25 dark:stroke-cream/25 fill-none"
            strokeWidth="1"
            strokeDasharray="400 400" // Creates a partial arc look
            animate={animated ? { rotate: -360 } : false}
            transition={
              animated
                ? { duration: 80, repeat: Infinity, ease: "linear" }
                : undefined
            }
          />

          {/* Inner Technical Ring - Faster Rotate */}
          <motion.circle
            cx="0"
            cy="0"
            r="180"
            className="stroke-accent-orange/35 fill-none"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            animate={animated ? { rotate: 360 } : false}
            transition={
              animated
                ? { duration: 40, repeat: Infinity, ease: "linear" }
                : undefined
            }
          />

          {/* Core - Breathing Animation */}
          <motion.circle
            cx="0"
            cy="0"
            r="100"
            className="fill-accent-orange/25"
            animate={
              animated
                ? { scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }
                : { scale: 1, opacity: 0.5 }
            }
            transition={
              animated
                ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
                : undefined
            }
          />
        </g>

        {/* 
          Airflow / Data Stream Particles 
          Floating upwards to represent lift or data flow.
          Only rendered after mount to ensure stable random values.
        */}
        {mounted &&
          particles.map((p, i) => (
            <motion.circle
              key={i}
              r={p.r}
              cx={`${p.cx}%`}
              cy="110%" // Start below screen
              className="fill-charcoal/40 dark:fill-cream/40"
              initial={animated ? { opacity: 0 } : undefined}
              animate={
                animated
                  ? { cy: "-10%", opacity: [0, 1, 0] }
                  : { cy: "80%", opacity: 0.4 }
              }
              transition={
                animated
                  ? {
                      duration: p.duration,
                      repeat: Infinity,
                      ease: "linear",
                      delay: p.delay,
                    }
                  : undefined
              }
            />
          ))}
      </svg>
    </div>
  );
};

export default HeroAnimation;
