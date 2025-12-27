"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, BrainCircuit, Clock, ChevronRight, ChevronLeft, AlertTriangle } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

/* === MODAL === */
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, type = "warning", singleButton = false }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xs w-full overflow-hidden transform transition-all scale-100">
        <div className={`p-4 flex items-center gap-3 ${type === 'danger' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-800'}`}>
          {type === 'danger' ? <AlertOctagon size={20} /> : <CheckCircle size={20} />}
          <h3 className="font-black text-sm uppercase tracking-wide">{title}</h3>
        </div>
        <div className="p-6">
          <p className="text-gray-600 text-xs font-bold mb-6 leading-relaxed">{message}</p>
          <div className="flex gap-3">
            {!singleButton && <button onClick={onCancel} className="flex-1 py-3 border-2 border-gray-100 rounded-xl text-xs font-black text-gray-400 hover:bg-gray-50">CANCEL</button>}
            <button onClick={onConfirm} className={`flex-1 py-3 rounded-xl text-xs font-black text-white shadow-lg ${type === 'danger' ? 'bg-red-600' : 'bg-green-800'}`}>{singleButton ? "CLOSE" : "CONFIRM"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamPage() {
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
  const [score, setScore] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [modalConfig, setModalConfig] = useState({ show: false });
  const [activeTab, setActiveTab] = useState("corrections");
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const getStorageKey = useCallback((email) => `cbt_session_${params.id}_${email}`, [params.id]);

  useEffect(() => {
    setMounted(true);
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }

    let parsedStudent;
    try {
      parsedStudent = JSON.parse(studentData);
      setStudent(parsedStudent);
    } catch (e) { router.push("/cbt"); return; }

    // TIMEOUT LOGIC: Force stop spinning after 15 seconds
    const timeoutId = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError("Connection Timeout. Server is busy.");
      }
    }, 15000);

    async function loadExam() {
      try {
        const query = new URLSearchParams({
          courseId: params.id,
          studentId: parsedStudent.id,
          token: parsedStudent.session_token || ""
        });
        const res = await fetch(`/api/cbt/exam?${query.toString()}`);
        const data = await res.json();

        if (res.status === 401) { 
          alert("Session Expired: You logged in on another device.");
          router.push("/cbt"); 
          return; 
        }
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
          const requestedDuration = searchParams.get('duration');
          const finalDuration = (data.isPremium && requestedDuration) ? parseInt(requestedDuration) : (data.course?.duration || 15);
          setTimeLeft(finalDuration * 60);
        }
      } catch (e) { setError(e.message); } finally { setLoading(false); clearTimeout(timeoutId); }
    }
    loadExam();
    return () => clearTimeout(timeoutId);
  }, [params.id, router, getStorageKey, searchParams]);

  const submitExam = useCallback(async () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    setScore(correctCount);
    
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
                    answers: answers
                })
            });
        } catch(e) { console.error("Save failed", e); }
        localStorage.removeItem(getStorageKey(student.email));
    }
    setModalConfig({ show: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, answers, student, course, getStorageKey]);

  useEffect(() => {
    if (!mounted || loading || isSubmitted || error || timeLeft === null || showUpgrade) return;
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
  }, [loading, isSubmitted, error, timeLeft, showUpgrade, mounted, answers, currentQIndex, student, getStorageKey, submitExam]);

  const confirmSubmit = () => setModalConfig({ show: true, title: "FINISH EXAM?", message: "You are about to submit your answers.", type: "warning", action: submitExam });
  const handleSelect = (option) => { if (!isSubmitted) setAnswers(prev => ({ ...prev, [questions[currentQIndex].id]: option })); };
  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const navigateTo = (index) => { setCurrentQIndex(index); setShowMap(false); };

  const generateAnalysis = async () => {
    setAnalyzing(true);
    const failedQuestions = questions.filter(q => answers[q.id] !== q.correct_option).map(q => ({
      question_text: q.question_text, correct_option: q.correct_option, user_choice: answers[q.id] || "Skipped"
    }));
    try {
      const res = await fetch("/api/cbt/analyze", {
        method: "POST", headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ studentName: student.name, courseCode: course.code, score, total: questions.length, failedQuestions })
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (e) { alert("Analysis failed."); } finally { setAnalyzing(false); }
  };

  const getGridColor = (index, qId) => {
    if (currentQIndex === index) return "bg-green-800 text-white border-green-900 ring-2 ring-green-300";
    if (answers[qId]) return "bg-green-100 text-green-800 border-green-200";
    return "bg-white text-gray-400 border-gray-200";
  };

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  
  // === LOADING STATE ===
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-green-900 font-black text-sm tracking-widest animate-pulse">LOADING ENGINE...</div>;
  
  // === ERROR STATE ===
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4 text-red-600"><AlertTriangle size={32} /></div>
      <p className="text-red-600 font-bold mb-4">{error}</p>
      <button onClick={() => window.location.reload()} className="bg-black text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">RETRY CONNECTION</button>
    </div>
  );

  // === EMPTY STATE ===
  if (questions.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600"><AlertTriangle size={32} /></div>
      <p className="text-gray-500 font-bold mb-4">No Questions Found</p>
      <button onClick={() => router.push('/cbt/dashboard')} className="bg-green-900 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">RETURN TO DASHBOARD</button>
    </div>
  );

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-[#f8fafc] font-sans pb-20">
        <header className="bg-[#002b00] text-white pt-10 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 flex justify-between items-start mb-8">
            <div><div className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-1">Session Closed</div><h1 className="font-black text-2xl tracking-tight">{course?.code}</h1></div>
            <button onClick={() => router.push('/cbt/dashboard')} className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase hover:bg-white hover:text-[#002b00] transition-colors">Exit</button>
          </div>
          <div className="relative z-10 flex flex-col items-center">
            <div className={`text-7xl font-black tracking-tighter ${percentage >= 50 ? 'text-white' : 'text-red-400'}`}>{percentage}<span className="text-3xl text-green-500/50">%</span></div>
            <div className="flex gap-6 mt-4"><div className="text-center"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Score</p><p className="text-lg font-black">{score}/{questions.length}</p></div><div className="w-[1px] bg-white/10"></div><div className="text-center"><p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Status</p><p className={`text-lg font-black ${percentage >= 50 ? 'text-green-400' : 'text-red-400'}`}>{percentage >= 50 ? 'PASSED' : 'FAILED'}</p></div></div>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-6 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg p-1.5 mb-6 flex gap-2 border border-gray-100">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'corrections' ? 'bg-[#004d00] text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-900 text-white shadow-md' : 'text-gray-400 hover:bg-gray-50'}`}><Sparkles size={14} /> AI Strategist</button>
          </div>
          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`bg-white p-6 rounded-2xl shadow-sm border-l-4 ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-4"><span className="bg-gray-100 text-gray-500 px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">Question {i+1}</span>{answers[q.id] === q.correct_option ? <CheckCircle size={20} className="text-green-600" /> : <X size={20} className="text-red-500" />}</div>
                  <p className="font-bold text-gray-900 text-sm leading-relaxed mb-4">{q.question_text}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 border border-green-100 p-3 rounded-xl"><p className="text-[10px] font-black text-green-800 uppercase mb-1">Correct Answer</p><p className="text-sm font-bold text-green-900">{q.correct_option}</p></div>
                    {answers[q.id] !== q.correct_option && <div className="bg-red-50 border border-red-100 p-3 rounded-xl"><p className="text-[10px] font-black text-red-800 uppercase mb-1">Your Choice</p><p className="text-sm font-bold text-red-900">{answers[q.id] || "Skipped"}</p></div>}
                  </div>
                  {isPremium && q.explanation && <div className="mt-4 pt-4 border-t border-gray-100"><p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1 flex items-center gap-1"><BrainCircuit size={12}/> Analysis</p><p className="text-xs text-gray-600 leading-relaxed">{q.explanation}</p></div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden min-h-[400px] relative">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-white/95 flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-yellow-200"><Crown size={40} className="text-white" /></div>
                  <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight">RESTRICTED INTEL</h3>
                  <button onClick={() => setShowUpgrade(true)} className="bg-black text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:scale-105 transition-transform">Unlock Report</button>
                </div>
              ) : (
                <div className="p-8">
                  {!analysis ? (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse"><BrainCircuit size={32} className="text-purple-600" /></div>
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-900 text-white px-10 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl disabled:opacity-50 hover:bg-purple-800 transition-colors">{analyzing ? "PROCESSING..." : "RUN DIAGNOSTICS"}</button>
                    </div>
                  ) : <div className="prose prose-sm max-w-none text-gray-700 bg-gray-50 p-6 rounded-2xl border border-gray-100"><ReactMarkdown>{analysis}</ReactMarkdown></div>}
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
    <main className="fixed inset-0 bg-gray-100 flex flex-col font-sans h-screen overflow-hidden z-[150]">
      <ConfirmModal isOpen={modalConfig.show} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} onConfirm={modalConfig.action} onCancel={() => setModalConfig({ ...modalConfig, show: false })} />
      <header className="bg-[#004d00] text-white h-16 flex justify-between items-center shadow-2xl shrink-0 z-[160] px-4 border-b-4 border-green-600">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-none flex items-center justify-center text-[#004d00] font-black text-lg shadow-inner border border-green-800">{student?.name?.charAt(0).toUpperCase()}</div>
          <div className="hidden sm:block leading-tight"><h1 className="font-black text-xs uppercase tracking-widest">{student?.name}</h1><div className="flex items-center gap-2 text-[10px] font-mono opacity-80"><span>ID: {safeId.slice(0,8)}</span><span className="text-green-400">●</span><span>{course?.code}</span></div></div>
          <button onClick={() => setShowMap(!showMap)} className="sm:hidden flex items-center gap-2 bg-white/10 px-3 py-1.5 border border-white/20 text-xs font-black uppercase tracking-widest"><Grid size={14} /> Map</button>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 bg-black/40 px-4 py-1.5 border border-green-800 ${timeLeft < 300 ? 'animate-pulse bg-red-900/50 border-red-500' : ''}`}><span className="text-green-500 font-black text-xs">TIME:</span><span className={`font-mono font-black text-xl tracking-widest ${timeLeft < 300 ? "text-red-500" : "text-white"}`}>{formatTime(timeLeft || 0)}</span></div>
          <button onClick={confirmSubmit} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-xs font-black uppercase tracking-widest shadow-lg transition-all hover:scale-105 border-b-4 border-red-900 active:border-b-0 active:translate-y-1">Submit</button>
        </div>
      </header>
      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col bg-[#f0f2f5] relative z-10">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 custom-scrollbar">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white shadow-sm border-t-4 border-[#004d00] p-6 md:p-10 mb-6 relative">
                <div className="absolute top-0 right-0 bg-gray-100 px-3 py-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">Single Choice</div>
                <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4"><span className="font-black text-[#004d00] text-xs tracking-[0.2em] uppercase bg-green-50 px-3 py-1 border border-green-100">Question {String(currentQIndex + 1).padStart(2, '0')} / {questions.length}</span></div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed mb-10 select-none font-sans">{currentQ.question_text}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {['A','B','C','D'].map((opt) => (
                    <button key={opt} onClick={() => handleSelect(opt)} className={`group relative p-5 border-2 text-left transition-all duration-150 flex items-start gap-4 hover:shadow-md active:scale-[0.99] ${answers[currentQ.id] === opt ? 'border-[#004d00] bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'}`}>
                      <span className={`shrink-0 w-8 h-8 flex items-center justify-center font-black text-sm border transition-colors ${answers[currentQ.id] === opt ? 'bg-[#004d00] text-white border-[#004d00]' : 'bg-gray-100 text-gray-500 border-gray-300 group-hover:bg-white'}`}>{opt}</span>
                      <span className={`font-medium text-base mt-1 ${answers[currentQ.id] === opt ? 'text-[#004d00] font-bold' : 'text-gray-700'}`}>{currentQ[`option_${opt.toLowerCase()}`]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-gray-200 p-4 flex justify-between items-center shrink-0 z-[170] md:pr-80 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
            <button onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="flex items-center gap-2 px-6 py-3 font-black text-gray-400 hover:text-[#004d00] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors uppercase tracking-widest text-xs">[ PREV ]</button>
            <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} disabled={currentQIndex === questions.length - 1} className="flex items-center gap-2 px-8 py-3 font-black uppercase tracking-widest text-xs transition-all shadow-lg border-b-4 active:border-b-0 active:translate-y-1 bg-[#004d00] text-white border-green-900 hover:bg-green-900">[ NEXT ]</button>
          </div>
        </div>
        <aside className={`absolute inset-0 z-[180] bg-white flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:w-80 md:border-l-4 border-gray-200 ${showMap ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 bg-gray-100 border-b-2 border-gray-200 font-black text-gray-800 text-xs uppercase flex justify-between items-center shrink-0">
            <span>QUESTION PALETTE</span>
            <button onClick={() => setShowMap(false)} className="md:hidden p-2 bg-white rounded-xl shadow-sm"><X size={18}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid grid-cols-5 gap-3">
              {questions.map((q, i) => (
                <button key={q.id} onClick={() => navigateTo(i)} className={`h-12 w-full rounded-xl border-2 text-sm font-black shadow-sm transition-all ${getGridColor(i, q.id)}`}>{i + 1}</button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 border-t-2 border-gray-200 grid grid-cols-2 gap-2 text-[10px] font-black">
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded"></div> ATTEMPTED</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border-2 border-gray-300 rounded"></div> PENDING</div>
          </div>
        </aside>
      </div>
    </main>
  );
}
