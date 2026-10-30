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

export const META: Record<
  | "home"
  | "launchConsole"
  | "dockSense"
  | "containerUpdateHelper"
  | "theaterView"
  | "netSwitch",
  MetaEntry
> = {
  home: {
    title: "Hairil Johan - Portfolio",
    description:
      "Portfolio of Hairil Johan, Aircraft Systems Engineering undergraduate specialising in SolidWorks, CFD analysis, and MATLAB. Explore projects in homelabbing, self-hosting, and local AI models.",
    url: SITE_URL,
    author: AUTHOR,
    image: SOCIAL_IMAGE,
    imageAlt: SOCIAL_IMAGE_ALT,
    imageWidth: SOCIAL_IMAGE_WIDTH,
    imageHeight: SOCIAL_IMAGE_HEIGHT,
  },
  launchConsole: {
    title: "Launch Console - Hairil Johan",
    description:
      "A playful systems-inspired launch console built after experimenting with local AI models. Interactive prototype with system states and effects.",
    url: `${SITE_URL}/launch-console.html`,
    author: AUTHOR,
    image: SOCIAL_IMAGE,
    imageAlt: SOCIAL_IMAGE_ALT,
    imageWidth: SOCIAL_IMAGE_WIDTH,
    imageHeight: SOCIAL_IMAGE_HEIGHT,
  },
  dockSense: {
    title: "DockSense - Hairil Johan",
    description:
      "DockSense is a personal macOS menu bar app that detects a docking station over USB, adjusts Dock and menu-bar visibility, and remembers keyboard backlight brightness.",
    url: `${SITE_URL}/docksense.html`,
    author: AUTHOR,
    image: SOCIAL_IMAGE,
    imageAlt: SOCIAL_IMAGE_ALT,
    imageWidth: SOCIAL_IMAGE_WIDTH,
    imageHeight: SOCIAL_IMAGE_HEIGHT,
  },
  containerUpdateHelper: {
    title: "Container Update Helper - Hairil Johan",
    description:
      "A macOS utility that simplifies Docker container updates into guided steps—stop, remove, pull, and run—without retyping commands.",
    url: `${SITE_URL}/container-update-helper.html`,
    author: AUTHOR,
    image: SOCIAL_IMAGE,
    imageAlt: SOCIAL_IMAGE_ALT,
    imageWidth: SOCIAL_IMAGE_WIDTH,
    imageHeight: SOCIAL_IMAGE_HEIGHT,
  },
  theaterView: {
    title: "TheaterView - Hairil Johan",
    description:
      "TheaterView automates YouTube theater mode, highest non-Premium quality, and the Public filter on channel Videos tabs.",
    url: `${SITE_URL}/theaterview.html`,
    author: AUTHOR,
    image: SOCIAL_IMAGE,
    imageAlt: SOCIAL_IMAGE_ALT,
    imageWidth: SOCIAL_IMAGE_WIDTH,
    imageHeight: SOCIAL_IMAGE_HEIGHT,
  },
  netSwitch: {
    title: "NetSwitch - Hairil Johan",
    description:
      "NetSwitch is a personal macOS menu bar app that switches DNS profiles between networks, with optional Tailscale automation and app-based overrides.",
    url: `${SITE_URL}/netswitch.html`,
    author: AUTHOR,
    image: SOCIAL_IMAGE,
    imageAlt: SOCIAL_IMAGE_ALT,
    imageWidth: SOCIAL_IMAGE_WIDTH,
    imageHeight: SOCIAL_IMAGE_HEIGHT,
  },
};
