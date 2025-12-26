"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
// SAFE ICONS ONLY
import { Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

// RELATIVE IMPORT
const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

/* === STANDARD MODAL === */
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, type = "warning", singleButton = false }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border-t-4 border-green-700">
        <div className="p-6">
          <h3 className={`font-bold text-lg flex items-center gap-2 mb-2 ${type === 'danger' ? 'text-red-600' : 'text-green-800'}`}>
            {type === 'danger' ? <AlertOctagon size={24} /> : <CheckCircle size={24} />}
            {title}
          </h3>
          <p className="text-gray-600 text-sm mb-6">{message}</p>
          <div className="flex gap-3">
            {!singleButton && <button onClick={onCancel} className="flex-1 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-xs">CANCEL</button>}
            <button onClick={onConfirm} className={`flex-1 py-3 rounded-lg font-bold text-white text-xs shadow-md ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#004d00] hover:bg-green-900'}`}>{singleButton ? "CLOSE" : "CONFIRM"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();

  // Logic State
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

  // 1. Init
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
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    }
    loadExam();
  }, [params.id, router, getStorageKey]);

  // 2. Submit
  const submitExam = useCallback(() => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    setScore(correctCount);
    if (student) localStorage.removeItem(getStorageKey(student.email));
    setModalConfig({ show: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, answers, student, getStorageKey]);

  // 3. Timer
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

  // Actions
  const confirmSubmit = () => setModalConfig({ show: true, title: "Submit Exam?", message: "Are you sure you want to end this session? This cannot be undone.", type: "warning", action: submitExam });
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
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: student.id, failedQuestions })
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (e) { alert("Analysis failed."); } finally { setAnalyzing(false); }
  };

  // Map Colors (Standard Green/White)
  const getMapColor = (index, qId) => {
    if (currentQIndex === index) return "bg-[#004d00] text-white border-[#004d00] ring-2 ring-green-200 font-bold"; // Current
    if (answers[qId]) return "bg-green-100 text-green-800 border-green-200"; // Answered
    return "bg-white text-gray-500 border-gray-300"; // Pending
  };

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-green-800 font-bold text-lg animate-pulse">Loading Exam...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-black text-white px-6 py-2 rounded-full text-sm">Retry</button></div>;

  // === RESULT PAGE (REBUILT - GREEN/WHITE) ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 font-sans pb-20">
        {/* Result Header */}
        <div className="bg-[#004d00] text-white p-8 pb-12 rounded-b-3xl shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <h1 className="font-black text-xl tracking-tight">EXAM RESULT</h1>
            <button onClick={() => router.push('/cbt/dashboard')} className="bg-white text-green-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase">Exit</button>
          </div>
          
          <div className="text-center">
            <div className="text-6xl font-black mb-2">{percentage}%</div>
            <p className="text-green-200 text-sm font-medium uppercase tracking-widest">Total Score: {score} / {questions.length}</p>
          </div>
        </div>

        {/* Result Content */}
        <div className="max-w-3xl mx-auto px-4 -mt-8">
          <div className="bg-white rounded-xl shadow-md p-2 mb-6 flex gap-2 border border-gray-100">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all ${activeTab === 'corrections' ? 'bg-green-100 text-green-800' : 'text-gray-500 hover:bg-gray-50'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-100 text-purple-800' : 'text-gray-500 hover:bg-gray-50'}`}><Sparkles size={14} /> AI Coach</button>
          </div>

          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-[10px] font-bold uppercase">Question {i+1}</span>
                    {answers[q.id] === q.correct_option ? <CheckCircle className="text-green-600" size={18} /> : <X className="text-red-500" size={18} />}
                  </div>
                  <p className="font-bold text-gray-800 text-sm leading-relaxed mb-3">{q.question_text}</p>
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-green-700">Correct: {q.correct_option}</div>
                    {answers[q.id] !== q.correct_option && (
                      <div className="text-xs font-bold text-red-600">You Chose: {answers[q.id] || "Skipped"}</div>
                    )}
                  </div>
                  {isPremium && q.explanation && (
                    <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-600 italic">
                      <span className="font-bold text-gray-400 not-italic mr-2">NOTE:</span>{q.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md border border-purple-100 overflow-hidden min-h-[300px] relative">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600"><Crown size={32} /></div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Feature</h3>
                  <p className="text-gray-500 text-xs mb-6">Unlock AI analysis to see why you failed.</p>
                  <button onClick={() => setShowUpgrade(true)} className="bg-black text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-lg">Unlock Now</button>
                </div>
              ) : (
                <div className="p-6">
                  {!analysis ? (
                    <div className="text-center py-12">
                      <BrainCircuit size={48} className="mx-auto text-purple-200 mb-4" />
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-700 text-white px-8 py-3 rounded-full font-bold text-xs shadow-md disabled:opacity-50">{analyzing ? "ANALYZING..." : "GENERATE REPORT"}</button>
                    </div>
                  ) : (
                    <div className="prose prose-sm max-w-none text-gray-700"><ReactMarkdown>{analysis}</ReactMarkdown></div>
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
  if (!currentQ) return <div className="h-screen flex items-center justify-center bg-white font-bold text-sm text-green-800">SYNCING...</div>;

  return (
    <main className="fixed inset-0 bg-gray-50 flex flex-col font-sans h-screen overflow-hidden z-[150]">
      <ConfirmModal isOpen={modalConfig.show} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} onConfirm={modalConfig.action} onCancel={() => setModalConfig({ ...modalConfig, show: false })} />

      {/* HEADER */}
      <header className="bg-[#004d00] text-white h-14 flex justify-between items-center px-4 shadow-md shrink-0 z-[160]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-green-900 rounded flex items-center justify-center font-black text-sm">
            {student?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-[10px] uppercase tracking-wider opacity-80">CBT ENGINE</h1>
            <p className="font-black text-xs">{course?.code}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`font-mono font-bold text-lg ${timeLeft < 300 ? 'text-red-300 animate-pulse' : 'text-white'}`}>{formatTime(timeLeft || 0)}</div>
          <button onClick={confirmSubmit} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest">Submit</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* MAIN STAGE */}
        <div className="flex-1 flex flex-col bg-gray-50 relative z-10">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-32 custom-scrollbar">
            <div className="max-w-3xl mx-auto">
              {/* Question Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 md:p-8 mb-6 relative">
                {/* 2.0 Marks Badge */}
                <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-bl-xl">2.0 Marks</div>
                
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                  <span className="font-black text-green-800 text-xs uppercase tracking-widest">Question {currentQIndex + 1}</span>
                  <button onClick={() => setShowMap(true)} className="sm:hidden text-[10px] font-bold text-gray-400 border px-2 py-1 rounded hover:bg-gray-50">MAP</button>
                </div>
                
                <h2 className="text-lg md:text-xl font-bold text-gray-900 leading-relaxed mb-8 select-none">
                  {currentQ.question_text}
                </h2>

                <div className="grid gap-3 md:grid-cols-2">
                  {['A','B','C','D'].map((opt) => (
                    <button 
                      key={opt} 
                      onClick={() => handleSelect(opt)} 
                      className={`group relative p-4 rounded-lg border-2 text-left transition-all duration-150 flex items-start gap-3 hover:shadow-sm active:scale-[0.99] ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50' : 'border-gray-200 bg-white hover:border-green-300'}`}
                    >
                      <span className={`shrink-0 w-6 h-6 rounded flex items-center justify-center font-bold text-xs border transition-colors ${answers[currentQ.id] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-500 border-gray-300 group-hover:bg-white'}`}>
                        {opt}
                      </span>
                      <span className={`font-medium text-sm ${answers[currentQ.id] === opt ? 'text-green-900 font-bold' : 'text-gray-700'}`}>
                        {currentQ[`option_${opt.toLowerCase()}`]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER NAV */}
          <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-gray-200 p-3 flex justify-between items-center shrink-0 z-[170] md:pr-80">
            <button 
              onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} 
              disabled={currentQIndex === 0} 
              className="px-6 py-2.5 rounded-lg font-bold text-gray-500 hover:text-green-900 hover:bg-gray-50 disabled:opacity-30 transition-colors text-xs uppercase tracking-wide"
            >
              Previous
            </button>
            
            <button 
              onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} 
              disabled={isLastQuestion} 
              className={`px-8 py-2.5 rounded-lg font-black uppercase tracking-wide text-xs shadow-md transition-all ${isLastQuestion ? 'bg-gray-100 text-gray-400' : 'bg-[#004d00] text-white hover:bg-green-900'}`}
            >
              Next
            </button>
          </div>
        </div>

        {/* CENTRAL MAP MODAL */}
        {showMap && (
          <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowMap(false)}>
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
              <div className="bg-[#004d00] p-3 flex justify-between items-center">
                <h3 className="text-white font-bold text-xs uppercase tracking-widest flex items-center gap-2"><Grid size={14} /> Question Map</h3>
                <button onClick={() => setShowMap(false)} className="bg-white/10 p-1.5 rounded-full hover:bg-white/20 text-white"><X size={16} /></button>
              </div>
              <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((q, i) => (
                    <button 
                      key={q.id} 
                      onClick={() => navigateTo(i)} 
                      className={`h-9 rounded text-xs font-bold transition-all border ${getMapColor(i, q.id)}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-3 border-t border-gray-200 grid grid-cols-3 gap-2 text-[9px] font-bold uppercase text-gray-500 text-center">
                <div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-green-100 border border-green-300 rounded-full"></div> Answered</div>
                <div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-[#004d00] rounded-full"></div> Current</div>
                <div className="flex flex-col items-center gap-1"><div className="w-6 h-1.5 bg-white border border-gray-300 rounded-full"></div> Pending</div>
              </div>
            </div>
          </div>
        )}

        {/* DESKTOP SIDEBAR */}
        <aside className="hidden md:flex absolute inset-y-0 right-0 w-80 bg-white border-l border-gray-200 flex-col z-[160]">
          <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700 text-xs uppercase tracking-widest">
            Question Map
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button 
                  key={q.id} 
                  onClick={() => navigateTo(i)} 
                  className={`h-9 rounded text-xs font-bold transition-all border ${getMapColor(i, q.id)}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 border-t border-gray-200 grid grid-cols-2 gap-2 text-[10px] font-bold uppercase text-gray-500">
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div> Answered</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-[#004d00] rounded-full"></div> Current</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div> Pending</div>
          </div>
        </aside>
      </div>
    </main>
  );
}
