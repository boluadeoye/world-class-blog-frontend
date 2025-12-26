"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
// STRICTLY USING YOUR WORKING ICONS
import { Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

// RELATIVE IMPORT (STABLE)
const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

/* === COMPACT MODAL === */
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, type = "warning", singleButton = false }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-xs w-full overflow-hidden border-t-4 border-green-700">
        <div className="p-4 border-b border-gray-100">
          <h3 className={`font-black text-sm uppercase flex items-center gap-2 ${type === 'danger' ? 'text-red-600' : 'text-green-800'}`}>
            {type === 'danger' ? <AlertOctagon size={16} /> : <CheckCircle size={16} />}
            {title}
          </h3>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-xs font-medium mb-4 leading-relaxed">{message}</p>
          <div className="flex gap-2">
            {!singleButton && <button onClick={onCancel} className="flex-1 py-2 border border-gray-300 rounded text-xs font-bold text-gray-600 hover:bg-gray-50">CANCEL</button>}
            <button onClick={onConfirm} className={`flex-1 py-2 rounded text-xs font-bold text-white ${type === 'danger' ? 'bg-red-600' : 'bg-green-800'}`}>{singleButton ? "CLOSE" : "CONFIRM"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();

  // === LOGIC: EXACT COPY OF WORKING PROTOTYPE ===
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
  const [showMobileMap, setShowMobileMap] = useState(false);
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
      } catch (e) { setError(e.message); } finally { setLoading(false); }
    }
    loadExam();
  }, [params.id, router, getStorageKey]);

  const submitExam = useCallback(() => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    setScore(correctCount);
    if (student) localStorage.removeItem(getStorageKey(student.email));
    setModalConfig({ show: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, answers, student, getStorageKey]);

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

  const confirmSubmit = () => {
    setModalConfig({
      show: true, title: "SUBMIT EXAM?", message: "You are about to end this session. This cannot be undone.", type: "warning", action: submitExam
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

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const navigateTo = (index) => { setCurrentQIndex(index); setShowMobileMap(false); };
  
  const getGridColor = (index, qId) => {
    if (currentQIndex === index) return "bg-green-800 text-white border-green-900";
    if (answers[qId]) return "bg-green-100 text-green-900 border-green-300";
    return "bg-white text-gray-400 border-gray-300";
  };

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-green-900 font-mono font-bold text-sm tracking-widest">LOADING TERMINAL...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-black text-white px-6 py-2 rounded text-xs">RETRY</button></div>;

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 font-sans pb-20">
        <header className="bg-green-900 text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-50">
          <h1 className="font-black tracking-widest text-xs">EXAM REPORT</h1>
          <button onClick={() => router.push('/cbt/dashboard')} className="text-[10px] bg-white text-green-900 px-4 py-1.5 rounded font-bold uppercase">Exit</button>
        </header>
        <div className="max-w-3xl mx-auto p-4">
          <div className="bg-white border border-gray-200 rounded-lg p-6 text-center mb-6 shadow-sm">
            <h2 className="text-gray-400 font-bold uppercase tracking-widest text-[10px] mb-2">Total Score</h2>
            <div className={`text-6xl font-black tracking-tighter ${percentage >= 50 ? 'text-green-700' : 'text-red-600'}`}>{score}<span className="text-2xl text-gray-300">/{questions.length}</span></div>
            <p className="text-sm font-bold mt-1 text-gray-500">{percentage}% Accuracy</p>
          </div>
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-2 text-xs font-bold rounded transition-all ${activeTab === 'corrections' ? 'bg-white text-green-900 shadow-sm' : 'text-gray-400'}`}>CORRECTIONS</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-2 text-xs font-bold rounded transition-all flex items-center justify-center gap-1 ${activeTab === 'ai' ? 'bg-white text-purple-900 shadow-sm' : 'text-gray-400'}`}><Sparkles size={12} /> AI COACH</button>
          </div>
          {activeTab === "corrections" ? (
            <div className="space-y-3">
              {questions.map((q, i) => (
                <div key={q.id} className={`p-4 rounded border-l-4 bg-white shadow-sm ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-gray-400 text-xs">Q{i+1}</span>
                    {answers[q.id] === q.correct_option ? <CheckCircle size={14} className="text-green-600" /> : <X size={14} className="text-red-500" />}
                  </div>
                  <p className="font-bold text-gray-800 mb-3 text-sm leading-snug">{q.question_text}</p>
                  <div className="text-xs space-y-1">
                    <div className="text-green-700 font-bold">Correct: {q.correct_option}</div>
                    {answers[q.id] !== q.correct_option && <div className="text-red-600">You: {answers[q.id] || "Skipped"}</div>}
                  </div>
                  {isPremium && q.explanation && <div className="mt-3 p-2 bg-blue-50 text-blue-900 text-[10px] border-l-2 border-blue-400">{q.explanation}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-purple-100 p-6 min-h-[300px]">
              {!isPremium ? (
                <div className="text-center py-10">
                  <Crown size={32} className="mx-auto text-yellow-500 mb-3" />
                  <h3 className="font-bold text-gray-900 text-sm mb-2">Premium Feature</h3>
                  <button onClick={() => setShowUpgrade(true)} className="bg-black text-white px-6 py-2 rounded text-xs font-bold">UNLOCK</button>
                </div>
              ) : (
                <div>
                  {!analysis ? (
                    <div className="text-center py-10">
                      <BrainCircuit size={40} className="mx-auto text-purple-200 mb-4" />
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-700 text-white px-8 py-3 rounded text-xs font-bold">{analyzing ? "ANALYZING..." : "GENERATE REPORT"}</button>
                    </div>
                  ) : <div className="prose prose-sm"><ReactMarkdown>{analysis}</ReactMarkdown></div>}
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
  if (!currentQ) return <div className="h-screen flex items-center justify-center bg-white font-bold text-xs">SYNCING...</div>;

  return (
    <main className="fixed inset-0 bg-gray-50 flex flex-col font-sans h-screen overflow-hidden z-[150]">
      <ConfirmModal isOpen={modalConfig.show} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} onConfirm={modalConfig.action} onCancel={() => setModalConfig({ ...modalConfig, show: false })} />

      {/* COMPACT HEADER */}
      <header className="bg-green-900 text-white h-12 flex justify-between items-center px-4 shadow-md shrink-0 z-[160]">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-white text-green-900 flex items-center justify-center font-black text-xs rounded-sm">{student?.name?.charAt(0)}</div>
          <div className="leading-none">
            <h1 className="font-bold text-[10px] uppercase tracking-wider opacity-80">CBT ENGINE V1</h1>
            <p className="font-black text-xs">{course?.code}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`font-mono font-bold text-lg tracking-tight ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{formatTime(timeLeft || 0)}</div>
          <button onClick={confirmSubmit} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-[10px] font-black uppercase tracking-widest">Submit</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        {/* MAIN CONTENT */}
        <div className="flex-1 flex flex-col bg-gray-50 relative z-10">
          <div className="flex-1 overflow-y-auto p-4 pb-24">
            <div className="max-w-2xl mx-auto">
              {/* Question Card */}
              <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm mb-4">
                <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                  <span className="font-black text-green-800 text-xs uppercase tracking-widest">Question {currentQIndex + 1}</span>
                  <button onClick={() => setShowMobileMap(!showMobileMap)} className="sm:hidden text-[10px] font-bold text-gray-400 border px-2 py-0.5 rounded">MAP</button>
                </div>
                <h2 className="text-base md:text-lg font-bold text-gray-900 leading-relaxed mb-6 select-none">{currentQ.question_text}</h2>
                
                {/* Options Grid */}
                <div className="grid gap-3">
                  {['A','B','C','D'].map((opt) => (
                    <button key={opt} onClick={() => handleSelect(opt)} className={`w-full text-left p-3 rounded border transition-all flex items-center gap-3 ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50 ring-1 ring-green-600' : 'border-gray-300 bg-white hover:bg-gray-50'}`}>
                      <span className={`w-6 h-6 flex items-center justify-center font-bold text-xs rounded-sm ${answers[currentQ.id] === opt ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{opt}</span>
                      <span className={`font-medium text-sm ${answers[currentQ.id] === opt ? 'text-green-900' : 'text-gray-700'}`}>{currentQ[`option_${opt.toLowerCase()}`]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER NAV */}
          <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t border-gray-200 p-3 flex justify-between items-center shrink-0 z-[170] md:pr-64">
            <button onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="px-6 py-2 font-bold text-gray-500 text-xs uppercase disabled:opacity-30">Prev</button>
            <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} disabled={isLastQuestion} className={`px-8 py-2.5 rounded font-black uppercase text-xs shadow-sm ${isLastQuestion ? 'bg-gray-200 text-gray-400' : 'bg-green-900 text-white'}`}>Next</button>
          </div>
        </div>

        {/* SIDEBAR PALETTE */}
        <aside className={`absolute inset-0 z-[180] bg-white flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:w-64 md:border-l border-gray-200 ${showMobileMap ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-3 bg-gray-100 border-b border-gray-200 font-bold text-gray-700 text-[10px] uppercase flex justify-between items-center">
            <span>Question Matrix</span>
            <button onClick={() => setShowMobileMap(false)} className="md:hidden"><X size={16}/></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button key={q.id} onClick={() => navigateTo(i)} className={`h-8 w-full rounded-sm border text-[10px] font-bold transition-all ${getGridColor(i, q.id)}`}>{i + 1}</button>
              ))}
            </div>
          </div>
          <div className="p-3 bg-gray-50 border-t border-gray-200 grid grid-cols-2 gap-2 text-[9px] font-bold uppercase text-gray-500">
             <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-100 border border-green-300"></div> Done</div>
             <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-800"></div> Now</div>
          </div>
        </aside>
      </div>
    </main>
  );
}
