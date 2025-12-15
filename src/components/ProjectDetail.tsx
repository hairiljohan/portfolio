import React from "react";
import BackButton from "./BackButton";
import { useCanHover } from "../hooks/useCanHover";
import { cn, hoverClass } from "../utils/classNames";

interface ProjectDetailProps {
  onBack: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ onBack }) => {
  const embedSrc = "/legacy/landingpage/index.html";
  const canHover = useCanHover();

  const scrollToEmbed = () => {
    const target = document.getElementById("launch-console-embed");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  const openFullPage = () => {
    window.open(embedSrc, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-cream dark:bg-charcoal min-h-screen text-charcoal dark:text-cream animate-in fade-in duration-500">
      <div className="max-w-[2000px] mx-auto px-6 md:px-16 py-10">
        {/* Header */}
        <div className="mb-12">
          <BackButton onClick={onBack} className="mb-8" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-sm font-medium tracking-widest uppercase text-charcoal/40 dark:text-cream/40 mb-2 block">
                SHOWCASE · LIVE EMBED
              </span>
              <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                Launch Console
              </h1>
              <p className="text-lg md:text-xl text-charcoal/60 dark:text-cream/60 max-w-6xl leading-relaxed">
                A playful “why does this work?” console built after I started
                running local AI models. It recreates the odd feeling of
                watching a model behave like a system with a mind of its own. No
                real logs. Just the vibe of me pretending to monitor a sentient
                process. Best viewed on desktop.
              </p>
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            <span className="px-4 py-2 bg-accent-orange/10 text-accent-orange rounded-full text-sm font-medium">
              Prototype
            </span>
            <span className="px-4 py-2 bg-charcoal/5 dark:bg-white/10 text-charcoal/80 dark:text-cream/80 rounded-full text-sm font-medium">
              Console UI
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid gap-8 lg:gap-12 xl:gap-16 pb-20 lg:grid-cols-[1.9fr_1fr] xl:grid-cols-[2fr_1fr] items-stretch">
          {/* Main Content (Embed) */}
          <div id="launch-console-embed" className="h-full">
            <div className="bg-charcoal rounded-2xl p-2 shadow-2xl overflow-hidden border border-charcoal/10 dark:border-white/10">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5 rounded-t-xl mb-1">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
              </div>
              <div className="bg-black w-full h-[760px] md:h-[880px] xl:h-[960px] rounded-b-lg overflow-hidden relative">
                <iframe
                  src={embedSrc}
                  title="Launch Console Embed"
                  className="w-full h-full border-0"
                  sandbox="allow-scripts allow-same-origin"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="h-full">
            <div className="bg-white dark:bg-white/5 p-8 md:p-10 rounded-3xl border border-charcoal/5 dark:border-white/5 h-full flex flex-col">
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="font-serif font-bold text-xl mb-3">
                    Write-up
                  </h3>
                  <p className="text-charcoal/70 dark:text-cream/70 leading-relaxed text-sm">
                    This page shows the console from my landingpage that I built
                    after I started tinkering with Local AI models. All system
                    states, warnings, and logs come from my early attempts at
                    running local AI models. Things worked, but I did not know
                    why. That idea shaped the “why does this work” theme across
                    the site. The console uses fake data. The buttons trigger
                    small effects. The goal was to make something simple, fun,
                    and slightly chaotic.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl mb-3">Goal</h3>
                  <p className="text-charcoal/70 dark:text-cream/70 leading-relaxed text-sm">
                    Test how much I could build with the help of AI tools like
                    ChatGPT. Keep the project simple and focused so I could
                    learn the basics of UI structure, state changes, and small
                    interactions.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl mb-3">Stack</h3>
                  <p className="text-charcoal/70 dark:text-cream/70 leading-relaxed text-sm">
                    Vanilla HTML/CSS/JS for the console, wrapped by a Vite +
                    Tailwind shell for this write-up view.
                  </p>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl mb-3">Role</h3>
                  <ul className="text-charcoal/70 dark:text-cream/70 leading-relaxed text-sm list-disc pl-4 space-y-2">
                    <li>Designed and wrote the console UI.</li>
                    <li>
                      Created the fake system states, logs, and error messages.
                    </li>
                    <li>
                      Built the button triggers (dance, panic, nuke) and their
                      effects.
                    </li>
                    <li>
                      Added tone, timing, and interactions to make the console
                      feel alive.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-xl mb-3">
                    Interactions
                  </h3>
                  <ul className="text-charcoal/70 dark:text-cream/70 leading-relaxed text-sm list-disc pl-4 space-y-2">
                    <li>
                      Buttons switch between system states and trigger effects.
                    </li>
                    <li>Dance shows emoji art and plays audio.</li>
                    <li>Panic runs a short panic routine.</li>
                    <li>Nuke simulates a full meltdown.</li>
                    <li className="italic text-charcoal/50 dark:text-cream/50">
                      Hint: If it asks you for a launch code, it is in the name
                      of the site.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-charcoal/10 dark:border-white/10 flex gap-4">
                <button
                  onClick={scrollToEmbed}
                  className={cn(
                    "flex-1 bg-cream-dark/50 dark:bg-white/10 text-charcoal dark:text-cream font-medium py-3 rounded-lg text-sm transition-colors text-center",
                    hoverClass(
                      canHover,
                      "md:hover:bg-cream-dark md:dark:hover:bg-white/20"
                    )
                  )}
                >
                  Jump to embed
                </button>
                <button
                  onClick={openFullPage}
                  className={cn(
                    "flex-1 bg-cream-dark/50 dark:bg-white/10 text-charcoal dark:text-cream font-medium py-3 rounded-lg text-sm transition-colors text-center",
                    hoverClass(
                      canHover,
                      "md:hover:bg-cream-dark md:dark:hover:bg-white/20"
                    )
                  )}
                >
                  Open full page
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
