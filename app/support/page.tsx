import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/SupportPageShell";

export const metadata: Metadata = {
  title: "Support Good Godly News — Reader-supported coverage of faith, family & liberty",
  description:
    "Good Godly News is free for every reader and is paid for entirely by supporters. No ads, no trackers, no paywall. Become a Supporter, Sustaining Member, or Founding Member — or give one time.",
};

// TODO: Replace these href="#" placeholders with Stripe Payment Links
// (or your processor of choice) when billing is wired up.
const TIERS = [
  {
    id: "supporter",
    name: "Supporter",
    monthly: "$5",
    yearly: "$50",
    summary: "The foundation of this work.",
    benefits: [
      "Keeps the briefing free for every reader, every day",
      "A monthly note from the editor",
      "Our gratitude — and a real difference at small scale",
    ],
    href: "#",
    cta: "Become a Supporter",
    emphasis: false,
  },
  {
    id: "sustaining",
    name: "Sustaining Member",
    monthly: "$15",
    yearly: "$150",
    summary: "For readers who rely on the briefing.",
    benefits: [
      "Everything in Supporter",
      "Weekly Supporter Briefing — a deeper Friday roundup",
      "Early access to the Morning Brief, delivered at 6 a.m.",
    ],
    href: "#",
    cta: "Become a Sustaining Member",
    emphasis: true,
  },
  {
    id: "founding",
    name: "Founding Member",
    monthly: "$50",
    yearly: "$500",
    summary: "Help shape the publication.",
    benefits: [
      "Everything in Sustaining Member",
      "Optional listing in the annual Founders' acknowledgment",
      "Quarterly editor's letter on the state of the briefing",
      "First look at any new section we launch",
    ],
    href: "#",
    cta: "Become a Founding Member",
    emphasis: false,
  },
];

const ONE_TIME = [
  { label: "$25",  href: "#" },
  { label: "$100", href: "#" },
  { label: "$250", href: "#" },
  { label: "Other amount", href: "#" },
];

function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="font-label uppercase tracking-[0.24em] text-[11px] font-bold text-accent">
        {kicker}
      </div>
      <h2 className="mt-2 font-display font-black text-ink text-[30px] md:text-[38px] leading-[1.1] tracking-tight">
        {title}
      </h2>
    </div>
  );
}

