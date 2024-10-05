import {
  cake,
  cakeComponentContainer,
  cakeImg,
  candle1,
  candle2,
  candle3,
  candle4,
  candle5,
  candleName1,
  candleName2,
  candleName3,
  candleName4,
  candleName5,
} from "@/styles/components/cake.css";
import Image from "next/image";
import CakeCandle from "./CakeCandle";
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
  const candlePositions = [candle1, candle2, candle3, candle4, candle5]; // candle positions
  const candleNamePositions = [
    candleName1,
    candleName2,
    candleName3,
    candleName4,
    candleName5,
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
    <div className={cakeComponentContainer}>
      <div className={cake}>
        {candles &&
          names &&
          candles.map(
            (candle, i) =>
              candlePositions.length > i && (
                <CakeCandle
                  key={i}
                  candleType={candle}
                  candlePositionClass={candlePositions[i]}
                  candleNamePositionClass={candleNamePositions[i]}
                  name={names[i]}
                  memberUuid={memberUuid}
                  messageIndex={messageIndexes ? messageIndexes[i] : 0}
                  canOpenMessage={openMessageOnClick}
                />
              ),
          )}
        <Image
          src={`/assets/cake/${cakeImage.get(cakeType)}`}
          alt="cake"
          width={0}
          height={0}
          className={cakeImg}
          loading="eager"
        />
      </div>
    </div>
  );
}
