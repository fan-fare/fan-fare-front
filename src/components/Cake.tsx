import { cake, cakeImg, candle2 } from '@/styles/cake.css';
import Image from 'next/image';
import Candle from './Candle';

export default function Cake() {
  return (
    <div className={cake}>
      <div className={candle2}>
        <Candle id={2} />
      </div>
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
