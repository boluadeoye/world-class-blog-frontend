"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Clock, Grid, ChevronLeft, ChevronRight, AlertTriangle, Lock } from "lucide-react";
import dynamic from "next/dynamic";

const UpgradeModal = dynamic(() => import("../../../../components/cbt/UpgradeModal"), { ssr: false });

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(null); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showMobileMap, setShowMobileMap] = useState(false);
  
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
          token: parsedStudent.session_token || ""
        });

        const res = await fetch(`/api/cbt/exam?${query.toString()}`);
        const data = await res.json();
        
        if (res.status === 401) { alert("Session Expired."); router.push("/cbt"); return; }
        if (res.status === 403) { setShowUpgrade(true); setLoading(false); return; }
        if (!res.ok) throw new Error(data.error || "Failed to load");
        if (!data.questions || data.questions.length === 0) throw new Error("No questions found.");
        
        setCourse(data.course);
        setQuestions(data.questions);
        setTimeLeft((data.course?.duration || 15) * 60);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    loadExam();
  }, []);

  // Timer & Logic (Simplified for stability)
  useEffect(() => {
    if (!mounted || loading || isSubmitted || error || timeLeft === null || showUpgrade) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) { clearInterval(interval); submitExam(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [loading, isSubmitted, error, timeLeft, showUpgrade]);

  const submitExam = () => {
    setIsSubmitted(true);
    let correctCount = 0;
    questions.forEach(q => { if (answers[q.id] === q.correct_option) correctCount++; });
    setScore(correctCount);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const formatTime = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

  if (!mounted) return null;
  if (showUpgrade) return <div className="min-h-screen flex items-center justify-center"><UpgradeModal student={student} onClose={() => router.push('/cbt/dashboard')} onSuccess={() => window.location.reload()} /></div>;
  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-green-800">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center p-6 text-center text-red-600 font-bold">{error}</div>;

  if (isSubmitted) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <main className="min-h-screen bg-gray-50 p-6 font-sans">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-4xl font-black text-green-700 mb-2">{percentage}%</h2>
          <p className="text-gray-500 mb-6">Score: {score}/{questions.length}</p>
          <button onClick={() => router.push('/cbt/dashboard')} className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold">Dashboard</button>
        </div>
      </main>
    );
  }

  const currentQ = questions[currentQIndex];

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col font-sans h-screen overflow-hidden">
      <header className="bg-[#004d00] text-white px-4 py-2 flex justify-between items-center shadow-md shrink-0 z-30">
        <div className="font-bold text-xs">{course.code}</div>
        <div className="font-mono font-bold text-lg">{formatTime(timeLeft || 0)}</div>
        <button onClick={() => confirm("Submit?") && submitExam()} className="bg-red-600 px-3 py-1 rounded text-xs font-bold">Submit</button>
      </header>

      <div className="flex-1 p-6 overflow-y-auto bg-white">
        <div className="max-w-2xl mx-auto">
          <p className="text-lg font-medium text-gray-900 mb-8">{currentQ.question_text}</p>
          <div className="space-y-3">
            {['A','B','C','D'].map((opt) => (
              <button key={opt} onClick={() => setAnswers({...answers, [currentQ.id]: opt})} className={`w-full text-left p-4 rounded-lg border-2 ${answers[currentQ.id] === opt ? 'border-green-600 bg-green-50' : 'border-gray-200'}`}>
                <span className="font-bold mr-2">{opt}.</span> {currentQ[`option_${opt.toLowerCase()}`]}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-8">
            <button onClick={() => setCurrentQIndex(Math.max(0, currentQIndex - 1))} disabled={currentQIndex === 0} className="px-6 py-2 bg-gray-200 rounded font-bold disabled:opacity-50">Prev</button>
            <button onClick={() => setCurrentQIndex(Math.min(questions.length - 1, currentQIndex + 1))} disabled={currentQIndex === questions.length - 1} className="px-6 py-2 bg-green-700 text-white rounded font-bold disabled:opacity-50">Next</button>
          </div>
        </div>
      </div>
    </main>
  );
}
