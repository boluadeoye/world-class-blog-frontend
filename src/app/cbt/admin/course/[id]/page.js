"use client";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, Save, Trash2, Edit3, Plus, Upload, 
  FileText, X, Clock, CheckCircle, AlertTriangle, Database, Layout 
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function CourseManager() {
  const params = useParams();
  const router = useRouter();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState('list'); // list | bulk | edit
  const [bulkText, setBulkText] = useState("");
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [qForm, setQForm] = useState({
    question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "A", explanation: ""
  });

  async function loadData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/cbt/manage?id=${params.id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setCourse(data.course);
      setQuestions(data.questions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, [params.id]);

  const saveCourse = async () => {
    await fetch('/api/cbt/manage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'course', ...course })
    });
    setIsEditingCourse(false);
    loadData();
  };

  const handleBulkUpload = async () => {
    const raw = bulkText.split('\n').filter(line => line.trim() !== '');
    const parsedQuestions = [];
    let currentQ = null;

    raw.forEach(line => {
      if (line.match(/^\d+\./)) {
        if (currentQ) parsedQuestions.push(currentQ);
        currentQ = {
          course_id: params.id,
          question_text: line.replace(/^\d+\.\s*/, '').trim(),
          option_a: "", option_b: "", option_c: "", option_d: "",
          correct_option: "A", explanation: ""
        };
      }
      else if (line.startsWith("A. ")) currentQ.option_a = line.substring(3).trim();
      else if (line.startsWith("B. ")) currentQ.option_b = line.substring(3).trim();
      else if (line.startsWith("C. ")) currentQ.option_c = line.substring(3).trim();
      else if (line.startsWith("D. ")) currentQ.option_d = line.substring(3).trim();
      else if (line.startsWith("Answer: ")) currentQ.correct_option = line.substring(8).trim().charAt(0);
      else if (line.startsWith("Explanation: ")) currentQ.explanation = line.substring(13).trim();
    });
    if (currentQ) parsedQuestions.push(currentQ);

    if (parsedQuestions.length === 0) {
      alert("Parsing failed. Check format.");
      return;
    }

    if (confirm(`Upload ${parsedQuestions.length} questions?`)) {
      await fetch('/api/cbt/manage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedQuestions)
      });
      setBulkText("");
      setMode('list');
      loadData();
    }
  };

  const saveQuestion = async (e) => {
    e.preventDefault();
    const method = editingQuestionId ? 'PUT' : 'POST';
    const body = editingQuestionId
      ? { type: 'question', id: editingQuestionId, ...qForm }
      : { course_id: params.id, ...qForm };

    await fetch('/api/cbt/manage', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    setEditingQuestionId(null);
    setQForm({ question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "A", explanation: "" });
    setMode('list');
    loadData();
  };

  const deleteQuestion = async (id) => {
    if(!confirm("Delete permanently?")) return;
    await fetch(`/api/cbt/manage?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-white text-[#004d00] font-black text-xs uppercase tracking-[0.3em] animate-pulse">Syncing Repository...</div>;
  
  if (!course) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8 text-center">
      <AlertTriangle size={48} className="text-red-500 mb-4" />
      <h1 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-2">Course Not Found</h1>
      <p className="text-gray-500 text-sm mb-8">The requested unit does not exist in the repository.</p>
      <button onClick={() => router.push('/cbt/admin/dashboard')} className="bg-[#004d00] text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg">Return to HQ</button>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#fcfdfc] font-sans text-gray-900 pb-20">
      
      {/* === EXECUTIVE HEADER === */}
      <header className="bg-[#004d00] text-white pt-8 pb-16 px-6 rounded-b-[40px] shadow-2xl relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className="flex items-center gap-4">
            <Link href="/cbt/admin/dashboard" className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner hover:bg-white/20 transition-all">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <p className="text-green-200 text-[10px] font-bold uppercase tracking-[0.2em] mb-1">{course.code}</p>
              <h1 className="text-xl font-black leading-none tracking-tight uppercase">{course.title}</h1>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => setMode('bulk')} className="bg-blue-600 p-3 rounded-xl border border-blue-500 text-white hover:bg-blue-700 transition-all shadow-lg">
              <Upload size={20} />
            </button>
            <button onClick={() => setMode('edit')} className="bg-green-600 p-3 rounded-xl border border-green-500 text-white hover:bg-green-700 transition-all shadow-lg">
              <Plus size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <p className="text-[9px] font-bold text-green-400 uppercase mb-1">Questions</p>
            <p className="text-xl font-black">{questions.length}</p>
          </div>
          <div className="bg-[#003300]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
            <p className="text-[9px] font-bold text-green-400 uppercase mb-1">Duration</p>
            <p className="text-sm font-black uppercase">{course.duration} MINS</p>
          </div>
          <button onClick={() => setIsEditingCourse(true)} className="bg-yellow-400 text-black rounded-2xl p-4 flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform">
            <Edit3 size={18} />
            <p className="text-[8px] font-black uppercase mt-1">Edit Info</p>
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 -mt-8 relative z-20">
        
        {/* === COURSE EDIT OVERLAY === */}
        {isEditingCourse && (
          <div className="bg-white p-6 rounded-[2.5rem] shadow-2xl border border-green-100 mb-8 animate-in fade-in slide-in-from-top-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <input value={course.code} onChange={e=>setCourse({...course, code: e.target.value})} className="p-4 bg-gray-50 border rounded-2xl font-bold uppercase" placeholder="Code" />
              <input value={course.title} onChange={e=>setCourse({...course, title: e.target.value})} className="md:col-span-2 p-4 bg-gray-50 border rounded-2xl font-bold" placeholder="Title" />
              <input type="number" value={course.duration} onChange={e=>setCourse({...course, duration: e.target.value})} className="p-4 bg-gray-50 border rounded-2xl font-bold" placeholder="Mins" />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setIsEditingCourse(false)} className="flex-1 py-3 font-bold text-gray-400 uppercase text-xs">Cancel</button>
              <button onClick={saveCourse} className="flex-1 bg-[#004d00] text-white py-3 rounded-xl font-black uppercase text-xs shadow-lg">Save Changes</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* === LEFT: DYNAMIC FORM === */}
          <div className="lg:col-span-5">
            {mode === 'bulk' && (
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-blue-100 sticky top-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xs font-black text-blue-900 uppercase tracking-widest flex items-center gap-2"><FileText size={18} /> Bulk Ingest</h2>
                  <button onClick={() => setMode('list')} className="p-2 bg-gray-50 rounded-full"><X size={16}/></button>
                </div>
                <textarea 
                  className="w-full h-96 p-5 bg-gray-50 border border-gray-100 rounded-3xl font-mono text-[10px] focus:bg-white focus:border-blue-500 outline-none transition-all"
                  placeholder="1. Question?&#10;A. Option&#10;B. Option&#10;Answer: A"
                  value={bulkText}
                  onChange={(e) => setBulkText(e.target.value)}
                />
                <button onClick={handleBulkUpload} className="w-full mt-4 bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest shadow-lg">Process Data</button>
              </div>
            )}

            {mode === 'edit' && (
              <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-green-100 sticky top-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xs font-black text-green-900 uppercase tracking-widest">{editingQuestionId ? "Modify Question" : "New Question"}</h2>
                  <button onClick={() => {setMode('list'); setEditingQuestionId(null);}} className="p-2 bg-gray-50 rounded-full"><X size={16}/></button>
                </div>
                <form onSubmit={saveQuestion} className="space-y-4">
                  <textarea required rows={3} className="w-full p-4 bg-gray-50 border rounded-2xl font-bold text-sm outline-none focus:bg-white" placeholder="Question Text" value={qForm.question_text} onChange={e => setQForm({...qForm, question_text: e.target.value})} />
                  {['A','B','C','D'].map(opt => (
                    <div key={opt} className="flex items-center gap-3">
                      <span className="font-black text-gray-300">{opt}</span>
                      <input required className="flex-1 p-3 bg-gray-50 border rounded-xl text-sm font-medium" value={qForm[`option_${opt.toLowerCase()}`]} onChange={e => setQForm({...qForm, [`option_${opt.toLowerCase()}`]: e.target.value})} />
                      <input type="radio" name="correct" checked={qForm.correct_option === opt} onChange={() => setQForm({...qForm, correct_option: opt})} className="accent-green-600 w-5 h-5" />
                    </div>
                  ))}
                  <input className="w-full p-4 bg-gray-50 border rounded-2xl text-xs italic" placeholder="Explanation (Optional)" value={qForm.explanation} onChange={e => setQForm({...qForm, explanation: e.target.value})} />
                  <button type="submit" className="w-full bg-[#004d00] text-white py-4 rounded-2xl font-black uppercase text-xs shadow-lg">Commit Question</button>
                </form>
              </div>
            )}
          </div>

          {/* === RIGHT: QUESTION BANK === */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <Database size={18} className="text-[#004d00]" />
              <h2 className="text-sm font-black text-gray-900 uppercase tracking-widest">Question Bank</h2>
            </div>

            {questions.map((q, i) => (
              <div key={q.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-900 text-white text-[9px] font-black px-2 py-1 rounded uppercase tracking-tighter">Q{i + 1}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingQuestionId(q.id); setQForm({...q}); setMode('edit'); window.scrollTo(0,0); }} className="p-2 text-blue-600 bg-blue-50 rounded-lg"><Edit3 size={14}/></button>
                    <button onClick={() => deleteQuestion(q.id)} className="p-2 text-red-600 bg-red-50 rounded-lg"><Trash2 size={14}/></button>
                  </div>
                </div>
                <p className="font-black text-gray-800 text-sm leading-relaxed mb-6">{q.question_text}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {['A','B','C','D'].map(opt => (
                    <div key={opt} className={`p-3 rounded-xl border text-xs font-bold ${q.correct_option === opt ? 'bg-green-50 border-green-500 text-green-900' : 'bg-gray-50 border-transparent text-gray-400'}`}>
                      {opt}. {q[`option_${opt.toLowerCase()}`]}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

    </main>
  );
}
