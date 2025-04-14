import {FlatList, StyleSheet, View, ListRenderItem} from 'react-native';
import React, {useCallback} from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import {Colors} from '../../configs/Colors';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../configs/ScalingSize';
import ActionItem from '../../components/ActionItem';
import DebitCard from '../../components/DebitCard';
import Header from '../../components/Header';
import DisplayBalance from './DisplayBalance';
import {ActionItems} from '../../types/debitCardTypes';
import {SCREENS} from '../../navigations/utils';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../navigations/types'; // Adjust if needed

// Screen navigation type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

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
  const navigation = useNavigation<NavigationProp>();

  const handleActionPress = useCallback(
    (id: number | string) => {
      if (id === 2) {
        navigation.navigate(SCREENS.spendingLimit);
      }
    },
    [navigation],
  );

  const renderItem: ListRenderItem<ActionItems> = useCallback(
    ({item}) => {
      return (
        <ActionItem
          id={item.id}
          title={item.title}
          description={item.description}
          iconName={item.iconName}
          actionIconName={item.actionIconName}
          onActionPress={handleActionPress}
        />
      );
    },
    [handleActionPress],
  );

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.headerContainer}>
        <Header title="Debit Card" />
        <DisplayBalance amount={'3,000'} amountColor="white" />
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
              // Handle hide/show
            }}
          />
        </View>
      </View>
      <FlatList
        data={ACTION_ITEMS}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        bounces={false}
        scrollEnabled
        contentContainerStyle={styles.flatListContent}
        style={styles.flatList}
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
    paddingHorizontal: horizontalScale(10),
  },
  cardContainer: {
    flexGrow: 1,
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
    flexGrow: 1,
  },
  flatListContent: {
    paddingBottom: verticalScale(20),
    backgroundColor: Colors.white,
    paddingHorizontal: horizontalScale(5),
  },
});
