import { pc, pretendard, uiyeun } from "@/styles/common/common.css";
import { style } from "@vanilla-extract/css";

export const decoPageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  fontFamily: uiyeun,
  alignItems: 'center',
  justifyContent: 'center',

  '@media': {
    [pc]: {
     paddingTop: '3rem',
     paddingBottom: '3rem',
    },
  },
})

export const decoPageWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  gap: '1rem',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

export const prevPageContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: 'auto',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '1rem',
  boxSizing: 'border-box',
})

export const decoMessage = style({
  display: 'flex',
  fontSize: '2.5rem',
  fontWeight: 400,
  color: '#3E3E3E',
  width: '100%',
  textAlign: 'center',
  justifyContent: 'center',
})

export const decoBtnContainer = style({
  display: 'flex',
  flexDirection: 'column',

  position: 'absolute',
  bottom: 0,

  fontFamily: pretendard,
  fontSize: '0.875rem',

  width: '100%',
  boxSizing: 'border-box',
  alignItems: 'center',
  justifyContent: 'center',
})
