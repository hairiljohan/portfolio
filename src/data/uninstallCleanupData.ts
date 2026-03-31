import type { LucideIcon } from "lucide-react";
import { ShieldCheck, Sparkles, Trash2 } from "lucide-react";
import { iconCircleAccent, iconCircleNeutral } from "../utils/tw";

export type InfoCard = {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string | string[];
  label?: string;
  descriptionClass?: string;
};

export const gifSrc = "/cleaner/public.gif";

export const pills = [
  { label: "Utility" },
  { label: "Cleanup", variant: "accent" as const },
  { label: "Terminal helper" },
];

export const handleDescriptionClass =
  "text-sm text-charcoal/70 dark:text-cream/70";

export const handleCards: InfoCard[] = [
  {
    icon: Trash2,
    iconClass: iconCircleAccent,
    title: "Leftover files",
    description:
      "Searches for files and folders whose names still contain the app name long after it has been dragged to the trash.",
  },
  {
    icon: ShieldCheck,
    iconClass: iconCircleNeutral,
    title: "Safe checks",
    description:
      "Keeps the human in the loop: results are meant to be reviewed with ChatGPT or manually before anything is deleted.",
  },
  {
    icon: Sparkles,
    iconClass: iconCircleAccent,
    title: "Finishing pass",
    description:
      "Helps me leave fewer traces behind so that repeated installs and uninstalls do not slowly clutter the system.",
  },
];

export const footerCards: InfoCard[] = [
  {
    icon: Trash2,
    iconClass: iconCircleAccent,
    label: "Stack",
    title: "macOS Script Editor · shell · ChatGPT",
    description:
      "Script Editor gives me a small native prompt, the shell does the heavy lifting with a single reusable command.",
    descriptionClass:
      "text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed",
  },
  {
    icon: ShieldCheck,
    iconClass: iconCircleNeutral,
    label: "Status",
    title: "Personal utility",
    description:
      "This is a personal tool I use on my own Mac when I am uninstalling apps. It is not polished for public release, but it already makes cleanup feel calmer and more deliberate.",
    descriptionClass:
      "text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed",
  },
];
