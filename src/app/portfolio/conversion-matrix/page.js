"use client";
import { useState, useEffect } from "react";
import { Download, Star, ArrowRight, Quote, CheckCircle2, MousePointer2 } from "lucide-react";

export default function ConversionMatrix() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "THE_7_FIGURE_CONVERSION_MATRIX";
    window.print();
    document.title = originalTitle;
  };

  const img1 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416970/blog_assets/w7fk5rwutslttbd5b6wn.png";
  const img2 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416980/blog_assets/bsxfetwlo4hzs7n8jbar.png";
  const img3 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416992/blog_assets/eabilzeanxioyxiceeb7.png";

  return (
    <div className="min-h-screen bg-[#F9F9F9] font-sans text-[#1A1A1A] selection:bg-[#D4AF37]/30">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;600;800&family=Newsreader:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #FFFFFF !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #render-area, #render-area * { visibility: visible; }
          #render-area { position: absolute; left: 0; top: 0; width: 100%; background: #FFFFFF; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #FFFFFF; box-sizing: border-box; overflow: hidden; }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-newsreader { font-family: 'Newsreader', serif; }
        .gold-gradient { background: linear-gradient(135deg, #D4AF37 0%, #F9F1D0 50%, #D4AF37 100%); }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-[#1A1A1A] to-[#1A1A1A]"></div>
        
        <div className="relative z-10 w-full max-w-md bg-white p-12 text-center shadow-2xl border-t-8 border-[#D4AF37]">
          <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center bg-[#F9F9F9] rounded-full border border-slate-100">
            <Star size={32} className="text-[#D4AF37]" />
          </div>

          <h1 className="font-playfair text-3xl font-black text-[#1A1A1A] mb-2 uppercase tracking-widest">The Matrix</h1>
          <p className="font-inter text-slate-400 text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">High-Ticket Lead Magnet</p>

          {!isReady ? (
            <div className="text-xs font-mono animate-pulse text-[#D4AF37]">BINDING MANUSCRIPT...</div>
          ) : (
            <button onClick={handlePrint} className="w-full py-5 bg-[#1A1A1A] text-white font-inter font-black uppercase tracking-widest transition-all hover:bg-[#D4AF37] shadow-xl">
              Extract Asset
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 4-PAGE DOCUMENT === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER */}
        <div className="a4-page relative">
          <div className="absolute inset-0 z-0">
            <img src={img1} alt="Ascension" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col p-[25mm]">
            <header className="flex justify-between items-start">
              <div className="h-12 w-[1px] bg-[#D4AF37]"></div>
              <p className="font-inter text-[8px] font-bold tracking-[0.5em] uppercase text-slate-500">Private Release // 2026</p>
            </header>

            <main className="grow flex flex-col justify-end pb-20">
              <p className="font-inter text-sm font-black text-[#D4AF37] uppercase tracking-[0.5em] mb-6">The Framework</p>
              <h1 className="font-playfair text-7xl font-black text-[#1A1A1A] uppercase tracking-tighter leading-[0.9] mb-10">
                The 7-Figure<br/>Conversion<br/>Matrix
              </h1>
              <div className="h-[2px] w-24 bg-[#D4AF37] mb-10"></div>
              <p className="font-newsreader text-2xl italic text-slate-600 max-w-md leading-relaxed">
                A Strategic Framework for High-Ticket Closing and Psychological Authority.
              </p>
            </main>

            <footer className="mt-auto">
              <h2 className="font-playfair text-3xl font-black text-[#1A1A1A] uppercase tracking-[0.3em]">
                Boluwatife Adeoye
              </h2>
              <p className="font-inter text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.5em] mt-2">
                Lead Systems & Design Architect
              </p>
            </footer>
          </div>
        </div>

        {/* PAGE 2: THE FRAMEWORK */}
        <div className="a4-page flex flex-col">
          <div className="h-[80mm] w-full overflow-hidden">
            <img src={img2} alt="Strategy" className="w-full h-full object-cover grayscale contrast-125" />
          </div>
          
          <main className="grow p-[25mm] flex flex-col">
            <h2 className="font-playfair text-4xl font-black text-[#1A1A1A] uppercase mb-12">The Three Pillars of Closing</h2>
            
            <div className="space-y-12">
              <div className="flex gap-8">
                <span className="font-playfair text-5xl font-black text-[#D4AF37] opacity-30">01</span>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest mb-2">The Psychological Hook</h3>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Establishing immediate dominance through visual authority and technical depth. Your prospect must feel they are entering a proven system, not a sales call.</p>
                </div>
              </div>

              <div className="flex gap-8">
                <span className="font-playfair text-5xl font-black text-[#D4AF37] opacity-30">02</span>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest mb-2">The Narrative Architecture</h3>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Moving the prospect from a state of uncertainty to a state of inevitability. We use data-driven storytelling to bridge the gap between their current pain and your solution.</p>
                </div>
              </div>

              <div className="flex gap-8">
                <span className="font-playfair text-5xl font-black text-[#D4AF37] opacity-30">03</span>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest mb-2">The Frictionless Close</h3>
                  <p className="font-newsreader text-lg text-slate-700 leading-relaxed">Removing the "Ask." By the time you reach the price, the value has been so thoroughly engineered that the transaction becomes the only logical next step.</p>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: THE PROOF */}
        <div className="a4-page flex flex-col p-[25mm]">
          <header className="border-b border-slate-100 pb-4 mb-16">
            <h2 className="font-inter text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Performance Metrics</h2>
          </header>

          <main className="grow">
            <h2 className="font-playfair text-5xl font-black text-[#1A1A1A] mb-12">Client Transformation</h2>
            
            <div className="border border-slate-200 shadow-sm">
              <div className="grid grid-cols-3 bg-[#1A1A1A] text-white p-6 font-inter text-[10px] font-black uppercase tracking-widest">
                <div>Metric</div>
                <div>Baseline Approach</div>
                <div className="text-[#D4AF37]">Matrix Implementation</div>
              </div>
              
              <div className="grid grid-cols-3 p-8 border-b border-slate-100 items-center">
                <div className="font-inter text-xs font-bold uppercase">Lead Quality</div>
                <div className="font-newsreader text-lg text-slate-500 italic">Unfiltered</div>
                <div className="font-inter text-2xl font-black text-[#1A1A1A]">High-Intent</div>
              </div>

              <div className="grid grid-cols-3 p-8 border-b border-slate-100 items-center bg-slate-50">
                <div className="font-inter text-xs font-bold uppercase">Close Rate</div>
                <div className="font-newsreader text-lg text-slate-500 italic">12.5%</div>
                <div className="font-inter text-2xl font-black text-[#D4AF37]">44.2%</div>
              </div>

              <div className="grid grid-cols-3 p-8 items-center">
                <div className="font-inter text-xs font-bold uppercase">Avg. Ticket Size</div>
                <div className="font-newsreader text-lg text-slate-500 italic">$2,500</div>
                <div className="font-inter text-2xl font-black text-[#1A1A1A]">$15,000+</div>
              </div>
            </div>

            <div className="mt-20 p-10 bg-[#F9F9F9] border-l-4 border-[#D4AF37] italic">
              <Quote size={32} className="text-[#D4AF37] mb-4 opacity-40" />
              <p className="font-newsreader text-2xl text-slate-700 leading-relaxed">"The Matrix didn't just change our numbers; it changed how we are perceived in the market. We went from being a vendor to being a partner."</p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: THE CTA */}
        <div className="a4-page flex flex-col relative">
          <main className="grow p-[25mm] flex flex-col justify-center items-center text-center">
            <h2 className="font-playfair text-5xl font-black text-[#1A1A1A] uppercase mb-6">Ready to Scale?</h2>
            <p className="font-newsreader text-2xl text-slate-600 mb-12 max-w-md">Apply the 7-Figure Matrix to your coaching infrastructure today.</p>
            
            <div className="w-full max-w-sm border-2 border-[#1A1A1A] p-8 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#D4AF37] text-white px-4 py-1 font-inter text-[10px] font-black uppercase tracking-widest">Next Step</div>
              <h3 className="font-inter text-lg font-black uppercase mb-4">Book Your Strategy Call</h3>
              <p className="font-inter text-xs text-slate-500 mb-8">Scan the code below to access the calendar.</p>
              <div className="w-32 h-32 bg-slate-100 mx-auto mb-4 flex items-center justify-center border border-slate-200">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://boluadeoye.com.ng/portfolio/conversion-matrix" alt="QR" className="w-24 h-24" />
              </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
              <div className="w-48 h-[1px] bg-slate-300 mb-4"></div>
              <p className="font-inter text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.5em]">Approved for Release</p>
              <h2 className="font-playfair text-2xl font-black text-[#1A1A1A] uppercase mt-2">Boluwatife Adeoye</h2>
            </div>
          </main>

          <div className="h-[60mm] w-full overflow-hidden">
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
      <span className="font-inter text-[8px] font-bold uppercase tracking-[0.5em] text-slate-400">
        THE CONVERSION MATRIX // PAGE <span className="page-num text-[#1A1A1A]"></span>
      </span>
      <div className="w-8 h-[1px] bg-[#D4AF37]"></div>
    </footer>
  );
}
