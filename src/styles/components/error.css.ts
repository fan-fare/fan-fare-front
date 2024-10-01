import { style } from "@vanilla-extract/css";
import { flexCenterContainer, pretendard } from "../common/common.css";

export const errorCompponent = style([
  flexCenterContainer,
  {
    flexDirection: "column",
    gap: "1rem",
  },
]);

export const errorComponentText = style({
  fontSize: "1.25rem",
  fontFamily: pretendard,
  fontWeight: 700,
  color: "#474747",
});
