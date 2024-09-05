import { style } from '@vanilla-extract/css';

export const candleSelector = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr 1fr',
  gap: '1rem',
  width: '100%',
  height: 'auto',
  padding: '1rem',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyItems: 'center',
});

export const candleContainer = style({
  display: 'block',
  position: 'relative',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFFFFFB2',
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '10px',
  boxShadow: '0px 4px 4px 0px #0000001A',
  padding: '1rem',
  boxSizing: 'border-box',
});

export const activatedCandleContainer = style([
  candleContainer,
  {
    border: '2px solid #F58989',
  },
]);
