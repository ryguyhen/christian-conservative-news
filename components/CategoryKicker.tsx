import type { Category } from "@/lib/types";

const COLOR: Record<Category, string> = {
  Politics: "var(--cat-politics)",
  Faith: "var(--cat-faith)",
  Culture: "var(--cat-culture)",
  World: "var(--cat-world)",
  Opinion: "var(--cat-opinion)",
};

type Reason = "TOP STORY" | "LEAD" | "LATEST" | "EDITOR'S PICK" | null;

export default function CategoryKicker({
  category,
  reason = null,
  className = "",
}: {
  category: Category;
  reason?: Reason;
  className?: string;
}) {
  return (
    <span className={`kicker inline-flex items-baseline ${className}`}>
      {reason && (
        <>
          <span style={{ color: "var(--ink)" }}>{reason}</span>
          <span className="kicker-sep">/</span>
        </>
      )}
      <span style={{ color: COLOR[category] }}>{category}</span>
    </span>
  );
}
