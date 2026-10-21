import { readFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

// Run from the repository root: node scripts/generate-favicons.mjs
const source = await readFile("public/favicon.svg", "utf8");
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ colorScheme: "light", deviceScaleFactor: 1 });
  for (const [size, file] of [[16, "favicon-16x16.png"], [32, "favicon-32x32.png"], [180, "apple-touch-icon.png"]]) {
    await page.setViewportSize({ width: size, height: size });
    // iOS applies its own corner mask to a full-bleed touch icon.
    const svg = size === 180 ? source.replace('rx="14"', 'rx="0"') : source;
    await page.setContent(`<style>html,body{margin:0;background:transparent}svg{display:block;width:100vw;height:100vh}</style>${svg}`);
    await page.screenshot({ path: `public/${file}`, omitBackground: true });
  }
} finally {
  await browser.close();
}
