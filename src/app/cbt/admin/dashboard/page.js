"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, BookOpen, LogOut, Clock, ArrowRight, 
  Grid, AlertTriangle, CheckCircle, Activity, 
  Settings, Layers 
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ code: "", title: "", level: "100", duration: "15" });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  // 1. Fetch Courses with Data Structure Fix
  async function fetchCourses() {
    try {
      const res = await fetch("/api/cbt/courses");
      const data = await res.json();
      
      // CRITICAL FIX: Handle object { courses: [] } or raw array []
      const courseList = Array.isArray(data) ? data : (data.courses || []);
      setCourses(courseList);
    } catch (e) {
      console.error("Fetch Error:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!sessionStorage.getItem("cbt_admin_token")) {
      router.push("/cbt/admin");
    } else {
      fetchCourses();
    }
  }, [router]);

  // 2. Create Course Logic
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.title) return;
    setCreating(true);

    try {
      const res = await fetch("/api/cbt/courses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCourse),
      });

      if (res.ok) {
        setNewCourse({ code: "", title: "", level: "100", duration: "15" });
        await fetchCourses();
      } else {
        alert("Failed to create course.");
      }
    } catch (err) {
      alert("Network Error.");
    } finally {
      setCreating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_admin_token");
    router.push("/cbt/admin");
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white text-[#004d00] font-black text-xs uppercase tracking-[0.3em] animate-pulse">
      Initialising Command Center...
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfdfc] font-sans text-gray-900 pb-20">
      
      {/* === EXECUTIVE ADMIN HEADER === */}
      <header className="bg-[#004d00] text-white pt-8 pb-16 px-6 rounded-b-[40px] shadow-2xl relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
              <Grid size={28} className="text-green-300" />
            </div>
            <div>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">Administrator HQ</p>
              <h1 className="text-xl font-black leading-none tracking-tight">COMMAND CENTER</h1>
            </div>
          </div>
          
          <button onClick={handleLogout} className="bg-red-500/20 p-3 rounded-xl border border-red-500/30 text-red-100 hover:bg-red-600 hover:border-red-600 transition-all shadow-lg">
            <LogOut size={20} />
          </button>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <p className="text-[9px] font-bold text-green-400 uppercase mb-1">Total Courses</p>
            <p className="text-xl font-black">{courses.length}</p>
          </div>
          <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <p className="text-[9px] font-bold text-green-400 uppercase mb-1">Admin Status</p>
            <p className="text-sm font-black flex items-center gap-1.5"><Activity size={12}/> ACTIVE</p>
          </div>
          <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center flex flex-col items-center justify-center">
             <Settings size={18} className="opacity-50" />
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 -mt-8 relative z-20 space-y-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* === LEFT: CREATE COURSE FORM === */}
          <div className="bg-white p-6 rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 h-fit sticky top-24">
            <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Plus size={18} className="text-green-700" /> New Deployment
            </h2>
            
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Course Code</label>
                <input 
                  type="text" 
                  placeholder="e.g. GST 101" 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-600 outline-none font-bold text-gray-800 transition-all"
                  value={newCourse.code} 
                  onChange={(e) => setNewCourse({...newCourse, code: e.target.value})} 
                  required 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Logic & Philosophy" 
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-600 outline-none font-bold text-gray-800 transition-all"
                  value={newCourse.title} 
                  onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} 
                  required 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Level</label>
                  <select 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-700 outline-none"
                    value={newCourse.level} 
                    onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                  >
                    <option value="100">100L</option>
                    <option value="200">200L</option>
                    <option value="300">300L</option>
                    <option value="400">400L</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Minutes</label>
                  <input 
                    type="number" 
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-800 outline-none"
                    value={newCourse.duration} 
                    onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})} 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={creating}
                className="w-full bg-[#004d00] hover:bg-black text-white font-black py-4 rounded-2xl shadow-xl transition-all active:scale-95 text-xs uppercase tracking-widest mt-4"
              >
                {creating ? "Deploying..." : "Initialise Course"}
              </button>
            </form>
          </div>

          {/* === RIGHT: COURSE DATABASE === */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Layers size={18} className="text-[#004d00]" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Question Repository</h2>
            </div>

            {courses.length === 0 ? (
              <div className="bg-white p-12 rounded-[2rem] border-2 border-dashed border-gray-100 text-center">
                <AlertTriangle size={40} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold text-sm">Empty Repository</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {courses.map((course) => (
                  <Link 
                    key={course.id} 
                    href={`/cbt/admin/course/${course.id}`} 
                    className="group bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 hover:border-green-600 hover:shadow-xl transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#004d00] font-black text-sm border border-green-100 group-hover:bg-green-600 group-hover:text-white transition-colors">
                          {course.code.slice(0,3)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[9px] font-black bg-gray-900 text-white px-2 py-0.5 rounded tracking-tighter uppercase">{course.code}</span>
                            <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{course.level} LEVEL</span>
                          </div>
                          <h3 className="font-black text-gray-900 text-sm group-hover:text-green-800 transition-colors uppercase tracking-tight">{course.title}</h3>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right hidden sm:block">
                           <p className="text-[9px] font-black text-gray-300 uppercase">Limit</p>
                           <p className="text-xs font-black text-gray-700">{course.duration}m</p>
                        </div>
                        <div className="bg-gray-50 p-2 rounded-xl group-hover:bg-green-50 group-hover:text-green-700 transition-colors">
                          <ArrowRight size={18} className="text-gray-300 group-hover:text-green-600" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* Subtle Admin Footer */}
      <div className="mt-20 text-center opacity-30">
        <p className="text-[9px] font-black uppercase tracking-[0.4em]">Engineered by Bolu Adeoye • FUOYE CBT Admin</p>
      </div>

    </main>
  );
}
