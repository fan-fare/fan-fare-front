import { cakeContainer, cakeImg, candle1 } from '@/styles/cake.css';
import Image from 'next/image';

export default function Cake() {
  return (
    <div className={cakeContainer}>
      <Image
        src={'/assets/cake.svg'}
        alt="cake"
        width={0}
        height={0}
        className={cakeImg}
      />
      <Image
        src={'/assets/candle/1.svg'}
        alt="cake"
        width={0}
        height={0}
        className={candle1}
      />
    </div>
  );
}
