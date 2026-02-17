"use client";
import { Download, ArrowLeft, Shield, Zap, Globe, Lock, Cpu, Layers, Activity, Smartphone, DollarSign, Terminal, Hash } from "lucide-react";
import Link from "next/link";

export default function OnyxBlueprint() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "ONYX_SOVEREIGN_CLASSIFIED_V3";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-red-900 selection:text-white">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #000000 !important; 
            color: #ffffff !important;
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          /* Force Backgrounds */
          * { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; display: block; height: 0; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: TERMINAL PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="relative z-10 w-full max-w-md bg-black border-2 border-white/20 p-10 shadow-2xl shadow-red-900/40">
          <div className="flex items-center gap-3 mb-8 border-b border-white/20 pb-4">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-red-500 tracking-widest">SECURE_CONNECTION_ESTABLISHED</span>
          </div>
          
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">ONYX<span className="text-red-600">.</span></h1>
          <p className="text-gray-400 text-sm mb-8 font-bold uppercase tracking-widest">Sovereign Architecture • V3.0</p>

          <div className="bg-red-900/20 border border-red-900/50 p-4 mb-8 text-[10px] text-red-200 font-mono">
            ⚠ IMPORTANT: Enable "Background Graphics" in your print settings to preserve the Dark Mode aesthetic.
          </div>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white text-black hover:bg-gray-200 font-black py-5 border-2 border-transparent hover:border-white transition-all uppercase tracking-widest text-sm"
          >
            <Download size={20} />
            <span>Download Blueprint</span>
          </button>

          <Link href="/" className="block mt-8 text-xs text-center text-gray-500 hover:text-white uppercase tracking-widest transition-colors font-bold">
            [ Terminate Session ]
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-black w-full max-w-[210mm] mx-auto hidden print:block text-white">
        
        {/* ================= PAGE 1: THE VISION ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x-2 border-white/10 bg-black">
          
          {/* Terminal Header */}
          <div className="flex justify-between items-start border-b-2 border-white/20 pb-6 mb-12 font-mono text-[10px] text-gray-500">
            <div>
              <p>SYS: ONYX_SOVEREIGN</p>
              <p>LOC: DECENTRALIZED</p>
            </div>
            <div className="text-right">
              <p>STATUS: OPERATIONAL</p>
              <p>ENCRYPTION: AES-256</p>
            </div>
          </div>

          {/* Title Block */}
          <div className="mb-16">
            <h1 className="text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-4 text-white">
              Onyx<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900" style={{ WebkitTextFillColor: 'red' }}>Sovereign</span>
            </h1>
            <div className="flex items-center gap-4">
              <div className="h-1 w-24 bg-red-600"></div>
              <p className="text-lg font-bold text-gray-400 uppercase tracking-[0.4em]">The Financial OS</p>
            </div>
          </div>

          {/* 1. The Market Thesis */}
          <section className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white text-black font-black text-sm px-2 py-1">01</div>
              <h2 className="text-2xl font-black uppercase text-white tracking-wide">The Market Thesis</h2>
            </div>
            
            <div className="border-l-2 border-white/20 pl-6 space-y-6">
              <p className="text-lg leading-relaxed font-medium text-gray-300 text-justify">
                We are building the <strong>"Bloomberg Terminal" for the Decentralized Economy.</strong>
              </p>
              <p className="text-sm leading-relaxed font-medium text-gray-400 text-justify">
                The global financial infrastructure is fracturing. Capital is fleeing Centralized Exchanges (CEXs) due to regulatory overreach, insolvency risks, and lack of ownership. The market is aggressively migrating toward <strong>Sovereign Execution</strong>, but the current tools (Metamask, Uniswap) are too slow, too complex, and too dangerous for serious capital.
              </p>
              <div className="bg-white/5 border border-white/10 p-6 mt-4">
                <p className="text-xs font-mono text-red-500 mb-2">>> CRITICAL INSIGHT</p>
                <p className="text-xl font-bold text-white leading-tight">
                  Onyx Sovereign combines the <span className="text-white border-b border-white">Speed of an App</span> with the <span className="text-white border-b border-white">Security of a Cold Vault</span>.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-auto flex justify-between items-end border-t border-white/10 pt-4">
            <p className="text-[9px] font-mono text-gray-600">CONFIDENTIAL // DO NOT DISTRIBUTE</p>
            <p className="text-[9px] font-black text-white uppercase tracking-widest">Page 01</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: THE PROBLEM ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x-2 border-white/10 bg-black">
          
          {/* 2. The Execution Gap */}
          <section className="flex-1">
            <div className="flex items-center gap-4 mb-10">
              <div className="bg-white text-black font-black text-sm px-2 py-1">02</div>
              <h2 className="text-2xl font-black uppercase text-white tracking-wide">Why We Will Win</h2>
            </div>
            
            <div className="space-y-10">
              {/* Problem 1 */}
              <div className="relative pl-8 border-l border-red-900">
                <div className="absolute -left-3 top-0 bg-black border-2 border-red-600 text-red-600 p-1 rounded-full">
                  <Lock size={16} />
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-2">Problem: "Not Your Keys"</h3>
                <p className="text-xs font-medium text-gray-400 mb-3 leading-relaxed">
                  If you use Binance or Coinbase, you don't own your money. They can lock your account anytime.
                </p>
                <div className="bg-red-950/30 border border-red-900/50 p-3">
                  <p className="text-xs font-bold text-red-200">
                    ✅ SOLUTION: Non-Custodial Vault. The user is the only one who can touch their funds.
                  </p>
                </div>
              </div>

              {/* Problem 2 */}
              <div className="relative pl-8 border-l border-blue-900">
                <div className="absolute -left-3 top-0 bg-black border-2 border-blue-600 text-blue-600 p-1 rounded-full">
                  <Zap size={16} />
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-2">Problem: "It's Too Slow"</h3>
                <p className="text-xs font-medium text-gray-400 mb-3 leading-relaxed">
                  Traditional tools take 30+ seconds to make a trade. In that time, the price changes.
                </p>
                <div className="bg-blue-950/30 border border-blue-900/50 p-3">
                  <p className="text-xs font-bold text-blue-200">
                    ✅ SOLUTION: "Intent Engine" executes trades in under 1 second via Edge Computing.
                  </p>
                </div>
              </div>

              {/* Problem 3 */}
              <div className="relative pl-8 border-l border-yellow-900">
                <div className="absolute -left-3 top-0 bg-black border-2 border-yellow-600 text-yellow-600 p-1 rounded-full">
                  <Shield size={16} />
                </div>
                <h3 className="text-xl font-black uppercase text-white mb-2">Problem: "Scams Everywhere"</h3>
                <p className="text-xs font-medium text-gray-400 mb-3 leading-relaxed">
                  New traders lose money to fake tokens and rug pulls every day.
                </p>
                <div className="bg-yellow-950/30 border border-yellow-900/50 p-3">
                  <p className="text-xs font-bold text-yellow-200">
                    ✅ SOLUTION: AI scans every contract instantly. If it's a scam, we block the trade.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="mt-auto flex justify-between items-end border-t border-white/10 pt-4">
            <p className="text-[9px] font-mono text-gray-600">CONFIDENTIAL // DO NOT DISTRIBUTE</p>
            <p className="text-[9px] font-black text-white uppercase tracking-widest">Page 02</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 3: ARCHITECTURE ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x-2 border-white/10 bg-black">
          
          {/* 3. System Architecture */}
          <section className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-white text-black font-black text-sm px-2 py-1">03</div>
              <h2 className="text-2xl font-black uppercase text-white tracking-wide">The Architecture</h2>
            </div>
            
            {/* CSS DIAGRAM */}
            <div className="flex flex-col items-center gap-8 text-[10px] font-bold uppercase text-white w-full">
              
              {/* CLIENT LAYER */}
              <div className="w-full border-2 border-white p-6 relative bg-black">
                <span className="absolute -top-3 left-6 bg-black px-4 text-white text-xs font-bold border border-white">1. The User Interface</span>
                <div className="flex justify-between items-center gap-6">
                  <div className="text-center">
                    <Smartphone size={32} className="mx-auto mb-3 text-white"/>
                    <span className="text-sm">Mobile App</span>
                  </div>
                  <div className="h-px flex-1 bg-white/20"></div>
                  <div className="text-center">
                    <Lock size={32} className="mx-auto mb-3 text-red-500"/>
                    <span className="text-sm text-red-500">Secure Vault</span>
                  </div>
                </div>
              </div>

              {/* ARROW */}
              <div className="h-8 w-0.5 bg-white"></div>

              {/* INTELLIGENCE LAYER */}
              <div className="w-full border-2 border-blue-600 p-6 relative bg-blue-950/10">
                <span className="absolute -top-3 left-6 bg-black px-4 text-blue-500 text-xs font-bold border border-blue-600">2. The Intelligence Layer</span>
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <Cpu size={32} className="mx-auto mb-3 text-blue-400"/>
                    <span className="text-sm">AI Audit</span>
                  </div>
                  <div className="text-center">
                    <Activity size={32} className="mx-auto mb-3 text-blue-400"/>
                    <span className="text-sm">Router</span>
                  </div>
                  <div className="text-center">
                    <Layers size={32} className="mx-auto mb-3 text-blue-400"/>
                    <span className="text-sm">Supabase</span>
                  </div>
                </div>
              </div>

              {/* ARROW */}
              <div className="h-8 w-0.5 bg-white"></div>

              {/* EXECUTION LAYER */}
              <div className="w-full border-2 border-white p-6 relative bg-black">
                <span className="absolute -top-3 left-6 bg-black px-4 text-white text-xs font-bold border border-white">3. The Execution</span>
                <div className="text-center">
                  <Globe size={32} className="mx-auto mb-3 text-white"/>
                  <span className="text-sm">Blockchain Network</span>
                </div>
              </div>

            </div>
          </section>

          <div className="mt-auto flex justify-between items-end border-t border-white/10 pt-4">
            <p className="text-[9px] font-mono text-gray-600">CONFIDENTIAL // DO NOT DISTRIBUTE</p>
            <p className="text-[9px] font-black text-white uppercase tracking-widest">Page 03</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 4: REVENUE ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x-2 border-white/10 bg-black">
          
          {/* 4. The Revenue Engine */}
          <section className="flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-white text-black font-black text-sm px-2 py-1">04</div>
              <h2 className="text-2xl font-black uppercase text-white tracking-wide">The Money Model</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-10">
              <div className="border-2 border-yellow-500 p-8 bg-yellow-900/10 relative">
                <div className="absolute top-0 right-0 bg-yellow-500 text-black px-3 py-1 text-[10px] font-black uppercase">Active</div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-3xl font-black uppercase text-yellow-500">The 2% Rule</h3>
                  <DollarSign size={40} className="text-yellow-500" />
                </div>
                <p className="text-xl font-bold text-white mb-4">We charge 2% on PROFITS ONLY.</p>
                <p className="text-sm font-medium text-gray-400 text-justify leading-relaxed">
                  If a user loses money, we charge $0. If they make profit, we take a small cut. This aligns our success with theirs. It is the ultimate trust signal.
                </p>
              </div>
              
              <div className="border-2 border-blue-500 p-8 bg-blue-900/10 relative">
                <div className="absolute top-0 right-0 bg-blue-500 text-black px-3 py-1 text-[10px] font-black uppercase">Passive</div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-3xl font-black uppercase text-blue-500">Onyx Black</h3>
                  <Shield size={40} className="text-blue-500" />
                </div>
                <p className="text-xl font-bold text-white mb-4">Premium Subscription</p>
                <p className="text-sm font-medium text-gray-400 text-justify leading-relaxed">
                  For serious traders, we offer a monthly retainer that gives them faster speeds, deeper AI analysis, and tax-shielding tools.
                </p>
              </div>
            </div>
          </section>

          <div className="mt-auto flex justify-between items-end border-t border-white/10 pt-4">
            <p className="text-[9px] font-mono text-gray-600">CONFIDENTIAL // DO NOT DISTRIBUTE</p>
            <p className="text-[9px] font-black text-white uppercase tracking-widest">Page 04</p>
          </div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 5: ROADMAP & SIGNATURE ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x-2 border-white/10 bg-black">
          
          {/* 5. The Plan (Roadmap) */}
          <section className="mb-20">
            <div className="flex items-center gap-4 mb-12">
              <div className="bg-white text-black font-black text-sm px-2 py-1">05</div>
              <h2 className="text-2xl font-black uppercase text-white tracking-wide">The Roadmap</h2>
            </div>
            
            <div className="space-y-0 border-l-2 border-white/30 ml-4">
              <div className="relative pl-12 pb-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-white rounded-full"></div>
                <h4 className="text-xl font-black uppercase text-white mb-1">Phase 1: The Foundation</h4>
                <p className="text-xs font-bold text-gray-500">Build the Secure Vault and Basic Trading Engine.</p>
              </div>
              <div className="relative pl-12 pb-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-red-600 rounded-full"></div>
                <h4 className="text-xl font-black uppercase text-red-500 mb-1">Phase 2: The Intelligence</h4>
                <p className="text-xs font-bold text-gray-500">Integrate the AI Audit system to stop scams.</p>
              </div>
              <div className="relative pl-12 pb-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-black border-2 border-blue-600 rounded-full"></div>
                <h4 className="text-xl font-black uppercase text-blue-500 mb-1">Phase 3: The Polish</h4>
                <p className="text-xs font-bold text-gray-500">Make the UI look like a multi-million dollar product.</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute -left-[9px] top-0 w-4 h-4 bg-white rounded-full"></div>
                <h4 className="text-xl font-black uppercase text-white mb-1">Phase 4: Launch</h4>
                <p className="text-xs font-bold text-gray-500">Release to the first 100 users and start generating revenue.</p>
              </div>
            </div>
          </section>

          {/* 6. Final Word */}
          <section className="mb-16">
            <div className="border-2 border-white/20 p-8 bg-white/5">
              <p className="text-lg leading-relaxed text-justify font-bold text-white">
                Onyx Sovereign is not just an app; it is a weapon for financial freedom. We are building the tool that everyone in the crypto space wishes they had. The technology is ready. The market is waiting. Let's build it.
              </p>
            </div>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-auto pt-10 border-t-4 border-white/20 flex justify-between items-end">
            <div>
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-4">Architectural Approval</p>
              <div className="font-serif italic text-4xl text-white mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-0.5 w-40 bg-red-600 mb-2"></div>
              <p className="text-xs font-black text-white uppercase">Lead Technical Architect</p>
              <p className="text-[10px] font-bold text-gray-500">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 border-2 border-white/30 flex items-center justify-center font-black text-3xl text-white">
                BA
              </div>
            </div>
          </footer>
          
          <div className="mt-4 text-right text-[10px] font-bold text-white/30 uppercase tracking-widest">Page 05 // Approval</div>
        </div>

      </div>
    </div>
  );
}
