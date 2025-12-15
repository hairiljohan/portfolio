import { useEffect, useState } from "react";

const HOVER_QUERY = "(hover: hover) and (pointer: fine)";

/**
 * Returns true only on devices that actually support hover.
 * Useful for skipping hover-only styles on touch devices like iPads.
 */
export const useCanHover = () => {
  const [canHover, setCanHover] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(HOVER_QUERY).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia(HOVER_QUERY);
    const handleChange = (event: MediaQueryListEvent) =>
      setCanHover(event.matches);

    setCanHover(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return canHover;
};
