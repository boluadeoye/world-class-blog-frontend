"use client";
import { useState, useEffect } from "react";
import { Download, ChevronLeft, ChevronRight, Quote, Heart } from "lucide-react";
import Link from "next/link";

export default function InstagramCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Mayowa_Olaoluwa_Instagram_Carousel";
    window.print();
    document.title = originalTitle;
  };

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  // === THE 10-SLIDE NARRATIVE ===
  const slides = [
    {
      type: "INTRO",
      title: "THE BURDEN",
      quote: "There are moments in life when God plants a burden in your heart long before you fully understand why.",
      author: "Olaoluwa Mayowa"
    },
    {
      type: "STORY",
      title: "The Observation",
      content: "Everywhere I looked, I saw programmes, foundations, and campaigns dedicated to the girl child. Girls were being taught, mentored, and encouraged.\n\nAnd while I celebrated every one of those efforts, one question kept echoing in my heart: 'Who is intentionally raising the boy child?'"
    },
    {
      type: "STORY",
      title: "The Assignment",
      content: "I spoke with The Creative Icon about it. Rather than giving me answers, he instructed me to pray. After some time, he connected me with Director Bim, whose sphere of influence is parenting.\n\nThose conversations made me realise that what I was carrying wasn't just a passing thought. It was an assignment."
    },
    {
      type: "STORY",
      title: "The Community",
      content: "On the 17th of April, I was added to *Bullets*—a community where people are intentionally groomed to become effective in their different spheres.\n\nLooking back, joining that community has been one of the best decisions I've made this year. I've been exposed to new ideas and connected with people whose passions align with mine."
    },
    {
      type: "STORY",
      title: "The Challenge",
      content: "For our task, I was paired with Bulletina Favour. Together, we prepared and presented 'The Boy Child and the Crisis of Identity' during an online session.\n\nIt was my first time speaking in that kind of setting, and I happened to be the first speaker."
    },
    {
      type: "STORY",
      title: "Finding Clarity",
      content: "Afterwards, one part of me whispered, 'You tried.' Another part said, 'You could have done better.'\n\nBut instead of discouragement, I found clarity. That presentation exposed an area I must intentionally develop: public speaking. Growth often begins where comfort ends."
    },
    {
      type: "QUOTE_SLIDE",
      title: "Gratitude",
      quote: "I cannot talk about this journey without appreciating Director Bim. Her consistency is inspiring. She has been committed to raising people who will influence their generation well.",
      subText: "A Mentor's Impact"
    },
    {
      type: "IDENTITY",
      title: "My Name is Mayowa",
      content: "For those who may not know me... My name is Olaoluwa Mayowa, though many know me as BigMummy.\n\nI'm an aspiring chef, the founder of BigMummy's Kitchen, and beyond that, I carry a burden for The Boy Child.",
      accent: "Aspiring Chef // Founder // Advocate"
    },
    {
      type: "STORY",
      title: "Saying Yes",
      content: "I don't have everything figured out yet. I'm still learning. I'm still growing. But I'm saying 'yes' to this assignment.\n\nI don't know exactly what this journey will become, but I know where it started. And I trust God enough to follow Him to where it leads."
    },
    {
      type: "OUTRO",
      title: "The Beginning",
      quote: "The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.",
      callToAction: "This is only the beginning."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-900 font-sans text-slate-800 selection:bg-amber-100">
      
      {/* IMPORT PREMIUM EDITORIAL FONTS */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400;1,600&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { 
            size: 1080px 1080px; 
            margin: 0; 
          }
          body { 
            background: #FAF8F5 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body * { visibility: hidden; }
          #carousel-render, #master-wrap, #master-render, #master-ebook, #ebook-container, #print-doc, #print-area, #letter-container, #print-container, #dossier-render, #rfc-render, #td-render, #td-spec-render, #td-verify-render { display: none !important; }
          #carousel-render, #carousel-render * { visibility: visible; display: flex !important; }
          #carousel-render { position: absolute; left: 0; top: 0; width: 1080px; height: 100%; background: #FAF8F5; }
          .carousel-slide { 
            height: 1080px; width: 1080px; 
            page-break-after: always; 
            position: relative; 
            box-sizing: border-box; 
            overflow: hidden;
            background: #FAF8F5;
            padding: 100px;
          }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* === VIEW 1: THE SWIPE PORTAL === */}
      <div className="no-print h-screen flex flex-col justify-between p-6">
        <header className="flex justify-between items-center bg-stone-950/40 p-4 border border-stone-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#D97B0C] flex items-center justify-center text-white font-bold text-xs rounded-sm">OM</div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Carousel Studio</span>
          </div>
          {!isReady ? (
            <span className="text-[10px] font-mono text-stone-600 animate-pulse uppercase">Syncing...</span>
          ) : (
            <button onClick={handlePrint} className="flex items-center gap-2 bg-white text-black px-4 py-1.5 text-xs font-bold uppercase hover:bg-amber-100 transition-colors">
              <Download size={12} /> Export PDF
            </button>
          )}
        </header>

        {/* Swipe Canvas */}
        <main className="grow flex items-center justify-center p-6 relative">
          <div className="aspect-square w-full max-w-lg bg-[#FAF8F5] shadow-2xl border border-stone-200 overflow-hidden relative flex flex-col p-12 text-[#1E293B]">
             <div className="grow flex flex-col justify-center">
               <SlideRenderer slide={slides[currentSlide]} />
             </div>
             
             {/* Slide Counter */}
             <div className="flex justify-between items-end border-t border-stone-200 pt-6 mt-6">
                <span className="font-inter text-[8px] font-bold uppercase tracking-[0.3em] text-[#D97B0C]">Page {currentSlide + 1} // 10</span>
                <span className="font-playfair italic text-xs text-stone-400">{slides[currentSlide].author || "Sovereign Path"}</span>
             </div>
          </div>
        </main>

        {/* Controls */}
        <footer className="flex justify-center gap-6 p-4">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 bg-stone-900 border border-stone-800 rounded-full text-white hover:text-[#D97B0C] disabled:opacity-30 disabled:hover:text-white transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 bg-stone-900 border border-stone-800 rounded-full text-white hover:text-[#D97B0C] disabled:opacity-30 disabled:hover:text-white transition-all">
            <ChevronRight size={20} />
          </button>
        </footer>
      </div>

      {/* === VIEW 2: THE CAROUSEL (Print Only) === */}
      <div id="carousel-render" className="hidden print:block">
        {slides.map((slide, idx) => (
          <div key={idx} className="carousel-slide flex flex-col justify-between">
            <div className="grow flex flex-col justify-center">
              <SlideRenderer slide={slide} isPrint={true} />
            </div>
            
            {/* Minimal Editorial Footer */}
            <div className="flex justify-between items-end border-t border-stone-200 pt-8">
              <span className="font-inter text-[10px] font-bold uppercase tracking-[0.4em] text-[#D97B0C]">Page {idx + 1} of 10</span>
              <span className="font-playfair italic text-sm text-stone-400">{slide.author || "The Beginning"}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

// === THE RENDERER COMPONENT ===
function SlideRenderer({ slide, isPrint = false }) {
  const textClass = "text-[#1E293B]";
  const headingSize = isPrint ? "text-6xl" : "text-4xl";
  const bodySize = isPrint ? "text-2xl" : "text-base";
  const quoteSize = isPrint ? "text-4xl" : "text-xl";

  return (
    <div className={`h-full flex flex-col justify-center ${textClass}`}>
      
      {slide.type === "INTRO" && (
        <div className="space-y-8">
          <div className="w-16 h-1 bg-[#D97B0C]"></div>
          <p className="font-inter text-xs font-bold uppercase tracking-[0.4em] text-[#D97B0C]">Personal Testimony</p>
          <h1 className={`font-playfair ${headingSize} font-black uppercase tracking-tighter leading-tight`}>
            {slide.title}
          </h1>
          <p className={`font-playfair italic ${quoteSize} leading-relaxed text-stone-600`}>
            &ldquo;{slide.quote}&rdquo;
          </p>
        </div>
      )}

      {slide.type === "STORY" && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <span className="font-inter text-[10px] font-black uppercase tracking-widest text-[#D97B0C]">Chapter</span>
            <div className="h-px w-8 bg-[#D97B0C]"></div>
          </div>
          <h2 className={`font-playfair ${isPrint ? 'text-5xl' : 'text-3xl'} font-black uppercase`}>
            {slide.title}
          </h2>
          <p className={`font-inter ${bodySize} leading-loose text-stone-600 text-justify whitespace-pre-wrap`}>
            {slide.content}
          </p>
        </div>
      )}

      {slide.type === "QUOTE_SLIDE" && (
        <div className="space-y-8 text-center max-w-lg mx-auto">
          <Quote size={isPrint ? 48 : 32} className="mx-auto text-[#D97B0C] opacity-40" />
          <p className={`font-playfair italic ${quoteSize} leading-loose text-stone-700`}>
            &ldquo;{slide.quote}&rdquo;
          </p>
          <div className="h-px w-16 bg-stone-200 mx-auto"></div>
          <p className="font-inter text-[10px] font-bold uppercase tracking-widest text-stone-400">
            {slide.subText}
          </p>
        </div>
      )}

      {slide.type === "IDENTITY" && (
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <Heart size={14} className="text-[#D97B0C]" />
            <span className="font-inter text-[10px] font-black uppercase tracking-widest text-[#D97B0C]">{slide.accent}</span>
          </div>
          <h2 className={`font-playfair ${isPrint ? 'text-5xl' : 'text-3xl'} font-black uppercase`}>
            {slide.title}
          </h2>
          <p className={`font-inter ${bodySize} leading-loose text-stone-600 text-justify whitespace-pre-wrap`}>
            {slide.content}
          </p>
        </div>
      )}

      {slide.type === "OUTRO" && (
        <div className="space-y-8 text-center">
          <p className={`font-playfair italic ${isPrint ? 'text-3xl' : 'text-lg'} leading-loose text-stone-700`}>
            &ldquo;{slide.quote}&rdquo;
          </p>
          <div className="h-0.5 w-12 bg-[#D97B0C] mx-auto"></div>
          <h3 className={`font-inter ${isPrint ? 'text-4xl' : 'text-xl'} font-black uppercase tracking-widest text-[#D97B0C] animate-pulse`}>
            {slide.callToAction}
          </h3>
        </div>
      )}

    </div>
  );
}
