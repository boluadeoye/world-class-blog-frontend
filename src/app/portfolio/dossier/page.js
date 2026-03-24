"use client";
import { useState, useEffect } from "react";
import { 
  Download, QrCode, ShieldCheck, Terminal, 
  Zap, Database, Globe, Layers, CheckCircle2, 
  Briefcase, Hexagon, Crosshair
} from "lucide-react";

export default function SovereignDossier() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "BOLU_ADEOYE_SOVEREIGN_DOSSIER_2026";
    window.print();
    document.title = originalTitle;
  };

  const coverImage = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774360591/blog_assets/zbszehgkonozbe6jqkpm.png";

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-slate-900 selection:bg-red-200 selection:text-red-900">
      
      {/* IMPORT LUXURY & TECHNICAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;0,900;1,400&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #F9F9F9 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            counter-reset: pageCounter;
          }
          body * { visibility: hidden; }
          #dossier-render, #dossier-render * { visibility: visible; }
          #dossier-render { position: absolute; left: 0; top: 0; width: 100%; background: #F9F9F9; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #F9F9F9;
            box-sizing: border-box;
            overflow: hidden;
          }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* 1% PAPER GRAIN TEXTURE */
        .paper-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-10 text-center shadow-2xl border-t-4 border-[#DC2626]">
          <div className="w-24 h-24 mx-auto mb-8 relative flex items-center justify-center bg-slate-50 rounded-full border border-slate-200">
            <Briefcase size={40} className="text-[#0F172A]" />
          </div>

          <h1 className="font-playfair text-3xl font-black text-[#0F172A] mb-2 tracking-widest uppercase">The Dossier</h1>
          <p className="font-mono text-[#DC2626] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Master Architectural CV</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-6 border-l-2 border-[#DC2626] font-mono text-[10px] text-slate-500 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; INJECTING PAPER GRAIN...</p>
              <p className="opacity-75">&gt; ALIGNING SWISS GRID...</p>
              <p className="text-[#0F172A] font-bold animate-pulse">&gt; DOSSIER_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-mono font-bold py-4 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Extract Dossier
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 4-PAGE DOSSIER (Print Only) === */}
      <div id="dossier-render" className="hidden print:block text-[#0F172A]">
        
        {/* PAGE 1: THE HERO COVER */}
        <div className="a4-page relative paper-grain">
          {/* Full Bleed Background Image */}
          <div className="absolute inset-0 z-0 h-[65%]">
            <img src={coverImage} alt="Architectural Foundation" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F9F9F9]"></div>
          </div>

          {/* CSS HUD OVERLAY (Minimalist) */}
          <div className="absolute inset-[15mm] z-10 pointer-events-none">
            <div className="absolute top-4 right-4 font-mono text-[8px] text-white text-right drop-shadow-md">
              <p>ID: BA-ARCH-2026</p>
              <p>STATUS: VERIFIED</p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-20 h-full flex flex-col p-[20mm]">
            <header className="flex justify-between items-start">
              <div className="font-mono text-[10px] text-white tracking-[0.4em] border border-white/30 px-3 py-1 bg-black/30 backdrop-blur">
                CONFIDENTIAL
              </div>
            </header>

            <main className="grow flex flex-col justify-end pb-20">
              <p className="font-mono text-xs font-black text-[#DC2626] uppercase tracking-[0.4em] mb-4">The Sovereign Dossier</p>
              <h1 className="font-playfair text-7xl font-black text-[#0F172A] uppercase tracking-tighter leading-[0.85] mb-6">
                Master<br/>Specification
              </h1>
              <p className="font-inter text-sm font-medium text-slate-600 max-w-md">
                A technical specification of a 99th-percentile engineer. Specializing in high-throughput inference engines, geospatial logistics, and sovereign infrastructure.
              </p>
            </main>

            {/* SLEEK NAME FORMATTING */}
            <footer className="mt-auto flex items-end">
              <div className="h-40 w-[2px] bg-[#DC2626] mr-6"></div>
              <div className="pb-2">
                <h2 className="font-playfair text-4xl font-black text-[#0F172A] uppercase tracking-[0.4em] mb-2">
                  Boluwatife Adeoye
                </h2>
                <p className="font-inter text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em]">
                  Lead Systems Architect
                </p>
              </div>
            </footer>
          </div>
        </div>

        {/* PAGE 2: THE EXECUTIVE ANOMALY & SKILLS */}
        <div className="a4-page flex flex-col p-[20mm] paper-grain">
          <Header title="EXECUTIVE PROFILE & ARSENAL" />
          
          <main className="grow flex flex-col mt-8">
            <h2 className="font-playfair text-4xl font-black text-[#0F172A] uppercase tracking-widest mb-8">The Executive Anomaly</h2>
            
            <div className="bg-white border border-slate-200 p-8 shadow-sm mb-12 border-l-4 border-l-[#DC2626]">
              <p className="font-inter text-sm leading-relaxed text-justify text-slate-700">
                I do not write code; I architect sovereign systems. As a Lead Systems Architect, I specialize in bridging the gap between complex mathematical models (AI/Cryptography) and enterprise-scale deployment. My engineering doctrine is built on US/Silicon Valley standards: Zero-Trust security, sub-200ms inference latency, and scale-to-zero serverless infrastructure. I transition raw industrial data into actionable, agentic intelligence.
              </p>
            </div>

            <h2 className="font-playfair text-3xl font-black text-[#0F172A] uppercase tracking-widest mb-8">Technical Arsenal</h2>
            
            <div className="grid grid-cols-3 gap-8">
              {/* Column 1 */}
              <div>
                <div className="flex items-center gap-2 mb-4 border-b-2 border-[#0F172A] pb-2">
                  <Globe size={16} className="text-[#DC2626]"/>
                  <h3 className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-widest">Edge & Interface</h3>
                </div>
                <ul className="space-y-3 font-inter text-xs text-slate-600 font-medium">
                  <li>Next.js 15 (App Router)</li>
                  <li>React Server Components</li>
                  <li>Tailwind CSS / Framer</li>
                  <li>Cloudflare Edge / WAF</li>
                </ul>
              </div>

              {/* Column 2 */}
              <div>
                <div className="flex items-center gap-2 mb-4 border-b-2 border-[#0F172A] pb-2">
                  <Zap size={16} className="text-[#DC2626]"/>
                  <h3 className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-widest">AI & Inference</h3>
                </div>
                <ul className="space-y-3 font-inter text-xs text-slate-600 font-medium">
                  <li>Groq LPU Optimization</li>
                  <li>Llama 3.3 / OpenAI</li>
                  <li>RAG Pipelines</li>
                  <li>Vector Databases (Pinecone)</li>
                </ul>
              </div>

              {/* Column 3 */}
              <div>
                <div className="flex items-center gap-2 mb-4 border-b-2 border-[#0F172A] pb-2">
                  <Database size={16} className="text-[#DC2626]"/>
                  <h3 className="font-mono text-xs font-bold text-[#0F172A] uppercase tracking-widest">Data & Security</h3>
                </div>
                <ul className="space-y-3 font-inter text-xs text-slate-600 font-medium">
                  <li>Neon Serverless Postgres</li>
                  <li>Row-Level Security (RLS)</li>
                  <li>PostGIS (Geospatial)</li>
                  <li>ECDSA Cryptography</li>
                </ul>
              </div>
            </div>

            <div className="mt-auto grid grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 border border-slate-200">
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Workflow Standard</p>
                <p className="font-inter text-lg font-black text-[#0F172A]">Remote Async / CI-CD</p>
              </div>
              <div className="bg-slate-50 p-6 border border-slate-200">
                <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest mb-2">Market Valuation</p>
                <p className="font-inter text-lg font-black text-[#DC2626]">Tier-1 Architect</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: ARCHITECTURAL DEPLOYMENTS */}
        <div className="a4-page flex flex-col p-[20mm] paper-grain">
          <Header title="ARCHITECTURAL DEPLOYMENTS" />
          
          <main className="grow flex flex-col mt-8">
            <h2 className="font-playfair text-4xl font-black text-[#0F172A] uppercase tracking-widest mb-10">System Deployments</h2>
            
            <div className="space-y-10 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              
              {/* Deployment 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-[#DC2626] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-6 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-inter font-black text-lg text-[#0F172A] uppercase">FRP: Reality Oracle</h3>
                    <span className="font-mono text-[9px] bg-slate-100 px-2 py-1 text-slate-500 font-bold">2026</span>
                  </div>
                  <p className="font-mono text-[10px] text-[#DC2626] uppercase tracking-widest mb-3">Lead Architect</p>
                  <p className="font-inter text-xs text-slate-600 leading-relaxed mb-3">
                    Architected a deterministic cryptographic oracle anchoring digital media to physical reality. Replaced probabilistic AI vision with a multi-plane evidence chain.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5">WASM</span>
                    <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5">SunCalc</span>
                    <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5">secp256k1</span>
                  </div>
                </div>
              </div>

              {/* Deployment 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-[#0F172A] text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-6 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-inter font-black text-lg text-[#0F172A] uppercase">ExamForge Core</h3>
                    <span className="font-mono text-[9px] bg-slate-100 px-2 py-1 text-slate-500 font-bold">2025</span>
                  </div>
                  <p className="font-mono text-[10px] text-[#DC2626] uppercase tracking-widest mb-3">Systems Architect</p>
                  <p className="font-inter text-xs text-slate-600 leading-relaxed mb-3">
                    Engineered a Zero-Trust data layer using Neon RLS, ensuring database-level multi-tenancy. Orchestrated a high-concurrency engine supporting 30,000+ learners.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5">Neon RLS</span>
                    <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5">Next.js 15</span>
                  </div>
                </div>
              </div>

              {/* Deployment 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-slate-400 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10"></div>
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] bg-white p-6 border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-inter font-black text-lg text-[#0F172A] uppercase">Digital Consciousness</h3>
                    <span className="font-mono text-[9px] bg-slate-100 px-2 py-1 text-slate-500 font-bold">2024</span>
                  </div>
                  <p className="font-mono text-[10px] text-[#DC2626] uppercase tracking-widest mb-3">Lead AI Engineer</p>
                  <p className="font-inter text-xs text-slate-600 leading-relaxed mb-3">
                    Architected a recursive AI agent achieving sub-200ms P95 latency using Groq LPU. Optimized infrastructure costs by 80% using a scale-to-zero serverless stack.
                  </p>
                  <div className="flex gap-2">
                    <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5">Groq LPU</span>
                    <span className="text-[8px] font-mono bg-slate-100 px-1.5 py-0.5">Vector DB</span>
                  </div>
                </div>
              </div>

            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: THE FINALITY (TRUST SEAL) */}
        <div className="a4-page flex flex-col p-[20mm] paper-grain items-center justify-center text-center relative">
          
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
            <Hexagon size={600} className="text-[#0F172A]" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-md bg-white p-16 border border-slate-200 shadow-2xl border-t-4 border-t-[#DC2626]">
            
            {/* QR Code */}
            <div className="w-32 h-32 bg-white border-4 border-[#0F172A] p-2 mb-6 flex items-center justify-center">
              <QrCode size={100} className="text-[#0F172A]" />
            </div>
            <p className="font-mono text-[10px] text-[#0F172A] font-bold uppercase tracking-widest mb-12">Scan to Verify Live Deployment</p>

            {/* The APPROVED Stamp */}
            <div className="border-4 border-[#DC2626] text-[#DC2626] font-inter font-black text-5xl tracking-[0.4em] px-10 py-4 mb-16 transform -rotate-6 opacity-90 shadow-sm">
              APPROVED
            </div>

            {/* Signature Line */}
            <div className="w-full flex flex-col items-center">
              <div className="w-64 border-b-2 border-[#0F172A] mb-4"></div>
              <h2 className="font-playfair text-2xl font-black text-[#0F172A] uppercase tracking-[0.2em]">Boluwatife Adeoye</h2>
              <p className="font-inter text-[10px] font-bold text-[#DC2626] tracking-[0.4em] uppercase mt-2">Lead Systems Architect</p>
              
              <div className="mt-8 bg-slate-50 border border-slate-200 p-3 w-full">
                <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Signature Hash</p>
                <p className="font-mono text-[9px] text-[#0F172A] font-bold break-all">
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
    <header className="flex justify-between items-end border-b border-slate-200 pb-4 relative z-10">
      <h2 className="font-mono text-[10px] font-bold text-[#0F172A] uppercase tracking-widest">{title}</h2>
      <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">BA-ARCH-2026</div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center relative z-10">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-400">
        SOVEREIGN DOSSIER // PAGE <span className="page-num text-[#0F172A]"></span>
      </span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-[#DC2626]"></div>
        <div className="w-1.5 h-1.5 bg-[#0F172A]"></div>
      </div>
    </footer>
  );
}
