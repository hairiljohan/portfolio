import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import { getCustomCursorTargetState } from "../src/utils/customCursorTargets.js";

const element = (tagName, attributes = {}) => ({
  tagName,
  hasAttribute: (name) => Object.hasOwn(attributes, name),
  getAttribute: (name) => attributes[name] ?? null,
  closest: (selector) => {
    const selectors = selector.split(",").map((part) => part.trim());
    return selectors.some((part) => {
      if (part === tagName.toLowerCase()) return true;
      if (part.startsWith("[") && part.endsWith("]")) {
        return Object.hasOwn(attributes, part.slice(1, -1));
      }
      return false;
    })
      ? true
      : null;
  },
});

test("marks command surfaces as interactive", () => {
  assert.equal(getCustomCursorTargetState(element("button")), "interactive");
  assert.equal(getCustomCursorTargetState(element("a")), "interactive");
  assert.equal(
    getCustomCursorTargetState(element("div", { role: "button" })),
    "interactive",
  );
});

test("marks focusable reveal surfaces as interactive", () => {
  assert.equal(
    getCustomCursorTargetState(element("div", { tabindex: "0" })),
    "interactive",
  );
});

test("keeps native cursor behavior for text editing surfaces", () => {
  assert.equal(getCustomCursorTargetState(element("input")), "native");
  assert.equal(getCustomCursorTargetState(element("textarea")), "native");
  assert.equal(
    getCustomCursorTargetState(element("div", { contenteditable: "true" })),
    "native",
  );
});

test("allows local opt-out with data-native-cursor", () => {
  assert.equal(
    getCustomCursorTargetState(element("div", { "data-native-cursor": "" })),
    "native",
  );
});

test("custom cursor CSS suppresses native cursor across app surfaces", async () => {
  const css = await readFile(new URL("../src/index.css", import.meta.url), {
    encoding: "utf8",
  });

  assert.match(css, /html\.custom-cursor-enabled \*/);
  assert.match(css, /html\.custom-cursor-enabled \.custom-cursor/);
});

test("showcase destination pages mount the custom cursor", async () => {
  const pageFiles = [
    "container-update-helper.tsx",
    "launch-console.tsx",
    "network-checker.tsx",
    "private-local-ai.tsx",
    "uninstall-cleanup.tsx",
  ];

  for (const pageFile of pageFiles) {
    const source = await readFile(
      new URL(`../src/pages/${pageFile}`, import.meta.url),
      { encoding: "utf8" },
    );

    assert.match(source, /CustomCursor/);
    assert.match(source, /<CustomCursor \/>/);
  }
});
