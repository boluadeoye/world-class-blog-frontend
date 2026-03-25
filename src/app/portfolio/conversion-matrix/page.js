"use client";
import { useState, useEffect } from "react";
import { Star, Quote, ArrowRight, Minus } from "lucide-react";

export default function ConversionMatrix() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 1000); }, []);

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
    <div className="min-h-screen bg-[#FDFCFB] font-sans text-[#1A1A1A] selection:bg-[#C5A059]/30">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;700&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FDFCFB !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #render-area, #render-area * { visibility: visible; }
          #render-area { position: absolute; left: 0; top: 0; width: 210mm; background: #FDFCFB; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #FDFCFB; box-sizing: border-box; overflow: hidden; }
          .page-num::after { counter-increment: pageCounter; content: counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-newsreader { font-family: 'Newsreader', serif; }
        .paper-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#0A0A0A]">
        <div className="relative z-10 w-full max-w-md bg-white p-12 text-center shadow-2xl border-b-8 border-[#C5A059]">
          <h1 className="font-playfair text-4xl font-black text-[#1A1A1A] mb-2 uppercase tracking-tighter">The Matrix</h1>
          <p className="font-inter text-slate-400 text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">Editorial Lead Magnet</p>
          {!isReady ? <div className="text-xs font-mono animate-pulse text-[#C5A059]">PREPARING MANUSCRIPT...</div> : 
          <button onClick={handlePrint} className="w-full py-5 bg-[#1A1A1A] text-white font-inter font-black uppercase tracking-widest transition-all hover:bg-[#C5A059]">Extract Asset</button>}
        </div>
      </div>

      {/* === VIEW 2: THE 4-PAGE DOCUMENT === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER (EDITORIAL SPLIT) */}
        <div className="a4-page paper-texture flex">
          <div className="w-[45%] h-full p-[20mm] flex flex-col justify-between border-r-[0.5px] border-slate-200">
            <header>
              <div className="w-12 h-12 border-[0.5px] border-[#1A1A1A] flex items-center justify-center">
                <Star size={16} strokeWidth={1} />
              </div>
              <p className="font-inter text-[8px] font-bold tracking-[0.5em] uppercase text-slate-400 mt-6">Volume 01 // 2026</p>
            </header>

            <main>
              <p className="font-inter text-[10px] font-black text-[#C5A059] uppercase tracking-[0.4em] mb-4">The Framework</p>
              <h1 className="font-playfair text-6xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-[0.85] mb-8">
                The 7-Figure<br/>Conversion<br/>Matrix
              </h1>
              <div className="h-[1px] w-16 bg-[#C5A059] mb-8"></div>
              <p className="font-newsreader text-xl italic text-slate-500 leading-relaxed">
                A Strategic Blueprint for High-Ticket Closing and Psychological Authority.
              </p>
            </main>

            <footer>
              <h2 className="font-playfair text-2xl font-black text-[#1A1A1A] uppercase tracking-[0.2em]">Bolu Adeoye</h2>
              <p className="font-inter text-[8px] font-bold text-[#C5A059] uppercase tracking-[0.4em] mt-1">Lead Design Architect</p>
            </footer>
          </div>
          <div className="w-[55%] h-full relative overflow-hidden">
            <img src={img1} alt="Ascension" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-[#C5A059]/10 mix-blend-multiply"></div>
          </div>
        </div>

        {/* PAGE 2: THE FRAMEWORK (BLUEPRINT STYLE) */}
        <div className="a4-page paper-texture p-[25mm] flex flex-col">
          <header className="flex justify-between items-center border-b-[0.5px] border-slate-200 pb-4 mb-16">
            <span className="font-inter text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400">Section 01 // The Pillars</span>
            <span className="page-num font-inter text-[10px] font-black"></span>
          </header>
          
          <div className="grid grid-cols-12 gap-12 grow">
            <div className="col-span-5">
              <h2 className="font-playfair text-5xl font-black text-[#1A1A1A] leading-none mb-8">The Three<br/>Pillars of<br/>Authority</h2>
              <div className="h-[40mm] w-full overflow-hidden border-[0.5px] border-slate-200 mb-8">
                <img src={img2} alt="Strategy" className="w-full h-full object-cover grayscale" />
              </div>
              <p className="font-newsreader text-sm text-slate-500 leading-relaxed italic">
                "Design is the silent ambassador of your brand. In high-ticket sales, visual friction is the primary cause of lead drop-off."
              </p>
            </div>
            
            <div className="col-span-7 space-y-12 pt-4">
              {[
                { t: "Psychological Hook", c: "Establishing immediate dominance through visual authority. Your prospect must feel they are entering a proven system." },
                { t: "Narrative Architecture", c: "Moving the prospect from uncertainty to inevitability using data-driven storytelling." },
                { t: "Frictionless Close", c: "Removing the 'Ask.' The value is so thoroughly engineered that the transaction is the only logical next step." }
              ].map((item, i) => (
                <div key={i} className="relative pl-8 border-l-[0.5px] border-slate-200">
                  <span className="absolute -left-2 top-0 font-playfair text-2xl font-black text-[#C5A059]">0{i+1}</span>
                  <h3 className="font-inter text-[10px] font-black uppercase tracking-[0.3em] mb-2 text-[#1A1A1A]">{item.t}</h3>
                  <p className="font-newsreader text-base text-slate-700 leading-relaxed">{item.c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PAGE 3: THE PROOF (MINIMALIST DATA) */}
        <div className="a4-page paper-texture p-[30mm] flex flex-col">
          <h2 className="font-playfair text-6xl font-black text-[#1A1A1A] text-center mb-20 tracking-tighter">The Transformation</h2>
          
          <div className="grow flex flex-col justify-center">
            <div className="w-full border-y-[0.5px] border-slate-200 py-12">
              <div className="grid grid-cols-3 text-center">
                <div>
                  <p className="font-inter text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-4">Lead Quality</p>
                  <p className="font-playfair text-4xl font-black text-[#1A1A1A]">High-Intent</p>
                </div>
                <div className="border-x-[0.5px] border-slate-200">
                  <p className="font-inter text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-4">Close Rate</p>
                  <p className="font-playfair text-4xl font-black text-[#C5A059]">44.2%</p>
                </div>
                <div>
                  <p className="font-inter text-[8px] font-bold uppercase tracking-[0.4em] text-slate-400 mb-4">Avg. Ticket</p>
                  <p className="font-playfair text-4xl font-black text-[#1A1A1A]">$15,000</p>
                </div>
              </div>
            </div>

            <div className="mt-20 max-w-md mx-auto text-center">
              <Quote size={24} className="mx-auto text-[#C5A059] mb-6 opacity-40" />
              <p className="font-newsreader text-2xl text-slate-700 leading-relaxed italic">
                "The Matrix didn't just change our numbers; it changed how we are perceived in the market."
              </p>
              <div className="mt-8 flex items-center justify-center gap-4">
                <Minus className="text-slate-200" />
                <span className="font-inter text-[10px] font-black uppercase tracking-widest">Executive Partner</span>
                <Minus className="text-slate-200" />
              </div>
            </div>
          </div>
          <Footer />
        </div>

        {/* PAGE 4: THE CTA (LUXURY FINISH) */}
        <div className="a4-page paper-texture flex flex-col">
          <div className="grow flex flex-col items-center justify-center p-[30mm]">
            <h2 className="font-playfair text-5xl font-black text-[#1A1A1A] uppercase mb-6 tracking-tighter">Ready to Scale?</h2>
            <p className="font-newsreader text-xl text-slate-500 mb-16 text-center max-w-sm">Apply the 7-Figure Matrix to your coaching infrastructure today.</p>
            
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 border-[0.5px] border-slate-200 p-2 mb-6">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://boluadeoye.com.ng/portfolio/conversion-matrix" alt="QR" className="w-full h-full grayscale" />
              </div>
              <p className="font-inter text-[8px] font-black uppercase tracking-[0.4em] text-[#C5A059]">Scan to Authenticate</p>
            </div>

            <div className="mt-32 text-center">
              <div className="h-[1px] w-32 bg-slate-200 mx-auto mb-6"></div>
              <h2 className="font-playfair text-3xl font-black text-[#1A1A1A] uppercase tracking-[0.2em]">Bolu Adeoye</h2>
              <p className="font-inter text-[8px] font-bold text-slate-400 uppercase tracking-[0.5em] mt-2">Approved for Release // 2026</p>
            </div>
          </div>
          
          <div className="h-[70mm] w-full overflow-hidden grayscale contrast-125 opacity-80">
            <img src={img3} alt="Wealth" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-auto p-[25mm] pt-0 flex justify-between items-center relative z-10">
      <span className="font-inter text-[7px] font-bold uppercase tracking-[0.5em] text-slate-300">
        THE CONVERSION MATRIX // CONFIDENTIAL
      </span>
      <span className="page-num font-inter text-[10px] font-black text-slate-200"></span>
    </footer>
  );
}
