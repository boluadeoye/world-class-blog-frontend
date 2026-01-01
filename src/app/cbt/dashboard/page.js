"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut, Trophy, BookOpen, Play, Award,
  ChevronDown, Info, Crown, Clock, ChevronRight,
  AlertTriangle, Layers, Headset, History, CheckCircle, Settings, Lock, Sparkles,
  ChevronUp, MessageCircle, GraduationCap, FileText, Target, Zap, ShieldCheck, Search,
  Library, Landmark, Microscope, PenTool, Database, X
} from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import LiveTracker from "@/components/cbt/LiveTracker";

const UpgradeModal = dynamic(() => import("@/components/cbt/UpgradeModal"), { ssr: false });

/* === 1. LOGOUT CONFIRMATION MODAL (STABLE) === */
function LogoutModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6 animate-in fade-in">
      <div className="bg-white rounded-[2rem] shadow-2xl max-w-sm w-full overflow-hidden border border-gray-100">
        <div className="bg-red-50 p-8 flex flex-col items-center text-center">
          <div className="mb-4 bg-red-100 p-3 rounded-full text-red-600"><LogOut size={32} /></div>
          <h3 className="font-black text-xl text-red-900 uppercase tracking-tight mb-2">End Session?</h3>
          <p className="text-gray-600 text-sm font-medium leading-relaxed">Confirm disconnection from the secure academic portal.</p>
        </div>
        <div className="p-6 bg-white flex gap-3">
          <button onClick={onCancel} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black text-gray-400 uppercase tracking-widest hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-[1.5] py-4 bg-red-600 text-white rounded-2xl text-xs font-black shadow-lg uppercase tracking-widest hover:bg-red-700">Logout</button>
        </div>
      </div>
    </div>
  );
}

