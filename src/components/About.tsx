import React from "react";
import SectionWrapper from "./SectionWrapper";
import { cn } from "../utils/classNames";
import { textPrimaryAnimated } from "../utils/tw";

const About: React.FC = () => {
  return (
    <SectionWrapper
      id="about"
      className="bg-white dark:bg-white/5 rounded-card-lg my-10 shadow-sm border border-stone-100 dark:border-white/5 transition-colors duration-300 scroll-mt-32 md:scroll-mt-40"
    >
      <div className="grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-4">
          <h2
            className={cn(
              "text-4xl md:text-5xl font-serif font-bold mb-6",
              textPrimaryAnimated
            )}
          >
            About Me
          </h2>
          <div className="h-1 w-20 bg-accent-orange rounded-full"></div>
        </div>
        <div
          className={cn(
            "md:col-span-8 text-lg md:text-xl text-charcoal/80 dark:text-cream/80 leading-relaxed space-y-6",
            textPrimaryAnimated
          )}
        >
          <p>
            I am an Aircraft Systems Engineering undergraduate interested in how
            complex systems behave, from aircraft components to the
            infrastructure that keeps everyday technology running.
          </p>
          <p>
            In school I work with tools like SolidWorks, Ansys Fluent, MATLAB
            and Simulink to study aerodynamics and electromechanical systems. At
            home I run a small homelab, self-host services, and experiment with
            local AI models to learn more about privacy-focused, offline
            tooling. I believe in building reliable systems, whether they're
            flying at 30,000 feet or running quietly in a home server rack.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default About;
