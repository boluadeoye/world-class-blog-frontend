// src/components/home/LuxLatest.jsx
"use client";

// helper
const first = (...vals) => vals.find(v => typeof v === "string" && v.trim().length > 0) || "";

function ytIdFromUrl(u) {
  try {
    const url = new URL(u);
    if (url.hostname === "youtu.be") return url.pathname.slice(1);
    if (url.searchParams.get("v")) return url.searchParams.get("v");
    const parts = url.pathname.split("/").filter(Boolean);
    const i = parts.findIndex(p => ["embed", "shorts", "v", "watch"].includes(p));
    if (i >= 0 && parts[i + 1]) return parts[i + 1];
    return parts[parts.length - 1] || null;
  } catch { return null; }
}

// Find a usable cover image from many shapes (API/editor/SEO)
function coverOf(p) {
  // common direct fields
  const direct = first(
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

  // images_inline like our post generator
  try {
    const inl = Array.isArray(p?.images_inline) ? p.images_inline : [];
    const firstInl = first(inl?.[0]?.url, inl?.[1]?.url);
    if (firstInl) return firstInl;
  } catch {}

  // EditorJS blocks in content or content_editorjs
  try {
    const c = typeof p?.content === "string" ? JSON.parse(p.content) : p?.content;
    const blocks = Array.isArray(c?.blocks) ? c.blocks : [];
    const imgBlock = blocks.find(b => b?.type === "image" && (b?.data?.file?.url || b?.data?.url));
    const url = imgBlock?.data?.file?.url || imgBlock?.data?.url;
    if (url) return url;
  } catch {}

  try {
    const c2 = typeof p?.content_editorjs === "string"
      ? JSON.parse(p.content_editorjs)
      : p?.content_editorjs;
    const blocks2 = Array.isArray(c2?.blocks) ? c2.blocks : [];
    const imgBlock2 = blocks2.find(b => b?.type === "image" && (b?.data?.file?.url || b?.data?.url));
    const url2 = imgBlock2?.data?.file?.url || imgBlock2?.data?.url;
    if (url2) return url2;
  } catch {}

  // scrape first <img src="..."> from HTML
  if (typeof p?.content_html === "string") {
    const m = p.content_html.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (m?.[1]) return m[1];
  }

  // YouTube thumbnail from first reference/link if present
  try {
    const yts = Array.isArray(p?.youtube_references) ? p.youtube_references : [];
    const yurl = first(yts?.[0]?.url, yts?.[1]?.url, yts?.[2]?.url);
    const id = ytIdFromUrl(yurl || "");
    if (id) return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  } catch {}

  // last resort: empty → gradient fallback will show
  return "";
}

function toTitle(s) {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function catOf(p) {
  const known = ["health","finance","technology","education","others"];
  const raw =
    (p?.category && (typeof p.category === "string" ? p.category : (p.category?.name || p.category?.title || p.category?.slug))) ||
    p?.category_name ||
    p?.categoryName ||
    p?.categoryTitle ||
    (Array.isArray(p?.categories) && (p.categories[0]?.name || p.categories[0]?.title || p.categories[0]?.slug)) ||
    "";

  let c = String(raw || "").trim().toLowerCase();
  if (c && known.includes(c)) return toTitle(c);

  // try tags
  const tags = Array.isArray(p?.tags) ? p.tags.map(x => String(x).toLowerCase()) : [];
  const hit = tags.find(t => known.includes(t));
  if (hit) return toTitle(hit);

  // if we still have raw category, show it as Title Case (don’t force “Other”)
  if (raw) return toTitle(String(raw));

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
      {/* Beautiful premium headline kept, with a small browse pill nudged left */}
      <div className="lux-header">
        <div className="section-eyebrow tracking-[.22em] text-slate-400">Latest Posts</div>
        <div className="flex items-center gap-2 flex-wrap">
          <h2 className="lux-h2">Fresh from the blog</h2>
          <a href="/articles" className="btn-beam-gold btn-xs ml-1">Browse →</a>
        </div>
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
