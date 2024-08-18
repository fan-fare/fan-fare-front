import { globalFontFace, globalStyle, style } from '@vanilla-extract/css';

export const pretendard = "Pretendard";
export const uiyeun = 'Ownglyph EuiyeonChae';

globalStyle('html, body', {
  display: 'flex',
  position: 'absolute',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  margin: 0,
  padding: 0,
  backgroundImage: 'url("/assets/background.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  fontFamily: pretendard,
  zIndex: -100,
});

globalFontFace(pretendard, {
    src: `url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff')`,
    fontWeight: 'normal',
    fontStyle: 'normal',
});

globalFontFace(uiyeun, {
    src: `url('https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_2105@1.1/Uiyeun.woff') format('woff')`,
    fontWeight: 'normal',
    fontStyle: 'normal',
});

export const pcWidth = '(min-width: 680px)';

export const fullScreenContainer = style({
  width: '100%',
  height: '100%',
});

export const flexCenterContainer = style([fullScreenContainer, {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}]);