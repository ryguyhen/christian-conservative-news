import Parser from "rss-parser";
import type { RawFeedItem, Source } from "./types";

const UA =
  "GoodGodlyNewsBot/1.0 (+https://goodgodlynews.com; aggregator) " +
  "Mozilla/5.0 (compatible; news-aggregator)";

const parser = new Parser<{}, RawFeedItem>({
  timeout: 15_000,
  headers: { "User-Agent": UA, Accept: "application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.5" },
  customFields: {
    item: [
      ["media:content", "media:content", { keepArray: false }],
      ["media:thumbnail", "media:thumbnail", { keepArray: false }],
      ["content:encoded", "content:encoded"],
      ["dc:creator", "dc:creator"],
    ],
  },
});

/** Fetch + parse one feed. Throws on network/parse error. */
export async function fetchFeed(source: Source): Promise<RawFeedItem[]> {
  const feed = await parser.parseURL(source.feed_url);
  return (feed.items ?? []) as RawFeedItem[];
}
