import {
  effectContainer,
  glitterImg,
  flagsImg,
  balloonContainer,
  balloon1,
  balloon2,
  balloon3,
  balloon4,
  balloon5,
  effect,
  flagsImgContainer,
} from '@/styles/effect.css';
import Image from 'next/image';

// Main page effect component
export default function Effect() {
  return (
    <div className={effectContainer}>
      <Image
        src={'/assets/glitter.svg'}
        alt="glitter"
        width={0}
        height={0}
        className={glitterImg}
        priority
      />
      <div className={effect}>
        <div></div>
        <div className={flagsImgContainer}>
          <Image
            src={'/assets/flags.svg'}
            alt="flags"
            width={0}
            height={0}
            className={flagsImg}
          />
        </div>
        <div className={balloonContainer}>
          <Image
            src={'/assets/balloon/2.svg'}
            alt="balloon"
            width={0}
            height={0}
            className={balloon2}
          />
          <Image
            src={'/assets/balloon/1.svg'}
            alt="balloon"
            width={0}
            height={0}
            className={balloon1}
          />
          <Image
            src={'/assets/balloon/3.svg'}
            alt="balloon"
            width={0}
            height={0}
            className={balloon3}
          />
          <Image
            src={'/assets/balloon/4.svg'}
            alt="balloon"
            width={0}
            height={0}
            className={balloon4}
          />
          <Image
            src={'/assets/balloon/5.svg'}
            alt="balloon"
            width={0}
            height={0}
            className={balloon5}
          />
        </div>
      </div>
    </div>
  );
}
