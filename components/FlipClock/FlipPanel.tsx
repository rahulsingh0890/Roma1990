'use client';

import { FlipCard } from './FlipCard';
import styles from './FlipClock.module.css';

interface FlipPanelProps {
  value: number;
  isPulsing?: boolean;
}

export const FlipPanel = ({ value, isPulsing = false }: FlipPanelProps) => {
  // Pad value to 2 digits
  const paddedValue = value.toString().padStart(2, '0');
  const [tensDigit, onesDigit] = paddedValue.split('');

  return (
    <div className={styles.flipPanel}>
      <FlipCard digit={tensDigit} isPulsing={isPulsing} />
      <FlipCard digit={onesDigit} isPulsing={isPulsing} />
    </div>
  );
};
