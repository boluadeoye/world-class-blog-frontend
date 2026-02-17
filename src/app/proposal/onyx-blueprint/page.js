"use client";
import { Download, ArrowLeft, Shield, Zap, Globe, Lock, Cpu, Layers, Activity, Smartphone } from "lucide-react";
import Link from "next/link";

export default function OnyxBlueprint() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "ONYX_SOVEREIGN_ARCHITECTURAL_BLUEPRINT_V1";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-black font-mono text-white selection:bg-red-900 selection:text-white">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: black !important; -webkit-print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container {
            position: absolute;
            left: 0; top: 0; width: 100%;
            margin: 0; padding: 0;
            background: black;
            color: white;
          }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; display: block; height: 0; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: TERMINAL PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="relative z-10 w-full max-w-md bg-black border border-white/20 p-8 shadow-2xl shadow-red-900/20">
          <div className="flex items-center gap-2 mb-6 border-b border-white/20 pb-4">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold tracking-widest text-white/70">SYSTEM_READY</span>
          </div>
          
          <h1 className="text-4xl font-black text-white mb-2 tracking-tighter">ONYX<span className="text-red-600">.</span>SOVEREIGN</h1>
          <p className="text-white/50 text-xs mb-8 uppercase tracking-widest">Architectural Blueprint • Classified</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-200 font-bold py-4 border border-transparent hover:border-white transition-all uppercase tracking-widest text-xs"
          >
            <Download size={16} />
            <span>Initialize Download</span>
          </button>

          <Link href="/" className="block mt-6 text-[10px] text-center text-white/40 hover:text-white uppercase tracking-widest transition-colors">
            [ Terminate Session ]
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-black w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1: THESIS & PROBLEM ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x border-white/10">
          
          {/* Header */}
          <div className="flex justify-between items-end border-b-2 border-white pb-6 mb-10">
            <div>
              <h1 className="text-6xl font-black uppercase tracking-tighter leading-none mb-2">Onyx<br/><span className="text-red-600">Sovereign</span></h1>
              <p className="text-sm font-bold text-white/60 uppercase tracking-[0.3em]">The Execution Terminal</p>
            </div>
            <div className="text-right">
              <div className="border border-red-600 text-red-600 px-3 py-1 font-bold text-[10px] uppercase inline-block mb-2">Confidential</div>
              <p className="text-[10px] font-mono text-white/40">REF: ONYX-ARCH-V1</p>
            </div>
          </div>

          {/* 1. The Market Thesis */}
          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase border-l-4 border-blue-600 pl-4 mb-6 text-white">01. The Market Thesis</h2>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-[10px] font-bold text-blue-500 uppercase mb-2">The Shift</p>
                <p className="text-xs leading-relaxed text-justify font-medium text-white/80">
                  The global financial infrastructure is bifurcating. Capital is fleeing centralized, custodial entities (CEXs) due to regulatory overreach and insolvency risks. The market is moving toward <strong>Sovereign Execution</strong>.
                </p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-yellow-500 uppercase mb-2">The Data</p>
                <p className="text-xs leading-relaxed text-justify font-medium text-white/80">
                  DEX volume surpassed <strong>$250 Billion</strong> in Q4 2024. However, retail traders lost over <strong>$1.2 Billion</strong> to MEV bots, honeypots, and UI friction. The demand for a "Protected Execution Layer" is at an all-time high.
                </p>
              </div>
            </div>
          </section>

          {/* 2. The Problem Statement */}
          <section className="flex-1">
            <h2 className="text-xl font-bold uppercase border-l-4 border-red-600 pl-4 mb-6 text-white">02. The Execution Gap</h2>
            
            <div className="space-y-6">
              <div className="border border-white/20 p-4 bg-white/5">
                <div className="flex items-center gap-3 mb-2 text-red-500">
                  <Lock size={18} />
                  <h3 className="font-bold text-sm uppercase">The Custody Trap</h3>
                </div>
                <p className="text-[10px] text-white/70">
                  Traders on Binance/Coinbase do not own their assets. Accounts can be frozen instantly. 
                  <br/><span className="text-white font-bold">Onyx Solution:</span> Non-Custodial Architecture. User holds keys 100% of the time.
                </p>
              </div>

              <div className="border border-white/20 p-4 bg-white/5">
                <div className="flex items-center gap-3 mb-2 text-yellow-500">
                  <Zap size={18} />
                  <h3 className="font-bold text-sm uppercase">The Speed/Security Trade-off</h3>
                </div>
                <p className="text-[10px] text-white/70">
                  DeFi is secure but slow. CEXs are fast but insecure. There is no tool that offers <strong>Institutional Speed</strong> with <strong>DeFi Sovereignty</strong>.
                  <br/><span className="text-white font-bold">Onyx Solution:</span> Edge-Compute Intent Solver (Sub-second routing).
                </p>
              </div>

              <div className="border border-white/20 p-4 bg-white/5">
                <div className="flex items-center gap-3 mb-2 text-blue-500">
                  <Shield size={18} />
                  <h3 className="font-bold text-sm uppercase">The Predatory Environment</h3>
                </div>
                <p className="text-[10px] text-white/70">
                  Public mempools are dark forests. MEV bots sandwich trades, extracting value.
                  <br/><span className="text-white font-bold">Onyx Solution:</span> AI-Driven Pre-Flight Audit & Private RPC Routing.
                </p>
              </div>
            </div>
          </section>

          <div className="text-right text-[10px] font-bold text-white/30 uppercase tracking-widest">Page 01 // Thesis</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: ARCHITECTURE ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x border-white/10">
          
          {/* 3. System Architecture */}
          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase border-l-4 border-blue-600 pl-4 mb-8 text-white">03. The Sovereign Architecture</h2>
            
            {/* CSS DIAGRAM */}
            <div className="flex flex-col items-center gap-4 text-[9px] font-bold uppercase text-white">
              
              {/* CLIENT LAYER */}
              <div className="w-full border border-white/30 p-4 relative">
                <span className="absolute -top-2 left-4 bg-black px-2 text-white/50">Client Side (The Vault)</span>
                <div className="flex justify-between gap-4">
                  <div className="flex-1 border border-white/10 p-3 text-center bg-white/5">
                    <Smartphone size={16} className="mx-auto mb-2 text-white"/>
                    User Interface<br/>(Next.js 15)
                  </div>
                  <div className="flex-1 border border-red-600/50 p-3 text-center bg-red-900/10">
                    <Lock size={16} className="mx-auto mb-2 text-red-500"/>
                    Secure Enclave<br/>(Web Workers)
                  </div>
                </div>
              </div>

              {/* ARROWS */}
              <div className="h-6 w-px bg-white/20"></div>

              {/* EDGE LAYER */}
              <div className="w-full border border-blue-600/50 p-4 relative bg-blue-900/5">
                <span className="absolute -top-2 left-4 bg-black px-2 text-blue-500">The Intelligence Layer</span>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <Cpu size={16} className="mx-auto mb-2 text-blue-400"/>
                    Groq LPU<br/><span className="text-[7px] text-white/50">AI Audit</span>
                  </div>
                  <div className="text-center">
                    <Activity size={16} className="mx-auto mb-2 text-blue-400"/>
                    Intent Solver<br/><span className="text-[7px] text-white/50">Route Opt.</span>
                  </div>
                  <div className="text-center">
                    <Layers size={16} className="mx-auto mb-2 text-blue-400"/>
                    Supabase<br/><span className="text-[7px] text-white/50">User State</span>
                  </div>
                </div>
              </div>

              {/* ARROWS */}
              <div className="h-6 w-px bg-white/20"></div>

              {/* BLOCKCHAIN LAYER */}
              <div className="w-full border border-white/30 p-4 relative">
                <span className="absolute -top-2 left-4 bg-black px-2 text-white/50">Execution Layer</span>
                <div className="flex justify-between gap-4">
                  <div className="flex-1 border border-white/10 p-3 text-center">
                    Private RPC<br/><span className="text-[7px] text-white/50">MEV Protection</span>
                  </div>
                  <div className="flex-1 border border-white/10 p-3 text-center">
                    Smart Contracts<br/><span className="text-[7px] text-white/50">Settlement</span>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* 4. The Revenue Engine */}
          <section className="flex-1">
            <h2 className="text-xl font-bold uppercase border-l-4 border-yellow-500 pl-4 mb-6 text-white">04. The Revenue Engine</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="border border-yellow-500/30 p-5 bg-yellow-900/5">
                <h3 className="font-bold text-sm uppercase text-yellow-500 mb-2">Active Income</h3>
                <p className="text-2xl font-black text-white mb-1">2%</p>
                <p className="text-[10px] text-white/70 uppercase tracking-widest">Profit-Only Fee</p>
                <p className="text-[9px] mt-2 text-white/50">We only monetize when the user wins. Zero fees on losses. Aligns incentives perfectly.</p>
              </div>
              
              <div className="border border-blue-500/30 p-5 bg-blue-900/5">
                <h3 className="font-bold text-sm uppercase text-blue-500 mb-2">Passive Income</h3>
                <p className="text-2xl font-black text-white mb-1">$150+</p>
                <p className="text-[10px] text-white/70 uppercase tracking-widest">Onyx Black Sub</p>
                <p className="text-[9px] mt-2 text-white/50">Monthly retainer for advanced AI forensics, tax shielding, and private RPC lanes.</p>
              </div>
            </div>
          </section>

          <div className="text-right text-[10px] font-bold text-white/30 uppercase tracking-widest">Page 02 // Architecture</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 3: ROADMAP & SIGNATURE ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x border-white/10">
          
          {/* 5. Execution Roadmap */}
          <section className="mb-12">
            <h2 className="text-xl font-bold uppercase border-l-4 border-white pl-4 mb-8 text-white">05. Execution Roadmap</h2>
            
            <div className="space-y-0 border-l border-white/20 ml-2">
              <div className="relative pl-8 pb-8">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-black border border-white rounded-full"></div>
                <h4 className="font-bold text-sm uppercase text-white">Phase 1: The Vault (Weeks 1-2)</h4>
                <p className="text-[10px] text-white/60 mt-1">Core Security Architecture, Web Worker Encryption, Wallet Generation.</p>
              </div>
              <div className="relative pl-8 pb-8">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-black border border-red-600 rounded-full"></div>
                <h4 className="font-bold text-sm uppercase text-red-500">Phase 2: The Engine (Weeks 3-5)</h4>
                <p className="text-[10px] text-white/60 mt-1">Intent Solver Integration, Groq AI Audit Layer, Basic Swap Logic.</p>
              </div>
              <div className="relative pl-8 pb-8">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-black border border-blue-600 rounded-full"></div>
                <h4 className="font-bold text-sm uppercase text-blue-500">Phase 3: The Interface (Weeks 6-7)</h4>
                <p className="text-[10px] text-white/60 mt-1">"X-Style" UI Polish, Real-time Data Feeds, Mobile Optimization.</p>
              </div>
              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 bg-white rounded-full"></div>
                <h4 className="font-bold text-sm uppercase text-white">Phase 4: Launch (Week 8)</h4>
                <p className="text-[10px] text-white/60 mt-1">Alpha Release to first 100 Operators. Marketing Push.</p>
              </div>
            </div>
          </section>

          {/* 6. Conclusion */}
          <section className="mb-12">
            <div className="border border-white/10 p-6 bg-white/5">
              <p className="text-xs leading-relaxed text-justify font-medium text-white/80">
                Onyx Sovereign is not just a trading bot; it is a <strong>Financial Operating System</strong>. By combining the speed of centralized exchanges with the security of cold storage and the intelligence of AI, we are creating a new category of financial tool. The market is ready. The technology is ready. We are ready.
              </p>
            </div>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-auto pt-8 border-t border-white/20 flex justify-between items-end">
            <div>
              <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mb-4">Architectural Approval</p>
              <div className="font-serif italic text-3xl text-white mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-0.5 w-32 bg-red-600 mb-2"></div>
              <p className="text-xs font-bold text-white uppercase">Lead Technical Architect</p>
              <p className="text-[10px] text-white/50">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center font-black text-xl text-white">
                BA
              </div>
            </div>
          </footer>
          
          <div className="text-right text-[10px] font-bold text-white/30 uppercase tracking-widest mt-4">Page 03 // Approval</div>
        </div>

      </div>
    </div>
  );
}
