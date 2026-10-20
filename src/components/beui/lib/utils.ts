import { clsx, type ClassValue } from "clsx";

// CSS Modules need class composition, not Tailwind utility merging.
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
