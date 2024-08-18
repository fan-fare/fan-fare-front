import { style } from '@vanilla-extract/css';
import { pcWidth } from './common/common.css';

export const cake = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  maxWidth: '300px',
  position: 'relative',

  '@media': {
    [pcWidth]: {
      width: '30%',
    },
  },
});

export const cakeImg = style({
  display: 'block',
  width: '100%',
  height: 'auto',
});

export const candleProp = [
  {
    top: '-12%',
    right: '48%',
  },
  {
    top: '-17%',
    right: '60%',
  },
  {
    top: '-17%',
    left: '60%',
  },
  {
    top: '21%',
    left: '9%',
  },
  {
    top: '21%',
    right: '9%',
  },
];

export const candleBase = style({
  display: 'block',
  width: '4%',
  height: 'auto',
  position: 'absolute',
});

export const candle1 = style([candleBase, { ...candleProp[0] }]);
export const candle2 = style([candleBase, { ...candleProp[1] }]);
export const candle3 = style([candleBase, { ...candleProp[2] }]);
export const candle4 = style([candleBase, { ...candleProp[3] }]);
export const candle5 = style([candleBase, { ...candleProp[4] }]);
export const candle6 = style([candleBase, { ...candleProp[5] }]);