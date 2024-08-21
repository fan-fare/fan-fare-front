'use client';

import {
  timer,
  timerContainer,
  timerContent,
  birthdayText,
  timerText,
  boxesImg,
} from '@/styles/timer.css';
import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

/**
 * Timer component
 * @param birthday birthday date
 * @returns Timer component
 */
export default  function Timer({ birthday }: { birthday: Date }) {
  // State for remains
  const [remains, setRemains] = useState(1);

  // Calculate remains
  const calculateRemains = useCallback(() => {
    const now = new Date();
    const diff = birthday.getTime() - now.getTime();
    setRemains(diff);
  }, [birthday]);

  // Update remains every second
  useEffect(() => {
    const interval = setInterval(() => {
      calculateRemains();
    }, 1000);
    return () => clearInterval(interval);
  }, [calculateRemains]);

  return (
    <div className={timerContainer}>
      <Image
        src={'/assets/boxes.svg'}
        alt="boxes"
        width={0}
        height={0}
        className={boxesImg}
      />
      <div className={timer}>
        <div className={timerContent}>
          <div className={timerText}>
            D-
            {Math.floor(remains / (1000 * 60 * 60 * 24) + 0.5)}
          </div>
          <div>
            {
              <div className={timerText}>
                {/* HH:MM:SS */}
                {`${Math.floor(
                  (remains % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                )
                  .toString()
                  .padStart(2, '0')}:${Math.floor(
                  (remains % (1000 * 60 * 60)) / (1000 * 60)
                )
                  .toString()
                  .padStart(2, '0')}:${Math.floor(
                  (remains % (1000 * 60)) / 1000
                )
                  .toString()
                  .padStart(2, '0')}`}
              </div>
            }
          </div>
        </div>
      </div>
      <div className={birthdayText}>
        {`생일: ${birthday.getFullYear()}.${
          birthday.getMonth() + 1
        }.${birthday.getDate()}.`}
      </div>
    </div>
  );
}
