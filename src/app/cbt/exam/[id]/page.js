"use client";
import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronLeft, ChevronRight, Grid, Send, AlertTriangle, User, Home } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  // Data & UI State
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Functional State
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(null); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // 1. Initial Load & Hydration
  useEffect(() => {
    const studentData = sessionStorage.getItem("cbt_student");
    if (!studentData) { router.push("/cbt"); return; }
    const parsedStudent = JSON.parse(studentData);
    setStudent(parsedStudent);

    async function loadExam() {
      try {
        const res = await fetch(`/api/cbt/exam?courseId=${params.id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load exam");
        
        setCourse(data.course);
        setQuestions(data.questions);

        // PERSISTENCE LOGIC: Check for saved state
        const savedState = localStorage.getItem(`cbt_state_${params.id}_${parsedStudent.email}`);
        if (savedState) {
          const { savedAnswers, savedTime } = JSON.parse(savedState);
          setAnswers(savedAnswers);
          setTimeLeft(savedTime);
        } else {
          setTimeLeft((data.course.duration || 15) * 60);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, [params.id]);

  // 2. Timer & State Persistence Loop
  useEffect(() => {
    if (loading || isSubmitted || error || timeLeft === null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const nextTime = prev - 1;
        if (nextTime <= 0) {
          clearInterval(interval);
          submitExam();
          return 0;
        }
        // Save state to local storage every second
        localStorage.setItem(`cbt_state_${params.id}_${student.email}`, JSON.stringify({
          savedAnswers: answers,
          savedTime: nextTime
        }));
        return nextTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, isSubmitted, error, timeLeft, answers]);

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
    // Clear saved state after submission
    localStorage.removeItem(`cbt_state_${params.id}_${student.email}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-green-700">
      <div className="w-12 h-12 border-4 border-green-200 border-t-green-700 rounded-full animate-spin mb-4"></div>
      <p className="font-bold animate-pulse">Initializing Exam Terminal...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <AlertTriangle size={64} className="text-red-500 mb-4" />
      <h1 className="text-2xl font-black text-gray-900">System Error</h1>
      <p className="text-gray-600 mb-8">{error}</p>
      <button onClick={() => router.push('/cbt/dashboard')} className="px-8 py-3 bg-green-700 text-white rounded-full font-bold">Return to Base</button>
    </div>
  );

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className={`p-12 text-center ${percentage >= 50 ? 'bg-green-700' : 'bg-red-700'} text-white`}>
            <p className="text-xs font-bold uppercase tracking-[0.3em] mb-2 opacity-80">Final Result</p>
            <h2 className="text-7xl font-black mb-4">{percentage}%</h2>
            <p className="text-xl font-medium">You got {score} out of {questions.length} questions correct.</p>
          </div>
          <div className="p-8 space-y-6">
            <h3 className="font-bold text-gray-900 uppercase tracking-widest text-sm border-b pb-2">Review Script</h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {questions.map((q, i) => (
                <div key={q.id} className={`p-4 rounded-xl border ${answers[q.id] === q.correct_option ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
                  <p className="font-bold text-gray-800 text-sm">{i+1}. {q.question_text}</p>
                  <p className="text-xs mt-2 font-bold text-green-700 uppercase">Correct: {q.correct_option} | Your Choice: {answers[q.id] || "None"}</p>
                </div>
              ))}
            </div>
            <button onClick={() => router.push('/cbt/dashboard')} className="w-full py-4 bg-gray-950 text-white rounded-2xl font-bold hover:bg-black transition-all">Back to Dashboard</button>
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col font-sans select-none">
      
      {/* === JAMB OFFICIAL HEADER === */}
      <header className="bg-[#15803d] text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-green-800 font-black border-2 border-green-900 shadow-sm">
            {student?.name?.charAt(0)}
          </div>
          <div className="hidden sm:block">
            <h1 className="font-black text-xs uppercase tracking-tighter leading-none">{student?.name}</h1>
            <p className="text-[10px] opacity-70 font-bold uppercase">{course?.code} TEST</p>
          </div>
        </div>

        {/* CLOCK */}
        <div className={`flex items-center gap-3 px-6 py-2 rounded-full bg-black/20 border border-white/10 font-mono text-2xl font-black ${timeLeft < 300 ? 'text-red-300 animate-pulse' : 'text-white'}`}>
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>

        <button 
          onClick={() => confirm("End examination now?") && submitExam()}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest shadow-lg border border-red-800 transition-all active:scale-95"
        >
          Submit
        </button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        
        {/* === MAIN QUESTION AREA === */}
        <div className="flex-1 p-4 md:p-8 overflow-y-auto bg-white">
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <div className="bg-gray-100 px-4 py-1 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">Question {currentQIndex + 1} of {questions.length}</div>
              <div className="text-[10px] font-black text-green-700 uppercase tracking-widest">Correct: +2.0</div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-10 leading-relaxed">
                  {currentQ.question_text}
                </h2>

                <div className="space-y-4">
                  {['A','B','C','D'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelect(opt)}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all flex items-center gap-5 group ${
                        answers[currentQ.id] === opt 
                          ? 'border-green-600 bg-green-50' 
                          : 'border-gray-100 hover:border-green-200 hover:bg-gray-50'
                      }`}
                    >
                      <span className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                        answers[currentQ.id] === opt ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-green-100'
                      }`}>
                        {opt}
                      </span>
                      <span className={`text-lg font-medium ${answers[currentQ.id] === opt ? 'text-green-900' : 'text-gray-700'}`}>
                        {currentQ[`option_${opt.toLowerCase()}`]}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
              <button 
                onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
                disabled={currentQIndex === 0}
                className="flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-gray-400 hover:bg-gray-50 disabled:opacity-30"
              >
                <ChevronLeft size={20} /> Previous
              </button>
              <button 
                onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
                disabled={currentQIndex === questions.length - 1}
                className="flex items-center gap-2 px-10 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all active:scale-95 shadow-xl"
              >
                Next <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* === INTELLIGENT NAVIGATION GRID === */}
        <aside className="w-full md:w-[350px] bg-gray-50 border-l border-gray-200 flex flex-col p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <Grid size={14} /> Subject Map
            </h3>
            <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">Progress: {Object.keys(answers).length}/{questions.length}</span>
          </div>

          <div className="grid grid-cols-5 gap-3">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentQIndex(i)}
                className={`h-12 w-full rounded-xl border-2 font-bold text-sm transition-all shadow-sm ${
                  currentQIndex === i 
                    ? "border-red-500 bg-red-50 text-red-700 scale-110 z-10" 
                    : answers[q.id] 
                      ? "border-green-600 bg-green-600 text-white" 
                      : "border-gray-200 bg-white text-gray-400 hover:border-green-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* LEGEND */}
          <div className="mt-10 p-4 rounded-2xl bg-white border border-gray-200 space-y-3">
            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase">
              <div className="w-4 h-4 bg-green-600 rounded-md"></div> Answered
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase">
              <div className="w-4 h-4 bg-red-50 border-2 border-red-500 rounded-md"></div> Current
            </div>
            <div className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase">
              <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded-md"></div> Untouched
            </div>
          </div>
        </aside>

      </div>
    </main>
  );
}
