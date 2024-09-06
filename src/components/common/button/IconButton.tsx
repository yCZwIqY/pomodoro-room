import styled from 'styled-components';
import { MouseEventHandler } from 'react';

export const IconButtonContainer = styled.button`
  background: ${({ url }) => `url("${url}") center/70% no-repeat`};
  background-color: ${({ theme, $buttonColor }) =>
    `${theme.buttonColors[$buttonColor].bg}`};
  box-shadow: ${({ theme, $buttonColor }) =>
    `0 5px 1px ${theme.buttonColors[$buttonColor].shadow}`};
  width: ${({ size }) => `${size}`};
  height: ${({ size }) => `${size}`};
  border: 3px solid white;
  outline: none;
  display: inline-block;
  color: white;
  border-radius: 100%;

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
    }
  }

  @media ${({ theme }) => theme.device.tablet} {
    width: 35px;
    height: 35px;
  }
`;

interface IconButtonProps {
  url: string;
  disabled?: boolean;
  buttonColor?: ButtonColor;
  onClick: MouseEventHandler;
  size?: string;
}

type ButtonColor = 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'pink';

export default function IconButton({
  url,
  disabled = false,
  buttonColor = 'blue',
  onClick,
  size = '30px'
}: IconButtonProps) {
  return (
    <IconButtonContainer
      url={url}
      type={'button'}
      $buttonColor={buttonColor}
      disabled={disabled}
      onClick={onClick}
      size={size}
    />
  );
}
