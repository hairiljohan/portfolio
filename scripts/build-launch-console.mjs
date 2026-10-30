import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { minify } from "terser";

const require = createRequire(import.meta.url);
const source = new URL("../demos/launch-console/", import.meta.url);
const output = new URL("../public/legacy/landingpage/", import.meta.url);
const [html, javascript, css] = await Promise.all(
  ["index.html", "main.js", "styles.css"].map((name) => readFile(new URL(name, source), "utf8")),
);
const result = await minify(javascript, { compress: true, mangle: true });
if (!result.code) throw new Error("Launch Console JavaScript minification produced no output");
const minifiedCss = execFileSync(process.execPath, [
  require.resolve("csso-cli/bin/csso"),
  "--input", fileURLToPath(new URL("styles.css", source)),
  "--comments", "none",
], { encoding: "utf8" });
await mkdir(output, { recursive: true });
await Promise.all([
  writeFile(new URL("main.min.js", output), result.code),
  writeFile(new URL("styles.min.css", output), minifiedCss),
  writeFile(new URL("index.html", output), html.replaceAll("./main.js", "./main.min.js").replaceAll("./styles.css", "./styles.min.css")),
  copyFile(new URL("favicon.svg", source), new URL("favicon.svg", output)),
]);
for (const [name, before, after] of [["JavaScript", javascript, result.code], ["CSS", css, minifiedCss]]) {
  const original = Buffer.byteLength(before);
  const minified = Buffer.byteLength(after);
  console.log(`${name}: ${original} → ${minified} bytes (${Math.round((1 - minified / original) * 100)}% smaller)`);
}
