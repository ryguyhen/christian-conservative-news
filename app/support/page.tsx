import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/SupportPageShell";

export const metadata: Metadata = {
  title: "Support Good Godly News — Reader-supported coverage of faith, family & liberty",
  description:
    "Good Godly News is free for every reader and is paid for entirely by supporters. No ads, no trackers, no paywall. Become a Supporter, Sustaining Member, or Founding Member — or give one time.",
};

// TODO: Replace href="#" with Stripe Payment Links when billing is wired.
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

function SectionHead({ kicker, title, id }: { kicker: string; title: string; id?: string }) {
  return (
    <div className="mb-6">
      <div className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-accent">
        {kicker}
      </div>
      <h2 id={id} className="mt-2 font-display font-black text-ink text-[30px] md:text-[40px] leading-[1.12] tracking-tight">
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
        <div className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-accent">
          A letter from the editor
        </div>
        <h1 className="mt-3 font-display font-black text-ink text-[40px] md:text-[56px] leading-[1.05] tracking-tight">
          This briefing is free for every reader.
          It is paid for by readers.
        </h1>
        <div className="mt-6 font-serif text-ink text-[19px] leading-[1.7] space-y-4">
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
          <p className="font-display italic font-bold text-ink">
            If this work is useful to you, please consider becoming a Supporter.
          </p>
        </div>
      </article>

      {/* ── Recurring tiers ───────────────────────────────────────────── */}
      <section id="tiers" className="mt-20 pt-12 border-t border-rule" aria-labelledby="tiers-h">
        <SectionHead
          kicker="Become a recurring supporter"
          title="Three ways to support this briefing."
          id="tiers-h"
        />
        <p className="font-serif text-ink text-[17px] leading-[1.65] max-w-2xl mb-10">
          All three tiers fund the same mission: keeping Good Godly News
          free, ad-free, and tracker-free for every reader, every day.
          Benefits are light-touch by design — we&apos;re a publication,
          not a rewards program.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {TIERS.map((t) => (
            <div
              key={t.id}
              className={`flex flex-col p-6 border-2 ${
                t.emphasis
                  ? "border-navy bg-navy text-paper-on-navy"
                  : "border-rule bg-paper-warm/40 text-ink"
              }`}
            >
              <div
                className={`font-label font-bold uppercase tracking-[0.06em] text-[13px] ${
                  t.emphasis ? "text-gold" : "text-accent"
                }`}
              >
                {t.name}
              </div>
              <div className={`mt-3 font-display font-black text-[38px] leading-none tracking-tight ${t.emphasis ? "text-paper-on-navy" : "text-ink"}`}>
                {t.monthly}
                <span className={`ml-2 text-[15px] font-label font-bold ${t.emphasis ? "text-paper-on-navy-soft" : "text-ink-soft"}`}>
                  / month
                </span>
              </div>
              <div className={`mt-1 font-label font-semibold text-[13px] ${t.emphasis ? "text-paper-on-navy-soft" : "text-ink-soft"}`}>
                or {t.yearly} / year
              </div>
              <p className={`mt-4 font-serif font-semibold ${t.emphasis ? "text-paper-on-navy" : "text-ink"} italic text-[17px]`}>
                {t.summary}
              </p>
              <ul className="mt-5 space-y-2.5 font-serif text-[16px] leading-[1.5]">
                {t.benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span aria-hidden className={`font-bold ${t.emphasis ? "text-gold" : "text-accent"}`}>—</span>
                    <span className={t.emphasis ? "text-paper-on-navy" : "text-ink"}>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <a href={t.href} className={t.emphasis ? "btn-gold w-full" : "btn-primary w-full"}>
                  {t.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── One-time gift ─────────────────────────────────────────────── */}
      <section id="one-time" className="mt-20 pt-12 border-t border-rule" aria-labelledby="onetime-h">
        <SectionHead kicker="One-time gift" title="Prefer to give once?" id="onetime-h" />
        <p className="font-serif text-ink text-[17px] leading-[1.65] max-w-2xl mb-6">
          Every one-time gift goes to the same place as a recurring one:
          keeping the briefing free for every reader.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl">
          {ONE_TIME.map((g) => (
            <a key={g.label} href={g.href} className="btn-secondary">
              {g.label}
            </a>
          ))}
        </div>
      </section>

      {/* ── Transparency ──────────────────────────────────────────────── */}
      <section id="transparency" className="mt-20 pt-12 border-t border-rule" aria-labelledby="trans-h">
        <SectionHead
          kicker="Where the money goes"
          title="Transparency, in plain English."
          id="trans-h"
        />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display font-bold text-ink text-[22px] mb-3">
              What reader support pays for
            </h3>
            <ul className="space-y-2 font-serif text-[17px] text-ink leading-[1.6]">
              <li>— Daily editorial curation and writing</li>
              <li>— AI summarization (per-article cost)</li>
              <li>— Email delivery infrastructure</li>
              <li>— Hosting, domain, and analytics that don&apos;t track readers</li>
              <li>— Building out new sections as the briefing grows</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display font-bold text-ink text-[22px] mb-3">
              What we will never do
            </h3>
            <ul className="space-y-2 font-serif text-[17px] text-ink leading-[1.6]">
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
      <section className="mt-20 pt-12 border-t border-rule bg-navy text-paper-on-navy -mx-6 px-6 py-10" aria-labelledby="trust-h">
        <div className="max-w-3xl mx-auto">
          <div className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-gold">
            Plain-language trust
          </div>
          <h2 id="trust-h" className="mt-2 font-display font-black text-paper-on-navy text-[28px] md:text-[34px] leading-[1.15] tracking-tight">
            Cancel anytime. No data sold. No paywall.
          </h2>
          <ul className="mt-6 space-y-2.5 font-serif text-[17px] leading-[1.6] text-paper-on-navy">
            <li>— You can cancel a recurring gift at any time, no email required.</li>
            <li>— We do not sell or share reader data with anyone, ever.</li>
            <li>— The daily briefing and the website stay free regardless of whether you support.</li>
            <li>— If you support and later need to pause, just write us.</li>
          </ul>
        </div>
      </section>

      {/* ── If you can't give ─────────────────────────────────────────── */}
      <section className="mt-20 pt-12 border-t border-rule" aria-labelledby="alt-h">
        <SectionHead kicker="Other ways to help" title="If a gift isn't possible." id="alt-h" />
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <h3 className="font-display font-bold text-ink text-[22px] mb-2">
              Forward the briefing.
            </h3>
            <p className="font-serif text-ink text-[17px] leading-[1.65]">
              The single most effective thing a non-donor reader can do is
              forward the morning email — or a single story — to someone
              who would value it. Word of mouth is how this audience grows.
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-ink text-[22px] mb-2">
              Pray for the work.
            </h3>
            <p className="font-serif text-ink text-[17px] leading-[1.65]">
              We mean this literally. If you read the briefing, pray that
              the editorial judgement stays sober, the curation stays
              honest, and the institutions we cover remain free to do
              their work.
            </p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="font-label font-bold text-[15px] text-accent body-link">
            ← Back to the briefing
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
