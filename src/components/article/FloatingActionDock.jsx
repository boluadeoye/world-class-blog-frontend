"use client";
import { useState, useEffect } from 'react';
import { Share2, Bookmark, ArrowUp, Check, Link as LinkIcon } from 'lucide-react';

export default function FloatingActionDock() {
  const [isSaved, setIsSaved] = useState(false);
  const [shareState, setShareState] = useState("idle"); // idle, copied, sharing
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("saved_posts");
    if (saved) setIsSaved(saved.includes(window.location.pathname));
    
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    const url = window.location.href;
    const title = document.title;

    // 1. Try Native Share (Mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return; // Success, exit
      } catch (err) {
        // User cancelled or failed, fall through to copy
        console.log("Native share cancelled");
      }
    }

    // 2. Fallback: Copy to Clipboard (Desktop/Unsupported)
    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2500);
    } catch (err) {
      console.error("Copy failed", err);
      // Final fallback: prompt user
      prompt("Copy this link:", url);
    }
  };

  const handleSave = () => {
    const newState = !isSaved;
    setIsSaved(newState);
    if (newState) localStorage.setItem("saved_posts", (localStorage.getItem("saved_posts") || "") + window.location.pathname);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-4 items-end">
      
      {/* Scroll to Top */}
      {showScroll && (
        <button 
          onClick={scrollToTop}
          className="p-3.5 rounded-full bg-slate-800/80 backdrop-blur-md border border-white/10 text-slate-300 shadow-xl hover:bg-white hover:text-black transition-all duration-300"
          title="Scroll to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Share Button */}
      <div className="relative flex items-center">
        {/* Tooltip for Copy Feedback */}
        <div className={`absolute right-full mr-3 px-3 py-1.5 bg-emerald-500 text-black text-xs font-bold rounded-lg shadow-lg transition-all duration-300 ${shareState === "copied" ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2 pointer-events-none"}`}>
          Link Copied!
        </div>

        <button 
          onClick={handleShare}
          className={`p-4 rounded-full shadow-2xl border transition-all duration-300 ${
            shareState === "copied" 
              ? "bg-emerald-500 text-black border-emerald-400 scale-110" 
              : "bg-indigo-600 text-white border-indigo-500 hover:bg-indigo-500 hover:scale-105"
          }`}
          title="Share Article"
        >
          {shareState === "copied" ? <Check size={20} /> : <Share2 size={20} />}
        </button>
      </div>

      {/* Save Button */}
      <button 
        onClick={handleSave}
        className={`p-4 rounded-full shadow-2xl border transition-all duration-300 ${
          isSaved 
            ? 'bg-amber-500 text-black border-amber-400' 
            : 'bg-slate-900/90 text-slate-300 border-white/10 hover:bg-white hover:text-black'
        }`}
        title={isSaved ? "Saved" : "Save for later"}
      >
        <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
