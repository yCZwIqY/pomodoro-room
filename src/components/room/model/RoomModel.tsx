import GhostModel from '@components/room/model/GhostModel.tsx';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FurnitureModel from '@components/room/model/FurnitureModel.tsx';
import { useHelper } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { Texture } from 'three';
import useMyFurnitureStore from '@store/furnitureStore.ts';

interface RoomModelProps {
  editMode: boolean
}
export default function RoomModel({editMode}: RoomModelProps) {
  const wallGroupRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const furnitureGroupRef = useRef<THREE.Group>(null);
  const { scene } = useThree();
  const [wallPaperTexture, setWallPaperTexture] = useState<Texture>(null);
  const [tileTexture, setTileTexture] = useState<Texture>(null);
  const { myFurniture } = useMyFurnitureStore();

  useHelper(lightRef, THREE.SpotLightHelper);
  useEffect(() => {
    loadTexture(
      '/textures/wallpaper/basic_wallpaper.png',
      '/textures/tile/basic_tile.png'
    );
  }, []);

  useEffect(() => {
    if (furnitureGroupRef) {
      applyTextureToScene();
    }
  }, [furnitureGroupRef]);

  const applyTextureToScene = () => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material.map) {
          child.material = new THREE.MeshToonMaterial({
            map: child.material.map,
            opacity: child.material.opacity,
            radientMap: null
          });
        }
      }
    });
  };

  const loadTexture = (wallPaperImagePath, tileImagePath) => {
    const loader = new THREE.TextureLoader();
    loader.load(wallPaperImagePath, (loadedTexture) => {
      setWallPaperTexture(loadedTexture);
    });

    loader.load(tileImagePath, (loadedTexture) => {
      setTileTexture(loadedTexture);
    });
  };

  return (
    <group>
      {wallPaperTexture && (
        <group ref={wallGroupRef}>
          {/*back*/}
          <mesh position={[0, 4, -5]} scale={[10, 8, 10]}>
            <planeGeometry />
            <meshToonMaterial map={wallPaperTexture} />
          </mesh>
          {/*left*/}
          <mesh
            position={[-5, 4, 0]}
            scale={[10, 8, 10]}
            rotation={[0, THREE.MathUtils.degToRad(90), 0]}
          >
            <planeGeometry />
            <meshToonMaterial map={wallPaperTexture} />
          </mesh>
          {/*right*/}
          <mesh
            position={[5, 4, 0]}
            scale={[10, 8, 10]}
            rotation={[0, THREE.MathUtils.degToRad(-90), 0]}
          >
            <planeGeometry />
            <meshToonMaterial map={wallPaperTexture} />
          </mesh>
          <mesh
            position={[0, 4, 5]}
            scale={[10, 8, 10]}
            rotation={[0, THREE.MathUtils.degToRad(180), 0]}
          >
            <planeGeometry />
            <meshToonMaterial map={wallPaperTexture} />
          </mesh>
        </group>
      )}
      {tileTexture && (
        <mesh
          position={[0, 0, 0]}
          scale={[10, 10, 10]}
          rotation={[THREE.MathUtils.degToRad(-90), 0, 0]}
        >
          <planeGeometry />
          <meshToonMaterial map={tileTexture} />
        </mesh>
      )}
      <directionalLight ref={lightRef} intensity={1} position={[0, 10, 0]} />
      <GhostModel />
      <group ref={furnitureGroupRef}>
        {myFurniture.furniture.map((it) => {
          return (
            <FurnitureModel
              key={it.id}
              path={it.path}
              initialPosition={it.position}
              initialRotation={it.rotation}
            />
          );
        })}
      </group>
    </group>
  );
}
