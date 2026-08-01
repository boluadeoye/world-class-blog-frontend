"use client";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, ChevronLeft, ChevronRight, Quote, Heart, Sparkles, ArrowRight } from "lucide-react";

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
        pixelRatio: 3, // High-Density 1140x1140 Output
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
      author: "Olaoluwa Mayowa",
      titleTop: "FROM BURDEN",
      titleMain: "TO ASSIGNMENT",
      subtitle: "MY BULLETS JOURNEY",
      hook: "There are moments in life when God plants a burden in your heart long before you fully understand why.",
      subHook: "This is the story of how a simple question became an assignment that continues to shape my life."
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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,600&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        /* CRYSTALLINE DIAMOND DUST BACKGROUND */
        .glitter-mesh {
          background: radial-gradient(circle at 0% 0%, #fdfbfb 0%, #ebedee 100%),
                      radial-gradient(circle at 100% 100%, #fef3c7 0%, #e0f2fe 100%);
          position: relative;
        }
        .glitter-mesh::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px);
          background-size: 16px 16px;
          background-position: 0 0, 8px 8px;
          opacity: 0.6;
          pointer-events: none;
        }
        
        /* LUXURY GLASS CARD */
        .luxury-glass {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.8);
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
              <h1 className="text-white font-bold text-xs uppercase tracking-widest font-inter">Signature Studio</h1>
              <p className="text-slate-500 text-[9px] font-mono uppercase">Luxury 4K Engine</p>
            </div>
          </div>
          <button 
            onClick={downloadPng} 
            disabled={isCapturing}
            className="bg-white text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all shadow-lg"
          >
            {isCapturing ? "Saving..." : <><Download size={14} /> Save Slide</>}
          </button>
        </header>

        {/* 1:1 SQUARE CANVAS */}
        <main className="grow flex items-center justify-center py-1">
          <div 
            ref={slideRef}
            className="w-full aspect-square max-w-[380px] glitter-mesh shadow-2xl rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden"
          >
            <SlideRenderer slide={slides[currentSlide]} index={currentSlide} total={slides.length} />
          </div>
        </main>

        {/* CONTROLS */}
        <footer className="flex justify-center gap-6 p-3">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 bg-slate-900 border border-slate-800 rounded-full text-white hover:text-amber-500 disabled:opacity-20 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 bg-slate-900 border border-slate-800 rounded-full text-white hover:text-amber-500 disabled:opacity-20 transition-all">
            <ChevronRight size={20} />
          </button>
        </footer>
      </div>
    </div>
  );
}

