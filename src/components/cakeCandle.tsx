import { memo } from "react";
import Candle from "./candle";
import { CandleType } from "@/interfaces/candles";
import Link from "next/link";
import styles from "./cakeCandle.module.css";

/**
 * Cake candle component
 * @param candleType type of candle
 * @param candlePositionClass class for candle position
 * @param isGlittering whether the candle is glittering
 * @param candleNamePositionClass class for candle name position
 * @param name name of the candle
 * @returns cake candle component
 */
export default memo(function CakeCandle({
  candleType,
  candlePositionClass,
  isGlittering = true,
  candleNamePositionClass,
  name,
  memberUuid,
  messageIndex,
  openMessageOnClick = false,
}: {
  candleType: CandleType;
  candlePositionClass: string;
  isGlittering?: boolean;
  candleNamePositionClass: string;
  name: string;
  memberUuid?: string;
  messageIndex: number;
  openMessageOnClick?: boolean;
}) {
  if (memberUuid && messageIndex > 0 && openMessageOnClick) {
    return (
      <Link
        href={`/${memberUuid}/message?default=${messageIndex}`}
        className={styles.container}
      >
        <div className={candleNamePositionClass}>{name}</div>
        <div className={candlePositionClass}>
          <Candle candleType={candleType} isGlittering={isGlittering} />
        </div>
      </Link>
    );
  }

  return (
    <div className={styles.container}>
      <div className={candleNamePositionClass}>{name}</div>
      <div className={candlePositionClass}>
        <Candle candleType={candleType} isGlittering={isGlittering} />
      </div>
    </div>
  );
});
