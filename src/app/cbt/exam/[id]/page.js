"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight, Save, User, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  // Data State
  const [student, setStudent] = useState(null);
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
  const [showGrid, setShowGrid] = useState(false); // Mobile grid toggle

  // 1. Initialize
  useEffect(() => {
    const storedStudent = sessionStorage.getItem("cbt_student");
    if (!storedStudent) {
      router.push("/cbt");
      return;
    }
    setStudent(JSON.parse(storedStudent));

    async function loadExam() {
      try {
        const res = await fetch(`/api/cbt/exam?courseId=${params.id}`);
        if (!res.ok) throw new Error("Failed to load exam");
        const data = await res.json();
        setCourse(data.course);
        setQuestions(data.questions);
      } catch (err) {
        setError("System Error: Could not load questions.");
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, []);

  // 2. Strict Timer
  useEffect(() => {
    if (loading || isSubmitted || error) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          submitExam(); // Auto-submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isSubmitted, error]);

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
    if (!isSubmitted) {
      setIsSubmitted(true);
      let correctCount = 0;
      questions.forEach(q => {
        if (answers[q.id] === q.correct_option) correctCount++;
      });
      setScore(correctCount);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // === LOADING / ERROR ===
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-600 font-bold animate-pulse">Initializing Exam Environment...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-100 text-red-600 font-bold">{error}</div>;

  // === RESULT DASHBOARD ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-100 font-sans pb-20">
        {/* Result Header */}
        <div className="bg-white border-b border-gray-200 p-6 text-center shadow-sm">
          <h1 className="text-2xl font-black text-gray-900 uppercase mb-2">Examination Result</h1>
          <div className={`inline-block px-6 py-2 rounded-full text-white font-bold text-xl ${percentage >= 50 ? 'bg-green-600' : 'bg-red-600'}`}>
            Score: {score} / {questions.length} ({percentage}%)
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6 space-y-6">
          <h2 className="text-lg font-bold text-gray-700 border-b pb-2">Corrections & Analysis</h2>
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correct_option;
            return (
              <div key={q.id} className={`bg-white p-6 rounded-lg border-l-4 shadow-sm ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                <div className="flex gap-3 mb-3">
                  <span className="font-bold text-gray-400">Q{i+1}.</span>
                  <p className="font-medium text-gray-900">{q.question_text}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm mb-4">
                  {['A','B','C','D'].map(opt => (
                    <div key={opt} className={`px-3 py-2 rounded border ${
                      q.correct_option === opt ? 'bg-green-100 border-green-500 text-green-900 font-bold' : 
                      userAns === opt ? 'bg-red-100 border-red-300 text-red-900' : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}>
                      <span className="mr-2">{opt}.</span> {q[`option_${opt.toLowerCase()}`]}
                      {q.correct_option === opt && <CheckCircle size={14} className="inline ml-2 text-green-600"/>}
                      {userAns === opt && userAns !== q.correct_option && <XCircle size={14} className="inline ml-2 text-red-600"/>}
                    </div>
                  ))}
                </div>
                
                {q.explanation && (
                  <div className="bg-blue-50 p-3 rounded text-xs text-blue-800 border border-blue-100">
                    <strong>Explanation:</strong> {q.explanation}
                  </div>
                )}
              </div>
            )
          })}
          <button onClick={() => router.push('/cbt/dashboard')} className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold hover:bg-black transition-colors shadow-lg">
            Return to Dashboard
          </button>
        </div>
      </main>
    );
  }

  // === EXAM INTERFACE ===
  const currentQ = questions[currentQIndex];
  const isLastQuestion = currentQIndex === questions.length - 1;

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900 overflow-hidden">
      
      {/* === 1. THE OFFICIAL HEADER (Sticky) === */}
      <header className="bg-white border-b-2 border-green-600 px-4 py-3 flex justify-between items-center sticky top-0 z-50 shadow-md h-16">
        
        {/* Student Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden border border-gray-300">
            <User className="w-full h-full text-gray-400 p-1" />
          </div>
          <div className="hidden sm:block leading-tight">
            <h1 className="font-bold text-sm text-gray-900 uppercase">{student?.name}</h1>
            <p className="text-[10px] text-gray-500 font-mono">{course?.code}</p>
          </div>
        </div>

        {/* The Timer */}
        <div className={`flex items-center gap-2 px-4 py-1.5 rounded border-2 font-mono font-black text-xl tracking-widest ${timeLeft < 300 ? 'bg-red-50 border-red-500 text-red-600 animate-pulse' : 'bg-gray-50 border-gray-300 text-gray-800'}`}>
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>

        {/* Submit Button */}
        <button 
          onClick={() => { if(confirm("Are you sure you want to submit?")) submitExam(); }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
        >
          Submit
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden relative">
        
        {/* === 2. QUESTION AREA === */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-3xl mx-auto">
            
            {/* Question Card */}
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-sm border border-gray-300 min-h-[400px] flex flex-col relative">
              
              {/* Meta */}
              <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                <span className="text-sm font-bold text-green-700 uppercase tracking-widest">Question {currentQIndex + 1} of {questions.length}</span>
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">2 Marks</span>
              </div>
              
              {/* Text */}
              <h2 className="text-lg md:text-xl font-medium text-gray-900 leading-relaxed mb-8 select-none">
                {currentQ.question_text}
              </h2>

              {/* Options */}
              <div className="space-y-3">
                {['A','B','C','D'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left p-4 rounded border transition-all flex items-center gap-4 group ${
                      answers[currentQ.id] === opt 
                        ? 'border-green-600 bg-green-50 ring-1 ring-green-600' 
                        : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded flex items-center justify-center font-bold text-sm border ${
                      answers[currentQ.id] === opt ? 'bg-green-600 text-white border-green-600' : 'bg-gray-100 text-gray-600 border-gray-300 group-hover:border-green-400'
                    }`}>
                      {opt}
                    </span>
                    <span className={`font-medium ${answers[currentQ.id] === opt ? 'text-green-900' : 'text-gray-700'}`}>
                      {currentQ[`option_${opt.toLowerCase()}`]}
                    </span>
                  </button>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* === 3. NAVIGATION FOOTER (Fixed Bottom) === */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-30 md:pr-72">
          <button 
            onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
            disabled={currentQIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={20} /> Previous
          </button>

          {/* Mobile Grid Toggle */}
          <button onClick={() => setShowGrid(!showGrid)} className="md:hidden p-3 bg-gray-100 rounded text-gray-600">
            <Grid size={20} />
          </button>

          {isLastQuestion ? (
            <button 
              onClick={() => { if(confirm("Submit Exam?")) submitExam(); }}
              className="flex items-center gap-2 px-8 py-3 rounded bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg"
            >
              <Save size={20} /> Submit Exam
            </button>
          ) : (
            <button 
              onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
              className="flex items-center gap-2 px-8 py-3 rounded bg-green-700 text-white font-bold hover:bg-green-800 shadow-lg"
            >
              Next <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* === 4. QUESTION GRID (Sidebar / Drawer) === */}
        <div className={`absolute md:relative top-0 right-0 h-full w-72 bg-white border-l border-gray-200 z-40 transform transition-transform duration-300 ${showGrid ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}`}>
          <div className="p-4 h-full overflow-y-auto pb-24">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Question Map</h3>
              <button onClick={() => setShowGrid(false)} className="md:hidden text-gray-400"><XCircle size={20}/></button>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {questions.map((q, i) => (
                <button
                  key={q.id}
                  onClick={() => { setCurrentQIndex(i); setShowGrid(false); }}
                  className={`h-10 rounded flex items-center justify-center text-xs font-bold border transition-colors ${
                    currentQIndex === i ? 'ring-2 ring-black ring-offset-1 border-black' : 'border-transparent'
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
            
            <div className="mt-6 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-600 rounded"></div> Answered</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-gray-100 rounded border"></div> Unanswered</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-black rounded"></div> Current</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
