import React from 'react';

import {Colors} from '../configs/Colors';
import {SvgProps} from 'react-native-svg';
import {moderateScale} from '../configs/ScalingSize';
import DebitIcon from '../assets/images/debit.svg';
import UserIcon from '../assets/images/user.svg';
import HomeIcon from '../assets/images/home.svg';
import PaymentIcon from '../assets/images/payments.svg';
import CreditIcon from '../assets/images/credit.svg';
import AspireLogo from '../assets/images/AspireLogo.svg';
import CardBrandVisa from '../assets/images/Visa Logo.svg';
import EyeOpen from '../assets/images/eye-open.svg';
import EyeClosed from '../assets/images/eye-closed.svg';
import AppLogo from '../assets/images/Logo.svg';
import TopUp from '../assets/images/topup.svg';
import WeeklyLimit from '../assets/images/WeeklyLimit.svg';
import Freeze from '../assets/images/freeze.svg';
import Deactivate from '../assets/images/deactivate.svg';
import Newcard from '../assets/images/newcard.svg';
import ToggleOff from '../assets/images/toggleoff.svg';
import Weekly from '../assets/images/weekly.svg';
import ToggleOn from '../assets/images/toggleon.svg';
import AspireHome from '../assets/images/AspireHome.svg';
import {SVGIconsName} from '../types/svgIconsTypes';
interface SVGIconsProps extends SvgProps {
  iconName: SVGIconsName;
  focused?: boolean;
}

const iconMap: Record<string, React.FC<SvgProps>> = {
  DebitIcon,
  UserIcon,
  HomeIcon,
  PaymentIcon,
  CreditIcon,
  AspireLogo,
  CardBrandVisa,
  EyeOpen,
  EyeClosed,
  AppLogo,
  TopUp,
  WeeklyLimit,
  Freeze,
  Deactivate,
  Newcard,
  ToggleOff,
  Weekly,
  ToggleOn,
  AspireHome,
};

const SVGIcons: React.FC<SVGIconsProps> = ({
  iconName,
  focused = false,
  ...props
}) => {
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
