import {PixelRatio} from 'react-native';

const colors = {
  accent: '#FF4957',
  primary: '#27A9FF',
  secondary: '#4DA1FF',
  tertiary: '#FFE358',
  black: '#2F2F2F',
  white: '#FFFFFF',
  gray: '#BDBFC7',
  gray2: '#D8D8D8',
  gray3: '#F0F0F0',
  gray4: '#F7F8FA',
};

let BASE = 16;
let FONT = 14;
let BORDER = 15;
let PADDING = 25;
let FONT_H1 = 39;
let FONT_H2 = 29;
let FONT_H3 = 19;
let FONT_H4 = 15;
let FONT_TITLE = 18;
let FONT_HEADER = 24;
let FONT_BODY = 12;
let FONT_CAPTION = 11;
let FONT_SMALL = 8;
let SCALE_X = 1;
let SCALE_Y = 1;

if (PixelRatio.get() >= 2 && PixelRatio.get() <= 3) {
  BASE = 12;
  FONT = 11;
  BORDER = 11;
  PADDING = 20;
  FONT_H1 = 35;
  FONT_H2 = 25;
  FONT_H3 = 15;
  FONT_H4 = 11;
  FONT_TITLE = 14;
  FONT_HEADER = 20;
  FONT_BODY = 9;
  FONT_CAPTION = 9;
  FONT_SMALL = 6;
  SCALE_X = 0.8;
  SCALE_Y = 0.8;
}

const sizes = {
  // global sizes
  base: BASE,
  font: FONT,
  border: BORDER,
  padding: PADDING,

  // font sizes
  h1: FONT_H1,
  h2: FONT_H2,
  h3: FONT_H3,
  h4: FONT_H4,
  title: FONT_TITLE,
  header: FONT_HEADER,
  body: FONT_BODY,
  caption: FONT_CAPTION,
  small: FONT_SMALL,

  // Switch Transform
  scaleX: SCALE_X,
  scaleY: SCALE_Y,
};

const fonts = {
  h1: {
    fontFamily: 'Rubik-Light',
    fontSize: sizes.h1,
  },
  h2: {
    fontFamily: 'Rubik-Medium',
    fontSize: sizes.h2,
  },
  h3: {
    fontFamily: 'Rubik-Regular',
    fontSize: sizes.h3,
  },
  header: {
    fontFamily: 'Rubik-Bold',
    fontSize: sizes.header,
  },
  title: {
    fontFamily: 'Rubik-Regular',
    fontSize: sizes.title,
  },
  body: {
    fontSize: sizes.body,
  },
  caption: {
    fontSize: sizes.caption,
  },
  small: {
    fontSize: sizes.small,
  },
};

export {colors, sizes, fonts};
