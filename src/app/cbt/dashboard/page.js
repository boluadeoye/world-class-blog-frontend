"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, Trophy, BookOpen, Play, Award, 
  ChevronDown, Info, Crown, Clock, ChevronRight, 
  AlertTriangle, Layers, Headset, History, CheckCircle, Building2, Settings, Lock, Sparkles
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import StatusModal from "../../../components/cbt/StatusModal";

const UpgradeModal = dynamic(() => import("../../../components/cbt/UpgradeModal"), { ssr: false });

/* === 1. LUXURIOUS EXAM SETUP MODAL === */
function ExamSetupModal({ course, isPremium, onClose, onStart, onUpgrade }) {
  const [duration, setDuration] = useState(course.duration || 15);
  const isBlocked = !isPremium && course.user_attempts >= 2;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.3)] w-full max-w-sm overflow-hidden border border-white relative">
        
        {/* Header Section */}
        <div className={`${isBlocked ? 'bg-[#002b00]' : 'bg-[#004d00]'} p-10 text-white relative overflow-hidden`}>
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 via-orange-500 to-yellow-400"></div>
          <div className="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h3 className="font-black text-sm uppercase tracking-[0.3em] flex items-center gap-3 mb-2">
              {isBlocked ? <Lock size={18} className="text-yellow-400" /> : <Settings size={18} className="text-green-300" />}
              {isBlocked ? "Vault Locked" : "Mission Setup"}
            </h3>
            <p className="text-green-200 text-[11px] font-bold uppercase tracking-widest opacity-80">{course.code} • {course.title}</p>
          </div>
        </div>
        
        <div className="p-10 bg-white">
          {isBlocked ? (
            <div className="text-center">
              <div className="relative mb-8 inline-block">
                <div className="absolute inset-0 bg-red-500 blur-2xl opacity-20 animate-pulse"></div>
                <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center relative z-10 border border-red-100 shadow-inner">
                  <Lock size={36} strokeWidth={2.5} />
                </div>
              </div>
              <h4 className="text-xl font-black text-gray-900 uppercase tracking-tighter mb-3">Limit Reached</h4>
              <p className="text-gray-500 text-xs font-medium mb-10 leading-relaxed">
                You have exhausted your free attempts. Secure <span className="text-green-700 font-bold">Premium Clearance</span> to forge ahead.
              </p>
              <button onClick={onUpgrade} className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all active:scale-95 mb-4">
                Unlock Unlimited Access
              </button>
              <button onClick={onClose} className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors">Close Terminal</button>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-5 ml-1">Select Duration</label>
                <div className="grid grid-cols-4 gap-3">
                  {[15, 30, 45, 60].map((time) => (
                    <button
                      key={time}
                      disabled={!isPremium && time !== (course.duration || 15)}
                      onClick={() => setDuration(time)}
                      className={`py-4 rounded-2xl text-xs font-black transition-all relative overflow-hidden border-2 ${
                        duration === time 
                          ? 'border-green-600 bg-green-50 text-green-900 shadow-md' 
                          : 'border-gray-100 text-gray-400 bg-gray-50'
                      }`}
                    >
                      {time}m
                      {!isPremium && time !== (course.duration || 15) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/40 backdrop-blur-[1px]">
                          <Lock size={10} className="text-gray-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                {!isPremium && (
                  <button onClick={onUpgrade} className="mt-6 w-full flex items-center justify-center gap-3 text-[10px] text-yellow-700 bg-yellow-50 p-4 rounded-2xl border border-yellow-100 hover:bg-yellow-100 transition-all group">
                    <Crown size={14} className="group-hover:rotate-12 transition-transform" fill="currentColor" />
                    <span className="font-black uppercase tracking-widest">Upgrade for Time Control</span>
                  </button>
                )}
              </div>
              <div className="flex gap-4">
                <button onClick={onClose} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:bg-gray-50 uppercase tracking-widest transition-all">Cancel</button>
                <button onClick={() => onStart(duration)} className="flex-[2] py-4 bg-gray-900 text-white rounded-2xl text-[10px] font-black shadow-xl hover:bg-black active:scale-95 uppercase tracking-widest flex items-center justify-center gap-2">
                  Start Exam <Play size={14} fill="currentColor" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* === 2. DISCLAIMER ACCORDION === */
function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-[#FFF8F0] border border-orange-100 rounded-[2.5rem] overflow-hidden mb-8 shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-7 text-left">
        <div className="flex items-center gap-5">
          <div className="bg-orange-100 w-12 h-12 flex items-center justify-center rounded-2xl text-orange-600 shadow-inner"><Info size={24} /></div>
          <div>
            <h3 className="font-black text-sm text-[#5A3A29] uppercase tracking-widest">Important Disclaimer</h3>
            <p className="text-[10px] text-orange-400 font-bold uppercase tracking-tighter">Read before starting</p>
          </div>
        </div>
        <ChevronDown size={20} className={`text-orange-300 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-8 pb-10 text-xs text-[#8B5E3C] leading-relaxed animate-in slide-in-from-top-4 duration-500">
          <p className="mb-4 font-black text-[#5A3A29] uppercase tracking-widest border-b border-orange-100 pb-2">Strict Warning:</p>
          <ul className="space-y-3 font-medium">
            <li className="flex gap-3"><span className="text-orange-400 font-black">•</span> <span>The purpose of this mock examination is <strong>NOT</strong> to expose likely questions.</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black">•</span> <span>The aim is to <strong>simulate the environment</strong> and prepare you psychologically for the real exam.</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black">•</span> <span>Use this tool to practice <strong>time management</strong> and pressure handling.</span></li>
          </ul>
        </div>
      )}
    </div>
  );
}

/* === 3. COURSE CARD === */
function CourseCard({ course, onLaunch, variant = "green", isPremium }) {
  const isGst = variant === "green";
  const isBlocked = !isPremium && course.user_attempts >= 2;
  return (
    <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-center group active:scale-[0.98] transition-transform mb-4">
      <div className="flex items-center gap-5">
        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm border ${isGst ? 'bg-green-50 text-[#004d00] border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
          {course.code.slice(0,3)}
        </div>
        <div>
          <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">{course.code}</h3>
          <p className="text-[10px] text-gray-500 font-medium truncate w-40">{course.title}</p>
        </div>
      </div>
      <button onClick={() => onLaunch(course)} className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all ${isBlocked ? 'bg-red-50 text-red-400 border border-red-100' : isGst ? 'bg-gray-900 text-white hover:bg-[#004d00]' : 'bg-blue-900 text-white hover:bg-blue-950'}`}>
        {isBlocked ? <Lock size={16} /> : <Play size={16} fill="currentColor" />}
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
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      <p className="text-white font-black text-xs uppercase tracking-[0.3em]">Loading HQ...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfdfc] font-sans text-gray-900 pb-48 relative">
      {statusModal && <StatusModal {...statusModal} />}
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      {setupCourse && <ExamSetupModal course={setupCourse} isPremium={isPremium} onClose={() => setSetupCourse(null)} onStart={(dur) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}`)} onUpgrade={() => { setSetupCourse(null); setShowUpgrade(true); }} />}
      
      <header className="bg-[#004d00] text-white pt-8 pb-16 px-6 rounded-b-[40px] shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden relative">
              {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />}
              {isPremium && <div className="absolute top-0 right-0 bg-yellow-400 p-1 rounded-bl-lg shadow-sm"><Crown size={10} className="text-black" fill="currentColor" /></div>}
            </div>
            <div>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-widest mb-1">{greeting}</p>
              <h1 className="text-xl font-black leading-none truncate w-40">{student.name.split(" ")[0]}</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <a href="https://wa.me/2348106293674" target="_blank" rel="noopener noreferrer" className="bg-green-500 p-3 rounded-xl border border-white/20 text-white hover:bg-green-400 transition-all shadow-lg animate-pulse"><Headset size={20} /></a>
            <button onClick={triggerLogout} className="bg-[#006400] p-3 rounded-xl border border-white/10 hover:bg-red-600 transition-colors shadow-lg"><LogOut size={20} /></button>
          </div>
        </div>
        <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between">
          <div><p className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Current Session</p><p className="font-black text-sm text-white">EXAMFORGE SESSION 2026</p></div>
          <div className="bg-white text-[#004d00] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide shadow-sm">Active</div>
        </div>
      </header>

      <div className="px-6 -mt-8 relative z-20 space-y-6">
        <DisclaimerCard />
        <section>
          <div className="flex items-center gap-2 mb-4"><History size={18} className="text-gray-400" /><h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Exam History</h2></div>
          {examHistory.length > 0 ? (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
              {examHistory.map((item) => {
                const pct = Math.round((item.score / item.total) * 100);
                let colorClass = "text-emerald-700 bg-emerald-50 border-emerald-100";
                if (pct < 40) colorClass = "text-red-700 bg-red-50 border-red-100";
                else if (pct < 60) colorClass = "text-amber-700 bg-amber-50 border-amber-100";
                return (
                  <div key={item.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 font-black text-[10px]">{item.course_code.slice(0,3)}</div>
                      <div><p className="font-black text-xs text-gray-900 uppercase">{item.course_code}</p><p className="text-[9px] text-gray-400 font-bold uppercase">{new Date(item.created_at).toLocaleDateString()}</p></div>
                    </div>
                    <div className={`text-right px-4 py-1.5 rounded-2xl border ${colorClass}`}>
                      <p className="font-black text-sm">{pct}%</p>
                      <p className="text-[8px] font-black uppercase opacity-70">{item.score}/{item.total}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm text-center"><p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">No missions completed yet</p></div>
          )}
        </section>
        <section className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <button onClick={() => setGstExpanded(!gstExpanded)} className="w-full p-6 flex items-center justify-between bg-green-50/50">
            <div className="flex items-center gap-3"><BookOpen size={18} className="text-[#004d00]" /><h2 className="font-black text-xs text-gray-700 uppercase tracking-widest">General Studies</h2></div>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${gstExpanded ? 'rotate-180' : ''}`} />
          </button>
          {gstExpanded && <div className="p-5 animate-in fade-in slide-in-from-top-2">{gstCourses.map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="green" isPremium={isPremium} />)}</div>}
        </section>
        <section className="bg-[#f0f4ff] rounded-[2.5rem] shadow-xl shadow-blue-900/5 border border-blue-100 p-6">
          <div className="flex items-center justify-between mb-6"><div className="flex items-center gap-3"><div className="bg-blue-600 p-2 rounded-xl text-white shadow-lg shadow-blue-200"><Layers size={18} /></div><h2 className="font-black text-sm text-blue-900 uppercase tracking-widest">Other Courses</h2></div><Sparkles size={16} className="text-blue-400 animate-pulse" /></div>
          <div className="space-y-1">{otherCourses.slice(0, 2).map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="blue" isPremium={isPremium} />)}</div>
          {otherCourses.length > 2 && (
            <div className="mt-4">
              <button onClick={() => setOthersExpanded(!othersExpanded)} className="w-full py-4 bg-white/50 border border-blue-200 rounded-2xl text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white transition-all">{othersExpanded ? "Hide Extra Units" : `View ${otherCourses.length - 2} More Units`}<ChevronDown size={14} className={`transition-transform ${othersExpanded ? 'rotate-180' : ''}`} /></button>
              {othersExpanded && <div className="mt-4 space-y-1 animate-in fade-in slide-in-from-top-2">{otherCourses.slice(2).map(c => <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant="blue" isPremium={isPremium} />)}</div>}
            </div>
          )}
        </section>
        <section>
          <div className="flex items-center gap-2 mb-4"><Trophy size={18} className="text-yellow-600" /><h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Top Performers</h2></div>
          {leaders.length > 0 ? (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-5 overflow-x-auto flex gap-5 custom-scrollbar">
              {leaders.map((user, i) => (
                <div key={i} className="min-w-[180px] bg-gray-50 rounded-[2rem] p-6 border border-gray-100 flex flex-col items-center text-center relative transition-transform hover:-translate-y-1">
                  {i === 0 && <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full shadow-sm"><Crown size={12} fill="currentColor" /></div>}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-sm mb-4 overflow-hidden border-2 ${i === 0 ? 'border-yellow-400' : 'border-gray-100'}`}><img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover" /></div>
                  <h3 className="font-black text-xs text-gray-900 truncate w-full mb-1 uppercase tracking-tighter">{user.name}</h3>
                  <div className="flex items-center gap-1 text-[8px] text-blue-600 font-black uppercase mb-3 bg-blue-50 px-2 py-0.5 rounded"><Building2 size={10} /> {user.department || "General"}</div>
                  <div className="bg-[#004d00] text-white px-4 py-1 rounded-full text-[10px] font-black shadow-md">{user.score}%</div>
                  <p className="text-[8px] text-gray-400 mt-2 font-bold uppercase">{user.course_code}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-[2.5rem] border border-gray-100"><p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Awaiting First Contender</p></div>
          )}
        </section>
      </div>

      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto">
        <div className="bg-white/90 backdrop-blur-md border border-green-100 shadow-lg rounded-2xl py-2.5 px-5 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 bg-[#004d00] rounded-lg flex items-center justify-center text-white shrink-0"><Award size={16} /></div>
            <div className="min-w-0"><h4 className="font-black text-[11px] text-gray-900 leading-none mb-1 uppercase tracking-tight">Bolu Adeoye</h4><p className="text-[8px] text-green-700 font-bold truncate uppercase tracking-tighter">Dept. of English & Literary Studies</p></div>
          </div>
          <div className="h-6 w-[1px] bg-gray-200 mx-4"></div>
          <div className="text-right shrink-0"><p className="text-[7px] font-black text-gray-400 uppercase tracking-widest mb-0.5">Partner</p><p className="text-[9px] font-black text-gray-900 leading-none uppercase">Abel Kings</p><p className="text-[7px] font-bold text-green-600 uppercase tracking-tighter">Tutorial Center</p></div>
        </div>
      </div>
    </main>
  );
}
