import { ComplexStyleRule, style, StyleRule } from "@vanilla-extract/css";
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
  padding: "1rem",
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
export const candleProp: StyleRule[] = [
  {
    top: "-20%",
    left: "46.75%", // middle
  },
  {
    top: "-16%",
    left: "27%", // left top
  },
  {
    top: "-16%",
    right: "27%", // right top
  },
  {
    top: "22%",
    left: "7%", // left bottom
  },
  {
    top: "22%",
    right: "7%", // right bottom
  },
];

export const candleBase = style({
  display: "block",
  width: "6.5%", // candle size
  height: "auto",
  position: "absolute",
});

export const candleNameProp: StyleRule[] = [
  {
    top: "calc(-20% - 10%)",
    left: "calc(50% - 1.625rem)",
    textAlign: "center",
  },
  {
    top: "calc(-16% + 10%)",
    left: "calc(31% - 6.5% - 3.25rem)",
    textAlign: "right",
  },
  {
    top: "calc(-16% + 10%)",
    right: "calc(31% - 6.5% - 3.25rem)",
    textAlign: "left",
  },

  {
    top: "calc(22% + 10%)",
    left: "calc(12% - 6.5% - 3.25rem)",
    textAlign: "right",
  },
  {
    top: "calc(22% + 10%)",
    right: "calc(12% - 6.5% - 3.25rem)",
    textAlign: "left",
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
  fontSize: "1rem",
  fontWeight: 400,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
});

export const candle1 = style([candleBase, candleProp[0]]);
export const candle2 = style([candleBase, candleProp[1]]);
export const candle3 = style([candleBase, candleProp[2]]);
export const candle4 = style([candleBase, candleProp[3]]);
export const candle5 = style([candleBase, candleProp[4]]);

export const candleName1 = style([candleNameBase, candleNameProp[0]]);
export const candleName2 = style([candleNameBase, candleNameProp[1]]);
export const candleName3 = style([candleNameBase, candleNameProp[2]]);
export const candleName4 = style([candleNameBase, candleNameProp[3]]);
export const candleName5 = style([candleNameBase, candleNameProp[4]]);
