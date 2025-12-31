"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Send, Users, ShieldAlert, Trash2, Building2, Megaphone, MessageCircle, Heart, MessageSquare, X, CheckCircle, BadgeCheck, EyeOff, Eye } from "lucide-react";

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

  const ADMIN_EMAIL = "verygreenwealth@gmail.com";
  const isAdmin = student?.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const parsed = JSON.parse(stored);
    setStudent(parsed);
    fetchFeed(parsed.department, parsed.email);
    const interval = setInterval(() => fetchFeed(parsed.department, parsed.email), 5000);
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
      await fetch("/api/cbt/community/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, name: student.name, email: student.email, department: student.department, content, isAdmin })
      });
      setContent("");
      fetchFeed(student.department, student.email);
    } catch (e) { alert("Failed"); }
    setPosting(false);
  };

  const handleHide = async (e, id, type) => {
    e.stopPropagation();
    try {
      await fetch("/api/cbt/community/hide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, adminEmail: student.email })
      });
      if (type === 'post') fetchFeed(student.department, student.email);
      else openThread(activePost);
    } catch (e) {}
  };

  const handleDelete = async (e, id, type) => {
    e.stopPropagation();
    if (!confirm("Delete permanently?")) return;
    try {
      await fetch("/api/cbt/community/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, adminEmail: student.email })
      });
      if (type === 'post') fetchFeed(student.department, student.email);
      else setComments(prev => prev.filter(c => c.id !== id));
    } catch (e) {}
  };

  const openThread = async (post) => {
    setActivePost(post);
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/cbt/community/comment?postId=${post.id}&email=${student.email}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (e) {}
    setLoadingComments(false);
  };

  const sendComment = async () => {
    if (!commentText.trim()) return;
    setCommentText("");
    try {
      await fetch("/api/cbt/community/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: activePost.id, studentId: student.id, name: student.name, content: commentText })
      });
      openThread(activePost);
    } catch (e) {}
  };

  const formatTime = (d) => {
    const diff = (new Date() - new Date(d)) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    return new Date(d).toLocaleDateString();
  };

  if (!student) return null;

  return (
    <main className="min-h-screen bg-[#f4f6f8] pb-32 font-sans">
      <header className="fixed top-0 left-0 right-0 bg-[#004d00]/95 backdrop-blur-xl text-white pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-2xl z-40 border-b border-white/10">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest flex items-center gap-2"><MessageCircle size={20} className="text-green-300" /> COMMUNITY FORUM</h1>
            <p className="text-[10px] text-green-100 font-bold uppercase tracking-wider mt-1">{isAdmin ? "ADMINISTRATOR" : `${student.department || "General"} Community`}</p>
          </div>
          <button onClick={() => router.push('/cbt/dashboard')} className="bg-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border border-white/20">Exit</button>
        </div>
      </header>

      <div className="pt-36 px-4 max-w-2xl mx-auto">
        <div className={`bg-white p-1.5 rounded-[2rem] shadow-xl border mb-8 ${isAdmin ? 'border-red-200' : 'border-green-100'}`}>
          <div className="bg-gray-50 rounded-[1.8rem] p-4">
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={isAdmin ? "Broadcast an official announcement..." : "Ask a question or share an update..."} className="w-full bg-transparent text-sm font-medium focus:outline-none resize-none h-24 text-gray-900 placeholder:text-gray-400" />
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{isAdmin ? "OFFICIAL BROADCAST" : "NEW POST"}</span>
            <button onClick={handlePost} disabled={posting || !content.trim()} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg active:scale-95 disabled:opacity-50 ${isAdmin ? 'bg-red-600 text-white' : 'bg-[#004d00] text-white'}`}>{posting ? "..." : (isAdmin ? "ANNOUNCE" : "POST")} <Send size={12} /></button>
          </div>
        </div>

        <div className="space-y-5">
          {posts.map((post) => (
            <div key={post.id} onClick={() => openThread(post)} className={`p-6 rounded-[2rem] shadow-sm border relative transition-all active:scale-[0.98] cursor-pointer ${post.is_announcement ? 'bg-gradient-to-br from-[#2b0a0a] to-[#4a0f0f] border-red-900 text-white shadow-red-900/20' : 'bg-white border-gray-100 text-gray-800'} ${post.is_hidden ? 'opacity-50 grayscale-[0.5]' : ''}`}>
              
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button onClick={(e) => handleHide(e, post.id, 'post')} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white/70 hover:bg-white hover:text-black transition-all">
                    {post.is_hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={(e) => handleDelete(e, post.id, 'post')} className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white/50 hover:bg-red-600 hover:text-white transition-colors"><Trash2 size={14} /></button>
                </div>
              )}

              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-md overflow-hidden border-2 ${post.is_admin ? 'bg-red-600 border-red-400' : 'bg-gray-50 border-gray-100'}`}>{post.is_admin ? <Megaphone size={20} /> : <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${post.author_name.replace(/\s/g, '')}`} className="w-full h-full object-cover" />}</div>
                <div>
                  <h3 className={`font-black text-xs uppercase flex items-center gap-1.5 ${post.is_announcement ? 'text-red-100' : 'text-gray-900'}`}>{post.author_name} {post.is_premium && <BadgeCheck size={14} className="text-blue-400 fill-blue-400 text-white" />}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${post.is_admin ? 'bg-red-500/20 text-red-200' : 'bg-gray-100 text-gray-500'}`}>{post.is_admin ? "ADMIN" : post.department || "General"}</span>
                    {post.is_hidden && <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded text-[7px] font-black">HIDDEN</span>}
                    <span className="text-[9px] opacity-60">{formatTime(post.created_at)}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium leading-relaxed whitespace-pre-wrap break-words">{post.content}</div>
            </div>
          ))}
        </div>
      </div>

      {activePost && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end justify-center">
          <div className="bg-[#f4f6f8] w-full max-w-lg h-[85vh] rounded-t-[2.5rem] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="bg-white p-5 border-b flex justify-between items-center">
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-800">Replies</h3>
              <button onClick={() => setActivePost(null)} className="p-2 bg-gray-200 text-gray-700 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <div className="space-y-3">
                {comments.map(c => (
                  <div key={c.id} className={`bg-white p-4 rounded-2xl border border-gray-50 relative ${c.is_hidden ? 'opacity-50 bg-gray-50' : ''}`}>
                    {isAdmin && (
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button onClick={() => handleHide(null, c.id, 'comment')} className="text-gray-400 hover:text-black transition-colors">
                          {c.is_hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                        <button onClick={() => handleDelete(c.id, 'comment')} className="text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-black uppercase flex items-center gap-1 text-gray-900">{c.author_name} {c.is_premium && <BadgeCheck size={10} className="text-blue-400" />} {c.is_hidden && <span className="text-[7px] text-yellow-600 font-black ml-1">[HIDDEN]</span>}</span>
                      <span className="text-[8px] opacity-50">{formatTime(c.created_at)}</span>
                    </div>
                    <p className="text-xs text-gray-600 whitespace-pre-wrap">{c.content}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white border-t flex gap-2">
              <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a reply..." className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500" />
              <button onClick={sendComment} disabled={!commentText.trim()} className="bg-[#004d00] text-white p-3 rounded-xl shadow-lg"><Send size={18} /></button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
