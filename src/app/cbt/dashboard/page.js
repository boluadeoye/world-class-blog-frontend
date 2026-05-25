"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Clock, Target, Play, Info, Crown, Award, Zap, Activity, ArrowUpRight, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import Sidebar from "@/components/cbt/Sidebar";
import TopBar from "@/components/cbt/TopBar";
import CourseCard from "@/components/cbt/CourseCard";
import StatusModal from "@/components/cbt/StatusModal";
import LiveTracker from "@/components/cbt/LiveTracker";

const EASE = [0.16, 1, 0.3, 1];
const WHATSAPP_URL = "https://wa.me/2348106293674";
const PORTRAIT_URL = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1779690109/blog_assets/qrun4i1qi7l35sg8siql.jpg";

function ExamSetupModal({ course, onClose, onStart }) {
  const [duration, setDuration] = useState(course?.duration || 15);
  const [qCount, setQCount] = useState(30);

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden border border-[#E0DDD4]">
        <div className="bg-[#003600] p-6 text-white relative">
          <h3 className="font-semibold text-xs uppercase tracking-[0.2em] flex items-center gap-2 text-[#D4BB7A]">
            Config
          </h3>
          <p className="text-white/80 text-[10px] font-mono uppercase mt-1.5 tracking-widest">{course?.code} • {course?.title}</p>
        </div>
        <div className="p-6 bg-[#F7F6F2]">
          <div className="mb-6">
            <label className="block text-[9px] font-mono uppercase tracking-[0.2em] mb-3"><Clock size={10} className="inline mr-1" /> Time Limit</label>
            <div className="grid grid-cols-4 gap-2">
              {[15, 30, 45, 60].map(t => (
                <button key={t} onClick={() => setDuration(t)} className={`py-3 rounded-lg text-[10px] font-mono border ${duration === t ? 'border-[#004d00] bg-[#edf5ed] text-[#003600] font-bold' : 'border-[#E0DDD4] text-[#7A7870] bg-white'}`}>{t}m</button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-[9px] font-mono uppercase tracking-[0.2em] mb-3"><Target size={10} className="inline mr-1" /> Question Load</label>
            <div className="grid grid-cols-4 gap-2">
              {[20, 40, 60, 100].map(c => (
                <button key={c} onClick={() => setQCount(c)} className={`py-3 rounded-lg text-[10px] font-mono border ${qCount === c ? 'border-[#004d00] bg-[#edf5ed] text-[#003600] font-bold' : 'border-[#E0DDD4] text-[#7A7870] bg-white'}`}>{c}q</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="flex-1 py-3 border border-[#E0DDD4] rounded-xl text-[9px] font-mono uppercase tracking-widest text-[#7A7870] hover:bg-[#F0EEE9]">Cancel</button>
            <button onClick={() => onStart(duration, qCount)} className="flex-[1.5] py-3 bg-[#004d00] text-white rounded-xl text-[10px] font-mono shadow-xl uppercase tracking-widest flex items-center justify-center gap-2">Start <Play size={12} fill="currentColor" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="bg-[#FFF8F0] rounded-[2rem] overflow-hidden mb-6 border border-orange-50/50">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-6 text-left">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 w-10 h-10 flex items-center justify-center rounded-full text-orange-600 shadow-inner"><Info size={18} /></div>
          <div><h3 className="font-semibold text-xs text-[#5A3A29] uppercase tracking-wide">Disclaimer</h3><p className="text-[9px] text-orange-400 font-bold mt-0.5">Read before starting</p></div>
        </div>
        <ChevronDown size={16} className={`text-orange-300 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="px-6 pb-8 text-[10px] text-[#8B5E3C] leading-relaxed border-t border-orange-100/50 pt-4">
          <ul className="space-y-2 font-medium">
            <li>• Simulation of psychological test environment.</li>
            <li>• Practice strict timing and resilience.</li>
          </ul>
        </div>
      )}
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
  const [greeting, setGreeting] = useState("GOOD DAY");
  const [setupCourse, setSetupCourse] = useState(null);
  const [historyExpanded, setHistoryExpanded] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [totalForumPosts, setTotalForumPosts] = useState(0);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

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

  // Pre-render isolation boundary
  if (!mounted || !student) return null;

  const visibleHistory = historyExpanded ? examHistory : examHistory.slice(0, 3);
  const getBentoClass = (idx) => ["unit-gst-main", "unit-finance", "unit-procurement", "unit-hr", "unit-ops", "unit-audit", "unit-tax"][idx] || "unit-ops";

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#003600] gap-4">
      <div className="w-12 h-12 border-4 border-[#D4BB7A]/20 border-t-[#D4BB7A] rounded-full animate-spin"></div>
      <p className="text-[#D4BB7A] font-mono text-xs uppercase tracking-[0.3em]">SYNCHRONIZING TERMINAL...</p>
    </div>
  );

  return (
    <div className="cbt-dashboard-root">
      <LiveTracker />
      
      {/* SCOPED BLUEPRINT STYLESHEET (No body/html leaks) */}
      <style dangerouslySetInnerHTML={{ __html: `
        :root {
          --canvas: #F7F6F2; --surface: #F0EEE9; --surface-raised: #FFFFFF;
          --border-ghost: rgba(180,175,165,0.35); --border-fine: #E0DDD4;
          --text-ink: #171613; --text-muted: #7A7870; --text-ghost: #ABA8A0;
          --green-900: #002800; --green-800: #003600; --green-700: #004400; --green-600: #004d00;
          --gold-500: #B8960C; --gold-300: #D4BB7A;
          --ease-viscous: cubic-bezier(0.16, 1, 0.3, 1); --ease-expo: cubic-bezier(0.19, 1, 0.22, 1);
          --dur-base: 360ms; --dur-slow: 560ms; --dur-cinematic: 800ms;
          --sidebar-w: 252px; --ambassador-w: 300px; --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px;
        }

        .cbt-dashboard-root {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--canvas);
          color: var(--text-body);
          min-height: 100vh;
          display: flex;
          width: 100%;
          position: relative;
          z-index: 1;
        }

        .cbt-dashboard-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(160,155,145,0.28) 1px, transparent 1px);
          background-size: 22px 22px;
          pointer-events: none;
          z-index: 0;
        }

        .sidebar { width: var(--sidebar-w); min-height: 100vh; background: var(--green-800); display: flex; flex-direction: column; position: fixed; left: 0; top: 0; bottom: 0; z-index: 100; border-right: 1px solid var(--green-900); background-image: repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.03) 3px, rgba(0,0,0,0.03) 4px), linear-gradient(180deg, var(--green-800) 0%, var(--green-900) 100%); }
        .sidebar-logo { padding: 28px 24px 24px; border-bottom: 1px solid rgba(255,255,255,0.08); }
        .logo-mark { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .logo-icon { width: 32px; height: 32px; background: var(--gold-500); border-radius: var(--radius-sm); display: grid; place-items: center; }
        .logo-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: #FFFFFF; letter-spacing: 0.02em; line-height: 1; }
        .logo-suite { font-size: 9px; font-weight: 400; color: rgba(255,255,255,0.42); letter-spacing: 0.16em; text-transform: uppercase; }
        .sidebar-nav { flex: 1; padding: 20px 0; overflow-y: auto; }
        .nav-label { font-size: 9px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,255,255,0.28); padding: 0 24px; margin: 16px 0 6px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 9px 24px; cursor: pointer; transition: background 120ms var(--ease-viscous); text-decoration: none; }
        .nav-item:hover { background: rgba(255,255,255,0.06); }
        .nav-item.active { background: rgba(255,255,255,0.10); }
        .nav-text { font-size: 13px; font-weight: 400; color: rgba(255,255,255,0.72); }
        .nav-badge { margin-left: auto; font-size: 10px; font-weight: 500; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.60); padding: 2px 7px; border-radius: 20px; }
        .forge-status { padding: 20px 24px; border-top: 1px solid rgba(255,255,255,0.08); background: rgba(0,0,0,0.15); }
        .forge-badge { display: inline-flex; align-items: center; gap: 6px; background: rgba(184,150,12,0.18); border: 1px solid rgba(184,150,12,0.30); border-radius: 3px; padding: 3px 8px; margin-bottom: 12px; }
        .forge-badge-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--gold-300); animation: pulse-gold 2.5s ease-in-out infinite; }
        .forge-badge-text { font-size: 9px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--gold-300); }
        .forge-stat { display: flex; align-items: baseline; gap: 4px; margin-bottom: 4px; }
        .forge-stat-num { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: #FFFFFF; line-height: 1; }
        .forge-stat-unit { font-size: 11px; color: rgba(255,255,255,0.38); }
        .sidebar-user { display: flex; align-items: center; gap: 10px; padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.08); }
        .user-avatar { width: 32px; height: 32px; border-radius: 50%; background: var(--green-600); border: 1.5px solid rgba(255,255,255,0.20); display: grid; place-items: center; font-family: 'Cormorant Garamond', serif; font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.90); }
        
        .main-shell { margin-left: var(--sidebar-w); flex: 1; display: flex; flex-direction: column; min-height: 100vh; position: relative; z-index: 1; width: calc(100% - var(--sidebar-w)); }
        .topbar { display: flex; align-items: center; justify-content: space-between; padding: 0 36px; height: 56px; border-bottom: 1px solid var(--border-ghost); background: rgba(247,246,242,0.88); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 50; }
        .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--text-ghost); }
        .breadcrumb-active { color: var(--text-muted); font-weight: 500; }
        .content { padding: 36px 36px 120px; display: flex; flex-direction: column; gap: 32px; }
        .hero-row { display: grid; grid-template-columns: 1fr var(--ambassador-w); gap: 20px; align-items: stretch; }
        .command-brief { background: var(--surface-raised); border: 1px solid var(--border-fine); border-radius: var(--radius-lg); padding: 32px 36px; display: flex; flex-direction: column; gap: 28px; }
        .brief-eyebrow { font-size: 10px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--text-ghost); }
        .brief-headline { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 500; color: var(--text-ink); line-height: 1.15; }
        .brief-headline em { font-style: italic; color: var(--green-600); }
        .brief-sub { font-size: 13px; color: var(--text-muted); line-height: 1.55; max-width: 420px; }
        .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--border-fine); border: 1px solid var(--border-fine); border-radius: var(--radius-md); overflow: hidden; }
        .kpi-cell { background: var(--surface-raised); padding: 16px 20px; display: flex; flex-direction: column; gap: 4px; }
        .kpi-label { font-size: 10px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; color: var(--text-ghost); }
        .kpi-value { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 600; color: var(--text-ink); line-height: 1; }
        .kpi-value.green { color: var(--green-600); }
        .kpi-delta { font-size: 10px; color: var(--text-ghost); }
        .sovereignty-strip { display: flex; align-items: center; gap: 10px; padding: 12px 16px; background: var(--green-50); border: 1px solid var(--border-fine); border-radius: var(--radius-md); }
        .sovereignty-icon { width: 32px; height: 32px; background: var(--green-600); border-radius: var(--radius-sm); display: grid; place-items: center; }
        .sovereignty-text { flex: 1; }
        .sovereignty-title { font-size: 12px; font-weight: 500; color: var(--green-700); }
        .sovereignty-sub { font-size: 11px; color: var(--green-500); opacity: 0.75; }
        .sovereignty-cta { font-family: 'Cormorant Garamond', serif; font-size: 14px; font-style: italic; color: var(--green-600); }
        .ambassador-panel { background: var(--green-900); border: 1px solid var(--green-800); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; position: relative; }
        .ambassador-tag { position: relative; z-index: 1; padding: 14px 18px 0; display: flex; align-items: center; justify-content: space-between; }
        .ambassador-label { font-size: 9px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: rgba(255,255,255,0.30); }
        .ambassador-live { display: flex; align-items: center; gap: 5px; font-size: 9px; letter-spacing: 0.10em; text-transform: uppercase; color: var(--gold-300); opacity: 0.70; }
        .ambassador-live-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold-300); animation: pulse-gold 3s ease-in-out infinite; }
        .ambassador-portrait-frame { position: relative; z-index: 1; margin: 12px 18px 0; border-radius: var(--radius-md); overflow: hidden; aspect-ratio: 3/4; border: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column; justify-content: flex-end; }
        .ambassador-insight { position: relative; z-index: 2; width: 100%; padding: 14px 16px; background: linear-gradient(0deg, rgba(0,28,0,0.96) 0%, rgba(0,28,0,0.80) 60%, rgba(0,28,0,0) 100%); }
        .insight-quote { font-family: 'Cormorant Garamond', serif; font-size: 13px; font-style: italic; color: rgba(255,255,255,0.80); line-height: 1.5; margin-bottom: 6px; }
        .insight-attr { font-size: 10px; color: rgba(255,255,255,0.30); }
        .cognitive-telemetry { position: relative; z-index: 1; padding: 14px 18px; border-top: 1px solid rgba(255,255,255,0.06); display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; }
        .telemetry-cell { display: flex; flex-direction: column; gap: 2px; padding-left: 10px; }
        .telemetry-cell:first-child { padding-left: 0; }
        .telemetry-val { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: #FFFFFF; line-height: 1; }
        .telemetry-key { font-size: 9px; letter-spacing: 0.10em; text-transform: uppercase; color: rgba(255,255,255,0.28); }
        .section-header { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 16px; }
        .section-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 500; color: var(--text-ink); }
        .section-subtitle { font-size: 12px; color: var(--text-ghost); margin-left: 10px; }
        .section-action { font-size: 12px; color: var(--green-600); cursor: pointer; border: none; background: none; font-family: 'DM Sans', sans-serif; }
        .unit-matrix { display: grid; grid-template-columns: repeat(12, 1fr); gap: 12px; }
        .unit-card { background: var(--surface-raised); border: 1px solid var(--border-fine); border-radius: var(--radius-lg); padding: 22px 24px; cursor: pointer; transition: border-color var(--dur-base) var(--ease-viscous), transform var(--dur-slow) var(--ease-expo); position: relative; overflow: hidden; display: flex; flex-direction: column; gap: 12px; }
        .unit-card::after { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(0,77,0,0.03) 0%, transparent 60%); pointer-events: none; opacity: 0; }
        .unit-card:hover { border-color: var(--border-mid); transform: translateY(-1px); }
        .unit-card:hover::after { opacity: 1; }
        .unit-gst-main { grid-column: span 4; grid-row: span 2; }
        .unit-finance { grid-column: span 4; }
        .unit-procurement { grid-column: span 4; }
        .unit-hr { grid-column: span 3; }
        .unit-ops { grid-column: span 3; }
        .unit-audit { grid-column: span 3; }
        .unit-tax { grid-column: span 3; }
        .unit-card.featured { background: var(--green-900); border-color: var(--green-800); }
        .unit-card.featured .unit-cat { color: rgba(255,255,255,0.30); }
        .unit-card.featured .unit-name { font-size: 24px; color: #FFFFFF; }
        .unit-card.featured .unit-desc { color: rgba(255,255,255,0.45); font-size: 12px; }
        .unit-card.featured .unit-stat-val { color: #FFFFFF; }
        .unit-card.featured .unit-stat-key { color: rgba(255,255,255,0.28); }
        .unit-card.featured .unit-attempt { color: var(--gold-300); }
        .unit-cat { font-size: 9px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: var(--text-ghost); }
        .unit-icon { width: 36px; height: 36px; border-radius: var(--radius-sm); background: var(--green-50); border: 1px solid var(--green-100); display: grid; place-items: center; color: var(--green-600); }
        .unit-icon-lg { width: 44px; height: 44px; border-radius: var(--radius-md); background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); display: grid; place-items: center; color: var(--gold-300); }
        .unit-name { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 500; color: var(--text-ink); line-height: 1.2; }
        .unit-desc { font-size: 11.5px; color: var(--text-muted); line-height: 1.55; }
        .unit-progress { display: flex; flex-direction: column; gap: 5px; }
        .progress-meta { display: flex; justify-content: space-between; }
        .progress-label { font-size: 10px; color: var(--text-ghost); }
        .progress-pct { font-size: 11px; font-weight: 500; color: var(--text-body); }
        .progress-track { height: 2px; background: var(--border-fine); overflow: hidden; }
        .progress-fill { height: 100%; background: var(--green-500); }
        .unit-card.featured .progress-fill { background: var(--gold-300); }
        .unit-stats { display: flex; gap: 16px; margin-top: auto; }
        .unit-stat { display: flex; flex-direction: column; gap: 2px; }
        .unit-stat-val { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: var(--text-ink); line-height: 1; }
        .unit-stat-key { font-size: 9px; letter-spacing: 0.10em; text-transform: uppercase; color: var(--text-ghost); }
        .unit-action-row { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 10px; border-top: 1px solid var(--border-ghost); }
        .unit-attempt { font-size: 11px; font-weight: 500; color: var(--green-600); border: none; background: none; font-family: 'DM Sans', sans-serif; cursor: pointer; }
        .difficulty { display: inline-flex; align-items: center; gap: 4px; font-size: 9px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; padding: 3px 8px; border-radius: 2px; }
        .difficulty.std { background: var(--surface); color: var(--text-ghost); border: 1px solid var(--border-fine); }
        .history-stream { background: var(--surface-raised); border: 1px solid var(--border-fine); border-radius: var(--radius-lg); overflow: hidden; }
        .history-head { display: grid; grid-template-columns: 120px 1fr 80px 80px 90px; padding: 10px 24px; border-bottom: 1px solid var(--border-fine); background: var(--surface); }
        .history-head-cell { font-size: 9px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-ghost); }
        .history-entry { display: grid; grid-template-columns: 120px 1fr 80px 80px 90px; padding: 14px 24px; border-bottom: 1px solid var(--border-ghost); align-items: center; transition: background 120ms var(--ease-viscous); }
        .history-entry:last-child { border-bottom: none; }
        .history-entry:hover { background: var(--surface); }
        .entry-date { font-size: 11px; color: var(--text-muted); }
        .entry-date-day { font-size: 10px; color: var(--text-ghost); margin-top: 1px; }
        .entry-exam-name { font-size: 13px; font-weight: 500; color: var(--text-ink); }
        .entry-exam-unit { font-size: 10px; color: var(--text-ghost); margin-top: 1px; }
        .entry-score { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: var(--text-ink); line-height: 1; }
        .entry-score.hi { color: var(--green-600); }
        .entry-score.lo { color: var(--fail); }
        .entry-score-denom { font-size: 10px; color: var(--text-ghost); }
        .entry-duration { font-size: 12px; color: var(--text-muted); }
        .entry-badge { display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 500; letter-spacing: 0.10em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px; min-width: 72px; }
        .badge-excellent { background: var(--excellent-bg); color: var(--excellent); border: 1px solid rgba(26,77,140,0.18); }
        .badge-pass { background: var(--pass-bg); color: var(--pass); border: 1px solid rgba(26,110,26,0.18); }
        .badge-fail { background: var(--fail-bg); color: var(--fail); border: 1px solid rgba(139,32,32,0.18); }
        @keyframes pulse-gold { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.55; transform: scale(0.85); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 900px) {
          .sidebar { transform: translateX(-100%); transition: transform 0.4s var(--ease-viscous); z-index: 200; width: 230px; }
          .sidebar.open { transform: translateX(0); }
          .main-shell { margin-left: 0; width: 100%; }
          .hero-row { grid-template-columns: 1fr; }
          .unit-matrix { grid-template-columns: 1fr; }
          .unit-card { grid-column: span 1 !important; }
          .history-head, .history-entry { grid-template-columns: 100px 1fr 80px 80px; }
          .history-head-cell:nth-child(5), .history-entry > *:nth-child(5) { display: none; }
        }
      ` }} />

      {/* Mobile Drawer Backdrop */}
      {isMobileNavOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] md:hidden"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Modular Sidebar with full optional chaining inside */}
      <Sidebar 
        student={student} 
        unreadCount={unreadCount} 
        handleForumEnter={handleForumEnter} 
        isOpen={isMobileNavOpen} 
        setIsOpen={setIsMobileNavOpen} 
      />

      <div className="main-shell animate-in fade-in duration-300">
        {/* Modular Topbar */}
        <TopBar 
          isOpen={isMobileNavOpen} 
          setIsOpen={setIsMobileNavOpen} 
          triggerLogout={triggerLogout} 
        />

        <main className="content">
          <DisclaimerCard />

          {/* Hero Row */}
          <div className="hero-row anim-1" style={{ animation: 'fadeSlideUp 560ms cubic-bezier(0.19, 1, 0.22, 1) 0.05s both' }}>
            <div className="command-brief">
              <div className="brief-greeting">
                <div className="brief-eyebrow">{greeting}, {student?.name ? student.name.split(" ")[0] : "Scholar"}</div>
                <h1 className="brief-headline">Forge your path.<br /><em>Again. And again.</em></h1>
                <p className="brief-sub">Your preparation records are logged. Access to the entire testing matrix has been liberated. There are no remaining blocks on your attempts.</p>
              </div>

              <div className="kpi-row">
                <div className="kpi-cell">
                  <span className="kpi-label">Attempts</span>
                  <span className="kpi-value">{examHistory?.length || 0}</span>
                  <span className="kpi-delta font-mono">Sessions Run</span>
                </div>
                <div className="kpi-cell">
                  <span className="kpi-label">Highest Score</span>
                  <span className="kpi-value green">
                    {examHistory?.length > 0 ? `${Math.max(...examHistory.map(h => {
                      const s = h?.score || 0;
                      const t = h?.total || 1;
                      return Math.round((s / t) * 100);
                    }))}%` : "0%"}
                  </span>
                  <span className="kpi-delta font-mono">Archived Record</span>
                </div>
                <div className="kpi-cell">
                  <span className="kpi-label">Status</span>
                  <span className="kpi-value">Elite</span>
                  <span className="text-emerald-700 text-[10px] font-mono uppercase font-black">Unlocked</span>
                </div>
                <div className="kpi-cell">
                  <span className="kpi-label">Streak</span>
                  <span className="kpi-value">21</span>
                  <span className="kpi-delta font-mono">Days Active</span>
                </div>
              </div>

              <div className="sovereignty-strip">
                <div className="sovereignty-icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1L10 6H15L11 9.5L12.5 14.5L8 11.5L3.5 14.5L5 9.5L1 6H6L8 1Z" fill="white" opacity="0.9" />
                  </svg>
                </div>
                <div className="sovereignty-text">
                  <div className="sovereignty-title">Unrestricted Sovereignty — Fully Liberated Access</div>
                  <div className="sovereignty-sub">All core courses and sub-modules unlocked indefinitely.</div>
                </div>
                <span className="sovereignty-cta">Infinite Retries active</span>
              </div>
            </div>

            {/* Dr. Nneka Adeyemi Ambassador Frame */}
            <div className="ambassador-panel">
              <div className="ambassador-tag">
                <span className="ambassador-label">Director of the Forge</span>
                <span className="ambassador-live"><span className="ambassador-live-dot"></span>Live Mentor</span>
              </div>

              <div className="ambassador-portrait-frame">
                <img 
                  src={PORTRAIT_URL} 
                  alt="Cognitive Director"
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }}
                />
                <div className="ambassador-insight">
                  <p className="insight-quote">"Mastery is not a destination — it is a discipline of return. Come back to the Forge, and the Forge will reward you."</p>
                  <span className="insight-attr">Dr. Nneka Adeyemi · Cognitive Ambassador</span>
                </div>
              </div>

              <div className="cognitive-telemetry">
                <div className="telemetry-cell">
                  <span className="telemetry-val gold">98</span>
                  <span className="telemetry-key">Focus Score</span>
                </div>
                <div className="telemetry-cell">
                  <span className="telemetry-val">21</span>
                  <span className="telemetry-key">Day Streak</span>
                </div>
                <div className="telemetry-cell">
                  <span className="telemetry-val">A+</span>
                  <span className="telemetry-key">Readiness</span>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Bento Matrix */}
          <div className="anim-2" style={{ animation: 'fadeSlideUp 560ms cubic-bezier(0.19, 1, 0.22, 1) 0.12s both' }}>
            <div className="section-header">
              <div>
                <span className="section-title">Unit Matrix</span>
                <span className="section-subtitle">— {courses?.length || 0} Tactical Portals Active</span>
              </div>
            </div>
            <div className="unit-matrix">
              {courses.map((course, idx) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onLaunch={setSetupCourse} 
                  bentoClass={getBentoClass(idx)}
                />
              ))}
            </div>
          </div>

          {/* History Log */}
          <div className="anim-3" style={{ animation: 'fadeSlideUp 560ms cubic-bezier(0.19, 1, 0.22, 1) 0.20s both' }}>
            <div className="section-header">
              <div>
                <span className="section-title">Examination Log</span>
                <span className="section-subtitle">— Audited session history</span>
              </div>
              {examHistory?.length > 3 && (
                <button onClick={() => setHistoryExpanded(!historyExpanded)} className="section-action">
                  {historyExpanded ? "Collapse History" : "View Full Log →"}
                </button>
              )}
            </div>

            <div className="history-stream">
              <div className="history-head">
                <div className="history-head-cell">Timestamp</div>
                <div className="history-head-cell">Examination</div>
                <div className="history-head-cell">Score</div>
                <div className="history-head-cell">Duration</div>
                <div className="history-head-cell">Result</div>
              </div>

              {visibleHistory.map((item) => {
                const s = item?.score || 0;
                const t = item?.total || 1;
                const pct = Math.round((s / t) * 100);
                const isExcel = pct >= 70;
                const isFail = pct < 40;
                return (
                  <div key={item.id} className="history-entry">
                    <div>
                      <div className="entry-date">{item?.created_at ? new Date(item.created_at).toLocaleDateString() : "Pending"}</div>
                      <div className="entry-date-day">WAT</div>
                    </div>
                    <div>
                      <div className="entry-exam-name">{item?.course_code || "CBT"} Session</div>
                      <div className="entry-exam-unit">CBT System Module</div>
                    </div>
                    <div>
                      <span className={`entry-score ${isExcel ? 'hi' : isFail ? 'lo' : ''}`}>{pct}</span>
                      <span className="entry-score-denom">/100</span>
                    </div>
                    <div className="entry-duration">Minutes</div>
                    <div>
                      <span className={`entry-badge ${isExcel ? 'badge-excellent' : isFail ? 'badge-fail' : 'badge-pass'}`}>
                        {isExcel ? "Excellent" : isFail ? "Retry" : "Pass"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>

      {/* Sovereign Credits Stamp (Quiet Luxury Colophon) */}
      <div className="fixed bottom-4 left-4 right-4 z-40 max-w-2xl mx-auto pointer-events-none md:left-[272px] md:right-12">
        <div className="bg-white/90 backdrop-blur-md border border-[#E0DDD4] shadow-xl rounded-2xl py-3.5 px-6 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-8 h-8 bg-[#003600] rounded-lg flex items-center justify-center text-white shrink-0">
              <Award size={16} className="text-[#D4BB7A]" />
            </div>
            <div className="min-w-0">
              <h4 className="font-sans font-semibold text-[10px] text-gray-900 leading-none mb-1 uppercase tracking-tight">Bolu Adeoye</h4>
              <p className="text-[8px] text-[#004d00] font-medium truncate uppercase tracking-tighter">Dept. of English & Literary Studies</p>
            </div>
          </div>
          <div className="h-6 w-[1px] bg-[#E0DDD4] mx-4"></div>
          <div className="text-right shrink-0">
            <p className="text-[7px] font-mono font-bold text-[#ABA8A0] uppercase tracking-widest mb-0.5">Partner</p>
            <p className="text-[9px] font-sans font-bold text-gray-900 leading-none uppercase">Abel Kings</p>
            <p className="text-[6px] font-medium text-[#004d00] uppercase tracking-tighter">Tutorial Center</p>
          </div>
        </div>
      </div>

      {statusModal && <StatusModal {...statusModal} />}
      {setupCourse && (
        <ExamSetupModal 
          course={setupCourse} 
          onClose={() => setSetupCourse(null)} 
          onStart={(dur, limit) => router.push(`/cbt/exam/${setupCourse.id}?duration=${dur}&limit=${limit || 30}`)} 
        />
      )}
    </div>
  );
}
