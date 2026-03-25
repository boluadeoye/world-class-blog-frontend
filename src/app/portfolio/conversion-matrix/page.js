"use client";
import { useState, useEffect } from "react";
import { Star, Quote, Target, TrendingUp, Zap, CheckCircle2 } from "lucide-react";

export default function ConversionMatrix() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 1000); },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "THE_7_FIGURE_CONVERSION_MATRIX_FINAL";
    window.print();
    document.title = originalTitle;
  };

  const img1 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416970/blog_assets/w7fk5rwutslttbd5b6wn.png";
  const img2 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416980/blog_assets/bsxfetwlo4hzs7n8jbar.png";
  const img3 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416992/blog_assets/eabilzeanxioyxiceeb7.png";

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#0A0A0A] selection:bg-[#C5A059]/30">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;600;800;900&family=Newsreader:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FDFCFB !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #render-area, #render-area * { visibility: visible; }
          #render-area { position: absolute; left: 0; top: 0; width: 210mm; background: #FDFCFB; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #FDFCFB; box-sizing: border-box; overflow: hidden; }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-newsreader { font-family: 'Newsreader', serif; }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#0A0A0A]">
        <div className="relative z-10 w-full max-w-md bg-white p-12 text-center shadow-2xl border-b-8 border-[#C5A059]">
          <h1 className="font-playfair text-4xl font-black text-[#0A0A0A] mb-2 uppercase tracking-tighter">The Matrix</h1>
          <p className="font-inter text-slate-400 text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">Editorial Lead Magnet</p>
          {!isReady ? <div className="text-xs font-mono animate-pulse text-[#C5A059]">PREPARING MANUSCRIPT...</div> : 
          <button onClick={handlePrint} className="w-full py-5 bg-[#0A0A0A] text-white font-inter font-black uppercase tracking-widest transition-all hover:bg-[#C5A059]">Extract Asset</button>}
        </div>
      </div>

      {/* === VIEW 2: THE 5-PAGE DOCUMENT === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER (HARDCODED TOP/BOTTOM SPLIT) */}
        <div className="a4-page">
          {/* Top Image Block (160mm) */}
          <div className="absolute top-0 left-0 w-full h-[160mm] overflow-hidden">
            <img src={img1} alt="Ascension" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-multiply"></div>
          </div>
          
          {/* Bottom Text Block (137mm) */}
          <div className="absolute top-[160mm] left-0 w-full h-[137mm] bg-[#FDFCFB] p-[20mm] flex flex-col justify-between">
            <div>
              <p className="font-inter text-[10px] font-black text-[#C5A059] uppercase tracking-[0.4em] mb-4">The Framework</p>
              <h1 className="font-playfair text-6xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-tight mb-6">
                The 7-Figure<br/>Conversion Matrix
              </h1>
              <div className="h-[2px] w-16 bg-[#C5A059] mb-6"></div>
              <p className="font-newsreader text-xl italic text-slate-600 leading-relaxed max-w-md">
                A Strategic Blueprint for High-Ticket Closing and Psychological Authority.
              </p>
            </div>
            
            <div className="flex justify-between items-end">
              <div>
                <h2 className="font-playfair text-2xl font-black text-[#0A0A0A] uppercase tracking-[0.2em]">Bolu Adeoye</h2>
                <p className="font-inter text-[8px] font-bold text-[#C5A059] uppercase tracking-[0.4em] mt-1">Lead Design Architect</p>
              </div>
              <div className="w-10 h-10 border border-[#0A0A0A] flex items-center justify-center">
                <Star size={16} className="text-[#0A0A0A]" strokeWidth={1.5} />
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2: THE MANIFESTO */}
        <div className="a4-page p-[25mm] flex flex-col">
          <header className="border-b border-slate-200 pb-4 mb-16 flex justify-between items-end">
            <span className="font-inter text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400">Section 01 // The Hook</span>
            <span className="page-num font-inter text-[10px] font-black"></span>
          </header>
          
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
        </div>

        {/* PAGE 3: THE CONVERSION FUNNEL (HARDCODED TOP/BOTTOM SPLIT) */}
        <div className="a4-page">
          {/* Top Image Block (100mm) */}
          <div className="absolute top-0 left-0 w-full h-[100mm] overflow-hidden">
            <img src={img2} alt="Strategy" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-multiply"></div>
          </div>

          {/* Bottom Text Block (197mm) */}
          <div className="absolute top-[100mm] left-0 w-full h-[197mm] bg-[#FDFCFB] p-[25mm] flex flex-col">
            <header className="flex justify-between items-end mb-10">
              <h2 className="font-playfair text-4xl font-black text-[#0A0A0A] uppercase tracking-tighter leading-tight">The Architecture<br/>of Closing</h2>
              <span className="page-num font-inter text-[10px] font-black"></span>
            </header>
            
            <div className="space-y-10 grow">
              <div className="relative pl-12 border-l border-slate-200">
                <span className="absolute -left-5 top-0 font-playfair text-3xl font-black text-[#C5A059] bg-[#FDFCFB] py-2">01</span>
                <h3 className="font-inter text-xs font-black uppercase tracking-[0.2em] mb-2 text-[#0A0A0A] flex items-center gap-3"><Target size={16} className="text-[#C5A059]"/> The Psychological Hook</h3>
                <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Establishing immediate dominance through visual authority. We replace generic layouts with editorial brutalism to command attention.</p>
              </div>

              <div className="relative pl-12 border-l border-slate-200">
                <span className="absolute -left-5 top-0 font-playfair text-3xl font-black text-[#C5A059] bg-[#FDFCFB] py-2">02</span>
                <h3 className="font-inter text-xs font-black uppercase tracking-[0.2em] mb-2 text-[#0A0A0A] flex items-center gap-3"><TrendingUp size={16} className="text-[#C5A059]"/> Narrative Architecture</h3>
                <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Moving the prospect from uncertainty to inevitability using data-driven storytelling. We bridge the gap between their current pain and your high-ticket solution.</p>
              </div>

              <div className="relative pl-12 border-l border-slate-200">
                <span className="absolute -left-5 top-0 font-playfair text-3xl font-black text-[#C5A059] bg-[#FDFCFB] py-2">03</span>
                <h3 className="font-inter text-xs font-black uppercase tracking-[0.2em] mb-2 text-[#0A0A0A] flex items-center gap-3"><Zap size={16} className="text-[#C5A059]"/> The Frictionless Close</h3>
                <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Removing the "Ask." We engineer the document so that a $10k+ transaction feels like a natural progression rather than a sales pitch.</p>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 4: THE STATUS MATRIX */}
        <div className="a4-page p-[25mm] flex flex-col">
          <header className="border-b border-slate-200 pb-4 mb-16 flex justify-between items-end">
            <span className="font-inter text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400">Section 03 // Performance</span>
            <span className="page-num font-inter text-[10px] font-black"></span>
          </header>
          
          <main className="grow flex flex-col">
            <h2 className="font-playfair text-5xl font-black text-[#0A0A0A] mb-16 tracking-tighter">Client Transformation</h2>
            
            <div className="border border-[#0A0A0A] shadow-sm mb-16">
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

            <div className="p-10 bg-white border border-slate-200 relative">
              <div className="absolute -top-4 left-10 bg-[#C5A059] text-white px-4 py-1 font-inter text-[8px] font-black uppercase tracking-widest">The Verdict</div>
              <p className="font-newsreader text-2xl text-slate-700 leading-relaxed italic">
                "The Matrix didn't just change our numbers; it changed how we are perceived in the market. We went from being a vendor to being a premium partner."
              </p>
            </div>
          </main>
        </div>

        {/* PAGE 5: THE FINAL SEAL (HARDCODED TOP/BOTTOM SPLIT) */}
        <div className="a4-page">
          {/* Top Text Block (180mm) */}
          <div className="absolute top-0 left-0 w-full h-[180mm] bg-[#FDFCFB] p-[25mm] flex flex-col justify-center items-center text-center">
            <h2 className="font-playfair text-5xl font-black text-[#0A0A0A] uppercase mb-6 tracking-tighter">Ready to Scale?</h2>
            <p className="font-newsreader text-2xl text-slate-600 mb-12 max-w-md italic">Apply the Inevitability Architecture to your coaching infrastructure today.</p>
            
            <div className="w-full max-w-sm bg-white p-10 relative border border-slate-200 shadow-xl">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#0A0A0A] text-white px-6 py-1.5 font-inter text-[10px] font-black uppercase tracking-widest">Next Step</div>
              <h3 className="font-inter text-lg font-black uppercase mb-4 text-[#0A0A0A]">Book Strategy Call</h3>
              <p className="font-inter text-xs text-slate-500 mb-8">Scan the secure code below to access the private calendar.</p>
              <div className="w-32 h-32 bg-slate-50 mx-auto flex items-center justify-center border border-slate-200 p-2">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://boluadeoye.com.ng/portfolio/conversion-matrix" alt="QR" className="w-full h-full" />
              </div>
            </div>
          </div>

          {/* Bottom Image Block (117mm) */}
          <div className="absolute top-[180mm] left-0 w-full h-[117mm] overflow-hidden">
            <img src={img3} alt="Wealth" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-[#0A0A0A]/80"></div>
            
            {/* Signature Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-full border border-[#C5A059] flex items-center justify-center mb-4 bg-[#0A0A0A]">
                <CheckCircle2 size={24} className="text-[#C5A059]" />
              </div>
              <p className="font-inter text-[10px] font-bold text-[#C5A059] uppercase tracking-[0.5em]">Approved for Release</p>
              <h2 className="font-playfair text-3xl font-black text-white uppercase mt-3 tracking-widest">Bolu Adeoye</h2>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
