import { style } from '@vanilla-extract/css';
import { flexCenterContainer, uiyeun } from '../../common/common.css';
import { formInput, formLabel } from '@/styles/form.css';

export const authPageContainer = style([
  flexCenterContainer,
  {
    fontFamily: uiyeun,
    flexDirection: 'column',
    fontSize: '1.5rem',
    paddingTop: '3rem',
    paddingBottom: '1rem',
    maxWidth: '60rem'
  },
]);

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
