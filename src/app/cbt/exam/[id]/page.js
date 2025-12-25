"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight, AlertTriangle, Lock, Crown } from "lucide-react";
import UpgradeModal from "../../../../components/cbt/UpgradeModal";

/* === CUSTOM MODAL === */
function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, type = "warning" }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full overflow-hidden">
        <div className={`p-4 ${type === 'danger' ? 'bg-red-600' : 'bg-green-700'} text-white font-bold flex items-center gap-2`}>
          {type === 'danger' ? <AlertTriangle size={20} /> : <Clock size={20} />}
          {title}
        </div>
        <div className="p-6">
          <p className="text-gray-700 font-medium mb-6">{message}</p>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-3 border border-gray-300 rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button onClick={onConfirm} className={`flex-1 py-3 rounded-lg font-bold text-white ${type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-700 hover:bg-green-800'}`}>
              Confirm
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
  
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  
  // Upgrade State
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(null); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showMobileMap, setShowMobileMap] = useState(false);
  const [modalConfig, setModalConfig] = useState({ show: false });
  const [strikes, setStrikes] = useState(0);
  
  const getStorageKey = (email) => `cbt_session_${params.id}_${email}`;

  useEffect(() => {
    setMounted(true);
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }
    const parsedStudent = JSON.parse(studentData);
    setStudent(parsedStudent);

    async function loadExam() {
      try {
        const query = new URLSearchParams({
          courseId: params.id,
          studentId: parsedStudent.id,
          token: parsedStudent.session_token
        });

        const res = await fetch(`/api/cbt/exam?${query.toString()}`);
        const data = await res.json();
        
        if (res.status === 401) {
          alert("Session Expired.");
          router.push("/cbt");
          return;
        }

        // TRIGGER UPGRADE MODAL ON 403
        if (res.status === 403) {
          setShowUpgrade(true);
          setLoading(false);
          return;
        }
        
        if (!res.ok) throw new Error(data.error || "Failed to load exam");
        if (!data.questions || data.questions.length === 0) throw new Error("No questions found.");
        
        setCourse(data.course);
        setQuestions(data.questions);

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
  }, []);

  // Timer & Malpractice logic (Same as before)
  useEffect(() => {
    if (!mounted || loading || isSubmitted || error || timeLeft === null || showUpgrade) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        if (student) localStorage.setItem(getStorageKey(student.email), JSON.stringify({ answers, timeLeft: newTime, currentIndex: currentQIndex }));
        if (newTime <= 0) { clearInterval(interval); submitExam(); return 0; }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, isSubmitted, error, timeLeft, answers, currentQIndex, mounted, showUpgrade]);

  const handleSelect = (option) => {
    if (isSubmitted) return;
    const qId = questions[currentQIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const submitExam = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    setScore(correctCount);
    if (student) localStorage.removeItem(getStorageKey(student.email));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const navigateTo = (index) => { setCurrentQIndex(index); setShowMobileMap(false); };
  const getGridColor = (index, qId) => {
    if (currentQIndex === index) return "bg-blue-600 text-white border-blue-700 ring-2 ring-blue-200";
    if (answers[qId]) return "bg-green-600 text-white border-green-700";
    return "bg-white text-gray-500 border-gray-300 hover:bg-gray-50";
  };

  const handleUpgradeSuccess = () => {
    setShowUpgrade(false);
    alert("Upgrade Successful! Reloading exam...");
    window.location.reload();
  };

  if (!mounted) return null;

  // === UPGRADE GATE ===
  if (showUpgrade) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={handleUpgradeSuccess} />
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md">
        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600">
          <Lock size={32} />
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Limit Reached</h1>
        <p className="text-gray-500 mb-6">You have used your 2 free attempts for this course.</p>
        <button onClick={() => router.push('/cbt/dashboard')} className="text-gray-400 hover:text-gray-600 font-bold text-sm">Return to Dashboard</button>
      </div>
    </div>
  );

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-green-800 font-bold">Verifying Access...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-center text-red-600 font-bold">{error}</div>;

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 font-sans">
        <header className="bg-green-800 text-white p-4 shadow-md flex justify-between items-center">
          <h1 className="font-bold">EXAM RESULT</h1>
          <button onClick={() => router.push('/cbt/dashboard')} className="text-xs bg-white text-green-800 px-3 py-1 rounded font-bold">EXIT</button>
        </header>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center mb-8 border-t-4 border-green-600">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Total Score</h2>
            <div className={`text-6xl font-black ${percentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>
              {score} / {questions.length}
            </div>
            <p className="text-gray-500 mt-2 font-bold">{percentage}%</p>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 uppercase tracking-widest border-b pb-2">Corrections</h3>
            {questions.map((q, i) => (
              <div key={q.id} className={`p-4 border-l-4 bg-white shadow-sm ${answers[q.id] === q.correct_option ? 'border-green-500' : 'border-red-500'}`}>
                <p className="font-bold text-gray-800 mb-2">{i+1}. {q.question_text}</p>
                <p className="text-sm text-gray-600">Correct: <span className="font-bold text-green-700">{q.correct_option}</span></p>
                {answers[q.id] !== q.correct_option && <p className="text-sm text-red-600">You Chose: <span className="font-bold">{answers[q.id] || "None"}</span></p>}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQIndex];
  if (!currentQ) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans h-screen overflow-hidden">
      <ConfirmModal isOpen={modalConfig.show} title={modalConfig.title} message={modalConfig.message} type={modalConfig.type} onConfirm={modalConfig.action} onCancel={() => setModalConfig({ ...modalConfig, show: false })} />
      
      <header className="bg-[#004d00] text-white px-4 py-2 flex justify-between items-center shadow-md shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-green-800 font-bold">{student?.name?.charAt(0)}</div>
          <div className="leading-tight hidden sm:block">
            <h1 className="font-bold text-xs uppercase">{student?.name}</h1>
            <p className="text-[10px] opacity-80">{course?.code}</p>
          </div>
          <button onClick={() => setShowMobileMap(!showMobileMap)} className="sm:hidden flex items-center gap-1 bg-green-900/50 px-2 py-1 rounded border border-green-600 text-[10px] font-bold uppercase"><Grid size={14} /> Map</button>
        </div>
        <div className="flex items-center gap-3">
          <div className={`font-mono font-bold text-lg ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-white'}`}>{formatTime(timeLeft || 0)}</div>
          <button onClick={() => setModalConfig({ show: true, title: "Submit Exam?", message: "Are you sure?", action: submitExam })} className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold uppercase shadow-sm">Submit</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        <div className="flex-1 flex flex-col bg-white relative z-10">
          <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 scroll-smooth">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <span className="font-bold text-gray-500 text-sm">Question {currentQIndex + 1} of {questions.length}</span>
                <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">2 Marks</span>
              </div>
              <p className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed mb-8">{currentQ.question_text}</p>
              <div className="space-y-3">
                {['A','B','C','D'].map((opt) => (
                  <button key={opt} onClick={() => handleSelect(opt)} className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50' : 'border-gray-100 hover:border-gray-300'}`}>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${answers[currentQ.id] === opt ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{opt}</span>
                    <span className="font-bold text-gray-800">{currentQ[`option_${opt.toLowerCase()}`]}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center shrink-0">
            <button onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="px-8 py-3 font-bold text-gray-400 disabled:opacity-30">Previous</button>
            <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} disabled={currentQIndex === questions.length - 1} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-all active:scale-95 shadow-lg disabled:opacity-50">Next Question</button>
          </div>
        </div>
        <div className={`absolute inset-0 z-20 bg-white flex flex-col transition-transform duration-300 md:relative md:translate-x-0 md:w-80 md:border-l border-gray-300 ${showMobileMap ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-3 bg-gray-200 border-b border-gray-300 font-bold text-gray-700 text-xs uppercase flex justify-between items-center"><span>Question Map</span><button onClick={() => setShowMobileMap(false)} className="md:hidden p-1 bg-gray-300 rounded"><X size={14}/></button></div>
          <div className="flex-1 overflow-y-auto p-4"><div className="grid grid-cols-5 gap-2">{questions.map((q, i) => (<button key={q.id} onClick={() => navigateTo(i)} className={`h-10 w-full rounded border text-xs font-bold shadow-sm transition-all ${getGridColor(i, q.id)}`}>{i + 1}</button>))}</div></div>
        </div>
      </div>
    </main>
  );
}
