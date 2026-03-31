import React from "react";
import { PackagePlus } from "lucide-react";
import BackButton from "./BackButton";
import DetailPillRow from "./DetailPillRow";
import { Card } from "./Card";
import {
  headingMd,
  headingXl,
  textSecondary,
  captionBase,
  surfaceBase,
} from "../utils/tw";
import { HOME_SHOWCASE_LINK } from "../utils/navigation";
import {
  pills,
  introParagraph,
  workflowParagraph,
  owuiCaption,
  searxngCaption,
  groupedImages,
  workflowCards,
  defaultWorkflowContainer,
  defaultWorkflowDescription,
} from "../data/containerUpdateHelperData";

const ContainerUpdateHelperPage: React.FC = () => {
  return (
    <div className="bg-cream dark:bg-charcoal text-charcoal dark:text-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <BackButton href={HOME_SHOWCASE_LINK} className="mb-10" />

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
                      className={`${surfaceBase} ${containerClass}`}
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
                  className="p-4 md:p-6 space-y-4 shadow-lg border border-charcoal/10 dark:border-white/10 flex flex-col"
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
                  <figcaption className={captionBase}>
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
