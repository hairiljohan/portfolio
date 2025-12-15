import React from "react";
import SectionWrapper from "./SectionWrapper";
import { SKILLS } from "../constants";
import { useCanHover } from "../hooks/useCanHover";
import { cn, hoverClass } from "../utils/classNames";
import { headingLg, textPrimaryAnimated } from "../utils/tw";

const Skills: React.FC = () => {
  const canHover = useCanHover();
  const colorClassMap: Record<string, string> = {
    "bg-red-500": "bg-red-500/10 text-red-500",
    "bg-blue-500": "bg-blue-500/10 text-blue-500",
    "bg-orange-500": "bg-orange-500/10 text-orange-500",
  };

  return (
    <SectionWrapper id="skills">
      <div className="mb-16">
        <h2 className={headingLg}>Technical Skills</h2>
        <p
          className={cn(
            "text-charcoal/50 dark:text-cream/50 text-base italic",
            textPrimaryAnimated
          )}
        >
          Hover to find out more
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full max-w-6xl mx-auto">
        {SKILLS.map((skill, index) => (
          <div
            key={index}
            tabIndex={0}
            className={cn(
              "group relative h-80 w-full rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 bg-white dark:bg-white/5 border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:focus-visible:ring-offset-charcoal",
              hoverClass(
                canHover,
                "md:hover:shadow-2xl md:hover:shadow-accent-blue/10 md:hover:border-gray-100 md:dark:hover:border-white/10"
              )
            )}
          >
            {/* Default State */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500 group-focus-visible:opacity-10 group-focus-visible:scale-95",
                hoverClass(
                  canHover,
                  "md:group-hover:opacity-10 md:group-hover:scale-95"
                )
              )}
            >
              <div
                className={`p-6 rounded-2xl ${
                  colorClassMap[skill.color] ?? "bg-charcoal/10 text-charcoal"
                } mb-6`}
              >
                <skill.icon size={48} />
              </div>
              <h3
                className={cn(
                  "text-2xl font-bold text-center",
                  textPrimaryAnimated
                )}
              >
                {skill.title}
              </h3>
            </div>

            {/* Hover State */}
            <div
              className={cn(
                "absolute inset-0 flex flex-col items-center justify-center p-8 opacity-100 translate-y-0 transition-all duration-300 bg-white/50 dark:bg-zinc-900/90 backdrop-blur-sm group-focus-visible:opacity-100 group-focus-visible:translate-y-0",
                hoverClass(
                  canHover,
                  "md:opacity-0 md:translate-y-8 md:group-hover:opacity-100 md:group-hover:translate-y-0"
                )
              )}
            >
              <div
                className={`p-4 rounded-xl ${skill.color} text-white mb-4 shadow-lg`}
              >
                <skill.icon size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-charcoal dark:text-cream">
                {skill.title}
              </h3>
              <p className="text-center text-charcoal/70 dark:text-cream/80 leading-relaxed font-medium">
                {skill.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Skills;
