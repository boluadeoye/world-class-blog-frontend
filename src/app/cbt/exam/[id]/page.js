"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight, AlertCircle, Home } from "lucide-react";

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState(new Set([0]));
  const [timeLeft, setTimeLeft] = useState(0); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const stored = sessionStorage.getItem("cbt_student");
    if (!stored) { router.push("/cbt"); return; }
    setStudent(JSON.parse(stored));

    async function loadExam() {
      try {
        const res = await fetch(`/api/cbt/exam?courseId=${params.id}`);
        const data = await res.json();
        
        if (!res.ok) throw new Error(data.error || "Server rejected the request");
        if (!data.course || !data.questions || data.questions.length === 0) {
          throw new Error("This course has no questions uploaded yet.");
        }
        
        setCourse(data.course);
        setQuestions(data.questions);
        setTimeLeft((data.course.duration || 15) * 60);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, [params.id]);

  const submitExam = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct_option) correctCount++;
    });
    setScore(correctCount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-green-800">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-700 mb-4"></div>
      <p className="font-bold">Securing Connection to Exam Server...</p>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <AlertCircle size={64} className="text-red-500 mb-4" />
      <h1 className="text-2xl font-black text-gray-900 mb-2">System Error</h1>
      <p className="text-gray-600 mb-8 max-w-md">{error}</p>
      <button onClick={() => router.push('/cbt/dashboard')} className="flex items-center gap-2 bg-gray-900 text-white px-8 py-3 rounded-full font-bold">
        <Home size={18} /> Return to Dashboard
      </button>
    </div>
  );

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-100 font-sans p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className={`p-10 text-center ${percentage >= 50 ? 'bg-green-700' : 'bg-red-700'} text-white`}>
              <h2 className="text-4xl font-black mb-2">{percentage}%</h2>
              <p className="text-lg opacity-90 font-medium">Final Score: {score} / {questions.length}</p>
            </div>
            <div className="p-8">
               <button onClick={() => router.push('/cbt/dashboard')} className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold">Close Portal</button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQIndex];
  if (!currentQ) return null; // Final safety guard

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-green-700 text-white px-6 py-4 flex justify-between items-center shadow-lg">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-green-800 font-black border-2 border-green-900">
            {student?.name?.charAt(0)}
          </div>
          <div className="leading-tight">
            <p className="text-[10px] font-bold opacity-70 uppercase tracking-widest">Candidate</p>
            <h1 className="font-black text-sm uppercase">{student?.name}</h1>
          </div>
        </div>
        <div className="text-2xl font-mono font-black bg-black/20 px-6 py-1 rounded-lg border border-white/20">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>
        <button onClick={() => confirm("Submit now?") && submitExam()} className="bg-red-600 px-6 py-2 rounded font-black text-xs uppercase tracking-widest shadow-lg">Submit</button>
      </header>

      <div className="flex-1 p-4 md:p-10 overflow-y-auto">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
           <p className="text-xs font-bold text-gray-400 uppercase mb-4">Question {currentQIndex + 1} of {questions.length}</p>
           <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-8 leading-relaxed">{currentQ.question_text}</h2>
           <div className="space-y-4">
             {['A','B','C','D'].map(opt => (
               <button key={opt} onClick={() => setAnswers({...answers, [currentQ.id]: opt})} className={`w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50' : 'border-gray-100 hover:border-gray-300'}`}>
                 <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${answers[currentQ.id] === opt ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'}`}>{opt}</span>
                 <span className="font-bold text-gray-800">{currentQ[`option_${opt.toLowerCase()}`]}</span>
               </button>
             ))}
           </div>
           <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
              <button onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))} className="px-8 py-3 font-bold text-gray-400">Previous</button>
              <button onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))} className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold">Next Question</button>
           </div>
        </div>
      </div>
    </main>
  );
}
