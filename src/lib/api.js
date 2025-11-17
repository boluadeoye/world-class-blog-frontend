// src/lib/api.js
// Minimal, safe API helpers. Uses NEXT_PUBLIC_API_URL if present,
// otherwise falls back to the known live backend URL.

const DEFAULT_API = "https://project-blog-backend-beta.vercel.app/api";

// If an env var is set, use it; otherwise fall back.
// Trim trailing slash to avoid double // or bad concatenations.
const API_BASE = (typeof process.env.NEXT_PUBLIC_API_URL === "string" && process.env.NEXT_PUBLIC_API_URL.trim())
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")
  : DEFAULT_API;

/**
 * Fetch featured posts for the homepage (server-side).
 */
export async function getPublicPosts() {
  const url = `${API_BASE}/posts/featured`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch public posts (${res.status})`);
  }
  return res.json();
}

/**
 * Fetch a single post by slug (server-side).
 */
export async function getPostBySlug(slug) {
  const url = `${API_BASE}/posts/slug/${encodeURIComponent(slug)}`;
  const res = await fetch(url, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) {
    throw new Error(`Failed to fetch post by slug (${res.status})`);
  }
  return res.json();
}