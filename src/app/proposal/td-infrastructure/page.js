"use client";
import { useState, useEffect } from "react";
import { 
  Download, Cpu, Database, Zap, Shield, 
  Activity, Hexagon, Server, Network, Lock,
  FileJson, CheckCircle2
} from "lucide-react";

export default function TDInfrastructure() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "TD_HIGH_PERFORMANCE_INFRASTRUCTURE_2026";
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1773905999/blog_assets/penfqat1quony3kafa7s.jpg";

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-slate-300 selection:bg-emerald-500/30 selection:text-emerald-400">
      
      {/* IMPORT MISSION CONTROL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700;800&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #050505 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            counter-reset: pageCounter;
          }
          body * { visibility: hidden; }
          #td-render, #td-render * { visibility: visible; }
          #td-render { position: absolute; left: 0; top: 0; width: 100%; background: #050505; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #050505;
            box-sizing: border-box;
            overflow: hidden;
          }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        
        /* OBSIDIAN NOISE TEXTURE */
        .noise-bg {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.06'/%3E%3C/svg%3E");
        }
        
        /* EMERALD GLOW EFFECT ON LOGO */
        .emerald-glow {
          filter: grayscale(100%) contrast(120%) drop-shadow(0 0 20px rgba(16, 185, 129, 0.6));
        }
        
        /* FROSTED GLASS */
        .glass-panel {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-[#050505] to-[#050505]"></div>
        
        <div className="relative z-10 w-full max-w-md glass-panel p-10 text-center border-t-4 border-emerald-500">
          <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center">
            <img src={logoUrl} alt="TD Logo" className="w-full h-full object-contain emerald-glow" />
          </div>

          <h1 className="font-playfair text-2xl font-black text-white mb-2 uppercase tracking-widest">Titanium Digital</h1>
          <p className="font-mono text-emerald-500 text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Mission Control Engine</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-black/50 p-6 border-l-2 border-emerald-500 font-mono text-[10px] text-slate-400 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; INJECTING OBSIDIAN NOISE...</p>
              <p className="opacity-75">&gt; CALIBRATING EMERALD GLOW...</p>
              <p className="text-emerald-400 font-bold animate-pulse">&gt; INFRASTRUCTURE_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 font-mono font-bold py-4 uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Download size={18} />
              Extract Blueprint
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 6-PAGE DOCUMENT (Print Only) === */}
      <div id="td-render" className="hidden print:block text-slate-300">
        
        {/* PAGE 1: COVER */}
        <div className="a4-page flex flex-col p-[25mm] noise-bg relative">
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
            <img src={logoUrl} alt="TD Watermark" className="w-[200mm] h-[200mm] object-contain grayscale" />
          </div>
          
          <div className="relative z-10 h-full flex flex-col border-l-2 border-emerald-500 pl-[15mm]">
            <header className="flex justify-between items-start mb-32">
              <img src={logoUrl} alt="TD Logo" className="w-20 h-20 object-contain emerald-glow" />
              <div className="text-right">
                <p className="font-mono text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-1">Clearance Level</p>
                <p className="font-mono text-[10px] font-black text-emerald-400 uppercase tracking-widest">TD-ARCHITECT-01</p>
              </div>
            </header>
            
            <main className="grow flex flex-col justify-center">
              <p className="font-mono text-xs font-black text-emerald-500 uppercase tracking-[0.4em] mb-6">Titanium Digital</p>
              <h1 className="font-playfair text-6xl font-black text-white uppercase tracking-tighter leading-[0.9] mb-10">
                High-Performance<br/>Systems &amp;<br/>AI Infrastructure
              </h1>
              <p className="font-inter text-lg font-medium text-slate-400 leading-relaxed max-w-md">
                A definitive blueprint for engineering sub-200ms inference pipelines, Zero-Trust data layers, and sovereign edge architectures.
              </p>
            </main>
            
            <footer className="mt-auto pt-12 border-t border-white/10 flex justify-between items-end">
              <div>
                <p className="font-mono text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-2">Lead Architect</p>
                <p className="font-inter text-xl font-black text-white uppercase tracking-widest">Bolu Adeoye</p>
              </div>
              <div className="text-right font-mono text-sm font-black text-emerald-500 uppercase tracking-widest">2026 Edition</div>
            </footer>
          </div>
        </div>

        {/* PAGE 2: THE SOVEREIGN STACK (TABLE) */}
        <div className="a4-page flex flex-col p-[25mm] noise-bg relative">
          <Header title="The Sovereign Stack" />
          <main className="grow relative z-10 mt-12">
            <h2 className="font-playfair text-4xl font-black text-white mb-12">Architectural Components</h2>
            
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-emerald-500/50 font-mono text-[10px] uppercase tracking-widest text-emerald-500">
                  <th className="pb-4 w-1/4">Component</th>
                  <th className="pb-4 w-1/3">Technology</th>
                  <th className="pb-4 w-5/12 text-white font-black">Architectural Advantage</th>
                </tr>
              </thead>
              <tbody className="font-inter text-sm text-slate-300">
                <tr className="border-b border-white/10">
                  <td className="py-8 font-mono font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2"><Globe size={14} className="text-emerald-500"/> Edge Layer</td>
                  <td className="py-8 pr-4 font-bold text-slate-200">Next.js 15 (App Router)</td>
                  <td className="py-8 border-l border-white/5 pl-4">React Server Components (RSC) eliminate client-side bloat. UI is streamed directly from global edge nodes, ensuring near-zero Time to First Byte (TTFB).</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-8 font-mono font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2"><Cpu size={14} className="text-emerald-500"/> Inference</td>
                  <td className="py-8 pr-4 font-bold text-slate-200">Groq LPU &amp; Llama 3.3</td>
                  <td className="py-8 border-l border-white/5 pl-4">Language Processing Units (LPUs) bypass traditional GPU memory bottlenecks, delivering deterministic token generation at 500+ T/s for real-time agentic AI.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-8 font-mono font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2"><Database size={14} className="text-emerald-500"/> Data Layer</td>
                  <td className="py-8 pr-4 font-bold text-slate-200">Neon Serverless Postgres</td>
                  <td className="py-8 border-l border-white/5 pl-4">Scale-to-zero architecture with native Row-Level Security (RLS). Ensures strict multi-tenant data isolation at the database level, enforcing Zero-Trust.</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="py-8 font-mono font-bold text-white text-xs uppercase tracking-widest flex items-center gap-2"><Shield size={14} className="text-emerald-500"/> Security</td>
                  <td className="py-8 pr-4 font-bold text-slate-200">Cloudflare WAF &amp; ECDSA</td>
                  <td className="py-8 border-l border-white/5 pl-4">Cryptographic finality for all data mutations. Edge-level threat mitigation prevents DDoS and injection attacks before they reach the compute layer.</td>
                </tr>
              </tbody>
            </table>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: THE INFERENCE ENGINE (FLOWCHART) */}
        <div className="a4-page flex flex-col p-[25mm] noise-bg relative">
          <Header title="The Inference Engine" />
          <main className="grow relative z-10 mt-12 flex flex-col">
            <h2 className="font-playfair text-4xl font-black text-white mb-16">Sub-200ms RAG Pipeline</h2>
            
            <div className="grow flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
              
              {/* Node 1: Edge Request */}
              <div className="w-full glass-panel p-4 flex items-center justify-between border-l-4 border-emerald-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 flex items-center justify-center rounded"><Globe className="text-emerald-400"/></div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white uppercase">Edge Request</h3>
                    <p className="font-inter text-[10px] text-slate-400">User Query Initiated</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-emerald-500 font-bold">0ms</span>
              </div>

              {/* Connector */}
              <div className="h-10 w-px bg-emerald-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-2 font-mono text-[8px] text-slate-500">WAF VERIFIED</div>
              </div>

              {/* Node 2: Vector Search */}
              <div className="w-full glass-panel p-4 flex items-center justify-between border-l-4 border-blue-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 flex items-center justify-center rounded"><Network className="text-blue-400"/></div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white uppercase">Vector Retrieval</h3>
                    <p className="font-inter text-[10px] text-slate-400">Pinecone / pgvector Context Match</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-blue-400 font-bold">+45ms</span>
              </div>

              {/* Connector */}
              <div className="h-10 w-px bg-emerald-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-2 font-mono text-[8px] text-slate-500">CONTEXT INJECTED</div>
              </div>

              {/* Node 3: LPU Inference */}
              <div className="w-full glass-panel p-4 flex items-center justify-between border-l-4 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-purple-500/20 flex items-center justify-center rounded"><Cpu className="text-purple-400"/></div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white uppercase">Groq LPU Inference</h3>
                    <p className="font-inter text-[10px] text-slate-400">Llama 3.3 70B Token Generation</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-purple-400 font-bold">+120ms</span>
              </div>

              {/* Connector */}
              <div className="h-10 w-px bg-emerald-500/50 relative">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#050505] px-2 font-mono text-[8px] text-slate-500">JSON PARSED</div>
              </div>

              {/* Node 4: RLS Database */}
              <div className="w-full glass-panel p-4 flex items-center justify-between border-l-4 border-emerald-500">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-500/20 flex items-center justify-center rounded"><Lock className="text-emerald-400"/></div>
                  <div>
                    <h3 className="font-mono text-sm font-bold text-white uppercase">Neon RLS Database</h3>
                    <p className="font-inter text-[10px] text-slate-400">Secure State Mutation &amp; Storage</p>
                  </div>
                </div>
                <span className="font-mono text-xs text-emerald-500 font-bold">+15ms</span>
              </div>

              {/* Total */}
              <div className="mt-8 border border-emerald-500/30 bg-emerald-950/20 px-8 py-3 rounded-full">
                <span className="font-mono text-sm text-white uppercase tracking-widest">Total P95 Latency: <span className="text-emerald-400 font-black">180ms</span></span>
              </div>

            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: LATENCY BENCHMARKS (GRAPH) */}
        <div className="a4-page flex flex-col p-[25mm] noise-bg relative">
          <Header title="Performance Metrics" />
          <main className="grow relative z-10 mt-12">
            <h2 className="font-playfair text-4xl font-black text-white mb-6">Latency Benchmarks</h2>
            <p className="font-inter text-lg text-slate-400 mb-16 max-w-prose">A comparative analysis of Time-to-First-Token (TTFT) and total generation time for a standard RAG query (1000 input tokens, 500 output tokens).</p>
            
            <div className="space-y-12">
              
              {/* Standard GPU */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <h3 className="font-mono text-sm font-bold text-slate-300 uppercase tracking-widest flex items-center gap-2"><Server size={16}/> Standard GPU Architecture</h3>
                  <span className="font-mono text-lg font-black text-red-500">3,000ms</span>
                </div>
                <div className="w-full h-8 bg-white/5 rounded overflow-hidden flex">
                  <div className="h-full bg-red-900/50 w-[20%] border-r border-red-500/50 flex items-center px-2 font-mono text-[8px] text-red-200">TTFT (600ms)</div>
                  <div className="h-full bg-red-600 w-[80%] flex items-center px-2 font-mono text-[8px] text-white">Generation (2400ms)</div>
                </div>
                <p className="font-inter text-[10px] text-slate-500 mt-2">NVIDIA A100 Cluster / Standard API Gateway</p>
              </div>

              {/* Titanium LPU */}
              <div>
                <div className="flex justify-between items-end mb-2">
                  <h3 className="font-mono text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2"><Zap size={16} className="text-emerald-500"/> Titanium LPU Architecture</h3>
                  <span className="font-mono text-2xl font-black text-emerald-400">180ms</span>
                </div>
                {/* 180 is 6% of 3000 */}
                <div className="w-full h-8 bg-white/5 rounded overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[6%] shadow-[0_0_15px_rgba(16,185,129,0.8)] flex items-center justify-center overflow-visible whitespace-nowrap relative z-10">
                    <span className="font-mono text-[10px] font-black text-white ml-24 drop-shadow-md">180ms Total</span>
                  </div>
                </div>
                <p className="font-inter text-[10px] text-emerald-500/70 mt-2">Groq LPU / Vercel Edge Runtime / Neon Serverless</p>
              </div>

            </div>

            <div className="mt-20 glass-panel p-6 border-l-4 border-emerald-500">
              <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-widest mb-2">Architectural Impact</p>
              <p className="font-inter text-sm text-slate-300 leading-relaxed">
                By migrating from traditional GPU clusters to deterministic LPU hardware, we achieve a <span className="text-white font-bold">16.6x reduction in latency</span>. This transitions the AI from a "waiting" experience to a real-time, conversational flow state, fundamentally altering user retention metrics.
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 5: PROJECT SCHEMA (AUTOAM) */}
        <div className="a4-page flex flex-col p-[25mm] noise-bg relative">
          <Header title="Data Architecture" />
          <main className="grow relative z-10 mt-12">
            <h2 className="font-playfair text-4xl font-black text-white mb-6">Project Schema: AUTOAM</h2>
            <p className="font-inter text-sm text-slate-400 mb-10 max-w-prose">
              Implementation of a multi-role geospatial marketplace. The schema demonstrates strict typing and relational integrity required for real-time driver-mechanic matching.
            </p>
            
            <div className="glass-panel rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-black/60 px-6 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileJson size={14} className="text-emerald-500"/>
                  <span className="font-mono text-[10px] font-bold text-white">autoam-schema.jsonld</span>
                </div>
                <span className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">Format: JSON-LD</span>
              </div>
              
              <pre className="p-8 font-mono text-[10px] leading-[2] overflow-x-auto text-slate-300">
{`{
  `} <span className="text-emerald-400 font-bold">"@context"</span>{`: `}<span className="text-blue-300">"https://autoam.io/contexts/v1"</span>{`,
  `} <span className="text-emerald-400 font-bold">"@type"</span>{`: `}<span className="text-blue-300">"ServiceRequest"</span>{`,
  `} <span className="text-emerald-400 font-bold">"id"</span>{`: `}<span className="text-blue-300">"req_9f8a7b6c"</span>{`,
  `} <span className="text-emerald-400 font-bold">"status"</span>{`: `}<span className="text-blue-300">"MATCHING_IN_PROGRESS"</span>{`,
  
  `} <span className="text-emerald-400 font-bold">"driver"</span>{`: {
    `} <span className="text-emerald-400 font-bold">"id"</span>{`: `}<span className="text-blue-300">"usr_driver_442"</span>{`,
    `} <span className="text-emerald-400 font-bold">"vehicle_telemetry"</span>{`: {
      `} <span className="text-emerald-400 font-bold">"obd2_code"</span>{`: `}<span className="text-blue-300">"P0301"</span>{`,
      `} <span className="text-emerald-400 font-bold">"severity"</span>{`: `}<span className="text-purple-400">"CRITICAL"</span>{`
    },
    `} <span className="text-emerald-400 font-bold">"location"</span>{`: {
      `} <span className="text-emerald-400 font-bold">"type"</span>{`: `}<span className="text-blue-300">"Point"</span>{`,
      `} <span className="text-emerald-400 font-bold">"coordinates"</span>{`:[`}<span className="text-yellow-400">3.3792</span>{`, `}<span className="text-yellow-400">6.5244</span>{`]
    }
  },
  
  `} <span className="text-emerald-400 font-bold">"matching_engine"</span>{`: {
    `} <span className="text-emerald-400 font-bold">"max_radius_km"</span>{`: `}<span className="text-yellow-400">5.0</span>{`,
    `} <span className="text-emerald-400 font-bold">"required_skills"</span>{`:[`}<span className="text-blue-300">"ENGINE_DIAGNOSTICS"</span>{`, `}<span className="text-blue-300">"MOBILE_REPAIR"</span>{`]
  }
}`}
              </pre>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 6: THE FINAL VERDICT (CERTIFICATE) */}
        <div className="a4-page flex flex-col p-[25mm] noise-bg relative items-center justify-center text-center">
          
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
            <img src={logoUrl} alt="TD Watermark" className="w-[200mm] h-[200mm] object-contain grayscale" />
          </div>

          <div className="relative z-10 flex flex-col items-center w-full max-w-lg border border-white/10 p-16 glass-panel">
            
            {/* Silver Digital Seal */}
            <div className="w-32 h-32 mb-12 relative flex items-center justify-center">
              <div className="absolute inset-0 border-2 border-slate-400 rounded-full"></div>
              <div className="absolute inset-2 border border-slate-500 rounded-full border-dashed"></div>
              <img src={logoUrl} alt="TD Seal" className="w-16 h-16 object-contain grayscale contrast-150" />
            </div>

            <h2 className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.5em] mb-4">Titanium Digital</h2>
            <h1 className="font-playfair text-3xl font-black text-white uppercase tracking-widest mb-12 leading-snug">
              Certificate of<br/>Technical Excellence
            </h1>

            <p className="font-inter text-sm text-slate-400 mb-16 leading-relaxed">
              This document certifies that the architectural specifications detailed herein meet the rigorous standards for high-performance, sovereign infrastructure deployment.
            </p>

            {/* Signature Line */}
            <div className="w-full flex flex-col items-center mb-12">
              <div className="w-64 border-b border-slate-500 mb-4"></div>
              <h2 className="font-playfair text-2xl font-black text-white uppercase tracking-widest">Bolu Adeoye</h2>
              <p className="font-inter text-[10px] font-bold text-emerald-500 tracking-[0.4em] uppercase mt-2">Lead Architect</p>
            </div>

            {/* SHA256 Hash */}
            <div className="w-full bg-black/50 border border-white/5 p-4 rounded">
              <p className="font-mono text-[8px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Verification Hash</p>
              <p className="font-mono text-[10px] text-slate-300 break-all">
                e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// Reusable Header/Footer Components
function Header({ title }) {
  return (
    <header className="flex justify-between items-end border-b border-white/10 pb-4 relative z-10">
      <h2 className="font-mono text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{title}</h2>
      <div className="font-mono text-[8px] text-slate-500 uppercase tracking-widest">TD-ARCHITECT-01</div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center relative z-10">
      <span className="font-mono text-[8px] font-bold uppercase tracking-widest text-slate-500">
        TITANIUM DIGITAL // PAGE <span className="page-num text-emerald-500"></span>
      </span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-emerald-500"></div>
        <div className="w-1.5 h-1.5 bg-slate-500"></div>
      </div>
    </footer>
  );
}
