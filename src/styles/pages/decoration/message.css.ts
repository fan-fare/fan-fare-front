import { pc, smallMobile, tablet } from "@/styles/common/common.css";
import { formInput } from "@/styles/common/form.css";
import { style } from "@vanilla-extract/css";

export const decoFormContainer = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: "100%",
  padding: "0 2rem",
  boxSizing: "border-box",
});

export const decoForm = style({
  display: "flex",
  position: "relative",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  boxSizing: "border-box",
  gap: "1rem",
});

export const decoFormContentContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  height: "100%",
  boxSizing: "border-box",
});

export const decoFormInputContainer = style({
  display: "flex",
  position: "relative",
  width: "100%",
  height: "auto",
  boxSizing: "border-box",
});

export const decoFormTextArea = style([
  formInput,
  {
    display: "block",
    height: "15rem",
    boxSizing: "border-box",
    alignContent: "center",
    justifyContent: "center",
    padding: "1rem",
    "@media": {
      [smallMobile]: {
        height: "15rem",
      },
      [tablet]: {
        height: "17rem",
      },
      [pc]: {
        height: "20rem",
      },
    },
  },
]);

export const decoFormTextAreaCount = style({
  display: "block",
  position: "absolute",
  bottom: "0.75rem",
  right: "0.75rem",
  fontSize: "1.5rem",
  color: "#D9D9D9",
});

export const decoFormNickname = style([
  formInput,
  {
    height: "3rem",
  },
]);

export const decoFormNicknameCount = style({
  display: "block",
  position: "absolute",
  top: "calc(50% - 0.75rem)",
  right: "0.75rem",
  fontSize: "1.5rem",
  color: "#D9D9D9",
});
