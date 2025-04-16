import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import * as Progress from 'react-native-progress';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../configs/ScalingSize';
import {Colors, ColorType} from '../../configs/Colors';
import {Fonts} from '../../configs/Fonts';
import {formatCurrenyNumber} from '../../utils/currency.util';

interface WeeklyLimitBarProps {
  progress: number; // e.g. 0.5 for 50%
  spentAmount: number; // e.g. 345
  limitAmount: number; // e.g. 5000
  progressColor?: ColorType;
}

const WeeklyLimitBar = ({
  progress,
  spentAmount,
  limitAmount,
  progressColor = 'primary',
}: WeeklyLimitBarProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Debit card spending limit</Text>

        <View style={styles.amountWrapper}>
          <Text style={styles.spentAmount}>
            ${formatCurrenyNumber(spentAmount)}
          </Text>
          <Text style={styles.limitAmount}>
            ${formatCurrenyNumber(limitAmount)}
          </Text>
        </View>
      </View>

      <Progress.Bar
        width={Dimensions.get('window').width - horizontalScale(24)}
        progress={progress}
        height={verticalScale(12)}
        color={Colors[progressColor]}
        style={styles.progressBar}
        unfilledColor={Colors.lightPrimary}
        borderWidth={0}
        borderRadius={10}
      />
    </View>
  );
};

export default WeeklyLimitBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalScale(12),
    marginTop: verticalScale(10),
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  title: {
    fontFamily: Fonts.fontMedium,
    fontSize: moderateScale(14),
    color: Colors.black,
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  spentAmount: {
    fontFamily: Fonts.fontMedium,
    paddingRight: horizontalScale(5),
    color: Colors.primary,
  },
  limitAmount: {
    borderLeftWidth: 1,
    paddingLeft: horizontalScale(5),
    borderColor: Colors.greyExtraLight,
    fontFamily: Fonts.fontMedium,
    color: Colors.greyMedium,
  },
  progressBar: {
    borderRadius: moderateScale(10),
  },
});
