// src/components/paynext/ArticlesChips.jsx (server component)
export default function ArticlesChips({ tags = [], current = "" }) {
  const uniq = Array.from(new Set(tags.filter(Boolean))).slice(0, 12);
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <a href="/" className={["pay-chip", !current ? "pay-chip--active" : ""].join(" ")}>All Articles</a>
      {uniq.map((t) => (
        <a key={t} href={`/?tag=${encodeURIComponent(t)}`} className={["pay-chip", current === t ? "pay-chip--active" : ""].join(" ")}>
          {t}
        </a>
      ))}
    </div>
  );
}
