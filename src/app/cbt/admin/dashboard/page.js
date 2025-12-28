"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  Plus, BookOpen, LogOut, Clock, ArrowRight, 
  Grid, AlertTriangle, Activity, 
  Settings, Layers, ChevronDown, X, Trash2, RefreshCcw, ShieldAlert
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ code: "", title: "", level: "100", duration: "15" });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  async function fetchCourses() {
    try {
      const res = await fetch("/api/cbt/courses");
      const data = await res.json();
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
        setShowForm(false);
        await fetchCourses();
      }
    } catch (err) {
      alert("Network Error.");
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteCourse = async (id, code) => {
    const confirmed = confirm(`DANGER: Delete ${code} and all its data?`);
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/cbt/courses?id=${id}`, { method: 'DELETE' });
      if (res.ok) await fetchCourses();
    } catch (e) { alert("Delete failed."); }
  };

  const handleResetLeaderboard = async () => {
    const firstCheck = confirm("CRITICAL: You are about to wipe the ENTIRE Leaderboard. All student scores will be deleted. Proceed?");
    if (!firstCheck) return;
    
    const secondCheck = confirm("FINAL WARNING: This action is irreversible. Are you absolutely sure?");
    if (!secondCheck) return;

    setIsResetting(true);
    try {
      const res = await fetch('/api/cbt/leaderboard', { method: 'DELETE' });
      if (res.ok) {
        alert("Leaderboard Reset Successful.");
      } else {
        alert("Reset Failed.");
      }
    } catch (e) {
      alert("Connection Error.");
    } finally {
      setIsResetting(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_admin_token");
    router.push("/cbt/admin");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-black text-green-500 font-mono uppercase tracking-widest animate-pulse">Booting Admin_OS...</div>;

  return (
    <main className="min-h-screen bg-[#020202] text-gray-300 font-sans selection:bg-green-500/30">
      {/* Header */}
      <header className="bg-[#004d00] text-white pt-8 pb-20 px-6 rounded-b-[40px] shadow-2xl relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
              <Grid size={24} className="text-green-300" />
            </div>
            <div>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">System Administrator</p>
              <h1 className="text-xl font-black leading-none tracking-tight">COMMAND CENTER</h1>
            </div>
          </div>
          <button onClick={handleLogout} className="bg-red-500/20 p-3 rounded-xl border border-red-500/30 text-red-100 hover:bg-red-600 transition-all shadow-lg">
            <LogOut size={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <p className="text-[9px] font-bold text-green-400 uppercase mb-1">Courses</p>
            <p className="text-xl font-black">{courses.length}</p>
          </div>
          <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <p className="text-[9px] font-bold text-green-400 uppercase mb-1">Status</p>
            <p className="text-[10px] font-black flex items-center gap-1"><Activity size={10}/> ONLINE</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} className="bg-yellow-400 text-black rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform">
            {showForm ? <X size={20} /> : <Plus size={20} />}
            <p className="text-[8px] font-black uppercase mt-1">Deploy</p>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 space-y-8">
        
        {/* Quick Actions Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl flex items-center justify-between group hover:border-red-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500">
                  <RefreshCcw size={24} className={isResetting ? "animate-spin" : ""} />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">Reset Leaderboard</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Wipe all student results</p>
                </div>
              </div>
              <button 
                onClick={handleResetLeaderboard}
                disabled={isResetting}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg disabled:opacity-50"
              >
                Execute
              </button>
           </div>

           <div className="bg-white/[0.03] border border-white/10 p-6 rounded-[2rem] backdrop-blur-xl flex items-center justify-between group hover:border-blue-500/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                  <ShieldAlert size={24} />
                </div>
                <div>
                  <h3 className="font-black text-white text-sm uppercase tracking-widest">System Audit</h3>
                  <p className="text-[10px] text-gray-500 font-bold uppercase">Check DB Integrity</p>
                </div>
              </div>
              <Link href="/api/cbt/fix-db" target="_blank" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">
                Run
              </Link>
           </div>
        </section>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Deployment Card */}
          <div className={`${showForm ? 'flex' : 'hidden'} lg:flex flex-col w-full lg:w-[350px] bg-white p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 h-fit lg:sticky lg:top-6`}>
            <h2 className="text-xs font-black text-gray-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-2"><Plus size={16} className="text-green-700" /> New Deployment</h2>
            <form onSubmit={handleCreate} className="space-y-5">
              <input type="text" placeholder="Course Code" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-600 outline-none font-bold text-sm text-gray-800" value={newCourse.code} onChange={(e) => setNewCourse({...newCourse, code: e.target.value})} required />
              <input type="text" placeholder="Course Title" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-green-600 outline-none font-bold text-sm text-gray-800" value={newCourse.title} onChange={(e) => setNewCourse({...newCourse, title: e.target.value})} required />
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-xs text-gray-700 outline-none" value={newCourse.level} onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}>
                  <option value="100">100L</option><option value="200">200L</option><option value="300">300L</option>
                </select>
                <input type="number" className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-sm text-gray-800" value={newCourse.duration} onChange={(e) => setNewCourse({...newCourse, duration: e.target.value})} />
              </div>
              <button type="submit" disabled={creating} className="w-full bg-[#004d00] text-white font-black py-4 rounded-2xl shadow-xl text-[10px] uppercase tracking-[0.2em]">{creating ? "Deploying..." : "Initialise Course"}</button>
            </form>
          </div>

          {/* Repository */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2"><Layers size={18} className="text-green-500" /><h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">Question Repository</h2></div>
            </div>
            <div className="grid gap-4">
              {courses.map((course) => (
                <div key={course.id} className="group bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 hover:border-green-600 transition-all">
                  <div className="flex justify-between items-center">
                    <Link href={`/cbt/admin/course/${course.id}`} className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-[#004d00] font-black text-xs border border-green-100">{course.code.slice(0,3)}</div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[8px] font-black bg-gray-900 text-white px-2 py-0.5 rounded uppercase">{course.code}</span>
                          <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest">{course.level}L</span>
                        </div>
                        <h3 className="font-black text-gray-900 text-sm uppercase tracking-tight">{course.title}</h3>
                      </div>
                    </Link>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleDeleteCourse(course.id, course.code)} className="p-3 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={18} /></button>
                      <Link href={`/cbt/admin/course/${course.id}`} className="bg-gray-50 p-3 rounded-xl hover:bg-green-50 hover:text-green-700 transition-colors"><ArrowRight size={18} /></Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
