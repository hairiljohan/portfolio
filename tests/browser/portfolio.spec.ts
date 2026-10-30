import { test, expect } from "@playwright/test";
const routes = [
  "/",
  "/launch-console.html",
  "/netswitch.html",
  "/docksense.html",
  "/theaterview.html",
  "/container-update-helper.html",
];
test("homepage exposes five project links and preserves section anchors", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "View projects", exact: true }),
  ).toHaveAttribute("href", "#showcase");
  await expect(page.locator("#showcase article")).toHaveCount(5);
  for (const id of [
    "hero",
    "showcase",
    "about",
    "skills",
    "hobbies",
    "contact",
  ])
    await expect(page.locator("#" + id)).toBeAttached();
  await page
    .getByRole("link", { name: "View Launch Console", exact: true })
    .click();
  await expect(page).toHaveURL(/launch-console.html/);
  await page
    .getByRole("link", { name: "Back to projects", exact: true })
    .click();
  await expect(page).toHaveURL(/#showcase$/);
});
test("mobile bottom sheet closes with Escape and restores focus", async ({
  page, browserName,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Menu", exact: true, includeHidden: true });
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("navigation", { name: "Main" })).toBeHidden();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  // macOS WebKit uses Option+Tab to include links in keyboard navigation.
  await page.keyboard.press(browserName === "webkit" && process.platform === "darwin" ? "Alt+Tab" : "Tab");
  await expect(
    page
      .getByRole("navigation", { name: "Mobile" })
      .getByRole("link", { name: "About", exact: true }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await trigger.click();
  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
});
test("theme selection persists across detail pages and follows system", async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  const themes = page.getByRole("group", { name: "Color theme" });
  await themes.getByRole("button", { name: "Dark", exact: true }).click();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.goto("/docksense.html");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await expect(themes.getByRole("button", { name: "Dark", exact: true })).toHaveAttribute("aria-pressed", "true");
  await themes.getByRole("button", { name: "System", exact: true }).click();
  await expect(page.locator("html")).not.toHaveClass(/dark/);
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.reload();
  await expect(page.locator("html")).toHaveClass(/dark/);
});
test("theme segments support keyboard selection and a single tab stop", async ({ page }) => {
  await page.goto("/");
  const themes = page.getByRole("group", { name: "Color theme" });
  const system = themes.getByRole("button", { name: "System", exact: true });
  const light = themes.getByRole("button", { name: "Light", exact: true });
  const dark = themes.getByRole("button", { name: "Dark", exact: true });
  await system.focus();
  await page.keyboard.press("ArrowRight");
  await expect(light).toBeFocused();
  await expect(light).toHaveAttribute("aria-pressed", "true");
  await expect(system).toHaveAttribute("tabindex", "-1");
  await page.keyboard.press("End");
  await expect(dark).toBeFocused();
  await expect(page.locator("html")).toHaveClass(/dark/);
  await page.keyboard.press("Home");
  await expect(system).toBeFocused();
  await expect(system).toHaveAttribute("aria-pressed", "true");
});
for (const route of routes)
  test(`direct load and responsive layout ${route}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    for (const theme of ["light", "dark"] as const) {
      await page.emulateMedia({ colorScheme: theme });
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
      for (const width of [360, 390, 768, 1024, 1440, 844]) {
        await page.setViewportSize({
          width,
          height: width === 844 ? 390 : 900,
        });
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
          `${theme} ${width}`,
        ).toBeTruthy();
      }
    }
    expect(errors).toEqual([]);
  });
test("legacy anchors work on direct load and browser back", async ({
  page,
}) => {
  for (const id of [
    "hero",
    "showcase",
    "about",
    "skills",
    "hobbies",
    "contact",
  ]) {
    await page.goto("/#" + id);
    const target = page.locator("#" + id);
    await expect(target).toBeInViewport();
  }
  await page.goto("/#showcase");
  await page
    .getByRole("link", { name: "View DockSense", exact: true })
    .click();
  await page.goBack();
  await expect(page).toHaveURL(/#showcase$/);
  await expect(page.locator("#showcase")).toBeInViewport();
});
test("theme initializes before React and handles unavailable storage", async ({
  browser,
}) => {
  const context = await browser.newContext({ colorScheme: "light" });
  const page = await context.newPage();
  await page.goto("/");
  await page.getByRole("group", { name: "Color theme" }).getByRole("button", { name: "Dark", exact: true }).click();
  await page.route("**/*.tsx", (route) => route.abort());
  await page.goto("/docksense.html");
  await expect(page.locator("html")).toHaveClass(/dark/);
  await context.close();
  const blocked = await browser.newContext({ colorScheme: "dark" });
  await blocked.addInitScript(() =>
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage unavailable");
      },
    }),
  );
  const p = await blocked.newPage();
  await p.goto("/");
  await expect(p.locator("html")).toHaveClass(/dark/);
  await p.getByRole("group", { name: "Color theme" }).getByRole("button", { name: "Light", exact: true }).click();
  await expect(p.locator("html")).not.toHaveClass(/dark/);
  await blocked.close();
});
test("Launch Console demonstration accepts a command", async ({ page }) => {
  await page.goto("/launch-console.html");
  await page.locator("iframe").scrollIntoViewIfNeeded();
  const demo = page.frameLocator("iframe");
  await demo.getByRole("button", { name: "help", exact: true }).click();
  await expect(demo.locator("#output")).toContainText(/help|commands/i);
});
test("text stays usable at 200 percent scale and motion is reduced", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const route of routes) {
    await page.goto(route);
    await page.evaluate(() => {
      document.documentElement.style.zoom = "2";
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
    await expect(page.locator("h1")).toBeVisible();
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe("auto");
  }
});

test("all portfolio images load after scrolling", async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    for (const image of await page.locator("img").all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate((element: HTMLImageElement) => element.decode());
      expect(
        await image.evaluate(
          (element: HTMLImageElement) => element.naturalWidth,
        ),
      ).toBeGreaterThan(0);
    }
  }
});
