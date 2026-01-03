import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx.
 * This resolves conflicts (e.g., if you have 'bg-red-500' and 'bg-blue-500', it keeps the last one).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}