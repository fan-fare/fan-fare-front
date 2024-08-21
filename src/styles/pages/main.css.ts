import { style } from '@vanilla-extract/css';
import {
  pc,
  pretendard,
  smallMobile,
  tablet,
} from '../common/common.css';

export const mainPageContainer = style({
  display: 'grid',
  width: '100%',
  height: '100%',
  placeItems: 'center',
  gridTemplateColumns: '1fr',
  gridTemplateRows: '1fr 2fr 3fr 2fr',
  padding: '2rem 0',
  boxSizing: 'border-box',

  '@media': {
    [pc]: {
    gridTemplateRows: '1fr 1fr 3fr 1fr',
      width: '680px',
      height: '100%',
    },
  },
});

export const pageTop = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '0 2rem',
  boxSizing: 'border-box',

  '@media': {
    [smallMobile]: {
      padding: '0 1rem',
    },
  },
});

export const pageTopText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',

  '@media': {
    [smallMobile]: {
      gap: '0.125rem',
    },
  },
});

export const cakeTitle = style({
  display: 'flex',
  width: 'auto',
  fontSize: '1.75rem',
  fontWeight: 800,
  alignItems: 'center',

  '@media': {
    [smallMobile]: {
      fontSize: '1.5rem',
    },
  },
});

export const textPoint = style({
  color: '#F58989',
});

export const cakeMessage = style({
  display: 'flex',
  fontSize: '1rem',
  fontWeight: 600,
  letterSpacing: '-0.05em',
  color: '#160042',

  '@media': {
    [smallMobile]: {
      fontSize: '0.875rem',
    },
  },
});

export const questionMark = style({
  display: 'block',
  fontSize: '1.5rem',
  color: '#160042',
  opacity: '70%',

  '@media': {
    [smallMobile]: {
      fontSize: '1.25rem',
    },
  },
});

export const cakeContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  padding: '1rem 3rem 1rem 3rem',
  boxSizing: 'border-box',

  '@media': {
    [smallMobile]: {
      padding: '1rem 3rem',
      gap: '1rem',
    },
  },
});

export const cakePageCountContainer = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#FFFFFFB2',
  width: '6rem',
  height: 'auto',
  padding: '0.5rem',
  boxSizing: 'border-box',
  borderRadius: '98px',
  color: '#F58989',
  fontWeight: 700,
  fontFamily: pretendard,
  boxShadow: '0px 4px 4px 0px #0000001A',
  letterSpacing: '0.05em',
  whiteSpace: 'nowrap',
  minWidth: '6rem',

  '@media': {
    [smallMobile]: {
      fontSize: '0.75rem',
    },
    [tablet]: {
      fontSize: '1rem',
    },
  },
});

export const fullButtonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  padding: '0 2rem',
  boxSizing: 'border-box',
  gap: '1rem',
});

export const halfButtonContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
});
