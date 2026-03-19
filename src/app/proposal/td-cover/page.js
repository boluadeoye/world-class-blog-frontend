"use client";
import { useState, useEffect } from "react";
import { Download, ShieldCheck, Hexagon, ArrowRight } from "lucide-react";

export default function TDCover() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    document.title = "TD_EXECUTIVE_BRIEF_2026";
    window.print();
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1773905999/blog_assets/penfqat1quony3kafa7s.jpg";

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-slate-900 selection:bg-red-200">
      
      {/* IMPORT LUXURY FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;0,900;1,400&family=Inter:wght@300;400;600;800;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #F9F9F9 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body * { visibility: hidden; }
          #td-render, #td-render * { visibility: visible; }
          #td-render { position: absolute; left: 0; top: 0; width: 100%; background: #F9F9F9; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #F9F9F9;
            box-sizing: border-box;
            overflow: hidden;
          }
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
          <div className="w-24 h-24 mx-auto mb-8 bg-slate-100 rounded-full flex items-center justify-center p-2 border border-slate-200">
            <img src={logoUrl} alt="TD Logo" className="w-full h-full object-contain rounded-full mix-blend-multiply" />
          </div>

          <h1 className="font-playfair text-3xl font-black text-[#0F172A] mb-2 uppercase tracking-widest">Titanium Digital</h1>
          <p className="font-inter text-[#DC2626] text-[10px] font-bold mb-8 tracking-[0.3em] uppercase">Executive Document Engine</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-6 border-l-2 border-[#DC2626] font-mono text-[10px] text-slate-500 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; INJECTING PAPER GRAIN...</p>
              <p className="opacity-75">&gt; ALIGNING SWISS GRID...</p>
              <p className="text-[#0F172A] font-bold animate-pulse">&gt; ASSET_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0F172A] hover:bg-slate-800 text-white font-inter font-bold py-4 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Extract Cover
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE EXECUTIVE COVER (Print Only) === */}
      <div id="td-render" className="hidden print:block text-[#0F172A]">
        
        <div className="a4-page flex flex-col p-[25mm] paper-grain relative">
          
          {/* MASSIVE WATERMARK */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 mix-blend-multiply">
            <img src={logoUrl} alt="TD Watermark" className="w-[180mm] h-[180mm] object-contain grayscale" />
          </div>

          {/* THE SWISS GRID: 1px Crimson Line anchors the entire layout */}
          <div className="relative z-10 h-full flex flex-col border-l border-[#DC2626] pl-[15mm]">
            
            {/* HEADER: LOGO & METADATA */}
            <header className="flex justify-between items-start mb-32">
              <div className="w-16 h-16">
                <img src={logoUrl} alt="TD Logo" className="w-full h-full object-contain mix-blend-multiply" />
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-1">Document ID</p>
                <p className="font-mono text-[10px] font-black text-[#0F172A] uppercase tracking-widest">TD-EXEC-2026-01</p>
              </div>
            </header>

            {/* MAIN TITLE BLOCK */}
            <main className="grow flex flex-col justify-center">
              <p className="font-inter text-sm font-black text-[#DC2626] uppercase tracking-[0.4em] mb-6">
                Strategic Infrastructure Proposal
              </p>
              
              <h1 className="font-playfair text-7xl font-black text-[#0F172A] uppercase tracking-tighter leading-[0.9] mb-10">
                Sovereign<br/>Architecture
              </h1>
              
              <div className="max-w-md">
                <p className="font-inter text-lg font-medium text-slate-600 leading-relaxed">
                  A comprehensive blueprint for high-performance, agentic systems and Zero-Trust data layers. Designed for global scale and sub-200ms inference latency.
                </p>
              </div>
            </main>

            {/* FOOTER: SIGNATURE & DATE */}
            <footer className="mt-auto pt-12 border-t border-slate-200 flex justify-between items-end">
              <div>
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Lead Architect</p>
                <p className="font-inter text-xl font-black text-[#0F172A] uppercase tracking-widest">Bolu Adeoye</p>
                <p className="font-inter text-[10px] font-bold text-[#DC2626] uppercase tracking-widest mt-1">Titanium Digital</p>
              </div>
              
              <div className="text-right">
                <p className="font-mono text-[8px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2">Date of Issue</p>
                <p className="font-mono text-sm font-black text-[#0F172A] uppercase tracking-widest">March 2026</p>
              </div>
            </footer>

          </div>
          
          {/* DECORATIVE ACCENT */}
          <div className="absolute bottom-[25mm] right-[25mm] flex items-center gap-2 opacity-20">
            <div className="w-8 h-px bg-[#0F172A]"></div>
            <Hexagon size={12} className="text-[#0F172A]" />
          </div>

        </div>
      </div>
    </div>
  );
}
