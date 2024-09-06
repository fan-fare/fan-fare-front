import { style } from '@vanilla-extract/css';
import { flexCenterContainer, pc } from '../common/common.css';

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

export const effect = style([flexCenterContainer, {
  position: 'relative',
  padding: '2rem 0',
  boxSizing: 'border-box',
}]);

export const glitterImg = style({
  position: 'absolute',
  top: '20%',
  width: '150%',
  height: 'auto',
  overflow: 'hidden',
});

export const flagsImg = style({
  display: 'block',
  position: 'absolute',
  top: '27%',
  width: '230%',
  height: 'auto',
  overflow: 'hidden',
  zIndex: 1,

  '@media': {
    [pc]: {
      width: '100%',
    },
  },
});

export const papersImg = style({
  display: 'block',
  position: 'absolute',
  width: '100%',
  height: 'auto',
  overflow: 'hidden',
  bottom: 0,
})

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

export const balloonBase = style({
  position: 'absolute',
  width: 'auto',
  height: 'auto',
  overflow: 'hidden',
  scale: 1.3,
});