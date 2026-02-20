"use client";
import { motion } from "framer-motion";
import { Shield, Zap, Cpu, Database, Lock, Globe, ArrowRight, MessageSquare, CheckCircle2, Terminal, Activity, Smartphone } from "lucide-react";
import Link from "next/link";

export default function ArchitectureVerification() {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      
      {/* === BACKGROUND ATMOSPHERE === */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-900/10 rounded-full blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* === HEADER === */}
      <header className="relative z-10 border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white text-black flex items-center justify-center font-black rounded-lg">BA</div>
            <span className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase">Architecture Verification // REF: BA-ML-2026</span>
          </div>
          <Link href="/chat" className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-full transition-all shadow-lg shadow-indigo-500/20">
            <MessageSquare size={14} />
            <span>Interview AI Bot</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-16 md:py-24">
        
        {/* === HERO === */}
        <section className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest mb-6"
          >
            <CheckCircle2 size={12} />
            <span>System Integrity Verified</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-8 leading-none"
          >
            Engineering <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Sovereignty.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed border-l-2 border-slate-800 pl-6"
          >
            This portal serves as the technical validation layer for the systems architected by <strong>Boluwatife Adeoye</strong>. 
            Below is the deep-dive into the high-dimensional data structures and inference engines mentioned in the executive dossier.
          </motion.p>
        </section>

        {/* === PROJECT DEEP DIVES === */}
        <div className="space-y-32">
          
          {/* 01. ONYX SOVEREIGN */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <div className="sticky top-32">
                <span className="text-xs font-mono font-bold text-indigo-500 uppercase tracking-widest mb-4 block">Case Study 01</span>
                <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">Onyx Sovereign</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  A non-custodial financial terminal requiring sub-second risk assessment. The challenge was performing complex contract audits without introducing execution latency.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <Zap size={18} className="text-indigo-500" />
                    <span>Sub-200ms P95 Inference Latency</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <Lock size={18} className="text-indigo-500" />
                    <span>Hardware-Backed Key Isolation</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-7 bg-slate-900/50 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h4 className="text-xs font-black uppercase text-slate-500 mb-6 tracking-widest">Technical Moat: Heuristic Pipeline</h4>
              <div className="space-y-6 font-mono text-xs">
                <div className="p-4 bg-black rounded-xl border border-white/5">
                  <p className="text-indigo-400 mb-2">// Groq LPU Optimization</p>
                  <p className="text-slate-500">The system bypasses standard GPU bottlenecks by utilizing LPUs for sequential tensor operations, reducing inference overhead by 70%.</p>
                </div>
                <div className="p-4 bg-black rounded-xl border border-white/5">
                  <p className="text-emerald-400 mb-2">// RAG Grounding</p>
                  <p className="text-slate-500">Contract bytecode is vectorized and queried against a 10k+ exploit-pattern database to eliminate AI hallucinations in risk scoring.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 02. EXAMFORGE CORE */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7 order-2 md:order-1 bg-slate-900/50 border border-white/10 rounded-3xl p-8 shadow-2xl">
              <h4 className="text-xs font-black uppercase text-slate-500 mb-6 tracking-widest">Infrastructure: High-Throughput Ingestion</h4>
              <div className="relative h-64 w-full border-2 border-dashed border-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                <div className="flex flex-col items-center gap-4 relative z-10">
                  <div className="flex gap-8">
                    <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center animate-bounce"><Smartphone size={20}/></div>
                    <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center animate-bounce delay-75"><Globe size={20}/></div>
                    <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center animate-bounce delay-150"><Activity size={20}/></div>
                  </div>
                  <div className="h-0.5 w-48 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                  <div className="px-4 py-2 bg-indigo-600 text-white font-black text-[10px] rounded tracking-widest">NEON RLS GATEWAY</div>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 order-1 md:order-2">
              <div className="sticky top-32">
                <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest mb-4 block">Case Study 02</span>
                <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">ExamForge Core</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">
                  Architecting for massive concurrency. The system handles 30,000+ simultaneous learners by offloading state validation to the Edge and enforcing security at the database row level.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <Database size={18} className="text-emerald-500" />
                    <span>Multi-Tenant RLS Isolation</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-bold text-slate-200">
                    <Layers size={18} className="text-emerald-500" />
                    <span>Serverless Auto-Scaling</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* === US WORKFLOW CERTIFICATION === */}
        <section className="mt-48 p-12 rounded-[3rem] bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Shield size={200} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-6">US Workflow Certified</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest opacity-70">Communication</p>
                <p className="text-lg font-bold">Remote Asynchronous Mastery</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest opacity-70">Deployment</p>
                <p className="text-lg font-bold">CI/CD & High-Velocity Sprints</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest opacity-70">Compliance</p>
                <p className="text-lg font-bold">SOC2 & GDPR Data Handling</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black uppercase tracking-widest opacity-70">Management</p>
                <p className="text-lg font-bold">Agile / Linear / Jira Expert</p>
              </div>
            </div>
          </div>
        </section>

        {/* === FINAL CTA === */}
        <section className="mt-32 text-center">
          <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-tight">Ready for the Technical Brief?</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/chat" className="group flex items-center gap-3 px-8 py-4 bg-white text-black rounded-full font-black text-sm uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl">
              <span>Interview My Digital Twin</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="https://wa.me/2348106293674" className="flex items-center gap-3 px-8 py-4 border border-white/10 bg-white/5 text-white rounded-full font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              <span>Direct Uplink</span>
            </a>
          </div>
        </section>

      </main>

      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.5em]">Bolu Adeoye Systems // 2026</p>
      </footer>
    </div>
  );
}
