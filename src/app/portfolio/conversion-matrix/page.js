"use client";
import { useState, useEffect } from "react";
import { Download, Star, Quote, Target, TrendingUp, Zap, CheckCircle2 } from "lucide-react";

export default function ConversionMatrix() {
  const[isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "THE_7_FIGURE_CONVERSION_MATRIX_ELITE";
    window.print();
    document.title = originalTitle;
  };

  const img1 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416970/blog_assets/w7fk5rwutslttbd5b6wn.png";
  const img2 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416980/blog_assets/bsxfetwlo4hzs7n8jbar.png";
  const img3 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416992/blog_assets/eabilzeanxioyxiceeb7.png";

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-[#D4AF37]/30">
      
      {/* IMPORT LUXURY FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;600;800;900&family=Newsreader:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />

      {/* === PRINT-SAFE CSS === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            background-color: #050505 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            counter-reset: pageCounter;
          }
          body * { visibility: hidden; }
          #render-area, #render-area * { visibility: visible; }
          #render-area { position: absolute; left: 0; top: 0; width: 210mm; background: #050505; }
          
          /* STRICT A4 BLOCKS TO PREVENT CRASHING */
          .a4-page { 
            height: 297mm; 
            width: 210mm; 
            page-break-after: always; 
            position: relative; 
            background-color: #050505; 
            box-sizing: border-box; 
            overflow: hidden; 
            display: block;
          }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-newsreader { font-family: 'Newsreader', serif; }
        
        /* PRINT-SAFE GOLD FOIL */
        .text-gold-foil {
          background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        .bg-gold-foil {
          background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#050505]">
        <div className="w-full max-w-md bg-[#0A0A0A] p-12 text-center rounded-xl border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.15)]">
          <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center rounded-full border-2 border-[#D4AF37] bg-black">
            <Star size={32} className="text-[#D4AF37]" />
          </div>
          <h1 className="font-playfair text-4xl font-black text-white mb-2 uppercase tracking-widest text-gold-foil">The Matrix</h1>
          <p className="font-inter text-[#D4AF37] text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">Elite Lead Magnet</p>
          {!isReady ? (
            <div className="text-xs font-mono animate-pulse text-[#D4AF37]">GILDING ASSETS...</div>
          ) : (
            <button onClick={handlePrint} className="w-full py-5 bg-gold-foil text-black font-inter font-black uppercase tracking-widest transition-all hover:scale-105 rounded-sm">
              Extract Premium PDF
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 4-PAGE DOCUMENT === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER */}
        <div className="a4-page flex flex-col">
          {/* Top Half: Image */}
          <div className="h-[55%] w-full border-b-4 border-[#D4AF37]">
            <img src={img1} alt="Ascension" className="w-full h-full object-cover" />
          </div>
          
          {/* Bottom Half: Typography */}
          <div className="h-[45%] w-full p-[20mm] flex flex-col justify-between bg-[#050505]">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-[#D4AF37]"></div>
                <p className="font-inter text-sm font-black text-[#D4AF37] uppercase tracking-[0.5em]">The Framework</p>
              </div>
              <h1 className="font-playfair text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-6 text-gold-foil">
                The 7-Figure<br/>Conversion<br/>Matrix
              </h1>
              <p className="font-newsreader text-xl italic text-slate-300 max-w-md leading-relaxed">
                A Strategic Blueprint for High-Ticket Closing, Psychological Authority, and Elite Market Positioning.
              </p>
            </div>
            
            <div className="flex justify-between items-end border-t border-white/20 pt-6">
              <div>
                <h2 className="font-playfair text-2xl font-black text-white uppercase tracking-[0.2em]">Boluwatife Adeoye</h2>
                <p className="font-inter text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mt-1">Lead Design Architect</p>
              </div>
              <div className="font-inter text-[10px] font-black text-white uppercase tracking-widest bg-[#D4AF37]/20 px-3 py-1 border border-[#D4AF37]">
                Exclusive Release
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 2: THE FRAMEWORK */}
        <div className="a4-page flex flex-col bg-[#050505]">
          {/* Top Third: Image */}
          <div className="h-[35%] w-full border-b-2 border-[#D4AF37]/50">
            <img src={img2} alt="Strategy" className="w-full h-full object-cover" />
          </div>
          
          {/* Bottom Two-Thirds: Content */}
          <div className="h-[65%] w-full p-[20mm] flex flex-col">
            <h2 className="font-playfair text-4xl font-black text-white uppercase mb-10 text-gold-foil text-center">The Three Pillars</h2>
            
            <div className="space-y-8 grow flex flex-col justify-center">
              {/* Pillar 1 */}
              <div className="flex gap-6 items-start bg-[#0A0A0A] p-6 border border-white/10 rounded-lg">
                <div className="w-12 h-12 shrink-0 rounded-full bg-gold-foil flex items-center justify-center">
                  <span className="font-playfair text-2xl font-black text-black">1</span>
                </div>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest mb-2 text-white flex items-center gap-2">
                    <Target size={16} className="text-[#D4AF37]"/> The Psychological Hook
                  </h3>
                  <p className="font-newsreader text-base text-slate-300 leading-relaxed">Establishing immediate dominance through visual authority. Your prospect must feel they are entering a proven, expensive system, not a standard sales call.</p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="flex gap-6 items-start bg-[#0A0A0A] p-6 border border-white/10 rounded-lg">
                <div className="w-12 h-12 shrink-0 rounded-full bg-gold-foil flex items-center justify-center">
                  <span className="font-playfair text-2xl font-black text-black">2</span>
                </div>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest mb-2 text-white flex items-center gap-2">
                    <TrendingUp size={16} className="text-[#D4AF37]"/> Narrative Architecture
                  </h3>
                  <p className="font-newsreader text-base text-slate-300 leading-relaxed">Moving the prospect from uncertainty to inevitability using data-driven storytelling. We bridge the gap between their current pain and your high-ticket solution.</p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="flex gap-6 items-start bg-[#0A0A0A] p-6 border border-white/10 rounded-lg">
                <div className="w-12 h-12 shrink-0 rounded-full bg-gold-foil flex items-center justify-center">
                  <span className="font-playfair text-2xl font-black text-black">3</span>
                </div>
                <div>
                  <h3 className="font-inter text-sm font-black uppercase tracking-widest mb-2 text-white flex items-center gap-2">
                    <Zap size={16} className="text-[#D4AF37]"/> The Frictionless Close
                  </h3>
                  <p className="font-newsreader text-base text-slate-300 leading-relaxed">Removing the "Ask." By the time you reach the price, the value has been so thoroughly engineered that a $10k+ transaction becomes the only logical next step.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE 3: THE PROOF */}
        <div className="a4-page flex flex-col p-[20mm] bg-[#050505]">
          <header className="border-b border-white/20 pb-4 mb-12">
            <h2 className="font-inter text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Performance Metrics</h2>
          </header>

          <main className="grow flex flex-col">
            <h2 className="font-playfair text-5xl font-black text-white mb-12 text-gold-foil">Client Transformation</h2>
            
            <div className="border border-[#D4AF37]/50 rounded-xl overflow-hidden bg-[#0A0A0A]">
              <div className="grid grid-cols-3 bg-gold-foil text-black p-6 font-inter text-[10px] font-black uppercase tracking-widest">
                <div>Key Metric</div>
                <div>Baseline Approach</div>
                <div>Matrix Implementation</div>
              </div>
              
              <div className="grid grid-cols-3 p-8 border-b border-white/10 items-center">
                <div className="font-inter text-xs font-bold uppercase text-white">Lead Quality</div>
                <div className="font-newsreader text-lg text-slate-400 italic">Unfiltered</div>
                <div className="font-inter text-2xl font-black text-[#D4AF37]">High-Intent</div>
              </div>

              <div className="grid grid-cols-3 p-8 border-b border-white/10 items-center bg-white/5">
                <div className="font-inter text-xs font-bold uppercase text-white">Close Rate</div>
                <div className="font-newsreader text-lg text-slate-400 italic">12.5%</div>
                <div className="font-inter text-4xl font-black text-gold-foil">44.2%</div>
              </div>

              <div className="grid grid-cols-3 p-8 items-center">
                <div className="font-inter text-xs font-bold uppercase text-white">Avg. Ticket Size</div>
                <div className="font-newsreader text-lg text-slate-400 italic">$2,500</div>
                <div className="font-inter text-4xl font-black text-gold-foil">$15,000+</div>
              </div>
            </div>

            <div className="mt-16 p-10 bg-[#0A0A0A] border-l-4 border-l-[#D4AF37] relative">
              <Quote size={48} className="absolute -top-6 -left-6 text-[#D4AF37] bg-[#050505] p-2 rounded-full" />
              <p className="font-playfair text-3xl text-white leading-relaxed italic mt-4">
                "The Matrix didn't just change our numbers; it changed how we are perceived in the market. We went from being a vendor to being a premium partner."
              </p>
            </div>
          </main>
          
          <footer className="mt-auto pt-4 border-t border-white/20 flex justify-between items-center">
            <span className="font-inter text-[8px] font-bold uppercase tracking-[0.5em] text-slate-500">THE CONVERSION MATRIX</span>
            <span className="page-num font-inter text-[12px] font-black text-[#D4AF37]"></span>
          </footer>
        </div>

        {/* PAGE 4: THE CTA */}
        <div className="a4-page flex flex-col bg-[#050505]">
          {/* Top Half: Content */}
          <div className="h-[60%] w-full p-[20mm] flex flex-col justify-center items-center text-center">
            <h2 className="font-playfair text-5xl font-black text-white uppercase mb-6 text-gold-foil">Ready to Scale?</h2>
            <p className="font-newsreader text-xl text-slate-300 mb-10 max-w-md italic">Apply the 7-Figure Matrix to your coaching infrastructure today.</p>
            
            <div className="w-full max-w-sm bg-[#0A0A0A] p-8 border border-[#D4AF37]/50 rounded-xl relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold-foil text-black px-4 py-1 font-inter text-[10px] font-black uppercase tracking-widest rounded-sm">Next Step</div>
              <h3 className="font-inter text-lg font-black uppercase mb-4 text-white mt-2">Book Strategy Call</h3>
              <p className="font-inter text-xs text-slate-400 mb-6">Scan the secure code below to access the private calendar.</p>
              <div className="w-32 h-32 bg-white mx-auto flex items-center justify-center p-2 rounded">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://boluadeoye.com.ng/portfolio/conversion-matrix" alt="QR" className="w-full h-full" />
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 size={16} className="text-[#D4AF37]" />
                <p className="font-inter text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.5em]">Approved for Release</p>
              </div>
              <h2 className="font-playfair text-2xl font-black text-white uppercase tracking-widest">Boluwatife Adeoye</h2>
            </div>
          </div>

          {/* Bottom Half: Image */}
          <div className="h-[40%] w-full border-t-4 border-[#D4AF37]">
            <img src={img3} alt="Wealth" className="w-full h-full object-cover" />
          </div>
        </div>

      </div>
    </div>
  );
}
