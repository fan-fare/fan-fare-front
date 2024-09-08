import { style } from '@vanilla-extract/css';
import { flexCenterContainer, pc, uiyeun } from '../../common/common.css';
import { formInput, formLabel } from '@/styles/common/form.css';

export const authPageContainer = style({
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
  minHeight: '650px',

  '@media': {
    [pc]: {
     paddingTop: '3rem',
     paddingBottom: '3rem',
    },
  },
})

export const authPageWrapper = style({
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

export const authForm = style({
  display: 'flex',
  width: '100%',
  height: '100%',
  padding: '2rem',
  flexDirection: 'column',
  gap: '1rem',
  boxSizing: 'border-box',
});

export const formElement = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '0.5rem',
});

export const authFormLabel = style([formLabel, {
  fontSize: '1.5rem',
  marginLeft: '0.5rem',
}]);

export const authFormInput = style([formInput,{
  height: '2.75rem',
}]);

export const authFormButtonContainer = style({
  display: 'flex',
  height: '100%',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});
