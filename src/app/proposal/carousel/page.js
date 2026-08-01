"use client";
import { useState, useEffect, useRef } from "react";
import { toPng } from "html-to-image";
import { Download, ChevronLeft, ChevronRight, ArrowRight, Quote, Heart, Camera } from "lucide-react";

export default function InstagramCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const slideRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1200);
  }, []);

  // 4K PNG CAPTURE ENGINE
  const downloadPng = async () => {
    if (slideRef.current === null) return;
    setIsCapturing(true);
    try {
      const dataUrl = await toPng(slideRef.current, {
        pixelRatio: 4, // 4K Resolution
        quality: 1,
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
      titleTop: "FROM BURDEN",
      titleMain: "TO ASSIGNMENT",
      subtitle: "My Bullets Journey",
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
    <div className="min-h-screen bg-stone-950 font-sans text-slate-800 selection:bg-amber-100 overflow-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@300;400;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        .paper-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
        .safe-zone { padding: 100px; }
      `}</style>

      {/* STUDIO PORTAL (Screen View) */}
      <div className="h-screen flex flex-col justify-between p-6 relative z-10">
        <header className="flex justify-between items-center bg-white/5 backdrop-blur-md p-4 border border-white/10 rounded-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D97B0C] rounded-xl flex items-center justify-center text-white shadow-lg">
              <Camera size={20} />
            </div>
            <div>
              <h1 className="text-white font-bold text-sm uppercase tracking-widest font-inter">Trajectory Studio</h1>
              <p className="text-stone-500 text-[10px] font-mono uppercase">4K PNG Capture Ready</p>
            </div>
          </div>
          <button 
            onClick={downloadPng} 
            disabled={isCapturing}
            className="bg-white text-black px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#D97B0C] hover:text-white transition-all flex items-center gap-2 shadow-xl"
          >
            {isCapturing ? "Rendering 4K..." : <><Download size={14} /> Save Slide</>}
          </button>
        </header>

        {/* 1:1 SQUARE CANVAS */}
        <main className="grow flex items-center justify-center p-4">
          <div 
            ref={slideRef}
            className="aspect-square w-full max-w-[500px] bg-[#FAF8F5] shadow-[0_30px_90px_-20px_rgba(0,0,0,0.6)] relative overflow-hidden paper-grain"
            style={{ width: '1080px', height: '1080px', position: 'relative' }}
          >
            <div className="absolute inset-0 safe-zone flex flex-col justify-between">
              <SlideRenderer slide={slides[currentSlide]} index={currentSlide} />
              
              {/* EDITORIAL FOOTER */}
              <footer className="flex justify-between items-end border-t border-stone-200/80 pt-6">
                <div className="space-y-1">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.4em] text-[#D97B0C]">Slide {currentSlide + 1} // 12</p>
                  <p className="font-playfair italic text-xs text-stone-400">The Bullets Journey</p>
                </div>
                <div className="w-10 h-10 border border-stone-200 rounded-sm flex items-center justify-center">
                  <span className="font-inter font-black text-[10px] text-stone-400">OM</span>
                </div>
              </footer>
            </div>
          </div>
        </main>

        {/* CONTROLS */}
        <footer className="flex justify-center gap-8 p-2">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-[#D97B0C] disabled:opacity-20 transition-all">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-[#D97B0C] disabled:opacity-20 transition-all">
            <ChevronRight size={24} />
          </button>
        </footer>
      </div>
    </div>
  );
}

// SLIDE COMPOSITION RENDERER
function SlideRenderer({ slide, index }) {
  return (
    <div className="grow flex flex-col justify-center text-[#1E293B]">
      
      {/* 1. THE TRAJECTORY COVER */}
      {slide.type === "COVER" && (
        <div className="h-full flex flex-col justify-between relative">
          
          {/* Top Bar: Monogram */}
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs font-bold text-[#D97B0C] uppercase tracking-[0.3em]">{slide.subtitle}</span>
            <div className="w-8 h-8 border border-stone-300 flex items-center justify-center font-inter font-black text-xs">OM</div>
          </div>

          {/* Center: The Trajectory Line & Titles */}
          <div className="flex gap-10 items-center my-auto">
            {/* The Trajectory Symbol */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-4 h-4 rounded-full border-2 border-[#D97B0C] bg-amber-100"></div>
              <div className="w-[1.5px] h-36 bg-stone-300"></div>
              <div className="w-4 h-4 bg-[#D97B0C] rotate-45"></div>
            </div>

            {/* Typography */}
            <div className="space-y-2">
              <p className="font-playfair italic text-2xl text-stone-500">{slide.titleTop}</p>
              <h1 className="font-inter text-6xl font-black uppercase tracking-tighter leading-none text-[#1E293B]">
                {slide.titleMain}
              </h1>
            </div>
          </div>

          {/* Bottom: Hook & Swipe */}
          <div className="space-y-6">
            <p className="font-playfair text-xl leading-relaxed text-stone-600 border-l-2 border-[#D97B0C] pl-6 italic">
              &ldquo;{slide.hook}&rdquo;
            </p>
            <div className="flex items-center justify-between pt-4">
              <p className="font-inter text-xs text-stone-400 max-w-sm leading-relaxed">{slide.subHook}</p>
              <div className="flex items-center gap-2 text-[#D97B0C] font-inter font-black text-xs uppercase tracking-widest">
                <span>Swipe</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </div>

        </div>
      )}

      {/* 2. STORY SLIDES */}
      {slide.type === "STORY" && (
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-bold uppercase tracking-[0.4em] text-[#D97B0C]">0{index + 1}</span>
            <div className="h-px grow bg-stone-200"></div>
          </div>
          <h2 className="font-playfair text-4xl font-black uppercase leading-tight text-[#1E293B]">
            {slide.title}
          </h2>
          <p className="font-inter text-xl leading-[1.9] text-stone-600 text-justify whitespace-pre-wrap">
            {slide.content}
          </p>
        </div>
      )}

      {/* 3. QUOTE SLIDES */}
      {slide.type === "QUOTE" && (
        <div className="space-y-10 text-center max-w-lg mx-auto">
          <Quote size={48} className="mx-auto text-[#D97B0C] opacity-30" />
          <h3 className="font-inter text-xs font-black uppercase tracking-[0.4em] text-[#D97B0C]">{slide.title}</h3>
          <p className="font-playfair italic text-3xl leading-relaxed text-[#1E293B]">
            &ldquo;{slide.quote}&rdquo;
          </p>
          <div className="h-0.5 w-12 bg-[#D97B0C] mx-auto"></div>
        </div>
      )}

      {/* 4. TYPOGRAPHIC IDENTITY SLIDE */}
      {slide.type === "IDENTITY" && (
        <div className="space-y-8">
          <div className="space-y-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.4em] text-[#D97B0C]">Identity Profile</p>
            <h2 className="font-playfair text-6xl font-black uppercase tracking-tighter text-[#1E293B]">
              {slide.title}
            </h2>
          </div>
          <div className="h-1 w-20 bg-[#D97B0C]"></div>
          <p className="font-inter text-xl leading-[1.9] text-stone-600 whitespace-pre-wrap">
            {slide.content}
          </p>
          <div className="pt-4 border-t border-stone-200">
            <p className="font-mono text-xs font-bold uppercase tracking-widest text-stone-400">Olaoluwa Mayowa // BigMummy</p>
          </div>
        </div>
      )}

      {/* 5. OUTRO SLIDE */}
      {slide.type === "OUTRO" && (
        <div className="text-center space-y-10 max-w-md mx-auto">
          <div className="w-16 h-16 bg-stone-900 rounded-full mx-auto flex items-center justify-center text-white">
            <Heart size={24} className="text-[#D97B0C]" />
          </div>
          <h1 className="font-playfair text-5xl font-black uppercase tracking-tight text-[#1E293B]">
            {slide.title}
          </h1>
          <p className="font-playfair italic text-xl text-stone-600 leading-relaxed">
            &ldquo;{slide.quote}&rdquo;
          </p>
          <p className="font-inter text-xs font-bold uppercase tracking-[0.3em] text-[#D97B0C]">
            {slide.sub}
          </p>
        </div>
      )}

    </div>
  );
}
