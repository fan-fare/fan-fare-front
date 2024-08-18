import { style } from '@vanilla-extract/css';
import { fullScreenContainer, pretendard } from '../common/common.css';

export const mainPageContainer = style([
  fullScreenContainer,
  {
    display: 'grid',
    placeItems: 'center',
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr 1fr 3fr 1fr',
  },
]);

export const pageTop = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '2rem',
  boxSizing: 'border-box',
});

export const pageTopText = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
});

export const cakeTitle = style({
  display: 'flex',
  width: 'auto',
  fontSize: '1.75rem',
  fontWeight: 800,
  alignItems: 'center',
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
});

export const questionMark = style({
  display: 'block',
  fontSize: '1.5rem',
  color: '#160042',
  opacity: '70%',
});

export const cakeContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '2rem',
  padding: '3rem',
  boxSizing: 'border-box',
});

export const cakePageDotContainer = style({
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
});

export const buttonContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
});
