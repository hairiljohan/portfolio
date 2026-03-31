import React from "react";
import { GlobeLock } from "lucide-react";
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
  whatList,
  whyList,
  buildingBlocks,
  media,
} from "../data/privateLocalAIData";

const PrivateLocalAIPage: React.FC = () => {
  const surfaceWithShadow = `${surfaceBase} shadow-lg`;

  return (
    <div className="bg-cream dark:bg-charcoal text-charcoal dark:text-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <BackButton href={HOME_SHOWCASE_LINK} className="mb-10" />

        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <DetailPillRow pills={pills} />
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center mt-1">
                  <GlobeLock size={24} />
                </div>
                <div className="space-y-2">
                  <h1 className={`${headingXl} leading-tight`}>
                    Private Local AI with Custom Domains
                  </h1>
                  <p
                    className={`${textSecondary} text-lg md:text-xl leading-relaxed max-w-3xl`}
                  >
                    I wanted my local AI stack to feel like a real app, not a
                    localhost secret. Caddy, Pi‑hole, and Tailscale now give
                    every service a clean domain, private routing, and a stable
                    URL from any device I own.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <figure className="max-w-5xl w-full mx-auto rounded-[28px] overflow-hidden border border-charcoal/10 dark:border-white/10 bg-white dark:bg-white/5 shadow-xl">
            <div className="bg-cream-dark/60 dark:bg-charcoal/60 w-full flex items-center justify-center p-2 md:p-3">
              <img
                src={media.desktop.src}
                alt={media.desktop.alt}
                className="w-full h-auto max-h-[720px] object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption className="p-5 md:p-6 text-base text-charcoal/70 dark:text-cream/70 bg-cream-dark/50 dark:bg-charcoal/60 leading-relaxed">
              {media.desktop.caption}
            </figcaption>
          </figure>

          <div className="space-y-8 md:space-y-10">
            <section className="space-y-3">
              <h2 className={headingMd}>What you are seeing</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-charcoal/80 dark:text-cream/80">
                {whatList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className={headingMd}>Why this matters</h2>
              <ul className="list-disc pl-5 space-y-2 text-base text-charcoal dark:text-cream">
                {whyList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className={headingMd}>Building blocks</h2>
              <div className="flex flex-col md:flex-row-reverse items-start gap-8 md:gap-10">
                <aside className="w-full md:w-auto">
                  <Card
                    as="figure"
                    className={`${surfaceWithShadow} flex flex-col max-w-sm w-full`}
                  >
                    <div className="bg-cream-dark/60 dark:bg-charcoal/60 flex items-center justify-center px-3 py-4">
                      <img
                        src={media.mobile.src}
                        alt={media.mobile.alt}
                        className="w-full h-auto max-h-[580px] md:max-h-[500px] object-contain rounded-2xl"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className={captionBase}>
                      {media.mobile.caption}
                    </figcaption>
                  </Card>
                </aside>

                <div className="flex-1">
                  <div className="flex flex-col gap-4 w-full max-w-5xl">
                    {buildingBlocks.map((card) => {
                      const Icon = card.icon;
                      return (
                        <Card
                          key={card.title}
                          className={`${surfaceWithShadow} p-6 md:p-7 flex items-start gap-4 w-full`}
                        >
                          <div className={card.iconClass}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {card.title}
                            </h3>
                            <p className="text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed">
                              {card.description}
                            </p>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>

          <section className="space-y-4">
            <h2 className={headingMd}>Routing and DNS snapshots</h2>
            <p className={`${textSecondary} text-base max-w-3xl`}>
              Admin views from the stack that make the friendly domains work —
              the proxy rules in Caddy and the DNS entries living in Pi‑hole.
            </p>
            <div className="space-y-8 md:space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {[media.caddyfile, media.pihole].map((item) => (
                  <Card
                    key={item.alt}
                    as="figure"
                    className={`${surfaceWithShadow} flex flex-col`}
                  >
                    <div className="relative w-full bg-cream-dark/60 dark:bg-charcoal/60 aspect-[4/3] max-h-[520px] overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="absolute inset-0 w-full h-full object-contain p-4"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption className={captionBase}>
                      {item.caption}
                    </figcaption>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className={headingMd}>Caddy Control</h3>
                <Card
                  as="figure"
                  className={`${surfaceWithShadow} flex flex-col max-w-xl mx-auto`}
                >
                  <div className="bg-cream-dark/60 dark:bg-charcoal/60 flex items-center justify-center p-3">
                    <img
                      src={media.caddyControl.src}
                      alt={media.caddyControl.alt}
                      className="w-full h-auto max-h-[240px] md:max-h-[260px] object-contain rounded-2xl"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className={captionBase}>
                    {media.caddyControl.caption}
                  </figcaption>
                </Card>
                <h4 className="font-serif font-semibold text-2xl text-charcoal dark:text-cream">
                  Why I built this
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-base text-charcoal dark:text-cream max-w-3xl leading-relaxed">
                  <li>
                    Shell-scripted macOS helper replaces the usual
                    start/stop/status commands for Caddy.
                  </li>
                  <li>
                    One-click launch/quit and a quick status check mean no
                    Terminal needed to manage the reverse proxy.
                  </li>
                  <li>
                    Feels like a normal desktop tool now—fast, visible, and easy
                    to remember.
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivateLocalAIPage;
