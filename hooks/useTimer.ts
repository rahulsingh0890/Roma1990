'use client';

import { useState, useEffect, useCallback } from 'react';

export type TimerState = 'idle' | 'running' | 'completed';

interface UseTimerReturn {
  state: TimerState;
  remainingSeconds: number;
  start: () => void;
  stop: () => void;
}

export const useTimer = (durationMinutes: number, onComplete?: () => void): UseTimerReturn => {
  const [state, setState] = useState<TimerState>('idle');
  const [remainingSeconds, setRemainingSeconds] = useState(durationMinutes * 60);

  // Update remaining seconds when duration changes (only in idle state)
  useEffect(() => {
    if (state === 'idle') {
      setRemainingSeconds(durationMinutes * 60);
    }
  }, [durationMinutes, state]);

  // Countdown effect when running
  useEffect(() => {
    if (state !== 'running') return;

    const interval = setInterval(() => {
      setRemainingSeconds(prev => {
        if (prev <= 1) {
          setState('completed');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [state]);

  // Handle completion
  useEffect(() => {
    if (state === 'completed') {
      onComplete?.();

      // Auto-reset after 2 seconds
      const timeout = setTimeout(() => {
        setState('idle');
        setRemainingSeconds(durationMinutes * 60);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [state, durationMinutes, onComplete]);

  const start = useCallback(() => {
    setRemainingSeconds(durationMinutes * 60);
    setState('running');
  }, [durationMinutes]);

  const stop = useCallback(() => {
    setRemainingSeconds(durationMinutes * 60);
    setState('idle');
  }, [durationMinutes]);

  return { state, remainingSeconds, start, stop };
};
