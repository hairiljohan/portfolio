import { expect, test } from "@playwright/test";

for (const id of ["netswitch", "docksense"]) {
  test(`${id} cover animates on hover and focus, respecting reduced motion`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const card = page.locator(`article[data-project="${id}"]`);
    const image = card.locator("img");
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((el: HTMLImageElement) => el.decode());
    await expect(image).toHaveAttribute("src", `/projects/${id}/cover-pixel.webp`);
    const signal = card.locator('a[aria-hidden="true"] > span');
    await card.hover();
    await expect(signal).toHaveCSS("animation-duration", "1.1s");
    await expect(signal).toHaveCSS("animation-iteration-count", "1");
    await page.mouse.move(0, 0);
    await card.getByRole("link").focus();
    await expect(signal).toHaveCSS("animation-duration", "1.1s");
    await page.emulateMedia({ reducedMotion: "reduce" });
    await expect(signal).toHaveCSS("animation-name", "none");
  });
}
