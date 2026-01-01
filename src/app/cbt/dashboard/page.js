"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Play, Headset, Lock, Sparkles,
  GraduationCap, Database, X, User,
  Library, Landmark, Microscope, PenTool,
  AlertTriangle, ChevronRight, Info, ChevronDown
} from "lucide-react";
import dynamic from "next/dynamic";
import LiveTracker from "@/components/cbt/LiveTracker";

// --- DYNAMIC IMPORTS ---
const UpgradeModal = dynamic(() => import("@/components/cbt/UpgradeModal"), { ssr: false });

// --- COMPONENT 1: LOGOUT MODAL (Local Crash Fix) ---
function LogoutModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4 mx-auto">
          <LogOut className="text-red-600" size={24} />
        </div>
        <h3 className="text-lg font-bold text-center text-gray-900 mb-2">Sign Out?</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to end your session?
        </p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-red-600 hover:bg-red-700 shadow-lg shadow-red-200">
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// --- COMPONENT 2: COURSE CARD (Preserved Logic) ---
function CourseCard({ course, onLaunch, isPremium }) {
  const isGst = course.code.toUpperCase().startsWith("GST");
  const isBlocked = !isPremium && course.user_attempts >= 2;
  
  let SealIcon = Library;
  if (!isGst) {
    if (course.code.startsWith("BIO") || course.code.startsWith("CHM")) SealIcon = Microscope;
    else if (course.code.startsWith("LAW") || course.code.startsWith("BUS")) SealIcon = Landmark;
    else SealIcon = PenTool;
  }

  const theme = isGst 
    ? { accent: "bg-[#004d00]", badge: "bg-emerald-50 text-emerald-800 border-emerald-100", icon: "text-emerald-900", btn: "bg-[#004d00] hover:bg-emerald-900" }
    : { accent: "bg-slate-700", badge: "bg-slate-50 text-slate-700 border-slate-100", icon: "text-slate-800", btn: "bg-slate-800 hover:bg-slate-900" };

  return (
    <div onClick={() => !isBlocked && onLaunch(course)} className={`group relative bg-white rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full ${isBlocked ? 'cursor-not-allowed opacity-80' : 'cursor-pointer'}`}>
      <div className={`h-1.5 w-full ${theme.accent}`}></div>
      <div className="p-5 flex-1 flex flex-col h-full justify-between relative">
        <div className={`absolute -right-6 -top-6 opacity-[0.03] transform rotate-12 scale-[2.5] ${theme.icon}`}><SealIcon /></div>
        <div className="relative z-10">
          <div className="flex justify-between items-start mb-3">
            <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border ${theme.badge}`}>{course.code}</span>
            {isBlocked && <div className="bg-red-50 text-red-500 p-1 rounded-md"><Lock size={12} /></div>}
          </div>
          <h3 className="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2 min-h-[2.5rem]">{course.title}</h3>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-1.5">
            <Database size={12} className="text-gray-400" />
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wide">{course.total_questions || 0} Questions</span>
          </div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-110 ${isBlocked ? 'bg-gray-200 text-gray-400' : theme.btn}`}>
            <Play size={12} fill="currentColor" className="ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- MAIN DASHBOARD ---
export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // MOCK DATA (Replace with your actual fetch logic)
        const mockData = {
          student: { first_name: "Adeolu", matric_no: "2026/12345", is_premium: true },
          courses: [
            { id: 1, code: "GST101", title: "Use of English", total_questions: 120, user_attempts: 0 },
            { id: 2, code: "MTH101", title: "General Mathematics", total_questions: 80, user_attempts: 1 },
            { id: 3, code: "GST102", title: "Philosophy and Logic", total_questions: 100, user_attempts: 0 },
            { id: 4, code: "BIO101", title: "General Biology I", total_questions: 150, user_attempts: 3 },
          ]
        };
        setStudent(mockData.student);
        setCourses(mockData.courses);
      } catch (error) {
        console.error("Failed to fetch dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedCourses = [...courses].sort((a, b) => {
    const aIsGst = a.code.toUpperCase().startsWith("GST");
    const bIsGst = b.code.toUpperCase().startsWith("GST");
    if (aIsGst && !bIsGst) return -1;
    if (!aIsGst && bIsGst) return 1;
    return a.code.localeCompare(b.code);
  });

  const handleLogout = () => {
    localStorage.clear(); 
    router.push("/login");
  };

  const handleLaunchCourse = (course) => {
    router.push(`/cbt/exam/${course.code}`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004d00]"></div></div>;

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 pb-48 relative selection:bg-green-200">
      <LiveTracker />
      <LogoutModal isOpen={showLogoutConfirm} onClose={() => setShowLogoutConfirm(false)} onConfirm={handleLogout} />

      {/* === HEADER SECTION (MATCHING IMAGE) === */}
      <header className="bg-[#004d00] pt-8 pb-24 px-6 rounded-b-[3rem] relative z-10">
        <div className="max-w-5xl mx-auto">
          
          {/* 1. TOP NAV: PROFILE & BUTTONS */}
          <div className="flex items-center justify-between mb-8">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 border-2 border-white overflow-hidden flex items-center justify-center">
                {/* Using Icon as placeholder for Avatar */}
                <User size={32} className="text-blue-900" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-green-100/70 uppercase tracking-widest mb-0.5">Good Morning</p>
                <h1 className="text-2xl font-bold text-white leading-none">{student?.first_name || 'Scholar'}</h1>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <a href="https://wa.me/2348000000000" target="_blank" className="w-12 h-12 rounded-2xl bg-[#005c00] flex items-center justify-center text-green-100 hover:bg-[#006600] transition-colors border border-white/5">
                <Headset size={20} />
              </a>
              <button onClick={() => setShowLogoutConfirm(true)} className="w-12 h-12 rounded-2xl bg-[#005c00] flex items-center justify-center text-green-100 hover:bg-[#006600] transition-colors border border-white/5">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* 2. SESSION CARD (MATCHING IMAGE) */}
          <div className="bg-[#003300] rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden border border-white/5">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">Current Session</p>
              <h2 className="text-xl md:text-2xl font-bold text-white">EXAMFORGE SESSION 2026</h2>
            </div>
            <div className="relative z-10">
              <button className="bg-white text-[#003300] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider hover:bg-gray-100 transition-colors">
                Active
              </button>
            </div>
          </div>

        </div>
      </header>

      {/* === BODY CONTENT === */}
      <div className="max-w-5xl mx-auto px-6 relative z-20 -mt-12">
        
        {/* 3. DISCLAIMER CARD (MATCHING IMAGE - OVERLAPPING) */}
        <div className="bg-[#FFF9F0] rounded-3xl p-5 shadow-xl shadow-black/5 flex items-center justify-between mb-10 cursor-pointer hover:bg-[#fff5e6] transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#FFE4C4] flex items-center justify-center text-[#D2691E]">
              <Info size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#5C4033]">IMPORTANT DISCLAIMER</h3>
              <p className="text-xs font-bold text-[#D2691E]">Read before starting</p>
            </div>
          </div>
          <div className="text-[#D2691E]/50">
            <ChevronDown size={20} />
          </div>
        </div>

        {/* 4. COURSE GRID (LOGIC PRESERVED) */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Library size={20} className="text-[#004d00]" />
              Available Courses
            </h3>
          </div>

          {courses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {sortedCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  isPremium={student?.is_premium}
                  onLaunch={handleLaunchCourse} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-gray-400 text-sm">No courses assigned yet.</p>
            </div>
          )}
        </div>

      </div>
      <UpgradeModal />
    </main>
  );
}
