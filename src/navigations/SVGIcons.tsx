import React from 'react';
import DebitIcon from '../images/debit.svg';
import UserIcon from '../images/user.svg';
import HomeIcon from '../images/home.svg';
import PaymentIcon from '../images/payments.svg';
import CreditIcon from '../images/credit.svg';
import {SvgProps} from 'react-native-svg';
import {moderateScale} from '../configs/ScalingSize';
import {Colors} from '../configs/Colors';

interface SVGIconsProps extends SvgProps {
  iconName:
    | 'DebitIcon'
    | 'UserIcon'
    | 'HomeIcon'
    | 'PaymentIcon'
    | 'CreditIcon'; // You can add more here
  focused: boolean;
}

const iconMap: Record<string, React.FC<SvgProps>> = {
  DebitIcon,
  UserIcon,
  HomeIcon,
  PaymentIcon,
  CreditIcon,
};

const SVGIcons: React.FC<SVGIconsProps> = ({iconName, focused, ...props}) => {
  const IconComponent = iconMap[iconName];

  if (!IconComponent) return null;

  return (
    <IconComponent
      width={moderateScale(22)}
      height={moderateScale(22)}
      fill={focused ? Colors.primary : Colors.greyLight}
      {...props}
    />
  );
};

export default SVGIcons;
