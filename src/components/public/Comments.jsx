"use client";

import { useEffect, useState } from "react";
import ReaderAuth from "./ReaderAuth";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/posts/${postId}/comments`, { credentials: "include" });
      const data = await res.json();
      setComments(Array.isArray(data) ? data : []);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [postId]);

  async function submit() {
    if (!content.trim()) return;
    try {
      const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (res.status === 401) {
        alert("Please sign in with Google to comment.");
        return;
      }
      const data = await res.json();
      setContent("");
      setComments((prev) => [...prev, { ...data, user: data.user }]);
    } catch {}
  }

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-100">Comments</h3>
        <ReaderAuth onChange={setUser} />
      </div>

      {loading ? (
        <p className="text-xs text-slate-400">Loading comments…</p>
      ) : comments.length === 0 ? (
        <p className="text-xs text-slate-400">No comments yet. Start the conversation.</p>
      ) : (
        <ul className="space-y-3">
          {comments.map((c) => (
            <li key={c.id} className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
              <div className="mb-1 text-[11px] text-slate-400">
                {c.user_name || "Reader"} • {new Date(c.created_at).toLocaleString()}
              </div>
              <p className="whitespace-pre-wrap text-sm text-slate-200">{c.content}</p>
            </li>
          ))}
        </ul>
      )}

      {user ? (
        <div className="space-y-2">
          <textarea
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a thoughtful comment…"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            onClick={submit}
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
          >
            Post comment
          </button>
        </div>
      ) : (
        <p className="text-[11px] text-slate-400">Sign in to comment.</p>
      )}
    </div>
  );
}