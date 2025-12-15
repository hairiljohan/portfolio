import React from "react";
import type { LucideIcon } from "lucide-react";
import { ClipboardList, PackagePlus, RefreshCw, Sparkles } from "lucide-react";
import BackButton from "./BackButton";
import DetailPillRow from "./DetailPillRow";
import { Card } from "./Card";
import { headingMd, headingXl, textSecondary } from "../utils/tw";
import { HOME_SHOWCASE_LINK } from "../utils/navigation";

const ContainerUpdateHelperPage: React.FC = () => {
  const showcaseLink = HOME_SHOWCASE_LINK;
  const introParagraph =
    "I built this small utility after I started working with Docker containers. Updating a container normally means running several terminal commands: stop the container, remove it, pull the new image, and run it again. Doing this by hand becomes repetitive when you update containers often.";

  const workflowParagraph =
    "I used Script Editor on macOS to build a simple tool that turns each step into a one-button action. Each button runs a complete part of the update process—stop, remove, pull, and run—without needing to type commands or remember flags. It makes my update workflow faster and reduces mistakes when I am updating my containers.";

  const owuiCaption =
    "Snapshots from the OpenWebUI update flow. The helper walks through stop, remove, pull, and run so I can refresh that container with a couple of clicks instead of a long command chain.";

  const searxngCaption =
    "Snapshots from the SearXNG update flow. I use the same buttons to cycle the container, but I can pause between steps to confirm the new image starts cleanly before moving on.";

  const galleryImages = [
    {
      file: "owui update.webp",
      alt: "Update helper showing Owui pull and restart flow",
    },
    { file: "owui.webp", alt: "Owui container ready state inside the helper" },
    { file: "searxng update.webp", alt: "SearXNG container update snapshot" },
    { file: "searxng.webp", alt: "SearXNG status card post-update" },
  ].map((image) => ({
    ...image,
    src: `/updater/${encodeURIComponent(image.file)}`,
  }));

  const groupedImages = [
    {
      id: "owui",
      images: galleryImages.slice(0, 2),
    },
    {
      id: "searxng",
      images: galleryImages.slice(2, 4),
    },
  ];

  const captionClass =
    "p-4 text-sm text-charcoal/60 dark:text-cream/70 bg-cream-dark/50 dark:bg-charcoal/60 leading-relaxed";
  const galleryCardClass =
    "p-4 md:p-6 space-y-4 shadow-lg border border-charcoal/10 dark:border-white/10";
  const pills = [
    { label: "Homelab" },
    { label: "Containers", variant: "accent" as const },
    { label: "Update helper" },
  ];
  const surfaceClass =
    "border border-charcoal/10 dark:border-white/10 bg-white dark:bg-white/5";
  const defaultWorkflowContainer = "p-5";
  const defaultWorkflowDescription =
    "text-sm md:text-base text-charcoal/70 dark:text-cream/70";
  type WorkflowCard = {
    icon: LucideIcon;
    iconClass: string;
    title: string;
    description: string[];
    containerClass?: string;
    descriptionClass?: string;
    label?: string;
    stackedHeader?: boolean;
    descriptionInHeader?: boolean;
    headerWrapperClass?: string;
  };
  const workflowCards: WorkflowCard[] = [
    {
      icon: RefreshCw,
      iconClass:
        "w-10 h-10 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center",
      title: "Rolling updates",
      description: [
        "I still run updates container-by-container, but each phase now lives behind a button. I can stop and remove the old container, pull the latest image, and start it again without retyping the full command chain.",
      ],
      descriptionInHeader: true,
    },
    {
      icon: ClipboardList,
      iconClass:
        "w-10 h-10 rounded-full bg-charcoal/5 dark:bg-white/10 flex items-center justify-center",
      title: "Checks",
      description: [
        "Having the steps broken into separate buttons makes it easy to pause between actions, double-check container state, and confirm that the new image starts cleanly before I move on.",
      ],
      descriptionInHeader: true,
    },
    {
      icon: Sparkles,
      iconClass:
        "w-10 h-10 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center",
      title: "Work in progress",
      label: "Status",
      description: [
        "Right now this helper focuses on a handful of containers I update most often, wrapping the usual Docker commands in simple Script Editor actions.",
        "I plan to keep refining it as my homelab grows—adding better prompts, safety checks, and small quality-of-life improvements so updates stays stable.",
      ],
      containerClass: "p-6 space-y-4 min-h-[320px]",
      descriptionClass:
        "text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed",
      stackedHeader: false,
      descriptionInHeader: false,
      headerWrapperClass: "flex items-center gap-3",
    },
  ];

  return (
    <div className="bg-cream dark:bg-charcoal text-charcoal dark:text-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <BackButton href={showcaseLink} className="mb-10" />

        <div className="space-y-8 md:space-y-10">
          <div className="space-y-4">
            <DetailPillRow pills={pills} />
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center mt-1">
                <PackagePlus size={24} />
              </div>
              <div className="space-y-3">
                <h1 className={`${headingXl} leading-tight`}>
                  Container Update Helper
                </h1>
                <p
                  className={`${textSecondary} text-lg md:text-xl leading-relaxed max-w-3xl`}
                >
                  A tiny macOS helper that turns my usual Docker update sequence
                  into a row of buttons, so I can update containers without
                  retyping the same commands.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-8">
            <section className="space-y-3">
              <h2 className={headingMd}>What this is</h2>
              <p className="text-base md:text-lg text-charcoal/80 dark:text-cream/80 leading-relaxed">
                {introParagraph}
              </p>
              <p className="text-base md:text-lg text-charcoal/80 dark:text-cream/80 leading-relaxed">
                {workflowParagraph}
              </p>
            </section>

            <section className="space-y-4">
              <h2 className={headingMd}>Workflow notes</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {workflowCards.map((card) => {
                  const Icon = card.icon;
                  const containerClass =
                    card.containerClass ?? defaultWorkflowContainer;
                  const descriptionClass =
                    card.descriptionClass ?? defaultWorkflowDescription;
                  const headerClass =
                    card.stackedHeader === false ? undefined : "space-y-1";
                  const headerWrapperClass = card.headerWrapperClass;
                  const headerContent = (
                    <div className={headerClass}>
                      {card.label ? (
                        <>
                          <p className="text-xs uppercase tracking-widest text-charcoal/50 dark:text-cream/50">
                            {card.label}
                          </p>
                          <p className="font-semibold">{card.title}</p>
                        </>
                      ) : (
                        <h3 className="font-semibold text-lg">{card.title}</h3>
                      )}
                      {card.descriptionInHeader !== false &&
                        card.description.map((copy, idx) => (
                          <p key={idx} className={descriptionClass}>
                            {copy}
                          </p>
                        ))}
                    </div>
                  );
                  return (
                    <Card
                      key={card.title}
                      className={`${surfaceClass} ${containerClass}`}
                    >
                      {headerWrapperClass ? (
                        <div className={headerWrapperClass}>
                          <div className={card.iconClass}>
                            <Icon size={20} />
                          </div>
                          {headerContent}
                        </div>
                      ) : (
                        <div className="flex items-start gap-3">
                          <div className={card.iconClass}>
                            <Icon size={20} />
                          </div>
                          {headerContent}
                        </div>
                      )}
                      {card.descriptionInHeader === false &&
                        card.description.map((copy, idx) => (
                          <p key={idx} className={descriptionClass}>
                            {copy}
                          </p>
                        ))}
                    </Card>
                  );
                })}
              </div>
            </section>
          </div>

          <section className="space-y-4">
            <div>
              <h2 className={headingMd}>Update snapshots</h2>
              <p className={`${textSecondary} text-base max-w-3xl`}>
                Captures from the helper. These screenshots follow the update
                flow from stopping and removing the old container to pulling and
                running the refreshed image.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {groupedImages.map((group) => (
                <Card
                  key={group.id}
                  as="figure"
                  className={`${galleryCardClass} flex flex-col`}
                >
                  <div className="flex flex-col sm:flex-row gap-4">
                    {group.images.map((image) => (
                      <div
                        key={image.file}
                        className="flex-1 bg-cream-dark/50 dark:bg-charcoal/60 flex items-center justify-center p-4 max-h-[220px] md:max-h-[200px] lg:max-h-[180px] rounded-2xl"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-contain"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ))}
                  </div>
                  <figcaption className={captionClass}>
                    {group.id === "owui" ? owuiCaption : searxngCaption}
                  </figcaption>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContainerUpdateHelperPage;
