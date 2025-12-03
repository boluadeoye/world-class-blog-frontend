"use client";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

/* === TERMINAL WIDGET === */
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
    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md h-fit">
      <div className="flex gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
      </div>
      <span className="font-mono text-[10px] text-emerald-400 tracking-wide">
        {text}<span className="animate-pulse">_</span>
      </span>
    </div>
  );
}

export default function ModernHero() {
  return (
    <section className="hero-section relative min-h-[85vh] flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-12 md:pt-20">
      
      {/* === 1. ATMOSPHERE === */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-indigo-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        
        {/* === 2. IDENTITY ROW (Portrait + Status) === */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-8"
        >
          {/* PORTRAIT CONTAINER */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full p-[2px] bg-gradient-to-br from-white/20 to-white/0 shadow-2xl shadow-black/50">
            <img 
              src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
              alt="Bolu Adeoye" 
              className="w-full h-full rounded-full object-cover border border-black/20"
            />
          </div>

          {/* TERMINAL PILL */}
          <TerminalWidget />
        </motion.div>

        {/* === 3. THE NAME (Tight & Premium) === */}
        <div className="mb-6 relative">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-6xl md:text-8xl font-medium tracking-tight text-white leading-[0.9]"
          >
            Boluwatife <br />
            <span className="italic text-slate-500">Adeoye</span>
          </motion.h1>
        </div>

        {/* === 4. THE ROLE (Gold/Amber) === */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-sm md:text-base font-mono text-amber-400 tracking-[0.2em] uppercase border-l-2 border-amber-500/50 pl-4">
            Full-Stack Engineer & Writer
          </h2>
        </motion.div>

        {/* === 5. THE DESCRIPTION === */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-sans text-lg md:text-xl text-slate-300 max-w-xl leading-relaxed mb-10"
        >
          I architect high-performance digital ecosystems. Specializing in <span className="text-white font-medium border-b border-white/20">React Server Components</span>, <span className="text-white font-medium border-b border-white/20">Scalable Systems</span>, and <span className="text-white font-medium border-b border-white/20">Human-Centric UI</span>.
        </motion.p>

        {/* === 6. ACTIONS === */}
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
    </section>
  );
}
