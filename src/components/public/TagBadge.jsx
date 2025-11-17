export default function TagBadge({ tag }) {
  if (!tag) return null;
  return (
    <a
      href={`/tag/${encodeURIComponent(tag)}`}
      className="inline-flex items-center rounded-full border border-slate-700/80 bg-slate-900/80 px-2.5 py-0.5 text-[10px] text-slate-300 hover:border-sky-500/70 hover:text-sky-100 transition"
    >
      #{tag}
    </a>
  );
}