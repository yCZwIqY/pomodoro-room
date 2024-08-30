import styled from 'styled-components';
import { b } from 'vite/dist/node/types.d-aGj9QkWt';

export const ButtonContainer = styled.button`
  background-color: ${({ theme, buttonColor }) =>
    `${theme.buttonColors[buttonColor].bg}`};
  box-shadow: ${({ theme, buttonColor }) =>
    `0 5px 1px ${theme.buttonColors[buttonColor].shadow}`};
  font-size: ${({ theme }) => theme.fontSize.lg};
  width: ${({ fullWidth }) => fullWidth && '100%'};
  border: 3px solid white;
  outline: none;
  display: inline-block;
  color: white;
  border-radius: 18px;
  padding: 10px 15px;

  &:active {
    background-color: ${({ theme, buttonColor }) =>
      `${theme.buttonColors[buttonColor].shadow}`};
    backdrop-filter: grayscale(50);
    color: #d0b2b2;
    opacity: 0.5;
    box-shadow: none;
    transform: translateY(4px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;

    &:active {
      transform: initial;
      background: ${({ url }) => `url("${url}") center/70% no-repeat`};
      background-color: ${({ theme, buttonColor }) =>
        `${theme.buttonColors[buttonColor].bg}`};
      box-shadow: ${({ theme, buttonColor }) =>
        `0 5px 1px ${theme.buttonColors[buttonColor].shadow}`};
      color: white;
    }
  }
`;

interface ButtonProps {
  children: string;
  disabled?: boolean;
  buttonColor?: ButtonColor;
  fullWidth?: boolean;
}

type ButtonColor = 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'pink';

export default function Button({
  children,
  disabled = false,
  buttonColor = 'blue',
  fullWidth = false
}: ButtonProps) {
  return (
    <ButtonContainer
      buttonColor={buttonColor}
      disabled={disabled}
      fullWidth={fullWidth}
    >
      {children}
    </ButtonContainer>
  );
}
