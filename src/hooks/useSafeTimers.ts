import { useEffect, useRef } from "react";

type TimerId = number;

export const useSafeTimers = () => {
  const timeouts = useRef<TimerId[]>([]);

  const setSafeTimeout = (fn: () => void, delay: number): TimerId => {
    const id = window.setTimeout(() => {
      fn();
      // remove after it fires
      timeouts.current = timeouts.current.filter((t) => t !== id);
    }, delay) as unknown as TimerId;
    timeouts.current.push(id);
    return id;
  };

  const clearSafeTimeout = (id?: TimerId) => {
    if (id === undefined) return;
    window.clearTimeout(id);
    timeouts.current = timeouts.current.filter((t) => t !== id);
  };

  const clearAllTimeouts = () => {
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];
  };

  useEffect(() => clearAllTimeouts, []);

  return { setSafeTimeout, clearSafeTimeout, clearAllTimeouts };
};
