import type { NormalizedArticle, RawFeedItem, Source } from "./types";
import { canonicalizeUrl } from "./canonical";
import { md5, titleHash } from "./hash";

/** Strip HTML tags and decode common entities to make a plain-text excerpt. */
function plain(html: string | undefined): string {
  if (!html) return "";
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&hellip;/g, "…")
    .replace(/\s+/g, " ")
    .trim();
}

function pickThumbnail(item: RawFeedItem): string | null {
  const mt = item["media:thumbnail"];
  if (mt) {
    const node = Array.isArray(mt) ? mt[0] : mt;
    if (node?.$?.url) return node.$.url;
  }
  const mc = item["media:content"];
  if (mc) {
    const node = Array.isArray(mc) ? mc[0] : mc;
    if (node?.$?.url) return node.$.url;
  }
  if (item.enclosure?.url && /\.(jpe?g|png|webp|gif)(\?|#|$)/i.test(item.enclosure.url)) {
    return item.enclosure.url;
  }
  const html = item["content:encoded"] || item.content || "";
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (m) return m[1];
  return null;
}

function pickPublishedAt(item: RawFeedItem): string {
  const raw = item.isoDate || item.pubDate;
  if (raw) {
    const d = new Date(raw);
    if (!isNaN(d.getTime())) return d.toISOString();
  }
  return new Date().toISOString();
}

function pickSummary(item: RawFeedItem): string {
  const candidate =
    item.contentSnippet || item.summary || item.content || item["content:encoded"] || "";
  return plain(candidate).slice(0, 600);
}

function pickAuthor(item: RawFeedItem): string | null {
  return (item.creator || item["dc:creator"] || item.author || "").trim() || null;
}

/** Convert one raw feed item to a NormalizedArticle, or null if unusable. */
export function normalize(item: RawFeedItem, source: Source): NormalizedArticle | null {
  const rawLink = item.link || item.guid || "";
  const title = (item.title || "").trim();
  if (!rawLink || !title) return null;

  const url = canonicalizeUrl(rawLink);
  const id = md5(url);
  const th = titleHash(title);

  return {
    id,
    title,
    url,
    summary: pickSummary(item),
    source: source.name,
    source_id: source.id,
    // legacy "category" column — provisional; classify.ts may overwrite from topics
    category: source.source_category || "News",
    topics: [],
    raw_categories: (item.categories ?? []).map((c) => String(c).trim()).filter(Boolean),
    author: pickAuthor(item),
    thumbnail_url: pickThumbnail(item),
    published_at: pickPublishedAt(item),
    guid: item.guid ? String(item.guid).trim() : null,
    title_hash: th,
  };
}
