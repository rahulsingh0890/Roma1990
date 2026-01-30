'use client';

import { ReactNode } from 'react';
import styles from './ClockBody.module.css';

interface ClockBodyProps {
  children: ReactNode;
}

export const ClockBody = ({ children }: ClockBodyProps) => {
  return (
    <div className={styles.clockWrapper}>
      <div className={styles.clockBody}>
        <div className={styles.displayArea}>
          {children}
          <span className={styles.branding}>Roma1990</span>
        </div>
      </div>
      <div className={styles.deskShadow} />
    </div>
  );
};
