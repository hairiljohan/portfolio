(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isSystem = !stored || stored === "system";
  const isDark = stored === "dark" || (isSystem && prefersDark);
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", isDark);
  }
})();
