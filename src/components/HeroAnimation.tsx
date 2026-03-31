import React, { useMemo } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const HeroAnimation: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const particles = useMemo(() => {
    return [...Array(6)].map(() => ({
      r: Math.random() * 2 + 1,
      cx: Math.random() * 100,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 20,
    }));
  }, []);

  const animated = !prefersReducedMotion;
  const ringStyle = {
    transformBox: "fill-box" as const,
    transformOrigin: "center",
  };

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
          <circle
            cx="0"
            cy="0"
            r="300"
            className="stroke-charcoal/20 dark:stroke-cream/20 fill-none"
            strokeWidth="1"
            strokeDasharray="10 10"
            style={
              animated
                ? { ...ringStyle, animation: "heroSpinCw 120s linear infinite" }
                : ringStyle
            }
          />

          {/* Middle Arc - Medium Rotate Counter-Clockwise */}
          <circle
            cx="0"
            cy="0"
            r="250"
            className="stroke-charcoal/25 dark:stroke-cream/25 fill-none"
            strokeWidth="1"
            strokeDasharray="400 400"
            style={
              animated
                ? {
                    ...ringStyle,
                    animation: "heroSpinCcw 80s linear infinite",
                  }
                : ringStyle
            }
          />

          {/* Inner Technical Ring - Faster Rotate */}
          <circle
            cx="0"
            cy="0"
            r="180"
            className="stroke-accent-orange/35 fill-none"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            style={
              animated
                ? { ...ringStyle, animation: "heroSpinCw 40s linear infinite" }
                : ringStyle
            }
          />

          {/* Core - Breathing Animation */}
          <circle
            cx="0"
            cy="0"
            r="100"
            className="fill-accent-orange/25"
            style={
              animated
                ? {
                    ...ringStyle,
                    animation: "heroBreathe 4s ease-in-out infinite",
                  }
                : { opacity: 0.5 }
            }
          />
        </g>

        {/*
          Airflow / Data Stream Particles
          Floating upwards to represent lift or data flow.
        */}
        {particles.map((p, i) => (
          <circle
            key={i}
            r={p.r}
            cx={`${p.cx}%`}
            cy="110%"
            className="fill-charcoal/40 dark:fill-cream/40"
            style={
              animated
                ? {
                    animation: `heroFloatUp ${p.duration}s linear ${p.delay}s infinite`,
                  }
                : { opacity: 0.4, transform: "translateY(-30vh)" }
            }
          />
        ))}
      </svg>
    </div>
  );
};

export default HeroAnimation;
