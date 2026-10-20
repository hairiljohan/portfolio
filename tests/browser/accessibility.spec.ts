import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const theme of ["light", "dark"] as const)
  test(`accessible pages in ${theme} theme`, async ({ page }) => {
    await page.emulateMedia({ colorScheme: theme });
    for (const route of [
      "/",
      "/launch-console.html",
      "/private-local-ai.html",
      "/network-checker.html",
      "/uninstall-cleanup.html",
      "/container-update-helper.html",
    ]) {
      await page.goto(route);
      const results = await new AxeBuilder({ page })
        .exclude("iframe")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(
        results.violations,
        `${route}: ${JSON.stringify(results.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })))}`,
      ).toEqual([]);
    }
  });
