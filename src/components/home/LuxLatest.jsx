// src/components/home/LuxLatest.jsx
"use client";

const first = (...vals) => vals.find(v => typeof v === "string" && v.trim().length > 0) || "";

/* Robust cover extraction:
   - meta.cover
   - hero/og/cover fields
   - first Markdown image inside `content`
   - first <img src> inside `content_html`
   - EditorJS image in `content` or `content_editorjs`
*/
function coverOf(p) {
  const direct = first(
    p?.meta?.cover,
    p?.hero_image?.url,
    p?.heroImage?.url,
    p?.og_image,
    p?.ogImage,
    p?.seo?.og_image,
    p?.seo?.ogImage,
    p?.seo?.openGraph?.image,
    p?.cover?.url,
    p?.cover_url,
    p?.coverUrl,
    p?.image_url,
    p?.imageUrl,
    p?.image,
    p?.thumbnail,
    p?.banner?.url,
    p?.banner_image?.url
  );
  if (direct) return direct;

  // Markdown content: ![alt](url)
  if (typeof p?.content === "string") {
    const m = p.content.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
    if (m?.[1]) return m[1];
  }

  // HTML: <img src="...">
  if (typeof p?.content_html === "string") {
    const m2 = p.content_html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m2?.[1]) return m2[1];
  }

  // EditorJS inside content/content_editorjs
  try {
    const ej = typeof p?.content === "string" ? JSON.parse(p.content) : p?.content;
    const blocks = Array.isArray(ej?.blocks) ? ej.blocks : [];
    const img = blocks.find(b => b?.type === "image" && (b?.data?.file?.url || b?.data?.url));
    const u = img?.data?.file?.url || img?.data?.url;
    if (u) return u;
  } catch {}
  try {
    const ej2 = typeof p?.content_editorjs === "string" ? JSON.parse(p.content_editorjs) : p?.content_editorjs;
    const blocks2 = Array.isArray(ej2?.blocks) ? ej2.blocks : [];
    const img2 = blocks2.find(b => b?.type === "image" && (b?.data?.file?.url || b?.data?.url));
    const u2 = img2?.data?.file?.url || img2?.data?.url;
    if (u2) return u2;
  } catch {}

  return "";
}

function toTitle(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* Category extraction:
   - meta.category
   - category (object or string)
   - categories[0]
   - tags fallback
*/
function catOf(p) {
  const known = ["health","finance","technology","education","others"];
  const primary =
    p?.meta?.category ||
    (typeof p?.category === "string" ? p.category : (p?.category?.name || p?.category?.title || p?.category?.slug)) ||
    (Array.isArray(p?.categories) && (p.categories[0]?.name || p.categories[0]?.title || p.categories[0]?.slug)) ||
    "";

  let c = String(primary || "").trim();
  if (c) {
    const low = c.toLowerCase();
    if (known.includes(low)) return toTitle(low);
    return toTitle(c); // show provided category even if custom
  }

  const tags = Array.isArray(p?.tags) ? p.tags.map(t => String(t).toLowerCase()) : [];
  const hit = tags.find(t => known.includes(t));
  if (hit) return toTitle(hit);

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
      {/* Keep only 'Latest Posts' + small Browse on the right */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <div className="section-eyebrow tracking-[.22em] text-slate-400">Latest Posts</div>
        <a href="/articles" className="btn-beam-gold btn-xs mr-1">Browse →</a>
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
                    referrerPolicy="no-referrer"
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
