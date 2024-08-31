import styled from 'styled-components';
import useTokenStore from '../../store/tokenStore.tsx';

const TokenContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  background-color: #ffffff49;
  border-radius: 21px;
  height: 30px;
  width: 150px;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    display: block;
    background: url('/images/ghose_token.png') center/contain no-repeat;
    width: 80px;
    height: 80px;
    margin-left: -10px;
  }
`;

const TokenLabel = styled.div`
  flex: 1;
  text-align: center;
  margin-left: -40px;
  color: white;
`;

export default function Token() {
  const { token } = useTokenStore();

  return (
    <TokenContainer>
      <TokenLabel>{token}</TokenLabel>
    </TokenContainer>
  );
}
