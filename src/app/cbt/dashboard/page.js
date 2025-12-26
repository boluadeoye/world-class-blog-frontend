"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// SAFE ICONS
import { 
  LogOut, User, Trophy, BookOpen, Play, Award, 
  Home, BarChart2, ChevronDown, Info, Crown, 
  Clock, ChevronRight, AlertTriangle 
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const UpgradeModal = dynamic(() => import("../../../components/cbt/UpgradeModal"), { ssr: false });

/* === LOGOUT MODAL === */
function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden border-t-4 border-red-600">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut size={32} className="text-red-600" />
          </div>
          <h3 className="font-black text-lg uppercase text-gray-900 mb-2">Disconnect?</h3>
          <p className="text-gray-500 text-xs font-medium mb-6">You are about to terminate your session.</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 border-2 border-gray-100 rounded-xl text-xs font-black text-gray-400 hover:bg-gray-50">STAY</button>
            <button onClick={onConfirm} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-black shadow-lg hover:bg-red-700">LOGOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* === DISCLAIMER ACCORDION === */
function DisclaimerCard() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-orange-50 border border-orange-100 rounded-2xl overflow-hidden mb-8 transition-all shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-5 text-left">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 p-2.5 rounded-xl text-orange-600 shadow-inner"><Info size={20} /></div>
          <div>
            <h3 className="font-black text-xs text-orange-900 uppercase tracking-widest">Important Disclaimer</h3>
            <p className="text-[10px] text-orange-700 font-bold">CRITICAL INFORMATION INSIDE</p>
          </div>
        </div>
        <ChevronDown size={18} className={`text-orange-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="px-6 pb-6 text-xs text-orange-800 leading-relaxed border-t border-orange-100 pt-4 animate-in fade-in slide-in-from-top-2">
          <p className="mb-3 font-black uppercase tracking-tighter text-orange-900">Psychological Preparation Protocol:</p>
          <p className="mb-4 opacity-90 font-medium">
            Students must be aware that the purpose of these mock examinations is <strong>NOT</strong> to expose likely questions, but to prepare you psychologically for the real examinations. 
          </p>
          <p className="opacity-90 font-medium">
            The aim is to <strong>simulate the environment and setting</strong> for you to get prepared, and most importantly, for <strong>time management</strong>. It is crucial for your success.
          </p>
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
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // === FALLBACK DATA (ACTIVATES IF DB IS EMPTY) ===
  const MOCK_COURSES = [
    { id: 'mock-1', code: 'GST 101', title: 'Use of English I', duration: 25, level: 100 },
    { id: 'mock-2', code: 'GST 102', title: 'Philosophy & Logic', duration: 30, level: 100 },
    { id: 'mock-3', code: 'ENT 101', title: 'Intro to Entrepreneurship', duration: 20, level: 100 },
    { id: 'mock-4', code: 'GST 103', title: 'Nigerian Peoples & Culture', duration: 15, level: 100 },
  ];

  const MOCK_LEADERS = [
    { id: 1, name: "Divine O.", score: 98, course: "GST 101", avatar: "D", code: "GST 101" },
    { id: 2, name: "Samuel A.", score: 96, course: "GST 102", avatar: "S", code: "GST 102" },
    { id: 3, name: "Boluwatife", score: 95, course: "ENT 101", avatar: "B", code: "ENT 101" },
  ];

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const parsed = JSON.parse(stored);
    setStudent(parsed);

    async function fetchData() {
      try {
        // 1. Fetch Courses
        const courseRes = await fetch(`/api/cbt/courses?studentId=${parsed.id}`);
        const courseData = await courseRes.json();
        
        // FALLBACK LOGIC: If API returns empty, use MOCK data
        if (courseData.courses && courseData.courses.length > 0) {
          setCourses(courseData.courses);
        } else {
          console.warn("API returned 0 courses. Using Fallback Data.");
          setCourses(MOCK_COURSES);
        }

        // 2. Fetch Leaderboard
        const lbRes = await fetch('/api/cbt/leaderboard');
        const lbData = await lbRes.json();
        setLeaders(Array.isArray(lbData) && lbData.length > 0 ? lbData : MOCK_LEADERS); 

      } catch (e) {
        console.error("Load Error", e);
        // On error, also use fallback so UI doesn't break
        setCourses(MOCK_COURSES);
        setLeaders(MOCK_LEADERS);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_student");
    router.push("/cbt");
  };

  if (!mounted || !student) return null;
  const isPremium = student.subscription_status === 'premium';

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white gap-4">
      <div className="w-12 h-12 border-4 border-green-100 border-t-green-700 rounded-full animate-spin"></div>
      <p className="text-green-900 font-black text-xs uppercase tracking-[0.3em]">Synchronizing HQ...</p>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfdfc] font-sans text-gray-900 pb-40 relative">
      <LogoutModal isOpen={showLogout} onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />
      
      {showUpgrade && (
        <UpgradeModal
          student={student}
          onClose={() => setShowUpgrade(false)}
          onSuccess={() => { setShowUpgrade(false); window.location.reload(); }}
        />
      )}
      
      {/* === HEADER === */}
      <header className="bg-white border-b border-gray-100 px-6 py-5 flex justify-between items-center sticky top-0 z-50 shadow-sm backdrop-blur-md bg-white/90">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner border-2 ${isPremium ? 'bg-yellow-50 text-yellow-600 border-yellow-200' : 'bg-green-50 text-green-800 border-green-100'}`}>
            {isPremium ? <Crown size={24} /> : student.name.charAt(0).toUpperCase()}
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-black text-gray-900 flex items-center gap-2 uppercase tracking-tight">
              {student.name.split(" ")[0]}
              {isPremium && <span className="text-[8px] bg-yellow-400 text-black px-2 py-0.5 rounded-full font-black">PRO</span>}
            </h1>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{student.email}</p>
          </div>
        </div>
        <button onClick={() => setShowLogout(true)} className="p-3 rounded-2xl bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all border border-red-100 shadow-sm">
          <LogOut size={20} />
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        
        {/* === DISCLAIMER === */}
        <DisclaimerCard />

        {/* === AVAILABLE COURSES (PRIMARY FOCUS) === */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em] flex items-center gap-3">
              <BookOpen size={18} className="text-green-700" /> Available Exams
            </h2>
            <span className="text-[10px] font-black text-green-600 bg-green-50 px-3 py-1 rounded-full border border-green-100 uppercase">FUOYE 2026</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 p-6 hover:border-green-500 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-150 duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-green-900 text-white text-[10px] font-black px-3 py-1 rounded-lg shadow-lg uppercase tracking-widest">{course.code}</span>
                    <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{course.level}L</span>
                  </div>
                  <h3 className="font-black text-gray-900 text-lg mb-2 leading-tight group-hover:text-green-800 transition-colors">{course.title}</h3>
                  <div className="flex items-center gap-4 text-[10px] text-gray-400 font-bold uppercase mb-8">
                    <span className="flex items-center gap-1"><Clock size={12} className="text-green-600"/> {course.duration || 15} MINS</span>
                    <span className="flex items-center gap-1"><Award size={12} className="text-green-600"/> 2.0 MARKS</span>
                  </div>
                  <Link href={`/cbt/exam/${course.id}`} className="flex items-center justify-center gap-2 w-full bg-gray-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-green-800 transition-all shadow-xl active:scale-95">
                    Launch Exam <Play size={14} fill="currentColor" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* === LEADERBOARD (SECONDARY) === */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Trophy size={18} className="text-yellow-500" />
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-[0.2em]">Top Performers</h2>
          </div>
          <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-2 overflow-x-auto flex gap-4 custom-scrollbar pb-4">
            {leaders.map((user, i) => (
              <div key={i} className="min-w-[160px] bg-gray-50 rounded-2xl p-5 border border-gray-100 flex flex-col items-center text-center relative transition-transform hover:-translate-y-1">
                {i === 0 && <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1.5 rounded-full shadow-lg border-2 border-white"><Crown size={14} fill="currentColor" /></div>}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg mb-3 shadow-inner ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-white text-gray-400 border border-gray-100'}`}>
                  {user.name ? user.name.charAt(0) : "U"}
                </div>
                <h3 className="font-black text-xs text-gray-900 truncate w-full mb-1 uppercase tracking-tighter">{user.name}</h3>
                <p className="text-[9px] text-gray-400 font-black mb-3 uppercase tracking-widest">{user.code || user.course}</p>
                <div className="bg-green-900 text-white px-4 py-1 rounded-full text-[10px] font-black shadow-md">{user.score}%</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* === FLOATING FOOTER === */}
      <div className="fixed bottom-8 left-6 right-6 z-40">
        <div className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] p-5 flex items-center gap-4 max-w-2xl mx-auto">
          <div className="w-12 h-12 bg-green-900 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-900/20 shrink-0">
            <Award size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Lead Engineer</p>
            <h4 className="font-black text-sm text-gray-900 truncate tracking-tight">BOLU ADEOYE</h4>
            <p className="text-[9px] text-green-800 font-bold truncate opacity-80">Dept. of English & Literary Studies</p>
          </div>
          <div className="h-10 w-[1px] bg-gray-200 mx-2"></div>
          <div className="text-right shrink-0">
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">FUOYE</p>
            <p className="text-xs font-black text-gray-900">2026</p>
          </div>
        </div>
      </div>

    </main>
  );
}
