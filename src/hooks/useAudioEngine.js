"use client";
import { useState, useRef } from "react";

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);
  const oscillatorsRef = useRef([]);

  const startDrone = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const masterGain = ctx.createGain();
    
    // Soft Fade In
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 2);
    masterGain.connect(ctx.destination);

    // Create a "Warm Pad" Chord (Frequencies in Hz)
    // A low, grounding drone chord
    const freqs = [110.00, 164.81, 196.00, 220.00]; // A2, E3, G3, A3 (Am7 chord)

    const oscillators = freqs.map((f, i) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      // Use Triangle/Sine waves for warmth
      osc.type = i % 2 === 0 ? "sine" : "triangle"; 
      osc.frequency.value = f;

      // Slight detune for "analog" feel
      osc.detune.value = Math.random() * 10 - 5;

      // LFO for "Breathing" effect (Volume modulation)
      const lfo = ctx.createOscillator();
      lfo.type = "sine";
      lfo.frequency.value = 0.1 + (Math.random() * 0.1); // Very slow breath
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 0.1; // Depth of breath
      
      lfo.connect(lfoGain.gain);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      
      // Mix levels
      oscGain.gain.value = 0.2; 

      osc.start();
      lfo.start();
      
      return { osc, lfo };
    });

    audioCtxRef.current = ctx;
    gainNodeRef.current = masterGain;
    oscillatorsRef.current = oscillators;
    setIsPlaying(true);
  };

  const stopDrone = () => {
    if (audioCtxRef.current && gainNodeRef.current) {
      // Soft Fade Out
      const ctx = audioCtxRef.current;
      const gain = gainNodeRef.current;
      
      gain.gain.cancelScheduledValues(ctx.currentTime);
      gain.gain.setValueAtTime(gain.gain.value, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

      setTimeout(() => {
        oscillatorsRef.current.forEach(({ osc, lfo }) => {
          osc.stop();
          lfo.stop();
        });
        ctx.close();
        setIsPlaying(false);
      }, 2000);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) stopDrone();
    else startDrone();
  };

  return { isPlaying, toggleAudio };
}
