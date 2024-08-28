import { style } from '@vanilla-extract/css';
import { pc } from './common/common.css';

export const effectContainer = style([
  {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    overflow: 'hidden',
    zIndex: -10,

    '@media': {
      [pc]: {
        width: '680px',
        height: '100%',
      },
    },
  },
]);

export const effect = style({
  display: 'grid',
  width: '100%',
  height: '100%',
  position: 'relative',
  placeItems: 'center',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1.8fr 1fr 4fr',
  padding: '2rem 0',
  boxSizing: 'border-box',

  '@media': {
    [pc]: {
      gridTemplateColumns: '1fr',
      gridTemplateRows: '1.5fr 1fr 4fr',
    },
  },
});

export const glitterImg = style({
  position: 'absolute',
  top: '20%',
  width: '150%',
  height: 'auto',
  overflow: 'hidden',
});

export const flagsImgContainer = style({
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
});

export const flagsImg = style({
  display: 'block',
  position: 'absolute',
  width: '230%',
  height: 'auto',
  overflow: 'hidden',

  '@media': {
    [pc]: {
      width: '100%',
    },
  },
});

export const balloonContainer = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',

  '@media': {
    [pc]: {
      width: '90%',
    },
  },
});

export const balloonProp = [
  {
    bottom: '10%',
    left: '0%',
  },
  {
    bottom: '40%',
    left: '9%',
  },
  {
    bottom: '8%',
    right: '14%',
  },
  {
    bottom: '3%',
    right: '6%',
  },
  {
    bottom: '0%',
    right: '12%',
  },
];

export const balloonBase = style({
  position: 'absolute',
  width: 'auto',
  height: 'auto',
  overflow: 'hidden',
  scale: 1.3,
});

export const balloon1 = style([balloonBase, { ...balloonProp[0] }]);
export const balloon2 = style([balloonBase, { ...balloonProp[1] }]);
export const balloon3 = style([balloonBase, { ...balloonProp[2] }]);
export const balloon4 = style([balloonBase, { ...balloonProp[3] }]);
export const balloon5 = style([balloonBase, { ...balloonProp[4] }]);
