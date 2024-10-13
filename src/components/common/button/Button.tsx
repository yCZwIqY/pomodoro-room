import styled from 'styled-components';
import { MouseEventHandler } from 'react';

export const ButtonContainer = styled.button<{
  $buttonColor: ButtonColor;
  $size: string;
  $fullWidth?: boolean;
}>`
  background-color: ${({ theme, $buttonColor }) =>
    `${theme.buttonColors[$buttonColor].bg}`};
  box-shadow: ${({ theme, $buttonColor }) =>
    `0 5px 1px ${theme.buttonColors[$buttonColor].shadow}`};
  font-size: ${({ theme, $size }) => theme.fontSize[$size]};
  width: ${({ $fullWidth }) => $fullWidth && '100%'};
  border: 3px solid white;
  outline: none;
  display: inline-block;
  color: white;
  border-radius: 18px;
  padding: ${({ $size }) => {
    switch ($size) {
      case 'sm':
        return '8px 10px';
      case 'lg':
        return '13px 18px';
      default:
        return '10px 15px';
    }
  }};

  &:active {
    background-color: ${({ theme, $buttonColor }) =>
      `${theme.buttonColors[$buttonColor].shadow}`};
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
      background-color: ${({ theme, $buttonColor }) =>
        `${theme.buttonColors[$buttonColor].bg}`};
      box-shadow: ${({ theme, $buttonColor }) =>
        `0 5px 1px ${theme.buttonColors[$buttonColor].shadow}`};
      color: white;
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    font-size: ${({ theme }) => theme.fontSize.md};
    padding: 5px 10px;
    border-radius: 13px;
  }
`;

interface ButtonProps {
  children: string;
  disabled?: boolean;
  buttonColor?: ButtonColor;
  fullWidth?: boolean;
  onClick?: MouseEventHandler;
  size?: 'sm' | 'md' | 'lg';
}

type ButtonColor = 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'pink';

export default function Button({
  children,
  disabled = false,
  buttonColor = 'blue',
  fullWidth = false,
  onClick,
  size = 'md'
}: ButtonProps) {
  return (
    <ButtonContainer
      $buttonColor={buttonColor ?? 'blue'}
      disabled={disabled}
      $fullWidth={fullWidth}
      $size={size ?? 'md'}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
}
