import { keyframes, style } from "@vanilla-extract/css";
import { flexCenterContainer, tablet } from "../common/common.css";

export const effectContainer = style([
  {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    overflow: "hidden",
    zIndex: -10,
    top: 0,
  },
]);

export const effect = style([
  flexCenterContainer,
  {
    maxWidth: "500px",
    position: "relative",
    padding: "2rem 0",
    boxSizing: "border-box",
  },
]);

const glitterImgAnimation = keyframes({
  "0%": { opacity: 0.3 },
  "30%": { opacity: 1 },
  "100%": { opacity: 0.3 },
});

export const glitterImg = style({
  position: "absolute",
  top: "30%",
  width: "150%",
  height: "auto",
  overflow: "hidden",
  animation: `${glitterImgAnimation} 1.5s infinite`,
});

export const flagsImg = style({
  display: "block",
  position: "absolute",
  width: "230%",
  height: "auto",
  zIndex: 1,

  "@media": {
    [tablet]: {
      width: "150%",
    },
  },
});

export const papersImg = style({
  display: "block",
  position: "absolute",
  width: "100%",
  height: "auto",
  overflow: "hidden",
  bottom: 0,
});

export const balloonContainer = style({
  display: "flex",
  position: "relative",
  width: "100%",
  height: "100%",

  "@media": {
    [tablet]: {
      width: "90%",
    },
  },
});

export const balloonAnimation = keyframes({
  "0%": { transform: "translateY(0)" },
  "50%": { transform: "translateY(-10%)" },
  "100%": { transform: "translateY(0)" },
});

export const balloonBaseAnimation = keyframes({
  "0%": { transform: "translateY(200%)" },
  "50%": { transform: "translateY(-3%)" },
  "100%": { transform: "translateY(0)" },
});

export const balloonBase = style({
  position: "absolute",
  width: "auto",
  height: "auto",
  overflow: "hidden",
  scale: 1,
});
