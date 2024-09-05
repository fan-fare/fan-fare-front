import { style } from "@vanilla-extract/css";
import { smallMobile } from "../common/common.css";

export const cakeNameContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  gap: "0.25rem",
});

export const cakeTitle = style({
  display: "flex",
  width: "auto",
  fontSize: "1.75rem",
  fontWeight: 800,
  alignItems: "center",
  color: "black",

  "@media": {
    [smallMobile]: {
      fontSize: "1.5rem",
    },
  },

  ":active": {
    color: "black",
  },
});

export const textPoint = style({
  color: "#F58989",

  ":active": {
    color: "#F58989",
  },
});

export const cakeMessage = style({
  display: "flex",
  fontSize: "1rem",
  fontWeight: 600,
  letterSpacing: "-0.05em",
  color: "black",

  "@media": {
    [smallMobile]: {
      fontSize: "0.875rem",
    },
  },

  ":active": {
    color: "black",
  },
});
