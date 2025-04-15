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
  currency: number;
}

export interface WeeklyDebitLimitType {
  amountLimit: number;
  amountSpend: number;
}

export interface DebitCardType {
  id: number;
  cardDetails: DebitCardDetailsType | null;
  accountBalance: AccountBalanceType | null;
  weeklyLimit: WeeklyDebitLimitType | null;
}

export interface ActionItems {
  id: number;
  title: string;
  description: string;
  iconName: SVGIconsName;
  actionIconName?: SVGIconsName;
}
