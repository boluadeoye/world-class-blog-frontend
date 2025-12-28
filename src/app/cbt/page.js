"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { 
  User, Mail, Lock, ArrowRight, GraduationCap, Eye, EyeOff, 
  CheckCircle, Loader2, Building2, BookOpen, AlertTriangle, 
  XCircle, Search, PlusCircle, ChevronDown 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_DEPARTMENTS = [
  "Accounting", "Agriculture", "Anatomy", "Architecture", "Biochemistry", 
  "Business Administration", "Civil Engineering", "Computer Science", 
  "Criminology and Security Studies", "Economics", "English and Literary Studies", 
  "History and International Studies", "Law", "Mass Communication", 
  "Mechanical Engineering", "Microbiology", "Nursing Science", "Pharmacy", 
  "Political Science", "Psychology", "Sociology", "Theatre and Media Arts"
].sort();

/* === CUSTOM SEARCHABLE SELECTOR === */
function DepartmentSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value || "");
  const wrapperRef = useRef(null);

  const filtered = INITIAL_DEPARTMENTS.filter(d => 
    d.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showCustomOption = searchTerm.length > 0 && !INITIAL_DEPARTMENTS.includes(searchTerm);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative group" ref={wrapperRef}>
      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Department</label>
      <div className="relative flex items-center">
        <BookOpen className={`absolute left-4 transition-colors ${isOpen ? 'text-green-600' : 'text-slate-400'}`} size={18} />
        <input 
          type="text"
          placeholder="Search or type department..."
          className="w-full pl-11 pr-10 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all font-bold text-slate-800 placeholder-slate-400 text-sm"
          value={searchTerm}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            onChange(e.target.value);
            setIsOpen(true);
          }}
        />
        <ChevronDown className={`absolute right-4 text-slate-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={18} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-[150] w-full mt-2 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-2xl shadow-2xl max-h-60 overflow-y-auto custom-scrollbar p-2"
          >
            {filtered.map((dept) => (
              <button
                key={dept}
                type="button"
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-bold text-slate-700 hover:bg-green-600 hover:text-white transition-all flex items-center justify-between group/item"
                onClick={() => {
                  setSearchTerm(dept);
                  onChange(dept);
                  setIsOpen(false);
                }}
              >
                {dept}
                <CheckCircle size={14} className="opacity-0 group-hover/item:opacity-100" />
              </button>
            ))}
            
            {showCustomOption && (
              <button
                type="button"
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-black text-green-700 bg-green-50 border border-green-100 mt-1 flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <PlusCircle size={16} />
                Use: "{searchTerm}"
              </button>
            )}

            {filtered.length === 0 && !showCustomOption && (
              <div className="p-4 text-center text-xs font-bold text-slate-400 uppercase italic">
                Type to add manually
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* === MODALS === */
function WelcomeModal({ name, isLogin }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-600"></div>
        <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce"><CheckCircle size={40} className="text-green-600" /></div>
        <h2 className="text-2xl font-black text-gray-900 mb-2">{isLogin ? "Welcome Back!" : "Welcome to the Portal!"}</h2>
        <p className="text-gray-500 font-medium mb-6">{isLogin ? "Resuming session for" : "Account successfully created for"} <br/><span className="text-green-700 font-bold text-lg">{name}</span></p>
        <div className="flex justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest"><Loader2 size={14} className="animate-spin" /> Initializing HQ</div>
      </motion.div>
    </div>
  );
}

function StatusModal({ type, message, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden">
        <div className={`p-6 flex flex-col items-center text-center ${type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{type === 'error' ? <XCircle size={32} /> : <CheckCircle size={32} />}</div>
          <h3 className={`font-black text-lg uppercase mb-2 ${type === 'error' ? 'text-red-900' : 'text-green-900'}`}>{type === 'error' ? 'Access Denied' : 'Success'}</h3>
          <p className="text-gray-600 text-xs font-medium leading-relaxed mb-6">{message}</p>
          <button onClick={onClose} className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg text-white ${type === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-700 hover:bg-green-800'}`}>Try Again</button>
        </div>
      </motion.div>
    </div>
  );
}

function ConsentModal({ onAccept, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        <div className="bg-orange-50 p-6 border-b border-orange-100 flex items-center gap-3">
          <div className="bg-orange-100 p-2 rounded-full text-orange-600"><AlertTriangle size={24} /></div>
          <h3 className="font-black text-lg text-orange-900 uppercase tracking-tight">Strict Protocol</h3>
        </div>
        <div className="p-6 space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>By proceeding, you acknowledge and agree to the following:</p>
          <ul className="list-disc pl-5 space-y-2 font-medium text-gray-800">
            <li>This mock exam is for <strong>psychological preparation</strong> and time management practice.</li>
            <li>It is <strong>NOT</strong> an "expo" or a leak of real examination questions.</li>
            <li>Success here builds resilience but does not guarantee specific outcomes in the main exam.</li>
          </ul>
        </div>
        <div className="p-6 bg-gray-50 flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition-colors">Decline</button>
          <button onClick={onAccept} className="flex-1 py-3 bg-green-700 text-white font-black rounded-xl shadow-lg hover:bg-green-800 transition-transform active:scale-95">I ACCEPT</button>
        </div>
      </motion.div>
    </div>
  );
}

export default function StudentLogin() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "", department: "", level: "100" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  const [statusModal, setStatusModal] = useState({ show: false, type: 'error', message: '' });
  const [showWelcome, setShowWelcome] = useState(false);

  const handleAuthClick = (e) => {
    e.preventDefault();
    if (!isLogin) { setShowConsent(true); } else { submitForm(); }
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      const res = await fetch(isLogin ? "/api/cbt/auth/student" : "/api/cbt/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem("cbt_student", JSON.stringify(data.student));
        setShowWelcome(true);
        setTimeout(() => router.push("/cbt/dashboard"), 2000);
      } else {
        setStatusModal({ show: true, type: 'error', message: data.error || "Authentication failed." });
        setLoading(false);
      }
    } catch (err) {
      setStatusModal({ show: true, type: 'error', message: "Network connection error." });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f0fdf4] font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <AnimatePresence>
        {showWelcome && <WelcomeModal name={form.name || "Student"} isLogin={isLogin} />}
        {showConsent && <ConsentModal onAccept={() => { setShowConsent(false); submitForm(); }} onCancel={() => setShowConsent(false)} />}
        {statusModal.show && <StatusModal type={statusModal.type} message={statusModal.message} onClose={() => setStatusModal({ ...statusModal, show: false })} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-white rounded-2xl shadow-xl shadow-green-900/5 mb-4 border border-green-50"><GraduationCap size={40} className="text-green-700" /></div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1 uppercase leading-none">FUOYE CBT <span className="text-green-700">2026</span></h1>
          <p className="text-slate-500 font-bold text-xs tracking-widest uppercase mt-2">Mock Examination Portal</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
          <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${isLogin ? 'bg-white text-green-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Login</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${!isLogin ? 'bg-white text-green-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Register</button>
          </div>

          <form onSubmit={handleAuthClick} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-visible space-y-5">
                  <div className="relative group">
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <div className="relative flex items-center">
                      <User className="absolute left-4 text-slate-400 group-focus-within:text-green-600 transition-colors" size={18} />
                      <input required placeholder="Surname Firstname" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-green-500 outline-none transition-all" onChange={(e) => setForm({...form, name: e.target.value})} />
                    </div>
                  </div>
                  
                  <DepartmentSelector value={form.department} onChange={(val) => setForm({...form, department: val})} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 text-slate-400 group-focus-within:text-green-600 transition-colors" size={18} />
                <input required type="email" placeholder="you@example.com" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-green-500 outline-none transition-all" onChange={(e) => setForm({...form, email: e.target.value})} />
              </div>
            </div>

            <div className="relative group">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Password</label>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 text-slate-400 group-focus-within:text-green-600 transition-colors" size={18} />
                <input required type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:bg-white focus:border-green-500 outline-none transition-all" onChange={(e) => setForm({...form, password: e.target.value})} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button disabled={loading} className="w-full bg-green-800 hover:bg-green-900 text-white font-black py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2 mt-6 uppercase tracking-widest text-xs">
              {loading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? "Access Portal" : "Create Account")}
              {!loading && <ArrowRight size={16} />}
            </button>
          </form>
        </div>
        <div className="mt-8 text-center opacity-40"><p className="text-[10px] font-black uppercase tracking-[0.3em]">Engineered by Bolu Adeoye</p></div>
      </motion.div>
    </main>
  );
}
