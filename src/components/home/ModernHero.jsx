"use client";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === MINIMALIST TERMINAL WIDGET === */
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
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
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
      
      {/* === 1. STUDIO LIGHTING (Clean & Premium) === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle Top Spotlight */}
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />
        
        {/* Very Faint Grid (Barely Visible) */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        
        {/* 2. COMPACT TERMINAL (The "Live" Element) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TerminalWidget />
        </motion.div>

        {/* 3. THE HEADLINE (Pure Editorial) */}
        <div className="mb-6 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-[3.8rem] leading-[0.95] md:text-8xl lg:text-9xl font-medium tracking-tight text-white"
          >
            Boluwatife <br />
            <span className="italic text-slate-400">Adeoye</span>
          </motion.h1>
        </div>

        {/* 4. SUBTEXT (Clean & Readable) */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed mb-10"
        >
          Architecting high-performance digital ecosystems. 
          Specializing in <span className="text-slate-200 font-medium">React Server Components</span> and <span className="text-slate-200 font-medium">Human-Centric UI</span>.
        </motion.p>

        {/* 5. ACTIONS (Minimalist) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
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
    </section>
  );
}
