"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, AlertTriangle, LogOut, User, Crown, Sparkles, Trophy, Home, BarChart2 } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic Import for Modal (Prevents SSR Crash)
const UpgradeModal = dynamic(() => import("../../../components/cbt/UpgradeModal"), { ssr: false });

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [activeTab, setActiveTab] = useState("home"); // home | leaderboard
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    setStudent(JSON.parse(stored));

    // Fetch Data
    fetch("/api/cbt/courses").then(res => res.json()).then(setCourses);
    fetch("/api/cbt/leaderboard").then(res => res.json()).then(setLeaders);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_student");
    router.push("/cbt");
  };

  if (!mounted || !student) return null;
  const isPremium = student.subscription_status === 'premium';

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-24">
      
      {/* UPGRADE MODAL */}
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
        <button onClick={handleLogout} className="text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider flex items-center gap-1">
          <LogOut size={14} />
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6">
        
        {/* === TAB: HOME === */}
        {activeTab === "home" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* PREMIUM CARD */}
            {!isPremium && (
              <div className="bg-gray-900 rounded-2xl p-6 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/20 blur-[60px] rounded-full"></div>
                <div className="relative z-10 flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-bold flex items-center gap-2 text-yellow-400">
                      <Crown size={20} /> Upgrade to Premium
                    </h2>
                    <p className="text-slate-400 text-xs mt-1 max-w-xs">Unlimited Retakes • AI Analysis • Full Question Bank</p>
                  </div>
                  <button onClick={() => setShowUpgrade(true)} className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold text-xs shadow-lg hover:scale-105 transition-transform">
                    Unlock ₦500
                  </button>
                </div>
              </div>
            )}

            {/* EXAMS GRID */}
            <h2 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
              <BookOpen size={20} className="text-green-700" /> Available Exams
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:border-green-500 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-1 rounded border border-green-100">{course.code}</span>
                    <span className="text-xs font-bold text-gray-400">{course.level}L</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{course.title}</h3>
                  <p className="text-xs text-gray-500 mb-4 flex items-center gap-1"><Clock size={12}/> {course.duration || 15} Mins</p>
                  <Link href={`/cbt/exam/${course.id}`} className="block w-full bg-green-700 text-white text-center py-2.5 rounded-lg font-bold text-sm hover:bg-green-800">
                    Start Exam
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* === TAB: LEADERBOARD === */}
        {activeTab === "leaderboard" && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-yellow-50 p-6 border-b border-yellow-100 text-center">
                <Trophy size={40} className="mx-auto text-yellow-600 mb-2" />
                <h2 className="text-xl font-black text-yellow-900">Top Performers</h2>
                <p className="text-xs text-yellow-700 font-bold uppercase tracking-widest">Hall of Fame</p>
              </div>
              <div className="divide-y divide-gray-100">
                {leaders.map((l, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm ${i===0 ? 'bg-yellow-100 text-yellow-700' : i===1 ? 'bg-gray-200 text-gray-700' : i===2 ? 'bg-orange-100 text-orange-700' : 'bg-white border text-gray-500'}`}>
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-sm text-gray-900">{l.name}</p>
                        <p className="text-[10px] text-gray-500 uppercase">{l.department} • {l.code}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-green-700">{l.score}/{l.total_questions}</p>
                    </div>
                  </div>
                ))}
                {leaders.length === 0 && <div className="p-8 text-center text-gray-400 text-sm">No records yet. Be the first!</div>}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* === FLOATING TAB BAR === */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-full px-6 py-3 flex items-center gap-8 z-50">
        <button 
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'home' ? 'text-green-700' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <Home size={20} strokeWidth={activeTab === 'home' ? 3 : 2} />
          <span className="text-[10px] font-bold uppercase">Home</span>
        </button>
        
        <div className="w-px h-8 bg-gray-200"></div>

        <button 
          onClick={() => setActiveTab("leaderboard")}
          className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'leaderboard' ? 'text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`}
        >
          <BarChart2 size={20} strokeWidth={activeTab === 'leaderboard' ? 3 : 2} />
          <span className="text-[10px] font-bold uppercase">Rank</span>
        </button>
      </div>

    </main>
  );
}
