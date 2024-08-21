import { memo } from 'react';
import Candle from './Candle';
import { CandleType } from '@/interfaces/candles';

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
