"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, AlertTriangle, LogOut, History, Trophy } from "lucide-react";
import Link from "next/link";

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    const user = JSON.parse(stored);
    setStudent(user);

    async function fetchData() {
      try {
        const [resCourses, resResults] = await Promise.all([
          fetch("/api/cbt/courses"),
          fetch(`/api/cbt/history?studentId=${user.id}`)
        ]);
        
        if (resCourses.ok) setCourses(await resCourses.json());
        if (resResults.ok) setResults(await resResults.json());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_student");
    router.push("/cbt");
  };

  if (!student) return null;

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 pb-20">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-bold border border-green-200">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-900">{student.name}</h1>
            <p className="text-xs text-gray-500">Student Portal</p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider flex items-center gap-1">
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: EXAMS */}
        <div className="lg:col-span-2">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-r-lg mb-8 shadow-sm">
            <h2 className="text-lg font-bold text-yellow-800 flex items-center gap-2 mb-2">
              <AlertTriangle size={20} /> Instructions
            </h2>
            <ul className="list-disc pl-5 text-sm text-yellow-900 space-y-1">
              <li>Do not refresh the page once the exam starts.</li>
              <li>The timer will start immediately.</li>
              <li>Switching tabs is recorded as malpractice.</li>
            </ul>
          </div>

          <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen size={24} className="text-green-700" /> Available Examinations
          </h2>

          {loading ? (
            <div className="text-center py-12 text-gray-500">Loading portal...</div>
          ) : (
            <div className="grid gap-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-green-500 transition-all flex justify-between items-center group">
                  <div>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded border border-green-200 mb-2 inline-block">
                      {course.code}
                    </span>
                    <h3 className="font-bold text-lg text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">{course.level} Level • 45 Mins</p>
                  </div>
                  <Link href={`/cbt/exam/${course.id}`} className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-bold text-sm shadow-md transition-transform active:scale-95">
                    Start
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: HISTORY */}
        <div>
          <h2 className="text-xl font-black text-gray-800 mb-6 flex items-center gap-2">
            <History size={24} className="text-blue-700" /> Recent Results
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            {results.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No exams taken yet.</div>
            ) : (
              <div className="divide-y divide-gray-100">
                {results.map((res, i) => (
                  <div key={i} className="p-4 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-gray-800 text-sm">{res.code}</p>
                      <p className="text-xs text-gray-500">{new Date(res.taken_at).toLocaleDateString()}</p>
                    </div>
                    <div className={`text-lg font-black ${res.score >= (res.total/2) ? 'text-green-600' : 'text-red-600'}`}>
                      {Math.round((res.score / res.total) * 100)}%
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
