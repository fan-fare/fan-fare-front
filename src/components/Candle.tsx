import { candleImg, candleImgContainer, glittering } from '@/styles/candle.css';
import Image from 'next/image';
import { memo } from 'react';

export default memo(function Candle({
  id,
  isGlittering = false,
}: {
  id: number;
  isGlittering?: boolean;
}) {
  const path = '/assets/candle/';
  const candleMap = new Map([
    [1, '1.svg'],
    [2, '2.svg'],
    [3, '3.svg'],
    [4, '4.svg'],
    [5, '5.svg'],
    [6, '6.svg'],
  ]);

  return (
    <div className={candleImgContainer}>
      {isGlittering && <div className={glittering}></div>}
      <Image
        src={`${path}${candleMap.get(id)}`}
        alt={candleMap.get(id) || ''}
        width={0}
        height={0}
        className={candleImg}
      />
    </div>
  );
});
