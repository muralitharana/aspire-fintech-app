import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItem,
  Pressable,
  Text,
  Dimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';

// Configs
import {Colors} from '../../configs/Colors';
import {Fonts} from '../../configs/Fonts';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../configs/ScalingSize';

// Components
import Header from '../../components/Header';
import DisplayBalance from './DisplayBalance';
import DebitCard from '../../components/DebitCard';
import ActionItem from '../../components/ActionItem';
import SVGIcons from '../../components/SVGIcons';
import Carousel, {
  ICarouselInstance,
  Pagination,
} from 'react-native-reanimated-carousel';

// Navigation & Types
import {SCREENS} from '../../navigations/utils';
import {RootStackParamList} from '../../navigations/AppNavigator';
import {ActionItems, DebitCardType} from '../../types/debitCardTypes';

// Hooks & Redux
import useToggleState from '../../hooks/useToggleState';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  fetchDebitCardsInformation,
  updateDebitCardStatus,
  updateDebitCardWeeklyLimit,
  updateSelectedDebitCard,
} from '../../redux/slices/DebitCardSlice';
import WeeklyLimitBar from './WeeklyLimitBar';
import {formatCurrenyNumber} from '../../utils/currency.util';
import {SVGIconsName} from '../../types/svgIconsTypes';

