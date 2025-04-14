// src/components/TabBarIcon.tsx
import React from 'react';
import FontAwesome from '@react-native-vector-icons/fontawesome6';
import {moderateScale} from '../configs/ScalingSize';
import {Colors} from '../configs/Colors';

interface IconProps {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  focused: boolean;
}

const TabBarIcon: React.FC<IconProps> = ({name, focused}) => {
  return (
    <FontAwesome
      size={moderateScale(20)}
      name={name}
      iconStyle="solid"
      color={focused ? Colors.primary : Colors.grey}
    />
  );
};

export default TabBarIcon;
