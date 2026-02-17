"use client";
import { Download, ArrowLeft, Shield, Zap, Globe, Lock, Cpu, Layers, Activity, Smartphone, DollarSign } from "lucide-react";
import Link from "next/link";

export default function OnyxBlueprint() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "ONYX_SOVEREIGN_MASTER_PLAN";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-black font-sans text-white selection:bg-red-900 selection:text-white">
      
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
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        
        <div className="relative z-10 w-full max-w-md bg-black border-2 border-white p-10 shadow-2xl shadow-red-900/40">
          <div className="flex items-center gap-3 mb-8 border-b-2 border-white pb-4">
            <div className="w-4 h-4 bg-red-600 rounded-full animate-pulse"></div>
            <span className="text-sm font-black tracking-widest text-white">SYSTEM READY</span>
          </div>
          
          <h1 className="text-5xl font-black text-white mb-4 tracking-tighter">ONYX<span className="text-red-600">.</span></h1>
          <p className="text-gray-400 text-sm mb-10 font-bold uppercase tracking-widest">Master Plan • Top Secret</p>

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
      <div id="print-container" className="bg-black w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1: THE VISION ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x-4 border-white/10">
          
          {/* Header */}
          <div className="flex justify-between items-end border-b-4 border-white pb-8 mb-12">
            <div>
              <h1 className="text-7xl font-black uppercase tracking-tighter leading-none mb-2">Onyx<br/><span className="text-red-600">Sovereign</span></h1>
              <p className="text-lg font-bold text-gray-400 uppercase tracking-[0.3em]">The Financial Operating System</p>
            </div>
            <div className="text-right">
              <div className="border-2 border-red-600 text-red-600 px-4 py-2 font-black text-xs uppercase inline-block mb-2">Classified</div>
              <p className="text-xs font-mono text-gray-500 font-bold">REF: MASTER-V2</p>
            </div>
          </div>

          {/* 1. The Big Idea */}
          <section className="mb-12">
            <h2 className="text-3xl font-black uppercase border-l-8 border-blue-600 pl-6 mb-8 text-white">01. The Big Idea</h2>
            
            <p className="text-lg leading-relaxed font-medium text-gray-300 mb-6 text-justify">
              We are building the <strong>"Bloomberg Terminal" for the Decentralized Economy.</strong>
            </p>
            <p className="text-lg leading-relaxed font-medium text-gray-300 mb-8 text-justify">
              Right now, trading crypto is dangerous and difficult. Users have to choose between <strong>Centralized Exchanges</strong> (where their money can be frozen) or <strong>Complex DeFi Tools</strong> (where they get hacked). Onyx Sovereign solves this by combining the <strong>Speed of an App</strong> with the <strong>Security of a Vault</strong>.
            </p>

            <div className="bg-white/10 border-2 border-white/20 p-6 rounded-none">
              <p className="text-sm font-black text-white uppercase tracking-widest mb-2">The Bottom Line:</p>
              <p className="text-xl font-bold text-white">
                We give users total control of their money (Sovereignty) while using AI to protect them from scams (Security).
              </p>
            </div>
          </section>

          {/* 2. The Problem & Solution */}
          <section className="flex-1">
            <h2 className="text-3xl font-black uppercase border-l-8 border-red-600 pl-6 mb-8 text-white">02. Why We Will Win</h2>
            
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-red-900/20 border-2 border-red-600 flex items-center justify-center shrink-0">
                  <Lock size={32} className="text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-white mb-2">Problem: "Not Your Keys"</h3>
                  <p className="text-sm font-medium text-gray-400">
                    If you use Binance or Coinbase, you don't own your money. They can lock your account anytime.
                  </p>
                  <p className="text-sm font-bold text-white mt-2">
                    ✅ <span className="text-red-500">Onyx Solution:</span> We build a Non-Custodial Vault. The user is the only one who can touch their funds.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-16 h-16 bg-blue-900/20 border-2 border-blue-600 flex items-center justify-center shrink-0">
                  <Zap size={32} className="text-blue-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-white mb-2">Problem: "It's Too Slow"</h3>
                  <p className="text-sm font-medium text-gray-400">
                    Traditional tools take 30+ seconds to make a trade. In that time, the price changes.
                  </p>
                  <p className="text-sm font-bold text-white mt-2">
                    ✅ <span className="text-blue-500">Onyx Solution:</span> We use an "Intent Engine" that executes trades in under 1 second.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-16 h-16 bg-yellow-900/20 border-2 border-yellow-600 flex items-center justify-center shrink-0">
                  <Shield size={32} className="text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase text-white mb-2">Problem: "Scams Everywhere"</h3>
                  <p className="text-sm font-medium text-gray-400">
                    New traders lose money to fake tokens and rug pulls every day.
                  </p>
                  <p className="text-sm font-bold text-white mt-2">
                    ✅ <span className="text-yellow-500">Onyx Solution:</span> Our AI scans every contract instantly. If it's a scam, we block the trade.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-gray-600 uppercase tracking-widest">Page 01 // Vision</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: HOW IT WORKS ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x-4 border-white/10">
          
          {/* 3. The Machine (Architecture) */}
          <section className="mb-16">
            <h2 className="text-3xl font-black uppercase border-l-8 border-blue-600 pl-6 mb-10 text-white">03. How It Works</h2>
            
            {/* BOLD DIAGRAM */}
            <div className="flex flex-col items-center gap-6 text-xs font-black uppercase text-white w-full">
              
              {/* USER LAYER */}
              <div className="w-full border-4 border-white p-6 relative bg-black">
                <span className="absolute -top-3 left-6 bg-black px-4 text-white text-sm font-bold">1. The User Interface</span>
                <div className="flex justify-between items-center gap-6">
                  <div className="text-center">
                    <Smartphone size={32} className="mx-auto mb-3 text-white"/>
                    <span className="text-sm">Mobile App</span>
                  </div>
                  <div className="h-1 flex-1 bg-white/20"></div>
                  <div className="text-center">
                    <Lock size={32} className="mx-auto mb-3 text-red-500"/>
                    <span className="text-sm text-red-500">Secure Vault</span>
                  </div>
                </div>
                <p className="mt-4 text-center text-gray-400 normal-case font-medium text-sm">
                  User logs in with FaceID. Keys are encrypted on the device.
                </p>
              </div>

              {/* ARROW */}
              <div className="h-8 w-1 bg-white"></div>

              {/* INTELLIGENCE LAYER */}
              <div className="w-full border-4 border-blue-600 p-6 relative bg-blue-900/10">
                <span className="absolute -top-3 left-6 bg-black px-4 text-blue-500 text-sm font-bold">2. The Intelligence Layer</span>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center border-r-2 border-blue-600/30">
                    <Cpu size={32} className="mx-auto mb-3 text-blue-400"/>
                    <span className="text-lg">AI Audit</span>
                    <p className="text-[10px] text-gray-400 mt-2 normal-case">Checks for scams in 0.2s</p>
                  </div>
                  <div className="text-center">
                    <Activity size={32} className="mx-auto mb-3 text-blue-400"/>
                    <span className="text-lg">Router</span>
                    <p className="text-[10px] text-gray-400 mt-2 normal-case">Finds the cheapest price</p>
                  </div>
                </div>
              </div>

              {/* ARROW */}
              <div className="h-8 w-1 bg-white"></div>

              {/* EXECUTION LAYER */}
              <div className="w-full border-4 border-white p-6 relative bg-black">
                <span className="absolute -top-3 left-6 bg-black px-4 text-white text-sm font-bold">3. The Execution</span>
                <div className="text-center">
                  <Globe size={32} className="mx-auto mb-3 text-white"/>
                  <span className="text-lg">Blockchain Network</span>
                  <p className="mt-2 text-gray-400 normal-case font-medium text-sm">
                    Trade is executed instantly. Profits return to user's vault.
                  </p>
                </div>
              </div>

            </div>
          </section>

          {/* 4. How We Make Money */}
          <section className="flex-1">
            <h2 className="text-3xl font-black uppercase border-l-8 border-yellow-500 pl-6 mb-8 text-white">04. The Money Model</h2>
            
            <div className="grid grid-cols-1 gap-8">
              <div className="border-4 border-yellow-500 p-8 bg-yellow-900/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-black uppercase text-yellow-500">The 2% Rule</h3>
                  <DollarSign size={32} className="text-yellow-500" />
                </div>
                <p className="text-lg font-bold text-white mb-2">We charge 2% on PROFITS ONLY.</p>
                <p className="text-sm font-medium text-gray-400 text-justify">
                  If a user loses money, we charge $0. If they make $1,000 profit, we take $20. This aligns our success with theirs. It is the ultimate trust signal.
                </p>
              </div>
              
              <div className="border-4 border-blue-500 p-8 bg-blue-900/10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-black uppercase text-blue-500">Onyx Black</h3>
                  <Shield size={32} className="text-blue-500" />
                </div>
                <p className="text-lg font-bold text-white mb-2">The VIP Subscription ($150/mo)</p>
                <p className="text-sm font-medium text-gray-400 text-justify">
                  For serious traders, we offer a monthly subscription that gives them faster speeds, deeper AI analysis, and tax-shielding tools.
                </p>
              </div>
            </div>
          </section>

          <div className="text-right text-xs font-black text-gray-600 uppercase tracking-widest">Page 02 // Mechanics</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 3: ROADMAP & SIGNATURE ================= */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col border-x-4 border-white/10">
          
          {/* 5. The Plan (Roadmap) */}
          <section className="mb-16">
            <h2 className="text-3xl font-black uppercase border-l-8 border-white pl-6 mb-10 text-white">05. The Plan</h2>
            
            <div className="space-y-0 border-l-4 border-white ml-4">
              <div className="relative pl-12 pb-12">
                <div className="absolute -left-[14px] top-0 w-6 h-6 bg-black border-4 border-white rounded-full"></div>
                <h4 className="text-xl font-black uppercase text-white mb-2">Phase 1: The Foundation</h4>
                <p className="text-sm font-bold text-gray-500">Build the Secure Vault and Basic Trading Engine.</p>
              </div>
              <div className="relative pl-12 pb-12">
                <div className="absolute -left-[14px] top-0 w-6 h-6 bg-black border-4 border-red-600 rounded-full"></div>
                <h4 className="text-xl font-black uppercase text-red-500 mb-2">Phase 2: The Intelligence</h4>
                <p className="text-sm font-bold text-gray-500">Integrate the AI Audit system to stop scams.</p>
              </div>
              <div className="relative pl-12 pb-12">
                <div className="absolute -left-[14px] top-0 w-6 h-6 bg-black border-4 border-blue-600 rounded-full"></div>
                <h4 className="text-xl font-black uppercase text-blue-500 mb-2">Phase 3: The Polish</h4>
                <p className="text-sm font-bold text-gray-500">Make the UI look like a multi-million dollar product.</p>
              </div>
              <div className="relative pl-12">
                <div className="absolute -left-[14px] top-0 w-6 h-6 bg-white rounded-full"></div>
                <h4 className="text-xl font-black uppercase text-white mb-2">Phase 4: Launch</h4>
                <p className="text-sm font-bold text-gray-500">Release to the first 100 users and start generating revenue.</p>
              </div>
            </div>
          </section>

          {/* 6. Final Word */}
          <section className="mb-16">
            <div className="border-4 border-white p-8 bg-white/5">
              <p className="text-lg leading-relaxed text-justify font-bold text-white">
                Onyx Sovereign is not just an app; it is a weapon for financial freedom. We are building the tool that everyone in the crypto space wishes they had. The technology is ready. The market is waiting. Let's build it.
              </p>
            </div>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-auto pt-10 border-t-4 border-white/20 flex justify-between items-end">
            <div>
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">Architectural Approval</p>
              <div className="font-serif italic text-5xl text-white mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-1 w-48 bg-red-600 mb-2"></div>
              <p className="text-sm font-black text-white uppercase">Lead Technical Architect</p>
              <p className="text-xs font-bold text-gray-500">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 border-4 border-white flex items-center justify-center font-black text-4xl text-white">
                BA
              </div>
            </div>
          </footer>
          
          <div className="text-right text-xs font-black text-gray-600 uppercase tracking-widest mt-8">Page 03 // Approval</div>
        </div>

      </div>
    </div>
  );
}
