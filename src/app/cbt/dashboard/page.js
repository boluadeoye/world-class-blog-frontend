"use client";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  Clock, Target, Play, Award, Database, BookOpen, ChevronRight,
  LayoutDashboard, MessageSquare, MessageCircle, Star, X, Menu, LogOut, CheckCircle, Trophy
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
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-dm-sans'
});

/* === 1. EXAM SETUP MODAL === */
function ExamSetupModal({ course, onClose, onStart }) {
  const [duration, setDuration] = useState(course?.duration || 15);
  const [qCount, setQCount] = useState(30);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-[#001800]/95 backdrop-blur-md p-4 animate-in zoom-in duration-300">
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

/* === 2. REAL REVIEW MODAL === */
function ReviewModal({ studentId, onClose }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || !comment.trim()) return;
    setSubmitting(true);
    try {
      await fetch('/api/cbt/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId, rating, comment })
      });
      setSuccess(true);
      setTimeout(() => { onClose(); }, 2000);
    } catch (e) {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[400] flex items-center justify-center bg-[#001800]/95 backdrop-blur-md p-4 animate-in zoom-in duration-300">
      <div className="bg-[#F7F6F2] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden border border-[#E0DDD4] p-8 space-y-6">
        {success ? (
          <div className="text-center py-8 space-y-4 animate-in fade-in">
            <div className="w-16 h-16 bg-[#edf5ed] rounded-full flex items-center justify-center mx-auto border border-[#d1e8d1]">
              <CheckCircle className="text-[#004d00]" size={32} />
            </div>
            <p className="text-sm font-bold text-[#171613]">Review Submitted.</p>
            <p className="text-xs text-[#7A7870]">Thank you for your feedback.</p>
          </div>
        ) : (
          <>
            <h3 className={`text-2xl font-bold text-[#171613] ${dmSans.className}`}>Submit Review</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star 
                    size={32} 
                    className={`${(hover || rating) >= star ? 'text-[#D4BB7A] fill-[#D4BB7A]' : 'text-[#E0DDD4]'}`} 
                  />
                </button>
              ))}
            </div>
            <textarea 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about your experience..."
              className="w-full bg-white border border-[#E0DDD4] rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#004d00] h-32 resize-none text-[#171613]"
            />
            <div className="flex gap-3">
              <button onClick={onClose} className="flex-1 py-3 border border-[#E0DDD4] rounded-xl text-xs font-bold text-[#7A7870] hover:bg-white">Cancel</button>
              <button onClick={handleSubmit} disabled={submitting || rating === 0 || !comment.trim()} className="flex-[2] py-3 bg-[#004400] text-[#D4BB7A] rounded-xl text-xs font-bold hover:bg-[#002800] disabled:opacity-50 shadow-lg">
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* === 3. COURSE CARD === */
function CourseCard({ course, onLaunch, variant = "green" }) {
  const isGst = variant === "green";
  return (
    <div 
      onClick={() => onLaunch(course)}
      className="group relative rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col p-6 overflow-hidden bg-white border-[#E0DDD4] hover:border-[#C8C4B8] hover:shadow-lg col-span-12 md:col-span-6 lg:col-span-4"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#004d00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[8px] font-bold uppercase tracking-[0.2em] text-[#ABA8A0] ${dmSans.className}`}>Departmental Unit</span>
        <Database size={14} className="text-[#004400] opacity-10" />
      </div>
      <div className="bg-[#edf5ed] w-10 h-10 rounded-lg flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300">
        <BookOpen size={20} className="text-[#004400]" />
      </div>
      <h3 className={`leading-snug mb-6 text-lg ${cormorant.className} font-semibold text-[#171613]`}>
        {course?.code}<br/>{course?.title}
      </h3>
      <div className="mt-auto flex justify-between items-end relative z-10">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span className={`text-lg font-bold text-[#171613] ${cormorant.className}`}>{course?.total_questions || 0}</span>
            <span className="text-[8px] uppercase tracking-widest text-[#ABA8A0]">Items</span>
          </div>
          <div className="flex flex-col">
            <span className={`text-lg font-bold text-[#171613] ${cormorant.className}`}>∞</span>
            <span className="text-[8px] uppercase tracking-widest text-[#ABA8A0]">Retries</span>
          </div>
        </div>
        <button className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1 text-[#004400] transition-colors group-hover:text-[#002800]">Attempt <ChevronRight size={10} className="transition-transform group-hover:translate-x-1" /></button>
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
  const [mounted, setMounted] = useState(false);
  const [statusModal, setStatusModal] = useState(null);
  const [setupCourse, setSetupCourse] = useState(null);
  const [showReview, setShowReview] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const parsed = JSON.parse(stored);
    setStudent(parsed);

    async function fetchData() {
      try {
        const [courseRes, histRes, lbRes] = await Promise.all([
          fetch(`/api/cbt/courses?studentId=${parsed.id}`),
          fetch(`/api/cbt/history?studentId=${parsed.id}`),
          fetch('/api/cbt/leaderboard')
        ]);
        const courseData = await courseRes.json();
        setCourses(Array.isArray(courseData.courses) ? courseData.courses : []);
        const histData = await histRes.json();
        setExamHistory(Array.isArray(histData) ? histData : []);
        const lbData = await lbRes.json();
        setLeaders(Array.isArray(lbData) ? lbData : []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchData();
  }, [router]);

  const stats = useMemo(() => {
    if (!examHistory?.length) return { sessions: 0, best: 0, avg: 0, streak: 0 };
    const scores = examHistory.map(h => (h.score / h.total) * 100);
    return {
      sessions: examHistory.length,
      best: scores.length > 0 ? Math.round(Math.max(...scores)) : 0,
      avg: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
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

  const seed = student?.name?.replace(/\s/g, '') || 'Bolu';
  const avatarUrl = `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9`;
  const qualifiedLeaders = leaders.filter(user => user.score >= 60);

  if (!mounted || !student) return null;

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#002800] gap-6">
      <div className="w-12 h-12 border-2 border-[#D4BB7A]/20 border-t-[#D4BB7A] rounded-full animate-spin"></div>
      <p className={`text-[#D4BB7A] text-[10px] uppercase tracking-[0.4em] animate-pulse ${dmSans.className}`}>Initializing...</p>
    </div>
  );

  return (
    <div className={`min-h-screen bg-[#F7F6F2] flex flex-col lg:flex-row text-[#3A3830] ${dmSans.className} ${dmSans.variable} ${cormorant.variable}`}>
      <style jsx global>{`
        body { background-image: radial-gradient(circle, rgba(160,155,145,0.15) 1px, transparent 1px); background-size: 24px 24px; }
      `}</style>

      {/* SIDEBAR */}
      <aside className={`w-64 bg-[#002800] border-r border-black/10 flex flex-col fixed h-full z-50 transition-transform duration-300 lg:translate-x-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:flex'}`}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#D4BB7A] rounded flex items-center justify-center text-[#002800] font-bold">EF</div>
            <h2 className={`text-white text-lg ${cormorant.className}`}>ExamForge</h2>
          </div>
          <button onClick={() => setMobileMenuOpen(false)} className="lg:hidden text-white/50 hover:text-white"><X size={18} /></button>
        </div>
        <nav className="flex-1 p-6 space-y-6">
          <div className="space-y-1">
            <div className="text-[9px] text-white/20 uppercase tracking-widest px-4 mb-2">Portal</div>
            <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 text-white"><LayoutDashboard size={14} /><span className="text-xs font-semibold">Dashboard</span></div>
            <Link href="/cbt/community" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/50 hover:bg-white/5 cursor-pointer transition-all"><MessageSquare size={14} /><span className="text-xs font-medium">Community Forum</span></Link>
          </div>
          <div className="space-y-1">
            <div className="text-[9px] text-white/20 uppercase tracking-widest px-4 mb-2">Support</div>
            <a href="https://wa.me/2348106293674" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/50 hover:bg-white/5 cursor-pointer transition-all"><MessageCircle size={14} /><span className="text-xs font-medium">Secure Line (WhatsApp)</span></a>
            <button onClick={() => { setShowReview(true); setMobileMenuOpen(false); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/50 hover:bg-white/5 cursor-pointer transition-all text-left"><Star size={14} /><span className="text-xs font-medium">Submit Review</span></button>
          </div>
        </nav>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col bg-[#F7F6F2]">
        <header className="h-16 border-b border-[#E0DDD4] bg-[#F7F6F2]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            {/* HAMBURGER MENU */}
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-[#004400] hover:bg-[#edf5ed] rounded-lg"><Menu size={20} /></button>
            <div className="flex items-center gap-2 text-[10px] text-[#ABA8A0] uppercase tracking-widest">
              <span>ExamForge</span> <span className="opacity-30">/</span> <span className="text-[#7A7870] font-bold">Dashboard</span>
            </div>
          </div>
          <button onClick={triggerLogout} className="bg-red-50 text-red-700 px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest border border-red-100 hover:bg-red-100 transition-all flex items-center gap-2">
            <LogOut size={12} /> Exit
          </button>
        </header>

        <div className="p-6 md:p-10 max-w-5xl w-full mx-auto space-y-12">
          
          {/* 1. HERO SECTION */}
          <section className="bg-white border border-[#E0DDD4] rounded-2xl p-8 md:p-12 space-y-8 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#edf5ed] rounded-full -mr-32 -mt-32 blur-3xl opacity-50"></div>
            
            <div className="relative z-10 flex justify-between items-start gap-4">
              <div className="w-full">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#ABA8A0] font-bold">Good Day, {student.name.split(" ")[0]}</span>
                {/* DM SANS BLACK HEADLINE */}
                <h1 className="text-4xl md:text-5xl mt-3 font-black tracking-tight leading-none text-[#171613]">
                  Forge your path.<br/><span className="text-[#004d00]">Again. And again.</span>
                </h1>
                {/* FULL WIDTH SUBTEXT */}
                <p className="text-[#7A7870] text-xs leading-relaxed mt-4 w-full">
                  The Forge is open. Every unit, every assessment, available without restriction. This is your cognitive proving ground.
                </p>
              </div>
              
              {/* AVATAR */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 rounded-full bg-[#D4BB7A]/20 animate-ping" style={{ animationDuration: '4s' }}></div>
                <div className="absolute inset-0 rounded-full border border-[#D4BB7A] scale-110"></div>
                <div className="w-16 h-16 rounded-full bg-[#004400] border-2 border-[#D4BB7A] overflow-hidden shadow-lg flex items-center justify-center relative z-10">
                  <img src={avatarUrl} alt="Bolu" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full z-20"></div>
              </div>
            </div>

            {/* KPI ROW */}
            <div className="grid grid-cols-2 md:grid-cols-4 border border-[#E0DDD4] rounded-xl overflow-hidden relative z-10">
              {[
                { label: 'Sessions', val: stats.sessions, delta: '↑ 12 this week' },
                { label: 'Best Score', val: `${stats.best}%`, delta: 'GST Module', color: 'text-[#004400]' },
                { label: 'Avg Score', val: `${stats.avg}%`, delta: '↑ +4 pts' },
                { label: 'Streak', val: stats.streak, delta: 'days active' }
              ].map((kpi, i) => (
                <div key={i} className="p-4 md:p-6 bg-white border-r border-b md:border-b-0 border-[#E0DDD4] last:border-0 last:border-b-0">
                  <span className="text-[8px] uppercase tracking-widest text-[#ABA8A0] font-bold">{kpi.label}</span>
                  <div className={`text-2xl md:text-3xl my-1 ${cormorant.className} font-semibold ${kpi.color || 'text-[#171613]'}`}>{kpi.val}</div>
                </div>
              ))}
            </div>
          </section>

          {/* 2. UNIT MATRIX */}
          <section>
            <h2 className={`text-2xl text-[#171613] mb-6 ${cormorant.className}`}>Unit Matrix <span className="text-xs text-[#ABA8A0] ml-2 font-sans uppercase tracking-widest">— Departmental Areas</span></h2>
            <div className="grid grid-cols-12 gap-4">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} onLaunch={setSetupCourse} variant={c?.code?.toUpperCase().startsWith("GST") ? "green" : "blue"} />
              ))}
            </div>
          </section>

          {/* 3. EXAMINATION LOG */}
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

          {/* 4. TOP SCORERS (LEADERBOARD) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-2xl text-[#171613] ${cormorant.className}`}>Top Scorers <span className="text-xs text-[#ABA8A0] ml-2 font-sans uppercase tracking-widest">— Hall of Fame</span></h2>
            </div>
            {qualifiedLeaders.length > 0 ? (
              <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                {qualifiedLeaders.map((user, i) => {
                  const isFirst = i === 0;
                  return (
                    <div key={i} className={`min-w-[160px] bg-white rounded-2xl p-5 border ${isFirst ? 'border-[#D4BB7A]' : 'border-[#E0DDD4]'} shadow-sm flex flex-col items-center text-center relative snap-center`}>
                      {isFirst && <div className="absolute -top-3 bg-[#D4BB7A] text-[#002800] px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-sm">1st Place</div>}
                      <div className="w-14 h-14 rounded-full bg-[#edf5ed] border border-[#d1e8d1] overflow-hidden mb-3">
                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                      <h3 className="font-black text-xs text-[#171613] truncate w-full mb-1 uppercase tracking-tight">{user.name.split(" ")[0]}</h3>
                      <p className="text-[8px] text-[#7A7870] font-bold uppercase tracking-wide truncate w-full mb-3">{user.department || "Student"}</p>
                      <div className={`w-full py-1.5 rounded-lg text-[10px] font-bold ${isFirst ? 'bg-[#004400] text-[#D4BB7A]' : 'bg-[#F7F6F2] text-[#7A7870]'}`}>{user.score}%</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-[#E0DDD4]">
                <Trophy size={24} className="text-[#E0DDD4] mx-auto mb-3" />
                <p className="text-[#ABA8A0] text-[10px] font-bold uppercase tracking-[0.2em]">Awaiting Top Scorers</p>
              </div>
            )}
          </section>

          {/* 5. LUXURY CREDIT CAPSULE */}
          <footer className="pt-8 pb-12 flex justify-center w-full">
            <div className="bg-[#FAF9F6] border border-[#D4BB7A]/40 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-2xl md:rounded-full p-5 flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl w-full relative overflow-hidden">
              {/* Left Section */}
              <div className="flex items-center gap-4 flex-1">
                <div className="w-12 h-12 bg-[#003600] rounded-xl flex items-center justify-center text-[#D4BB7A] shrink-0 shadow-inner">
                  <Award size={20} strokeWidth={1.5} />
                </div>
                <div className="text-left">
                  <h4 className="font-black text-[#171613] text-sm uppercase tracking-[0.2em]">Bolu Adeoye</h4>
                  <p className="text-[9px] text-[#004d00] font-bold uppercase tracking-widest mt-1">Dept. of English & Literary Studies</p>
                </div>
              </div>
              
              {/* Vertical Hairline Divider */}
              <div className="hidden md:block h-10 w-[1px] bg-[#E0DDD4]"></div>
              
              {/* Right Section */}
              <div className="text-center md:text-right shrink-0">
                <p className="text-[8px] font-bold text-[#ABA8A0] uppercase tracking-[0.2em] mb-1">Partner</p>
                <p className="text-sm font-black text-[#171613] uppercase tracking-[0.15em]">Abel Kings</p>
                <p className={`text-[10px] text-[#004d00] font-medium italic tracking-widest mt-0.5 ${cormorant.className}`}>Tutorial Center</p>
              </div>
            </div>
          </footer>

        </div>
      </main>

      {setupCourse && <ExamSetupModal course={setupCourse} onClose={() => setSetupCourse(null)} onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} />}
      {showReview && <ReviewModal studentId={student.id} onClose={() => setShowReview(false)} />}
      {statusModal && <StatusModal {...statusModal} />}
    </div>
  );
}
