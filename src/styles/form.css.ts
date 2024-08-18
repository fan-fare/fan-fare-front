import { style } from "@vanilla-extract/css";
import { uiyeun } from "./common/common.css";

export const formLabel = style({
  display: 'block',
  fontWeight: 400,
  color: '#000000',
});

export const formInput = style({
  display: 'block',
  width: '100%',
  padding: '0.5rem',
  boxSizing: 'border-box',
  border: 'none',
  borderRadius: '10px',
  fontSize: '1.5rem',
  textAlign: 'center',
  fontFamily: uiyeun,
  color: '#000000',

  '::placeholder': {
    color: '#D9D9D9',
  },
});

