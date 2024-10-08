import { globalFontFace, globalStyle, style } from "@vanilla-extract/css";

export const pretendard = "Pretendard";
export const uiyeun = "Ownglyph EuiyeonChae";
export const lotteria = "Lotteria Chopddanggyeo";

export const pc = "(min-width: 769px) and (min-height: 501px)";
export const smallMobile = "(max-width: 400px), (min-height: 400px)";
export const tablet = "(min-width: 500px) and (min-height: 500px)";

globalStyle("html, body", {
  display: "flex",
  boxSizing: "border-box",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  margin: 0,
  padding: 0,
  fontFamily: pretendard,
  minHeight: "650px",
});

globalFontFace(pretendard, {
  src: `url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff')`,
  fontWeight: "normal",
  fontStyle: "normal",
});

globalFontFace(uiyeun, {
  src: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2105@1.1/Uiyeun.woff') format('woff')`,
  fontWeight: "normal",
  fontStyle: "normal",
});

globalFontFace(lotteria, {
  src: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/LOTTERIACHAB.woff2') format('woff2')`,
  fontWeight: "normal",
  fontStyle: "normal",
});

export const fullScreenContainer = style({
  width: "100%",
  height: "100%",
});

export const flexCenterContainer = style([
  fullScreenContainer,
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
]);
