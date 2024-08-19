import {
  cake,
  cakeImg,
  candle1,
  candle2,
  candle3,
  candle5,
} from '@/styles/cake.css';
import Image from 'next/image';
import CakeCandle from './CakeCandle';

export default function Cake() {
  return (
    <div className={cake}>
      <CakeCandle id={4} candlePositionClass={candle3} />
      <CakeCandle id={2} candlePositionClass={candle2} />
      <CakeCandle id={3} candlePositionClass={candle1} />
      <CakeCandle id={3} candlePositionClass={candle5} />
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
