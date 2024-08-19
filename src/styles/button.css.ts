import { style } from '@vanilla-extract/css';
import { smallMobileWidth } from './common/common.css';

export const buttonDefault = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto',
  border: 'none',
  borderRadius: '16px',
  textDecoration: 'none',
  fontSize: '0.875rem',
  fontWeight: 700,
});

export const halfSize = style({
  width: '148px',
  height: '55px',

  '@media': {
    [smallMobileWidth]: {
      width: '122px',
      height: '48px',
    },
  },
});

export const fullSize = style({
  width: '100%',
  height: '55px',
});

export const buttonWhiteHalf = style([
  buttonDefault,
  halfSize,
  {
    backgroundColor: '#FFFFFF',
    color: '#474747',
  },
]);

export const buttonWhiteFull = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: '#FFFFFF',
    color: '#474747',
  },
]);

export const buttonPrimaryHalf = style([
  buttonDefault,
  halfSize,
  {
    backgroundColor: '#F58989',
    color: '#fff',
  },
]);

export const buttonPrimaryFull = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: '#F58989',
    color: '#fff',
  },
]);

export const buttonGrayHalf = style([
  buttonDefault,
  halfSize,
  {
    backgroundColor: '#D2D2D2',
    color: '#FFFFFF',
  },
]);

export const buttonGrayFull = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: '#D2D2D2',
    color: '#FFFFFF',
  },
]);

export const buttonDarkHalf = style([
  buttonDefault,
  halfSize,
  {
    backgroundColor: '#000000',
    color: '#fff',
  },
]);

export const buttonDarkFull = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: '#000000',
    color: '#fff',
  },
]);
