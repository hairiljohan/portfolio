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
        // Sample the actual CSS transition halfway through, even on a slow frame.
        const transition = document.documentElement.getAnimations().find(
          animation => animation instanceof CSSTransition && animation.transitionProperty === "--color-background",
        );
        if (!transition?.effect) throw new Error("Missing background colour transition");
        const duration = Number(transition.effect.getComputedTiming().duration);
        transition.pause();
        transition.currentTime = duration / 2;
        const during = getComputedStyle(document.body).backgroundColor;
        const header = getComputedStyle(document.querySelector("header")!).backgroundColor;
        transition.play();
        return { before, during, header };
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

test("changing the theme updates an already open project tab", async ({ page, context }) => {
  const project = await context.newPage();
  await project.emulateMedia({ colorScheme: "light" });
  await project.goto("/tabula.html");
  const projectThemes = project.getByRole("group", { name: "Color theme" });
  await expect(projectThemes.getByRole("button", { name: "System" })).toHaveAttribute("aria-pressed", "true");
  await expect(project.locator("body")).toHaveCSS("background-color", "rgb(250, 250, 249)");

  await page.goto("/");
  await page.getByRole("group", { name: "Color theme" }).getByRole("button", { name: "Dark" }).click();

  await expect(projectThemes.getByRole("button", { name: "Dark" })).toHaveAttribute("aria-pressed", "true");
  await expect(project.locator("body")).toHaveCSS("background-color", "rgb(17, 19, 18)");
});
