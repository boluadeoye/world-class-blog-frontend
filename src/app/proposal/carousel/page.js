"use client";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, ChevronLeft, ChevronRight, Heart, ArrowRight, Quote, Camera } from "lucide-react";

export default function InstagramCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const slideRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 800);
  }, []);

  const downloadPng = async () => {
    if (slideRef.current === null) return;
    setIsCapturing(true);
    try {
      const dataUrl = await toPng(slideRef.current, {
        pixelRatio: 3, // High-Density 1140x1140 output
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `Mayowa_Slide_${currentSlide + 1}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Capture failed', err);
    } finally {
      setIsCapturing(false);
    }
  };

  const nextSlide = () => { if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1); };
  const prevSlide = () => { if (currentSlide > 0) setCurrentSlide(currentSlide - 1); };

  const slides = [
    {
      type: "COVER",
      badge: "MY BULLETS JOURNEY",
      title: "FROM BURDEN TO ASSIGNMENT",
      quote: "There are moments in life when God plants a burden in your heart long before you fully understand why.",
      subText: "This is the story of how a simple question became an assignment that continues to shape my life."
    },
    {
      type: "STORY",
      title: "The Question That Wouldn't Leave Me",
      content: "Earlier this year, I began to notice something that wouldn't leave my mind.\n\nEverywhere I looked, I saw programmes, foundations, outreaches, and campaigns dedicated to the girl child. Girls were being taught, mentored, encouraged, and even provided with essentials like sanitary pads in schools.\n\nWhile I celebrated every one of those efforts, one question kept echoing in my heart:\n\n\"Who is intentionally raising the boy child?\""
    },
    {
      type: "STORY",
      title: "More Than Just a Thought",
      content: "It wasn't anger. It wasn't comparison. It was a burden. The more I tried to ignore it, the louder it became.\n\nSo, I spoke with The Creative Icon about it. Rather than giving me answers, he instructed me to pray. Later, he connected me with Director Bim.\n\nThat conversation changed everything."
    },
    {
      type: "QUOTE",
      title: "When Burden Became Assignment",
      quote: "Director Bim asked me several questions about what I was carrying. By the end of those conversations, I realised this wasn't just another idea. It wasn't a passing thought. It was an assignment."
    },
    {
      type: "STORY",
      title: "Why We Are Called Bullets",
      content: "On the 17th of April, I was added to Bullets—a community where people are intentionally groomed to become effective in their different spheres of influence.\n\nOne thing Director Bim explained has stayed with me. She said the enemy will never stop launching attacks against the people our assignments are directed towards.\n\nBecause of that, we cannot afford to be passive. We must remain alert, continually grow, sharpen ourselves, and always be ready to \"fire our bullets\" wherever God sends us."
    },
    {
      type: "STORY",
      title: "One of My Best Decisions",
      content: "Looking back, joining Bullets has been one of the best decisions I've made this year.\n\nFinal year came with its own demands, so I wasn't as consistent as I would have loved. Even so, I can confidently say that I have grown.\n\nI've been exposed to new ideas, met amazing people, and connected with others pursuing God-given assignments."
    },
    {
      type: "STORY",
      title: "The Assignment That Stretched Me",
      content: "For the May and June task, I was paired with Bulletina Favour. Together, we researched and presented:\n\n\"The Boy Child and the Crisis of Identity: Between Expectations and Reality.\"\n\nIt was my first time speaking in that kind of online setting. And I happened to be the first speaker."
    },
    {
      type: "STORY",
      title: "The Lesson I Didn't Expect",
      content: "After the presentation...\nOne part of me whispered, \"You tried.\"\nAnother part said, \"You could have done better.\"\n\nBut instead of discouragement, I found clarity. That experience showed me an area I must intentionally develop: Public speaking.\n\nBecause growth often begins where comfort ends."
    },
    {
      type: "QUOTE",
      title: "A Heart of Gratitude",
      quote: "I cannot talk about this journey without appreciating Director Bim. Her consistency is inspiring. From attending conferences to sharing podcasts and constantly pouring into us, she has remained committed to raising people who will influence their generation well."
    },
    {
      type: "IDENTITY",
      title: "Who Am I?",
      content: "For those who may not know me...\n\nMy name is Olaoluwa Mayowa, though many know me as BigMummy.\n\nI'm an aspiring chef and the founder of BigMummy's Kitchen. But beyond food... I carry a burden for the boy child."
    },
    {
      type: "STORY",
      title: "This Is My \"Yes\"",
      content: "I don't have everything figured out. I'm still learning. I'm still growing. But I'm saying \"yes\" to this assignment.\n\nI don't know exactly what this journey will become... But I know where it started. And I trust God enough to follow Him wherever He leads."
    },
    {
      type: "OUTRO",
      title: "This Is Only the Beginning",
      quote: "The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture, tradition, and expectation.",
      sub: "Every man society celebrates was once a boy who was guided."
    }
  ];

  return (
    <div className="min-h-screen bg-stone-950 font-sans text-slate-800 selection:bg-amber-100 overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      {/* STUDIO PORTAL (Screen View) */}
      <div className="min-h-screen flex flex-col justify-between p-4 md:p-6 max-w-xl mx-auto">
        <header className="flex justify-between items-center bg-stone-900 p-4 border border-stone-800 rounded-xl mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#D97B0C] rounded-lg flex items-center justify-center text-white">
              <Camera size={18} />
            </div>
            <div>
              <h1 className="text-white font-bold text-xs uppercase tracking-widest font-inter">Carousel Studio</h1>
              <p className="text-stone-500 text-[9px] font-mono uppercase">1080x1080 High-Density PNG</p>
            </div>
          </div>
          <button 
            onClick={downloadPng} 
            disabled={isCapturing}
            className="bg-white text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#D97B0C] hover:text-white transition-all flex items-center gap-2 shadow-lg"
          >
            {isCapturing ? "Saving..." : <><Download size={14} /> Save Slide</>}
          </button>
        </header>

        {/* RESPONSIVE SQUARE CANVAS */}
        <main className="grow flex items-center justify-center py-2">
          <div 
            ref={slideRef}
            className="w-full aspect-square max-w-[380px] bg-[#FAF8F5] shadow-2xl rounded-xl border border-stone-200 p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <SlideRenderer slide={slides[currentSlide]} index={currentSlide} />
            
            {/* EDITORIAL FOOTER */}
            <footer className="flex justify-between items-end border-t border-stone-200/80 pt-3 mt-2 shrink-0">
              <div className="space-y-0.5">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[#D97B0C]">Slide {currentSlide + 1} / 12</p>
                <p className="font-playfair italic text-[10px] text-stone-400">The Bullets Journey</p>
              </div>
              <div className="w-7 h-7 border border-stone-300 rounded flex items-center justify-center">
                <span className="font-inter font-black text-[9px] text-stone-500">OM</span>
              </div>
            </footer>
          </div>
        </main>

        {/* CONTROLS */}
        <footer className="flex justify-center gap-6 p-4">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 bg-stone-900 border border-stone-800 rounded-full text-white hover:bg-[#D97B0C] disabled:opacity-20 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 bg-stone-900 border border-stone-800 rounded-full text-white hover:bg-[#D97B0C] disabled:opacity-20 transition-all">
            <ChevronRight size={20} />
          </button>
        </footer>
      </div>
    </div>
  );
}

// SLIDE RENDERER (UN-SQUASHED)
function SlideRenderer({ slide, index }) {
  return (
    <div className="grow flex flex-col justify-center text-[#1E293B] overflow-hidden">
      
      {/* 1. COVER SLIDE */}
      {slide.type === "COVER" && (
        <div className="h-full flex flex-col justify-between py-1">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[9px] font-bold text-[#D97B0C] uppercase tracking-[0.25em]">{slide.badge}</span>
            <div className="w-6 h-6 border border-stone-300 flex items-center justify-center font-inter font-black text-[9px]">OM</div>
          </div>

          <div className="my-auto space-y-3">
            <h1 className="font-inter text-2xl font-black uppercase tracking-tight leading-tight text-[#1E293B]">
              {slide.title}
            </h1>
            <div className="h-0.5 w-12 bg-[#D97B0C]"></div>
            <p className="font-playfair italic text-sm text-stone-600 leading-relaxed">
              &ldquo;{slide.quote}&rdquo;
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <p className="font-inter text-xs text-stone-500 leading-relaxed">{slide.subText}</p>
            <div className="flex items-center gap-1.5 text-[#D97B0C] font-inter font-bold text-[10px] uppercase tracking-widest">
              <span>Swipe</span>
              <ArrowRight size={12} />
            </div>
          </div>
        </div>
      )}

      {/* 2. STORY SLIDES */}
      {slide.type === "STORY" && (
        <div className="space-y-3 my-auto">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#D97B0C]">0{index + 1}</span>
            <div className="h-px grow bg-stone-200"></div>
          </div>
          <h2 className="font-playfair text-lg font-black uppercase leading-snug text-[#1E293B]">
            {slide.title}
          </h2>
          <p className="font-inter text-xs leading-relaxed text-stone-600 text-justify whitespace-pre-wrap">
            {slide.content}
          </p>
        </div>
      )}

      {/* 3. QUOTE SLIDES */}
      {slide.type === "QUOTE" && (
        <div className="space-y-4 text-center my-auto px-2">
          <Quote size={28} className="mx-auto text-[#D97B0C] opacity-30" />
          <h3 className="font-inter text-[9px] font-black uppercase tracking-[0.25em] text-[#D97B0C]">{slide.title}</h3>
          <p className="font-playfair italic text-base leading-relaxed text-[#1E293B]">
            &ldquo;{slide.quote}&rdquo;
          </p>
          <div className="h-0.5 w-8 bg-[#D97B0C] mx-auto"></div>
        </div>
      )}

      {/* 4. IDENTITY SLIDE */}
      {slide.type === "IDENTITY" && (
        <div className="space-y-3 my-auto">
          <div className="flex items-center gap-2">
            <Heart size={14} className="text-[#D97B0C]" />
            <span className="font-inter text-[9px] font-black uppercase tracking-widest text-[#D97B0C]">Identity Profile</span>
          </div>
          <h2 className="font-playfair text-2xl font-black uppercase tracking-tight text-[#1E293B]">
            {slide.title}
          </h2>
          <div className="h-0.5 w-10 bg-[#D97B0C]"></div>
          <p className="font-inter text-xs leading-relaxed text-stone-600 whitespace-pre-wrap">
            {slide.content}
          </p>
        </div>
      )}

      {/* 5. OUTRO SLIDE */}
      {slide.type === "OUTRO" && (
        <div className="text-center space-y-4 my-auto px-2">
          <div className="w-10 h-10 bg-stone-900 rounded-full mx-auto flex items-center justify-center text-white">
            <Heart size={18} className="text-[#D97B0C]" />
          </div>
          <h1 className="font-playfair text-2xl font-black uppercase tracking-tight text-[#1E293B]">
            {slide.title}
          </h1>
          <p className="font-playfair italic text-sm text-stone-600 leading-relaxed">
            &ldquo;{slide.quote}&rdquo;
          </p>
          <p className="font-inter text-[9px] font-bold uppercase tracking-[0.25em] text-[#D97B0C]">
            {slide.sub}
          </p>
        </div>
      )}

    </div>
  );
}
