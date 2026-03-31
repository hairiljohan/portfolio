import { GlobeLock, Server, Shield, Smartphone } from "lucide-react";
import { iconCircleAccent, iconCircleNeutral } from "../utils/tw";

export const pills = [
  { label: "Homelab" },
  { label: "Local AI", variant: "accent" as const },
  { label: "Caddy + Tailscale" },
];

export const whatList = [
  "Caddy running locally: A lightweight reverse proxy always on, so my apps are reachable by domain instead of port numbers.",
  "Caddyfile routing: Simple rules mapping friendly hostnames to local services (e.g., whydoesthiswork.home → 127.0.0.1), plus other local tools like ComfyUI.",
  "Pi-hole local DNS records: Custom .home domains point to my machine's Tailscale IP, so names resolve anywhere on my network automatically.",
  "Desktop access: Open WebUI loads through the custom domain just like a hosted site, while still running on my machine.",
  "Mobile access: The same domain works on my phone and iPad via Tailscale, so I can use my local models anywhere.",
];

export const whyList = [
  "Better UX for local dev: No more remembering ports or typing localhost. I just go to a domain.",
  "Private by default: Tailscale keeps the AI instance off the public web. Only my devices on the tailnet can reach it.",
  "No router issues: No port‑forwarding or firewall exposure — just encrypted device‑to‑device access.",
  "Feels like a real product: Stable URL, clean routing, and consistent access across desktop and mobile.",
];

export const buildingBlocks = [
  {
    icon: Shield,
    iconClass: iconCircleAccent,
    title: "Private overlay first",
    description:
      "Tailscale keeps every service behind the tailnet, so the .home domains only exist for devices I trust.",
  },
  {
    icon: Server,
    iconClass: iconCircleNeutral,
    title: "Caddy reverse proxy",
    description:
      "Routes whydoesthiswork.home and other hostnames to local ports, letting me forget about 127.0.0.1:3000 entirely.",
  },
  {
    icon: GlobeLock,
    iconClass: iconCircleNeutral,
    title: "DNS that follows me",
    description:
      "Pi‑hole holds the DNS records for each .home address and points them to my Tailscale IP so they resolve on any device.",
  },
  {
    icon: Smartphone,
    iconClass: iconCircleNeutral,
    title: "No-public deployment",
    description:
      "Caddy, Pi-hole, and Tailscale let me use my local AI models from my mobile devices over a private domain without exposing anything to the public internet.",
  },
];

const toSrc = (file: string) => `/custom/${encodeURIComponent(file)}`;

export const media = {
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
