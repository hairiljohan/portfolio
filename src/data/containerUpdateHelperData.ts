import type { LucideIcon } from "lucide-react";
import { ClipboardList, RefreshCw, Sparkles } from "lucide-react";
import { iconCircleAccent, iconCircleNeutral } from "../utils/tw";

export type WorkflowCard = {
  icon: LucideIcon;
  iconClass: string;
  title: string;
  description: string[];
  containerClass?: string;
  descriptionClass?: string;
  label?: string;
  stackedHeader?: boolean;
  descriptionInHeader?: boolean;
  headerWrapperClass?: string;
};

export const pills = [
  { label: "Homelab" },
  { label: "Containers", variant: "accent" as const },
  { label: "Update helper" },
];

export const introParagraph =
  "I built this small utility after I started working with Docker containers. Updating a container normally means running several terminal commands: stop the container, remove it, pull the new image, and run it again. Doing this by hand becomes repetitive when you update containers often.";

export const workflowParagraph =
  "I used Script Editor on macOS to build a simple tool that turns each step into a one-button action. Each button runs a complete part of the update process—stop, remove, pull, and run—without needing to type commands or remember flags. It makes my update workflow faster and reduces mistakes when I am updating my containers.";

export const owuiCaption =
  "Snapshots from the OpenWebUI update flow. The helper walks through stop, remove, pull, and run so I can refresh that container with a couple of clicks instead of a long command chain.";

export const searxngCaption =
  "Snapshots from the SearXNG update flow. I use the same buttons to cycle the container, but I can pause between steps to confirm the new image starts cleanly before moving on.";

export const defaultWorkflowContainer = "p-5";
export const defaultWorkflowDescription =
  "text-sm md:text-base text-charcoal/70 dark:text-cream/70";

export const galleryImages = [
  {
    file: "owui update.webp",
    alt: "Update helper showing Owui pull and restart flow",
  },
  { file: "owui.webp", alt: "Owui container ready state inside the helper" },
  { file: "searxng update.webp", alt: "SearXNG container update snapshot" },
  { file: "searxng.webp", alt: "SearXNG status card post-update" },
].map((image) => ({
  ...image,
  src: `/updater/${encodeURIComponent(image.file)}`,
}));

export const groupedImages = [
  { id: "owui", images: galleryImages.slice(0, 2) },
  { id: "searxng", images: galleryImages.slice(2, 4) },
];

export const workflowCards: WorkflowCard[] = [
  {
    icon: RefreshCw,
    iconClass: iconCircleAccent,
    title: "Rolling updates",
    description: [
      "I still run updates container-by-container, but each phase now lives behind a button. I can stop and remove the old container, pull the latest image, and start it again without retyping the full command chain.",
    ],
    descriptionInHeader: true,
  },
  {
    icon: ClipboardList,
    iconClass: iconCircleNeutral,
    title: "Checks",
    description: [
      "Having the steps broken into separate buttons makes it easy to pause between actions, double-check container state, and confirm that the new image starts cleanly before I move on.",
    ],
    descriptionInHeader: true,
  },
  {
    icon: Sparkles,
    iconClass: iconCircleAccent,
    title: "Work in progress",
    label: "Status",
    description: [
      "Right now this helper focuses on a handful of containers I update most often, wrapping the usual Docker commands in simple Script Editor actions.",
      "I plan to keep refining it as my homelab grows—adding better prompts, safety checks, and small quality-of-life improvements so updates stays stable.",
    ],
    containerClass: "p-6 space-y-4 min-h-[320px]",
    descriptionClass:
      "text-sm text-charcoal/70 dark:text-cream/70 leading-relaxed",
    stackedHeader: false,
    descriptionInHeader: false,
    headerWrapperClass: "flex items-center gap-3",
  },
];
