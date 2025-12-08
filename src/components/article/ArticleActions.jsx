"use client";
import { useState, useEffect } from "react";
import { Share2, Bookmark, Check } from "lucide-react";

export default function ArticleActions() {
  const [isSaved, setIsSaved] = useState(false);
  const [shareState, setShareState] = useState("idle");

  useEffect(() => {
    const saved = localStorage.getItem("saved_posts");
    if (saved && typeof window !== 'undefined') {
      setIsSaved(saved.includes(window.location.pathname));
    }
  }, []);

  const handleShare = async (e) => {
    e.stopPropagation();
    e.preventDefault();

    if (navigator.vibrate) navigator.vibrate(50);

    const url = window.location.href;
    const title = document.title;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        setShareState("shared");
        setTimeout(() => setShareState("idle"), 2000);
        return;
      } catch (err) {
        // User cancelled
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setShareState("copied");
      setTimeout(() => setShareState("idle"), 2000);
    } catch (err) {
      alert("Link copied to clipboard!");
    }
  };

  const handleSave = (e) => {
    e.stopPropagation();
    if (navigator.vibrate) navigator.vibrate(50);
    
    const newState = !isSaved;
    setIsSaved(newState);
    
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      let saved = localStorage.getItem("saved_posts") || "";
      
      if (newState) {
        localStorage.setItem("saved_posts", saved + currentPath + ",");
      } else {
        localStorage.setItem("saved_posts", saved.replace(currentPath + ",", ""));
      }
    }
  };

  return (
    <div className="flex gap-4 relative z-[9999] pointer-events-auto isolate">
      <button 
        onClick={handleShare}
        className="relative p-3.5 rounded-full bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition-all shadow-lg border border-white/10 active:scale-90 active:bg-indigo-500 cursor-pointer"
        aria-label="Share post"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {shareState === "copied" ? <Check size={20} className="text-white" /> : <Share2 size={20} />}
        
        {shareState === "copied" && (
          <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[10px] font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap">
            Copied!
          </span>
        )}
      </button>

      <button 
        onClick={handleSave}
        className={`relative p-3.5 rounded-full transition-all shadow-lg border border-white/10 active:scale-90 cursor-pointer ${isSaved ? 'bg-amber-500 text-black' : 'bg-slate-800 hover:bg-white hover:text-black text-slate-300'}`}
        aria-label="Save post"
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
