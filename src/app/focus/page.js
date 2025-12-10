"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Check, Plus, X, Zap, Music, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useAudioEngine } from "../../hooks/useAudioEngine";

export default function FocusOS() {
  const { isPlaying, toggleAudio } = useAudioEngine();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
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

  // Calculate progress for ring
  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;
  const circumference = 2 * Math.PI * 120; // Radius 120
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-hidden flex flex-col relative">
      
      {/* HIDE GLOBAL HEADER */}
      <style jsx global>{`
        header { display: none !important; }
      `}</style>

      {/* === ATMOSPHERE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-900/20 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[8s]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-900/10 blur-[150px] rounded-full mix-blend-screen animate-pulse duration-[10s]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]"></div>
      </div>

      {/* === NAV === */}
      <nav className="relative z-20 flex justify-between items-center p-8">
        <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-xs font-bold tracking-widest uppercase">
          <ArrowLeft size={14} /> Exit Sanctuary
        </Link>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></div>
          <span className="text-[10px] font-bold tracking-widest text-slate-300 uppercase">
            {isActive ? "Deep Work Active" : "Ready"}
          </span>
        </div>
      </nav>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 relative z-10 max-w-7xl mx-auto w-full h-full items-center">
        
        {/* === LEFT: THE CHRONOMETER === */}
        <div className="flex flex-col items-center justify-center p-8 lg:border-r border-white/5 h-full">
          
          {/* Elegant Ring Timer */}
          <div className="relative mb-16 group">
            {/* Glow */}
            <div className={`absolute inset-0 bg-amber-500/20 blur-[80px] rounded-full transition-opacity duration-1000 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
            
            <div className="relative w-[300px] h-[300px] flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform">
                {/* Track */}
                <circle cx="150" cy="150" r="120" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
                {/* Progress */}
                <circle 
                  cx="150" cy="150" r="120" 
                  stroke="url(#gradient)" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-linear"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#f59e0b" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Time Display */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-7xl md:text-8xl text-white tracking-tighter font-medium drop-shadow-2xl">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-xs font-sans text-slate-500 tracking-[0.3em] uppercase mt-4">Minutes Remaining</span>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => setIsActive(!isActive)}
              className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-white text-black hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
            >
              {isActive ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>
            
            <button 
              onClick={toggleAudio}
              className={`group relative flex items-center justify-center w-16 h-16 rounded-full border transition-all ${isPlaying ? 'bg-indigo-600 border-indigo-500 text-white shadow-[0_0_30px_rgba(99,102,241,0.4)]' : 'bg-transparent border-white/10 text-slate-400 hover:border-white/30 hover:text-white'}`}
            >
              <Music size={24} className={isPlaying ? "animate-pulse" : ""} />
              {isPlaying && (
                <span className="absolute -top-2 -right-2 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                </span>
              )}
            </button>
          </div>
          
          <p className={`mt-8 text-xs font-bold tracking-widest uppercase transition-colors ${isPlaying ? 'text-indigo-400' : 'text-slate-600'}`}>
            {isPlaying ? "Ambient Drone Active" : "Soundscape Off"}
          </p>
        </div>

        {/* === RIGHT: THE OBJECTIVES === */}
        <div className="flex flex-col h-full p-8 md:p-16 bg-white/[0.02] backdrop-blur-sm">
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-10">Session Objectives</h2>
          
          {/* Input */}
          <form onSubmit={addTask} className="relative mb-10 group">
            <input 
              type="text" 
              placeholder="What must be done?" 
              className="w-full bg-transparent border-b border-white/10 py-4 text-xl md:text-2xl text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 transition-colors font-serif"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-amber-500 transition-colors">
              <Plus size={24} />
            </button>
          </form>

          {/* List */}
          <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence>
              {tasks.map((task) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`group flex items-center gap-5 p-5 rounded-2xl border transition-all cursor-pointer ${task.completed ? 'bg-emerald-900/10 border-emerald-500/10 opacity-40' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-slate-600 group-hover:border-white'}`}>
                    {task.completed && <Check size={14} className="text-black" />}
                  </div>
                  <span className={`text-lg font-light ${task.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
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
              <div className="py-20 text-center">
                <p className="text-slate-600 font-serif text-xl italic">"Focus is the art of subtraction."</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  );
}
