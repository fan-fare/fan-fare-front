import {
  cake,
  cakeImg,
  candle1,
  candle2,
  candle3,
  candle4,
  candle5,
} from '@/styles/cake.css';
import Image from 'next/image';
import CakeCandle from './CakeCandle';

export default function Cake({ candles }: { candles: Array<number> }) {
  const candlePositions = [candle1, candle2, candle3, candle4, candle5];

  return (
    <div className={cake}>
      {candles.map(
        (candle, i) =>
          candlePositions.length > i && (
            <CakeCandle
              key={i}
              id={candle}
              candlePositionClass={candlePositions[i]}
            />
          )
      )}
      <Image
        src={'/assets/cake.svg'}
        alt="cake"
        width={0}
        height={0}
        className={cakeImg}
      />
    </div>
  );
}
