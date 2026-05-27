import type { Article } from "./types";

const now = Date.now();
const ago = (h: number) => new Date(now - h * 3600_000).toISOString();

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "s1",
    title: "Millions Gather in Capitals Worldwide for National Days of Prayer",
    summary:
      "Believers across six continents joined coordinated prayer services this week, marking the largest unified gathering in a decade. Organizers reported overflow crowds in over forty cities.",
    url: "https://example.com/article-1",
    source: "CBN News",
    category: "Faith",
    thumbnail_url:
      "https://images.unsplash.com/photo-1507692049790-de58290a4334?w=1200",
    published_at: ago(2),
  },
  {
    id: "s2",
    title: "Supreme Court Upholds Religious Liberty Protections in Landmark Ruling",
    summary:
      "The 6-3 decision affirms longstanding First Amendment protections for faith-based institutions. Legal scholars call the ruling a significant moment for constitutional jurisprudence.",
    url: "https://example.com/article-2",
    source: "The Daily Wire",
    category: "Politics",
    thumbnail_url:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=800",
    published_at: ago(4),
  },
  {
    id: "s3",
    title: "Record Numbers of Young Adults Returning to Church, New Study Finds",
    summary:
      "A Barna survey of 18-29 year-olds shows attendance up 22% year-over-year. Researchers cite community, meaning, and renewed interest in tradition.",
    url: "https://example.com/article-3",
    source: "Barna Research",
    category: "Faith",
    thumbnail_url:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=800",
    published_at: ago(6),
  },
  {
    id: "s4",
    title: "Heartland Communities Rally to Rebuild After Tornado Outbreak",
    summary:
      "Volunteer church networks have raised over $4M and deployed thousands of workers across three states. Local pastors describe an outpouring of cross-denominational support.",
    url: "https://example.com/article-4",
    source: "Fox News",
    category: "Culture",
    thumbnail_url:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800",
    published_at: ago(8),
  },
  {
    id: "s5",
    title: "Persecuted Christians in the Middle East Receive Historic Aid Package",
    summary:
      "A coalition of charities announced $120M in emergency assistance for families displaced by ongoing conflicts. Distribution begins next month through local church partners.",
    url: "https://example.com/article-5",
    source: "Crisis Aid International",
    category: "World",
    thumbnail_url:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800",
    published_at: ago(10),
  },
  {
    id: "s6",
    title: "Why Family Dinner Is Making a Comeback Among Gen Z",
    summary:
      "Surveys show a sharp rise in young adults prioritizing shared meals. Sociologists point to a hunger for connection and stability after years of digital saturation.",
    url: "https://example.com/article-6",
    source: "The Federalist",
    category: "Opinion",
    thumbnail_url:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800",
    published_at: ago(12),
  },
  {
    id: "s7",
    title: "New Bible Translation Reaches Final Stages After 30-Year Effort",
    summary:
      "Translators completed the final book this month, bringing scripture to a previously unreached language group of 2 million speakers.",
    url: "https://example.com/article-7",
    source: "Evangelism Explosion",
    category: "Faith",
    thumbnail_url:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800",
    published_at: ago(14),
  },
  {
    id: "s8",
    title: "States Pass Sweeping School Choice Legislation",
    summary:
      "Seven states enacted universal school choice this session, expanding access to faith-based and charter education. Parental rights advocates call it a landmark moment.",
    url: "https://example.com/article-8",
    source: "The Daily Signal",
    category: "Politics",
    thumbnail_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    published_at: ago(16),
  },
  {
    id: "s9",
    title: "Adoption Agencies Report Surge in Families Stepping Forward",
    summary:
      "Faith-based adoption services nationwide say inquiries are up 40% this year. Advocates credit shifting cultural attitudes and renewed pro-family policies.",
    url: "https://example.com/article-9",
    source: "LifeNews.com",
    category: "Faith",
    thumbnail_url:
      "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=800",
    published_at: ago(18),
  },
  {
    id: "s10",
    title: "Pew: Religious Affiliation Stabilizing After Decades of Decline",
    summary:
      "New polling suggests the long-running drop in religious identification has plateaued. Researchers see the trend continuing into the next decade.",
    url: "https://example.com/article-10",
    source: "Pew Research Center",
    category: "Opinion",
    thumbnail_url:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800",
    published_at: ago(20),
  },
  {
    id: "s11",
    title: "Small-Town Revival Draws Visitors From Across the Country",
    summary:
      "Nightly services in a rural Tennessee town have continued for over two months, drawing thousands. Local businesses report unprecedented activity.",
    url: "https://example.com/article-11",
    source: "Mario Murillo",
    category: "Faith",
    thumbnail_url:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800",
    published_at: ago(22),
  },
  {
    id: "s12",
    title: "Congress Advances Bipartisan Religious Workers Protection Act",
    summary:
      "The measure cleared committee with broad support and now heads to the floor. Supporters say it ensures fair treatment for clergy and faith-based employees.",
    url: "https://example.com/article-12",
    source: "Washington Examiner",
    category: "Politics",
    thumbnail_url:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    published_at: ago(24),
  },
  {
    id: "s13",
    title: "Christian Filmmakers See Record-Breaking Box Office Year",
    summary:
      "Faith-based films grossed over $800M this year, marking the strongest year on record. Studios are expanding production slates in response.",
    url: "https://example.com/article-13",
    source: "Western Journal",
    category: "Culture",
    thumbnail_url:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
    published_at: ago(26),
  },
];
