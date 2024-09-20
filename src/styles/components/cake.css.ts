import { style } from "@vanilla-extract/css";
import { uiyeun } from "../common/common.css";

export const cakeComponentContainer = style({
  display: "flex",
  width: "80%",
  height: "auto",
  maxWidth: "250px",
  minHeight: "200px",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "3rem",
  boxSizing: "border-box",
});

export const cake = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "auto",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
});

export const cakeImg = style({
  display: "block",
  width: "100%",
  height: "auto",
  filter: "drop-shadow(0px 0px 6px #000000B2)",
  zIndex: 1,
});

// candle position of cake
export const candleProp = [
  {
    top: "-15%",
    left: "46.75%", // middle
  },
  {
    top: "-10%",
    left: "27%", // left top
  },
  {
    top: "-10%",
    right: "27%", // right top
  },
  {
    top: "26%",
    left: "7%", // left bottom
  },
  {
    top: "26%",
    right: "7%", // right bottom
  },
];

export const candleBase = style({
  display: "block",
  width: "6.5%", // candle size
  height: "auto",
  position: "absolute",
});

export const candleNameProp = [
  {
    top: "calc(-13% - 10%)",
    left: "calc(50% - 1.5rem)",
  },
  {
    top: "calc(-19% + 10%)",
    left: "calc(31% - 1% - 3.25rem)",
  },
  {
    top: "calc(-19% + 10%)",
    right: "calc(31% - 1% - 3.25rem)",
  },

  {
    top: "calc(21% + 10%)",
    left: "calc(9% - 1% - 3.25rem)",
  },
  {
    top: "calc(21% + 10%)",
    right: "calc(9% - 1% - 3.25rem)",
  },
];

export const candleNameBase = style({
  display: "block",
  fontFamily: uiyeun,
  position: "absolute",
  alignItems: "center",
  justifyContent: "center",
  width: "3.25rem",
  height: "auto",
  fontSize: "1.25rem",
  textAlign: "center",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const candle1 = style([candleBase, { ...candleProp[0] }]);
export const candle2 = style([candleBase, { ...candleProp[1] }]);
export const candle3 = style([candleBase, { ...candleProp[2] }]);
export const candle4 = style([candleBase, { ...candleProp[3] }]);
export const candle5 = style([candleBase, { ...candleProp[4] }]);

export const candleName1 = style([candleNameBase, { ...candleNameProp[0] }]);
export const candleName2 = style([candleNameBase, { ...candleNameProp[1] }]);
export const candleName3 = style([candleNameBase, { ...candleNameProp[2] }]);
export const candleName4 = style([candleNameBase, { ...candleNameProp[3] }]);
export const candleName5 = style([candleNameBase, { ...candleNameProp[4] }]);
