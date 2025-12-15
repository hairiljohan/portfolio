import React from "react";
import { GlobeLock, Server, Shield, Smartphone } from "lucide-react";
import BackButton from "./BackButton";
import DetailPillRow from "./DetailPillRow";
import { Card } from "./Card";
import { headingMd, headingXl, textSecondary } from "../utils/tw";
import { HOME_SHOWCASE_LINK } from "../utils/navigation";

const PrivateLocalAIPage: React.FC = () => {
  const showcaseLink = HOME_SHOWCASE_LINK;
  const captionClass =
    "p-4 text-sm text-charcoal/60 dark:text-cream/70 bg-cream-dark/50 dark:bg-charcoal/60 leading-relaxed";
  const surfaceClass =
    "border border-charcoal/10 dark:border-white/10 bg-white dark:bg-white/5 shadow-lg";
  const toSrc = (file: string) => `/custom/${encodeURIComponent(file)}`;
  const pills = [
    { label: "Homelab" },
    { label: "Local AI", variant: "accent" as const },
    { label: "Caddy + Tailscale" },
  ];
  const whatList = [
    "Caddy running locally: A lightweight reverse proxy always on, so my apps are reachable by domain instead of port numbers.",
    "Caddyfile routing: Simple rules mapping friendly hostnames to local services (e.g., whydoesthiswork.home → 127.0.0.1), plus other local tools like ComfyUI.",
    "Pi-hole local DNS records: Custom .home domains point to my machine’s Tailscale IP, so names resolve anywhere on my network automatically.",
    "Desktop access: Open WebUI loads through the custom domain just like a hosted site, while still running on my machine.",
    "Mobile access: The same domain works on my phone and iPad via Tailscale, so I can use my local models anywhere.",
  ];
  const whyList = [
    "Better UX for local dev: No more remembering ports or typing localhost. I just go to a domain.",
    "Private by default: Tailscale keeps the AI instance off the public web. Only my devices on the tailnet can reach it.",
    "No router issues: No port‑forwarding or firewall exposure — just encrypted device‑to‑device access.",
    "Feels like a real product: Stable URL, clean routing, and consistent access across desktop and mobile.",
  ];
  const buildingBlocks = [
    {
      icon: Shield,
      iconClass:
        "w-10 h-10 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center",
      title: "Private overlay first",
      description:
        "Tailscale keeps every service behind the tailnet, so the .home domains only exist for devices I trust.",
    },
    {
      icon: Server,
      iconClass:
        "w-10 h-10 rounded-full bg-charcoal/5 dark:bg-white/10 flex items-center justify-center",
      title: "Caddy reverse proxy",
      description:
        "Routes whydoesthiswork.home and other hostnames to local ports, letting me forget about 127.0.0.1:3000 entirely.",
    },
    {
      icon: GlobeLock,
      iconClass:
        "w-10 h-10 rounded-full bg-charcoal/5 dark:bg-white/10 flex items-center justify-center",
      title: "DNS that follows me",
      description:
        "Pi‑hole holds the DNS records for each .home address and points them to my Tailscale IP so they resolve on any device.",
    },
    {
      icon: Smartphone,
      iconClass:
        "w-10 h-10 rounded-full bg-charcoal/5 dark:bg-white/10 flex items-center justify-center",
      title: "No-public deployment",
      description:
        "Caddy, Pi-hole, and Tailscale let me use my local AI models from my mobile devices over a private domain without exposing anything to the public internet.",
    },
  ];
  const media = {
    desktop: {
      src: toSrc("dekstop screenshot.webp"),
      alt: "Open WebUI running through a custom .home domain on desktop",
      caption:
        "Open WebUI loading through my custom domain instead of localhost: the reverse proxy makes it feel like a hosted app even though it is still local.",
    },
    mobile: {
      src: toSrc("mobile screenshot.webp"),
      alt: "Open WebUI reachable via the same .home domain on mobile",
      caption:
        "The same domain resolves on my phone through Tailscale, so I can chat with local models without exposing anything publicly.",
    },
    caddyControl: {
      src: toSrc("cadddy control.webp"),
      alt: "Caddy admin showing local sites and listeners",
      caption:
        "A small macOS Script Editor wrapper I built around a shell script. It lets me launch or stop Caddy with one click and check my reverse‑proxy status without opening Terminal.",
    },
    caddyfile: {
      src: toSrc("caddyfile.webp"),
      alt: "Caddyfile snippet mapping hostnames to local services",
      caption:
        "Simple Caddyfile rules map each hostname to 127.0.0.1 targets, keeping the routing readable and easy to tweak.",
    },
    pihole: {
      src: toSrc("pihole.webp"),
      alt: "Pi-hole local DNS records pointing to Tailscale IP",
      caption:
        "Pi‑hole carries the local DNS records so whydoesthiswork.home and the rest resolve to my Tailscale IP from any device.",
    },
  };

  return (
    <div className="bg-cream dark:bg-charcoal text-charcoal dark:text-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <BackButton href={showcaseLink} className="mb-10" />

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
                    className={`${surfaceClass} flex flex-col max-w-sm w-full`}
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
                    <figcaption className={captionClass}>
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
                          className={`${surfaceClass} p-6 md:p-7 flex items-start gap-4 w-full`}
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
                    className={`${surfaceClass} flex flex-col`}
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
                    <figcaption className={captionClass}>
                      {item.caption}
                    </figcaption>
                  </Card>
                ))}
              </div>

              <div className="space-y-4">
                <h3 className={headingMd}>Caddy Control</h3>
                <Card
                  as="figure"
                  className={`${surfaceClass} flex flex-col max-w-xl mx-auto`}
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
                  <figcaption className={captionClass}>
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
