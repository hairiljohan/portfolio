import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowDown } from "lucide-react";

const HeroAnimation = lazy(() => import("./HeroAnimation"));

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const [shouldBounce, setShouldBounce] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShouldBounce(entry.isIntersecting && entry.intersectionRatio > 0.1);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 1] }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Respect users who prefer reduced motion by disabling bounce
  const bounceClass =
    !prefersReducedMotion && shouldBounce ? "animate-bounce" : "";

  return (
    <div
      ref={heroRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden -mt-4 md:-mt-6 lg:-mt-8"
    >
      {/* Background Animation Layer - Spans full viewport width */}
      <Suspense fallback={<div className="absolute inset-0" />}>
        <HeroAnimation />
      </Suspense>

      {/* Content Container - Constrained to standard max-width */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center pt-0 md:pt-1 lg:pt-2">
        <div className="max-w-4xl">
          <span className="block text-accent-orange font-medium text-lg mb-6 tracking-wide uppercase">
            Aircraft Systems Engineering Undergraduate
          </span>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold font-serif text-charcoal dark:text-cream leading-[0.9] tracking-tight mb-8 transition-colors duration-300">
            Hairil Johan<span className="text-accent-orange">.</span>
          </h1>

          <p className="text-xl md:text-2xl text-charcoal/60 dark:text-cream/60 max-w-xl leading-relaxed transition-colors duration-300">
            Keeping complex aircraft systems and everyday tech running reliably.
          </p>
        </div>

        <div className="absolute bottom-28 left-6 md:left-12 flex items-center gap-4 text-sm font-medium text-charcoal/40 dark:text-cream/40 transition-colors duration-300 z-10">
          <span className={bounceClass}>
            <ArrowDown size={20} />
          </span>
          Scroll to explore
        </div>
      </div>
    </div>
  );
};

export default Hero;
