"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { 
  Grid, CheckCircle, AlertOctagon, X, Crown, Sparkles, 
  BrainCircuit, Clock, ChevronRight, ChevronLeft, ShieldAlert, 
  Loader2, BookOpen, Target, Zap, FileText, Lock, ShieldCheck
} from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";

const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

function TimeUpOverlay() {
  return (
    <div className="fixed inset-0 z-[600] bg-[#050505] flex flex-col items-center justify-center text-white p-6 animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-red-600/10 border-2 border-red-600 rounded-full flex items-center justify-center mb-6">
        <Clock size={48} className="text-red-500 animate-spin-slow" />
      </div>
      <h2 className="text-3xl font-black uppercase tracking-[0.2em] mb-2 text-center">Time Expired</h2>
      <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest animate-pulse">Securing Responses...</p>
    </div>
  );
}

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
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Answered</span>
              <span className="text-sm font-black text-green-700">{answeredCount} / {totalCount}</span>
            </div>
            {pendingCount > 0 && (
              <div className="flex justify-between items-center bg-red-50 p-3 rounded-xl border border-red-100">
                <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">Pending</span>
                <span className="text-sm font-black text-red-600">{pendingCount} Left</span>
              </div>
            )}
          </div>
        </div>
        <div className="p-6 bg-white flex gap-4">
          <button onClick={onCancel} className="flex-1 py-4 border-2 border-gray-100 rounded-2xl text-[10px] font-black text-gray-400 hover:bg-gray-50 uppercase tracking-widest transition-all">Review</button>
          <button onClick={onConfirm} className="flex-[1.5] py-4 bg-[#004d00] text-white rounded-2xl text-[10px] font-black shadow-xl hover:bg-green-900 uppercase tracking-widest">Submit Now</button>
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
            throw new Error("Data retrieval failed.");
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
      } catch (e) { setError(String(e.message)); } finally { setLoading(false); }
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
        } catch(e) { console.error("Save error", e); }
        localStorage.removeItem(getStorageKey(student.email));
    }
  }, [questions, answers, student, course, getStorageKey]);

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

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-green-900 font-black text-sm tracking-widest animate-pulse uppercase">Syncing Terminal...</div>;
  if (error) return <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold gap-4"><p>{error}</p><button onClick={() => window.location.reload()} className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest">Retry Connection</button></div>;

  const marksPerQuestion = questions.length > 0 ? (100 / questions.length).toFixed(1) : 0;

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    const answeredCount = Object.keys(answers).length;
    return (
      <main className="min-h-screen bg-[#f0f2f5] font-sans pb-20 overflow-y-auto">
        <header className="bg-[#002b00] text-white pt-10 pb-20 px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 flex justify-between items-start mb-8">
            <div><div className="text-[9px] font-black text-green-400 uppercase tracking-widest mb-1">Session Closed</div><h1 className="font-black text-2xl tracking-tight">{course?.code}</h1></div>
            <button onClick={() => router.push('/cbt/dashboard')} className="bg-white/10 backdrop-blur-md border border-white/10 px-5 py-2 rounded-full text-[10px] font-bold uppercase hover:bg-white hover:text-[#002b00] transition-colors">Exit</button>
          </div>
          <div className="relative z-10 flex flex-col items-center">
             <div className="w-32 h-32 flex items-center justify-center relative">
                <svg className="absolute w-full h-full" viewBox="0 0 36 36">
                  <path className="text-white/10" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                  <path className={percentage >= 50 ? "text-emerald-500" : "text-red-500"} strokeDasharray={`${percentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="2.5" />
                </svg>
                <div className="text-4xl font-black">{percentage}%</div>
             </div>
             <div className="mt-6 flex gap-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
               <span>Score: {score}/{questions.length}</span>
               <span className="w-1 h-1 bg-gray-600 rounded-full mt-1.5"></span>
               <span>Answered: {answeredCount}</span>
             </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg p-1.5 mb-6 flex gap-2 border border-gray-100">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'corrections' ? 'bg-[#004d00] text-white shadow-md' : 'text-gray-400'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-900 text-white shadow-md' : 'text-gray-400'}`}><Sparkles size={14} /> Intelligence</button>
          </div>

          {activeTab === "corrections" ? (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`bg-white p-6 rounded-3xl shadow-sm border-l-[6px] ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <div className="flex justify-between items-start mb-4"><span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">Question {i+1}</span>{answers[q.id] === q.correct_option ? <CheckCircle size={20} className="text-green-600" /> : <X size={20} className="text-red-500" />}</div>
                  <p className="font-bold text-gray-900 text-sm leading-relaxed mb-6">{q.question_text}</p>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="bg-green-50 border border-green-100 p-3 rounded-xl"><p className="text-[9px] font-black text-green-800 uppercase mb-1">Correct</p><p className="text-sm font-bold text-green-900">{q.correct_option}</p></div>
                    {answers[q.id] !== q.correct_option && <div className="bg-red-50 border border-red-100 p-3 rounded-xl"><p className="text-[9px] font-black text-red-800 uppercase mb-1">Yours</p><p className="text-sm font-bold text-red-900">{answers[q.id] || "Skipped"}</p></div>}
                  </div>
                  {isPremium && q.explanation && <div className="mt-4 pt-4 border-t border-gray-100"><p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">Concept Brief</p><p className="text-xs text-gray-600 leading-relaxed bg-blue-50/30 p-3 rounded-xl border border-blue-100 italic">{q.explanation}</p></div>}
                </div>
              ))}
            </div>
          ) : (
            /* === MASTERY FORGE (AI SECTION) === */
            <div className="bg-white rounded-[2.5rem] shadow-2xl border border-gray-100 overflow-hidden min-h-[500px] relative">
              {!isPremium ? (
                <div className="absolute inset-0 z-10 bg-white/95 flex flex-col items-center justify-center text-center p-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-[2rem] flex items-center justify-center mb-8 shadow-xl shadow-orange-200 animate-bounce"><Crown size={48} className="text-white" /></div>
                  <h3 className="text-2xl font-black text-gray-900 mb-3 tracking-tighter uppercase">Restricted Intel</h3>
                  <p className="text-gray-500 text-sm mb-10 max-w-xs font-medium leading-relaxed">Unlock your personalized AI Study Plan to bridge your knowledge gaps.</p>
                  <button onClick={() => setShowUpgrade(true)} className="bg-gray-900 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all">Unlock Study Plan</button>
                </div>
              ) : (
                <div className="p-0">
                  {!analysis ? (
                    <div className="text-center py-32 px-8 bg-white">
                      <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse"><BrainCircuit size={40} className="text-purple-600" /></div>
                      <h3 className="font-black text-gray-900 text-xs uppercase tracking-widest mb-2">Analyzing Performance</h3>
                      <p className="text-gray-400 text-[10px] mb-8 uppercase tracking-widest">Crafting personalized recovery roadmap...</p>
                      <button onClick={generateAnalysis} disabled={analyzing} className="bg-purple-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all">{analyzing ? "PROCESSING..." : "GENERATE REPORT"}</button>
                    </div>
                  ) : (
                    <div className="bg-[#fcfcfc] min-h-[600px] animate-in fade-in duration-700">
                      {/* FIXED: Integrated Header to prevent overlap */}
                      <div className="bg-purple-900 text-white p-10 pb-12 rounded-t-[2.5rem] shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                        <div className="relative z-10 text-left">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md"><Sparkles size={20} /></div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-200">Intelligence Briefing</span>
                          </div>
                          <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">Tactical Brief</h3>
                          <p className="text-purple-300 text-xs font-bold uppercase tracking-widest mt-3 opacity-80">Personalized Recovery Plan for {student?.name}</p>
                        </div>
                      </div>

                      <div className="p-8 md:p-12 text-left border-l-[8px] border-l-purple-600 bg-white">
                        <div className="text-gray-800 leading-relaxed font-medium space-y-6">
                           <ReactMarkdown 
                             components={{
                               h1: ({children}) => <h1 className="text-xl font-black text-gray-900 uppercase tracking-widest border-b border-purple-100 pb-2 mt-8 first:mt-0">{children}</h1>,
                               h2: ({children}) => <h2 className="text-lg font-bold text-purple-900 mt-6 mb-3">{children}</h2>,
                               p: ({children}) => <p className="text-sm text-gray-600 mb-4 leading-7">{children}</p>,
                               ul: ({children}) => <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700">{children}</ul>,
                               li: ({children}) => <li className="pl-1">{children}</li>,
                               strong: ({children}) => <strong className="font-black text-purple-800">{children}</strong>
                             }}
                           >
                             {analysis}
                           </ReactMarkdown>
                        </div>
                        <div className="mt-16 pt-8 border-t border-gray-50 flex items-center justify-between opacity-40">
                          <div className="flex items-center gap-2"><BrainCircuit size={14} /><span className="text-[8px] font-black uppercase tracking-widest">ExamForge AI Engine</span></div>
                          <span className="text-[8px] font-black uppercase tracking-widest">Classified Document</span>
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
  const isLastQ = currentQIndex === questions.length - 1;

  if (!currentQ) return <div className="h-screen flex items-center justify-center bg-white font-black text-xs tracking-[0.3em] uppercase text-green-900">Synchronizing...</div>;

  return (
    <main className="h-screen flex flex-col bg-[#f0f2f5] font-sans overflow-hidden select-none">
      {isTimeUp && <TimeUpOverlay />}
      <SubmitModal isOpen={showSubmitModal} onConfirm={submitExam} onCancel={() => setShowSubmitModal(false)} answeredCount={answeredCount} totalCount={questions.length} />
      
      <header className="h-14 bg-[#004d00] text-white flex justify-between items-center px-4 shrink-0 z-[160] border-b border-green-800">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-[#004d00] font-black text-sm shadow-inner">{student?.name?.charAt(0).toUpperCase()}</div>
          <div className="leading-tight">
            <h1 className="font-black text-[10px] uppercase tracking-widest text-green-100 truncate w-24">{student?.name}</h1>
            <p className="text-[9px] font-mono opacity-70 tracking-tighter uppercase">{course?.code}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/10 ${timeLeft < 300 ? 'animate-pulse bg-red-900/50 border-red-500' : ''}`}>
            <Clock size={12} className={timeLeft < 300 ? "text-red-500" : "text-green-400"} />
            <span className={`font-mono font-black text-sm tracking-widest ${timeLeft < 300 ? "text-red-500" : "text-white"}`}>{formatTime(timeLeft || 0)}</span>
          </div>
          <button onClick={() => setShowSubmitModal(true)} className="bg-red-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Submit</button>
        </div>
      </header>

      <div className="flex-1 flex flex-col p-4 overflow-hidden relative">
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-2xl shadow-green-900/5 border border-gray-100 p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-center mb-4 shrink-0">
            <span className="font-black text-green-900 text-[9px] tracking-[0.2em] uppercase bg-green-50 px-2 py-1 rounded-lg border border-green-100">Q {String(currentQIndex + 1).padStart(2, '0')} / {questions.length}</span>
            <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{marksPerQuestion} Marks</span>
          </div>
          <div className="flex-1 flex flex-col justify-center py-4 overflow-y-auto custom-scrollbar pr-2">
            <h2 className="text-base md:text-xl font-bold text-gray-900 leading-relaxed text-left">{currentQ.question_text}</h2>
          </div>
          <div className="grid grid-cols-1 gap-2.5 mt-4 shrink-0">
            {['A','B','C','D'].map((opt) => (
              <button key={opt} onClick={() => handleSelect(opt)} className={`group p-4 rounded-3xl border-2 text-left transition-all duration-200 flex items-center gap-4 active:scale-[0.98] ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50 ring-2 ring-green-100' : 'border-gray-100 bg-white'}`}>
                <span className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs border transition-colors ${answers[currentQ.id] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-gray-50 text-gray-400 border-gray-200 group-hover:bg-white'}`}>{opt}</span>
                <span className={`font-bold text-xs leading-tight ${answers[currentQ.id] === opt ? 'text-green-900 font-black' : 'text-gray-600'}`}>{currentQ[`option_${opt.toLowerCase()}`]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="h-16 bg-white border-t border-gray-100 flex justify-between items-center px-8 shrink-0">
        <button onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="text-[10px] font-black text-gray-400 uppercase tracking-widest disabled:opacity-10 transition-colors hover:text-green-900">[ PREV ]</button>
        <button onClick={() => setShowMap(true)} className="bg-gray-100 text-gray-700 p-3.5 rounded-[1.2rem] hover:bg-green-50 hover:text-green-900 transition-all active:scale-95"><Grid size={22} /></button>
        <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} disabled={currentQIndex === questions.length - 1} className={`px-10 py-3.5 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-lg ${currentQIndex === questions.length - 1 ? 'bg-gray-100 text-gray-400 border border-gray-200' : 'bg-[#004d00] text-white hover:bg-green-900 active:scale-95'}`}>Next</button>
      </footer>

      <aside className={`fixed inset-x-0 bottom-0 z-[250] bg-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] transition-transform duration-500 border-t border-gray-100 ${showMap ? 'translate-y-0' : 'translate-y-full'} h-[60vh] flex flex-col`}>
        <div className="p-6 bg-gray-50 border-b border-gray-100 flex justify-between items-center shrink-0 rounded-t-[3rem]"><span className="font-black text-xs uppercase tracking-widest text-gray-700 flex items-center gap-2"><Grid size={16} /> Question Matrix</span><button onClick={() => setShowMap(false)} className="p-2.5 bg-gray-200 text-gray-600 rounded-2xl hover:bg-gray-300 transition-colors"><X size={20}/></button></div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-white"><div className="grid grid-cols-5 gap-3.5">{questions.map((q, i) => (<button key={q.id} onClick={() => navigateTo(i)} className={`h-12 rounded-2xl text-xs font-black transition-all border-2 ${getGridColor(i, q.id)} shadow-sm`}>{i + 1}</button>))}</div></div>
        <div className="p-6 bg-gray-50 border-t border-gray-100 grid grid-cols-3 gap-2 text-[8px] font-black uppercase tracking-tighter text-center"><div className="flex flex-col items-center gap-1.5"><div className="w-8 h-1.5 bg-emerald-600 rounded-full"></div> <span className="text-emerald-900">Secured</span></div><div className="flex flex-col items-center gap-1.5"><div className="w-8 h-1.5 bg-yellow-400 rounded-full"></div> <span className="text-yellow-700">Active</span></div><div className="flex flex-col items-center gap-1.5"><div className="w-8 h-1.5 bg-red-50 border border-red-100 rounded-full"></div> <span className="text-red-400">Open</span></div></div>
      </aside>
    </main>
  );
}

export default function ExamPageWrapper() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-green-900 font-black text-sm tracking-widest animate-pulse">BOOTING TERMINAL...</div>}>
      <ExamContent />
    </Suspense>
  );
}
