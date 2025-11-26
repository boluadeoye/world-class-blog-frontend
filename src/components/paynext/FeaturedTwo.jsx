// src/components/paynext/FeaturedTwo.jsx (no auto fallback images)
function whenOf(p) {
  const d = new Date(p?.created_at || p?.createdAt || Date.now());
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });
}
export default function FeaturedTwo({ posts = [] }) {
  if (!Array.isArray(posts) || posts.length === 0) return null;
  const items = posts.slice(0, 2);
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-6">
      <div className="mx-auto max-w-6xl grid gap-4 lg:grid-cols-2">
        {items.map((p, i) => {
          const href = p?.slug ? `/post/${p.slug}` : "#";
          const cover = p?.meta?.cover || p?.meta?.image || null;
          const tag = Array.isArray(p?.tags) && p.tags[0] ? p.tags[0] : null;
          return (
            <a key={i} href={href} className="group block overflow-hidden rounded-[22px] border border-slate-800 bg-slate-900/40 relative">
              <div className="relative aspect-[16/9]">
                {cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img alt="" src={cover} className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" loading="lazy" />
                ) : (
                  <div className="card-grad absolute inset-0" />
                )}
                <div className="card-overlay" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <div className="flex items-center gap-2">
                    {tag ? <span className="chip">{tag}</span> : null}
                    <span className="meta">{whenOf(p)}</span>
                  </div>
                  <h3 className="title-on-image mt-2">{p?.title || "Untitled"}</h3>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
