import { style } from "@vanilla-extract/css";
import {
  pc,
  pretendard,
  smallMobile,
  tablet,
  uiyeun,
} from "../../common/common.css";

export const cakePageWrapper = style({
  padding: "1rem 0",
  display: "flex",
  position: "relative",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "flex-start",

  "@media": {
    [pc]: {
      justifyContent: "center",
    },
  },
});

export const cakePageContainer = style({
  display: "flex",
  width: "100%",
  height: "fit-content",
  position: "relative",
  minHeight: "600px",
  flexDirection: "column",
  alignItems: "center",
  boxSizing: "border-box",

  "@media": {
    [pc]: {
      alignItems: "center",
      justifyContent: "center",
    },
  },
});

export const pageTop = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  height: "auto",
  padding: "0 2rem",
  boxSizing: "border-box",
  textDecoration: "none",

  "@media": {
    [smallMobile]: {
      padding: "0 1rem",
    },
  },
});

export const questionMark = style({
  display: "block",
  fontSize: "3rem",
  color: "#000000",
  opacity: "70%",

  ":active": {
    color: "#000000",
  },

  "@media": {
    [smallMobile]: {
      fontSize: "1.25rem",
    },
  },
});

export const timerContainer = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "auto",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
});

export const cakeContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  minHeight: "350px",
  maxHeight: "360px",
  aspectRatio: "1 / 1",
  alignItems: "center",
  justifyContent: "center",
  boxSizing: "border-box",
  position: "relative",

  "@media": {
    [tablet]: {
      minHeight: "360px",
    },
  },
});

export const cakeDisplay = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  backgroundColor: "none",
  position: "relative",

  overflowX: "auto",
  overflowY: "hidden",

  flexFlow: "row nowrap",

  scrollSnapType: "x mandatory",

  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
  scrollBehavior: "smooth",
  alignItems: "center",
  justifyContent: "center",
});

export const cakeDisplayItem = style({
  display: "flex",
  width: "100%",
  height: "auto",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  boxSizing: "border-box",
  scrollSnapAlign: "center",
});

export const cakePageCountContainer = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "78px",
  height: "32px",
  color: "#F58989",
  fontWeight: 700,
  fontFamily: pretendard,
  fontSize: "0.875rem",
  letterSpacing: "0.05em",
  whiteSpace: "nowrap",
  borderRadius: "98px",
  backgroundImage:
    "linear-gradient(#fff, #fff), linear-gradient(99deg, #FEE9E6 7.8%, #B9E1E7 100%)",
  border: "1px solid transparent",
  backgroundOrigin: "border-box",
  backgroundClip: "content-box, border-box",

  "@media": {
    [smallMobile]: {
      fontSize: "0.75rem",
    },
    [tablet]: {
      fontSize: "1rem",
    },
  },
});

export const cakePageBottomContainer = style({
  display: "flex",
  bottom: "0",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  height: "100%",
  justifyContent: "flex-end",
  padding: "1rem 0",

  "@media": {
    [pc]: {
      paddingTop: "2rem",
      position: "relative",
      height: "auto",
    },
  },
});

export const fullButtonContainer = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  alignItems: "center",
  padding: "0 2rem",
  boxSizing: "border-box",
  gap: "1rem",
  fontSize: "0.75rem",
  fontWeight: 700,
});

export const halfButtonContainer = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: "1rem",
  fontSize: "0.75rem",
  fontWeight: 700,
});

export const logoutButtonContainer = style({
  display: "flex",
  width: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-end",
  padding: "1rem 2rem",
  boxSizing: "border-box",
});

export const logoutButton = style({
  display: "block",
  textAlign: "center",
  gap: "1rem",
  color: "#872B2B",
  fontSize: "1rem",
  fontWeight: 400,
  fontFamily: uiyeun,
});
