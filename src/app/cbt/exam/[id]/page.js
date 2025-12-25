"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
// STRICTLY SAFE ICONS ONLY (No ShieldAlert, No Lock, No Clock)
import { Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

// RELATIVE IMPORT (PROVEN STABLE)
const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

/* === TACTICAL COMPONENTS === */

function MalpracticeOverlay({ count }) {
  return (
    <div className="fixed inset-0 z-[999] bg-red-950/95 flex flex-col items-center justify-center text-white animate-pulse select-none">
      {/* FIXED: Used AlertOctagon instead of ShieldAlert */}
      <AlertOctagon size={80} className="mb-6 text-red-500" />
      <h2 className="text-5xl font-black uppercase tracking-[0.2em] text-center mb-2">VIOLATION</h2>
      <div className="bg-red-900/50 border border-red-500 px-6 py-2 rounded font-mono text-xl">
        FOCUS_LOST_EVENT_ID: #{String(count).padStart(4, '0')}
      </div>
      <p className="text-sm text-red-300 mt-8 font-mono uppercase tracking-widest">System Recalibrating... Do not leave terminal.</p>
    </div>
  );
}

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, type = "warning" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-none border-l-4 border-green-600 shadow-2xl max-w-sm w-full overflow-hidden">
        <div className={`p-4 ${type === 'danger' ? 'bg-red-600' : 'bg-[#004d00]'} text-white font-bold flex items-center gap-3 uppercase tracking-wider text-sm`}>
          <AlertOctagon size={18} />
          {title}
        </div>
        <div className="p-8 bg-gray-50">
          <p className="text-gray-800 font-medium mb-8 text-sm leading-relaxed">{message}</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 border-2 border-gray-300 font-black text-gray-500 hover:bg-gray-200 text-xs uppercase tracking-widest transition-colors">Cancel</button>
            <button onClick={onConfirm} className={`flex-1 py-3 font-black text-white text-xs uppercase tracking-widest shadow-lg transition-transform active:scale-95 ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#004d00] hover:bg-green-900'}`}>
              {type === 'danger' ? "ABORT" : "CONFIRM"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();

  // Core State
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Exam State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  // UI & Features
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [modalConfig, setModalConfig] = useState({ show: false });
  const [activeTab, setActiveTab] = useState("corrections");
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  
  // IRON MODE STATE
  const [malpracticeCount, setMalpracticeCount] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);

  const getStorageKey = useCallback((email) => `cbt_session_${params.id}_${email}`, [params.id]);

  // 1. IRON MODE SECURITY
  useEffect(() => {
    if (!mounted || isSubmitted) return;

    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'p')) {
        e.preventDefault();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setMalpracticeCount(prev => {
          const newCount = prev + 1;
          setIsFrozen(true);
          setTimeout(() => setIsFrozen(false), 3000);
          return newCount;
        });
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [mounted, isSubmitted]);

  // 2. Data Loading
  useEffect(() => {
    setMounted(true);
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }

    let parsedStudent;
    try {
      parsedStudent = JSON.parse(studentData);
      setStudent(parsedStudent);
    } catch (e) { router.push("/cbt"); return; }

    async function loadExam() {
      try {
        const query = new URLSearchParams({
          courseId: params.id,
          studentId: parsedStudent.id,
          token: parsedStudent.session_token || ""
        });

        const res = await fetch(`/api/cbt/exam?${query.toString()}`);
        const data = await res.json();

        if (res.status === 401) { router.push("/cbt"); return; }
        if (res.status === 403) { setShowUpgrade(true); setLoading(false); return; }
        if (!res.ok) throw new Error(data.error || "Failed to load");

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
          setTimeLeft((data.course?.duration || 15) * 60);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, [params.id, router, getStorageKey]);

  // 3. Submit Logic
  const submitExam = useCallback(() => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    setScore(correctCount);
    if (student) localStorage.removeItem(getStorageKey(student.email));
    setModalConfig({ show: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, answers, student, getStorageKey]);

  // 4. Timer
  useEffect(() => {
    if (!mounted || loading || isSubmitted || error || timeLeft === null || showUpgrade || isFrozen) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) { clearInterval(interval); submitExam(); return 0; }
        const newTime = prev - 1;
        if (student && newTime % 5 === 0) {
          localStorage.setItem(getStorageKey(student.email), JSON.stringify({
            answers, timeLeft: newTime, currentIndex: currentQIndex
          }));
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, isSubmitted, error, timeLeft, showUpgrade, mounted, answers, currentQIndex, student, getStorageKey, submitExam, isFrozen]);

  // 5. UI Actions
  const confirmSubmit = () => {
    setModalConfig({
      show: true,
      title: "CONFIRM SUBMISSION",
      message: "You are about to terminate this session. This action is irreversible.",
      type: "warning",
      action: submitExam
    });
  };

  const handleSelect = (option) => {
    if (isSubmitted) return;
    const qId = questions[currentQIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const generateAnalysis = async () => {
    setAnalyzing(true);
    const failedQuestions = questions.filter(q => answers[q.id] !== q.correct_option).map(q => ({
      question_text: q.question_text,
      correct_option: q.correct_option,
      user_choice: answers[q.id] || "Skipped"
    }));

    try {
      const res = await fetch("/api/cbt/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student.id, failedQuestions })
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (e) { alert("AI Analysis failed."); } 
    finally { setAnalyzing(false); }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const navigateTo = (index) => { setCurrentQIndex(index); setShowMobileMap(false); };
  
  const getGridColor = (index, qId) => {
    if (currentQIndex === index) return "bg-[#004d00] text-white border-[#004d00] ring-2 ring-green-400 shadow-lg scale-110 z-10"; 
    if (answers[qId]) return "bg-green-100 text-green-900 border-green-300";
    return "bg-white text-gray-400 border-gray-200 hover:border-gray-400";
  };

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-green-500 font-mono font-bold text-xl tracking-widest"><AlertOctagon className="animate-pulse mb-4" size={48} />INITIALIZING_IRON_MODE...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-gray-900 text-white px-6 py-2 rounded-full">Retry</button></div>;

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 font-sans pb-20 select-none">
        <header className="bg-[#004d00] text-white p-5 shadow-lg flex justify-between items-center sticky top-0 z-50 border-b-4 border-green-600">
          <h1 className="font-black tracking-tight flex items-center gap-2"><AlertOctagon size={18} /> SESSION REPORT</h1>
          <button onClick={() => router.push('/cbt/dashboard')} className="text-xs bg-white text-green-900 px-5 py-2 rounded-none font-black hover:bg-green-50 transition-colors uppercase tracking-widest">Exit Console</button>
        </header>
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="bg-white shadow-xl p-8 text-center mb-8 border-t-8 border-green-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-green-800"></div>
            <h2 className="text-gray-400 font-bold uppercase tracking-[0.3em] text-xs mb-4">Performance Index</h2>
            <div className={`text-8xl font-black tracking-tighter ${percentage >= 50 ? 'text-[#004d00]' : 'text-red-600'}`}>{score}<span className="text-4xl text-gray-300">/{questions.length}</span></div>
            <p className="text-xl font-bold mt-2 text-gray-600 font-mono">{percentage}% ACCURACY</p>
          </div>

          <div className="flex gap-2 mb-8 bg-gray-200 p-1 rounded">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'corrections' ? 'bg-white text-green-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3 text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-white text-purple-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}><Sparkles size={14} /> AI Coach</button>
          </div>

          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`p-6 border-l-4 bg-white shadow-sm ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-black text-gray-300 text-xl font-mono">#{String(i+1).padStart(2, '0')}</span>
                    {answers[q.id] === q.correct_option ? <CheckCircle className="text-green-600" size={20} /> : <X className="text-red-500" size={20} />}
                  </div>
                  <p className="font-bold text-gray-800 mb-4 text-lg leading-relaxed">{q.question_text}</p>
                  <div className="grid gap-2 text-sm font-mono">
                    <div className="flex items-center gap-2 text-green-800 font-bold bg-green-50 p-3 border border-green-100">
                      <CheckCircle size={14} /> CORRECT: {q.correct_option}
                    </div>
                    {answers[q.id] !== q.correct_option && (
                      <div className="flex items-center gap-2 text-red-800 font-bold bg-red-50 p-3 border border-red-100">
                        <X size={14} /> YOUR CHOICE: {answers[q.id] || "SKIPPED"}
                      </div>
                    )}
                  </div>
                  {isPremium && q.explanation && <div className="mt-4 p-4 bg-blue-50 text-sm text-blue-900 border-l-4 border-blue-500"><span className="font-black uppercase text-xs block mb-1 text-blue-400">Intel</span>{q.explanation}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white shadow-xl border border-purple-100 overflow-hidden relative min-h-[400px]">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600 animate-bounce"><Crown size={40} /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">RESTRICTED ACCESS</h3>
                  <p className="text-gray-500 mb-8 max-w-xs font-medium">AI Analysis requires Premium Clearance.</p>
                  <button onClick={() => setShowUpgrade(true)} className="bg-black text-white px-10 py-4 font-black shadow-xl hover:scale-105 transition-transform uppercase tracking-widest text-xs">Unlock Access</button>
                </div>
              ) : (
                <div className="p-8">
                  {!analysis ? (
                    <div className="text-center py-20">
                      <BrainCircuit size={64} className="mx-auto text-purple-900 mb-6 animate-pulse" />
                      <h3 className="text-2xl font-black text-gray-800 mb-3">AI TACTICAL ENGINE</h3>
                      <p className="text-gray-500 mb-8 font-mono text-xs uppercase tracking-widest">Processing {questions.length - score} failed vectors...</p>
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-900 text-white px-12 py-4 font-black hover:bg-purple-800 shadow-xl disabled:opacity-50 transition-all uppercase tracking-widest text-xs">{analyzing ? "COMPUTING..." : "INITIATE ANALYSIS"}</button>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none font-mono text-sm"><ReactMarkdown>{analysis}</ReactMarkdown></div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    );
  }

  // === EXAM VIEW ===
  const currentQ = questions[currentQIndex];
  const isLastQuestion = questions.length > 0 && currentQIndex === questions.length - 1;

  if (!currentQ) return <div className="h-screen flex items-center justify-center bg-white font-bold">Synchronizing...</div>;

  return (
    <main className="fixed inset-0 bg-gray-100 flex flex-col font-sans h-screen overflow-hidden z-[150] select-none" onContextMenu={(e) => e.preventDefault()}>
      {isFrozen && <MalpracticeOverlay count={malpracticeCount} />}
      <ConfirmModal isOpen={modalConfig.show} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} onConfirm={modalConfig.action} onCancel={() => setModalConfig({ ...modalConfig, show: false })} />

      {/* TACTICAL HEADER */}
      <header className="bg-[#004d00] text-white h-16 flex justify-between items-center shadow-2xl shrink-0 z-[160] px-4 border-b-4 border-green-600">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-none flex items-center justify-center text-[#004d00] font-black text-lg shadow-inner border border-green-800">
            {student?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block leading-tight">
            <h1 className="font-black text-xs uppercase tracking-widest">{student?.name}</h1>
            <div className="flex items-center gap-2 text-[10px] font-mono opacity-80">
              <span>ID: {student?.id?.slice(0,8)}</span>
              <span className="text-green-400">●</span>
              <span>{course?.code}</span>
            </div>
          </div>
          <button onClick={() => setShowMobileMap(!showMobileMap)} className="sm:hidden flex items-center gap-2 bg-white/10 px-3 py-1.5 border border-white/20 text-xs font-black uppercase tracking-widest">
            <Grid size={14} /> Map
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 bg-black/40 px-4 py-1.5 border border-green-800 ${timeLeft < 300 ? 'animate-pulse bg-red-900/50 border-red-500' : ''}`}>
            <span className={`font-mono font-black text-xl tracking-widest ${timeLeft < 300 ? "text-red-500" : "text-white"}`}>{formatTime(timeLeft || 0)}</span>
          </div>
          <button onClick={confirmSubmit} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-xs font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 border-b-4 border-red-900 active:border-b-0 active:translate-y-1">
            Submit
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* MAIN QUESTION AREA */}
        <div className="flex-1 flex flex-col bg-[#f0f2f5] relative z-10">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
              {/* Question Card */}
              <div className="bg-white shadow-sm border-t-4 border-[#004d00] p-6 md:p-10 mb-6 relative">
                <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Single Choice</div>
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                  <span className="font-black text-[#004d00] text-xs tracking-[0.2em] uppercase bg-green-50 px-3 py-1 border border-green-100">Question {String(currentQIndex + 1).padStart(2, '0')} / {questions.length}</span>
                </div>
                
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed mb-10 select-none font-sans">
                  {currentQ.question_text}
                </h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {['A','B','C','D'].map((opt) => (
                    <button 
                      key={opt} 
                      onClick={() => handleSelect(opt)} 
                      className={`group relative p-5 border-2 text-left transition-all duration-150 flex items-start gap-4 hover:shadow-md active:scale-[0.99] ${answers[currentQ.id] === opt ? 'border-[#004d00] bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'}`}
                    >
                      <span className={`shrink-0 w-8 h-8 flex items-center justify-center font-black text-sm border transition-colors ${answers[currentQ.id] === opt ? 'bg-[#004d00] text-white border-[#004d00]' : 'bg-gray-100 text-gray-500 border-gray-300 group-hover:bg-white'}`}>
                        {opt}
                      </span>
                      <span className={`font-medium text-base mt-1 ${answers[currentQ.id] === opt ? 'text-[#004d00] font-bold' : 'text-gray-700'}`}>
                        {currentQ[`option_${opt.toLowerCase()}`]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER NAV */}
          <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-gray-200 p-4 flex justify-between items-center shrink-0 z-[170] md:pr-80 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <button 
              onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} 
              disabled={currentQIndex === 0} 
              className="flex items-center gap-2 px-6 py-3 font-black text-gray-400 hover:text-[#004d00] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors uppercase tracking-widest text-xs"
            >
              [ PREV ]
            </button>
            
            <button 
              onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} 
              disabled={isLastQuestion} 
              className={`flex items-center gap-2 px-8 py-3 font-black uppercase tracking-widest text-xs transition-all shadow-lg border-b-4 active:border-b-0 active:translate-y-1 ${isLastQuestion ? 'bg-gray-100 text-gray-400 border-gray-200' : 'bg-[#004d00] text-white border-green-900 hover:bg-green-900'}`}
            >
              [ NEXT ]
            </button>
          </div>
        </div>

        {/* SIDEBAR PALETTE */}
        <aside className={`absolute inset-0 z-[180] bg-white flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:w-80 md:border-l border-gray-200 shadow-2xl md:shadow-none ${showMobileMap ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 bg-[#004d00] text-white font-black text-xs uppercase flex justify-between items-center shrink-0 tracking-widest">
            <span className="flex items-center gap-2"><Grid size={14} /> Matrix</span>
            <button onClick={() => setShowMobileMap(false)} className="md:hidden p-1 hover:bg-white/20 rounded"><X size={18}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-50">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button 
                  key={q.id} 
                  onClick={() => navigateTo(i)} 
                  className={`
                    h-10 w-full text-xs font-black transition-all border
                    ${getGridColor(i, q.id)}
                  `}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-100 border border-green-300"></div> Answered</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#004d00]"></div> Active</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300"></div> Pending</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
