import {
  timer,
  timerContainer,
  timerContent,
  birthdayText,
  timerText,
  boxesImg,
} from '@/styles/timer.css';
import Image from 'next/image';

export default function Timer() {
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
          <div className={timerText}>D-30</div>
          <div className={timerText}>23:10:55</div>
        </div>
      </div>
      <div className={birthdayText}>생일: 2022.8.15</div>
    </div>
  );
}
