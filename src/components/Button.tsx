import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Fonts} from '../configs/Fonts';
import {moderateScale, verticalScale} from '../configs/ScalingSize';
import {Colors, ColorType} from '../configs/Colors';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  buttonColor?: ColorType;
  titleColor?: ColorType;
  textStyle?: TextStyle;
  buttonStyles?: ViewStyle;
}

const Button = ({
  title,
  buttonColor = 'primary',
  titleColor = 'white',
  textStyle,
  buttonStyles,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      testID="button-container"
      style={[
        styles.button,
        {backgroundColor: Colors[buttonColor]},
        {...buttonStyles},
      ]}
      {...props}>
      <Text
        testID="button-text"
        style={[styles.title, {color: Colors[titleColor]}, {...textStyle}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(40),
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.fontSemiBold,
    fontSize: moderateScale(16),
  },
});
