// src/components/paynext/LatestGrid.jsx
function whenOf(p) {
  const d = new Date(p?.created_at || p?.createdAt || Date.now());
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}
function categoryOf(p) {
  const metaCat = p?.meta?.category;
  const tag = Array.isArray(p?.tags) && p.tags[0] ? p.tags[0] : null;
  return metaCat || tag || "General";
}
export default function LatestGrid({ posts = [] }) {
  const items = Array.isArray(posts) ? posts.slice(0, 6) : [];
  if (items.length === 0) return null;

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-6xl mb-3 flex items-end justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[.18em] text-slate-400">Latest Posts</div>
          <h2 className="h2-compact">Fresh from the blog</h2>
        </div>
        <a href="/articles" className="btn-ghost">Browse Everything →</a>
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Always 2 columns — no side scroll */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {items.map((p, i) => {
            const href = p?.slug ? `/post/${p.slug}` : "#";
            const cover = p?.meta?.cover || p?.meta?.image || null;
            return (
              <a key={i} href={href} className="group shine-card overflow-hidden rounded-[16px] relative">
                <div className="rounded-[16px] overflow-hidden border border-slate-800 bg-slate-900/40 transition-transform duration-200 group-hover:-translate-y-[2px]">
                  <div className="relative aspect-[16/10]">
                    {cover ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        alt=""
                        src={cover}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <div className="card-grad absolute inset-0" />
                    )}
                    <div className="card-topfade" />
                  </div>
                  <div className="p-3 sm:p-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                        {categoryOf(p)}
                      </span>
                      <span className="text-[11px] text-slate-500">•</span>
                      <span className="text-[11px] text-slate-400">{whenOf(p)}</span>
                    </div>
                    <h3 className="mt-1 text-[13.5px] sm:text-[15px] font-semibold leading-snug text-slate-50 group-hover:text-white">
                      {p?.title || "Untitled"}
                    </h3>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
