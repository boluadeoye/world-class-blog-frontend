// src/components/home/LuxLatest.jsx
"use client";

const first = (...vals) => vals.find(v => typeof v === "string" && v.trim().length > 0) || "";
const FALLBACK_IMG = "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1600&q=80";
const isVideo = (p) => String(p?.type || "").toLowerCase() === "video" || !!(p?.meta?.youtubeUrl) || !!(p?.meta?.youtubeId);

function coverOf(p) {
  const direct = first(
    p?.meta?.cover,
    p?.hero_image?.url, p?.heroImage?.url,
    p?.og_image, p?.ogImage, p?.seo?.og_image, p?.seo?.ogImage, p?.seo?.openGraph?.image,
    p?.cover?.url, p?.cover_url, p?.coverUrl,
    p?.image_url, p?.imageUrl, p?.image,
    p?.thumbnail, p?.banner?.url, p?.banner_image?.url
  );
  if (direct) return direct;

  if (typeof p?.content === "string") {
    const m = p.content.match(/!\[[^\]]*\]\((https?:\/\/[^\s)]+)\)/i);
    if (m?.[1]) return m[1];
  }
  if (typeof p?.content_html === "string"){
    const m2 = p.content_html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m2?.[1]) return m2[1];
  }
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

const toTitle = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : "");
function catOf(p) {
  const primary =
    p?.meta?.category ||
    (typeof p?.category === "string" ? p.category : (p?.category?.name || p?.category?.title || p?.category?.slug)) ||
    (Array.isArray(p?.categories) && (p?.categories[0]?.name || p?.categories[0]?.title || p?.categories[0]?.slug)) ||
    "";
  if (primary) return toTitle(String(primary));
  const known = ["health","finance","technology","education","others"];
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
  const items = (posts || []).filter(p => !isVideo(p)).slice(0, 3);
  if (!items.length) return null;

  return (
    <section className="mt-8 sm:mt-10">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="lux-h2">Latest Posts</h2>
        <a href="/articles" className="btn-beam-gold btn-xs mr-2">Browse →</a>
      </div>

      <div className="lux-list">
        {items.map((p, i) => {
          const href = hrefOf(p);
          const title = p?.title || "Untitled";
          const img = coverOf(p) || FALLBACK_IMG;
          const cat = catOf(p);
          const date = dateOf(p);

          return (
            <a key={i} href={href} className="lux-card group">
              <div className="lux-media">
                <img
                  src={img}
                  alt={title}
                  className="lux-img"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={(e)=>{ e.currentTarget.src = FALLBACK_IMG; }}
                />
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
