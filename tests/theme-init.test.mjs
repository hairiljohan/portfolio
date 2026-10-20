import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
const source = readFileSync(
  new URL("../public/theme-init.js", import.meta.url),
  "utf8",
);
function resolveTheme(stored, systemDark, blocked = false) {
  let isDark;
  const media = () => ({ matches: systemDark });
  runInNewContext(source, {
    localStorage: {
      getItem() {
        if (blocked) throw new Error("Storage blocked");
        return stored;
      },
    },
    window: { matchMedia: media },
    document: {
      documentElement: {
        classList: {
          toggle(_name, value) {
            isDark = value;
          },
        },
      },
    },
  });
  return isDark;
}
test("explicit preferences override system before first paint", () => {
  assert.equal(resolveTheme("dark", false), true);
  assert.equal(resolveTheme("light", true), false);
});
test("system preference works on first visit and with system selected", () => {
  for (const value of [null, "system"])
    for (const dark of [false, true])
      assert.equal(resolveTheme(value, dark), dark);
});
test("blocked storage falls back to system without aborting initialization", () => {
  assert.equal(resolveTheme(null, true, true), true);
  assert.equal(resolveTheme(null, false, true), false);
});
