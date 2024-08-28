import { memo } from 'react';
import Candle from './Candle';
import { CandleType } from '@/interfaces/candles';
import { candleName1, candleNameBase } from '@/styles/cake.css';
import { flexCenterContainer } from '@/styles/common/common.css';

/**
 * Cake candle component
 * @param candleType type of candle
 * @param candlePositionClass class for candle position
 * @param isGlittering whether the candle is glittering
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
