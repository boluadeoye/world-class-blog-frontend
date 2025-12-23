"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight, Save, User, CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  // Data
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // State
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(45 * 60); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showGrid, setShowGrid] = useState(false); // Mobile Grid Toggle

  // 1. Init
  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    setStudent(JSON.parse(stored));

    async function load() {
      try {
        const res = await fetch(`/api/cbt/exam?courseId=${params.id}`);
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setCourse(data.course);
        setQuestions(data.questions);
      } catch (e) {
        setError("Error loading exam.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // 2. Timer
  useEffect(() => {
    if (loading || isSubmitted || error) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); submitExam(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isSubmitted, error]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelect = (opt) => {
    if (isSubmitted) return;
    const qId = questions[currentQIndex].id;
    setAnswers(prev => ({ ...prev, [qId]: opt }));
  };

  const submitExam = async () => {
    setIsSubmitted(true);
    let correct = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correct++; });
    setScore(correct);
    
    await fetch('/api/cbt/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ student_id: student.id, course_id: course.id, score: correct, total: questions.length })
    });
  };

  if (loading) return <div className="h-screen flex items-center justify-center bg-white text-green-700 font-bold">Loading Exam...</div>;
  if (error) return <div className="h-screen flex items-center justify-center bg-white text-red-600 font-bold">{error}</div>;

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 p-4 font-sans overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className={`p-8 text-center ${percentage >= 50 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
            <h1 className="text-3xl font-black mb-2">{percentage >= 50 ? "PASSED" : "FAILED"}</h1>
            <div className="text-6xl font-black mb-2">{score}/{questions.length}</div>
            <p className="font-medium opacity-90">{percentage}% Score</p>
          </div>
          <div className="p-6 space-y-6">
            <h2 className="font-bold text-gray-800 border-b pb-2">Corrections</h2>
            {questions.map((q, i) => {
              const userAns = answers[q.id];
              const isCorrect = userAns === q.correct_option;
              return (
                <div key={q.id} className={`p-4 rounded-lg border-l-4 ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                  <p className="font-bold text-gray-900 mb-2"><span className="text-gray-500 mr-2">{i+1}.</span> {q.question_text}</p>
                  <p className="text-sm text-gray-600">Correct: <span className="font-bold">{q.correct_option}</span></p>
                  {!isCorrect && <p className="text-sm text-red-600">You chose: <span className="font-bold">{userAns || "None"}</span></p>}
                  {q.explanation && <p className="text-xs text-blue-600 mt-2 italic">Note: {q.explanation}</p>}
                </div>
              )
            })}
            <button onClick={() => router.push('/cbt/dashboard')} className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold">Finish Review</button>
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    // FIXED APP SHELL (No Window Scroll)
    <main className="fixed inset-0 bg-gray-100 flex flex-col font-sans text-gray-900 z-[99999]">
      
      {/* === 1. HEADER (Fixed Top) === */}
      <header className="h-16 bg-white border-b-4 border-green-600 flex justify-between items-center px-4 shadow-md shrink-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-800 font-bold border border-green-200">
            {student.name.charAt(0)}
          </div>
          <div className="leading-tight">
            <h1 className="font-bold text-xs text-gray-900 uppercase truncate max-w-[100px]">{student.name}</h1>
            <p className="text-[10px] text-gray-500 font-mono">{course.code}</p>
          </div>
        </div>

        {/* TIMER */}
        <div className={`flex items-center gap-2 px-3 py-1 rounded border-2 font-mono font-black text-lg ${timeLeft < 300 ? 'bg-red-50 border-red-500 text-red-600 animate-pulse' : 'bg-gray-50 border-gray-300 text-gray-800'}`}>
          <Clock size={16} />
          {formatTime(timeLeft)}
        </div>
      </header>

      {/* === 2. CONTENT (Scrollable Middle) === */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-sm border border-gray-300">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <span className="text-xs font-bold text-green-700 uppercase tracking-widest">Question {currentQIndex + 1} of {questions.length}</span>
            <span className="text-[10px] font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">2 Marks</span>
          </div>
          
          <h2 className="text-lg font-medium text-gray-900 leading-relaxed mb-8">
            {currentQ.question_text}
          </h2>

          <div className="space-y-3">
            {['A','B','C','D'].map((opt) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                  answers[currentQ.id] === opt 
                    ? 'border-green-600 bg-green-50 ring-1 ring-green-600' 
                    : 'border-gray-200 hover:border-green-400 hover:bg-gray-50'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs border ${
                  answers[currentQ.id] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-600 border-gray-300'
                }`}>
                  {opt}
                </span>
                <span className="font-medium text-sm text-gray-700">
                  {currentQ[`option_${opt.toLowerCase()}`]}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* === 3. FOOTER (Fixed Bottom) === */}
      <footer className="h-16 bg-white border-t border-gray-200 flex justify-between items-center px-4 shrink-0 z-50">
        <button 
          onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
          disabled={currentQIndex === 0}
          className="flex items-center gap-1 px-4 py-2 rounded bg-gray-100 text-gray-600 font-bold text-xs disabled:opacity-50"
        >
          <ChevronLeft size={16} /> Prev
        </button>

        {/* GRID TOGGLE */}
        <button 
          onClick={() => setShowGrid(true)}
          className="flex items-center gap-2 px-4 py-2 rounded bg-blue-50 text-blue-700 font-bold text-xs border border-blue-200"
        >
          <Grid size={16} /> Question Map
        </button>

        {currentQIndex === questions.length - 1 ? (
          <button 
            onClick={() => { if(confirm("Submit Exam?")) submitExam(); }}
            className="flex items-center gap-1 px-4 py-2 rounded bg-red-600 text-white font-bold text-xs shadow-md"
          >
            <Save size={16} /> Submit
          </button>
        ) : (
          <button 
            onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
            className="flex items-center gap-1 px-4 py-2 rounded bg-green-700 text-white font-bold text-xs shadow-md"
          >
            Next <ChevronRight size={16} />
          </button>
        )}
      </footer>

      {/* === 4. GRID OVERLAY (Mobile Modal) === */}
      {showGrid && (
        <div className="absolute inset-0 bg-black/50 z-[100] flex items-end sm:items-center justify-center">
          <div className="bg-white w-full sm:w-96 h-[80%] sm:h-[600px] rounded-t-2xl sm:rounded-2xl p-4 flex flex-col">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h3 className="font-bold text-gray-800">Question Map</h3>
              <button onClick={() => setShowGrid(false)}><X size={20} className="text-gray-500" /></button>
            </div>
            <div className="flex-1 overflow-y-auto grid grid-cols-5 gap-2 content-start">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => { setCurrentQIndex(i); setShowGrid(false); }}
                  className={`h-10 rounded flex items-center justify-center text-xs font-bold border ${
                    currentQIndex === i ? 'ring-2 ring-black border-black' : 'border-transparent'
                  } ${
                    answers[q.id] ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-600 rounded"></div> Answered</span>
              <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-100 border rounded"></div> Empty</span>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
