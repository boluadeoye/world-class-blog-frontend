"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentLogin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true); // Toggle State
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/cbt/auth/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          mode: isLogin ? 'login' : 'register',
          ...form 
        }),
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
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-white rounded-2xl shadow-xl shadow-green-900/5 mb-4 border border-green-100">
            <GraduationCap size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">FUOYE CBT</h1>
          <p className="text-gray-500 font-medium text-sm">Secure Examination Portal</p>
        </div>

        {/* Smart Card */}
        <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-2xl shadow-green-900/10 border border-white/50">
          
          {/* Toggle Switch */}
          <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Input (Register Only) */}
            {!isLogin && (
              <div className="group animate-in fade-in slide-in-from-top-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Full Name</label>
                <div className="relative flex items-center">
                  <User className="absolute left-4 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    required={!isLogin}
                    placeholder="Surname Firstname"
                    className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-gray-800"
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-gray-800"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="group">
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 ml-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-gray-800"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                />
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
                <span className="animate-pulse">Processing...</span>
              ) : (
                <>
                  {isLogin ? "Access Portal" : "Create Account"} 
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>

          </form>
        </div>
      </motion.div>

    </main>
  );
}
