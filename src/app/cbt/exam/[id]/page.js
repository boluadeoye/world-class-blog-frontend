"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { 
  Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, 
  BrainCircuit, Clock, ChevronRight, ChevronLeft, ShieldAlert, 
  Loader2, BookOpen, Target, Zap 
} from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

/* === 1. TIME EXPIRED OVERLAY === */
function TimeUpOverlay() {
  return (
    <div className="fixed inset-0 z-[600] bg-[#050505] flex flex-col items-center justify-center text-white p-6">
      <div className="w-24 h-24 bg-red-600/10 border-2 border-red-600 rounded-full flex items-center justify-center mb-6">
        <Clock size={48} className="text-red-500 animate-spin-slow" />
      </div>
      <h2 className="text-3xl font-black uppercase tracking-[0.2em] mb-2 text-center">Time Expired</h2>
      <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest animate-pulse">Securing Responses...</p>
    </div>
  );
}

/* === 2. SUBMIT MODAL === */
function SubmitModal({ isOpen, onConfirm, onCancel, answeredCount, totalCount }) {
  if (!isOpen) return null;
  const pendingCount = totalCount - answeredCount;
  
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 backdrop-blur-md p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full overflow-hidden border border-green-100">
        <div className="bg-green-50 p-8 flex flex-col items-center text-center border-b border-green-100">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-4 shadow-sm border border-green-100">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h3 className="font-black text-2xl text-green-900 uppercase tracking-tighter">Final Audit</h3>
          
          <div className="mt-4 w-full space-y-2">
            <div className="flex justify-between items-center bg-white/60 p-3 rounded-xl border border-green-100">
              <span className="text-[10px] font-black text-gray-400 uppercase">Answered</span>
              <span className="text-sm font-black text-green-700">{answeredCount} / {totalCount}</span>
            </div>
            {pendingCount > 0 && (
              <div className="flex justify-between items-center bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="text-[10px] font-black text-red-400 uppercase">Pending</span>
                <span className="text-sm font-black text-red-600">{pendingCount} Left</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-white flex gap-4">
          <button onClick={onCancel} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-xs font-black text-gray-400 hover:bg-gray-50 uppercase tracking-widest transition-all">Review</button>
          <button onClick={onConfirm} className="flex-[1.5] py-4 bg-[#004d00] text-white rounded-2xl text-xs font-black shadow-xl hover:bg-green-900 transition-all active:scale-95 uppercase tracking-widest">Submit Now</button>
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
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
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

  const getStorageKey = useCallback((email) => `cbt_session_${params.id}_${email}`, [params.id]);

  useEffect(() => {
    setMounted(true);
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }
    const parsedStudent = JSON.parse(studentData);
    setStudent(parsedStudent);

    async function loadExam() {
      try {
        const query = new URLSearchParams({ courseId: params.id, studentId: parsedStudent.id, token: parsedStudent.session_token || "" });
        const res = await fetch(`/api/cbt/exam?${query.toString()}`);
        if (!res.ok) {
            if (res.status === 401) { router.push("/cbt"); return; }
            if (res.status === 403) { setShowUpgrade(true); setLoading(false); return; }
            throw new Error("Failed to load exam data.");
        }
        const data = await res.json();
        setCourse(data.course);
        setQuestions(data.questions || []);
        setIsPremium(data.isPremium);

        const savedSession = localStorage.getItem(getStorageKey(parsedStudent.email));
        if (savedSession) {
          const session = JSON.parse(savedSession);
          setAnswers(session.answers || {});
          setTimeLeft(session.timeLeft);
          setCurrentQIndex(session.currentIndex || 0);
        } else {
          const requestedDuration = searchParams.get('duration');
          const finalDuration = (data.isPremium && requestedDuration) ? parseInt(requestedDuration) : (data.course?.duration || 15);
          setTimeLeft(finalDuration * 60);
        }
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    }
    loadExam();
  }, [params.id, router, getStorageKey, searchParams]);

  const submitExam = useCallback(async () => {
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
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
                body: JSON.stringify({ studentId: student.id, courseId: course.id, score: correctCount, total: questions.length, answers: answers })
            });
        } catch(e) { console.error("Save failed", e); }
        localStorage.removeItem(getStorageKey(student.email));
    }
  }, [questions, answers, student, course, getStorageKey]);

  // AUTO-SUBMIT
  const handleAutoSubmit = useCallback(() => {
    setIsTimeUp(true);
    setTimeout(() => { submitExam(); }, 3000);
  }, [submitExam]);

  useEffect(() => {
    if (!mounted || loading || isSubmitted || error || timeLeft === null || showUpgrade || isTimeUp) return;
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
  }, [loading, isSubmitted, error, timeLeft, showUpgrade, mounted, answers, currentQIndex, student, getStorageKey, handleAutoSubmit, isTimeUp]);

  const handleSelect = (option) => { if (!isSubmitted && !isTimeUp) setAnswers(prev => ({ ...prev, [questions[currentQIndex].id]: option })); };
  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const navigateTo = (index) => { setCurrentQIndex(index); setShowMap(false); };

  const generateAnalysis = async () => {
    setAnalyzing(true);
    const failedQuestions = questions.filter(q => answers[q.id] !== q.correct_option).map(q => ({ question_text: q.question_text, correct_option: q.correct_option, user_choice: answers[q.id] || "Skipped" }));
    try {
      const res = await fetch("/api/cbt/analyze", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentName: student.name, courseCode: course.code, score, total: questions.length, failedQuestions }) });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (e) { alert("Analysis failed."); } finally { setAnalyzing(false); }
  };

  const getGridColor = (index, qId) => {
    if (currentQIndex === index) return "bg-yellow-400 text-black border-yellow-500 ring-4 ring-yellow-100 scale-110 z-10";
    if (answers[qId]) return "bg-emerald-600 text-white border-emerald-700";
    return "bg-red-50 text-red-400 border-red-100";
  };

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-green-900 font-black text-sm tracking-widest animate-pulse">INITIALIZING TERMINAL...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-black text-white px-6 py-2 rounded text-xs">RETRY</button></div>;

  // === RESULT VIEW (GLASS & GLORY) ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    const answered = Object.keys(answers).length;
    
    return (
      <main className="min-h-screen bg-[#f0f2f5] font-sans pb-20">
        {/* HERO HEADER */}
        <header className="bg-[#002b00] text-white pt-10 pb-24 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          
          <div className="relative z-10 flex justify-between items-start mb-8">
            <div>
              <div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Session Report</div>
              <h1 className="font-black text-2xl tracking-tight">{course?.code}</h1>
            </div>
            <button onClick={() => router.push('/cbt/dashboard')} className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase hover:bg-white hover:text-[#002b00] transition-colors">Exit</button>
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* Circular Progress Background */}
              <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#ffffff20" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke={percentage >= 50 ? "#4ade80" : "#f87171"} strokeWidth="8" strokeDasharray="283" strokeDashoffset={283 - (283 * percentage) / 100} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
              </svg>
              <div className="text-center">
                <div className="text-5xl font-black tracking-tighter">{percentage}%</div>
                <div className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${percentage >= 50 ? 'text-green-400' : 'text-red-400'}`}>{percentage >= 50 ? 'PASSED' : 'FAILED'}</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8 w-full max-w-xs">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/5">
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Score</p>
                <p className="text-lg font-black">{score}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/5">
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Total</p>
                <p className="text-lg font-black">{questions.length}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 text-center border border-white/5">
                <p className="text-[9px] text-gray-400 uppercase font-bold mb-1">Attempted</p>
                <p className="text-lg font-black">{answered}</p>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT CARD */}
        <div className="max-w-3xl mx-auto px-4 -mt-12 relative z-20">
          
          {/* TABS */}
          <div className="bg-white rounded-2xl shadow-xl p-1.5 mb-6 flex gap-2 border border-gray-100">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'corrections' ? 'bg-[#004d00] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-900 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}><Sparkles size={14} /> Study Room</button>
          </div>

          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`bg-white p-6 rounded-3xl shadow-sm border-l-[6px] ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Question {i+1}</span>
                    {answers[q.id] === q.correct_option ? <CheckCircle size={20} className="text-green-600" /> : <X size={20} className="text-red-500" />}
                  </div>
                  <p className="font-bold text-gray-900 text-sm leading-relaxed mb-4">{q.question_text}</p>
                  
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 border border-green-100 p-3 rounded-xl">
                      <p className="text-[10px] font-black text-green-800 uppercase mb-1">Correct Answer</p>
                      <p className="text-sm font-bold text-green-900">{q.correct_option}</p>
                    </div>
                    {answers[q.id] !== q.correct_option && (
                      <div className="bg-red-50 border border-red-100 p-3 rounded-xl">
                        <p className="text-[10px] font-black text-red-800 uppercase mb-1">Your Choice</p>
                        <p className="text-sm font-bold text-red-900">{answers[q.id] || "Skipped"}</p>
                      </div>
                    )}
                  </div>

                  {isPremium && q.explanation && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-1"><BrainCircuit size={12}/> Intel Brief</p>
                      <p className="text-xs text-gray-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">{q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* === AI STUDY ROOM === */
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden min-h-[500px] relative">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-white/95 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-yellow-200"><Crown size={40} className="text-white" /></div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">RESTRICTED INTEL</h3>
                  <p className="text-gray-500 text-xs mb-8 max-w-xs font-medium">Unlock your personalized AI Study Plan.</p>
                  <button onClick={() => setShowUpgrade(true)} className="bg-black text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">Unlock Report</button>
                </div>
              ) : (
                <div className="p-0">
                  {!analysis ? (
                    <div className="text-center py-20 px-8">
                      <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"><BrainCircuit size={40} className="text-purple-600" /></div>
                      <h3 className="font-black text-gray-900 text-sm mb-2 uppercase tracking-widest">Analyzing Performance</h3>
                      <p className="text-gray-400 text-xs mb-8">Generating tactical recovery roadmap...</p>
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-50 hover:bg-purple-800 transition-colors">{analyzing ? "PROCESSING..." : "GENERATE STRATEGY"}</button>
                    </div>
                  ) : (
                    <div className="bg-gray-50 min-h-[500px]">
                      <div className="bg-purple-900 text-white p-6 pb-12">
                        <h3 className="font-black text-lg flex items-center gap-2"><Sparkles size={18} /> TACTICAL BRIEF</h3>
                        <p className="text-purple-200 text-xs uppercase tracking-widest mt-1">Personalized Recovery Plan</p>
                      </div>
                      <div className="px-6 -mt-6">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 prose prose-sm max-w-none prose-headings:font-black prose-headings:text-gray-900 prose-p:text-gray-600 prose-strong:text-purple-700">
                          <ReactMarkdown>{analysis}</ReactMarkdown>
                        </div>
                      </div>
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
  const safeId = student?.id ? String(student.id) : "0000";
  const answeredCount = Object.keys(answers).length;

  if (!currentQ) return <div className="h-screen flex items-center justify-center bg-white font-bold text-xs tracking-widest text-green-900">SYNCING...</div>;

  return (
    <main className="fixed inset-0 bg-gray-100 flex flex-col font-sans h-screen overflow-hidden z-[150]">
      {isTimeUp && <TimeUpOverlay />}
      <SubmitModal isOpen={showSubmitModal} onConfirm={submitExam} onCancel={() => setShowSubmitModal(false)} answeredCount={answeredCount} totalCount={questions.length} />
      
      <header className="bg-[#004d00] text-white h-16 flex justify-between items-center shadow-2xl shrink-0 z-[160] px-6 border-b border-green-800">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#004d00] font-black text-lg shadow-md border-2 border-green-200">{student?.name?.charAt(0).toUpperCase()}</div>
          <div className="hidden sm:block leading-tight"><h1 className="font-black text-xs uppercase tracking-widest text-green-100">{student?.name}</h1><div className="flex items-center gap-2 text-[10px] font-mono opacity-80"><span>ID: {safeId.slice(0,8)}</span><span className="text-green-400">●</span><span>{course?.code}</span></div></div>
          <button onClick={() => setShowMap(!showMap)} className="sm:hidden flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20 text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all"><Grid size={14} /> Matrix</button>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 bg-black/30 px-5 py-2 rounded-full border border-white/10 ${timeLeft < 300 ? 'animate-pulse bg-red-900/50 border-red-500' : ''}`}><Clock size={14} className={timeLeft < 300 ? "text-red-500" : "text-green-400"} /><span className={`font-mono font-black text-lg tracking-widest ${timeLeft < 300 ? "text-red-500" : "text-white"}`}>{formatTime(timeLeft || 0)}</span></div>
          <button onClick={() => setShowSubmitModal(true)} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 active:scale-95">Submit</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col bg-[#f8fafc] relative z-10">
          <div className="flex-1 overflow-y-auto p-4 md:p-10 pb-32 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-[2.5rem] shadow-xl shadow-green-900/5 border border-gray-100 p-8 md:p-12 mb-6 relative">
                <div className="absolute top-0 right-0 bg-green-50 text-green-800 px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-bl-[1.5rem] border-b border-l border-green-100">2.0 Marks</div>
                <div className="flex justify-between items-center mb-10 border-b border-gray-50 pb-6"><span className="font-black text-green-900 text-xs tracking-[0.3em] uppercase bg-green-50 px-4 py-1.5 rounded-full border border-green-100">Question {String(currentQIndex + 1).padStart(2, '0')} / {questions.length}</span></div>
                <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-relaxed mb-12 select-none font-sans text-left">{currentQ.question_text}</h2>
                <div className="grid gap-5 md:grid-cols-2">
                  {['A','B','C','D'].map((opt) => (
                    <button key={opt} onClick={() => handleSelect(opt)} className={`group relative p-6 rounded-3xl border-2 text-left transition-all duration-200 flex items-start gap-5 hover:shadow-lg active:scale-[0.98] ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50 ring-1 ring-green-600' : 'border-gray-100 bg-white hover:border-green-200'}`}>
                      <span className={`shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm border transition-colors ${answers[currentQ.id] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-400 border-gray-200 group-hover:bg-white'}`}>{opt}</span>
                      <span className={`font-bold text-base mt-2 ${answers[currentQ.id] === opt ? 'text-green-900' : 'text-gray-600'}`}>{currentQ[`option_${opt.toLowerCase()}`]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 md:relative bg-white/80 backdrop-blur-md border-t border-gray-100 p-5 flex justify-between items-center shrink-0 z-[170] md:pr-96">
            <button onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-gray-400 hover:text-green-900 hover:bg-green-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all uppercase tracking-widest text-xs"><ChevronLeft size={18} /> Previous</button>
            <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} disabled={currentQIndex === questions.length - 1} className="flex items-center gap-2 px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl bg-[#004d00] text-white hover:bg-green-900 active:scale-95">Next <ChevronRight size={18} /></button>
          </div>
        </div>
        <aside className={`fixed inset-x-0 bottom-0 z-[200] bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 border-t border-gray-100 ${showMap ? 'translate-y-0' : 'translate-y-full'} h-[60vh] flex flex-col`}>
          <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0 rounded-t-[2.5rem]"><span className="font-black text-xs uppercase tracking-widest text-gray-700 flex items-center gap-2"><Grid size={16} /> Question Matrix</span><button onClick={() => setShowMap(false)} className="p-2 bg-white rounded-xl shadow-sm"><X size={20}/></button></div>
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar"><div className="grid grid-cols-5 gap-3">{questions.map((q, i) => (<button key={q.id} onClick={() => navigateTo(i)} className={`h-12 rounded-2xl text-xs font-black transition-all border-2 ${getGridColor(i, q.id)}`}>{i + 1}</button>))}</div></div>
          <div className="p-6 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2 text-[8px] font-black uppercase tracking-tighter text-center"><div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-emerald-600 rounded-full"></div> Secured</div><div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-yellow-400 rounded-full"></div> Active</div><div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-red-50 border border-red-100 rounded-full"></div> Open</div></div>
        </aside>
      </div>
    </main>
  );
}

export default function ExamPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-green-900 font-black text-sm tracking-widest animate-pulse">INITIALIZING...</div>}>
      <ExamContent />
    </Suspense>
  );
}
