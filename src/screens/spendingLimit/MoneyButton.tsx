import {StyleSheet, TouchableOpacityProps} from 'react-native';
import React from 'react';
import Button from '../../components/Button';
import {Colors} from '../../configs/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../configs/ScalingSize';

interface MoneyButtonProps {
  amount: string | number;
}

const MoneyButton = ({
  amount,
  ...props
}: MoneyButtonProps & TouchableOpacityProps) => {
  return (
    <Button
      style={styles.button}
      title={`S$ ${amount}`}
      titleColor="primary"
      textStyle={styles.textStyle}
      {...props}
    />
  );
};

export default MoneyButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightPrimary,
    maxWidth: horizontalScale(140),
  },
  textStyle: {
    paddingVertical: verticalScale(12),
    paddingHorizontal: horizontalScale(25),
    fontSize: moderateScale(13),
  },
});
