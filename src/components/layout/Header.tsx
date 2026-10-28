import { useEffect, useRef, useState } from "react";
import MenuButton from "./MenuButton";
import { BottomSheet } from "../beui/bottom-sheet";
import { flushSync } from "react-dom";
import { MenuIcon } from "../arc/icon-morph/icon-morph";
import SegmentedControl from "../arc/segmented-control/segmented-control";
import { SharedLayoutBg } from "../beui/shared-layout-bg";
import { useTheme, type ThemeMode } from "../../hooks/useTheme";
import styles from "./Header.module.css";

const links = [["About", "#about"], ["Projects", "#showcase"], ["Contact", "#contact"]];
const themeOptions = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const pendingLogoFlight = "portfolio:pending-logo-flight";
function hasArrivalFlight(home: boolean) {
  if (!home || window.location.hash !== "#hero") return false;
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined;
  if (navigation && navigation.type !== "navigate") return false;
  try {
    const timestamp = Number(sessionStorage.getItem(pendingLogoFlight));
    const age = Date.now() - timestamp;
    return timestamp > 0 && age >= 0 && age < 30_000;
  } catch {
    return false;
  }
}

export default function Header({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const [logoFlight, setLogoFlight] = useState(() => hasArrivalFlight(home) ? 1 : 0);
  const trigger = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useTheme();
  const href = (hash: string) => (home ? hash : `/${hash}`);
  useEffect(() => {
    if (!home) return;
    // Consume after initialization so Strict Mode's repeated initializer reads agree.
    try { sessionStorage.removeItem(pendingLogoFlight); } catch { /* Navigation still works without storage. */ }
  }, [home]);
  useEffect(() => {
    const media = matchMedia("(min-width: 701px)");
    const onResize = () => { if (media.matches) setOpen(false); };
    media.addEventListener("change", onResize);
    return () => media.removeEventListener("change", onResize);
  }, []);
  const themePicker = (
    <SegmentedControl label="Color theme" options={themeOptions} value={theme}
      onValueChange={(value) => setTheme(value as ThemeMode)} />
  );
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className={styles.header}>
        <div className={`container ${styles.inner}`}>
          <a className={styles.logo} href={href("#hero")} aria-label="Hairil Johan, home"
            onClick={(event) => {
              if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
              if (!home) {
                // A new document would cut off this animation; replay it on arrival.
                try { sessionStorage.setItem(pendingLogoFlight, String(Date.now())); } catch { /* Keep the native home link working. */ }
              }
              // Restart only the decorative mark; preserve native anchor navigation and focus handling.
              setLogoFlight(flight => flight + 1);
            }}>
            <span key={logoFlight} className={logoFlight ? styles.logoFlight : undefined} aria-hidden="true" />
          </a>
          <div className={`${styles.controls} arc-controls`}>

                <MenuButton ref={trigger} className={styles.menu} aria-label="Menu" aria-expanded={open} aria-haspopup="dialog" aria-controls="mobile-menu" onClick={() => setOpen(!open)}
                  onPointerDown={(event) => {
                    // Focusing a sticky control can scroll Safari/Chromium's page.
                    if (event.button === 0) event.currentTarget.focus({ preventScroll: true });
                  }}>
                  <MenuIcon state={open} size={22} />
                  <span>Menu</span>
                </MenuButton>
              <BottomSheet id="mobile-menu" open={open} onOpenChange={setOpen} title="Menu"
                description="Explore Hairil Johan’s portfolio." snapPoints={["auto"]}
                className="arc-controls">
                <nav aria-label="Mobile">
                  <ul className={styles.mobileLinks}>
                    {links.map(([label, hash]) => (
                      <li key={hash}><a href={href(hash)} onClick={(event) => {
                        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                        // Release the fixed-body scroll lock before the anchor navigates.
                        flushSync(() => setOpen(false));
                      }}>{label}</a></li>
                    ))}
                  </ul>
                </nav>
                <div className={styles.mobileTheme}>
                  <p>Appearance</p>
                  {themePicker}
                </div>
              </BottomSheet>
            <nav aria-label="Main" className={styles.nav}>
              <SharedLayoutBg as="ul" className={styles.navLinks} inset={10}>
                {links.map(([label, hash]) => <li key={hash}><a href={href(hash)}>{label}</a></li>)}
              </SharedLayoutBg>
            </nav>
            <div className={styles.desktopTheme}>{themePicker}</div>
          </div>
        </div>
      </header>
    </>
  );
}
