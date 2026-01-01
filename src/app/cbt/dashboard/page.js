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

/* === 1. EXECUTIVE LOGOUT MODAL === */
function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden border border-gray-200">
        <div className="p-6 text-center">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600"><LogOut size={20} /></div>
          <h3 className="font-bold text-lg text-gray-900 mb-1">Disconnect?</h3>
          <p className="text-gray-500 text-xs leading-relaxed mb-6">Confirm termination of secure session.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50">Cancel</button>
            <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-bold shadow-lg hover:bg-red-700">Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === 2. PRECISION SETUP MODAL === */
function ExamSetupModal({ course, isPremium, onClose, onStart, onUpgrade }) {
  const [duration, setDuration] = useState(course.duration || 15);
  const [qCount, setQCount] = useState(30);
  const isBlocked = !isPremium && course.user_attempts >= 2;

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-md p-0 sm:p-4 animate-in slide-in-from-bottom-10 sm:zoom-in duration-300">
      <div className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 relative">
        <div className={`px-6 py-5 border-b border-gray-100 flex justify-between items-center ${isBlocked ? 'bg-red-50' : 'bg-white'}`}>
          <div>
            <h3 className="font-bold text-lg text-gray-900 leading-none">Mission Setup</h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">{course.code}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100"><X size={16} /></button>
        </div>
        <div className="p-6">
          {isBlocked ? (
            <div className="text-center py-2">
              <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4"><Lock size={24} className="text-red-500" /></div>
              <p className="text-gray-600 text-xs font-medium mb-6">Clearance limit reached. Upgrade required.</p>
              <button onClick={onUpgrade} className="w-full py-3.5 bg-yellow-500 text-black rounded-xl font-bold text-xs uppercase tracking-wider shadow-md">Upgrade Now</button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Time Limit</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((time) => {
                      const isRestricted = !isPremium && time !== 15;
                      return (
                        <button key={time} disabled={isRestricted} onClick={() => setDuration(time)} className={`py-2.5 rounded-lg text-[10px] font-bold border transition-all ${duration === time ? 'border-[#004d00] bg-[#004d00] text-white' : 'border-gray-100 text-gray-500 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                          {time}m
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-3 block">Questions</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[20, 40, 60, 100].map((count) => {
                      const isRestricted = !isPremium && count !== 30;
                      return (
                        <button key={count} disabled={isRestricted} onClick={() => setQCount(count)} className={`py-2.5 rounded-lg text-[10px] font-bold border transition-all ${qCount === count ? 'border-blue-700 bg-blue-700 text-white' : 'border-gray-100 text-gray-500 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                          {count}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <button onClick={() => onStart(duration, qCount)} className="w-full py-4 bg-[#004d00] text-white rounded-xl text-xs font-bold shadow-xl shadow-green-900/10 uppercase tracking-wider flex items-center justify-center gap-2">Start Exam <ChevronRight size={14} /></button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* === 3. COMPACT DISCLAIMER === */
function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-orange-50/50 rounded-2xl border border-orange-100 mb-6">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 text-left">
        <div className="flex items-center gap-3">
          <Info size={16} className="text-orange-500" />
          <span className="text-[10px] font-bold text-orange-800 uppercase tracking-wide">Simulation Protocol</span>
        </div>
        <ChevronDown size={14} className={`text-orange-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 text-[10px] text-orange-900/70 leading-relaxed">
          <p>This is a psychological simulation. Success here does not guarantee main exam results. Focus on speed and accuracy.</p>
        </div>
      )}
    </div>
  );
}

/* === 4. THE "DATA-FIRST" COURSE CARD === */
function CourseCard({ course, onLaunch, isPremium }) {
  const isGst = course.code.toUpperCase().startsWith("GST");
  const isBlocked = !isPremium && course.user_attempts >= 2;
  const accentColor = isGst ? "bg-[#004d00]" : "bg-slate-700";
  const badgeStyle = isGst ? "bg-green-50 text-green-700 border-green-100" : "bg-slate-50 text-slate-600 border-slate-100";

  return (
    <div onClick={() => onLaunch(course)} className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full active:scale-[0.98]">
      <div className={`h-1 w-full ${accentColor}`}></div>
      <div className="p-5 flex flex-col h-full justify-between">
        <div>
          <div className="flex justify-between items-start mb-3">
            <span className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider border ${badgeStyle}`}>{course.code}</span>
            {isBlocked && <Lock size={12} className="text-red-400" />}
          </div>
          <h3 className="font-bold text-gray-900 text-xs leading-snug mb-1 uppercase">{course.title}</h3>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Database size={10} className="text-gray-400" />
            <span className="text-[9px] font-medium text-gray-400">{course.total_questions || 0} Qs</span>
          </div>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isGst ? 'bg-green-50 text-green-700' : 'bg-slate-50 text-slate-700'}`}>
            <Play size={10} fill="currentColor" />
          </div>
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#004d00] gap-4">
      <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      <p className="text-green-100 font-bold text-[10px] uppercase tracking-widest">Loading Core...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 pb-40 relative selection:bg-green-100">
      <LiveTracker />
      {showLogoutConfirm && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutConfirm(false)} />}
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      {setupCourse && <ExamSetupModal course={setupCourse} isPremium={isPremium} onClose={() => setSetupCourse(null)} onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} onUpgrade={() => { setSetupCourse(null); setShowUpgrade(true); }} />}

      <header className="bg-[#004d00] text-white pt-8 pb-16 px-6 rounded-b-3xl shadow-xl relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="relative z-10 flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border-2 border-white/10 shadow-lg relative overflow-hidden">
              {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />}
              {isPremium && (<div className="absolute -top-1 -right-1 bg-yellow-400 text-black p-1 rounded-full border-2 border-[#004d00] z-20"><Crown size={8} fill="currentColor" /></div>)}
            </div>
            <div>
              <p className="text-green-300 text-[9px] font-bold uppercase tracking-widest mb-0.5">{greeting}</p>
              <h1 className="text-xl font-bold leading-none tracking-tight">{student.name.split(" ")[0]}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://wa.me/2348106293674" target="_blank" className="bg-green-600/50 p-2.5 rounded-xl border border-green-500/30 text-white hover:bg-green-600 transition-all"><Headset size={18} /></a>
            <button onClick={() => setShowLogoutConfirm(true)} className="bg-white/10 p-2.5 rounded-xl border border-white/10 text-red-200 hover:bg-red-600 hover:text-white transition-all"><LogOut size={18} /></button>
          </div>
        </div>
        <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-bold text-green-400 uppercase tracking-widest mb-0.5">System Status</p>
            <p className="font-bold text-xs text-white tracking-wide">EXAMFORGE CORE</p>
          </div>
          <div className="bg-white text-[#004d00] px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider shadow-lg flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-600 animate-pulse"></div>
            ACTIVE
          </div>
        </div>
      </header>
      <div className="px-5 -mt-8 relative z-20 space-y-8">
        <DisclaimerCard />

        <Link href="/cbt/community" onClick={handleForumEnter} className="block group">
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-2xl p-5 shadow-lg shadow-blue-900/20 relative overflow-hidden active:scale-[0.98] transition-all">
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10 relative">
                  <MessageCircle size={20} className="text-white" />
                  {unreadCount > 0 && <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-4 h-4 flex items-center justify-center rounded-full border-2 border-blue-800">{unreadCount}</div>}
                </div>
                <div>
                  <h2 className="text-white font-bold text-xs uppercase tracking-wider mb-0.5">Intel Forum</h2>
                  <p className="text-blue-200 text-[9px] font-medium">{unreadCount > 0 ? `${unreadCount} New Reports` : "Academic Discussions"}</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-white/50" />
            </div>
          </div>
        </Link>

        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="font-bold text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2"><History size={12} /> Recent Ops</h2>
            {examHistory.length > 2 && (<button onClick={() => setHistoryExpanded(!historyExpanded)} className="text-[9px] font-bold text-green-700 uppercase tracking-wide">{historyExpanded ? "Collapse" : "View All"}</button>)}
          </div>
          {examHistory.length > 0 ? (
            <div className="space-y-2">
              {visibleHistory.map((item) => { 
                const pct = Math.round((item.score / item.total) * 100); 
                let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-100"; 
                if (pct < 40) colorClass = "text-red-700 bg-red-50 border-red-100"; 
                else if (pct < 60) colorClass = "text-amber-700 bg-amber-50 border-amber-100"; 
                return (
                  <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 font-bold text-[9px] border border-gray-100">{item.course_code.slice(0,3)}</div>
                      <div><p className="font-bold text-xs text-gray-900 uppercase">{item.course_code}</p><p className="text-[8px] text-gray-400 font-medium uppercase">{new Date(item.created_at).toLocaleDateString()}</p></div>
                    </div>
                    <div className={`text-right px-3 py-1 rounded-lg border ${colorClass}`}>
                      <p className="font-bold text-xs">{pct}%</p>
                    </div>
                  </div>
                ); 
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-dashed border-gray-200 text-center"><p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">No History</p></div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="font-bold text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2"><BookOpen size={12} /> Modules</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {sortedCourses.length > 0 ? sortedCourses.map(c => (<CourseCard key={c.id} course={c} onLaunch={setSetupCourse} isPremium={isPremium} />)) : (<div className="col-span-2 text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200"><p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">No modules found.</p></div>)}
          </div>
        </section>

        <section className="pt-4 pb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="font-bold text-[10px] text-gray-400 uppercase tracking-widest flex items-center gap-2"><Trophy size={12} /> Top Rank</h2>
            <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-100"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div><span className="text-[8px] font-bold uppercase tracking-wide">Live</span></div>
          </div>
          {qualifiedLeaders.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-6 px-1 -mx-1 custom-scrollbar snap-x">
              {qualifiedLeaders.map((user, i) => {
                const isFirst = i === 0;
                let cardStyle = isFirst ? "bg-yellow-50 border-yellow-200" : "bg-white border-gray-100";
                return (
                  <div key={i} className={`min-w-[140px] rounded-2xl p-4 border ${cardStyle} flex flex-col items-center text-center relative snap-center`}>
                    {isFirst && <div className="absolute -top-2 bg-yellow-400 text-white px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wide shadow-sm">Vanguard</div>}
                    <div className="w-12 h-12 rounded-xl bg-gray-200 mb-3 overflow-hidden"><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover" /></div>
                    <h3 className="font-bold text-xs text-gray-900 truncate w-full mb-0.5 uppercase">{user.name}</h3>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wide mb-3 truncate w-full">{user.department || "Unknown"}</p>
                    <div className={`w-full py-1.5 rounded-lg text-[10px] font-bold ${isFirst ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-50 text-gray-600'}`}>{user.score}%</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-2xl border border-dashed border-gray-200"><p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Roster Empty.</p></div>
          )}
        </section>
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-md mx-auto">
        <div className="bg-[#0a0a0a]/95 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-4 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white shrink-0 shadow-lg"><Award size={14} /></div>
              <h4 className="font-bold text-xs text-white uppercase tracking-wide truncate">{student.name}</h4>
            </div>
            <p className="text-[9px] text-gray-400 font-medium leading-tight pl-11">{student.department || "General Student"}</p>
          </div>
          <div className="shrink-0 text-right border-l border-white/10 pl-4">
            <p className="text-[7px] font-bold text-gray-500 uppercase tracking-widest mb-0.5">Partner</p>
            <div className="bg-white/5 px-2 py-1 rounded-md border border-white/5">
              <p className="text-[9px] font-black text-white leading-none uppercase">Abel Kings</p>
              <p className="text-[7px] font-bold text-green-500 uppercase tracking-wider mt-0.5">Tutorial Center</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
