// src/lib/homeData.js
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

async function getJSON(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

// Posts
export async function fetchLatestPosts(limit = 12, tag = "") {
  const u = new URL(`${API_BASE}/posts`);
  u.searchParams.set("limit", String(limit));
  if (tag) u.searchParams.set("tag", tag);
  const arr = await getJSON(u.toString());
  return Array.isArray(arr) ? arr : [];
}

// Featured posts (articles only; exclude video posts)
export async function fetchFeaturedPosts(limit = 2) {
  const u = `${API_BASE}/posts/featured?limit=${encodeURIComponent(Math.max(limit, 12))}`;
  const arr = await getJSON(u);
  if (!Array.isArray(arr)) return [];
  const onlyArticles = arr.filter(p => (p?.type || "article") !== "video");
  return onlyArticles.slice(0, limit);
}

// Video helpers
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
    if (host === "youtube.com" || host.endsWith("youtube.com")) {
      const parts = u.pathname.split("/").filter(Boolean);
      if (u.pathname === "/watch") id = u.searchParams.get("v");
      else if (parts.length >= 2 && ["shorts","embed","live"].includes(parts[0])) id = parts[1] || null;
    } else if (host === "youtu.be") {
      id = u.pathname.split("/")[1] || null;
    }
    const start = parseStart(u.searchParams.get("t") || u.searchParams.get("start"));
    return id ? { id, start } : null;
  } catch { return null; }
}

export async function fetchRecentVideos(limit = 3) {
  const u = new URL(`${API_BASE}/posts`);
  u.searchParams.set("limit", String(Math.max(3, limit)));
  u.searchParams.set("type", "video");
  const arr = await getJSON(u.toString());
  const list = Array.isArray(arr) ? arr : [];
  const vids = list.map(p => {
    const meta = p?.meta || {};
    const pick = meta.youtubeId ? { id: meta.youtubeId, start: Number(meta.start||0)||0 } : (meta.youtubeUrl ? extractId(meta.youtubeUrl) : null);
    if (!pick) return null;
    return { id: pick.id, start: pick.start||0, title: p?.title || meta.title || "Video", caption: meta.caption || (p?.content || ""), slug: p?.slug || "" };
  }).filter(Boolean);
  return vids.slice(0, limit);
}
export async function fetchVideoPosts(limit = 10) {
  return await fetchRecentVideos(limit);
}
export async function fetchFeaturedVideo() {
  const u = new URL(`${API_BASE}/posts`);
  u.searchParams.set("type", "video");
  u.searchParams.set("tag", "home-featured");
  u.searchParams.set("limit", "1");
  const arr = await getJSON(u.toString());
  const first = Array.isArray(arr) && arr[0] ? arr[0] : null;
  if (first) {
    const meta = first.meta || {};
    const pick = meta.youtubeId ? { id: meta.youtubeId, start: Number(meta.start||0)||0 } : (meta.youtubeUrl ? extractId(meta.youtubeUrl) : null);
    if (pick) return { id: pick.id, start: pick.start||0, title: first.title || meta.title || "Featured video", caption: meta.caption || (first.content || "") };
  }
  const backup = await fetchRecentVideos(1);
  return backup[0] || null;
}
