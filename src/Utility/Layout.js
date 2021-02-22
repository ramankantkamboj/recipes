import {Dimensions, PixelRatio} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  scale,
  verticalScale,
  moderateScale,
  normalize(size) {
    const scaled = (width / guidelineBaseWidth) * size;
    if (PixelRatio.get === 1) {
      return Math.round(PixelRatio.roundToNearestPixel(scaled)) - 2;
    } else if (PixelRatio === 1.5 || PixelRatio.get() === 2) {
      return Math.round(PixelRatio.roundToNearestPixel(scaled)) - 1;
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(scaled));
    }
  },
};
