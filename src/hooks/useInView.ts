import { useEffect, useState, RefObject } from "react";

interface UseInViewOptions {
  once?: boolean;
  amount?: number;
}

/**
 * Hook to detect when an element is in the viewport
 * Replaces framer-motion's useInView to reduce bundle size
 */
export const useInView = (
  ref: RefObject<Element | null>,
  options: UseInViewOptions = {}
): boolean => {
  const { once = false, amount = 0 } = options;
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already triggered once and once=true, don't observe again
    if (once && isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView =
          entry.isIntersecting && entry.intersectionRatio >= amount;
        setIsInView(inView);

        // If once=true and now in view, stop observing
        if (once && inView) {
          observer.disconnect();
        }
      },
      { threshold: amount }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, once, amount, isInView]);

  return isInView;
};
