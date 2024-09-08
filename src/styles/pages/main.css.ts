import { style } from "@vanilla-extract/css";
import { flexCenterContainer, uiyeun } from "../common/common.css";
import { questionMark } from "./member/memberMain.css";

export const mainPageContainer = style([
  flexCenterContainer,
  {
    padding: "1rem",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    boxSizing: "border-box",
  },
]);

export const mainLogoImage = style({
  width: "80%",
  height: "auto",
  marginBottom: "1rem",
});

export const mainPageInfo = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  fontFamily: uiyeun,
  fontSize: "1.25rem",
  color: "#585858",
});

export const mainPageCakeContainer = style({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  boxSizing: "border-box",
});

export const buttonContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "1rem",
  padding: "1rem",
  boxSizing: "border-box",
});

export const mainPageBottomContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  padding: "1rem",
  boxSizing: "border-box",
  position: "absolute",
  bottom: 0,
});

export const teamInfoContainer = style({
  display: "flex",
  flexDirection: "row",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: "0.5rem",
  boxSizing: "border-box",
  borderBottom: "1.5px solid #747474",
});

export const teamNameImage = style({
  width: "7rem",
  height: "auto",
  maxWidth: "400px",
  maxHeight: "100px",
});

export const mainPageQuestionMark = style([
  questionMark,
  {
    fontSize: "1rem",
  },
]);

export const mainPageBottomText = style({
  display: "flex",
  width: "100%",
  height: "auto",
  fontFamily: uiyeun,
  fontSize: "1rem",
  color: "#747474",
  paddingTop: "0.5rem",
  boxSizing: "border-box",
});
