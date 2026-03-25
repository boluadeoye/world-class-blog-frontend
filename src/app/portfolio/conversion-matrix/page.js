"use client";
import { useState, useEffect } from "react";
import { Star, Quote, ArrowRight, Crown, TrendingUp, Target, Zap, CheckCircle2 } from "lucide-react";

export default function ConversionMatrix() {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => { setTimeout(() => setIsReady(true), 1000); },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "THE_7_FIGURE_CONVERSION_MATRIX_PREMIUM";
    window.print();
    document.title = originalTitle;
  };

  const img1 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416970/blog_assets/w7fk5rwutslttbd5b6wn.png";
  const img2 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416980/blog_assets/bsxfetwlo4hzs7n8jbar.png";
  const img3 = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774416992/blog_assets/eabilzeanxioyxiceeb7.png";

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-[#D4AF37]/30">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300;400;600;800;900&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #050505 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; counter-reset: pageCounter; }
          body * { visibility: hidden; }
          #render-area, #render-area * { visibility: visible; }
          #render-area { position: absolute; left: 0; top: 0; width: 210mm; background: #050505; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #050505; box-sizing: border-box; overflow: hidden; }
          .page-num::after { counter-increment: pageCounter; content: "0" counter(pageCounter); }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
        
        /* LUXURY GOLD FOIL EFFECT */
        .text-gold-foil {
          background: linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          text-shadow: 0px 2px 10px rgba(212, 175, 55, 0.2);
        }
        .bg-gold-foil {
          background: linear-gradient(135deg, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C);
        }
        .border-gold {
          border-color: #D4AF37;
        }
        
        /* FLASHY GLASSMORPHISM */
        .luxury-glass {
          background: rgba(10, 10, 10, 0.7);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(212, 175, 55, 0.3);
          box-shadow: 0 20px 50px rgba(0,0,0,0.5), inset 0 0 0 1px rgba(255,255,255,0.05);
        }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#050505] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/20 via-[#050505] to-[#050505]"></div>
        
        <div className="relative z-10 w-full max-w-md luxury-glass p-12 text-center rounded-2xl border-t-4 border-t-[#D4AF37]">
          <div className="w-24 h-24 mx-auto mb-8 flex items-center justify-center rounded-full border-2 border-[#D4AF37] bg-black shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <Crown size={40} className="text-[#D4AF37]" />
          </div>

          <h1 className="font-playfair text-4xl font-black text-white mb-2 uppercase tracking-widest">The Matrix</h1>
          <p className="font-inter text-[#D4AF37] text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">Premium Lead Magnet</p>

          {!isReady ? (
            <div className="text-xs font-mono animate-pulse text-[#D4AF37]">GILDING ASSETS...</div>
          ) : (
            <button onClick={handlePrint} className="w-full py-5 bg-gold-foil text-black font-inter font-black uppercase tracking-widest transition-all hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)] rounded-xl">
              Extract Premium PDF
            </button>
          )}
        </div>
      </div>

      {/* === VIEW 2: THE 4-PAGE DOCUMENT === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER (FLASHY & RICH) */}
        <div className="a4-page relative">
          {/* Full Bleed Image with Rich Dark Gradient */}
          <div className="absolute inset-0 z-0">
            <img src={img1} alt="Ascension" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-[#050505]/40 to-transparent"></div>
          </div>

          <div className="relative z-10 h-full flex flex-col p-[25mm]">
            <header className="flex justify-between items-start">
              <div className="luxury-glass px-4 py-2 rounded-full flex items-center gap-2">
                <Star size={12} className="text-[#D4AF37]" fill="#D4AF37" />
                <span className="font-inter text-[8px] font-black tracking-[0.4em] uppercase text-white">Exclusive Release</span>
              </div>
            </header>

            <main className="grow flex flex-col justify-end pb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-[#D4AF37]"></div>
                <p className="font-inter text-sm font-black text-[#D4AF37] uppercase tracking-[0.5em]">The Framework</p>
              </div>
              
              <h1 className="font-playfair text-7xl font-black uppercase tracking-tighter leading-[0.9] mb-8 text-gold-foil drop-shadow-2xl">
                The 7-Figure<br/>Conversion<br/>Matrix
              </h1>
              
              <p className="font-inter text-lg font-medium text-slate-300 max-w-md leading-relaxed border-l-2 border-[#D4AF37] pl-6 py-2 luxury-glass">
                A Strategic Blueprint for High-Ticket Closing, Psychological Authority, and Elite Market Positioning.
              </p>
            </main>

            <footer className="mt-auto flex items-end justify-between border-t border-white/10 pt-8">
              <div>
                <h2 className="font-playfair text-3xl font-black text-white uppercase tracking-[0.2em]">Bolu Adeoye</h2>
                <p className="font-inter text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.4em] mt-2">Lead Design Architect</p>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] flex items-center justify-center">
                <Crown size={20} className="text-[#D4AF37]" />
              </div>
            </footer>
          </div>
        </div>

        {/* PAGE 2: THE FRAMEWORK (GLOWING CARDS) */}
        <div className="a4-page flex flex-col bg-[#050505]">
          {/* Header Image */}
          <div className="h-[80mm] w-full relative overflow-hidden">
            <img src={img2} alt="Strategy" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050505]"></div>
          </div>
          
          <main className="grow p-[25mm] pt-0 flex flex-col relative z-10 -mt-10">
            <h2 className="font-playfair text-5xl font-black text-white uppercase mb-12 text-center text-gold-foil">The Three Pillars</h2>
            
            <div className="space-y-8">
              {/* Card 1 */}
              <div className="luxury-glass p-8 rounded-2xl flex gap-8 items-center transform transition-transform">
                <div className="w-20 h-20 shrink-0 rounded-full bg-gold-foil flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <span className="font-playfair text-4xl font-black text-black">1</span>
                </div>
                <div>
                  <h3 className="font-inter text-lg font-black uppercase tracking-widest mb-2 text-white flex items-center gap-3">
                    <Target size={18} className="text-[#D4AF37]"/> The Psychological Hook
                  </h3>
                  <p className="font-inter text-sm text-slate-400 leading-relaxed">Establishing immediate dominance through visual authority. Your prospect must feel they are entering a proven, expensive system, not a standard sales call.</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="luxury-glass p-8 rounded-2xl flex gap-8 items-center">
                <div className="w-20 h-20 shrink-0 rounded-full bg-gold-foil flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <span className="font-playfair text-4xl font-black text-black">2</span>
                </div>
                <div>
                  <h3 className="font-inter text-lg font-black uppercase tracking-widest mb-2 text-white flex items-center gap-3">
                    <TrendingUp size={18} className="text-[#D4AF37]"/> Narrative Architecture
                  </h3>
                  <p className="font-inter text-sm text-slate-400 leading-relaxed">Moving the prospect from uncertainty to inevitability using data-driven storytelling. We bridge the gap between their current pain and your high-ticket solution.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="luxury-glass p-8 rounded-2xl flex gap-8 items-center">
                <div className="w-20 h-20 shrink-0 rounded-full bg-gold-foil flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.4)]">
                  <span className="font-playfair text-4xl font-black text-black">3</span>
                </div>
                <div>
                  <h3 className="font-inter text-lg font-black uppercase tracking-widest mb-2 text-white flex items-center gap-3">
                    <Zap size={18} className="text-[#D4AF37]"/> The Frictionless Close
                  </h3>
                  <p className="font-inter text-sm text-slate-400 leading-relaxed">Removing the "Ask." By the time you reach the price, the value has been so thoroughly engineered that a $10k+ transaction becomes the only logical next step.</p>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 3: THE PROOF (FLASHY METRICS) */}
        <div className="a4-page flex flex-col p-[25mm] bg-[#050505] relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <header className="border-b border-white/10 pb-4 mb-16 relative z-10">
            <h2 className="font-inter text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Performance Metrics</h2>
          </header>

          <main className="grow relative z-10">
            <h2 className="font-playfair text-5xl font-black text-white mb-12 text-gold-foil">Client Transformation</h2>
            
            <div className="luxury-glass rounded-2xl overflow-hidden">
              <div className="grid grid-cols-3 bg-black/80 text-white p-6 font-inter text-[10px] font-black uppercase tracking-widest border-b border-[#D4AF37]/30">
                <div>Key Metric</div>
                <div className="text-slate-500">Baseline Approach</div>
                <div className="text-[#D4AF37]">Matrix Implementation</div>
              </div>
              
              <div className="grid grid-cols-3 p-8 border-b border-white/5 items-center hover:bg-white/5 transition-colors">
                <div className="font-inter text-xs font-bold uppercase text-white">Lead Quality</div>
                <div className="font-inter text-lg text-slate-500">Unfiltered</div>
                <div className="font-inter text-2xl font-black text-[#D4AF37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]">High-Intent</div>
              </div>

              <div className="grid grid-cols-3 p-8 border-b border-white/5 items-center bg-white/5">
                <div className="font-inter text-xs font-bold uppercase text-white">Close Rate</div>
                <div className="font-inter text-lg text-slate-500">12.5%</div>
                <div className="font-inter text-4xl font-black text-gold-foil">44.2%</div>
              </div>

              <div className="grid grid-cols-3 p-8 items-center hover:bg-white/5 transition-colors">
                <div className="font-inter text-xs font-bold uppercase text-white">Avg. Ticket Size</div>
                <div className="font-inter text-lg text-slate-500">$2,500</div>
                <div className="font-inter text-4xl font-black text-gold-foil">$15,000+</div>
              </div>
            </div>

            <div className="mt-16 p-10 luxury-glass border-l-4 border-l-[#D4AF37] rounded-r-2xl relative overflow-hidden">
              <Quote size={100} className="absolute -top-4 -left-4 text-[#D4AF37] opacity-10" />
              <p className="font-playfair text-3xl text-white leading-relaxed italic relative z-10">
                "The Matrix didn't just change our numbers; it changed how we are perceived in the market. We went from being a vendor to being a premium partner."
              </p>
            </div>
          </main>
          <Footer />
        </div>

        {/* PAGE 4: THE CTA (RICH SILK & GOLD) */}
        <div className="a4-page flex flex-col relative bg-[#050505]">
          <div className="absolute inset-0 z-0">
            <img src={img3} alt="Wealth" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
          </div>

          <main className="grow p-[25mm] flex flex-col justify-center items-center text-center relative z-10">
            <h2 className="font-playfair text-6xl font-black text-white uppercase mb-6 tracking-tighter text-gold-foil drop-shadow-2xl">Ready to Scale?</h2>
            <p className="font-inter text-xl text-slate-300 mb-12 max-w-md font-medium">Apply the 7-Figure Matrix to your coaching infrastructure today.</p>
            
            <div className="w-full max-w-sm luxury-glass p-10 rounded-3xl relative border-2 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.2)]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-foil text-black px-6 py-1.5 font-inter text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">Next Step</div>
              <h3 className="font-inter text-xl font-black uppercase mb-4 text-white">Book Strategy Call</h3>
              <p className="font-inter text-xs text-slate-400 mb-8">Scan the secure code below to access the private calendar.</p>
              <div className="w-40 h-40 bg-white mx-auto mb-4 flex items-center justify-center rounded-xl p-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://boluadeoye.com.ng/portfolio/conversion-matrix" alt="QR" className="w-full h-full" />
              </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border border-[#D4AF37] flex items-center justify-center mb-4">
                <CheckCircle2 size={24} className="text-[#D4AF37]" />
              </div>
              <p className="font-inter text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.5em]">Approved for Release</p>
              <h2 className="font-playfair text-3xl font-black text-white uppercase mt-2 tracking-widest">Bolu Adeoye</h2>
            </div>
          </main>
        </div>

      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-auto p-[25mm] pt-0 flex justify-between items-center relative z-10">
      <span className="font-inter text-[8px] font-bold uppercase tracking-[0.5em] text-slate-500">
        THE CONVERSION MATRIX // CONFIDENTIAL
      </span>
      <span className="page-num font-inter text-[12px] font-black text-[#D4AF37]"></span>
    </footer>
  );
}
