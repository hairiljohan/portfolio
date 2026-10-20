export type HighlightItem = {
  title: string;
  description: string;
};

export const screenshotSrc = "/assets/network-checker/gbe.webp";
export const iconSrc = "/assets/network-checker/icon.webp";
export const wifiSrc = "/assets/network-checker/wifi.webp";

export const highlights: HighlightItem[] = [
  {
    title: "Shell script core",
    description:
      "A bash script reads the current network interface and link speed, then maps it to simple labels like 10 Mbps, 100 Mbps, 1 Gbps, and Wi‑Fi.",
  },
  {
    title: "Dock vs Wi‑Fi sanity check",
    description:
      "It helps me confirm if my Mac is actually using the wired Ethernet from the dock or if it silently fell back to Wi‑Fi.",
  },
  {
    title: "Future‑proof speeds",
    description:
      "I extended it to include 2.5G, 5G, and 10G Ethernet so it is ready if I upgrade my network later.",
  },
];
