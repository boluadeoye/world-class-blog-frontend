// src/lib/homeData.js
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

// --- Posts ---
export async function fetchLatestPosts(limit = 12, tag = "") {
  const u = new URL(`${API_BASE}/posts`);
  u.searchParams.set("limit", String(limit));
  if (tag) u.searchParams.set("tag", tag);
  try {
    const res = await fetch(u.toString(), { cache: "no-store" });
    if (!res.ok) return [];
    const arr = await res.json();
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

// Pick top 2 as featured (or fewer if not enough)
export function pickFeatured(posts = []) {
  if (!Array.isArray(posts) || posts.length === 0) return [];
  return posts.slice(0, 2);
}

// --- Videos (type=video or meta.youtubeUrl) ---
function parseStart(v) {
  if (!v) return 0;
  if (/^\d+$/.test(String(v))) return parseInt(v, 10);
  const m = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i.exec(String(v));
  if (!m) return 0;
  return (parseInt(m[1]||"0",10)*3600)+(parseInt(m[2]||"0",10)*60)+(parseInt(m[3]||"0",10));
}
function extractId(url) {
  try {
    if (!url) return null;
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./,"").toLowerCase();
    let id = null;
    if (host === "youtu.be") id = u.pathname.split("/")[1] || null;
    else if (host.endsWith("youtube.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (parts.length >= 2 && ["shorts","embed","live"].includes(parts[0])) id = parts[1] || null;
    }
    const start = parseStart(u.searchParams.get("t") || u.searchParams.get("start"));
    return id ? { id, start } : null;
  } catch { return null; }
}

export async function fetchRecentVideos(limit = 3) {
  try {
    const u = new URL(`${API_BASE}/posts`);
    u.searchParams.set("limit", String(Math.max(3, limit)));
    u.searchParams.set("type", "video"); // backend supports this; if it doesn't, we'll filter below
    const res = await fetch(u.toString(), { cache: "no-store" });
    const arr = res.ok ? await res.json() : [];
    const list = (Array.isArray(arr) ? arr : []).filter(Boolean);
    const vids = list.map(p => {
      const meta = p?.meta || {};
      const pick = meta.youtubeId ? { id: meta.youtubeId, start: Number(meta.start||0)||0 } : (meta.youtubeUrl ? extractId(meta.youtubeUrl) : null);
      if (!pick) return null;
      return { id: pick.id, start: pick.start || 0, title: p?.title || meta.title || "Video", caption: meta.caption || "", slug: p?.slug || "" };
    }).filter(Boolean);
    return vids.slice(0, limit);
  } catch {
    return [];
  }
}
