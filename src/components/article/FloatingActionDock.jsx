"use client";
import { useState, useEffect } from 'react';
import { Share2, Bookmark, ArrowUp, Check } from 'lucide-react';

export default function FloatingActionDock() {
  const [isSaved, setIsSaved] = useState(false);
  const [justShared, setJustShared] = useState(false);
  const [showScroll, setShowScroll] = useState(false);

  // Check local storage for saved state
  useEffect(() => {
    const saved = localStorage.getItem("saved_posts");
    if (saved) setIsSaved(saved.includes(window.location.pathname));
    
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: document.title, url: window.location.href }); } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      setJustShared(true);
      setTimeout(() => setJustShared(false), 2000);
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
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      
      {/* Scroll to Top Button */}
      {showScroll && (
        <button 
          onClick={scrollToTop}
          className="p-4 rounded-full bg-amber-500 text-black shadow-xl hover:bg-amber-400 transition-colors"
          title="Scroll to Top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Share Button */}
      <button 
        onClick={handleShare}
        className="group relative p-4 rounded-full bg-indigo-600 text-white shadow-xl hover:bg-indigo-500 transition-colors"
        title="Share this article"
      >
        {justShared ? <Check size={20} className="text-emerald-400" /> : <Share2 size={20} />}
      </button>

      {/* Save Button */}
      <button 
        onClick={handleSave}
        className={`p-4 rounded-full transition-all shadow-xl ${isSaved ? 'bg-amber-500 text-black' : 'bg-slate-800/50 hover:bg-white hover:text-black text-slate-300'}`}
        title={isSaved ? "Saved" : "Save for later"}
      >
        <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
