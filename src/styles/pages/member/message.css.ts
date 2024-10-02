import { pretendard } from "@/styles/common/common.css";
import { style } from "@vanilla-extract/css";

export const messagePageContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  padding: "2rem 0",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "flex-start",
});

export const messagePageMain = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});

export const messageDisplayContainer = style({
  display: "flex",
  position: "relative",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  boxSizing: "border-box",
});

// Message display container
export const messageDisplay = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  aspectRatio: "1 / 1",
  backgroundColor: "none",
  position: "relative",

  overflowX: "auto",
  overflowY: "hidden",

  flexFlow: "row nowrap",

  scrollSnapType: "x mandatory",

  // Hide scrollbar
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },

  // Scroll slowly
  scrollBehavior: "smooth",
});

export const navigationIcon = style({
  display: "block",
  position: "absolute",
  fontSize: "2rem",
  margin: "0.25rem",
  boxSizing: "border-box",
  zIndex: 10,
});

export const messageDeleteModalContainer = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  padding: "1.5rem 4rem",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#F58989",
});

export const messageDeleteModal = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "space-between",
});

export const messageDeleteModalText = style({
  fontSize: "0.875rem",
  boxSizing: "border-box",
  color: "#fff",
  fontWeight: 700,
  fontFamily: pretendard,
});

export const messageDeleteModalButton = style([
  messageDeleteModalText,
  {
    textDecoration: "underline",
    textUnderlineOffset: "0.2rem",
    textDecorationThickness: "0.1rem",
  },
]);
