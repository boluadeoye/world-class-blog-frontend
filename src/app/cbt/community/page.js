"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Users, ShieldAlert, Trash2, Building2, Megaphone, MessageCircle, Heart, MessageSquare, X, CheckCircle, BadgeCheck, Smile, MoreVertical } from "lucide-react";

const REACTIONS = ["❤️", "😂", "😮", "😢", "👍", "🔥"];

export default function CommunityPage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [showReactions, setShowReactions] = useState(null); // ID of post showing reaction picker

  const ADMIN_EMAIL = "verygreenwealth@gmail.com";
  const isAdmin = student?.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase();
  const scrollRef = useRef(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const parsed = JSON.parse(stored);
    setStudent(parsed);
    fetchFeed(parsed.department, parsed.email);
    const interval = setInterval(() => fetchFeed(parsed.department, parsed.email), 4000);
    return () => clearInterval(interval);
  }, []);

  const fetchFeed = async (dept, email) => {
    try {
      const res = await fetch(`/api/cbt/community/feed?dept=${encodeURIComponent(dept || 'General')}&email=${email}`);
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
      setLoading(false);
    } catch (e) {}
  };
  const handlePost = async () => {
    if (!content.trim()) return;
    setPosting(true);
    try {
      await fetch("/api/cbt/community/post", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: student.id, name: student.name, email: student.email, department: student.department, content, isAdmin }) });
      setContent(""); fetchFeed(student.department, student.email);
    } catch (e) { alert("Failed"); }
    setPosting(false);
  };

  const handleReaction = async (e, postId, emoji) => {
    e.stopPropagation();
    setShowReactions(null);
    // Optimistic Update
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p));
    try {
      await fetch("/api/cbt/community/like", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId, studentId: student.id, reaction: emoji }) });
    } catch (e) {}
  };

  const handleDelete = async (e, id, type) => {
    e.stopPropagation();
    if (!confirm("Delete this?")) return;
    try {
      await fetch("/api/cbt/community/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, type, adminEmail: student.email }) });
      if (type === 'post') fetchFeed(student.department, student.email); else setComments(prev => prev.filter(c => c.id !== id));
    } catch (e) {}
  };

  const openThread = async (post) => {
    setActivePost(post); setLoadingComments(true);
    try {
      const res = await fetch(`/api/cbt/community/comment?postId=${post.id}`);
      const data = await res.json(); setComments(data.comments || []);
    } catch (e) {}
    setLoadingComments(false);
  };

  const sendComment = async () => {
    if (!commentText.trim()) return;
    const newComment = { id: Date.now(), author_name: student.name, content: commentText, created_at: new Date(), is_premium: student.subscription_status === 'premium' };
    setComments([...comments, newComment]); setCommentText("");
    try { await fetch("/api/cbt/community/comment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ postId: activePost.id, studentId: student.id, name: student.name, content: newComment.content }) }); } catch (e) {}
  };

  const formatTime = (d) => {
    const diff = (new Date() - new Date(d)) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    return new Date(d).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  if (!student) return null;

  return (
    <main className="min-h-screen bg-[#e5ddd5] pb-24 font-sans relative">
      {/* WHATSAPP HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-[#004d00] text-white py-4 px-4 shadow-md z-50 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button onClick={() => router.push('/cbt/dashboard')} className="p-1"><X size={20}/></button>
          <div>
            <h1 className="text-sm font-bold flex items-center gap-2">{isAdmin ? "COMMAND CENTER" : `${student.department || "General"} Community`}</h1>
            <p className="text-[10px] text-green-200">{loading ? "Connecting..." : "Online"}</p>
          </div>
        </div>
        {isAdmin && <div className="bg-red-600 px-2 py-1 rounded text-[8px] font-black">ADMIN</div>}
      </header>

      <div className="pt-20 px-3 max-w-2xl mx-auto space-y-4">
        {posts.map((post) => {
          const isMe = post.author_email === student.email;
          return (
            <div key={post.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-2`}>
              <div 
                onClick={() => openThread(post)}
                className={`relative max-w-[85%] p-3 rounded-2xl shadow-sm text-sm cursor-pointer active:scale-[0.98] transition-transform ${isMe ? 'bg-[#dcf8c6] rounded-tr-none' : 'bg-white rounded-tl-none'} ${post.is_announcement ? 'border-2 border-red-500 bg-red-50' : ''}`}
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-1 gap-4">
                  <span className={`text-[10px] font-bold ${isMe ? 'text-green-800' : 'text-orange-600'} flex items-center gap-1`}>
                    {post.author_name} {post.is_premium && <BadgeCheck size={10} className="text-blue-500 fill-blue-500 text-white" />} {post.is_admin && <Megaphone size={10} className="text-red-500" />}
                  </span>
                  {isAdmin && <button onClick={(e) => handleDelete(e, post.id, 'post')}><Trash2 size={12} className="text-red-400" /></button>}
                </div>

                {/* CONTENT */}
                <p className="text-gray-800 whitespace-pre-wrap leading-snug">{post.content}</p>

                {/* FOOTER */}
                <div className="flex justify-between items-end mt-1 gap-2">
                  <div className="flex items-center gap-2">
                    {/* REACTION PICKER */}
                    <div className="relative">
                      <button onClick={(e) => { e.stopPropagation(); setShowReactions(showReactions === post.id ? null : post.id); }} className="text-gray-400 hover:text-red-500"><Heart size={12} fill={post.likes_count > 0 ? "currentColor" : "none"} /></button>
                      {showReactions === post.id && (
                        <div className="absolute bottom-6 left-0 bg-white shadow-xl rounded-full p-1 flex gap-1 z-50 animate-in zoom-in duration-200 border border-gray-200">
                          {REACTIONS.map(emoji => (
                            <button key={emoji} onClick={(e) => handleReaction(e, post.id, emoji)} className="hover:scale-125 transition-transform text-lg p-1">{emoji}</button>
                          ))}
                        </div>
                      )}
                    </div>
                    {post.likes_count > 0 && <span className="text-[9px] text-gray-500 font-bold">{post.likes_count}</span>}
                  </div>
                  <div className="flex items-center gap-1 text-[9px] text-gray-400">
                    <span>{formatTime(post.created_at)}</span>
                    {isMe && <CheckCircle size={10} className="text-blue-500" />}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* INPUT AREA */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg z-40 border-t border-gray-100">
        <div className="max-w-2xl mx-auto flex gap-2 items-end">
          <div className="flex-1 bg-gray-100 rounded-2xl px-4 py-2">
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={isAdmin ? "Broadcast..." : "Message..."} className="w-full bg-transparent text-sm max-h-24 focus:outline-none resize-none text-gray-900 placeholder:text-gray-500" rows={1} />
          </div>
          <button onClick={handlePost} disabled={posting || !content.trim()} className="bg-[#004d00] text-white p-3 rounded-full shadow-lg active:scale-90 transition-transform disabled:opacity-50"><Send size={18} /></button>
        </div>
      </div>

      {/* THREAD MODAL (SLIDE UP) */}
      {activePost && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-[#e5ddd5] w-full max-w-lg h-[85vh] rounded-t-[2rem] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="bg-[#004d00] p-4 text-white flex justify-between items-center shadow-md">
              <div className="flex items-center gap-3">
                <button onClick={() => setActivePost(null)}><X size={20} /></button>
                <div><h3 className="font-bold text-sm">Thread</h3><p className="text-[10px] text-green-200">Replying to {activePost.author_name}</p></div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
              <div className="bg-white p-3 rounded-xl shadow-sm mb-6 border-l-4 border-green-600 opacity-90">
                <p className="text-xs font-bold text-green-800 mb-1">{activePost.author_name}</p>
                <p className="text-sm text-gray-800 line-clamp-3">{activePost.content}</p>
              </div>
              <div className="space-y-2">
                {comments.map(c => (
                  <div key={c.id} className={`p-3 rounded-xl shadow-sm text-sm max-w-[85%] ${c.author_name === student.name ? 'bg-[#dcf8c6] ml-auto rounded-tr-none' : 'bg-white mr-auto rounded-tl-none'}`}>
                    <div className="flex justify-between items-center mb-1 gap-2">
                      <span className={`text-[10px] font-bold ${c.author_name === student.name ? 'text-green-800' : 'text-orange-600'}`}>{c.author_name}</span>
                      {isAdmin && <button onClick={() => handleDelete(null, c.id, 'comment')}><Trash2 size={10} className="text-red-400" /></button>}
                    </div>
                    <p className="text-gray-800">{c.content}</p>
                    <p className="text-[8px] text-gray-400 text-right mt-1">{formatTime(c.created_at)}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 bg-white border-t flex gap-2">
              <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Reply..." className="flex-1 bg-gray-100 rounded-full px-4 py-3 text-sm text-gray-900 focus:outline-none" />
              <button onClick={sendComment} disabled={!commentText.trim()} className="bg-[#004d00] text-white p-3 rounded-full shadow-lg"><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
