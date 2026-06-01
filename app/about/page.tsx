import type { Metadata } from "next";
import Link from "next/link";
import PageShell from "@/components/SupportPageShell";

export const metadata: Metadata = {
  title: "About Good Godly News — Editorial standards and how aggregation works",
  description:
    "Good Godly News is a daily, reader-supported briefing on faith, family, and liberty. We aggregate, we don't republish. Read our editorial standards and disclosure.",
};

function H2({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="mt-12 mb-4 font-display font-black text-ink text-[28px] md:text-[34px] leading-[1.18] tracking-tight scroll-mt-24">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <PageShell>
      <article className="max-w-3xl mx-auto font-serif text-ink text-[19px] leading-[1.7] prose">
        <div className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-accent">
          About this briefing
        </div>
        <h1 className="mt-3 font-display font-black text-ink text-[40px] md:text-[52px] leading-[1.05] tracking-tight">
          A daily, reader-supported briefing on faith, family &amp; liberty.
        </h1>

        <p className="mt-6">
          Good Godly News is a daily reading habit for Christian and
          conservative families, parents, pastors, school-board members,
          lawyers, and institutional leaders. We curate the news that
          actually matters to that audience — courtrooms, legislatures,
          schools, agencies, churches, the institutions of civic life —
          and we stay out of the outrage cycle.
        </p>

        <p className="mt-4">
          We are an aggregator. We do not host original reporting. Every
          headline links to the publisher.
        </p>

        <H2>Our editorial mission</H2>
        <p>
          We cover six beats consistently: <em>faith and the church</em>,
          <em> family and parental rights</em>, <em>religious liberty</em>,
          <em> the unborn</em>, <em>education</em>, and <em>cultural and
          civic developments</em> that affect conservative Christian
          institutions and families. We prefer rulings, bills, data,
          documents, and primary sources over hot takes.
        </p>

        <H2 id="aggregation">How aggregation works</H2>
        <p>
          Each morning we pull headlines from more than fifty publishers
          we trust. An editor selects the day&apos;s coverage. Each story
          is paired with a short, AI-assisted summary reviewed for tone
          and accuracy before it reaches the homepage. Clicking any
          headline takes you to the original publisher. We earn no
          referral revenue on those clicks.
        </p>
        <p className="mt-4">
          See the <Link href="/#footer-sources" className="body-link">full source list</Link>.
        </p>

        <H2>Editorial standards</H2>
        <ul className="mt-2 space-y-2 list-none p-0">
          <li>— We summarize; we do not editorialize. Opinion is labeled.</li>
          <li>— We link directly to the publisher; we never frame their content as ours.</li>
          <li>— We correct errors visibly and quickly.</li>
          <li>— We do not boost stories because they generate traffic.</li>
          <li>— We do not run sponsored content disguised as coverage.</li>
        </ul>

        <H2>What we do not do</H2>
        <ul className="mt-2 space-y-2 list-none p-0">
          <li>— We do not run display advertising.</li>
          <li>— We do not use third-party tracking pixels.</li>
          <li>— We do not paywall the briefing.</li>
          <li>— We do not sell, share, or rent reader data.</li>
        </ul>

        <H2>How we are funded</H2>
        <p>
          Reader support — recurring memberships and one-time gifts.
          That&apos;s the entire model. See{" "}
          <Link href="/support" className="body-link">Support</Link>{" "}
          for how to join.
        </p>

        <H2 id="contact">Contact</H2>
        <p>
          For corrections, tips, or partnership inquiries, write{" "}
          <span className="font-display italic font-bold">editor@goodgodlynews.com</span>
          . We read everything.
        </p>

        <div className="mt-16 pt-8 border-t border-rule text-center">
          <Link href="/" className="font-label font-bold text-[15px] text-accent body-link">
            ← Back to the briefing
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
