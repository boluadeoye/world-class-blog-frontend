"use client";
import { useState, useEffect } from "react";
import { 
  Download, Triangle, CheckCircle2, Clock, 
  FileCode2, Database, BrainCircuit, Smartphone,
  ShieldCheck
} from "lucide-react";

export default function AutoamVesting() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    document.title = "AUTOAM_ASSET_VESTING_PROTOCOL";
    window.print();
  };

  // The Autoam "A-Frame" Watermark Component
  const AFrameWatermark = () => (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
      <svg width="500" height="500" viewBox="0 0 24 24" fill="none" stroke="#1A2C4E" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 2 9 20H3Z"/>
        <path d="m12 2 4 9H8Z"/>
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7] font-sans text-[#1A2C4E] selection:bg-[#D97B0C] selection:text-white">
      
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #vesting-render, #vesting-render * { visibility: visible; }
          #vesting-render { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FFFFFF;
            box-sizing: border-box;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }
          .no-print { display: none !important; }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .thin-border { border: 0.5pt solid #cbd5e1; }
        .thin-border-b { border-bottom: 0.5pt solid #cbd5e1; }
        .thin-border-t { border-top: 0.5pt solid #cbd5e1; }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#1A2C4E]">
        <div className="relative z-10 w-full max-w-md bg-white p-12 text-center shadow-2xl rounded-2xl border-t-4 border-[#D97B0C]">
          <ShieldCheck size={48} className="text-[#1A2C4E] mx-auto mb-6" />
          <h1 className="font-inter text-2xl font-black text-[#1A2C4E] mb-2 tracking-tight">Asset Vesting Protocol</h1>
          <p className="font-inter text-[#D97B0C] text-[10px] font-bold mb-8 tracking-[0.2em] uppercase">Autoam Ltd. Escrow</p>

          {!isReady ? (
            <div className="text-slate-400 font-mono text-xs animate-pulse">SECURING IP LEDGER...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-[#1A2C4E] text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-[#D97B0C] transition-colors shadow-lg">
              Extract Vesting Deed
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print) === */}
      <div id="vesting-render" className="hidden print:block text-[#1A2C4E]">
        
        {/* PAGE 1: COVER PAGE */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <div className="h-full flex flex-col justify-center relative z-10">
            <div className="mb-auto">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D97B0C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-8">
                <path d="m12 2 9 20H3Z"/><path d="m12 2 4 9H8Z"/>
              </svg>
            </div>
            
            <div>
              <p className="font-mono text-[10px] text-[#D97B0C] uppercase tracking-[0.3em] mb-4">Confidential // Milestone 1</p>
              <h1 className="font-inter text-6xl font-black tracking-tighter leading-[1.1] mb-8 text-[#1A2C4E]">
                Autoam:<br/>Technical Asset<br/>Vesting Protocol
              </h1>
              <div className="w-24 h-[2px] bg-[#D97B0C] mb-12"></div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-12 thin-border-t pt-8">
              <div>
                <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mb-2">Prepared By</p>
                <p className="font-inter text-sm font-black uppercase tracking-wide">Bolu Adeoye</p>
                <p className="font-inter text-[10px] text-slate-500 uppercase tracking-widest mt-1">Lead Architect</p>
              </div>
              <div>
                <p className="font-mono text-[8px] text-slate-400 uppercase tracking-widest mb-2">Prepared For</p>
                <p className="font-inter text-sm font-black uppercase tracking-wide">Favour Nheachika Amusonu</p>
                <p className="font-inter text-[10px] text-slate-500 uppercase tracking-widest mt-1">CEO, Autoam Ltd.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2: EXECUTIVE SUMMARY & INVENTORY */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <header className="flex justify-between items-end thin-border-b pb-4 mb-12 relative z-10">
            <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Autoam // Vesting Protocol</span>
            <span className="font-mono text-[8px] text-[#1A2C4E] font-bold">PAGE 02</span>
          </header>

          <main className="grow relative z-10">
            <section className="mb-16">
              <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-6">Executive Summary</h2>
              <p className="font-inter text-sm leading-[2] text-slate-600 text-justify">
                This document formalizes the transition of the Autoam infrastructure from a <span className="font-semibold text-[#1A2C4E]">Technical Proof of Concept</span> to a <span className="font-semibold text-[#1A2C4E]">Corporate Asset</span>. It outlines the intellectual property currently held in architectural escrow and defines the exact parameters required for the final administrative handover. The system has been engineered to enterprise standards and is prepared for deployment upon final settlement.
              </p>
            </section>

            <section>
              <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-8">Asset Inventory</h2>
              
              <div className="thin-border rounded-lg overflow-hidden">
                <div className="grid grid-cols-12 bg-slate-50 thin-border-b p-4 font-mono text-[9px] text-slate-500 uppercase tracking-widest">
                  <div className="col-span-4">Asset Class</div>
                  <div className="col-span-8">Technical Specification</div>
                </div>
                
                <div className="grid grid-cols-12 p-4 thin-border-b items-center">
                  <div className="col-span-4 flex items-center gap-3 font-inter text-xs font-bold">
                    <FileCode2 size={16} className="text-[#D97B0C]"/> Source Code
                  </div>
                  <div className="col-span-8 font-mono text-[10px] text-slate-600">Next.js 15 (App Router) / React Server Components</div>
                </div>

                <div className="grid grid-cols-12 p-4 thin-border-b items-center">
                  <div className="col-span-4 flex items-center gap-3 font-inter text-xs font-bold">
                    <Database size={16} className="text-[#D97B0C]"/> Database
                  </div>
                  <div className="col-span-8 font-mono text-[10px] text-slate-600">Supabase / PostgreSQL (RLS Secured)</div>
                </div>

                <div className="grid grid-cols-12 p-4 thin-border-b items-center">
                  <div className="col-span-4 flex items-center gap-3 font-inter text-xs font-bold">
                    <BrainCircuit size={16} className="text-[#D97B0C]"/> AI Logic
                  </div>
                  <div className="col-span-8 font-mono text-[10px] text-slate-600">Groq Inference Engine / Llama 3.3 70B</div>
                </div>

                <div className="grid grid-cols-12 p-4 items-center">
                  <div className="col-span-4 flex items-center gap-3 font-inter text-xs font-bold">
                    <Smartphone size={16} className="text-[#D97B0C]"/> Infrastructure
                  </div>
                  <div className="col-span-8 font-mono text-[10px] text-slate-600">Progressive Web App (PWA) / Vercel Edge Network</div>
                </div>
              </div>
            </section>
          </main>
        </div>

        {/* PAGE 3: MILESTONE ROADMAP */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <header className="flex justify-between items-end thin-border-b pb-4 mb-12 relative z-10">
            <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Autoam // Vesting Protocol</span>
            <span className="font-mono text-[8px] text-[#1A2C4E] font-bold">PAGE 03</span>
          </header>

          <main className="grow relative z-10 flex flex-col justify-center">
            <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-16 text-center">The Handover Roadmap</h2>
            
            {/* HORIZONTAL LINEAR TIMELINE */}
            <div className="relative w-full max-w-2xl mx-auto">
              {/* The Line */}
              <div className="absolute top-6 left-8 right-8 h-[0.5pt] bg-slate-300 z-0"></div>
              
              <div className="grid grid-cols-2 gap-8 relative z-10">
                
                {/* NODE 1 */}
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-white thin-border rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <CheckCircle2 size={24} className="text-[#1A2C4E]" />
                  </div>
                  <div className="bg-[#1A2C4E] text-white px-3 py-1 rounded-full font-mono text-[8px] uppercase tracking-widest mb-4">
                    Completed
                  </div>
                  <h3 className="font-inter text-lg font-black uppercase mb-2">Milestone 1:<br/>Initiation</h3>
                  <p className="font-inter text-xs text-slate-500 leading-relaxed px-4">
                    History Sanitization, Developer Access, Technical Orientation.
                  </p>
                </div>

                {/* NODE 2 */}
                <div className="flex flex-col items-center text-center opacity-60">
                  <div className="w-12 h-12 bg-white thin-border rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Clock size={24} className="text-[#D97B0C]" />
                  </div>
                  <div className="bg-[#D97B0C] text-white px-3 py-1 rounded-full font-mono text-[8px] uppercase tracking-widest mb-4">
                    Pending Final Settlement
                  </div>
                  <h3 className="font-inter text-lg font-black uppercase mb-2">Milestone 2:<br/>Final Handover</h3>
                  <p className="font-inter text-xs text-slate-500 leading-relaxed px-4">
                    Administrative Ownership Transfer, IP Assignment Execution, Database Migration.
                  </p>
                </div>

              </div>
            </div>
          </main>
        </div>

        {/* PAGE 4: SIGN-OFF & SEAL */}
        <div className="a4-page p-[30mm]">
          <AFrameWatermark />
          <header className="flex justify-between items-end thin-border-b pb-4 mb-12 relative z-10">
            <span className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">Autoam // Vesting Protocol</span>
            <span className="font-mono text-[8px] text-[#1A2C4E] font-bold">PAGE 04</span>
          </header>

          <main className="grow relative z-10 flex flex-col">
            <h2 className="font-inter text-2xl font-black uppercase tracking-tight mb-8">Execution & Escrow</h2>
            <p className="font-inter text-sm leading-[2] text-slate-600 text-justify mb-12">
              By the execution of this protocol, the architectural integrity of the Autoam platform is verified. The intellectual property remains under the cryptographic and administrative control of the Lead Architect until Milestone 2 is fully executed.
            </p>

            <div className="mt-auto relative">
              
              {/* THE ARCHITECT'S SEAL (SAFETY ORANGE) */}
              <div className="absolute right-10 bottom-10 z-0 pointer-events-none">
                <div className="border-4 border-[#D97B0C]/40 text-[#D97B0C]/40 px-6 py-2 font-inter font-black text-4xl uppercase tracking-[0.3em] transform -rotate-12 rounded-sm">
                  APPROVED
                </div>
              </div>

              <div className="grid grid-cols-2 gap-12 relative z-10">
                <div>
                  <div className="h-16 border-b border-slate-800 mb-4"></div>
                  <p className="font-inter text-sm font-black uppercase tracking-wide">Bolu Adeoye</p>
                  <p className="font-inter text-[10px] text-slate-500 uppercase tracking-widest mt-1">Lead Architect (Escrow Agent)</p>
                  <p className="font-mono text-[8px] text-slate-400 mt-2">DATE: _________________</p>
                </div>
                <div>
                  <div className="h-16 border-b border-slate-800 mb-4"></div>
                  <p className="font-inter text-sm font-black uppercase tracking-wide">Favour Nheachika Amusonu</p>
                  <p className="font-inter text-[10px] text-slate-500 uppercase tracking-widest mt-1">CEO, Autoam Ltd.</p>
                  <p className="font-mono text-[8px] text-slate-400 mt-2">DATE: _________________</p>
                </div>
              </div>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}
