import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import DollarContainer from './DollarContainer';
import {Fonts} from '../configs/Fonts';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../configs/ScalingSize';
import {Colors, ColorType} from '../configs/Colors';

export interface AmountDisplayerProps {
  amount: number | string;
  amountColor?: ColorType;
}

const AmountDisplayer = ({
  amount,
  amountColor = 'black',
}: AmountDisplayerProps) => {
  return (
    <View style={styles.container}>
      <DollarContainer />
      {!!amount && (
        <Text style={[styles.amountText, {color: Colors[amountColor]}]}>
          {amount}
        </Text>
      )}
    </View>
  );
};

export default AmountDisplayer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
  },
  amountText: {
    fontFamily: Fonts.fontBold,
    fontSize: moderateScale(24),
    marginLeft: horizontalScale(10),
  },
});
