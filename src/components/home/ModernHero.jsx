"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Terminal, Cpu, Activity } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === LIVE TERMINAL COMPONENT === */
function TerminalHUD() {
  const [text, setText] = useState("");
  const commands = [
    "> Initializing Core Systems...",
    "> Loading React Server Components...",
    "> Connecting to Neural Network...",
    "> System Online. Welcome, User."
  ];
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    let currentText = "";
    let charIndex = 0;
    let currentLine = commands[lineIndex];
    
    const typeInterval = setInterval(() => {
      if (charIndex < currentLine.length) {
        currentText += currentLine[charIndex];
        setText(currentText);
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          if (lineIndex < commands.length - 1) {
            setLineIndex(prev => prev + 1);
          }
        }, 800);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [lineIndex]);

  return (
    <div className="font-mono text-xs md:text-sm text-emerald-400 bg-black/80 border border-emerald-500/30 rounded-lg p-3 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md w-full max-w-md mb-6">
      <div className="flex items-center gap-2 mb-2 border-b border-emerald-500/20 pb-1">
        <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
        <span className="text-[10px] text-emerald-600 uppercase tracking-wider ml-auto">bash --live</span>
      </div>
      <div className="h-12 flex flex-col justify-end">
        {commands.slice(0, lineIndex).map((cmd, i) => (
          <div key={i} className="opacity-50">{cmd}</div>
        ))}
        <div className="flex">
          <span>{text}</span>
          <span className="w-2 h-4 bg-emerald-500 animate-pulse ml-1"></span>
        </div>
      </div>
    </div>
  );
}

export default function ModernHero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <section className="relative min-h-[85vh] flex flex-col justify-start px-6 md:px-12 overflow-hidden pt-28 md:pt-36">
      
      {/* === 1. ENGINEERED BACKGROUND (Grid + Neon) === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Technical Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        
        {/* Intense Neon Orbs (Cyan & Amber) */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[100px] mix-blend-screen" 
        />
        
        {/* Vignette to focus center */}
        <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #020617 100%)" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        
        {/* 2. LIVE TERMINAL (The "Dynamic Element") */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TerminalHUD />
        </motion.div>

        {/* 3. THE LABEL (System Status) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-4"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
            <Activity size={14} className="text-emerald-400" />
            <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">
              System Optimal
            </span>
          </div>
          <div className="h-px w-12 bg-slate-700"></div>
          <span className="font-sans text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">
            Full-Stack Engineer
          </span>
        </motion.div>

        {/* 4. THE HEADLINE (Massive & Tight) */}
        <div className="mb-8 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-serif text-6xl md:text-8xl lg:text-9xl font-medium leading-[0.9] tracking-tight text-white"
          >
            Boluwatife <br />
            <span className="italic text-slate-400 relative inline-block">
              Adeoye
              {/* Neon Underline */}
              <motion.span 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 1 }}
                className="absolute bottom-2 left-0 h-[4px] bg-gradient-to-r from-cyan-500 to-amber-500 -z-10"
              />
            </span>
          </motion.h1>
        </div>

        {/* 5. SUBTEXT (Technical) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-lg text-slate-300 max-w-lg leading-relaxed mb-10 border-l-2 border-cyan-500/30 pl-5"
        >
          Architecting high-performance digital ecosystems. 
          Specializing in <span className="text-cyan-300 font-medium">React Server Components</span>, <span className="text-amber-300 font-medium">Scalable Systems</span>, and <span className="text-white font-medium">Human-Centric UI</span>.
        </motion.p>

        {/* 6. ACTIONS (Cyberpunk Buttons) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <Link href="/about" className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-sans font-bold tracking-wide overflow-hidden shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-shadow">
            <span className="relative z-10 flex items-center gap-2 group-hover:gap-3 transition-all">
              <Terminal size={18} /> Initiate Protocol
            </span>
          </Link>
          
          <Link href="/articles" className="px-8 py-4 border border-slate-700 bg-slate-900/50 backdrop-blur-md text-slate-300 rounded-full font-sans font-medium hover:bg-slate-800 hover:text-white hover:border-cyan-500/50 transition-all flex items-center gap-2">
            <Cpu size={16} className="text-cyan-500" />
            Access Logs
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
