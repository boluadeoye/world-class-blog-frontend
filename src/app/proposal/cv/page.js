"use client";
import { useState, useEffect } from "react";
import { 
  Download, Cpu, Globe, Zap, Shield, Layers, 
  MapPin, Terminal, Database, Code2, Share2, 
  CheckCircle2, Box, Workflow, Activity, Server, Smartphone
} from "lucide-react";
import Link from "next/link";

export default function SovereignCV() {
  const [isReady, setIsReady] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  // === 1. THE OBSIDIAN PRE-FLIGHT LOGIC ===
  useEffect(() => {
    const steps = [
      "Initializing Core Protocol...",
      "Mapping Geospatial Traces...",
      "Syncing AI Nodes...",
      "Compiling Sovereign Architecture...",
      "Identity Verified."
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
    document.title = "BOLU_ADEOYE_ARCHITECT_SPEC_2026";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-blue-200">

      {/* === NUCLEAR CSS RESET & UTILITIES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container { position: absolute; left: 0; top: 0; width: 100%; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; display: block; height: 0; }
          .avoid-break { break-inside: avoid; }
          
          /* CUSTOM PATTERNS */
          .grid-pattern {
            background-image: radial-gradient(#cbd5e1 1px, transparent 1px);
            background-size: 20px 20px;
          }
        }
      `}</style>

      {/* === VIEW 1: THE OBSIDIAN PORTAL (Screen) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl p-10 shadow-2xl text-center">
          <div className="w-20 h-20 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-8 border border-slate-700 relative">
            <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
            <Cpu size={32} className="text-blue-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">Boluwatife Adeoye</h1>
          <p className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-8">Lead Technical Architect</p>

          {/* LOADING SIMULATION */}
          {!isReady ? (
            <div className="space-y-2 text-left bg-black/50 p-6 rounded-lg border border-slate-800 font-mono text-[10px] text-green-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">> Accessing Secure Vault...</p>
              <p className="opacity-75">> {loadingStep >= 1 ? "Mapping Geospatial Traces..." : "..."}</p>
              <p className="opacity-90">> {loadingStep >= 2 ? "Syncing AI Nodes..." : "..."}</p>
              <p className="text-white animate-pulse">> {loadingStep >= 3 ? "DECRYPTING_PROFILE..." : "..."}</p>
            </div>
          ) : (
            <button
              onClick={handlePrint}
              className="w-full group flex items-center justify-center gap-3 bg-white hover:bg-blue-50 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
            >
              <Download size={20} className="group-hover:scale-110 transition-transform" />
              <span>Access Architectural Spec</span>
            </button>
          )}
          
          <Link href="/" className="block mt-8 text-[10px] text-slate-600 hover:text-slate-400 uppercase tracking-widest">
            // Return to Base
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE SOVEREIGN DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block font-sans text-slate-900">
        
        {/* ================= PAGE 1 ================= */}
        <div className="p-[15mm] h-[297mm] relative flex flex-col grid-pattern">
          
          {/* HEADER: SWISS GRID */}
          <header className="grid grid-cols-12 gap-4 border-b-4 border-slate-900 pb-8 mb-8">
            <div className="col-span-8">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-slate-900 text-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest">Ref: BA-2026-NG</div>
                <div className="h-px w-12 bg-slate-300"></div>
              </div>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-[0.9] text-slate-900 mb-2">
                Boluwatife<br/><span className="text-blue-600">Adeoye</span>
              </h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">Lead Technical Architect & Full-Stack Engineer</p>
            </div>
            <div className="col-span-4 text-right flex flex-col justify-between items-end">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">boluadeoye.com.ng</p>
                <p className="text-xs text-slate-500">Lagos, Nigeria</p>
              </div>
              <div className="border-2 border-slate-900 p-2 rounded w-24 text-center">
                <p className="text-[8px] font-bold uppercase text-slate-400 mb-1">Status</p>
                <div className="flex items-center justify-center gap-1 text-[10px] font-black text-green-600">
                  <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                  ONLINE
                </div>
              </div>
            </div>
          </header>

          {/* MAIN GRID */}
          <main className="grid grid-cols-12 gap-8 grow">
            
            {/* LEFT COLUMN: CONTEXT & STACK (4 Cols) */}
            <div className="col-span-4 flex flex-col gap-8">
              
              {/* SUMMARY */}
              <section>
                <h3 className="font-black text-xs uppercase mb-3 flex items-center gap-2 border-b border-slate-200 pb-1">
                  <Terminal size={14} /> Executive Summary
                </h3>
                <p className="text-[10px] leading-relaxed text-justify font-medium text-slate-600">
                  A strategic Systems Architect specializing in high-performance, <strong>"Offline-First"</strong> digital ecosystems for the African market. I bridge the gap between complex engineering and business value, delivering scalable solutions in <strong>Real-Time Logistics</strong> and <strong>Geospatial Systems</strong>.
                </p>
              </section>

              {/* THE STACK (VISUALIZED) */}
              <section className="grow">
                <h3 className="font-black text-xs uppercase mb-4 flex items-center gap-2 border-b border-slate-200 pb-1">
                  <Layers size={14} /> The Sovereign Stack
                </h3>
                
                {/* CSS ISOMETRIC STACK DIAGRAM */}
                <div className="relative py-4 px-2 space-y-2 perspective-[1000px]">
                  
                  {/* Layer 1: Frontend */}
                  <div className="bg-white border-2 border-slate-900 p-3 rounded shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] transform -skew-x-6 ml-2 z-30 relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black uppercase text-blue-600">Interface Layer</span>
                      <Smartphone size={12} className="text-slate-400"/>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-slate-100 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">Next.js 15</span>
                      <span className="bg-slate-100 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">Tailwind</span>
                      <span className="bg-slate-100 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">Expo</span>
                    </div>
                  </div>

                  {/* Connector Lines */}
                  <div className="h-4 border-l-2 border-dashed border-slate-300 ml-8 -my-1 relative z-0"></div>

                  {/* Layer 2: Logic */}
                  <div className="bg-slate-50 border-2 border-slate-900 p-3 rounded shadow-[4px_4px_0px_0px_rgba(15,23,42,0.1)] transform -skew-x-6 ml-4 z-20 relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black uppercase text-purple-600">Logic Core</span>
                      <Cpu size={12} className="text-slate-400"/>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-white border border-slate-200 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">Node.js</span>
                      <span className="bg-white border border-slate-200 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">NestJS</span>
                      <span className="bg-white border border-slate-200 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">Socket.io</span>
                    </div>
                  </div>

                  {/* Connector Lines */}
                  <div className="h-4 border-l-2 border-dashed border-slate-300 ml-10 -my-1 relative z-0"></div>

                  {/* Layer 3: Data */}
                  <div className="bg-slate-900 text-white border-2 border-slate-900 p-3 rounded shadow-[4px_4px_0px_0px_rgba(15,23,42,0.3)] transform -skew-x-6 ml-6 z-10 relative">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[9px] font-black uppercase text-green-400">Infrastructure</span>
                      <Database size={12} className="text-slate-500"/>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      <span className="bg-slate-800 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">PostGIS</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">Redis</span>
                      <span className="bg-slate-800 px-1.5 py-0.5 text-[8px] font-mono font-bold rounded">Supabase</span>
                    </div>
                  </div>

                </div>
              </section>

              {/* CONTACT QR (Simulated) */}
              <div className="mt-auto border-t-2 border-slate-900 pt-4">
                <div className="flex gap-3 items-center">
                  <div className="w-12 h-12 bg-slate-900 flex items-center justify-center text-white">
                    <Share2 size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-slate-500">Direct Uplink</p>
                    <p className="text-xs font-black text-slate-900">boluadeoye.com.ng</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: ARCHITECTURAL WINS (8 Cols) */}
            <div className="col-span-8 space-y-8">
              
              {/* PROJECT 1: AUTOAM */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="absolute -left-[19px] top-0 w-2 h-2 bg-slate-900 rounded-full"></div>
                
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-black uppercase text-slate-900">Autoam</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Founding Engineer • Automotive Logistics</p>
                  </div>
                  <div className="bg-slate-100 px-2 py-1 rounded text-[9px] font-mono font-bold text-slate-600">2024 - Present</div>
                </div>

                <p className="text-[10px] text-slate-700 mb-4 font-medium">
                  Architected a real-time marketplace connecting drivers with mechanics. Designed a <strong>Geospatial Matching Engine</strong> to connect users in &lt;2 seconds.
                </p>

                {/* DIAGRAM: GEOSPATIAL PULSE */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center gap-6">
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 border-2 border-blue-200 rounded-full animate-[ping_3s_linear_infinite]"></div>
                    <div className="absolute inset-2 border-2 border-blue-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-blue-600 rounded-full z-10"></div>
                    <MapPin size={12} className="absolute -top-1 right-0 text-slate-400" />
                    <MapPin size={12} className="absolute bottom-1 left-1 text-slate-400" />
                  </div>
                  <div className="grow grid grid-cols-2 gap-2">
                    <div className="bg-white p-2 rounded border border-slate-100 shadow-sm">
                      <p className="text-[8px] font-bold uppercase text-slate-400">Latency</p>
                      <p className="text-sm font-black text-slate-900">&lt; 200ms</p>
                    </div>
                    <div className="bg-white p-2 rounded border border-slate-100 shadow-sm">
                      <p className="text-[8px] font-bold uppercase text-slate-400">Architecture</p>
                      <p className="text-[10px] font-black text-slate-900">Offline-First</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROJECT 2: HEIRSGUARD VISION */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="absolute -left-[19px] top-0 w-2 h-2 bg-red-600 rounded-full"></div>

                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-black uppercase text-slate-900">HeirsGuard Vision</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Solutions Architect • InsurTech AI</p>
                  </div>
                  <div className="bg-slate-100 px-2 py-1 rounded text-[9px] font-mono font-bold text-slate-600">2026</div>
                </div>

                <p className="text-[10px] text-slate-700 mb-4 font-medium">
                  Reduced claims processing from 14 days to 5 minutes using an <strong>Azure-Native AI Engine</strong>.
                </p>

                {/* DIAGRAM: LOGIC FLOW */}
                <div className="flex items-center gap-2 text-[9px] font-bold uppercase text-slate-600 bg-slate-50 p-3 rounded border border-slate-200">
                  <div className="flex flex-col items-center gap-1">
                    <Box size={14} />
                    <span>Input</span>
                  </div>
                  <div className="h-px w-4 bg-slate-400"></div>
                  <div className="flex flex-col items-center gap-1 text-blue-600">
                    <Eye size={14} />
                    <span>Vision AI</span>
                  </div>
                  <div className="h-px w-4 bg-slate-400"></div>
                  <div className="flex flex-col items-center gap-1 text-purple-600">
                    <Brain size={14} />
                    <span>RAG Policy</span>
                  </div>
                  <div className="h-px w-4 bg-slate-400"></div>
                  <div className="flex flex-col items-center gap-1 text-green-600">
                    <CheckCircle2 size={14} />
                    <span>Payout</span>
                  </div>
                </div>
              </div>

              {/* PROJECT 3: JOPSA */}
              <div className="relative">
                <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="absolute -left-[19px] top-0 w-2 h-2 bg-slate-900 rounded-full"></div>

                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h2 className="text-xl font-black uppercase text-slate-900">Peace Service Academy</h2>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Lead Developer • EdTech</p>
                  </div>
                  <div className="bg-slate-100 px-2 py-1 rounded text-[9px] font-mono font-bold text-slate-600">2025</div>
                </div>

                <p className="text-[10px] text-slate-700 mb-2 font-medium">
                  Engineered a "Static Prestige" architecture using Next.js for zero-cost maintenance and instant load times.
                </p>
                
                <div className="flex gap-2">
                   <span className="border border-slate-200 px-2 py-1 rounded text-[8px] font-bold uppercase text-slate-500">JSON-CMS</span>
                   <span className="border border-slate-200 px-2 py-1 rounded text-[8px] font-bold uppercase text-slate-500">Dual-Wing Nav</span>
                </div>
              </div>

            </div>
          </main>

          {/* FOOTER */}
          <footer className="border-t-4 border-slate-900 pt-4 flex justify-between items-end mt-4">
            <div>
              <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-1">Authorized Signature</p>
              <div className="font-serif italic text-xl text-slate-900">Boluwatife Adeoye</div>
            </div>
            <div className="text-right">
              <p className="text-[8px] font-mono text-slate-400">GENERATED BY TITANIUM ENGINE</p>
              <p className="text-[8px] font-mono text-slate-900 font-bold">VER: 2026.1.0</p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
