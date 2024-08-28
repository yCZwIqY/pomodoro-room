import styled from "styled-components";
import STYLE from '@styles/variables.ts';
export const GlassContainer = styled.div`
    background: ${STYLE.colors.glass};
    padding: 20px;
    border-radius: 20px;
    backdrop-filter: blur(10px);
`;

export const Button = styled.button`
    background-color: white;
    color: black;
    border-radius: 20px;
`;

export const SmallIconButton = styled.button<{url: string}>`
    background: ${(({url}) => `url("${url}") center/cover no-repeat`)};
    width: 15px;
    height: 15px;
    border: none;
    outline: none;
    display: inline-block;
    color: white;
`;

export const IconButton = styled.button<{url: string, disabled?: boolean}>`
    background: ${(({url}) => `url("${url}") center/cover no-repeat`)};
    opacity: ${(({disabled}) => disabled ? 0.5 : 1)};
    width: 20px;
    height: 20px;
    border: none;
    outline: none;
    display: inline-block;
    color: white;
`;