'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

const STORAGE_KEY = 'pomodoro-sessions';

interface StoredData {
  date: string;
  count: number;
}

export const useSessionCount = () => {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentDateRef = useRef<string>('');

  // Check if date has changed and reset if needed
  const checkAndResetIfNewDay = useCallback(() => {
    const today = new Date().toDateString();

    if (currentDateRef.current && currentDateRef.current !== today) {
      // Day has changed, reset count
      setCount(0);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }));
      } catch {
        console.warn('Could not save session count to localStorage');
      }
    }

    currentDateRef.current = today;
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const today = new Date().toDateString();
    currentDateRef.current = today;

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

  // Periodic check for date change (every minute)
  useEffect(() => {
    const interval = setInterval(checkAndResetIfNewDay, 60000);
    return () => clearInterval(interval);
  }, [checkAndResetIfNewDay]);

  // Check when app becomes visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkAndResetIfNewDay();
      }
    };

    const handleFocus = () => {
      checkAndResetIfNewDay();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [checkAndResetIfNewDay]);

  const increment = useCallback(() => {
    const today = new Date().toDateString();
    currentDateRef.current = today;

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
