export function monogramFor(source: string): string {
  const cleaned = source
    .replace(/^The\s+/i, "")
    .replace(/\(.*?\)/g, "")
    .trim();
  const first = cleaned[0]?.toUpperCase() ?? "•";
  return first;
}

export function shortSource(source: string): string {
  // Tighten common long names for footer chips
  return source
    .replace(/American Cornerstone Institute|American Cornerstone Inst\./i, "American Cornerstone")
    .replace(/Charlotte Lozier Institute|Charlotte Lozier Inst\./i, "Charlotte Lozier")
    .replace(/One America News \(OAN\)/i, "OAN")
    .replace(/The Epoch Times \(US\)/i, "The Epoch Times")
    .trim();
}
