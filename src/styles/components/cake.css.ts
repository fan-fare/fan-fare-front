import { style } from '@vanilla-extract/css';
import { pc, smallMobile, tablet } from '../common/common.css';

export const cake = style({
  display: 'flex',
  flexDirection: 'column',
  width: '30%',
  height: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',

  '@media': {
    [smallMobile]: {
      width: '70%',
    },
    [tablet]: {
      width: '50%',
    },
    [pc]: {
      width: '280px',
      height: 'auto',
    },
  },
});

export const cakeImg = style({
  display: 'block',
  width: '100%',
  height: 'auto',
  filter: 'drop-shadow(0px 0px 6px #000000B2)',
  zIndex: 1,
});

export const candleProp = [
  {
    top: '-13%',
    left: '48%',
  },
  {
    top: '-19%',
    left: '31%',
  },
  {
    top: '-19%',
    right: '31%',
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

export const candleNameProp = [
  {
    top: 'calc(-13% - 10%)',
    left: 'calc(50% - 1.5rem)',
  },
  {
    top: 'calc(-19% + 10%)',
    right: 'calc(31% - 1% - 3rem)',
  },
  {
    top: 'calc(-19% + 10%)',
    left: 'calc(31% - 1% - 3rem)',
  },
  {
    top: 'calc(21% + 10%)',
    left: 'calc(9% - 1% - 3rem)',
  },
  {
    top: 'calc(21% + 10%)',
    right: 'calc(9% - 1% - 3rem)',
  },
];

export const candleNameBase = style({
  display: 'block',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  width: '3rem',
  height: 'auto',
  fontSize: '1rem',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const candle1 = style([candleBase, { ...candleProp[0] }]);
export const candle2 = style([candleBase, { ...candleProp[1] }]);
export const candle3 = style([candleBase, { ...candleProp[2] }]);
export const candle4 = style([candleBase, { ...candleProp[3] }]);
export const candle5 = style([candleBase, { ...candleProp[4] }]);

export const candleName1 = style([candleNameBase, { ...candleNameProp[0] }]);
export const candleName2 = style([candleNameBase, { ...candleNameProp[1] }]);
export const candleName3 = style([candleNameBase, { ...candleNameProp[2] }]);
export const candleName4 = style([candleNameBase, { ...candleNameProp[3] }]);
export const candleName5 = style([candleNameBase, { ...candleNameProp[4] }]);
