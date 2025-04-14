import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');
const horizontalScale = (size: number) => (SCREEN_WIDTH / 375) * size; // Based on iPhone 6/7/8
const verticalScale = (size: number) => (SCREEN_HEIGHT / 667) * size; // Based on iPhone 6/7/8
const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {horizontalScale, verticalScale, moderateScale};