const {width} = Dimensions.get('window');

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Static Action Items
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
    enableToggle: true,
  },
  {
    id: 3,
    title: 'Freeze card',
    description: 'Your debit card is currently active',
    iconName: 'Freeze',
    actionIconName: 'ToggleOff',
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
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [actionItems, setActionItems] = useState(ACTION_ITEMS);
  const {toggle: isCardNumberShown, toggling: setIsCardNumberShown} =
    useToggleState();
  const {isFetching, data, selectedDebitCard} = useAppSelector(
    state => state.debitCardSlice,
  );
  const previousIndexRef = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDebitCardsInformation());
  }, [dispatch]);

  useEffect(() => {
    if (data.length > 0 && currentIndex < data.length) {
      dispatch(updateSelectedDebitCard(data[currentIndex]));
    }
  }, [data, currentIndex]);

  const handleIndexChange = useCallback((index: number) => {
    if (previousIndexRef.current !== index) {
      previousIndexRef.current = index;
      setCurrentIndex(index); // or dispatch an action or do something else
    }
  }, []);

  useDerivedValue(() => {
    runOnJS(handleIndexChange)(Math.round(progress.value));
  }, [progress]);

  const updatedActions = useMemo(() => {
    return actionItems.map((item, i) => {
      if (i === 1) {
        const isEnabled = !!selectedDebitCard?.weeklyLimit?.amountLimit;
        return {
          ...item,
          enableToggle: isEnabled,
          actionIconName: isEnabled
            ? ('ToggleOn' as SVGIconsName)
            : ('ToggleOff' as SVGIconsName),
        };
      }

      if (i == 2) {
        return {
          ...item,
          enableToggle: !!selectedDebitCard?.cardStatus.isFreezed,
          actionIconName: selectedDebitCard?.cardStatus.isFreezed
            ? ('ToggleOn' as SVGIconsName)
            : ('ToggleOff' as SVGIconsName),
        };
      }
      return item;
    });
  }, [actionItems, selectedDebitCard?.weeklyLimit]);

  const handleActionPress = useCallback(
    (id: number | string) => {
      if (id === 2) {
        if (selectedDebitCard?.weeklyLimit?.amountLimit) {
          dispatch(
            updateDebitCardWeeklyLimit({
              cardId: selectedDebitCard?.id!,
              amountLimit: 0,
              amountSpend: 0,
            }),
          );
        } else {
          navigation.navigate(SCREENS.spendingLimit);
        }
      }

      if (id === 3) {
        //freeze
        console.log('Free');
        dispatch(
          updateDebitCardStatus({
            cardId: selectedDebitCard?.id!,
            isFreezed: !selectedDebitCard?.cardStatus.isFreezed,
          }),
        );
      }
    },
    [navigation, selectedDebitCard],
  );

  const renderActionItem: ListRenderItem<ActionItems> = ({item}) => (
    <ActionItem
      id={item.id}
      title={item.title}
      description={item.description}
      iconName={item.iconName}
      enableAction={!!item.enableToggle}
      actionIconName={item.actionIconName}
      onActionPress={handleActionPress}
    />
  );

  const renderCardItem = useCallback(
    ({item}: {item: DebitCardType}) => (
      <DebitCard
        userName={item.cardDetails?.userName!}
        cardNumber={item.cardDetails?.cardNumber!}
        expireDate={item.cardDetails?.expireDate!}
        cvv={item.cardDetails?.cvv!}
        cardBrand={item.cardDetails?.cardBrand!}
        sellingCompany="Aspire"
        cardBrandIcon="CardBrandVisa"
        sellingCompanyIcon="AspireLogo"
        isAccountNumberHidden={isCardNumberShown}
        isFreezed={item.cardStatus.isFreezed}
      />
    ),
    [isCardNumberShown],
  );

  const progressLength = useMemo(() => {
    return (
      Number(selectedDebitCard?.weeklyLimit?.amountSpend) /
        Number(selectedDebitCard?.weeklyLimit?.amountLimit) || 0
    );
  }, [selectedDebitCard?.weeklyLimit]);

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Header and Balance */}
      <View style={styles.headerContainer}>
        <Header title="Debit Card" />
        <DisplayBalance
          amount={
            formatCurrenyNumber(selectedDebitCard?.accountBalance?.amount!) ||
            '0'
          }
          amountColor="white"
        />
      </View>

      {/* Card Section */}
      <View style={styles.cardContainer}>
        <View style={styles.debitCardWrapper}>
          <Pressable style={styles.toggleButton} onPress={setIsCardNumberShown}>
            <SVGIcons
              iconName={isCardNumberShown ? 'EyeOpen' : 'EyeClosed'}
              style={styles.toggleIcon}
            />
            <Text style={styles.toggleText}>
              {isCardNumberShown ? 'Show Card Number' : 'Hide Card Number'}
            </Text>
          </Pressable>

          <Carousel
            data={data}
            width={width}
            ref={ref}
            height={verticalScale(195)}
            onProgressChange={progress}
            defaultIndex={0}
            renderItem={renderCardItem}
          />

          {!!selectedDebitCard?.weeklyLimit?.amountLimit && (
            <WeeklyLimitBar
              progressColor="primary"
              limitAmount={selectedDebitCard?.weeklyLimit?.amountLimit!}
              progress={progressLength}
              spentAmount={selectedDebitCard?.weeklyLimit?.amountSpend!}
            />
          )}
        </View>
      </View>

      {/* Actions List */}
      <FlatList
        data={updatedActions}
        renderItem={renderActionItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        style={styles.flatList}
        bounces={false}
        scrollEnabled
      />
    </View>
  );
};

export default DebitCardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  headerContainer: {
    minHeight: verticalScale(160),
    paddingHorizontal: horizontalScale(10),
  },
  cardContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(30),
    borderTopRightRadius: moderateScale(30),
    paddingHorizontal: horizontalScale(3),
  },
  debitCardWrapper: {
    position: 'relative',
    top: -verticalScale(30),
  },
  toggleButton: {
    padding: moderateScale(10),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
    position: 'absolute',
    zIndex: 0,
    top: -verticalScale(20),
    right: horizontalScale(7),
  },
  toggleIcon: {
    marginRight: horizontalScale(5),
  },
  toggleText: {
    fontFamily: Fonts.fontSemiBold,
    fontSize: moderateScale(12),
    color: Colors.primary,
  },
  flatList: {
    flexGrow: 1,
  },
  flatListContent: {
    paddingBottom: verticalScale(20),
    backgroundColor: Colors.white,
    paddingHorizontal: horizontalScale(5),
  },
  activeDot: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
  },
  inactiveDot: {
    backgroundColor: Colors.greyLight,
    borderRadius: 30,
  },
  paginationContainer: {
    gap: 5,
  },
});
