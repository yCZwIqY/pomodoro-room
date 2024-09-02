import { FurnitureData } from '@store/useMyFurnitureStore.ts';
import { Canvas } from '@react-three/fiber';
import { useMemo, useState } from 'react';
import FurnitureModel from '@components/room/model/FurnitureModel.tsx';
import styled from 'styled-components';

const MyBagItemContainer = styled.div`
  padding: 10px;
  position: relative;
  cursor: ${({ isZero }) => (isZero ? 'no-drop' : 'pointer')};
`;

const MyBagItemTextureImg = styled.img`
  width: 100px;
  height: 100px;
  filter: ${({ isZero }) => (isZero ? 'grayscale()' : 'none')};
`;

const NameLabel = styled.div`
  text-align: center;
  padding: 5px;
  background-color: ${({ theme, isZero }) =>
    isZero ? theme.colors.grey : theme.colors.text};
  color: white;
  border-radius: 5px;
`;

const CountLabel = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
  background-color: ${({ theme, isZero }) =>
    isZero ? theme.colors.grey : theme.colors.base};
  color: white;
  border-radius: 5px;
`;

interface MyBagItemProps {
  data: FurnitureData;
}

export default function MyBagItem({ data }: MyBagItemProps) {
  // const { scene } = useLoader(GLTFLoader, `/models/furniture/${getPath()}`);
  const isTexture = useMemo<boolean>(
    () => ['wallpaper', 'tile'].includes(data.category),
    [data]
  );
  const isZero = useMemo<boolean>(() => data.count <= 0, [data]);

  const getPath = () => {
    if (isTexture) {
      return `/textures/${data.path}`;
    } else {
      return `/models/furniture/${data.path}`;
    }
  };

  return (
    <MyBagItemContainer isZero={isZero}>
      {isTexture ? (
        <MyBagItemTextureImg isZero={isZero} src={getPath()} alt={data.name} />
      ) : (
        <Canvas
          key={`my-bag-${data.id}`}
          camera={{
            zoom: 1.5,
            near: 1,
            far: 100,
            fov: 20,
            position: [10, 15, 13]
          }}
          style={{
            width: '100px',
            height: '100px',
            display: 'block'
          }}
        >
          <rectAreaLight
            width={100}
            height={100}
            color={isZero ? '#777777' : '#FFFFFF'}
            intensity={1}
            position={[0, 10, 0]}
            rotation-x={-Math.PI / 2}
            castShadow={false}
          />
          <FurnitureModel
            key={`my-bag-${data.id}`}
            data={{ ...data, position: [0, 0, 0], rotation: [0, 0, 0] }}
          />
        </Canvas>
      )}
      <NameLabel isZero={isZero}>{data.name}</NameLabel>
      <CountLabel isZero={isZero}>{data.count}</CountLabel>
    </MyBagItemContainer>
  );
}
