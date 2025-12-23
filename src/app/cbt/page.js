"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, BookOpen, ArrowRight, GraduationCap } from "lucide-react";

export default function StudentLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", matric: "", department: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/cbt/auth/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // Save student info to session
        sessionStorage.setItem("cbt_student", JSON.stringify(data.student));
        router.push("/cbt/dashboard");
      } else {
        alert(data.error || "Login failed");
      }
    } catch (err) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f0fdf4]">
      
      {/* Official Header */}
      <div className="text-center mb-8">
        <div className="inline-flex p-4 bg-white rounded-full shadow-md mb-4 border-2 border-green-600">
          <GraduationCap size={40} className="text-green-700" />
        </div>
        <h1 className="text-2xl font-black text-green-900 uppercase tracking-wide">FUOYE CBT Simulator</h1>
        <p className="text-sm text-green-700 font-medium mt-1">Federal University Oye-Ekiti</p>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-xl border-t-8 border-green-600">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Student Login</h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                required
                placeholder="Surname Firstname"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition-all"
                value={form.name}
                onChange={(e) => setForm({...form, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Matric Number</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-gray-400" size={18} />
              <input 
                type="text" 
                required
                placeholder="FUOYE/20/..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded focus:border-green-600 focus:ring-1 focus:ring-green-600 outline-none transition-all uppercase"
                value={form.matric}
                onChange={(e) => setForm({...form, matric: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Department</label>
            <select 
              className="w-full px-4 py-3 border border-gray-300 rounded focus:border-green-600 outline-none bg-white"
              value={form.department}
              onChange={(e) => setForm({...form, department: e.target.value})}
              required
            >
              <option value="">Select Department</option>
              <option value="English & Literary Studies">English & Literary Studies</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Mass Communication">Mass Communication</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? "Authenticating..." : "Proceed to Exam"} <ArrowRight size={18} />
          </button>

        </form>
      </div>

      <p className="mt-8 text-xs text-green-800 font-medium opacity-60">
        &copy; 2025 FUOYE CBT System • Powered by Bolu Adeoye
      </p>

    </main>
  );
}
