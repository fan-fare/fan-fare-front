'use client';

import Candle from '@/components/Candle';
import PrevPage from '@/components/PrevPage';
import { disabledButtonHalf, buttonPrimaryHalf } from '@/styles/button.css';
import {
  activatedCandleContainer,
  candleContainer,
  candleSelector,
  decoBtnContainer,
  decoMessage,
  decoPageContainer,
} from '@/styles/pages/decoration/decoration.css';
import Link from 'next/link';
import { useState } from 'react';

export default function Page() {
  // Constants
  const candleCount = 6;

  // State
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <PrevPage url="/">
      <div className={decoPageContainer}>
        <div className={decoMessage}>케이크 장식을 선택해주세요.</div>
        <div className={candleSelector}>
          {[...Array(candleCount)].map((_, i) => (
            <div
              className={
                selected === i + 1 ? activatedCandleContainer : candleContainer
              }
              key={i}
              onClick={() => setSelected(i + 1)}
              onTouchEnd={() => setSelected(i + 1)}
            >
              <Candle candleType={i + 1} />
            </div>
          ))}
        </div>
        <div className={decoBtnContainer}>
          <Link
            href={selected ? `/decoration/message?candle_id=${selected}` : '#'}
            className={
              selected !== null ? buttonPrimaryHalf : disabledButtonHalf
            }
          >
            다음으로
          </Link>
        </div>
      </div>
    </PrevPage>
  );
}
