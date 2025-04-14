import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors} from '../../configs/Colors';
import Header from '../../components/Header';
import useBackHandler from '../../hooks/useBackHandler';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../configs/ScalingSize';
import Button from '../../components/Button';
import MoneyPicker, {MoneyPickerType} from './MoneyPicker';
import LimitDisplayer from './LimitDisplayer';

const SpendingLimit = () => {
  const insets = useSafeAreaInsets();
  const {getBackToThePreviousScreen} = useBackHandler();

  const amounts: MoneyPickerType[] = [
    {id: 1, amount: '5,000'},
    {id: 1, amount: '10,000'},
    {id: 1, amount: '20,000'},
  ];

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.headerContainer}>
        <Header
          title="Spending Limit"
          onBackButtonPress={getBackToThePreviousScreen}
          textStyles={styles.headerText}
        />
      </View>

      <View style={styles.bottomContainer}>
        <View>
          <LimitDisplayer amount={'5,000'} />
          <MoneyPicker amounts={amounts} />
        </View>
        <View
          style={{
            paddingHorizontal: horizontalScale(40),
            paddingBottom: verticalScale(20),
          }}>
          <Button title="Save" onPress={() => {}} />
        </View>
      </View>
    </View>
  );
};

export default SpendingLimit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  headerContainer: {
    flex: 0.3,
  },
  headerText: {
    paddingHorizontal: horizontalScale(10),
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopRightRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
    paddingHorizontal: horizontalScale(10),
    justifyContent: 'space-between',
    padding: moderateScale(20),
  },
});
