export function timeAgo(iso: string): string {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) {
    const h = Math.floor(diff / 3600);
    return `${h} hr${h === 1 ? "" : "s"} ago`;
  }
  const d = Math.floor(diff / 86400);
  return `${d} day${d === 1 ? "" : "s"} ago`;
}

export function formatDateline(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function editionLabel(d: Date = new Date()): string {
  const h = d.getHours();
  if (h < 5) return "Night Edition";
  if (h < 12) return "Morning Edition";
  if (h < 17) return "Afternoon Edition";
  return "Evening Edition";
}

export function fullDate(d: Date = new Date()): string {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function isRecent(iso: string, hours = 6): boolean {
  return Date.now() - new Date(iso).getTime() < hours * 3600_000;
}
