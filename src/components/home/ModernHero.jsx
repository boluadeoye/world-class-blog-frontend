"use client";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu, Globe } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === RESTORED: MINIMALIST TERMINAL WIDGET === */
function TerminalWidget() {
  const [text, setText] = useState("");
  const fullText = "System Online. Ready to build.";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
      <div className="flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500/80"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80"></span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
      </div>
      <span className="font-mono text-[10px] md:text-xs text-emerald-400 tracking-wide">
        {text}<span className="animate-pulse">_</span>
      </span>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="relative min-h-[80vh] flex flex-col justify-start px-6 md:px-12 overflow-hidden pt-24 md:pt-32">
      
      {/* === 1. ATMOSPHERE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        
        {/* === 2. TOP RIGHT DECORATION (Separate & Beautiful) === */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-0 right-0 hidden md:flex items-center justify-center w-32 h-32"
        >
          {/* Spinning Text Ring */}
          <div className="absolute inset-0 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute inset-2 border border-dashed border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          <Globe size={24} className="text-slate-500" />
        </motion.div>

        {/* === 3. MAIN CONTENT === */}
        <div className="max-w-3xl">
          
          {/* Terminal Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TerminalWidget />
          </motion.div>

          {/* Name (Reduced Size, Elegant) */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-7xl font-medium tracking-tight text-white mb-6"
          >
            Boluwatife <span className="italic text-slate-500">Adeoye</span>
          </motion.h1>

          {/* Role & Description (Prominent) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xl md:text-2xl text-amber-400/90 font-mono mb-4 tracking-wide uppercase">
              Full-Stack Engineer & Writer
            </h2>
            <p className="font-sans text-lg md:text-xl text-slate-300 leading-relaxed mb-10 border-l-2 border-slate-700 pl-6">
              I architect high-performance digital ecosystems. Specializing in <span className="text-white font-medium">React Server Components</span>, <span className="text-white font-medium">Scalable Systems</span>, and <span className="text-white font-medium">Human-Centric UI</span>.
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/about" className="group relative px-8 py-4 bg-white text-slate-950 rounded-full font-sans font-bold tracking-wide overflow-hidden hover:scale-105 transition-transform duration-300">
              <span className="relative z-10 flex items-center gap-2">
                Initiate Contact <ArrowRight size={18} />
              </span>
            </Link>
            
            <Link href="/articles" className="px-8 py-4 border border-white/10 bg-white/5 backdrop-blur-sm text-slate-300 rounded-full font-sans font-medium hover:bg-white/10 hover:text-white transition-all flex items-center gap-2">
              <Cpu size={16} className="text-emerald-400" />
              Access Logs
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
