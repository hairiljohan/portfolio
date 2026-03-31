import { useCallback, useEffect, useRef } from "react";

type TimerId = number;

export const useSafeTimers = () => {
  const timeouts = useRef<TimerId[]>([]);

  const setSafeTimeout = useCallback(
    (fn: () => void, delay: number): TimerId => {
      const id = window.setTimeout(() => {
        fn();
        timeouts.current = timeouts.current.filter((t) => t !== id);
      }, delay) as unknown as TimerId;
      timeouts.current.push(id);
      return id;
    },
    [],
  );

  const clearSafeTimeout = useCallback((id?: TimerId) => {
    if (id === undefined) return;
    window.clearTimeout(id);
    timeouts.current = timeouts.current.filter((t) => t !== id);
  }, []);

  const clearAllTimeouts = useCallback(() => {
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];
  }, []);

  useEffect(() => clearAllTimeouts, [clearAllTimeouts]);

  return { setSafeTimeout, clearSafeTimeout, clearAllTimeouts };
};
