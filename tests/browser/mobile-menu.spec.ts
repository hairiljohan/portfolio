import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`mobile drawer navigation and dismissal (${reducedMotion})`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion });
    await page.goto("/");
    const trigger = page.getByRole("button", { name: "Menu", exact: true });
    const dialog = page.getByRole("dialog", { name: "Menu", exact: true });
    await trigger.click();
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close drawer" })).toBeFocused();
    for (const theme of ["Dark", "Light"]) {
      await dialog.getByRole("button", { name: theme, exact: true }).click();
      if (theme === "Dark") await expect(page.locator("html")).toHaveClass(/dark/);
      else await expect(page.locator("html")).not.toHaveClass(/dark/);
      await expect(dialog).toBeInViewport();
      // Audit the settled theme, not intermediate transition colors.
      await page.evaluate(async () => {
        await Promise.all(document.getAnimations().filter(a => a.effect?.getComputedTiming().iterations !== Infinity).map(a => a.finished.catch(() => {})));
      });
      expect((await new AxeBuilder({ page }).include('[role="dialog"]').analyze()).violations).toEqual([]);
      await page.screenshot({ path: test.info().outputPath(`menu-${theme}.png`) });
    }
    await dialog.getByRole("link", { name: "Work", exact: true }).click();
    await expect(dialog).toHaveCount(0);
    await expect(page).toHaveURL(/#showcase$/);
    await expect(page.locator("#showcase")).toBeInViewport();
    await expect.poll(() => page.locator("#showcase").evaluate(el => Math.round(el.getBoundingClientRect().top))).toBe(112);
    const position = await page.evaluate(() => scrollY);
    // Use the visible sticky trigger's coordinates; locator.click's automatic
    // scrollIntoView itself moves this sticky header in browser automation.
    const box = await trigger.boundingBox();
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await dialog.getByRole("button", { name: "Close drawer" }).click();
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
    expect(Math.abs(await page.evaluate(() => scrollY) - position)).toBeLessThan(3);
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.keyboard.press("Shift+Tab");
    await expect(dialog.getByRole("button", { name: "Light", exact: true })).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(dialog.getByRole("button", { name: "Close drawer" })).toBeFocused();
    await page.mouse.click(5, 400);
    await expect(dialog).toHaveCount(0);
    await page.mouse.click(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.setViewportSize({ width: 1024, height: 768 });
    await expect(dialog).toHaveCount(0);
    await expect(page.getByRole("navigation", { name: "Main" })).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test("touch menu links work from project pages", async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 360, height: 780 }, hasTouch: true, isMobile: true, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/network-checker.html");
  await page.getByRole("button", { name: "Menu", exact: true }).tap();
  await page.getByRole("dialog").getByRole("link", { name: "About", exact: true }).tap();
  await expect(page).toHaveURL(/\/#about$/);
  await expect(page.locator("#about")).toBeInViewport();
  await context.close();
});
