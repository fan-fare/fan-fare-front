import { style } from '@vanilla-extract/css';
import { pc, pretendard, smallMobile, tablet } from '../../common/common.css';

export const cakePageContainer = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2rem 0',
  boxSizing: 'border-box',

  '@media': {
    [pc]: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
});

export const pageTop = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  padding: '0 2rem',
  boxSizing: 'border-box',
  textDecoration: 'none',

  '@media': {
    [smallMobile]: {
      padding: '0 1rem',
    },
  },
});

export const questionMark = style({
  display: 'block',
  fontSize: '1.5rem',
  color: '#160042',
  opacity: '70%',

  ':active': {
    color: '#160042',
  },

  '@media': {
    [smallMobile]: {
      fontSize: '1.25rem',
    },
  },
});

export const  timerContainer = style({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  height: 'auto',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem 0',
});

export const cakeContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '60%',
  maxWidth: '300px',
  height: 'auto%',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  paddingTop: '3rem',
  boxSizing: 'border-box',
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

export const cakePageBottomContainer = style({
  display: 'flex',
  position: 'absolute',
  bottom: '0',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  height: 'auto',
  padding: '1rem 0',

  '@media': {
    [pc]: {
      position: 'relative',
    },
  },
});

export const fullButtonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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
