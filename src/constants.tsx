import {
  Cpu,
  Code2,
  Codepen,
  Server,
  Shield,
  BrainCog,
  FunctionSquare,
  PackagePlus,
  Layout,
  FileTerminal,
  Wind,
  Globe,
  Trash2,
  GlobeLock,
  MonitorCheck,
} from "lucide-react";
import { Skill, Hobby, Project, NavItem } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Interests", href: "#hobbies" },
  { label: "Showcase", href: "#showcase" },
];

export const SKILLS: Skill[] = [
  {
    title: "SolidWorks",
    description:
      "Certified SolidWorks Associate with proficiency in parametric 3D modeling, assembly design, and technical drawing creation for mechanical and aerospace components.",
    icon: Codepen,
    color: "bg-red-500",
  },
  {
    title: "CFD Analysis",
    description:
      "Conducted aerodynamic studies using Ansys Fluent to investigate airfoil performance characteristics, analysing lift and drag coefficients through 2D and 3D computational fluid dynamics simulations.",
    icon: Wind,
    color: "bg-blue-500",
  },
  {
    title: "MATLAB & Simulink",
    description:
      "Applied MATLAB for fluid dynamics analysis of laminar and turbulent flow regimes, and developed AC motor control simulations in Simulink for electromechanical systems modelling.",
    icon: FunctionSquare,
    color: "bg-orange-500",
  },
];

export const HOBBIES: Hobby[] = [
  {
    name: "Homelabbing",
    description:
      "Building and experimenting with Raspberry Pi and Arduino projects to create custom hardware solutions and explore IoT systems",
    icon: Cpu,
  },
  {
    name: "Self-hosting",
    description:
      "Running privacy-focused infrastructure with Docker containers - Pi-hole for ad-blocking, Unbound for DNS security, OpenWebUI for AI interfaces, and Searxng for private search",
    icon: Server,
  },
  {
    name: "Local AI Models",
    description:
      "Experimenting with offline LLM deployments using LM Studio, Ollama, and ComfyUI to build AI-powered applications without cloud dependency",
    icon: BrainCog,
  },
];

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
