"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight, Save, LogOut } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  // Data State
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Exam State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(null); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  
  // Persistence Key
  const getStorageKey = (email) => `cbt_session_${params.id}_${email}`;

  // 1. Initialize Exam (Aggressive Restore)
  useEffect(() => {
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }
    const parsedStudent = JSON.parse(studentData);
    setStudent(parsedStudent);

    async function loadExam() {
      try {
        // Check LocalStorage FIRST
        const savedSession = localStorage.getItem(getStorageKey(parsedStudent.email));
        
        const res = await fetch(`/api/cbt/exam?courseId=${params.id}`);
        const data = await res.json();
        
        setCourse(data.course);
        setQuestions(data.questions);

        if (savedSession) {
          const session = JSON.parse(savedSession);
          setAnswers(session.answers || {});
          setTimeLeft(session.timeLeft);
          setCurrentQIndex(session.currentIndex || 0);
        } else {
          setTimeLeft((data.course.duration || 15) * 60);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, []);

  // 2. Timer & Auto-Save Loop (Every Second)
  useEffect(() => {
    if (loading || isSubmitted || timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1;
        
        // Auto-Save to LocalStorage
        if (student) {
          localStorage.setItem(getStorageKey(student.email), JSON.stringify({
            answers,
            timeLeft: newTime,
            currentIndex: currentQIndex
          }));
        }

        if (newTime <= 0) {
          clearInterval(timer);
          submitExam();
          return 0;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, isSubmitted, timeLeft, answers, currentQIndex]);

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
    
    // Clear Session
    if (student) localStorage.removeItem(getStorageKey(student.email));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-green-800 font-bold">Loading Exam Interface...</div>;

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
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans h-screen overflow-hidden">
      
      {/* === JAMB HEADER === */}
      <header className="bg-[#004d00] text-white px-4 py-2 flex justify-between items-center shadow-md shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center text-green-800 font-bold">
            {student?.name?.charAt(0)}
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-xs uppercase">{student?.name}</h1>
            <p className="text-[10px] opacity-80">{course.code}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className={`font-mono font-bold text-xl ${timeLeft < 300 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
            {formatTime(timeLeft)}
          </div>
          <button 
            onClick={() => { if(confirm("Submit Exam?")) submitExam(); }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-xs font-bold uppercase shadow-sm"
          >
            Submit
          </button>
        </div>
      </header>

      {/* === SPLIT LAYOUT === */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* LEFT: QUESTION PANEL */}
        <div className="flex-1 flex flex-col bg-white md:border-r border-gray-300 relative">
          <div className="flex-1 overflow-y-auto p-6 pb-24">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <span className="font-bold text-gray-500 text-sm">Question {currentQIndex + 1}</span>
              <span className="text-xs font-bold bg-green-100 text-green-800 px-2 py-1 rounded">2 Marks</span>
            </div>

            <p className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed mb-8">
              {currentQ.question_text}
            </p>

            <div className="space-y-3">
              {['A','B','C','D'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-4 group ${
                    answers[currentQ.id] === opt 
                      ? 'border-green-600 bg-green-50' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    answers[currentQ.id] === opt ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {opt}
                  </span>
                  <span className="font-medium text-gray-800">{currentQ[`option_${opt.toLowerCase()}`]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* STICKY FOOTER NAV */}
          <div className="absolute bottom-0 left-0 w-full bg-gray-50 border-t border-gray-200 p-4 flex justify-between items-center z-10">
            <button 
              onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
              disabled={currentQIndex === 0}
              className="px-6 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded shadow-sm disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
              disabled={currentQIndex === questions.length - 1}
              className="px-6 py-2 bg-green-700 text-white font-bold rounded shadow-sm hover:bg-green-800 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>

        {/* RIGHT: QUESTION MAP (Hidden on small mobile, toggleable maybe?) */}
        <div className="hidden md:flex w-80 bg-gray-100 flex-col border-l border-gray-300">
          <div className="p-3 bg-gray-200 border-b border-gray-300 font-bold text-gray-700 text-xs uppercase text-center">
            Question Map
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => setCurrentQIndex(i)}
                  className={`h-10 w-full rounded border text-xs font-bold shadow-sm transition-all ${
                    currentQIndex === i 
                      ? "bg-blue-600 text-white border-blue-700 ring-2 ring-blue-200" 
                      : answers[q.id] 
                        ? "bg-green-600 text-white border-green-700" 
                        : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          
          {/* LEGEND */}
          <div className="p-4 bg-white border-t border-gray-200 text-[10px] grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded"></div> Answered</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-600 rounded"></div> Current</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-white border border-gray-400 rounded"></div> Unanswered</div>
          </div>
        </div>

      </div>
    </main>
  );
}
