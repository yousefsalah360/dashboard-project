/**
 * @fileoverview Pure utility functions
 *
 * Design Pattern: Utility Module (pure functions, zero side-effects)
 * Every function here is deterministic and independently testable.
 */

/**
 * Derive two-letter avatar initials from a full name.
 * @param {string} name
 * @returns {string}
 */
export const getInitials = (name = "") =>
  name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

/**
 * Return today's date as an ISO YYYY-MM-DD string.
 * @returns {string}
 */
export const todayISO = () => new Date().toISOString().slice(0, 10);

/**
 * Format a number with locale-aware thousands separators.
 * @param {number} n
 * @returns {string}
 */
export const formatNumber = (n) => Number(n).toLocaleString();

/**
 * Format a salary value as USD.
 * @param {number} n
 * @returns {string}
 */
export const formatSalary = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

/**
 * Build star-string representation of a rating out of 5.
 * @param {number} rating
 * @returns {string}
 */
export const starString = (rating) =>
  "★".repeat(Math.floor(rating)) + "☆".repeat(5 - Math.floor(rating));

/**
 * GPA to Tailwind colour class.
 * @param {number} gpa
 * @returns {string}
 */
export const gpaColor = (gpa) =>
  gpa >= 3.7 ? "text-emerald-400" : gpa >= 3.0 ? "text-amber-400" : "text-red-400";

/**
 * Filter an array of objects against a search string over specified keys.
 * @template T
 * @param {T[]} items
 * @param {string} query
 * @param {(keyof T)[]} keys
 * @returns {T[]}
 */
export const fuzzyFilter = (items, query, keys) => {
  const q = query.toLowerCase().trim();
  if (!q) return items;
  return items.filter((item) =>
    keys.some((k) => String(item[k] ?? "").toLowerCase().includes(q))
  );
};

/**
 * Generate a monotonically increasing numeric ID (client-side only).
 * @returns {number}
 */
export const nextId = () => Date.now();
