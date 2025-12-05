"use client";
import { useState, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Save, Image as ImageIcon, Eye, Edit3, ArrowLeft, Check, AlertCircle, ExternalLink } from "lucide-react";
import CoverUpload from "../../../components/admin/CoverUpload";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

function toSlug(s) {
  return String(s || "").toLowerCase().trim().replace(/['"]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export default function EditorPage() {
  // State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [category, setCategory] = useState("Technology");
  const [tagsStr, setTagsStr] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [previewMode, setPreviewMode] = useState(false);

  // Auto-Slug
  useMemo(() => { if (!slugEdited) setSlug(toSlug(title)); }, [title]);

  // Save Logic
  async function save() {
    try {
      setSaving(true);
      setStatus({ type: "", msg: "" });

      if (!title.trim()) throw new Error("Title is required.");
      if (!slug.trim()) throw new Error("Slug is required.");

      const allTags = Array.from(new Set([
        ...tagsStr.split(",").map(s => s.trim()).filter(Boolean),
        ...(featured ? ["home-featured"] : [])
      ]));

      const body = {
        title: title.trim(),
        slug: slug.trim(),
        content: String(content ?? ""),
        type: "article",
        tags: allTags,
        meta: { category, cover },
        published: Boolean(published),
      };

      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || `Save failed (${res.status})`);

      setStatus({ type: "success", msg: "Post published successfully." });
    } catch (e) {
      setStatus({ type: "error", msg: e.message });
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 flex flex-col">
      
      {/* === HEADER TOOLBAR === */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/dashboard" className="p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="font-serif text-xl text-white tracking-tight hidden md:block">New Article</h1>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setPreviewMode(!previewMode)}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors md:hidden"
          >
            {previewMode ? <Edit3 size={18} /> : <Eye size={18} />}
          </button>
          
          <Link href="/media" target="_blank" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-slate-300 transition-colors">
            <ImageIcon size={14} /> Media Library <ExternalLink size={10} />
          </Link>

          <button 
            onClick={save} 
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            <span>Publish</span>
          </button>
        </div>
      </header>

      {/* === MAIN WORKSPACE === */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 h-full">
        
        {/* LEFT: EDITOR (Hidden on mobile if preview is active) */}
        <div className={`p-6 md:p-8 overflow-y-auto border-r border-white/5 ${previewMode ? 'hidden lg:block' : 'block'}`}>
          
          {/* Meta Fields */}
          <div className="space-y-6 mb-8">
            <input 
              className="w-full bg-transparent text-4xl md:text-5xl font-serif font-bold text-white placeholder-slate-600 outline-none"
              placeholder="Enter Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slug</label>
                <input 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-indigo-500 outline-none transition-colors font-mono"
                  value={slug}
                  onChange={(e) => { setSlug(e.target.value); setSlugEdited(true); }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Category</label>
                <select 
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-indigo-500 outline-none transition-colors appearance-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Technology</option>
                  <option>Health</option>
                  <option>Finance</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Cover Image URL</label>
              <div className="flex gap-2">
                <input 
                  className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-300 focus:border-indigo-500 outline-none transition-colors font-mono"
                  placeholder="https://..."
                  value={cover}
                  onChange={(e) => setCover(e.target.value)}
                />
                <CoverUpload onChange={(url) => setCover(url)} />
              </div>
            </div>

            <div className="flex gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-offset-0 focus:ring-0" />
                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Feature on Home</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-indigo-500 focus:ring-offset-0 focus:ring-0" />
                <span className="text-sm text-slate-400 group-hover:text-white transition-colors">Published</span>
              </label>
            </div>
          </div>

          {/* Markdown Editor */}
          <div className="relative group h-[500px]">
            <textarea 
              className="w-full h-full bg-transparent text-lg text-slate-300 placeholder-slate-600 outline-none resize-none font-mono leading-relaxed"
              placeholder="Start writing your masterpiece..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </div>

        {/* RIGHT: PREVIEW (Hidden on mobile unless toggled) */}
        <div className={`bg-slate-950 p-6 md:p-10 overflow-y-auto ${previewMode ? 'block' : 'hidden lg:block'}`}>
          <div className="max-w-2xl mx-auto">
            <div className="mb-8 text-center">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20 px-3 py-1 rounded-full bg-indigo-500/10">
                {category}
              </span>
              <h1 className="font-serif text-4xl md:text-5xl text-white mt-6 mb-4 leading-tight">{title || "Untitled Post"}</h1>
              {cover && (
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl mt-8">
                  <img src={cover} alt="Cover" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
            
            <div className="prose prose-lg prose-invert prose-slate max-w-none prose-headings:font-serif prose-headings:font-medium prose-a:text-indigo-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content || "*Preview will appear here...*"}
              </ReactMarkdown>
            </div>
          </div>
        </div>

      </div>

      {/* Status Toast */}
      {status.msg && (
        <div className={`fixed bottom-6 right-6 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 text-sm font-bold animate-in slide-in-from-bottom-4 ${status.type === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'}`}>
          {status.type === 'error' ? <AlertCircle size={18} /> : <Check size={18} />}
          {status.msg}
        </div>
      )}

    </main>
  );
}

function Loader2({ className, size }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>;
}
