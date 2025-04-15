import React, {useMemo} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  GestureResponderEvent,
} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../configs/ScalingSize';
import {Colors} from '../configs/Colors';
import {Fonts} from '../configs/Fonts';
import SVGIcons from './SVGIcons';
import {DebitCardDetailsType, DebitCardType} from '../types/debitCardTypes';
import {SVGIconsName} from '../types/svgIconsTypes';

interface DebitCardProps extends DebitCardDetailsType {
  cardBrandIcon: SVGIconsName;
  sellingCompanyIcon: SVGIconsName;
  isAccountNumberHidden: boolean;
  isFreezed?: boolean;
}

const HidingDot = ({length}: {length: number}) => {
  return (
    <View style={styles.hiddenBlock}>
      {Array.from({length}).map((_, i) => (
        <View key={i} style={styles.dot} />
      ))}
    </View>
  );
};

const DebitCard = ({
  userName,
  cardNumber,
  expireDate,
  cvv,
  cardBrandIcon,
  sellingCompanyIcon,
  isFreezed = false,
  isAccountNumberHidden = true,
}: DebitCardProps) => {
  const cardNumberMapped = useMemo(() => {
    if (!cardNumber) return [];

    const lastIndex = cardNumber.length - 1;

    return cardNumber.map((num, index) => {
      if (isAccountNumberHidden && index !== lastIndex) {
        return {
          isHidden: true,
          length: num.length,
        };
      }
      return {
        isHidden: false,
        value: num,
      };
    });
  }, [cardNumber, isAccountNumberHidden]);

  return (
    <Pressable style={[styles.container]}>
      <View
        style={[
          styles.content,
          {backgroundColor: isFreezed ? Colors.grey : Colors.primary},
        ]}>
        {/* Top Right Company Logo */}
        <View style={styles.topRightLogo}>
          <SVGIcons
            iconName={sellingCompanyIcon}
            width={horizontalScale(74)}
            height={verticalScale(21)}
          />
        </View>

        {/* Cardholder Name */}
        <View style={styles.nameContainer}>
          <Text style={styles.nameText}>{userName}</Text>
        </View>

        {/* Card Number */}
        <View style={styles.cardNumberContainer}>
          {cardNumberMapped.map((item, index) => {
            if (item.isHidden) {
              return <HidingDot length={item?.length || 0} key={index} />;
            }
            return (
              <Text key={index} style={styles.cardNumberText}>
                {item.value}
              </Text>
            );
          })}
        </View>

        {/* Expiry & CVV */}
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>{expireDate}</Text>

          <Text style={[styles.infoText, {marginRight: 0}]}>{'CVV: '}</Text>
          {isAccountNumberHidden ? (
            <HidingDot length={cvv.length} />
          ) : (
            <Text style={styles.infoText}>{cvv}</Text>
          )}
        </View>

        {/* Bottom Right Brand Logo */}
        <View style={styles.bottomRightLogo}>
          <SVGIcons
            iconName={cardBrandIcon}
            width={horizontalScale(59)}
            height={verticalScale(20)}
          />
        </View>
      </View>
    </Pressable>
  );
};

export default DebitCard;

const styles = StyleSheet.create({
  container: {
    borderColor: Colors.greyLight,
    borderRadius: moderateScale(8),
    marginVertical: verticalScale(5),
    margin: moderateScale(12),
  },
  content: {
    justifyContent: 'space-between',
    padding: moderateScale(21),
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(10),
  },
  toggleButton: {
    padding: moderateScale(10),
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderTopLeftRadius: moderateScale(5),
    borderTopRightRadius: moderateScale(5),
    position: 'absolute',
    alignSelf: 'flex-end',
    top: -verticalScale(28),
    zIndex: -1,
  },
  toggleIcon: {
    marginRight: horizontalScale(5),
  },
  toggleText: {
    fontFamily: Fonts.fontSemiBold,
    color: Colors.primary,
    fontSize: moderateScale(12),
  },
  topRightLogo: {
    alignItems: 'flex-end',
  },
  bottomRightLogo: {
    alignItems: 'flex-end',
  },
  nameContainer: {
    marginVertical: verticalScale(16),
  },
  nameText: {
    fontFamily: Fonts.fontBold,
    fontSize: moderateScale(24),
    color: Colors.white,
    letterSpacing: 0.6,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hiddenBlock: {
    flexDirection: 'row',
    marginRight: horizontalScale(18),
  },
  dot: {
    width: horizontalScale(6),
    height: horizontalScale(6),
    borderRadius: horizontalScale(3),
    backgroundColor: Colors.white,
    marginHorizontal: horizontalScale(2),
  },
  cardNumberText: {
    fontFamily: Fonts.fontSemiBold,
    letterSpacing: 3.46,
    color: Colors.white,
    marginRight: horizontalScale(18),
    fontSize: moderateScale(16),
  },
  infoRow: {
    flexDirection: 'row',
    marginVertical: verticalScale(10),
    alignItems: 'center',
  },
  infoText: {
    fontFamily: Fonts.fontSemiBold,
    letterSpacing: 1.2,
    color: Colors.white,
    marginRight: horizontalScale(30),
    fontSize: moderateScale(16),
  },
});
