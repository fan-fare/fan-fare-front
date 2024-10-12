import styles from "./cake.module.css";
import Image from "next/image";
import CakeCandle from "./cakeCandle";
import { CakeType } from "@/interfaces/cakes";
import { CandleType } from "@/interfaces/candles";

/**
 * @param cakeType type of cake
 * @param candles array of candles
 * @param names array of names
 * @returns cake component
 */
export default function Cake({
  cakeType = "default",
  candles,
  names,
  memberUuid,
  cakeIndex,
  openMessageOnClick = false,
}: {
  cakeType?: CakeType;
  candles?: Array<CandleType>;
  names?: Array<string>;
  memberUuid?: string;
  cakeIndex?: number;
  openMessageOnClick?: boolean;
}) {
  // Constants
  const candlePositions = [
    styles.candle1,
    styles.candle2,
    styles.candle3,
    styles.candle4,
    styles.candle5,
  ]; // candle positions
  const candleNamePositions = [
    styles.candleName1,
    styles.candleName2,
    styles.candleName3,
    styles.candleName4,
    styles.candleName5,
  ]; // candle name positions
  const cakeImage = new Map<CakeType, string>([
    ["default", "default.svg"],
    ["brown_white", "brown_white.svg"],
    ["choco", "choco.svg"],
    ["lightgreen_white", "lightgreen_white.svg"],
    ["matcha", "matcha.svg"],
    ["mint_choco", "mint_choco.svg"],
    ["orange", "orange.svg"],
    ["orange_white", "orange_white.svg"],
    ["pink_white", "pink_white.svg"],
    ["purple_white", "purple_white.svg"],
    ["vanilla_choco", "vanilla_choco.svg"],
    ["red_choco", "red_choco.svg"],
    ["white_pink", "white_pink.svg"],
  ]); // cake image map

  const messageIndexStart = (cakeIndex ?? 0) * 5 + 1;
  const messageIndexes = Array.from({ length: candles?.length ?? 0 }).map(
    (_, i) => i + messageIndexStart,
  );

  return (
    <div className={styles.cakeComponentContainer}>
      <div className={styles.cake}>
        {candles &&
          names &&
          candles.map(
            (candle, i) =>
              candlePositions.length > i && (
                <CakeCandle
                  key={i}
                  candleType={candle}
                  candlePositionClass={`${candlePositions[i]} ${styles.candleBase}`}
                  candleNamePositionClass={`${candleNamePositions[i]} ${styles.candleNameBase}`}
                  name={names[i]}
                  memberUuid={memberUuid}
                  messageIndex={messageIndexes ? messageIndexes[i] : 0}
                  openMessageOnClick={openMessageOnClick}
                />
              ),
          )}
        <Image
          src={`/assets/cake/${cakeImage.get(cakeType)}`}
          alt="cake"
          width={0}
          height={0}
          className={styles.cakeImg}
          priority
        />
      </div>
    </div>
  );
}
