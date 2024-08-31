import styled, { keyframes } from 'styled-components';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import Button from '@components/common/button/Button.tsx';

const DialogContainer = styled.dialog`
  margin: auto;
  width: 300px;
  border: 0;
  border-radius: 18px;
  padding: 20px;
  overflow: visible;
  box-shadow: 0 5px 1px ${({ theme }) => theme.colors.shadow};
`;

const CanvasContainer = styled.div`
  width: 100%;
  height: 300px;
  margin-top: -180px;
`;

const TokenNumLabel = styled.div`
  background: ${({ theme }) => theme.gradiant['pink-linear']};
  font-size: 42px;
  color: white;
  text-shadow: 0 2px 1px ${({ theme }) => theme.colors['pink-shadow']};
  -webkit-text-stroke: 1px ${({ theme }) => theme.colors['pink-shadow']};
  font-weight: 900;
  border-radius: 32px;
  box-shadow: 0 5px 1px ${({ theme }) => theme.colors['pink-shadow']};
  text-align: center;
  padding: 10px 0;
`;

const TokenLabel = styled.div`
  margin: 20px;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.xl};
  text-align: center;
`;
const CloseButton = styled(Button)`
  margin: auto;
`;
const showAnimation = keyframes`
    0% {
        opacity: 0;
        transform: scale3d(.3, .3, .3)
    }
    20% {
        transform: scale3d(1.1, 1.1, 1.1)
    }
    40% {
        transform: scale3d(.9, .9, .9)
    }
    60% {
        transform: scale3d(1.03, 1.03, 1.03)
    }
    80% {
        transform: scale3d(.97, .97, .97)
    }
    100% {
        opacity: 1;
        transform: scale3d(1, 1, 1)
    }
`;

const AnimationContainer = styled.div`
  opacity: 0;
  animation: ${showAnimation} 2s linear 0.5s forwards;
`;

const RotatingScene = ({ scene }) => {
  const ref = useRef<THREE.Group>(null!);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    setStartTime(performance.now()); // 애니메이션 시작 시간 기록
  }, []);

  useFrame(() => {
    if (startTime !== null) {
      const elapsed = (performance.now() - startTime) / 1500; // 3초 동안의 경과 시간
      const t = Math.min(elapsed, 1); // t는 0에서 1로 변화

      if (t <= 1) {
        // 가속도 함수 (빠르게 회전하다가 천천히 회전하도록)
        const progress = Math.sin((t * Math.PI) / 2); // 0에서 π/2까지 변하는 값
        ref.current.rotation.z = progress * Math.PI * 5;
        ref.current.scale.set(progress * 2, progress * 2, progress * 2);
      } else {
        ref.current.rotation.z = 0;
      }
    }
  });

  return <primitive object={scene} ref={ref} />;
};

interface RoutineCompleteDialogProps {
  num: number;
  onCloseModal: () => void;
}

export default forwardRef(function RoutineCompleteDialog(
  props: RoutineCompleteDialogProps,
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const { scene } = useGLTF('/models/ghost_token.glb');

  const onClose = () => {
    setIsOpen(false);
    props.onCloseModal();
  };

  return (
    <DialogContainer ref={ref} onFocus={() => setIsOpen(true)}>
      {isOpen && (
        <>
          <CanvasContainer>
            {
              <Canvas>
                <directionalLight position={[0, 1, 5]} rotation={[0, 0, 0]} />
                <group
                  position={[0, 0, 0]}
                  rotation={[
                    THREE.MathUtils.degToRad(90),
                    THREE.MathUtils.degToRad(20),
                    0
                  ]}
                >
                  <RotatingScene scene={scene} />
                </group>
              </Canvas>
            }
          </CanvasContainer>
          <AnimationContainer>
            <TokenLabel>루틴을 완료했습니다!</TokenLabel>
            <TokenNumLabel>{props.num}</TokenNumLabel>
            <TokenLabel>유령 토큰 획득!</TokenLabel>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <CloseButton onClick={onClose} buttonColor={'red'}>
                X 닫기
              </CloseButton>
            </div>
          </AnimationContainer>
        </>
      )}
    </DialogContainer>
  );
});
