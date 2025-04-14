import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AmountDisplayer, {
  AmountDisplayerProps,
} from '../../components/AmountDisplayer';
import {Fonts} from '../../configs/Fonts';
import {Colors} from '../../configs/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../configs/ScalingSize';
import SVGIcons from '../../components/SVGIcons';

export interface LimitDisplayerProps extends AmountDisplayerProps {}

const LimitDisplayer = ({amount, amountColor}: LimitDisplayerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <SVGIcons iconName="Weekly" />
        <Text style={styles.labelText}>
          Set a weekly debit card spending limit
        </Text>
      </View>

      <AmountDisplayer amount={amount} amountColor={amountColor} />

      <View style={styles.divider} />

      <Text style={styles.helperText}>
        Here weekly means the last 7 days - not the calendar week
      </Text>
    </View>
  );
};

export default LimitDisplayer;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  labelText: {
    fontFamily: Fonts.fontSemiBold,
    color: Colors.black,
    marginLeft: horizontalScale(10),
  },
  divider: {
    height: verticalScale(1),
    width: '100%',
    backgroundColor: Colors.greyLight,
    marginVertical: verticalScale(5),
  },
  helperText: {
    fontFamily: Fonts.fontRegular,
    color: Colors.grey,
  },
});
