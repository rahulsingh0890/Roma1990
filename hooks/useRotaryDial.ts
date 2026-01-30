'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface UseRotaryDialReturn {
  value: number;
  rotation: number;
  isDragging: boolean;
  knobRef: React.RefObject<HTMLDivElement | null>;
  handleMouseDown: (e: React.MouseEvent) => void;
}

export const useRotaryDial = (
  min: number,
  max: number,
  initialValue: number,
  disabled: boolean = false
): UseRotaryDialReturn => {
  const [value, setValue] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef<HTMLDivElement>(null);
  const startAngleRef = useRef(0);
  const startValueRef = useRef(initialValue);

  // Calculate rotation angle from value (full rotation = full range)
  const rotation = ((value - min) / (max - min)) * 300 - 150; // -150 to 150 degrees

  const getAngleFromEvent = useCallback((clientX: number, clientY: number): number => {
    if (!knobRef.current) return 0;
    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    startAngleRef.current = getAngleFromEvent(e.clientX, e.clientY);
    startValueRef.current = value;
  }, [disabled, getAngleFromEvent, value]);

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const currentAngle = getAngleFromEvent(e.clientX, e.clientY);
      let angleDiff = currentAngle - startAngleRef.current;

      // Handle angle wrapping
      if (angleDiff > 180) angleDiff -= 360;
      if (angleDiff < -180) angleDiff += 360;

      // Map angle difference to value change
      const valueChange = (angleDiff / 300) * (max - min);
      let newValue = startValueRef.current + valueChange;

      // Clamp to range
      newValue = Math.max(min, Math.min(max, newValue));
      setValue(Math.round(newValue));
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, getAngleFromEvent, min, max]);

  return { value, rotation, isDragging, knobRef, handleMouseDown };
};
