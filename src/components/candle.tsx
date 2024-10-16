import { CandleType } from "@/interfaces/candles";
import Image from "next/image";
import styles from "./candle.module.css";
import { memo } from "react";

/**
 * Candle component
 * @param candleType type of candle
 * @param isGlittering whether the candle is glittering
 * @returns candle component
 */
export default memo(function Candle({
  candleType,
  isGlittering = false,
}: {
  candleType: CandleType;
  isGlittering?: boolean;
}) {
  // Constants
  const path = "/assets/candle/"; // path to candle images
  const candleMap = new Map<CandleType, string>([
    // candle image map
    ["CANDLE_COLOR_1", "candle1.svg"],
    ["CANDLE_COLOR_2", "candle2.svg"],
    ["CANDLE_COLOR_3", "candle3.svg"],
    ["CANDLE_COLOR_4", "candle4.svg"],
    ["CANDLE_COLOR_5", "candle5.svg"],
    ["CANDLE_COLOR_6", "candle6.svg"],
  ]);

  // Random glittering delay
  const glitteringDelay = Math.random() * 0.5;

  return (
    <div className={styles.candleImgContainer}>
      {isGlittering && (
        <div
          className={styles.glittering}
          style={{ animationDelay: `${glitteringDelay}s` }}
        ></div>
      )}
      <Image
        src={`${path}${candleMap.get(candleType)}`}
        alt={candleMap.get(candleType) || ""}
        width={0}
        height={0}
        className={styles.candleImg}
        loading="eager"
      />
    </div>
  );
});
