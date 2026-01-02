"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, Trophy, BookOpen, Play, Award, 
  ChevronDown, Info, Crown, Clock, ChevronRight, 
  AlertTriangle, Layers, Headset, History, CheckCircle, Building2, Settings, Lock, Sparkles,
  ChevronUp, MessageCircle, Megaphone, Bell, GraduationCap, FileText, Target, Database
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import StatusModal from "../../../components/cbt/StatusModal";
import LiveTracker from "../../../components/cbt/LiveTracker";

const UpgradeModal = dynamic(() => import("../../../components/cbt/UpgradeModal"), { ssr: false });

/* === 1. EXAM SETUP MODAL === */
function ExamSetupModal({ course, isPremium, onClose, onStart, onUpgrade }) {
  const [duration, setDuration] = useState(course.duration || 15);
  const [qCount, setQCount] = useState(30);

  // LOGIC: Dynamic Attempt Limits
  const isGst = course.code.toUpperCase().startsWith("GST");
  const attemptLimit = isGst ? 2 : 1;
  const isBlocked = !isPremium && course.user_attempts >= attemptLimit;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in zoom-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden border border-white">
        <div className={`${isBlocked ? 'bg-red-900' : 'bg-[#004d00]'} p-6 text-white relative`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-green-400"></div>
          <h3 className="font-black text-xs uppercase tracking-[0.2em] flex items-center gap-2">
            {isBlocked ? <Lock size={14} /> : <Settings size={14} />} {isBlocked ? "Access Denied" : "Mission Config"}
          </h3>
          <p className="text-green-200 text-[10px] font-bold uppercase mt-1 tracking-widest">{course.code} • {course.title}</p>
        </div>
        <div className="p-6">
          {isBlocked ? (
            <div className="text-center py-2">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-3 border border-red-100"><Lock size={24} /></div>
              <p className="text-gray-600 text-xs font-medium mb-6">You have exhausted your {attemptLimit} free attempt{attemptLimit > 1 ? 's' : ''}.</p>
              <button onClick={onUpgrade} className="w-full py-3 bg-yellow-500 text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg mb-2">Upgrade to Premium</button>
              <button onClick={onClose} className="w-full py-2 text-gray-400 font-bold text-[9px] uppercase">Close</button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><Clock size={10} /> Time Limit</label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map((time) => {
                    const isRestricted = !isPremium && time !== 15;
                    return (
                      <button key={time} disabled={isRestricted} onClick={() => setDuration(time)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative overflow-hidden border ${duration === time ? 'border-green-600 bg-green-50 text-green-900 shadow-inner' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                        {time}m {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><Target size={10} /> Question Load</label>
                <div className="grid grid-cols-4 gap-2">
                  {[20, 40, 60, 100].map((count) => {
                    const isRestricted = !isPremium && count !== 30; 
                    return (
                      <button key={count} disabled={isRestricted} onClick={() => setQCount(count)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative overflow-hidden border ${qCount === count ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-inner' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                        {count} {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                      </button>
                    );
                  })}
                </div>
                {!isPremium && (
                  <button onClick={onUpgrade} className="mt-3 w-full flex items-center justify-center gap-2 text-[8px] text-yellow-700 bg-yellow-50 p-2.5 rounded-lg border border-yellow-100 hover:bg-yellow-100 transition-colors">
                    <Crown size={10} fill="currentColor" />
                    <span className="font-black uppercase tracking-widest">Upgrade to unlock full control</span>
                  </button>
                )}
              </div>
              <div className="flex gap-2">
                <button onClick={onClose} className="flex-1 py-3 border border-gray-100 rounded-xl text-[9px] font-black text-gray-400 uppercase tracking-widest transition-all">Cancel</button>
                <button onClick={() => onStart(duration, qCount)} className="flex-[1.5] py-3 bg-[#004d00] text-white rounded-xl text-[10px] font-black shadow-xl hover:bg-green-900 uppercase tracking-widest flex items-center justify-center gap-2">Start Mission <Play size={12} fill="currentColor" /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
/* === 2. DISCLAIMER CARD === */
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

/* === 3. COURSE CARD (POLISHED: COLORS & ELEMENTS) === */
function CourseCard({ course, onLaunch, variant = "green", isPremium }) {
  const isGstVariant = variant === "green";
  
  // LOGIC: Dynamic Attempt Limits
  const isGstCode = course.code.toUpperCase().startsWith("GST");
  const attemptLimit = isGstCode ? 2 : 1;
  const isBlocked = !isPremium && course.user_attempts >= attemptLimit;
  
  // === THE POLISH: DYNAMIC STYLES ===
  // 1. Theme Colors
  const theme = isGstVariant 
    ? { bg: "bg-green-50", text: "text-green-800", border: "border-green-100", icon: "text-green-600", btn: "bg-[#004d00]", shadow: "shadow-green-900/20" }
    : { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-100", icon: "text-blue-600", btn: "bg-blue-600", shadow: "shadow-blue-900/20" };

  // 2. Badge Style (Tinted Backgrounds)
  const badgeStyle = isBlocked 
    ? "bg-gray-100 text-gray-400 border-gray-200" 
    : `${theme.bg} ${theme.text} ${theme.border}`;

  // 3. Button Style (Juicy Glow)
  const btnStyle = isBlocked 
    ? "bg-gray-100 text-gray-300" 
    : `${theme.btn} text-white ${theme.shadow} shadow-lg`;

  // 4. Status Text
  const statusText = isBlocked 
    ? <span className="text-red-300 flex items-center gap-1"><Lock size={8} /> LOCKED</span> 
    : <span className={`${theme.icon} flex items-center gap-1`}><Sparkles size={8} /> READY</span>;

  return (
    <div 
      onClick={(e) => { e.preventDefault(); onLaunch(course); }} 
      className={`group relative bg-white rounded-[2rem] shadow-sm border border-transparent overflow-hidden flex flex-col h-full min-h-[210px] cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${!isBlocked && (isGstVariant ? 'hover:border-green-100' : 'hover:border-blue-100')}`}
    >
      <div className="p-6 flex flex-col h-full relative z-10">
        {/* HEADER: Code + Count */}
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-block px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${badgeStyle} transition-colors`}>
            {course.code}
          </span>
          <div className={`flex items-center gap-1 ${isBlocked ? 'text-gray-300' : theme.icon} opacity-70`}>
            <Database size={10} />
            <span className="text-[9px] font-bold">{course.total_questions || 0}</span>
          </div>
        </div>

        {/* BODY: Title (Centered & Spacious) */}
        <div className="flex-1 flex items-center">
          <h3 className={`font-black text-sm leading-relaxed text-gray-900 line-clamp-3 group-hover:opacity-80 transition-opacity`}>
            {course.title}
          </h3>
        </div>

        {/* FOOTER: Action */}
        <div className="mt-4 flex justify-between items-center">
           <div className="text-[9px] font-black uppercase tracking-wider">
             {statusText}
           </div>
           
           <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 ${btnStyle}`}>
             {isBlocked ? <Lock size={16} /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
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
  const [statusModal, setStatusModal] = useState(null);
  const [greeting, setGreeting] = useState("GOOD DAY");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [setupCourse, setSetupCourse] = useState(null);
  const [gstExpanded, setGstExpanded] = useState(true);
  const [othersExpanded, setOthersExpanded] = useState(false);
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
    setAvatarUrl(`https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`);

    async function fetchData() {
      try {
        const [syncRes, courseRes, lbRes, histRes, forumRes] = await Promise.all([
          fetch(`/api/cbt/auth/student-status?id=${parsed.id}`),
          fetch(`/api/cbt/courses?studentId=${parsed.id}`),
          fetch('/api/cbt/leaderboard'),
          fetch(`/api/cbt/history?studentId=${parsed.id}`),
          fetch(`/api/cbt/community/status?dept=${encodeURIComponent(parsed.department || 'General')}`)
        ]);
        
        const syncData = await syncRes.json();
        if (syncRes.ok) {
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
        const serverCount = forumData.count || 0;
        setTotalForumPosts(serverCount);
        const lastRead = parseInt(localStorage.getItem('cbt_forum_read_count') || '0');
        if (serverCount > lastRead) setUnreadCount(serverCount - lastRead);

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
      type: 'logout', title: 'Terminate Session?', message: 'You are about to disconnect from the secure portal.', actionLabel: 'Logout',
      onAction: () => { sessionStorage.removeItem("cbt_student"); router.push("/cbt"); },
      onCancel: () => setStatusModal(null)
    });
  };

  if (!mounted || !student) return null;
  const isPremium = student.subscription_status === 'premium';
  const gstCourses = courses.filter(c => c.code.toUpperCase().startsWith("GST"));
  const otherCourses = courses.filter(c => !c.code.toUpperCase().startsWith("GST"));
  const visibleHistory = historyExpanded ? examHistory : examHistory.slice(0, 2);
  const qualifiedLeaders = leaders.filter(user => user.score >= 60);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#004d00] gap-4">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      <p className="text-white font-black text-xs uppercase tracking-[0.3em]">Loading HQ...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfdfc] font-sans text-gray-900 pb-48 relative">
      <LiveTracker />
      {statusModal && <StatusModal {...statusModal} />}
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      {setupCourse && <ExamSetupModal course={setupCourse} isPremium={isPremium} onClose={() => setSetupCourse(null)} onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} onUpgrade={() => { setSetupCourse(null); setShowUpgrade(true); }} />}
      
      <header className="bg-[#004d00] text-white pt-8 pb-20 px-6 rounded-b-[2.5rem] shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden relative">
              {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />}
              {isPremium && <div className="absolute top-0 right-0 bg-yellow-400 p-1 rounded-bl-lg shadow-sm"><Crown size={8} className="text-black" fill="currentColor" /></div>}
            </div>
            <div>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-widest mb-0.5">{greeting}</p>
              <h1 className="text-xl font-black leading-none truncate w-40">{student.name.split(" ")[0]}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="https://wa.me/2348106293674" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-3 rounded-xl border border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.6)] animate-pulse hover:scale-105 transition-all"><Headset size={18} /></a>
            <button onClick={triggerLogout} className="bg-green-500/20 p-3 rounded-xl border border-white/10 hover:bg-red-600 transition-colors backdrop-blur-sm"><LogOut size={18} /></button>
          </div>
        </div>
        <div className="bg-[#003300] border border-white/5 rounded-2xl p-5 flex items-center justify-between shadow-inner">
          <div><p className="text-[9px] font-bold text-green-400 uppercase tracking-wider mb-1">Current Session</p><p className="font-black text-xs text-white tracking-wide">EXAMFORGE SESSION 2026</p></div>
          <div className="bg-white text-[#004d00] px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-wide shadow-sm">Active</div>
        </div>
      </header>

      <div className="px-5 -mt-8 relative z-20 space-y-6">
        <DisclaimerCard />

        <Link href="/cbt/community" onClick={handleForumEnter} className="block">
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-[2rem] p-6 shadow-xl shadow-blue-900/20 border border-blue-700 relative overflow-hidden group active:scale-[0.98] transition-transform">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
            <div className="relative z-10 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 relative">
                  <MessageCircle size={24} className="text-white" />
                  {unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-blue-900 animate-bounce shadow-lg">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-white font-black text-sm uppercase tracking-widest mb-1 flex items-center gap-2">
                    Community Forum
                    {unreadCount > 0 && <span className="bg-red-500 text-white text-[8px] px-1.5 py-0.5 rounded animate-pulse">NEW</span>}
                  </h2>
                  <p className="text-blue-200 text-[10px] font-bold">
                    {unreadCount > 0 ? `${unreadCount} New Messages Waiting...` : "Connect, Discuss & Get Updates"}
                  </p>
                </div>
              </div>
              <div className="bg-white text-blue-900 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wide shadow-lg flex items-center gap-2">
                Enter <ChevronRight size={12} />
              </div>
            </div>
          </div>
        </Link>

        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <div className="flex items-center gap-2"><History size={14} className="text-gray-400" /><h2 className="font-black text-[10px] text-gray-400 uppercase tracking-widest">Exam History</h2></div>
            {examHistory.length > 2 && (
              <button onClick={() => setHistoryExpanded(!historyExpanded)} className="text-[9px] font-bold text-green-600 uppercase tracking-wider flex items-center gap-1">
                {historyExpanded ? "Show Less" : "View All"} {historyExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              </button>
            )}
          </div>
          {examHistory.length > 0 ? (
            <div className="space-y-2">
              {visibleHistory.map((item) => {
                const pct = Math.round((item.score / item.total) * 100);
                let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-100";
                if (pct < 40) colorClass = "text-red-700 bg-red-50 border-red-100";
                else if (pct < 60) colorClass = "text-amber-700 bg-amber-50 border-amber-100";
                return (
                  <div key={item.id} className="bg-white p-3 rounded-2xl border border-gray-50 shadow-sm flex items-center justify-between animate-in fade-in slide-in-from-top-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 font-black text-[9px] border border-gray-100">{item.course_code.slice(0,3)}</div>
                      <div><p className="font-black text-[10px] text-gray-900 uppercase">{item.course_code}</p><p className="text-[8px] text-gray-400 font-bold uppercase">{new Date(item.created_at).toLocaleDateString()}</p></div>
                    </div>
                    <div className={`text-right px-3 py-1 rounded-lg border ${colorClass}`}>
                      <p className="font-black text-xs">{pct}%</p>
                      <p className="text-[7px] font-black uppercase opacity-70">{item.score}/{item.total}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-6 border border-gray-50 shadow-sm text-center"><p className="text-[9px] font-black text-gray-300 uppercase tracking-widest">No history available</p></div>
          )}
        </section>

        <section>
           <div className="flex items-center justify-between mb-3 px-1">
             <div className="flex items-center gap-2"><BookOpen size={14} className="text-[#004d00]" /><h2 className="font-black text-[10px] text-gray-500 uppercase tracking-widest">General Studies</h2></div>
             <button onClick={() => setGstExpanded(!gstExpanded)} className="text-gray-400"><ChevronDown size={14} className={`transition-transform ${gstExpanded ? 'rotate-180' : ''}`} /></button>
           </div>
          {gstExpanded && <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">{gstCourses.map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="green" isPremium={isPremium} />)}</div>}
        </section>

        <section className="bg-[#f0f4ff] rounded-[2rem] shadow-sm border border-blue-50 p-5">
          <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-2"><div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-md"><Layers size={12} /></div><h2 className="font-black text-[10px] text-blue-900 uppercase tracking-widest">Other Courses</h2></div><Sparkles size={12} className="text-blue-400 animate-pulse" /></div>
          <div className="grid grid-cols-2 gap-4">{otherCourses.slice(0, 2).map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="blue" isPremium={isPremium} />)}</div>
          {otherCourses.length > 2 && (
            <div className="mt-3">
              <button onClick={() => setOthersExpanded(!othersExpanded)} className="w-full py-3 bg-white/50 border border-blue-100 rounded-xl text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all">{othersExpanded ? "Hide Extra Units" : `View ${otherCourses.length - 2} More Units`}<ChevronDown size={12} className={`transition-transform ${othersExpanded ? 'rotate-180' : ''}`} /></button>
              {othersExpanded && <div className="mt-3 grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2">{otherCourses.slice(2).map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="blue" isPremium={isPremium} />)}</div>}
            </div>
          )}
        </section>

        <section>
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <div className="relative"><Trophy size={16} className="text-yellow-600" /><span className="absolute -top-1 -right-1 flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span></span></div>
              <h2 className="font-black text-[10px] text-gray-500 uppercase tracking-widest">Top Performers</h2>
            </div>
            <div className="flex items-center gap-1.5 bg-green-50 px-2 py-1 rounded-full border border-green-100"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div><span className="text-[8px] font-black text-green-700 uppercase tracking-tight">Live Ranking</span></div>
          </div>
          {qualifiedLeaders.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-4 px-2 -mx-2 custom-scrollbar snap-x">
              {qualifiedLeaders.map((user, i) => {
                const isFirst = i === 0;
                const isSecond = i === 1;
                const isThird = i === 2;
                let borderColor = "border-gray-100";
                let shadowClass = "shadow-sm";
                let rankBadge = null;
                if (isFirst) { borderColor = "border-yellow-200"; shadowClass = "shadow-lg shadow-yellow-100/50"; rankBadge = <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1"><Crown size={8} fill="currentColor" /> 1st Place</div>; }
                else if (isSecond) { borderColor = "border-gray-200"; rankBadge = <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm">2nd</div>; }
                else if (isThird) { borderColor = "border-orange-100"; rankBadge = <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm">3rd</div>; }
                return (
                  <div key={i} className={`min-w-[160px] bg-white rounded-[1.5rem] p-5 border ${borderColor} ${shadowClass} flex flex-col items-center text-center relative mt-3 snap-center group`}>
                    {rankBadge}
                    <div className={`relative mb-3 transition-transform duration-300 group-hover:scale-105`}>
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden border-2 ${isFirst ? 'border-yellow-400 p-0.5' : 'border-gray-50'}`}><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover rounded-xl bg-gray-50" /></div>
                      {isFirst && <div className="absolute -bottom-1 -right-1 bg-yellow-400 text-white p-1 rounded-full border-2 border-white"><Sparkles size={8} fill="currentColor" /></div>}
                    </div>
                    <h3 className="font-black text-[11px] text-gray-900 truncate w-full mb-1 uppercase tracking-tight leading-tight">{user.name.split(" ")[0]}</h3>
                    <div className="flex flex-col items-center gap-1 w-full mb-3">
                      <div className="flex items-center gap-1 text-[8px] text-gray-400 font-bold uppercase tracking-wide truncate max-w-full"><GraduationCap size={10} /><span className="truncate">{user.department || "Student"}</span></div>
                      <div className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-md text-[7px] font-black uppercase tracking-wider border border-blue-100 flex items-center gap-1"><FileText size={8} /> {user.course_code || "GEN"}</div>
                    </div>
                    <div className={`w-full py-1.5 rounded-xl text-[10px] font-black flex items-center justify-center gap-1 ${isFirst ? 'bg-[#004d00] text-white shadow-md shadow-green-900/20' : 'bg-gray-50 text-gray-600'}`}><span>{user.score}%</span></div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-[2rem] border border-dashed border-gray-200"><div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 animate-pulse"><Trophy size={20} className="text-gray-300" /></div><p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">No High Flyers Yet (60%+)</p></div>
          )}
        </section>
      </div>
      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md border border-green-100 shadow-xl rounded-2xl py-3 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0"><div className="w-8 h-8 bg-[#004d00] rounded-lg flex items-center justify-center text-white shrink-0"><Award size={16} /></div><div className="min-w-0"><h4 className="font-black text-[10px] text-gray-900 leading-none mb-0.5 uppercase tracking-tight">Bolu Adeoye</h4><p className="text-[7px] text-green-700 font-bold truncate uppercase tracking-tighter">Dept. of English & Literary Studies</p></div></div>
          <div className="h-6 w-[1px] bg-gray-200 mx-4"></div>
          <div className="text-right shrink-0"><p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Partner</p><p className="text-[9px] font-black text-gray-900 leading-none uppercase">Abel Kings</p><p className="text-[6px] font-bold text-green-600 uppercase tracking-tighter">Tutorial Center</p></div>
        </div>
      </div>
    </main>
  );
}
