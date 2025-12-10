"use client";
import { useState, useEffect, useRef } from "react";

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  const toggleAudio = () => {
    if (isPlaying) {
      audioCtxRef.current?.suspend();
      setIsPlaying(false);
    } else {
      if (!audioCtxRef.current) initAudio();
      audioCtxRef.current?.resume();
      setIsPlaying(true);
    }
  };

  const initAudio = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const bufferSize = 4096;
    
    // Create Brown Noise Generator
    const brownNoise = (e) => {
      const output = e.outputBuffer.getChannelData(0);
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5; // Compensate for gain
      }
    };

    const processor = ctx.createScriptProcessor(bufferSize, 1, 1);
    processor.onaudioprocess = brownNoise;

    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.15; // Volume

    processor.connect(gainNode);
    gainNode.connect(ctx.destination);

    audioCtxRef.current = ctx;
    gainNodeRef.current = gainNode;
  };

  return { isPlaying, toggleAudio };
}
