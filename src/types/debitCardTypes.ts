import {SVGIconsName} from './svgIconsTypes';

export interface DebitCardType {
  userName: string;
  cardNumber: string[];
  expireDate: string;
  cvv: string;
  sellingCompany: string;
  cardBrand: 'Visa' | 'MasterCard';
}

export interface ActionItems {
  id: number;
  title: string;
  description: string;
  iconName: SVGIconsName;
  actionIconName?: SVGIconsName;
}
