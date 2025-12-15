// ===== Text & Color Utilities =====

/** Primary text color with dark mode support and smooth transitions */
export const textPrimary = "text-charcoal dark:text-cream transition-colors";

/** Primary text color with extended transition duration (300ms) */
export const textPrimaryAnimated =
  "text-charcoal dark:text-cream transition-colors duration-300";

/** Secondary/muted text color with dark mode support */
export const textSecondary = "text-charcoal/60 dark:text-cream/60";

/** Tertiary/subtle text color with dark mode support */
export const textTertiary = "text-charcoal/40 dark:text-cream/40";

// ===== Background Utilities =====

/** Primary background with dark mode support and smooth transitions */
export const bgPrimary = "bg-cream dark:bg-charcoal transition-colors";

/** Primary background with extended transition duration (300ms) */
export const bgPrimaryAnimated =
  "bg-cream dark:bg-charcoal transition-colors duration-300";

/** Card background with subtle dark mode variant */
export const bgCard = "bg-white dark:bg-white/5";

/** Card background with border and transitions */
export const bgCardBordered =
  "bg-white dark:bg-white/5 border border-stone-200 dark:border-white/10 transition-all duration-500";

// ===== Typography =====

/** Large section heading (h2) */
export const headingLg =
  "text-4xl font-serif font-bold mb-4 text-charcoal dark:text-cream transition-colors duration-300";

/** Extra large section heading (h1/h2) */
export const headingXl =
  "text-4xl md:text-6xl font-serif font-bold text-charcoal dark:text-cream transition-colors duration-300";

/** Section subheading (h2) */
export const headingMd = "text-2xl font-serif font-semibold";

/** Card/component heading (h3) */
export const headingSm =
  "text-3xl md:text-4xl font-bold text-charcoal dark:text-cream font-serif";

// ===== Layout =====

/** Standard section container padding */
export const containerPadding = "px-6 md:px-12";

/** Section wrapper max width */
export const containerMaxWidth = "max-w-7xl mx-auto";

/** Full section container */
export const sectionContainer = "px-6 md:px-12 max-w-7xl mx-auto";

// ===== Interactive Elements =====

/** CTA link column layout */
export const ctaLinkColumn = "group flex flex-col items-center gap-3";

/** Base action button styles (carousel arrows, etc) */
export const actionButtonBase =
  "p-3 rounded-full bg-white dark:bg-white/10 text-charcoal dark:text-cream border border-gray-200 dark:border-white/10 transition-all duration-200 shadow-sm active:scale-95";

/** Pill/badge background */
export const badgeBase =
  "px-4 py-2 bg-charcoal/5 dark:bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-charcoal/60 dark:text-cream/60 border border-charcoal/5 dark:border-white/5";

// ===== Overlays =====

/** Mobile menu overlay (full screen) */
export const mobileMenuOverlay =
  "fixed inset-0 bg-cream/95 dark:bg-charcoal/95 backdrop-blur-3xl z-40 md:hidden flex flex-col items-center justify-center space-y-8 transition-opacity duration-300";

// ===== Cards =====

/** Base card with rounded corners */
export const cardBase =
  "rounded-3xl overflow-hidden transition-all duration-500";

/** Large card with border radius */
export const cardLg = "rounded-card-lg";

/** Card with hover shadow effect */
export const cardHoverShadow =
  "rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 bg-white dark:bg-white/5 border border-transparent";
