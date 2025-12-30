"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Users, ShieldAlert, Trash2, Building2, Sparkles, Megaphone, MessageCircle, Clock, CheckCircle } from "lucide-react";

export default function CommunityPage() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);

  // === THE NUCLEAR CODE ===
  const ADMIN_EMAIL = "verygreenwealth@gmail.com";
  const isAdmin = student?.email?.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase();

  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const parsed = JSON.parse(stored);
    setStudent(parsed);
    
    fetchFeed(parsed.department);
    const interval = setInterval(() => fetchFeed(parsed.department), 3000);
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
    } catch (e) { alert("Transmission Failed"); }
    setPosting(false);
  };

  const handleDelete = async (postId) => {
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

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now - date) / 1000; // seconds
    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return date.toLocaleDateString();
  };

  if (!student) return null;

  return (
    <main className="min-h-screen bg-[#f4f6f8] pb-32 font-sans">
      {/* === GLASS HEADER === */}
      <header className="fixed top-0 left-0 right-0 bg-[#004d00]/90 backdrop-blur-xl text-white pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-2xl z-50 border-b border-white/10 transition-all">
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
              placeholder={isAdmin ? "Type a Global Broadcast..." : "Share intel, ask questions, or request courses..."}
              className="w-full bg-transparent text-sm font-medium focus:outline-none resize-none h-24 placeholder:text-gray-400 text-gray-800"
            />
            {isAdmin && <div className="absolute top-4 right-4"><ShieldAlert className="text-red-200" size={24} /></div>}
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center gap-2">
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg ${isAdmin ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>
                {isAdmin ? "OFFICIAL CHANNEL" : "PUBLIC FEED"}
              </span>
            </div>
            <button 
              onClick={handlePost} 
              disabled={posting || !content.trim()}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100 ${isAdmin ? 'bg-gradient-to-r from-red-700 to-red-600 text-white shadow-red-200' : 'bg-[#004d00] text-white shadow-green-200'}`}
            >
              {posting ? "Transmitting..." : (isAdmin ? "BROADCAST" : "POST")} {isAdmin ? <Megaphone size={12} /> : <Send size={12} />}
            </button>
          </div>
        </div>

        {/* === FEED STREAM === */}
        <div className="space-y-5 pb-10">
          {loading && (
            // SKELETON LOADER (Premium Feel)
            <div className="space-y-4 animate-pulse">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 h-32">
                  <div className="flex gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-2xl"></div>
                    <div className="space-y-2">
                      <div className="w-32 h-3 bg-gray-200 rounded"></div>
                      <div className="w-20 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="w-2/3 h-2 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          )}
          
          {posts.map((post) => (
            <div key={post.id} className={`p-6 rounded-[2rem] shadow-sm border relative group transition-all duration-500 animate-in slide-in-from-bottom-2 ${post.is_announcement ? 'bg-gradient-to-br from-[#2b0a0a] to-[#4a0f0f] border-red-900 text-white shadow-red-900/20' : 'bg-white border-gray-100 text-gray-800'}`}>
              
              {/* ADMIN DELETE BUTTON */}
              {isAdmin && (
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white/50 hover:bg-red-600 hover:text-white transition-colors z-10"
                >
                  <Trash2 size={14} />
                </button>
              )}

              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-md overflow-hidden border-2 ${post.is_admin ? 'bg-red-600 border-red-400 text-white' : 'bg-gray-50 border-gray-100 text-gray-900'}`}>
                    {post.is_admin ? <Megaphone size={20} /> : <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${post.author_name.replace(/\s/g, '')}`} alt="Avatar" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h3 className={`font-black text-xs uppercase flex items-center gap-1.5 ${post.is_announcement ? 'text-red-100' : 'text-gray-900'}`}>
                      {post.author_name} 
                      {post.is_admin && <CheckCircle size={12} className="text-blue-400 fill-blue-400 text-white" />}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      {post.is_admin ? (
                        <span className="bg-red-500/20 border border-red-500/30 text-red-200 px-2 py-0.5 rounded-md text-[8px] font-black tracking-widest uppercase">OFFICIAL</span>
                      ) : (
                        <span className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wide flex items-center gap-1">
                          <Building2 size={8} /> {post.department || "General"}
                        </span>
                      )}
                      <span className={`text-[9px] font-mono ${post.is_announcement ? 'text-red-300' : 'text-gray-400'}`}>{formatTime(post.created_at)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`text-sm font-medium leading-relaxed pl-1 ${post.is_announcement ? 'text-red-50' : 'text-gray-600'}`}>
                {post.content}
              </div>

              {post.is_announcement && (
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2 opacity-50">
                  <ShieldAlert size={12} /> <span className="text-[9px] font-black uppercase tracking-[0.2em]">Priority Broadcast</span>
                </div>
              )}
            </div>
          ))}
          
          {!loading && posts.length === 0 && (
            <div className="text-center py-20 opacity-40">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"><Users size={32} className="text-gray-400" /></div>
              <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Frequency Clear.</p>
              <p className="text-[10px] text-gray-400 mt-1">Be the first to transmit.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
