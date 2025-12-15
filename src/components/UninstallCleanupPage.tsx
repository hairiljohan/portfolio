import React from "react";
import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Sparkles, Timer, Trash2 } from "lucide-react";
import BackButton from "./BackButton";
import DetailPillRow from "./DetailPillRow";
import { Card } from "./Card";
import { headingMd, headingXl, textSecondary } from "../utils/tw";
import { HOME_SHOWCASE_LINK } from "../utils/navigation";

const UninstallCleanupPage: React.FC = () => {
  const showcaseLink = HOME_SHOWCASE_LINK;
  const gifSrc = "/cleaner/public.gif";
  const gifCardClass =
    "rounded-[32px] overflow-hidden border border-charcoal/10 dark:border-white/10 bg-white dark:bg-white/5 shadow-2xl";
  const pills = [
    { label: "Utility" },
    { label: "Cleanup", variant: "accent" as const },
    { label: "Terminal helper" },
  ];
  const surfaceClass =
    "border border-charcoal/10 dark:border-white/10 bg-white dark:bg-white/5";
  const handleDescriptionClass = "text-sm text-charcoal/70 dark:text-cream/70";
  type InfoCard = {
    icon: LucideIcon;
    iconClass: string;
    title: string;
    description: string | string[];
    label?: string;
    descriptionClass?: string;
  };
  const handleCards: InfoCard[] = [
    {
      icon: Trash2,
      iconClass:
        "w-10 h-10 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center",
      title: "Leftover files",
      description:
        "Searches for files and folders whose names still contain the app name long after it has been dragged to the trash.",
    },
    {
      icon: ShieldCheck,
      iconClass:
        "w-10 h-10 rounded-full bg-charcoal/5 dark:bg-white/10 flex items-center justify-center",
      title: "Safe checks",
      description:
        "Keeps the human in the loop: results are meant to be reviewed with ChatGPT or manually before anything is deleted.",
    },
    {
      icon: Sparkles,
      iconClass:
        "w-10 h-10 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center",
      title: "Finishing pass",
      description:
        "Helps me leave fewer traces behind so that repeated installs and uninstalls do not slowly clutter the system.",
    },
  ];
  const footerCards: InfoCard[] = [
    {
      icon: Trash2,
      iconClass:
        "w-10 h-10 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center",
      label: "Stack",
      title: "macOS Script Editor · shell · ChatGPT",
      description:
        "Script Editor gives me a small native prompt, the shell does the heavy lifting with a single reusable command.",
      descriptionClass:
        "text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed",
    },
    {
      icon: ShieldCheck,
      iconClass:
        "w-10 h-10 rounded-full bg-charcoal/5 dark:bg-white/10 flex items-center justify-center",
      label: "Status",
      title: "Personal utility",
      description:
        "This is a personal tool I use on my own Mac when I am uninstalling apps. It is not polished for public release, but it already makes cleanup feel calmer and more deliberate.",
      descriptionClass:
        "text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed",
    },
  ];

  return (
    <div className="bg-cream dark:bg-charcoal text-charcoal dark:text-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <BackButton href={showcaseLink} className="mb-10" />

        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <DetailPillRow pills={pills} />
            <h1 className={`${headingXl} leading-tight`}>
              Uninstall Cleanup Tool
            </h1>
            <p
              className={`${textSecondary} text-lg md:text-xl leading-relaxed max-w-3xl`}
            >
              A small helper I built for macOS to clean up the files, folders,
              and traces that remain after uninstalling an app—especially when
              third‑party cleaners miss things.
            </p>
          </div>

          <figure className={`${gifCardClass} max-w-5xl mx-auto`}>
            <div className="bg-cream-dark/60 dark:bg-charcoal/60 w-full aspect-[16/9] md:aspect-[2/1] flex items-center justify-center">
              <img
                src={gifSrc}
                alt="Uninstall Cleanup Tool terminal search view"
                className="w-full h-full object-contain md:object-cover scale-[1.02] md:scale-[1]"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="p-6 md:p-7 text-base md:text-lg text-charcoal/70 dark:text-cream/70 bg-cream-dark/50 dark:bg-charcoal/60 leading-relaxed">
              The utility wraps a long find command into a simple prompt: I type
              an app name once, the script searches the whole system for related
              files, and I use ChatGPT to review which ones are safe to delete.
            </figcaption>
          </figure>

          <div className="space-y-10 md:space-y-12">
            <section className="space-y-3">
              <h2 className={headingMd}>Why this exists</h2>
              <p className="text-base md:text-lg text-charcoal/80 dark:text-cream/80 leading-relaxed">
                The Mac ecosystem has a lot of third‑party apps for
                productivity, workflows, and tiny utilities—there is even a
                Reddit community (r/macapps) dedicated to sharing and discussing
                them. I like trying new tools, which means I install and remove
                apps often. Dragging an app to the trash looks like a clean
                uninstall, but it leaves behind support files and small traces
                scattered around the system.
              </p>
              <p className="text-base md:text-lg text-charcoal/80 dark:text-cream/80 leading-relaxed">
                Apps like Pearcleaner and AppCleaner helped, yet I still found
                leftover files they missed. I eventually discovered a terminal
                command that can search the entire system for matches to an app
                name, but typing it out by hand every time was slow and
                error‑prone. This tool exists to make that deep search feel like
                filling in a single field instead of running a long command.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={headingMd}>What it handles</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {handleCards.map((card) => {
                  const Icon = card.icon;
                  const descriptions = Array.isArray(card.description)
                    ? card.description
                    : [card.description];
                  return (
                    <Card
                      key={card.title}
                      className={`${surfaceClass} p-5 flex items-start gap-3`}
                    >
                      <div className={card.iconClass}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{card.title}</h3>
                        {descriptions.map((copy, idx) => (
                          <p
                            key={idx}
                            className={
                              card.descriptionClass ?? handleDescriptionClass
                            }
                          >
                            {copy}
                          </p>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className={headingMd}>Workflow snapshot</h2>
              <div className="rounded-2xl border border-charcoal/10 dark:border-white/10 bg-white dark:bg-white/5 p-6 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center">
                    <Timer size={20} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-charcoal/50 dark:text-cream/50">
                      Quick lap
                    </p>
                    <p className="font-semibold">3 simple passes</p>
                  </div>
                </div>
                <ol className="list-decimal pl-5 space-y-3 text-sm md:text-base text-charcoal/80 dark:text-cream/80">
                  <li>
                    Enter an app name once in the Script Editor dialog and let
                    the tool build the full find command.
                  </li>
                  <li>
                    Run the search and collect all paths where that app still
                    shows up across the system.
                  </li>
                  <li>
                    Paste results into ChatGPT (or review manually) to decide
                    which files are safe to delete and which should be kept.
                  </li>
                </ol>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-5xl w-full mx-auto">
              {footerCards.map((card) => {
                const Icon = card.icon;
                const descriptions = Array.isArray(card.description)
                  ? card.description
                  : [card.description];
                return (
                  <Card
                    key={card.title}
                    className={`${surfaceClass} p-6 space-y-4 shadow-lg`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={card.iconClass}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-widest text-charcoal/50 dark:text-cream/50">
                          {card.label}
                        </p>
                        <p className="font-semibold">{card.title}</p>
                      </div>
                    </div>
                    {descriptions.map((copy, idx) => (
                      <p
                        key={idx}
                        className={
                          card.descriptionClass ??
                          "text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed"
                        }
                      >
                        {copy}
                      </p>
                    ))}
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UninstallCleanupPage;
