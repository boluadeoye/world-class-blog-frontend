"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles,
  BrainCircuit, Clock, ChevronRight, ChevronLeft, ShieldAlert,
  Loader2, BookOpen, Target, Zap, FileText, Lock, ShieldCheck, Fingerprint, Scan
} from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import LiveTracker from "@/components/cbt/LiveTracker";

/* === INTERNAL COMPONENT: UPGRADE MODAL === */
function InternalUpgradeModal({ student, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const handleVerify = async () => {
    const ref = prompt("Enter Paystack Reference:");
    if (!ref) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cbt/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference: ref, studentId: student.id })
      });
      const data = await res.json();
      if (data.success) { alert("Clearance Granted. Welcome Elite."); onSuccess(); } 
      else { alert("Verification Failed: " + data.error); }
    } catch (e) { alert("System Error"); }
    setLoading(false);
  };
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-[#002b00]/95 backdrop-blur-md p-4">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden shadow-2xl border border-white">
        <div className="bg-[#004d00] p-8 text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white"><X size={20}/></button>
          <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg animate-bounce"><Crown size={32} className="text-black" /></div>
          <h2 className="text-2xl font-black text-white uppercase tracking-widest">Premium Access</h2>
        </div>
        <div className="p-8">
          <a href="https://paystack.com/pay/examforge-premium" target="_blank" className="block w-full py-4 bg-[#004d00] text-white text-center rounded-xl font-black text-xs uppercase tracking-widest shadow-lg mb-3">Pay ₦500 Now</a>
          <button onClick={handleVerify} disabled={loading} className="w-full py-3 border-2 border-gray-100 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest">{loading ? "Verifying..." : "I Have Paid"}</button>
        </div>
      </div>
    </div>
  );
}

/* === SECURITY WATERMARK === */
function SecurityWatermark({ text }) {
  return (
    <div className="fixed inset-0 z-[50] pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.03]">
      <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-20 transform -rotate-12 scale-150">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="text-4xl font-black uppercase tracking-widest text-gray-900 whitespace-nowrap select-none">
            {text} • OFFICIAL USE ONLY • {text}
          </div>
        ))}
      </div>
    </div>
  );
}

function TimeUpOverlay() {
  return (
    <div className="fixed inset-0 z-[600] bg-[#002b00] flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-white/10 border-2 border-white/20 rounded-full flex items-center justify-center mb-6">
        <Clock size={48} className="text-white animate-spin-slow" />
      </div>
      <h2 className="text-3xl font-black uppercase tracking-[0.2em] mb-2 text-center">Time Expired</h2>
      <p className="text-green-200 font-bold text-xs uppercase tracking-widest animate-pulse">Securing Responses...</p>
    </div>
  );
}

function ExamContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [score, setScore] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeTab, setActiveTab] = useState("corrections");
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const getStorageKey = useCallback((email) => `cbt_session_${params.id}_${email}`, [params.id]);
  const getConfigKey = useCallback((email) => `cbt_config_${params.id}_${email}`, [params.id]);

  useEffect(() => {
    setMounted(true);
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }
    const parsedStudent = JSON.parse(studentData);
    setStudent(parsedStudent);

    async function loadExam() {
      try {
        const hwId = localStorage.getItem("cbt_hw_id") || "unknown";
        const reqLimit = searchParams.get('limit') || '30';
        const reqDur = searchParams.get('duration') || '15';

        const currentConfig = `${reqLimit}_${reqDur}`;
        const savedConfig = localStorage.getItem(getConfigKey(parsedStudent.email));
        const sessionKey = getStorageKey(parsedStudent.email);

        if (savedConfig !== currentConfig) {
          localStorage.removeItem(sessionKey);
          localStorage.setItem(getConfigKey(parsedStudent.email), currentConfig);
        }

        const query = new URLSearchParams({ 
          courseId: params.id, 
          studentId: parsedStudent.id, 
          token: parsedStudent.session_token || "",
          deviceId: hwId,
          limit: reqLimit
        });

        const res = await fetch(`/api/cbt/exam?${query.toString()}`);
        if (res.status === 403) { setLimitReached(true); setLoading(false); return; }
        if (!res.ok) throw new Error("Data retrieval failed.");
        
        const data = await res.json();
        setCourse(data.course);
        setQuestions(data.questions || []);
        setIsPremium(data.isPremium);

        const finalDuration = (data.isPremium && reqDur) ? parseInt(reqDur) : (data.course?.duration || 15);
        const savedSession = localStorage.getItem(sessionKey);
        if (savedSession) {
          const session = JSON.parse(savedSession);
          setAnswers(session.answers || {});
          setTimeLeft(session.timeLeft);
          setCurrentQIndex(session.currentIndex || 0);
        } else {
          setTimeLeft(finalDuration * 60);
        }
      } catch (e) { setError(String(e.message)); } finally { setLoading(false); }
    }
    loadExam();
  }, [params.id, router, getStorageKey, getConfigKey, searchParams]);

  const submitExam = useCallback(async () => {
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    const hwId = localStorage.getItem("cbt_hw_id") || "unknown";
    setScore(correctCount);
    setIsSubmitted(true);
    setIsTimeUp(false);
    setShowSubmitModal(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (student && course) {
        try {
            await fetch('/api/cbt/result', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ studentId: student.id, courseId: course.id, score: correctCount, total: questions.length, answers: answers, deviceId: hwId })
            });
        } catch(e) { console.error("Save error", e); }
        localStorage.removeItem(getStorageKey(student.email));
    }
  }, [questions, answers, student, course, getStorageKey]);

  const handleAutoSubmit = useCallback(() => {
    setIsTimeUp(true);
    setTimeout(() => { submitExam(); }, 3000);
  }, [submitExam]);

  useEffect(() => {
    if (!mounted || loading || isSubmitted || limitReached || timeLeft === null || showUpgrade || isTimeUp) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) { clearInterval(interval); handleAutoSubmit(); return 0; }
        const newTime = prev - 1;
        if (student && newTime % 5 === 0) {
          localStorage.setItem(getStorageKey(student.email), JSON.stringify({ answers, timeLeft: newTime, currentIndex: currentQIndex }));
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, isSubmitted, limitReached, showUpgrade, mounted, answers, currentQIndex, student, getStorageKey, handleAutoSubmit, isTimeUp]);

  const handleSelect = (option) => { 
    if (!isSubmitted && !isTimeUp) {
      setAnswers(prev => ({ ...prev, [questions[currentQIndex].id]: option })); 
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const navigateTo = (index) => { setCurrentQIndex(index); setShowMap(false); };

  const generateAnalysis = async () => {
    setAnalyzing(true);
    const failedQuestions = questions.filter(q => answers[q.id] !== q.correct_option).map(q => ({
      question_text: q.question_text, correct_option: q.correct_option, user_choice: answers[q.id] || "Skipped"
    }));
    try {
      const res = await fetch("/api/cbt/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentName: student.name, courseCode: course.code, score, total: questions.length, failedQuestions })
      });
      const data = await res.json();
      setAnalysis(String(data.analysis));
    } catch (e) { alert("AI Service error."); } finally { setAnalyzing(false); }
  };

  const getGridColor = (index, qId) => {
    if (currentQIndex === index) return "bg-yellow-400 text-black border-yellow-500 ring-2 ring-yellow-100 scale-105 z-10 font-black";
    if (answers[qId]) return "bg-emerald-600 text-white border-emerald-700 font-bold";
    return "bg-red-50 text-red-400 border-red-100 font-medium";
  };

  if (limitReached) return (
    <div className="min-h-screen bg-[#002b00] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {showUpgrade && <InternalUpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="relative z-10 bg-white rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl overflow-hidden">
         <div className="bg-[#004d00] p-8 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-green-400"></div>
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"><Lock size={40} className="text-[#004d00]" /></div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">Access Denied</h2>
            <p className="text-green-200 text-[10px] font-mono mt-2 uppercase tracking-[0.2em]">Hardware Limit Reached (2/2)</p>
         </div>
         <div className="p-8">
            <p className="text-gray-600 text-xs font-medium leading-relaxed mb-8">Your device has exhausted the free attempt allocation for this sector. Security protocols are active.</p>
            <button onClick={() => setShowUpgrade(true)} className="w-full py-4 bg-[#004d00] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-green-900 transition-all active:scale-95 flex items-center justify-center gap-2"><Crown size={14} /> Upgrade Clearance</button>
            <button onClick={() => router.push('/cbt/dashboard')} className="mt-6 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-gray-600">Return to Base</button>
         </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#002b00] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 border-4 border-white/10 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
          <Scan size={40} className="text-white animate-pulse" />
        </div>
        <h2 className="font-black text-xl uppercase tracking-[0.4em] text-white mb-2">System Check</h2>
        <div className="flex flex-col items-center gap-1"><p className="text-[9px] font-mono text-green-200 uppercase tracking-widest">Verifying Biometrics...</p><p className="text-[9px] font-mono text-green-200 uppercase tracking-widest">Syncing Hardware ID...</p></div>
      </div>
    </div>
  );

  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest">Retry Connection</button></div>;

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    const answeredCount = Object.keys(answers).length;
    return (
      <main className="min-h-screen bg-[#f0f2f5] font-sans pb-20 overflow-y-auto">
        {showUpgrade && <InternalUpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
        <header className="bg-[#002b00] text-white pt-10 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden text-center">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <h1 className="text-4xl font-black mb-2">{percentage}%</h1>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Score: {score}/{questions.length}</p>
          <button onClick={() => router.push('/cbt/dashboard')} className="mt-6 bg-white/10 border border-white/20 px-6 py-2 rounded-full text-[10px] font-bold uppercase">Exit</button>
        </header>
        <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg p-1.5 mb-6 flex gap-2 border border-gray-100">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'corrections' ? 'bg-[#004d00] text-white shadow-md' : 'text-gray-400'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-900 text-white shadow-md' : 'text-gray-400'}`}><Sparkles size={14} /> Intelligence</button>
          </div>
          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => {
                const correctText = q[`option_${q.correct_option.toLowerCase()}`];
                return (
                  <div key={q.id} className={`bg-white p-6 rounded-3xl shadow-sm border-l-[6px] ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                    <div className="flex justify-between items-start mb-4"><span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">Question {i+1}</span>{answers[q.id] === q.correct_option ? <CheckCircle size={20} className="text-green-600" /> : <X size={20} className="text-red-500" />}</div>
                    <p className="font-bold text-gray-900 text-sm leading-relaxed mb-6">{q.question_text}</p>
                    <div className="grid grid-cols-1 gap-3 mb-4">
                      <div className="bg-green-50 border border-green-100 p-4 rounded-xl"><p className="text-[9px] font-black text-green-800 uppercase mb-1 flex items-center gap-2"><CheckCircle size={12}/> Correct Answer</p><p className="text-sm font-bold text-green-900 leading-snug"><span className="font-black mr-2">{q.correct_option}.</span>{correctText}</p></div>
                      {answers[q.id] !== q.correct_option && (<div className="bg-red-50 border border-red-100 p-4 rounded-xl"><p className="text-[9px] font-black text-red-800 uppercase mb-1 flex items-center gap-2"><X size={12}/> Your Selection</p><p className="text-sm font-bold text-red-900">{answers[q.id] ? (<><span className="font-black mr-2">{answers[q.id]}.</span>{q[`option_${answers[q.id].toLowerCase()}`] || "Option text unavailable"}</>) : "Skipped"}</p></div>)}
                    </div>
                    {isPremium && q.explanation && <div className="mt-4 pt-4 border-t border-gray-100"><p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Concept Brief</p><p className="text-xs text-gray-600 leading-relaxed bg-blue-50/30 p-3 rounded-xl border border-blue-100 italic">{q.explanation}</p></div>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-[#002b00] rounded-[2.5rem] shadow-2xl border border-green-900/30 overflow-hidden min-h-[500px] relative group">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#002b00] via-[#003300] to-[#001a00] flex flex-col items-center justify-center text-center p-10">
                  <div className="relative mb-10"><div className="absolute inset-0 bg-green-500 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div><div className="w-28 h-28 bg-gradient-to-br from-green-400 via-green-600 to-green-800 rounded-[2.5rem] flex items-center justify-center relative z-10 shadow-[0_0_50px_rgba(34,197,94,0.3)] transform group-hover:scale-110 transition-transform duration-700"><Lock size={48} className="text-white drop-shadow-2xl" strokeWidth={2.5} /></div></div>
                  <div className="relative z-10"><h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">Confidential Briefing</h3><p className="text-green-200/70 text-sm mb-12 max-w-xs font-medium leading-relaxed">Your cognitive performance data is locked. Access the <span className="text-green-400 font-bold">AI Tactical Roadmap</span> to secure your success.</p><button onClick={() => setShowUpgrade(true)} className="bg-green-500 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-[0_10px_40px_rgba(34,197,94,0.4)] hover:bg-white hover:text-[#002b00] hover:scale-105 transition-all active:scale-95">Unlock The Vault</button></div>
                </div>
              ) : (
                <div className="p-8 text-white">AI Analysis logic here...</div>
              )}
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="h-screen flex flex-col bg-[#f0f2f5] font-sans overflow-hidden select-none relative">
      <SecurityWatermark text={`${student?.name || 'CBT'} - ${student?.id}`} />
      <LiveTracker />
      {isTimeUp && <TimeUpOverlay />}
      {showSubmitModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#002b00]/90 backdrop-blur-md p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden border border-white">
            <div className="bg-[#004d00] p-8 flex flex-col items-center text-center border-b border-green-800 relative overflow-hidden">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg"><CheckCircle size={32} className="text-[#004d00]" /></div>
              <h3 className="font-black text-2xl text-white uppercase tracking-tighter">Final Audit</h3>
              <div className="mt-4 w-full space-y-2"><div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10"><span className="text-[10px] font-black text-green-200 uppercase tracking-widest">Answered</span><span className="text-sm font-black text-white">{Object.keys(answers).length} / {questions.length}</span></div></div>
            </div>
            <div className="p-6 bg-white flex gap-4">
              <button onClick={() => setShowSubmitModal(false)} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:bg-gray-50 uppercase tracking-widest transition-all">Review</button>
              <button onClick={submitExam} className={`flex-[1.5] py-4 bg-[#004d00] text-white rounded-2xl text-[10px] font-black shadow-xl hover:bg-green-900 uppercase tracking-widest`}>Submit Now</button>
            </div>
          </div>
        </div>
      )}
      <header className="h-14 bg-[#004d00] text-white flex justify-between items-center px-4 shrink-0 z-[160] border-b border-green-800">
        <div className="flex items-center gap-3"><div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#004d00] font-black text-sm shadow-inner">{student?.name?.charAt(0).toUpperCase()}</div><div className="leading-tight"><h1 className="font-black text-[10px] uppercase tracking-widest text-green-100 truncate w-24">{student?.name}</h1><p className="text-[9px] font-mono opacity-70 tracking-tighter uppercase">{course?.code}</p></div></div>
        <div className="flex items-center gap-3"><div className={`flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/10 ${timeLeft < 300 ? 'animate-pulse bg-red-900/50 border-red-500' : ''}`}><Clock size={12} className={timeLeft < 300 ? "text-red-500" : "text-green-400"} /><span className={`font-mono font-black text-sm tracking-widest ${timeLeft < 300 ? "text-red-500" : "text-white"}`}>{formatTime(timeLeft || 0)}</span></div><button onClick={() => setShowSubmitModal(true)} className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Submit</button></div>
      </header>
      <div className="flex-1 flex flex-col p-4 overflow-hidden relative z-10">
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-green-900/5 border border-gray-100 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center mb-4 shrink-0"><span className="font-black text-green-900 text-[9px] tracking-[0.2em] uppercase bg-green-50 px-2 py-1 rounded-lg border border-green-100">Q {String(currentQIndex + 1).padStart(2, '0')} / {questions.length}</span><span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{(100/questions.length).toFixed(1)} Marks</span></div>
          <div className="flex-1 flex items-center py-4 overflow-y-auto custom-scrollbar pr-2"><h2 className="text-base md:text-xl font-bold text-gray-900 leading-relaxed text-left">{questions[currentQIndex]?.question_text}</h2></div>
          <div className="grid grid-cols-1 gap-2.5 mt-4 shrink-0">{['A','B','C','D'].map((opt) => (<button key={opt} onClick={() => handleSelect(opt)} className={`group p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-4 active:scale-[0.98] ${answers[questions[currentQIndex]?.id] === opt ? 'border-green-600 bg-green-50 ring-2 ring-green-100' : 'border-gray-100 bg-white'}`}><span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border transition-colors ${answers[questions[currentQIndex]?.id] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-400 border-gray-200 group-hover:bg-white'}`}>{opt}</span><span className={`font-bold text-xs leading-tight ${answers[questions[currentQIndex]?.id] === opt ? 'text-green-900 font-black' : 'text-gray-600'}`}>{questions[currentQIndex]?.[`option_${opt.toLowerCase()}`]}</span></button>))}</div>
        </div>
      </div>
      <footer className="h-16 bg-white border-t border-gray-100 flex justify-between items-center px-8 shrink-0 z-20"><button onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="text-[10px] font-black text-gray-400 uppercase tracking-widest disabled:opacity-10 transition-colors hover:text-green-900">[ PREV ]</button><button onClick={() => setShowMap(true)} className="bg-gray-100 text-gray-700 p-3.5 rounded-[1.2rem] hover:bg-green-50 hover:text-green-900 transition-all active:scale-95"><Grid size={22} /></button><button onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))} disabled={currentQIndex === questions.length - 1} className={`px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg ${currentQIndex === questions.length - 1 ? 'bg-gray-100 text-gray-400 border border-gray-200' : 'bg-[#004d00] text-white hover:bg-green-900 active:scale-95'}`}>Next</button></footer>
      <aside className={`fixed inset-x-0 bottom-0 z-[250] bg-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] transition-transform duration-500 border-t border-gray-100 ${showMap ? 'translate-y-0' : 'translate-y-full'} h-[60vh] flex flex-col`}><div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0 rounded-t-[3rem]"><span className="font-black text-xs uppercase tracking-widest text-gray-700 flex items-center gap-2"><Grid size={16} /> Question Matrix</span><button onClick={() => setShowMap(false)} className="p-2.5 bg-gray-200 text-gray-600 rounded-2xl hover:bg-gray-300 transition-colors"><X size={20}/></button></div><div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white"><div className="grid grid-cols-5 gap-3.5">{questions.map((q, i) => (<button key={q.id} onClick={() => {setCurrentQIndex(i); setShowMap(false);}} className={`h-12 rounded-2xl text-xs font-black transition-all border-2 ${currentQIndex === i ? 'bg-yellow-400 text-black border-yellow-500' : answers[q.id] ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-red-50 text-red-400 border-red-100'}`}>{i + 1}</button>))}</div></div></aside>
    </main>
  );
}

export default function ExamPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#002b00] text-white font-black text-xs uppercase tracking-widest animate-pulse">BOOTING TERMINAL...</div>}>
      <ExamContent />
    </Suspense>
  );
}
