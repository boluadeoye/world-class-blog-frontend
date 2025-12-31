"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Grid, CheckCircle, X, Crown, Sparkles, BrainCircuit, Clock, Fingerprint, Scan, Lock } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import LiveTracker from "@/components/cbt/LiveTracker";

/* === INTERNAL UPGRADE MODAL (FIXED) === */
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
          {/* REPLACED BROKEN LINK WITH GENERIC PAYSTACK LINK - UPDATE THIS IF YOU HAVE A SPECIFIC ONE */}
          <a href="https://paystack.com/pay/examforge-premium" target="_blank" className="block w-full py-4 bg-[#004d00] text-white text-center rounded-xl font-black text-xs uppercase tracking-widest shadow-lg mb-3">Pay ₦500 Now</a>
          <button onClick={handleVerify} disabled={loading} className="w-full py-3 border-2 border-gray-100 text-gray-400 rounded-xl font-black text-[10px] uppercase tracking-widest">{loading ? "Verifying..." : "I Have Paid"}</button>
        </div>
      </div>
    </div>
  );
}

/* === SECURITY WATERMARK === */
const SecurityWatermark = ({ text }) => (
  <div className="fixed inset-0 z-[50] pointer-events-none overflow-hidden flex items-center justify-center opacity-[0.03]">
    <div className="absolute inset-0 flex flex-wrap content-center justify-center gap-20 transform -rotate-12 scale-150">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="text-4xl font-black uppercase tracking-widest text-gray-900 whitespace-nowrap select-none">
          {text} • OFFICIAL USE ONLY
        </div>
      ))}
    </div>
  </div>
);

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

