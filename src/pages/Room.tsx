import { Canvas, useFrame, useThree } from '@react-three/fiber';
import RoomModel from '@components/room/model/RoomModel.tsx';
import { OrbitControls } from '@react-three/drei';
import styled, { keyframes } from 'styled-components';
import Timer from '@components/ui/timer/Timer.tsx';
import Token from '@components/ui/Token.tsx';
import IconButton from '@components/common/button/IconButton.tsx';
import { useEffect, useRef, useState } from 'react';
import MyBagComponent from '@components/room/MyBag.tsx';
import {
  EffectComposer,
  Outline,
  Selection
} from '@react-three/postprocessing';
import * as THREE from 'three';
import { gsap } from 'gsap';

import useEditModeStore from '@store/useEditModeStore.ts';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';
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

const SideNav = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  position: absolute;
  left: 10px;
  top: 60px;
  height: 100dvh;
`;

function CameraController({ editMode }) {
  const { camera, scene } = useThree();

  useEffect(() => {
    if (editMode) {
      gsap.to(camera.position, {
        x: () => 0,
        y: () => 5,
        z: () => 15,
        ease: 'power3.inOut',
        duration: 0.8,
        onUpdate: () => camera.lookAt(0, 0, 0)
      });
      gsap.to(camera.position, {
        x: () => 0,
        y: () => 15,
        z: () => 0,
        ease: 'power3.inOut',
        delay: 0.8,
        duration: 1,
        onUpdate: () => camera.lookAt(0, 0, 0)
      });
    } else {
      gsap.to(camera.position, {
        x: () => 10,
        y: () => 8,
        z: () => 13,
        onComplete: () => camera.lookAt(0, 0, 0)
      });
    }
  }, [editMode]);

  return null;
}

export default function Room() {
  const { isEditMode, onToggleMode, setReset, tempPosition } =
    useEditModeStore();
  const control = useRef(null);
  const { myFurniture, updateFurnitureData } = useMyFurnitureStore();
  const onClickEdit = () => {
    onToggleMode();
  };
  const onClickShop = () => {
    if (tempPosition) {
      Object.keys(tempPosition).map((key) => {
        console.log(
          myFurniture.furniture.map((it) => {
            if (it.id === key) {
              return { ...it, ...tempPosition[key] };
            } else return it;
          }),
          tempPosition
        );
        updateFurnitureData(
          myFurniture.furniture.map((it) => {
            if (it.id === key) {
              return { ...it, ...tempPosition[key] };
            } else return it;
          })
        );
        console.log(myFurniture.furniture);
      });
    }
  };
  const onClickHome = () => {
    setReset();
    onToggleMode();
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
        <CameraController editMode={isEditMode} />
        <OrbitControls
          ref={control}
          minAzimuthAngle={-Math.PI / 2}
          maxAzimuthAngle={isEditMode ? Math.PI : Math.PI / 2}
          minPolarAngle={isEditMode ? 0 : Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={10}
          maxDistance={35}
          enabled={!isEditMode}
        />
        <ambientLight intensity={0.5} />
        <RoomModel />
      </Canvas>
      <Timer />
      <Token />
      <SideNav>
        {isEditMode ? (
          <>
            <IconButton
              url={'/icons/home.svg'}
              onClick={onClickHome}
              size={'40px'}
            />
          </>
        ) : (
          <>
            <IconButton
              url={'/icons/edit-move.svg'}
              onClick={onClickEdit}
              buttonColor={'pink'}
              size={'40px'}
            />
            <IconButton
              url={'/icons/shop.svg'}
              onClick={onClickShop}
              buttonColor={'purple'}
              size={'40px'}
            />
          </>
        )}

        <IconButton
          url={'/icons/shop.svg'}
          onClick={onClickShop}
          buttonColor={'purple'}
          size={'40px'}
        />
      </SideNav>
      <MyBagComponent />
    </RoomContainer>
  );
}
