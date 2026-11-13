import { expect, test } from "@playwright/test";

test("Tabula showcase links to its own page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View Tabula", exact: true }).click();
  await expect(page).toHaveURL(/tabula.html$/);
  await expect(page.getByRole("heading", { name: "Tabula", exact: true })).toBeVisible();
  for (const theme of ["Light", "Dark"] as const) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("group", { name: "Color theme" }).getByRole("button", { name: theme, exact: true }).click();
    const img = page.getByRole("img", { name: "Tabula start page in Safari with a search field and favourite website shortcuts", exact: true });
    await expect(img).toHaveAttribute("src", `/projects/tabula/start-page${theme === "Dark" ? "-dark" : ""}.webp`);
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((el: HTMLImageElement) => el.decode());
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await page.goto("/tabula.html");
  await expect(page.getByRole("heading", { name: "Tabula", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://hairiljohan.me/tabula.html");
});
