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
    id: "private-local-ai",
    title: "Private Local AI with Custom Domains",
    category: "Homelab",
    link: "/private-local-ai.html",
    description:
      "My local AI stack, made a little more everyday. Clean .home domains and private access from every device I own.",
    tags: ["Caddy", "Pi-hole", "Tailscale"],
    image: {
      src: "/custom/dekstop%20screenshot.webp",
      alt: "Open WebUI running on my desktop through a private custom domain",
      width: 3638,
      height: 2912,
    },
  },
  {
    id: "network-checker",
    title: "Network Checker",
    category: "macOS utility",
    link: "/network-checker.html",
    description:
      "A quick answer to a familiar question: is my docked Mac actually using gigabit Ethernet, or has it fallen back to Wi-Fi?",
    tags: ["Shell script", "Automator"],
    image: {
      src: "/assets/network-checker/gbe.webp",
      alt: "Network Checker reporting a 1 Gbps Thunderbolt Ethernet connection",
      width: 1064,
      height: 520,
    },
  },
  {
    id: "uninstall-cleanup",
    title: "Uninstall Cleanup Tool",
    category: "macOS utility",
    link: "/uninstall-cleanup.html",
    description:
      "A small terminal helper for finding the files apps leave behind. One prompt, a thorough search, and a deliberate review before deleting anything.",
    tags: ["Shell script", "Script Editor"],
    image: {
      src: "/cleaner/poster.webp",
      alt: "Uninstall Cleanup Tool displaying a search for leftover application files",
      width: 1280,
      height: 720,
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
