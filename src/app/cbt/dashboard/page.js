"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, AlertTriangle, LogOut, User, Crown, Sparkles } from "lucide-react";
import Link from "next/link";
import UpgradeModal from "../../../components/cbt/UpgradeModal";

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) {
      router.push("/cbt");
      return;
    }
    setStudent(JSON.parse(stored));

    async function fetchCourses() {
      try {
        const res = await fetch("/api/cbt/courses");
        if (res.ok) {
          setCourses(await res.json());
        }
      } catch (e) {
        console.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    }
    fetchCourses();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_student");
    router.push("/cbt");
  };

  const handleUpgradeSuccess = () => {
    setShowUpgrade(false);
    alert("Upgrade Successful! Please log out and log back in to refresh your status.");
    handleLogout();
  };

  if (!student) return null;

  const isPremium = student.subscription_status === 'premium';

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      
      {/* UPGRADE MODAL */}
      {showUpgrade && (
        <UpgradeModal 
          student={student} 
          onClose={() => setShowUpgrade(false)} 
          onSuccess={handleUpgradeSuccess} 
        />
      )}

      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 rounded-xl shadow-sm mb-8">
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
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto">
        
        {/* === PREMIUM BANNER (Only for Free Users) === */}
        {!isPremium && (
          <div className="bg-gradient-to-r from-gray-900 to-slate-800 rounded-2xl p-6 mb-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[80px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
                <Crown size={24} className="text-yellow-400" /> Upgrade to Premium
              </h2>
              <p className="text-slate-300 text-sm max-w-md">
                Get unlimited retakes, full 60-question banks, and AI-powered performance analysis.
              </p>
            </div>
            
            <button 
              onClick={() => setShowUpgrade(true)}
              className="relative z-10 px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-xl shadow-lg shadow-yellow-500/20 transition-transform active:scale-95 flex items-center gap-2"
            >
              <Sparkles size={16} /> Unlock Now - ₦500
            </button>
          </div>
        )}

        {/* INSTRUCTIONS */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-10 shadow-sm">
          <h2 className="text-lg font-bold text-yellow-800 flex items-center gap-2 mb-2">
            <AlertTriangle size={20} /> Examination Instructions
          </h2>
          <ul className="list-disc pl-5 text-sm text-yellow-900 space-y-1">
            <li>Do not refresh the page once the exam starts.</li>
            <li>The timer will start immediately after you click "Start Exam".</li>
            <li>Switching tabs is recorded as malpractice.</li>
          </ul>
        </div>

        {/* EXAMS */}
        <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
          <BookOpen size={24} className="text-green-700" /> Available Examinations
        </h2>

        {loading ? (
          <div className="text-center py-12 text-gray-500">Loading exam portal...</div>
        ) : courses.length === 0 ? (
          <div className="bg-white p-10 rounded-xl border border-dashed border-gray-300 text-center">
            <p className="text-gray-500">No exams are currently scheduled.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                  <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded border border-green-200">
                    {course.code}
                  </span>
                  <span className="text-xs font-bold text-gray-400">{course.level} Level</span>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{course.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
                    <Clock size={14} />
                    <span>{course.duration || 15} Minutes</span>
                  </div>
                  
                  <Link 
                    href={`/cbt/exam/${course.id}`}
                    className="block w-full bg-green-700 hover:bg-green-800 text-white text-center font-bold py-3 rounded transition-colors"
                  >
                    Start Exam
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
