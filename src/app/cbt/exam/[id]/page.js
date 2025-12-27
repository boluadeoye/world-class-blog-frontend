"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { 
  Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, 
  BrainCircuit, Clock, ChevronRight, ChevronLeft, ShieldAlert, Loader2 
} from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

/* === 1. TIME EXPIRED OVERLAY === */
function TimeUpOverlay() {
  return (
    <div className="fixed inset-0 z-[600] bg-[#050505] flex flex-col items-center justify-center text-white p-6">
      <div className="w-20 h-20 bg-red-600/10 border-2 border-red-600 rounded-full flex items-center justify-center mb-6">
        <Clock size={40} className="text-red-500 animate-spin" />
      </div>
      <h2 className="text-3xl font-black uppercase tracking-widest mb-2">Time Expired</h2>
      <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest animate-pulse">Securing Responses...</p>
    </div>
  );
}

/* === 2. SUBMIT MODAL === */
function SubmitModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/90 backdrop-blur-sm p-6">
      <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full overflow-hidden border border-green-100">
        <div className="bg-green-50 p-6 flex flex-col items-center text-center">
          <CheckCircle size={40} className="text-green-600 mb-2" />
          <h3 className="font-black text-xl text-green-900 uppercase">Finalize?</h3>
        </div>
        <div className="p-4 bg-white flex gap-3">
          <button onClick={onCancel} className="flex-1 py-3 border-2 border-gray-100 rounded-xl text-xs font-black text-gray-400 uppercase">Review</button>
          <button onClick={onConfirm} className="flex-[1.5] py-3 bg-[#004d00] text-white rounded-xl text-xs font-black shadow-lg uppercase">Submit</button>
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

  useEffect(() => {
    if (!mounted || loading || isSubmitted || error || timeLeft === null || showUpgrade || isTimeUp) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) { 
          clearInterval(interval); 
          setIsTimeUp(true);
          setTimeout(submitExam, 3000);
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
  }, [loading, isSubmitted, error, timeLeft, showUpgrade, mounted, answers, currentQIndex, student, getStorageKey, submitExam, isTimeUp]);

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
    if (currentQIndex === index) return "bg-yellow-400 text-black border-yellow-500 ring-2 ring-yellow-100";
    if (answers[qId]) return "bg-emerald-600 text-white border-emerald-700";
    return "bg-red-50 text-red-400 border-red-100";
  };

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-green-900 font-black text-sm tracking-widest animate-pulse">INITIALIZING...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-black text-white px-6 py-2 rounded text-xs">RETRY</button></div>;

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-[#f8fafc] font-sans pb-20 overflow-y-auto">
        <header className="bg-[#002b00] text-white pt-6 pb-12 px-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex justify-between items-start mb-6">
            <div><div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Session Closed</div><h1 className="font-black text-xl tracking-tight">{course?.code}</h1></div>
            <button onClick={() => router.push('/cbt/dashboard')} className="bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase">Exit</button>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className={`text-6xl font-black tracking-tighter ${percentage >= 50 ? 'text-white' : 'text-red-400'}`}>{percentage}%</div>
            <div className="flex gap-4 mt-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
              <span>Score: {score}/{questions.length}</span>
              <span>•</span>
              <span className={percentage >= 50 ? 'text-green-400' : 'text-red-400'}>{percentage >= 50 ? 'PASSED' : 'FAILED'}</span>
            </div>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg p-1 mb-6 flex gap-1 border border-gray-100">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'corrections' ? 'bg-[#004d00] text-white shadow-md' : 'text-gray-400'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-900 text-white shadow-md' : 'text-gray-400'}`}><Sparkles size={12} /> AI Strategist</button>
          </div>
          {activeTab === "corrections" ? (
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={q.id} className={`bg-white p-4 rounded-2xl shadow-sm border-l-4 ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-2"><span className="text-[9px] font-black text-gray-400 uppercase">Q{i+1}</span>{answers[q.id] === q.correct_option ? <CheckCircle size={16} className="text-green-600" /> : <X size={16} className="text-red-500" />}</div>
                  <p className="font-bold text-gray-900 text-xs leading-relaxed mb-3">{q.question_text}</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-green-50 p-2 rounded-lg"><p className="text-[8px] font-black text-green-800 uppercase">Correct</p><p className="text-xs font-bold text-green-900">{q.correct_option}</p></div>
                    {answers[q.id] !== q.correct_option && <div className="bg-red-50 p-2 rounded-lg"><p className="text-[8px] font-black text-red-800 uppercase">Yours</p><p className="text-xs font-bold text-red-900">{answers[q.id] || "Skipped"}</p></div>}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 min-h-[300px] relative">
              {!isPremium ? (
                <div className="text-center py-10">
                  <Crown size={32} className="mx-auto text-yellow-500 mb-4" />
                  <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-6">Restricted Intel</h3>
                  <button onClick={() => setShowUpgrade(true)} className="bg-black text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Unlock Report</button>
                </div>
              ) : (
                <div className="p-2">
                  {!analysis ? (
                    <div className="text-center py-10">
                      <BrainCircuit size={40} className="mx-auto text-purple-600 mb-4 animate-pulse" />
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">{analyzing ? "Computing..." : "Run Diagnostics"}</button>
                    </div>
                  ) : <div className="prose prose-sm max-w-none text-gray-700"><ReactMarkdown>{analysis}</ReactMarkdown></div>}
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
  if (!currentQ) return <div className="h-screen flex items-center justify-center bg-white font-bold text-xs tracking-widest text-green-900">SYNCING...</div>;

  return (
    <main className="h-screen flex flex-col bg-[#f8fafc] font-sans overflow-hidden select-none">
      {isTimeUp && <TimeUpOverlay />}
      <SubmitModal isOpen={showSubmitModal} onConfirm={submitExam} onCancel={() => setShowSubmitModal(false)} />
      
      {/* HEADER: COMPACT & VISIBLE */}
      <header className="h-14 bg-[#004d00] text-white flex justify-between items-center px-4 shrink-0 z-[160] border-b border-green-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#004d00] font-black text-sm shadow-inner">{student?.name?.charAt(0).toUpperCase()}</div>
          <div className="leading-tight">
            <h1 className="font-black text-[10px] uppercase tracking-widest text-green-100 truncate w-24">{student?.name}</h1>
            <p className="text-[9px] font-mono opacity-70">{course?.code}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full border border-white/10 ${timeLeft < 300 ? 'animate-pulse bg-red-900/50 border-red-500' : ''}`}>
            <Clock size={12} className={timeLeft < 300 ? "text-red-500" : "text-green-400"} />
            <span className={`font-mono font-black text-sm tracking-widest ${timeLeft < 300 ? "text-red-500" : "text-white"}`}>{formatTime(timeLeft || 0)}</span>
          </div>
          <button onClick={() => setShowSubmitModal(true)} className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95">Submit</button>
        </div>
      </header>

      {/* CONTENT AREA: NO SCROLL */}
      <div className="flex-1 flex flex-col p-3 overflow-hidden relative">
        <div className="flex-1 bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 p-4 flex flex-col justify-between relative overflow-hidden">
          
          {/* Question Header */}
          <div className="flex justify-between items-center mb-2 shrink-0">
            <span className="font-black text-green-900 text-[9px] tracking-[0.2em] uppercase bg-green-50 px-2 py-1 rounded-lg border border-green-100">Q {String(currentQIndex + 1).padStart(2, '0')} / {questions.length}</span>
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">2.0 Marks</span>
          </div>
          
          {/* Question Text: Scrollable only if text is massive */}
          <div className="flex-1 flex items-center justify-center py-2 overflow-y-auto custom-scrollbar">
            <h2 className="text-sm md:text-lg font-bold text-gray-900 leading-snug text-center px-2">
              {currentQ.question_text}
            </h2>
          </div>

          {/* Options Grid: Tighter & Visible */}
          <div className="grid grid-cols-1 gap-2 mt-2 shrink-0">
            {['A','B','C','D'].map((opt) => (
              <button 
                key={opt} 
                onClick={() => handleSelect(opt)} 
                className={`group p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-3 active:scale-[0.98] ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50' : 'border-gray-100 bg-white'}`}
              >
                <span className={`shrink-0 w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs border transition-colors ${answers[currentQ.id] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-400 border-gray-200'}`}>
                  {opt}
                </span>
                <span className={`font-bold text-xs leading-tight ${answers[currentQ.id] === opt ? 'text-green-900' : 'text-gray-600'}`}>
                  {currentQ[`option_${opt.toLowerCase()}`]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER: FIXED & COMPACT */}
      <footer className="h-16 bg-white border-t border-gray-100 flex justify-between items-center px-6 shrink-0">
        <button 
          onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} 
          disabled={currentQIndex === 0} 
          className="text-[10px] font-black text-gray-400 uppercase tracking-widest disabled:opacity-20"
        >
          [ PREV ]
        </button>
        
        <button 
          onClick={() => setShowMap(true)} 
          className="bg-gray-100 text-gray-600 p-3 rounded-2xl hover:bg-gray-200 transition-colors"
        >
          <Grid size={20} />
        </button>

        <button 
          onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} 
          disabled={currentQIndex === questions.length - 1} 
          className={`px-8 py-3 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg ${currentQIndex === questions.length - 1 ? 'bg-gray-100 text-gray-400' : 'bg-[#004d00] text-white active:scale-95'}`}
        >
          Next
        </button>
      </footer>

      {/* MATRIX DRAWER: SLIDE UP (50% HEIGHT) */}
      <aside className={`fixed inset-x-0 bottom-0 z-[200] bg-white rounded-t-[2.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] transition-transform duration-300 border-t border-gray-100 ${showMap ? 'translate-y-0' : 'translate-y-full'} h-[60vh] flex flex-col`}>
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0 rounded-t-[2.5rem]">
          <span className="font-black text-xs uppercase tracking-widest text-gray-700 flex items-center gap-2"><Grid size={16} /> Question Matrix</span>
          <button onClick={() => setShowMap(false)} className="p-2 bg-white rounded-xl shadow-sm"><X size={20}/></button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-5 gap-3">
            {questions.map((q, i) => (
              <button key={q.id} onClick={() => navigateTo(i)} className={`h-12 rounded-2xl text-xs font-black transition-all border-2 ${getGridColor(i, q.id)}`}>{i + 1}</button>
            ))}
          </div>
        </div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2 text-[8px] font-black uppercase tracking-tighter text-center">
           <div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-emerald-600 rounded-full"></div> Secured</div>
           <div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-yellow-400 rounded-full"></div> Active</div>
           <div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-red-50 border border-red-100 rounded-full"></div> Open</div>
        </div>
      </aside>
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
