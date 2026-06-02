import React, { useEffect, useRef } from "react";
import { useCanHover } from "../hooks/useCanHover";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { getCustomCursorTargetState } from "../utils/customCursorTargets.js";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const nextPositionRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const canHover = useCanHover();
  const prefersReducedMotion = useReducedMotion();
  const enabled = canHover && !prefersReducedMotion;

  useEffect(() => {
    if (!enabled) return;

    const root = document.documentElement;
    const cursor = cursorRef.current;
    if (!cursor) return;

    const updateClass = (state: "default" | "interactive" | "native") => {
      cursor.classList.toggle("is-interactive", state === "interactive");
      cursor.classList.toggle("is-native", state === "native");
    };

    const commitPosition = () => {
      frameRef.current = null;
      const { x, y } = nextPositionRef.current;
      cursor.style.setProperty("--cursor-x", `${x}px`);
      cursor.style.setProperty("--cursor-y", `${y}px`);
    };

    const schedulePositionUpdate = () => {
      if (frameRef.current !== null) return;
      frameRef.current = window.requestAnimationFrame(commitPosition);
    };

    const handlePointerMove = (event: PointerEvent) => {
      nextPositionRef.current = { x: event.clientX, y: event.clientY };
      cursor.classList.add("is-visible");
      updateClass(getCustomCursorTargetState(event.target));
      schedulePositionUpdate();
    };

    const handlePointerOut = (event: PointerEvent) => {
      if (event.relatedTarget === null) {
        cursor.classList.remove("is-visible", "is-interactive", "is-native");
      }
    };

    root.classList.add("custom-cursor-enabled");
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("pointerout", handlePointerOut, { passive: true });

    return () => {
      root.classList.remove("custom-cursor-enabled");
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="custom-cursor"
      aria-hidden="true"
      role="presentation"
    >
      <span className="custom-cursor__ring" />
      <span className="custom-cursor__dot" />
    </div>
  );
};

export default CustomCursor;
