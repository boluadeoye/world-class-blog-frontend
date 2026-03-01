"use client";
import { useState } from "react";
import { Download, User, FileText } from "lucide-react";

export default function AppreciationLetter() {
  const [ministerName, setMinisterName] = useState("Pastor Salvation");
  const [letterBody, setLetterBody] = useState(
    "Grace and peace be multiplied unto you.\n\nAs Revival Rain 2026 comes to a glorious close, we want to formally express our heartfelt appreciation for your powerful song ministration.\n\nThank you for allowing God to use you to lead us so beautifully into His presence. The worship sessions were truly a highlight of the program, and we are grateful for the grace and anointing you carry.\n\nWe pray that the Lord will continually tune your heart to the sounds of heaven. May He reward your labor of love abundantly, and may your voice always carry His presence and power.\n\nThank you so much for being a blessing to us.\n\nWarm regards,"
  );

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Appreciation_Letter_${ministerName.replace(/\s+/g, '_')}`;
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1772401576/blog_assets/vm1cxy8mcisdwwkghk3i.jpg";

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      
      <link href="https://fonts.googleapis.com/css2?family=Times+New+Roman&family=Inter:wght@400;900&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; }
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm; 
            height: 297mm;
            padding: 20mm;
            box-sizing: border-box;
          }
          .no-print { display: none !important; }
        }
        .letter-text {
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.6;
          color: #1a1a1a;
        }
      `}</style>

      {/* DASHBOARD */}
      <div className="no-print flex flex-col items-center p-6">
        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl border-t-4 border-red-600">
          <h1 className="text-xl font-black mb-4 uppercase tracking-tighter">Letter Editor</h1>
          
          <label className="block text-xs font-bold uppercase mb-1">Minister Name</label>
          <input 
            type="text" 
            value={ministerName}
            onChange={(e) => setMinisterName(e.target.value)}
            className="w-full p-2 border mb-4 rounded"
          />

          <label className="block text-xs font-bold uppercase mb-1">Content</label>
          <textarea 
            value={letterBody}
            onChange={(e) => setLetterBody(e.target.value)}
            rows={10}
            className="w-full p-2 border mb-6 rounded text-sm"
          />

          <button 
            onClick={handlePrint}
            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg uppercase tracking-widest"
          >
            Print Final Letter
          </button>
        </div>
      </div>

      {/* THE ACTUAL LETTER */}
      <div id="print-area" className="hidden print:block bg-white relative">
        
        {/* TOP BORDER */}
        <div className="absolute top-0 left-0 w-full h-3 flex">
          <div className="bg-[#dc2626] w-1/2"></div>
          <div className="bg-[#eab308] w-1/4"></div>
          <div className="bg-[#2563eb] w-1/4"></div>
        </div>

        {/* HEADER SECTION */}
        <div className="flex flex-col items-center text-center mt-10 mb-10 border-b pb-6">
          <img src={logoUrl} alt="Logo" className="h-24 mb-4" />
          <h1 className="text-2xl font-serif font-bold uppercase tracking-widest text-[#dc2626]">
            Inspirational Insight Ministries
          </h1>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563eb] mt-1">
            Raising a generation of insight and fire
          </p>
        </div>

        {/* SALUTATION */}
        <div className="letter-text font-bold mb-6">
          Dear {ministerName},
        </div>

        {/* BODY */}
        <div className="letter-text text-justify whitespace-pre-line">
          {letterBody}
        </div>

        {/* SIGNATURE BLOCK */}
        <div className="mt-10">
          <p className="letter-text italic mb-10">Yours in Christ,</p>
          
          <div className="border-t border-slate-300 w-64 mb-2"></div>
          <h2 className="text-lg font-bold uppercase text-[#dc2626] leading-none">
            Pastor Enitan Somuyiwa
          </h2>
          <p className="text-[10px] font-bold uppercase text-[#2563eb] tracking-widest mt-1">
            Lead Pastor
          </p>
          <p className="text-[9px] text-slate-500 uppercase">Inspirational Insight Ministries</p>
        </div>

        {/* BOTTOM BORDER */}
        <div className="absolute bottom-0 left-0 w-full h-2 flex">
          <div className="bg-[#2563eb] w-1/4"></div>
          <div className="bg-[#eab308] w-1/4"></div>
          <div className="bg-[#dc2626] w-1/2"></div>
        </div>

        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <img src={logoUrl} alt="Watermark" className="w-96 h-96 object-contain grayscale" />
        </div>

      </div>
    </div>
  );
}
