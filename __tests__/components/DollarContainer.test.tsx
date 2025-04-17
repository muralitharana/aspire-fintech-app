import React from 'react';
import {render} from '@testing-library/react-native';
import DollarContainer from '../../src/components/DollarContainer';
import {Colors} from '../../src/configs/Colors';

describe('DollarContainer', () => {
  test('renders the dollar symbol', () => {
    const {getByText} = render(<DollarContainer />);
    const dollarText = getByText('S$');

    expect(dollarText).toBeTruthy();
  });

  test('applies correct styles to container and text', () => {
    const {getByText} = render(<DollarContainer />);
    const dollarText = getByText('S$');

    // Flatten styles to check specific values
    const textStyle = Array.isArray(dollarText.props.style)
      ? Object.assign({}, ...dollarText.props.style)
      : dollarText.props.style;

    expect(textStyle.color).toBe(Colors.white);
    expect(textStyle.letterSpacing).toBe(2);
  });
});
