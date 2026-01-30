'use client';

import { useState, useCallback } from 'react';
import { FlipClock } from '@/components/FlipClock';
import { ClockBody } from '@/components/ClockBody';
import { TimeSlider } from '@/components/TimeSlider';
import { StartButton } from '@/components/StartButton';
import { SessionCounter } from '@/components/SessionCounter';
import { DateDisplay } from '@/components/DateDisplay';
import { useTimer } from '@/hooks/useTimer';
import { useSound } from '@/hooks/useSound';
import { useSessionCount } from '@/hooks/useSessionCount';
import styles from './page.module.css';

export default function Home() {
  const [duration, setDuration] = useState(25);
  const { count, increment, isLoaded } = useSessionCount();
  const { playChime } = useSound();

  const handleComplete = useCallback(() => {
    playChime();
    increment();
  }, [playChime, increment]);

  const { state, remainingSeconds, start, stop } = useTimer(duration, handleComplete);

  const isRunning = state === 'running';
  const isCompleted = state === 'completed';
  const sliderDisabled = isRunning || isCompleted;

  // Determine what time to display
  const displaySeconds = state === 'idle' ? duration * 60 : remainingSeconds;

  return (
    <main className={styles.page}>
      {isLoaded && <SessionCounter count={count} />}
      <DateDisplay />

      <div className={styles.timerContainer}>
        <div className={styles.clockSection}>
          <ClockBody>
            <FlipClock totalSeconds={displaySeconds} isPulsing={isCompleted} />
          </ClockBody>
        </div>

        <div className={styles.controlsSection}>
          <TimeSlider
            value={duration}
            min={5}
            max={60}
            disabled={sliderDisabled}
            onChange={setDuration}
          />

          <StartButton
            isRunning={isRunning}
            isCompleted={isCompleted}
            onStart={start}
            onStop={stop}
          />
        </div>
      </div>
    </main>
  );
}
