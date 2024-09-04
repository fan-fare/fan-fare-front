import { style } from "@vanilla-extract/css";
import { flexCenterContainer, uiyeun } from "./common/common.css";

export const messageContainer = style({
  display: "flex",
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  width: "100vw",
  height: "100vw",
  boxSizing: "border-box",
  padding: "2.5rem",

  scrollSnapAlign: "center",
});

export const message = style([
  flexCenterContainer,
  {
    padding: "1.125rem",
    boxShadow: "0px 4px 4px 0px #00000040",
    boxSizing: "border-box",
    backgroundColor: "white",
    borderRadius: "10px",
  },
]);

export const messageContentContainer = style([
  flexCenterContainer,
  {
    flexDirection: "column",
    position: "relative",
    boxSizing: "border-box",
    borderRadius: "16px",
    border: "2px dashed #F58989",
    fontFamily: uiyeun,
    fontSize: "1.25rem",
    backgroundColor: "none",
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

