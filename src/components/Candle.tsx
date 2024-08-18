import { candleImg, candleImgContainer, glittering } from "@/styles/candle.css";
import Image from "next/image";

export default function Candle({
  id,
}: {
  id: number;
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
      <div className={glittering}></div>
      <Image
        src={`${path}${candleMap.get(id)}`}
        alt={candleMap.get(id) || ''}
        width={0}
        height={0}
        className={candleImg}
      />
    </div>
  );
}
