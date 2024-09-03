import GhostModel from '@components/room/model/GhostModel.tsx';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import FurnitureModel from '@components/room/model/FurnitureModel.tsx';
import { useHelper } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Texture, Vector3 } from 'three';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';
import useEditModeStore from '@store/useEditModeStore.ts';

interface RoomModelProps {
  isEditMode: boolean;
}

export default function RoomModel() {
  const {
    tempPosition,
    isEditMode,
    targetObject,
    targetObjectId,
    reset,
    setTempPosition
  } = useEditModeStore();
  const { myFurniture } = useMyFurnitureStore();
  const wallGroupRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const furnitureGroupRef = useRef<THREE.Group>(null);
  const { scene } = useThree();
  const [wallPaperTexture, setWallPaperTexture] = useState<Texture>(null);
  const [tileTexture, setTileTexture] = useState<Texture>(null);
  const mouse = useRef(new THREE.Vector2());

  useHelper(lightRef, THREE.SpotLightHelper);

  useEffect(() => {
    if (myFurniture) {
      loadTexture(
        `/textures/${myFurniture.wallpaper.path}`,
        `/textures/${myFurniture.tile.path}`
      );
    }
  }, [myFurniture]);

  useEffect(() => {
    if (furnitureGroupRef) {
      applyTextureToScene();
    }
  }, [furnitureGroupRef]);

  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    });
  }, []);

  useFrame(({ camera, pointer }) => {
    if (isEditMode && targetObject) {
      const xPos = pointer.x * 7.5;
      const zPos = -pointer.y * 7.5;

      if (xPos > 5 || xPos < -5 || zPos > 5 || zPos < -5) {
        return;
      }

      targetObject.position.set(xPos, targetObject.position.y, zPos);
      setTempPosition(targetObjectId, {
        position: [xPos, targetObject.position.y, zPos],
        rotation: [
          THREE.MathUtils.radToDeg(targetObject.rotation.x),
          THREE.MathUtils.radToDeg(targetObject.rotation.y),
          THREE.MathUtils.radToDeg(targetObject.rotation.z)
        ]
      });
    }
  });

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
      {reset > 0 && (
        <group ref={furnitureGroupRef}>
          {myFurniture.furniture.map((it) => {
            return (
              <FurnitureModel
                key={`${it.id}-${reset}`}
                data={it}
                mousePos={mouse.current}
              />
            );
          })}
        </group>
      )}
    </group>
  );
}
