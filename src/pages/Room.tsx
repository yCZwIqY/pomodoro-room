import {useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import Timer from '@components/ui/timer/Timer.tsx';
import Token from '@components/ui/Token.tsx';
import MyBagComponent from '@components/room/MyBag.tsx';
import useEditModeStore from '@store/useEditModeStore.ts';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';
import styled, {keyframes} from 'styled-components';
import RoomModel from '@components/room/model/RoomModel.tsx';
import {SideNavigation} from '@components/ui/SideNavigation.tsx';
import {useNavigate} from 'react-router-dom';
import FurnitureInfo from '@components/ui/FurnitureInfo.tsx';
import useMyBagStore from '@store/useMyBagStore.ts';

const roomBgMove = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-50%);
    }
`;

const RoomContainer = styled.main`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 400%;
    height: 100%;
    background: ${(props) => props.theme.gradiant['linear-4']};
    animation: ${roomBgMove} 5s linear infinite;
    z-index: -1;
  }
`;

export default function Room() {
  const { isEditMode, targetObject, onToggleMode, setReset, tempPosition, initTempPosition } =
    useEditModeStore();
  const { myFurniture, updateFurnitureData } = useMyFurnitureStore();
  const { saveBag, init } = useMyBagStore();
  const control = useRef(null);
  const navigator = useNavigate();

  const onClickEdit = () => {
    onToggleMode();
  };

  const onClickShop = () => {
    navigator('/shop/all');
  };

  const onClickHome = () => {
    onToggleMode();
    onClickCancel();
  };

  const onClickCancel = () => {
    init();
    setReset();
    initTempPosition(myFurniture.furniture);
  };

  const onClickSave = () => {
    updateFurnitureData(Object.values(tempPosition));
    saveBag();
  };

  return (
    <RoomContainer>
      <Canvas
          key={'room'}
        camera={{
          zoom: 0.3,
          near: 1,
          far: 100,
          fov: 20,
          position: [10, 8, 13]
        }}
        style={{ background: 'transparent' }}
      >
        {/*<CameraController editMode={isEditMode} />*/}
        <OrbitControls
          ref={control}
          minAzimuthAngle={isEditMode ? -Infinity :-Math.PI / 2}
          maxAzimuthAngle={isEditMode ?Infinity : Math.PI / 2}
          minPolarAngle={isEditMode ? 0 : Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={10}
          maxDistance={35}
          enabled={!targetObject}
        />
        <ambientLight intensity={0.5} />
        <RoomModel />
      </Canvas>
      <Timer />
      <Token />
      <SideNavigation
        isEditMode={isEditMode}
        onClickHome={onClickHome}
        onClickEdit={onClickEdit}
        onClickShop={onClickShop}
        onClickReset={onClickCancel}
        onClickSave={onClickSave}
      />
      <MyBagComponent />
      <FurnitureInfo />
    </RoomContainer>
  );
}
