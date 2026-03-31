import {
  FileTerminal,
  GlobeLock,
  MonitorCheck,
  Trash2,
  PackagePlus,
  Layout,
} from "lucide-react";
import { Project } from "../types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Launch Console",
    category: "Prototype",
    icon: FileTerminal,
    link: "/launch-console.html",
    description:
      "Live embed of a systems-inspired launch console landing page.",
  },
  {
    id: "2",
    title: "Private Local AI with Custom Domains",
    category: "Homelab",
    icon: GlobeLock,
    link: "/private-local-ai.html",
    description:
      "Caddy, Pi-hole, and Tailscale working together so my local AI stack lives behind clean .home domains with private access from every device.",
  },
  {
    id: "5",
    title: "Network Checker",
    category: "Homelab",
    icon: MonitorCheck,
    link: "/network-checker.html",
    description:
      "A tiny utility that probes my network and summarises the results.",
  },
  {
    id: "6",
    title: "Uninstall Cleanup Tool",
    category: "Utility",
    icon: Trash2,
    link: "/uninstall-cleanup.html",
    description:
      "A macOS terminal helper that wraps a deep system-wide search to find leftover files after uninstalling apps.",
  },
  {
    id: "7",
    title: "Container Update Helper",
    category: "Homelab",
    icon: PackagePlus,
    link: "/container-update-helper.html",
    description:
      "A macOS helper that turns my usual Docker update steps—stop, remove, pull, run—into simple buttons.",
  },
  {
    id: "4",
    title: "Room for the next curiosity",
    category: "Future ideas",
    icon: Layout,
    link: "#showcase",
    comingSoon: true,
  },
];
