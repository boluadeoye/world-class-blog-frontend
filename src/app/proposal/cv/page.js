"use client";
import { useState, useEffect } from "react";
import { 
  Download, Cpu, Globe, Zap, Shield, Layers, 
  MapPin, Terminal, Database, Code2, Share2, 
  CheckCircle2, Box, Workflow, Activity, Server, Smartphone,
  Eye, Brain, Anchor, Lock, Network, Bot
} from "lucide-react";
import Link from "next/link";

export default function StaffArchitectCV() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // === 1. THE OBSIDIAN PRE-FLIGHT LOGIC ===
  useEffect(() => {
    const steps = [
      "Initializing AI Infrastructure Protocol...",
      "Separating Neural Contexts...",
      "Optimizing ExamForge Data Layers...",
      "Architectural Clearance: STAFF_LEVEL."
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
    document.title = "BOLU_ADEOYE_STAFF_ARCHITECT_CV";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-blue-500 selection:text-white">

      {/* === NUCLEAR CSS RESET & UTILITIES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; display: block; height: 0; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: THE OBSIDIAN PORTAL (Screen) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900/90 backdrop-blur-xl border-2 border-blue-900 rounded-none p-10 shadow-2xl text-center">
          <div className="w-24 h-24 mx-auto bg-blue-900 flex items-center justify-center mb-8 border-4 border-blue-500 shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]">
            <Cpu size={40} className="text-white" />
          </div>

          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">Boluwatife<br/>Adeoye</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-8">Staff Systems Architect</p>

          {/* LOADING SIMULATION */}
          {!isReady ? (
            <div className="space-y-2 text-left bg-black p-6 border-l-4 border-blue-600 font-mono text-[10px] text-blue-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; ESTABLISHING SECURE LINK...</p>
              <p className="opacity-75">&gt; {loadingStep >= 1 ? "SEPARATING NEURAL CONTEXTS..." : "..."}</p>
              <p className="opacity-90">&gt; {loadingStep >= 2 ? "OPTIMIZING DATA LAYERS..." : "..."}</p>
              <p className="text-white font-bold animate-pulse">&gt; {loadingStep >= 3 ? "ACCESS_GRANTED" : "..."}</p>
            </div>
          ) : (
            <button
              onClick={handlePrint}
              className="w-full group flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-black py-5 uppercase tracking-widest transition-all shadow-xl"
            >
              <Download size={20} className="group-hover:scale-110 transition-transform" />
              <span>Download Brief</span>
            </button>
          )}
          
          <Link href="/" className="block mt-8 text-[10px] font-bold text-slate-500 hover:text-white uppercase tracking-widest transition-colors">
            // Abort Mission
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE ADMIRAL DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block font-sans text-blue-950">
        
        {/* ================= PAGE 1 ================= */}
        <div className="h-[297mm] relative flex flex-col">
          
          {/* HEADER: MASSIVE NAVY BLOCK */}
          <header className="bg-blue-950 text-white p-[15mm] pb-10 flex justify-between items-start relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-900 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10">
              <p className="text-xs font-bold text-blue-300 uppercase tracking-[0.3em] mb-2">AI Infrastructure Specialist</p>
              <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
                Boluwatife<br/>Adeoye
              </h1>
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Staff Architect</div>
                <div className="h-px w-12 bg-blue-600"></div>
                <p className="text-[10px] font-bold text-blue-200">PERFORMANCE AS AESTHETICS</p>
              </div>
            </div>

            <div className="relative z-10 text-right space-y-2">
              <div className="flex items-center justify-end gap-2 text-xs font-bold">
                <Globe size={14} className="text-blue-400"/> boluadeoye.com.ng
              </div>
              <div className="flex items-center justify-end gap-2 text-xs font-bold">
                <MapPin size={14} className="text-blue-400"/> Lagos, Nigeria
              </div>
              <div className="mt-4 border-2 border-blue-400 p-2 inline-block">
                <p className="text-[8px] font-black uppercase text-blue-300">Market Valuation</p>
                <p className="text-lg font-black leading-none">TIER-1</p>
              </div>
            </div>
          </header>

          {/* MAIN CONTENT GRID */}
          <main className="grid grid-cols-12 grow h-full">
            
            {/* LEFT COLUMN: DARK SIDEBAR (4 Cols) */}
            <div className="col-span-4 bg-slate-100 p-8 border-r-4 border-blue-950 flex flex-col gap-8">
              
              {/* CONTACT */}
              <section>
                <h3 className="bg-blue-950 text-white text-xs font-black uppercase py-1 px-2 mb-4 inline-block">
                  Secure Uplink
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-950 flex items-center justify-center text-white rounded-sm">
                      <Share2 size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold uppercase text-slate-500">Email</p>
                      <p className="text-[9px] font-black text-blue-950">contact@boluadeoye.com.ng</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-950 flex items-center justify-center text-white rounded-sm">
                      <Smartphone size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold uppercase text-slate-500">WhatsApp</p>
                      <p className="text-[9px] font-black text-blue-950">+234 810 629 3674</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SKILLS: SOLID BLOCKS */}
              <section className="grow">
                <h3 className="bg-blue-950 text-white text-xs font-black uppercase py-1 px-2 mb-4 inline-block">
                  Technical Arsenal
                </h3>
                
                <div className="space-y-6">
                  {/* Frontend/Edge */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-950 mb-2 border-b-2 border-blue-200 pb-1">Frontend & Edge</p>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js 15', 'React Server Actions', 'Cloudflare Edge', 'Framer Motion'].map(skill => (
                        <span key={skill} className="bg-white border-2 border-blue-950 px-2 py-1 text-[9px] font-bold text-blue-950 shadow-[2px_2px_0px_0px_#172554]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* AI/Inference */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-950 mb-2 border-b-2 border-blue-200 pb-1">AI & Inference</p>
                    <div className="flex flex-wrap gap-2">
                      {['Groq LPU', 'Llama 3.3', 'RAG Systems', 'Vector DBs'].map(skill => (
                        <span key={skill} className="bg-blue-950 text-white px-2 py-1 text-[9px] font-bold shadow-[2px_2px_0px_0px_#94a3b8]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Backend/Data */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-950 mb-2 border-b-2 border-blue-200 pb-1">Data & Security</p>
                    <div className="flex flex-wrap gap-2">
                      {['Neon Serverless', 'Row-Level Security', 'PostgreSQL', 'Node.js'].map(skill => (
                        <span key={skill} className="bg-slate-300 text-blue-950 px-2 py-1 text-[9px] font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Systems */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-950 mb-2 border-b-2 border-blue-200 pb-1">Systems Mastery</p>
                    <div className="flex flex-wrap gap-2">
                      {['Linux CLI', 'Termux/Subsystems', 'CI/CD Pipelines', 'Git/GitHub'].map(skill => (
                        <span key={skill} className="bg-slate-800 text-white px-2 py-1 text-[9px] font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: EXPERIENCE (8 Cols) */}
            <div className="col-span-8 p-10 flex flex-col gap-8">
              
              {/* EXECUTIVE SUMMARY */}
              <section className="border-b-4 border-blue-950 pb-6">
                <h2 className="text-2xl font-black uppercase text-blue-950 mb-3">Executive Anomaly</h2>
                <p className="text-xs font-bold leading-relaxed text-justify text-blue-900">
                  Staff Systems Architect and 99th-percentile technical outlier specializing in <span className="bg-blue-950 text-white px-1">Sovereign AI Infrastructure</span>. Architecting enterprise-grade systems using Next.js 15, Groq LPU, and Neon RLS to achieve <span className="bg-blue-950 text-white px-1">sub-200ms inference latency</span>. Building the intersection of high-performance computing and Zero-Trust security.
                </p>
              </section>

              {/* EXPERIENCE */}
              <section className="grow space-y-8">
                
                {/* JOB 1: DIGITAL CONSCIOUSNESS */}
                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-black uppercase text-blue-950">Digital Consciousness</h3>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Lead Architect • The Digital Twin</p>
                    </div>
                    <div className="bg-blue-100 text-blue-950 px-2 py-1 text-[10px] font-black">CURRENT</div>
                  </div>

                  <ul className="space-y-3 mb-4">
                    <li className="flex gap-3 items-start">
                      <Bot size={14} className="text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-[10px] font-bold text-slate-700">
                        <strong className="text-blue-950">Architected</strong> a recursive AI agent (<span className="font-mono text-blue-600">/chat</span>) achieving <span className="bg-slate-200 px-1">sub-200ms P95 latency</span> using Groq LPU and Next.js 15.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <Zap size={14} className="text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-[10px] font-bold text-slate-700">
                        <strong className="text-blue-950">Engineered</strong> a "Scale-to-Zero" serverless inference pipeline on Vercel, reducing operational costs by 80% while maintaining 99.9% uptime.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* JOB 2: EXAMFORGE */}
                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-black uppercase text-blue-950">ExamForge Core</h3>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Systems Architect • EdTech Infrastructure</p>
                    </div>
                    <div className="bg-blue-100 text-blue-950 px-2 py-1 text-[10px] font-black">2024</div>
                  </div>

                  <ul className="space-y-3 mb-4">
                    <li className="flex gap-3 items-start">
                      <Shield size={14} className="text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-[10px] font-bold text-slate-700">
                        <strong className="text-blue-950">Engineered</strong> a Zero-Trust data layer using Neon RLS, ensuring database-level multi-tenancy and 100% data isolation for institutional clients.
                      </p>
                    </li>
                    <li className="flex gap-3 items-start">
                      <Layers size={14} className="text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-[10px] font-bold text-slate-700">
                        <strong className="text-blue-950">Orchestrated</strong> a high-concurrency assessment engine capable of supporting 30,000+ simultaneous learners.
                      </p>
                    </li>
                  </ul>

                  {/* BOLD DIAGRAM: ZERO TRUST ARCHITECTURE */}
                  <div className="bg-blue-950 text-white p-4 rounded-sm shadow-lg flex items-center justify-between gap-4">
                    <div className="text-center">
                      <Lock size={20} className="mx-auto text-blue-400 mb-1" />
                      <span className="text-[8px] font-black uppercase">Neon RLS</span>
                    </div>
                    <div className="h-px grow bg-blue-600 relative">
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-800 px-2 py-0.5 text-[7px] font-bold uppercase rounded">
                         Zero Trust
                       </div>
                    </div>
                    <div className="text-center">
                      <Network size={20} className="mx-auto text-green-400 mb-1" />
                      <span className="text-[8px] font-black uppercase">Multi-Tenant</span>
                    </div>
                  </div>
                </div>

                {/* JOB 3: SCHOLARS EDGE */}
                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-black uppercase text-blue-950">Scholars Edge</h3>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Lead Developer • Academic Systems</p>
                    </div>
                    <div className="bg-blue-100 text-blue-950 px-2 py-1 text-[10px] font-black">2024</div>
                  </div>

                  <ul className="space-y-3">
                    <li className="flex gap-3 items-start">
                      <Server size={14} className="text-blue-600 mt-0.5 shrink-0" />
                      <p className="text-[10px] font-bold text-slate-700">
                        <strong className="text-blue-950">Designed</strong> a "Static Prestige" architecture using Next.js for zero-cost maintenance and instant load times.
                      </p>
                    </li>
                  </ul>
                </div>

              </section>
            </div>
          </main>

          {/* FOOTER */}
          <footer className="bg-blue-950 text-white p-4 flex justify-between items-center">
            <div className="text-[8px] font-bold uppercase tracking-widest opacity-70">
              Generated by Titanium Engine • Ref: BA-STAFF-2026
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
