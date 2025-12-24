"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, AlertTriangle, LogOut, User } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Auth Check
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) {
      router.push("/cbt");
      return;
    }
    setStudent(JSON.parse(stored));

    // 2. Fetch Available Exams
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

  if (!student) return null;

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 p-6">
      
      {/* === OFFICIAL HEADER === */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 rounded-xl shadow-sm mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold border border-green-200">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">{student.name}</h1>
            <p className="text-xs text-gray-500">{student.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider flex items-center gap-1"
        >
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto">
        
        {/* === INSTRUCTION PANEL === */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-10 shadow-sm">
          <h2 className="text-lg font-bold text-yellow-800 flex items-center gap-2 mb-2">
            <AlertTriangle size={20} /> Examination Instructions
          </h2>
          <ul className="list-disc pl-5 text-sm text-yellow-900 space-y-1">
            <li>Do not refresh the page once the exam starts.</li>
            <li>The timer will start immediately after you click "Start Exam".</li>
            <li>Switching tabs is recorded as malpractice.</li>
            <li>Ensure you have a stable internet connection.</li>
          </ul>
        </div>

        {/* === AVAILABLE EXAMS === */}
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
                    <span>45 Minutes</span>
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
