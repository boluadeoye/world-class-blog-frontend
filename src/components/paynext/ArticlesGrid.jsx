// src/components/paynext/ArticlesGrid.jsx (no auto fallback images)
function whenOf(p) {
  const d = new Date(p?.created_at || p?.createdAt || Date.now());
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}
export default function ArticlesGrid({ posts = [] }) {
  const have = Array.isArray(posts) && posts.length > 0;
  if (!have) {
    return (
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 px-4 py-6 text-slate-200">
          <div className="text-lg font-semibold">No posts yet</div>
          <p className="mt-1 text-sm text-slate-400">Publish posts to see them here.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => {
          const href = p?.slug ? `/post/${p.slug}` : "#";
          const cover = p?.meta?.cover || p?.meta?.image || null;
          return (
            <a key={i} href={href} className="group block">
              <div className="overflow-hidden rounded-[18px] border border-slate-800 bg-slate-900/40">
                <div className="relative aspect-[16/9]">
                  {cover ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img alt="" src={cover} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
                  ) : (
                    <div className="card-grad absolute inset-0" />
                  )}
                </div>
                <div className="p-3">
                  {Array.isArray(p?.tags) && p.tags[0] ? (
                    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">{p.tags[0]}</div>
                  ) : <div className="h-[14px]" />}
                  <h3 className="mt-1 text-slate-50 font-semibold leading-snug">{p?.title || "Untitled"}</h3>
                  <div className="mt-1 text-[12px] text-slate-400">{whenOf(p)}</div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
