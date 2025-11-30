'use client';
import React, { useMemo } from 'react';

export default function TypeShow({
  text,
  className = '',
  startAt = 0,
  step = 38,
  dur = 650,
  ariaLabel,
}) {
  const chars = useMemo(() => Array.from(text || ''), [text]);
  return (
    <span className={className} aria-label={ariaLabel || text}>
      {chars.map((ch, i) => {
        const delay = startAt + i * step;
        return (
          <span
            key={i}
            className="seq-char"
            style={{ '--delay': `${delay}ms`, '--dur': `${dur}ms` }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </span>
        );
      })}
    </span>
  );
}
