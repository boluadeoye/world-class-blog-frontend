"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Trophy, BookOpen, Play, Award,
  ChevronDown, Info, Crown, Clock, ChevronRight,
  AlertTriangle, Layers, Headset, History, CheckCircle, Settings, Lock, Sparkles,
  ChevronUp, MessageCircle, GraduationCap, FileText, Target, Zap, ShieldCheck, Search,
  Library, Landmark, Microscope, PenTool, Database, X
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import LiveTracker from "@/components/cbt/LiveTracker";

const UpgradeModal = dynamic(() => import("@/components/cbt/UpgradeModal"), { ssr: false });

/* === 1. LOGOUT CONFIRMATION MODAL === */
function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6 animate-in fade-in">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100">
        <div className="bg-red-50 p-8 flex flex-col items-center text-center">
          <div className="mb-4 bg-red-100 p-3 rounded-full text-red-600"><LogOut size={32} /></div>
          <h3 className="font-black text-xl text-red-900 uppercase tracking-tight mb-2">End Session?</h3>
          <p className="text-gray-600 text-sm font-medium leading-relaxed">Confirm disconnection from the secure academic portal.</p>
        </div>
        <div className="p-6 bg-white flex gap-3">
          <button onClick={onCancel} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-[1.5] py-4 bg-red-600 text-white rounded-2xl text-xs font-black shadow-lg uppercase tracking-widest hover:bg-red-700">Logout</button>
        </div>
      </div>
    </div>
  );
}

