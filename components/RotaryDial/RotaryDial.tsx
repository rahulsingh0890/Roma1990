'use client';

import { useRotaryDial } from '@/hooks/useRotaryDial';
import styles from './RotaryDial.module.css';

interface RotaryDialProps {
  min?: number;
  max?: number;
  initialValue?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  value?: number;
}

export const RotaryDial = ({
  min = 5,
  max = 60,
  initialValue = 25,
  disabled = false,
  onChange,
  value: controlledValue,
}: RotaryDialProps) => {
  const { value, rotation, isDragging, knobRef, handleMouseDown } = useRotaryDial(
    min,
    max,
    initialValue,
    disabled
  );

  // Use controlled value if provided, otherwise use internal value
  const displayValue = controlledValue ?? value;
  const displayRotation = controlledValue !== undefined
    ? ((controlledValue - min) / (max - min)) * 300 - 150
    : rotation;

  // Notify parent of value changes
  const onMouseDown = (e: React.MouseEvent) => {
    handleMouseDown(e);
  };

  // Handle drag value changes
  if (onChange && value !== controlledValue && controlledValue === undefined) {
    onChange(value);
  }

  return (
    <div className={styles.dialContainer}>
      <div
        ref={knobRef}
        className={`${styles.dial} ${isDragging ? styles.dragging : ''} ${disabled ? styles.disabled : ''}`}
        onMouseDown={onMouseDown}
        style={{ transform: `rotate(${displayRotation}deg)` }}
      >
        <div className={styles.indicator} />
      </div>
      <span className={styles.valueLabel}>{displayValue} min</span>
    </div>
  );
};
