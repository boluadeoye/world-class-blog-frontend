"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, Trophy, BookOpen, Play, Award, 
  ChevronDown, Info, Crown, Clock, ChevronRight, 
  AlertTriangle, Layers, Headset, History, CheckCircle, Building2, Settings, Lock, Sparkles,
  ChevronUp, MessageCircle, Megaphone, Bell, GraduationCap, FileText, Target, Database,
  LayoutDashboard, Book, BarChart3, Library, User, Settings2, Search
} from "lucide-react";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import StatusModal from "../../../components/cbt/StatusModal";
import LiveTracker from "../../../components/cbt/LiveTracker";

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant'
});

const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '700'],
  variable: '--font-dm-sans'
});

/* === 1. EXAM SETUP MODAL (HERITAGE STYLE) === */
function ExamSetupModal({ course, onClose, onStart }) {
  const [duration, setDuration] = useState(course.duration || 15);
  const [qCount, setQCount] = useState(30);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#001800]/90 backdrop-blur-md p-4 animate-in zoom-in duration-300">
      <div className="bg-[#F7F6F2] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-[#E0DDD4]">
        <div className="bg-[#003600] p-8 text-white relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#D4BB7A]"></div>
          <h3 className={`text-xs uppercase tracking-[0.3em] flex items-center gap-2 opacity-70 ${dmSans.className}`}>
            Mission Configuration
          </h3>
          <p className={`text-2xl mt-2 ${cormorant.className}`}>{course.code} • {course.title}</p>
        </div>
        <div className="p-8 space-y-8">
          <div>
            <label className={`block text-[10px] font-bold text-[#7A7870] uppercase tracking-widest mb-4 flex items-center gap-2 ${dmSans.className}`}><Clock size={12} /> Time Allocation</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((time) => (
                <button key={time} onClick={() => setDuration(time)} className={`py-3 rounded-lg text-xs font-bold transition-all border ${duration === time ? 'border-[#004400] bg-[#edf5ed] text-[#004400]' : 'border-[#E0DDD4] text-[#ABA8A0] bg-white'} ${dmSans.className}`}>
                  {time}m
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className={`block text-[10px] font-bold text-[#7A7870] uppercase tracking-widest mb-4 flex items-center gap-2 ${dmSans.className}`}><Target size={12} /> Question Load</label>
            <div className="grid grid-cols-4 gap-2">
              {[20, 40, 60, 100].map((count) => (
                <button key={count} onClick={() => setQCount(count)} className={`py-3 rounded-lg text-xs font-bold transition-all border ${qCount === count ? 'border-[#004400] bg-[#edf5ed] text-[#004400]' : 'border-[#E0DDD4] text-[#ABA8A0] bg-white'} ${dmSans.className}`}>
                  {count}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={onClose} className={`flex-1 py-4 border border-[#E0DDD4] rounded-lg text-[10px] font-bold text-[#7A7870] uppercase tracking-widest hover:bg-white transition-all ${dmSans.className}`}>Abort</button>
            <button onClick={() => onStart(duration, qCount)} className={`flex-[2] py-4 bg-[#004400] text-[#D4BB7A] rounded-lg text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#002800] transition-all flex items-center justify-center gap-2 ${dmSans.className}`}>Initialize Forge <Play size={12} fill="currentColor" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === 2. COURSE CARD (BENTO STYLE) === */
function CourseCard({ course, onLaunch, isFeatured = false }) {
  const progress = 0; // Logic for progress can be added later if needed

  return (
    <div 
      onClick={() => onLaunch(course)}
      className={`group relative rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col p-6 overflow-hidden
        ${isFeatured 
          ? 'col-span-12 md:col-span-4 row-span-2 bg-[#002800] border-[#004400] text-white' 
          : 'col-span-12 md:col-span-4 bg-white border-[#E0DDD4] hover:border-[#C8C4B8] hover:shadow-xl hover:-translate-y-1'
        }`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[9px] font-bold uppercase tracking-[0.2em] ${isFeatured ? 'text-[#D4BB7A]/60' : 'text-[#ABA8A0]'} ${dmSans.className}`}>
          {isFeatured ? 'Core Competency' : 'Departmental Unit'}
        </span>
        {!isFeatured && <div className="text-[#004400] opacity-20"><Database size={16} /></div>}
      </div>

      <div className={`mb-4 ${isFeatured ? 'bg-white/10' : 'bg-[#edf5ed]'} w-10 h-10 rounded-lg flex items-center justify-center`}>
        <BookOpen size={20} className={isFeatured ? 'text-[#D4BB7A]' : 'text-[#004400]'} />
      </div>

      <h3 className={`leading-tight mb-4 ${isFeatured ? 'text-3xl' : 'text-lg'} ${cormorant.className} ${isFeatured ? 'font-medium' : 'font-semibold text-[#171613]'}`}>
        {course.code}<br/>{course.title}
      </h3>

      {isFeatured && (
        <p className={`text-sm text-white/50 leading-relaxed mb-8 ${dmSans.className}`}>
          Comprehensive assessment covering constitutional frameworks, ethics of service, and foundational civil service principles.
        </p>
      )}

      <div className="mt-auto space-y-4">
        <div className="flex justify-between items-end">
          <div className="flex gap-4">
            <div className="flex flex-col">
              <span className={`text-[18px] font-bold ${isFeatured ? 'text-white' : 'text-[#171613]'} ${cormorant.className}`}>{course.total_questions || 0}</span>
              <span className={`text-[8px] uppercase tracking-widest ${isFeatured ? 'text-white/40' : 'text-[#ABA8A0]'} ${dmSans.className}`}>Items</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-[18px] font-bold ${isFeatured ? 'text-white' : 'text-[#171613]'} ${cormorant.className}`}>∞</span>
              <span className={`text-[8px] uppercase tracking-widest ${isFeatured ? 'text-white/40' : 'text-[#ABA8A0]'} ${dmSans.className}`}>Retries</span>
            </div>
          </div>
          <button className={`text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${isFeatured ? 'text-[#D4BB7A]' : 'text-[#004400]'} ${dmSans.className}`}>
            {isFeatured ? 'Continue Practice' : 'Attempt'} <ChevronRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [examHistory, setExamHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [statusModal, setStatusModal] = useState(null);
  const [setupCourse, setSetupCourse] = useState(null);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const parsed = JSON.parse(stored);
    setStudent(parsed);

    async function fetchData() {
      try {
        const [courseRes, histRes] = await Promise.all([
          fetch(`/api/cbt/courses?studentId=${parsed.id}`),
          fetch(`/api/cbt/history?studentId=${parsed.id}`)
        ]);
        const courseData = await courseRes.json();
        setCourses(Array.isArray(courseData.courses) ? courseData.courses : []);
        const histData = await histRes.json();
        setExamHistory(Array.isArray(histData) ? histData : []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchData();
  }, [router]);

  // KPI ENGINE
  const stats = useMemo(() => {
    if (!examHistory.length) return { sessions: 0, best: 0, avg: 0, streak: 0 };
    const scores = examHistory.map(h => (h.score / h.total) * 100);
    return {
      sessions: examHistory.length,
      best: Math.round(Math.max(...scores)),
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      streak: 21 // Placeholder for streak logic
    };
  }, [examHistory]);

  if (!mounted || !student) return null;

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#002800] gap-6">
      <div className="w-16 h-16 border-2 border-[#D4BB7A]/20 border-t-[#D4BB7A] rounded-full animate-spin"></div>
      <p className={`text-[#D4BB7A] text-xs uppercase tracking-[0.5em] animate-pulse ${dmSans.className}`}>Initializing HQ...</p>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#F7F6F2] flex text-[#3A3830] selection:bg-[#D4BB7A]/30 ${dmSans.className}`}>
      <style jsx global>{`
        body { background-image: radial-gradient(circle, rgba(160,155,145,0.2) 1px, transparent 1px); background-size: 24px 24px; }
      `}</style>

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#002800] border-r border-black/10 flex flex-col fixed h-full z-50 hidden lg:flex">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4BB7A] rounded flex items-center justify-center text-[#002800] font-bold">EF</div>
            <div>
              <h2 className={`text-white text-lg leading-none ${cormorant.className}`}>ExamForge</h2>
              <span className="text-[8px] text-white/30 uppercase tracking-[0.2em]">Heritage Intelligence</span>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <div className="text-[9px] text-white/20 uppercase tracking-widest px-4 mb-4">Workspace</div>
          {[
            { icon: LayoutDashboard, label: 'Dashboard', active: true },
            { icon: Book, label: 'Examinations', badge: '48' },
            { icon: BarChart3, label: 'Performance' },
            { icon: Library, label: 'Study Library' }
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all ${item.active ? 'bg-white/10 text-white' : 'text-white/50 hover:bg-white/5'}`}>
              <item.icon size={16} />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && <span className="ml-auto text-[9px] bg-white/10 px-2 py-0.5 rounded-full">{item.badge}</span>}
            </div>
          ))}
        </nav>
        <div className="p-6 bg-black/20 border-t border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-[#D4BB7A] rounded-full animate-pulse"></div>
            <span className="text-[9px] text-[#D4BB7A] uppercase tracking-widest font-bold">Sovereign Access</span>
          </div>
          <div className={`text-3xl text-white mb-1 ${cormorant.className}`}>∞ <span className="text-xs opacity-30">Attempts</span></div>
          <p className="text-[10px] text-white/30 leading-relaxed mb-6">No limits. No paywalls.<br/>The Forge is yours.</p>
          <div className="flex items-center gap-3 pt-4 border-t border-white/5">
            <div className="w-8 h-8 rounded-full bg-[#004400] border border-white/10 flex items-center justify-center text-white text-xs font-bold">
              {student.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <p className="text-xs text-white font-medium truncate">{student.name}</p>
              <p className="text-[9px] text-white/30 uppercase tracking-tighter">IPPIS • {student.id.slice(0,6)}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col">
        <header className="h-16 border-b border-[#E0DDD4] bg-[#F7F6F2]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-2 text-[11px] text-[#ABA8A0] uppercase tracking-widest">
            <span>ExamForge</span> <span className="opacity-30">/</span> <span className="text-[#7A7870] font-bold">Dashboard</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-[#ABA8A0] font-medium hidden md:block">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <button className="bg-[#004400] text-white px-5 py-2 rounded text-[10px] font-bold uppercase tracking-widest shadow-lg hover:bg-[#002800] transition-all flex items-center gap-2">
              <Play size={10} fill="currentColor" /> Begin Exam
            </button>
          </div>
        </header>

        <div className="p-8 md:p-12 max-w-7xl mx-auto w-full space-y-12">
          {/* HERO */}
          <section className="bg-white border border-[#E0DDD4] rounded-2xl p-10 md:p-14 space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#edf5ed] rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#ABA8A0] font-bold">Good Day, {student.name.split(" ")[0]}</span>
              <h1 className={`text-5xl md:text-6xl mt-4 leading-[1.1] text-[#171613] ${cormorant.className}`}>
                Forge your path.<br/><em className="text-[#004400] italic">Again. And again.</em>
              </h1>
              <p className="text-[#7A7870] text-sm max-w-md mt-6 leading-relaxed">
                Your preparation record is exceptional. The Forge is fully open — every exam, every unit, unlimited times. This is your cognitive proving ground.
              </p>
            </div>

            {/* KPI ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E0DDD4] rounded-xl overflow-hidden relative z-10">
              {[
                { label: 'Sessions', val: stats.sessions, delta: '↑ 12 this week' },
                { label: 'Best Score', val: `${stats.best}%`, delta: 'GST Module', color: 'text-[#004400]' },
                { label: 'Avg Score', val: `${stats.avg}%`, delta: '↑ +4 pts' },
                { label: 'Streak', val: stats.streak, delta: 'days active' }
              ].map((kpi, i) => (
                <div key={i} className="p-6 bg-white border-r border-[#E0DDD4] last:border-0">
                  <span className="text-[9px] uppercase tracking-widest text-[#ABA8A0] font-bold">{kpi.label}</span>
                  <div className={`text-4xl my-1 ${cormorant.className} font-semibold ${kpi.color || 'text-[#171613]'}`}>{kpi.val}</div>
                  <span className="text-[9px] text-[#ABA8A0] font-medium">{kpi.delta}</span>
                </div>
              ))}
            </div>

            <div className="bg-[#edf5ed] border border-[#d1e8d1] rounded-xl p-4 flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-[#004400] rounded-lg flex items-center justify-center text-[#D4BB7A] shadow-lg"><Award size={20} /></div>
                <div>
                  <p className="text-xs font-bold text-[#004400]">Unrestricted Sovereignty — Zero Cost, Infinite Access</p>
                  <p className="text-[10px] text-[#004400]/60">All 48 departmental units unlocked · Practice exams regenerate endlessly</p>
                </div>
              </div>
              <span className={`text-sm italic text-[#004400] hidden md:block ${cormorant.className}`}>Attempt any exam →</span>
            </div>
          </section>

          {/* BENTO GRID */}
          <section>
            <div className="flex items-baseline justify-between mb-8">
              <h2 className={`text-3xl text-[#171613] ${cormorant.className}`}>Unit Matrix <span className="text-sm text-[#ABA8A0] ml-4 font-sans uppercase tracking-widest">— 7 Departmental Areas</span></h2>
              <button className="text-xs font-bold text-[#004400] uppercase tracking-widest hover:underline">View all units →</button>
            </div>
            <div className="grid grid-cols-12 gap-4">
              {courses.map((c, i) => (
                <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} isFeatured={c.code.startsWith("GST")} />
              ))}
            </div>
          </section>

          {/* HISTORY */}
          <section className="bg-white border border-[#E0DDD4] rounded-2xl overflow-hidden">
            <div className="p-8 border-b border-[#E0DDD4] flex justify-between items-center">
              <h2 className={`text-2xl text-[#171613] ${cormorant.className}`}>Examination Log <span className="text-xs text-[#ABA8A0] ml-4 font-sans uppercase tracking-widest">— Audited session history</span></h2>
              <button className="text-[10px] font-bold text-[#004400] uppercase tracking-widest">Full History →</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F7F6F2] text-[9px] uppercase tracking-[0.2em] text-[#ABA8A0] font-bold">
                    <th className="px-8 py-4">Timestamp</th>
                    <th className="px-8 py-4">Examination</th>
                    <th className="px-8 py-4">Score</th>
                    <th className="px-8 py-4">Duration</th>
                    <th className="px-8 py-4">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0DDD4]">
                  {examHistory.slice(0, 6).map((item) => {
                    const pct = Math.round((item.score / item.total) * 100);
                    return (
                      <tr key={item.id} className="hover:bg-[#F7F6F2]/50 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="text-xs font-medium text-[#3A3830]">{new Date(item.created_at).toLocaleDateString('en-GB')}</div>
                          <div className="text-[10px] text-[#ABA8A0] mt-1 uppercase">{new Date(item.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} WAT</div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="text-sm font-semibold text-[#171613]">{item.course_code}</div>
                          <div className="text-[10px] text-[#ABA8A0] mt-1 uppercase tracking-wider">Module 01</div>
                        </td>
                        <td className="px-8 py-6">
                          <span className={`text-2xl ${cormorant.className} font-bold ${pct >= 70 ? 'text-[#004400]' : 'text-[#171613]'}`}>{pct}</span>
                          <span className="text-[10px] text-[#ABA8A0] ml-1">/100</span>
                        </td>
                        <td className="px-8 py-6 text-xs text-[#7A7870] font-medium">38 min</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-sm text-[9px] font-bold uppercase tracking-widest border ${pct >= 70 ? 'bg-[#e8f5e8] text-[#1a6e1a] border-[#d1e8d1]' : 'bg-[#faeaea] text-[#8B2020] border-[#f5d1d1]'}`}>
                            {pct >= 70 ? 'Excellent' : 'Retry'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {setupCourse && <ExamSetupModal course={setupCourse} onClose={() => setSetupCourse(null)} onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} />}
      {statusModal && <StatusModal {...statusModal} />}
    </div>
  );
}
