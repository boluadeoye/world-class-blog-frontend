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
      {chars.map((ch, i) => (
        <span
          key={i}
          className="seq-char"
          style={{
            animationDelay: `${startAt + i * step}ms`,
            animationDuration: `${dur}ms`,
          }}
        >
          {ch === ' ' ? '\u00A0' : ch}
        </span>
      ))}
    </span>
  );
}
