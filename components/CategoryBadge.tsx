import { CATEGORY_COLORS, type Category } from "@/lib/types";

export default function CategoryBadge({ category }: { category: Category }) {
  const color = CATEGORY_COLORS[category];
  return (
    <span className="inline-flex items-center gap-2 font-label uppercase tracking-widest text-[11px] font-bold">
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <span style={{ color }}>{category}</span>
    </span>
  );
}
