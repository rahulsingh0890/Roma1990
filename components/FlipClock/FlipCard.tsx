'use client';

import { useState, useEffect } from 'react';
import styles from './FlipClock.module.css';

interface FlipCardProps {
  digit: string;
  isPulsing?: boolean;
}

export const FlipCard = ({ digit, isPulsing = false }: FlipCardProps) => {
  const [currentDigit, setCurrentDigit] = useState(digit);
  const [previousDigit, setPreviousDigit] = useState(digit);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (digit !== currentDigit) {
      setPreviousDigit(currentDigit);
      setIsFlipping(true);

      // Update to new digit after flip animation completes
      const timeout = setTimeout(() => {
        setCurrentDigit(digit);
        setIsFlipping(false);
      }, 600);

      return () => clearTimeout(timeout);
    }
  }, [digit, currentDigit]);

  return (
    <div className={`${styles.flipCard} ${isPulsing ? styles.pulse : ''}`}>
      <div className={styles.cardInner}>
        {/* Static top half - shows current number */}
        <div className={styles.topHalf}>
          <span>{isFlipping ? previousDigit : currentDigit}</span>
        </div>

        {/* Static bottom half - shows next number during flip, then current */}
        <div className={styles.bottomHalf}>
          <span>{currentDigit}</span>
        </div>

        {/* Animated flip top - flips down showing previous number */}
        {isFlipping && (
          <div className={`${styles.flipTop} ${styles.flipTopAnimation}`}>
            <span>{previousDigit}</span>
          </div>
        )}

        {/* Animated flip bottom - reveals new number */}
        {isFlipping && (
          <div className={`${styles.flipBottom} ${styles.flipBottomAnimation}`}>
            <span>{currentDigit}</span>
          </div>
        )}
      </div>
    </div>
  );
};
