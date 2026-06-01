import crypto from "node:crypto";

export function md5(s: string): string {
  return crypto.createHash("md5").update(s).digest("hex");
}

/**
 * Normalize a title for hashing-based dedupe.
 * Strips publisher suffixes (" - Fox News", " | The Federalist"),
 * lowercases, drops punctuation, collapses whitespace.
 */
export function normalizeTitleForHash(title: string): string {
  return title
    .replace(/\s+[-|–—]\s+[^-|–—]+$/u, "") // trailing " - Publisher"
    .toLowerCase()
    .replace(/['’"`]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function titleHash(title: string): string {
  return md5(normalizeTitleForHash(title));
}
