/**
 * URL canonicalization — strip tracking params, lowercase host, etc.
 * Keep this minimal and conservative; we'd rather under-canonicalize than
 * accidentally collide two distinct articles.
 */

const TRACKING_PARAM_PATTERNS: RegExp[] = [
  /^utm_/i,
  /^fbclid$/i,
  /^gclid$/i,
  /^mc_/i,
  /^ref$/i,
  /^ref_src$/i,
  /^_hsenc$/i,
  /^_hsmi$/i,
  /^hsCtaTracking$/i,
  /^ck_subscriber_id$/i,
  /^cmpid$/i,
  /^icid$/i,
  /^vgo_ee$/i,
];

export function canonicalizeUrl(input: string): string {
  try {
    const u = new URL(input.trim());
    u.hash = "";
    u.hostname = u.hostname.toLowerCase().replace(/^www\./, "");

    // Strip tracking params, then sort the rest for stable ordering.
    const kept: [string, string][] = [];
    for (const [k, v] of Array.from(u.searchParams.entries())) {
      if (!TRACKING_PARAM_PATTERNS.some((p) => p.test(k))) {
        kept.push([k, v]);
      }
    }
    kept.sort(([a], [b]) => a.localeCompare(b));
    u.search = "";
    for (const [k, v] of kept) u.searchParams.append(k, v);

    // Remove trailing slash on non-root paths.
    if (u.pathname.length > 1 && u.pathname.endsWith("/")) {
      u.pathname = u.pathname.replace(/\/+$/, "");
    }
    return u.toString();
  } catch {
    return input.trim();
  }
}
