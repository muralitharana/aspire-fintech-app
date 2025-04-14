import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Colors} from '../../configs/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../configs/ScalingSize';
import ActionItem, {ActionItemProps} from '../../components/ActionItem';
import DebitCard from '../../components/DebitCard';
import Header from '../../components/Header';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ActionItems} from '../../types/debitCardTypes';

// Static data for the FlatList
const ACTION_ITEMS: ActionItems[] = [
  {
    id: 1,
    title: 'Top-Up account',
    description: 'Deposit money to your account to use with card',
    iconName: 'TopUp',
  },
  {
    id: 2,
    title: 'Weekly spending limit',
    description: 'You haven’t set any spending limit on card',
    iconName: 'WeeklyLimit',
    actionIconName: 'ToggleOff',
  },
  {
    id: 3,
    title: 'Freeze card',
    description: 'Your debit card is currently active',
    iconName: 'Freeze',
  },
  {
    id: 4,
    title: 'Get a new card',
    description: 'This deactivates your current debit card',
    iconName: 'Deactivate',
  },
  {
    id: 5,
    title: 'Deactivated cards',
    description: 'Your previously deactivated cards',
    iconName: 'Newcard',
  },
];

const DebitCardScreen = () => {
  const insets = useSafeAreaInsets();

  const renderItems = useCallback(
    ({item}: {item: ActionItems}) => (
      <ActionItem
        id={item.id}
        title={item.title}
        description={item.description}
        iconName={item?.iconName}
        actionIconName={item.actionIconName}
        onActionPress={id => {
          console.log(id);
        }}
      />
    ),
    [],
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.headerContainer}>
        <Header title="Debit Card" />
      </View>

      <View style={styles.cardContainer}>
        <View style={styles.debitCardWrapper}>
          <DebitCard
            userName="Mark Henry"
            cardNumber={['5647', '3411', '2413', '2020']}
            expireDate="Thru: 12/20"
            cvv="456"
            cardBrand="Visa"
            sellingCompany="Aspire"
            cardBrandIcon="CardBrandVisa"
            sellingCompanyIcon="AspireLogo"
            isAccountNumberHidden={false}
            onOpenHidePress={() => {
              // alert('Press');
            }}
          />
        </View>
      </View>
      <FlatList
        scrollEnabled
        bounces={false}
        style={styles.flatList}
        data={ACTION_ITEMS}
        renderItem={renderItems}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

export default DebitCardScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.secondary,
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    minHeight: verticalScale(160),
  },
  cardContainer: {
    backgroundColor: Colors.white,
    borderTopRightRadius: moderateScale(30),
    borderTopLeftRadius: moderateScale(30),
    paddingHorizontal: horizontalScale(3),
  },
  debitCardWrapper: {
    position: 'relative',
    top: -verticalScale(30),
  },
  flatList: {
    paddingBottom: 0,
    position: 'relative',
    flexGrow: 1,
  },
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 0,
    backgroundColor: Colors.white,
    paddingHorizontal: horizontalScale(5),
  },
});
