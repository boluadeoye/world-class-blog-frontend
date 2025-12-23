"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, GraduationCap, ShieldCheck, AlertCircle, Fingerprint } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CBTAuth() {
  const router = useRouter();
  const [mode, setMode] = useState("login"); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [form, setForm] = useState({
    name: "",
    email: "", // Acts as Username/Email for login
    username: "",
    password: "",
    department: "General Studies"
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/cbt/auth/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: mode, ...form }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.setItem("cbt_student", JSON.stringify(data.student));
        router.push("/cbt/dashboard");
      } else {
        setError(data.error);
        setLoading(false);
      }
    } catch (err) {
      setError("Network Connection Failed.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col lg:flex-row bg-gray-50 font-sans overflow-hidden">
      
      {/* === LEFT: THE INFO PANEL (Live Instructions) === */}
      <div className="lg:w-1/2 bg-green-900 text-white p-8 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/20 blur-[100px] rounded-full"></div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-800 border border-green-700 text-green-300 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} /> Official Portal
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            {mode === 'login' ? "Welcome Back." : "Join the Elite."}
          </h1>
          <p className="text-green-200 text-lg leading-relaxed max-w-md">
            {mode === 'login' 
              ? "Enter your credentials to access the secure exam environment. Ensure your biometric data is accurate." 
              : "Create your secure profile. This identity will track your performance across all mock exams."}
          </p>
        </div>

        <div className="relative z-10 mt-12 lg:mt-0">
          <div className="bg-green-800/50 backdrop-blur-md p-6 rounded-xl border border-green-700/50">
            <h3 className="font-bold text-green-100 mb-2 flex items-center gap-2">
              <AlertCircle size={18} /> System Status
            </h3>
            <ul className="space-y-2 text-sm text-green-200">
              <li className="flex items-center gap-2">✓ Server Online</li>
              <li className="flex items-center gap-2">✓ Database Secure</li>
              <li className="flex items-center gap-2">✓ v3.0.1 Stable</li>
            </ul>
          </div>
        </div>
      </div>

      {/* === RIGHT: THE FORM === */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          
          <div className="flex justify-center mb-8">
            <div className="bg-white p-1 rounded-full shadow-sm border border-gray-200 flex">
              <button 
                onClick={() => setMode("login")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'login' ? 'bg-green-700 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setMode("register")}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === 'register' ? 'bg-green-700 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Register
              </button>
            </div>
          </div>

          <motion.div 
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
          >
            <h2 className="text-2xl font-black text-gray-900 mb-1">
              {mode === 'login' ? "Authenticate" : "Create Account"}
            </h2>
            <p className="text-sm text-gray-500 mb-6">Enter your details below.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {mode === 'register' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input 
                        type="text" required placeholder="Surname Firstname"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all font-medium"
                        value={form.name} onChange={(e) => setForm({...form, name: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Username</label>
                    <div className="relative">
                      <Fingerprint className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input 
                        type="text" required placeholder="Unique ID (e.g. bolu_dev)"
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all font-medium"
                        value={form.username} onChange={(e) => setForm({...form, username: e.target.value})}
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">
                  {mode === 'login' ? "Email or Username" : "Email Address"}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="text" required placeholder="student@fuoye.edu.ng"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all font-medium"
                    value={form.email} onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={18} />
                  <input 
                    type="password" required placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-100 outline-none transition-all font-medium"
                    value={form.password} onChange={(e) => setForm({...form, password: e.target.value})}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-xs font-bold rounded-lg flex items-center gap-2">
                  <AlertCircle size={16} /> {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-lg shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? "Processing..." : (mode === 'login' ? "Access Portal" : "Register Identity")} 
                {!loading && <ArrowRight size={18} />}
              </button>

            </form>
          </motion.div>
        </div>
      </div>

    </main>
  );
}
