"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
// SAFE ICONS ONLY
import { Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

// RELATIVE IMPORT
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
  const searchParams = useSearchParams(); // NEW: To read ?duration=

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
          // === TIME CONTROL LOGIC ===
          // If Premium, check URL param. If Free, force default.
          const requestedDuration = searchParams.get('duration');
          const finalDuration = (data.isPremium && requestedDuration) ? parseInt(requestedDuration) : (data.course?.duration || 15);
          setTimeLeft(finalDuration * 60);
        }
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    }
    loadExam();
  }, [params.id, router, getStorageKey, searchParams]);

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
  const confirmSubmit = () => setModalConfig({ show: true, title: "FINISH EXAM?", message: "You are about to submit your answers. This action cannot be undone.", type: "warning", action: submitExam });
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
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ studentId: student.id, studentName: student.name, courseCode: course.code, score, total: questions.length, failedQuestions })
      });
      const data = await res.json();
      setAnalysis(data.analysis);
    } catch (e) { alert("Analysis failed."); } finally { setAnalyzing(false); }
  };

  // Map Colors
  const getMapColor = (index, qId) => {
    if (currentQIndex === index) return "bg-green-800 text-white border-green-900 ring-2 ring-green-300";
    if (answers[qId]) return "bg-green-100 text-green-800 border-green-200";
    return "bg-white text-gray-400 border-gray-200";
  };

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-green-900 font-black text-sm tracking-widest animate-pulse">LOADING ENGINE...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-black text-white px-6 py-2 rounded text-xs">RETRY</button></div>;

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 font-sans pb-20">
        <header className="bg-green-900 text-white p-6 pb-10 rounded-b-[2rem] shadow-xl relative z-10">
          <div className="flex justify-between items-center mb-6">
            <h1 className="font-black tracking-widest text-xs opacity-80">SESSION REPORT</h1>
            <button onClick={() => router.push('/cbt/dashboard')} className="text-[10px] bg-white/10 border border-white/20 text-white px-4 py-1.5 rounded-full font-bold uppercase hover:bg-white hover:text-green-900 transition-colors">Exit</button>
          </div>
          <div className="text-center">
            <div className="text-7xl font-black mb-1 tracking-tighter">{percentage}%</div>
            <p className="text-green-200 text-xs font-bold uppercase tracking-widest">Accuracy Score</p>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg p-1.5 mb-6 flex gap-2 border border-gray-100">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wide transition-all ${activeTab === 'corrections' ? 'bg-green-50 text-green-800 shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wide transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-50 text-purple-900 shadow-sm' : 'text-gray-400 hover:bg-gray-50'}`}><Sparkles size={14} /> AI Coach</button>
          </div>

          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`bg-white p-5 rounded-2xl shadow-sm border-l-[6px] ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider">Question {i+1}</span>
                    {answers[q.id] === q.correct_option ? <CheckCircle size={18} className="text-green-600" /> : <X size={18} className="text-red-500" />}
                  </div>
                  <p className="font-bold text-gray-800 text-sm leading-relaxed mb-4">{q.question_text}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-green-800 bg-green-50 p-2 rounded border border-green-100"><CheckCircle size={12}/> Correct: {q.correct_option}</div>
                    {answers[q.id] !== q.correct_option && <div className="flex items-center gap-2 text-xs font-bold text-red-800 bg-red-50 p-2 rounded border border-red-100"><X size={12}/> You: {answers[q.id] || "Skipped"}</div>}
                  </div>
                  {isPremium && q.explanation && <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-600 leading-relaxed"><span className="font-black text-gray-400 uppercase text-[10px] block mb-1">Explanation</span>{q.explanation}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white border border-yellow-100 min-h-[350px]">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-gradient-to-br from-white via-yellow-50 to-orange-50 flex flex-col items-center justify-center text-center p-8">
                  <div className="relative z-10">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-orange-200 animate-bounce">
                      <Crown size={36} className="text-white drop-shadow-md" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Premium Intelligence</h3>
                    <p className="text-gray-500 text-sm mb-8 font-medium leading-relaxed max-w-xs mx-auto">Unlock AI analysis to see exactly why you failed and how to improve.</p>
                    <button onClick={() => setShowUpgrade(true)} className="bg-black text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-transform active:scale-95">Unlock Now</button>
                  </div>
                </div>
              ) : (
                <div className="p-8">
                  {!analysis ? (
                    <div className="text-center py-12">
                      <BrainCircuit size={56} className="mx-auto text-purple-200 mb-6 animate-pulse" />
                      <h3 className="font-black text-gray-900 text-lg mb-2">AI ANALYSIS ENGINE</h3>
                      <p className="text-gray-400 text-xs mb-8">Processing your performance data...</p>
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-700 text-white px-8 py-3 rounded-xl font-black text-xs shadow-lg disabled:opacity-50">{analyzing ? "ANALYZING..." : "GENERATE REPORT"}</button>
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

  // === EXAM VIEW ===
  const currentQ = questions[currentQIndex];
  const isLastQuestion = questions.length > 0 && currentQIndex === questions.length - 1;
  if (!currentQ) return <div className="h-screen flex items-center justify-center bg-white font-bold text-xs tracking-widest text-green-900">SYNCING...</div>;

  return (
    <main className="fixed inset-0 bg-gray-50 flex flex-col font-sans h-screen overflow-hidden z-[150]">
      <ConfirmModal isOpen={modalConfig.show} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} onConfirm={modalConfig.action} onCancel={() => setModalConfig({ ...modalConfig, show: false })} />

      {/* HEADER */}
      <header className="bg-green-900 text-white h-14 flex justify-between items-center px-4 shadow-md shrink-0 z-[160]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-green-900 rounded-lg flex items-center justify-center font-black text-sm shadow-inner">
            {student?.name?.charAt(0)}
          </div>
          <div className="leading-none">
            <h1 className="font-bold text-[10px] uppercase tracking-wider opacity-70 mb-0.5">CBT ENGINE</h1>
            <p className="font-black text-xs">{course?.code}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`font-mono font-bold text-lg tracking-tight ${timeLeft < 300 ? 'text-red-300 animate-pulse' : 'text-white'}`}>{formatTime(timeLeft || 0)}</div>
          <button onClick={confirmSubmit} className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm">Submit</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col bg-gray-50 relative z-10">
          <div className="flex-1 overflow-y-auto p-4 pb-32">
            <div className="max-w-2xl mx-auto">
              {/* Question Card */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-4 relative overflow-hidden">
                {/* Marks Badge */}
                <div className="absolute top-0 right-0 bg-green-50 text-green-800 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-bl-xl border-b border-l border-green-100">2.0 Marks</div>
                
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-3">
                  <span className="font-black text-green-900 text-xs uppercase tracking-widest bg-green-50 px-2 py-1 rounded">Question {currentQIndex + 1}</span>
                </div>
                
                <h2 className="text-base md:text-xl font-bold text-gray-900 leading-relaxed mb-8 select-none">{currentQ.question_text}</h2>
                
                {/* Options Grid */}
                <div className="grid gap-3">
                  {['A','B','C','D'].map((opt) => (
                    <button key={opt} onClick={() => handleSelect(opt)} className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-4 group ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50 ring-1 ring-green-600 shadow-sm' : 'border-gray-200 bg-white hover:border-green-300'}`}>
                      <span className={`w-8 h-8 flex items-center justify-center font-black text-xs rounded-lg border transition-colors ${answers[currentQ.id] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-500 border-gray-300 group-hover:bg-white'}`}>{opt}</span>
                      <span className={`font-bold text-sm ${answers[currentQ.id] === opt ? 'text-green-900' : 'text-gray-600'}`}>{currentQ[`option_${opt.toLowerCase()}`]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER NAV */}
          <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-gray-200 p-4 flex justify-between items-center shrink-0 z-[170] md:pr-72">
            <button onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="px-6 py-3 font-bold text-gray-400 text-xs uppercase tracking-widest disabled:opacity-30 hover:text-green-900 transition-colors">Previous</button>
            <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} disabled={isLastQuestion} className={`px-10 py-3 rounded-xl font-black uppercase text-xs shadow-lg transition-transform active:scale-95 ${isLastQuestion ? 'bg-gray-200 text-gray-400' : 'bg-green-900 text-white'}`}>Next Question</button>
          </div>
        </div>

        {/* BOLD MAP BUTTON (FAB) */}
        {!showMap && (
          <button 
            onClick={() => setShowMap(true)} 
            className="fixed bottom-24 right-5 z-[180] bg-green-900 text-white w-14 h-14 rounded-full shadow-2xl border-4 border-white flex items-center justify-center hover:scale-110 transition-transform active:scale-95 md:hidden"
          >
            <Grid size={24} />
          </button>
        )}

        {/* SIDEBAR PALETTE (Mobile Modal) */}
        <aside className={`fixed inset-0 z-[190] bg-black/60 backdrop-blur-sm flex justify-end transition-opacity duration-300 md:static md:bg-transparent md:backdrop-blur-none md:w-72 md:border-l md:border-gray-200 ${showMap ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto'}`} onClick={() => setShowMap(false)}>
          <div className={`bg-white w-72 h-full shadow-2xl flex flex-col transition-transform duration-300 ${showMap ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`} onClick={e => e.stopPropagation()}>
            <div className="p-5 bg-green-900 text-white font-black text-xs uppercase flex justify-between items-center shrink-0 tracking-widest">
              <span className="flex items-center gap-2"><Grid size={14} /> Question Matrix</span>
              <button onClick={() => setShowMap(false)} className="md:hidden bg-white/20 p-1 rounded hover:bg-white/30"><X size={16}/></button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar bg-gray-50">
              <div className="grid grid-cols-5 gap-3">
                {questions.map((q, i) => (
                  <button key={q.id} onClick={() => navigateTo(i)} className={`h-10 rounded-lg text-xs font-black transition-all border-2 ${getMapColor(i, q.id)}`}>{i + 1}</button>
                ))}
              </div>
            </div>
            <div className="p-5 bg-white border-t border-gray-200 grid grid-cols-2 gap-3 text-[9px] font-bold uppercase text-gray-500">
               <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div> Answered</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-800 rounded-full"></div> Current</div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-300 rounded-full"></div> Pending</div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
