// src/lib/api.js
const DEFAULT_API = "https://project-blog-backend-beta.vercel.app/api";
const API_BASE = (typeof process.env.NEXT_PUBLIC_API_URL === "string" && process.env.NEXT_PUBLIC_API_URL.trim())
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
  : DEFAULT_API;

export async function getPublicPosts() {
  const url = `${API_BASE}/posts/featured`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch public posts (${res.status})`);
  return res.json();
}

export async function getPostBySlug(slug) {
  const url = `${API_BASE}/posts/slug/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to fetch post by slug (${res.status})`);
  return res.json();
}

// Helpers for YouTube parsing
function parseStart(value) {
  if (!value) return 0;
  if (/^\d+$/.test(String(value))) return parseInt(value, 10);
  const m = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i.exec(String(value));
  if (!m) return 0;
  return (parseInt(m[1]||"0",10)*3600)+(parseInt(m[2]||"0",10)*60)+(parseInt(m[3]||"0",10));
}
function extractFromUrl(url) {
  try {
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

export async function getHomeFeaturedVideo() {
  try {
    const u1 = `${API_BASE}/posts?type=video&tag=home-featured&limit=1`;
    const r1 = await fetch(u1, { cache: "no-store" });
    if (r1.ok) {
      const a1 = await r1.json();
      if (Array.isArray(a1) && a1.length) {
        const p = a1[0] || {};
        const meta = p.meta || {};
        const url = meta.youtubeUrl || null;
        const parsed = meta.youtubeId ? { id: meta.youtubeId, start: Number(meta.start||0) || 0 }
          : (url ? extractFromUrl(url) : null);
        return parsed ? { id: parsed.id, url, title: p.title || meta.title || "", caption: meta.caption || "", start: parsed.start } : null;
      }
    }
  } catch {}
  try {
    const u2 = `${API_BASE}/posts/featured?limit=5`;
    const r2 = await fetch(u2, { cache: "no-store" });
    if (r2.ok) {
      const a2 = await r2.json();
      const p = (Array.isArray(a2) ? a2 : []).find(x => x?.type === "video" || x?.meta?.youtubeUrl || x?.meta?.youtubeId);
      if (p) {
        const meta = p.meta || {};
        const url = meta.youtubeUrl || null;
        const parsed = meta.youtubeId ? { id: meta.youtubeId, start: Number(meta.start||0) || 0 }
          : (url ? extractFromUrl(url) : null);
        return parsed ? { id: parsed.id, url, title: p.title || meta.title || "", caption: meta.caption || "", start: parsed.start } : null;
      }
    }
  } catch {}
  return null;
}

// Recent video posts -> simplified list for grid
export async function getRecentVideos(limit = 3) {
  try {
    const url = `${API_BASE}/posts?type=video&limit=${encodeURIComponent(limit)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const arr = await res.json();
    if (!Array.isArray(arr)) return [];
    return arr.map(p => {
      const meta = p?.meta || {};
      const parsed = meta.youtubeId ? { id: meta.youtubeId, start: Number(meta.start||0) || 0 } :
        (meta.youtubeUrl ? extractFromUrl(meta.youtubeUrl) : null);
      return {
        slug: p?.slug || "",
        title: p?.title || "",
        url: meta.youtubeUrl || "",
        videoId: parsed?.id || null,
        start: parsed?.start || 0,
      };
    }).filter(x => x.videoId);
  } catch {
    return [];
  }
}

// Return latest published posts (fallback-safe)
export async function getLatestPosts(limit = 10) {
  const url = `${(typeof process.env.NEXT_PUBLIC_API_URL === "string" && process.env.NEXT_PUBLIC_API_URL.trim() ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "") : "https://project-blog-backend-beta.vercel.app/api")}/posts?limit=${encodeURIComponent(limit)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const arr = await res.json();
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}
