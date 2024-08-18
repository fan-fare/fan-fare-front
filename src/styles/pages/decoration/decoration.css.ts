import {
  flexCenterContainer,
  pretendard,
  uiyeun,
} from '@/styles/common/common.css';
import { formInput } from '@/styles/form.css';
import { style } from '@vanilla-extract/css';

export const decoPageContainer = style([
  flexCenterContainer,
  {
    fontFamily: uiyeun,
    flexDirection: 'column',
    paddingTop: '3rem',
    paddingBottom: '3rem',
    maxWidth: '40rem',
  },
]);

export const decoMessage = style({
  display: 'block',
  fontSize: '2.5rem',
  fontWeight: 400,
  color: '#3E3E3E',
  marginBottom: '1rem',
});

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
  display: 'flex',
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

export const decoForm = style({
  display: 'flex',
  width: '100%',
  height: 'auto',
  padding: '2rem',
  flexDirection: 'column',
  gap: '1rem',
  boxSizing: 'border-box',
});

export const decoButtonContainer = style({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  fontFamily: pretendard,
});

export const decoFormTextArea = style([
  formInput,
  {
    display: 'block',
    height: '15rem',
    boxSizing: 'border-box',
    alignContent: 'center',
    justifyContent: 'center',
  },
]);

export const decoFormNickname = style([
  formInput,
  {
    height: '3rem',
  },
]);
