"use client";
import { Download, ArrowLeft, Shield, Zap, Eye, Brain, Database, CreditCard, CheckCircle2, XCircle, Clock, Server, Smartphone, Layers } from "lucide-react";
import Link from "next/link";

export default function HeirsProposal() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "HeirsGuard_Vision_Team_Velocity";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container {
            position: absolute;
            left: 0; top: 0; width: 100%;
            margin: 0; padding: 0;
          }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; display: block; height: 0; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-red-900/20">
            <Zap size={32} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Team Velocity</h1>
          <p className="text-slate-400 text-sm mb-8">HeirsGuard Vision • Grand Prize Entry</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl"
          >
            <Download size={20} />
            <span>Download Proposal PDF</span>
          </button>

          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1: EXECUTIVE SUMMARY ================= */}
        <div className="p-[20mm] pb-0 relative">
          
          {/* Header */}
          <div className="border-b-4 border-red-600 pb-6 mb-8 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Heirs Insurance Hackathon 2026</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                HeirsGuard<br/><span className="text-red-600">Vision</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-slate-900 text-white px-4 py-1 font-bold text-xs uppercase inline-block mb-1">Team Velocity</div>
              <p className="text-xs font-mono font-bold">DATE: JAN 20, 2026</p>
            </div>
          </div>

          {/* 1. Executive Summary */}
          <section className="mb-8 avoid-break">
            <h2 className="text-xl font-black uppercase border-l-8 border-red-600 pl-4 mb-4 text-slate-900">1. Executive Summary</h2>
            
            <div className="mb-4">
              <h3 className="font-bold text-sm uppercase text-slate-500 mb-1">The Hook</h3>
              <p className="text-sm leading-relaxed text-justify font-medium text-slate-800">
                For decades, the Nigerian insurance landscape has been plagued by a singular, damaging narrative: <em>"Insurance na scam."</em> As Tony Elumelu has championed through <strong>Africapitalism</strong>, the democratization of finance requires systems that work for the people—efficiently, transparently, and instantly. The youth market feels alienated by an industry characterized by paperwork and delay.
              </p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold text-sm uppercase text-slate-500 mb-1">The Solution</h3>
              <p className="text-sm leading-relaxed text-justify font-medium text-slate-800">
                We propose <strong>HeirsGuard Vision</strong>, an Azure-native, AI-first claims engine designed to settle minor motor insurance claims in <strong>under five minutes</strong>. By leveraging Microsoft Azure Computer Vision to assess damage and Azure OpenAI to interpret policy logic, we remove the bureaucratic friction that defines the traditional claims process.
              </p>
            </div>

            <div className="bg-slate-50 border-l-4 border-slate-900 p-4">
              <h3 className="font-bold text-sm uppercase text-slate-900 mb-1">The Promise</h3>
              <p className="text-sm leading-relaxed font-medium text-slate-700">
                HeirsGuard Vision is not merely an app; it is the operational lever required to achieve Heirs Insurance’s strategic goal of retail dominance. We are proposing a shift from a "Promise to Pay" to "Payment Made."
              </p>
            </div>
          </section>

          {/* 2. Problem Statement */}
          <section className="avoid-break">
            <h2 className="text-xl font-black uppercase border-l-8 border-red-600 pl-4 mb-4 text-slate-900">2. Problem Statement</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 border-2 border-slate-200 rounded-lg bg-slate-50">
                <div className="text-red-600 mb-2"><XCircle size={24} /></div>
                <h4 className="font-bold text-sm uppercase mb-2">Trust Deficit</h4>
                <p className="text-xs text-slate-600">85% of Nigerians view insurance as a "black hole" where money goes in but never comes out.</p>
              </div>
              <div className="p-4 border-2 border-slate-200 rounded-lg bg-slate-50">
                <div className="text-red-600 mb-2"><Clock size={24} /></div>
                <h4 className="font-bold text-sm uppercase mb-2">Operational Waste</h4>
                <p className="text-xs text-slate-600">Manual inspection of minor scratches costs millions in logistics and personnel hours.</p>
              </div>
              <div className="p-4 border-2 border-slate-200 rounded-lg bg-slate-50">
                <div className="text-red-600 mb-2"><Zap size={24} /></div>
                <h4 className="font-bold text-sm uppercase mb-2">Competitive Threat</h4>
                <p className="text-xs text-slate-600">Competitors are digitizing. Heirs must leapfrog them with "Vision AI," not just catch up.</p>
              </div>
            </div>
          </section>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: SOLUTION & ARCHITECTURE ================= */}
        <div className="p-[20mm] pt-[20mm] relative">
          
          {/* 3. Proposed Solution */}
          <section className="mb-10 avoid-break">
            <h2 className="text-xl font-black uppercase border-l-8 border-red-600 pl-4 mb-6 text-slate-900">3. Proposed Solution</h2>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-sm uppercase">Capture (Input Layer)</h4>
                  <p className="text-xs text-slate-700">User uploads video via App/WhatsApp. Metadata (GPS/Time) captured for fraud check.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-sm uppercase">Vision Analysis (The Eye)</h4>
                  <p className="text-xs text-slate-700"><strong>Azure Computer Vision</strong> detects damage severity (Dent/Scratch) and estimates repair cost.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-sm uppercase">Policy RAG (The Brain)</h4>
                  <p className="text-xs text-slate-700"><strong>Azure OpenAI (GPT-4o)</strong> checks specific policy PDF for coverage clauses and limits.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start border-b border-slate-100 pb-3">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0">4</div>
                <div>
                  <h4 className="font-bold text-sm uppercase">Fraud Guard (The Shield)</h4>
                  <p className="text-xs text-slate-700">AI analyzes metadata and image hashing to prevent duplicate/fake claims.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-red-600 text-white flex items-center justify-center font-bold rounded-full shrink-0">5</div>
                <div>
                  <h4 className="font-bold text-sm uppercase text-red-600">Settlement (The Handshake)</h4>
                  <p className="text-xs text-slate-700">Instant payout via <strong>RedPay API</strong> to user wallet.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. System Architecture Diagram */}
          <section className="mb-8 avoid-break">
            <h2 className="text-xl font-black uppercase border-l-8 border-red-600 pl-4 mb-6 text-slate-900">4. System Architecture</h2>
            
            {/* CSS DIAGRAM */}
            <div className="flex flex-col items-center gap-4 text-[10px] font-bold uppercase">
              
              {/* TOP LAYER */}
              <div className="flex gap-4 w-full justify-center">
                <div className="border-2 border-slate-900 p-3 rounded bg-white text-center w-32">
                  <Smartphone size={16} className="mx-auto mb-1"/> User App
                </div>
                <div className="border-2 border-slate-900 p-3 rounded bg-white text-center w-32">
                  <Layers size={16} className="mx-auto mb-1"/> WhatsApp Bot
                </div>
              </div>

              <div className="h-4 w-0.5 bg-slate-900"></div>

              {/* AZURE CLOUD BOX */}
              <div className="border-2 border-blue-500 p-6 rounded-xl bg-blue-50 relative w-full max-w-lg">
                <span className="absolute -top-3 left-4 bg-white px-2 text-blue-600 text-xs font-black border border-blue-200">Microsoft Azure Cloud</span>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded border border-blue-200 text-center">
                    <Eye size={20} className="mx-auto text-blue-600 mb-1"/>
                    <span className="block text-[9px]">Computer Vision</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200 text-center">
                    <Brain size={20} className="mx-auto text-blue-600 mb-1"/>
                    <span className="block text-[9px]">OpenAI (GPT-4o)</span>
                  </div>
                  <div className="bg-white p-3 rounded border border-blue-200 text-center">
                    <Database size={20} className="mx-auto text-blue-600 mb-1"/>
                    <span className="block text-[9px]">Cosmos DB</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-blue-200 flex justify-center">
                   <div className="bg-slate-900 text-white px-4 py-1 rounded text-[9px]">FRAUD GUARD LOGIC</div>
                </div>
              </div>

              <div className="h-4 w-0.5 bg-slate-900"></div>

              {/* PAYOUT LAYER */}
              <div className="border-2 border-red-600 p-4 rounded-xl bg-red-50 text-center w-48 text-red-700 shadow-lg">
                <CreditCard size={24} className="mx-auto mb-2"/> 
                <span className="text-sm font-black">RedPay API</span>
                <p className="text-[8px] mt-1 text-red-500">Instant Settlement</p>
              </div>
            </div>
          </section>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 3: IMPACT & CONCLUSION ================= */}
        <div className="p-[20mm] pt-[20mm] relative">
          
          {/* 5. Business Impact */}
          <section className="mb-10 avoid-break">
            <h2 className="text-xl font-black uppercase border-l-8 border-red-600 pl-4 mb-6 text-slate-900">5. Business Impact</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="bg-slate-50 p-6 border-t-4 border-red-600 shadow-sm">
                <p className="text-3xl font-black text-slate-900 mb-1">90%</p>
                <p className="text-[10px] font-bold uppercase text-slate-500">Cost Reduction</p>
              </div>
              <div className="bg-slate-50 p-6 border-t-4 border-red-600 shadow-sm">
                <p className="text-3xl font-black text-slate-900 mb-1">5 Min</p>
                <p className="text-xs font-bold uppercase text-slate-500">Turnaround Time</p>
              </div>
              <div className="bg-slate-50 p-6 border-t-4 border-red-600 shadow-sm">
                <p className="text-3xl font-black text-slate-900 mb-1">Viral</p>
                <p className="text-[10px] font-bold uppercase text-slate-500">Marketing Growth</p>
              </div>
            </div>
          </section>

          {/* 6. Customer Experience (Visual Comparison) */}
          <section className="mb-12 avoid-break">
            <h2 className="text-xl font-black uppercase border-l-8 border-red-600 pl-4 mb-6 text-slate-900">6. Customer Experience</h2>
            
            <div className="grid grid-cols-2 gap-8">
              {/* OLD WAY */}
              <div className="opacity-60 grayscale border-r-2 border-slate-200 pr-4">
                <h3 className="font-black text-sm uppercase mb-4 pb-1 border-b border-slate-300">The Old Way (14 Days)</h3>
                <ul className="space-y-3 text-xs font-medium text-slate-600">
                  <li className="flex gap-2 items-center"><XCircle size={14}/> Accident Occurs (Anxiety)</li>
                  <li className="flex gap-2 items-center"><XCircle size={14}/> Call Center Wait</li>
                  <li className="flex gap-2 items-center"><XCircle size={14}/> Paper Forms</li>
                  <li className="flex gap-2 items-center"><XCircle size={14}/> Surveyor Visit (3 Days later)</li>
                  <li className="flex gap-2 items-center"><XCircle size={14}/> Approval Wait (10 Days)</li>
                </ul>
              </div>

              {/* NEW WAY */}
              <div>
                <h3 className="font-black text-sm uppercase mb-4 pb-1 border-b border-red-600 text-red-700">HeirsGuard (5 Mins)</h3>
                <ul className="space-y-3 text-xs font-bold text-slate-900">
                  <li className="flex gap-2 items-center text-red-600"><Zap size={14}/> Accident Occurs</li>
                  <li className="flex gap-2 items-center"><CheckCircle2 size={14}/> Scan with AI App</li>
                  <li className="flex gap-2 items-center"><CheckCircle2 size={14}/> Instant Verification</li>
                  <li className="flex gap-2 items-center"><CheckCircle2 size={14}/> RedPay Alert Received</li>
                  <li className="flex gap-2 items-center text-red-600"><CheckCircle2 size={14}/> Relief & Delight</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 7. Conclusion */}
          <section className="bg-slate-900 text-white p-8 rounded-xl mb-12 avoid-break">
            <h2 className="text-xl font-black uppercase mb-4">7. Conclusion</h2>
            <p className="text-sm leading-relaxed text-justify font-medium text-slate-300 mb-4">
              HeirsGuard Vision is more than a feature; it is a statement of intent. It bridges the gap between "Old Insurance"—defined by delays and distrust—and the "New Digital Economy," defined by speed, transparency, and empathy.
            </p>
            <p className="text-sm leading-relaxed text-justify font-bold text-white">
              By leveraging the power of Microsoft Azure and the financial infrastructure of RedTech, we have the opportunity to solve a decades-old problem in the Nigerian market. We are ready to build this immediately.
            </p>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="border-t-4 border-slate-900 pt-6 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Submitted By</p>
              <div className="font-black text-2xl text-slate-900 uppercase tracking-tighter">
                Team Velocity
              </div>
              <p className="text-xs font-bold text-slate-500 mt-1">Heirs Insurance Hackathon 2026</p>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 bg-red-600 text-white flex items-center justify-center font-black text-xl rounded-lg shadow-lg">
                TV
              </div>
            </div>
          </footer>
          
          <div className="absolute bottom-4 right-8 text-xs font-black text-slate-400">Page 3/3</div>
        </div>

      </div>
    </div>
  );
}
