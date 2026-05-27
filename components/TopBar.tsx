export default function TopBar() {
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).toUpperCase();

  return (
    <div className="bg-navy text-cream border-b border-navy-light">
      <div className="max-w-content mx-auto px-6 py-2 flex items-center justify-between font-label text-[11px] uppercase tracking-widest">
        <span>{date}</span>
        <span className="hidden md:inline text-gold-light">goodgodlynews.com</span>
        <span className="text-gold-light/80 truncate max-w-[55%] text-right">
          56 Active Sources · Daily Wire · Breitbart · CBN · Fox · Federalist
        </span>
      </div>
    </div>
  );
}
