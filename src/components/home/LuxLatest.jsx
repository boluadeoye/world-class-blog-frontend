// src/components/home/LuxLatest.jsx
"use client";

function coverOf(p) {
  return (
    p?.cover ||
    p?.image ||
    p?.hero ||
    p?.hero_image?.url ||
    p?.thumbnail ||
    p?.images?.[0] ||
    ""
  );
}
function catOf(p) {
  const c = (p?.category || "").toString().trim();
  return c ? c[0].toUpperCase() + c.slice(1) : "Other";
}
function dateOf(p) {
  const d = p?.created_at || p?.createdAt || p?.date;
  try { return d ? new Date(d).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'}) : ""; }
  catch { return ""; }
}
function hrefOf(p) {
  const slug = p?.slug || p?.id || "";
  return slug ? `/post/${slug}` : "#";
}

export default function LuxLatest({ posts = [] }) {
  const items = (posts || []).slice(0, 3);
  if (!items.length) return null;

  return (
    <section className="mt-10 sm:mt-12">
      <div className="flex items-end justify-between mb-4 sm:mb-5">
        <div>
          <div className="section-eyebrow tracking-[.25em] text-slate-400">Latest Posts</div>
          <h2 className="lux-h2">Fresh from the blog</h2>
        </div>
        <a href="/articles" className="btn-outline-lux">Browse Everything →</a>
      </div>

      <div className="space-y-6">
        {items.map((p, i) => {
          const href = hrefOf(p);
          const title = p?.title || "Untitled";
          const img = coverOf(p);
          const cat = catOf(p);
          const date = dateOf(p);

          return (
            <a key={i} href={href} className="lux-card group">
              <div className="lux-media">
                {img ? (
                  <img
                    src={img}
                    alt={title}
                    className="lux-img"
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ) : (
                  <div className="lux-img lux-img-fallback" />
                )}
                <div className="lux-media-overlay" />
                <div className="lux-meta">
                  <span className="lux-chip">{cat}</span>
                  {date && <span className="lux-date">{date}</span>}
                </div>
              </div>

              <div className="lux-body">
                <h3 className="lux-title">{title}</h3>
                <div className="lux-underline" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
