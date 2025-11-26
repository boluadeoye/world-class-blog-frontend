"use client";

import { useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider, useMutation, useQuery } from "@tanstack/react-query";
import { useLogin, useLogout } from "../../../lib/apiClient";
import { listVideos, createVideo, togglePublish, toggleFeature, deleteVideo, updateVideo } from "../../../lib/featuredVideos";
import { Trash2, Star, StarOff, Eye, EyeOff, Save } from "lucide-react";

function parseErr(e) {
  return e?.data?.error || e?.message || "Request failed";
}

function VideoRow({ v, onChange, onDelete }) {
  const meta = v?.meta || {};
  const [title, setTitle] = useState(v?.title || "");
  const [url, setUrl] = useState(meta.youtubeUrl || "");
  const [caption, setCaption] = useState(meta.caption || "");
  const [start, setStart] = useState(meta.start || "");

  const mSave = useMutation({
    mutationFn: async () => updateVideo(v.id, { title, url, caption, start }),
    onSuccess: onChange,
  });
  const mPub = useMutation({ mutationFn: (p) => togglePublish(v.id, p), onSuccess: onChange });
  const mFeat = useMutation({ mutationFn: (f) => toggleFeature(v.id, f), onSuccess: onChange });
  const mDel = useMutation({ mutationFn: () => deleteVideo(v.id), onSuccess: onDelete });

  const featured = Array.isArray(v?.tags) && v.tags.includes("home-featured");

  return (
    <div className="adm-card">
      <div className="flex flex-col gap-2 md:grid md:grid-cols-2">
        <div>
          <label className="adm-label">Title</label>
          <input className="adm-input" value={title} onChange={(e)=>setTitle(e.target.value)} />
        </div>
        <div>
          <label className="adm-label">YouTube URL</label>
          <input className="adm-input" value={url} onChange={(e)=>setUrl(e.target.value)} placeholder="https://youtu.be/..." />
        </div>
        <div>
          <label className="adm-label">Caption</label>
          <input className="adm-input" value={caption} onChange={(e)=>setCaption(e.target.value)} />
        </div>
        <div>
          <label className="adm-label">Start (e.g., 90 or 1m30s)</label>
          <input className="adm-input" value={start} onChange={(e)=>setStart(e.target.value)} />
        </div>
      </div>

      <div className="mt-2 flex flex-wrap gap-2">
        <button className="adm-btn" onClick={()=>mSave.mutate()} disabled={mSave.isLoading}>
          <Save size={16} /> Save
        </button>
        <button className="adm-btn" onClick={()=>mPub.mutate(!v.published)} disabled={mPub.isLoading}>
          {v.published ? <EyeOff size={16}/> : <Eye size={16}/>} {v.published ? "Unpublish" : "Publish"}
        </button>
        <button className="adm-btn" onClick={()=>mFeat.mutate(!featured)} disabled={mFeat.isLoading}>
          {featured ? <StarOff size={16}/> : <Star size={16}/>} {featured ? "Unfeature" : "Feature on Home"}
        </button>
        <button className="adm-btn danger" onClick={()=>{ if (confirm("Delete this video?")) mDel.mutate(); }} disabled={mDel.isLoading}>
          <Trash2 size={16}/> Delete
        </button>
      </div>

      {(mSave.isError || mPub.isError || mFeat.isError || mDel.isError) && (
        <div className="adm-error mt-2">Error: {parseErr(mSave.error || mPub.error || mFeat.error || mDel.error)}</div>
      )}
    </div>
  );
}

function AdminPageInner() {
  const [needAuth, setNeedAuth] = useState(false);
  const [form, setForm] = useState({ title: "", url: "", caption: "", start: "", featured: true, published: true });

  const q = useQuery({
    queryKey: ["videos"],
    queryFn: () => listVideos(50, true),
    retry: false,
  });

  useEffect(() => {
    if (q.isError && q.error?.status === 401) setNeedAuth(true);
  }, [q.isError, q.error]);

  const login = useLogin();
  const logout = useLogout();

  const createMut = useMutation({
    mutationFn: () => createVideo(form),
    onSuccess: () => {
      setForm({ title: "", url: "", caption: "", start: "", featured: true, published: true });
      q.refetch();
    },
  });

  if (needAuth) {
    let pw = "";
    return (
      <div className="mx-auto max-w-4xl p-4">
        <div className="adm-card">
          <h1 className="text-lg font-semibold text-slate-50 mb-2">Admin Login</h1>
          <input type="password" className="adm-input" placeholder="Admin password" onChange={(e)=>{pw=e.target.value}} />
          <div className="mt-2 flex gap-2">
            <button className="adm-btn" onClick={()=>login.mutate({ password: pw }, { onSuccess: ()=>{ setNeedAuth(false); q.refetch(); } })}>Login</button>
          </div>
          {login.isError && <div className="adm-error mt-2">Login failed: {parseErr(login.error)}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-xl font-bold text-slate-50">Featured Videos (Admin)</h1>
        <button className="adm-btn" onClick={()=>logout.mutate(null, { onSuccess: ()=>{ setNeedAuth(true);} })}>Logout</button>
      </div>

      {/* Create new */}
      <div className="adm-card">
        <h2 className="text-lg font-semibold text-slate-100 mb-2">New Video</h2>
        <div className="grid md:grid-cols-2 gap-2">
          <input className="adm-input" placeholder="Title" value={form.title} onChange={(e)=>setForm({...form, title:e.target.value})} />
          <input className="adm-input" placeholder="YouTube URL" value={form.url} onChange={(e)=>setForm({...form, url:e.target.value})} />
          <input className="adm-input" placeholder="Caption (optional)" value={form.caption} onChange={(e)=>setForm({...form, caption:e.target.value})} />
          <input className="adm-input" placeholder="Start (e.g., 90 or 1m30s)" value={form.start} onChange={(e)=>setForm({...form, start:e.target.value})} />
        </div>
        <div className="mt-2 flex flex-wrap gap-3">
          <label className="adm-check"><input type="checkbox" checked={form.featured} onChange={(e)=>setForm({...form, featured:e.target.checked})}/> Feature on Home</label>
          <label className="adm-check"><input type="checkbox" checked={form.published} onChange={(e)=>setForm({...form, published:e.target.checked})}/> Published</label>
        </div>
        <div className="mt-2">
          <button className="adm-btn" onClick={()=>createMut.mutate()} disabled={createMut.isLoading}>Create Video</button>
        </div>
        {createMut.isError && <div className="adm-error mt-2">Error: {parseErr(createMut.error)}</div>}
      </div>

      {/* List */}
      <div className="mt-4">
        {q.isLoading ? (
          <div className="adm-card">Loading…</div>
        ) : q.isError ? (
          <div className="adm-error">Error: {parseErr(q.error)}</div>
        ) : (
          (q.data || []).map(v => (
            <VideoRow
              key={v.id}
              v={v}
              onChange={()=>q.refetch()}
              onDelete={()=>q.refetch()}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function Page() {
  const client = useMemo(() => new QueryClient(), []);
  return (
    <QueryClientProvider client={client}>
      <AdminPageInner />
    </QueryClientProvider>
  );
}
