"use client";
import { useEffect, useState } from "react";
import { Send, MessageSquare, User, Loader2, Heart, Reply, X } from "lucide-react";
import ReaderAuth from "./ReaderAuth";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://project-blog-backend-beta.vercel.app/api").replace(/\/$/, "");

const formatDate = (dateString) => {
  if (!dateString) return "Just now";
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"
    });
  } catch (e) { return "Just now"; }
};

export default function Comments({ postId }) {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Reply State
  const [replyingTo, setReplyingTo] = useState(null); // ID of comment being replied to
  const [replyContent, setReplyContent] = useState("");

  // Like State (Local cache for immediate UI feedback)
  const [likedComments, setLikedComments] = useState(new Set());

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

  async function submit(parentId = null) {
    const text = parentId ? replyContent : content;
    if (!text.trim()) return;
    
    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content: text,
          parent_id: parentId // Send parent_id if replying
        }),
      });
      
      if (res.status === 401) {
        alert("Please sign in with Google to comment.");
        return;
      }
      
      const data = await res.json();
      
      // Reset forms
      if (parentId) {
        setReplyingTo(null);
        setReplyContent("");
      } else {
        setContent("");
      }

      // Optimistic update
      setComments((prev) => [...prev, { ...data, user: data.user || user }]);
      
      // Reload to get correct threading if backend handles it
      load(); 

    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  const handleLike = (commentId) => {
    // Toggle local state immediately
    const newLiked = new Set(likedComments);
    if (newLiked.has(commentId)) {
      newLiked.delete(commentId);
    } else {
      newLiked.add(commentId);
    }
    setLikedComments(newLiked);

    // Fire and forget API call
    // Assuming endpoint exists, if not it just fails silently
    fetch(`${API_BASE}/comments/${commentId}/like`, { method: "POST", credentials: "include" }).catch(() => {});
  };

  return (
    <div className="space-y-8">
      {/* Header */}
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
      <div className="space-y-6">
        {loading ? (
          <div className="flex justify-center py-8 text-slate-500"><Loader2 size={24} className="animate-spin" /></div>
        ) : comments.length === 0 ? (
          <div className="text-center py-10 rounded-2xl bg-white/5 border border-white/5 border-dashed">
            <p className="text-slate-400">No comments yet. Be the first to share your thoughts.</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {comments.map((c) => (
              <li key={c.id} className={`group relative p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors ${c.parent_id ? 'ml-8 border-l-2 border-l-indigo-500/30' : ''}`}>
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-white/10 text-xs font-bold text-slate-300 shrink-0">
                    {c.user_name ? c.user_name[0].toUpperCase() : <User size={14} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-200">{c.user_name || "Reader"}</span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider">{formatDate(c.created_at)}</span>
                      </div>
                    </div>
                    
                    <p className="text-slate-300 text-sm leading-relaxed mt-1">{c.content}</p>
                    
                    {/* Actions Row */}
                    <div className="flex items-center gap-4 mt-3">
                      <button 
                        onClick={() => handleLike(c.id)}
                        className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${likedComments.has(c.id) ? 'text-red-400' : 'text-slate-500 hover:text-slate-300'}`}
                      >
                        <Heart size={14} fill={likedComments.has(c.id) ? "currentColor" : "none"} />
                        <span>{c.likes || 0 + (likedComments.has(c.id) ? 1 : 0)}</span>
                      </button>
                      
                      <button 
                        onClick={() => setReplyingTo(replyingTo === c.id ? null : c.id)}
                        className="flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-400 transition-colors"
                      >
                        <Reply size={14} />
                        <span>Reply</span>
                      </button>
                    </div>

                    {/* Reply Input */}
                    {replyingTo === c.id && (
                      <div className="mt-4 pl-4 border-l border-slate-700 animate-in fade-in slide-in-from-top-2">
                        <div className="relative bg-slate-950 rounded-xl p-1 border border-slate-700">
                          <textarea
                            className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm p-3 min-h-[60px] focus:outline-none resize-none"
                            placeholder={`Reply to ${c.user_name || "Reader"}...`}
                            value={replyContent}
                            onChange={(e) => setReplyContent(e.target.value)}
                            autoFocus
                          />
                          <div className="flex justify-end gap-2 px-2 pb-2">
                            <button onClick={() => setReplyingTo(null)} className="p-1.5 text-slate-500 hover:text-white"><X size={14} /></button>
                            <button
                              onClick={() => submit(c.id)}
                              disabled={submitting || !replyContent.trim()}
                              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
                            >
                              {submitting ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Main Input Area */}
      {user ? (
        <div className="relative group pt-4">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition duration-700"></div>
          <div className="relative bg-slate-950 rounded-2xl p-1 border border-slate-800 group-hover:border-slate-600 transition-colors">
            <textarea
              className="w-full bg-transparent text-slate-200 placeholder-slate-500 text-sm p-4 min-h-[100px] focus:outline-none resize-none"
              placeholder="Write a thoughtful comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="flex justify-end px-2 pb-2">
              <button
                onClick={() => submit(null)}
                disabled={submitting || !content.trim()}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-indigo-50 text-sm font-bold transition-all shadow-lg shadow-indigo-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                <span>Post Comment</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 rounded-2xl bg-slate-900 border border-slate-800">
          <p className="text-sm text-slate-400 mb-3">Join the discussion</p>
          <div className="inline-block opacity-50 pointer-events-none">
             {/* Visual placeholder for auth button location */}
             <span className="text-xs text-slate-600">Sign in above ↗</span>
          </div>
        </div>
      )}
    </div>
  );
}
