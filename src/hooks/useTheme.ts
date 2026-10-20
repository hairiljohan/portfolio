import { useEffect, useState } from "react";
export type ThemeMode = "light" | "dark" | "system";
function readTheme(): ThemeMode {
  try {
    const value = localStorage.getItem("theme");
    return value === "light" || value === "dark" ? value : "system";
  } catch {
    return "system";
  }
}
function applyTheme(mode: ThemeMode) {
  const dark =
    mode === "dark" ||
    (mode === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}
export function useTheme() {
  const [mode, setMode] = useState<ThemeMode>(readTheme);
  useEffect(() => {
    applyTheme(mode);
    const media = matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(mode);
    const onStorage = (event: StorageEvent) => {
      if (event.key === "theme" || event.key === null) setMode(readTheme());
    };
    media.addEventListener("change", onChange);
    window.addEventListener("storage", onStorage);
    return () => {
      media.removeEventListener("change", onChange);
      window.removeEventListener("storage", onStorage);
    };
  }, [mode]);
  return [
    mode,
    (next: ThemeMode) => {
      try {
        localStorage.setItem("theme", next);
      } catch {
        /* Theme still works when storage is unavailable. */
      }
      applyTheme(next);
      setMode(next);
    },
  ] as const;
}
