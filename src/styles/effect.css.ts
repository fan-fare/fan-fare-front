import { style } from '@vanilla-extract/css';
import { flexCenterContainer, pc, smallMobile } from './common/common.css';

export const effectContainer = style([
  {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    flexDirection: 'column',
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

export const glitterImg = style({
  position: 'absolute',
  top: '20%',
  width: '200%',
  height: 'auto',
  overflow: 'hidden',
});

export const flagsImg = style({
  position: 'absolute',
  top: '26%',
  width: 'auto',
  height: '14%',
  overflow: 'hidden',

  '@media': {
    [pc]: {
      top: '20%',
      height: '20%',
    },
  },
});

export const balloonContainer = style({
  position: 'absolute',
  width: '100%',
  height: '50%',
  bottom: 0,

  '@media': {
    [smallMobile]: {
      width: '120%',
    },
    [pc]: {
      width: '90%',
    },
  },
});

export const balloonProp = [
  {
    top: '35%',
    left: '-1%',
  },
  {
    top: '10%',
    left: '9%',
  },
  {
    bottom: '24%',
    right: '14%',
  },
  {
    bottom: '18%',
    right: '6%',
  },
  {
    bottom: '14%',
    right: '16%',
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