/* === 2. EXAMINATION SETUP MODAL === */
function ExamSetupModal({ course, isPremium, onClose, onStart, onUpgrade }) {
  const [duration, setDuration] = useState(course?.duration || 15);
  const [qCount, setQCount] = useState(30);
  
  if (!course) return null;
  
  const isBlocked = !isPremium && course.user_attempts >= 2;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in zoom-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-sm overflow-hidden border border-gray-200 relative">
        <div className={`p-8 relative z-10 ${isBlocked ? 'bg-red-50' : 'bg-green-50'} border-b border-gray-100`}>
          <h3 className={`font-black text-xl uppercase tracking-tighter ${isBlocked ? 'text-red-900' : 'text-[#004d00]'}`}>Examination Setup</h3>
          <p className={`text-[10px] font-mono font-bold uppercase tracking-widest mt-1 ${isBlocked ? 'text-red-400' : 'text-green-600'}`}>{course.code} • {course.title}</p>
        </div>
        <div className="p-8 pt-6">
          {isBlocked ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-200"><Lock size={32} className="text-red-600" /></div>
              <p className="text-gray-600 text-xs font-medium mb-8 leading-relaxed">Maximum free attempts recorded. Upgrade required.</p>
              <button onClick={onUpgrade} className="w-full py-4 bg-yellow-500 text-black rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-transform">Upgrade Clearance</button>
              <button onClick={onClose} className="mt-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest hover:text-gray-600">Return to Catalog</button>
            </div>
          ) : (
            <>
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">Time Allocation</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((time) => {
                      const isRestricted = !isPremium && time !== 15;
                      return (
                        <button key={time} disabled={isRestricted} onClick={() => setDuration(time)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative border ${duration === time ? 'border-[#004d00] bg-[#004d00] text-white shadow-lg' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                          {time}m {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">Question Volume</label>
                  <div className="grid grid-cols-4 gap-2">
                    {[20, 40, 60, 100].map((count) => {
                      const isRestricted = !isPremium && count !== 30;
                      return (
                        <button key={count} disabled={isRestricted} onClick={() => setQCount(count)} className={`py-3 rounded-xl text-[10px] font-black transition-all relative border ${qCount === count ? 'border-blue-700 bg-blue-700 text-white shadow-lg' : 'border-gray-100 text-gray-400 bg-gray-50'} ${isRestricted ? 'opacity-40' : ''}`}>
                          {count} {isRestricted && <Lock size={8} className="absolute top-1 right-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={onClose} className="flex-1 py-4 border border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest">Cancel</button>
                <button onClick={() => onStart(duration, qCount)} className="flex-[2] py-4 bg-[#004d00] text-white rounded-2xl text-[10px] font-black shadow-xl hover:bg-green-900 uppercase tracking-widest flex items-center justify-center gap-2">Begin Examination <ChevronRight size={14} /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* === 3. COURSE CARD === */
function CourseCard({ course, onSelect, isPremium }) {
  const isGst = course.code?.toUpperCase().startsWith("GST");
  const isBlocked = !isPremium && course.user_attempts >= 2;
  
  let SealIcon = Library;
  if (!isGst && course.code) {
    if (course.code.startsWith("BIO") || course.code.startsWith("CHM")) SealIcon = Microscope;
    else if (course.code.startsWith("LAW") || course.code.startsWith("BUS")) SealIcon = Landmark;
    else SealIcon = PenTool;
  }

  const theme = isGst 
    ? { accent: "bg-[#004d00]", badge: "bg-emerald-50 text-emerald-800 border-emerald-100", icon: "text-emerald-900", btn: "bg-[#004d00] hover:bg-emerald-900" }
    : { accent: "bg-slate-700", badge: "bg-slate-50 text-slate-700 border-slate-100", icon: "text-slate-800", btn: "bg-slate-800 hover:bg-slate-900" };

  return (
    <div onClick={() => onSelect(course)} className={`group relative bg-white rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer`}>
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

/* === 4. MAIN DASHBOARD (ADEOLU DESIGN) === */
export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [showLogout, setShowLogout] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // MOCK DATA (Replace with API)
        const mockData = {
          student: { first_name: "Adeolu", matric_no: "2026/12345", is_premium: true },
          courses: [
            { id: 1, code: "GST101", title: "Use of English", total_questions: 120, user_attempts: 0, duration: 45 },
            { id: 2, code: "MTH101", title: "General Mathematics", total_questions: 80, user_attempts: 1, duration: 60 },
            { id: 3, code: "GST102", title: "Philosophy and Logic", total_questions: 100, user_attempts: 0, duration: 40 },
            { id: 4, code: "BIO101", title: "General Biology I", total_questions: 150, user_attempts: 3, duration: 50 },
          ]
        };
        setStudent(mockData.student);
        setCourses(mockData.courses);
      } catch (error) {
        console.error("Error", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedCourses = [...courses].sort((a, b) => {
    const aIsGst = a.code?.toUpperCase().startsWith("GST");
    const bIsGst = b.code?.toUpperCase().startsWith("GST");
    if (aIsGst && !bIsGst) return -1;
    if (!aIsGst && bIsGst) return 1;
    return a.code?.localeCompare(b.code);
  });

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const handleStartExam = (duration, qCount) => {
    // Logic to start exam with params
    router.push(`/cbt/exam/${selectedCourse.code}?t=${duration}&q=${qCount}`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#004d00]"></div></div>;

  return (
    <main className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 pb-48 relative selection:bg-green-200">
      <LiveTracker />
      
      {/* MODALS */}
      {showLogout && <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogout(false)} />}
      
      {selectedCourse && (
        <ExamSetupModal 
          course={selectedCourse}
          isPremium={student?.is_premium}
          onClose={() => setSelectedCourse(null)}
          onStart={handleStartExam}
          onUpgrade={() => { setSelectedCourse(null); setShowUpgrade(true); }}
        />
      )}

      {/* === HEADER SECTION (ADEOLU DESIGN) === */}
      <header className="bg-[#004d00] pt-8 pb-24 px-6 rounded-b-[3rem] relative z-10 shadow-2xl">
        <div className="max-w-5xl mx-auto">
          
          {/* 1. TOP NAV: PROFILE & BUTTONS */}
          <div className="flex items-center justify-between mb-8">
            {/* Profile */}
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-100 border-2 border-white overflow-hidden flex items-center justify-center shadow-lg">
                {/* SAFE ICON: GraduationCap instead of User */}
                <GraduationCap size={32} className="text-blue-900" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-green-100/70 uppercase tracking-widest mb-0.5">Good Morning</p>
                <h1 className="text-2xl font-bold text-white leading-none">{student?.first_name || 'Scholar'}</h1>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-3">
              <a href="https://wa.me/2348000000000" target="_blank" className="w-12 h-12 rounded-2xl bg-[#005c00] flex items-center justify-center text-green-100 hover:bg-[#006600] transition-colors border border-white/5 shadow-lg">
                <Headset size={20} />
              </a>
              <button onClick={() => setShowLogout(true)} className="w-12 h-12 rounded-2xl bg-[#005c00] flex items-center justify-center text-green-100 hover:bg-[#006600] transition-colors border border-white/5 shadow-lg">
                <LogOut size={20} />
              </button>
            </div>
          </div>

          {/* 2. SESSION CARD (DARK GREEN + WHITE BADGE) */}
          <div className="bg-[#003300] rounded-3xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden border border-white/5 shadow-xl">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-green-500 uppercase tracking-widest mb-1">Current Session</p>
              <h2 className="text-xl md:text-2xl font-bold text-white">EXAMFORGE SESSION 2026</h2>
            </div>
            <div className="relative z-10">
              <div className="bg-white px-6 py-2.5 rounded-full flex items-center gap-2 shadow-md">
                <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></div>
                <span className="text-[#003300] text-xs font-black uppercase tracking-wider">Active</span>
              </div>
            </div>
          </div>

        </div>
      </header>

      {/* === BODY CONTENT === */}
      <div className="max-w-5xl mx-auto px-6 relative z-20 -mt-12">
        
        {/* 3. DISCLAIMER CARD (BEIGE/ORANGE) */}
        <div className="bg-[#FFF9F0] rounded-3xl p-5 shadow-xl shadow-black/5 flex items-center justify-between mb-10 cursor-pointer hover:bg-[#fff5e6] transition-colors border border-orange-50">
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

        {/* 4. COURSE GRID */}
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
                  onSelect={setSelectedCourse} 
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
