"use client";
import { Download, ArrowLeft, Mail, Laptop, CheckCircle2, AlertTriangle, MousePointer2 } from "lucide-react";
import Link from "next/link";

export default function EmailManual() {
  
  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Email_Setup_Guide_Madam_Atinuke";
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

      {/* === VIEW 1: DOWNLOAD PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden z-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
            <Mail size={32} className="text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-white mb-2">Setup Guide</h1>
          <p className="text-slate-400 text-sm mb-8">Specially prepared for Madam Atinuke</p>

          <button 
            onClick={handlePrint}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-slate-200 text-slate-950 font-bold py-4 rounded-xl transition-all transform hover:scale-[1.02] shadow-xl"
          >
            <Download size={20} />
            <span>Download PDF Guide</span>
          </button>

          <Link href="/" className="block mt-6 text-xs text-slate-500 hover:text-slate-300 transition-colors">
            ← Return to Dashboard
          </Link>
        </div>
      </div>

      {/* === VIEW 2: THE DOCUMENT (Print Only) === */}
      <div id="print-container" className="bg-white w-full max-w-[210mm] mx-auto hidden print:block">
        
        {/* ================= PAGE 1 ================= */}
        <div className="p-[20mm] h-[297mm] relative flex flex-col">
          
          {/* Header */}
          <div className="border-b-4 border-blue-900 pb-6 mb-8 flex justify-between items-end">
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Shelter For You Properties</p>
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-slate-900">
                Professional Email<br/><span className="text-blue-700">Setup Guide</span>
              </h1>
            </div>
            <div className="text-right">
              <div className="bg-blue-100 text-blue-900 px-4 py-1 font-bold text-xs uppercase inline-block mb-1">For Madam Atinuke</div>
            </div>
          </div>

          {/* Intro */}
          <section className="mb-8 bg-blue-50 p-6 rounded-xl border-l-8 border-blue-600">
            <p className="text-sm font-medium text-slate-800 leading-relaxed">
              Dear Madam Atinuke,
            </p>
            <p className="text-sm font-medium text-slate-800 leading-relaxed mt-2">
              We are going to connect your new professional email (<strong>info@shelterforyouproperties.com</strong>) to your Gmail. This will allow you to send emails that look official and trustworthy to your clients.
            </p>
            <p className="text-sm font-bold text-blue-800 mt-2">
              Don't worry—nothing will happen to your old emails. Everything is safe.
            </p>
          </section>

          {/* Requirement */}
          <section className="mb-8">
            <div className="flex items-center gap-4 p-4 border-2 border-red-200 bg-red-50 rounded-lg">
              <Laptop size={32} className="text-red-600" />
              <div>
                <h3 className="font-black text-sm uppercase text-red-700">Important Requirement</h3>
                <p className="text-xs text-slate-700">Please do this on a <strong>Laptop or Computer</strong>. It is very difficult to do on a phone.</p>
              </div>
            </div>
          </section>

          {/* STEPS START */}
          <section className="space-y-6">
            
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0 text-lg">1</div>
              <div>
                <h4 className="font-black text-lg text-slate-900 mb-1">Go to Settings</h4>
                <p className="text-sm text-slate-700 mb-2">
                  Open your Gmail on the computer. Look at the top-right corner for a <strong>Gear Icon</strong> (it looks like a small wheel).
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-2 rounded inline-block">
                  <MousePointer2 size={14} /> Click "See all settings"
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0 text-lg">2</div>
              <div>
                <h4 className="font-black text-lg text-slate-900 mb-1">Find the "Accounts" Tab</h4>
                <p className="text-sm text-slate-700 mb-2">
                  At the top of the settings page, you will see a row of words like "General", "Labels", etc.
                </p>
                <p className="text-sm text-slate-700">
                  Click on the one that says: <strong>Accounts and Import</strong>.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0 text-lg">3</div>
              <div>
                <h4 className="font-black text-lg text-slate-900 mb-1">Add the New Email</h4>
                <p className="text-sm text-slate-700 mb-2">
                  Scroll down a little bit until you see a section called <strong>"Send mail as"</strong>.
                </p>
                <p className="text-sm text-slate-700">
                  Click the blue link that says: <strong>Add another email address</strong>.
                </p>
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-slate-600 italic">
                  A new yellow window will pop up on your screen.
                </div>
              </div>
            </div>

          </section>

          <div className="absolute bottom-8 right-8 text-xs font-black text-slate-400">Page 1/2</div>
        </div>

        <div className="page-break"></div>

        {/* ================= PAGE 2 ================= */}
        <div className="p-[20mm] pt-[20mm] h-[297mm] relative flex flex-col">
          
          {/* Step 4 - The Form */}
          <section className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-bold rounded-full shrink-0 text-lg">4</div>
              <div className="w-full">
                <h4 className="font-black text-lg text-slate-900 mb-2">Fill in the Details</h4>
                <p className="text-sm text-slate-700 mb-4">
                  Enter the following details exactly as shown below:
                </p>

                {/* VISUAL FORM MOCKUP */}
                <div className="border-2 border-slate-300 rounded-lg p-4 bg-slate-50 w-full">
                  <div className="mb-3">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Name:</p>
                    <div className="bg-white border border-slate-300 p-2 rounded text-sm font-bold text-black">
                      Shelter For You Properties
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-1">Email Address:</p>
                    <div className="bg-white border border-slate-300 p-2 rounded text-sm font-bold text-black">
                      info@shelterforyouproperties.com
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-red-100 p-2 rounded border border-red-200">
                    <div className="w-4 h-4 border-2 border-red-600 bg-white rounded flex items-center justify-center"></div>
                    <p className="text-xs font-bold text-red-700">
                      IMPORTANT: Uncheck "Treat as an alias" (Make the box empty)
                    </p>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">Click <strong>Next Step &rarr;</strong></p>
              </div>
            </div>
          </section>

          {/* Step 5 - The Server */}
          <section className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center font-bold rounded-full shrink-0 text-lg">5</div>
              <div className="w-full">
                <h4 className="font-black text-lg text-slate-900 mb-2">Connect the Server</h4>
                <p className="text-sm text-slate-700 mb-4">
                  This is the final technical step. Please type these <strong>exact</strong> details:
                </p>

                {/* SERVER SETTINGS MOCKUP */}
                <div className="bg-slate-900 text-white p-5 rounded-xl shadow-lg">
                  <div className="grid grid-cols-[120px_1fr] gap-y-3 text-sm">
                    <span className="text-slate-400">SMTP Server:</span>
                    <span className="font-mono font-bold text-yellow-400">smtp.resend.com</span>
                    
                    <span className="text-slate-400">Port:</span>
                    <span className="font-mono font-bold text-yellow-400">465</span>
                    
                    <span className="text-slate-400">Username:</span>
                    <span className="font-mono font-bold text-white">resend</span>
                    
                    <span className="text-slate-400">Password:</span>
                    <span className="font-mono text-slate-500 italic">[Copy & Paste the long code I sent you on WhatsApp]</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs font-bold text-green-400">Select: Secured connection using SSL</span>
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">Click <strong>Add Account &rarr;</strong></p>
              </div>
            </div>
          </section>

          {/* Step 6 - Verification */}
          <section className="mb-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-slate-900 text-white flex items-center justify-center font-bold rounded-full shrink-0 text-lg">6</div>
              <div>
                <h4 className="font-black text-lg text-slate-900 mb-1">Enter the Code</h4>
                <p className="text-sm text-slate-700">
                  Google will ask for a code. <strong>Check your normal Gmail inbox now.</strong> You will see an email from "Gmail Team". Open it, copy the number, and paste it into the box.
                </p>
              </div>
            </div>
          </section>

          {/* Success */}
          <div className="mt-auto bg-green-50 border-2 border-green-500 p-4 rounded-xl flex items-center gap-4">
            <CheckCircle2 size={32} className="text-green-600" />
            <div>
              <h3 className="font-black text-lg text-green-800">All Done!</h3>
              <p className="text-xs font-medium text-green-900">
                Now, when you write a new email, click the "From" button to switch to <strong>Shelter For You Properties</strong>.
              </p>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-6 pt-6 border-t-4 border-slate-900 flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Technical Support</p>
              <div className="font-serif italic text-2xl text-slate-900">Boluwatife Adeoye</div>
            </div>
            <div className="text-right">
              <div className="w-12 h-12 bg-slate-900 text-white flex items-center justify-center font-black text-xl rounded-lg">BA</div>
            </div>
          </footer>
          
          <div className="absolute bottom-8 right-8 text-xs font-black text-slate-400">Page 2/2</div>
        </div>

      </div>
    </div>
  );
}
