import { expect, test } from "@playwright/test";

test("RepoWatch showcase links to its own page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "View RepoWatch", exact: true }).click();
  await expect(page).toHaveURL(/repowatch.html$/);
  await expect(page.getByRole("heading", { name: "RepoWatch", exact: true })).toBeVisible();
  const cover = page.getByRole("img", { name: "Pixel-art repository nodes connected to one central monitoring dashboard", exact: true });
  await expect(cover).toHaveAttribute("src", "/projects/repowatch/cover-pixel.webp");
  await cover.evaluate((el: HTMLImageElement) => el.decode());
  for (const theme of ["Light", "Dark"] as const) {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.getByRole("group", { name: "Color theme" }).getByRole("button", { name: theme, exact: true }).click();
    const img = page.getByRole("img", { name: "RepoWatch dashboard with a repository sidebar, latest release, latest commit, and last-checked status", exact: true });
    await expect(img).toHaveAttribute("src", `/projects/repowatch/dashboard${theme === "Dark" ? "-dark" : ""}.webp`);
    await img.scrollIntoViewIfNeeded();
    await img.evaluate((el: HTMLImageElement) => el.decode());
    await page.getByRole("button", { name: "Open Adding a repository gallery", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Adding a repository", exact: true });
    await expect(dialog.getByRole("img")).toHaveCount(1);
    for (const screenshot of await dialog.getByRole("img").all()) {
      await expect(screenshot).toHaveAttribute("src", theme === "Dark" ? /-dark\.webp$/ : /add-repository\.webp$/);
      await screenshot.scrollIntoViewIfNeeded();
      await screenshot.evaluate((el: HTMLImageElement) => el.decode());
    }
    await page.keyboard.press("Escape");
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  await page.goto("/repowatch.html");
  await expect(page.getByRole("heading", { name: "RepoWatch", exact: true })).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://hairiljohan.me/repowatch.html");
});