function SubmitModal({ isOpen, onConfirm, onCancel, answeredCount, totalCount }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#002b00]/90 backdrop-blur-md p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden border border-white">
        <div className="bg-[#004d00] p-8 flex flex-col items-center text-center border-b border-green-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg relative z-10">
            <CheckCircle size={32} className="text-[#004d00]" />
          </div>
          <h3 className="font-black text-2xl text-white uppercase tracking-tighter relative z-10">Final Audit</h3>
          <div className="mt-4 w-full space-y-2 relative z-10">
            <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10">
              <span className="text-[10px] font-black text-green-200 uppercase tracking-widest">Answered</span>
              <span className="text-sm font-black text-white">{answeredCount} / {totalCount}</span>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white flex gap-4">
          <button onClick={onCancel} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:bg-gray-50 uppercase tracking-widest transition-all">Review</button>
          <button onClick={onConfirm} className={`flex-[1.5] py-4 bg-[#004d00] text-white rounded-2xl text-[10px] font-black shadow-xl hover:bg-green-900 uppercase tracking-widest`}>Submit Now</button>
        </div>
      </div>
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
  const [mounted, setMounted] = useState(false);

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

        const res = await fetch(`/api/cbt/exam?courseId=${params.id}&studentId=${parsedStudent.id}&token=${parsedStudent.session_token}&deviceId=${hwId}&limit=${reqLimit}`);
        
        if (res.status === 403) { setLimitReached(true); setLoading(false); return; }

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
      } catch (e) { console.error(e); } finally { setLoading(false); }
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
                body: JSON.stringify({ 
                  studentId: student.id, 
                  courseId: course.id, 
                  score: correctCount, 
                  total: questions.length, 
                  answers: answers,
                  deviceId: hwId 
                })
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
        if (prev <= 0) {
          clearInterval(interval);
          handleAutoSubmit();
          return 0;
        }
        const newTime = prev - 1;
        if (student && newTime % 5 === 0) {
          localStorage.setItem(getStorageKey(student.email), JSON.stringify({ answers, timeLeft: newTime, currentIndex: currentQIndex }));
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, isSubmitted, limitReached, showUpgrade, mounted, answers, currentQIndex, student, getStorageKey, handleAutoSubmit, isTimeUp]);

  // FIX: Simplified handleSelect to ensure state update
  const handleSelect = (option) => {
    if (!isSubmitted && !isTimeUp) {
      const qId = questions[currentQIndex].id;
      setAnswers(prev => ({ ...prev, [qId]: option }));
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
      <div className="relative z-10 bg-white rounded-[2.5rem] max-w-sm w-full text-center shadow-2xl overflow-hidden">
         <div className="bg-[#004d00] p-8 relative">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
               <Lock size={40} className="text-[#004d00]" />
            </div>
            <h2 className="text-2xl font-black text-white uppercase tracking-widest">Access Denied</h2>
            <p className="text-green-200 text-[10px] font-mono mt-2 uppercase tracking-[0.2em]">Hardware Limit Reached (2/2)</p>
         </div>
         <div className="p-8">
            <p className="text-gray-600 text-xs font-medium leading-relaxed mb-8">Your device has exhausted the free attempt allocation for this sector.</p>
            <button onClick={() => setShowUpgrade(true)} className="w-full py-4 bg-[#004d00] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-green-900 transition-all active:scale-95 flex items-center justify-center gap-2"><Crown size={14} /> Upgrade Clearance</button>
            <button onClick={() => router.push('/cbt/dashboard')} className="mt-6 text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-gray-600">Return to Base</button>
         </div>
      </div>
    </div>
  );

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#002b00] text-white relative overflow-hidden">
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 border-4 border-white/10 rounded-full flex items-center justify-center mb-8 relative">
          <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin"></div>
          <Scan size={40} className="text-white animate-pulse" />
        </div>
        <h2 className="font-black text-xl uppercase tracking-[0.4em] text-white mb-2">System Check</h2>
        <p className="text-[10px] font-mono text-green-200 uppercase tracking-widest">Verifying Biometrics...</p>
      </div>
    </div>
  );

  if (!course) return <div className="h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-[#f0f2f5] font-sans pb-20 overflow-y-auto">
        {showUpgrade && <InternalUpgradeModal student={student} onClose={() => setShowUpgrade(false)} onSuccess={() => window.location.reload()} />}
        <header className="bg-[#002b00] text-white pt-10 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden text-center">
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
                  <div className="w-28 h-28 bg-gradient-to-br from-green-400 via-green-600 to-green-800 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 shadow-lg"><Lock size={48} className="text-white" /></div>
                  <h3 className="text-3xl font-black text-white mb-4 tracking-tighter uppercase italic">Confidential Briefing</h3>
                  <p className="text-green-200/70 text-sm mb-12 max-w-xs font-medium leading-relaxed">Your cognitive performance data is locked. Access the <span className="text-green-400 font-bold">AI Tactical Roadmap</span> to secure your success.</p>
                  <button onClick={() => setShowUpgrade(true)} className="bg-green-500 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl hover:bg-white hover:text-[#002b00] transition-all active:scale-95">Unlock The Vault</button>
                </div>
              ) : (
                <div className="p-0">
                  {!analysis ? (
                    <div className="text-center py-32 px-8 bg-white"><div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"><BrainCircuit size={40} className="text-purple-600" /></div><h3 className="font-black text-gray-900 text-xs uppercase tracking-widest mb-2">Analyzing Performance</h3><p className="text-gray-400 text-[10px] mb-8 uppercase tracking-widest">Crafting personalized recovery roadmap...</p><button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">{analyzing ? "PROCESSING..." : "GENERATE REPORT"}</button></div>
                  ) : (
                    <div className="bg-[#fcfcfc] min-h-[600px] animate-in fade-in duration-700">
                      <div className="bg-purple-900 text-white p-10 pb-12 rounded-t-[2.5rem] shadow-lg relative overflow-hidden"><div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div><div className="relative z-10 text-left"><div className="flex items-center gap-3 mb-4"><div className="bg-white/20 p-2 rounded-lg backdrop-blur-md"><Sparkles size={20} /></div><span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-200">Intelligence Briefing</span></div><h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Tactical Brief</h3><p className="text-purple-300 text-xs font-bold uppercase tracking-widest mt-3 opacity-80">Personalized Recovery Plan for {student?.name}</p></div></div>
                      <div className="p-8 md:p-12 text-left border-l-[8px] border-l-purple-600 bg-white"><div className="text-gray-800 leading-relaxed font-medium space-y-6"><ReactMarkdown components={{ h1: ({children}) => <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest border-b border-purple-100 pb-2 mt-8 first:mt-0">{children}</h1>, h2: ({children}) => <h2 className="text-lg font-bold text-purple-900 mt-6 mb-3">{children}</h2>, p: ({children}) => <p className="text-sm text-gray-600 mb-4 leading-7">{children}</p>, ul: ({children}) => <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">{children}</ul>, li: ({children}) => <li className="pl-1">{children}</li>, strong: ({children}) => <strong className="font-black text-purple-800">{children}</strong> }}>{analysis}</ReactMarkdown></div><div className="mt-16 pt-8 border-t border-gray-50 flex items-center justify-between opacity-40"><div className="flex items-center gap-2"><BrainCircuit size={14} /><span className="text-[8px] font-black uppercase tracking-widest">ExamForge AI Engine</span></div><span className="text-[8px] font-black uppercase tracking-widest">Classified Document</span></div></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQIndex];
  return (
    <main className="h-screen flex flex-col bg-[#f0f2f5] font-sans overflow-hidden select-none relative">
      {showSubmitModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#002b00]/90 backdrop-blur-md p-6 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden border border-white">
            <div className="bg-[#004d00] p-8 flex flex-col items-center text-center border-b border-green-800 relative overflow-hidden">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-lg"><CheckCircle size={32} className="text-[#004d00]" /></div>
              <h3 className="font-black text-2xl text-white uppercase tracking-tighter">Final Audit</h3>
              <div className="mt-4 w-full space-y-2"><div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/10"><span className="text-[10px] font-black text-green-200 uppercase tracking-widest">Answered</span><span className="text-sm font-black text-white">{Object.keys(answers).length} / {questions.length}</span></div></div>
            </div>
            <div className="p-6 bg-white flex gap-4">
              <button onClick={() => setShowSubmitModal(false)} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 uppercase tracking-widest">Review</button>
              <button onClick={submitExam} className={`flex-[1.5] py-4 bg-[#004d00] text-white rounded-2xl text-[10px] font-black shadow-xl uppercase tracking-widest`}>Submit Now</button>
            </div>
          </div>
        </div>
      )}
      <SecurityWatermark text={`${student?.name} - ${student?.id}`} />
      <LiveTracker />
      <header className="h-16 bg-[#004d00] text-white flex justify-between items-center px-6 shrink-0 z-[100]">
        <div className="flex flex-col"><h1 className="font-black text-[10px] uppercase tracking-widest">{student?.name}</h1><p className="text-[9px] opacity-60 uppercase">{course?.code}</p></div>
        <div className="bg-black/20 px-4 py-2 rounded-full font-mono font-black text-sm tracking-widest">{Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}</div>
        <button onClick={() => setShowSubmitModal(true)} className="bg-red-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg active:scale-90 transition-all">Submit</button>
      </header>
      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl p-6 flex flex-col justify-between overflow-hidden border border-gray-100">
          <div className="flex justify-between text-[9px] font-black text-gray-300 uppercase tracking-widest"><span>Question {currentQIndex + 1} / {questions.length}</span></div>
          <div className="flex-1 flex items-center py-6 overflow-y-auto"><h2 className="text-lg font-bold text-gray-900 leading-relaxed">{questions[currentQIndex]?.question_text}</h2></div>
          <div className="grid gap-3">
            {['A','B','C','D'].map(opt => (
              <button key={opt} onClick={() => handleSelect(opt)} className={`p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${answers[questions[currentQIndex].id] === opt ? 'border-green-600 bg-green-50' : 'border-gray-100 bg-white'}`}>
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${answers[questions[currentQIndex].id] === opt ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{opt}</span>
                <span className="text-xs font-bold text-gray-700">{questions[currentQIndex]?.[`option_${opt.toLowerCase()}`]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      <footer className="h-20 bg-white border-t flex justify-between items-center px-8 shrink-0">
        <button onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))} className="text-[10px] font-black text-gray-400 uppercase">Prev</button>
        <button onClick={() => setShowMap(true)} className="bg-gray-100 p-3 rounded-xl"><Grid size={20} /></button>
        <button onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))} className="bg-[#004d00] text-white px-10 py-3 rounded-xl text-[10px] font-black uppercase">Next</button>
      </footer>
      {showMap && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end">
          <div className="bg-white w-full rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xs uppercase tracking-widest">Question Matrix</h3><button onClick={() => setShowMap(false)}><X /></button></div>
            <div className="grid grid-cols-5 gap-3 max-h-[40vh] overflow-y-auto">
              {questions.map((q, i) => (
                <button key={q.id} onClick={() => {setCurrentQIndex(i); setShowMap(false);}} className={`h-12 rounded-xl text-xs font-black border-2 ${currentQIndex === i ? 'border-yellow-400 bg-yellow-50' : answers[q.id] ? 'border-green-600 bg-green-50' : 'border-gray-100'}`}>{i+1}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
export default function ExamPageWrapper() { return <Suspense fallback={<div>Loading...</div>}><ExamContent /></Suspense>; }
