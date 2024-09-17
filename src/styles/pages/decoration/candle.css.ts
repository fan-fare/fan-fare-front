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

export const candleElementContainer = style({
  display: 'block',
  flexDirection: 'column',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#FFFFFFB2',
  width: '100%',
  aspectRatio: '1 / 1',
  borderRadius: '10px',
  boxShadow: '0px 4px 4px 0px #0000001A',
  border: '2px solid transparent',
});

export const candleElement = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  padding: '1rem',
})

export const activatedCandleElementContainer = style([
  candleElementContainer,
  {
    border: '2px solid #F58989',
  },
]);
