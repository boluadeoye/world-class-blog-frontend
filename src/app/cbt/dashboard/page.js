"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Clock, AlertTriangle, LogOut, User, ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRules, setShowRules] = useState(false);

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

  if (!student) return null;

  return (
    <main className="min-h-screen bg-gray-50 font-sans text-gray-900 p-4 md:p-8">
      
      {/* === HEADER === */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 z-20 rounded-2xl shadow-sm mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-700 font-black border-2 border-green-100 text-lg shadow-inner">
            {student.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900 leading-tight">{student.name}</h1>
            <p className="text-xs text-gray-500 font-medium">{student.email}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg hover:bg-red-100 transition-colors"
        >
          <LogOut size={14} /> Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto">
        
        {/* === INTELLIGENT RULES (Collapsible) === */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-10">
          <button 
            onClick={() => setShowRules(!showRules)}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 text-yellow-700 rounded-lg">
                <ShieldAlert size={20} />
              </div>
              <div className="text-left">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Examination Protocols</h2>
                <p className="text-xs text-gray-500">Read strict guidelines before starting</p>
              </div>
            </div>
            {showRules ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
          </button>
          
          <AnimatePresence>
            {showRules && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-gray-100 bg-yellow-50/50"
              >
                <ul className="p-6 pl-12 list-disc text-sm text-gray-700 space-y-2">
                  <li><strong>Zero Tolerance:</strong> Switching tabs is recorded as malpractice. 3 strikes = Auto-Submit.</li>
                  <li><strong>Timer:</strong> The clock starts immediately. It cannot be paused.</li>
                  <li><strong>Submission:</strong> Ensure you click "Submit" before time runs out. Auto-submit occurs at 00:00.</li>
                  <li><strong>Network:</strong> A stable connection is required. Do not refresh the page.</li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === EXAM TICKETS (Grid) === */}
        <div className="flex items-center gap-3 mb-6">
          <BookOpen size={24} className="text-green-700" />
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Available Examinations</h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="h-48 bg-white rounded-2xl animate-pulse border border-gray-200"></div>
            ))}
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border-2 border-dashed border-gray-300 text-center">
            <p className="text-gray-400 font-medium">No exams are currently scheduled.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <motion.div 
                key={course.id}
                whileHover={{ y: -4 }}
                className="group bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-green-500/30 transition-all duration-300 flex flex-col"
              >
                {/* Ticket Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-green-600"></div>
                  <span className="font-mono text-lg font-black text-gray-900 tracking-tight">
                    {course.code}
                  </span>
                  <span className="text-[10px] font-bold bg-white border border-gray-200 px-2 py-1 rounded text-gray-500 uppercase tracking-wider">
                    {course.level} Level
                  </span>
                </div>
                
                {/* Ticket Body */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg text-gray-800 mb-4 leading-snug group-hover:text-green-700 transition-colors">
                    {course.title}
                  </h3>
                  
                  <div className="mt-auto pt-6 border-t border-dashed border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                      <Clock size={14} className="text-green-600" />
                      <span>{course.duration || 15} Mins</span>
                    </div>
                    
                    <Link 
                      href={`/cbt/exam/${course.id}`}
                      className="bg-gray-900 hover:bg-green-700 text-white text-xs font-bold px-6 py-2.5 rounded-lg transition-colors shadow-lg shadow-gray-900/10"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
