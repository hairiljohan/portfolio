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
const FALLBACK_SITE_URL = "https://hairiljohan.com";

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
  | "networkChecker"
  | "containerUpdateHelper"
  | "uninstallCleanup"
  | "privateLocalAI",
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
  networkChecker: {
    title: "Network Checker - Hairil Johan",
    description:
      "A macOS utility to check network link speeds instantly using shell script and Automator. Detects if Mac is on gigabit Ethernet or Wi‑Fi without running a speedtest.",
    url: `${SITE_URL}/network-checker.html`,
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
  uninstallCleanup: {
    title: "Uninstall Cleanup Tool - Hairil Johan",
    description:
      "A macOS helper that wraps deep system searches to tidy leftover files after uninstalling apps, keeping the system clean.",
    url: `${SITE_URL}/uninstall-cleanup.html`,
    author: AUTHOR,
    image: SOCIAL_IMAGE,
    imageAlt: SOCIAL_IMAGE_ALT,
    imageWidth: SOCIAL_IMAGE_WIDTH,
    imageHeight: SOCIAL_IMAGE_HEIGHT,
  },
  privateLocalAI: {
    title: "Private Local AI with Custom Domains - Hairil Johan",
    description:
      "Caddy, Pi-hole, and Tailscale combine to give my local AI services clean .home domains and private access from any device on my tailnet.",
    url: `${SITE_URL}/private-local-ai.html`,
    author: AUTHOR,
    image: SOCIAL_IMAGE,
    imageAlt: SOCIAL_IMAGE_ALT,
    imageWidth: SOCIAL_IMAGE_WIDTH,
    imageHeight: SOCIAL_IMAGE_HEIGHT,
  },
};
