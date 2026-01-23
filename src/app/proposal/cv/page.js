"use client";
import { useState, useEffect } from "react";
import { 
  Download, Cpu, Globe, Zap, Shield, Layers, 
  MapPin, Terminal, Database, Code2, Share2, 
  CheckCircle2, Box, Workflow, Activity, Server, Smartphone,
  Eye, Brain, Anchor, Star
} from "lucide-react";
import Link from "next/link";

export default function AdmiralCV() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // === 1. THE OBSIDIAN PRE-FLIGHT LOGIC ===
  useEffect(() => {
    const steps = [
      "Initializing Command Protocol...",
      "Loading Navy-Grade Assets...",
      "Verifying Architectural Clearance...",
      "System Ready."
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
    document.title = "BOLU_ADEOYE_EXECUTIVE_BRIEF";
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
            <Anchor size={40} className="text-white" />
          </div>

          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter uppercase">Boluwatife<br/>Adeoye</h1>
          <div className="h-1 w-20 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-200 text-xs font-bold uppercase tracking-[0.3em] mb-8">Command Architecture</p>

          {/* LOADING SIMULATION */}
          {!isReady ? (
            <div className="space-y-2 text-left bg-black p-6 border-l-4 border-blue-600 font-mono text-[10px] text-blue-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; ESTABLISHING SECURE LINK...</p>
              <p className="opacity-75">&gt; {loadingStep >= 1 ? "LOADING NAVY-GRADE ASSETS..." : "..."}</p>
              <p className="opacity-90">&gt; {loadingStep >= 2 ? "VERIFYING CLEARANCE..." : "..."}</p>
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
              <p className="text-xs font-bold text-blue-300 uppercase tracking-[0.3em] mb-2">Technical Authority</p>
              <h1 className="text-6xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
                Boluwatife<br/>Adeoye
              </h1>
              <div className="flex items-center gap-4">
                <div className="bg-blue-600 text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest">Lead Architect</div>
                <div className="h-px w-12 bg-blue-600"></div>
                <p className="text-[10px] font-bold text-blue-200">FULL-STACK ENGINEER</p>
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
                <p className="text-[8px] font-black uppercase text-blue-300">Clearance Level</p>
                <p className="text-lg font-black leading-none">TIER-1</p>
              </div>
            </div>
          </header>

          {/* MAIN CONTENT GRID */}
          <main className="grid grid-cols-12 grow h-full">
            
            {/* LEFT COLUMN: DARK SIDEBAR (3 Cols) */}
            <div className="col-span-4 bg-slate-100 p-8 border-r-4 border-blue-950 flex flex-col gap-8">
              
              {/* CONTACT */}
              <section>
                <h3 className="bg-blue-950 text-white text-xs font-black uppercase py-1 px-2 mb-4 inline-block">
                  Direct Uplink
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-950 flex items-center justify-center text-white rounded-sm">
                      <Share2 size={14} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold uppercase text-slate-500">Portfolio</p>
                      <p className="text-[10px] font-black text-blue-950">boluadeoye.com.ng</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SKILLS: SOLID BLOCKS */}
              <section className="grow">
                <h3 className="bg-blue-950 text-white text-xs font-black uppercase py-1 px-2 mb-4 inline-block">
                  Core Arsenal
                </h3>
                
                <div className="space-y-6">
                  {/* Frontend */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-950 mb-2 border-b-2 border-blue-200 pb-1">Interface</p>
                    <div className="flex flex-wrap gap-2">
                      {['Next.js 15', 'React', 'Tailwind', 'Framer'].map(skill => (
                        <span key={skill} className="bg-white border-2 border-blue-950 px-2 py-1 text-[9px] font-bold text-blue-950 shadow-[2px_2px_0px_0px_#172554]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Backend */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-950 mb-2 border-b-2 border-blue-200 pb-1">Command</p>
                    <div className="flex flex-wrap gap-2">
                      {['Node.js', 'NestJS', 'Supabase', 'Redis'].map(skill => (
                        <span key={skill} className="bg-blue-950 text-white px-2 py-1 text-[9px] font-bold shadow-[2px_2px_0px_0px_#94a3b8]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Systems */}
                  <div>
                    <p className="text-[10px] font-black uppercase text-blue-950 mb-2 border-b-2 border-blue-200 pb-1">Systems</p>
                    <div className="flex flex-wrap gap-2">
                      {['PostGIS', 'WebSockets', 'AI/RAG', 'Edge'].map(skill => (
                        <span key={skill} className="bg-slate-300 text-blue-950 px-2 py-1 text-[9px] font-bold">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* QR CODE PLACEHOLDER */}
              <div className="mt-auto">
                <div className="border-4 border-blue-950 p-2 bg-white text-center">
                  <div className="w-full aspect-square bg-blue-950 flex items-center justify-center mb-2">
                    <Anchor size={32} className="text-white" />
                  </div>
                  <p className="text-[8px] font-black uppercase">Scan for Live Demo</p>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: EXPERIENCE (9 Cols) */}
            <div className="col-span-8 p-10 flex flex-col gap-8">
              
              {/* SUMMARY */}
              <section className="border-b-4 border-blue-950 pb-6">
                <h2 className="text-2xl font-black uppercase text-blue-950 mb-3">Mission Profile</h2>
                <p className="text-xs font-bold leading-relaxed text-justify text-blue-900">
                  Strategic Systems Architect specializing in <span className="bg-blue-950 text-white px-1">Offline-First</span> ecosystems for the African market. I bridge the gap between complex engineering and business value, delivering scalable solutions in <span className="bg-blue-950 text-white px-1">Real-Time Logistics</span> and <span className="bg-blue-950 text-white px-1">Geospatial Systems</span>.
                </p>
              </section>

              {/* EXPERIENCE */}
              <section className="grow space-y-8">
                
                {/* JOB 1: AUTOAM */}
                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-black uppercase text-blue-950">Autoam</h3>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Founding Engineer • Logistics</p>
                    </div>
                    <div className="bg-blue-100 text-blue-950 px-2 py-1 text-[10px] font-black">2024 - PRESENT</div>
                  </div>

                  <p className="text-[10px] font-bold text-slate-700 mb-4">
                    Architected a real-time marketplace connecting drivers with mechanics. Designed a Geospatial Matching Engine to connect users in &lt;2 seconds.
                  </p>

                  {/* BOLD DIAGRAM: GEOSPATIAL ENGINE */}
                  <div className="bg-blue-950 text-white p-4 rounded-sm shadow-lg flex items-center gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <MapPin size={20} className="text-blue-400" />
                      <span className="text-[8px] font-bold uppercase">Driver</span>
                    </div>
                    <div className="grow h-1 bg-blue-700 relative">
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-blue-950 px-2 py-0.5 text-[8px] font-black uppercase rounded-full">
                        &lt; 200ms Match
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <Zap size={20} className="text-yellow-400" />
                      <span className="text-[8px] font-bold uppercase">Mechanic</span>
                    </div>
                  </div>
                </div>

                {/* JOB 2: HEIRSGUARD */}
                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-black uppercase text-blue-950">HeirsGuard Vision</h3>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Solutions Architect • InsurTech AI</p>
                    </div>
                    <div className="bg-blue-100 text-blue-950 px-2 py-1 text-[10px] font-black">2026</div>
                  </div>

                  <p className="text-[10px] font-bold text-slate-700 mb-4">
                    Reduced claims processing from 14 days to 5 minutes using an Azure-Native AI Engine.
                  </p>

                  {/* BOLD DIAGRAM: AI PIPELINE */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-slate-200 p-2 text-center border-b-4 border-blue-950">
                      <Eye size={16} className="mx-auto text-blue-950 mb-1"/>
                      <span className="text-[8px] font-black uppercase block">Vision AI</span>
                    </div>
                    <div className="bg-slate-200 p-2 text-center border-b-4 border-blue-950">
                      <Brain size={16} className="mx-auto text-blue-950 mb-1"/>
                      <span className="text-[8px] font-black uppercase block">RAG Policy</span>
                    </div>
                    <div className="bg-blue-600 p-2 text-center border-b-4 border-blue-950 text-white">
                      <CheckCircle2 size={16} className="mx-auto mb-1"/>
                      <span className="text-[8px] font-black uppercase block">Payout</span>
                    </div>
                  </div>
                </div>

                {/* JOB 3: JOPSA */}
                <div className="relative pl-6 border-l-4 border-blue-200">
                  <div className="absolute -left-[10px] top-0 w-4 h-4 bg-blue-950 border-2 border-white rounded-full"></div>
                  
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-black uppercase text-blue-950">Peace Service Academy</h3>
                      <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Lead Developer • EdTech</p>
                    </div>
                    <div className="bg-blue-100 text-blue-950 px-2 py-1 text-[10px] font-black">2025</div>
                  </div>

                  <p className="text-[10px] font-bold text-slate-700">
                    Engineered a "Static Prestige" architecture using Next.js for zero-cost maintenance and instant load times.
                  </p>
                </div>

              </section>
            </div>
          </main>

          {/* FOOTER */}
          <footer className="bg-blue-950 text-white p-4 flex justify-between items-center">
            <div className="text-[8px] font-bold uppercase tracking-widest opacity-70">
              Generated by Titanium Engine • Ref: BA-2026
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
