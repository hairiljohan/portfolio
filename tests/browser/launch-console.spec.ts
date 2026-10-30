import { expect, test } from "@playwright/test";

test("updated standalone console loads minified assets and responds to commands", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/legacy/landingpage/index.html");
  await expect(page.locator('script[src="./main.min.js"]')).toHaveCount(1);
  await expect(page.locator('link[rel="stylesheet"]')).toHaveAttribute("href", "./styles.min.css");
  await expect(page.locator("#console-root")).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "help", exact: true }).click();
  await expect(page.locator("#output")).toContainText("[help] commands:");
  await page.getByLabel("Command line", { exact: true }).fill("help");
  await page.getByLabel("Command line", { exact: true }).press("Enter");
  await expect(page.getByLabel("Command line", { exact: true })).toHaveValue("");
  await page.locator("#themeToggle").click();
  await expect(page.locator("#console-root")).toHaveAttribute("data-theme", "dark");
  await page.reload();
  await expect(page.locator("#console-root")).toHaveAttribute("data-theme", "dark");
  await page.locator("#themeToggle").click();
  await expect(page.locator("#console-root")).toHaveAttribute("data-theme", "light");
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
  }
  expect(errors).toEqual([]);
});

test("updated console works in the portfolio iframe", async ({ page }) => {
  await page.goto("/launch-console.html");
  await page.locator("iframe").scrollIntoViewIfNeeded();
  const demo = page.frameLocator("iframe");
  await demo.getByRole("button", { name: "help", exact: true }).click();
  await expect(demo.locator("#output")).toContainText("[help] commands:");
  await demo.getByLabel("Command line", { exact: true }).fill("/nuke");
  await demo.getByLabel("Command line", { exact: true }).press("Enter");
  await expect(demo.locator("#output")).toContainText("/nuke blocked: safety guard is closed.");
  await demo.getByLabel("Command line", { exact: true }).fill("/open");
  await demo.getByLabel("Command line", { exact: true }).press("Enter");
  await demo.getByLabel("Command line", { exact: true }).fill("/nuke");
  await demo.getByLabel("Command line", { exact: true }).press("Enter");
  await expect(demo.getByRole("dialog", { name: "CONFIRM LAUNCH" })).toBeVisible();
  await demo.getByRole("button", { name: "ABORT", exact: true }).click();
  await expect(demo.getByRole("dialog", { name: "CONFIRM LAUNCH" })).toBeHidden();
});
