'use client';

import React, { useMemo } from 'react';

type Props = {
  text: string;
  className?: string;
  startAt?: number;  // ms
  step?: number;     // ms per character
  dur?: number;      // animation duration per character
  ariaLabel?: string;
};

export default function TypeShow({
  text,
  className = '',
  startAt = 0,
  step = 38,
  dur = 650,
  ariaLabel,
}: Props) {
  const chars = useMemo(() => Array.from(text || ''), [text]);
  return (
    <span className={className} aria-label={ariaLabel || text}>
      {chars.map((ch, i) => {
        const delay = startAt + i * step;
        return (
          <span
            key={i}
            className="seq-char"
            style={{
              // drive all CSS animations with the same per‑char delay/duration
              ['--delay' as any]: `${delay}ms`,
              ['--dur' as any]: `${dur}ms`,
            }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        );
      })}
    </span>
  );
}
