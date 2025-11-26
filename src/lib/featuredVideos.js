// src/lib/featuredVideos.js
const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

async function adminFetch(path, { method = "GET", headers = {}, body, ...rest } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
    ...rest,
  });
  let data = null;
  try { data = await res.json(); } catch { data = null; }
  if (!res.ok) {
    const err = new Error(data?.error || data?.message || res.statusText);
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

function toSlug(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function listVideos(limit = 24, includeDrafts = true) {
  const q = new URLSearchParams();
  q.set("type", "video");
  q.set("limit", String(limit));
  if (includeDrafts) q.set("includeDrafts", "true");
  return adminFetch(`/posts?${q.toString()}`);
}

export async function createVideo({ title, url, caption = "", start = "", featured = false, published = true }) {
  const safeContent = String(caption ?? "").trim(); // NEVER null
  const meta = { youtubeUrl: url, caption, start };
  const body = {
    title: String(title || "Video"),
    slug: toSlug(title || `video-${Date.now()}`),
    content: safeContent,                // <= empty string instead of null
    type: "video",
    tags: featured ? ["home-featured"] : [],
    meta,
    published: Boolean(published),
  };
  return adminFetch("/posts", { method: "POST", body });
}

export async function updateVideo(id, fields = {}) {
  // Ensure content never null
  const current = await adminFetch(`/posts/${id}`);
  const tags = Array.isArray(current?.tags) ? [...current.tags] : [];
  if (typeof fields.featured === "boolean") {
    const idx = tags.indexOf("home-featured");
    if (fields.featured && idx === -1) tags.push("home-featured");
    if (!fields.featured && idx !== -1) tags.splice(idx, 1);
  }
  const meta = { ...(current?.meta || {}) };
  if (fields.url != null) meta.youtubeUrl = fields.url;
  if (fields.caption != null) meta.caption = fields.caption;
  if (fields.start != null) meta.start = fields.start;

  const safeContent = fields.caption != null
    ? String(fields.caption ?? "").trim()
    : String(current?.content ?? "").trim();

  const body = {
    title: fields.title != null ? fields.title : current.title,
    slug: fields.slug != null ? fields.slug : current.slug,
    content: safeContent,                // <= never null
    type: "video",
    tags,
    meta,
    published: fields.published != null ? Boolean(fields.published) : Boolean(current.published),
  };
  return adminFetch(`/posts/${id}`, { method: "PUT", body });
}

export async function togglePublish(id, published) {
  return updateVideo(id, { published });
}

export async function toggleFeature(id, featured) {
  return updateVideo(id, { featured });
}

export async function deleteVideo(id) {
  return adminFetch(`/posts/${id}`, { method: "DELETE" });
}
