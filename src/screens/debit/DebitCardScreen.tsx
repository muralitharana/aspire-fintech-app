// React and React Native imports
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  ListRenderItem,
  Pressable,
  Text,
  Dimensions,
  Platform,
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
import Carousel, {ICarouselInstance} from 'react-native-reanimated-carousel';

// Navigation & Types
import {SCREENS} from '../../navigations/utils';
import {RootStackParamList} from '../../navigations/AppNavigator';
import {ActionItems, DebitCardType} from '../../types/debitCardTypes';

// Hooks & Redux
import useToggleState from '../../hooks/useToggleState';
import {useAppDispatch, useAppSelector} from '../../hooks/useRedux';
import {
  addDebitCardApi,
  fetchDebitCardsInformation,
  updateDebitCardStatus,
  updateDebitCardWeeklyLimit,
  updateSelectedDebitCard,
} from '../../redux/slices/DebitCardSlice';

// Utilities
import {formatCurrenyNumber} from '../../utils/currency.util';
import {generateCardNumber, generateExpiryDate} from '../../utils/card.util';

// Local components
import WeeklyLimitBar from './WeeklyLimitBar';
import AddNewCard from './AddNewCard';
import Loading from '../../components/Loading';
import {ACTION_ITEMS, processActionItems} from './utils';
import Toast from 'react-native-toast-message';

// Constants
const {width} = Dimensions.get('window');

// Types
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const DebitCardScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavigationProp>();
  const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  const [actionItems, setActionItems] = useState(ACTION_ITEMS);
  const previousIndexRef = useRef<number>(0);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const {toggle: isCardNumberShown, toggling: setIsCardNumberShown} =
    useToggleState(true);

  const [isAddNewCardModelOpen, setIsAddNewCardOpenModelOpen] =
    useState<boolean>(false);

  const {isFetching, data, selectedDebitCard} = useAppSelector(
    state => state.debitCardSlice,
  );
  const dispatch = useAppDispatch();

  // Fetch Debit Cards Information
  useEffect(() => {
    console.log('CALLEd');
    dispatch(fetchDebitCardsInformation());
  }, [dispatch]);

  // Update selected debit card on index change
  useEffect(() => {
    if (data.length > 0 && currentIndex < data.length) {
      console.log(data[currentIndex].cardDetails?.userName);
      dispatch(updateSelectedDebitCard(data[currentIndex]));
    }
  }, [data, currentIndex]);

  const handleIndexChange = useCallback(
    (index: number) => {
      if (previousIndexRef.current !== index) {
        previousIndexRef.current = index;

        setCurrentIndex(index); // or dispatch an action or do something else
      }
    },
    [selectedDebitCard],
  );

  useDerivedValue(() => {
    runOnJS(handleIndexChange)(Math.round(progress.value));
  }, [progress]);

  const updatedActions = useMemo(() => {
    return processActionItems({
      actionItems,
      isAmountLimitEnabled: !!selectedDebitCard?.weeklyLimit?.amountLimit,
      isCardFreezed: !!selectedDebitCard?.cardStatus.isFreezed,
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
        // freeze/unfreeze card
        console.log('Free');
        dispatch(
          updateDebitCardStatus({
            cardId: selectedDebitCard?.id!,
            isFreezed: !selectedDebitCard?.cardStatus.isFreezed,
          }),
        );
      }

      if (id === 4) {
        setIsAddNewCardOpenModelOpen(true);
      }
    },
    [navigation, selectedDebitCard],
  );

  const progressLength = useMemo(() => {
    const amountSpend = selectedDebitCard?.weeklyLimit?.amountSpend || 0;
    const amountLimit = selectedDebitCard?.weeklyLimit?.amountLimit || 0;
    return amountSpend / amountLimit;
  }, [selectedDebitCard?.weeklyLimit]);

  const handleAddNewcard = (text: string) => {
    setIsAddNewCardOpenModelOpen(false);
    const cardNumber = generateCardNumber();
    const expireDate = generateExpiryDate();
    const id = (data.length + 1).toString();

    dispatch(
      addDebitCardApi({
        debitCard: {
          id: id as unknown as number,
          cardDetails: {
            userName: text,
            cardNumber: cardNumber,
            expireDate: expireDate,
            cvv: '123',
            sellingCompany: 'Aspire',
            cardBrand: 'Visa',
          },
          accountBalance: {
            amount: 5000,
            currency: 'dollar',
          },
          weeklyLimit: {
            amountLimit: 0,
            amountSpend: 0,
          },
          cardStatus: {
            isFreezed: false,
          },
        },
        onSuccess: data => {
          Toast.show({
            type: 'success',
            text1: 'Card Added Successfully.',
            position: 'bottom',
            visibilityTime: 2000,
          });
          setCurrentIndex(0);
        },
      }),
    );
  };

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

  if (isFetching) {
    return <Loading text="Api fetching" />;
  }

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      {/* Header and Balance */}
      <View style={styles.headerContainer}>
        <Header title="Debit Card" />
        <DisplayBalance
          amount={
            formatCurrenyNumber(selectedDebitCard?.accountBalance?.amount!) || 0
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
            height={verticalScale(Platform.OS === 'ios' ? 195 : 210)}
            onProgressChange={progress}
            renderItem={renderCardItem}
            mode="vertical-stack"
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

      {/* Add New Card */}
      <AddNewCard
        isOpen={isAddNewCardModelOpen}
        onSave={handleAddNewcard}
        onClose={() => setIsAddNewCardOpenModelOpen(false)}
        coverScreen={Platform.OS === 'ios' ? true : false}
        onClosed={() => setIsAddNewCardOpenModelOpen(false)}
      />
    </View>
  );
};

export default DebitCardScreen;

// Styles
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
});
