"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, 
  BrainCircuit, Lock, ShieldAlert, Timer, ChevronRight, ChevronLeft 
} from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import { motion, AnimatePresence } from "framer-motion";

// Dynamic import for Upgrade Modal
const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

/* === SECURITY & UI COMPONENTS === */

function MalpracticeOverlay({ count }) {
  return (
    <div className="fixed inset-0 z-[999] bg-red-900/95 flex flex-col items-center justify-center text-white animate-pulse">
      <ShieldAlert size={80} className="mb-4" />
      <h2 className="text-4xl font-black uppercase tracking-widest">Malpractice Detected</h2>
      <p className="text-xl font-mono mt-2">Focus Violation #{count}</p>
      <p className="text-sm opacity-75 mt-8">System is recalibrating... Do not leave the exam window.</p>
    </div>
  );
}

function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, type = "warning" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }} 
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden border-t-4 border-green-600"
      >
        <div className="p-6 text-center">
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${type === 'danger' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {type === 'danger' ? <AlertOctagon size={32} /> : <CheckCircle size={32} />}
          </div>
          <h3 className="text-xl font-black text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-500 text-sm font-medium leading-relaxed">{message}</p>
        </div>
        <div className="bg-gray-50 p-4 flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 rounded-xl font-bold text-gray-600 hover:bg-gray-200 transition-colors text-sm">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 py-3 rounded-xl font-bold text-white text-sm shadow-lg ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#004d00] hover:bg-green-900'}`}>
            {type === 'danger' ? "End Exam" : "Confirm"}
          </button>
        </div>
      </motion.div>
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
  
  // UI State
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [modalConfig, setModalConfig] = useState({ show: false });
  const [activeTab, setActiveTab] = useState("corrections");
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  
  // Premium & Security
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [malpracticeCount, setMalpracticeCount] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);

  const getStorageKey = useCallback((email) => `cbt_session_${params.id}_${email}`, [params.id]);

  // 1. Security: Disable Context Menu & Copy
  useEffect(() => {
    const handleContextMenu = (e) => e.preventDefault();
    const handleKeyDown = (e) => {
      // Prevent Copy/Paste shortcuts
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v' || e.key === 'p')) {
        e.preventDefault();
      }
    };
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // 2. Security: Malpractice Monitor (Tab Switching)
  useEffect(() => {
    if (!mounted || isSubmitted) return;
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setMalpracticeCount(prev => {
          const newCount = prev + 1;
          // Trigger Freeze Penalty
          setIsFrozen(true);
          setTimeout(() => setIsFrozen(false), 3000); // 3s Penalty Freeze
          return newCount;
        });
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [mounted, isSubmitted]);

  // 3. Initialization
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
        setQuestions(data.questions);
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

  // 4. Submission Logic
  const submitExam = useCallback(() => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    setScore(correctCount);
    if (student) localStorage.removeItem(getStorageKey(student.email));
    setModalConfig({ show: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, answers, student, getStorageKey]);

  // 5. Timer & Auto-Save
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

  // 6. Keyboard Navigation (A, B, C, D, N, P)
  useEffect(() => {
    if (isSubmitted || loading) return;
    const handleKeyNav = (e) => {
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) handleSelect(key);
      if (key === 'N' || key === 'ArrowRight') navigateTo(Math.min(questions.length - 1, currentQIndex + 1));
      if (key === 'P' || key === 'ArrowLeft') navigateTo(Math.max(0, currentQIndex - 1));
    };
    window.addEventListener('keydown', handleKeyNav);
    return () => window.removeEventListener('keydown', handleKeyNav);
  }, [currentQIndex, questions, isSubmitted, loading]);

  // Actions
  const confirmSubmit = () => {
    setModalConfig({
      show: true,
      title: "Final Submission",
      message: "You are about to submit your exam. This action is irreversible.",
      type: "warning",
      action: submitExam
    });
  };

  const handleSelect = (option) => {
    if (isSubmitted) return;
    const qId = questions[currentQIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const navigateTo = (index) => { setCurrentQIndex(index); setShowMobileMap(false); };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec < 10 ? '0' : ''}${sec}`;
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

  // Render Helpers
  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-900 text-green-500 font-mono font-bold text-xl tracking-widest">SYSTEM BOOT_SEQUENCE...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-gray-900 text-white px-6 py-2 rounded-full">Retry</button></div>;

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 font-sans pb-20 select-none">
        <header className="bg-[#004d00] text-white p-5 shadow-lg flex justify-between items-center sticky top-0 z-50">
          <h1 className="font-black tracking-tight flex items-center gap-2"><ShieldAlert size={18} /> EXAM REPORT</h1>
          <button onClick={() => router.push('/cbt/dashboard')} className="text-xs bg-white text-green-900 px-5 py-2 rounded-full font-black hover:bg-green-50 transition-colors">EXIT CONSOLE</button>
        </header>
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-8 border-t-8 border-green-600 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-green-800"></div>
            <h2 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Performance Index</h2>
            <div className={`text-8xl font-black tracking-tighter ${percentage >= 50 ? 'text-[#004d00]' : 'text-red-600'}`}>{score}<span className="text-4xl text-gray-300">/{questions.length}</span></div>
            <p className="text-xl font-bold mt-2 text-gray-600">{percentage}% Accuracy</p>
          </div>

          <div className="flex gap-2 mb-8 bg-gray-200 p-1.5 rounded-2xl">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'corrections' ? 'bg-white text-green-900 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}>CORRECTIONS</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3 text-sm font-black rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-white text-purple-900 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}><Sparkles size={16} /> AI COACH</button>
          </div>

          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`p-6 rounded-2xl border-l-8 bg-white shadow-sm ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-black text-gray-300 text-2xl">#{i+1}</span>
                    {answers[q.id] === q.correct_option ? <CheckCircle className="text-green-500" /> : <X className="text-red-500" />}
                  </div>
                  <p className="font-bold text-gray-800 mb-4 text-lg leading-relaxed">{q.question_text}</p>
                  <div className="grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-green-700 font-bold bg-green-50 p-3 rounded-lg border border-green-100">
                      <CheckCircle size={16} /> Correct: {q.correct_option}
                    </div>
                    {answers[q.id] !== q.correct_option && (
                      <div className="flex items-center gap-2 text-red-700 font-bold bg-red-50 p-3 rounded-lg border border-red-100">
                        <X size={16} /> Your Choice: {answers[q.id] || "Skipped"}
                      </div>
                    )}
                  </div>
                  {isPremium && q.explanation && <div className="mt-4 p-4 bg-blue-50 rounded-xl text-sm text-blue-800 border border-blue-100"><span className="font-black uppercase text-xs block mb-1 text-blue-400">Explanation</span>{q.explanation}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden relative min-h-[400px]">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600 animate-bounce"><Crown size={40} /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Premium Intelligence</h3>
                  <p className="text-gray-500 mb-8 max-w-xs font-medium">Unlock detailed AI analysis of your performance.</p>
                  <button onClick={() => setShowUpgrade(true)} className="bg-gray-900 text-white px-10 py-4 rounded-full font-black shadow-xl hover:scale-105 transition-transform">UNLOCK NOW</button>
                </div>
              ) : (
                <div className="p-8">
                  {!analysis ? (
                    <div className="text-center py-20">
                      <BrainCircuit size={64} className="mx-auto text-purple-200 mb-6 animate-pulse" />
                      <h3 className="text-2xl font-black text-gray-800 mb-3">AI Performance Engine</h3>
                      <p className="text-gray-500 mb-8 font-medium">Analyzing {questions.length - score} failed responses...</p>
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-600 text-white px-12 py-4 rounded-full font-black hover:bg-purple-700 shadow-xl disabled:opacity-50 transition-all">{analyzing ? "PROCESSING..." : "GENERATE REPORT"}</button>
                    </div>
                  ) : (
                    <div className="prose prose-slate max-w-none"><ReactMarkdown>{analysis}</ReactMarkdown></div>
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
    <main className="fixed inset-0 bg-[#f0f2f5] flex flex-col font-sans h-screen overflow-hidden z-[150] select-none" onContextMenu={(e) => e.preventDefault()}>
      {isFrozen && <MalpracticeOverlay count={malpracticeCount} />}
      <ConfirmModal isOpen={modalConfig.show} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} onConfirm={modalConfig.action} onCancel={() => setModalConfig({ ...modalConfig, show: false })} />

      {/* HEADER: JAMB STYLE */}
      <header className="bg-[#004d00] text-white h-16 flex justify-between items-center shadow-2xl shrink-0 z-[160] px-4 border-b-4 border-green-600">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#004d00] font-black text-lg shadow-inner">
            {student?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="hidden sm:block leading-tight">
            <h1 className="font-black text-sm uppercase tracking-wide">{student?.name}</h1>
            <div className="flex items-center gap-2 text-[10px] font-mono opacity-80">
              <span>ID: {student?.id?.slice(0,8)}</span>
              <span className="w-1 h-1 bg-white rounded-full"></span>
              <span>{course?.code}</span>
            </div>
          </div>
          <button onClick={() => setShowMobileMap(!showMobileMap)} className="sm:hidden flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-md text-xs font-black uppercase border border-white/20">
            <Grid size={14} /> Map
          </button>
        </div>

        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 bg-black/30 px-4 py-1.5 rounded-lg border border-white/10 ${timeLeft < 300 ? 'animate-pulse bg-red-900/50 border-red-500' : ''}`}>
            <Timer size={16} className="text-green-400" />
            <span className="font-mono font-black text-xl tracking-widest">{formatTime(timeLeft || 0)}</span>
          </div>
          <button onClick={confirmSubmit} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-xs font-black uppercase shadow-lg transition-all hover:scale-105">
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
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-10 mb-6">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <span className="font-black text-[#004d00] text-sm tracking-widest uppercase bg-green-50 px-3 py-1 rounded-full">Question {currentQIndex + 1} of {questions.length}</span>
                  <span className="text-xs font-bold text-gray-400 uppercase">Single Choice</span>
                </div>
                
                <AnimatePresence mode="wait">
                  <motion.h2 
                    key={currentQ.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed mb-8 select-none"
                  >
                    {currentQ.question_text}
                  </motion.h2>
                </AnimatePresence>

                <div className="grid gap-4 md:grid-cols-2">
                  {['A','B','C','D'].map((opt) => (
                    <button 
                      key={opt} 
                      onClick={() => handleSelect(opt)} 
                      className={`group relative p-4 rounded-xl border-2 text-left transition-all duration-200 flex items-start gap-4 hover:shadow-md ${answers[currentQ.id] === opt ? 'border-[#004d00] bg-green-50 ring-1 ring-[#004d00]' : 'border-gray-200 bg-white hover:border-green-300'}`}
                    >
                      <span className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm border transition-colors ${answers[currentQ.id] === opt ? 'bg-[#004d00] text-white border-[#004d00]' : 'bg-gray-100 text-gray-500 border-gray-300 group-hover:bg-white'}`}>
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
              className="flex items-center gap-2 px-6 py-3 font-bold text-gray-500 hover:text-[#004d00] disabled:opacity-30 disabled:hover:text-gray-500 transition-colors"
            >
              <ChevronLeft size={20} /> PREV
            </button>
            
            <div className="hidden md:flex gap-2">
              {questions.map((_, i) => (
                Math.abs(currentQIndex - i) < 4 && (
                  <button 
                    key={i} 
                    onClick={() => navigateTo(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === currentQIndex ? 'bg-[#004d00] w-6' : answers[questions[i].id] ? 'bg-green-400' : 'bg-gray-300'}`}
                  />
                )
              ))}
            </div>

            <button 
              onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} 
              disabled={isLastQuestion} 
              className={`flex items-center gap-2 px-8 py-3 rounded-xl font-black uppercase tracking-wide text-sm transition-all shadow-lg ${isLastQuestion ? 'bg-gray-100 text-gray-400' : 'bg-[#004d00] text-white hover:bg-green-900 hover:scale-105'}`}
            >
              NEXT <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* SIDEBAR PALETTE */}
        <aside className={`absolute inset-0 z-[180] bg-white flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:w-80 md:border-l border-gray-200 shadow-2xl md:shadow-none ${showMobileMap ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 bg-[#004d00] text-white font-black text-xs uppercase flex justify-between items-center shrink-0">
            <span className="flex items-center gap-2"><Grid size={14} /> Question Matrix</span>
            <button onClick={() => setShowMobileMap(false)} className="md:hidden p-1 hover:bg-white/20 rounded"><X size={18}/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-gray-50">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => {
                const isAnswered = !!answers[q.id];
                const isCurrent = currentQIndex === i;
                return (
                  <button 
                    key={q.id} 
                    onClick={() => navigateTo(i)} 
                    className={`
                      h-10 w-full rounded-lg text-xs font-black transition-all border
                      ${isCurrent ? 'bg-[#004d00] text-white border-[#004d00] ring-2 ring-green-200 scale-110 z-10' : 
                        isAnswered ? 'bg-green-100 text-green-800 border-green-200' : 
                        'bg-white text-gray-400 border-gray-200 hover:border-gray-400'}
                    `}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>
          
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="grid grid-cols-2 gap-3 text-[10px] font-bold text-gray-500 uppercase">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-100 border border-green-200 rounded"></div> Answered</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#004d00] rounded"></div> Current</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300 rounded"></div> Pending</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
