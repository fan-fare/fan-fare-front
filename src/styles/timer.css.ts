import { style } from '@vanilla-extract/css';
import { flexCenterContainer, uiyeun } from './common/common.css';

export const timerComponentContainer = style([
  flexCenterContainer,
  {
    flexDirection: 'column',
    position: 'relative',
    padding: '3rem 0',
    boxSizing: 'border-box',
  },
]);

export const endedTimerComponentContainer = style([
  timerComponentContainer,
  {
    flexDirection: 'column',
    position: 'relative',
    padding: '1rem 0 2rem 0',
    boxSizing: 'border-box',
  },
]);

export const boxesAndTimerContainer = style([
  flexCenterContainer,
  { flexDirection: 'column', position: 'relative' },
]);

export const timerContainer = style([
  flexCenterContainer,
  { flexDirection: 'column', gap: '0.5rem' },
]);

export const textBalloon = style({
  display: 'block',
  position: 'relative',
  width: 'auto',
  height: 'auto',
  fontSize: '1rem',
  textAlign: 'center',
  backgroundColor: '#FFFFFFB2',
  borderRadius: '6px',
  padding: '0.5rem 1rem',
  boxSizing: 'border-box',
  marginBottom: '0.5rem',
  fontFamily: uiyeun,
  fontWeight: 400,
  color: '#EA0000',

  '::after': {
    content: '""',
    borderTop: '15px solid #FFFFFFB2',
    borderLeft: '10px solid transparent',
    borderRight: '10px solid transparent',
    borderBottom: '0 solid transparent',
    position: 'absolute',
    bottom: '-15px',
    left: 'calc(50% - 15px)',
  },
});

export const boxesImg = style({
  display: 'block',
  position: 'absolute',
  width: '4rem',
  height: 'auto',
  top: '-1.5rem',
});

export const clickableBoxesImg = style({
  display: 'block',
  width: '7rem',
  height: 'auto',
  cursor: 'pointer',
});

export const timer = style({
  display: 'flex',
  flexDirection: 'row',
  width: '80%',
  height: '4.125rem',
  maxWidth: '25rem',
  boxSizing: 'border-box',
  border: '3px dashed #FE0303',
  borderRadius: '16px',
  backgroundColor: '#FFFFFFB2',
  boxShadow: '0px 4px 14px 0px #00000040',
});

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
