import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AmountDisplayer, {
  AmountDisplayerProps,
} from '../../components/AmountDisplayer';
import {Fonts} from '../../configs/Fonts';
import {Colors} from '../../configs/Colors';
import {moderateScale} from '../../configs/ScalingSize';

export interface DisplayBalanceProps extends AmountDisplayerProps {}

const DisplayBalance = ({amount, amountColor}: DisplayBalanceProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>{`Available Balance`}</Text>
      <AmountDisplayer amount={amount} amountColor={amountColor} />
    </View>
  );
};

export default DisplayBalance;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
  },
  labelText: {
    fontFamily: Fonts.fontSemiBold,
    color: Colors.white,
  },
});
