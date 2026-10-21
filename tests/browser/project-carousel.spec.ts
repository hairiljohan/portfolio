import { test, expect } from "@playwright/test";

for (const width of [390, 1440]) {
  test(`project carousel layout and controls at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/#showcase");
    const carousel = page.getByRole("region", { name: "More projects" });
    const track = carousel.getByRole("group", { name: "Project cards", exact: true });
    const cards = track.locator("[data-project-slide]");
    await expect(cards).toHaveCount(4);
    await expect(page.locator("#showcase > article h3")).toHaveText("Launch Console");
    await carousel.scrollIntoViewIfNeeded();
    const geometry = await track.evaluate(el => ({ width: el.clientWidth, card: el.children[0].getBoundingClientRect().width, overflow: el.scrollWidth > el.clientWidth }));
    expect(geometry.overflow).toBe(true);
    expect(geometry.card / geometry.width).toBeCloseTo(width < 700 ? 0.88 : 0.49, 1);
    const previous = carousel.getByRole("button", { name: "Previous projects" });
    const next = carousel.getByRole("button", { name: "Next projects" });
    await expect(previous).toBeDisabled();
    await next.click();
    await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(100);
    await expect(previous).toBeEnabled();
    await track.focus();
    await page.keyboard.press("End");
    await expect(next).toBeDisabled();
    await expect(cards.last()).toBeInViewport({ ratio: 0.9 });
    await page.keyboard.press("Home");
    await expect(previous).toBeDisabled();
    await page.keyboard.press("ArrowRight");
    await expect(previous).toBeEnabled();
    // Focusing a link in an off-screen card brings its whole card into view.
    await cards.last().getByRole("link", { name: "View Container Update Helper" }).focus();
    await expect(cards.last()).toBeInViewport({ ratio: 0.9 });
    await cards.last().getByRole("link", { name: "View Container Update Helper" }).click();
    await expect(page).toHaveURL(/container-update-helper.html$/);
    await page.goBack();
    await expect(page.locator("#showcase")).toBeInViewport();
  });
}

test("carousel supports native scrolling, full motion, both themes and resizing", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  const carousel = page.getByRole("region", { name: "More projects" });
  const track = carousel.getByRole("group", { name: "Project cards", exact: true });
  await carousel.scrollIntoViewIfNeeded();
  await carousel.getByRole("button", { name: "Next projects" }).click();
  await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(400);
  for (const colorScheme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme });
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      await track.focus();
      await page.keyboard.press("Home");
      await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeLessThan(2);
      await track.hover();
      await page.mouse.wheel(700, 0);
      await expect.poll(() => track.evaluate(el => el.scrollLeft)).toBeGreaterThan(100);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
      await expect.poll(() => track.evaluate(el => {
        const left = el.getBoundingClientRect().left;
        return Math.min(...Array.from(el.children).map(slide => Math.abs(slide.getBoundingClientRect().left - left)), Math.abs(el.scrollWidth - el.clientWidth - el.scrollLeft));
      })).toBeLessThan(2);
      await page.screenshot({ path: test.info().outputPath(`carousel-${colorScheme}-${width}.png`) });
    }
  }
  expect(errors).toEqual([]);
});
