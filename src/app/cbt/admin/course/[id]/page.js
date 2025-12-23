"use client";
import { useState, useEffect } from "react";
import { ArrowLeft, Save, Trash2, Edit3, Plus, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function CourseManager() {
  const params = useParams();
  const [course, setCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingQuestionId, setEditingQuestionId] = useState(null); // Null = Add Mode
  const [qForm, setQForm] = useState({
    question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "A", explanation: ""
  });

  // 1. Fetch Data
  async function loadData() {
    const res = await fetch(`/api/cbt/manage?id=${params.id}`);
    const data = await res.json();
    setCourse(data.course);
    setQuestions(data.questions);
    setLoading(false);
  }

  useEffect(() => { loadData(); }, []);

  // 2. Save Course Details
  const saveCourse = async () => {
    await fetch('/api/cbt/manage', {
      method: 'PUT',
      body: JSON.stringify({ type: 'course', ...course })
    });
    setIsEditingCourse(false);
  };

  // 3. Save Question (Add or Update)
  const saveQuestion = async (e) => {
    e.preventDefault();
    if (editingQuestionId) {
      // Update
      await fetch('/api/cbt/manage', {
        method: 'PUT',
        body: JSON.stringify({ type: 'question', id: editingQuestionId, ...qForm })
      });
    } else {
      // Create
      await fetch('/api/cbt/manage', {
        method: 'POST',
        body: JSON.stringify({ course_id: params.id, ...qForm })
      });
    }
    // Reset
    setEditingQuestionId(null);
    setQForm({ question_text: "", option_a: "", option_b: "", option_c: "", option_d: "", correct_option: "A", explanation: "" });
    loadData();
  };

  // 4. Delete Question
  const deleteQuestion = async (id) => {
    if(!confirm("Delete this question?")) return;
    await fetch(`/api/cbt/manage?id=${id}`, { method: 'DELETE' });
    loadData();
  };

  // 5. Load Question into Form
  const editQuestion = (q) => {
    setEditingQuestionId(q.id);
    setQForm({
      question_text: q.question_text,
      option_a: q.option_a, option_b: q.option_b, option_c: q.option_c, option_d: q.option_d,
      correct_option: q.correct_option,
      explanation: q.explanation || ""
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) return <div className="p-10 text-center">Loading Command Center...</div>;

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8 font-sans text-gray-900">
      
      {/* === HEADER (Course Details) === */}
      <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-700 mb-8">
        <div className="flex justify-between items-start">
          <div className="w-full">
            <Link href="/cbt/admin/dashboard" className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-green-700 mb-2 inline-flex items-center gap-1">
              <ArrowLeft size={12} /> Back to Dashboard
            </Link>
            
            {isEditingCourse ? (
              <div className="grid gap-4 mt-2 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="grid grid-cols-2 gap-4">
                  <input value={course.code} onChange={e=>setCourse({...course, code: e.target.value})} className="p-2 border rounded font-bold uppercase" />
                  <select value={course.level} onChange={e=>setCourse({...course, level: e.target.value})} className="p-2 border rounded">
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                  </select>
                </div>
                <input value={course.title} onChange={e=>setCourse({...course, title: e.target.value})} className="p-2 border rounded w-full" />
                <button onClick={saveCourse} className="bg-green-700 text-white px-4 py-2 rounded font-bold text-sm w-fit">Save Changes</button>
              </div>
            ) : (
              <div className="flex justify-between items-end mt-2">
                <div>
                  <h1 className="text-3xl font-black text-gray-900">{course.code}: {course.title}</h1>
                  <p className="text-sm text-gray-500 font-bold">{course.level} Level • {questions.length} Questions Loaded</p>
                </div>
                <button onClick={() => setIsEditingCourse(true)} className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1">
                  <Edit3 size={16} /> Edit Course Info
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* === LEFT: QUESTION EDITOR (Sticky) === */}
        <div className="lg:col-span-5">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 sticky top-8">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-800">
              {editingQuestionId ? <Edit3 size={20} className="text-blue-600"/> : <Plus size={20} className="text-green-600"/>}
              {editingQuestionId ? "Edit Question" : "Add New Question"}
            </h2>
            
            <form onSubmit={saveQuestion} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Question Text</label>
                <textarea 
                  required rows={3}
                  className="w-full p-3 border border-gray-300 rounded focus:border-green-600 outline-none text-sm"
                  value={qForm.question_text}
                  onChange={e => setQForm({...qForm, question_text: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 gap-3">
                {['A','B','C','D'].map((opt) => (
                  <div key={opt} className="flex items-center gap-2">
                    <span className={`font-bold w-6 ${qForm.correct_option === opt ? 'text-green-600' : 'text-gray-400'}`}>{opt}</span>
                    <input 
                      required
                      placeholder={`Option ${opt}`}
                      className={`flex-1 p-2 border rounded text-sm ${qForm.correct_option === opt ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
                      value={qForm[`option_${opt.toLowerCase()}`]}
                      onChange={e => setQForm({...qForm, [`option_${opt.toLowerCase()}`]: e.target.value})}
                    />
                    <input 
                      type="radio" name="correct" 
                      checked={qForm.correct_option === opt}
                      onChange={() => setQForm({...qForm, correct_option: opt})}
                      className="accent-green-600 w-4 h-4 cursor-pointer"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Explanation (Optional)</label>
                <input 
                  className="w-full p-3 border border-gray-300 rounded focus:border-green-600 outline-none text-sm"
                  placeholder="Why is the answer correct?"
                  value={qForm.explanation}
                  onChange={e => setQForm({...qForm, explanation: e.target.value})}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" className={`flex-1 py-3 rounded font-bold text-white transition-colors ${editingQuestionId ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-700 hover:bg-green-800'}`}>
                  {editingQuestionId ? "Update Question" : "Add Question"}
                </button>
                {editingQuestionId && (
                  <button type="button" onClick={() => {setEditingQuestionId(null); setQForm({question_text:"", option_a:"", option_b:"", option_c:"", option_d:"", correct_option:"A", explanation:""})}} className="px-4 py-3 rounded border border-gray-300 text-gray-600 font-bold hover:bg-gray-100">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* === RIGHT: QUESTION BANK === */}
        <div className="lg:col-span-7 space-y-4">
          {questions.map((q, i) => (
            <div key={q.id} className={`bg-white p-5 rounded-lg border transition-all ${editingQuestionId === q.id ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200 hover:border-green-300'}`}>
              <div className="flex justify-between items-start mb-3">
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded">Q{i + 1}</span>
                <div className="flex gap-2">
                  <button onClick={() => editQuestion(q)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors"><Edit3 size={16} /></button>
                  <button onClick={() => deleteQuestion(q.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
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
              
              {q.explanation && (
                <div className="mt-3 text-xs text-gray-500 italic border-t border-gray-100 pt-2">
                  💡 {q.explanation}
                </div>
              )}
            </div>
          ))}
          
          {questions.length === 0 && (
            <div className="text-center py-12 text-gray-400 bg-white rounded-lg border border-dashed border-gray-300">
              No questions yet. Use the form on the left to add one.
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
