import { pc, smallMobile, tablet } from "@/styles/common/common.css";
import { formInput } from "@/styles/common/form.css";
import { style } from "@vanilla-extract/css";

export const decoFormContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  padding: '0 2rem',
  boxSizing: 'border-box',
});

export const decoForm = style({
  display: 'flex',
  position: 'relative',
  width: '100%',
  height: '100%',
  flexDirection: 'column',
  boxSizing: 'border-box',
  gap: '1rem',
});

export const decoFormInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
});

export const decoFormTextArea = style([
  formInput,
  {
    display: 'block',
    height: '15rem',
    boxSizing: 'border-box',
    alignContent: 'center',
    justifyContent: 'center',

    '@media': {
      [smallMobile]: {
        height: '13rem',
      },
      [tablet]: {
        height: '17rem',
      },
      [pc]: {
        height: '20rem',
      }
    },
  },
]);

export const decoFormNickname = style([
  formInput,
  {
    height: '3rem',
  },
]);
