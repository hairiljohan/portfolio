import { readFile, writeFile } from "node:fs/promises";
import { chromium } from "@playwright/test";

// Run from the repository root: node scripts/generate-favicons.mjs
// The header mask and every favicon share this exact paper-plane geometry.
const mark = (await readFile("public/paper-plane.svg", "utf8"))
  .replace(/<svg[^>]*>/, "").replace("</svg>", "").trim();
const source = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <style>
    .tile { fill: #fafaf9; }
    .plane { fill: #073769; }
    @media (prefers-color-scheme: dark) {
      .tile { fill: #111312; }
      .plane { fill: #c5006a; }
    }
  </style>
  <rect class="tile" width="64" height="64" rx="14"/>
  <g class="plane">${mark}</g>
</svg>\n`;
await writeFile("public/favicon.svg", source);
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
