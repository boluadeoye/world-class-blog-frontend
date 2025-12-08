"use client";
import { Download, ArrowLeft, WifiOff, Activity, DollarSign, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AutoamResponse() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Autoam_Technical_Clarification_v1";
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900">
      
      {/* === GLOBAL PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #print-container, #print-container * { visibility: visible; }
          #print-container {
            position: absolute;
            left: 0; top: 0; width: 100%;
            margin: 0; padding: 0;
            background: white;
          }
          @page { size: A4; margin: 0mm; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; margin-top: 2rem; display: block; }
          .avoid-break { break-inside: avoid; }
        }
      `}</style>

      {/* === VIEW 1: DOWNLOAD PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <span className="font-black text-2xl text-slate-900">BA</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Technical Clarification</h1>
          <p className="text-slate-400 text-sm mb-8">Ref: Offline Sync, Costs & Sequence</p>
          <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl">
            <Download size={20} /> <span>Download Response PDF</span>
          </button>
          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">← Return to Dashboard</Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* === PAGE 1 === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex justify-between items-start border-b-[6px] border-black pb-6 mb-8">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tighter leading-none mb-2">Technical<br/>Addendum</h1>
                <p className="text-lg font-black text-slate-600 uppercase tracking-widest">Autoam MVP</p>
              </div>
              <div className="text-right">
                <div className="bg-black text-white px-6 py-2 font-bold text-sm uppercase inline-block mb-1">Confidential</div>
                <p className="text-xs font-mono font-bold">DATE: DEC 08, 2025</p>
              </div>
            </div>

            {/* 1. Offline Sync Spec */}
            <section className="mb-10 avoid-break">
              <div className="flex items-center gap-3 mb-4 border-l-[10px] border-black pl-4">
                <WifiOff size={28} className="text-black" />
                <h2 className="text-2xl font-black uppercase">1. Offline Sync & Reconciliation</h2>
              </div>
              
              <div className="border-4 border-black p-5 mb-4">
                <h3 className="font-black text-lg uppercase mb-2">A. Data Conflict Strategy</h3>
                <p className="text-sm font-bold text-slate-800 mb-2">
                  We utilize an <span className="bg-black text-white px-1">Optimistic UI</span> model with WatermelonDB (Local SQLite).
                </p>
                <ul className="list-disc pl-5 text-xs font-bold text-slate-700 space-y-1">
                  <li><strong>Server-Authoritative:</strong> The server is the single source of truth.</li>
                  <li><strong>Queue System:</strong> Offline actions (e.g., "Cancel Job") are queued locally.</li>
                  <li><strong>Reconciliation:</strong> Upon reconnection, the queue processes. Stale actions (e.g., cancelling a completed job) are rejected.</li>
                </ul>
              </div>

              <div className="border-4 border-black p-5">
                <h3 className="font-black text-lg uppercase mb-2">B. Payment Integrity</h3>
                <p className="text-sm font-bold text-slate-800 mb-2">
                  Payments are never processed offline. To prevent double-charging during lag:
                </p>
                <ul className="list-disc pl-5 text-xs font-bold text-slate-700 space-y-1">
                  <li><strong>Idempotency Keys:</strong> Every transaction request carries a unique UUID.</li>
                  <li><strong>Duplicate Check:</strong> If a user taps "Pay" twice, the server recognizes the ID and processes only once.</li>
                </ul>
              </div>
            </section>

            {/* 2. Sequence Diagram */}
            <section className="mb-8 avoid-break">
              <div className="flex items-center gap-3 mb-4 border-l-[10px] border-black pl-4">
                <Activity size={28} className="text-black" />
                <h2 className="text-2xl font-black uppercase">2. Core Sequence Diagram</h2>
              </div>
              
              <div className="bg-slate-100 border-4 border-black p-6 font-mono text-[10px] font-bold leading-relaxed whitespace-pre overflow-hidden">
{`USER APP          SERVER (API)        MECHANIC APP
   |                   |                   |
   |----(SOS Req)----->|                   |
   |                   |----(Job Alert)--->|
   |                   |<---(Accept)-------|
   |<---(Matched)------|                   |
   |                   |                   |
   |--(Tokenize Card)->|                   |
   |                   |---(Escrow Hold)-->|
   |                   |                   |
   |                   |<--(Job Done)------|
   |----(Confirm)----->|                   |
   |                   |---(Release $$)--->|
   |                   |                   |
   |-----(Rate)------->|<-----(Rate)-------|
   v                   v                   v`}
              </div>
            </section>
          </div>
          
          <div className="text-right text-xs font-black text-slate-400">Page 1/2</div>
        </div>

        <div className="page-break"></div>

        {/* === PAGE 2 === */}
        <div className="p-[15mm] pt-[20mm] h-[297mm] relative flex flex-col justify-between">
          
          <div>
            {/* 3. Cost Estimates */}
            <section className="mb-10 avoid-break">
              <div className="flex items-center gap-3 mb-4 border-l-[10px] border-black pl-4">
                <DollarSign size={28} className="text-black" />
                <h2 className="text-2xl font-black uppercase">3. MVP Operational Costs</h2>
              </div>
              
              <table className="w-full border-4 border-black text-sm font-bold">
                <thead className="bg-black text-white">
                  <tr>
                    <th className="p-3 text-left uppercase">Service</th>
                    <th className="p-3 text-left uppercase">Est. Cost (100 Users/Day)</th>
                    <th className="p-3 text-left uppercase">Notes</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-b-2 border-black">
                    <td className="p-3">Google Maps API</td>
                    <td className="p-3">$0 - $50 / mo</td>
                    <td className="p-3 text-xs">Covered by $200 free monthly credit.</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="p-3">AI Diagnostics (LLM)</td>
                    <td className="p-3">$10 - $20 / mo</td>
                    <td className="p-3 text-xs">Using GPT-4o-mini (High efficiency).</td>
                  </tr>
                  <tr className="border-b-2 border-black">
                    <td className="p-3">SMS (OTP/Alerts)</td>
                    <td className="p-3">~$15 / mo</td>
                    <td className="p-3 text-xs">Termii/Twilio. Only for critical alerts.</td>
                  </tr>
                  <tr>
                    <td className="p-3">Push Notifications</td>
                    <td className="p-3">$0 (Free)</td>
                    <td className="p-3 text-xs">Firebase Cloud Messaging (Unlimited).</td>
                  </tr>
                </tbody>
              </table>
            </section>

            {/* 4. Payment & Fallback */}
            <section className="mb-10 avoid-break">
              <div className="flex items-center gap-3 mb-4 border-l-[10px] border-black pl-4">
                <ShieldCheck size={28} className="text-black" />
                <h2 className="text-2xl font-black uppercase">4. Payment & Fallback Strategy</h2>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border-4 border-black p-5">
                  <h3 className="font-black text-lg uppercase mb-2">Payment Provider</h3>
                  <p className="text-xl font-black text-slate-900 mb-1">PAYSTACK</p>
                  <ul className="list-disc pl-4 text-xs font-bold text-slate-700 space-y-1">
                    <li><strong>Split Payments:</strong> Auto-split commission.</li>
                    <li><strong>Escrow Native:</strong> Built-in transfer API.</li>
                    <li><strong>Reliability:</strong> Highest success rate in NG.</li>
                  </ul>
                </div>
                <div className="border-4 border-black p-5">
                  <h3 className="font-black text-lg uppercase mb-2">Socket Disconnect</h3>
                  <p className="text-xl font-black text-slate-900 mb-1">FCM PRIORITY</p>
                  <ul className="list-disc pl-4 text-xs font-bold text-slate-700 space-y-1">
                    <li><strong>Primary:</strong> WebSockets (Real-time).</li>
                    <li><strong>Fallback:</strong> Firebase Data Messages.</li>
                    <li><strong>Logic:</strong> "Wake Up" silent push forces app sync.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          {/* SIGNATURE BLOCK */}
          <footer className="pt-8 border-t-[6px] border-black flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Technical Approval</p>
              <div className="font-serif italic text-5xl text-black mb-2" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <div className="h-1.5 w-48 bg-black mb-2"></div>
              <p className="text-sm font-black text-black uppercase">Lead Technical Architect</p>
              <p className="text-xs font-bold text-slate-600">boluadeoye.com.ng</p>
            </div>
            <div className="text-right">
              <div className="w-24 h-24 bg-black text-white flex items-center justify-center font-black text-4xl">
                BA
              </div>
            </div>
          </footer>
          
          <div className="absolute bottom-8 right-8 text-xs font-black text-slate-400">Page 2/2</div>
        </div>

      </div>
    </div>
  );
}
