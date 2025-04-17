import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../configs/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../configs/ScalingSize';
import {Fonts} from '../configs/Fonts';

const DollarContainer = () => {
  return (
    <View testID="dollar-container" style={styles.container}>
      <Text style={styles.dollarText}>{`S$`}</Text>
    </View>
  );
};

export default DollarContainer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: horizontalScale(13),
    paddingVertical: verticalScale(2),
    borderRadius: moderateScale(5),
  },
  dollarText: {
    fontFamily: Fonts.fontBold,
    letterSpacing: 2,
    color: Colors.white,
  },
});
