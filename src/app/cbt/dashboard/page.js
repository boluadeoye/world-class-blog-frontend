"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, Trophy, BookOpen, Play, Award, 
  ChevronDown, Info, Crown, Clock, ChevronRight, 
  AlertTriangle, Layers, Headset, History, CheckCircle, Building2, Settings, Lock, Sparkles,
  ChevronUp, MessageCircle, Megaphone, Bell, GraduationCap, FileText, Target, Database,
  LayoutDashboard, Book, BarChart3, Library, User, Settings2, Search, X
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

/* === 1. EXAM SETUP MODAL === */
function ExamSetupModal({ course, onClose, onStart }) {
  const [duration, setDuration] = useState(course?.duration || 15);
  const [qCount, setQCount] = useState(30);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#001800]/90 backdrop-blur-md p-4 animate-in zoom-in duration-300">
      <div className="bg-[#F7F6F2] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-[#E0DDD4]">
        <div className="bg-[#003600] p-6 text-white relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#D4BB7A]"></div>
          <h3 className={`text-[10px] uppercase tracking-[0.3em] opacity-70 ${dmSans.className}`}>Configuration</h3>
          <p className={`text-xl mt-1 ${cormorant.className}`}>{course?.code} • {course?.title}</p>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-[9px] font-bold text-[#7A7870] uppercase tracking-widest mb-3 flex items-center gap-2"><Clock size={10} /> Time</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map((t) => (
                <button key={t} onClick={() => setDuration(t)} className={`py-2 rounded-lg text-xs font-bold border ${duration === t ? 'border-[#004400] bg-[#edf5ed] text-[#004400]' : 'border-[#E0DDD4] text-[#ABA8A0] bg-white'}`}>{t}m</button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-[9px] font-bold text-[#7A7870] uppercase tracking-widest mb-3 flex items-center gap-2"><Target size={10} /> Questions</label>
            <div className="grid grid-cols-4 gap-2">
              {[20, 40, 60, 100].map((c) => (
                <button key={c} onClick={() => setQCount(c)} className={`py-2 rounded-lg text-xs font-bold border ${qCount === c ? 'border-[#004400] bg-[#edf5ed] text-[#004400]' : 'border-[#E0DDD4] text-[#ABA8A0] bg-white'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-3 border border-[#E0DDD4] rounded-lg text-[9px] font-bold text-[#7A7870] uppercase tracking-widest">Cancel</button>
            <button onClick={() => onStart(duration, qCount)} className="flex-[2] py-3 bg-[#004400] text-[#D4BB7A] rounded-lg text-[9px] font-bold uppercase tracking-widest shadow-lg flex items-center justify-center gap-2">Start Mission <Play size={10} fill="currentColor" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === 2. COURSE CARD (RESPONSIVE) === */
function CourseCard({ course, onLaunch, variant = "green" }) {
  const isGst = variant === "green";
  return (
    <div 
      onClick={() => onLaunch(course)}
      className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col p-5 overflow-hidden bg-white border-[#E0DDD4] hover:border-[#C8C4B8] hover:shadow-lg
        ${isGst ? 'col-span-12 md:col-span-6 lg:col-span-4' : 'col-span-12 md:col-span-6 lg:col-span-4'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[8px] font-bold uppercase tracking-[0.2em] text-[#ABA8A0] ${dmSans.className}`}>Departmental Unit</span>
        <Database size={14} className="text-[#004400] opacity-10" />
      </div>
      <div className="bg-[#edf5ed] w-9 h-9 rounded-lg flex items-center justify-center mb-3">
        <BookOpen size={18} className="text-[#004400]" />
      </div>
      <h3 className={`leading-tight mb-4 text-base ${cormorant.className} font-semibold text-[#171613]`}>
        {course?.code}<br/>{course?.title}
      </h3>
      <div className="mt-auto flex justify-between items-end">
        <div className="flex gap-3">
          <div className="flex flex-col">
            <span className={`text-base font-bold text-[#171613] ${cormorant.className}`}>{course?.total_questions || 0}</span>
            <span className="text-[7px] uppercase tracking-widest text-[#ABA8A0]">Items</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-base font-bold text-[#171613] ${cormorant.className}`}>∞</span>
            <span className="text-[7px] uppercase tracking-widest text-[#ABA8A0]">Retries</span>
          </div>
        </div>
        <button className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 text-[#004400]">Attempt <ChevronRight size={10} /></button>
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

  const stats = useMemo(() => {
    if (!examHistory?.length) return { sessions: 0, best: 0, avg: 0, streak: 0 };
    const scores = examHistory.map(h => (h.score / h.total) * 100);
    return {
      sessions: examHistory.length,
      best: Math.round(Math.max(...scores)),
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      streak: 21
    };
  }, [examHistory]);

  const triggerLogout = () => {
    setStatusModal({
      type: 'logout', title: 'Terminate Session?', message: 'Disconnect from the secure portal?', actionLabel: 'Exit',
      onAction: () => { sessionStorage.removeItem("cbt_student"); router.push("/cbt"); },
      onCancel: () => setStatusModal(null)
    });
  };

  if (!mounted || !student) return null;

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#002800] gap-6">
      <div className="w-12 h-12 border-2 border-[#D4BB7A]/20 border-t-[#D4BB7A] rounded-full animate-spin"></div>
      <p className={`text-[#D4BB7A] text-[10px] uppercase tracking-[0.4em] animate-pulse ${dmSans.className}`}>Initializing...</p>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#F7F6F2] flex flex-col text-[#3A3830] ${dmSans.className} ${dmSans.variable} ${cormorant.variable}`}>
      {/* SIDEBAR (Desktop Only) */}
      <aside className="w-64 bg-[#002800] border-r border-black/10 flex flex-col fixed h-full z-50 hidden lg:flex">
        <div className="p-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4BB7A] rounded flex items-center justify-center text-[#002800] font-bold">EF</div>
            <h2 className={`text-white text-lg ${cormorant.className}`}>ExamForge</h2>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white"><LayoutDashboard size={16} /><span className="text-xs font-medium">Dashboard</span></div>
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/50 hover:bg-white/5 cursor-pointer"><Book size={16} /><span className="text-xs font-medium">Examinations</span></div>
        </nav>
        <div className="p-6 bg-black/20 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#004400] border border-white/10 flex items-center justify-center text-white text-xs font-bold">{student.name.charAt(0)}</div>
            <div className="min-w-0"><p className="text-xs text-white font-medium truncate">{student.name}</p></div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col relative bg-[#F7F6F2]">
        <header className="h-16 border-b border-[#E0DDD4] bg-[#F7F6F2]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-2 text-[10px] text-[#ABA8A0] uppercase tracking-widest">
            <span>ExamForge</span> <span className="opacity-30">/</span> <span className="text-[#7A7870] font-bold">Dashboard</span>
          </div>
          <button onClick={triggerLogout} className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2">
            <LogOut size={12} /> Exit
          </button>
        </header>

        <div className="p-6 md:p-10 max-w-6xl w-full mx-auto space-y-10">
          {/* HERO */}
          <section className="bg-white border border-[#E0DDD4] rounded-2xl p-8 md:p-12 space-y-8 relative overflow-hidden shadow-sm">
            <div className="relative z-10">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#ABA8A0] font-bold">Good Day, {student.name.split(" ")[0]}</span>
              <h1 className={`text-4xl md:text-6xl mt-3 leading-tight text-[#171613] ${cormorant.className}`}>
                Forge your path.<br/><em className="text-[#004400] italic">Again. And again.</em>
              </h1>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E0DDD4] rounded-xl overflow-hidden">
              {[
                { label: 'Sessions', val: stats.sessions, delta: '↑ 12 this week' },
                { label: 'Best Score', val: `${stats.best}%`, delta: 'GST Module', color: 'text-[#004400]' },
                { label: 'Avg Score', val: `${stats.avg}%`, delta: '↑ +4 pts' },
                { label: 'Streak', val: stats.streak, delta: 'days active' }
              ].map((kpi, i) => (
                <div key={i} className="p-4 md:p-6 bg-white border-r border-b md:border-b-0 border-[#E0DDD4] last:border-0">
                  <span className="text-[8px] uppercase tracking-widest text-[#ABA8A0] font-bold">{kpi.label}</span>
                  <div className={`text-2xl md:text-4xl my-1 ${cormorant.className} font-semibold ${kpi.color || 'text-[#171613]'}`}>{kpi.val}</div>
                </div>
              ))}
            </div>

            <div className="bg-[#edf5ed] border border-[#d1e8d1] rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#004400] rounded-lg flex items-center justify-center text-[#D4BB7A] shadow-md"><Award size={20} /></div>
              <div>
                <p className="text-[11px] font-bold text-[#004400]">Unrestricted Sovereignty — Zero Cost, Infinite Access</p>
                <p className="text-[9px] text-[#004400]/60">All 48 departmental units unlocked · Practice exams regenerate endlessly</p>
              </div>
            </div>
          </section>

          {/* BENTO GRID */}
          <section>
            <h2 className={`text-2xl text-[#171613] mb-6 ${cormorant.className}`}>Unit Matrix <span className="text-xs text-[#ABA8A0] ml-2 font-sans uppercase tracking-widest">— 7 Areas</span></h2>
            <div className="grid grid-cols-12 gap-4">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant={c.code.toUpperCase().startsWith("GST") ? "green" : "blue"} />
              ))}
            </div>
          </section>

          {/* HISTORY */}
          <section className="bg-white border border-[#E0DDD4] rounded-2xl overflow-hidden shadow-sm">
            <div className="p-6 border-b border-[#E0DDD4] flex justify-between items-center">
              <h2 className={`text-xl text-[#171613] ${cormorant.className}`}>Examination Log</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#F7F6F2] text-[8px] uppercase tracking-[0.2em] text-[#ABA8A0] font-bold">
                    <th className="px-6 py-3">Timestamp</th>
                    <th className="px-6 py-3">Examination</th>
                    <th className="px-6 py-3">Score</th>
                    <th className="px-6 py-3">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E0DDD4]">
                  {examHistory.slice(0, 5).map((item) => {
                    const pct = Math.round((item.score / item.total) * 100);
                    return (
                      <tr key={item.id} className="hover:bg-[#F7F6F2]/50 transition-colors">
                        <td className="px-6 py-4 text-[10px] text-[#7A7870]">{new Date(item.created_at).toLocaleDateString('en-GB')}</td>
                        <td className="px-6 py-4 text-xs font-semibold text-[#171613]">{item.course_code}</td>
                        <td className="px-6 py-4 text-lg font-bold text-[#004400]">{pct}%</td>
                        <td className="px-6 py-4"><span className={`px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-widest border ${pct >= 70 ? 'bg-[#e8f5e8] text-[#1a6e1a] border-[#d1e8d1]' : 'bg-[#faeaea] text-[#8B2020] border-[#f5d1d1]'}`}>{pct >= 70 ? 'Excellent' : 'Retry'}</span></td>
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
