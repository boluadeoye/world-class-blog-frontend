"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, Trophy, BookOpen, Play, Award, 
  ChevronDown, Info, Crown, Clock, ChevronRight, 
  AlertTriangle, Layers, Headset, History, CheckCircle, Building2, Settings, Lock, Sparkles
} from "lucide-react";
import dynamic from "next/dynamic";
import StatusModal from "../../../components/cbt/StatusModal";

const UpgradeModal = dynamic(() => import("../../../components/cbt/UpgradeModal"), { ssr: false });

/* === 1. COMPACT SETUP MODAL === */
function ExamSetupModal({ course, isPremium, onClose, onStart, onUpgrade }) {
  const [duration, setDuration] = useState(course.duration || 15);
  const isBlocked = !isPremium && course.user_attempts >= 2;
  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in zoom-in duration-200">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden border border-white">
        <div className={`${isBlocked ? 'bg-red-900' : 'bg-[#004d00]'} p-6 text-white relative`}>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-green-400"></div>
          <h3 className="font-black text-xs uppercase tracking-widest flex items-center gap-2">
            {isBlocked ? <Lock size={14} /> : <Settings size={14} />} {isBlocked ? "Access Denied" : "Session Config"}
          </h3>
        </div>
        <div className="p-6">
          {isBlocked ? (
            <div className="text-center py-2">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-xl flex items-center justify-center mx-auto mb-4 border border-red-100"><Lock size={24} /></div>
              <p className="text-gray-600 text-xs font-bold mb-6 leading-relaxed">Free limit reached (2/2 attempts). Upgrade to continue.</p>
              <button onClick={onUpgrade} className="w-full py-3.5 bg-yellow-500 text-black rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg mb-3">Upgrade to Premium</button>
              <button onClick={onClose} className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Close</button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-3">Select Duration</label>
                <div className="grid grid-cols-4 gap-2">
                  {[15, 30, 45, 60].map((time) => {
                    const isRestricted = !isPremium && time !== 15;
                    return (
                      <button key={time} disabled={isRestricted} onClick={() => setDuration(time)} className={`py-3 rounded-xl text-[10px] font-black transition-all border-2 relative overflow-hidden ${duration === time ? 'border-green-600 bg-green-50 text-green-900' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                        {time}m {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-3.5 border-2 border-gray-100 rounded-xl text-[10px] font-black text-gray-400 uppercase tracking-widest">Cancel</button>
                <button onClick={() => onStart(duration)} className="flex-[2] py-3.5 bg-gray-900 text-white rounded-xl text-[10px] font-black shadow-xl hover:bg-black active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2">Start <Play size={12} fill="currentColor" /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* === 2. SLEEK COURSE CARD === */
function CourseCard({ course, onLaunch, variant = "green", isPremium }) {
  const isGst = variant === "green";
  const isBlocked = !isPremium && course.user_attempts >= 2;
  return (
    <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group active:scale-[0.98] transition-transform mb-2">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-[10px] border ${isGst ? 'bg-green-50 text-[#004d00] border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
          {course.code.slice(0,3)}
        </div>
        <div className="min-w-0">
          <h3 className="font-black text-gray-900 text-xs uppercase truncate w-32">{course.code}</h3>
          <p className="text-[9px] text-gray-400 font-medium truncate w-40">{course.title}</p>
        </div>
      </div>
      <button 
        onClick={(e) => { e.preventDefault(); onLaunch(course); }} 
        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${isBlocked ? 'bg-red-50 text-red-400' : isGst ? 'bg-gray-900 text-white hover:bg-[#004d00]' : 'bg-blue-900 text-white hover:bg-blue-950'}`}
      >
        {isBlocked ? <Lock size={12} /> : <Play size={12} fill="currentColor" />}
      </button>
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
        const [syncRes, courseRes, lbRes, histRes] = await Promise.all([
          fetch(`/api/cbt/auth/student-status?id=${parsed.id}`),
          fetch(`/api/cbt/courses?studentId=${parsed.id}`),
          fetch('/api/cbt/leaderboard'),
          fetch(`/api/cbt/history?studentId=${parsed.id}`)
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
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchData();
  }, [router]);

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

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#004d00] gap-4">
      <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      <p className="text-white font-black text-[10px] uppercase tracking-[0.3em]">Loading HQ...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfdfc] font-sans text-gray-900 pb-32 relative">
      {statusModal && <StatusModal {...statusModal} />}
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      {setupCourse && <ExamSetupModal course={setupCourse} isPremium={isPremium} onClose={() => setSetupCourse(null)} onStart={(dur) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}`)} onUpgrade={() => { setSetupCourse(null); setShowUpgrade(true); }} />}
      
      <header className="bg-[#004d00] text-white pt-6 pb-12 px-6 rounded-b-[35px] shadow-xl relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden relative">
              {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />}
              {isPremium && <div className="absolute top-0 right-0 bg-yellow-400 p-1 rounded-bl-lg shadow-sm"><Crown size={10} className="text-black" fill="currentColor" /></div>}
            </div>
            <div>
              <p className="text-green-200 text-[9px] font-bold uppercase tracking-widest mb-0.5">{greeting}</p>
              <h1 className="text-lg font-black leading-none truncate w-40">{student.name.split(" ")[0]}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="https://wa.me/2348106293674" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-2.5 rounded-xl border border-white/20 text-white shadow-lg animate-pulse"><Headset size={18} /></a>
            <button onClick={triggerLogout} className="bg-[#006400] p-2.5 rounded-xl border border-white/10 hover:bg-red-600 transition-colors shadow-lg"><LogOut size={18} /></button>
          </div>
        </div>
        <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 flex items-center justify-between">
          <div><p className="text-[9px] font-bold text-green-400 uppercase tracking-wider mb-0.5">Current Session</p><p className="font-black text-xs text-white">EXAMFORGE SESSION 2026</p></div>
          <div className="bg-white text-[#004d00] px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wide shadow-sm">Active</div>
        </div>
      </header>

      <div className="px-6 -mt-6 relative z-20 space-y-5">
        {/* === GST SECTION === */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button onClick={() => setGstExpanded(!gstExpanded)} className="w-full p-4 flex items-center justify-between bg-green-50/50">
            <div className="flex items-center gap-3"><BookOpen size={16} className="text-[#004d00]" /><h2 className="font-black text-[11px] text-gray-700 uppercase tracking-widest">General Studies</h2></div>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${gstExpanded ? 'rotate-180' : ''}`} />
          </button>
          {gstExpanded && <div className="p-3 animate-in fade-in slide-in-from-top-2">{gstCourses.map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="green" isPremium={isPremium} />)}</div>}
        </section>

        {/* === OTHER COURSES === */}
        <section className="bg-[#f0f4ff] rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-100 p-4">
          <div className="flex items-center justify-between mb-4"><div className="flex items-center gap-3"><div className="bg-blue-600 p-1.5 rounded-lg text-white shadow-lg shadow-blue-200"><Layers size={14} /></div><h2 className="font-black text-[11px] text-blue-900 uppercase tracking-widest">Other Courses</h2></div><Sparkles size={14} className="text-blue-400 animate-pulse" /></div>
          <div className="space-y-1">{otherCourses.slice(0, 2).map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="blue" isPremium={isPremium} />)}</div>
          {otherCourses.length > 2 && (
            <div className="mt-3">
              <button onClick={() => setOthersExpanded(!othersExpanded)} className="w-full py-2.5 bg-white/50 border border-blue-200 rounded-xl text-[9px] font-black text-blue-600 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all">{othersExpanded ? "Hide Units" : `View ${otherCourses.length - 2} More`}<ChevronDown size={12} className={`transition-transform ${othersExpanded ? 'rotate-180' : ''}`} /></button>
              {othersExpanded && <div className="mt-3 space-y-1 animate-in fade-in slide-in-from-top-2">{otherCourses.slice(2).map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="blue" isPremium={isPremium} />)}</div>}
            </div>
          )}
        </section>

        {/* === LEADERBOARD === */}
        <section>
          <div className="flex items-center gap-2 mb-3"><Trophy size={16} className="text-yellow-600" /><h2 className="font-black text-[11px] text-gray-500 uppercase tracking-widest">Top Performers</h2></div>
          {leaders.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 overflow-x-auto flex gap-4 custom-scrollbar">
              {leaders.map((user, i) => (
                <div key={i} className="min-w-[160px] bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center relative">
                  {i === 0 && <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1 rounded-full shadow-sm"><Crown size={12} fill="currentColor" /></div>}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm mb-3 overflow-hidden border-2 ${i === 0 ? 'border-yellow-400' : 'border-gray-100'}`}><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover" /></div>
                  <h3 className="font-black text-[10px] text-gray-900 truncate w-full mb-1 uppercase tracking-tighter">{user.name}</h3>
                  <div className="flex items-center gap-1 text-[7px] text-blue-600 font-black uppercase mb-2 bg-blue-50 px-2 py-0.5 rounded"><Building2 size={8} /> {user.department || "General"}</div>
                  <div className="bg-[#004d00] text-white px-3 py-0.5 rounded-full text-[9px] font-black shadow-md">{user.score}%</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-white rounded-3xl border border-gray-100"><p className="text-gray-400 text-[9px] font-black uppercase tracking-widest">Awaiting Rankings...</p></div>
          )}
        </section>
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md border border-green-100 shadow-lg rounded-2xl py-2 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-7 h-7 bg-[#004d00] rounded-lg flex items-center justify-center text-white shrink-0"><Award size={14} /></div>
            <div className="min-w-0"><h4 className="font-black text-[10px] text-gray-900 leading-none mb-0.5 uppercase tracking-tight">Bolu Adeoye</h4><p className="text-[7px] text-green-700 font-bold truncate uppercase tracking-tighter">Dept. of English & Literary Studies</p></div>
          </div>
          <div className="h-5 w-[1px] bg-gray-200 mx-4"></div>
          <div className="text-right shrink-0"><p className="text-[6px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Partner</p><p className="text-[8px] font-black text-gray-900 leading-none uppercase">Abel Kings</p><p className="text-[6px] font-bold text-green-600 uppercase tracking-tighter">Tutorial Center</p></div>
        </div>
      </div>
    </main>
  );
}
