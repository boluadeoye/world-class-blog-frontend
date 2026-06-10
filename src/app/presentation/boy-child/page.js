"use client";
import { useState, useEffect } from "react";
import { 
  Download, Presentation, User, Quote, 
  TrendingUp, AlertCircle, Heart, Users, 
  Lightbulb, CheckCircle2, XCircle, Sprout, 
  BookOpen, HelpCircle
} from "lucide-react";

export default function BoyChildPresentation() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsReady(true), 1500);
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = "Presentation_The_Boy_Child_Crisis";
    window.print();
    document.title = originalTitle;
  };

  const slides = [
    {
      type: "TITLE",
      title: "THE BOY CHILD AND THE CRISIS OF IDENTITY",
      subtitle: "BETWEEN EXPECTATIONS AND REALITY",
      presenter: "Mayowa Olaoluwa"
    },
    {
      type: "HOOK",
      title: "The Overlooked Crisis",
      content: "The crisis of identity among boys is not simply about confusion; it is a struggle between natural identity and societal performance.",
      icon: <AlertCircle size={80} className="text-amber-500" />
    },
    {
      type: "METAPHOR",
      title: "The Seed Analogy",
      content: "Leaving a boy to fend for himself is like planting a seed and expecting a tree without water, sunlight, or care.",
      visual: "SEED"
    },
    {
      type: "GRID",
      title: "The 5 Core Questions",
      items: [
        { q: "What does it mean to be a man?", icon: <HelpCircle /> },
        { q: "What are my responsibilities?", icon: <CheckCircle2 /> },
        { q: "How do I handle emotions?", icon: <Heart /> },
        { q: "What kind of future do I want?", icon: <TrendingUp /> },
        { q: "What values guide my life?", icon: <BookOpen /> }
      ]
    },
    {
      type: "COMPARISON",
      title: "Expectations vs. Cultural Scripts",
      left: { title: "Healthy Expectations", items: ["Responsibility", "Dependability", "Self-Care", "Accountability"] },
      right: { title: "Unwritten Scripts", items: ["Men don't cry", "Solve problems alone", "Asking for help is weakness", "Value = Money"] }
    },
    {
      type: "IMPACT",
      title: "The Performance of Manhood",
      content: "The crisis is born when a boy starts PERFORMING manhood rather than UNDERSTANDING himself.",
      highlight: "Performance vs. Authenticity"
    },
    {
      type: "STATS",
      title: "The Global Cost",
      stats: [
        { label: "Education", value: "Millions", sub: "Boys out of school (UNESCO)" },
        { label: "Mental Health", value: "Higher Rates", sub: "Male suicide vs Female (WHO)" }
      ]
    },
    {
      type: "LIST",
      title: "Factors of the Crisis",
      items: ["Absence of Mentorship", "Emotional Neglect", "Social Media Influence", "Economic Pressure", "Lack of Safe Spaces"]
    },
    {
      type: "REDEFINE",
      title: "Re-Defining Masculinity",
      content: "A strong man is not one who never cries; a strong man is one who can face reality honestly.",
      icon: <Lightbulb size={60} className="text-amber-400" />
    },
    {
      type: "SOLUTIONS",
      title: "The Path Forward",
      items: ["Intentional Parenting", "Mentorship Programmes", "Mental Health Awareness", "Positive Models", "Educational Support"]
    },
    {
      type: "CONCLUSION",
      title: "The Architect's Conclusion",
      content: "The challenge is not to reject manhood, but to redefine it thoughtfully—to keep what builds character and discard what destroys authenticity."
    },
    {
      type: "QUOTE",
      title: "Closing Statement",
      content: "The greatest challenge facing many boys today is not becoming a man; it is discovering what being a man truly means beyond the voices of culture.",
      presenter: "Mayowa Olaoluwa"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 font-sans text-zinc-100 selection:bg-amber-500/30">
      
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;700;900&display=swap" rel="stylesheet" />

      <style jsx global>{`
        @media print {
          @page { size: 16in 9in; margin: 0; }
          body { background: #09090b !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          body * { visibility: hidden; }
          #deck-render, #deck-render * { visibility: visible; }
          #deck-render { position: absolute; left: 0; top: 0; width: 100%; }
          .slide { 
            height: 9in; width: 16in; 
            page-break-after: always; 
            position: relative; 
            overflow: hidden;
            background: #09090b;
            display: flex;
            flex-direction: column;
            padding: 1in;
          }
          .no-print { display: none !important; }
        }
        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* PORTAL */}
      <div className="no-print flex flex-col items-center justify-center min-h-screen p-6">
        <div className="relative z-10 w-full max-w-md bg-zinc-900 border border-zinc-800 p-10 text-center rounded-3xl shadow-2xl">
          <Presentation size={48} className="text-amber-500 mx-auto mb-6" />
          <h1 className="font-playfair text-2xl font-black text-white mb-2 uppercase">Cinematic Deck Engine</h1>
          <p className="font-inter text-zinc-500 text-xs tracking-widest uppercase mb-8">The Boy Child Crisis</p>
          {!isReady ? (
            <div className="text-amber-500 font-mono text-xs animate-pulse uppercase">Generating Slides...</div>
          ) : (
            <button onClick={handlePrint} className="w-full bg-white text-black font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-amber-500 hover:text-white transition-all">
              Download Presentation (PDF)
            </button>
          )}
        </div>
      </div>

      {/* SLIDE DECK */}
      <div id="deck-render" className="hidden print:block">
        {slides.map((slide, i) => (
          <div key={i} className="slide">
            
            {/* DECORATIVE BACKGROUND ELEMENTS */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-amber-500/5 to-transparent pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 font-inter text-[10px] font-bold text-zinc-700 uppercase tracking-[0.5em]">
              {slide.presenter || "Mayowa Olaoluwa"} // Slide {i + 1}
            </div>

            {/* SLIDE CONTENT TYPES */}
            <main className="relative z-10 h-full flex flex-col justify-center">
              
              {slide.type === "TITLE" && (
                <div className="text-center">
                  <div className="h-1 w-24 bg-amber-500 mx-auto mb-12"></div>
                  <h1 className="font-playfair text-7xl font-black text-white leading-tight mb-6 uppercase tracking-tighter">
                    {slide.title}
                  </h1>
                  <p className="font-inter text-2xl font-light text-amber-500 tracking-[0.3em] uppercase">
                    {slide.subtitle}
                  </p>
                  <p className="mt-20 font-inter text-lg font-bold text-zinc-500 uppercase tracking-widest">
                    Presented by {slide.presenter}
                  </p>
                </div>
              )}

              {slide.type === "HOOK" && (
                <div className="flex items-center gap-20">
                  <div className="shrink-0">{slide.icon}</div>
                  <div>
                    <h2 className="font-playfair text-5xl font-black text-white mb-8 uppercase">{slide.title}</h2>
                    <p className="font-inter text-4xl leading-relaxed text-zinc-300 font-light italic">
                      "{slide.content}"
                    </p>
                  </div>
                </div>
              )}

              {slide.type === "METAPHOR" && (
                <div className="grid grid-cols-2 gap-20 items-center">
                  <div>
                    <h2 className="font-playfair text-5xl font-black text-white mb-8 uppercase">{slide.title}</h2>
                    <p className="font-inter text-3xl leading-relaxed text-zinc-400">
                      {slide.content}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <div className="relative w-64 h-64 flex items-end justify-center">
                      <div className="absolute bottom-0 w-full h-4 bg-zinc-800 rounded-full"></div>
                      <Sprout size={180} className="text-amber-500 mb-4 animate-pulse" />
                    </div>
                  </div>
                </div>
              )}

              {slide.type === "GRID" && (
                <div>
                  <h2 className="font-playfair text-5xl font-black text-white mb-16 uppercase text-center">{slide.title}</h2>
                  <div className="grid grid-cols-5 gap-8">
                    {slide.items.map((item, idx) => (
                      <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl text-center flex flex-col items-center">
                        <div className="text-amber-500 mb-6">{item.icon}</div>
                        <p className="font-inter text-sm font-bold text-zinc-300 uppercase tracking-wide">{item.q}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === "COMPARISON" && (
                <div>
                  <h2 className="font-playfair text-5xl font-black text-white mb-16 uppercase">{slide.title}</h2>
                  <div className="grid grid-cols-2 gap-12">
                    <div className="bg-zinc-900/50 p-10 rounded-3xl border-l-8 border-emerald-500">
                      <h3 className="font-inter text-xl font-black text-emerald-500 uppercase mb-8 tracking-widest">{slide.left.title}</h3>
                      <ul className="space-y-4">
                        {slide.left.items.map((item, idx) => (
                          <li key={idx} className="flex gap-4 items-center text-2xl font-bold text-zinc-300">
                            <CheckCircle2 className="text-emerald-500" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-zinc-900/50 p-10 rounded-3xl border-l-8 border-red-500">
                      <h3 className="font-inter text-xl font-black text-red-500 uppercase mb-8 tracking-widest">{slide.right.title}</h3>
                      <ul className="space-y-4">
                        {slide.right.items.map((item, idx) => (
                          <li key={idx} className="flex gap-4 items-center text-2xl font-bold text-zinc-500">
                            <XCircle className="text-red-500" /> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {slide.type === "STATS" && (
                <div className="text-center">
                  <h2 className="font-playfair text-5xl font-black text-white mb-20 uppercase">{slide.title}</h2>
                  <div className="flex justify-around">
                    {slide.stats.map((stat, idx) => (
                      <div key={idx} className="flex flex-col items-center">
                        <p className="font-inter text-8xl font-black text-amber-500 mb-4 tracking-tighter">{stat.value}</p>
                        <p className="font-inter text-xl font-bold text-white uppercase tracking-widest">{stat.label}</p>
                        <p className="font-inter text-sm text-zinc-500 mt-2">{stat.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {slide.type === "QUOTE" && (
                <div className="max-w-5xl mx-auto text-center">
                  <Quote size={60} className="text-amber-500 mx-auto mb-12 opacity-50" />
                  <p className="font-playfair text-5xl font-black text-white leading-tight mb-12 italic">
                    "{slide.content}"
                  </p>
                  <div className="h-px w-32 bg-zinc-800 mx-auto mb-8"></div>
                  <p className="font-inter text-xl font-bold text-amber-500 uppercase tracking-[0.4em]">
                    {slide.presenter}
                  </p>
                </div>
              )}

              {/* DEFAULT LIST/TEXT LAYOUT */}
              {(slide.type === "LIST" || slide.type === "SOLUTIONS" || slide.type === "CONCLUSION" || slide.type === "REDEFINE") && (
                <div className="max-w-4xl">
                  <h2 className="font-playfair text-6xl font-black text-white mb-12 uppercase leading-none">
                    {slide.title}
                  </h2>
                  {slide.content && (
                    <p className="font-inter text-3xl text-zinc-300 leading-relaxed mb-12">
                      {slide.content}
                    </p>
                  )}
                  {slide.items && (
                    <div className="grid grid-cols-1 gap-6">
                      {slide.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-6">
                          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                          <p className="font-inter text-3xl font-bold text-zinc-200">{item}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </main>
          </div>
        ))}
      </div>
    </div>
  );
}
