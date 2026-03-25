"use client";
import { useState, useEffect } from "react";
import { Download, Star, ArrowRight, Quote, CheckCircle2, Target, TrendingUp, Zap } from "lucide-react";

export default function InevitabilityArchitecture() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "THE_INEVITABILITY_ARCHITECTURE_2026";
    window.print();
    document.title = originalTitle;
  };

  const img1 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416970/blog_assets/w7fk5rwutslttbd5b6wn.png";
  const img2 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416980/blog_assets/bsxfetwlo4hzs7n8jbar.png";
  const img3 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416992/blog_assets/eabilzeanxioyxiceeb7.png";

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#0A0A0A] selection:bg-[#C5A059]/30">
      
      {/* IMPORT LUXURY EDITORIAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,800;0,900;1,400;1,600&family=Inter:wght@300;400;600;800;900&family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT-SAFE STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #FDFCFB !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            counter-reset: pageCounter;
          }
          body * { visibility: hidden; }
          #editorial-render, #editorial-render * { visibility: visible; }
          #editorial-render { position: absolute; left: 0; top: 0; width: 100%; background: #FDFCFB; }
          .a4-page { 
            height: 297mm; width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #FDFCFB;
            box-sizing: border-box;
            overflow: hidden;
          }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-newsreader { font-family: 'Newsreader', serif; }
        
        /* PAPER TEXTURE (Print Safe) */
        .paper-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-[#0A0A0A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#C5A059]/10 via-[#0A0A0A] to-[#0A0A0A]"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-12 text-center shadow-2xl border-t-8 border-[#C5A059]">
          <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center bg-[#FDFCFB] rounded-full border border-slate-200">
            <Star size={32} className="text-[#C5A059]" />
          </div>

          <h1 className="font-playfair text-3xl font-black text-[#0A0A0A] mb-2 uppercase tracking-widest">The Architecture</h1>
          <p className="font-inter text-[#C5A059] text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">High-Ticket Lead Magnet</p>

          {!isReady ? (
            <div className="space-y-2 text-left bg-slate-50 p-6 border-l-2 border-[#C5A059] font-mono text-[10px] text-slate-500 h-32 flex flex-col justify-end">
              <p className="opacity-50">&gt; INJECTING EDITORIAL TYPOGRAPHY...</p>
              <p className="opacity-75">&gt; ALIGNING SWISS GRID...</p>
              <p className="text-[#0A0A0A] font-bold animate-pulse">&gt; MANUSCRIPT_READY</p>
            </div>
          ) : (
            <button onClick={handlePrint} className="w-full flex items-center justify-center gap-3 bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white font-inter font-black py-5 uppercase tracking-widest transition-all shadow-xl">
              <Download size={18} />
              Extract Document
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 5-PAGE EDITORIAL (Print Only) === */}
      <div id="editorial-render" className="hidden print:block text-[#0A0A0A]">
        
        {/* PAGE 1: THE COVER (ASYMMETRICAL SPLIT) */}
        <div className="a4-page flex paper-grain">
          {/* Left Column: Typography */}
          <div className="w-[45%] h-full p-[20mm] flex flex-col justify-between border-r border-slate-200 relative z-10 bg-[#FDFCFB]">
            <header>
              <div className="w-12 h-12 border border-[#0A0A0A] flex items-center justify-center mb-6">
                <Star size={16} className="text-[#0A0A0A]" strokeWidth={1.5} />
              </div>
              <p className="font-inter text-[8px] font-bold tracking-[0.5em] uppercase text-slate-400">Volume 01 // 2026</p>
            </header>

            <main className="relative">
              <p className="font-inter text-[10px] font-black text-[#C5A059] uppercase tracking-[0.4em] mb-6">The Framework</p>
              {/* Massive Typography that intentionally breaks the grid slightly for editorial feel */}
              <h1 className="font-playfair text-7xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-[0.85] mb-8 -mr-20 relative z-20 mix-blend-multiply">
                The<br/>Inevitability<br/>Architecture
              </h1>
              <div className="h-[2px] w-16 bg-[#C5A059] mb-8"></div>
              <p className="font-newsreader text-xl italic text-slate-600 leading-relaxed pr-4">
                A Strategic Blueprint for High-Ticket Closing and Psychological Authority.
              </p>
            </main>

            <footer>
              <h2 className="font-playfair text-2xl font-black text-[#0A0A0A] uppercase tracking-[0.2em]">Bolu Adeoye</h2>
              <p className="font-inter text-[8px] font-bold text-[#C5A059] uppercase tracking-[0.4em] mt-2">Lead Design Architect</p>
            </footer>
          </div>
          
          {/* Right Column: Full Bleed Image */}
          <div className="w-[55%] h-full relative overflow-hidden bg-slate-100">
            <img src={img1} alt="Ascension" className="w-full h-full object-cover grayscale contrast-125" />
            {/* Subtle Gold Overlay */}
            <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-multiply"></div>
          </div>
        </div>

        {/* PAGE 2: THE MANIFESTO (MASSIVE WHITESPACE) */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain">
          <Header title="THE ANTI-COMMODITY HOOK" />
          
          <main className="grow flex flex-col justify-center items-center text-center px-10">
            <Quote size={48} className="text-[#C5A059] opacity-30 mb-10" />
            
            <h2 className="font-playfair text-4xl font-black text-[#0A0A0A] leading-tight mb-12">
              "If your lead magnet looks like a PDF, you are already losing the psychological battle."
            </h2>
            
            <div className="w-full max-w-md">
              <p className="font-newsreader text-xl text-slate-700 leading-[2] text-justify">
                In the high-ticket coaching space, visual friction is the primary cause of lead drop-off. Your prospect must feel they are entering a proven, expensive system—not reading a generic Canva template. We do not design documents; we engineer <span className="font-playfair font-bold italic text-[#0A0A0A]">Visual Authority</span>.
              </p>
            </div>
            
            <div className="mt-16 h-16 w-[1px] bg-[#C5A059]"></div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: THE CONVERSION FUNNEL (SCHEMATIC) */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain">
          <Header title="THE 3-PILLAR FRAMEWORK" />
          
          <main className="grow flex flex-col mt-12">
            <div className="flex justify-between items-end mb-16">
              <h2 className="font-playfair text-5xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-none">The Architecture<br/>of Closing</h2>
              <div className="w-32 h-[1px] bg-slate-300 mb-2"></div>
            </div>
            
            <div className="grid grid-cols-12 gap-12 grow">
              {/* Left: The Image */}
              <div className="col-span-5 flex flex-col">
                <div className="h-[60mm] w-full overflow-hidden border border-slate-200 mb-8">
                  <img src={img2} alt="Strategy" className="w-full h-full object-cover grayscale" />
                </div>
                <div className="p-6 bg-slate-50 border-l-2 border-[#C5A059]">
                  <p className="font-inter text-[8px] font-black uppercase tracking-[0.3em] text-slate-400 mb-2">Strategic Imperative</p>
                  <p className="font-newsreader text-sm text-slate-700 italic leading-relaxed">
                    "By the time you reach the price, the value must be so thoroughly engineered that the transaction becomes the only logical next step."
                  </p>
                </div>
              </div>
              
              {/* Right: The 3 Pillars */}
              <div className="col-span-7 space-y-12 pt-4">
                <div className="relative pl-10 border-l border-slate-200">
                  <span className="absolute -left-4 top-0 font-playfair text-3xl font-black text-[#C5A059] bg-[#FDFCFB] py-2">01</span>
                  <h3 className="font-inter text-xs font-black uppercase tracking-[0.2em] mb-3 text-[#0A0A0A] flex items-center gap-3"><Target size={16} className="text-[#C5A059]"/> The Psychological Hook</h3>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Establishing immediate dominance through visual authority. We replace generic layouts with editorial brutalism to command attention.</p>
                </div>

                <div className="relative pl-10 border-l border-slate-200">
                  <span className="absolute -left-4 top-0 font-playfair text-3xl font-black text-[#C5A059] bg-[#FDFCFB] py-2">02</span>
                  <h3 className="font-inter text-xs font-black uppercase tracking-[0.2em] mb-3 text-[#0A0A0A] flex items-center gap-3"><TrendingUp size={16} className="text-[#C5A059]"/> Narrative Architecture</h3>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Moving the prospect from uncertainty to inevitability using data-driven storytelling. We bridge the gap between their current pain and your high-ticket solution.</p>
                </div>

                <div className="relative pl-10 border-l border-slate-200">
                  <span className="absolute -left-4 top-0 font-playfair text-3xl font-black text-[#C5A059] bg-[#FDFCFB] py-2">03</span>
                  <h3 className="font-inter text-xs font-black uppercase tracking-[0.2em] mb-3 text-[#0A0A0A] flex items-center gap-3"><Zap size={16} className="text-[#C5A059]"/> The Frictionless Close</h3>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Removing the "Ask." We engineer the document so that a $10k+ transaction feels like a natural progression rather than a sales pitch.</p>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: THE STATUS MATRIX (DATA TABLE) */}
        <div className="a4-page flex flex-col p-[25mm] paper-grain">
          <Header title="PERFORMANCE METRICS" />
          
          <main className="grow flex flex-col mt-12">
            <h2 className="font-playfair text-5xl font-black text-[#0A0A0A] mb-16 tracking-tighter">Client Transformation</h2>
            
            <div className="border border-[#0A0A0A] shadow-sm">
              <div className="grid grid-cols-3 bg-[#0A0A0A] text-white p-6 font-inter text-[10px] font-black uppercase tracking-widest">
                <div>Key Metric</div>
                <div className="text-slate-400">Baseline Approach</div>
                <div className="text-[#C5A059]">Matrix Implementation</div>
              </div>
              
              <div className="grid grid-cols-3 p-8 border-b border-slate-200 items-center">
                <div className="font-inter text-xs font-bold uppercase text-[#0A0A0A]">Lead Quality</div>
                <div className="font-newsreader text-xl text-slate-500 italic">Unfiltered</div>
                <div className="font-inter text-2xl font-black text-[#0A0A0A]">High-Intent</div>
              </div>

              <div className="grid grid-cols-3 p-8 border-b border-slate-200 items-center bg-slate-50">
                <div className="font-inter text-xs font-bold uppercase text-[#0A0A0A]">Close Rate</div>
                <div className="font-newsreader text-xl text-slate-500 italic">12.5%</div>
                <div className="font-inter text-3xl font-black text-[#C5A059]">44.2%</div>
              </div>

              <div className="grid grid-cols-3 p-8 items-center">
                <div className="font-inter text-xs font-bold uppercase text-[#0A0A0A]">Avg. Ticket Size</div>
                <div className="font-newsreader text-xl text-slate-500 italic">$2,500</div>
                <div className="font-inter text-3xl font-black text-[#0A0A0A]">$15,000+</div>
              </div>
            </div>

            <div className="mt-20 p-10 bg-white border border-slate-200 relative">
              <div className="absolute -top-4 left-10 bg-[#C5A059] text-white px-4 py-1 font-inter text-[8px] font-black uppercase tracking-widest">The Verdict</div>
              <p className="font-newsreader text-2xl text-slate-700 leading-relaxed italic">
                "The Matrix didn't just change our numbers; it changed how we are perceived in the market. We went from being a vendor to being a premium partner."
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 5: THE FINAL SEAL (CTA) */}
        <div className="a4-page flex flex-col relative bg-[#0A0A0A]">
          {/* Full Bleed Image Footer */}
          <div className="absolute bottom-0 left-0 w-full h-[40%] z-0">
            <img src={img3} alt="Wealth" className="w-full h-full object-cover opacity-80 grayscale contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#0A0A0A]/80 to-[#0A0A0A]"></div>
            <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-multiply"></div>
          </div>

          <main className="grow p-[25mm] flex flex-col justify-center items-center text-center relative z-10">
            <h2 className="font-playfair text-6xl font-black text-white uppercase mb-6 tracking-tighter">Ready to Scale?</h2>
            <p className="font-newsreader text-2xl text-slate-400 mb-16 max-w-md italic">Apply the Inevitability Architecture to your coaching infrastructure today.</p>
            
            <div className="w-full max-w-sm bg-white p-10 relative border-t-4 border-[#C5A059] shadow-2xl">
              <h3 className="font-inter text-lg font-black uppercase mb-4 text-[#0A0A0A]">Book Strategy Call</h3>
              <p className="font-inter text-xs text-slate-500 mb-8">Scan the secure code below to access the private calendar.</p>
              <div className="w-32 h-32 bg-slate-50 mx-auto mb-4 flex items-center justify-center border border-slate-200 p-2">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://boluadeoye.com.ng/portfolio/inevitability" alt="QR" className="w-full h-full" />
              </div>
            </div>

            <div className="mt-24 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-[#C5A059] flex items-center justify-center mb-4 bg-[#0A0A0A]">
                <CheckCircle2 size={24} className="text-[#C5A059]" />
              </div>
              <p className="font-inter text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em]">Approved for Release</p>
              <h2 className="font-playfair text-3xl font-black text-white uppercase mt-3 tracking-widest">Bolu Adeoye</h2>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}

// Reusable Header/Footer Components
function Header({ title }) {
  return (
    <header className="flex justify-between items-end border-b border-slate-200 pb-4 relative z-10">
      <h2 className="font-inter text-[10px] font-black text-[#0A0A0A] uppercase tracking-widest">{title}</h2>
      <div className="font-mono text-[8px] text-slate-400 uppercase tracking-widest">BA-ARCH-2026</div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-auto pt-4 border-t border-slate-200 flex justify-between items-center relative z-10">
      <span className="font-inter text-[8px] font-bold uppercase tracking-[0.5em] text-slate-400">
        THE INEVITABILITY ARCHITECTURE // CONFIDENTIAL
      </span>
      <span className="page-num font-inter text-[12px] font-black text-[#C5A059]"></span>
    </footer>
  );
}
