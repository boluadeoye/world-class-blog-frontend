"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight, Save, User, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(45 * 60); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showGrid, setShowGrid] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    setStudent(JSON.parse(stored));

    async function loadExam() {
      const res = await fetch(`/api/cbt/exam?courseId=${params.id}`);
      const data = await res.json();
      setCourse(data.course);
      setQuestions(data.questions);
      setLoading(false);
    }
    loadExam();
  }, []);

  useEffect(() => {
    if (loading || isSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) { clearInterval(timer); submitExam(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loading, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const submitExam = async () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_option) correctCount++;
    });
    setScore(correctCount);
    
    // Save Result to DB
    await fetch('/api/cbt/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        student_id: student.id,
        course_id: course.id,
        score: correctCount,
        total: questions.length
      })
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-green-800 font-bold">Loading Exam...</div>;

  // === RESULT VIEW ===
  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-100 font-sans pb-20">
        <div className="bg-white border-b border-gray-200 p-8 text-center shadow-sm sticky top-0 z-50">
          <h1 className="text-2xl font-black text-gray-900 uppercase mb-2">Performance Report</h1>
          <div className={`inline-block px-8 py-3 rounded-full text-white font-bold text-2xl ${percentage >= 50 ? 'bg-green-600' : 'bg-red-600'}`}>
            {score} / {questions.length} ({percentage}%)
          </div>
          <p className="text-sm text-gray-500 mt-2 font-medium">
            {percentage >= 70 ? "Outstanding Performance!" : percentage >= 50 ? "Good Effort. Keep Pushing." : "More Study Required."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {questions.map((q, i) => {
            const userAns = answers[q.id];
            const isCorrect = userAns === q.correct_option;
            return (
              <div key={q.id} className={`bg-white p-6 rounded-xl border-l-8 shadow-sm ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                <div className="flex gap-3 mb-4">
                  <span className="font-black text-gray-300 text-lg">Q{i+1}</span>
                  <p className="font-bold text-gray-900 text-lg">{q.question_text}</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
                  {['A','B','C','D'].map(opt => (
                    <div key={opt} className={`px-4 py-3 rounded-lg border flex justify-between items-center ${
                      q.correct_option === opt ? 'bg-green-100 border-green-500 text-green-900 font-bold' : 
                      userAns === opt ? 'bg-red-50 border-red-300 text-red-900' : 'bg-gray-50 border-gray-200 text-gray-500'
                    }`}>
                      <span><span className="font-bold mr-2">{opt}.</span> {q[`option_${opt.toLowerCase()}`]}</span>
                      {q.correct_option === opt && <CheckCircle size={16} className="text-green-700"/>}
                      {userAns === opt && userAns !== q.correct_option && <XCircle size={16} className="text-red-600"/>}
                    </div>
                  ))}
                </div>
                
                {/* INTELLIGENT ANALYSIS */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-sm text-blue-900">
                  <p className="font-bold mb-1 flex items-center gap-2"><AlertTriangle size={14}/> Analysis:</p>
                  <p>{q.explanation || "The correct answer is derived from the standard course material."}</p>
                </div>
              </div>
            )
          })}
          <button onClick={() => router.push('/cbt/dashboard')} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-colors shadow-lg">
            Return to Dashboard
          </button>
        </div>
      </main>
    );
  }

  // === EXAM VIEW ===
  const currentQ = questions[currentQIndex];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900 overflow-hidden">
      
      {/* FIXED HEADER (Timer Always Visible) */}
      <header className="bg-white border-b-4 border-green-600 px-4 py-3 flex justify-between items-center fixed top-0 left-0 right-0 z-[100] shadow-md h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center border border-gray-300 font-bold text-gray-600">
            {student?.name?.charAt(0)}
          </div>
          <div className="hidden sm:block leading-tight">
            <h1 className="font-bold text-sm text-gray-900 uppercase">{student?.name}</h1>
            <p className="text-[10px] text-gray-500 font-mono">{course?.code}</p>
          </div>
        </div>

        <div className={`flex items-center gap-2 px-4 py-1.5 rounded-lg font-mono font-black text-xl tracking-widest border-2 ${timeLeft < 300 ? 'bg-red-50 border-red-500 text-red-600 animate-pulse' : 'bg-gray-50 border-gray-300 text-gray-800'}`}>
          <Clock size={20} />
          {formatTime(timeLeft)}
        </div>

        <button 
          onClick={() => { if(confirm("Submit Exam?")) submitExam(); }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
        >
          Submit
        </button>
      </header>

      {/* Spacer for Fixed Header */}
      <div className="h-16"></div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* QUESTION AREA */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-300 min-h-[400px] flex flex-col">
              <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                <span className="text-sm font-bold text-green-700 uppercase tracking-widest">Question {currentQIndex + 1} of {questions.length}</span>
                <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">2 Marks</span>
              </div>
              
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-relaxed mb-8 select-none">
                {currentQ.question_text}
              </h2>

              <div className="space-y-3">
                {['A','B','C','D'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all flex items-center gap-4 group ${
                      answers[currentQ.id] === opt 
                        ? 'border-green-600 bg-green-50 ring-1 ring-green-600' 
                        : 'border-gray-200 hover:border-green-400 hover:bg-gray-50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border ${
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

        {/* NAVIGATION FOOTER */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 flex justify-between items-center z-30">
          <button 
            onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))}
            disabled={currentQIndex === 0}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} /> Previous
          </button>

          <button 
            onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))}
            disabled={currentQIndex === questions.length - 1}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-green-700 text-white font-bold hover:bg-green-800 disabled:opacity-50"
          >
            Next <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}
