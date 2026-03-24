"use client";
import { useState, useEffect } from "react";
import { 
  Download, Server, ShieldCheck, Database, Lock, 
  QrCode, Network, Activity, Users, Layers,
  CheckCircle2, Zap
} from "lucide-react";

export default function ExamForgeDossier() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "EXAMFORGE_ENTERPRISE_SPEC_2026";
    window.print();
    document.title = originalTitle;
  };

  const coverImage = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774359276/blog_assets/skpl2iwf5xs1yrb7wzbl.png";

  return (
    <div className="min-h-screen bg-[#020617] font-sans text-slate-300 selection:bg-blue-500/30 selection:text-blue-400">
      
      {/* IMPORT LUXURY & TECHNICAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;0,900;1,400&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #020617 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            counter-reset: pageCounter;
          }
          body * { visibility: hidden; }
          #examforge-render, #examforge-render * { visibility: visible; }
          #examforge-render { position: absolute; left: 0; top: 0; width: 100%; background: #020617; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #020617;
            box-sizing: border-box;
            overflow: hidden;
          }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* HUD ELEMENTS - CORPORATE BLUE */
        .hud-corner-tl { border-top: 2px solid #3B82F6; border-left: 2px solid #3B82F6; width: 20px; height: 20px; position: absolute; top: 0; left: 0; }
        .hud-corner-tr { border-top: 2px solid #3B82F6; border-right: 2px solid #3B82F6; width: 20px; height: 20px; position: absolute; top: 0; right: 0; }
        .hud-corner-bl { border-bottom: 2px solid #3B82F6; border-left: 2px solid #3B82F6; width: 20px; height: 20px; position: absolute; bottom: 0; left: 0; }
        .hud-corner-br { border-bottom: 2px solid #3B82F6; border-right: 2px solid #3B82F6; width: 20px; height: 20px; position: absolute; bottom: 0; right: 0; }
        
        .glass-card {
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(59, 130, 246, 0.2);
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#020617] to-[#020617]"></div>
        
        <div className="relative z-10 w-full max-w-md glass-card p-10 text-center shadow-[0_0_50px_-10px_rgba(59,130,246,0.2)] border-t-4 border-blue-500">
          <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 border border-blue-500/50 rounded-full animate-[spin_6s_linear_infinite]"></div>
            <Server size={40} className="text-blue-400" />
          </div>

          <h1 className="font-inter text-3xl font-black text-white mb-2 tracking-widest uppercase">ExamForge</h1>
          <p className="font-mono text-blue-500 text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Enterprise Assessment Infrastructure</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-blue-950/20 p-6 border-l-2 border-blue-500 font-mono text-[10px] text-blue-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; ESTABLISHING SECURE UPLINK...</p>
              <p className="opacity-75">&gt; VERIFYING RLS POLICIES...</p>
              <p className="text-white font-bold animate-pulse">&gt; DOSSIER_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500 text-blue-400 font-mono font-bold py-4 uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Download size={18} />
              Extract Dossier
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 4-PAGE DOSSIER (Print Only) === */}
      <div id="examforge-render" className="hidden print:block text-slate-300">
        
        {/* PAGE 1: THE HERO COVER */}
        <div className="a4-page relative">
          {/* Full Bleed Background Image */}
          <div className="absolute inset-0 z-0">
            <img src={coverImage} alt="ExamForge Glass Nodes" className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617]"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/80 via-transparent to-transparent"></div>
          </div>

          {/* CSS HUD OVERLAY */}
          <div className="absolute inset-[15mm] z-10 pointer-events-none">
            <div className="hud-corner-tl"></div>
            <div className="hud-corner-tr"></div>
            <div className="hud-corner-bl"></div>
            <div className="hud-corner-br"></div>
            
            {/* Telemetry Data */}
            <div className="absolute top-4 right-4 font-mono text-[8px] text-blue-400 text-right">
              <p>SYS.OP: ENTERPRISE_SCALE</p>
              <p>CONCURRENT_NODES: 30,000+</p>
              <p>RLS_STATUS: SECURE</p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-20 h-full flex flex-col p-[20mm]">
            <header className="flex justify-between items-start">
              <div className="font-mono text-[10px] text-blue-500 tracking-[0.4em] border border-blue-500/30 px-3 py-1 bg-[#020617]/50 backdrop-blur">
                EF-ENT-2026-002
              </div>
            </header>

            <main className="grow flex flex-col justify-center mt-32">
              <p className="font-mono text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Enterprise Infrastructure</p>
              <h1 className="font-inter text-7xl font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                ExamForge<br/>Core
              </h1>
              <p className="font-inter text-sm font-medium text-slate-300 max-w-md border-l-2 border-blue-500 pl-4 bg-[#020617]/40 backdrop-blur p-2">
                A high-concurrency assessment engine architected for institutional scale, featuring Zero-Trust data isolation and sub-second latency.
              </p>
            </main>

            {/* SLEEK NAME FORMATTING */}
            <footer className="mt-auto flex items-end">
              <div className="h-32 w-px bg-blue-500 mr-6"></div>
              <div className="pb-2">
                <h2 className="font-playfair text-3xl font-black text-white uppercase tracking-[0.3em] mb-2">
                  Boluwatife Adeoye
                </h2>
                <p className="font-inter text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em]">
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
                <div className="glass-card p-6 border-t-4 border-blue-500">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Concurrency Limit</p>
                  <p className="font-mono text-4xl font-black text-white">30k<span className="text-sm text-blue-500">+</span></p>
                  <p className="font-inter text-[8px] text-blue-400 mt-2 uppercase tracking-widest">Simultaneous Users</p>
                </div>

                <div className="glass-card p-6">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-4">Document History</p>
                  <div className="space-y-4 font-mono text-[8px]">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-blue-500">v1.0 (Feb 2024)</span>
                      <span className="text-slate-300">Initial Architecture</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-blue-500">v1.1 (Dec 2025)</span>
                      <span className="text-slate-300">RLS Implementation</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-500 font-bold">v1.2 (Mar 2026)</span>
                      <span className="text-white font-bold">Final Release</span>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-6 border-l-2 border-blue-500">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Uptime Guarantee</p>
                  <p className="font-mono text-2xl font-black text-white">99.99%</p>
                  <p className="font-inter text-[8px] text-blue-400 mt-1 uppercase tracking-widest">SLA Standard</p>
                </div>
              </div>

              {/* Right Column: The Enterprise Stack */}
              <div className="col-span-8">
                <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-8">The Enterprise Stack</h2>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-blue-950/50 border border-blue-500/50 flex items-center justify-center text-blue-400"><Globe size={20}/></div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-blue-400 mb-1 uppercase">Edge Delivery (Next.js 15)</h3>
                      <p className="font-inter text-xs leading-relaxed text-slate-400">Utilizes React Server Components (RSC) to stream UI directly from global edge nodes. Eliminates client-side bloat and ensures near-zero Time to First Byte (TTFB) for global learners.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-blue-950/50 border border-blue-500/50 flex items-center justify-center text-blue-400"><Database size={20}/></div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-blue-400 mb-1 uppercase">Data Sovereignty (Neon Postgres)</h3>
                      <p className="font-inter text-xs leading-relaxed text-slate-400">Scale-to-zero serverless architecture. Handles massive, unpredictable traffic spikes during national examination windows without provisioning permanent, expensive infrastructure.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-blue-950/50 border border-blue-500/50 flex items-center justify-center text-blue-400"><Lock size={20}/></div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-blue-400 mb-1 uppercase">Zero-Trust Security (RLS)</h3>
                      <p className="font-inter text-xs leading-relaxed text-slate-400">Row-Level Security enforced directly at the database layer. Ensures strict multi-tenant data isolation, preventing cross-institutional data leakage even if the API layer is compromised.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 shrink-0 bg-blue-950/50 border border-blue-500/50 flex items-center justify-center text-blue-400"><Activity size={20}/></div>
                    <div>
                      <h3 className="font-mono text-sm font-bold text-blue-400 mb-1 uppercase">Real-Time Analytics</h3>
                      <p className="font-inter text-xs leading-relaxed text-slate-400">High-throughput data ingestion layer capable of processing real-time performance analytics and anti-cheat telemetry for 30,000+ concurrent sessions.</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: THE DATA FORTRESS (DIAGRAM) */}
        <div className="a4-page flex flex-col p-[20mm]">
          <Header title="SECURITY SPECIFICATION & SYSTEM FLOW" />
          
          <main className="grow flex flex-col mt-8">
            <h2 className="font-inter text-3xl font-black text-white uppercase tracking-widest mb-6">The Data Fortress</h2>
            <p className="font-playfair text-xl italic text-blue-400 mb-6">"Security is not a feature; it is the architecture."</p>
            <p className="font-inter text-sm text-slate-400 mb-12 max-w-prose leading-relaxed">
              In an enterprise assessment environment, data integrity is paramount. ExamForge implements a Zero-Trust model where identity verification and data access are cryptographically bound at the lowest possible level.
            </p>

            {/* CSS DIAGRAM: THE RLS FORTRESS */}
            <div className="glass-card p-8 mb-12 relative flex flex-col items-center">
              <p className="absolute top-4 left-4 font-mono text-[8px] text-blue-500 uppercase tracking-widest">Multi-Tenant Isolation Schematic</p>
              
              <div className="flex flex-col items-center w-full max-w-md mt-8 gap-6">
                
                {/* The API Gateway */}
                <div className="w-full border border-blue-500/50 bg-blue-900/20 p-4 text-center flex items-center justify-center gap-3">
                  <Network size={16} className="text-blue-400"/>
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest">API Gateway (Next.js Edge)</span>
                </div>

                {/* The RLS Shield */}
                <div className="w-full border-y-2 border-dashed border-blue-500 py-4 text-center relative">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#020617] px-4 flex items-center gap-2">
                    <Lock size={16} className="text-blue-500"/>
                    <span className="font-mono text-[10px] text-blue-500 font-bold uppercase tracking-widest">Row-Level Security (RLS)</span>
                  </div>
                </div>

                {/* The Isolated Tenants */}
                <div className="flex justify-between w-full gap-4">
                  <div className="grow border border-slate-700 bg-black p-4 text-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <Users size={16} className="mx-auto text-slate-400 mb-2"/>
                    <p className="font-mono text-[8px] text-white">Institution A</p>
                    <p className="font-mono text-[6px] text-slate-500 mt-1">ISOLATED</p>
                  </div>
                  <div className="grow border border-slate-700 bg-black p-4 text-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <Users size={16} className="mx-auto text-slate-400 mb-2"/>
                    <p className="font-mono text-[8px] text-white">Institution B</p>
                    <p className="font-mono text-[6px] text-slate-500 mt-1">ISOLATED</p>
                  </div>
                  <div className="grow border border-slate-700 bg-black p-4 text-center shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <Users size={16} className="mx-auto text-slate-400 mb-2"/>
                    <p className="font-mono text-[8px] text-white">Institution C</p>
                    <p className="font-mono text-[6px] text-slate-500 mt-1">ISOLATED</p>
                  </div>
                </div>

              </div>
            </div>

            {/* SCALING METRICS */}
            <div className="glass-card">
              <div className="grid grid-cols-3 border-b border-blue-500/30 bg-blue-950/30 p-4 font-mono text-[10px] text-blue-500 uppercase tracking-widest">
                <div>Metric</div><div>Legacy Architecture</div><div className="text-right">ExamForge Architecture</div>
              </div>
              <div className="grid grid-cols-3 p-4 border-b border-white/5 font-mono text-xs text-slate-300 items-center">
                <div>Infrastructure Cost</div><div>Linear Scaling ($$$)</div><div className="text-right text-blue-400 font-bold">Scale-to-Zero ($)</div>
              </div>
              <div className="grid grid-cols-3 p-4 border-b border-white/5 font-mono text-xs text-slate-300 items-center">
                <div>Data Isolation</div><div>Application Logic (Vulnerable)</div><div className="text-right text-blue-400 font-bold">Database RLS (Secure)</div>
              </div>
              <div className="grid grid-cols-3 p-4 font-mono text-xs text-slate-300 items-center">
                <div>Max Concurrency</div><div>~5,000 (Bottlenecked)</div><div className="text-right text-blue-400 font-bold">30,000+ (Elastic)</div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: THE FINALITY (TRUST SEAL) */}
        <div className="a4-page flex flex-col p-[20mm] items-center justify-center text-center relative">
          
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
            <Layers size={600} className="text-blue-500" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-md glass-card p-16 border-t-4 border-blue-500">
            
            {/* QR Code Placeholder */}
            <div className="w-32 h-32 bg-white p-2 mb-6 flex items-center justify-center">
              <QrCode size={100} className="text-black" />
            </div>
            <p className="font-mono text-[10px] text-blue-500 uppercase tracking-widest mb-12">Scan to Verify Live Deployment</p>

            {/* The APPROVED Stamp */}
            <div className="border-4 border-[#DC2626] text-[#DC2626] font-inter font-black text-5xl tracking-[0.4em] px-10 py-4 mb-16 transform -rotate-6 opacity-90 shadow-sm">
              APPROVED
            </div>

            {/* Signature Line */}
            <div className="w-full flex flex-col items-center">
              <div className="w-64 border-b border-slate-500 mb-4"></div>
              <h2 className="font-playfair text-2xl font-black text-white uppercase tracking-[0.2em]">Boluwatife Adeoye</h2>
              <p className="font-inter text-[10px] font-bold text-blue-500 tracking-[0.4em] uppercase mt-2">Lead Systems Architect</p>
              
              <div className="mt-8 bg-black/50 border border-white/10 p-3 w-full">
                <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Signature Hash</p>
                <p className="font-mono text-[9px] text-slate-300 break-all">
                  a7f8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8
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
    <header className="flex justify-between items-end border-b border-blue-500/30 pb-4 relative z-10">
      <h2 className="font-mono text-[10px] font-bold text-blue-500 uppercase tracking-widest">{title}</h2>
      <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">EF-ENT-2026</div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto pt-4 border-t border-blue-500/30 flex justify-between items-center relative z-10">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
        EXAMFORGE ENTERPRISE // PAGE <span className="page-num text-blue-500"></span>
      </span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-blue-500"></div>
        <div className="w-1.5 h-1.5 bg-slate-500"></div>
      </div>
    </footer>
  );
}
