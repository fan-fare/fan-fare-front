import { globalFontFace, globalStyle, style } from '@vanilla-extract/css';

globalStyle('html, body', {
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
});

export const pretendard = "Pretendard";
globalFontFace(pretendard, {
    src: `url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff')`,
    fontWeight: 400,
    fontStyle: 'normal',
});

export const pcWidth = '(min-width: 680px)';

export const fullScreenContainer = style({
  width: '100%',
  height: '100%',
});

export const flexCenterContainer = style([fullScreenContainer, {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}]);
