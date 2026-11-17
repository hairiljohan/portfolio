export type MetaEntry = {
  title: string;
  description: string;
  url: string;
  author?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: string;
  imageHeight?: string;
};

const AUTHOR = "Hairil Johan";
const FALLBACK_SITE_URL = "https://hairiljohan.me";

// Prefer a configured site URL, fall back to Vercel's preview hostname, then the production domain.
const rawSiteUrl =
  import.meta.env.VITE_SITE_URL ||
  (import.meta.env as Record<string, string | undefined>).VERCEL_URL;

const SITE_URL = (() => {
  if (!rawSiteUrl) return FALLBACK_SITE_URL;
  const withProtocol = rawSiteUrl.startsWith("http")
    ? rawSiteUrl
    : `https://${rawSiteUrl}`;
  return withProtocol.replace(/\/+$/, "");
})();

const SOCIAL_IMAGE = `${SITE_URL}/social-card.png`;
const SOCIAL_IMAGE_ALT =
  "Preview of Hairil Johan's portfolio showcasing projects and specialties";
const SOCIAL_IMAGE_WIDTH = "1200";
const SOCIAL_IMAGE_HEIGHT = "630";

const SHARED_META = {
  author: AUTHOR,
  image: SOCIAL_IMAGE,
  imageAlt: SOCIAL_IMAGE_ALT,
  imageWidth: SOCIAL_IMAGE_WIDTH,
  imageHeight: SOCIAL_IMAGE_HEIGHT,
};

export const META: Record<
  | "home"
  | "launchConsole"
  | "dockSense"
  | "tabula"
  | "logit"
  | "repoWatch"
  | "theaterView"
  | "netSwitch",
  MetaEntry
> = {
  home: {
    title: "Hairil Johan - Portfolio",
    description:
      "Portfolio of Hairil Johan, Aircraft Systems Engineering undergraduate specialising in SolidWorks, CFD analysis, and MATLAB. Explore projects in homelabbing, self-hosting, and local AI models.",
    url: SITE_URL,
    ...SHARED_META,
  },
  launchConsole: {
    title: "Launch Console - Hairil Johan",
    description:
      "A playful systems-inspired launch console built after experimenting with local AI models. Interactive prototype with system states and effects.",
    url: `${SITE_URL}/launch-console.html`,
    ...SHARED_META,
  },
  dockSense: {
    title: "DockSense - Hairil Johan",
    description:
      "DockSense is a personal macOS menu bar app that detects a docking station over USB, adjusts Dock and menu-bar visibility, and remembers keyboard backlight brightness.",
    url: `${SITE_URL}/docksense.html`,
    ...SHARED_META,
  },
  tabula: {
    title: "Tabula - Hairil Johan",
    description:
      "Tabula is a personal start page for favourite sites. Built to make them easy to reach and pleasant to look at.",
    url: `${SITE_URL}/tabula.html`,
    ...SHARED_META,
  },
  repoWatch: {
    title: "RepoWatch - Hairil Johan",
    description: "RepoWatch is a personal macOS dashboard that brings GitHub repositories, latest releases, commits, and refresh status into one central view.",
    url: `${SITE_URL}/repowatch.html`,
    ...SHARED_META,
  },
  logit: {
    title: "LogIt - Hairil Johan",
    description:
      "LogIt is a personal macOS utility for viewing login items, quitting or launching their apps together, and cleaning up explicitly blacklisted startup entries.",
    url: `${SITE_URL}/logit.html`,
    ...SHARED_META,
  },
  theaterView: {
    title: "TheaterView - Hairil Johan",
    description:
      "TheaterView automates YouTube theater mode, highest non-Premium quality, and the Public filter on channel Videos tabs.",
    url: `${SITE_URL}/theaterview.html`,
    ...SHARED_META,
  },
  netSwitch: {
    title: "NetSwitch - Hairil Johan",
    description:
      "NetSwitch is a personal macOS menu bar app that switches DNS profiles between networks, with optional Tailscale automation and app-based overrides.",
    url: `${SITE_URL}/netswitch.html`,
    ...SHARED_META,
  },
};
