import React, { useRef } from "react";
import { useInView } from "../hooks/useInView";

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  delay?: number;
  paddingClass?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  className = "",
  delay = 0,
  paddingClass = "py-20 md:py-32",
}) => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id={id}
      ref={ref}
      className={`${paddingClass} px-6 md:px-12 max-w-7xl mx-auto ${className}`}
    >
      <div
        className={`transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isInView
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-[30px]"
        }`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
