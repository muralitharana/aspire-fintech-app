import React from 'react';
import {render} from '@testing-library/react-native';
import AmountDisplayer from '../../src/components/AmountDisplayer';
import {Colors} from '../../src/configs/Colors';

// Mock DollarContainer to isolate AmountDisplayer
jest.mock('../../src/components/DollarContainer', () => {
  return () => <mock-dollar-container testID="dollar-container" />;
});

describe('AmountDisplayer', () => {
  test('renders DollarContainer', () => {
    const {getByTestId} = render(<AmountDisplayer amount={123} />);
    expect(getByTestId('dollar-container')).toBeTruthy();
  });

  test('displays the correct amount text', () => {
    const {getByText} = render(<AmountDisplayer amount={456} />);
    expect(getByText('456')).toBeTruthy();
  });

  test('does not render amount text when amount is falsy', () => {
    const {queryByText} = render(<AmountDisplayer amount={''} />);
    expect(queryByText('')).toBeNull();
  });

  test('applies correct color from amountColor prop', () => {
    const {getByText} = render(
      <AmountDisplayer amount="888" amountColor="primary" />,
    );

    const amountText = getByText('888');
    const flattenedStyle = Array.isArray(amountText.props.style)
      ? Object.assign({}, ...amountText.props.style)
      : amountText.props.style;

    expect(flattenedStyle.color).toBe(Colors.primary);
  });
});
