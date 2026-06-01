import Link from "next/link";
import { SOURCE_NAMES } from "@/lib/sources";
import { shortSource } from "@/lib/sourceMeta";

export default function Footer() {
  return (
    <footer className="bg-navy text-paper-on-navy mt-16">
      <div className="max-w-content mx-auto px-6 py-12">
        <div className="grid md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-10">
          <div>
            <div className="font-display font-black text-[30px] text-paper-on-navy leading-none">
              Good Godly News
            </div>
            <p className="mt-4 text-[15px] leading-[1.6] text-paper-on-navy-soft max-w-md">
              A daily, reader-supported briefing on faith, family, and
              liberty. We do not host original content — every headline
              links to the publisher. Summaries are AI-assisted and reviewed
              for tone. We accept no advertising and run no tracking.
              Reader support is the only thing that makes this possible.
            </p>
            <p className="mt-4 text-[13px] font-label font-bold uppercase tracking-[0.06em] text-gold">
              No ads · No trackers · No paywall
            </p>
          </div>

          <div>
            <h4 className="font-label font-bold uppercase tracking-[0.06em] text-gold text-[13px] mb-3">
              Sections
            </h4>
            <ul className="space-y-2 text-[15px] text-paper-on-navy">
              <li>Politics</li>
              <li>Faith</li>
              <li>Culture</li>
              <li>World</li>
              <li>Opinion</li>
            </ul>
          </div>

          <div>
            <h4 className="font-label font-bold uppercase tracking-[0.06em] text-gold text-[13px] mb-3">
              About
            </h4>
            <ul className="space-y-2 text-[15px] text-paper-on-navy">
              <li><Link href="/about" className="hover:underline focus-visible:underline">Editorial standards</Link></li>
              <li><Link href="/about#aggregation" className="hover:underline focus-visible:underline">How aggregation works</Link></li>
              <li><Link href="/about#contact" className="hover:underline focus-visible:underline">Contact</Link></li>
              <li>Privacy</li>
            </ul>
          </div>

          <div>
            <h4 className="font-label font-bold uppercase tracking-[0.06em] text-gold text-[13px] mb-3">
              Support
            </h4>
            <ul className="space-y-2 text-[15px] text-paper-on-navy">
              <li><Link href="/support" className="text-gold font-bold hover:text-gold-soft hover:underline focus-visible:underline">Become a Supporter</Link></li>
              <li><Link href="/support#tiers" className="hover:underline focus-visible:underline">Membership tiers</Link></li>
              <li><Link href="/support#one-time" className="hover:underline focus-visible:underline">Give one time</Link></li>
              <li><Link href="/support#transparency" className="hover:underline focus-visible:underline">Where the money goes</Link></li>
            </ul>
          </div>
        </div>

        <div id="footer-sources" className="mt-12 pt-8 border-t border-navy-mid">
          <h4 className="font-label font-bold uppercase tracking-[0.06em] text-gold text-[13px] mb-4">
            Curated From · {SOURCE_NAMES.length} Publishers
          </h4>
          <p className="text-[14px] leading-[1.7] text-paper-on-navy-soft">
            {SOURCE_NAMES.map((s, i) => (
              <span key={s}>
                {shortSource(s)}
                {i < SOURCE_NAMES.length - 1 && (
                  <span aria-hidden className="text-paper-on-navy-soft/60 mx-2">·</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="border-t border-navy-mid">
        <div className="max-w-content mx-auto px-6 py-5 text-[13px] font-label font-semibold uppercase tracking-[0.06em] text-paper-on-navy-soft flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Good Godly News</span>
          <span>Reader-supported · No original reporting · Aggregator</span>
        </div>
      </div>
    </footer>
  );
}
