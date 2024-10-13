import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import GhostModel from '@components/room/model/GhostModel.tsx';
import FurnitureModel from '@components/room/model/FurnitureModel.tsx';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';
import useEditModeStore from '@store/useEditModeStore.ts';
import { useTextures } from '@hooks/useTextures.ts';

export default function RoomModel() {
  const {
    tempPosition,
    isEditMode,
    targetObject,
    targetObjectId,
    reset,
    setTempPosition,
    initTempPosition,
    tempCoveringMaterial,
    initTempCoveringMaterial
  } = useEditModeStore();
  const { myFurniture } = useMyFurnitureStore();
  const floorRef = useRef(null);
  const { scene, raycaster, camera, pointer } = useThree();
  const { wallPaperTexture, tileTexture } = useTextures(
    tempCoveringMaterial.wallpaper.path,
    tempCoveringMaterial.tile.path,
    [tempCoveringMaterial]
  );

  const wallGroupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.SpotLight>(null);
  const furnitureGroupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (furnitureGroupRef.current) {
      applyTextureToScene();
    }
  }, [furnitureGroupRef, scene]);

  useEffect(() => {
    if (myFurniture.furniture.length > 0) {
      initTempPosition(myFurniture.furniture);
      initTempCoveringMaterial({
        wallpaper: myFurniture.wallpaper,
        tile: myFurniture.tile
      });
    }
  }, [
    myFurniture.furniture,
    myFurniture.wallpaper,
    myFurniture.tile,
    isEditMode
  ]);

  useFrame(({ pointer }) => {
    if (isEditMode && targetObject) {
      raycaster.setFromCamera(pointer, camera);
      const intersectFloor = raycaster.intersectObject(floorRef.current, true);
      const intersectWall = raycaster.intersectObject(
        wallGroupRef.current,
        true
      );

      let xPos = targetObject.position.x;
      let zPos = targetObject.position.z;

      const cameraZPos = Math.floor(Math.abs(camera.position.z));
      const cameraXPos = Math.floor(Math.abs(camera.position.x));
      if (intersectFloor.length <= 0 && intersectWall.length > 0) {
        const yDeg = Math.abs(
          THREE.MathUtils.radToDeg(intersectWall[0].object.rotation.y)
        );
        if (yDeg % 180 === 0 && cameraZPos >= 17 && cameraZPos <= 19) {
          xPos = intersectWall[0].point.x;
        } else if (yDeg % 180 === 90 && cameraXPos >= 17 && cameraXPos <= 19) {
          zPos = intersectWall[0].point.z;
        }
      } else {
        const { x, z } = intersectFloor[0].point;
        xPos = x;
        zPos = z;
      }

      if (xPos > 5 || xPos < -5 || zPos > 5 || zPos < -5) {
        return;
      }

      targetObject.position.set(xPos, targetObject.position.y, zPos);
      setTempPosition(targetObjectId, {
        ...tempPosition[targetObjectId],
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
      if (child.isMesh && child.material.map) {
        child.material = new THREE.MeshToonMaterial({
          map: child.material.map,
          opacity: child.material.opacity,
          gradientMap: null
        });
      }
    });
  };

  return (
    <group>
      {wallPaperTexture && (
        <group ref={wallGroupRef}>
          <mesh position={[0, 4, -5]} scale={[10, 8, 10]}>
            <planeGeometry />
            <meshToonMaterial map={wallPaperTexture} />
          </mesh>
          <mesh
            position={[-5, 4, 0]}
            scale={[10, 8, 10]}
            rotation={[0, THREE.MathUtils.degToRad(90), 0]}
          >
            <planeGeometry />
            <meshToonMaterial map={wallPaperTexture} />
          </mesh>
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
          ref={floorRef}
          position={[0, -0.05, 0]}
          scale={[10, 10, 0.1]}
          rotation={[THREE.MathUtils.degToRad(-90), 0, 0]}
        >
          <boxGeometry />
          <meshToonMaterial map={tileTexture} />
        </mesh>
      )}
      <directionalLight ref={lightRef} intensity={1} position={[0, 10, 0]} />
      <GhostModel />
      {reset > 0 && (
        <group ref={furnitureGroupRef}>
          {Object.keys(tempPosition).map((it, idx) => {
            const data = tempPosition[it];
            return (
              <FurnitureModel sequenceNo={idx} data={data} key={data.id} />
            );
          })}
        </group>
      )}
    </group>
  );
}
