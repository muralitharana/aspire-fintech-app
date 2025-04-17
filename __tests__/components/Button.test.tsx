import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Button from '../../src/components/Button';
import {Colors} from '../../src/configs/Colors';

describe('Button component', () => {
  const title = 'Test Button';

  test('renders the button with the given title', () => {
    const {getByText} = render(<Button title={title} />);
    expect(getByText(title)).toBeTruthy();
  });

  test('triggers onPress when pressed', () => {
    const onPressMock = jest.fn();
    const {getByText} = render(<Button title={title} onPress={onPressMock} />);
    fireEvent.press(getByText(title));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  test('applies correct button and title colors from props', () => {
    const {getByTestId} = render(
      <Button title={title} buttonColor="secondary" titleColor="black" />,
    );

    const buttonContainer = getByTestId('button-container');
    const buttonText = getByTestId('button-text');

    const buttonStyle = buttonContainer.props.style;
    const flattenedButtonStyle = Array.isArray(buttonStyle)
      ? Object.assign({}, ...buttonStyle)
      : buttonStyle;
    expect(flattenedButtonStyle.backgroundColor).toBe(Colors.secondary);

    const textStyle = buttonText.props.style;
    const flattenedTextStyle = Array.isArray(textStyle)
      ? Object.assign({}, ...textStyle)
      : textStyle;
    expect(flattenedTextStyle.color).toBe(Colors.black);
  });
});
