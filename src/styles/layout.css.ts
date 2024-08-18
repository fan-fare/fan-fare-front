import { style } from "@vanilla-extract/css";
import { uiyeun } from "./common/common.css";

export const prevPageLayout = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  gap: '2rem',
})

export const prevPageLink = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontFamily: uiyeun,
  textDecoration: 'none',
  fontSize: '1.5rem',
  width: '100%',
  padding: '1rem',
  boxSizing: 'border-box',
})

export const authLinksContainer = style({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  height: 'auto',
})

export const defaultLink = style({
  color: '#DADADA',
  fontSize: '1.5rem',
  textAlign: 'center',
  textDecoration: 'none',
  fontFamily: uiyeun,
});

export const activatedLink = style([defaultLink, {
  color: '#3E3E3E',
  cursor: 'default',

  ':after': {
    content: '""',
    display: 'block',
    width: '80%',
    borderBottom: '2px solid #000000',
    boxSizing: 'border-box',
    margin: 'auto',
  }
}])