// SLIDE RENDERER
function SlideRenderer({ slide, index, total }) {
  const isLast = index === total - 1;

  return (
    <div className="luxury-glass w-full h-full rounded-xl p-5 flex flex-col justify-between text-[#000000] relative z-10 box-border">
      
      {/* TOP HEADER BAR (PULLED ALL THE WAY UP) */}
      <header className="flex justify-between items-start shrink-0 mb-2">
        {slide.type === "COVER" ? (
          <span className="font-playfair italic text-xs font-semibold tracking-wider text-[#000000]">{slide.author}</span>
        ) : (
          <span className="font-inter text-[8px] font-black uppercase tracking-[0.2em] text-[#D97B0C]">
            {slide.subtitle || "The Bullets Journey"}
          </span>
        )}
        <div className="w-7 h-7 border border-[#000000] flex items-center justify-center font-inter font-black text-[9px] text-[#000000] bg-white/60 shrink-0">
          OM
        </div>
      </header>

      {/* CENTER CONTENT CONTAINER (RAISED UP, NO OVERFLOW) */}
      <main className="my-auto space-y-3 overflow-hidden py-1">
        
        {/* COVER SLIDE */}
        {slide.type === "COVER" && (
          <div className="space-y-3">
            <p className="font-inter text-[8px] font-black uppercase tracking-[0.25em] text-[#D97B0C]">{slide.subtitle}</p>
            
            <div className="flex gap-3 items-center">
              {/* Compact Trajectory Symbol */}
              <div className="flex flex-col items-center gap-0.5 shrink-0">
                <div className="w-2 h-2 rounded-full border border-amber-600 bg-amber-200"></div>
                <div className="w-px h-8 bg-black/30"></div>
                <div className="w-2 h-2 bg-black rotate-45"></div>
              </div>
              <div>
                <p className="font-playfair italic text-xs text-[#000000] leading-none mb-1">{slide.titleTop}</p>
                <h1 className="font-inter text-xl font-black uppercase tracking-tight text-[#000000] leading-none">
                  {slide.titleMain}
                </h1>
              </div>
            </div>

            <p className="font-playfair italic text-xs font-bold text-[#000000] leading-relaxed border-l-2 border-[#D97B0C] pl-3 py-0.5">
              &ldquo;{slide.hook}&rdquo;
            </p>
            <p className="font-inter text-[10px] font-semibold text-[#000000] leading-normal">{slide.subHook}</p>
          </div>
        )}

        {/* STORY SLIDES */}
        {slide.type === "STORY" && (
          <div className="space-y-2">
            <h2 className="font-playfair text-base font-black uppercase leading-tight text-[#000000]">
              {slide.title}
            </h2>
            <p className="font-inter text-[11px] font-semibold leading-relaxed text-[#000000] text-left whitespace-pre-wrap">
              {slide.content}
            </p>
          </div>
        )}

        {/* QUOTE SLIDES */}
        {slide.type === "QUOTE" && (
          <div className="space-y-3 text-center px-1">
            <Quote size={24} className="mx-auto text-[#D97B0C] opacity-60" />
            <h3 className="font-inter text-[8px] font-black uppercase tracking-[0.25em] text-[#D97B0C]">{slide.title}</h3>
            <p className="font-playfair italic text-sm font-bold leading-relaxed text-[#000000]">
              &ldquo;{slide.quote}&rdquo;
            </p>
          </div>
        )}

        {/* IDENTITY SLIDE */}
        {slide.type === "IDENTITY" && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Heart size={12} className="text-[#D97B0C]" />
              <span className="font-inter text-[8px] font-black uppercase tracking-widest text-[#D97B0C]">Identity Profile</span>
            </div>
            <h2 className="font-playfair text-xl font-black uppercase tracking-tight text-[#000000]">
              {slide.title}
            </h2>
            <div className="h-0.5 w-10 bg-[#D97B0C]"></div>
            <p className="font-inter text-[11px] font-semibold leading-relaxed text-[#000000] text-left whitespace-pre-wrap">
              {slide.content}
            </p>
          </div>
        )}

        {/* OUTRO SLIDE */}
        {slide.type === "OUTRO" && (
          <div className="text-center space-y-3 px-1">
            <div className="w-8 h-8 bg-black text-white rounded-full mx-auto flex items-center justify-center shadow-md">
              <Heart size={14} className="text-[#D97B0C]" />
            </div>
            <h1 className="font-playfair text-lg font-black uppercase tracking-tight text-[#000000]">
              {slide.title}
            </h1>
            <p className="font-playfair italic text-xs font-bold text-[#000000] leading-relaxed">
              &ldquo;{slide.quote}&rdquo;
            </p>
            <p className="font-inter text-[8px] font-black uppercase tracking-[0.2em] text-[#D97B0C]">
              {slide.sub}
            </p>
          </div>
        )}

      </main>

      {/* FOOTER: AMBER ORANGE SWIPE ARROW */}
      <footer className="flex justify-end items-center shrink-0 pt-1 border-t border-black/5">
        {!isLast ? (
          <div className="flex items-center gap-1 text-[#D97B0C]">
            <span className="font-inter text-[9px] font-black uppercase tracking-widest">
              Swipe
            </span>
            <ArrowRight size={12} className="stroke-[3]" />
          </div>
        ) : (
          <span className="font-inter text-[8px] font-black text-stone-400 uppercase tracking-widest">
            End of Journey
          </span>
        )}
      </footer>

    </div>
  );
}
