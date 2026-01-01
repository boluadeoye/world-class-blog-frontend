"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Trophy, BookOpen, Play, Award,
  ChevronDown, Info, Crown, Clock, ChevronRight,
  AlertTriangle, Layers, Headset, History, CheckCircle, Settings, Lock, Sparkles,
  ChevronUp, MessageCircle, GraduationCap, FileText, Target, Zap, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import StatusModal from "@/components/cbt/StatusModal";
import LiveTracker from "@/components/cbt/LiveTracker";

const UpgradeModal = dynamic(() => import("@/components/cbt/UpgradeModal"), { ssr: false });

/* === 1. TACTICAL MISSION SETUP MODAL === */
function ExamSetupModal({ course, isPremium, onClose, onStart, onUpgrade }) {
  const [duration, setDuration] = useState(course.duration || 15);
  const [qCount, setQCount] = useState(30);
  const isBlocked = !isPremium && course.user_attempts >= 2;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in zoom-in duration-300">
      <div className="bg-[#0a0a0a] rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden border border-white/10 relative">
        {/* Background FX */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-500 via-green-500 to-blue-500"></div>
        
        <div className="p-8 relative z-10">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-black text-xl text-white uppercase tracking-tighter italic">Mission Config</h3>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{course.code}</p>
            </div>
            <div className={`px-3 py-1 rounded-full border ${isBlocked ? 'bg-red-500/20 border-red-500 text-red-400' : 'bg-green-500/20 border-green-500 text-green-400'} text-[9px] font-black uppercase tracking-widest`}>
              {isBlocked ? "LOCKED" : "READY"}
            </div>
          </div>

          {isBlocked ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30 animate-pulse"><Lock size={32} className="text-red-500" /></div>
              <p className="text-gray-400 text-xs font-medium mb-8 leading-relaxed">Tactical limit reached. Upgrade clearance level to proceed.</p>
              <button onClick={onUpgrade} className="w-full py-4 bg-yellow-500 text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(234,179,8,0.4)] hover:scale-105 transition-transform">Upgrade Clearance</button>
              <button onClick={onClose} className="mt-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest hover:text-white">Abort Mission</button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><Clock size={10} /> Time Allocation</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((time) => {
                      const isRestricted = !isPremium && time !== 15;
                      return (
                        <button key={time} disabled={isRestricted} onClick={() => setDuration(time)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative border ${duration === time ? 'border-green-500 bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'border-white/10 text-gray-400 bg-white/5 hover:bg-white/10'} ${isRestricted ? 'opacity-30 grayscale' : ''}`}>
                          {time}m {isRestricted && <Lock size={8} className="absolute top-1 right-1 text-yellow-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 flex items-center gap-2"><Target size={10} /> Intel Volume</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[20, 40, 60, 100].map((count) => {
                      const isRestricted = !isPremium && count !== 30;
                      return (
                        <button key={count} disabled={isRestricted} onClick={() => setQCount(count)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative border ${qCount === count ? 'border-blue-500 bg-blue-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]' : 'border-white/10 text-gray-400 bg-white/5 hover:bg-white/10'} ${isRestricted ? 'opacity-30 grayscale' : ''}`}>
                          {count} {isRestricted && <Lock size={8} className="absolute top-1 right-1 text-yellow-500" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-4 border border-white/10 rounded-2xl text-[10px] font-black text-gray-500 uppercase tracking-widest hover:bg-white/5 transition-all">Cancel</button>
                <button onClick={() => onStart(duration, qCount)} className="flex-[2] py-4 bg-[#004d00] text-white rounded-2xl text-[10px] font-black shadow-xl hover:bg-green-900 uppercase tracking-widest flex items-center justify-center gap-2 border border-green-800">
                  Start Mission <Play size={12} fill="currentColor" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* === 2. INTELLIGENCE BRIEFING (Disclaimer) === */
function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-[2rem] overflow-hidden mb-6 shadow-lg shadow-gray-200/50 border border-gray-100">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left group">
        <div className="flex items-center gap-4">
          <div className="bg-orange-50 w-12 h-12 flex items-center justify-center rounded-2xl text-orange-600 border border-orange-100 group-hover:scale-110 transition-transform"><AlertTriangle size={20} /></div>
          <div><h3 className="font-black text-xs text-gray-900 uppercase tracking-widest">Intelligence Brief</h3><p className="text-[9px] text-gray-400 font-bold mt-0.5 uppercase tracking-tight">Read Protocol Before Engagement</p></div>
        </div>
        <div className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center transition-transform duration-300 ${isOpen ? 'rotate-180 bg-orange-50 text-orange-600' : 'text-gray-400'}`}><ChevronDown size={14} /></div>
      </button>
      {isOpen && (
        <div className="px-6 pb-8 text-[10px] text-gray-600 leading-relaxed border-t border-gray-50 pt-4 bg-gray-50/50">
          <ul className="space-y-3 font-medium">
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></div> <span>This simulation is for <strong>tactical conditioning</strong> only.</span></li>
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></div> <span>Focus on <strong>speed and precision</strong>.</span></li>
            <li className="flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 shrink-0"></div> <span>Performance here does not guarantee field results.</span></li>
          </ul>
        </div>
      )}
    </div>
  );
}

/* === 3. SECTOR CARD (Course) === */
function CourseCard({ course, onLaunch, variant = "green", isPremium }) {
  const isGst = variant === "green";
  const isBlocked = !isPremium && course.user_attempts >= 2;
  return (
    <div onClick={() => onLaunch(course)} className="relative bg-white p-4 rounded-[1.5rem] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 flex justify-between items-center group active:scale-[0.98] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer overflow-hidden mb-3">
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${isGst ? 'bg-green-600' : 'bg-blue-600'} opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      <div className="flex items-center gap-4 flex-1 min-w-0 pl-2">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-[10px] border shrink-0 shadow-sm ${isGst ? 'bg-green-50 text-[#004d00] border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
          {course.code.slice(0,3)}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight truncate group-hover:text-green-800 transition-colors">{course.code}</h3>
          <p className="text-[9px] text-gray-400 font-bold truncate uppercase tracking-wide">{course.title}</p>
        </div>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all shrink-0 ml-3 ${isBlocked ? 'bg-red-50 text-red-500 border border-red-100' : 'bg-gray-900 text-white group-hover:bg-[#004d00] group-hover:scale-110'}`}>
        {isBlocked ? <Lock size={14} /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
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
  const [greeting, setGreeting] = useState("WELCOME BACK");
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
      type: 'logout', title: 'Terminate Session?', message: 'Confirm disconnection from the secure portal.', actionLabel: 'Logout',
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a] gap-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-green-900 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        <div className="absolute inset-0 flex items-center justify-center"><Zap size={20} className="text-green-500 animate-pulse" fill="currentColor" /></div>
      </div>
      <p className="text-green-500 font-black text-[10px] uppercase tracking-[0.4em] animate-pulse">Initializing Command...</p>
    </div>
  );
  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 pb-48 relative selection:bg-green-200">
      <LiveTracker />
      {statusModal && <StatusModal {...statusModal} />}
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      {setupCourse && <ExamSetupModal course={setupCourse} isPremium={isPremium} onClose={() => setSetupCourse(null)} onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} onUpgrade={() => { setSetupCourse(null); setShowUpgrade(true); }} />}

      {/* === HERO HUD === */}
      <header className="bg-[#050505] text-white pt-10 pb-24 px-6 rounded-b-[3rem] shadow-2xl relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#002b00]/40 to-[#004d00]/80"></div>
        
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-lg overflow-hidden relative group">
                {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />}
                {isPremium && <div className="absolute bottom-0 inset-x-0 bg-yellow-500 h-1.5"></div>}
              </div>
              <div>
                <p className="text-green-400 text-[9px] font-black uppercase tracking-[0.2em] mb-1">{greeting}</p>
                <h1 className="text-2xl font-black leading-none truncate w-48 tracking-tight">{student.name.split(" ")[0]}</h1>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="https://wa.me/2348106293674" target="_blank" className="bg-white/5 p-3 rounded-2xl border border-white/10 text-green-400 hover:bg-green-500 hover:text-black transition-all active:scale-95"><Headset size={20} /></a>
              <button onClick={triggerLogout} className="bg-white/5 p-3 rounded-2xl border border-white/10 text-red-400 hover:bg-red-600 hover:text-white transition-all active:scale-95"><LogOut size={20} /></button>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex items-center justify-between shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/30 transition-colors"></div>
            <div className="relative z-10">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Operational Status</p>
              <p className="font-black text-sm text-white tracking-widest flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span> SESSION 2026 ACTIVE</p>
            </div>
            <div className="bg-green-500 text-black px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.4)]">Online</div>
          </div>
        </div>
      </header>

      <div className="px-5 -mt-12 relative z-20 space-y-8">
        <DisclaimerCard />

        {/* === COMMUNITY FEED === */}
        <Link href="/cbt/community" onClick={handleForumEnter} className="block group">
          <div className="bg-gradient-to-r from-blue-900 to-[#001a33] rounded-[2.5rem] p-1 shadow-2xl shadow-blue-900/20 active:scale-[0.98] transition-transform">
            <div className="bg-[#0a0a0a] rounded-[2.3rem] p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full blur-[60px]"></div>
              <div className="relative z-10 flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/30 relative">
                    <MessageCircle size={26} className="text-blue-400" />
                    {unreadCount > 0 && <div className="absolute -top-2 -right-2 bg-red-500 text-white text-[9px] font-black w-6 h-6 flex items-center justify-center rounded-full border-4 border-[#0a0a0a] animate-bounce">{unreadCount}</div>}
                  </div>
                  <div>
                    <h2 className="text-white font-black text-sm uppercase tracking-widest mb-1">Tactical Comms</h2>
                    <p className="text-gray-400 text-[10px] font-bold">{unreadCount > 0 ? `${unreadCount} New Intel Reports` : "Secure Channel Active"}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-blue-600 group-hover:scale-110 transition-all"><ChevronRight size={16} /></div>
              </div>
            </div>
          </div>
        </Link>

        {/* === SECTORS (Courses) === */}
        <section>
           <div className="flex items-center justify-between mb-5 px-2">
             <div className="flex items-center gap-3"><div className="bg-green-100 p-1.5 rounded-lg text-green-800"><BookOpen size={14} /></div><h2 className="font-black text-xs text-gray-400 uppercase tracking-[0.2em]">General Sectors</h2></div>
             <button onClick={() => setGstExpanded(!gstExpanded)} className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-400 hover:text-black transition-colors"><ChevronDown size={14} className={`transition-transform ${gstExpanded ? 'rotate-180' : ''}`} /></button>
           </div>
          {gstExpanded && <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{gstCourses.map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="green" isPremium={isPremium} />)}</div>}
        </section>

        <section className="bg-white rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-400"></div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3"><div className="bg-blue-100 p-1.5 rounded-lg text-blue-800"><Layers size={14} /></div><h2 className="font-black text-xs text-gray-400 uppercase tracking-[0.2em]">Specialized Units</h2></div>
            <Sparkles size={14} className="text-blue-400 animate-pulse" />
          </div>
          <div className="space-y-2">{otherCourses.slice(0, 2).map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="blue" isPremium={isPremium} />)}</div>
          {otherCourses.length > 2 && (
            <div className="mt-4">
              <button onClick={() => setOthersExpanded(!othersExpanded)} className="w-full py-4 bg-gray-50 border border-gray-100 rounded-2xl text-[9px] font-black text-gray-500 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-gray-100 transition-all">{othersExpanded ? "Collapse Units" : `Expand ${otherCourses.length - 2} More Units`}<ChevronDown size={12} className={`transition-transform ${othersExpanded ? 'rotate-180' : ''}`} /></button>
              {othersExpanded && <div className="mt-4 space-y-2 animate-in fade-in slide-in-from-top-2">{otherCourses.slice(2).map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="blue" isPremium={isPremium} />)}</div>}
            </div>
          )}
        </section>

        {/* === HALL OF LEGENDS === */}
        <section>
          <div className="flex items-center justify-between mb-5 px-2">
            <div className="flex items-center gap-3"><div className="bg-yellow-100 p-1.5 rounded-lg text-yellow-700"><Trophy size={14} /></div><h2 className="font-black text-xs text-gray-400 uppercase tracking-[0.2em]">Hall of Legends</h2></div>
            <div className="flex items-center gap-1.5 bg-black text-white px-3 py-1 rounded-full"><div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div><span className="text-[8px] font-black uppercase tracking-widest">Live</span></div>
          </div>
          {qualifiedLeaders.length > 0 ? (
            <div className="flex gap-4 overflow-x-auto pb-8 px-2 -mx-2 custom-scrollbar snap-x">
              {qualifiedLeaders.map((user, i) => {
                const isFirst = i === 0;
                const isSecond = i === 1;
                const isThird = i === 2;
                let cardStyle = "bg-white border-gray-100";
                let rankBadge = null;
                
                if (isFirst) { 
                  cardStyle = "bg-gradient-to-b from-yellow-50 to-white border-yellow-200 shadow-xl shadow-yellow-500/10"; 
                  rankBadge = <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg flex items-center gap-1"><Crown size={10} fill="currentColor" /> Vanguard</div>; 
                } else if (isSecond) {
                  cardStyle = "bg-gradient-to-b from-gray-50 to-white border-gray-200";
                  rankBadge = <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-400 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">Elite</div>;
                } else if (isThird) {
                  cardStyle = "bg-gradient-to-b from-orange-50 to-white border-orange-200";
                  rankBadge = <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-400 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md">Operative</div>;
                }

                return (
                  <div key={i} className={`min-w-[180px] rounded-[2rem] p-6 border ${cardStyle} flex flex-col items-center text-center relative mt-4 snap-center group transition-transform hover:-translate-y-1`}>
                    {rankBadge}
                    <div className="relative mb-4">
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden border-4 ${isFirst ? 'border-yellow-400' : 'border-white shadow-sm'}`}>
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover bg-gray-50" />
                      </div>
                      {isFirst && <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full border-4 border-white shadow-sm"><Sparkles size={10} fill="currentColor" /></div>}
                    </div>
                    <h3 className="font-black text-xs text-gray-900 truncate w-full mb-1 uppercase tracking-tight">{user.name}</h3>
                    <p className="text-[8px] text-gray-400 font-bold uppercase tracking-wide mb-4 truncate w-full">{user.department || "Unknown Unit"}</p>
                    <div className={`w-full py-2 rounded-xl text-[10px] font-black flex items-center justify-center gap-1 ${isFirst ? 'bg-[#004d00] text-white shadow-lg shadow-green-900/20' : 'bg-gray-100 text-gray-600'}`}>
                      <Target size={10} /> <span>{user.score}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"><Trophy size={24} className="text-gray-300" /></div>
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Roster Empty. Be the First.</p>
            </div>
          )}
        </section>
      </div>

      {/* === FLOATING PARTNER BAR === */}
      <div className="fixed bottom-6 left-6 right-6 z-40 max-w-2xl mx-auto">
        <div className="bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl py-4 px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(22,163,74,0.5)]"><Award size={18} /></div>
            <div className="min-w-0">
              <h4 className="font-black text-[10px] text-white leading-none mb-1 uppercase tracking-widest">Bolu Adeoye</h4>
              <p className="text-[8px] text-gray-400 font-bold truncate uppercase tracking-tight">Dept. of English & Literary Studies</p>
            </div>
          </div>
          <div className="h-8 w-[1px] bg-white/10 mx-4"></div>
          <div className="text-right shrink-0">
            <p className="text-[7px] font-black text-gray-500 uppercase tracking-[0.2em] mb-0.5">Powered By</p>
            <p className="text-[10px] font-black text-white leading-none uppercase tracking-wide">Abel Kings</p>
          </div>
        </div>
      </div>
    </main>
  );
}
