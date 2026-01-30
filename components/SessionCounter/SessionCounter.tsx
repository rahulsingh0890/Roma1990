'use client';

import styles from './SessionCounter.module.css';

interface SessionCounterProps {
  count: number;
}

export const SessionCounter = ({ count }: SessionCounterProps) => {
  return (
    <div className={styles.counter}>
      <span className={styles.count}>{count}</span>
      <span className={styles.label}>{count === 1 ? 'session' : 'sessions'}</span>
    </div>
  );
};
