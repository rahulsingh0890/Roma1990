'use client';

import styles from './TimeSlider.module.css';

interface TimeSliderProps {
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
}

export const TimeSlider = ({
  value,
  min = 5,
  max = 60,
  disabled = false,
  onChange,
}: TimeSliderProps) => {
  const progress = ((value - min) / (max - min)) * 100;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.valueDisplay}>{value} minutes</div>
      <div className={styles.sliderWrapper}>
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={styles.slider}
          style={{ '--progress': `${progress}%` } as React.CSSProperties}
        />
      </div>
      <div className={styles.labels}>
        <span>{min} min</span>
        <span>{max} min</span>
      </div>
    </div>
  );
};
