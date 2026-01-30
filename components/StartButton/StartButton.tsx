'use client';

import styles from './StartButton.module.css';

interface StartButtonProps {
  isRunning: boolean;
  isCompleted: boolean;
  onStart: () => void;
  onStop: () => void;
}

export const StartButton = ({ isRunning, isCompleted, onStart, onStop }: StartButtonProps) => {
  const handleClick = () => {
    if (isRunning) {
      onStop();
    } else {
      onStart();
    }
  };

  return (
    <div className={styles.buttonContainer}>
      <button
        className={`${styles.button} ${isRunning ? styles.stop : styles.start}`}
        onClick={handleClick}
        disabled={isCompleted}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};
