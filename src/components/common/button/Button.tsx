import styled from 'styled-components';
import { MouseEventHandler } from 'react';

export const ButtonContainer = styled.button`
    background-color: ${({theme, $buttonColor}) =>
            `${theme.buttonColors[$buttonColor].bg}`};
    box-shadow: ${({theme, $buttonColor}) =>
            `0 5px 1px ${theme.buttonColors[$buttonColor].shadow}`};
    font-size: ${({theme}) => theme.fontSize.lg};
    width: ${({$fullWidth}) => $fullWidth && '100%'};
    border: 3px solid white;
    outline: none;
    display: inline-block;
    color: white;
    border-radius: 18px;
    padding: 10px 15px;

    &:active {
        background-color: ${({theme, $buttonColor}) =>
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
            background: ${({url}) => `url("${url}") center/70% no-repeat`};
            background-color: ${({theme, $buttonColor}) =>
                    `${theme.buttonColors[$buttonColor].bg}`};
            box-shadow: ${({theme, $buttonColor}) =>
                    `0 5px 1px ${theme.buttonColors[$buttonColor].shadow}`};
            color: white;
        }
    }

    @media ${({theme}) => theme.device.tablet} {
        font-size: ${({theme}) => theme.fontSize.md};
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
}

type ButtonColor = 'red' | 'green' | 'purple' | 'yellow' | 'blue' | 'pink';

export default function Button({
  children,
  disabled = false,
  buttonColor = 'blue',
  fullWidth = false,
  onClick
}: ButtonProps) {
  return (
    <ButtonContainer
      $buttonColor={buttonColor}
      disabled={disabled}
      $fullWidth={fullWidth}
      onClick={onClick}
    >
      {children}
    </ButtonContainer>
  );
}
