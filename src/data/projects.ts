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
      dark: { src: "/projects/netswitch/dns-profiles-dark.webp", width: 2936, height: 1788 },
      alt: "NetSwitch DNS Profiles settings with Home DNS, Public DNS, and an app whitelist",
      width: 2936,
      height: 1788,
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
      dark: { src: "/projects/docksense/menu-dark.webp", width: 866, height: 666 },
      alt: "DockSense menu showing a connected CalDigit TS4, visibility controls, and keyboard backlight settings",
      width: 866,
      height: 666,
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
      dark: { src: "/projects/theaterview/settings-dark.png", width: 476, height: 342 },
      alt: "TheaterView settings with Enable TheaterView, Auto highest quality, and Auto Public switched on",
      width: 472,
      height: 336,
    },
  },
  {
    id: "container-update-helper",
    title: "Container Update Helper",
    category: "Homelab",
    link: "/container-update-helper.html",
    description:
      "Stop, remove, pull, run. My usual Docker update routine, turned into simple buttons with room to check each step.",
    tags: ["Docker", "Script Editor"],
    image: {
      src: "/updater/owui%20update.webp",
      alt: "macOS dialog with controls for updating an Open WebUI container",
      width: 904,
      height: 660,
    },
  },
];
export function getProject(id: string): Project {
  const project = PROJECTS.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown project: ${id}`);
  return project;
}
