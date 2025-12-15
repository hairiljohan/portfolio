import React, { useState, useEffect, useMemo } from "react";
import { Sun, Moon } from "lucide-react";
import { NAV_ITEMS } from "../constants";
import { useCanHover } from "../hooks/useCanHover";
import { useWindowEvent } from "../hooks/useWindowEvent";
import { cn, hoverClass } from "../utils/classNames";
import { throttle } from "../utils/throttle";
import { textPrimary, sectionContainer } from "../utils/tw";
import MobileMenu from "./MobileMenu";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const canHover = useCanHover();

  // Throttle scroll handler to improve performance
  const handleScroll = useMemo(() => {
    return throttle(() => {
      setScrolled(window.scrollY > 50);
    }, 100);
  }, []);

  useWindowEvent("scroll", handleScroll, { passive: true });

  useEffect(() => {
    // Check initial theme
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }

    return () => {
      handleScroll.cancel();
    };
  }, [handleScroll]);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.theme = "dark";
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  };

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    setIsOpen(false);

    // For the hero/logo, jump to absolute top to avoid tiny offsets
    if (href === "#hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`sticky top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "py-4" : "py-6 md:py-8"
        }`}
      >
        <div
          className={`${sectionContainer} flex items-center justify-between`}
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleClick(e, "#hero")}
            className={cn(
              "text-2xl font-bold font-serif tracking-tight z-50 relative",
              textPrimary
            )}
          >
            HJ<span className="text-accent-orange">.</span>
          </a>

          {/* Desktop Nav */}
          <div
            className={`hidden md:flex items-center gap-1 rounded-full px-2 py-2 transition-all duration-300 ${
              scrolled
                ? "bg-white/70 dark:bg-charcoal/70 backdrop-blur-xl shadow-sm border border-white/20 dark:border-white/5"
                : "bg-transparent"
            }`}
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "px-5 py-2 text-sm font-medium text-charcoal/70 dark:text-cream/70 rounded-full transition-colors",
                  hoverClass(
                    canHover,
                    "md:hover:text-charcoal md:dark:hover:text-cream md:hover:bg-white/50 md:dark:hover:bg-white/10"
                  )
                )}
              >
                {item.label}
              </a>
            ))}

            <button
              onClick={toggleTheme}
              className={cn(
                "p-2 rounded-full text-charcoal/70 dark:text-cream/70 transition-colors",
                hoverClass(
                  canHover,
                  "md:hover:bg-white/50 md:dark:hover:bg-white/10"
                )
              )}
              aria-label="Toggle dark mode"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            <a
              href="#contact"
              onClick={(e) => handleClick(e, "#contact")}
              className={cn(
                "ml-2 px-5 py-2 text-sm font-medium bg-charcoal dark:bg-cream text-white dark:text-charcoal rounded-full transition-colors",
                hoverClass(
                  canHover,
                  "md:hover:bg-accent-orange md:dark:hover:bg-accent-orange md:dark:hover:text-white"
                )
              )}
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu */}
          <MobileMenu
            isOpen={isOpen}
            onToggle={() => setIsOpen(!isOpen)}
            theme={theme}
            onToggleTheme={toggleTheme}
            onNavigate={handleClick}
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
