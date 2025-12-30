"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Send, Users, ShieldAlert, Trash2, Building2, Sparkles, Megaphone, MessageCircle } from "lucide-react";

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

  if (!student) return null;

  return (
    <main className="min-h-screen bg-[#f2f4f7] pb-32 font-sans">
      {/* === HEADER === */}
      <header className="fixed top-0 left-0 right-0 bg-[#004d00]/95 backdrop-blur-xl text-white pt-12 pb-6 px-6 rounded-b-[2.5rem] shadow-2xl z-50 border-b border-white/10">
        <div className="flex justify-between items-center max-w-2xl mx-auto">
          <div>
            <h1 className="text-xl font-black uppercase tracking-widest flex items-center gap-2">
              <MessageCircle size={22} className="text-green-300" /> COMMUNITY FORUM
            </h1>
            <p className="text-[10px] text-green-200 font-bold uppercase tracking-wider mt-1 flex items-center gap-1">
              <Building2 size={10} /> {isAdmin ? "ADMIN COMMAND" : student.department || "General Lobby"}
            </p>
          </div>
          <button onClick={() => router.push('/cbt/dashboard')} className="bg-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase backdrop-blur-md border border-white/20 hover:bg-white hover:text-[#004d00] transition-all">Exit</button>
        </div>
      </header>

      <div className="pt-40 px-4 max-w-2xl mx-auto">
        
        {/* === INPUT === */}
        <div className={`bg-white p-1 rounded-[2rem] shadow-xl border mb-8 transition-all ${isAdmin ? 'border-red-100 shadow-red-900/10' : 'border-green-100 shadow-green-900/5'}`}>
          <div className="bg-gray-50 rounded-[1.8rem] p-4">
            <textarea 
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={isAdmin ? "Post an Official Announcement..." : "Join the conversation..."}
              className="w-full bg-transparent text-sm font-medium focus:outline-none resize-none h-20 placeholder:text-gray-400 text-gray-800"
            />
          </div>
          <div className="flex justify-between items-center px-4 py-3">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full animate-pulse ${isAdmin ? 'bg-red-500' : 'bg-green-500'}`}></div>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                {isAdmin ? "OFFICIAL BROADCAST" : "PUBLIC FORUM"}
              </span>
            </div>
            <button 
              onClick={handlePost} 
              disabled={posting || !content.trim()}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:scale-100 ${isAdmin ? 'bg-red-600 text-white shadow-red-200 hover:bg-red-700' : 'bg-[#004d00] text-white shadow-green-200 hover:bg-green-900'}`}
            >
              {posting ? "Posting..." : (isAdmin ? "ANNOUNCE" : "POST")} {isAdmin ? <Megaphone size={12} /> : <Send size={12} />}
            </button>
          </div>
        </div>

        {/* === FEED === */}
        <div className="space-y-5 pb-10">
          {loading && <div className="text-center text-gray-400 text-[10px] font-black uppercase animate-pulse mt-10 tracking-widest">Loading Forum...</div>}
          
          {posts.map((post) => (
            <div key={post.id} className={`p-5 rounded-[2rem] shadow-sm border relative group transition-all hover:-translate-y-1 duration-300 ${post.is_announcement ? 'bg-gradient-to-br from-red-50 to-white border-red-100 shadow-red-100' : 'bg-white border-gray-100'}`}>
              
              {isAdmin && (
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full text-red-400 shadow-sm border border-red-50 hover:bg-red-600 hover:text-white transition-colors z-10"
                >
                  <Trash2 size={14} />
                </button>
              )}

              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center font-black text-sm text-white shadow-md overflow-hidden ${post.is_admin ? 'bg-red-600' : 'bg-gray-900'}`}>
                    {post.is_admin ? <Megaphone size={20} /> : <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${post.author_name.replace(/\s/g, '')}`} alt="Avatar" className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h3 className="font-black text-xs text-gray-900 uppercase flex items-center gap-1.5">
                      {post.author_name} 
                      {post.is_admin && <span className="bg-red-100 text-red-600 px-1.5 py-0.5 rounded text-[8px] tracking-wider">ADMIN</span>}
                    </h3>
                    <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wide flex items-center gap-1">
                      {post.is_admin ? "Official Announcement" : post.department || "General"} <span className="w-1 h-1 bg-gray-300 rounded-full"></span> {new Date(post.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </p>
                  </div>
                </div>
              </div>
              
              <p className={`text-sm font-medium leading-relaxed pl-14 ${post.is_announcement ? 'text-red-900 font-bold' : 'text-gray-600'}`}>
                {post.content}
              </p>
            </div>
          ))}
          
          {!loading && posts.length === 0 && (
            <div className="text-center py-12 opacity-40">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4"><Users size={24} className="text-gray-400" /></div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Forum is Quiet.</p>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