/* === 2. EXAMINATION SETUP MODAL === */
function ExamSetupModal({ course, isPremium, onClose, onStart, onUpgrade }) {
  const [duration, setDuration] = useState(course.duration || 15);
  const [qCount, setQCount] = useState(30);
  
  // LOGIC UPDATE: GST = 2 Attempts, Others = 1 Attempt
  const isGst = course.code.toUpperCase().startsWith("GST");
  const allowedAttempts = isGst ? 2 : 1;
  const isBlocked = !isPremium && course.user_attempts >= allowedAttempts;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in zoom-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 relative">
        <div className={`p-8 relative z-10 ${isBlocked ? 'bg-red-50' : 'bg-green-50'} border-b border-gray-100`}>
          <h3 className={`font-black text-xl uppercase tracking-tighter ${isBlocked ? 'text-red-900' : 'text-[#004d00]'}`}>Examination Setup</h3>
          <p className={`text-[10px] font-mono font-bold uppercase tracking-widest mt-1 ${isBlocked ? 'text-red-400' : 'text-green-600'}`}>{course.code} • {course.title}</p>
        </div>
        <div className="p-8 pt-6">
          {isBlocked ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200"><Lock size={32} className="text-red-600" /></div>
              <p className="text-gray-600 text-xs font-medium mb-8 leading-relaxed">
                {isGst ? "Maximum free attempts (2/2) recorded." : "Departmental courses allow only 1 free attempt."} <br/>Upgrade required.
              </p>
              <button onClick={onUpgrade} className="w-full py-4 bg-yellow-500 text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-transform">Upgrade Clearance</button>
              <button onClick={onClose} className="mt-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-gray-600">Return to Catalog</button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">Time Allocation</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((time) => {
                      const isRestricted = !isPremium && time !== 15;
                      return (
                        <button key={time} disabled={isRestricted} onClick={() => setDuration(time)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative border ${duration === time ? 'border-[#004d00] bg-[#004d00] text-white shadow-lg' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                          {time}m {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">Question Volume</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[20, 40, 60, 100].map((count) => {
                      const isRestricted = !isPremium && count !== 30;
                      return (
                        <button key={count} disabled={isRestricted} onClick={() => setQCount(count)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative border ${qCount === count ? 'border-blue-700 bg-blue-700 text-white shadow-lg' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                          {count} {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-4 border border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest">Cancel</button>
                <button onClick={() => onStart(duration, qCount)} className="flex-[2] py-4 bg-[#004d00] text-white rounded-2xl text-[10px] font-black shadow-xl hover:bg-green-900 uppercase tracking-widest flex items-center justify-center gap-2">Begin Examination <ChevronRight size={14} /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* === 3. IMPORTANT DISCLAIMER === */
function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-[#FFF8F0] rounded-[2rem] overflow-hidden mb-6 shadow-sm border border-orange-50/50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 w-10 h-10 flex items-center justify-center rounded-full text-orange-600 shadow-inner"><Info size={18} /></div>
          <div><h3 className="font-black text-xs text-[#5A3A29] uppercase tracking-wide">Important Disclaimer</h3><p className="text-[9px] text-orange-400 font-bold mt-0.5">Read before starting</p></div>
        </div>
        <ChevronDown size={16} className={`text-orange-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-8 text-[10px] text-[#8B5E3C] leading-relaxed border-t border-orange-100/50 pt-4">
          <p className="mb-3 font-black text-[#5A3A29] uppercase tracking-widest text-[9px]">Strict Warning:</p>
          <ul className="space-y-2 font-medium">
            <li className="flex gap-2"><span className="text-orange-400 font-black">•</span> <span>The purpose of this mock is <strong>NOT</strong> to expose likely questions.</span></li>
            <li className="flex gap-2"><span className="text-orange-400 font-black">•</span> <span>The aim is to <strong>simulate the environment</strong> psychologically.</span></li>
            <li className="flex gap-2"><span className="text-orange-400 font-black">•</span> <span>Use this to practice <strong>time management</strong>.</span></li>
            <li className="flex gap-2"><span className="text-orange-400 font-black">•</span> <span>Success here <strong>does not guarantee success</strong> in the main exam.</span></li>
          </ul>
        </div>
      )}
    </div>
  );
}

/* === 4. THE ACADEMIC PRO CARD === */
function CourseCard({ course, onLaunch, isPremium }) {
  const isGst = course.code.toUpperCase().startsWith("GST");
  
  // LOGIC UPDATE: GST = 2 Attempts, Others = 1 Attempt
  const allowedAttempts = isGst ? 2 : 1;
  const isBlocked = !isPremium && course.user_attempts >= allowedAttempts;
  
  let SealIcon = Library;
  if (!isGst) {
    if (course.code.startsWith("BIO") || course.code.startsWith("CHM")) SealIcon = Microscope;
    else if (course.code.startsWith("LAW") || course.code.startsWith("BUS")) SealIcon = Landmark;
    else SealIcon = PenTool;
  }

  const theme = isGst 
    ? { accent: "bg-[#004d00]", badge: "bg-emerald-50 text-emerald-800 border-emerald-100", icon: "text-emerald-900", btn: "bg-[#004d00] hover:bg-emerald-900" }
    : { accent: "bg-slate-700", badge: "bg-slate-50 text-slate-700 border-slate-100", icon: "text-slate-800", btn: "bg-slate-800 hover:bg-slate-900" };

  return (
    <div onClick={() => onLaunch(course)} className="group relative bg-white rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full">
      <div className={`h-1.5 w-full ${theme.accent}`}></div>
      <div className="p-5 flex-1 flex flex-col h-full justify-between relative">
        <div className={`absolute -right-6 -top-6 opacity-[0.03] transform rotate-12 scale-[2.5] ${theme.icon}`}><SealIcon /></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${theme.badge}`}>{course.code}</span>
            {isBlocked && <div className="bg-red-50 text-red-500 p-1 rounded-md"><Lock size={12} /></div>}
          </div>
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 min-h-[2.5rem]">{course.title}</h3>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5"><Database size={12} className="text-gray-400" /><span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{course.total_questions || 0} Questions</span></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 ${isBlocked ? 'bg-gray-200 text-gray-400' : theme.btn}`}><Play size={12} fill="currentColor" className="ml-0.5" /></div>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [examHistory, setExamHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [greeting, setGreeting] = useState("GOOD DAY");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [setupCourse, setSetupCourse] = useState(null);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalForumPosts, setTotalForumPosts] = useState(0);

  useEffect(() => {
    setMounted(true);
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("GOOD MORNING");
    else if (hour < 17) setGreeting("GOOD AFTERNOON");
    else setGreeting("GOOD EVENING");

    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const parsed = JSON.parse(stored);
    setStudent(parsed);

    const seed = parsed.name.replace(/\s/g, '');
    setAvatarUrl(`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=e6f4ea,ccebd6,a3d9b5`);

    async function fetchData() {
      try {
        const [syncRes, courseRes, lbRes, histRes, forumRes] = await Promise.all([
          fetch(`/api/cbt/auth/student-status?id=${parsed.id}`),
          fetch(`/api/cbt/courses?studentId=${parsed.id}`),
          fetch('/api/cbt/leaderboard'),
          fetch(`/api/cbt/history?studentId=${parsed.id}`),
          fetch(`/api/cbt/community/status?dept=${encodeURIComponent(parsed.department || 'General')}`)
        ]);

        if (syncRes.ok) {
          const syncData = await syncRes.json();
          const updated = { ...parsed, subscription_status: syncData.status };
          setStudent(updated);
          sessionStorage.setItem("cbt_student", JSON.stringify(updated));
        }
        const courseData = await courseRes.json();
        setCourses(Array.isArray(courseData.courses) ? courseData.courses : []);
        const lbData = await lbRes.json();
        setLeaders(Array.isArray(lbData) ? lbData : []);
        const histData = await histRes.json();
        setExamHistory(Array.isArray(histData) ? histData : []);

        const forumData = await forumRes.json();
        setTotalForumPosts(forumData.count || 0);
        const lastRead = parseInt(localStorage.getItem('cbt_forum_read_count') || '0');
        if ((forumData.count || 0) > lastRead) setUnreadCount((forumData.count || 0) - lastRead);

      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchData();
  }, [router]);

  // Real-time Leaderboard Polling
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch('/api/cbt/leaderboard');
        if (res.ok) {
          const data = await res.json();
          setLeaders(Array.isArray(data) ? data : []);
        }
      } catch (e) {}
    };
    const inv = setInterval(poll, 10000);
    return () => clearInterval(inv);
  }, []);

  const handleForumEnter = () => {
    localStorage.setItem('cbt_forum_read_count', totalForumPosts.toString());
    setUnreadCount(0);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_student");
    router.push("/cbt");
  };

  if (!mounted || !student) return null;
  const isPremium = student.subscription_status === 'premium';
  
  const sortedCourses = [...courses].sort((a, b) => {
    const aIsGst = a.code.toUpperCase().startsWith("GST");
    const bIsGst = b.code.toUpperCase().startsWith("GST");
    if (aIsGst && !bIsGst) return -1;
    if (!aIsGst && bIsGst) return 1;
    return a.code.localeCompare(b.code);
  });

  const visibleHistory = historyExpanded ? examHistory : examHistory.slice(0, 2);
  const qualifiedLeaders = leaders.filter(user => user.score >= 60);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#004d00] gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-800 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center"><Library size={20} className="text-white animate-pulse" /></div>
      </div>
      <p className="text-green-200 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Loading Modules...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 pb-48 relative selection:bg-green-200">
      <LiveTracker />
      {showLogoutConfirm && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutConfirm(false)} />}
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      {setupCourse && <ExamSetupModal course={setupCourse} isPremium={isPremium} onClose={() => setSetupCourse(null)} onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} onUpgrade={() => { setSetupCourse(null); setShowUpgrade(true); }} />}

      <header className="bg-[#004d00] text-white pt-10 pb-24 px-6 rounded-b-[3rem] shadow-2xl relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#003300]/20 to-[#002200]/40"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8 pl-5 pr-9">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-lg overflow-visible relative group">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                   {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />}
                </div>
                {isPremium && (<div className="absolute -top-2 -right-2 bg-yellow-400 text-black p-1.5 rounded-full border-2 border-[#004d00] shadow-md z-20 animate-bounce"><Crown size={12} fill="currentColor" /></div>)}
              </div>
              <div><p className="text-green-200 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{greeting}</p><h1 className="text-2xl font-black leading-none truncate w-48 tracking-tight">{student.name.split(" ")[0]}</h1></div>
            </div>
            <div className="flex gap-2">
              <a href="https://wa.me/2348106293674" target="_blank" className="bg-green-600 p-3 rounded-2xl border border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.6)] animate-pulse hover:scale-105 transition-all"><Headset size={20} /></a>
              <button onClick={() => setShowLogoutConfirm(true)} className="bg-white/10 p-3 rounded-2xl border border-white/10 text-red-200 hover:bg-red-600 hover:text-white transition-all active:scale-95"><LogOut size={20} /></button>
            </div>
          </div>

          {/* === ADEOLU TARGET SESSION CARD === */}
          <div className="bg-[#003300] border border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-inner relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[9px] font-bold text-green-400 uppercase tracking-widest mb-1">Current Session</p>
              <p className="font-black text-sm text-white tracking-widest uppercase whitespace-nowrap">EXAMFORGE SESSION 2026</p>
            </div>
            <div className="bg-white text-[#004d00] px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Active</div>
          </div>
        </div>
      </header>

      <div className="px-5 -mt-12 relative z-20 space-y-8">
        <DisclaimerCard />
        <Link href="/cbt/community" onClick={handleForumEnter} className="block group">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-[2rem] p-6 shadow-xl shadow-blue-900/20 relative overflow-hidden active:scale-[0.98] transition-transform">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-[40px] -mr-10 -mt-10"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-5">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20 relative backdrop-blur-sm">
                  <MessageCircle size={26} className="text-white" />
                  {unreadCount > 0 && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-6 h-6 flex items-center justify-center rounded-full border-4 border-blue-800 animate-bounce">{unreadCount}</div>}
                </div>
                <div><h2 className="text-white font-black text-sm uppercase tracking-widest mb-1">Community Forum</h2><p className="text-blue-100 text-[10px] font-bold">{unreadCount > 0 ? `${unreadCount} New Intel Reports` : "Academic Discussions"}</p></div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-900 transition-all"><ChevronRight size={16} /></div>
            </div>
          </div>
        </Link>

        <section>
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2"><History size={14} className="text-gray-400" /><h2 className="font-black text-[10px] text-gray-400 uppercase tracking-widest">Recent Operations</h2></div>
            {examHistory.length > 2 && (<button onClick={() => setHistoryExpanded(!historyExpanded)} className="text-[9px] font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">{historyExpanded ? "Show Less" : "View All"} {historyExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}</button>)}
          </div>
          {examHistory.length > 0 ? (<div className="space-y-2">{visibleHistory.map((item) => { const pct = Math.round((item.score / item.total) * 100); let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-100"; if (pct < 40) colorClass = "text-red-700 bg-red-50 border-red-100"; else if (pct < 60) colorClass = "text-amber-700 bg-amber-50 border-amber-100"; return (<div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-top-1"><div className="flex items-center gap-4"><div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 font-black text-[10px] border border-gray-100">{item.course_code.slice(0,3)}</div><div><p className="font-black text-xs text-gray-900 uppercase tracking-tight">{item.course_code}</p><p className="text-[8px] text-gray-400 font-bold uppercase tracking-wide">{new Date(item.created_at).toLocaleDateString()}</p></div></div><div className={`text-right px-3 py-1.5 rounded-lg border ${colorClass}`}><p className="font-black text-xs">{pct}%</p><p className="text-[7px] font-black uppercase opacity-70">{item.score}/{item.total}</p></div></div>); })}</div>) : (<div className="bg-white rounded-2xl p-6 border border-dashed border-gray-200 text-center"><p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">No Mission History</p></div>)}
        </section>

        <section>
           <div className="flex items-center justify-between mb-4 px-2">
             <div className="flex items-center gap-3"><div className="bg-green-100 p-1.5 rounded-lg text-[#004d00]"><BookOpen size={14} /></div><h2 className="font-black text-xs text-gray-500 uppercase tracking-[0.2em]">Course Directory</h2></div>
           </div>
           <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {sortedCourses.length > 0 ? sortedCourses.map(c => (<CourseCard key={c.id} course={c} onLaunch={setSetupCourse} isPremium={isPremium} />)) : (<div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200"><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">No modules found.</p></div>)}
           </div>
        </section>

        <section className="pt-12 pb-12">
          <div className="flex items-center justify-between mb-6 px-2">
            <div className="flex items-center gap-3"><div className="bg-yellow-100 p-2 rounded-xl text-yellow-700 shadow-sm"><Trophy size={16} /></div><h2 className="font-black text-xs text-slate-500 uppercase tracking-[0.25em]">Daily Leaderboard</h2></div>
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-1.5 rounded-full border border-emerald-100 shadow-sm"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[9px] font-black uppercase tracking-widest">Live</span></div>
          </div>
          {qualifiedLeaders.length > 0 ? (
            <div className="flex gap-5 overflow-x-auto pb-10 px-2 -mx-2 custom-scrollbar snap-x">
              {qualifiedLeaders.map((user, i) => {
                const isFirst = i === 0;
                const isSecond = i === 1;
                const isThird = i === 2;
                let cardStyle = "bg-white border-slate-100";
                let rankBadge = null;
                if (isFirst) { cardStyle = "bg-gradient-to-b from-yellow-50 to-white border-yellow-200 shadow-2xl shadow-yellow-500/10"; rankBadge = <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5"><Crown size={12} fill="currentColor" /> Vanguard</div>; }
                else if (isSecond) { cardStyle = "bg-gradient-to-b from-slate-50 to-white border-slate-200"; rankBadge = <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-400 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Elite</div>; }
                else if (isThird) { cardStyle = "bg-gradient-to-b from-orange-50 to-white border-orange-200"; rankBadge = <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Operative</div>; }
                return (
                  <div key={i} className={`min-w-[200px] rounded-[3rem] p-8 border ${cardStyle} flex flex-col items-center text-center relative mt-6 snap-center group transition-all duration-500 hover:-translate-y-2`}>
                    {rankBadge}
                    <div className="relative mb-5">
                      <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center overflow-hidden border-4 ${isFirst ? 'border-yellow-400 shadow-xl' : 'border-white shadow-md'}`}><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover bg-slate-50" /></div>
                      {isFirst && <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full border-4 border-white shadow-lg"><Sparkles size={12} fill="currentColor" /></div>}
                    </div>
                    <h3 className="font-black text-sm text-slate-900 truncate w-full mb-1 uppercase tracking-tight">{user.name}</h3>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-5 truncate w-full">{user.department || "Unknown Unit"}</p>
                    <div className={`w-full py-3 rounded-2xl text-[11px] font-black flex items-center justify-center gap-2 ${isFirst ? 'bg-emerald-700 text-white shadow-xl shadow-emerald-900/20' : 'bg-slate-100 text-slate-600'}`}><Target size={12} /> <span>{user.score}%</span></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-[3rem] border border-dashed border-slate-200"><div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse"><Trophy size={32} className="text-slate-300" /></div><p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Roster Empty. Be the First.</p></div>
          )}
        </section>
      </div>

      <div className="fixed bottom-6 left-6 right-6 z-40 max-w-2xl mx-auto">
        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0"><div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(22,163,74,0.5)]"><Award size={18} /></div><div className="min-w-0"><h4 className="font-black text-[10px] text-white leading-none mb-1 uppercase tracking-widest">Bolu Adeoye</h4><p className="text-[8px] text-gray-400 font-bold truncate uppercase tracking-tight">Dept. of English & Literary Studies</p></div></div>
          <div className="h-8 w-[1px] bg-white/10 mx-4"></div>
          <div className="text-right shrink-0"><p className="text-[7px] font-black text-gray-500 uppercase tracking-[0.2em] mb-0.5">Partner</p><p className="text-[10px] font-black text-white leading-none uppercase tracking-wide">Abel Kings</p><p className="text-[7px] font-bold text-green-500 uppercase tracking-tighter mt-0.5">Tutorial Center</p></div>
        </div>
      </div>
    </main>
  );
}
