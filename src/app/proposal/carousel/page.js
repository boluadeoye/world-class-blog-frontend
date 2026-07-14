"use client";
import { useState, useEffect } from "react";
import { Download, ChevronLeft, ChevronRight, Quote, Heart, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function InstagramCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1000);
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
      content: "Everywhere I looked, I saw programmes, foundations, and campaigns dedicated to the girl child. Girls were being taught, mentored, and supported.\n\nWhile I celebrated those efforts, one question kept echoing: 'Who is intentionally raising the boy child?'"
    },
    {
      type: "STORY",
      title: "The Assignment",
      content: "I spoke with The Creative Icon. Instead of giving answers, he instructed me to pray. Later, he connected me with Director Bim, an authority on parenting and purpose.\n\nThose conversations made me realise that what I carried was not a passing thought, but an assignment."
    },
    {
      type: "STORY",
      title: "The Community",
      content: "On the 17th of April, I was added to *Bullets*—a community where people are intentionally groomed to become effective in their spheres.\n\nJoining was one of my best decisions this year. I've been exposed to new ideas and connected with passionate, aligned minds."
    },
    {
      type: "STORY",
      title: "The Challenge",
      content: "For our task, I was paired with Bulletina Favour. Together, we researched and presented 'The Boy Child and the Crisis of Identity' during an online session.\n\nIt was my first time speaking in that kind of setting, and I was the opening speaker."
    },
    {
      type: "STORY",
      title: "Finding Clarity",
      content: "Afterward, one part of me said, 'You tried.' Another whispered, 'You could have done better.'\n\nInstead of discouragement, I found clarity. The experience exposed an area I must intentionally develop: public speaking. Growth begins where comfort ends."
    },
    {
      type: "QUOTE_SLIDE",
      title: "Gratitude",
      quote: "I cannot talk about this journey without appreciating Director Bim. Her consistency is inspiring. She is deeply committed to raising a generation of impactful leaders.",
      subText: "A Mentor's Legacy"
    },
    {
      type: "IDENTITY",
      title: "My Name is Mayowa",
      content: "For those who may not know me: I am Olaoluwa Mayowa, known to many as BigMummy.\n\nI am an aspiring chef, the founder of BigMummy's Kitchen, and most importantly, an advocate carrying a deep burden for the Boy Child.",
      accent: "Chef // Founder // Advocate"
    },
    {
      type: "STORY",
      title: "Saying Yes",
      content: "I don't have everything figured out. I am still learning and growing, but I am saying 'yes' to this assignment.\n\nI do not know where this path leads, but I know where it started. I trust God enough to follow Him through the journey."
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
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400;1,600&family=Inter:wght@300;400;500;700&display=swap" rel="stylesheet" />

      {/* === PHYSICAL SQUARE PRINT ENGINE === */}
      <style jsx global>{`
        @media print {
          @page { 
            size: 210mm 210mm; 
            margin: 0; 
          }
          body { 
            background: #FAF8F5 !important; 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
          }
          body * { visibility: hidden; }
          #carousel-render, #carousel-render * { visibility: visible; }
          #carousel-render { 
            position: absolute; 
            left: 0; 
            top: 0; 
            width: 210mm; 
            background: #FAF8F5;
            display: block !important;
          }
          .carousel-slide { 
            height: 210mm; 
            width: 210mm; 
            page-break-after: always; 
            display: flex !important;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box; 
            background: #FAF8F5;
            padding: 25mm 25mm 20mm 25mm;
          }
          .no-print { display: none !important; }
        }
      `}</style>

      {/* === SCREEN SWIPE PORTAL === */}
      <div className="no-print h-screen flex flex-col justify-between p-6">
        <header className="flex justify-between items-center bg-stone-950/40 p-4 border border-stone-800 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-amber-600 flex items-center justify-center text-white font-bold text-xs rounded-sm">OM</div>
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest font-inter">Editorial Carousel Studio</span>
          </div>
          {isReady && (
            <button onClick={handlePrint} className="flex items-center gap-2 bg-white text-black px-4 py-1.5 text-xs font-bold uppercase hover:bg-amber-100 transition-colors rounded-sm">
              <Download size={12} /> Export 1:1 PDF
            </button>
          )}
        </header>

        {/* Live Square Preview */}
        <main className="grow flex items-center justify-center p-4">
          <div className="aspect-square w-full max-w-[450px] bg-[#FAF8F5] shadow-2xl border border-stone-200 flex flex-col justify-between p-12 text-[#1E293B] rounded-sm">
             <div className="grow flex flex-col justify-center">
               <SlideRenderer slide={slides[currentSlide]} />
             </div>
             
             <div className="flex justify-between items-end border-t border-stone-200/80 pt-4 mt-4">
                <span className="font-inter text-[8px] font-black uppercase tracking-[0.3em] text-[#D97B0C]">Page {currentSlide + 1} // 10</span>
                <span className="font-playfair italic text-[10px] text-stone-400">{slides[currentSlide].author || "Mayowa Olaoluwa"}</span>
             </div>
          </div>
        </main>

        {/* Interactive Controls */}
        <footer className="flex justify-center gap-6 p-2">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 bg-stone-950 border border-stone-800 rounded-full text-white hover:text-[#D97B0C] disabled:opacity-30 transition-all">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 bg-stone-950 border border-stone-800 rounded-full text-white hover:text-[#D97B0C] disabled:opacity-30 transition-all">
            <ChevronRight size={18} />
          </button>
        </footer>
      </div>

      {/* === PRINT OUTPUT (Vector 210mm x 210mm Square) === */}
      <div id="carousel-render" className="hidden">
        {slides.map((slide, idx) => (
          <div key={idx} className="carousel-slide">
            <div className="grow flex flex-col justify-center">
              <SlideRenderer slide={slide} isPrint={true} />
            </div>
            
            <div className="flex justify-between items-end border-t border-stone-200/80 pt-6">
              <span className="font-inter text-[10px] font-black uppercase tracking-[0.3em] text-[#D97B0C]">Page {idx + 1} of 10</span>
              <span className="font-playfair italic text-sm text-stone-400">{slide.author || "Mayowa Olaoluwa"}</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function SlideRenderer({ slide, isPrint = false }) {
  const headingSize = isPrint ? "text-4xl" : "text-2xl";
  const bodySize = isPrint ? "text-lg" : "text-sm";
  const quoteSize = isPrint ? "text-2xl" : "text-base";

  return (
    <div className="h-full flex flex-col justify-center text-[#1E293B]">
      
      {slide.type === "INTRO" && (
        <div className="space-y-6">
          <div className="w-12 h-0.5 bg-[#D97B0C]"></div>
          <p className="font-inter text-[9px] font-bold uppercase tracking-[0.4em] text-[#D97B0C]">Personal Testimony</p>
          <h1 className={`font-playfair ${headingSize} font-black uppercase tracking-tighter leading-tight`}>
            {slide.title}
          </h1>
          <p className={`font-playfair italic ${quoteSize} leading-relaxed text-stone-500`}>
            &ldquo;{slide.quote}&rdquo;
          </p>
        </div>
      )}

      {slide.type === "STORY" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-inter text-[8px] font-black uppercase tracking-widest text-[#D97B0C]">Narrative</span>
            <div className="h-[0.5px] w-6 bg-[#D97B0C]"></div>
          </div>
          <h2 className={`font-playfair ${isPrint ? 'text-3xl' : 'text-xl'} font-black uppercase`}>
            {slide.title}
          </h2>
          <p className={`font-inter ${bodySize} leading-relaxed text-stone-600 text-justify whitespace-pre-wrap`}>
            {slide.content}
          </p>
        </div>
      )}

      {slide.type === "QUOTE_SLIDE" && (
        <div className="space-y-6 text-center max-w-md mx-auto">
          <Quote size={isPrint ? 36 : 24} className="mx-auto text-[#D97B0C] opacity-40" />
          <p className={`font-playfair italic ${quoteSize} leading-relaxed text-stone-700`}>
            &ldquo;{slide.quote}&rdquo;
          </p>
          <div className="h-[0.5px] w-12 bg-stone-200 mx-auto"></div>
          <p className="font-inter text-[8px] font-bold uppercase tracking-widest text-stone-400">
            {slide.subText}
          </p>
        </div>
      )}

      {slide.type === "IDENTITY" && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Heart size={12} className="text-[#D97B0C]" />
            <span className="font-inter text-[8px] font-black uppercase tracking-widest text-[#D97B0C]">{slide.accent}</span>
          </div>
          <h2 className={`font-playfair ${isPrint ? 'text-3xl' : 'text-xl'} font-black uppercase`}>
            {slide.title}
          </h2>
          <p className={`font-inter ${bodySize} leading-relaxed text-stone-600 text-justify whitespace-pre-wrap`}>
            {slide.content}
          </p>
        </div>
      )}

      {slide.type === "OUTRO" && (
        <div className="space-y-6 text-center">
          <p className={`font-playfair italic ${isPrint ? 'text-xl' : 'text-sm'} leading-relaxed text-stone-700`}>
            &ldquo;{slide.quote}&rdquo;
          </p>
          <div className="h-[1px] w-8 bg-[#D97B0C] mx-auto"></div>
          <h3 className="font-inter text-sm font-black uppercase tracking-widest text-[#D97B0C]">
            {slide.callToAction}
          </h3>
        </div>
      )}

    </div>
  );
}
