"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Send, Sparkles, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import Sentiment from "sentiment";

/* === AUDIO ENGINE === */
const playChime = (score, muted) => {
  if (muted || typeof window === 'undefined') return;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const ctx = new AudioContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Pentatonic Scale based on sentiment
  const baseFreq = 440;
  const note = baseFreq * Math.pow(2, (score * 2) / 12);
  
  osc.type = "sine";
  osc.frequency.setValueAtTime(note, ctx.currentTime);
  
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.1);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 1.5);
};

export default function Aether() {
  const canvasRef = useRef(null);
  const [stars, setStars] = useState([]);
  const [input, setInput] = useState("");
  const [hoveredStar, setHoveredStar] = useState(null);
  const [muted, setMuted] = useState(false);
  const sentiment = new Sentiment();

  // === 1. INITIALIZE GALAXY ===
  useEffect(() => {
    // Mock Data (Replace with fetch from Neon later)
    const initialStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      color: ["#fbbf24", "#60a5fa", "#f87171"][Math.floor(Math.random() * 3)],
      content: "This is a thought floating in the aether...",
      score: Math.floor(Math.random() * 10) - 5,
      velocity: { x: (Math.random() - 0.5) * 0.2, y: (Math.random() - 0.5) * 0.2 }
    }));
    setStars(initialStars);
  }, []);

  // === 2. PHYSICS ENGINE ===
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrame;

    const render = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Stars
      stars.forEach((star) => {
        // Move
        star.x += star.velocity.x;
        star.y += star.velocity.y;

        // Bounce off walls
        if (star.x < 0 || star.x > canvas.width) star.velocity.x *= -1;
        if (star.y < 0 || star.y > canvas.height) star.velocity.y *= -1;

        // Draw Glow
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 4);
        gradient.addColorStop(0, star.color);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Draw Core
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Connections (Constellations)
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 0.5;
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrame);
  }, [stars]);

  // === 3. INTERACTION HANDLER ===
  const handleCanvasClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Find clicked star
    const clicked = stars.find(s => Math.hypot(s.x - x, s.y - y) < 20);
    if (clicked) {
      setHoveredStar(clicked);
      playChime(clicked.score, muted);
    } else {
      setHoveredStar(null);
    }
  };

  // === 4. ADD THOUGHT ===
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const result = sentiment.analyze(input);
    const score = result.score;
    
    // Determine Color based on Sentiment
    let color = "#60a5fa"; // Neutral Blue
    if (score > 0) color = "#fbbf24"; // Happy Gold
    if (score < 0) color = "#f87171"; // Sad Red

    const newStar = {
      id: Date.now(),
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      size: 3,
      color,
      content: input,
      score,
      velocity: { x: (Math.random() - 0.5) * 1, y: (Math.random() - 0.5) * 1 }
    };

    setStars(prev => [...prev, newStar]);
    setInput("");
    playChime(score + 5, muted); // Play a "Success" chime
  };

  return (
    <main className="relative w-full h-screen bg-[#020617] overflow-hidden cursor-crosshair">
      
      {/* CANVAS LAYER */}
      <canvas 
        ref={canvasRef} 
        onClick={handleCanvasClick}
        className="absolute inset-0 z-0"
      />

      {/* UI LAYER */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-between p-6">
        
        {/* Header */}
        <div className="flex justify-between items-start pointer-events-auto">
          <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} /> Exit Aether
          </Link>
          <button onClick={() => setMuted(!muted)} className="p-2 text-slate-400 hover:text-white">
            {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>

        {/* Star Content Modal */}
        <AnimatePresence>
          {hoveredStar && (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm pointer-events-auto"
            >
              <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-2xl text-center">
                <div className="w-2 h-2 rounded-full mx-auto mb-4 shadow-[0_0_10px]" style={{ backgroundColor: hoveredStar.color, boxShadow: `0 0 15px ${hoveredStar.color}` }}></div>
                <p className="text-lg font-serif text-white leading-relaxed">"{hoveredStar.content}"</p>
                <p className="text-xs text-slate-500 mt-4 font-mono uppercase tracking-widest">Anonymous Signal</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Field */}
        <div className="w-full max-w-md mx-auto pointer-events-auto">
          <form onSubmit={handleSubmit} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-amber-500 rounded-full opacity-30 group-hover:opacity-60 transition duration-500 blur"></div>
            <div className="relative flex items-center bg-slate-950 rounded-full p-1.5 border border-white/10 shadow-2xl">
              <div className="pl-4 text-slate-500">
                <Sparkles size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Cast a thought into the void..." 
                className="w-full bg-transparent text-white placeholder-slate-500 px-4 py-3 outline-none text-sm font-medium"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={140}
              />
              <button 
                type="submit"
                disabled={!input.trim()}
                className="p-3 rounded-full bg-white text-slate-950 hover:bg-indigo-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>

      </div>
    </main>
  );
}
