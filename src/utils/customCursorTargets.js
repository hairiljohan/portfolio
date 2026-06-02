const NATIVE_CURSOR_SELECTOR =
  "input, textarea, select, [contenteditable], [data-native-cursor]";
const INTERACTIVE_CURSOR_SELECTOR =
  "a, button, summary, [data-custom-cursor='interactive']";

/**
 * @param {EventTarget | null} target
 * @returns {"default" | "interactive" | "native"}
 */
export const getCustomCursorTargetState = (target) => {
  if (
    !target ||
    typeof target !== "object" ||
    typeof target.closest !== "function" ||
    typeof target.getAttribute !== "function"
  ) {
    return "default";
  }

  if (target.closest(NATIVE_CURSOR_SELECTOR)) return "native";

  const role = target.getAttribute("role");
  const tabIndex = target.getAttribute("tabindex");
  if (
    role === "button" ||
    role === "link" ||
    (tabIndex !== null && tabIndex !== "-1") ||
    target.closest(INTERACTIVE_CURSOR_SELECTOR)
  ) {
    return "interactive";
  }

  return "default";
};
