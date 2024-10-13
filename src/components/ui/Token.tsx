import styled from 'styled-components';
import useTokenStore from '@store/useTokenStore.tsx';

const TokenContainer = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  ${({ $position }) => `${$position}: 10px;`}
  top: 10px;
  background-color: #ffffff49;
  border-radius: 21px;
  height: 30px;
  width: 130px;
  display: flex;
  align-items: center;

  &:before {
    content: '';
    display: block;
    background: url('/images/ghost_token.png') center/contain no-repeat;
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

interface TokenProps {
  position?: 'left' | 'right';
}
export default function Token({ position = 'left' }: TokenProps) {
  const { token } = useTokenStore();

  return (
    <TokenContainer $position={position ?? 'left'}>
      <TokenLabel>{token}</TokenLabel>
    </TokenContainer>
  );
}
