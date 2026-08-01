"use client";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, ChevronLeft, ChevronRight, ArrowRight, Quote, Heart, Sparkles } from "lucide-react";

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
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        /* THE DIAMOND DUST GLITTER BACKGROUND */
        .glitter-bg {
          background: linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%);
          position: relative;
        }
        .glitter-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
          opacity: 0.5;
          pointer-events: none;
        }
        
        /* THE GLASSMORPHIC CARD */
        .glass-card {
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05), inset 0 0 0 1px rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* STUDIO PORTAL (Screen View) */}
      <div className="min-h-screen flex flex-col justify-between p-4 md:p-6 max-w-xl mx-auto">
        <header className="flex justify-between items-center bg-slate-900 p-4 border border-slate-800 rounded-xl mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-amber-500 rounded-lg flex items-center justify-center text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-white font-bold text-xs uppercase tracking-widest font-inter">Glass Studio</h1>
              <p className="text-slate-500 text-[9px] font-mono uppercase">4K Glitter Engine</p>
            </div>
          </div>
          <button 
            onClick={downloadPng} 
            disabled={isCapturing}
            className="bg-white text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all flex items-center gap-2 shadow-lg"
          >
            {isCapturing ? "Saving..." : <><Download size={14} /> Save Slide</>}
          </button>
        </header>

        {/* RESPONSIVE SQUARE CANVAS */}
        <main className="grow flex items-center justify-center py-2">
          <div 
            ref={slideRef}
            className="w-full aspect-square max-w-[380px] glitter-bg shadow-2xl rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden"
          >
            <SlideRenderer slide={slides[currentSlide]} index={currentSlide} />
          </div>
        </main>

        {/* CONTROLS */}
        <footer className="flex justify-center gap-6 p-4">
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

// SLIDE RENDERER (GLASSMORPHIC & PURE BLACK)
function SlideRenderer({ slide, index }) {
  return (
    <div className="glass-card w-full h-full rounded-xl p-6 flex flex-col justify-center text-[#000000] relative z-10">
      
      {/* 1. COVER SLIDE */}
      {slide.type === "COVER" && (
        <div className="h-full flex flex-col justify-between py-2">
          <div className="flex justify-between items-center">
            <span className="font-mono text-[10px] font-black text-amber-600 uppercase tracking-[0.25em]">{slide.badge}</span>
          </div>

          <div className="my-auto space-y-4">
            <h1 className="font-inter text-3xl font-black uppercase tracking-tighter leading-none text-[#000000]">
              {slide.title}
            </h1>
            <div className="h-1 w-16 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
            <p className="font-playfair italic text-base text-[#000000] leading-relaxed font-bold">
              &ldquo;{slide.quote}&rdquo;
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <p className="font-inter text-xs text-[#000000] font-bold leading-relaxed">{slide.subText}</p>
            <div className="flex items-center gap-2 text-amber-600 font-inter font-black text-[11px] uppercase tracking-widest">
              <span>Swipe</span>
              <ArrowRight size={14} className="animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* 2. STORY SLIDES */}
      {slide.type === "STORY" && (
        <div className="space-y-4 my-auto">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-black uppercase tracking-widest text-amber-600">0{index + 1}</span>
            <div className="h-0.5 grow bg-amber-500/30"></div>
          </div>
          <h2 className="font-playfair text-2xl font-black uppercase leading-tight text-[#000000]">
            {slide.title}
          </h2>
          <p className="font-inter text-sm font-bold leading-relaxed text-[#000000] text-justify whitespace-pre-wrap">
            {slide.content}
          </p>
        </div>
      )}

      {/* 3. QUOTE SLIDES */}
      {slide.type === "QUOTE" && (
        <div className="space-y-6 text-center my-auto px-2">
          <Quote size={32} className="mx-auto text-amber-500 opacity-50" />
          <h3 className="font-inter text-[10px] font-black uppercase tracking-[0.25em] text-amber-600">{slide.title}</h3>
          <p className="font-playfair italic text-xl font-black leading-relaxed text-[#000000]">
            &ldquo;{slide.quote}&rdquo;
          </p>
          <div className="h-1 w-12 bg-amber-500 mx-auto shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
        </div>
      )}

      {/* 4. IDENTITY SLIDE */}
      {slide.type === "IDENTITY" && (
        <div className="space-y-4 my-auto">
          <div className="flex items-center gap-2">
            <Heart size={16} className="text-amber-600" />
            <span className="font-inter text-[10px] font-black uppercase tracking-widest text-amber-600">Identity Profile</span>
          </div>
          <h2 className="font-playfair text-3xl font-black uppercase tracking-tight text-[#000000]">
            {slide.title}
          </h2>
          <div className="h-1 w-16 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"></div>
          <p className="font-inter text-sm font-bold leading-relaxed text-[#000000] whitespace-pre-wrap">
            {slide.content}
          </p>
        </div>
      )}

      {/* 5. OUTRO SLIDE */}
      {slide.type === "OUTRO" && (
        <div className="text-center space-y-6 my-auto px-2">
          <div className="w-12 h-12 bg-amber-500 rounded-full mx-auto flex items-center justify-center text-white shadow-[0_0_20px_rgba(245,158,11,0.6)]">
            <Heart size={20} className="text-white" />
          </div>
          <h1 className="font-playfair text-3xl font-black uppercase tracking-tight text-[#000000]">
            {slide.title}
          </h1>
          <p className="font-playfair italic text-base font-bold text-[#000000] leading-relaxed">
            &ldquo;{slide.quote}&rdquo;
          </p>
          <p className="font-inter text-[10px] font-black uppercase tracking-[0.25em] text-amber-600">
            {slide.sub}
          </p>
        </div>
      )}

    </div>
  );
}
