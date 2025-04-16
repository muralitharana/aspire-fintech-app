import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import FontAwesome6 from '@react-native-vector-icons/fontawesome6';
import {Colors, ColorType} from '../configs/Colors';
import {moderateScale} from '../configs/ScalingSize';

const BackButton = ({
  color,
  ...props
}: TouchableOpacityProps & {color: ColorType}) => {
  return (
    <TouchableOpacity style={styles.container} {...props}>
      <FontAwesome6
        name="angle-left"
        size={moderateScale(20)}
        color={color || Colors.white}
        iconStyle="solid"
      />
    </TouchableOpacity>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
