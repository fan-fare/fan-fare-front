import { keyframes, style } from "@vanilla-extract/css";
import { flexCenterContainer, smallMobile, tablet, uiyeun } from "../common/common.css";

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
  top : "-2.5rem",
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

    '@media': {
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
  color: "#FE0303",
});

export const birthdayText = style({
  display: "block",
  fontSize: "0.875rem",
  fontWeight: 700,
  color: "#7E6262",
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


