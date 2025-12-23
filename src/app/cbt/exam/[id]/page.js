"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  // Data State
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Exam State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(45 * 60); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Malpractice State
  const [strikes, setStrikes] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  // 1. Fetch Exam Data & Check Auth
  useEffect(() => {
    // Auth Check
    try {
      const student = sessionStorage.getItem("cbt_student");
      if (!student) {
        router.push("/cbt");
        return;
      }
    } catch (e) {
      // Ignore storage errors
    }

    async function loadExam() {
      try {
        const res = await fetch(`/api/cbt/exam?courseId=${params.id}`);
        if (!res.ok) throw new Error("Failed to load exam data");
        
        const data = await res.json();
        if (!data.course || !data.questions) throw new Error("Invalid exam data");
        
        setCourse(data.course);
        setQuestions(data.questions);
      } catch (err) {
        console.error(err);
        setError("Could not load the exam. Please try refreshing.");
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, [params.id, router]);

  // 2. Timer Logic
  useEffect(() => {
    if (loading || isSubmitted || error) return;
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
  }, [loading, isSubmitted, error]);

  // 3. Malpractice Detector
  useEffect(() => {
    if (isSubmitted || loading || error) return;
    
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
  }, [strikes, isSubmitted, loading, error]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
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

  // === LOADING / ERROR STATES ===
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500 font-bold">Loading Exam Interface...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-500 font-bold">{error}</div>;
  if (!course || questions.length === 0) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500 font-bold">No questions found for this course.</div>;

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-100 p-6 font-sans">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className={`p-8 text-center ${percentage >= 50 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
            <h1 className="text-3xl font-black mb-2">{percentage >= 50 ? "EXCELLENT!" : "KEEP PRACTICING"}</h1>
            <p className="text-lg opacity-90">You scored {score} out of {questions.length}</p>
            <div className="mt-6 text-6xl font-black">{percentage}%</div>
          </div>
          
          <div className="p-8">
            <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">Corrections</h2>
            <div className="space-y-8">
              {questions.map((q, i) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correct_option;
                return (
                  <div key={q.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
                    <p className="font-bold text-gray-800 mb-3"><span className="text-gray-500 mr-2">{i+1}.</span> {q.question_text}</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-3">
                      {['A','B','C','D'].map(opt => (
                        <div key={opt} className={`px-3 py-2 rounded border ${
                          q.correct_option === opt ? 'bg-green-600 text-white border-green-600' : 
                          userAns === opt ? 'bg-red-100 text-red-800 border-red-300' : 'bg-white text-gray-500 border-gray-200'
                        }`}>
                          <span className="font-bold mr-2">{opt}.</span> {q[`option_${opt.toLowerCase()}`]}
                        </div>
                      ))}
                    </div>
                    
                    {!isCorrect && (
                      <p className="text-xs text-red-600 font-bold mt-2">
                        Your Answer: {userAns || "None"} | Correct Answer: {q.correct_option}
                      </p>
                    )}
                    {q.explanation && (
                      <p className="text-xs text-gray-600 mt-2 italic border-t border-gray-200 pt-2">
                        💡 {q.explanation}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
            <button onClick={() => router.push('/cbt/dashboard')} className="w-full mt-8 bg-gray-900 text-white py-4 rounded-lg font-bold hover:bg-black transition-colors">
              Return to Dashboard
            </button>
          </div>
        </div>
      </main>
    );
  }

  // === EXAM VIEW ===
  const currentQ = questions[currentQIndex];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900">
      
      {/* HEADER */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
        <div>
          <h1 className="font-black text-lg text-gray-800">{course.code}</h1>
          <p className="text-xs text-gray-500 font-bold uppercase">Mock Examination</p>
        </div>
        
        <div className={`flex items-center gap-2 px-4 py-2 rounded font-mono font-bold text-xl ${timeLeft < 300 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-700'}`}>
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>

        <button 
          onClick={() => { if(confirm("Submit Exam?")) submitExam(); }}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-bold text-sm transition-colors shadow-sm"
        >
          Submit
        </button>
      </header>

      {/* MALPRACTICE WARNING */}
      {showWarning && (
        <div className="bg-red-600 text-white text-center py-2 text-xs font-bold uppercase tracking-widest animate-pulse">
          ⚠️ Warning: Tab Switching Detected ({strikes}/3)
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT: QUESTION AREA */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-200 min-h-[400px] flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Question {currentQIndex + 1} of {questions.length}</span>
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">2 Marks</span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed mb-8">
                {currentQ.question_text}
              </h2>

              <div className="space-y-3">
                {['A','B','C','D'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-4 group ${
                      answers[currentQ.id] === opt 
                        ? 'border-green-600 bg-green-50' 
                        : 'border-gray-200 hover:border-green-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      answers[currentQ.id] === opt ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600 group-hover:bg-green-100'
                    }`}>
                      {opt}
                    </span>
                    <span className={`font-medium ${answers[currentQ.id] === opt ? 'text-green-900' : 'text-gray-700'}`}>
                      {currentQ[`option_${opt.toLowerCase()}`]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Navigation */}
              <div className="mt-auto pt-8 flex justify-between">
                <button 
                  onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                  disabled={currentQIndex === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                <button 
                  onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
                  disabled={currentQIndex === questions.length - 1}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 text-white font-bold hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: QUESTION GRID (Sidebar) */}
        <div className="w-full md:w-72 bg-white border-l border-gray-200 p-4 overflow-y-auto hidden md:block">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
            <Grid size={14} /> Question Palette
          </h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentQIndex(i)}
                className={`h-10 rounded flex items-center justify-center text-xs font-bold transition-colors ${
                  currentQIndex === i ? 'ring-2 ring-black ring-offset-1' : ''
                } ${
                  answers[q.id] 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
