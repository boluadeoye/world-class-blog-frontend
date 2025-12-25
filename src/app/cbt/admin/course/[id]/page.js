"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Trash2, Edit3, Plus, Upload, FileText, X, Clock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseManager() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modes
  const [mode, setMode] = useState('list'); 
  const [bulkText, setBulkText] = useState("");
  const [isEditingCourse, setIsEditingCourse] = useState(false); // Course Edit Mode
  
  // Question Form State
  const [editingQuestionId, setEditingQuestionId] = useState(null);
  const [qForm, setQForm] = useState({
    question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "A", explanation: ""
  });

  async function loadData() {
    try {
      const res = await fetch(`/api/cbt/manage?id=${params.id}`);
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setCourse(data.course);
      setQuestions(data.questions);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadData(); }, []);

  // === 1. SAVE COURSE DETAILS ===
  const saveCourse = async () => {
    await fetch('/api/cbt/manage', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'course', ...course })
    });
    setIsEditingCourse(false);
    loadData(); // Refresh to confirm
  };

  // === 2. BULK UPLOAD ===
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
      alert("Could not parse questions. Check format.");
      return;
    }

    if (confirm(`Ready to upload ${parsedQuestions.length} questions?`)) {
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

  // === 3. SINGLE QUESTION LOGIC ===
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
    if(!confirm("Delete this question?")) return;
    await fetch(`/api/cbt/manage?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  const editQuestion = (q) => {
    setEditingQuestionId(q.id);
    setQForm({ ...q });
    setMode('edit');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="p-10 text-center text-gray-500">Loading Command Center...</div>;
  if (!course) return <div className="p-10 text-center text-red-500">Course not found.</div>;

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-900">
      
      {/* === HEADER (Editable) === */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-700 mb-8">
        <div className="flex flex-col gap-4">
          <Link href="/cbt/admin/dashboard" className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-green-700 inline-flex items-center gap-1">
            <ArrowLeft size={12} /> Back to Dashboard
          </Link>

          {isEditingCourse ? (
            <div className="bg-gray-50 p-6 rounded-lg border border-green-200 animate-in fade-in slide-in-from-top-2">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Code</label>
                  <input value={course.code} onChange={e=>setCourse({...course, code: e.target.value})} className="w-full p-2 border rounded font-bold uppercase" />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
                  <input value={course.title} onChange={e=>setCourse({...course, title: e.target.value})} className="w-full p-2 border rounded" />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Level</label>
                  <select value={course.level} onChange={e=>setCourse({...course, level: e.target.value})} className="w-full p-2 border rounded bg-white">
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                  </select>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase">Duration (Mins)</label>
                  <input type="number" value={course.duration || 15} onChange={e=>setCourse({...course, duration: e.target.value})} className="w-24 p-2 border rounded" />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsEditingCourse(false)} className="px-4 py-2 text-gray-600 font-bold hover:bg-gray-200 rounded">Cancel</button>
                  <button onClick={saveCourse} className="px-6 py-2 bg-green-700 text-white font-bold rounded hover:bg-green-800 flex items-center gap-2">
                    <Save size={16} /> Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900">{course.code}: {course.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 font-bold">
                  <span>{course.level} Level</span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock size={14} /> {course.duration || 15} Mins</span>
                  <span>•</span>
                  <span>{questions.length} Questions</span>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsEditingCourse(true)} className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1 bg-blue-50 px-3 py-2 rounded">
                  <Edit3 size={16} /> Edit Info
                </button>
                <button onClick={() => setMode('bulk')} className="bg-blue-600 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2 shadow-sm hover:bg-blue-700">
                  <Upload size={16} /> Bulk Upload
                </button>
                <button onClick={() => setMode('edit')} className="bg-green-700 text-white px-4 py-2 rounded font-bold text-sm flex items-center gap-2 shadow-sm hover:bg-green-800">
                  <Plus size={16} /> Add Single
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* === LEFT PANEL (Dynamic) === */}
        <div className="lg:col-span-5">
          
          {/* BULK UPLOAD MODE */}
          {mode === 'bulk' && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200 sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-blue-800"><FileText size={20} /> Paste AI Content</h2>
                <button onClick={() => setMode('list')}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
              </div>
              <p className="text-xs text-gray-500 mb-2">Format: 1. Question? A. Opt B. Opt... Answer: A Explanation: ...</p>
              <textarea 
                className="w-full h-96 p-4 border border-gray-300 rounded font-mono text-xs bg-gray-50 focus:border-blue-500 outline-none"
                placeholder={`1. What is a noun?\nA. A name\nB. A verb\nC. A pronoun\nD. An adjective\nAnswer: A\nExplanation: A noun is a naming word.`}
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
              />
              <button onClick={handleBulkUpload} className="w-full mt-4 bg-blue-600 text-white py-3 rounded font-bold hover:bg-blue-700">
                Parse & Upload
              </button>
            </div>
          )}

          {/* SINGLE EDIT MODE */}
          {mode === 'edit' && (
            <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200 sticky top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold flex items-center gap-2 text-green-800">
                  {editingQuestionId ? "Edit Question" : "Add New Question"}
                </h2>
                <button onClick={() => {setMode('list'); setEditingQuestionId(null);}}><X size={20} className="text-gray-400 hover:text-gray-600" /></button>
              </div>
              <form onSubmit={saveQuestion} className="space-y-4">
                <textarea 
                  required rows={3} placeholder="Question Text"
                  className="w-full p-3 border border-gray-300 rounded focus:border-green-600 outline-none text-sm"
                  value={qForm.question_text}
                  onChange={e => setQForm({...qForm, question_text: e.target.value})}
                />
                <div className="grid gap-3">
                  {['A','B','C','D'].map((opt) => (
                    <div key={opt} className="flex items-center gap-2">
                      <span className="font-bold w-6 text-gray-400">{opt}</span>
                      <input 
                        required placeholder={`Option ${opt}`}
                        className="flex-1 p-2 border rounded text-sm"
                        value={qForm[`option_${opt.toLowerCase()}`]}
                        onChange={e => setQForm({...qForm, [`option_${opt.toLowerCase()}`]: e.target.value})}
                      />
                      <input 
                        type="radio" name="correct" checked={qForm.correct_option === opt}
                        onChange={() => setQForm({...qForm, correct_option: opt})}
                        className="accent-green-600 w-4 h-4"
                      />
                    </div>
                  ))}
                </div>
                <input 
                  className="w-full p-3 border border-gray-300 rounded focus:border-green-600 outline-none text-sm"
                  placeholder="Explanation (Optional)"
                  value={qForm.explanation}
                  onChange={e => setQForm({...qForm, explanation: e.target.value})}
                />
                <button type="submit" className="w-full bg-green-700 text-white py-3 rounded font-bold hover:bg-green-800">Save Question</button>
              </form>
            </div>
          )}
        </div>

        {/* === RIGHT: QUESTION BANK === */}
        <div className="lg:col-span-7 space-y-4">
          {questions.map((q, i) => (
            <div key={q.id} className="bg-white p-5 rounded-lg border border-gray-200 hover:border-green-300 transition-all shadow-sm">
              <div className="flex justify-between items-start mb-3">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Q{i + 1}</span>
                <div className="flex gap-2">
                  <button onClick={() => editQuestion(q)} className="p-2 text-gray-400 hover:text-blue-600"><Edit3 size={16} /></button>
                  <button onClick={() => deleteQuestion(q.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 size={16} /></button>
                </div>
              </div>
              <p className="font-bold text-gray-800 mb-4">{q.question_text}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                {['A','B','C','D'].map(opt => (
                  <div key={opt} className={`p-2 rounded border ${q.correct_option === opt ? 'bg-green-50 border-green-500 text-green-900 font-bold' : 'bg-gray-50 border-transparent text-gray-600'}`}>
                    {opt}. {q[`option_${opt.toLowerCase()}`]}
                  </div>
                ))}
              </div>
              {q.explanation && <div className="mt-3 text-xs text-gray-500 italic border-t border-gray-100 pt-2">💡 {q.explanation}</div>}
            </div>
          ))}
          
          {questions.length === 0 && (
            <div className="text-center py-12 text-gray-400 bg-white rounded-lg border border-dashed border-gray-300">
              No questions yet. Use the buttons above to add some.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
