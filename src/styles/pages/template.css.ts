import { keyframes, style } from "@vanilla-extract/css";
import { pretendard } from "../common/common.css";

const errorPopupAnimation = keyframes({
  "0%": {
    transform: "translateY(150%)",
  },
  "10%": {
    transform: "translateY(0)",
  },
  "90%": {
    transform: "translateY(0)",
  },
  "100%": {
    transform: "translateY(150%)",
  },
});

export const errorContainer = style({
  display: "flex",
  fontFamily: pretendard,
  position: "absolute",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1rem",
  margin: "1rem",
  backgroundColor: "#FF7B7B",
  boxSizing: "border-box",
  borderRadius: "10px",

  maxWidth: "300px",

  bottom: 0,
  right: 0,

  transform: "translateY(150%)",

  animation: `${errorPopupAnimation} 3s`,
});
  
export const errorText = style({
  display: "block",
  width: "100%",
  textAlign: "center",
  fontSize: "0.875rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  color: "white",
  fontWeight: 700,
  fontFamily: pretendard,
});
