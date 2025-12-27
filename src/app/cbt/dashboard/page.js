"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// SAFE ICONS ONLY
import { 
  LogOut, Trophy, BookOpen, Play, Award, 
  ChevronDown, Info, Crown, Clock, ChevronRight, 
  AlertTriangle, Layers, Headset, History, CheckCircle 
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

/* === COURSE CARD === */
function CourseCard({ course }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group active:scale-[0.98] transition-transform mb-3">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border ${course.code.toUpperCase().startsWith('GST') ? 'bg-green-50 text-[#004d00] border-green-100' : 'bg-blue-50 text-blue-700 border-blue-100'}`}>
          {course.code.slice(0,3)}
        </div>
        <div>
          <h3 className="font-black text-gray-900 text-xs uppercase">{course.code}</h3>
          <p className="text-[10px] text-gray-500 font-medium truncate w-40">{course.title}</p>
        </div>
      </div>
      <Link href={`/cbt/exam/${course.id}`} className="w-9 h-9 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#004d00] transition-colors">
        <Play size={12} fill="currentColor" />
      </Link>
    </div>
  );
}

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const [greeting, setGreeting] = useState("Good Day");
  const [avatarUrl, setAvatarUrl] = useState("");

  // Accordion States
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
    setAvatarUrl(`https://api.dicebear.com/7.x/micah/svg?seed=${seed}&backgroundColor=b6e3f4`);

    async function fetchData() {
      try {
        // Sync Status
        const syncRes = await fetch(`/api/cbt/auth/student-status?id=${parsed.id}`);
        const syncData = await syncRes.json();
        if (syncRes.ok) {
          const updatedStudent = { ...parsed, subscription_status: syncData.status };
          setStudent(updatedStudent);
          sessionStorage.setItem("cbt_student", JSON.stringify(updatedStudent));
        }

        // Fetch Courses
        const courseRes = await fetch(`/api/cbt/courses?studentId=${parsed.id}`);
        const courseData = await courseRes.json();
        setCourses(Array.isArray(courseData.courses) ? courseData.courses : []);

        // Fetch Leaderboard
        const lbRes = await fetch('/api/cbt/leaderboard');
        const lbData = await lbRes.json();
        setLeaders(Array.isArray(lbData) ? lbData : []); 

        // Fetch History (Mocked for now, replace with real API if ready)
        setHistory([]); 

      } catch (e) {
        console.error("Load Error", e);
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
      <LogoutModal isOpen={showLogout} onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />
      {showUpgrade && <UpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      
      {/* === HEADER === */}
      <header className="bg-[#004d00] text-white pt-8 pb-16 px-6 rounded-b-[40px] shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#006400] rounded-2xl flex items-center justify-center border-2 border-white/20 shadow-lg overflow-hidden relative">
              {avatarUrl && <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />}
              {isPremium && <div className="absolute top-0 right-0 bg-yellow-400 p-1 rounded-bl-lg shadow-sm"><Crown size={10} className="text-black" fill="currentColor" /></div>}
            </div>
            <div>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-widest mb-1">{greeting}</p>
              <h1 className="text-xl font-black leading-none truncate w-40">{student.name.split(" ")[0]}</h1>
            </div>
          </div>
          
          <div className="flex gap-2">
            {/* WHATSAPP SUPPORT ICON */}
            <a 
              href="https://wa.me/2348106293674" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-500 p-3 rounded-xl border border-white/20 text-white hover:bg-green-400 transition-all shadow-lg animate-pulse"
            >
              <Headset size={20} />
            </a>
            <button onClick={() => setShowLogout(true)} className="bg-[#006400] p-3 rounded-xl border border-white/10 hover:bg-red-600 transition-colors shadow-lg">
              <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-5 flex items-center justify-between">
          <div><p className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Current Session</p><p className="font-black text-sm text-white">FUOYE 2026 GST MOCK</p></div>
          <div className="bg-white text-[#004d00] px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wide shadow-sm">Active</div>
        </div>
      </header>

      <div className="px-6 -mt-8 relative z-20 space-y-6">
        
        {/* === GST ACCORDION === */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button onClick={() => setGstExpanded(!gstExpanded)} className="w-full p-5 flex items-center justify-between bg-green-50/50">
            <div className="flex items-center gap-3">
              <BookOpen size={18} className="text-[#004d00]" />
              <h2 className="font-black text-xs text-gray-700 uppercase tracking-widest">General Studies</h2>
            </div>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${gstExpanded ? 'rotate-180' : ''}`} />
          </button>
          {gstExpanded && (
            <div className="p-4 animate-in fade-in slide-in-from-top-2">
              {gstCourses.map(c => <CourseCard key={c.id} course={c} />)}
            </div>
          )}
        </section>

        {/* === OTHER COURSES ACCORDION === */}
        <section className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button onClick={() => setOthersExpanded(!othersExpanded)} className="w-full p-5 flex items-center justify-between bg-blue-50/30">
            <div className="flex items-center gap-3">
              <Layers size={18} className="text-blue-700" />
              <h2 className="font-black text-xs text-gray-700 uppercase tracking-widest">Other Courses</h2>
            </div>
            <ChevronDown size={18} className={`text-gray-400 transition-transform ${othersExpanded ? 'rotate-180' : ''}`} />
          </button>
          {othersExpanded && (
            <div className="p-4 animate-in fade-in slide-in-from-top-2">
              {otherCourses.length > 0 ? otherCourses.map(c => <CourseCard key={c.id} course={c} />) : <p className="text-center text-[10px] text-gray-400 py-4 font-bold uppercase">No departmental courses loaded</p>}
            </div>
          )}
        </section>

        {/* === EXAM HISTORY === */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <History size={18} className="text-gray-400" />
            <h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Your History</h2>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm text-center">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Recent performance data will appear here</p>
          </div>
        </section>

        {/* === LEADERBOARD === */}
        <section>
          <div className="flex items-center gap-2 mb-4"><Trophy size={18} className="text-yellow-600" /><h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Top Performers</h2></div>
          {leaders.length > 0 ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-4 overflow-x-auto flex gap-4 custom-scrollbar">
              {leaders.map((user, i) => (
                <div key={i} className="min-w-[140px] bg-gray-50 rounded-2xl p-4 border border-gray-100 flex flex-col items-center text-center relative">
                  {i === 0 && <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1 rounded-full shadow-sm"><Crown size={12} fill="currentColor" /></div>}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm mb-3 overflow-hidden border-2 ${i === 0 ? 'border-yellow-400' : 'border-gray-100'}`}><img src={`https://api.dicebear.com/7.x/micah/svg?seed=${user.name.replace(/\s/g, '')}&backgroundColor=transparent`} alt={user.name} className="w-full h-full object-cover" /></div>
                  <h3 className="font-bold text-xs text-gray-900 truncate w-full mb-1">{user.name}</h3>
                  <p className="text-[10px] text-gray-500 font-medium mb-2">{user.course || user.code}</p>
                  <div className="bg-[#004d00] text-white px-3 py-0.5 rounded-full text-[10px] font-black">{user.score}%</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-100"><p className="text-gray-400 text-xs font-medium">Leaderboard updating...</p></div>
          )}
        </section>
      </div>

      {/* === FOOTER === */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-white/90 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.1)] rounded-[2rem] p-4 flex items-center gap-4">
          <div className="w-10 h-10 bg-[#004d00] rounded-full flex items-center justify-center text-white shadow-md shrink-0">
            <Award size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em] mb-0.5">Engineered By</p>
            <h4 className="font-black text-xs text-gray-900 truncate">BOLU ADEOYE</h4>
            <p className="text-[9px] text-[#004d00] font-bold truncate opacity-80">In conjunction with Abel Kings Educational Center</p>
          </div>
          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
          <div className="text-right shrink-0">
            <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest">FUOYE</p>
            <p className="text-[10px] font-black text-gray-900">2026</p>
          </div>
        </div>
      </div>
    </main>
  );
}
