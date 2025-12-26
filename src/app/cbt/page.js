"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, GraduationCap, Eye, EyeOff, CheckCircle, Loader2, Building2, BookOpen, AlertTriangle, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* === FUOYE DEPARTMENTS === */
const DEPARTMENTS = [
  "Accounting", "Adult Education", "Agricultural & Bio-resources Engineering", "Agricultural Economics & Extension",
  "Agriculture", "Anatomy", "Animal & Environmental Biology", "Animal Production & Health",
  "Architecture", "Banking and Finance", "Biochemistry", "Building", "Business Administration",
  "Chemistry", "Civil Engineering", "Computer Engineering", "Computer Science",
  "Criminology and Security Studies", "Crop Science and Horticulture", "Demography and Social Statistics",
  "Economics", "Educational Management", "Educational Technology", "Electrical & Electronics Engineering",
  "English and Literary Studies", "Estate Management", "Fisheries and Aquaculture",
  "Food Science and Technology", "Geology", "Guidance and Counseling",
  "History and International Studies", "Hospitality and Tourism Management", "Human Kinetics",
  "Industrial Chemistry", "Library and Information Science", "Linguistics and Languages",
  "Mass Communication", "Mathematics", "Mechanical Engineering", "Mechatronics Engineering",
  "Medical Laboratory Science", "Metallurgical and Materials Engineering", "Microbiology",
  "Nursing Science", "Peace and Conflict Studies", "Pharmacy", "Physics", "Physiology",
  "Plant Science and Biotechnology", "Political Science", "Psychology", "Public Administration",
  "Quantity Surveying", "Radiography", "Religious Studies", "Science Education",
  "Sociology", "Soil Science and Land Resources Management", "Statistics", "Surveying and Geoinformatics",
  "Theatre and Media Arts", "Urban and Regional Planning", "Water Resources Management and Agrometeorology"
];

/* === STATUS MODAL (Error/Success) === */
function StatusModal({ type, message, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden"
      >
        <div className={`p-6 flex flex-col items-center text-center ${type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}>
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {type === 'error' ? <XCircle size={32} /> : <CheckCircle size={32} />}
          </div>
          <h3 className={`font-black text-lg uppercase mb-2 ${type === 'error' ? 'text-red-900' : 'text-green-900'}`}>
            {type === 'error' ? 'Access Denied' : 'Success'}
          </h3>
          <p className="text-gray-600 text-xs font-medium leading-relaxed mb-6">{message}</p>
          <button 
            onClick={onClose} 
            className={`w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg transition-transform active:scale-95 text-white ${type === 'error' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-700 hover:bg-green-800'}`}
          >
            {type === 'error' ? 'Try Again' : 'Proceed'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* === CONSENT MODAL === */
function ConsentModal({ onAccept, onCancel }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }} 
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl"
      >
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
  
  // Status Modal State
  const [statusModal, setStatusModal] = useState({ show: false, type: 'error', message: '' });

  const handleRegisterClick = (e) => {
    e.preventDefault();
    if (!isLogin) {
      setShowConsent(true);
    } else {
      submitForm();
    }
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
        router.push("/cbt/dashboard");
      } else {
        setStatusModal({ show: true, type: 'error', message: data.error || "Authentication failed." });
        setLoading(false);
      }
    } catch (err) {
      setStatusModal({ show: true, type: 'error', message: "Network connection error. Please check your internet." });
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f0fdf4] font-sans relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-green-200/20 rounded-full blur-[100px] pointer-events-none"></div>
      
      <AnimatePresence>
        {showConsent && <ConsentModal onAccept={() => { setShowConsent(false); submitForm(); }} onCancel={() => setShowConsent(false)} />}
        {statusModal.show && <StatusModal type={statusModal.type} message={statusModal.message} onClose={() => setStatusModal({ ...statusModal, show: false })} />}
      </AnimatePresence>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative z-10">
        
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-white rounded-2xl shadow-xl shadow-green-900/5 mb-4 border border-green-50">
            <GraduationCap size={40} className="text-green-700" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-1 uppercase leading-none">
            FUOYE CBT <span className="text-green-700">2026</span>
          </h1>
          <p className="text-slate-500 font-bold text-xs tracking-widest uppercase mt-2">Mock Examination Portal</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white relative overflow-hidden">
          
          <div className="flex bg-slate-100 p-1.5 rounded-xl mb-8">
            <button onClick={() => setIsLogin(true)} className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${isLogin ? 'bg-white text-green-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Login</button>
            <button onClick={() => setIsLogin(false)} className={`flex-1 py-3 text-xs font-black uppercase tracking-wider rounded-lg transition-all ${!isLogin ? 'bg-white text-green-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>Register</button>
          </div>

          <form onSubmit={handleRegisterClick} className="space-y-4">
            
            <AnimatePresence>
              {!isLogin && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-4">
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <input required placeholder="Full Name" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setForm({...form, name: e.target.value})} />
                  </div>
                  
                  <div className="relative">
                    <BookOpen className="absolute left-4 top-3.5 text-slate-400" size={18} />
                    <select required className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 focus:ring-2 focus:ring-green-500 outline-none appearance-none" onChange={(e) => setForm({...form, department: e.target.value})}>
                      <option value="">Select Department</option>
                      {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input required type="email" placeholder="Student Email" className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setForm({...form, email: e.target.value})} />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input required type={showPassword ? "text" : "password"} placeholder="Password" className="w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:ring-2 focus:ring-green-500 outline-none" onChange={(e) => setForm({...form, password: e.target.value})} />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-600">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button disabled={loading} className="w-full bg-green-800 hover:bg-green-900 text-white font-black py-4 rounded-xl shadow-lg shadow-green-900/20 transition-all flex items-center justify-center gap-2 mt-6 uppercase tracking-widest text-xs">
              {loading ? <Loader2 className="animate-spin" size={18} /> : (isLogin ? "Access Portal" : "Create Account")}
              {!loading && <ArrowRight size={16} />}
            </button>

          </form>
        </div>
        
        <div className="mt-8 text-center opacity-40">
          <p className="text-[10px] font-black uppercase tracking-[0.3em]">Engineered by Bolu Adeoye</p>
        </div>

      </motion.div>
    </main>
  );
}
