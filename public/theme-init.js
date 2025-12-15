(() => {
  const stored = localStorage.getItem("theme");
  const prefersDark =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = stored === "dark" || (!stored && prefersDark);
  if (typeof document !== "undefined") {
    document.documentElement.classList.toggle("dark", isDark);
  }
})();
