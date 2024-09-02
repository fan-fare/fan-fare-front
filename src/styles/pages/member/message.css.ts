import { flexCenterContainer, uiyeun } from "@/styles/common/common.css";
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

export const messagePageContentContainer = style({
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
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  boxSizing: "border-box",
});

export const messageContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  aspectRatio: "1 / 1",
  backgroundColor: "white",
  borderRadius: "10px",
  boxSizing: "border-box",
  padding: "1.125rem",
  boxShadow: "0px 4px 4px 0px #00000040",
});

export const MessageContentContainer = style([
  flexCenterContainer,
  {
    flexDirection: "column",
    position: "relative",
    boxSizing: "border-box",
    borderRadius: "16px",
    border: "2px dashed #F58989",
    fontFamily: uiyeun,
    fontSize: "1.25rem",
  },
]);

export const messageText = style([
  flexCenterContainer,
  {
    color: "#474747",
    fontWeight: 400,
  },
]);

export const messageInfoContainer = style({
  display: "flex",
  position: "absolute",
  bottom: 0,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  boxSizing: "border-box",
  padding: "1rem",
});

export const messageInfo = style({
  display: "block",
  color: "#474747",
  fontWeight: 400,
});

export const navigationIcon = style({
  display: "block",
  fontSize: "3rem",
  margin: "0.25rem",
  boxSizing: "border-box",
});
