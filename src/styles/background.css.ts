import { style } from '@vanilla-extract/css';

export const backgroundImg = style({
  position: 'fixed',
  // center
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'fill',
  objectPosition: 'center',
  zIndex: -100,

  // Prevent the image from being selectable
  userSelect: 'none',
  pointerEvents: 'none',
  touchAction: 'none',
});
