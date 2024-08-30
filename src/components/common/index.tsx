import styled from "styled-components";
import STYLE from '../../theme';
export const CommonContainer = styled.div`
    background: white;
    padding: 20px;
    border-radius: 21px;
    box-shadow: 0px 4px 1px ${props => props.theme.colors.shadow};
`;