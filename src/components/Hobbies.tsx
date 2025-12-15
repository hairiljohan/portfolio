import React from "react";
import SectionWrapper from "./SectionWrapper";
import { HOBBIES } from "../constants";
import { useCanHover } from "../hooks/useCanHover";
import { cn, hoverClass } from "../utils/classNames";
import { headingLg } from "../utils/tw";

const Hobbies: React.FC = () => {
  const canHover = useCanHover();

  return (
    <SectionWrapper
      id="hobbies"
      paddingClass="pt-8 pb-16 md:pt-12 md:pb-16"
      className="bg-charcoal dark:bg-white/5 text-cream rounded-card-lg my-10 transition-colors duration-300 scroll-mt-32 md:scroll-mt-40"
    >
      <div className="text-center mb-10 md:mb-12">
        <h2 className={cn(headingLg, "text-white")}>
          Interests & Side Projects
        </h2>
        <p className="text-white/40">Beyond the workspace</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        {HOBBIES.map((hobby, index) => (
          <div
            key={index}
            tabIndex={0}
            className={cn(
              "group flex flex-col items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:focus-visible:ring-offset-charcoal"
            )}
          >
            <div
              className={cn(
                "relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/10 flex items-center justify-center mb-6 transition-all duration-500 overflow-hidden group-focus-visible:bg-accent-orange group-focus-visible:scale-110",
                hoverClass(
                  canHover,
                  "md:group-hover:bg-accent-orange md:group-hover:scale-110"
                )
              )}
            >
              <hobby.icon size={32} className="text-white relative z-10" />
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-tr from-orange-600 to-yellow-500 opacity-0 transition-opacity duration-500 group-focus-visible:opacity-100",
                  hoverClass(canHover, "md:group-hover:opacity-100")
                )}
              />
            </div>

            <h3
              className={cn(
                "text-xl font-medium mb-2 transition-colors duration-300 group-focus-visible:text-accent-orange",
                hoverClass(canHover, "md:group-hover:text-accent-orange")
              )}
            >
              {hobby.name}
            </h3>

            <div
              className={cn(
                "h-auto overflow-hidden transition-all duration-500 group-focus-visible:h-auto",
                hoverClass(canHover, "md:h-0 md:group-hover:h-auto")
              )}
            >
              <p
                className={cn(
                  "text-center text-white/60 text-base leading-relaxed max-w-[280px] px-5 py-4 bg-white/5 md:bg-white/10 rounded-2xl opacity-100 transition-all duration-500 delay-75 group-focus-visible:opacity-100 group-focus-visible:translate-y-0",
                  hoverClass(
                    canHover,
                    "md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0"
                  )
                )}
              >
                {hobby.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default Hobbies;
