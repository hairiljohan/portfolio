import { expect, test } from "@playwright/test";

test("TheaterView replaces the showcase and retains the legacy URL", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View TheaterView", exact: true }).click();
  await expect(page).toHaveURL(/theaterview.html$/);
  await expect(page.getByRole("heading", { name: "TheaterView", exact: true })).toBeVisible();
  const video = page.getByLabel("TheaterView YouTube walkthrough");
  await expect(video).toHaveAttribute("src", "/projects/theaterview/demo.mp4");
  await expect(page.getByText("Video walkthrough coming soon")).toHaveCount(0);
  await video.scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.readyState)).toBeGreaterThanOrEqual(1);
  await video.evaluate(async (el: HTMLVideoElement) => { el.muted = true; await el.play(); });
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  await video.evaluate((el: HTMLVideoElement) => el.pause());
  for (const theme of ["Light", "Dark"] as const) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("group", { name: "Color theme" }).getByRole("button", { name: theme, exact: true }).click();
    const img = page.getByRole("img", { name: "TheaterView settings with Enable TheaterView, Auto highest quality, Auto Public, and Auto PiP on scroll switched on", exact: true });
    await expect(img).toHaveAttribute("src", `/projects/theaterview/settings${theme === "Dark" ? "-dark" : ""}.png`);
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((el: HTMLImageElement) => el.decode());
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await page.goto("/uninstall-cleanup.html");
  await expect(page).toHaveURL(/\/theaterview\.html$/);
  await expect(page.getByRole("heading", { name: "TheaterView", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://hairiljohan.me/theaterview.html");
});
