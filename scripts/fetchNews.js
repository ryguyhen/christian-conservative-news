// scripts/fetchNews.js
// Fetches RSS feeds from all 56 active sources, summarizes with Anthropic,
// and upserts into Supabase. Run daily via GitHub Actions.

import Parser from "rss-parser";
import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import crypto from "crypto";

const parser = new Parser({ timeout: 10000 });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const anthropic = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const SOURCES = [
  // General Conservative News
  { name: "The Daily Wire",            url: "https://www.dailywire.com/feeds/rss.xml",                                    category: "Politics" },
  { name: "The Federalist",            url: "https://thefederalist.com/feed/",                                             category: "Opinion"  },
  { name: "Breitbart",                 url: "https://feeds.feedburner.com/breitbart",                                      category: "Politics" },
  { name: "Washington Examiner",       url: "https://www.washingtonexaminer.com/feed",                                     category: "Politics" },
  { name: "Townhall",                  url: "https://townhall.com/feed",                                                   category: "Politics" },
  { name: "The Daily Signal",          url: "https://www.dailysignal.com/feed",                                            category: "Politics" },
  { name: "The Daily Caller",          url: "https://dailycaller.com/section/politics/feed/",                              category: "Politics" },
  { name: "Newsmax Newsfront",         url: "https://www.newsmax.com/rss/Newsfront/16/",                                   category: "Politics" },
  { name: "Newsmax Politics",          url: "https://www.newsmax.com/rss/Politics/1/",                                     category: "Politics" },
  { name: "One America News (OAN)",    url: "https://www.oann.com/feed",                                                   category: "Politics" },
  { name: "Fox News",                  url: "https://moxie.foxnews.com/google-publisher/latest.xml",                       category: "Politics" },
  { name: "The Epoch Times",           url: "https://www.theepochtimes.com/us/us-politics/feed",                           category: "Politics" },
  { name: "Western Journal",           url: "https://www.westernjournal.com/feed/",                                        category: "Politics" },
  { name: "Real Clear Politics",       url: "https://www.realclearpolitics.com/index.xml",                                 category: "Opinion"  },
  { name: "Turning Point USA",         url: "https://feeds.tpusa.com/live/rss.xml",                                        category: "Culture"  },
  { name: "TotalNEWS",                 url: "https://totalnews.com/feed/",                                                 category: "Politics" },

  // Faith Based News
  { name: "CBN News",                  url: "https://www1.cbn.com/app_feeds/rss/news/rss.php?section=top&mobile=false",    category: "Faith"    },
  { name: "The Christian Post",        url: "https://www.christianpost.com/rss",                                           category: "Faith"    },
  { name: "Christian Concern",         url: "https://christianconcern.com/feed/",                                          category: "Faith"    },
  { name: "Christian Concern Press",   url: "https://christianconcern.com/ccpressreleases/feed/",                          category: "Faith"    },
  { name: "Andrew Wommack Ministries", url: "https://www.awmi.net/feed/",                                                  category: "Faith"    },
  { name: "American Cornerstone Inst.",url: "https://americancornerstone.org/feed/",                                       category: "Faith"    },
  { name: "American Pastors Network",  url: "https://americanpastorsnetwork.net/feed/",                                    category: "Faith"    },
  { name: "American Minute",           url: "http://www.amerisearch.net/rss.xml",                                          category: "Faith"    },
  { name: "Mario Murillo",             url: "https://mariomurillo.org/feed/",                                              category: "Faith"    },
  { name: "Million Voices",            url: "https://millionvoices.org/feed/",                                             category: "Faith"    },
  { name: "Evangelism Explosion",      url: "https://evangelismexplosion.org/feed/",                                       category: "Faith"    },
  { name: "Crisis Aid International",  url: "https://crisisaid.org/feed/",                                                 category: "World"    },
  { name: "LifeWise Academy",          url: "https://lifewise.org/feed/",                                                  category: "Faith"    },
  { name: "Carson Scholars Fund",      url: "https://carsonscholars.org/feed/",                                            category: "Culture"  },
  { name: "Duane Sheriff",             url: "https://pastorduane.com/feed/",                                               category: "Faith"    },
  { name: "Lance Wallnau",             url: "https://lancewallnau.com/feed/",                                              category: "Faith"    },
  { name: "Truth & Liberty",           url: "https://truthandliberty.net/feed",                                            category: "Faith"    },
  { name: "Liberty Sentinel",          url: "https://libertysentinel.org/feed/",                                           category: "Politics" },
  { name: "Craig Huey",                url: "https://craighuey.com/feed/",                                                 category: "Opinion"  },

  // Right to Life
  { name: "LifeSiteNews",              url: "https://www.lifesitenews.com/feed/",                                          category: "Faith"    },
  { name: "LifeNews.com",              url: "https://www.lifenews.com/feed/",                                              category: "Faith"    },
  { name: "Live Action",               url: "https://www.liveaction.org/feed/",                                            category: "Faith"    },
  { name: "Students for Life",         url: "https://studentsforlife.org/feed/",                                           category: "Faith"    },
  { name: "Susan B. Anthony List",     url: "https://sbaprolife.org/feed",                                                 category: "Politics" },
  { name: "Charlotte Lozier Inst.",    url: "https://lozierinstitute.org/news/feed/",                                      category: "Faith"    },
  { name: "Life Network",              url: "https://www.elifenetwork.com/feed/",                                          category: "Faith"    },
  { name: "Family Policy Alliance",    url: "https://familypolicyalliance.com/feed/",                                      category: "Politics" },
  { name: "Family Research Council",   url: "https://www.frc.org/rss/rss_PR.xml",                                          category: "Politics" },
  { name: "FRC Washington Update",     url: "https://www.frc.org/rss/rss_WU.xml",                                          category: "Politics" },
  { name: "Family Renewal",            url: "https://familyrenewal.org/feed/",                                             category: "Culture"  },
  { name: "Them Before Us",            url: "https://thembeforeus.com/feed/",                                              category: "Culture"  },
  { name: "Sex Change Regret",         url: "https://sexchangeregret.com/feed/",                                           category: "Culture"  },

  // Research / Commentary
  { name: "Barna Research",            url: "https://www.barna.com/research/feed/",                                        category: "Opinion"  },
  { name: "Pew Research Center",       url: "https://www.pewresearch.org/feed/",                                           category: "Opinion"  },
  { name: "Answers in Genesis",        url: "https://answersingenesis.org/feed/",                                          category: "Faith"    },
  { name: "Genesis Apologetics",       url: "https://genesisapologetics.com/feed/",                                        category: "Faith"    },
  { name: "Public Discourse Journal",  url: "https://www.thepublicdiscourse.com/feed/",                                    category: "Opinion"  },
  { name: "Witherspoon Institute",     url: "https://winst.org/feed/",                                                     category: "Opinion"  },
  { name: "Tricord Global",            url: "https://www.wealthbuilders.org/feed/",                                        category: "Opinion"  },
];

