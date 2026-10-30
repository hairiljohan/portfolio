import { test, expect } from "@playwright/test";
import { PROJECTS } from "../../src/data/projects";

for (const project of PROJECTS) test(`${project.title} home link plays the plane flight on arrival only once`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(project.link);
  await page.getByRole("link", { name: "Hairil Johan, home", exact: true }).click();
  await expect(page).toHaveURL(/\/#hero$/);
  const plane = page.getByRole("link", { name: "Hairil Johan, home", exact: true }).locator("span");
  await expect.poll(() => plane.evaluate(el => el.getAnimations().some(animation => animation.playState === "running"))).toBe(true);
  await expect(plane).toHaveCSS("transform", "none");
  await page.reload();
  await expect(plane).toBeAttached();
  expect(await plane.evaluate(el => el.getAnimations().length)).toBe(0);
});

test("keyboard home navigation replays the flight but a normal homepage visit does not", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/#hero");
  const home = page.getByRole("link", { name: "Hairil Johan, home", exact: true });
  await expect(home).toBeAttached();
  expect(await home.locator("span").evaluate(el => el.getAnimations().length)).toBe(0);
  await page.goto("/docksense.html");
  await home.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/#hero$/);
  await expect.poll(() => home.locator("span").evaluate(el => el.getAnimations().some(animation => animation.playState === "running"))).toBe(true);
});

test("touch home navigation respects reduced motion", async ({ browser }) => {
  const context = await browser.newContext({ hasTouch: true, viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.goto("/docksense.html");
  const home = page.getByRole("link", { name: "Hairil Johan, home", exact: true });
  await home.tap();
  await expect(page).toHaveURL(/\/#hero$/);
  await expect(home).toBeAttached();
  expect(await home.locator("span").evaluate(el => el.getAnimations().length)).toBe(0);
  await context.close();
});

test("home navigation survives unavailable session storage", async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(window, "sessionStorage", { get() { throw new Error("Storage unavailable"); } }));
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/docksense.html");
  await page.getByRole("link", { name: "Hairil Johan, home", exact: true }).click();
  await expect(page).toHaveURL(/\/#hero$/);
  await expect(page.getByRole("heading", { name: "Hairil Johan", exact: false, level: 1 })).toBeVisible();
  expect(errors).toEqual([]);
});
