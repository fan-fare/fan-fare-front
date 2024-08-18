import { keyframes, style } from "@vanilla-extract/css";

export const candleImgContainer = style({
  display: 'block',
  position: 'relative',
  width: 'auto',
  height: '100%',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
});

export const candleImg = style({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
});

// glitter animation
const glitteringCandle = keyframes({
  '0%': { opacity: 0.5 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0.5 },
});

export const glittering = style({
  display: 'block',
  position: 'absolute',
  width: '300%',
  height: 'auto',
  aspectRatio: '1 / 1',
  top: 0,
  left: '-100%',
  background: `radial-gradient(50% 50% at 50% 50%, #FFF6DA 0%, rgba(255, 247, 222, 0) 100%)`,
  animation: `${glitteringCandle} 3s infinite`,
});
