import { useEffect } from "react";

type EventTargetWithAdd = Pick<
  Window,
  "addEventListener" | "removeEventListener"
>;

/**
 * Adds an event listener to a target and cleans it up on unmount.
 * Defaults to passive listeners.
 */
export const useWindowEvent = (
  event: string,
  handler: EventListenerOrEventListenerObject,
  options: AddEventListenerOptions | boolean = { passive: true },
  target: EventTargetWithAdd | undefined = typeof window !== "undefined"
    ? window
    : undefined
) => {
  useEffect(() => {
    if (!target) return;
    target.addEventListener(event, handler, options);
    return () => target.removeEventListener(event, handler, options);
  }, [event, handler, options, target]);
};
