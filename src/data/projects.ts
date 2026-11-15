import type { Project } from "../types";
export const PROJECTS: Project[] = [
  {
    id: "launch-console",
    title: "Launch Console",
    category: "Prototype",
    link: "/launch-console.html",
    description:
      "A playful console inspired by my first experiments with local AI. Fake system logs, real curiosity, and a few unexpected interactions.",
    tags: ["HTML", "CSS", "JavaScript"],
    image: {
      src: "/projects/launch-console.webp",
      alt: "Launch Console with system monitors, a terminal and command controls",
      width: 1440,
      height: 900,
    },
  },
  {
    id: "netswitch",
    cover: {
      src: "/projects/netswitch/cover-pixel.webp",
      alt: "Pixel-art Mac connected to a Raspberry Pi at home for DNS ad blocking",
      width: 1448,
      height: 1086,
    },
    title: "NetSwitch",
    category: "macOS app",
    link: "/netswitch.html",
    description:
      "Home DNS at home. Public DNS on the go. A menu bar app that follows my Mac between networks, with optional Tailscale automation.",
    tags: ["Swift", "macOS", "DNS", "Tailscale"],
    image: {
      src: "/projects/netswitch/dns-profiles.webp",
      dark: { src: "/projects/netswitch/dns-profiles-dark.webp", width: 3004, height: 1856 },
      alt: "NetSwitch DNS Profiles settings with Home DNS, Public DNS, and an app whitelist",
      width: 3004,
      height: 1856,
    },
  },
  {
    id: "docksense",
    cover: {
      src: "/projects/docksense/cover-pixel.webp",
      alt: "Pixel-art MacBook connected to a CalDigit TS4 docking station",
      width: 1448,
      height: 1086,
    },
    title: "DockSense",
    category: "macOS app",
    link: "/docksense.html",
    description:
      "Undock: hide the macOS Dock and light up the keyboard. Reconnect: reverse it. A personal menu bar app that automates my desk-to-laptop routine.",
    tags: ["Swift", "macOS", "USB"],
    image: {
      src: "/projects/docksense/menu.webp",
      dark: { src: "/projects/docksense/menu-dark.webp", width: 938, height: 734 },
      alt: "DockSense menu showing a connected CalDigit TS4, visibility controls, and keyboard backlight settings",
      width: 932,
      height: 728,
    },
  },
  {
    id: "repowatch",
    title: "RepoWatch",
    category: "macOS app",
    link: "/repowatch.html",
    description:
      "One place for the GitHub repos I want to keep an eye on. Releases, commits, and fewer tabs to check. A small dashboard for a growing list.",
    tags: ["Swift", "macOS", "GitHub"],
    cover: {
      src: "/projects/repowatch/cover-pixel.webp",
      alt: "Pixel-art repository nodes connected to one central monitoring dashboard",
      width: 1448,
      height: 1086,
    },
    image: {
      src: "/projects/repowatch/dashboard.webp",
      dark: { src: "/projects/repowatch/dashboard-dark.webp", width: 2840, height: 1632 },
      alt: "RepoWatch dashboard with a repository sidebar, latest release, latest commit, and last-checked status",
      width: 2840,
      height: 1632,
    },
  },
  {
    id: "theaterview",
    cover: {
      src: "/projects/theaterview/cover-pixel.webp",
      alt: "Pixel-art monitor with a wide video player and automatic viewing toggles",
      width: 1448,
      height: 1086,
    },
    title: "TheaterView",
    category: "Browser extension",
    link: "/theaterview.html",
    description:
      "YouTube, with fewer repeat clicks. Automatically enable theater mode, choose the highest non-Premium quality, and select Public videos on channel pages.",
    tags: ["JavaScript", "Safari", "Web Extension"],
    image: {
      src: "/projects/theaterview/settings.png",
      dark: { src: "/projects/theaterview/settings-dark.png", width: 512, height: 364 },
      alt: "TheaterView settings with Enable TheaterView, Auto highest quality, and Auto Public switched on",
      width: 512,
      height: 368,
    },
  },
  {
    id: "tabula",
    cover: {
      src: "/projects/tabula/cover-pixel.webp",
      alt: "Pixel-art desktop browser with a search bar and colourful favourite-site tiles",
      width: 1448,
      height: 1086,
    },
    title: "Tabula",
    category: "Personal project",
    link: "/tabula.html",
    description:
      "An easy place to keep my favourite sites. I also think it looks pretty. That was enough of a reason to build it.",
    tags: ["Start page", "Bookmarks"],
    image: {
      src: "/projects/tabula/start-page.webp",
      dark: { src: "/projects/tabula/start-page-dark.webp", width: 2400, height: 1326 },
      alt: "Tabula start page in Safari with a search field and favourite website shortcuts",
      width: 2400,
      height: 1326,
    },
  },
  {
    id: "logit",
    cover: {
      src: "/projects/logit/cover-pixel.webp",
      alt: "Pixel-art MacBook with startup app icons heading through an exit doorway",
      width: 1448,
      height: 1086,
    },
    title: "LogIt",
    category: "macOS app",
    link: "/logit.html",
    description:
      "I like quitting my startup apps before restarting my Mac. Whether that helps is unclear. LogIt makes the ritual less work.",
    tags: ["Swift", "macOS", "Login items"],
    image: {
      src: "/projects/logit/login-items.webp",
      dark: { src: "/projects/logit/login-items-dark.webp", width: 2840, height: 1632 },
      alt: "LogIt Open at Login page listing startup apps, running indicators, and batch quit and launch controls",
      width: 2840,
      height: 1632,
    },
  },
];
export function getProject(id: string): Project {
  const project = PROJECTS.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}
