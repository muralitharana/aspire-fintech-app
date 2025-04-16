import {ActionItems} from '../../types/debitCardTypes';
import {SVGIconsName} from '../../types/svgIconsTypes';

interface ProcessActionItems {
  actionItems: ActionItems[];
  isAmountLimitEnabled: boolean;
  isCardFreezed: boolean;
}

// Static Action Items
const ACTION_ITEMS: ActionItems[] = [
  {
    id: 1,
    title: 'Top-Up account',
    description: 'Deposit money to your account to use with card',
    iconName: 'TopUp',
  },
  {
    id: 2,
    title: 'Weekly spending limit',
    description: 'You haven’t set any spending limit on card',
    iconName: 'WeeklyLimit',
    actionIconName: 'ToggleOff',
    enableToggle: true,
  },
  {
    id: 3,
    title: 'Freeze card',
    description: 'Your debit card is currently active',
    iconName: 'Freeze',
    actionIconName: 'ToggleOff',
  },
  {
    id: 4,
    title: 'Get a new card',
    description: 'This deactivates your current debit card',
    iconName: 'Deactivate',
  },
  {
    id: 5,
    title: 'Deactivated cards',
    description: 'Your previously deactivated cards',
    iconName: 'Newcard',
  },
];

function processActionItems({
  actionItems,
  isAmountLimitEnabled,
  isCardFreezed,
}: ProcessActionItems) {
  return actionItems.map((item, i) => {
    if (i === 1) {
      const isEnabled = isAmountLimitEnabled;
      return {
        ...item,
        enableToggle: isEnabled,
        actionIconName: isEnabled
          ? ('ToggleOn' as SVGIconsName)
          : ('ToggleOff' as SVGIconsName),
      };
    }

    if (i == 2) {
      return {
        ...item,
        enableToggle: isCardFreezed,
        actionIconName: isCardFreezed
          ? ('ToggleOn' as SVGIconsName)
          : ('ToggleOff' as SVGIconsName),
      };
    }
    return item;
  });
}

export {ACTION_ITEMS, processActionItems};
