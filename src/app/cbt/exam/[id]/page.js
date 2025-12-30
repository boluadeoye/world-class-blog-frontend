"use client";
import { useState, useEffect, useCallback, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Grid, CheckCircle, X, Crown, Sparkles, BrainCircuit, Clock, Fingerprint } from "lucide-react";
import dynamic from "next/dynamic";
import ReactMarkdown from "react-markdown";
import LiveTracker from "../../../../components/cbt/LiveTracker";
import { SecurityWatermark, SecurityCurtain, SubmitModal } from "./components";

const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

function ExamContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPremium, setIsPremium] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showMap, setShowMap] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [activeTab, setActiveTab] = useState("corrections");
  const [isBreach, setIsBreach] = useState(false);

  const getStorageKey = (email) => `cbt_session_${params.id}_${email}`;

  useEffect(() => {
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }
    const parsed = JSON.parse(studentData);
    setStudent(parsed);

    async function loadExam() {
      try {
        const res = await fetch(`/api/cbt/exam?courseId=${params.id}&studentId=${parsed.id}&token=${parsed.session_token}`);
        if (res.status === 403) { setLoading(false); return; }
        const data = await res.json();
        setCourse(data.course);
        setQuestions(data.questions || []);
        setIsPremium(data.isPremium);
        const saved = localStorage.getItem(getStorageKey(parsed.email));
        if (saved) {
          const s = JSON.parse(saved);
          setAnswers(s.answers || {});
          setTimeLeft(s.timeLeft);
          setCurrentQIndex(s.currentIndex || 0);
        } else {
          const dur = (data.isPremium && searchParams.get('duration')) ? parseInt(searchParams.get('duration')) : (data.course?.duration || 15);
          setTimeLeft(dur * 60);
        }
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    loadExam();

    const handleBreach = () => setIsBreach(document.visibilityState === 'hidden');
    document.addEventListener("visibilitychange", handleBreach);
    return () => document.removeEventListener("visibilitychange", handleBreach);
  }, [params.id, router, searchParams]);

  const submitExam = async () => {
    let correct = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correct++; });
    setScore(correct);
    setIsSubmitted(true);
    setShowSubmitModal(false);
    window.scrollTo(0,0);
    if (student && course) {
      await fetch('/api/cbt/result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId: student.id, courseId: course.id, score: correct, total: questions.length, answers })
      });
      localStorage.removeItem(getStorageKey(student.email));
    }
  };

  useEffect(() => {
    if (loading || isSubmitted || timeLeft === null || isBreach) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) { clearInterval(timer); submitExam(); return 0; }
        if (student && prev % 5 === 0) localStorage.setItem(getStorageKey(student.email), JSON.stringify({ answers, timeLeft: prev - 1, currentIndex: currentQIndex }));
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isSubmitted, timeLeft, isBreach, answers, currentQIndex, student]);

  if (loading) return <div className="h-screen flex flex-col items-center justify-center bg-[#002b00] text-white"><Fingerprint size={48} className="animate-pulse text-green-400 mb-4" /><p className="font-black text-xs tracking-widest uppercase">Authenticating...</p></div>;
  if (!course) return <div className="h-screen flex items-center justify-center bg-white"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;

  if (isSubmitted) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-[#f0f2f5] pb-20">
        <header className="bg-[#002b00] text-white pt-10 pb-20 px-6 rounded-b-[3rem] text-center relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-4xl font-black mb-2">{pct}%</h1>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Score: {score}/{questions.length}</p>
            <button onClick={() => router.push('/cbt/dashboard')} className="mt-6 bg-white/10 border border-white/20 px-6 py-2 rounded-full text-[10px] font-bold uppercase">Exit Terminal</button>
          </div>
        </header>
        <div className="max-w-3xl mx-auto px-4 -mt-10 relative z-20">
          <div className="bg-white rounded-2xl shadow-lg p-1.5 mb-6 flex gap-2">
            <button onClick={() => setActiveTab("corrections")} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase ${activeTab === 'corrections' ? 'bg-[#004d00] text-white' : 'text-gray-400'}`}>Corrections</button>
            <button onClick={() => setActiveTab("ai")} className={`flex-1 py-3.5 rounded-xl text-[10px] font-black uppercase flex items-center justify-center gap-2 ${activeTab === 'ai' ? 'bg-purple-900 text-white' : 'text-gray-400'}`}><Sparkles size={14} /> Intelligence</button>
          </div>
          {activeTab === "corrections" && (
            <div className="space-y-4">
              {questions.map((q, i) => (
                <div key={q.id} className={`bg-white p-6 rounded-3xl shadow-sm border-l-[6px] ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                  <p className="text-[9px] font-black text-gray-400 uppercase mb-2">Question {i+1}</p>
                  <p className="font-bold text-gray-900 text-sm mb-6">{q.question_text}</p>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                      <p className="text-[8px] font-black text-green-700 uppercase mb-1">Correct Answer</p>
                      <p className="text-sm font-bold text-green-900">{q.correct_option}. {q[`option_${q.correct_option.toLowerCase()}`]}</p>
                    </div>
                    {answers[q.id] !== q.correct_option && (
                      <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                        <p className="text-[8px] font-black text-red-700 uppercase mb-1">Your Selection</p>
                        <p className="text-sm font-bold text-red-900">{answers[q.id] ? `${answers[q.id]}. ${q[`option_${answers[q.id].toLowerCase()}`]}` : "Skipped"}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQIndex];
  return (
    <main className="h-screen flex flex-col bg-[#f0f2f5] overflow-hidden relative">
      <SecurityWatermark text={`${student?.name} - ${student?.id}`} />
      <SecurityCurtain isBreach={isBreach} />
      <SubmitModal isOpen={showSubmitModal} onConfirm={submitExam} onCancel={() => setShowSubmitModal(false)} answeredCount={Object.keys(answers).length} totalCount={questions.length} />
      <LiveTracker />
      
      <header className="h-16 bg-[#004d00] text-white flex justify-between items-center px-6 shrink-0 z-[100]">
        <div className="flex flex-col">
          <h1 className="font-black text-[10px] uppercase tracking-widest">{student?.name}</h1>
          <p className="text-[9px] opacity-60 uppercase">{course?.code}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-black/20 px-4 py-2 rounded-full font-mono font-black text-sm tracking-widest">
            {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}
          </div>
          <button onClick={() => setShowSubmitModal(true)} className="bg-red-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase shadow-lg active:scale-90 transition-all">Submit</button>
        </div>
      </header>

      <div className="flex-1 p-4 overflow-hidden flex flex-col">
        <div className="flex-1 bg-white rounded-[2.5rem] shadow-xl p-6 flex flex-col justify-between overflow-hidden border border-gray-100">
          <div className="flex justify-between text-[9px] font-black text-gray-300 uppercase tracking-widest">
            <span>Question {currentQIndex + 1} / {questions.length}</span>
          </div>
          <div className="flex-1 flex items-center py-6 overflow-y-auto"><h2 className="text-lg font-bold text-gray-900 leading-relaxed">{currentQ?.question_text}</h2></div>
          <div className="grid gap-3">
            {['A','B','C','D'].map(opt => (
              <button key={opt} onClick={() => setAnswers({...answers, [currentQ.id]: opt})} className={`p-4 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50' : 'border-gray-100 bg-white'}`}>
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${answers[currentQ.id] === opt ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400'}`}>{opt}</span>
                <span className="text-xs font-bold text-gray-700">{currentQ?.[`option_${opt.toLowerCase()}`]}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <footer className="h-20 bg-white border-t flex justify-between items-center px-8 shrink-0">
        <button onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))} className="text-[10px] font-black text-gray-400 uppercase">Prev</button>
        <button onClick={() => setShowMap(true)} className="bg-gray-100 p-3 rounded-xl"><Grid size={20} /></button>
        <button onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))} className="bg-[#004d00] text-white px-10 py-3 rounded-xl text-[10px] font-black uppercase">Next</button>
      </footer>

      {showMap && (
        <div className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-end">
          <div className="bg-white w-full rounded-t-[3rem] p-8 animate-in slide-in-from-bottom duration-300">
            <div className="flex justify-between items-center mb-6"><h3 className="font-black text-xs uppercase tracking-widest">Question Matrix</h3><button onClick={() => setShowMap(false)}><X /></button></div>
            <div className="grid grid-cols-5 gap-3 max-h-[40vh] overflow-y-auto">
              {questions.map((q, i) => (
                <button key={q.id} onClick={() => {setCurrentQIndex(i); setShowMap(false);}} className={`h-12 rounded-xl text-xs font-black border-2 ${currentQIndex === i ? 'border-yellow-400 bg-yellow-50' : answers[q.id] ? 'border-green-600 bg-green-50' : 'border-gray-100'}`}>{i+1}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ExamPageWrapper() {
  return <Suspense fallback={<div className="h-screen flex items-center justify-center bg-white font-black text-xs uppercase tracking-widest">Loading Terminal...</div>}><ExamContent /></Suspense>;
}
