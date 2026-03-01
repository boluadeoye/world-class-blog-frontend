"use client";
import { useState } from "react";
import { Download, User, FileText, Edit3 } from "lucide-react";

export default function AppreciationLetter() {
  const [ministerName, setMinisterName] = useState("Pastor Salvation");
  const[letterBody, setLetterBody] = useState(
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-red-200">
      
      {/* IMPORT LUXURY FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;1,400&family=Playfair+Display:ital,wght@0,600;0,800;0,900;1,600&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm; 
            height: 297mm;
            background: white;
          }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-lora { font-family: 'Lora', serif; }
      `}</style>

      {/* === VIEW 1: THE DASHBOARD (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          
          <div className="bg-slate-900 p-6 text-white flex items-center gap-4 border-b-4 border-red-600">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-widest">Luxury Letterhead</h1>
              <p className="text-xs text-slate-400">Inspirational Insight Ministries</p>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                <User size={16} className="text-red-600" /> Minister's Name
              </label>
              <input 
                type="text" 
                value={ministerName}
                onChange={(e) => setMinisterName(e.target.value)}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-red-600 focus:ring-0 outline-none transition-colors font-bold"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                <FileText size={16} className="text-blue-600" /> Letter Content
              </label>
              <textarea 
                value={letterBody}
                onChange={(e) => setLetterBody(e.target.value)}
                rows={10}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:ring-0 outline-none transition-colors text-sm leading-relaxed"
              />
            </div>

            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-red-600/30"
            >
              <Download size={20} />
              Generate Premium PDF
            </button>
          </div>
        </div>
      </div>

      {/* === VIEW 2: THE LETTERHEAD (Print Only) === */}
      <div id="print-area" className="hidden print:block relative overflow-hidden">
        
        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img src={logoUrl} alt="Watermark" className="w-[160mm] h-[160mm] object-contain grayscale" />
        </div>

        {/* TOP LUXURY RIBBON (Red, Yellow, Blue) */}
        <div className="flex h-1.5 w-full absolute top-0 left-0 z-10">
          <div className="bg-[#dc2626] w-1/2"></div> {/* Red */}
          <div className="bg-[#eab308] w-1/4"></div> {/* Yellow */}
          <div className="bg-[#2563eb] w-1/4"></div> {/* Blue */}
        </div>

        {/* LETTER CONTENT WRAPPER */}
        <div className="relative z-10 flex flex-col px-[25mm] pt-[20mm] pb-[20mm] min-h-[297mm]">
          
          {/* PREMIUM HEADER */}
          <header className="flex flex-col items-center text-center mb-12">
            <img src={logoUrl} alt="Logo" className="h-28 object-contain mb-4" />
            <h1 className="font-playfair text-3xl font-black uppercase tracking-[0.1em] text-[#dc2626] mb-2">
              Inspirational Insight Ministries
            </h1>
            <div className="h-[2px] w-16 bg-[#eab308] mb-3"></div>
            <p className="font-lora text-[10px] font-bold uppercase tracking-[0.3em] text-[#2563eb]">
              Building Men Of Stature
            </p>
          </header>

          {/* SALUTATION & BODY */}
          <main className="font-lora text-[12pt] text-slate-900 leading-[1.9] text-justify">
            <p className="font-bold mb-6">Dear {ministerName},</p>
            
            {/* Render text with preserved line breaks */}
            <div className="whitespace-pre-wrap">
              {letterBody}
            </div>
          </main>

          {/* SIGNATURE BLOCK (Flows naturally after text) */}
          <footer className="mt-12 break-inside-avoid">
            {/* Signature Line */}
            <div className="h-1 w-48 border-b-2 border-slate-800 mb-3"></div>
            
            <h3 className="font-playfair text-lg font-black uppercase text-[#dc2626] tracking-wider">
              Pastor Enitan Somuyiwa
            </h3>
            <p className="font-lora text-xs font-bold uppercase tracking-widest text-[#2563eb] mt-1">
              Lead Pastor
            </p>
            <p className="font-lora text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">
              Inspirational Insight Ministries
            </p>
          </footer>

        </div>

        {/* BOTTOM LUXURY RIBBON (Red, Yellow, Blue) */}
        <div className="flex h-1.5 w-full absolute bottom-0 left-0 z-10">
          <div className="bg-[#2563eb] w-1/4"></div> {/* Blue */}
          <div className="bg-[#eab308] w-1/4"></div> {/* Yellow */}
          <div className="bg-[#dc2626] w-1/2"></div> {/* Red */}
        </div>

      </div>
    </div>
  );
}
