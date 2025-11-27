// src/components/home/HeroCrest.jsx
"use client";

export default function HeroCrest() {
  return (
    <div className="hero-crest" aria-hidden="true">
      <svg viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <radialGradient id="hc-core" cx="50%" cy="48%" r="55%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hc-ring" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#34d399" />
          </linearGradient>
        </defs>

        {/* soft core glow */}
        <circle cx="52" cy="48" r="18" fill="url(#hc-core)" className="hc-pulse" />

        {/* orbits (spin slowly) */}
        <g className="hc-spin-slow" transform="translate(50 50)">
          <circle r="30" fill="none" stroke="url(#hc-ring)" strokeWidth="1.5" strokeOpacity="0.55" />
        </g>
        <g className="hc-spin-fast" transform="translate(50 50)">
          <circle r="38" fill="none" stroke="url(#hc-ring)" strokeWidth="1.2" strokeDasharray="10 6" strokeOpacity="0.45" />
        </g>

        {/* central tech spark */}
        <g className="hc-spark" transform="translate(52 48)">
          <path d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z" fill="#ffffff" fillOpacity="0.85" />
        </g>

        {/* subtle code chevrons (</ >) */}
        <g transform="translate(50 50)" stroke="#fbbf24" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6">
          <polyline points="-10,-6 -16,0 -10,6" fill="none" />
          <polyline points="10,-6 16,0 10,6"  fill="none" />
        </g>
      </svg>
    </div>
  );
}
