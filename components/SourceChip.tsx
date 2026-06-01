import { monogramFor, shortSource } from "@/lib/sourceMeta";

export default function SourceChip({
  source,
  size = "sm",
}: {
  source: string;
  size?: "sm" | "md";
}) {
  const m = monogramFor(source);
  return (
    <span className={`inline-flex items-center gap-2 ${size === "md" ? "text-[13px]" : "text-[12px]"}`}>
      <span className="monogram" aria-hidden>{m}</span>
      <span className="font-label uppercase tracking-[0.12em] font-semibold text-ink">
        {shortSource(source)}
      </span>
    </span>
  );
}
