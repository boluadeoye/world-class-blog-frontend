"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// SAFE ICONS ONLY
import { LogOut, User, Trophy, BookOpen, Play, Award, Star, ChevronRight, AlertOctagon, ChevronDown, Info } from "lucide-react";

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
    <div className="bg-orange-50 border border-orange-100 rounded-xl overflow-hidden mb-8 transition-all">
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

export default function Dashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
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

    async function fetchData() {
      try {
        const courseRes = await fetch(`/api/cbt/courses?studentId=${parsed.id}`);
        const courseData = await courseRes.json();
        setCourses(courseData.courses || []);
        setLeaderboard(mockLeaderboard); 
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-green-900 font-black text-sm tracking-widest animate-pulse">AUTHENTICATING...</div>;

  return (
    <main className="min-h-screen bg-[#f8fafc] font-sans pb-32 relative">
      <LogoutModal isOpen={showLogout} onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />

      {/* === HEADER === */}
      <header className="bg-[#004d00] text-white p-6 pb-12 rounded-b-[2.5rem] shadow-xl relative z-10">
        <div className="flex justify-between items-center mb-8">
          {/* Avatar & Welcome */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center shadow-inner">
              <span className="font-black text-xl text-white">{student?.name?.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-widest">Welcome Back</p>
              <h1 className="font-black text-lg leading-tight truncate w-40">{student?.name?.split(" ")[0]}</h1>
            </div>
          </div>

          {/* Logout Arrow */}
          <button onClick={() => setShowLogout(true)} className="bg-white/10 p-3 rounded-xl hover:bg-red-600 hover:text-white transition-colors border border-white/10">
            <LogOut size={20} />
          </button>
        </div>

        {/* Hero Context */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-green-300 uppercase tracking-wider">Current Session</p>
            <p className="font-black text-sm">FUOYE 2026 GST MOCK</p>
          </div>
          <div className="bg-white text-green-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Active</div>
        </div>
      </header>

      <div className="px-6 -mt-6 relative z-20 space-y-8">
        
        {/* === DISCLAIMER === */}
        <DisclaimerCard />

        {/* === LEADERBOARD === */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Trophy size={16} className="text-yellow-600" />
            <h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Top Performers</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 overflow-x-auto flex gap-4 custom-scrollbar">
            {leaderboard.map((user, i) => (
              <div key={user.id} className="min-w-[140px] bg-gray-50 rounded-xl p-3 border border-gray-100 flex flex-col items-center text-center relative">
                {i === 0 && <div className="absolute -top-2 -right-2 bg-yellow-400 text-white p-1 rounded-full shadow-sm"><Crown size={12} fill="currentColor" /></div>}
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

        {/* === COURSE GRID === */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen size={16} className="text-green-800" />
            <h2 className="font-black text-xs text-gray-500 uppercase tracking-widest">Available Courses</h2>
          </div>
          <div className="grid gap-4">
            {courses.length > 0 ? courses.map((course) => (
              <div key={course.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center group active:scale-[0.98] transition-transform">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-800 font-black text-sm border border-green-100">
                    {course.code.slice(0,3)}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 text-sm">{course.code}</h3>
                    <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wide">{course.title}</p>
                  </div>
                </div>
                <button onClick={() => router.push(`/cbt/exam/${course.id}`)} className="bg-black text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg group-hover:bg-green-900 transition-colors">
                  <Play size={14} fill="currentColor" />
                </button>
              </div>
            )) : (
              <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-300">
                <p className="text-gray-400 text-xs font-bold">No courses available yet.</p>
              </div>
            )}
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
