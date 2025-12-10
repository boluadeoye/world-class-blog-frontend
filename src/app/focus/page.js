"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, CheckCircle, Plus, X, Zap, Headphones, Clock } from "lucide-react";
import Link from "next/link";
import { useAudioEngine } from "../../hooks/useAudioEngine";

export default function FocusOS() {
  const { isPlaying, toggleAudio } = useAudioEngine();
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden flex flex-col">
      
      {/* === HEADER === */}
      <header className="flex justify-between items-center p-6 border-b border-white/5 bg-slate-900/50 backdrop-blur-md z-20">
        <Link href="/" className="text-xs font-bold tracking-[0.2em] text-slate-500 hover:text-white transition-colors uppercase">
          Exit FocusOS
        </Link>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
          <Zap size={12} /> System Active
        </div>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative z-10">
        
        {/* === LEFT: THE CORE (Timer & Audio) === */}
        <div className="flex flex-col items-center justify-center p-12 border-r border-white/5 relative">
          
          {/* Breathing Visualizer */}
          <div className="relative mb-12">
            <motion.div 
              animate={{ 
                scale: isActive ? [1, 1.2, 1] : 1,
                opacity: isActive ? [0.5, 0.8, 0.5] : 0.3
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-indigo-500 blur-[100px] rounded-full"
            />
            <div className="relative z-10 w-64 h-64 rounded-full border border-white/10 bg-slate-900/80 backdrop-blur-xl flex items-center justify-center shadow-2xl">
              <span className="text-6xl font-mono font-bold tracking-tighter text-white">
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-6">
            <button 
              onClick={() => setIsActive(!isActive)}
              className="group p-6 rounded-full bg-white text-black hover:scale-110 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
            </button>
            
            <button 
              onClick={toggleAudio}
              className={`p-6 rounded-full border transition-all ${isPlaying ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_30px_rgba(79,70,229,0.4)]' : 'bg-transparent border-white/10 text-slate-400 hover:text-white'}`}
            >
              <Headphones size={32} />
            </button>
          </div>

          <p className="mt-8 text-xs text-slate-500 uppercase tracking-widest font-bold">
            {isPlaying ? "Generating Brown Noise..." : "Audio Engine Standby"}
          </p>
        </div>

        {/* === RIGHT: THE MISSION (Tasks) === */}
        <div className="flex flex-col p-8 md:p-12 bg-slate-900/20">
          <h2 className="text-2xl font-serif text-white mb-8">Session Objectives</h2>
          
          {/* Task Input */}
          <form onSubmit={addTask} className="relative mb-8">
            <input 
              type="text" 
              placeholder="What is the mission?" 
              className="w-full bg-transparent border-b border-white/20 py-4 text-xl text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <Plus size={24} />
            </button>
          </form>

          {/* Task List */}
          <div className="space-y-4 overflow-y-auto max-h-[50vh] pr-2">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${task.completed ? 'bg-emerald-900/10 border-emerald-500/20 opacity-50' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-500 group-hover:border-white'}`}>
                    {task.completed && <Check size={14} className="text-black" />}
                  </div>
                  <span className={`text-lg ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                    {task.text}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setTasks(tasks.filter(t => t.id !== task.id)); }}
                    className="ml-auto text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {tasks.length === 0 && (
              <div className="text-center py-20 text-slate-600 italic">
                No active objectives.
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
