"use client";

import { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import CoverUpload from "./CoverUpload";

const CATEGORIES = ["Health", "Finance", "Technology", "Education", "Other"];
const TYPES = ["article", "video"];

export default function PostForm({ initialPost, onSave, saving, error }) {
  const [title, setTitle] = useState(initialPost?.title || "");
  const [slug, setSlug] = useState(initialPost?.slug || "");
  const [category, setCategory] = useState(initialPost?.category || "Other");
  const [content, setContent] = useState(initialPost?.content || "");
  const [cover, setCover] = useState(initialPost?.cover || "");
  const [typeVal, setTypeVal] = useState(initialPost?.type || "article");
  const [published, setPublished] = useState(
    typeof initialPost?.published === "boolean" ? initialPost.published : true
  );

  const [slugEdited, setSlugEdited] = useState(false);
  const [tagsText, setTagsText] = useState(
    Array.isArray(initialPost?.tags) ? initialPost.tags.join(", ") : ""
  );

  useEffect(() => {
    setTitle(initialPost?.title || "");
    setSlug(initialPost?.slug || "");
    setCategory(initialPost?.category || "Other");
    setContent(initialPost?.content || "");
    setCover(initialPost?.cover || "");
    setTypeVal(initialPost?.type || "article");
    setPublished(
      typeof initialPost?.published === "boolean" ? initialPost.published : true
    );
    setSlugEdited(false);
    setTagsText(Array.isArray(initialPost?.tags) ? initialPost.tags.join(", ") : "");
  }, [initialPost]);

  function slugify(text) {
    return String(text)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  }

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
    if (!slugEdited) setSlug(slugify(value));
  };

  const handleSlugChange = (e) => {
    setSlug(e.target.value);
    setSlugEdited(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tags = tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      ...(initialPost?.id ? { id: initialPost.id } : {}),
      title,
      slug: slug || slugify(title),
      category,
      content, // markdown string
      cover,   // uploaded/public URL
      type: typeVal,          // <- include type
      published,              // <- include published
      tags
    };

    await onSave(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300">Title</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={handleTitleChange}
            placeholder="Post title"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300">Slug</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={slug}
            onChange={handleSlugChange}
            placeholder="post-title-slug"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Auto‑generated from the title. You can override it here.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300">Category</label>
          <select
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-slate-500">
            Choose the primary topic for this article.
          </p>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-300">Tags</label>
          <input
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={tagsText}
            onChange={(e) => setTagsText(e.target.value)}
            placeholder="health, productivity, web, devops"
          />
          <p className="mt-1 text-[11px] text-slate-500">
            Comma‑separated. Example: <code>health, finance, ai</code>
          </p>
        </div>
      </div>

      {/* Type + Published */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-medium text-slate-300">Type</label>
          <select
            className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={typeVal}
            onChange={(e) => setTypeVal(e.target.value)}
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <p className="mt-1 text-[11px] text-slate-500">
            Use <code>video</code> for YouTube/video posts, <code>article</code> for normal posts.
          </p>
        </div>

        <div className="flex items-end">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
            <span className="text-sm text-slate-200">Published</span>
          </label>
        </div>
      </div>

      {/* Cover controls */}
      <div>
        <label className="block text-xs font-medium text-slate-300">Cover image</label>
        <div className="mt-1 flex items-center gap-2">
          <input
            className="adm-input flex-1 mt-0 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://…/cover.jpg"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
          <CoverUpload onChange={(url)=>setCover(url)} />
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

      <div>
        <label className="mb-2 block text-xs font-medium text-slate-300">Content</label>
        <div className="rounded-lg border border-slate-700 bg-slate-900 p-3">
          <RichTextEditor value={content} onChange={setContent} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Post"}
        </button>

        {error && (
          <p className="rounded-md border border-red-900 bg-red-950/40 px-3 py-2 text-xs text-red-400">
            {String(error)}
          </p>
        )}
      </div>
    </form>
  );
}
