"use client";
import { useState, useEffect } from "react";
import { 
  Download, Cpu, Globe, Zap, Shield, Layers, 
  MapPin, Terminal, Database, Code2, Share2, 
  CheckCircle2, Box, Workflow, Activity, Server, Smartphone,
  Eye, Brain, Anchor, Lock, Network, Bot, FileJson, Microscope, BarChart3
} from "lucide-react";
import Link from "next/link";

export default function ResearcherCV() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  useEffect(() => {
    const steps = [
      "Compiling Research Brief...",
      "Calibrating Inference Metrics...",
      "Hardening Data Pipelines...",
      "STAFF_LEVEL_ACCESS_GRANTED"
    ];
    if (loadingStep < steps.length) {
      const timer = setTimeout(() => setLoadingStep(prev => prev + 1), 600);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
    }
  }, [loadingStep]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "BOLU_ADEOYE_ML_RESEARCH_RESUME";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
          .no-print { display: none !important; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: THE OBSIDIAN PORTAL (Screen) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
        <div className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-xl border-2 border-blue-900 p-10 text-center">
          <Microscope size={40} className="text-white mx-auto mb-8 animate-pulse" />
          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">Boluwatife<br/>Adeoye</h1>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-8">Senior AI/ML Researcher</p>
          {!isReady ? (
            <div className="space-y-2 text-left bg-black p-6 border-l-4 border-blue-600 font-mono text-[10px] text-blue-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; INITIALIZING RESEARCH PROTOCOL...</p>
              <p className="opacity-90">&gt; CALIBRATING INFERENCE METRICS...</p>
              <p className="text-white font-bold animate-pulse">&gt; ACCESS_GRANTED</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 uppercase tracking-widest transition-all shadow-xl">
              <Download size={20} className="group-hover:scale-110 transition-transform" />
              <span>Download Research Brief</span>
            </button>
          )}
          <Link href="/" className="block mt-8 text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">// Abort</Link>
        </div>
      </div>

      {/* === VIEW 2: THE ADMIRAL DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block font-sans text-blue-950">
        <div className="h-[297mm] relative flex flex-col">
          
          <header className="bg-blue-950 text-white p-[12mm] pb-8 flex justify-between items-start relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.3em] mb-2">Systems Mastery & Inference Research</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.85] mb-4">Boluwatife<br/>Adeoye</h1>
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Senior AI/ML Researcher</div>
                <div className="h-px w-12 bg-blue-600"></div>
                <p className="text-[9px] font-bold text-blue-200 uppercase">Latency Optimization Specialist</p>
              </div>
            </div>
            <div className="relative z-10 text-right space-y-1">
              <p className="text-[11px] font-bold">boluadeoye.com.ng</p>
              <p className="text-[11px] font-bold opacity-80">contact@boluadeoye.com.ng</p>
              <p className="text-[11px] font-bold opacity-80">+234 810 629 3674</p>
              <div className="mt-4 border-2 border-blue-400 px-2 py-1 inline-block text-[10px] font-black uppercase text-blue-300">Target: Staff Tier</div>
            </div>
          </header>

          <main className="grid grid-cols-12 grow h-full">
            <div className="col-span-4 bg-slate-50 p-8 border-r-4 border-blue-950 flex flex-col gap-6">
              <section>
                <h3 className="bg-blue-950 text-white text-[10px] font-black uppercase py-1 px-2 mb-3 inline-block">ML Ops Arsenal</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[9px] font-black uppercase text-blue-950 mb-1 border-b border-blue-200">AI / Inference</p>
                    <div className="flex flex-wrap gap-1">
                      {['Groq LPU', 'RAG Pipelines', 'Vector DBs', 'Llama 3.3', 'Quantization'].map(s => (
                        <span key={s} className="bg-white border border-blue-950 px-1.5 py-0.5 text-[8px] font-bold text-blue-950">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase text-blue-950 mb-1 border-b border-blue-200">Data Systems</p>
                    <div className="flex flex-wrap gap-1">
                      {['PostGIS', 'ETL Pipelines', 'Redis', 'Neon Serverless', 'PostgreSQL'].map(s => (
                        <span key={s} className="bg-blue-950 text-white px-1.5 py-0.5 text-[8px] font-bold">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="bg-blue-950 text-white text-[10px] font-black uppercase py-1 px-2 mb-3 inline-block">US Project Protocol</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-blue-600"/>
                    <p className="text-[9px] font-bold text-blue-950 uppercase">Remote Async Mastery</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-blue-600"/>
                    <p className="text-[9px] font-bold text-blue-950 uppercase">CI/CD & High Velocity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield size={12} className="text-blue-600"/>
                    <p className="text-[9px] font-bold text-blue-950 uppercase">SOC2 / GDPR Compliant</p>
                  </div>
                </div>
              </section>

              <section className="mt-auto border-4 border-blue-950 p-3 bg-white">
                <p className="text-[8px] font-black uppercase mb-1">Architecture Verification</p>
                <p className="text-[9px] font-medium leading-tight text-slate-600 italic underline">boluadeoye.com.ng/proposal/cv</p>
              </section>
            </div>

            <div className="col-span-8 p-10 flex flex-col gap-6">
              <section className="border-b-4 border-blue-950 pb-4">
                <h2 className="text-xl font-black uppercase text-blue-950 mb-2 flex items-center gap-2"><Bot size={20}/> Research Summary</h2>
                <p className="text-[11px] font-bold leading-relaxed text-justify text-blue-900">
                  Architect of high-throughput inference engines and <span className="bg-blue-950 text-white px-1">High-Dimensional Data Systems</span>. Specialized in achieving sub-200ms P95 latency for agentic intelligence. Outlier-level competence in the transition of raw industrial data into actionable RAG-optimized knowledge bases.
                </p>
              </section>

              <section className="grow space-y-6">
                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-black uppercase text-blue-950">Onyx Sovereign</h3>
                    <div className="bg-blue-100 text-blue-950 px-2 py-0.5 text-[9px] font-black">AI RISK RESEARCH</div>
                  </div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mb-2">Real-time Heuristic Risk Inference</p>
                  <p className="text-[10px] font-medium text-slate-700 leading-snug">
                    Researched and deployed a heuristic engine for <span className="font-bold">sub-second smart contract vulnerability detection</span>. Utilized Groq LPU hardware to optimize tensor operations, reducing inference overhead by 70%.
                  </p>
                </div>

                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-black uppercase text-blue-950">ExamForge Core</h3>
                    <div className="bg-blue-100 text-blue-950 px-2 py-0.5 text-[9px] font-black">BIG DATA SYSTEMS</div>
                  </div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mb-2">High-Throughput Data Ingestion</p>
                  <p className="text-[10px] font-medium text-slate-700 leading-snug">
                    Architected a multi-tenant data pipeline capable of processing real-time performance analytics for <span className="font-bold">30,000+ concurrent learners</span>. Leveraged Neon Postgres RLS to ensure hardware-level data isolation and Zero-Trust integrity.
                  </p>
                </div>

                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="text-lg font-black uppercase text-blue-950">Digital Consciousness</h3>
                    <div className="bg-blue-100 text-blue-950 px-2 py-0.5 text-[9px] font-black">AGENTIC AI</div>
                  </div>
                  <p className="text-[10px] font-bold text-blue-600 uppercase mb-2">Recursive RAG Implementation</p>
                  <p className="text-[10px] font-medium text-slate-700 leading-snug">
                    Researched and implemented a <span className="font-bold">Recursive RAG (Retrieval-Augmented Generation)</span> system. Integrated high-dimensional vector embeddings to facilitate long-term memory for specialized technical consultation.
                  </p>
                </div>
              </section>

              <div className="bg-blue-950 text-white p-4 flex items-center justify-between gap-4">
                <div className="text-center">
                  <Network size={20} className="mx-auto text-blue-400 mb-1" />
                  <span className="text-[8px] font-black uppercase">Scaling</span>
                </div>
                <div className="h-px grow bg-blue-700 relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-blue-950 px-2 py-0.5 text-[8px] font-black uppercase">US Workflow Certified</div>
                </div>
                <div className="text-center">
                  <Zap size={20} className="mx-auto text-yellow-400 mb-1" />
                  <span className="text-[8px] font-black uppercase">Low Latency</span>
                </div>
              </div>
            </div>
          </main>

          <footer className="bg-blue-950 text-white p-3 flex justify-between items-center">
            <p className="text-[8px] font-bold uppercase tracking-widest opacity-70">Sovereign Architecture • Ref: BA-ML-RESEARCH-2026</p>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
