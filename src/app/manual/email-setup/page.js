"use client";
import { Download, ArrowLeft, Mail, Settings, Key, ShieldCheck, Laptop, CheckCircle2, AlertTriangle } from "lucide-react";
import Link from "next/link";

export default function EmailManual() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Corporate_Email_Setup_Guide";
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
            <Mail size={32} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Email Integration Guide</h1>
          <p className="text-slate-400 text-sm mb-8">For Shelter For You Properties</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl"
          >
            <Download size={20} />
            <span>Download Manual PDF</span>
          </button>

          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1: INTRO & PREP ================= */}
        <div className="p-[20mm] h-[297mm] relative flex flex-col">
          
          {/* Header */}
          <div className="border-b-4 border-blue-900 pb-6 mb-8 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Technical Manual</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter leading-none text-slate-900">
                Corporate<br/><span className="text-blue-700">Identity</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-yellow-500 text-black px-4 py-1 font-bold text-xs uppercase inline-block mb-1">Setup Guide</div>
              <p className="text-xs font-mono font-bold">VER: 1.0</p>
            </div>
          </div>

          {/* 1. The Reassurance */}
          <section className="mb-10">
            <div className="bg-blue-50 border-l-8 border-blue-900 p-6 rounded-r-xl">
              <h2 className="text-xl font-black uppercase mb-3 text-blue-900">1. The Digital Fortress</h2>
              <p className="text-sm leading-relaxed font-medium text-slate-800 mb-4">
                We are not changing your Gmail account. We are simply giving it a <strong>Professional Front Door</strong>.
              </p>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
                <ShieldCheck size={18} className="text-green-600" />
                <span>Your old emails, contacts, and folders are 100% SAFE.</span>
              </div>
            </div>
            
            {/* DIAGRAM 1: THE HOUSE */}
            <div className="mt-8 flex justify-center">
              <div className="relative p-6 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 w-full max-w-md text-center">
                <p className="text-[10px] font-bold uppercase text-slate-400 mb-4">Visual Concept</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="border-4 border-slate-400 bg-white p-4 rounded-lg w-32 h-24 flex flex-col items-center justify-center">
                    <span className="text-2xl">🏠</span>
                    <span className="text-[10px] font-bold mt-1">Your Gmail</span>
                    <span className="text-[8px] text-slate-500">(Private)</span>
                  </div>
                  <div className="h-1 w-12 bg-blue-900"></div>
                  <div className="border-4 border-blue-900 bg-blue-900 text-white p-4 rounded-lg w-32 h-24 flex flex-col items-center justify-center shadow-xl">
                    <span className="text-2xl">🚪</span>
                    <span className="text-[10px] font-bold mt-1">Corporate Email</span>
                    <span className="text-[8px] text-blue-200">(Public)</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. The Preparation */}
          <section className="mb-8">
            <h2 className="text-xl font-black uppercase border-b-2 border-slate-200 pb-2 mb-6">2. Preparation</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="border-2 border-red-500 p-4 rounded-lg bg-red-50">
                <div className="flex items-center gap-2 mb-2 text-red-700">
                  <Laptop size={20} />
                  <span className="font-black text-sm uppercase">Requirement</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  You MUST use a <strong>Laptop or Desktop</strong>. This setup cannot be done inside the mobile app.
                </p>
              </div>
              <div className="border-2 border-yellow-500 p-4 rounded-lg bg-yellow-50">
                <div className="flex items-center gap-2 mb-2 text-yellow-700">
                  <Key size={20} />
                  <span className="font-black text-sm uppercase">The Key</span>
                </div>
                <p className="text-xs font-bold text-slate-800">
                  Have the <strong>Secure Access Key</strong> ready. I will send this to you privately via WhatsApp.
                </p>
              </div>
            </div>
          </section>

          <div className="absolute bottom-8 right-8 text-xs font-black text-slate-400">Page 1/2</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2: EXECUTION ================= */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* 3. Step-by-Step Execution */}
          <section className="mb-10">
            <h2 className="text-xl font-black uppercase border-l-8 border-blue-900 pl-4 mb-8 text-slate-900">3. The Execution</h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0">1</div>
                <div>
                  <h4 className="font-bold text-sm uppercase mb-1">The Gateway</h4>
                  <p className="text-xs text-slate-700 mb-2">Open Gmail on your computer. Click the <strong>Gear Icon (⚙️)</strong> at the top right, then click <strong>"See all settings"</strong>.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0">2</div>
                <div>
                  <h4 className="font-bold text-sm uppercase mb-1">The Identity</h4>
                  <p className="text-xs text-slate-700 mb-2">Click the <strong>"Accounts and Import"</strong> tab. Look for the section <strong>"Send mail as"</strong> and click <strong>"Add another email address"</strong>.</p>
                  
                  {/* DIAGRAM 2: SETTINGS MAP */}
                  <div className="border border-slate-300 bg-slate-100 p-2 rounded text-[10px] font-mono text-slate-500 mt-2 w-full max-w-md">
                    [ General ] [ Labels ] [ <span className="bg-yellow-300 text-black px-1 font-bold">Accounts and Import</span> ] [ Filters ]
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0">3</div>
                <div>
                  <h4 className="font-bold text-sm uppercase mb-1">The Mask</h4>
                  <p className="text-xs text-slate-700">A yellow popup will appear. Enter your <strong>Business Name</strong> and your new <strong>Corporate Email</strong>.</p>
                  <div className="flex items-center gap-2 mt-2 text-red-600 text-xs font-black bg-red-50 p-2 rounded border border-red-200 inline-block">
                    <AlertTriangle size={14} />
                    CRITICAL: Uncheck "Treat as an alias"
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center font-bold rounded-full shrink-0">4</div>
                <div className="w-full">
                  <h4 className="font-bold text-sm uppercase mb-2 text-blue-800">The Handshake (SMTP Settings)</h4>
                  <div className="bg-slate-900 text-white p-4 rounded-lg font-mono text-xs w-full shadow-lg">
                    <div className="grid grid-cols-[100px_1fr] gap-y-2">
                      <span className="text-slate-400">SMTP Server:</span> <span className="font-bold text-yellow-400">smtp.resend.com</span>
                      <span className="text-slate-400">Port:</span> <span className="font-bold text-yellow-400">465</span>
                      <span className="text-slate-400">Username:</span> <span className="font-bold text-white">resend</span>
                      <span className="text-slate-400">Password:</span> <span className="text-slate-500 italic">[Paste the Key I sent you]</span>
                      <span className="text-slate-400">Security:</span> <span className="font-bold text-green-400">SSL (Recommended)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0">5</div>
                <div>
                  <h4 className="font-bold text-sm uppercase mb-1">The Verification</h4>
                  <p className="text-xs text-slate-700">Click "Add Account". Gmail will send a code. Check your inbox (I have already routed it there), copy the code, and paste it into the popup.</p>
                </div>
              </div>
            </div>
          </section>

          {/* 4. Success & Closing */}
          <section className="mt-auto mb-12">
            <div className="bg-green-50 border-2 border-green-500 p-6 rounded-xl flex items-center gap-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg">
                <CheckCircle2 size={32} />
              </div>
              <div>
                <h3 className="font-black text-lg uppercase text-green-800 mb-1">System Operational</h3>
                <p className="text-xs font-medium text-green-900">
                  Congratulations. Your corporate identity is now fully weaponized for business. When you compose a new email, simply click the "From" dropdown to switch identities.
                </p>
              </div>
            </div>
          </section>

          {/* SIGNATURE BLOCK */}
          <footer className="border-t-4 border-slate-900 pt-6 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Technical Support</p>
              <div className="font-serif italic text-3xl text-slate-900 mb-1" style={{ fontFamily: 'cursive' }}>
                Boluwatife Adeoye
              </div>
              <p className="text-xs font-bold text-slate-500">If you hit a snag, I am one message away.</p>
            </div>
            <div className="text-right">
              <div className="w-16 h-16 bg-slate-900 text-white flex items-center justify-center font-black text-2xl rounded-lg">
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
