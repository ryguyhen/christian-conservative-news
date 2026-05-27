export default function Footer() {
  return (
    <footer className="bg-navy text-cream/80">
      <div className="max-w-content mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">
        <div>
          <div className="font-display font-black text-2xl text-cream">
            Good Godly <span className="italic text-gold">News</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-cream/70">
            A daily editorial aggregating positive, encouraging Christian and
            conservative news from 56 trusted sources. Cut the noise, feed the spirit.
          </p>
        </div>
        <div>
          <h4 className="font-label uppercase tracking-widest text-gold text-sm mb-3">
            Categories
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li>Politics</li>
            <li>Faith</li>
            <li>Culture</li>
            <li>World</li>
            <li>Opinion</li>
          </ul>
        </div>
        <div>
          <h4 className="font-label uppercase tracking-widest text-gold text-sm mb-3">
            About
          </h4>
          <ul className="space-y-1.5 text-sm">
            <li>Our Sources</li>
            <li>Editorial Standards</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-navy-light">
        <div className="max-w-content mx-auto px-6 py-5 text-xs font-label uppercase tracking-widest text-cream/60 flex flex-col md:flex-row gap-2 justify-between">
          <span>© {new Date().getFullYear()} Good Godly News</span>
          <span>
            Articles are summarized; full stories live at the source publications.
          </span>
        </div>
      </div>
    </footer>
  );
}
