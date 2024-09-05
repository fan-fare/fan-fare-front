import { style } from "@vanilla-extract/css";

export const mainContainer = style({
  display: "flex",
  width: "100%",
  height: "100%",
  // tablet size is maximum width
  maxWidth: "500px",
  minWidth: "300px",
});
