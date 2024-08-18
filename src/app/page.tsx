'use client';

import Cake from '@/components/Cake';
import Effect from '@/components/Effect';
import Timer from '@/components/Timer';
import { buttonPrimaryHalf, buttonWhiteHalf } from '@/styles/button.css';
import {
  cakeMessage,
  textPoint,
  cakeTitle,
  mainPageContainer,
  pageTop,
  pageTopText,
  questionMark,
  buttonContainer,
  cakeContainer,
  cakePageDotContainer,
} from '@/styles/pages/main.css';
import Link from 'next/link';
import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

export default function Home() {
  const [currentCake, setCurrentCake] = useState(1);
  const [cakeCount, setCakeCount] = useState(14);

  const serviceName = process.env.NEXT_PUBLIC_SERVICE_NAME;
  const questionMarkLink = process.env.NEXT_PUBLIC_NOTION_URL ?? '';
  return (
    <main className={mainPageContainer}>
      <Effect />
      <div className={pageTop}>
        <div className={pageTopText}>
          <div className={cakeTitle}>
            <div className={textPoint}>{serviceName}</div>
            🎂&apos;s cake
          </div>
          <div className={cakeMessage}>
            지금까지
            <div className={textPoint}>&nbsp;{`N`}</div>
            개의 생일축하를 받았어요!
          </div>
        </div>
        <Link href={questionMarkLink}>
          <FaQuestionCircle className={questionMark} />
        </Link>
      </div>
      <Timer />
      <div className={cakeContainer}>
        <Cake />
        <div className={cakePageDotContainer}>
          {`${currentCake} / ${cakeCount}`}
        </div>
      </div>
      <div className={buttonContainer}>
        <Link href={'/auth/signin'} className={buttonWhiteHalf}>
          로그인
        </Link>
        <Link href={'/decoration/candle'} className={buttonPrimaryHalf}>
          이 케이크 꾸미기
        </Link>
      </div>
    </main>
  );
}
