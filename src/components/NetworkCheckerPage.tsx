import React from "react";
import type { LucideIcon } from "lucide-react";
import { Activity, Radio, Shield, Wifi } from "lucide-react";
import BackButton from "./BackButton";
import DetailPillRow from "./DetailPillRow";
import { Card } from "./Card";
import { headingMd, headingXl, textSecondary } from "../utils/tw";
import { HOME_SHOWCASE_LINK } from "../utils/navigation";

const NetworkCheckerPage: React.FC = () => {
  const showcaseLink = HOME_SHOWCASE_LINK;
  const screenshotSrc = "/assets/network-checker/gbe.webp";
  const iconSrc = "/assets/network-checker/icon.webp";
  const wifiSrc = "/assets/network-checker/wifi.webp";
  const captionClass =
    "p-4 text-sm text-charcoal/60 dark:text-cream/70 bg-cream-dark/50 dark:bg-charcoal/60 leading-relaxed";
  const pills = [
    { label: "Mac utility" },
    { label: "Link speed checker", variant: "accent" as const },
    { label: "Shell script + Automator" },
  ];
  type HighlightItem = {
    icon: LucideIcon;
    iconClass: string;
    title: string;
    description: string;
  };
  const highlights: HighlightItem[] = [
    {
      icon: Activity,
      iconClass:
        "w-10 h-10 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center",
      title: "Shell script core",
      description:
        "A bash script reads the current network interface and link speed, then maps it to simple labels like 10 Mbps, 100 Mbps, 1 Gbps, and Wi‑Fi.",
    },
    {
      icon: Shield,
      iconClass:
        "w-10 h-10 rounded-full bg-charcoal/5 dark:bg-white/10 flex items-center justify-center",
      title: "Dock vs Wi‑Fi sanity check",
      description:
        "It helps me confirm if my Mac is actually using the wired Ethernet from the dock or if it silently fell back to Wi‑Fi.",
    },
    {
      icon: Radio,
      iconClass:
        "w-10 h-10 rounded-full bg-charcoal/5 dark:bg-white/10 flex items-center justify-center",
      title: "Future‑proof speeds",
      description:
        "I extended it to include 2.5G, 5G, and 10G Ethernet so it is ready if I upgrade my network later.",
    },
  ];

  return (
    <div className="bg-cream dark:bg-charcoal text-charcoal dark:text-cream min-h-screen">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <BackButton href={showcaseLink} className="mb-10" />

        <div className="space-y-6 md:space-y-8">
          <div className="space-y-4">
            <DetailPillRow pills={pills} />
            <h1 className={`${headingXl} leading-tight`}>Network Checker</h1>
            <p
              className={`${textSecondary} text-lg md:text-xl leading-relaxed max-w-3xl`}
            >
              A small macOS utility I built with a shell script and Automator to
              tell me instantly—whether my docked Mac is on 10 Mbps, 100 Mbps,
              gigabit, or Wi‑Fi, without having to run a full speedtest every
              time.
            </p>
          </div>

          <div className="grid md:grid-cols-[1.7fr_1.3fr] gap-8 md:gap-12 items-start">
            <article className="space-y-8">
              <section className="space-y-3">
                <h2 className={headingMd}>What this is</h2>
                <p className="text-base md:text-lg text-charcoal/80 dark:text-cream/80 leading-relaxed">
                  I use a MacBook with a dock, and sometimes the connection
                  quietly drops or negotiates to a slower speed. I used to open
                  a browser and run a speedtest just to see if I was getting a
                  full gigabit over Ethernet. That got old quickly, so I wrote a
                  small script and wrapped it in an Automator app. Now I can
                  click one icon and immediately see what link speed my Mac is
                  actually using.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className={headingMd}>What I am tracking</h2>
                <ul className="list-disc pl-5 space-y-2 text-base text-charcoal/80 dark:text-cream/80">
                  <li>
                    Whether my Mac is on wired Ethernet or Wi‑Fi when docked.
                  </li>
                  <li>
                    If the link speed quietly dropped from gigabit to 100 Mbps
                    or 10 Mbps.
                  </li>
                  <li>
                    How often I need to troubleshoot the dock or cables instead
                    of blaming the ISP.
                  </li>
                  <li>
                    That higher speeds (2.5G, 5G, 10G) are detected correctly
                    when I eventually upgrade.
                  </li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className={headingMd}>How it works</h2>
                <Card className="border border-charcoal/10 dark:border-white/10 p-6 flex flex-col gap-6 md:gap-7 md:justify-between md:min-h-[388px] shadow-sm">
                  {highlights.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3">
                        <div className={item.iconClass}>
                          <Icon size={20} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {item.title}
                          </h3>
                          <p className="text-sm text-charcoal/70 dark:text-cream/70">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </Card>
              </section>
            </article>

            <aside className="space-y-6 self-end">
              <Card
                as="figure"
                className="flex flex-col min-h-[440px] border border-charcoal/10 dark:border-white/10 shadow-lg"
              >
                <div className="bg-gradient-to-b from-[#d6d7da] via-[#ccced2] to-[#c2c4c9] flex-1 flex flex-col items-center justify-center gap-0 p-2">
                  <img
                    src={screenshotSrc}
                    alt="Network Checker dialog showing interface and 1 Gbps link speed"
                    className="w-full h-auto object-contain scale-[1.12]"
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src={wifiSrc}
                    alt="Network Checker dialog showing Wi‑Fi interface"
                    className="w-full h-auto object-contain scale-[1.12]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption className={captionClass}>
                  <p className="font-semibold">
                    Top: Example output from the utility when my docked Mac is
                    using Thunderbolt Ethernet at a full 1 Gbps.
                  </p>
                  <p>
                    Bottom: What I see when the Mac has fallen back to Wi‑Fi
                    instead of the wired dock connection.
                  </p>
                </figcaption>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch max-w-4xl w-full">
                <Card
                  as="figure"
                  className="flex flex-col border border-charcoal/10 dark:border-white/10 shadow-lg"
                >
                  <div className="flex-1 bg-cream-dark/60 dark:bg-charcoal/60 flex items-center justify-center">
                    <img
                      src={iconSrc}
                      alt="Network Checker icon badge"
                      className="w-full h-full object-contain p-6"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className={captionClass}>
                    I generated this icon with ChatGPT, exported it as a PNG,
                    converted it to an ICNS file, and use it as the custom app
                    icon for the Network Checker utility.
                  </figcaption>
                </Card>
                <Card className="p-6 space-y-4 border border-charcoal/10 dark:border-white/10 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent-orange/10 text-accent-orange flex items-center justify-center">
                      <Wifi size={20} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-charcoal/50 dark:text-cream/50">
                        Stack
                      </p>
                      <p className="font-semibold">
                        Shell script + Automator on macOS
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed">
                    A small bash script does the detection, and Automator wraps
                    it as a clickable app. I can trigger it from the dock or
                    Spotlight and read the result almost instantly.
                  </p>
                </Card>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkCheckerPage;
