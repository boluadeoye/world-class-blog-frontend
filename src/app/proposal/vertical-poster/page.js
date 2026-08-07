"use client";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, Heart, Sparkles, ArrowRight, Quote, Shield, Globe, MapPin } from "lucide-react";

export default function VerticalPoster() {
  const [isReady, setIsReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const posterRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  }, []);

  const downloadPng = async () => {
    if (posterRef.current === null) return;
    setIsCapturing(true);
    try {
      const dataUrl = await toPng(posterRef.current, {
        pixelRatio: 3, // High-Density Output
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `OluwaMayowa_Vertical_Poster.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Capture failed', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const img_crossroads = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781176355/blog_assets/nww3tbifsdqy9jjpbhip.jpg";
  const img_hoodie = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1781160324/blog_assets/lkkmeo9qup7oxtebjksi.jpg";

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .grain-bg {
          background-color: #FAF8F5;
          background-image: radial-gradient(circle at 0% 0%, #fdfbfb 0%, #f3e8dc 100%);
          position: relative;
        }
        .grain-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 16px 16px;
          opacity: 0.5;
          pointer-events: none;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);
        }
        .arch-mask {
          border-radius: 180px 180px 20px 20px;
        }
      `}</style>

      {/* STUDIO PORTAL (Screen View) */}
      <div className="min-h-screen flex flex-col justify-between p-4 md:p-6 max-w-xl mx-auto">
        <header className="flex justify-between items-center bg-slate-900 p-4 border border-slate-800 rounded-xl mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-white font-bold text-xs uppercase tracking-widest font-inter">Poster Studio</h1>
              <p className="text-slate-500 text-[9px] font-mono uppercase">9:16 Vertical Engine</p>
            </div>
          </div>
          <button 
            onClick={downloadPng} 
            disabled={isCapturing}
            className="bg-white text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-lg"
          >
            {isCapturing ? "Capturing..." : <><Download size={14} /> Export 9:16 PNG</>}
          </button>
        </header>

        {/* 9:16 VERTICAL CANVAS PREVIEW */}
        <main className="grow flex items-center justify-center py-2">
          <div 
            ref={posterRef}
            className="w-full aspect-[9/16] max-w-[360px] grain-bg shadow-2xl rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden text-[#000000]"
          >
            {/* TOP HEADER */}
            <header className="flex justify-between items-center shrink-0 z-10 border-b border-black/10 pb-3">
              <div>
                <p className="font-playfair italic text-xs font-bold">OluwaMayowa</p>
                <p className="font-mono text-[7px] font-black uppercase tracking-widest text-[#D97B0C]">The Bullets Journey</p>
              </div>
              <div className="w-6 h-6 border border-black flex items-center justify-center font-inter font-black text-[8px] bg-white/50">
                OM
              </div>
            </header>

            {/* MAIN CONTENT CANVAS */}
            <main className="grow my-auto flex flex-col justify-between py-4 space-y-4 z-10">
              
              {/* HERO ARCH IMAGE CONTAINER */}
              <div className="relative w-full h-44 arch-mask overflow-hidden border-2 border-white shadow-md shrink-0">
                <img src={img_crossroads} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <p className="font-inter text-[9px] font-black uppercase tracking-widest text-amber-400">Personal Testimony</p>
                </div>
              </div>

              {/* TITLE BLOCK */}
              <div className="space-y-1 text-center">
                <h1 className="font-inter text-xl font-black uppercase tracking-tight text-[#000000] leading-none">
                  THE BOY CHILD & THE CRISIS OF IDENTITY
                </h1>
                <p className="font-playfair italic text-xs font-bold text-[#D97B0C]">Between Expectations & Reality</p>
              </div>

              {/* THE TRAJECTORY PIPELINE */}
              <div className="relative pl-6 space-y-3 my-auto">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#D97B0C] via-black to-[#D97B0C]"></div>

                {/* NODE 1 */}
                <div className="glass-panel p-3 rounded-lg relative">
                  <div className="absolute -left-[21px] top-3 w-2 h-2 rounded-full bg-[#D97B0C] ring-2 ring-white"></div>
                  <p className="font-inter text-[8px] font-black uppercase tracking-widest text-[#D97B0C]">01 // The Burden</p>
                  <p className="font-inter text-[10px] font-bold text-[#000000] leading-snug mt-0.5">
                    "Everywhere I looked, I saw campaigns for the girl child... But who is intentionally raising the boy child?"
                  </p>
                </div>

                {/* NODE 2 */}
                <div className="glass-panel p-3 rounded-lg relative">
                  <div className="absolute -left-[21px] top-3 w-2 h-2 rounded-full bg-black ring-2 ring-white"></div>
                  <p className="font-inter text-[8px] font-black uppercase tracking-widest text-[#D97B0C]">02 // The Cost</p>
                  <p className="font-inter text-[10px] font-bold text-[#000000] leading-snug mt-0.5">
                    UNESCO & WHO: Millions of boys are dropping out of school, with male suicide rates rising globally.
                  </p>
                </div>

                {/* NODE 3 */}
                <div className="glass-panel p-3 rounded-lg relative">
                  <div className="absolute -left-[21px] top-3 w-2 h-2 rounded-full bg-[#D97B0C] ring-2 ring-white"></div>
                  <p className="font-inter text-[8px] font-black uppercase tracking-widest text-[#D97B0C]">03 // The Redefinition</p>
                  <p className="font-inter text-[10px] font-bold text-[#000000] leading-snug mt-0.5">
                    A strong man faces reality honestly. True masculinity is defined by character, purpose, and integrity.
                  </p>
                </div>
              </div>

              {/* SIGNATURE CALLOUT CARD */}
              <div className="bg-[#000000] text-white p-4 rounded-xl space-y-2 shadow-xl border-t-2 border-[#D97B0C]">
                <p className="font-playfair italic text-xs leading-relaxed text-slate-200 text-center">
                  &ldquo;The greatest challenge facing many boys today is discovering what being a man truly means.&rdquo;
                </p>
                <div className="flex justify-between items-center border-t border-white/20 pt-2 font-inter text-[8px]">
                  <span className="font-bold text-[#D97B0C] uppercase tracking-widest">OluwaMayowa // BigMummy</span>
                  <span className="text-slate-400 uppercase">This is only the beginning</span>
                </div>
              </div>

            </main>

            {/* FOOTER */}
            <footer className="flex justify-between items-center shrink-0 z-10 border-t border-black/10 pt-2">
              <span className="font-mono text-[7px] font-bold uppercase tracking-widest text-slate-500">© 2026 OluwaMayowa</span>
              <div className="flex items-center gap-1 text-[#D97B0C] font-inter font-black text-[8px] uppercase tracking-widest">
                <span>Sovereign Path</span>
                <ArrowRight size={10} />
              </div>
            </footer>

          </div>
        </main>
      </div>
    </div>
  );
}
