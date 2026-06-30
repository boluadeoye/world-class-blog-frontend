"use client";
import { useState, useEffect } from "react";
import { Download, User, MapPin, CheckCircle2, ChevronRight } from "lucide-react";

export default function InvitationEngine() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
  }, []);

  const logoUrl = "https://res.cloudinary.com/dwbjb3svx/image/upload/v1772401576/blog_assets/vm1cxy8mcisdwwkghk3i.jpg";
  const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const ministers = [
    {
      name: "Mr. Muyiwa Alayedelu",
      topic: "Building from a Small Place",
      content: "It is with great pleasure that we officially invite you to minister at our upcoming Passing Out Conference (POC). We would be honoured to have you speak on the topic of \"Building from a Small Place,\" as we know your insights on this subject will be profoundly impactful for our congregation.",
      sessions: [
        "Day 1 (Morning Session): Wednesday, 8 July 2026",
        "Day 2 (Morning Session): Thursday, 9 July 2026"
      ],
      closing: "We are confident your sessions will greatly enrich everyone in attendance. Please let us know if you would prefer to pre-record your sessions or stream live. Thank you for your continued support and labour of love, and we look forward to hosting you."
    },
    {
      name: "Mr. Faith Omoniyi",
      topic: "Tech and the Tech Spaces",
      content: "We are thrilled to officially invite you to minister at our upcoming Passing Out Conference (POC). We would be honoured to have you speak on the topic of \"Tech and the Tech Spaces,\" as we know your expertise and spiritual perspective on this subject will be profoundly impactful for our congregation.",
      sessions: [
        "Day 1 (Evening Session): Wednesday, 8 July 2026",
        "Day 2 (Morning Session): Thursday, 9 July 2026",
        "Day 2 (Evening Session): Thursday, 9 July 2026"
      ],
      closing: "We are eagerly anticipating the wisdom and clarity you will share with the house. Please let us know if you would prefer to pre-record your sessions or stream live. Thank you for your time and dedication to this mandate."
    },
    {
      name: "Mr. Adeogo",
      topic: "Creativity",
      content: "It is a great privilege to officially invite you to minister at our upcoming Passing Out Conference (POC). We would be honoured to have you speak on the topic of \"Creativity,\" as we know your unique perspective on this subject will be profoundly impactful for our congregation.",
      sessions: [
        "Day 1 (Evening Session): Wednesday, 8 July 2026",
        "Day 3 (Morning Session): Friday, 10 July 2026"
      ],
      closing: "Please let us know if you would prefer to pre-record your sessions or stream live. Thank you for your willingness to be a blessing to us. We look forward to a powerful time of learning and impartation."
    },
    {
      name: "Pastor Jeremiah",
      topic: "Minister",
      content: "It is with great joy that we officially invite you to minister at our upcoming Passing Out Conference (POC). Your voice is a massive blessing to us, and we are looking forward to having you anchor a session during the programme.",
      sessions: [
        "Day 2 (Evening Session): Thursday, 9 July 2026"
      ],
      closing: "We are fully prepared and eagerly anticipating the word you will share with the house. Thank you for your continued labour of love and commitment to the ministry."
    }
  ];

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Invitation_${ministers[selectedIdx].name.replace(/\s+/g, '_')}`;
    window.print();
    document.title = originalTitle;
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-900 antialiased">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Lora:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #print-area, #print-area * { visibility: visible; }
          #print-area { position: absolute; left: 0; top: 0; width: 210mm; height: 297mm; background: white; }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* VIEW 1: SELECTION PORTAL */}
      <div className="no-print flex flex-col items-center py-12 px-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-[#991b1b] p-8 text-center">
            <img src={logoUrl} alt="Logo" className="h-24 mx-auto mb-4 mix-blend-lighten" />
            <h1 className="text-white font-playfair text-2xl font-black uppercase tracking-widest">Invitation Engine V2</h1>
            <p className="text-red-200 text-xs uppercase tracking-[0.3em] mt-2">Passing Out Conference 2026</p>
          </div>

          <div className="p-8">
            <h2 className="text-sm font-black uppercase text-slate-400 mb-6 tracking-widest">Select Minister to Generate Letter</h2>
            <div className="grid grid-cols-1 gap-4 mb-10">
              {ministers.map((m, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${selectedIdx === i ? 'border-[#991b1b] bg-red-50' : 'border-slate-100 hover:border-slate-300'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${selectedIdx === i ? 'bg-[#991b1b] text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <User size={20} />
                    </div>
                    <div className="text-left">
                      <p className="font-bold text-slate-900">{m.name}</p>
                      <p className="text-xs text-slate-500 uppercase tracking-tight">{m.topic}</p>
                    </div>
                  </div>
                  {selectedIdx === i && <CheckCircle2 className="text-[#991b1b]" />}
                </button>
              ))}
            </div>

            <button 
              onClick={handlePrint}
              className="w-full bg-[#991b1b] hover:bg-red-800 text-white font-black py-5 rounded-2xl uppercase tracking-[0.2em] shadow-xl shadow-red-900/20 transition-all flex items-center justify-center gap-3"
            >
              <Download size={20} />
              Generate Official PDF
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 2: THE PRINT LETTERHEAD */}
      <div id="print-area" className="hidden print:block relative overflow-hidden">
        
        {/* TOP RIBBON */}
        <div className="flex h-1.5 w-full absolute top-0 left-0 z-10">
          <div className="bg-[#991b1b] w-1/2"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#2563eb] w-1/4"></div>
        </div>

        {/* WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
          <img src={logoUrl} alt="Watermark" className="w-[160mm] h-[160mm] object-contain grayscale" />
        </div>

        <div className="relative z-10 flex flex-col h-full px-[25mm] py-[25mm]">
          
          {/* HEADER */}
          <header className="flex justify-between items-start mb-16 border-b-2 border-slate-100 pb-8">
            <div className="flex items-center gap-4">
              <img src={logoUrl} alt="Logo" className="h-20 object-contain" />
              <div className="h-14 w-px bg-slate-200"></div>
              <div className="text-left">
                <h1 className="font-playfair text-xl font-black uppercase text-[#991b1b] leading-tight">
                  Inspirational Insight<br/>Christian Assembly
                </h1>
                <p className="font-inter text-[8px] font-bold text-slate-500 uppercase tracking-[0.25em] mt-1">Oye-Egbo, Ekiti State // Nigeria</p>
              </div>
            </div>

            {/* THE CONFERENCE BRAND STAMP */}
            <div className="border border-[#eab308] p-3 text-center bg-amber-50/50">
              <p className="font-playfair text-sm font-black text-[#991b1b] leading-none">POC &apos;26</p>
              <p className="font-inter text-[6px] font-bold uppercase text-slate-500 tracking-wider mt-1">Passing Out Conference</p>
            </div>
          </header>

          {/* DATE & SALUTATION */}
          <main className="grow font-lora text-[11pt] text-slate-900 leading-[1.9] text-justify">
            <p className="font-mono text-[9px] font-bold text-slate-400 mb-10 uppercase tracking-widest">DATE: {today}</p>
            
            <p className="font-bold text-base mb-6">Dear {ministers[selectedIdx].name},</p>
            
            <p className="mb-6">{ministers[selectedIdx].content}</p>
            
            <p className="font-inter text-xs font-black text-[#991b1b] uppercase tracking-wider mb-3">Conference Itinerary:</p>
            
            {/* SCHEDULE CARD */}
            <div className="bg-stone-50 border-l-4 border-[#eab308] p-5 mb-8 space-y-2">
              {ministers[selectedIdx].sessions.map((s, i) => (
                <div key={i} className="flex items-center gap-3 font-mono text-[10px] font-bold text-slate-700">
                  <ChevronRight size={12} className="text-[#991b1b]" />
                  {s}
                </div>
              ))}
            </div>

            <p className="mb-8">{ministers[selectedIdx].closing}</p>
          </main>

          {/* SIGNATURE BLOCK */}
          <footer className="mt-8">
            <p className="font-lora italic text-slate-500 mb-6">Best Regards,</p>
            <div className="h-[1px] w-48 bg-slate-800 mb-3"></div>
            <h3 className="font-playfair text-xl font-black uppercase text-[#991b1b] tracking-wider leading-none">
              Praise Oluwole
            </h3>
            <p className="font-inter text-[8px] font-bold uppercase tracking-widest text-[#2563eb] mt-1.5">
              Team Lead, Programmes & Anchors
            </p>
            <p className="font-inter text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
              Inspirational Insight Christian Assembly
            </p>
          </footer>

        </div>

        {/* BOTTOM RIBBON */}
        <div className="flex h-1.5 w-full absolute bottom-0 left-0 z-10">
          <div className="bg-[#2563eb] w-1/4"></div><div className="bg-[#eab308] w-1/4"></div><div className="bg-[#991b1b] w-1/2"></div>
        </div>

      </div>
    </div>
  );
}
