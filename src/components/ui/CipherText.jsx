'use client';
import { useState, useEffect } from 'react';

const CHARS = "-_~=+$*^&@#%!";

export default function CipherText({ text, className }) {
  const [display, setDisplay] = useState('');
  
  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3; // Speed of decryption
    }, 30);

    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
}
