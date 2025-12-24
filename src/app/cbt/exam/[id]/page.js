"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState(new Set([0]));
  const [timeLeft, setTimeLeft] = useState(0); // Will be set from DB
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  const [strikes, setStrikes] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    setStudent(JSON.parse(stored));

    async function loadExam() {
      try {
        const res = await fetch(`/api/cbt/exam?courseId=${params.id}`);
        const data = await res.json();
        if (!data.course || !data.questions) throw new Error("No data");
        
        setCourse(data.course);
        setQuestions(data.questions);
        
        // SET DYNAMIC TIME (Default to 15 mins if missing)
        setTimeLeft((data.course.duration || 15) * 60);
        
      } catch (e) {
        alert("Failed to load exam.");
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, []);

  useEffect(() => {
    if (loading || isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isSubmitted, timeLeft]);

  // Malpractice Detector
  useEffect(() => {
    if (isSubmitted) return;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newStrikes = strikes + 1;
        setStrikes(newStrikes);
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        if (newStrikes >= 3) {
          alert("Maximum malpractice strikes reached. Exam auto-submitted.");
          submitExam();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [strikes, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const navigateTo = (index) => {
    setCurrentQIndex(index);
    setVisited(prev => new Set(prev).add(index));
  };

  const handleSelect = (option) => {
    if (isSubmitted) return;
    const qId = questions[currentQIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const submitExam = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_option) correctCount++;
    });
    setScore(correctCount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGridColor = (index, qId) => {
    if (currentQIndex === index) return "bg-red-600 text-white border-red-700";
    if (answers[qId]) return "bg-green-600 text-white border-green-700";
    if (visited.has(index)) return "bg-yellow-400 text-black border-yellow-500";
    return "bg-gray-200 text-gray-600 border-gray-300";
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-green-800">Loading System...</div>;

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-100 font-sans">
        <header className="bg-green-700 text-white p-4 shadow-md">
          <h1 className="text-xl font-bold text-center">EXAM RESULT</h1>
        </header>
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-lg shadow p-8 text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Total Score</h2>
            <div className={`text-6xl font-black ${percentage >= 50 ? 'text-green-600' : 'text-red-600'}`}>
              {score} / {questions.length}
            </div>
            <p className="text-gray-500 mt-2 font-bold">{percentage}%</p>
            <button onClick={() => router.push('/cbt/dashboard')} className="mt-6 bg-gray-800 text-white px-8 py-3 rounded font-bold">
              Exit to Dashboard
            </button>
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-gray-700 uppercase tracking-widest border-b pb-2">Corrections</h3>
            {questions.map((q, i) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct_option;
              return (
                <div key={q.id} className={`p-4 border-l-4 bg-white shadow-sm ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                  <p className="font-bold text-gray-800 mb-2">{i+1}. {q.question_text}</p>
                  <p className="text-sm text-gray-600">Correct Answer: <span className="font-bold text-green-700">{q.correct_option}</span></p>
                  {!isCorrect && <p className="text-sm text-red-600">You Chose: <span className="font-bold">{userAns || "Nothing"}</span></p>}
                  {q.explanation && <p className="text-xs text-gray-500 mt-1 italic">{q.explanation}</p>}
                </div>
              )
            })}
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-green-700 text-white px-4 py-3 flex justify-between items-center shadow-md z-20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-800 font-bold border-2 border-green-800">
            {student?.name?.charAt(0)}
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-sm uppercase">{student?.name}</h1>
            <p className="text-xs opacity-80">{course.code}</p>
          </div>
        </div>
        <div className={`text-xl font-mono font-bold bg-green-800 px-4 py-1 rounded border border-green-600 ${timeLeft < 300 ? 'animate-pulse text-red-300' : ''}`}>
          {formatTime(timeLeft)}
        </div>
        <button onClick={() => { if(confirm("Are you sure you want to submit?")) submitExam(); }} className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-bold text-sm shadow-sm border border-red-800">
          SUBMIT
        </button>
      </header>

      {showWarning && (
        <div className="bg-red-600 text-white text-center py-2 text-xs font-bold uppercase tracking-widest animate-pulse">
          ⚠️ Warning: Tab Switching Detected ({strikes}/3)
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm min-h-[400px] flex flex-col">
            <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
              <span className="font-bold text-gray-700">Question {currentQIndex + 1}</span>
              <span className="text-xs font-bold text-gray-400">2 Marks</span>
            </div>
            <div className="p-6 md:p-8 flex-1">
              <p className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed mb-8">
                {currentQ.question_text}
              </p>
              <div className="space-y-3">
                {['A','B','C','D'].map((opt) => (
                  <label key={opt} className={`flex items-center gap-4 p-3 rounded border-2 cursor-pointer transition-all ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:bg-gray-50'}`}>
                    <input type="radio" name={`q-${currentQ.id}`} checked={answers[currentQ.id] === opt} onChange={() => handleSelect(opt)} className="w-5 h-5 accent-green-600" />
                    <span className="font-bold text-gray-500">{opt}.</span>
                    <span className="text-gray-800 font-medium">{currentQ[`option_${opt.toLowerCase()}`]}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-between">
              <button onClick={() => navigateTo(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="px-6 py-2 bg-gray-200 text-gray-700 font-bold rounded hover:bg-gray-300 disabled:opacity-50">Previous</button>
              <button onClick={() => navigateTo(Math.min(questions.length - 1, currentQIndex + 1))} disabled={currentQIndex === questions.length - 1} className="px-6 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800 disabled:opacity-50">Next</button>
            </div>
          </div>
        </div>
        <div className="w-full md:w-80 bg-white border-l border-gray-300 flex flex-col">
          <div className="p-3 bg-gray-100 border-b border-gray-300 font-bold text-gray-700 text-sm text-center">Question Map</div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button key={q.id} onClick={() => navigateTo(i)} className={`h-10 w-full rounded border text-sm font-bold shadow-sm transition-all ${getGridColor(i, q.id)}`}>{i + 1}</button>
              ))}
            </div>
          </div>
          <div className="p-4 border-t border-gray-200 bg-gray-50 text-[10px] grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-600 rounded"></div> Current</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-yellow-400 rounded"></div> Skipped</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-200 border border-gray-400 rounded"></div> Unseen</div>
          </div>
        </div>
      </div>
    </main>
  );
}
