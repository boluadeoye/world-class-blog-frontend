"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Trophy, BookOpen, Play, Award,
  ChevronDown, Info, Crown, Clock, ChevronRight,
  AlertTriangle, Layers, Headset, History, CheckCircle, Settings, Lock, Sparkles,
  ChevronUp, MessageCircle, GraduationCap, FileText, Target, Zap, ShieldCheck, Search,
  Library, Landmark, Microscope, PenTool, Database
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import StatusModal from "@/components/cbt/StatusModal";
import LiveTracker from "@/components/cbt/LiveTracker";

const UpgradeModal = dynamic(() => import("@/components/cbt/UpgradeModal"), { ssr: false });

/* === 1. INTERNAL COMPONENT: STATUS MODAL === */
function InternalStatusModal({ type, title, message, actionLabel, onAction, onCancel }) {
  const configs = {
    success: { icon: <CheckCircle className="text-green-600" size={40} />, bg: "bg-green-50", btn: "bg-green-700 hover:bg-green-800" },
    error: { icon: <XCircle className="text-red-600" size={40} />, bg: "bg-red-50", btn: "bg-red-600 hover:bg-red-700" },
    warning: { icon: <AlertTriangle className="text-orange-600" size={40} />, bg: "bg-orange-50", btn: "bg-orange-600 hover:bg-orange-700" },
    logout: { icon: <LogOut className="text-red-600" size={40} />, bg: "bg-red-50", btn: "bg-red-600 hover:bg-red-700" }
  };
  const config = configs[type] || configs.error;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6 animate-in fade-in">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100">
        <div className={`${config.bg} p-10 flex flex-col items-center text-center`}>
          <div className="mb-4 drop-shadow-sm">{config.icon}</div>
          <h3 className="font-black text-xl text-gray-900 uppercase tracking-tight mb-2">{title}</h3>
          <p className="text-gray-600 text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <div className="p-6 bg-white flex gap-3">
          {onCancel && <button onClick={onCancel} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black text-gray-400 uppercase tracking-widest">Cancel</button>}
          <button onClick={onAction} className={`flex-[1.5] py-4 ${config.btn} text-white rounded-2xl text-xs font-black shadow-lg uppercase tracking-widest`}>{actionLabel || "Acknowledge"}</button>
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
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-900/90 backdrop-blur-md p-4 animate-in zoom-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden border border-slate-100 relative">
        <div className={`p-8 relative z-10 ${isBlocked ? 'bg-red-50' : 'bg-slate-50'} border-b border-slate-100`}>
          <h3 className={`font-black text-xl uppercase tracking-tighter ${isBlocked ? 'text-red-900' : 'text-slate-900'}`}>Examination Setup</h3>
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] mt-1 ${isBlocked ? 'text-red-400' : 'text-slate-500'}`}>{course.code} • {course.title}</p>
        </div>
        <div className="p-8 pt-6">
          {isBlocked ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200"><Lock size={32} className="text-red-600" /></div>
              <p className="text-slate-600 text-xs font-medium mb-8 leading-relaxed">Maximum free attempts recorded. Upgrade required for further access.</p>
              <button onClick={onUpgrade} className="w-full py-4 bg-yellow-500 text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-transform">Upgrade Clearance</button>
              <button onClick={onClose} className="mt-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest hover:text-slate-600">Return to Catalog</button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">Time Allocation</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((time) => {
                      const isRestricted = !isPremium && time !== 15;
                      return (
                        <button key={time} disabled={isRestricted} onClick={() => setDuration(time)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative border ${duration === time ? 'border-emerald-600 bg-emerald-600 text-white shadow-lg' : 'border-slate-100 text-slate-400 bg-slate-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                          {time}m {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">Question Volume</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[20, 40, 60, 100].map((count) => {
                      const isRestricted = !isPremium && count !== 30;
                      return (
                        <button key={count} disabled={isRestricted} onClick={() => setQCount(count)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative border ${qCount === count ? 'border-slate-900 bg-slate-900 text-white shadow-lg' : 'border-slate-100 text-slate-400 bg-slate-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                          {count} {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-4 border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest">Cancel</button>
                <button onClick={() => onStart(duration, qCount)} className="flex-[2] py-4 bg-emerald-700 text-white rounded-2xl text-[10px] font-black shadow-xl hover:bg-emerald-800 uppercase tracking-widest flex items-center justify-center gap-2">Begin Examination <ChevronRight size={14} /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
/* === 3. ACADEMIC PROTOCOL (RED ALERT) === */
function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-red-50 rounded-xl overflow-hidden mb-8 shadow-sm border border-red-100">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left group hover:bg-red-100 transition-colors">
        <div className="flex items-center gap-4">
          <div className="text-red-600 bg-white p-2 rounded-xl shadow-sm"><AlertTriangle size={20} /></div>
          <div><h3 className="font-black text-xs text-red-900 uppercase tracking-widest">Examination Protocol</h3></div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}><ChevronDown size={16} className="text-red-400" /></div>
      </button>
      {isOpen && (
        <div className="px-6 pb-8 text-[11px] text-red-900 leading-relaxed border-t border-red-200 pt-5 bg-red-50/50">
          <ul className="space-y-3 font-medium">
            <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> <span>This module is for <strong>academic conditioning</strong>.</span></li>
            <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> <span>Adhere strictly to the <strong>time constraints</strong>.</span></li>
            <li className="flex gap-3"><span className="text-red-600 font-bold">•</span> <span>Performance here is indicative, not absolute.</span></li>
          </ul>
        </div>
      )}
    </div>
  );
}

/* === 4. THE GRADE-1 COURSE CARD === */
function CourseCard({ course, onLaunch, isPremium }) {
  const isGst = course.code.toUpperCase().startsWith("GST");
  const isBlocked = !isPremium && course.user_attempts >= 2;
  
  let SealIcon = Library;
  if (!isGst) {
    if (course.code.startsWith("BIO") || course.code.startsWith("CHM")) SealIcon = Microscope;
    else if (course.code.startsWith("LAW") || course.code.startsWith("BUS")) SealIcon = Landmark;
    else SealIcon = PenTool;
  }

  return (
    <div onClick={() => onLaunch(course)} className="group relative bg-white rounded-[2rem] border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col h-full">
      <div className={`h-1.5 w-full ${isGst ? 'bg-emerald-600' : 'bg-slate-800'}`}></div>
      <div className="p-6 flex flex-col h-full justify-between relative">
        <div className={`absolute -right-8 -top-8 opacity-[0.02] transform rotate-12 scale-[3] ${isGst ? 'text-emerald-900' : 'text-slate-900'}`}><SealIcon /></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-4">
            <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${isGst ? 'bg-emerald-50 text-emerald-800 border-emerald-100' : 'bg-slate-50 text-slate-700 border-slate-100'}`}>{course.code}</span>
            {isBlocked && <div className="bg-red-50 text-red-500 p-1.5 rounded-lg border border-red-100"><Lock size={14} /></div>}
          </div>
          <h3 className="font-black text-slate-900 text-sm leading-snug mb-2 line-clamp-2 min-h-[2.5rem] tracking-tight">{course.title}</h3>
        </div>
        <div className="mt-6 pt-5 border-t border-slate-50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-2">
            <Database size={12} className="text-slate-300" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{course.total_questions || 0} Questions</span>
          </div>
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 ${isBlocked ? 'bg-slate-200 text-slate-400' : isGst ? 'bg-emerald-700' : 'bg-slate-900'}`}><Play size={14} fill="currentColor" className="ml-0.5" /></div>
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
  const [statusModal, setStatusModal] = useState(null);
  const [greeting, setGreeting] = useState("WELCOME SCHOLAR");
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

  const handleForumEnter = () => {
    localStorage.setItem('cbt_forum_read_count', totalForumPosts.toString());
    setUnreadCount(0);
  };

  const triggerLogout = () => {
    setStatusModal({
      type: 'logout', title: 'End Session?', message: 'Confirm disconnection from the academic portal.', actionLabel: 'Logout',
      onAction: () => { sessionStorage.removeItem("cbt_student"); router.push("/cbt"); },
      onCancel: () => setStatusModal(null)
    });
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
        <div className="w-16 h-16 border-4 border-emerald-800 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center"><Library size={20} className="text-white animate-pulse" /></div>
      </div>
      <p className="text-emerald-100 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Loading Modules...</p>
    </div>
  );
  return (
    <main className="min-h-screen bg-[#fcfdfc] font-sans text-slate-900 pb-48 relative selection:bg-emerald-100">
      <LiveTracker />
      {statusModal && <InternalStatusModal {...statusModal} />}
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      {setupCourse && <ExamSetupModal course={setupCourse} isPremium={isPremium} onClose={() => setSetupCourse(null)} onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} onUpgrade={() => { setSetupCourse(null); setShowUpgrade(true); }} />}

      <header className="bg-[#004d00] text-white pt-10 pb-24 px-6 rounded-b-[3.5rem] shadow-2xl relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#003300]/20 to-[#002200]/40"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center border-2 border-white/20 shadow-xl overflow-visible relative group">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden">
                   {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />}
                </div>
                {isPremium && (<div className="absolute -top-3 -right-3 bg-yellow-400 text-black p-2 rounded-full border-4 border-[#004d00] shadow-xl z-20 animate-bounce"><Crown size={14} fill="currentColor" /></div>)}
              </div>
              <div><p className="text-emerald-300 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{greeting}</p><h1 className="text-2xl font-black leading-none truncate w-48 tracking-tighter">{student.name.split(" ")[0]}</h1></div>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/2348106293674" target="_blank" className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-white hover:bg-white hover:text-[#004d00] transition-all active:scale-95 shadow-lg"><Headset size={22} /></a>
              <button onClick={triggerLogout} className="bg-white/10 p-3.5 rounded-2xl border border-white/10 text-red-200 hover:bg-red-600 hover:text-white transition-all active:scale-95 shadow-lg"><LogOut size={22} /></button>
            </div>
          </div>
          <div className="bg-[#003300]/60 backdrop-blur-md border border-white/10 rounded-[2rem] p-6 flex items-center justify-between shadow-inner relative overflow-hidden">
            <div className="relative z-10"><p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Academic Status</p><p className="font-black text-sm text-white tracking-widest flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> SESSION 2026 ACTIVE</p></div>
            <div className="bg-white text-[#004d00] px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">Enrolled</div>
          </div>
        </div>
      </header>

      <div className="px-6 -mt-12 relative z-20 space-y-10">
        <DisclaimerCard />
        <Link href="/cbt/community" onClick={handleForumEnter} className="block group">
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-[2.5rem] p-6 shadow-2xl shadow-blue-900/20 relative overflow-hidden active:scale-[0.98] transition-all duration-300">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[50px] -mr-12 -mt-12"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20 relative backdrop-blur-sm shadow-inner"><MessageCircle size={30} className="text-white" />{unreadCount > 0 && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-7 h-7 flex items-center justify-center rounded-full border-4 border-blue-800 animate-bounce shadow-lg">{unreadCount}</div>}</div>
                <div><h2 className="text-white font-black text-lg uppercase tracking-widest mb-1">Community Forum</h2><p className="text-blue-100 text-[11px] font-bold opacity-80">Academic Discussions & Intel</p></div>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-900 transition-all shadow-lg"><ChevronRight size={20} /></div>
            </div>
          </div>
        </Link>

        <section>
           <div className="flex items-center justify-between mb-6 px-2"><div className="flex items-center gap-3"><div className="bg-emerald-100 p-2 rounded-xl text-emerald-800 shadow-sm"><BookOpen size={16} /></div><h2 className="font-black text-xs text-slate-500 uppercase tracking-[0.25em]">Course Directory</h2></div></div>
           <div className="grid grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-8 duration-700">
              {sortedCourses.length > 0 ? sortedCourses.map(c => (<CourseCard key={c.id} course={c} onLaunch={setSetupCourse} isPremium={isPremium} />)) : (<div className="col-span-2 text-center py-16 bg-white rounded-[2.5rem] border border-dashed border-slate-200"><p className="text-[11px] text-slate-400 font-black uppercase tracking-widest">No modules found.</p></div>)}
           </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 px-2"><div className="flex items-center gap-2"><History size={16} className="text-slate-400" /><h2 className="font-black text-[10px] text-slate-400 uppercase tracking-widest">Recent Operations</h2></div>{examHistory.length > 2 && (<button onClick={() => setHistoryExpanded(!historyExpanded)} className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center gap-1">{historyExpanded ? "Show Less" : "View All"} {historyExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</button>)}</div>
          {examHistory.length > 0 ? (<div className="space-y-3">{visibleHistory.map((item) => { const pct = Math.round((item.score / item.total) * 100); let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-100"; if (pct < 40) colorClass = "text-red-700 bg-red-50 border-red-100"; else if (pct < 60) colorClass = "text-amber-700 bg-amber-50 border-amber-100"; return (<div key={item.id} className="bg-white p-5 rounded-[1.8rem] border border-slate-100 shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-top-2"><div className="flex items-center gap-5"><div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-black text-[11px] border border-slate-100 shadow-inner">{item.course_code.slice(0,3)}</div><div><p className="font-black text-sm text-slate-900 uppercase tracking-tight">{item.course_code}</p><p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">{new Date(item.created_at).toLocaleDateString()}</p></div></div><div className={`text-right px-4 py-2 rounded-2xl border ${colorClass} shadow-sm`}><p className="font-black text-sm">{pct}%</p><p className="text-[8px] font-black uppercase opacity-70">{item.score}/{item.total}</p></div></div>); })}</div>) : (<div className="bg-white rounded-[2rem] p-8 border border-dashed border-slate-200 text-center"><p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Mission History</p></div>)}
        </section>

        <section>
          <div className="flex items-center justify-between mb-6 px-2"><div className="flex items-center gap-3"><div className="bg-yellow-100 p-2 rounded-xl text-yellow-700 shadow-sm"><Trophy size={16} /></div><h2 className="font-black text-xs text-slate-500 uppercase tracking-[0.25em]">Hall of Legends</h2></div><div className="flex items-center gap-2 bg-slate-900 text-white px-4 py-1.5 rounded-full shadow-lg"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[9px] font-black uppercase tracking-widest">Live</span></div></div>
          {qualifiedLeaders.length > 0 ? (<div className="flex gap-5 overflow-x-auto pb-10 px-2 -mx-2 custom-scrollbar snap-x">{qualifiedLeaders.map((user, i) => { const isFirst = i === 0; const isSecond = i === 1; const isThird = i === 2; let cardStyle = "bg-white border-slate-100"; let rankBadge = null; if (isFirst) { cardStyle = "bg-gradient-to-b from-yellow-50 to-white border-yellow-200 shadow-2xl shadow-yellow-500/10"; rankBadge = <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1.5"><Crown size={12} fill="currentColor" /> Vanguard</div>; } else if (isSecond) { cardStyle = "bg-gradient-to-b from-slate-50 to-white border-slate-200"; rankBadge = <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-400 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Elite</div>; } else if (isThird) { cardStyle = "bg-gradient-to-b from-orange-50 to-white border-orange-200"; rankBadge = <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Operative</div>; } return (<div key={i} className={`min-w-[200px] rounded-[2.5rem] p-8 border ${cardStyle} flex flex-col items-center text-center relative mt-6 snap-center group transition-all duration-500 hover:-translate-y-2`}>{rankBadge}<div className="relative mb-5"><div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center overflow-hidden border-4 ${isFirst ? 'border-yellow-400 shadow-xl' : 'border-white shadow-md'}`}><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover bg-slate-50" /></div>{isFirst && <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-2 rounded-full border-4 border-white shadow-lg"><Sparkles size={12} fill="currentColor" /></div>}</div><h3 className="font-black text-sm text-slate-900 truncate w-full mb-1 uppercase tracking-tight">{user.name}</h3><p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mb-5 truncate w-full">{user.department || "Unknown Unit"}</p><div className={`w-full py-3 rounded-2xl text-[11px] font-black flex items-center justify-center gap-2 ${isFirst ? 'bg-emerald-700 text-white shadow-xl shadow-emerald-900/20' : 'bg-slate-100 text-slate-600'}`}><Target size={12} /> <span>{user.score}%</span></div></div>); })}</div>) : (<div className="text-center py-16 bg-white rounded-[3rem] border border-dashed border-slate-200"><div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse"><Trophy size={32} className="text-slate-300" /></div><p className="text-slate-400 text-[11px] font-black uppercase tracking-widest">Roster Empty. Be the First.</p></div>)}
        </section>
      </div>

      <div className="fixed bottom-8 left-8 right-8 z-40 max-w-2xl mx-auto">
        <div className="bg-slate-900/95 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[2rem] py-5 px-8 flex items-center justify-between">
          <div className="flex items-center gap-5 flex-1 min-w-0"><div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.4)]"><Award size={22} /></div><div className="min-w-0"><h4 className="font-black text-xs text-white leading-none mb-1.5 uppercase tracking-widest">Bolu Adeoye</h4><p className="text-[9px] text-slate-400 font-bold truncate uppercase tracking-widest opacity-70">Dept. of English & Literary Studies</p></div></div>
          <div className="h-10 w-[1px] bg-white/10 mx-6"></div>
          <div className="text-right shrink-0"><p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Partner</p><p className="text-[11px] font-black text-white leading-none uppercase tracking-widest">Abel Kings</p><p className="text-[8px] font-bold text-emerald-500 uppercase tracking-widest mt-1">Tutorial Center</p></div>
        </div>
      </div>
    </main>
  );
}
