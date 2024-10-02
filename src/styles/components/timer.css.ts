import { keyframes, style } from "@vanilla-extract/css";
import {
  flexCenterContainer,
  lotteria,
  tablet,
  uiyeun,
} from "../common/common.css";

export const timerComponentContainer = style({
  display: "flex",
  width: "80%",
  height: "auto",
  flexDirection: "column",
  paddingTop: "2rem",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
});

export const timerContainer = style([
  flexCenterContainer,
  {
    flexDirection: "column",
    position: "relative",
    padding: "1rem",
    border: "3px dashed #FE0303",
    borderRadius: "16px",
    backgroundColor: "#FFFFFFB2",
    boxShadow: "0px 4px 14px 0px #00000040",
    boxSizing: "border-box",
    maxWidth: "25rem",
  },
]);

export const boxesImg = style({
  display: "block",
  position: "absolute",
  width: "4rem",
  height: "4rem",
  top: "-2.5rem",
  left: "calc(50% - 2rem)",
});

export const timer = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "auto",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center",
});

export const timerContent = style([
  flexCenterContainer,
  {
    flexDirection: "row",
    alignItems: "center",
    gap: "1rem", // gap between timer texts

    "@media": {
      [tablet]: {
        gap: "3rem",
      },
    },
  },
]);

export const timerText = style({
  display: "flex",
  height: "auto",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.5rem",
  fontWeight: 700,
  color: "#FF0000",
});

export const birthdayText = style({
  display: "block",
  fontFamily: uiyeun,
  fontWeight: 400,
  fontSize: "16px",
  color: "#F58989",
});

// Ended Timer Component
export const endedTimerComponentContainer = style([
  timerComponentContainer,
  {
    flexDirection: "column",
    position: "relative",
    padding: "1rem 0",
    boxSizing: "border-box",
  },
]);

export const textBalloon = style({
  display: "block",
  position: "relative",
  width: "auto",
  height: "auto",
  fontSize: "1rem",
  textAlign: "center",
  backgroundColor: "#FFFFFFB2",
  borderRadius: "6px",
  padding: "0.5rem 1rem",
  boxSizing: "border-box",
  marginBottom: "-0.5rem",
  fontFamily: uiyeun,
  fontWeight: 400,
  color: "#EA0000",

  "::after": {
    content: '""',
    borderTop: "15px solid #FFFFFFB2",
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderBottom: "0 solid transparent",
    position: "absolute",
    bottom: "-15px",
    left: "calc(50% - 15px)",
  },
});

const boxesSclaeAnimation = keyframes({
  "0%": { transform: "scale(1)" },
  "50%": { transform: "scale(1.1)" },
  "100%": { transform: "scale(1)" },
});

export const clickableBoxesImg = style({
  display: "block",
  width: "7rem",
  height: "auto",
  cursor: "pointer",
  animation: `${boxesSclaeAnimation} 2s infinite`,
});

export const birthdayLogoContainer = style({
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  paddingTop: "2rem",
  zIndex: -100,
  position: "relative",
  width: "100%",
  height: "auto",
  alignItems: "center",
  justifyContent: "center",
});

export const birthdayLogoBoxImg = style({
  display: "block",
  position: "absolute",
  top: 0,
  width: "4rem",
  height: "4rem",
});

export const birthdayLogoBackground = style({
  display: "flex",
});

export const birthdayLogoText = style({
  display: "block",
  position: "absolute",
  zIndex: 1,
  top: "calc(50% - 0.625rem)",
  fontFamily: lotteria,
  fontSize: "1.875rem",
  fontWeight: 400,
  lineHeight: "1.25rem",
  color: "#FFFFFF",
  textShadow:
    "2px 2px 0 #F58989, -2px -2px 0 #F58989, 2px -2px 0 #F58989, -2px 2px 0 #F58989",
});
