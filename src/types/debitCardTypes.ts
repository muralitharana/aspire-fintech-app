import {SVGIconsName} from './svgIconsTypes';

export interface DebitCardDetailsType {
  userName: string;
  cardNumber: [string, string, string, string];
  expireDate: string;
  cvv: string;
  sellingCompany: string;
  cardBrand: string;
}

export interface AccountBalanceType {
  amount: number;
  currency: string;
}

export interface WeeklyDebitLimitType {
  amountLimit: number;
  amountSpend: number;
}

export interface CardStatusType {
  isFreezed: boolean;
}

export interface DebitCardType {
  id: number;
  cardDetails: DebitCardDetailsType | null;
  accountBalance: AccountBalanceType | null;
  weeklyLimit: WeeklyDebitLimitType | null;
  cardStatus: CardStatusType;
}

export interface ActionItems {
  id: number;
  title: string;
  description: string;
  iconName: SVGIconsName;
  actionIconName?: SVGIconsName;
  enableToggle?: boolean;
}
