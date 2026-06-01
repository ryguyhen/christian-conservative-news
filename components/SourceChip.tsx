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
    <span className={`inline-flex items-center gap-2 ${size === "md" ? "text-[14px]" : "text-[13px]"}`}>
      <span className="monogram" aria-hidden>{m}</span>
      <span className="font-label font-bold uppercase tracking-[0.04em] text-ink">
        {shortSource(source)}
      </span>
    </span>
  );
}
