'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Clock, ArrowUp } from 'lucide-react';

export default function ReadingHUD({ readTime }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      setProgress(Math.round(v * 100));
      setIsVisible(v > 0.05); // Show after scrolling 5%
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Parse "5 min read" to integer 5
  const totalMinutes = parseInt(readTime) || 5;
  const minutesLeft = Math.max(1, Math.ceil(totalMinutes * (1 - progress / 100)));

  return (
    <>
      {/* TOP PROGRESS BAR */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-50"
        style={{ scaleX }}
      />

      {/* FLOATING HUD */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
        className="fixed bottom-8 right-8 z-40 flex items-center gap-4"
      >
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-[#0B1120]/80 backdrop-blur-md border border-white/10 shadow-2xl shadow-black/50">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
            <Clock size={14} className="text-amber-500" />
            <span>{minutesLeft} min left</span>
          </div>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-xs font-mono text-emerald-500">{progress}%</span>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2 rounded-full bg-amber-500 text-[#020617] hover:bg-white transition-colors shadow-lg shadow-amber-500/20"
        >
          <ArrowUp size={20} />
        </button>
      </motion.div>
    </>
  );
}
