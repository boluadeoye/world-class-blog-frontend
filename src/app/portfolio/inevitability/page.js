"use client";
import { useState, useEffect } from "react";
import { Download, Link2, ArrowUpRight } from "lucide-react";

export default function InevitabilityArchitecture() {
  const [isReady, setIsReady] = useState(false);
  const[cryptoHash, setCryptoHash] = useState("");

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
    const generateHash = async () => {
      const data = `BOLU_ADEOYE_MATRIX_${new Date().toISOString()}`;
      const encoder = new TextEncoder();
      const dataBuffer = encoder.encode(data);
      const hashBuffer = await crypto.subtle.digest('SHA-256', dataBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      setCryptoHash(hashHex);
    };
    generateHash();
  },[]);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "THE_INEVITABILITY_ARCHITECTURE_FINAL";
    window.print();
    document.title = originalTitle;
  };

  const imgDoor = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774448964/blog_assets/z5btwqok2juy5t8bfwdd.png";
  const imgCrown = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774448945/blog_assets/nafqyfclim9f1ocmg3hj.png";
  const imgArrow = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1774448954/blog_assets/r7jtzthaacrrqqa03qpa.png";

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-[#AF9164]/30">
      
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Newsreader:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background-color: #050505 !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          body * { visibility: hidden; }
          #render-area, #render-area * { visibility: visible; }
          #render-area { position: absolute; left: 0; top: 0; width: 210mm; background: #050505; }
          .a4-page { height: 297mm; width: 210mm; page-break-after: always; position: relative; background-color: #050505; box-sizing: border-box; overflow: hidden; }
          .no-print { display: none !important; }
        }
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-newsreader { font-family: 'Newsreader', serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
      `}</style>

      {/* === VIEW 1: THE PORTAL === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6 bg-[#050505]">
        <div className="relative z-10 w-full max-w-md bg-[#0A0A0A] p-12 text-center shadow-2xl border-t-4 border-[#AF9164]">
          <h1 className="font-inter text-4xl font-black text-white mb-2 uppercase tracking-tighter">The Matrix</h1>
          <p className="font-inter text-[#AF9164] text-[10px] font-bold mb-10 tracking-[0.4em] uppercase">Brutalist Editorial</p>
          {!isReady ? <div className="text-xs font-mono animate-pulse text-[#AF9164]">HARDCODING LAYOUT...</div> : 
          <button onClick={handlePrint} className="w-full py-5 bg-[#AF9164] text-[#050505] font-inter font-black uppercase tracking-widest transition-all hover:bg-white">Extract Asset</button>}
        </div>
      </div>

      {/* === VIEW 2: THE 5-PAGE DOCUMENT (HARDCODED MILLIMETERS) === */}
      <div id="render-area" className="hidden print:block">
        
        {/* PAGE 1: THE COVER */}
        <div className="a4-page">
          {/* Background Image (Right Side) */}
          <div className="absolute top-0 right-0 w-[140mm] h-[297mm] z-0">
            <img src={imgDoor} alt="Door" className="w-full h-full object-cover grayscale contrast-125" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div>
          </div>

          {/* Typography */}
          <div className="absolute top-[80mm] left-[15mm] z-10">
            <h1 className="font-inter font-black text-white text-[90px] leading-[0.85] tracking-tighter">THE<br/>MATRIX</h1>
          </div>
          
          {/* Gold Bleed Line */}
          <div className="absolute top-[135mm] left-[15mm] w-[195mm] h-[2px] bg-[#AF9164] z-20"></div>
          
          {/* Subtitle */}
          <div className="absolute top-[145mm] left-[15mm] z-10 w-[100mm]">
            <p className="font-newsreader text-white text-xl italic leading-relaxed">A Strategic Blueprint for High-Ticket Closing and Psychological Authority.</p>
          </div>

          {/* Footer */}
          <div className="absolute bottom-[15mm] left-[15mm] z-10">
            <p className="font-inter text-[8px] font-bold text-[#AF9164] uppercase tracking-[0.4em]">CONFIDENTIAL // 7-FIGURE CONVERSION MATRIX // PAGE 01</p>
          </div>
        </div>

        {/* PAGE 2: THE PROVOCATION */}
        <div className="a4-page">
          {/* Massive Watermark */}
          <div className="absolute top-[20mm] left-[15mm] font-inter font-black text-[#AF9164] text-[350px] leading-none opacity-10">"</div>
          
          {/* The Quote */}
          <div className="absolute top-[100mm] left-[20mm] w-[170mm]">
            <h2 className="font-inter font-black text-white text-[45px] leading-[1.1] tracking-tighter uppercase">
              If your lead magnet looks like a PDF,<br/>
              <span className="text-[#AF9164]">you are already losing.</span>
            </h2>
          </div>

          {/* Footer */}
          <div className="absolute bottom-[15mm] left-[20mm]">
            <p className="font-inter text-[8px] font-bold text-slate-500 uppercase tracking-[0.4em]">PAGE 02</p>
          </div>
        </div>

        {/* PAGE 3: THE SYSTEM */}
        <div className="a4-page">
          {/* Vertical Gold Line */}
          <div className="absolute top-[30mm] left-[35mm] w-[1px] h-[237mm] bg-[#AF9164]/30"></div>
          
          {/* Item 1: The Hook */}
          <div className="absolute top-[40mm] left-[15mm] w-[180mm] h-[60mm]">
            <div className="absolute top-0 left-[10mm] font-inter font-black text-[#AF9164] text-[100px] leading-none opacity-10">01</div>
            <div className="absolute top-[10mm] left-[10mm] w-[20mm] h-[20mm] bg-[#050505] flex items-center justify-center">
              <img src={imgCrown} alt="Crown" className="w-full h-full object-contain" />
            </div>
            <div className="absolute top-[10mm] left-[45mm] w-[135mm]">
              <h3 className="font-inter text-sm font-black text-white uppercase tracking-[0.2em] mb-2">The Psychological Hook</h3>
              <p className="font-newsreader text-sm text-slate-300 leading-relaxed">Establishing immediate dominance through visual authority. We replace generic layouts with editorial brutalism to command attention.</p>
            </div>
          </div>

          {/* Item 2: Narrative */}
          <div className="absolute top-[120mm] left-[15mm] w-[180mm] h-[60mm]">
            <div className="absolute top-0 left-[10mm] font-inter font-black text-[#AF9164] text-[100px] leading-none opacity-10">02</div>
            <div className="absolute top-[10mm] left-[10mm] w-[20mm] h-[20mm] bg-[#050505] flex items-center justify-center">
              <Link2 size={32} className="text-[#AF9164]" />
            </div>
            <div className="absolute top-[10mm] left-[45mm] w-[135mm]">
              <h3 className="font-inter text-sm font-black text-white uppercase tracking-[0.2em] mb-2">Narrative Architecture</h3>
              <p className="font-newsreader text-sm text-slate-300 leading-relaxed">Moving the prospect from uncertainty to inevitability using data-driven storytelling. We bridge the gap between their current pain and your high-ticket solution.</p>
            </div>
          </div>

          {/* Item 3: The Close */}
          <div className="absolute top-[200mm] left-[15mm] w-[180mm] h-[60mm]">
            <div className="absolute top-0 left-[10mm] font-inter font-black text-[#AF9164] text-[100px] leading-none opacity-10">03</div>
            <div className="absolute top-[10mm] left-[10mm] w-[20mm] h-[20mm] bg-[#050505] flex items-center justify-center">
              <img src={imgArrow} alt="Arrow" className="w-full h-full object-contain" />
            </div>
            <div className="absolute top-[10mm] left-[45mm] w-[135mm]">
              <h3 className="font-inter text-sm font-black text-white uppercase tracking-[0.2em] mb-2">The Frictionless Close</h3>
              <p className="font-newsreader text-sm text-slate-300 leading-relaxed">Removing the "Ask." We engineer the document so that a $10k+ transaction feels like a natural progression rather than a sales pitch.</p>
            </div>
          </div>
          
          <div className="absolute bottom-[15mm] left-[20mm]">
            <p className="font-inter text-[8px] font-bold text-slate-500 uppercase tracking-[0.4em]">PAGE 03</p>
          </div>
        </div>

        {/* PAGE 4: THE EVIDENCE */}
        <div className="a4-page">
          {/* 3x3 Grid Background */}
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '70mm 99mm' }}></div>
          
          <div className="absolute top-[30mm] left-[20mm] w-[170mm]">
            <h2 className="font-inter font-black text-white text-[40px] uppercase tracking-tighter mb-10">Client Transformation</h2>
            
            {/* Table Header */}
            <div className="absolute top-[30mm] left-0 w-[170mm] h-[15mm] border-b border-white/20">
              <div className="absolute left-0 top-[5mm] font-inter text-[8px] font-bold text-slate-500 uppercase tracking-widest">Key Metric</div>
              <div className="absolute left-[60mm] top-[5mm] font-inter text-[8px] font-bold text-slate-500 uppercase tracking-widest">Baseline</div>
              <div className="absolute left-[110mm] top-[5mm] font-inter text-[8px] font-bold text-[#AF9164] uppercase tracking-widest">Matrix Implementation</div>
            </div>

            {/* Row 1 */}
            <div className="absolute top-[45mm] left-0 w-[170mm] h-[25mm] border-b border-white/10">
              <div className="absolute left-0 top-[10mm] font-inter text-xs font-bold text-white uppercase">Lead Quality</div>
              <div className="absolute left-[60mm] top-[8mm] font-newsreader text-lg text-slate-500 italic">Unfiltered</div>
              <div className="absolute left-[110mm] top-[5mm] w-[60mm] h-[15mm] bg-[#AF9164] flex items-center px-4">
                <span className="font-inter text-lg font-black text-[#050505] uppercase">High-Intent</span>
                <ArrowUpRight size={16} className="text-[#050505] ml-auto" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="absolute top-[70mm] left-0 w-[170mm] h-[25mm] border-b border-white/10">
              <div className="absolute left-0 top-[10mm] font-inter text-xs font-bold text-white uppercase">Close Rate</div>
              <div className="absolute left-[60mm] top-[8mm] font-newsreader text-lg text-slate-500 italic">12.5%</div>
              <div className="absolute left-[110mm] top-[5mm] w-[60mm] h-[15mm] bg-[#AF9164] flex items-center px-4">
                <span className="font-inter text-2xl font-black text-[#050505]">44.2%</span>
                <ArrowUpRight size={16} className="text-[#050505] ml-auto" />
              </div>
            </div>

            {/* Row 3 */}
            <div className="absolute top-[95mm] left-0 w-[170mm] h-[25mm] border-b border-white/10">
              <div className="absolute left-0 top-[10mm] font-inter text-xs font-bold text-white uppercase">Avg. Ticket</div>
              <div className="absolute left-[60mm] top-[8mm] font-newsreader text-lg text-slate-500 italic">$2,500</div>
              <div className="absolute left-[110mm] top-[5mm] w-[60mm] h-[15mm] bg-[#AF9164] flex items-center px-4">
                <span className="font-inter text-2xl font-black text-[#050505]">$15,000+</span>
                <ArrowUpRight size={16} className="text-[#050505] ml-auto" />
              </div>
            </div>

            {/* Verdict */}
            <div className="absolute top-[150mm] left-0 w-[170mm] border-2 border-[#AF9164] p-[10mm]">
              <div className="absolute -top-[3mm] left-[10mm] bg-[#050505] px-2 font-inter text-[10px] font-black text-[#AF9164] uppercase tracking-widest">The Architect's Verdict</div>
              <p className="font-newsreader text-xl text-slate-300 leading-relaxed italic">
                "The Matrix didn't just change our numbers; it changed how we are perceived in the market. We went from being a vendor to being a premium partner."
              </p>
            </div>
          </div>
          <div className="absolute bottom-[15mm] left-[20mm]">
            <p className="font-inter text-[8px] font-bold text-slate-500 uppercase tracking-[0.4em]">PAGE 04</p>
          </div>
        </div>

        {/* PAGE 5: THE ACCESS */}
        <div className="a4-page">
          <div className="absolute top-[60mm] left-[75mm] w-[60mm] h-[60mm] bg-white p-[2mm]">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://boluadeoye.com.ng/portfolio/inevitability" className="w-full h-full" />
          </div>
          <div className="absolute top-[125mm] left-[55mm] w-[100mm] text-center">
            <p className="font-inter text-[8px] font-bold text-[#AF9164] uppercase tracking-[0.3em]">Scan to claim your private strategy call</p>
          </div>

          <div className="absolute top-[160mm] left-[55mm] w-[100mm] border-4 border-white text-white font-inter font-black text-4xl tracking-[0.3em] py-4 text-center transform -rotate-6 opacity-90">
            APPROVED
          </div>

          <div className="absolute top-[220mm] left-[20mm] w-[170mm] border-t border-white/20 pt-[5mm] flex justify-between items-end">
            <div>
              <h2 className="font-inter text-2xl font-black text-white uppercase tracking-[0.2em]">Bolu Adeoye</h2>
              <p className="font-inter text-[8px] font-bold text-[#AF9164] uppercase tracking-[0.4em] mt-1">Lead Systems Architect</p>
            </div>
            <div className="text-right">
              <p className="font-mono text-[6px] text-slate-500 uppercase tracking-widest mb-1">Cryptographic Hash</p>
              <p className="font-mono text-[8px] text-slate-300">{cryptoHash}</p>
            </div>
          </div>
          <div className="absolute bottom-[15mm] left-[20mm]">
            <p className="font-inter text-[8px] font-bold text-slate-500 uppercase tracking-[0.4em]">PAGE 05</p>
          </div>
        </div>

      </div>
    </div>
  );
}
