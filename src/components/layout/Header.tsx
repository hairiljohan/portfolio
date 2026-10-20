import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import MenuButton from "./MenuButton";
import SegmentedControl from "../arc/segmented-control/segmented-control";
import { useTheme, type ThemeMode } from "../../hooks/useTheme";
import styles from "./Header.module.css";
export default function Header({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useTheme();
  const href = (hash: string) => (home ? hash : `/${hash}`);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const media = matchMedia("(min-width: 701px)");
    const onResize = () => {
      if (media.matches) setOpen(false);
    };
    window.addEventListener("keydown", close);
    media.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", close);
      media.removeEventListener("change", onResize);
    };
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <a
            className={styles.logo}
            href={href("#hero")}
            aria-label="Hairil Johan, home"
          >
            hj<span>.</span>
          </a>
          <div className={`${styles.controls} arc-controls`}>
            <MenuButton
              ref={trigger}
              className={styles.menu}
              aria-label="Menu"
              aria-expanded={open}
              aria-controls="main-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <X size={18} aria-hidden="true" />
              ) : (
                <Menu size={18} aria-hidden="true" />
              )}
              <span className={styles.menuLabel}>Menu</span>
            </MenuButton>
            <nav
              id="main-navigation"
              aria-label="Main"
              className={`${styles.nav} ${open ? styles.open : ""}`}
            >
              {[
                ["Work", "#showcase"],
                ["About", "#about"],
                ["Contact", "#contact"],
              ].map(([label, hash]) => (
                <a key={hash} href={href(hash)} onClick={() => setOpen(false)}>
                  {label}
                </a>
              ))}
            </nav>
            <SegmentedControl
              label="Color theme"
              options={[
                { value: "system", label: "System" },
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
              value={theme}
              onValueChange={(value) => setTheme(value as ThemeMode)}
            />
          </div>
        </div>
      </header>
    </>
  );
}
