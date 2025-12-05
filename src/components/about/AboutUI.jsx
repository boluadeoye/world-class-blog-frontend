"use client";
import { motion } from "framer-motion";
import { Code2, Database, Brain, Globe, Server, Layers, ArrowRight, Terminal } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

/* === 1. MANIFESTO HERO === */
export function AboutHero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Noise & Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-600/5 blur-[100px] rounded-full mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="flex flex-col md:flex-row items-end gap-8 mb-12"
        >
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-indigo-300 uppercase mb-6 backdrop-blur-md">
              <Terminal size={12} /> The Architect
            </div>
            <h1 className="font-serif text-6xl md:text-8xl font-medium text-white leading-[0.9] tracking-tight">
              Engineering <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-200">Precision.</span>
            </h1>
          </div>
          
          <div className="flex-1 pb-2">
            <p className="font-sans text-lg md:text-xl text-slate-400 leading-relaxed max-w-md border-l-2 border-indigo-500/50 pl-6">
              I don't just write code; I build digital ecosystems. From high-performance APIs to neural-linked virtual assistants, I bridge the gap between human intent and machine execution.
            </p>
          </div>
        </motion.div>

        {/* Portrait Strip */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "circOut" }}
          className="w-full h-[2px] bg-gradient-to-r from-transparent via-white/20 to-transparent mb-12"
        />
      </div>
    </section>
  );
}

/* === 2. BOUNCY SKILL CARDS === */
const skills = [
  {
    title: "Full-Stack Engineering",
    desc: "End-to-end development using Next.js, React Server Components, and Node.js. I build systems that scale.",
    icon: <Globe size={28} className="text-indigo-400" />,
    bg: "from-indigo-500/10 to-purple-500/5"
  },
  {
    title: "API Architecture",
    desc: "Designing robust, type-safe APIs (REST & GraphQL) that serve as the backbone for complex applications.",
    icon: <Server size={28} className="text-emerald-400" />,
    bg: "from-emerald-500/10 to-teal-500/5"
  },
  {
    title: "AI & Virtual Assistants",
    desc: "Wiring LLMs into functional assistants. I create bots that understand context, memory, and business logic.",
    icon: <Brain size={28} className="text-amber-400" />,
    bg: "from-amber-500/10 to-orange-500/5"
  },
  {
    title: "Frontend Mastery",
    desc: "Pixel-perfect, human-centric UI. I use Framer Motion and Tailwind to create fluid, living interfaces.",
    icon: <Layers size={28} className="text-rose-400" />,
    bg: "from-rose-500/10 to-pink-500/5"
  }
];

export function SkillsGrid() {
  return (
    <section className="px-6 pb-24">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 15, 
              delay: i * 0.1 
            }}
            whileHover={{ scale: 1.02, rotate: i % 2 === 0 ? 1 : -1 }}
            className={`group relative p-8 rounded-[2.5rem] bg-gradient-to-br ${s.bg} border border-white/5 overflow-hidden`}
          >
            {/* Hover Glow */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="mb-6 p-4 rounded-2xl bg-slate-950/50 border border-white/10 w-fit shadow-xl">
                {s.icon}
              </div>
              
              <h3 className="font-serif text-3xl text-white mb-3 tracking-tight">{s.title}</h3>
              <p className="font-sans text-slate-400 text-base leading-relaxed mb-8">
                {s.desc}
              </p>
              
              <div className="mt-auto flex items-center gap-2 text-xs font-bold text-white uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                <span>Expertise</span>
                <div className="h-px w-8 bg-white/50"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* === 3. BIO & CTA === */
export function BioSection() {
  return (
    <section className="py-24 px-6 bg-slate-900/30 border-t border-white/5">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
          className="relative w-32 h-32 mx-auto mb-10 rounded-full p-1 bg-gradient-to-br from-amber-400 to-indigo-600"
        >
          <img 
            src="https://w5e7svgknmetlu9j.public.blob.vercel-storage.com/adeoye.jpg" 
            alt="Bolu" 
            className="w-full h-full rounded-full object-cover border-4 border-slate-900"
          />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-serif text-4xl md:text-5xl text-white mb-6"
        >
          Ready to build the impossible?
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-lg mb-10 max-w-xl mx-auto"
        >
          Whether it's a complex SaaS platform, a high-speed API, or a custom AI solution, I bring the engineering rigor to make it happen.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/chat" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-slate-950 font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_30px_rgba(255,255,255,0.2)]">
            <span>Start a Project</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