export default function SupportPage() {
  return (
    <PageShell>
      {/* ── Editor's letter ───────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto">
        <div className="font-label uppercase tracking-[0.24em] text-[11px] font-bold text-accent">
          A letter from the editor
        </div>
        <h1 className="mt-3 font-display font-black text-ink text-[40px] md:text-[56px] leading-[1.05] tracking-tight">
          This briefing is free for every reader.
          <br />
          It is paid for by readers.
        </h1>
        <div className="mt-6 font-serif text-ink text-[18px] leading-[1.7] space-y-4">
          <p>
            Good Godly News exists to give Christian and conservative
            families a calm, daily picture of the news that actually matters
            to them — the courtrooms, the legislatures, the school boards,
            the universities, the agencies, the churches, the institutions —
            without the outrage cycle, without surveillance advertising,
            without a paywall, without exception.
          </p>
          <p>
            We read more than fifty publications every day so you can spend
            ten minutes on what matters and zero minutes drowning in feeds.
            We do not host original reporting. Every headline links to the
            publisher. Summaries are AI-assisted and reviewed for tone.
          </p>
          <p>
            We accept no advertising and run no tracking. The only thing
            that keeps this briefing alive — and free — is reader support.
          </p>
          <p className="font-display italic text-ink-soft">
            If this work is useful to you, please consider becoming a Supporter.
          </p>
        </div>
      </article>

      {/* ── Recurring tiers ───────────────────────────────────────────── */}
      <section id="tiers" className="mt-20 pt-12 border-t border-rule">
        <SectionHead
          kicker="Become a recurring supporter"
          title="Three ways to support this briefing."
        />
        <p className="font-serif text-ink-soft text-[16px] leading-[1.65] max-w-2xl mb-10">
          All three tiers fund the same mission: keeping Good Godly News
          free, ad-free, and tracker-free for every reader, every day.
          Benefits are light-touch by design — we&apos;re a publication,
          not a rewards program.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className={`flex flex-col p-6 border ${
                t.emphasis
                  ? "border-navy bg-navy text-paper"
                  : "border-rule bg-paper-warm/40 text-ink"
              }`}
            >
              <div
                className={`font-label uppercase tracking-[0.22em] text-[11px] font-bold ${
                  t.emphasis ? "text-gold" : "text-accent"
                }`}
              >
                {t.name}
              </div>
              <div className="mt-3 font-display font-black text-[34px] leading-none tracking-tight">
                {t.monthly}
                <span className={`ml-2 text-[14px] font-label uppercase tracking-[0.18em] font-bold ${t.emphasis ? "text-paper/70" : "text-ink-mute"}`}>
                  / month
                </span>
              </div>
              <div className={`mt-1 font-label uppercase tracking-[0.18em] text-[11px] ${t.emphasis ? "text-paper/70" : "text-ink-mute"}`}>
                or {t.yearly} / year
              </div>
              <p className={`mt-4 font-serif italic ${t.emphasis ? "text-paper/85" : "text-ink-soft"}`}>
                {t.summary}
              </p>
              <ul className="mt-5 space-y-2 font-serif text-[15px] leading-[1.5]">
                {t.benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className={t.emphasis ? "text-gold" : "text-accent"}>—</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <a
                  href={t.href}
                  className={`block text-center font-label uppercase tracking-[0.18em] text-[12px] font-bold py-3 ${
                    t.emphasis
                      ? "bg-gold text-navy hover:bg-paper"
                      : "bg-navy text-paper hover:bg-ink"
                  }`}
                >
                  {t.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── One-time gift ─────────────────────────────────────────────── */}
      <section id="one-time" className="mt-20 pt-12 border-t border-rule">
        <SectionHead kicker="One-time gift" title="Prefer to give once?" />
        <p className="font-serif text-ink-soft text-[16px] leading-[1.65] max-w-2xl mb-6">
          Every one-time gift goes to the same place as a recurring one:
          keeping the briefing free for every reader.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
          {ONE_TIME.map((g) => (
            <a
              key={g.label}
              href={g.href}
              className="text-center font-label uppercase tracking-[0.16em] text-[13px] font-bold py-3 border border-rule bg-paper hover:bg-paper-warm"
            >
              {g.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── Transparency ──────────────────────────────────────────────── */}
      <section id="transparency" className="mt-20 pt-12 border-t border-rule">
        <SectionHead
          kicker="Where the money goes"
          title="Transparency, in plain English."
        />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display font-bold text-ink text-[20px] mb-3">
              What reader support pays for
            </h3>
            <ul className="space-y-2 font-serif text-[16px] text-ink leading-[1.6]">
              <li>— Daily editorial curation and writing</li>
              <li>— AI summarization (per-article cost)</li>
              <li>— Email delivery infrastructure</li>
              <li>— Hosting, domain, and analytics that don&apos;t track readers</li>
              <li>— Building out new sections as the briefing grows</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-ink text-[20px] mb-3">
              What we will never do
            </h3>
            <ul className="space-y-2 font-serif text-[16px] text-ink leading-[1.6]">
              <li>— Run display advertising</li>
              <li>— Sell, share, or rent your email or any reader data</li>
              <li>— Use third-party tracking pixels</li>
              <li>— Put the daily briefing behind a paywall</li>
              <li>— Send more than one email a day without your permission</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Trust ─────────────────────────────────────────────────────── */}
      <section className="mt-20 pt-12 border-t border-rule bg-navy text-paper -mx-6 px-6 py-10">
        <div className="max-w-3xl mx-auto">
          <div className="font-label uppercase tracking-[0.24em] text-[11px] font-bold text-gold">
            Plain-language trust
          </div>
          <h2 className="mt-2 font-display font-black text-[28px] md:text-[34px] leading-[1.15] tracking-tight">
            Cancel anytime. No data sold. No paywall.
          </h2>
          <ul className="mt-6 space-y-2 font-serif text-[16px] leading-[1.6] text-paper/90">
            <li>— You can cancel a recurring gift at any time, no email required.</li>
            <li>— We do not sell or share reader data with anyone, ever.</li>
            <li>— The daily briefing and the website stay free regardless of whether you support.</li>
            <li>— If you support and later need to pause, just write us.</li>
          </ul>
        </div>
      </section>

      {/* ── If you can't give ─────────────────────────────────────────── */}
      <section className="mt-20 pt-12 border-t border-rule">
        <SectionHead kicker="Other ways to help" title="If a gift isn't possible." />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display font-bold text-ink text-[20px] mb-2">
              Forward the briefing.
            </h3>
            <p className="font-serif text-ink-soft text-[16px] leading-[1.65]">
              The single most effective thing a non-donor reader can do is
              forward the morning email — or a single story — to someone
              who would value it. Word of mouth is how this audience grows.
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-ink text-[20px] mb-2">
              Pray for the work.
            </h3>
            <p className="font-serif text-ink-soft text-[16px] leading-[1.65]">
              We mean this literally. If you read the briefing, pray that
              the editorial judgement stays sober, the curation stays
              honest, and the institutions we cover remain free to do
              their work.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="font-label uppercase tracking-[0.18em] text-[12px] font-bold text-accent hover:underline"
          >
            ← Back to the briefing
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
