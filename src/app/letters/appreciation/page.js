"use client";
import { useState } from "react";
import { Download, Mail, User, FileText, Church } from "lucide-react";

export default function AppreciationLetter() {
  // State for dynamic inputs so you can change them on your phone without coding
  const [ministerName, setMinisterName] = useState("Guest Minister");
  const [letterBody, setLetterBody] = useState(
    "Grace and peace be multiplied unto you.\n\nOn behalf of the leadership and congregation of Inspirational Insight Ministries, I write to express our profound gratitude for your ministration at our recently concluded conference.\n\nYour exposition of the Word and the demonstration of the Spirit's power were truly a blessing to us all. The seeds sown during your sessions have already begun to yield testimonies among the brethren.\n\nWe pray that the Lord continues to increase your anointing, protect your household, and expand your ministry's global impact. We look forward to future opportunities to partner with you in advancing the Kingdom."
  );

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Appreciation_Letter_${ministerName.replace(/\s+/g, '_')}`;
    window.print();
    document.title = originalTitle;
  };

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1772401576/blog_assets/vm1cxy8mcisdwwkghk3i.jpg";
  const currentDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-red-200">
      
      {/* IMPORT ELEGANT SERIF FONT FOR THE LETTER */}
      <link href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;1,400&display=swap" rel="stylesheet" />

      {/* === NUCLEAR CSS RESET & PRINT STYLES === */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #letter-container, #letter-container * { visibility: visible; }
          #letter-container { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
          .no-print { display: none !important; }
        }
        .font-serif-elegant { font-family: 'Merriweather', serif; }
      `}</style>

      {/* === VIEW 1: THE DASHBOARD (Screen Only) === */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-4 md:p-6">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
          
          {/* Dashboard Header */}
          <div className="bg-slate-900 p-6 text-white flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center p-1">
              <img src={logoUrl} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-widest">Letter Generator</h1>
              <p className="text-xs text-slate-400">Inspirational Insight Ministries</p>
            </div>
          </div>

          {/* Dashboard Form */}
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
                placeholder="e.g. Apostle Joshua Selman"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2 uppercase tracking-wider">
                <FileText size={16} className="text-blue-600" /> Letter Content
              </label>
              <textarea 
                value={letterBody}
                onChange={(e) => setLetterBody(e.target.value)}
                rows={8}
                className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:ring-0 outline-none transition-colors text-sm leading-relaxed"
                placeholder="Paste the letter content here..."
              />
            </div>

            <button 
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-xl uppercase tracking-widest transition-all shadow-lg shadow-red-600/30"
            >
              <Download size={20} />
              Generate PDF Letter
            </button>
          </div>
        </div>
      </div>

      {/* === VIEW 2: THE LETTERHEAD (Print Only) === */}
      <div id="letter-container" className="hidden print:block bg-white w-full h-[297mm] relative overflow-hidden">
        
        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none z-0">
          <img src={logoUrl} alt="Watermark" className="w-[150mm] h-[150mm] object-contain grayscale" />
        </div>

        {/* TOP BORDER (Red, Yellow, Blue) */}
        <div className="flex h-3 w-full absolute top-0 left-0 z-10">
          <div className="bg-[#dc2626] w-1/2"></div> {/* Red */}
          <div className="bg-[#eab308] w-1/4"></div> {/* Yellow */}
          <div className="bg-[#2563eb] w-1/4"></div> {/* Blue */}
        </div>

        {/* LETTER CONTENT WRAPPER */}
        <div className="relative z-10 flex flex-col h-full px-[25mm] py-[20mm]">
          
          {/* HEADER: LOGO & CHURCH INFO */}
          <header className="flex flex-col items-center text-center mb-12 border-b-2 border-slate-100 pb-8">
            <img src={logoUrl} alt="Inspirational Insight Ministries" className="h-28 object-contain mb-4" />
            <h1 className="text-2xl font-black uppercase tracking-[0.2em] text-[#dc2626] mb-1">
              Inspirational Insight Ministries
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#2563eb]">
              Raising a generation of insight and fire
            </p>
          </header>

          {/* DATE & SALUTATION */}
          <div className="font-serif-elegant text-slate-800 mb-8">
            <p className="mb-6 font-bold">{currentDate}</p>
            <p className="text-lg font-bold text-[#1e293b]">Dear {ministerName},</p>
          </div>

          {/* DYNAMIC BODY CONTENT */}
          <main className="font-serif-elegant text-slate-800 leading-[2] text-justify grow">
            {letterBody.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))}
          </main>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-12 pt-8">
            <p className="font-serif-elegant text-slate-800 mb-6 italic">Yours in Christ,</p>
            
            {/* Signature Space */}
            <div className="h-12 w-48 border-b border-slate-300 mb-2"></div>
            
            <h3 className="text-lg font-black uppercase text-[#dc2626] tracking-wider">Pastor Enitan Somuyiwa</h3>
            <p className="text-xs font-bold uppercase tracking-widest text-[#2563eb] mt-1">Lead Pastor</p>
            <p className="text-[10px] font-bold text-slate-500 mt-1">Inspirational Insight Ministries</p>
          </footer>

        </div>

        {/* BOTTOM BORDER (Red, Yellow, Blue) */}
        <div className="flex h-2 w-full absolute bottom-0 left-0 z-10">
          <div className="bg-[#2563eb] w-1/4"></div> {/* Blue */}
          <div className="bg-[#eab308] w-1/4"></div> {/* Yellow */}
          <div className="bg-[#dc2626] w-1/2"></div> {/* Red */}
        </div>

      </div>
    </div>
  );
}
