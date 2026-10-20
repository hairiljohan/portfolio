import { useEffect, useRef, useState } from "react";
import MenuButton from "./MenuButton";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "../arc/drawer/drawer";
import { MenuIcon } from "../arc/icon-morph/icon-morph";
import SegmentedControl from "../arc/segmented-control/segmented-control";
import { SharedLayoutBg } from "../beui/shared-layout-bg";
import { useTheme, type ThemeMode } from "../../hooks/useTheme";
import styles from "./Header.module.css";

const links = [["About", "#about"], ["Work", "#showcase"], ["Contact", "#contact"]];
const themeOptions = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export default function Header({ home = false }: { home?: boolean }) {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const [theme, setTheme] = useTheme();
  const href = (hash: string) => (home ? hash : `/${hash}`);
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
          <a className={styles.logo} href={href("#hero")} aria-label="Hairil Johan, home">hj<span>.</span></a>
          <div className={`${styles.controls} arc-controls`}>
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <MenuButton ref={trigger} className={styles.menu} aria-label="Menu"
                  onPointerDown={(event) => {
                    // Focusing a sticky control can scroll Safari/Chromium's page.
                    if (event.button === 0) event.currentTarget.focus({ preventScroll: true });
                  }}>
                  <MenuIcon state={open} size={22} />
                  <span>Menu</span>
                </MenuButton>
              </DrawerTrigger>
              <DrawerContent title="Menu" description="Explore Hairil Johan’s portfolio." side="right"
                className={`arc-controls ${styles.mobileDrawer}`}
                onCloseAutoFocus={(event) => {
                  event.preventDefault();
                  trigger.current?.focus({ preventScroll: true });
                }}>
                <nav aria-label="Mobile">
                  <ul className={styles.mobileLinks}>
                    {links.map(([label, hash]) => (
                      <li key={hash}><DrawerClose asChild><a href={href(hash)}>{label}</a></DrawerClose></li>
                    ))}
                  </ul>
                </nav>
                <div className={styles.mobileTheme}>
                  <p>Appearance</p>
                  {themePicker}
                </div>
              </DrawerContent>
            </Drawer>
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
