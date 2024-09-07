import { memo } from 'react';
import Candle from './Candle';
import { CandleType } from '@/interfaces/candles';
import { flexCenterContainer } from '@/styles/common/common.css';

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
}: {
  candleType: CandleType;
  candlePositionClass: string;
  isGlittering?: boolean;
  candleNamePositionClass: string;
  name: string;
}) {
  return (
    <div className={flexCenterContainer}>
      <div className={candleNamePositionClass}>{name}</div>
      <div className={candlePositionClass}>
        <Candle candleType={candleType} isGlittering={isGlittering} />
      </div>
    </div>
  );
});
