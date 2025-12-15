import React from "react";
import SectionWrapper from "./SectionWrapper";
import { PROJECTS } from "../constants";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useCanHover } from "../hooks/useCanHover";
import { useCarousel } from "../hooks/useCarousel";
import { cn, hoverClass } from "../utils/classNames";
import {
  actionButtonBase,
  headingXl,
  textPrimaryAnimated,
  headingSm,
  badgeBase,
} from "../utils/tw";

const Showcase: React.FC = () => {
  const canHover = useCanHover();
  const { scrollRef, progress, scroll, handleScroll } = useCarousel();

  return (
    <SectionWrapper id="showcase" className="overflow-visible">
      <div className="flex justify-between items-end mb-12 px-2">
        <div>
          <h2 className={headingXl}>Showcase</h2>
          <p
            className={cn(
              "text-charcoal/50 dark:text-cream/50 max-w-xl text-lg",
              textPrimaryAnimated
            )}
          >
            A friendly little corner to explore my projects and trinkets. A mix
            of experiments, ideas, and things I just had fun building.
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 md:gap-8 overflow-x-auto pb-8 pt-4 px-2 snap-x snap-mandatory no-scrollbar"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {PROJECTS.map((project) => {
          if (project.comingSoon) {
            return (
              <div
                key={project.id}
                className="group relative flex-shrink-0 w-[85vw] md:w-[600px] h-[400px] md:h-[500px] snap-center rounded-card overflow-hidden cursor-default bg-neutral-100 dark:bg-white/5 border border-dashed border-neutral-300 dark:border-white/10 transition-all duration-500"
                aria-disabled="true"
              >
                <div className="absolute inset-0 p-8 md:p-10 flex flex-col items-center justify-center text-center gap-5 pointer-events-none bg-gradient-to-br from-neutral-200 via-neutral-100 to-neutral-50 dark:from-charcoal/70 dark:via-charcoal/50">
                  <span className={badgeBase}>{project.category}</span>
                  <div className="space-y-3 max-w-[520px]">
                    <h3 className={headingSm}>{project.title}</h3>
                    {project.description && (
                      <p className="text-charcoal/70 dark:text-cream/70 text-lg leading-tight">
                        {project.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          }

          const isExternal = project.link.startsWith("http");
          return (
            <a
              key={project.id}
              href={project.link}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "group relative flex-shrink-0 w-[85vw] md:w-[600px] h-[400px] md:h-[500px] snap-center rounded-card overflow-hidden cursor-pointer bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 transition-all duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-orange/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream dark:focus-visible:ring-offset-charcoal",
                hoverClass(
                  canHover,
                  "md:hover:border-accent-orange/50 md:dark:hover:border-accent-orange/50 md:hover:shadow-xl"
                )
              )}
            >
              {/* Large Background Icon for visual interest */}
              <div
                className={cn(
                  "absolute right-[-10%] bottom-[-10%] opacity-[0.03] dark:opacity-[0.05] transition-all duration-700 pointer-events-none group-focus-visible:opacity-[0.08] group-focus-visible:scale-110",
                  hoverClass(
                    canHover,
                    "md:group-hover:opacity-[0.08] md:dark:group-hover:opacity-[0.1] md:group-hover:scale-110"
                  )
                )}
              >
                <project.icon size={400} strokeWidth={1} />
              </div>

              {/* Main Icon Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className={cn(
                    "w-32 h-32 md:w-40 md:h-40 rounded-full bg-cream-dark/30 dark:bg-white/10 flex items-center justify-center text-charcoal dark:text-cream transition-all duration-500 group-focus-visible:scale-110 group-focus-visible:bg-accent-orange group-focus-visible:text-white",
                    hoverClass(
                      canHover,
                      "md:group-hover:scale-110 md:group-hover:bg-accent-orange md:group-hover:text-white"
                    )
                  )}
                >
                  <project.icon size={64} strokeWidth={1.5} />
                </div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-between pointer-events-none">
                <div className="flex justify-start">
                  <span className={badgeBase}>{project.category}</span>
                </div>

                <div className="flex flex-col justify-end w-full mt-auto">
                  {project.description && (
                    <p
                      className={cn(
                        "text-charcoal/70 dark:text-cream/70 text-lg mb-3 font-medium leading-tight max-w-[90%] opacity-100 transition-all duration-500 mt-6 md:mt-8 group-focus-visible:opacity-100 group-focus-visible:translate-y-0",
                        hoverClass(
                          canHover,
                          "md:opacity-0 md:group-hover:opacity-100 md:translate-y-4 md:group-hover:translate-y-0"
                        )
                      )}
                    >
                      {project.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between w-full">
                    <h3 className={cn(headingSm, "max-w-[80%]")}>
                      {project.title}
                    </h3>
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full bg-charcoal dark:bg-cream text-white dark:text-charcoal flex items-center justify-center opacity-100 scale-100 transition-all duration-300 shadow-lg group-focus-visible:opacity-100 group-focus-visible:scale-100",
                        hoverClass(
                          canHover,
                          "md:opacity-0 md:scale-75 md:group-hover:opacity-100 md:group-hover:scale-100"
                        )
                      )}
                    >
                      <ArrowUpRight size={20} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}

        {/* Spacer for end of list scrolling */}
        <div className="w-12 flex-shrink-0" />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-4 px-2">
        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => scroll("left")}
            className={cn(
              actionButtonBase,
              hoverClass(
                canHover,
                "md:hover:bg-gray-50 md:dark:hover:bg-white/20"
              )
            )}
            aria-label="Scroll left"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scroll("right")}
            className={cn(
              actionButtonBase,
              hoverClass(
                canHover,
                "md:hover:bg-gray-50 md:dark:hover:bg-white/20"
              )
            )}
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="flex-1 h-[2px] bg-charcoal/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-accent-orange transition-all duration-150 ease-out"
            style={{ width: `${Math.max(5, progress)}%` }}
          />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Showcase;
