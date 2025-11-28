'use client';
import {useEffect, useMemo, useRef, useState} from 'react';

function clamp(n, min, max){ return Math.min(max, Math.max(min, n)); }
function pageY(el){ let y=0; for(let e=el; e; e=e.offsetParent){ y += e.offsetTop || 0; } return y; }
function mmss(sec){ const m = Math.floor(sec/60).toString().padStart(2,'0'); const s=(sec%60).toString().padStart(2,'0'); return `${m}:${s}`; }

function countWordsIn(container){
  if(!container) return 0;
  const SKIP_IDS = /comment|comments|reply|read-?next|related|newsletter|subscribe|footer|header|nav|menu/i;
  const SKIP_CLASS = /comment|comments|reply|read-?next|related|newsletter|subscribe|aside|share|cta|menu/i;
  const SKIP_TAG = /SCRIPT|STYLE|NOSCRIPT|IFRAME|SVG/;

  let words = 0;
  const walk = (node) => {
    if(node.nodeType === 1){
      const el = node;
      if(SKIP_TAG.test(el.tagName)) return;
      if((el.id && SKIP_IDS.test(el.id)) || (el.className && SKIP_CLASS.test(String(el.className)))) return;
      for(const child of el.childNodes) walk(child);
    } else if(node.nodeType === 3){
      const txt = node.nodeValue || '';
      words += (txt.trim().match(/\b[\p{L}\p{N}’'-]+\b/gu) || []).length;
    }
  };
  walk(container);
  return words;
}

export default function ReadTimer({
  containerSelector = '#article-body',
  wpm = Number(process.env.NEXT_PUBLIC_READ_WPM || 220),
  className = ''
}){
  const [est, setEst] = useState(0);
  const [spent, setSpent] = useState(0);
  const [now, setNow] = useState(new Date());
  const [progress, setProgress] = useState(0);
  const started = useRef(false);
  const raf = useRef(0);
  const tick = useRef(0);

  const labelNow = useMemo(() => now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}), [now]);

  useEffect(() => {
    const el = document.querySelector(containerSelector);
    if(!el) return;

    // Estimate read time from word count
    const words = countWordsIn(el);
    const minutes = Math.max(1, Math.round(words / Math.max(120, wpm)));
    setEst(minutes);

    // Start timer when article enters viewport
    const io = new IntersectionObserver((entries) => {
      const vis = entries.some(e => e.isIntersecting);
      if(vis && !started.current){
        started.current = true;
        tick.current = window.setInterval(() => setSpent(s => s+1), 1000);
      } else if(!vis && started.current){
        window.clearInterval(tick.current);
        started.current = false;
      }
    }, { threshold: 0.25 });
    io.observe(el);

    // Pause on tab hide
    const onVis = () => {
      if(document.hidden){ window.clearInterval(tick.current); }
      else if(!started.current){ /* wait until intersecting again */ }
    };
    document.addEventListener('visibilitychange', onVis);

    // Live clock
    const clock = window.setInterval(() => setNow(new Date()), 1000);

    // Scroll progress for the article container
    const start = pageY(el);
    const end = start + el.offsetHeight - window.innerHeight;
    const onScroll = () => {
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset || 0;
        const pct = clamp((y - start) / Math.max(1, end - start), 0, 1);
        setProgress(pct);
      });
    };
    const onResize = () => { onScroll(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    onScroll();

    return () => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.clearInterval(tick.current);
      window.clearInterval(clock);
      cancelAnimationFrame(raf.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [containerSelector, wpm]);

  return (
    <div className={`timer-bar sticky top-0 z-30`}>
      <div className={`timer-card ${className}`}>
        <div className="timer-meta">
          <span className="dot" aria-hidden="true" />
          <span className="now" aria-label="Current time">{labelNow}</span>
        </div>
        <div className="timer-meta">
          <span className="label">Est. read</span>
          <span className="value">{est} min</span>
        </div>
        <div className="timer-meta">
          <span className="label">On page</span>
          <span className="value">{mmss(spent)}</span>
        </div>
      </div>
      <div className="timer-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress*100)}>
        <span className="bar" style={{transform:`scaleX(${progress})`}} />
      </div>
    </div>
  );
}
