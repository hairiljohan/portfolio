import React, { useEffect, useRef } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { NAV_ITEMS } from "../constants";
import { cn } from "../utils/classNames";
import { textPrimary, mobileMenuOverlay } from "../utils/tw";

interface MobileMenuProps {
  /** Whether the mobile menu is open */
  isOpen: boolean;
  /** Callback to toggle the menu */
  onToggle: () => void;
  /** Current theme */
  theme: "light" | "dark";
  /** Callback to toggle theme */
  onToggleTheme: () => void;
  /** Click handler for navigation links */
  onNavigate: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

/**
 * Mobile navigation menu component
 *
 * Displays a hamburger menu icon and theme toggle for mobile devices,
 * along with a full-screen overlay menu when opened.
 */
const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onToggle,
  theme,
  onToggleTheme,
  onNavigate,
}) => {
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);

  // Trap focus within the overlay and close on Escape
  useEffect(() => {
    if (!isOpen) return;

    const overlay = overlayRef.current;
    if (!overlay) return;

    // Remember the element that had focus before opening
    lastFocusedElementRef.current =
      document.activeElement as HTMLElement | null;

    const focusable = Array.from(
      overlay.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter((el) => !el.hasAttribute("aria-hidden"));

    // Focus the first focusable item when opening
    if (focusable.length > 0) {
      focusable[0].focus();
    } else {
      overlay.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onToggle();
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !overlay.contains(active)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Restore focus to the element that was active before the menu opened
      if (lastFocusedElementRef.current) {
        lastFocusedElementRef.current.focus();
      }
    };
  }, [isOpen, onToggle]);

  return (
    <>
      {/* Mobile Action Buttons */}
      <div className="md:hidden flex items-center gap-4 z-50">
        <button
          onClick={onToggleTheme}
          className="p-2 text-charcoal dark:text-cream"
          aria-label="Toggle dark mode"
        >
          {theme === "light" ? <Moon size={24} /> : <Sun size={24} />}
        </button>

        <button
          onClick={onToggle}
          className="p-2 text-charcoal dark:text-cream"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu-overlay"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        id="mobile-menu-overlay"
        className={cn(
          mobileMenuOverlay,
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!isOpen}
        tabIndex={-1}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => onNavigate(e, item.href)}
            className={cn("text-3xl font-serif font-medium", textPrimary)}
            tabIndex={isOpen ? 0 : -1}
          >
            {item.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => onNavigate(e, "#contact")}
          className="px-8 py-3 text-lg font-medium bg-charcoal dark:bg-cream text-white dark:text-charcoal rounded-full"
          tabIndex={isOpen ? 0 : -1}
        >
          Let's Connect
        </a>
      </div>
    </>
  );
};

export default MobileMenu;
