'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pomodoro-sessions';

interface StoredData {
  date: string;
  count: number;
}

export const useSessionCount = () => {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const today = new Date().toDateString();

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data: StoredData = JSON.parse(stored);
        if (data.date === today) {
          setCount(data.count);
        } else {
          // New day, reset count
          localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }));
        }
      }
    } catch {
      // localStorage not available or corrupted data
      console.warn('Could not load session count from localStorage');
    }

    setIsLoaded(true);
  }, []);

  const increment = useCallback(() => {
    const today = new Date().toDateString();

    setCount(prevCount => {
      const newCount = prevCount + 1;

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: newCount }));
      } catch {
        console.warn('Could not save session count to localStorage');
      }

      return newCount;
    });
  }, []);

  return { count, increment, isLoaded };
};
