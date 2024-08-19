import { memo } from 'react';
import Candle from './Candle';

export default memo(function CakeCandle({
  id,
  candlePositionClass,
  isGlittering = true,
}: {
  id: number;
  candlePositionClass: string;
  isGlittering?: boolean;
}) {
  return (
    <div className={candlePositionClass}>
      <Candle id={id} isGlittering={isGlittering} />
    </div>
  );
});
