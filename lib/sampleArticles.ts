import type { Article } from "./types";

const now = Date.now();
const ago = (h: number) => new Date(now - h * 3600_000).toISOString();

export const SAMPLE_ARTICLES: Article[] = [
  {
    id: "s1",
    title:
      "Fifth Circuit Sides with Catholic Foster Agency in Long-Running Louisiana Case",
    summary:
      "A three-judge panel ruled 2-1 that Catholic Charities of New Orleans cannot be required to place children with same-sex couples, citing the agency's First Amendment claims.",
    url: "https://example.com/a1",
    source: "The Daily Signal",
    category: "Politics",
    thumbnail_url:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1200",
    published_at: ago(1.5),
  },
  {
    id: "s2",
    title:
      "Iowa Pastor's Letter to Editor Goes Viral After Local Paper Declines to Publish",
    summary:
      "A 1,200-word letter on civic faith, posted to Substack after the Des Moines Register passed, has been shared more than 80,000 times in three days.",
    url: "https://example.com/a2",
    source: "The Federalist",
    category: "Opinion",
    thumbnail_url:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200",
    published_at: ago(3),
  },
  {
    id: "s3",
    title:
      "Aid Convoys Reach Christian Villages in Northern Iraq After Three-Year Closure",
    summary:
      "Six trucks carrying medical supplies and building materials crossed into the Nineveh Plain on Tuesday, the first permitted shipment from the Erbil corridor since 2023.",
    url: "https://example.com/a3",
    source: "CBN News",
    category: "World",
    thumbnail_url:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200",
    published_at: ago(4),
  },
  {
    id: "s4",
    title:
      "Pew: Weekly Attendance Among Adults Under 30 Up Four Points Since 2023",
    summary:
      "Self-reported weekly religious-service attendance among 18-29-year-olds reached 27% in Pew's spring panel, the highest since 2019.",
    url: "https://example.com/a4",
    source: "Pew Research Center",
    category: "Opinion",
    thumbnail_url:
      "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=1200",
    published_at: ago(5),
  },
  {
    id: "s5",
    title:
      "Tennessee Bill Would Extend School Choice Vouchers to All Special-Needs Students",
    summary:
      "HB 1142 cleared committee on a 9-4 vote Wednesday and now heads to the House floor. Sponsors estimate 38,000 students would qualify in year one.",
    url: "https://example.com/a5",
    source: "The Daily Wire",
    category: "Politics",
    thumbnail_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    published_at: ago(6),
  },
  {
    id: "s6",
    title:
      "Texas District Court Strikes Down County Ordinance Restricting Sidewalk Counselors",
    summary:
      "Judge Patricia Volz wrote that the Travis County rule was 'plainly content-based' and could not survive strict scrutiny. The county has 30 days to appeal.",
    url: "https://example.com/a6",
    source: "LifeNews.com",
    category: "Faith",
    thumbnail_url:
      "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1200",
    published_at: ago(7),
  },
  {
    id: "s7",
    title:
      "Family Research Council Releases 2026 State-by-State Religious Liberty Scorecard",
    summary:
      "The annual index gives 14 states an A or B grade, up from nine last year. Oklahoma rose seven places after passing the Religious Freedom in Schools Act.",
    url: "https://example.com/a7",
    source: "Family Research Council",
    category: "Politics",
    thumbnail_url:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200",
    published_at: ago(8),
  },
  {
    id: "s8",
    title:
      "Lance Wallnau's 'Seven Mountains' Tour Draws Largest Crowds in Five Years",
    summary:
      "The Charlotte stop filled the 18,000-seat Spectrum Center, with overflow simulcast to two adjacent churches. Two more dates have been added in February.",
    url: "https://example.com/a8",
    source: "Lance Wallnau",
    category: "Faith",
    thumbnail_url:
      "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=1200",
    published_at: ago(10),
  },
  {
    id: "s9",
    title:
      "Twelve States Now Offer Pro-Life Tax Credits for Pregnancy-Resource Centers",
    summary:
      "South Dakota and Mississippi joined the list this session. Average credit value sits between 50% and 75% of donations, capped between $5M and $20M per state.",
    url: "https://example.com/a9",
    source: "Western Journal",
    category: "Politics",
    thumbnail_url:
      "https://images.unsplash.com/photo-1476234251651-f353703a034d?w=1200",
    published_at: ago(12),
  },
  {
    id: "s10",
    title:
      "Why Localism Is the Antidote to Algorithmic Atomization",
    summary:
      "An essay arguing that parish life, school boards, and town councils are the most durable answer to digital fragmentation — and the hardest one to outsource.",
    url: "https://example.com/a10",
    source: "Public Discourse Journal",
    category: "Opinion",
    thumbnail_url:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200",
    published_at: ago(14),
  },
  {
    id: "s11",
    title:
      "Susan B. Anthony List Names Five Senate Races as Top 2026 Priorities",
    summary:
      "The group announced a $92M independent expenditure plan focused on contests in Michigan, Wisconsin, Georgia, Arizona, and Pennsylvania.",
    url: "https://example.com/a11",
    source: "Susan B. Anthony List",
    category: "Politics",
    thumbnail_url:
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200",
    published_at: ago(16),
  },
  {
    id: "s12",
    title:
      "Barna Survey: 67% of Practicing Christians Report Increased Generosity Since 2022",
    summary:
      "The report tracks giving habits across 2,100 respondents. Researchers attribute the rise to inflation-driven need awareness and renewed local church engagement.",
    url: "https://example.com/a12",
    source: "Barna Research",
    category: "Opinion",
    thumbnail_url:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=1200",
    published_at: ago(18),
  },
  {
    id: "s13",
    title:
      "Polish Bishops' Conference Issues Joint Statement on EU Right-to-Die Framework",
    summary:
      "The 41-bishop letter calls the draft directive 'an inversion of the medical vocation' and urges Polish MEPs to oppose committee adoption next month.",
    url: "https://example.com/a13",
    source: "LifeSiteNews",
    category: "World",
    thumbnail_url:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200",
    published_at: ago(20),
  },
  {
    id: "s14",
    title:
      "Heartland Church Networks Coordinate Tornado Response Across Three States",
    summary:
      "By Friday afternoon, 1,400 volunteers had been deployed and $4.2M raised through a joint denominational portal launched 72 hours after the outbreak.",
    url: "https://example.com/a14",
    source: "Fox News",
    category: "Culture",
    thumbnail_url:
      "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1200",
    published_at: ago(22),
  },
  {
    id: "s15",
    title:
      "Carson Scholars Fund Announces 312 New Scholarship Recipients",
    summary:
      "The fund's largest single cohort to date includes students from all 50 states. Median GPA of awardees rose to 3.96.",
    url: "https://example.com/a15",
    source: "Carson Scholars Fund",
    category: "Culture",
    thumbnail_url:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200",
    published_at: ago(28),
  },
];
