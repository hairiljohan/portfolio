/**
 * Utility functions for conditional class name handling
 */

/**
 * Combines multiple class names into a single string, filtering out falsy values
 * @param classes - Array of class names or conditional class names
 * @returns Combined class string
 */
export const cn = (
  ...classes: (string | false | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Returns hover classes only if the device supports hover
 * @param canHover - Whether the device supports hover interactions
 * @param hoverClasses - Classes to apply on hover
 * @returns Hover classes if supported, empty string otherwise
 */
export const hoverClass = (canHover: boolean, hoverClasses: string): string => {
  return canHover ? hoverClasses : "";
};
