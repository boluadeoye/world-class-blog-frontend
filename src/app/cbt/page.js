"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, GraduationCap, Eye, EyeOff, CheckCircle, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* === WELCOME MODAL COMPONENT === */
function WelcomeModal({ name, isLogin }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl border border-white/20 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
        
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <CheckCircle size={32} className="text-green-600" />
          </motion.div>
        </div>
        
        <h2 className="text-2xl font-black text-gray-900 mb-2">
          {isLogin ? "Welcome Back!" : "Account Created!"}
        </h2>
        <p className="text-gray-500 font-medium mb-6">
          {isLogin ? "Resuming session for" : "Setting up profile for"} <br/>
          <span className="text-green-700 font-bold">{name}</span>
        </p>

        <div className="flex justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
          <Loader2 size={14} className="animate-spin" /> Redirecting to Dashboard
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function StudentLogin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

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
        // Show Welcome Animation
        setShowWelcome(true);
        // Delay redirect to let them see the beauty
        setTimeout(() => {
          router.push("/cbt/dashboard");
        }, 2500);
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
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#f8fafc] font-sans relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-200/30 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-200/30 rounded-full blur-[100px] pointer-events-none"></div>

      <AnimatePresence>
        {showWelcome && <WelcomeModal name={form.name || "Student"} isLogin={isLogin} />}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-white rounded-2xl shadow-xl shadow-green-900/5 mb-4 border border-green-50">
            <GraduationCap size={36} className="text-green-700" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1">FUOYE CBT</h1>
          <p className="text-slate-500 font-medium text-sm">Secure Examination Portal</p>
        </div>

        {/* Smart Card */}
        <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white">
          
          {/* Toggle Switch */}
          <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${isLogin ? 'bg-white text-green-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Login
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${!isLogin ? 'bg-white text-green-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Input (Register Only) */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="group mb-5">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-4 text-slate-400 group-focus-within:text-green-600 transition-colors" size={18} />
                      <input 
                        type="text" 
                        required={!isLogin}
                        placeholder="Surname Firstname"
                        className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                        value={form.name}
                        onChange={(e) => setForm({...form, name: e.target.value})}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input */}
            <div className="group">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-slate-400 group-focus-within:text-green-600 transition-colors" size={18} />
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            {/* Password Input (With Eye Toggle) */}
            <div className="group">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 ml-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-slate-400 group-focus-within:text-green-600 transition-colors" size={18} />
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-medium text-slate-800 placeholder-slate-400"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Action Button */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={loading}
              className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-700/20 transition-all flex items-center justify-center gap-2 mt-4"
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
        
        <div className="mt-8 flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Subtle branding footer */}
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Secure • Fast • Reliable</p>
        </div>
      </motion.div>

    </main>
  );
}
