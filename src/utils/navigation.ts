/**
 * Basic navigation helper with hash-aware scrolling for same-page anchors.
 * Falls back to a full navigation for cross-page links.
 */
export const HOME_SHOWCASE_LINK = "/#showcase";

export const navigateTo = (href: string) => {
  if (typeof window === "undefined" || !href) return;

  const url = new URL(href, window.location.href);
  const isSamePage =
    url.origin === window.location.origin &&
    url.pathname === window.location.pathname;

  if (isSamePage && url.hash) {
    const id = url.hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      return;
    }
  }

  window.location.href = href;
};
