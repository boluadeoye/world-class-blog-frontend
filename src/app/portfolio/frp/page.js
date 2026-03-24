"use client";
import { useState, useEffect } from "react";
import { 
  Download, Crosshair, ShieldCheck, Cpu, Lock, 
  QrCode, Fingerprint, Hexagon, Activity, Database,
  Network, FileDigit, Sun
} from "lucide-react";

export default function FRPDossier() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "FRP_REALITY_ORACLE_SPEC_2026";
    window.print();
    document.title = originalTitle;
  };

  const coverImage = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774358327/blog_assets/dp93jwtbmt04u0kdr3hb.png";

  return (
    <div className="min-h-screen bg-black font-sans text-slate-300 selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* IMPORT LUXURY & TECHNICAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;0,900;1,400&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #000000 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            counter-reset: pageCounter;
          }
          body * { visibility: hidden; }
          #frp-render, #frp-render * { visibility: visible; }
          #frp-render { position: absolute; left: 0; top: 0; width: 100%; background: #000000; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #000000;
            box-sizing: border-box;
            overflow: hidden;
          }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* HUD ELEMENTS */
        .hud-corner-tl { border-top: 2px solid #10B981; border-left: 2px solid #10B981; width: 20px; height: 20px; position: absolute; top: 0; left: 0; }
        .hud-corner-tr { border-top: 2px solid #10B981; border-right: 2px solid #10B981; width: 20px; height: 20px; position: absolute; top: 0; right: 0; }
        .hud-corner-bl { border-bottom: 2px solid #10B981; border-left: 2px solid #10B981; width: 20px; height: 20px; position: absolute; bottom: 0; left: 0; }
        .hud-corner-br { border-bottom: 2px solid #10B981; border-right: 2px solid #10B981; width: 20px; height: 20px; position: absolute; bottom: 0; right: 0; }
        
        .glass-card {
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-black to-black"></div>
        
        <div className="relative z-10 w-full max-w-md glass-card p-10 text-center shadow-[0_0_50px_-10px_rgba(16,185,129,0.2)] border-t-4 border-emerald-500">
          <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 border border-emerald-500/50 rounded-full animate-[spin_4s_linear_infinite]"></div>
            <Fingerprint size={40} className="text-emerald-400" />
          </div>

          <h1 className="font-inter text-3xl font-black text-white mb-2 tracking-widest uppercase">FRP Oracle</h1>
          <p className="font-mono text-emerald-500 text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Forensic Reality Protocol</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-emerald-950/20 p-6 border-l-2 border-emerald-500 font-mono text-[10px] text-emerald-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; ESTABLISHING SECURE UPLINK...</p>
              <p className="opacity-75">&gt; DECRYPTING LENS TELEMETRY...</p>
              <p className="text-white font-bold animate-pulse">&gt; DOSSIER_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500 text-emerald-400 font-mono font-bold py-4 uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Download size={18} />
              Extract Dossier
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 4-PAGE DOSSIER (Print Only) === */}
      <div id="frp-render" className="hidden print:block text-slate-300">
        
        {/* PAGE 1: THE HERO COVER */}
        <div className="a4-page relative">
          {/* Full Bleed Background Image */}
          <div className="absolute inset-0 z-0">
            <img src={coverImage} alt="FRP Lens" className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
          </div>

          {/* CSS HUD OVERLAY */}
          <div className="absolute inset-[15mm] z-10 pointer-events-none">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>
            
            {/* Crosshair Center */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-500/30 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div className="absolute w-full h-px bg-emerald-500/30"></div>
              <div className="absolute h-full w-px bg-emerald-500/30"></div>
            </div>

            {/* Telemetry Data */}
            <div className="absolute top-4 right-4 font-mono text-[8px] text-emerald-400 text-right">
              <p>SYS.OP: OPTIMAL</p>
              <p>LAT: 6.5244 / LON: 3.3792</p>
              <p>REF_FRAME: 00492_X</p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-20 h-full flex flex-col p-[20mm]">
            <header className="flex justify-between items-start">
              <div className="font-mono text-[10px] text-emerald-500 tracking-[0.4em] border border-emerald-500/30 px-3 py-1 bg-black/50 backdrop-blur">
                FRP-RFC-2026-001
              </div>
            </header>

            <main className="grow flex flex-col justify-center mt-32">
              <p className="font-mono text-xs font-black text-emerald-500 uppercase tracking-[0.4em] mb-4">Forensic Reality Protocol</p>
              <h1 className="font-inter text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                The Reality<br/>Oracle
              </h1>
              <p className="font-inter text-sm font-medium text-slate-300 max-w-md border-l-2 border-emerald-500 pl-4 bg-black/40 backdrop-blur p-2">
                A deterministic cryptographic oracle anchoring digital media to physical reality via multi-plane evidence chains.
              </p>
            </main>

            {/* SLEEK NAME FORMATTING */}
            <footer className="mt-auto flex items-end">
              <div className="h-32 w-px bg-emerald-500 mr-6"></div>
              <div className="pb-2">
                <h2 className="font-playfair text-3xl font-black text-white uppercase tracking-[0.3em] mb-2">
                  Boluwatife Adeoye
                </h2>
                <p className="font-inter text-[10px] font-bold text-emerald-500 uppercase tracking-[0.4em]">
                  Lead Systems Architect
                </p>
              </div>
            </footer>
          </div>
        </div>

        {/* PAGE 2: THE ARCHITECTURE & AUDIT */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="INTERNAL USE ONLY // CLASSIFIED" />
          
          <main className="grow flex flex-col mt-8">
            <div className="grid grid-cols-12 gap-10">
              
              {/* Left Column: Metrics & History */}
              <div className="col-span-4 flex flex-col gap-8">
                <div className="glass-card p-6 border-t-4 border-emerald-500">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Technical Complexity</p>
                  <p className="font-mono text-4xl font-black text-white">9.1 <span className="text-sm text-emerald-500">/ 10</span></p>
                  <p className="font-inter text-[8px] text-emerald-400 mt-2 uppercase tracking-widest">Enterprise-Grade</p>
                </div>

                <div className="glass-card p-6">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-4">Document History</p>
                  <div className="space-y-4 font-mono text-[8px]">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-emerald-500">v1.0 (Jan 2024)</span>
                      <span className="text-slate-300">Initial Architecture</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-emerald-500">v1.1 (Nov 2025)</span>
                      <span className="text-slate-300">Security Hardening</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-emerald-500 font-bold">v1.2 (Mar 2026)</span>
                      <span className="text-white font-bold">Final Release</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 border-l-2 border-emerald-500">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Core Benchmark</p>
                  <p className="font-mono text-2xl font-black text-white">421ms</p>
                  <p className="font-inter text-[8px] text-emerald-400 mt-1 uppercase tracking-widest">End-to-End Latency</p>
                </div>
              </div>

              {/* Right Column: The 4 Planes */}
              <div className="col-span-8">
                <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-8">The 4-Plane Architecture</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-center text-emerald-400"><FileDigit size={20}/></div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1 uppercase">Plane 1: Binary Integrity</h3>
                      <p className="font-inter text-xs leading-relaxed text-slate-400">Performs a surgical 128KB strike on image headers. Direct memory inspection identifies hardware-level magic bytes, bypassing brittle third-party libraries.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-center text-emerald-400"><Sun size={20}/></div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1 uppercase">Plane 2: Physical Reality</h3>
                      <p className="font-inter text-xs leading-relaxed text-slate-400">Cross-references GPS/Timestamp metadata against astronomical ephemeris data. Calculates solar azimuth and altitude to verify physical possibility.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-center text-emerald-400"><Cpu size={20}/></div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1 uppercase">Plane 3: Cognitive Reasoning</h3>
                      <p className="font-inter text-xs leading-relaxed text-slate-400">Utilizes Llama 3.3 70B (Groq LPU) forced into a strict JSON schema. Cross-examines Binary and Physical planes to output deterministic reasoning codes.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-emerald-950/50 border border-emerald-500/50 flex items-center justify-center text-emerald-400"><Lock size={20}/></div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-emerald-400 mb-1 uppercase">Plane 4: Cryptographic Finality</h3>
                      <p className="font-inter text-xs leading-relaxed text-slate-400">Implements secp256k1 detached signatures. Every audit is sealed with a 'Super-Hash' committing the entire chain of custody to a mathematical seal.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: THE FORCE (PHYSICS & DIAGRAM) */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="PHYSICS SPECIFICATION & SYSTEM FLOW" />
          
          <main className="grow flex flex-col mt-8">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-6">The Ephemeris Thesis</h2>
            <p className="font-playfair text-xl italic text-emerald-400 mb-6">"The Sun Does Not Lie."</p>
            <p className="font-inter text-sm text-slate-400 mb-12 max-w-prose leading-relaxed">
              Digital metadata can be edited; pixels can be hallucinated by AI. However, the position of the sun at a specific coordinate on Earth at a specific millisecond is an immutable physical constant. FRP weaponizes the solar system as the ultimate second-factor authenticator.
            </p>

            {/* CSS DIAGRAM: NEURAL MESH */}
            <div className="glass-card p-8 mb-12 relative flex flex-col items-center">
              <p className="absolute top-4 left-4 font-mono text-[8px] text-emerald-500 uppercase tracking-widest">System Flow Schematic</p>
              
              <div className="flex items-center justify-between w-full max-w-lg mt-6">
                {/* Input */}
                <div className="border border-emerald-500 p-3 bg-black text-center w-24 z-10">
                  <Crosshair size={20} className="mx-auto text-emerald-400 mb-1"/>
                  <p className="font-mono text-[8px] text-white">Surgical Biopsy</p>
                </div>

                {/* The 4 Planes (Parallel) */}
                <div className="flex flex-col gap-2 z-10">
                  <div className="border border-emerald-500/50 bg-emerald-900/20 px-4 py-2 text-center font-mono text-[8px] text-emerald-300 flex items-center gap-2"><FileDigit size={12}/> Binary</div>
                  <div className="border border-emerald-500/50 bg-emerald-900/20 px-4 py-2 text-center font-mono text-[8px] text-emerald-300 flex items-center gap-2"><Sun size={12}/> Physical</div>
                  <div className="border border-emerald-500/50 bg-emerald-900/20 px-4 py-2 text-center font-mono text-[8px] text-emerald-300 flex items-center gap-2"><Cpu size={12}/> Cognitive</div>
                  <div className="border border-emerald-500/50 bg-emerald-900/20 px-4 py-2 text-center font-mono text-[8px] text-emerald-300 flex items-center gap-2"><Lock size={12}/> Crypto</div>
                </div>

                {/* Output */}
                <div className="border border-emerald-500 p-3 bg-black text-center w-24 z-10 shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                  <ShieldCheck size={20} className="mx-auto text-emerald-400 mb-1"/>
                  <p className="font-mono text-[8px] text-white">ECDSA Seal</p>
                </div>

                {/* Connecting Lines */}
                <div className="absolute top-1/2 left-24 w-[calc(100%-12rem)] h-px bg-emerald-500/30 -translate-y-1/2 z-0"></div>
              </div>
            </div>

            {/* PERFORMANCE TABLE */}
            <div className="glass-card">
              <div className="grid grid-cols-4 border-b border-emerald-500/30 bg-emerald-950/30 p-4 font-mono text-[10px] text-emerald-500 uppercase tracking-widest">
                <div>Stage</div><div>Process</div><div>Hardware</div><div className="text-right">Latency</div>
              </div>
              <div className="grid grid-cols-4 p-4 border-b border-white/5 font-mono text-xs text-slate-300 items-center">
                <div>01</div><div>Ingestion</div><div>WASM Edge</div><div className="text-right text-emerald-400 font-bold">20ms</div>
              </div>
              <div className="grid grid-cols-4 p-4 border-b border-white/5 font-mono text-xs text-slate-300 items-center">
                <div>02</div><div>Physics Calc</div><div>SunCalc Engine</div><div className="text-right text-emerald-400 font-bold">20ms</div>
              </div>
              <div className="grid grid-cols-4 p-4 border-b border-white/5 font-mono text-xs text-slate-300 items-center">
                <div>03</div><div>Cognitive Audit</div><div>Groq LPU</div><div className="text-right text-emerald-400 font-bold">370ms</div>
              </div>
              <div className="grid grid-cols-4 p-4 font-mono text-xs text-slate-300 items-center">
                <div>04</div><div>Crypto Signing</div><div>secp256k1</div><div className="text-right text-emerald-400 font-bold">11ms</div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: THE FINALITY (TRUST SEAL) */}
        <div className="a4-page flex flex-col p-[20mm] items-center justify-center text-center relative">
          
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
            <Hexagon size={600} className="text-emerald-500" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-md glass-card p-16 border-t-4 border-emerald-500">
            
            {/* QR Code Placeholder */}
            <div className="w-32 h-32 bg-white p-2 mb-6 flex items-center justify-center">
              <QrCode size={100} className="text-black" />
            </div>
            <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-12">Scan to Verify Live Deployment</p>

            {/* The APPROVED Stamp */}
            <div className="border-4 border-[#DC2626] text-[#DC2626] font-inter font-black text-5xl tracking-[0.4em] px-10 py-4 mb-16 transform -rotate-6 opacity-90 shadow-sm">
              APPROVED
            </div>

            {/* Signature Line */}
            <div className="w-full flex flex-col items-center">
              <div className="w-64 border-b border-slate-500 mb-4"></div>
              <h2 className="font-playfair text-2xl font-black text-white uppercase tracking-[0.2em]">Boluwatife Adeoye</h2>
              <p className="font-inter text-[10px] font-bold text-emerald-500 tracking-[0.4em] uppercase mt-2">Lead Systems Architect</p>
              
              <div className="mt-8 bg-black/50 border border-white/10 p-3 w-full">
                <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Signature Hash</p>
                <p className="font-mono text-[9px] text-slate-300 break-all">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Components
function Header({ title }) {
  return (
    <header className="flex justify-between items-end border-b border-emerald-500/30 pb-4 relative z-10">
      <h2 className="font-mono text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{title}</h2>
      <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">FRP-RFC-2026</div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto pt-4 border-t border-emerald-500/30 flex justify-between items-center relative z-10">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
        FORENSIC REALITY PROTOCOL // PAGE <span className="page-num text-emerald-500"></span>
      </span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-emerald-500"></div>
        <div className="w-1.5 h-1.5 bg-slate-500"></div>
      </div>
    </footer>
  );
}
