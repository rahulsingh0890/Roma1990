'use client';

import { FlipPanel } from './FlipPanel';
import styles from './FlipClock.module.css';

interface FlipClockProps {
  totalSeconds: number;
  isPulsing?: boolean;
}

export const FlipClock = ({ totalSeconds, isPulsing = false }: FlipClockProps) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return (
    <div className={styles.flipClock}>
      <FlipPanel value={minutes} isPulsing={isPulsing} />
      <span className={styles.separator}>:</span>
      <FlipPanel value={seconds} isPulsing={isPulsing} />
    </div>
  );
};
