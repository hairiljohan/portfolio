import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("a homepage reload starts at the introduction after scrolling", async ({ page }) => {
  await page.goto("/");
  await page.locator("#about").scrollIntoViewIfNeeded();
  expect(await page.evaluate(() => scrollY)).toBeGreaterThan(0);
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).toBeInViewport();
  await expect.poll(() => page.evaluate(() => scrollY)).toBe(0);
});

test("navigation highlight follows keyboard focus without changing link behavior", async ({
  page,
}) => {
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "Main", exact: true });
  const work = nav.getByRole("link", { name: "Work", exact: true });
  const about = nav.getByRole("link", { name: "About", exact: true });
  await work.focus();
  await expect(
    work.locator("..").locator("..").locator("[data-beui-highlight]"),
  ).toBeVisible();
  await about.focus();
  await expect(
    about.locator("..").locator("..").locator("[data-beui-highlight]"),
  ).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator("#about")).toBeInViewport();
});

test("hero name is immediately readable with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const heading = page.getByRole("heading", { level: 1 });
  await expect(heading).toHaveText("Hairil Johan.");
  await expect(heading).toBeVisible();
  for (const word of await heading.locator("span").all()) {
    await expect(word).toHaveCSS("opacity", "1");
    await expect(word).toHaveCSS("transform", "none");
  }
});

for (const reducedMotion of ["reduce", "no-preference"] as const) {
  test(`screenshot folders open, trap focus, and close with ${reducedMotion} motion`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion });
    for (const [route, titles] of [
      ["/private-local-ai.html", ["Everyday access", "Routing and DNS"]],
      [
        "/container-update-helper.html",
        ["Open WebUI updates", "SearXNG updates"],
      ],
    ] as const) {
      await page.goto(route);
      for (const title of titles) {
        const trigger = page.getByRole("button", {
          name: `Open ${title} gallery`,
          exact: true,
        });
        await trigger.focus();
        await page.keyboard.press("Enter");
        const dialog = page.getByRole("dialog", { name: title, exact: true });
        const close = dialog.getByRole("button", {
          name: `Close ${title}`,
          exact: true,
        });
        await expect(dialog).toBeVisible();
        await expect(close).toBeFocused();
        await expect(page.locator("#root")).toHaveJSProperty("inert", true);
        await expect(dialog.getByRole("img")).toHaveCount(2);
        for (const img of await dialog.getByRole("img").all()) {
          await img.evaluate((element: HTMLImageElement) => element.decode());
          expect(
            await img.evaluate(
              (element: HTMLImageElement) => element.naturalWidth,
            ),
          ).toBeGreaterThan(0);
        }
        await page.keyboard.press("Tab");
        await expect(close).toBeFocused();
        await page.keyboard.press("Shift+Tab");
        await expect(close).toBeFocused();
        await page.keyboard.press("Escape");
        await expect(dialog).toHaveCount(0);
        await expect(trigger).toBeFocused();
        await expect(page.locator("#root")).toHaveJSProperty("inert", false);
      }
    }
  });
}

test.describe("touch galleries", () => {
  test.use({ hasTouch: true, viewport: { width: 360, height: 800 } });
  test("folder gallery supports mobile touch and both themes without overflow", async ({
    page,
  }) => {
    for (const theme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto("/private-local-ai.html");
      const trigger = page.getByRole("button", {
        name: "Open Everyday access gallery",
        exact: true,
      });
      await trigger.tap();
      const dialog = page.getByRole("dialog", {
        name: "Everyday access",
        exact: true,
      });
      await expect(dialog).toBeVisible();
      expect(
        await dialog.evaluate(
          (element) => element.scrollWidth <= element.clientWidth,
        ),
      ).toBeTruthy();
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
      await dialog
        .getByRole("button", { name: "Close Everyday access", exact: true })
        .tap();
      await expect(dialog).toHaveCount(0);
      await expect(trigger).toBeFocused();
    }
  });
});
