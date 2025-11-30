'use client';
import {useEffect, useRef, useState} from 'react';

const clamp=(n,min,max)=>Math.min(max,Math.max(min,n));
const mmss=(s)=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

function countWords(root){
  if(!root) return 0;
  const SKIP=/comment|reply|newsletter|subscribe|aside|share/i;
  let w=0;
  const walk=(n)=>{
    if(n.nodeType===1){
      const el=n;
      if(SKIP.test(el.id||'')||SKIP.test(String(el.className||''))) return;
      el.childNodes.forEach(walk);
    }else if(n.nodeType===3){
      const t=n.nodeValue||'';
      w+=(t.trim().match(/\b[\p{L}\p{N}’'-]+\b/gu)||[]).length;
    }
  };
  walk(root);
  return w;
}

export default function ReadTimer({ containerSelector = '#post-body', wpm = 220 }){
  const [est,setEst]=useState(1);
  const [spent,setSpent]=useState(0);
  const [now,setNow]=useState(new Date());
  const started=useRef(false); const onPageInt=useRef(0); const raf=useRef(0);

  useEffect(()=>{
    const el=document.querySelector(containerSelector);
    if(!el) return;
    const words=countWords(el);
    setEst(Math.max(1,Math.round(words/Math.max(120,wpm))));
    const vis=()=>{ if(document.hidden){ clearInterval(onPageInt.current); } };
    document.addEventListener('visibilitychange',vis);

    const io=new IntersectionObserver((ents)=>{
      const v=ents.some(e=>e.isIntersecting);
      if(v && !started.current){
        started.current=true;
        onPageInt.current=window.setInterval(()=>setSpent(s=>s+1),1000);
      }else if(!v && started.current){
        clearInterval(onPageInt.current);
        started.current=false;
      }
    },{threshold:0.25});
    io.observe(el);

    const clock=setInterval(()=>setNow(new Date()),1000);

    const onScroll=()=>{
      cancelAnimationFrame(raf.current);
      raf.current=requestAnimationFrame(()=>{/* progress handled visually by CSS width clamp; no need to store */});
    };
    window.addEventListener('scroll',onScroll,{passive:true});

    return ()=>{ io.disconnect(); document.removeEventListener('visibilitychange',vis);
      clearInterval(onPageInt.current); clearInterval(clock); cancelAnimationFrame(raf.current);
      window.removeEventListener('scroll',onScroll);
    };
  },[containerSelector,wpm]);

  return (
    <div className="timer-wrap">
      <div className="timer-card">
        <div className="timer-meta"><span className="dot" />{now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}</div>
        <div className="timer-meta"><span className="label">Est. read</span><span className="value">{est} min</span></div>
        <div className="timer-meta"><span className="label">On page</span><span className="value">{mmss(spent)}</span></div>
      </div>
      <div className="timer-track"><span className="bar" /></div>
    </div>
  );
}
