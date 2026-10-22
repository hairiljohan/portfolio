import { test, expect } from "@playwright/test";

test("carousel arrows show keyboard and hover tooltips without changing navigation", async ({ page }) => {
  await page.goto("/#showcase");
  const carousel = page.getByRole("region", { name: "More projects" });
  const next = carousel.getByRole("button", { name: "Next projects", exact: true });
  await next.hover();
  await expect(page.getByRole("tooltip")).toHaveAccessibleName("Next projects");
  await page.keyboard.press("Escape");
  await expect(page.getByRole("tooltip")).toBeHidden();
  await page.mouse.move(0, 0);
  await next.focus();
  await expect(page.getByRole("tooltip")).toHaveAccessibleName("Next projects");
  await page.keyboard.press("Enter");
  await expect(carousel.getByRole("button", { name: "Previous projects", exact: true })).toBeEnabled();
});

test("hero CTA and simple project links preserve navigation and fit narrow cards", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto("/");
  const cta = page.getByRole("link", { name: "View projects", exact: true });
  await cta.click();
  await expect(page).toHaveURL(/#showcase$/);
  for (const link of await page.locator("#showcase article").getByRole("link", { name: /^View / }).all()) {
    await link.focus();
    const bounds = await link.evaluate(el => ({ link: el.getBoundingClientRect().width, card: el.closest("article")!.getBoundingClientRect().width, overflow: el.scrollWidth - el.clientWidth }));
    expect(bounds.link).toBeLessThanOrEqual(bounds.card + 1);
    expect(bounds.overflow).toBeLessThanOrEqual(1);
    await expect(link).toHaveClass("text-link");
    await expect(link).toHaveAttribute("href", /\.html$/);
  }
  await expect(page.getByRole("heading", { name: "A little about me.", level: 2 })).toHaveAttribute("id", "about-title");
  await expect(page.locator("#about-title > span").first()).toHaveCSS("opacity", "1");
});

test("title reveals once and CTA expands on hover in both themes", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const theme of ["light", "dark"] as const) {
    await page.emulateMedia({ colorScheme: theme });
    await page.goto("/");
    const cta = page.getByRole("link", { name: "View projects", exact: true });
    const label = cta.locator(":scope > span").last();
    await cta.hover();
    await expect(label).toHaveCSS("opacity", "0");
    await expect.poll(() => cta.locator(":scope > span").first().evaluate(el => el.getBoundingClientRect().width)).toBeGreaterThan(200);
    await page.mouse.move(0, 0);
    await expect(label).toHaveCSS("opacity", "1");
    await cta.focus();
    await expect(label).toHaveCSS("opacity", "0");
    const title = page.locator("#skills-title");
    await title.scrollIntoViewIfNeeded();
    await expect(title.locator("span").last()).toHaveCSS("opacity", "1");
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await expect(title.locator("span").first()).toHaveCSS("opacity", "1");
    await page.locator("#showcase").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath(`${theme}-projects.png`) });
  }
});

test("touch navigation does not require hover or leave tooltips open", async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 }, reducedMotion: "no-preference" });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("link", { name: "View projects", exact: true }).tap();
  await expect(page).toHaveURL(/#showcase$/);
  await page.getByRole("button", { name: "Next projects", exact: true }).tap();
  await expect(page.getByRole("tooltip")).toBeHidden();
  await page.getByRole("link", { name: "View Launch Console", exact: true }).tap();
  await expect(page).toHaveURL(/launch-console.html$/);
  await context.close();
});
