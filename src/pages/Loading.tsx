import styled, { keyframes } from 'styled-components';

const roomBgMove = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-30%);
    }
`;

const LoadingContainer = styled.main`
  width: 100dvw;
  height: 100dvh;
  overflow: hidden;
  position: relative;
`;

const LoadingBackground = styled.div`
  width: 200%;
  height: 100%;
  background: ${(props) => props.theme.gradiant.linear};
  animation: ${roomBgMove} 5s linear infinite;
  position: absolute;
  z-index: -5;
`;
const LoadingBarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 58px;
  text-shadow: 0 4px 1px ${({ theme }) => theme.colors.shadow};
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors.shadow};
`;
const dotAnimation = keyframes`
    0% {
        width: 0;
    }
    24%{
        width: 0;
    }
    25% {
        width: 30%;
    }
    49% {
        width: 30%;
    }
    50% {
        width: 60%;
    }
    74% {
        width: 60%;
    }
    75% {
        width: 100%;
    }
    99% {
        width: 100%;
    }
    100% {
        width: 0;
    }
`;

const DotWrapper = styled.div`
  animation: ${dotAnimation} 1s linear infinite;
  overflow: hidden;
`;
export default function Loading() {
  return (
    <LoadingContainer>
      <LoadingBackground></LoadingBackground>
      <LoadingBarContainer>
        <div>LOADING</div>
        <div style={{ width: '65px', overflow: 'hidden' }}>
          <DotWrapper>...</DotWrapper>
        </div>
      </LoadingBarContainer>
    </LoadingContainer>
  );
}
