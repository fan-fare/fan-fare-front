import { style } from "@vanilla-extract/css";
import { uiyeun } from "../common/common.css";

export const prevLink = style({
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
  width: "100%",
  alignItems: "center",

  fontFamily: uiyeun,
  textDecoration: "none",
  fontSize: "1.5rem",
  color: "#3E3E3E",

  ":active": {
    color: "#3E3E3E",
  },
});
