import React from "react";
import SectionWrapper from "./SectionWrapper";
import { Linkedin, Github } from "lucide-react";
import { useCanHover } from "../hooks/useCanHover";
import { cn, hoverClass } from "../utils/classNames";
import {
  ctaLinkColumn,
  textPrimary,
  textPrimaryAnimated,
  textSecondary,
} from "../utils/tw";

const Contact: React.FC = () => {
  const canHover = useCanHover();

  return (
    <div className="bg-cream-dark/30 dark:bg-white/5 transition-colors duration-300">
      <SectionWrapper id="contact" className="py-24 md:py-40 text-center">
        <h2
          className={cn(
            "text-5xl md:text-7xl font-serif font-bold mb-8",
            textPrimaryAnimated
          )}
        >
          Let's Connect
        </h2>
        <p
          className={cn(
            "text-xl mb-12 mx-auto max-w-none md:whitespace-nowrap",
            textSecondary,
            textPrimaryAnimated
          )}
        >
          Whether it is a quick hello or an idea you have, I am always up for a
          conversation.
        </p>

        <div className="flex items-center justify-center gap-8">
          <a
            href="https://www.linkedin.com/in/hairil-johan"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              ctaLinkColumn,
              textPrimary,
              hoverClass(
                canHover,
                "md:hover:text-blue-600 md:dark:hover:text-blue-400"
              )
            )}
          >
            <div
              className={cn(
                "p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm transition-all duration-300",
                hoverClass(
                  canHover,
                  "md:group-hover:shadow-md md:group-hover:-translate-y-1"
                )
              )}
            >
              <Linkedin size={32} />
            </div>
            <span
              className={cn(
                "font-medium text-sm opacity-100 transition-opacity translate-y-0",
                hoverClass(
                  canHover,
                  "md:opacity-0 md:group-hover:opacity-100 md:-translate-y-2 md:group-hover:translate-y-0"
                )
              )}
            >
              LinkedIn
            </span>
          </a>

          <a
            href="https://github.com/hairiljohan"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              ctaLinkColumn,
              textPrimary,
              hoverClass(
                canHover,
                "md:hover:text-black md:dark:hover:text-white"
              )
            )}
          >
            <div
              className={cn(
                "p-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-sm transition-all duration-300",
                hoverClass(
                  canHover,
                  "md:group-hover:shadow-md md:group-hover:-translate-y-1"
                )
              )}
            >
              <Github size={32} />
            </div>
            <span
              className={cn(
                "font-medium text-sm opacity-100 transition-opacity translate-y-0",
                hoverClass(
                  canHover,
                  "md:opacity-0 md:group-hover:opacity-100 md:-translate-y-2 md:group-hover:translate-y-0"
                )
              )}
            >
              GitHub
            </span>
          </a>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Contact;
