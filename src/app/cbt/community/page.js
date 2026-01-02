"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Send, Users, ShieldAlert, Trash2, Building2, Megaphone,
  MessageCircle, Heart, MessageSquare, X, CheckCircle,
  BadgeCheck, Eye, EyeOff, Sparkles
} from "lucide-react";

export default function CommunityPage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  // THREAD STATE
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
      await fetch("/api/cbt/community/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.id,
          name: student.name,
          email: student.email,
          department: student.department,
          content,
          isAdmin
        })
      });
      setContent("");
      fetchFeed(student.department, student.email);
    } catch (e) { alert("Failed"); }
    setPosting(false);
  };

  // === ADMIN POWERS ===
  const handleHide = async (e, id, type) => {
    if (e) e.stopPropagation();
    try {
      await fetch("/api/cbt/community/hide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, adminEmail: student.email })
      });
      if (type === 'post') fetchFeed(student.department, student.email);
      else openThread(activePost); // Refresh comments
    } catch (e) {}
  };

  const handleDelete = async (e, id, type) => {
    if (e) e.stopPropagation();
    if (!confirm("COMMANDER: Permanently delete this?")) return;
    try {
      await fetch("/api/cbt/community/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, type, adminEmail: student.email })
      });
      if (type === 'post') fetchFeed(student.department, student.email);
      else openThread(activePost);
    } catch (e) {}
  };

  const handleLike = async (e, postId) => {
    e.stopPropagation();
    setPosts(prev => prev.map(p => p.id === postId ? { ...p, likes_count: (p.likes_count || 0) + 1 } : p));
    try {
      await fetch("/api/cbt/community/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, studentId: student.id })
      });
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
    const text = commentText;
    setCommentText("");
    try {
      await fetch("/api/cbt/community/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId: activePost.id, studentId: student.id, name: student.name, content: text })
      });
      openThread(activePost);
    } catch (e) {}
  };

  const formatTime = (d) => {
    const diff = (new Date() - new Date(d)) / 1000;
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
    return new Date(d).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!student) return null;

  return (
    <main className="min-h-screen bg-[#f4f6f8] pb-32 font-sans">
      {/* === GLASS HEADER === */}
      <header className="fixed top-0 left-0 right-0 bg-[#004d00]/95 backdrop-blur-xl text-white pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-2xl z-40 border-b border-white/10 transition-all">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-lg font-black uppercase tracking-widest flex items-center gap-2">
              <MessageCircle size={20} className="text-green-300" /> COMMUNITY FORUM
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-[10px] text-green-100 font-bold uppercase tracking-wider">
                {isAdmin ? "COMMAND CENTER" : `${student.department || "General"} Sector`}
              </p>
            </div>
          </div>
          <button onClick={() => router.push('/cbt/dashboard')} className="bg-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border border-white/20 hover:bg-white hover:text-[#004d00] transition-all active:scale-95">Exit</button>
        </div>
      </header>

      <div className="pt-36 px-4 max-w-2xl mx-auto">
        {/* === INPUT TERMINAL === */}
        <div className={`bg-white p-1.5 rounded-[2rem] shadow-xl border mb-8 transition-all transform hover:scale-[1.01] duration-300 ${isAdmin ? 'border-red-200 shadow-red-900/10' : 'border-green-100 shadow-green-900/5'}`}>
          <div className="bg-gray-50 rounded-[1.8rem] p-4 relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isAdmin ? "Broadcast an official announcement..." : "Ask a question or share an update..."}
              className="w-full bg-transparent text-sm font-medium focus:outline-none resize-none h-24 text-gray-900 placeholder:text-gray-500"
            />
            {isAdmin && <div className="absolute top-4 right-4"><ShieldAlert className="text-red-200" size={24} /></div>}
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${isAdmin ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
              {isAdmin ? "OFFICIAL CHANNEL" : "PUBLIC FEED"}
            </span>
            <button
              onClick={handlePost}
              disabled={posting || !content.trim()}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 ${isAdmin ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-red-200' : 'bg-[#004d00] text-white shadow-green-200'}`}
            >
              {posting ? "..." : (isAdmin ? "ANNOUNCE" : "POST")} {isAdmin ? <Megaphone size={12} /> : <Send size={12} />}
            </button>
          </div>
        </div>

        {/* === FEED STREAM === */}
        <div className="space-y-5 pb-10">
          {loading && <div className="text-center text-gray-400 text-[10px] font-black uppercase animate-pulse mt-10 tracking-widest">Loading Intel...</div>}

          {posts.map((post) => (
            <div key={post.id} onClick={() => openThread(post)} className={`p-6 rounded-[2rem] shadow-sm border relative group transition-all duration-500 animate-in slide-in-from-bottom-2 cursor-pointer active:scale-[0.99] ${post.is_announcement ? 'bg-gradient-to-br from-[#2b0a0a] to-[#4a0f0f] border-red-900 text-white shadow-red-900/20' : 'bg-white border-gray-100 text-gray-800'} ${post.is_hidden ? 'opacity-50 grayscale' : ''}`}>
              {isAdmin && (
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button onClick={(e) => handleHide(e, post.id, 'post')} className="p-2 bg-white/90 backdrop-blur shadow-md rounded-full text-gray-600 hover:bg-black hover:text-white transition-all border border-gray-200">
                    {post.is_hidden ? <Eye size={14} /> : <EyeOff size={14} />}
                  </button>
                  <button onClick={(e) => handleDelete(e, post.id, 'post')} className="p-2 bg-white/90 backdrop-blur shadow-md rounded-full text-red-500 hover:bg-red-600 hover:text-white transition-all border border-red-100">
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-md overflow-hidden border-2 ${post.is_admin ? 'bg-red-600 border-red-400 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}>
                    {post.is_admin ? <Megaphone size={20} /> : <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${post.author_name.replace(/\s/g, '')}`} alt="Avatar" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h3 className={`font-black text-xs uppercase flex items-center gap-1.5 ${post.is_announcement ? 'text-red-100' : 'text-gray-900'}`}>
                      {post.author_name}
                      {post.is_admin && <BadgeCheck size={14} className="text-blue-400 fill-blue-400 text-white" />}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      {post.is_admin ? (
                        <span className="bg-red-500/20 border border-red-500/30 text-red-200 px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest uppercase">OFFICIAL</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wide flex items-center gap-1">
                          <Building2 size={8} /> {post.department || "General"}
                        </span>
                      )}
                      {post.is_hidden && <span className="bg-yellow-400 text-black px-1.5 py-0.5 rounded text-[7px] font-black">HIDDEN</span>}
                      <span className={`text-[9px] font-mono ${post.is_announcement ? 'text-red-300' : 'text-gray-400'}`}>{formatTime(post.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`text-sm font-medium leading-relaxed pl-1 whitespace-pre-wrap break-words ${post.is_announcement ? 'text-red-50' : 'text-gray-600'}`}>
                {post.content}
              </div>

              <div className={`mt-4 pt-3 border-t flex items-center gap-6 opacity-60 ${post.is_announcement ? 'border-white/10' : 'border-black/5'}`}>
                <div className="flex items-center gap-1.5" onClick={(e) => handleLike(e, post.id)}>
                  <Heart size={16} /> <span className="text-[10px] font-black">{post.likes_count}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageSquare size={16} /> <span className="text-[10px] font-black">{post.comments_count} Replies</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === THREAD MODAL (CHAT STYLE) === */}
      {activePost && (
        <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-end justify-center animate-in fade-in duration-200">
          <div className="bg-[#e5ddd5] w-full max-w-lg h-[90vh] rounded-t-[2.5rem] flex flex-col overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300 relative">
            {/* Chat Header */}
            <div className="bg-white p-4 border-b flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                   <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${activePost.author_name.replace(/\s/g, '')}`} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-black text-xs uppercase text-gray-900">{activePost.author_name}</h3>
                  <p className="text-[9px] text-gray-500 font-medium truncate w-40">{activePost.content.substring(0, 30)}...</p>
                </div>
              </div>
              <button onClick={() => setActivePost(null)} className="p-2 bg-gray-100 text-gray-600 rounded-full hover:bg-red-50 hover:text-red-600 transition-colors"><X size={18} /></button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-[#e5ddd5] space-y-4">
              {/* Original Post Bubble (Center/Top) */}
              <div className="flex justify-center mb-6">
                <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50 max-w-[90%] text-center">
                  <p className="text-xs text-gray-800 font-medium leading-relaxed">{activePost.content}</p>
                  <p className="text-[8px] text-gray-400 mt-2 font-bold uppercase">{formatTime(activePost.created_at)}</p>
                </div>
              </div>

              {/* Comments Stream */}
              {comments.map(c => {
                const isMe = c.student_id === student.id;
                return (
                  <div key={c.id} className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1`}>
                    <div className={`relative max-w-[85%] px-4 py-3 shadow-sm text-sm group ${isMe ? 'bg-gradient-to-br from-[#004d00] to-[#006600] text-white rounded-[1.2rem] rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 rounded-[1.2rem] rounded-bl-none'}`}>
                      
                      {/* Admin Controls (Hidden by default, visible on hover/admin) */}
                      {isAdmin && (
                        <div className="absolute -top-3 right-0 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 rounded-full p-0.5 shadow-sm border">
                          <button onClick={() => handleHide(null, c.id, 'comment')} className="p-1 text-gray-500 hover:text-black"><EyeOff size={10} /></button>
                          <button onClick={() => handleDelete(null, c.id, 'comment')} className="p-1 text-red-400 hover:text-red-600"><Trash2 size={10} /></button>
                        </div>
                      )}

                      {/* Name (Only for others) */}
                      {!isMe && <p className="text-[9px] font-black text-orange-600 uppercase mb-1 tracking-wide flex items-center gap-1">{c.author_name} {c.is_premium && <BadgeCheck size={10} className="text-blue-500" />}</p>}
                      
                      <p className={`whitespace-pre-wrap leading-relaxed ${isMe ? 'text-green-50' : 'text-gray-700'}`}>{c.content}</p>
                      
                      <div className={`flex items-center gap-1 mt-1.5 ${isMe ? 'justify-end text-green-300' : 'justify-start text-gray-400'}`}>
                        <span className="text-[8px] font-mono">{formatTime(c.created_at)}</span>
                        {isMe && <CheckCircle size={10} />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Chat Input */}
            <div className="p-3 bg-white border-t flex items-end gap-2 z-20">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-gray-100 rounded-[1.5rem] px-5 py-3 text-sm text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none min-h-[50px] max-h-[120px]"
                rows={1}
              />
              <button 
                onClick={sendComment} 
                disabled={!commentText.trim()} 
                className="bg-[#004d00] text-white w-12 h-12 rounded-full shadow-lg disabled:opacity-50 flex items-center justify-center shrink-0 mb-0.5 active:scale-95 transition-transform"
              >
                <Send size={20} className="ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
