import {StyleSheet, View} from 'react-native';
import React from 'react';
import MoneyButton from './MoneyButton';
import {moderateScale} from '../../configs/ScalingSize';
import {formatCurrenyNumber} from '../../utils/currency.util';

export interface MoneyPickerType {
  id: number;
  amount: number;
}

interface MoneyPickerProps {
  amounts: MoneyPickerType[];
  onAmountPress?: (amount: number) => void;
}

const MoneyPicker = ({amounts, onAmountPress}: MoneyPickerProps) => {
  return (
    <View style={styles.container}>
      {amounts.map(item => (
        <View key={item.id} style={styles.buttonWrapper}>
          <MoneyButton
            amount={formatCurrenyNumber(item.amount)}
            onPress={() => onAmountPress?.(item.amount)}
          />
        </View>
      ))}
    </View>
  );
};

export default MoneyPicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', // in case more buttons
  },
  buttonWrapper: {
    margin: moderateScale(5),
  },
});
