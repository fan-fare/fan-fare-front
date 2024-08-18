import { style } from '@vanilla-extract/css';
import { flexCenterContainer } from './common/common.css';

export const timerContainer = style([
  {
    display: 'flex',
    width: '100%',
    height: 'auto',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    gap: '0.5rem',
    padding: '2rem',
    boxSizing: 'border-box',
  },
]);

export const boxesImg = style({
  display: 'block',
  position: 'absolute',
  width: '4rem',
  height: 'auto',
  top: 0,
});

export const timer = style(
  {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '4.125rem',
    maxWidth: '25rem',
    boxSizing: 'border-box',
    border: '3px dashed #FE0303',
    borderRadius: '16px',
    backgroundColor: '#FFFFFFB2',
    boxShadow: '0px 4px 14px 0px #00000040',
  },
);

export const timerContent = style([
  flexCenterContainer,
  {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
  },
]);

export const timerText = style({
  display: 'block',
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#FE0303',
});

export const birthdayText = style({
  display: 'block',
  fontSize: '0.875rem',
  fontWeight: 700,
  color: '#7E6262',
});
