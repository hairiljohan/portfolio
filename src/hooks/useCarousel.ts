import { useRef, useState, useMemo, useEffect, RefObject } from "react";
import { throttle } from "../utils/throttle";

interface UseCarouselOptions {
  /**
   * Throttle delay for scroll handler in milliseconds
   * @default 50
   */
  throttleDelay?: number;
  /**
   * Scroll amount as percentage of viewport width
   * @default 0.6
   */
  scrollPercentage?: number;
  /**
   * Tolerance for detecting start/end positions in pixels
   * @default 5
   */
  tolerance?: number;
}

interface UseCarouselReturn {
  /** Ref to attach to the scrollable container */
  scrollRef: RefObject<HTMLDivElement | null>;
  /** Scroll progress percentage (0-100) */
  progress: number;
  /** Function to scroll left or right */
  scroll: (direction: "left" | "right") => void;
  /** Scroll event handler to attach to container */
  handleScroll: () => void;
}

/**
 * Custom hook for carousel/horizontal scroll functionality
 *
 * Features:
 * - Tracks scroll progress (0-100%)
 * - Handles left/right navigation with smooth scrolling
 * - Loops from end to start and vice versa
 * - Throttled scroll handler for performance
 *
 * @example
 * const { scrollRef, progress, scroll, handleScroll } = useCarousel();
 *
 * <div ref={scrollRef} onScroll={handleScroll}>
 *   {items.map(item => <div>{item}</div>)}
 * </div>
 * <button onClick={() => scroll("left")}>Previous</button>
 * <button onClick={() => scroll("right")}>Next</button>
 * <div style={{ width: `${progress}%` }} />
 */
export const useCarousel = (
  options: UseCarouselOptions = {}
): UseCarouselReturn => {
  const { throttleDelay = 50, scrollPercentage = 0.6, tolerance = 5 } = options;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Throttle scroll handler to improve performance
  const handleScroll = useMemo(
    () =>
      throttle(() => {
        if (scrollRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
          const maxScroll = scrollWidth - clientWidth;
          if (maxScroll > 0) {
            setProgress((scrollLeft / maxScroll) * 100);
          }
        }
      }, throttleDelay),
    [throttleDelay]
  );

  // Clear pending throttled callbacks on unmount to avoid setState on unmounted component
  useEffect(() => {
    return () => handleScroll.cancel();
  }, [handleScroll]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * scrollPercentage;

    if (direction === "left") {
      // If we're at the start (or very close), loop to the end
      if (scrollLeft <= tolerance) {
        scrollRef.current.scrollTo({
          left: scrollWidth,
          behavior: "smooth",
        });
      } else {
        // Otherwise scroll left normally
        scrollRef.current.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      }
    } else {
      // Calculate the maximum possible scroll left value
      const maxScrollLeft = scrollWidth - clientWidth;

      // If we're at the end (or very close), loop to the start
      if (scrollLeft >= maxScrollLeft - tolerance) {
        scrollRef.current.scrollTo({
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Otherwise scroll right normally
        scrollRef.current.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return {
    scrollRef,
    progress,
    scroll,
    handleScroll,
  };
};
