"use client";
import { useState, useEffect } from "react";
import { Plus, BookOpen, LogOut, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ code: "", title: "", level: "100" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // 1. Load Courses
  async function fetchCourses() {
    const res = await fetch("/api/cbt/courses");
    if (res.ok) {
      setCourses(await res.json());
    }
    setLoading(false);
  }

  useEffect(() => {
    // Basic Auth Check
    if (!sessionStorage.getItem("cbt_admin_token")) {
      router.push("/cbt/admin");
    } else {
      fetchCourses();
    }
  }, []);

  // 2. Create Course
  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCourse.code || !newCourse.title) return;

    const res = await fetch("/api/cbt/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCourse),
    });

    if (res.ok) {
      setNewCourse({ code: "", title: "", level: "100" });
      fetchCourses(); // Refresh list
    } else {
      alert("Failed to create course. Code might already exist.");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("cbt_admin_token");
    router.push("/cbt/admin");
  };

  return (
    <main className="min-h-screen bg-gray-50 p-6 font-sans text-gray-900">
      
      {/* Header */}
      <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-700">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-xs text-gray-500">FUOYE CBT Simulator</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 font-bold">
          <LogOut size={16} /> Logout
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT: Create Course Form */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Plus size={20} className="text-green-700" /> Add New Course
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Course Code</label>
              <input 
                type="text" 
                placeholder="e.g. ELS 101" 
                className="w-full p-3 border border-gray-300 rounded focus:border-green-600 outline-none font-mono uppercase"
                value={newCourse.code}
                onChange={(e) => setNewCourse({...newCourse, code: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Course Title</label>
              <input 
                type="text" 
                placeholder="e.g. Introduction to Poetry" 
                className="w-full p-3 border border-gray-300 rounded focus:border-green-600 outline-none"
                value={newCourse.title}
                onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase mb-1">Level</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded focus:border-green-600 outline-none bg-white"
                value={newCourse.level}
                onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
              >
                <option value="100">100 Level</option>
                <option value="200">200 Level</option>
              </select>
            </div>
            <button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded transition-colors">
              Create Course
            </button>
          </form>
        </div>

        {/* RIGHT: Course List */}
        <div className="lg:col-span-2">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <BookOpen size={20} className="text-gray-700" /> Available Courses
          </h2>
          
          {loading ? (
            <p className="text-gray-500">Loading database...</p>
          ) : courses.length === 0 ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center border border-dashed border-gray-300">
              <p className="text-gray-400">No courses found. Create one to start.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {courses.map((course) => (
                <Link 
                  key={course.id} 
                  href={`/cbt/admin/course/${course.id}`}
                  className="block bg-white p-5 rounded-lg shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-md transition-all group"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded border border-green-200">
                          {course.code}
                        </span>
                        <span className="text-xs text-gray-500 font-bold">{course.level}L</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 group-hover:text-green-700 transition-colors">
                        {course.title}
                      </h3>
                    </div>
                    <div className="text-gray-400 group-hover:text-green-600">
                      Manage Questions →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
