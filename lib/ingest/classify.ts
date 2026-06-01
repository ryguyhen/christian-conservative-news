import type { NormalizedArticle } from "./types";

/**
 * Keyword-weighted topic classifier.
 *
 * Each rule scores against a haystack built from title + summary +
 * raw feed categories. An article is tagged with every topic whose
 * total score >= threshold. To add/remove a topic, edit TOPIC_RULES.
 *
 * Design notes:
 * - `require` makes one of those tokens mandatory in addition to the
 *   keyword match (lets us avoid e.g. "church" alone over-triggering).
 * - `exclude` rejects the topic if any token is present.
 * - Keyword weight roughly = how diagnostic the phrase is.
 */

export interface TopicRule {
  id: string;
  label: string;
  keywords: Array<[string, number]>;
  require?: string[];
  exclude?: string[];
  threshold?: number;
}

const DEFAULT_THRESHOLD = 2.5;

export const TOPIC_RULES: TopicRule[] = [
  {
    id: "pro-life",
    label: "Pro-Life",
    keywords: [
      ["pro-life", 3], ["pro life", 3], ["prolife", 3],
      ["abortion", 2], ["unborn", 2.5], ["dobbs", 2.5],
      ["pregnancy center", 2.5], ["pregnancy resource", 2.5],
      ["heartbeat bill", 3], ["fetal heartbeat", 3],
      ["roe v. wade", 2.5], ["roe v wade", 2.5],
      ["sanctity of life", 3], ["abortifacient", 2.5],
      ["sidewalk counsel", 2.5], ["chemical abortion", 2.5],
    ],
  },
  {
    id: "religious-liberty",
    label: "Religious Liberty",
    keywords: [
      ["religious liberty", 3], ["religious freedom", 3],
      ["first amendment", 2], ["free exercise clause", 3],
      ["rfra", 2.5], ["religious accommodation", 2.5],
      ["conscience clause", 3], ["religious discrimination", 2.5],
      ["religious exemption", 2.5], ["right to worship", 2.5],
    ],
  },
  {
    id: "church-rights",
    label: "Church Rights",
    keywords: [
      ["church autonomy", 3], ["ministerial exception", 3],
      ["pastor", 1], ["clergy", 1], ["denomination", 1],
      ["religious organization", 2], ["faith-based organization", 2],
      ["church property", 2.5], ["church sued", 2.5],
    ],
    require: [
      "right", "freedom", "liberty", "exemption", "lawsuit",
      "ruling", "court", "ruled", "discriminat", "tax", "zoning",
    ],
  },
  {
    id: "parental-rights",
    label: "Parental Rights",
    keywords: [
      ["parental rights", 3], ["parental notification", 3],
      ["parental consent", 3], ["parents bill of rights", 3],
      ["parental authority", 3], ["parents' rights", 3],
      ["parental involvement", 2.5], ["parent notification", 2.5],
    ],
  },
  {
    id: "family-policy",
    label: "Family Policy",
    keywords: [
      ["family policy", 3], ["pro-family", 2.5], ["pro family", 2.5],
      ["natural family", 2.5], ["family law", 1.5],
      ["child tax credit", 2.5], ["adoption agency", 2],
      ["foster care", 1.5], ["paid family leave", 2.5],
      ["marriage", 1], ["nuclear family", 2.5],
    ],
  },
  {
    id: "education-wins",
    label: "Education Wins",
    keywords: [
      ["school choice", 3], ["education savings account", 3],
      ["esa program", 3], ["voucher program", 2.5],
      ["homeschool", 2.5], ["classical education", 2.5],
      ["charter school", 2], ["curriculum transparency", 3],
      ["parental rights in education", 3], ["universal school choice", 3],
    ],
  },
  {
    id: "court-victory",
    label: "Court Victory",
    keywords: [
      ["supreme court", 2], ["scotus", 2.5],
      ["fifth circuit", 1.5], ["appeals court", 1.5],
      ["ruled in favor", 3], ["sided with", 2.5],
      ["unanimous decision", 2.5],
      ["injunction", 1.5], ["strikes down", 2.5], ["struck down", 2.5],
      ["upheld", 1.5], ["plaintiff prevail", 3],
    ],
    require: [
      "religious", "faith", "christian", "church", "pro-life", "abortion",
      "school", "parent", "family", "conservative", "first amendment",
      "religious liberty", "religious freedom",
    ],
  },
  {
    id: "conservative-legislation",
    label: "Conservative Legislation",
    keywords: [
      ["signed into law", 3], ["passed the senate", 1.5],
      ["passed the house", 1.5], ["governor signed", 3],
      ["state legislature", 1], ["legislation", 0.5],
      ["red state", 1.5], ["republican-led", 1.5],
      ["conservative bill", 2.5], ["pro-family bill", 3],
      ["pro-life bill", 3], ["heartbeat law", 3],
    ],
    require: [
      "pro-life", "abortion", "school choice", "parental",
      "religious", "marriage", "family", "voucher", "education",
      "transgender", "women", "girls", "gender", "title ix",
    ],
  },
  {
    id: "gender-sports-policy",
    label: "Gender & Sports Policy",
    keywords: [
      ["women's sports", 3], ["womens sports", 3],
      ["save women's sports", 3], ["save girls' sports", 3],
      ["transgender athlete", 3], ["title ix", 2.5],
      ["puberty blocker", 3], ["puberty blockers", 3],
      ["gender transition", 2.5], ["gender clinic", 2.5],
      ["biological female", 2.5], ["biological male", 2.5],
      ["gender ideology", 2.5], ["sex change", 2.5],
    ],
  },
  {
    id: "faith-in-public-life",
    label: "Faith in Public Life",
    keywords: [
      ["prayer in school", 3], ["national day of prayer", 3],
      ["ten commandments", 3], ["public prayer", 2.5],
      ["christian nationalism", 2], ["christian values", 2],
      ["faith in politics", 3], ["under god", 2.5],
      ["revival", 2], ["church and state", 2],
      ["sermon", 1.5], ["evangelism", 2],
    ],
  },
];

