import React from 'react';
import {StyleSheet, Text, TextProps, TextStyle, View} from 'react-native';
import SVGIcons from './SVGIcons';
import BackButton from './BackButton';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../configs/ScalingSize';
import {Fonts} from '../configs/Fonts';
import {Colors} from '../configs/Colors';

interface HeaderProps {
  title: string;
  onBackButtonPress?: () => void;
  textStyles?: TextStyle;
}

const Header = ({title, textStyles, onBackButtonPress}: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        {onBackButtonPress && (
          <BackButton onPress={onBackButtonPress} color={'grey'} />
        )}
        <Text style={[styles.title, {...textStyles}]}>{title}</Text>
      </View>

      <SVGIcons
        width={horizontalScale(25)}
        height={verticalScale(27)}
        iconName="AppLogo"
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: horizontalScale(10),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(5),
  },
  leftSection: {
    alignItems: 'flex-start',
  },
  title: {
    fontFamily: Fonts.fontBold,
    fontSize: moderateScale(24),
    color: Colors.white,
    marginTop: verticalScale(5),
  },
});
