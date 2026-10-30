import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("NetSwitch replaces the old showcase and preserves its old URL", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View NetSwitch", exact: true }).click();
  await expect(page).toHaveURL(/netswitch.html$/);
  await expect(page.getByRole("heading", { name: "NetSwitch", exact: true })).toBeVisible();
  await page.goto("/private-local-ai.html");
  await expect(page.getByRole("heading", { name: "NetSwitch", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://hairiljohan.me/netswitch.html");
});

test("network demo separates DNS, trusted networks, and app overrides", async ({ page }) => {
  await page.goto("/netswitch.html");
  const result = page.getByRole("status");
  await expect(result).toContainText("Home DNS");
  await expect(result).toContainText("Not managed");
  await page.getByLabel("Manage Tailscale", { exact: true }).check();
  await expect(result).toContainText("Disconnected");
  await page.getByRole("radio", { name: "Away", exact: true }).check();
  await expect(result).toContainText("Public DNS");
  await expect(result).toContainText("Connected");
  await page.getByRole("radio", { name: "Trusted network", exact: true }).check();
  await expect(result).toContainText("Public DNS");
  await expect(result).toContainText("Disconnected");
  await page.getByRole("radio", { name: "Home", exact: true }).check();
  await page.getByLabel("Whitelisted app running", { exact: true }).check();
  await expect(result).toContainText("Public DNS");
  await expect(result).toContainText("Disconnected");
  await page.getByLabel("Whitelisted app running", { exact: true }).uncheck();
  await expect(result).toContainText("Home DNS");
  await page.getByRole("radio", { name: "Unidentified Wi-Fi", exact: true }).check();
  await expect(result).toContainText("DNS unchanged");
  await expect(result).toContainText("Unchanged");
  await page.getByLabel("Whitelisted app running", { exact: true }).check();
  await expect(result).toContainText("Public DNS");
});

test("demo is keyboard accessible in both themes and reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    await page.goto("/netswitch.html");
    const home = page.getByRole("radio", { name: "Home", exact: true });
    await home.focus();
    await page.keyboard.press("ArrowRight");
    await expect(page.getByRole("radio", { name: "Away", exact: true })).toBeChecked();
    await expect(page.locator("[data-network-flow]")).toHaveCSS("animation-name", "none");
    const results = await new AxeBuilder({ page }).include("#netswitch-demo").analyze();
    expect(results.violations).toEqual([]);
  }
});

test("screenshots follow explicit and system themes across card, page, and gallery", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/netswitch.html");
  const hero = page.locator('main img').first();
  const themes = page.getByRole("group", { name: "Color theme" });
  await themes.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(hero).toHaveAttribute("src", "/projects/netswitch/dns-profiles-dark.webp");
  await page.reload();
  await expect(hero).toHaveAttribute("src", "/projects/netswitch/dns-profiles-dark.webp");
  const menu = page.getByRole("img", { name: /^NetSwitch menu showing/ });
  await expect(menu).toHaveAttribute("src", "/projects/netswitch/menu-dark.webp");
  await expect(menu).toHaveAttribute("width", "576");
  await page.getByRole("button", { name: "Open Networks and Tailscale gallery" }).click();
  const dialog = page.getByRole("dialog", { name: "Networks and Tailscale", exact: true });
  for (const img of await dialog.getByRole("img").all()) {
    await expect(img).toHaveAttribute("src", /-dark.webp$/);
    await img.evaluate((el: HTMLImageElement) => el.decode());
  }
  await page.keyboard.press("Escape");
  await themes.getByRole("button", { name: "System", exact: true }).click();
  await expect(hero).toHaveAttribute("src", "/projects/netswitch/dns-profiles.webp");
  await page.getByRole("button", { name: "Open Networks and Tailscale gallery" }).click();
  await page.emulateMedia({ colorScheme: "dark" });
  for (const img of await dialog.getByRole("img").all()) {
    await expect(img).toHaveAttribute("src", /-dark.webp$/);
  }
  await page.keyboard.press("Escape");
  await themes.getByRole("button", { name: "Light", exact: true }).click();
  await expect(hero).toHaveAttribute("src", "/projects/netswitch/dns-profiles.webp");
  await page.goto("/");
  const card = page.locator('a[href="/netswitch.html"] img');
  await expect(card).toHaveAttribute("src", "/projects/netswitch/cover-pixel.webp");
  await themes.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(card).toHaveAttribute("src", "/projects/netswitch/cover-pixel.webp");
  await card.scrollIntoViewIfNeeded();
  await card.evaluate((el: HTMLImageElement) => el.decode());
});