/** Topic id → human label, useful for the future topic filter UI. */
export const TOPIC_LABELS: Record<string, string> = Object.fromEntries(
  TOPIC_RULES.map((r) => [r.id, r.label])
);

function buildHaystack(article: NormalizedArticle): string {
  return [
    article.title,
    article.summary,
    article.raw_categories.join(" "),
  ]
    .join(" \n ")
    .toLowerCase();
}

/** Return all topic ids whose score >= threshold. */
export function classify(article: NormalizedArticle): string[] {
  const hay = buildHaystack(article);
  const tags: string[] = [];

  for (const rule of TOPIC_RULES) {
    if (rule.exclude && rule.exclude.some((tok) => hay.includes(tok.toLowerCase()))) {
      continue;
    }
    if (rule.require && !rule.require.some((tok) => hay.includes(tok.toLowerCase()))) {
      continue;
    }
    let score = 0;
    for (const [phrase, weight] of rule.keywords) {
      if (hay.includes(phrase.toLowerCase())) score += weight;
    }
    if (score >= (rule.threshold ?? DEFAULT_THRESHOLD)) {
      tags.push(rule.id);
    }
  }
  return tags;
}

/**
 * Run classification across a batch and also adjust the legacy `category`
 * column to the first classified topic (so the existing homepage filter
 * still shows something useful for new articles). If no topic matched,
 * keep the source's default category.
 */
export function classifyBatch(articles: NormalizedArticle[]): NormalizedArticle[] {
  return articles.map((a) => {
    const topics = classify(a);
    const category =
      topics.length > 0 ? (TOPIC_LABELS[topics[0]] ?? a.category) : a.category;
    return { ...a, topics, category };
  });
}
