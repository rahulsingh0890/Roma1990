'use client';

import { useState, useEffect } from 'react';
import styles from './DateDisplay.module.css';

export const DateDisplay = () => {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const today = new Date();
    const formatted = today.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    setDateStr(formatted);
  }, []);

  if (!dateStr) return null;

  return <div className={styles.dateDisplay}>{dateStr}</div>;
};
