import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`theme colors fade together at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ colorScheme: "light", reducedMotion: "no-preference" });
    await page.goto("/");
    await expect(page.locator("body")).toHaveCSS("background-color", "rgb(250, 250, 249)");
    if (width === 390) await page.getByRole("button", { name: "Menu", exact: true }).click();
    const themes = page.getByRole("group", { name: "Color theme" }).filter({ visible: true });
    for (const [name, target] of [["Dark", "rgb(17, 19, 18)"], ["Light", "rgb(250, 250, 249)"]]) {
      const colors = await themes.getByRole("button", { name, exact: true }).evaluate(button => {
        const before = getComputedStyle(document.body).backgroundColor;
        (button as HTMLButtonElement).click();
        return new Promise<{ before: string; during: string; header: string }>(resolve => {
          const start = performance.now();
          const sample = () => {
            if (performance.now() - start < 100) { requestAnimationFrame(sample); return; }
            resolve({ before, during: getComputedStyle(document.body).backgroundColor,
              header: getComputedStyle(document.querySelector("header")!).backgroundColor });
          };
          requestAnimationFrame(sample);
        });
      });
      expect(colors.during).not.toBe(colors.before);
      expect(colors.during).not.toBe(target);
      expect(colors.header).toBe(colors.during);
      await expect(page.locator("body")).toHaveCSS("background-color", target);
    }
  });
}

test("reduced motion switches immediately and saved dark mode loads without a fade", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light", reducedMotion: "reduce" });
  await page.goto("/");
  const color = await page.getByRole("group", { name: "Color theme" }).getByRole("button", { name: "Dark", exact: true }).evaluate(button => {
    (button as HTMLButtonElement).click();
    return getComputedStyle(document.body).backgroundColor;
  });
  expect(color).toBe("rgb(17, 19, 18)");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.reload();
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(17, 19, 18)");
  expect(await page.locator("html").evaluate(el => el.getAnimations().length)).toBe(0);
});
