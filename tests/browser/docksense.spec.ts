import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("DockSense replaces the showcase and keeps the old URL usable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View DockSense", exact: true }).click();
  await expect(page).toHaveURL(/docksense.html$/);
  await expect(page.getByRole("heading", { name: "DockSense", exact: true })).toBeVisible();
  await page.goto("/network-checker.html");
  await expect(page.getByRole("heading", { name: "DockSense", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://hairiljohan.me/docksense.html");
});

test("backlight demonstration remembers brightness, supports zero and optional shutoff", async ({ page }) => {
  await page.goto("/docksense.html");
  const result = page.getByRole("status");
  const slider = page.getByRole("slider");
  await expect(result).toContainText("Backlight 35%");
  await slider.fill("60");
  await page.getByRole("radio", { name: "Docked", exact: true }).check();
  await expect(result).toContainText("Backlight 0%");
  await expect(result).toContainText("60% remembered");
  await expect(slider).toBeDisabled();
  await page.getByRole("radio", { name: "Undocked", exact: true }).check();
  await expect(result).toContainText("Backlight 60%");
  await page.getByLabel("Turn off when docked", { exact: true }).uncheck();
  await page.getByRole("radio", { name: "Docked", exact: true }).check();
  await expect(result).toContainText("Backlight 60%");
  await page.getByRole("radio", { name: "Undocked", exact: true }).check();
  await slider.fill("0");
  await expect(result).toContainText("Backlight 0%");
});

test("DockSense media follows themes and setup screenshots are stacked", async ({ page }) => {
  await page.goto("/docksense.html");
  for (const theme of ["Light", "Dark"] as const) {
    await page.getByRole("group", { name: "Color theme" }).getByRole("button", { name: theme, exact: true }).click();
    const suffix = theme === "Dark" ? "-dark" : "";
    await expect(page.locator("main img").first()).toHaveAttribute("src", `/projects/docksense/menu${suffix}.webp`);
    await page.getByRole("button", { name: "Open USB setup gallery", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "USB setup", exact: true });
    const images = dialog.getByRole("img");
    await expect(images).toHaveCount(2);
    for (const img of await images.all()) {
      await img.evaluate((el: HTMLImageElement) => el.decode());
      await expect(img).toHaveAttribute("src", new RegExp(`${suffix}\\.webp$`));
    }
    const first = await images.nth(0).boundingBox();
    const second = await images.nth(1).boundingBox();
    expect(second!.y).toBeGreaterThan(first!.y + first!.height);
    await page.keyboard.press("Escape");
    expect((await new AxeBuilder({ page }).include("#docksense-demo").analyze()).violations).toEqual([]);
  }
});
