"use client";

import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CoverUpload from "../../../components/admin/CoverUpload";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

function toSlug(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function Page() {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState("Other");
  const [tagsStr, setTagsStr] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(""); // cover image URL
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [okMsg, setOk] = useState("");

  // auto-generate slug until user edits it
  useMemo(() => {
    if (!slugEdited) setSlug(toSlug(title));
  }, [title]); // eslint-disable-line react-hooks/exhaustive-deps

  const allTags = useMemo(() => {
    const base = tagsStr.split(",").map((s) => s.trim()).filter(Boolean);
    if (featured && !base.includes("home-featured")) base.push("home-featured");
    return Array.from(new Set(base));
  }, [tagsStr, featured]);

  async function save() {
    try {
      setSaving(true);
      setError("");
      setOk("");

      if (!title.trim()) throw new Error("Title is required.");
      if (!slug.trim()) throw new Error("Slug is required.");

      const body = {
        title: title.trim(),
        slug: slug.trim(),
        content: String(content ?? ""), // never null
        type: "article",
        tags: allTags,
        meta: { ...(category ? { category } : {}), ...(cover ? { cover } : {}) },
        published: Boolean(published),
      };

      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const msg = data?.error || data?.message || `Save failed (${res.status})`;
        throw new Error(msg);
      }
      setOk("Post saved. View it on the site.");
    } catch (e) {
      setError(e.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="text-2xl font-semibold text-slate-50">New Post</h1>
      <p className="mt-1 text-slate-400">Create a new article for your world‑class blog.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div>
          <label className="adm-label">Title</label>
          <input
            className="adm-input"
            placeholder="Post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="adm-label">Slug</label>
          <input
            className="adm-input"
            placeholder="post-title-slug"
            value={slug}
            onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
          />
        </div>

        <div>
          <label className="adm-label">Category</label>
          <select className="adm-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Other</option>
            <option>Technology</option>
            <option>Health</option>
            <option>Finance</option>
            <option>Education</option>
          </select>
        </div>

        <div>
          <label className="adm-label">Tags (comma‑separated)</label>
          <input
            className="adm-input"
            placeholder="health, productivity, web, devops"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
          />
          <div className="mt-1 text-xs text-slate-400">
            {featured ? "home-featured will be added automatically" : "Toggle “Feature on Home” to add home-featured"}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="adm-label">Cover image</label>
          <div className="flex gap-2 items-center">
            <input
              className="adm-input flex-1"
              placeholder="https://…/cover.jpg"
              value={cover}
              onChange={(e) => setCover(e.target.value)}
            />
            <CoverUpload onChange={(url)=>{ setCover(url); setError(""); setOk("Cover uploaded."); }} />
          </div>
          {cover ? (
            <div className="mt-2 overflow-hidden rounded-lg border border-slate-700/70">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cover} alt="Cover preview" className="w-full max-h-64 object-cover" />
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-400">No cover set — the card will show a gradient.</div>
          )}
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-3">
        <label className="adm-check">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /> Feature on Home
        </label>
        <label className="adm-check">
          <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} /> Published
        </label>
      </div>

      <div className="mt-4">
        <label className="adm-label">Content (Markdown supported)</label>
        <div className="grid gap-3 md:grid-cols-2">
          <textarea
            className="adm-input min-h-[260px] font-mono"
            placeholder="Write your post in Markdown…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="rounded-lg border border-slate-700/70 bg-slate-900/60 p-3 prose prose-invert max-w-none">
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            ) : (
              <div className="text-slate-400 text-sm">Live preview will appear here as you type.</div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button className="adm-btn" onClick={save} disabled={saving}>
          {saving ? "Saving…" : "Save Post"}
        </button>
      </div>

      {error ? <div className="adm-error mt-3">Error: {error}</div> : null}
      {okMsg ? <div className="mt-3 rounded-lg border border-emerald-700/50 bg-emerald-900/40 px-3 py-2 text-emerald-100">{okMsg}</div> : null}
    </div>
  );
}
