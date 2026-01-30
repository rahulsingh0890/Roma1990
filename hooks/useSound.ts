'use client';

import { useCallback, useRef } from 'react';

export const useSound = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const playChime = useCallback(() => {
    // Create or resume audio context
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const ctx = audioContextRef.current;

    // Resume if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    // Create a pleasant two-note chime
    const playNote = (frequency: number, startTime: number, duration: number) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    const now = ctx.currentTime;

    // Two-note chime (C5 and E5)
    playNote(523.25, now, 0.4);        // C5
    playNote(659.25, now + 0.15, 0.5); // E5
  }, []);

  return { playChime };
};
