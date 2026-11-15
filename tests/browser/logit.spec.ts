import { expect, test } from "@playwright/test";

test("LogIt showcase links to its own page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View LogIt", exact: true }).click();
  await expect(page).toHaveURL(/logit.html$/);
  await expect(page.getByRole("heading", { name: "LogIt", exact: true })).toBeVisible();
  for (const theme of ["Light", "Dark"] as const) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("group", { name: "Color theme" }).getByRole("button", { name: theme, exact: true }).click();
    const img = page.getByRole("img", { name: "LogIt Open at Login page listing startup apps, running indicators, and batch quit and launch controls", exact: true });
    await expect(img).toHaveAttribute("src", `/projects/logit/login-items${theme === "Dark" ? "-dark" : ""}.webp`);
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((el: HTMLImageElement) => el.decode());
    await page.getByRole("button", { name: "Open Blacklist and settings gallery", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Blacklist and settings", exact: true });
    await expect(dialog.getByRole("img")).toHaveCount(2);
    for (const screenshot of await dialog.getByRole("img").all()) {
      await expect(screenshot).toHaveAttribute("src", theme === "Dark" ? /-dark\.webp$/ : /(?:blacklist|settings)\.webp$/);
      await screenshot.scrollIntoViewIfNeeded();
      await screenshot.evaluate((el: HTMLImageElement) => el.decode());
    }
    await page.keyboard.press("Escape");
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await page.goto("/logit.html");
  await expect(page.getByRole("heading", { name: "LogIt", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://hairiljohan.me/logit.html");
});
