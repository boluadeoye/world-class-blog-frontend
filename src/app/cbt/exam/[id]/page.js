"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight, AlertTriangle, CheckCircle, AlertOctagon, X, Lock, Crown, Sparkles, BrainCircuit } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

/* === CUSTOM MODAL === */
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, type = "warning", singleButton = false }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden border border-gray-200">
        <div className={`p-4 ${type === 'danger' ? 'bg-red-600' : 'bg-green-700'} text-white font-bold flex items-center gap-2`}>
          {type === 'danger' ? <AlertOctagon size={20} /> : <CheckCircle size={20} />}
          {title}
        </div>
        <div className="p-6">
          <p className="text-gray-700 font-medium mb-6 text-sm">{message}</p>
          <div className="flex gap-3">
            {!singleButton && <button onClick={onCancel} className="flex-1 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50 text-sm">Cancel</button>}
            <button onClick={onConfirm} className={`flex-1 py-3 rounded-lg font-bold text-white text-sm ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-700 hover:bg-green-800'}`}>{singleButton ? "Exit" : "Confirm"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
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

  // 1. Initial Load & Hydration
  useEffect(() => {
    setMounted(true);
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }
    
    let parsedStudent;
    try {
      parsedStudent = JSON.parse(studentData);
      setStudent(parsedStudent);
    } catch (e) {
      router.push("/cbt");
      return;
    }
    
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

  // 2. Submit Logic
  const submitExam = useCallback(() => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    setScore(correctCount);
    if (student) localStorage.removeItem(getStorageKey(student.email));
    setModalConfig({ show: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [questions, answers, student, getStorageKey]);

  // 3. Timer & Persistence
  useEffect(() => {
    if (!mounted || loading || isSubmitted || error || timeLeft === null || showUpgrade) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) { clearInterval(interval); submitExam(); return 0; }
        const newTime = prev - 1;
        if (student && newTime % 5 === 0) { // Save every 5 seconds to reduce CPU
          localStorage.setItem(getStorageKey(student.email), JSON.stringify({ 
            answers, timeLeft: newTime, currentIndex: currentQIndex 
          }));
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, isSubmitted, error, timeLeft, showUpgrade, mounted, answers, currentQIndex, student, getStorageKey, submitExam]);

  // 4. UI Actions
  const confirmSubmit = () => {
    setModalConfig({
      show: true,
      title: "Confirm Submission",
      message: "Are you sure you want to end your examination now? This action cannot be undone.",
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
    } catch (e) {
      alert("AI Analysis failed. Try again.");
    } finally {
      setAnalyzing(false);
    }
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const navigateTo = (index) => { setCurrentQIndex(index); setShowMobileMap(false); };
  const getGridColor = (index, qId) => {
    if (currentQIndex === index) return "bg-blue-600 text-white border-blue-700 ring-2 ring-blue-200";
    if (answers[qId]) return "bg-green-600 text-white border-green-700";
    return "bg-white text-gray-500 border-gray-300 hover:bg-gray-50";
  };

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-green-800 font-bold text-lg animate-pulse">Initializing Terminal...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-gray-900 text-white px-6 py-2 rounded-full">Retry</button></div>;

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 font-sans pb-20">
        <header className="bg-[#004d00] text-white p-5 shadow-lg flex justify-between items-center sticky top-0 z-50">
          <h1 className="font-black tracking-tight">RESULT FEEDBACK</h1>
          <button onClick={() => router.push('/cbt/dashboard')} className="text-xs bg-white text-green-800 px-4 py-1.5 rounded-full font-black">EXIT PORTAL</button>
        </header>
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <div className="bg-white rounded-3xl shadow-xl p-8 text-center mb-8 border-t-8 border-green-600">
            <h2 className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">Final Assessment</h2>
            <div className={`text-7xl font-black ${percentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>{score} / {questions.length}</div>
            <p className="text-2xl font-bold mt-2 text-gray-800">{percentage}%</p>
          </div>
          <div className="flex gap-2 mb-8 bg-gray-200 p-1.5 rounded-2xl">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3 text-sm font-black rounded-xl transition-all ${activeTab === 'corrections' ? 'bg-white text-green-800 shadow-md' : 'text-gray-500'}`}>CORRECTIONS</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3 text-sm font-black rounded-xl transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-white text-purple-800 shadow-md' : 'text-gray-500'}`}><Sparkles size={16} /> AI COACH</button>
          </div>
          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`p-6 rounded-2xl border-l-8 bg-white shadow-sm ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <p className="font-bold text-gray-800 mb-3 text-lg">{i+1}. {q.question_text}</p>
                  <p className="text-sm text-gray-500 mb-1">Correct: <span className="text-green-700 font-black">{q.correct_option}</span></p>
                  {answers[q.id] !== q.correct_option && <p className="text-sm text-red-600 font-bold">You Chose: {answers[q.id] || "Skipped"}</p>}
                  {isPremium && q.explanation && <div className="mt-4 p-3 bg-gray-50 rounded-xl text-xs text-gray-600 italic border-t border-gray-100">💡 {q.explanation}</div>}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl border border-purple-100 overflow-hidden relative min-h-[400px]">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8">
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mb-4 text-yellow-600 animate-bounce"><Crown size={40} /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-2">Premium Intelligence</h3>
                  <p className="text-gray-500 mb-8 max-w-xs font-medium">Unlock our AI Coach to analyze your weak points and build a personalized study roadmap.</p>
                  <button onClick={() => setShowUpgrade(true)} className="bg-gray-900 text-white px-10 py-4 rounded-full font-black shadow-xl">UNLOCK FOR ₦500</button>
                </div>
              ) : (
                <div className="p-8">
                  {!analysis ? (
                    <div className="text-center py-20">
                      <BrainCircuit size={64} className="mx-auto text-purple-200 mb-6 animate-pulse" />
                      <h3 className="text-2xl font-black text-gray-800 mb-3">AI Performance Engine</h3>
                      <p className="text-gray-500 mb-8 font-medium">Analyzing your {questions.length - score} failed responses...</p>
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-600 text-white px-12 py-4 rounded-full font-black hover:bg-purple-700 shadow-xl disabled:opacity-50">{analyzing ? "PROCESSING..." : "GENERATE REPORT"}</button>
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

  const currentQ = questions[currentQIndex];
  if (!currentQ) return <div className="h-screen flex items-center justify-center bg-white font-bold">Synchronizing Questions...</div>;

  return (
    <main className="fixed inset-0 bg-gray-100 flex flex-col font-sans h-screen overflow-hidden z-[150]">
      <ConfirmModal isOpen={modalConfig.show} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} onConfirm={modalConfig.action} onCancel={() => setModalConfig({ ...modalConfig, show: false })} />
      
      <header className="bg-[#004d00] text-white px-4 h-16 flex justify-between items-center shadow-2xl shrink-0 z-[160] border-b-2 border-green-400">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-900 font-black shadow-inner">{student?.name?.charAt(0).toUpperCase()}</div>
          <div className="leading-tight hidden sm:block">
            <h1 className="font-black text-xs uppercase truncate w-32">{student?.name}</h1>
            <p className="text-[10px] font-bold opacity-70 font-mono tracking-tighter">V3.0 • {course?.code}</p>
          </div>
          <button onClick={() => setShowMobileMap(!showMobileMap)} className="sm:hidden flex items-center gap-1 bg-white/20 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase"><Grid size={14} /> MAP</button>
        </div>
        <div className="flex items-center gap-4">
          <div className={`font-mono font-black text-2xl tracking-tighter ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{formatTime(timeLeft || 0)}</div>
          <button onClick={confirmSubmit} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-xs font-black uppercase shadow-lg border-b-4 border-red-800 active:border-b-0 transition-all">SUBMIT</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col bg-white relative z-10">
          <div className="flex-1 overflow-y-auto p-4 md:p-10 pb-32">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-8 border-b-2 border-gray-100 pb-4">
                <span className="font-black text-green-800 text-sm tracking-widest uppercase">Question {currentQIndex + 1} / {questions.length}</span>
                <span className="text-[10px] font-black bg-gray-100 text-gray-500 px-3 py-1 rounded-full border border-gray-200 uppercase">Weight: 2.0</span>
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight mb-10 select-none">{currentQ.question_text}</h2>
              <div className="grid gap-4">
                {['A','B','C','D'].map((opt) => (
                  <button key={opt} onClick={() => handleSelect(opt)} className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-5 group relative overflow-hidden ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50 shadow-md ring-2 ring-green-100' : 'border-gray-200 hover:border-green-400 hover:bg-gray-50'}`}>
                    <span className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg border-2 transition-colors ${answers[currentQ.id] === opt ? 'bg-green-600 text-white border-green-700' : 'bg-gray-100 text-gray-500 border-gray-300'}`}>{opt}</span>
                    <span className={`font-bold text-lg ${answers[currentQ.id] === opt ? 'text-green-900' : 'text-gray-700'}`}>{currentQ[`option_${opt.toLowerCase()}`]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 md:relative bg-white border-t-2 border-gray-200 p-5 flex justify-between items-center shrink-0 z-[170] md:pr-80">
            <button onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="px-10 py-4 font-black text-gray-400 uppercase tracking-widest disabled:opacity-20 text-xs transition-all">Previous</button>
            <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} disabled={isLastQuestion} className={`px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-xl ${isLastQuestion ? 'bg-gray-200 text-gray-400' : 'bg-gray-900 text-white hover:bg-black active:scale-95'}`}>Next</button>
          </div>
        </div>

        <aside className={`absolute inset-0 z-[180] bg-white flex flex-col transition-transform duration-500 md:relative md:translate-x-0 md:w-80 md:border-l-4 border-gray-200 ${showMobileMap ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 bg-gray-100 border-b-2 border-gray-200 font-black text-gray-800 text-xs uppercase flex justify-between items-center shrink-0">
            <span>QUESTION PALETTE</span>
            <button onClick={() => setShowMobileMap(false)} className="md:hidden p-2 bg-white rounded-xl shadow-sm"><X size={18}/></button>
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
