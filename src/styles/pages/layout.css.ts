import { style } from "@vanilla-extract/css";

export const background = style({
  display: "flex",
  position: "fixed",
  top: 0,
  width: "100%",
  height: "100%",
  backgroundImage: "url('/assets/background.png')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  zIndex: -100,
});

export const mainContainer = style({
  display: "flex",
  width: "100%",
  height: "100%",
  // tablet size is maximum width
  maxWidth: "500px",
  minWidth: "300px",
});
