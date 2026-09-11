"use client";
import { useState, useEffect } from "react";
import { Download, Printer, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";

export default function LibraryIDCard() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "FUOYE_LIBRARY_PERMIT_ADEOYE_BOLUWATIFE";
    window.print();
    document.title = originalTitle;
  };

  // ASSETS
  const fuoyeLogo = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1789103178/blog_assets/j5tf95zha4v0tvtckhuh.png";
  const passportPhoto = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1789104188/blog_assets/sfdfp0vbe0u8wvdcj5in.jpg";

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-100 selection:bg-blue-500/30">
      
      {/* IMPORT FONTS: Inter for structure, Caveat for realistic handwriting */}
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&family=Caveat:wght@600;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & TRUE-CARD PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { 
            size: 125mm 82mm; /* EXACT PHYSICAL CARD DIMENSIONS */
            margin: 0; 
          }
          body { 
            background-color: #FFFFFF !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body * { visibility: hidden; }
          #card-render, #card-render * { visibility: visible; }
          #card-render { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 125mm; 
            height: 82mm; 
            background: #FFFFFF; 
            margin: 0;
            padding: 0;
          }
          .no-print { display: none !important; }
        }
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-handwriting { font-family: 'Caveat', cursive; }
        
        /* Realistic Blue Ink Color */
        .ink-blue { color: #1e3a8a; }
        
        /* Card Base Texture */
        .card-base {
          background-color: #fdfdfc;
          box-shadow: inset 0 0 40px rgba(0,0,0,0.02);
        }
      `}</style>

      {/* === VIEW 1: THE OBSIDIAN PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950"></div>
        
        <div className="relative z-10 w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-2xl p-8 shadow-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <CreditCard size={32} className="text-blue-400" />
          </div>

          <h1 className="font-inter text-2xl font-black text-white mb-2 tracking-tight">Library Permit Engine</h1>
          <p className="font-mono text-blue-400 text-[10px] mb-8 tracking-[0.2em] uppercase">FUOYE // ELS/2021/1104</p>

          {/* PRE-FLIGHT CHECKLIST */}
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg mb-8 text-left">
            <p className="font-inter text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <AlertCircle size={14} className="text-amber-500"/> Print Checklist
            </p>
            <ul className="space-y-2 font-mono text-[9px] text-slate-500">
              <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-emerald-500"/> Set Paper Size to: <span className="text-white font-bold">125mm x 82mm</span> (or Custom)</li>
              <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-emerald-500"/> Set Scale to: <span className="text-white font-bold">100% / Actual Size</span></li>
              <li className="flex items-center gap-2"><ShieldCheck size={12} className="text-emerald-500"/> Enable: <span className="text-white font-bold">Background Graphics</span></li>
            </ul>
          </div>

          {!isReady ? (
            <div className="text-blue-500 font-mono text-xs animate-pulse tracking-widest">RENDERING CARD ASSETS...</div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-inter font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
              <Printer size={18} />
              Extract Physical Card
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE TRUE-CARD RENDER (Print Only) === */}
      <div id="card-render" className="hidden print:block text-black">
        
        {/* THE PHYSICAL CARD BOUNDARY (125mm x 82mm) */}
        <div className="w-[125mm] h-[82mm] card-base relative overflow-hidden border-[0.5pt] border-slate-300 box-border p-[4mm] flex flex-col">
          
          {/* FAINT CENTRAL WATERMARK */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none z-0">
            <img src={fuoyeLogo} alt="Watermark" className="w-[60mm] h-[60mm] object-contain grayscale" />
          </div>

          {/* HEADER SECTION */}
          <header className="flex justify-between items-start relative z-10 mb-2">
            {/* Left: Logo & Title */}
            <div className="flex items-center gap-2">
              <img src={fuoyeLogo} alt="FUOYE Logo" className="w-[14mm] h-[14mm] object-contain" />
              <div className="flex flex-col justify-center">
                <p className="font-inter text-[7pt] font-bold text-slate-800 tracking-wide leading-tight">UNIVERSITY LIBRARY</p>
                <h1 className="font-inter text-[10pt] font-black text-slate-900 tracking-tight leading-tight">FEDERAL UNIVERSITY, OYE-EKITI</h1>
                <p className="font-inter text-[6pt] font-bold text-slate-700 tracking-wide leading-tight">UNDERGRADUATE REGISTRATION CARD</p>
              </div>
            </div>
            
            {/* Right: Reg No Stamp */}
            <div className="flex flex-col items-center mt-1">
              <div className="border-[0.5pt] border-slate-800 w-[22mm] h-[6mm] flex items-center justify-center relative">
                {/* Handwritten Blue Stamp */}
                <span className="font-handwriting text-[14pt] ink-blue absolute -top-1 transform -rotate-2">600648</span>
              </div>
              <p className="font-inter text-[5pt] font-bold text-slate-800 mt-0.5">REG. NO</p>
            </div>
          </header>

          {/* PERMIT BADGE */}
          <div className="flex justify-center relative z-10 mb-2">
            <div className="border-[1.5pt] border-slate-900 rounded-full px-4 py-0.5 bg-slate-900 text-white">
              <span className="font-inter text-[8pt] font-black tracking-widest">PERMIT</span>
            </div>
          </div>

          {/* MAIN CONTENT AREA (Form Fields + Passport) */}
          <main className="flex justify-between relative z-10 grow">
            
            {/* Left: Form Fields */}
            <div className="w-[75%] flex flex-col gap-[3mm] pt-1">
              
              {/* Surname */}
              <div className="flex items-end">
                <span className="font-inter text-[7pt] font-bold text-slate-900 whitespace-nowrap mr-1">Surname (block letters)</span>
                <div className="grow border-b-[0.5pt] border-slate-800 relative h-[4mm]">
                  <span className="font-handwriting text-[16pt] ink-blue absolute bottom-[-1mm] left-2 uppercase tracking-wide">ADEOYE</span>
                </div>
              </div>

              {/* Other Names */}
              <div className="flex items-end">
                <span className="font-inter text-[7pt] font-bold text-slate-900 whitespace-nowrap mr-1">Other Names</span>
                <div className="grow border-b-[0.5pt] border-slate-800 relative h-[4mm]">
                  <span className="font-handwriting text-[16pt] ink-blue absolute bottom-[-1mm] left-2 uppercase tracking-wide">BOLUWATIFE</span>
                </div>
              </div>

              {/* Matric No */}
              <div className="flex items-end">
                <span className="font-inter text-[7pt] font-bold text-slate-900 whitespace-nowrap mr-1">Matric No.</span>
                <div className="grow border-b-[0.5pt] border-slate-800 relative h-[4mm]">
                  <span className="font-handwriting text-[16pt] ink-blue absolute bottom-[-1mm] left-2 uppercase tracking-wide">ELS/2021/1104</span>
                </div>
              </div>

              {/* Dept & Faculty */}
              <div className="flex items-end gap-2">
                <div className="flex items-end w-[45%]">
                  <span className="font-inter text-[7pt] font-bold text-slate-900 whitespace-nowrap mr-1">Dept.</span>
                  <div className="grow border-b-[0.5pt] border-slate-800 relative h-[4mm]">
                    <span className="font-handwriting text-[16pt] ink-blue absolute bottom-[-1mm] left-2 uppercase tracking-wide">ELS</span>
                  </div>
                </div>
                <div className="flex items-end grow">
                  <span className="font-inter text-[7pt] font-bold text-slate-900 whitespace-nowrap mr-1">Faculty</span>
                  <div className="grow border-b-[0.5pt] border-slate-800 relative h-[4mm]">
                    <span className="font-handwriting text-[16pt] ink-blue absolute bottom-[-1mm] left-2 uppercase tracking-wide">ARTS</span>
                  </div>
                </div>
              </div>

              {/* Validity */}
              <div className="flex items-end w-[60%]">
                <span className="font-inter text-[7pt] font-bold text-slate-900 whitespace-nowrap mr-1">Validity</span>
                <div className="grow border-b-[0.5pt] border-slate-800 relative h-[4mm]">
                  <span className="font-handwriting text-[16pt] ink-blue absolute bottom-[-1mm] left-4 tracking-wide">15/12/2026</span>
                </div>
              </div>

            </div>

            {/* Right: Passport Photo */}
            <div className="w-[22%] flex flex-col items-end pt-1">
              <div className="w-[22mm] h-[28mm] border-[0.5pt] border-slate-400 bg-red-600 overflow-hidden shadow-sm transform rotate-1">
                <img src={passportPhoto} alt="Passport" className="w-full h-full object-cover" />
              </div>
            </div>

          </main>

          {/* FOOTER SECTION (Pledge & Signatures) */}
          <footer className="relative z-10 mt-1">
            <p className="font-inter text-[6.5pt] font-bold text-slate-900 leading-tight mb-3 pr-4">
              I, an undergraduate student of the University, wish to be registered as a user in the University Library. I pledge to observe all Library Rules and Regulations
            </p>
            
            <div className="flex items-end justify-between px-4">
              {/* Signature */}
              <div className="flex items-end w-[45%]">
                <span className="font-inter text-[7pt] font-bold text-slate-900 whitespace-nowrap mr-1">Signature</span>
                <div className="grow border-b-[0.5pt] border-slate-800 relative h-[4mm]">
                  {/* Vectorized Blue Signature */}
                  <svg className="absolute bottom-0 left-2 w-12 h-6 text-[#1e3a8a]" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 40 C 20 10, 40 10, 30 40 C 20 40, 50 20, 60 30 C 70 40, 90 30, 80 20" />
                  </svg>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-end w-[45%]">
                <span className="font-inter text-[7pt] font-bold text-slate-900 whitespace-nowrap mr-1">Date</span>
                <div className="grow border-b-[0.5pt] border-slate-800 relative h-[4mm]">
                  <span className="font-handwriting text-[14pt] ink-blue absolute bottom-[-1mm] left-2 tracking-wide">14/08/2026</span>
                </div>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
