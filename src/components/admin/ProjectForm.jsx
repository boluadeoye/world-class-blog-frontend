"use client";

import { useEffect, useState } from "react";

export default function ProjectForm({ initialProject, onSave, saving, error }) {
  const [title, setTitle] = useState(initialProject?.title || "");
  const [url, setUrl] = useState(initialProject?.url || "");
  const [description, setDescription] = useState(initialProject?.description || "");
  const [imageUrl, setImageUrl] = useState(initialProject?.image_url || "");
  const [tagsText, setTagsText] = useState(
    Array.isArray(initialProject?.tags) ? initialProject.tags.join(", ") : ""
  );

  useEffect(() => {
    setTitle(initialProject?.title || "");
    setUrl(initialProject?.url || "");
    setDescription(initialProject?.description || "");
    setImageUrl(initialProject?.image_url || "");
    setTagsText(Array.isArray(initialProject?.tags) ? initialProject.tags.join(", ") : "");
  }, [initialProject]);

  function submit(e) {
    e.preventDefault();
    const tags = tagsText.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = {
      ...(initialProject?.id ? { id: initialProject.id } : {}),
      title, url, description,
      image_url: imageUrl || null,
      tags
    };
    onSave(payload);
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-slate-300">Title</label>
        <input className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-300">URL</label>
        <input className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          value={url} onChange={(e) => setUrl(e.target.value)} required />
        <p className="text-[11px] text-slate-500 mt-1">Paste the live site/app link (https://…)</p>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-300">Description</label>
        <textarea className="mt-1 h-28 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-300">Image override (optional)</label>
        <input className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://…" />
        <p className="text-[11px] text-slate-500 mt-1">Leave blank to auto‑generate a screenshot.</p>
      </div>
      <div>
        <label className="block text-xs font-medium text-slate-300">Tags</label>
        <input className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100"
          value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="react, nextjs, fintech" />
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving}
          className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500 disabled:opacity-60">
          {saving ? "Saving…" : "Save Project"}
        </button>
        {error && <p className="text-xs text-red-400">{String(error)}</p>}
      </div>
    </form>
  );
}