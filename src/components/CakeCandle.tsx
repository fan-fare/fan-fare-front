import { memo } from 'react';
import Candle from './Candle';
import { CandleType } from '@/interfaces/candles';


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
}: {
  candleType: CandleType;
  candlePositionClass: string;
  isGlittering?: boolean;
}) {
  return (
    <div className={candlePositionClass}>
      <Candle candleType={candleType} isGlittering={isGlittering} />
    </div>
  );
});
