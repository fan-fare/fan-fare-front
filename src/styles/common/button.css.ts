import { style } from "@vanilla-extract/css";
import { smallMobile } from "./common.css";

export const buttonDefault = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto",
  border: "none",
  borderRadius: "16px",
  textDecoration: "none",
});

export const halfSize = style({
  width: "148px",
  height: "55px",

  "@media": {
    [smallMobile]: {
      width: "134px",
      height: "48px",
    },
  },
});

export const fullSize = style({
  width: "100%",
  height: "55px",
});

export const buttonWhiteHalf = style([
  buttonDefault,
  halfSize,
  {
    backgroundColor: "#FFFFFF",
    color: "#474747",
  },
]);

export const buttonWhiteFull = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: "#FFFFFF",
    color: "#474747",
  },
]);

export const buttonPinkFull = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: "#F589A9",
    color: "#fff",
  },
]);

export const buttonPrimaryHalf = style([
  buttonDefault,
  halfSize,
  {
    backgroundColor: "#F58989",
    color: "#fff",
  },
]);

export const buttonPrimaryFull = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: "#F58989",
    color: "#fff",
  },
]);

export const disabledButtonHalf = style([
  buttonDefault,
  halfSize,
  {
    backgroundColor: "#D2D2D2",
    color: "#FFFFFF",
    pointerEvents: "none",
  },
]);

export const disabledButtonGray = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: "#D2D2D2",
    color: "#FFFFFF",
    pointerEvents: "none",
  },
]);

export const buttonDarkHalf = style([
  buttonDefault,
  halfSize,
  {
    backgroundColor: "#000000",
    color: "#fff",
  },
]);

export const buttonDarkFull = style([
  buttonDefault,
  fullSize,
  {
    backgroundColor: "#000000",
    color: "#fff",
  },
]);

export const buttonWhiteLinkFull = style([
  buttonWhiteFull,
  {
    backgroundImage:
      "linear-gradient(#fff, #fff), linear-gradient(99deg, #FEE9E6 7.8%, #B9E1E7 100%)",
    border: "2px solid transparent",
    backgroundOrigin: "border-box",
    backgroundClip: "content-box, border-box",
  },
]);

export const buttonShadow = style({
  boxShadow: "0px 4px 4px 0px #0000001A",
});
