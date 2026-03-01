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
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900">
      
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-doc, #print-doc * { visibility: visible; }
          #print-doc { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm; 
            min-height: 297mm;
            background: white;
            padding: 0;
            margin: 0;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* DASHBOARD */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-lg bg-white p-6 rounded-xl shadow-2xl border-t-4 border-red-600">
          <h1 className="text-xl font-black uppercase mb-6 text-center">Letter Generator</h1>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Minister Name</label>
              <input 
                type="text" 
                value={ministerName}
                onChange={(e) => setMinisterName(e.target.value)}
                className="w-full p-3 border rounded-lg font-bold"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-500">Body Content</label>
              <textarea 
                value={letterBody}
                onChange={(e) => setLetterBody(e.target.value)}
                rows={8}
                className="w-full p-3 border rounded-lg text-sm"
              />
            </div>
            <button 
              onClick={handlePrint}
              className="w-full bg-red-600 text-white font-black py-4 rounded-lg uppercase tracking-widest shadow-lg"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* PRINT DOCUMENT */}
      <div id="print-doc" className="hidden print:block bg-white relative">
        
        {/* TOP BORDER */}
        <div className="w-full h-2 flex">
          <div className="bg-[#dc2626] w-1/2"></div>
          <div className="bg-[#eab308] w-1/4"></div>
          <div className="bg-[#2563eb] w-1/4"></div>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="px-[20mm] py-[10mm]">
          
          {/* HEADER - FORCED VISIBILITY */}
          <div className="flex flex-col items-center text-center mb-10">
            <img src={logoUrl} alt="Logo" className="h-28 object-contain mb-4" />
            <h1 className="font-[Playfair_Display] text-3xl font-black uppercase text-[#dc2626] tracking-wide leading-none mb-2">
              Inspirational Insight Ministries
            </h1>
            <div className="h-[2px] w-20 bg-[#eab308] mb-2"></div>
            <p className="font-[Lora] text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563eb]">
              Building Men Of Stature
            </p>
          </div>

          {/* BODY */}
          <div className="font-[Lora] text-[12pt] text-slate-900 leading-[1.8] text-justify">
            <p className="font-bold mb-6">Dear {ministerName},</p>
            <div className="whitespace-pre-wrap mb-8">
              {letterBody}
            </div>
          </div>

          {/* SIGNATURE */}
          <div className="mt-4">
            <p className="font-[Lora] italic mb-8">Yours in Christ,</p>
            <div className="h-[1px] w-56 bg-slate-800 mb-2"></div>
            <h3 className="font-[Playfair_Display] text-lg font-black uppercase text-[#dc2626]">
              Pastor Enitan Somuyiwa
            </h3>
            <p className="font-[Lora] text-[10px] font-bold uppercase tracking-widest text-[#2563eb]">
              Lead Pastor
            </p>
          </div>

        </div>

        {/* BOTTOM BORDER (Fixed to bottom of page) */}
        <div className="absolute bottom-0 left-0 w-full h-2 flex">
          <div className="bg-[#2563eb] w-1/4"></div>
          <div className="bg-[#eab308] w-1/4"></div>
          <div className="bg-[#dc2626] w-1/2"></div>
        </div>

        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img src={logoUrl} alt="Watermark" className="w-[140mm] h-[140mm] object-contain grayscale" />
        </div>

      </div>
    </div>
  );
}
