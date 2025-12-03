"use client";
import { useEffect, useState } from "react";
import { Send, MessageSquare, User, Loader2 } from "lucide-react";
import ReaderAuth from "./ReaderAuth";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

// Helper for safe dates
const formatDate = (dateString) => {
  if (!dateString) return "Just now";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  } catch (e) {
    return "Just now";
  }
};

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    if (!postId) return;
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
    setSubmitting(true);
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
      setComments((prev) => [...prev, { ...data, user: data.user || user }]);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header & Auth */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
            <MessageSquare size={18} className="text-indigo-400" />
          </div>
          <h3 className="text-xl font-serif text-white">
            Discussion <span className="text-slate-500 text-base font-sans ml-1">({comments.length})</span>
          </h3>
        </div>
        <div className="scale-90 origin-right">
          <ReaderAuth onChange={setUser} />
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-4">
        {loading ? (
          <div className="flex justify-center py-8 text-slate-500">
            <Loader2 size={24} className="animate-spin" />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-white/5 border border-white/5 border-dashed">
            <p className="text-slate-400">No comments yet. Be the first to share your thoughts.</p>
          </div>
        ) : (
          <ul className="space-y-4">
            {comments.map((c) => (
              <li key={c.id} className="group relative p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-white/10 text-xs font-bold text-slate-300">
                    {c.user_name ? c.user_name[0].toUpperCase() : <User size={14} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-200">{c.user_name || "Reader"}</span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider">{formatDate(c.created_at)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed pl-11">{c.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input Area */}
      {user ? (
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur"></div>
          <div className="relative bg-slate-950 rounded-2xl p-1">
            <textarea
              className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm p-4 min-h-[100px] focus:outline-none resize-none"
              placeholder="Write a thoughtful comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end px-2 pb-2">
              <button
                onClick={submit}
                disabled={submitting || !content.trim()}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                <span>Post</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 rounded-xl bg-indigo-900/10 border border-indigo-500/20">
          <p className="text-sm text-indigo-300">Sign in above to join the conversation.</p>
        </div>
      )}
    </div>
  );
}
