// src/components/home/LuxLatest.jsx
"use client";

// Try very hard to find a usable cover image
function coverOf(p) {
  const tryKeys = [
    p?.hero_image?.url,
    p?.heroImage?.url,
    p?.og_image,
    p?.ogImage,
    p?.cover,
    p?.cover_url,
    p?.coverUrl,
    p?.image,
    p?.image_url,
    p?.imageUrl,
    p?.thumbnail,
    p?.banner,
    p?.banner_image?.url,
  ].filter(Boolean);
  if (tryKeys.length) return tryKeys[0];

  // EditorJS content (string or object)
  try {
    const c = typeof p?.content === "string" ? JSON.parse(p.content) : p?.content;
    const blocks = Array.isArray(c?.blocks) ? c.blocks : [];
    const imgBlock = blocks.find(b => b?.type === "image" && (b?.data?.file?.url || b?.data?.url));
    const url = imgBlock?.data?.file?.url || imgBlock?.data?.url;
    if (url) return url;
  } catch {}

  // Any alternate fields people use
  try {
    const c2 = typeof p?.content_editorjs === "string"
      ? JSON.parse(p.content_editorjs)
      : p?.content_editorjs;
    const blocks = Array.isArray(c2?.blocks) ? c2.blocks : [];
    const imgBlock = blocks.find(b => b?.type === "image" && (b?.data?.file?.url || b?.data?.url));
    const url = imgBlock?.data?.file?.url || imgBlock?.data?.url;
    if (url) return url;
  } catch {}

  // Fallback: scrape a src from HTML if present
  if (typeof p?.content_html === "string") {
    const m = p.content_html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m?.[1]) return m[1];
  }

  return ""; // let the component fall back to gradient
}

function catOf(p) {
  const known = ["health","finance","technology","education","others"];
  const c = String(p?.category || "").trim().toLowerCase();
  if (c && known.includes(c)) return c[0].toUpperCase() + c.slice(1);

  // Try tags
  const tags = Array.isArray(p?.tags) ? p.tags : [];
  const hit = tags
    .map(t => String(t).toLowerCase())
    .find(t => known.includes(t));
  if (hit) return hit[0].toUpperCase() + hit.slice(1);

  return "Other";
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
    <section className="mt-8 sm:mt-10">
      {/* No big heading — just a tiny browse button on the right */}
      <div className="flex items-center justify-end mb-3">
        <a href="/articles" className="btn-beam-gold btn-xs">Browse →</a>
      </div>

      <div className="space-y-5">
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
                <h3 className="lux-title sm">{title}</h3>
                <div className="lux-underline" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
