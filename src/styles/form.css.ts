import { style } from "@vanilla-extract/css";
import { uiyeun } from "./common/common.css";

export const formLabel = style({
  display: 'flex',
  width: '100%',
  fontWeight: 400,
  color: '#000000',
});

export const formInput = style({
  display: 'flex',
  width: '100%',
  padding: '0.5rem',
  boxSizing: 'border-box',
  border: 'none',
  borderRadius: '10px',
  fontSize: '1.5rem',
  textAlign: 'center',
  fontFamily: uiyeun,
  color: '#000000',
  justifyContent: 'center',
  backgroundColor: '#FFFFFF',
  WebkitAppearance: 'none',

  '::placeholder': {
    color: '#D9D9D9',
  },
});