function urlToId(url) {
  return crypto.createHash("md5").update(url).digest("hex");
}

function extractThumbnail(item) {
  if (item["media:thumbnail"]?.$?.url) return item["media:thumbnail"].$.url;
  if (item["media:content"]?.$?.url) return item["media:content"].$.url;
  if (item.enclosure?.url?.match(/\.(jpg|jpeg|png|webp)/i)) return item.enclosure.url;
  const html = item["content:encoded"] || item.content || "";
  const m = html.match(/<img[^>]+src="([^"]+)"/i);
  if (m) return m[1];
  return null;
}

async function fetchFeed(source) {
  try {
    const feed = await parser.parseURL(source.url);
    return feed.items.slice(0, 10).map((item) => ({
      id: urlToId(item.link || item.guid || item.title),
      title: (item.title || "").trim(),
      url: item.link || item.guid || "",
      source: source.name,
      category: source.category,
      thumbnail_url: extractThumbnail(item),
      published_at: item.pubDate
        ? new Date(item.pubDate).toISOString()
        : new Date().toISOString(),
      raw_summary: item.contentSnippet || item.summary || item.content || "",
    }));
  } catch (err) {
    console.warn(`  ⚠ Failed to fetch ${source.name}: ${err.message}`);
    return [];
  }
}

async function summarize(title, rawText) {
  const fallback = (rawText || "").replace(/<[^>]+>/g, "").trim().slice(0, 280);
  if (!anthropic) return fallback;
  try {
    const msg = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 160,
      messages: [
        {
          role: "user",
          content: `Write a 2-sentence factual summary of this news article. Be neutral, concise, and do not editorialize.\n\nTitle: ${title}\n\nText: ${(rawText || "").slice(0, 1200)}`,
        },
      ],
    });
    return msg.content[0].text.trim();
  } catch {
    return fallback;
  }
}

async function main() {
  console.log(`\n🗞  Good Godly News — Daily Feed Fetcher`);
  console.log(`   Fetching from ${SOURCES.length} sources...\n`);

  let totalUpserted = 0;

  for (const source of SOURCES) {
    process.stdout.write(`  → ${source.name}... `);
    const articles = await fetchFeed(source);
    if (articles.length === 0) {
      console.log("no items");
      continue;
    }

    const enriched = [];
    for (const a of articles) {
      const summary = await summarize(a.title, a.raw_summary);
      enriched.push({
        id: a.id,
        title: a.title,
        summary,
        url: a.url,
        source: a.source,
        category: a.category,
        thumbnail_url: a.thumbnail_url,
        published_at: a.published_at,
      });
      await new Promise((r) => setTimeout(r, 200));
    }

    const { error } = await supabase
      .from("articles")
      .upsert(enriched, { onConflict: "id", ignoreDuplicates: true });

    if (error) {
      console.log(`ERROR: ${error.message}`);
    } else {
      console.log(`✓ ${enriched.length} articles`);
      totalUpserted += enriched.length;
    }
  }

  console.log(`\n✅ Done. Upserted ${totalUpserted} articles.\n`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
