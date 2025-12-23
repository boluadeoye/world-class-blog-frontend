"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, ArrowRight, GraduationCap, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", department: "" });
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
        sessionStorage.setItem("cbt_student", JSON.stringify(data.student));
        router.push("/cbt/dashboard");
      } else {
        alert(data.error || "Access failed");
        setLoading(false);
      }
    } catch (err) {
      alert("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-green-50 via-white to-green-50 font-sans">
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex p-4 bg-white rounded-2xl shadow-xl shadow-green-900/5 mb-4 border border-green-100"
          >
            <GraduationCap size={32} className="text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">FUOYE CBT</h1>
          <p className="text-gray-500 font-medium">Mock Exam Portal • 2025 Session</p>
        </div>

        {/* Smart Card */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-green-900/10 border border-white/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Input */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
              <div className="relative flex items-center">
                <User className="absolute left-4 text-gray-400 group-focus-within:text-green-600 transition-colors" size={18} />
                <input 
                  type="text" 
                  required
                  placeholder="Surname Firstname"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                />
              </div>
            </div>

            {/* Email Input (Replaces Matric) */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-gray-400 group-focus-within:text-green-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            {/* Department Select */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Department</label>
              <div className="relative">
                <select 
                  className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-gray-800 appearance-none cursor-pointer"
                  value={form.department}
                  onChange={(e) => setForm({...form, department: e.target.value})}
                  required
                >
                  <option value="">Select Department...</option>
                  <option value="English & Literary Studies">English & Literary Studies</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Mass Communication">Mass Communication</option>
                  <option value="Other">Other</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-600/20 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <span className="animate-pulse">Verifying...</span>
              ) : (
                <>Start Assessment <ArrowRight size={18} /></>
              )}
            </motion.button>

          </form>
        </div>

        <p className="mt-8 text-center text-xs text-gray-400 font-medium">
          Powered by Bolu Adeoye • Excellence in Engineering
        </p>
      </motion.div>

    </main>
  );
}
