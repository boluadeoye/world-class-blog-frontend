"use client";

import { useEffect, useRef } from "react";

export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("reveal-in");
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );
    el.classList.add("reveal");
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return <div ref={ref} className={className}>{children}</div>;
}