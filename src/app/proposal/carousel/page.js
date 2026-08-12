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
        pixelRatio: 4, // 4K Resolution Output
        cacheBust: true,
      });
      const link = document.createElement('a');
      link.download = `OluwaMayowa_Culture_Slide_${currentSlide + 1}.png`;
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
      author: "OluwaMayowa",
      titleMain: "CULTURE",
      subtitle: "NATURE'S OLDEST BLUEPRINT",
      hook: "As we were taught early on in our lives, culture is defined as the total way of life of a group of people.",
      subHook: "An insightful look into how definitions shape human existence."
    },
    {
      type: "STORY",
      title: "The System of Expectations",
      content: "Culture itself establishes a system that grooms you into who it wants you to be.\n\nIt has shaped expectations so deeply that many of them no longer serve humans, but only pressure them."
    },
    {
      type: "STORY",
      title: "The Subconscious Blueprint",
      content: "Culture has formed how a man should appear in our subconscious:\n\n• The baritone voice\n• The broad chest\n• Tall with bulging muscles\n• Blessed with physical strength"
    },
    {
      type: "STORY",
      title: "The Genetic Trick",
      content: "What if a man lacks all this?\n\nWhat if genetics decides to play a trick on him and he comes out short?\n\nWhat if he has a tiny voice, and what he lacks in brawn he makes up for in brains?"
    },
    {
      type: "STORY",
      title: "Judged on Paper",
      content: "If a man doesn't fit the expectations laid down for him, he is judged—not for who he is, but rather for what he lacks on paper."
    },
    {
      type: "STORY",
      title: "The Silent Damage",
      content: "Culture teaches men a script that often conflicts with who they really are.\n\nThe silent damage is the gap between the man they are expected to be and the man they really are.\n\nThis gap breeds self-denial, shame, and buried potential."
    },
    {
      type: "QUOTE",
      title: "The Broken Script",
      quote: "What if the script itself is broken? What if the measure of strength it demands doesn't actually define manhood at all?"
    },
    {
      type: "STORY",
      title: "Defining Manhood Narrowly",
      content: "So when a man says 'I can't do it'...\n\nIt shouldn't be a question of 'What's wrong with him?'\n\nInstead, it should be 'Why did we have to define manhood so narrowly?'"
    },
    {
      type: "STORY",
      title: "Diversity of Strength",
      content: "A man is not less because he is different; he is only different in how his strength shows up."
    },
    {
      type: "STORY",
      title: "The Ventriloquist's Puppets",
      content: "Men have been made puppets by making them blindly follow the leading of their ventriloquist—which happens to be culture.\n\nBecoming human again is not just a return; it's a discovery—an insight into the fullness of your person."
    },
    {
      type: "STORY",
      title: "Claiming Your Purpose",
      content: "A recognition that your worth, your strength, and your purpose were never limited to the grasp of culture's damaged and age-long script...\n\nRather, they were waiting to be claimed, discovered, and pursued."
    },
    {
      type: "QUOTE",
      title: "To Be a Man Is To...",
      quote: "Embrace the full spectrum of yourself, to honor your mind, heart, and creativity. To carry kindness, patience, courage, and wisdom, to lift others up in ways only you can. To accept your differences, and see them as strength."
    },
    {
      type: "STORY",
      title: "A Message for the Men Out There",
      content: "You weren't created to be conformed to a script.\n\nYou weren't made to act in line with obsolete practices and definitions.\n\nYou are not weak for being different."
    },
    {
      type: "IDENTITY",
      title: "Claim Your Terms",
      content: "Strength isn't just muscle power or a deep voice—instead, it's patience, wisdom, and courage.\n\nLift ideas, lift hearts.\nClaim your manhood on your own terms.\nBe fully, unapologetically YOU."
    },
    {
      type: "OUTRO",
      title: "Cheers to a Better Society",
      quote: "Cheers to a better society where men are groomed and taught as they ought to be.",
      sub: "OluwaMayowa // BigMummy"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 font-sans text-slate-900 selection:bg-amber-200 overflow-x-hidden">
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,400;1,700&family=Inter:wght@400;600;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <style jsx global>{`
        /* ALABASTER MATTE SILK-PRESS BACKGROUND */
        .alabaster-bg {
          background-color: #F8F8F8;
          background-image: radial-gradient(circle at 0% 0%, #ffffff 0%, #f1f1f1 100%);
          position: relative;
        }
        .alabaster-bg::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(rgba(0,0,0,0.04) 1px, transparent 1px);
          background-size: 14px 14px;
          opacity: 0.6;
          pointer-events: none;
        }
        
        /* ALABASTER ARCHIVE CARD */
        .alabaster-card {
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.03);
        }
      `}</style>

      {/* STUDIO PORTAL (Screen View) */}
      <div className="min-h-screen flex flex-col justify-between p-4 md:p-6 max-w-xl mx-auto">
        <header className="flex justify-between items-center bg-slate-900 p-4 border border-slate-800 rounded-xl mb-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#B45309] rounded-lg flex items-center justify-center text-white shadow-md">
              <Sparkles size={18} />
            </div>
            <div>
              <h1 className="text-white font-bold text-xs uppercase tracking-widest font-inter">Alabaster Archive</h1>
              <p className="text-slate-500 text-[9px] font-mono uppercase">15-Slide 4K Engine</p>
            </div>
          </div>
          <button 
            onClick={downloadPng} 
            disabled={isCapturing}
            className="bg-white text-black px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#B45309] hover:text-white transition-all shadow-lg"
          >
            {isCapturing ? "Saving..." : <><Download size={14} /> Save Slide</>}
          </button>
        </header>

        {/* 1:1 SQUARE CANVAS */}
        <main className="grow flex items-center justify-center py-1">
          <div 
            ref={slideRef}
            className="w-full aspect-square max-w-[380px] alabaster-bg shadow-2xl rounded-xl p-5 flex flex-col justify-between relative overflow-hidden"
          >
            <SlideRenderer slide={slides[currentSlide]} index={currentSlide} total={slides.length} />
          </div>
        </main>

        {/* CONTROLS */}
        <footer className="flex justify-center gap-6 p-3">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="p-3 bg-slate-900 border border-slate-800 rounded-full text-white hover:text-[#B45309] disabled:opacity-20 transition-all">
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} disabled={currentSlide === slides.length - 1} className="p-3 bg-slate-900 border border-slate-800 rounded-full text-white hover:text-[#B45309] disabled:opacity-20 transition-all">
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
    <div className="alabaster-card w-full h-full rounded-lg p-5 flex flex-col justify-between text-[#000000] relative z-10 box-border">
      
      {/* TOP HEADER BAR */}
      <header className="flex justify-between items-start shrink-0 mb-1">
        {slide.type === "COVER" ? (
          <span className="font-playfair italic text-xs font-bold tracking-wider text-[#000000]">{slide.author}</span>
        ) : (
          <span className="font-inter text-[8px] font-black uppercase tracking-[0.2em] text-[#B45309]">
            Culture // The Blueprint
          </span>
        )}
        <div className="w-7 h-7 border border-[#000000] flex items-center justify-center font-inter font-black text-[9px] text-[#000000] bg-white shrink-0">
          OM
        </div>
      </header>

      {/* CENTER CONTENT CONTAINER */}
      <main className="my-auto space-y-3 overflow-hidden py-1">
        
        {/* COVER SLIDE */}
        {slide.type === "COVER" && (
          <div className="space-y-3">
            <p className="font-inter text-[8px] font-black uppercase tracking-[0.25em] text-[#B45309]">{slide.subtitle}</p>
            
            <div className="flex gap-3 items-center">
              <div className="flex flex-col items-center gap-0.5 shrink-0">
                <div className="w-2 h-2 rounded-full border border-[#B45309] bg-amber-100"></div>
                <div className="w-px h-8 bg-black/30"></div>
                <div className="w-2 h-2 bg-black rotate-45"></div>
              </div>
              <div>
                <h1 className="font-playfair text-3xl font-black uppercase tracking-tight text-[#000000] leading-none">
                  {slide.titleMain}
                </h1>
              </div>
            </div>

            <p className="font-playfair italic text-xs font-bold text-[#000000] leading-relaxed border-l-2 border-[#B45309] pl-3 py-0.5">
              &ldquo;{slide.hook}&rdquo;
            </p>
            <p className="font-inter text-[9px] font-semibold text-[#000000] leading-tight">{slide.subHook}</p>
          </div>
        )}

        {/* STORY SLIDES */}
        {slide.type === "STORY" && (
          <div className="space-y-2">
            <h2 className="font-playfair text-base font-black uppercase leading-tight text-[#000000]">
              {slide.title}
            </h2>
            <p className="font-inter text-xs font-semibold leading-relaxed text-[#000000] text-left whitespace-pre-wrap">
              {slide.content}
            </p>
          </div>
        )}

        {/* QUOTE SLIDES */}
        {slide.type === "QUOTE" && (
          <div className="space-y-3 text-center px-1">
            <Quote size={24} className="mx-auto text-[#B45309] opacity-60" />
            <h3 className="font-inter text-[8px] font-black uppercase tracking-[0.25em] text-[#B45309]">{slide.title}</h3>
            <p className="font-playfair italic text-sm font-bold leading-relaxed text-[#000000]">
              &ldquo;{slide.quote}&rdquo;
            </p>
          </div>
        )}

        {/* IDENTITY SLIDE */}
        {slide.type === "IDENTITY" && (
          <div className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Heart size={12} className="text-[#B45309]" />
              <span className="font-inter text-[8px] font-black uppercase tracking-widest text-[#B45309]">Identity Profile</span>
            </div>
            <h2 className="font-playfair text-lg font-black uppercase tracking-tight text-[#000000]">
              {slide.title}
            </h2>
            <div className="h-0.5 w-10 bg-[#B45309]"></div>
            <p className="font-inter text-xs font-semibold leading-relaxed text-[#000000] text-left whitespace-pre-wrap">
              {slide.content}
            </p>
          </div>
        )}

        {/* OUTRO SLIDE */}
        {slide.type === "OUTRO" && (
          <div className="text-center space-y-3 px-1">
            <div className="w-8 h-8 bg-black text-white rounded-full mx-auto flex items-center justify-center shadow-md">
              <Heart size={14} className="text-[#B45309]" />
            </div>
            <h1 className="font-playfair text-lg font-black uppercase tracking-tight text-[#000000]">
              {slide.title}
            </h1>
            <p className="font-playfair italic text-xs font-bold text-[#000000] leading-relaxed">
              &ldquo;{slide.quote}&rdquo;
            </p>
            <p className="font-inter text-[8px] font-black uppercase tracking-[0.2em] text-[#B45309]">
              {slide.sub}
            </p>
          </div>
        )}

      </main>

      {/* FOOTER: BURNT AMBER SWIPE ARROW */}
      <footer className="flex justify-end items-center shrink-0 pt-1 border-t border-black/5">
        {!isLast ? (
          <div className="flex items-center gap-1 text-[#B45309]">
            <span className="font-inter text-[8px] font-black uppercase tracking-widest">
              Swipe
            </span>
            <ArrowRight size={10} className="stroke-[3]" />
          </div>
        ) : (
          <span className="font-inter text-[7px] font-black text-stone-400 uppercase tracking-widest">
            End of Blueprint
          </span>
        )}
      </footer>

    </div>
  );
}
