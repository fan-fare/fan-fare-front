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
import { CakeType } from '@/interfaces/cakes';
import { CandleType } from '@/interfaces/candles';

export default function Cake({
  cakeType = '1',
  candles,
}: {
  cakeType?: CakeType;
  candles: Array<CandleType>;
}) {
  const candlePositions = [candle1, candle2, candle3, candle4, candle5];

  const cakeImage = new Map<CakeType, string>([['1', '1.svg']]);

  return (
    <div className={cake}>
      {candles.map(
        (candle, i) =>
          candlePositions.length > i && (
            <CakeCandle
              key={i}
              candleType={candle}
              candlePositionClass={candlePositions[i]}
            />
          )
      )}
      <Image
        src={`/assets/cake/${cakeImage.get(cakeType)}`}
        alt="cake"
        width={0}
        height={0}
        className={cakeImg}
      />
    </div>
  );
}
