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

/* === 1. PREMIUM LOGOUT MODAL === */
function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-[#002200]/90 backdrop-blur-md p-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] shadow-2xl max-w-sm w-full overflow-hidden border border-white/20">
        <div className="bg-red-50 p-10 flex flex-col items-center text-center">
          <div className="mb-6 bg-white p-4 rounded-3xl text-red-600 shadow-sm"><LogOut size={32} /></div>
          <h3 className="font-black text-2xl text-red-900 uppercase tracking-tighter mb-2">End Session?</h3>
          <p className="text-gray-500 text-xs font-bold leading-relaxed uppercase tracking-wide">Securely disconnect from the ExamForge core.</p>
        </div>
        <div className="p-8 bg-white flex gap-4">
          <button onClick={onCancel} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:bg-gray-50 transition-all">Cancel</button>
          <button onClick={onConfirm} className="flex-[1.5] py-4 bg-red-600 text-white rounded-2xl text-[10px] font-black shadow-lg shadow-red-200 uppercase tracking-[0.2em] hover:bg-red-700 transition-all">Logout</button>
        </div>
      </div>
    </div>
  );
}

/* === 2. EXAMINATION SETUP MODAL === */
function ExamSetupModal({ course, isPremium, onClose, onStart, onUpgrade }) {
  const [duration, setDuration] = useState(course.duration || 15);
  const [qCount, setQCount] = useState(30);
  const isBlocked = !isPremium && course.user_attempts >= 2;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 animate-in zoom-in duration-500">
      <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 relative">
        <div className={`p-10 relative z-10 ${isBlocked ? 'bg-red-50' : 'bg-[#004d00]'} border-b border-gray-100`}>
          <h3 className={`font-black text-2xl uppercase tracking-tighter ${isBlocked ? 'text-red-900' : 'text-white'}`}>Mission Setup</h3>
          <p className={`text-[10px] font-mono font-bold uppercase tracking-[0.2em] mt-2 ${isBlocked ? 'text-red-400' : 'text-green-200'}`}>{course.code} • {course.title}</p>
        </div>
        <div className="p-10 pt-8">
          {isBlocked ? (
            <div className="text-center py-4">
              <div className="w-20 h-20 bg-red-100 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-red-200 shadow-inner"><Lock size={32} className="text-red-600" /></div>
              <p className="text-gray-600 text-[11px] font-bold mb-10 leading-relaxed uppercase tracking-wide">Maximum free attempts recorded.<br/>Upgrade required for clearance.</p>
              <button onClick={onUpgrade} className="w-full py-5 bg-yellow-500 text-black rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] shadow-xl hover:scale-[1.02] active:scale-95 transition-all">Upgrade Clearance</button>
              <button onClick={onClose} className="mt-6 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-gray-600">Return to Catalog</button>
            </div>
          ) : (
            <>
              <div className="space-y-8 mb-10">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-4 block">Time Allocation</label>
                  <div className="grid grid-cols-4 gap-3">
                    {[15, 30, 45, 60].map((time) => {
                      const isRestricted = !isPremium && time !== 15;
                      return (
                        <button key={time} disabled={isRestricted} onClick={() => setDuration(time)} className={`py-4 rounded-2xl text-[10px] font-black transition-all relative border-2 ${duration === time ? 'border-[#004d00] bg-[#004d00] text-white shadow-lg' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-30' : 'hover:border-green-200'}`}>
                          {time}m {isRestricted && <Lock size={8} className="absolute top-1.5 right-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-4 block">Question Volume</label>
                  <div className="grid grid-cols-4 gap-3">
                    {[20, 40, 60, 100].map((count) => {
                      const isRestricted = !isPremium && count !== 30;
                      return (
                        <button key={count} disabled={isRestricted} onClick={() => setQCount(count)} className={`py-4 rounded-2xl text-[10px] font-black transition-all relative border-2 ${qCount === count ? 'border-blue-700 bg-blue-700 text-white shadow-lg' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-30' : 'hover:border-blue-200'}`}>
                          {count} {isRestricted && <Lock size={8} className="absolute top-1.5 right-1.5" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <button onClick={onClose} className="flex-1 py-5 border-2 border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest">Cancel</button>
                <button onClick={() => onStart(duration, qCount)} className="flex-[2.5] py-5 bg-[#004d00] text-white rounded-2xl text-[10px] font-black shadow-2xl shadow-green-900/20 hover:bg-green-900 uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all active:scale-95">Begin Exam <ChevronRight size={14} /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
/* === 3. REFINED DISCLAIMER === */
function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-white rounded-[2.5rem] overflow-hidden mb-8 shadow-sm border border-orange-100/50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-7 text-left">
        <div className="flex items-center gap-5">
          <div className="bg-orange-50 w-12 h-12 flex items-center justify-center rounded-2xl text-orange-600 shadow-inner"><Info size={20} /></div>
          <div><h3 className="font-black text-xs text-gray-800 uppercase tracking-widest">Protocol Briefing</h3><p className="text-[9px] text-orange-500 font-bold mt-0.5 uppercase tracking-tight">Read before engagement</p></div>
        </div>
        <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}><ChevronDown size={16} className="text-gray-400" /></div>
      </button>
      {isOpen && (
        <div className="px-8 pb-10 text-[11px] text-gray-500 leading-relaxed border-t border-gray-50 pt-6 animate-in slide-in-from-top-2">
          <ul className="space-y-4 font-bold uppercase tracking-tight">
            <li className="flex gap-4"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" /><span>This mock is a <strong className="text-gray-900">Psychological Simulation</strong>, not a leak.</span></li>
            <li className="flex gap-4"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" /><span>Focus on <strong className="text-gray-900">Time Management</strong> and precision.</span></li>
            <li className="flex gap-4"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0" /><span>Success here simulates readiness, not a guarantee.</span></li>
          </ul>
        </div>
      )}
    </div>
  );
}

/* === 4. LUXURY COURSE CARD === */
function CourseCard({ course, onLaunch, isPremium }) {
  const isGst = course.code.toUpperCase().startsWith("GST");
  const isBlocked = !isPremium && course.user_attempts >= 2;
  let SealIcon = Library;
  if (!isGst) {
    if (course.code.startsWith("BIO") || course.code.startsWith("CHM")) SealIcon = Microscope;
    else if (course.code.startsWith("LAW") || course.code.startsWith("BUS")) SealIcon = Landmark;
    else SealIcon = PenTool;
  }
  const theme = isGst
    ? { accent: "bg-[#004d00]", badge: "bg-emerald-50 text-emerald-800 border-emerald-100", icon: "text-emerald-900", btn: "bg-[#004d00]" }
    : { accent: "bg-slate-800", badge: "bg-slate-50 text-slate-700 border-slate-100", icon: "text-slate-800", btn: "bg-slate-800" };

  return (
    <div onClick={() => onLaunch(course)} className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full">
      <div className={`h-2 w-full ${theme.accent} opacity-80`}></div>
      <div className="p-6 flex-1 flex flex-col justify-between relative">
        <div className={`absolute -right-4 -top-4 opacity-[0.04] transform rotate-12 scale-[2.5] ${theme.icon}`}><SealIcon size={48} /></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${theme.badge}`}>{course.code}</span>
            {isBlocked && <div className="bg-red-50 text-red-500 p-2 rounded-xl shadow-inner"><Lock size={14} /></div>}
          </div>
          <h3 className="font-black text-gray-900 text-sm leading-tight mb-2 line-clamp-2 min-h-[2.5rem] uppercase tracking-tighter">{course.title}</h3>
        </div>
        <div className="mt-6 pt-5 border-t border-gray-50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2"><Database size={14} className="text-gray-300" /><span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{course.total_questions || 0} Bank</span></div>
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all group-hover:scale-110 group-hover:rotate-3 ${isBlocked ? 'bg-gray-100 text-gray-300' : theme.btn}`}><Play size={14} fill="currentColor" className="ml-0.5" /></div>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#004d00] gap-8">
      <div className="relative">
        <div className="w-24 h-24 border-[6px] border-green-900/30 rounded-full"></div>
        <div className="w-24 h-24 border-[6px] border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0 shadow-2xl"></div>
        <div className="absolute inset-0 flex items-center justify-center"><Library size={28} className="text-white animate-pulse" /></div>
      </div>
      <p className="text-green-100 font-black text-[11px] uppercase tracking-[0.5em] animate-pulse">Initializing Core...</p>
    </div>
  );
  return (
    <main className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 pb-56 relative selection:bg-green-100">
      <LiveTracker />
      {showLogoutConfirm && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutConfirm(false)} />}
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      {setupCourse && <ExamSetupModal course={setupCourse} isPremium={isPremium} onClose={() => setSetupCourse(null)} onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} onUpgrade={() => { setSetupCourse(null); setShowUpgrade(true); }} />}

      <header className="bg-[#004d00] text-white pt-12 pb-28 px-8 rounded-b-[4rem] shadow-2xl relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-black/10 to-black/30"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white rounded-[2rem] flex items-center justify-center border-4 border-white/10 shadow-2xl relative group transition-transform active:scale-90">
                <div className="w-full h-full rounded-[2rem] overflow-hidden">
                  {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                </div>
                {isPremium && (<div className="absolute -top-2 -right-2 bg-yellow-400 text-black p-2 rounded-full border-4 border-[#004d00] shadow-xl z-20 animate-bounce"><Crown size={14} fill="currentColor" /></div>)}
              </div>
              <div>
                <p className="text-green-300 text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 opacity-80">{greeting}</p>
                <h1 className="text-3xl font-black leading-none truncate w-48 tracking-tighter uppercase">{student.name.split(" ")[0]}</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/2348106293674" target="_blank" className="bg-green-500 p-4 rounded-2xl border border-green-400 text-white shadow-lg shadow-green-500/40 animate-pulse hover:scale-105 transition-all active:scale-90"><Headset size={22} /></a>
              <button onClick={() => setShowLogoutConfirm(true)} className="bg-white/10 p-4 rounded-2xl border border-white/10 text-red-200 hover:bg-red-600 hover:text-white transition-all active:scale-90"><LogOut size={22} /></button>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-7 flex items-center justify-between shadow-inner">
            <div>
              <p className="text-[10px] font-black text-green-400 uppercase tracking-[0.3em] mb-1.5">System Status</p>
              <p className="font-black text-sm text-white tracking-[0.15em] uppercase">EXAMFORGE CORE 2026</p>
            </div>
            <div className="bg-white text-[#004d00] px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-green-600 animate-ping"></div>
              ACTIVE
            </div>
          </div>
        </div>
      </header>

      <div className="px-6 -mt-14 relative z-20 space-y-14">
        <DisclaimerCard />

        <Link href="/cbt/community" onClick={handleForumEnter} className="block group">
          <div className="bg-gradient-to-br from-blue-700 to-blue-900 rounded-[3rem] p-8 shadow-2xl shadow-blue-900/30 relative overflow-hidden active:scale-[0.97] transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -mr-20 -mt-20"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-[2rem] flex items-center justify-center border border-white/20 backdrop-blur-xl shadow-inner">
                  <MessageCircle size={30} className="text-white" />
                  {unreadCount > 0 && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-full border-4 border-blue-800 animate-bounce shadow-lg">{unreadCount}</div>}
                </div>
                <div>
                  <h2 className="text-white font-black text-lg uppercase tracking-widest mb-1">Intel Forum</h2>
                  <p className="text-blue-100 text-[10px] font-bold uppercase tracking-widest opacity-80">{unreadCount > 0 ? `${unreadCount} New Reports` : "Academic Discussions"}</p>
                </div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-900 transition-all duration-500 shadow-lg"><ChevronRight size={20} /></div>
            </div>
          </div>
        </Link>

        <section>
          <div className="flex items-center justify-between mb-6 px-3">
            <div className="flex items-center gap-3"><History size={16} className="text-gray-400" /><h2 className="font-black text-[11px] text-gray-400 uppercase tracking-[0.3em]">Recent Operations</h2></div>
            {examHistory.length > 2 && (<button onClick={() => setHistoryExpanded(!historyExpanded)} className="text-[10px] font-black text-green-700 uppercase tracking-widest flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">{historyExpanded ? "Collapse" : "View All"} {historyExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>)}
          </div>
          {examHistory.length > 0 ? (
            <div className="space-y-3">
              {visibleHistory.map((item) => { 
                const pct = Math.round((item.score / item.total) * 100); 
                let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-100"; 
                if (pct < 40) colorClass = "text-red-700 bg-red-50 border-red-100"; 
                else if (pct < 60) colorClass = "text-amber-700 bg-amber-50 border-amber-100"; 
                return (
                  <div key={item.id} className="bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 font-black text-[10px] border border-gray-100 shadow-inner">{item.course_code.slice(0,3)}</div>
                      <div><p className="font-black text-sm text-gray-900 uppercase tracking-tighter">{item.course_code}</p><p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-0.5">{new Date(item.created_at).toLocaleDateString()}</p></div>
                    </div>
                    <div className={`text-right px-5 py-2 rounded-2xl border shadow-sm ${colorClass}`}>
                      <p className="font-black text-sm tracking-tighter">{pct}%</p>
                      <p className="text-[8px] font-black uppercase opacity-60 tracking-widest">{item.score}/{item.total}</p>
                    </div>
                  </div>
                ); 
              })}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-10 border-2 border-dashed border-gray-100 text-center"><p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">No Mission History Detected</p></div>
          )}
        </section>
        <section>
          <div className="flex items-center justify-between mb-8 px-3">
            <div className="flex items-center gap-4"><div className="bg-green-100 p-2.5 rounded-2xl text-[#004d00] shadow-sm"><BookOpen size={18} /></div><h2 className="font-black text-xs text-gray-500 uppercase tracking-[0.3em]">Module Directory</h2></div>
          </div>
          <div className="grid grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {sortedCourses.length > 0 ? sortedCourses.map(c => (<CourseCard key={c.id} course={c} onLaunch={setSetupCourse} isPremium={isPremium} />)) : (<div className="col-span-2 text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100"><p className="text-[11px] text-gray-400 font-black uppercase tracking-[0.3em]">No modules found in sector.</p></div>)}
          </div>
        </section>

        <section className="pt-10 pb-20">
          <div className="flex items-center justify-between mb-8 px-3">
            <div className="flex items-center gap-4"><div className="bg-yellow-100 p-3 rounded-2xl text-yellow-700 shadow-sm"><Trophy size={20} /></div><h2 className="font-black text-xs text-gray-500 uppercase tracking-[0.3em]">Hall of Fame</h2></div>
            <div className="flex items-center gap-2.5 bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full border border-emerald-100 shadow-sm"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[10px] font-black uppercase tracking-[0.2em]">Live Feed</span></div>
          </div>
          {qualifiedLeaders.length > 0 ? (
            <div className="flex gap-6 overflow-x-auto pb-12 px-3 -mx-3 custom-scrollbar snap-x">
              {qualifiedLeaders.map((user, i) => {
                const isFirst = i === 0;
                const isSecond = i === 1;
                const isThird = i === 2;
                let cardStyle = "bg-white border-gray-100";
                let rankBadge = null;
                if (isFirst) { cardStyle = "bg-gradient-to-b from-yellow-50 to-white border-yellow-200 shadow-2xl shadow-yellow-500/10"; rankBadge = <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center gap-2"><Crown size={14} fill="currentColor" /> Vanguard</div>; }
                else if (isSecond) { cardStyle = "bg-gradient-to-b from-slate-50 to-white border-slate-200"; rankBadge = <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-400 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Elite</div>; }
                else if (isThird) { cardStyle = "bg-gradient-to-b from-orange-50 to-white border-orange-200"; rankBadge = <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg">Operative</div>; }
                return (
                  <div key={i} className={`min-w-[220px] rounded-[3.5rem] p-10 border ${cardStyle} flex flex-col items-center text-center relative mt-8 snap-center group transition-all duration-700 hover:-translate-y-4`}>
                    {rankBadge}
                    <div className="relative mb-6">
                      <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center overflow-hidden border-4 ${isFirst ? 'border-yellow-400 shadow-2xl' : 'border-white shadow-lg'}`}><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover bg-gray-50" /></div>
                      {isFirst && <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-white p-2.5 rounded-full border-4 border-white shadow-xl"><Sparkles size={14} fill="currentColor" /></div>}
                    </div>
                    <h3 className="font-black text-sm text-gray-900 truncate w-full mb-1.5 uppercase tracking-tighter">{user.name}</h3>
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mb-6 truncate w-full">{user.department || "Unknown Unit"}</p>
                    <div className={`w-full py-4 rounded-2xl text-[12px] font-black flex items-center justify-center gap-3 ${isFirst ? 'bg-emerald-700 text-white shadow-xl shadow-emerald-900/20' : 'bg-gray-100 text-gray-600'}`}><Target size={14} /> <span>{user.score}%</span></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-[3.5rem] border-2 border-dashed border-gray-100"><div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-inner"><Trophy size={40} className="text-gray-200" /></div><p className="text-gray-400 text-[11px] font-black uppercase tracking-[0.3em]">Roster Empty. Be the First.</p></div>
          )}
        </section>
      </div>

      <div className="fixed bottom-8 left-6 right-6 z-40 max-w-2xl mx-auto">
        <div className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2.5rem] py-5 px-8 flex items-center justify-between animate-in slide-in-from-bottom-10 duration-1000">
          <div className="flex items-center gap-5 flex-1 min-w-0">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg shadow-green-600/30"><Award size={22} /></div>
            <div className="min-w-0">
              <h4 className="font-black text-[11px] text-white leading-none mb-1.5 uppercase tracking-[0.2em] truncate">{student.name}</h4>
              <p className="text-[9px] text-gray-500 font-black truncate uppercase tracking-widest">{student.department || "General Student"}</p>
            </div>
          </div>
          <div className="h-10 w-[1px] bg-white/10 mx-6"></div>
          <div className="text-right shrink-0">
            <p className="text-[8px] font-black text-gray-500 uppercase tracking-[0.3em] mb-1">Partner</p>
            <p className="text-[11px] font-black text-white leading-none uppercase tracking-widest">Abel Kings</p>
            <p className="text-[8px] font-black text-green-500 uppercase tracking-tighter mt-1">Tutorial Center</p>
          </div>
        </div>
      </div>
    </main>
  );
}
