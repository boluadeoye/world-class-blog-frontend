"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, AlertTriangle, LogOut, User, Crown, Play, Award, Home, BarChart2, ChevronDown, Info } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic Import for Modal (Prevents SSR Crash)
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
    <div className="bg-orange-50 border border-orange-100 rounded-xl overflow-hidden mb-8 transition-all shadow-sm">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center justify-between p-4 text-left">
        <div className="flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-lg text-orange-600"><Info size={18} /></div>
          <div>
            <h3 className="font-black text-xs text-orange-900 uppercase tracking-wide">Important Disclaimer</h3>
            <p className="text-[10px] text-orange-700 font-medium">Read before starting</p>
          </div>
        </div>
        <ChevronDown size={16} className={`text-orange-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 text-xs text-orange-800 leading-relaxed border-t border-orange-100 pt-3">
          <p className="mb-2 font-bold">Strict Warning:</p>
          <ul className="list-disc pl-4 space-y-1 opacity-90">
            <li>The purpose of this mock examination is <strong>NOT</strong> to expose likely questions.</li>
            <li>The aim is to <strong>simulate the environment</strong> and prepare you psychologically for the real exam.</li>
            <li>Use this tool to practice <strong>time management</strong> and pressure handling.</li>
            <li>Success here does not guarantee success in the main exam, but it builds the necessary resilience.</li>
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
  const [activeTab, setActiveTab] = useState("home"); // home | leaderboard
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // MOCK LEADERBOARD (Fallback)
  const mockLeaderboard = [
    { id: 1, name: "Divine O.", score: 98, course: "GST 101", avatar: "D" },
    { id: 2, name: "Samuel A.", score: 96, course: "GST 102", avatar: "S" },
    { id: 3, name: "Boluwatife", score: 95, course: "ENT 101", avatar: "B" },
  ];

  useEffect(() => {
    const data = sessionStorage.getItem("cbt_student");
    if (!data) { router.push("/cbt"); return; }
    
    const parsed = JSON.parse(data);
    setStudent(parsed);

    // FIX: Pass student ID to fetch courses
    async function fetchData() {
      try {
        const courseRes = await fetch(`/api/cbt/courses?studentId=${parsed.id}`);
        const courseData = await courseRes.json();
        setCourses(courseData.courses || []);
        setLeaders(mockLeaderboard); 
      } catch (e) {
        console.error("Dashboard Load Error", e);
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

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24 relative">
      {showUpgrade && (
        <UpgradeModal
          student={student}
          onClose={() => setShowUpgrade(false)}
          onSuccess={() => { setShowUpgrade(false); alert("Welcome to Premium!"); }}
        />
      )}
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border ${isPremium ? 'bg-yellow-100 text-yellow-700 border-yellow-300' : 'bg-green-100 text-green-800 border-green-200'}`}>
            {isPremium ? <Crown size={20} /> : student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900 flex items-center gap-2">
              {student.name}
              {isPremium && <span className="text-[10px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full border border-yellow-200">PRO</span>}
            </h1>
            <p className="text-xs text-gray-500">{student.email}</p>
          </div>
        </div>
        {/* Logout Button */}
        <button onClick={() => setShowLogout(true)} className="text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider flex items-center gap-1 p-2 rounded-lg hover:bg-red-50 transition-colors">
          <LogOut size={14} />
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        
        {/* === DISCLAIMER === */}
        <DisclaimerCard />

        {/* === AVAILABLE COURSES (MOVED TO TOP) === */}
        <section className="mb-8">
          <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-green-700" /> Available Courses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded border border-green-200">{course.code}</span>
                  <span className="text-xs font-bold text-gray-400">{course.level}L</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                <p className="text-xs text-gray-500 mb-4 flex items-center gap-1"><Clock size={12}/> {course.duration || 15} Mins</p>
                <Link href={`/cbt/exam/${course.id}`} className="block w-full bg-green-700 text-white text-center py-2.5 rounded-lg font-bold text-sm hover:bg-green-800 transition-colors shadow-md">
                  Start Exam <ChevronRight size={14} className="inline ml-1" />
                </Link>
              </div>
            ))}
          </div>
          {courses.length === 0 && (
            <div className="text-center py-10 bg-white rounded-2xl border-2 border-dashed border-gray-200">
              <AlertTriangle size={24} className="mx-auto text-yellow-500 mb-2" />
              <p className="text-gray-400 text-sm font-bold">No courses loaded. Check API endpoint.</p>
            </div>
          )}
        </section>

        {/* === LEADERBOARD === */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-yellow-600" />
            <h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Top Performers</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-4 overflow-x-auto flex gap-4 custom-scrollbar">
            {leaderboard.map((user, i) => (
              <div key={user.id} className="min-w-[140px] bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col items-center text-center relative">
                {i === 0 && <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1 rounded-full shadow-md"><Crown size={12} fill="currentColor" /></div>}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm mb-2 ${i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'}`}>
                  {user.avatar}
                </div>
                <h3 className="font-bold text-xs text-gray-900 truncate w-full">{user.name}</h3>
                <p className="text-[10px] text-gray-500 font-medium mb-2">{user.course}</p>
                <div className="bg-green-900 text-white px-3 py-0.5 rounded-full text-[10px] font-black">{user.score}%</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* === FLOATING FOOTER === */}
      <div className="fixed bottom-6 left-6 right-6 z-50">
        <div className="bg-white/80 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 bg-green-900 rounded-full flex items-center justify-center text-white shadow-md shrink-0">
            <Award size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Engineered By</p>
            <h4 className="font-black text-xs text-gray-900 truncate">BOLU ADEOYE</h4>
            <p className="text-[9px] text-green-800 font-medium truncate">Dept. of English & Literary Studies</p>
          </div>
          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>
          <div className="text-right shrink-0">
            <p className="text-[8px] font-black text-gray-300 uppercase">FUOYE</p>
            <p className="text-[10px] font-black text-gray-900">2026</p>
          </div>
        </div>
      </div>

    </main>
  );
}
