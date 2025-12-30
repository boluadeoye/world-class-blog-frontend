"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Users, ShieldAlert, Trash2, Building2, Sparkles, Megaphone, MessageCircle, Heart, MessageSquare, X } from "lucide-react";

export default function CommunityPage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  
  // REPLY MODAL STATE
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
    fetchFeed(parsed.department);
    const interval = setInterval(() => fetchFeed(parsed.department), 5000); // 5s Polling
    return () => clearInterval(interval);
  }, []);

  const fetchFeed = async (dept) => {
    try {
      const res = await fetch(`/api/cbt/community/feed?dept=${encodeURIComponent(dept || 'General')}`);
      const data = await res.json();
      if (data.posts) setPosts(data.posts);
      setLoading(false);
    } catch (e) { console.error(e); }
  };

  const handlePost = async () => {
    if (!content.trim()) return;
    setPosting(true);
    try {
      await fetch("/api/cbt/community/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.id,
          name: student.name,
          email: student.email,
          department: student.department,
          content: content,
          isAdmin: isAdmin
        })
      });
      setContent("");
      fetchFeed(student.department);
    } catch (e) { alert("Failed"); }
    setPosting(false);
  };

  const handleDelete = async (e, postId) => {
    e.stopPropagation(); // Prevent opening the reply modal
    if (!confirm("COMMANDER: Delete this message?")) return;
    try {
      await fetch("/api/cbt/community/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, adminEmail: student.email })
      });
      fetchFeed(student.department);
    } catch (e) { alert("Delete Failed"); }
  };

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    // Optimistic UI Update
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: p.likes_count + 1 } : p));
    try {
      await fetch("/api/cbt/community/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, studentId: student.id })
      });
      fetchFeed(student.department); // Sync real count
    } catch (e) {}
  };

  const openThread = async (post) => {
    setActivePost(post);
    setLoadingComments(true);
    try {
      const res = await fetch(`/api/cbt/community/comment?postId=${post.id}`);
      const data = await res.json();
      setComments(data.comments || []);
    } catch (e) {}
    setLoadingComments(false);
  };

  const sendComment = async () => {
    if (!commentText.trim()) return;
    const newComment = { id: Date.now(), author_name: student.name, content: commentText, created_at: new Date() };
    setComments([...comments, newComment]); // Optimistic
    setCommentText("");
    try {
      await fetch("/api/cbt/community/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: activePost.id, studentId: student.id, name: student.name, content: newComment.content })
      });
    } catch (e) {}
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  if (!student) return null;

  return (
    <main className="min-h-screen bg-[#f4f6f8] pb-32 font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 bg-[#004d00]/90 backdrop-blur-xl text-white pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-2xl z-40 border-b border-white/10">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest flex items-center gap-2"><MessageCircle size={20} className="text-green-300" /> COMMUNITY FORUM</h1>
            <div className="flex items-center gap-2 mt-1"><span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span><p className="text-[10px] text-green-100 font-bold uppercase tracking-wider">{isAdmin ? "COMMAND CENTER" : `${student.department || "General"} Sector`}</p></div>
          </div>
          <button onClick={() => router.push('/cbt/dashboard')} className="bg-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border border-white/20 hover:bg-white hover:text-[#004d00] transition-all active:scale-95">Exit</button>
        </div>
      </header>

      <div className="pt-36 px-4 max-w-2xl mx-auto">
        {/* INPUT */}
        <div className={`bg-white p-1.5 rounded-[2rem] shadow-xl border mb-8 transition-all ${isAdmin ? 'border-red-200 shadow-red-900/10' : 'border-green-100 shadow-green-900/5'}`}>
          <div className="bg-gray-50 rounded-[1.8rem] p-4 relative">
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder={isAdmin ? "Type a Global Broadcast..." : "Share intel, ask questions..."} className="w-full bg-transparent text-sm font-medium focus:outline-none resize-none h-24 placeholder:text-gray-400 text-gray-800" />
            {isAdmin && <div className="absolute top-4 right-4"><ShieldAlert className="text-red-200" size={24} /></div>}
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${isAdmin ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{isAdmin ? "OFFICIAL CHANNEL" : "PUBLIC FEED"}</span>
            <button onClick={handlePost} disabled={posting || !content.trim()} className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 ${isAdmin ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-red-200' : 'bg-[#004d00] text-white shadow-green-200'}`}>{posting ? "..." : (isAdmin ? "BROADCAST" : "POST")} {isAdmin ? <Megaphone size={12} /> : <Send size={12} />}</button>
          </div>
        </div>

        {/* FEED */}
        <div className="space-y-5 pb-10">
          {loading && <div className="text-center text-gray-400 text-[10px] font-black uppercase animate-pulse mt-10 tracking-widest">Loading Forum...</div>}
          {posts.map((post) => (
            <div key={post.id} onClick={() => openThread(post)} className={`p-6 rounded-[2rem] shadow-sm border relative group transition-all duration-300 active:scale-[0.98] cursor-pointer ${post.is_announcement ? 'bg-gradient-to-br from-[#2b0a0a] to-[#4a0f0f] border-red-900 text-white shadow-red-900/20' : 'bg-white border-gray-100 text-gray-800'}`}>
              {isAdmin && <button onClick={(e) => handleDelete(e, post.id)} className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white/50 hover:bg-red-600 hover:text-white transition-colors z-20"><Trash2 size={14} /></button>}
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-md overflow-hidden border-2 ${post.is_admin ? 'bg-red-600 border-red-400 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}>{post.is_admin ? <Megaphone size={20} /> : <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${post.author_name.replace(/\s/g, '')}`} alt="Avatar" className="w-full h-full object-cover" />}</div>
                  <div>
                    <h3 className={`font-black text-xs uppercase flex items-center gap-1.5 ${post.is_announcement ? 'text-red-100' : 'text-gray-900'}`}>{post.author_name} {post.is_admin && <span className="bg-red-500/20 border border-red-500/30 text-red-200 px-1.5 py-0.5 rounded text-[8px] tracking-wider">ADMIN</span>}</h3>
                    <div className="flex items-center gap-2 mt-0.5"><span className={`text-[9px] font-mono ${post.is_announcement ? 'text-red-300' : 'text-gray-400'}`}>{formatTime(post.created_at)}</span></div>
                  </div>
                </div>
              </div>
              <div className={`text-sm font-medium leading-relaxed pl-1 whitespace-pre-wrap break-words ${post.is_announcement ? 'text-red-50' : 'text-gray-600'}`}>{post.content}</div>
              <div className={`mt-4 pt-3 border-t flex items-center gap-6 ${post.is_announcement ? 'border-white/10 text-red-200' : 'border-gray-50 text-gray-400'}`}>
                <button onClick={(e) => handleLike(e, post.id)} className="flex items-center gap-1.5 hover:text-red-500 transition-colors"><Heart size={16} /> <span className="text-[10px] font-black">{post.likes_count || 0}</span></button>
                <button className="flex items-center gap-1.5 hover:text-blue-500 transition-colors"><MessageSquare size={16} /> <span className="text-[10px] font-black">{post.comments_count || 0} Replies</span></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* THREAD MODAL */}
      {activePost && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center animate-in fade-in duration-200">
          <div className="bg-[#f4f6f8] w-full max-w-lg h-[85vh] sm:h-[80vh] sm:rounded-[2.5rem] rounded-t-[2.5rem] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="bg-white p-5 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h3 className="font-black text-sm uppercase tracking-widest text-gray-800">Thread</h3>
              <button onClick={() => setActivePost(null)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 mb-6">
                <h4 className="font-black text-xs text-gray-900 uppercase mb-2">{activePost.author_name}</h4>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{activePost.content}</p>
              </div>
              <div className="space-y-3">
                {loadingComments ? <div className="text-center text-[10px] font-black text-gray-400 animate-pulse">Loading Replies...</div> : comments.map(c => (
                  <div key={c.id} className="bg-white p-4 rounded-2xl border border-gray-50 shadow-sm">
                    <div className="flex justify-between items-center mb-1"><span className="text-[10px] font-black text-gray-900 uppercase">{c.author_name}</span><span className="text-[8px] text-gray-400">{formatTime(c.created_at)}</span></div>
                    <p className="text-xs text-gray-600 leading-relaxed">{c.content}</p>
                  </div>
                ))}
                {comments.length === 0 && !loadingComments && <p className="text-center text-[10px] text-gray-400 italic">No replies yet. Start the conversation.</p>}
              </div>
            </div>
            <div className="p-4 bg-white border-t border-gray-100 shrink-0">
              <div className="flex gap-2">
                <input type="text" value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="Write a reply..." className="flex-1 bg-gray-50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500" />
                <button onClick={sendComment} disabled={!commentText.trim()} className="bg-[#004d00] text-white p-3 rounded-xl shadow-lg disabled:opacity-50"><Send size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
