import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';
import { FurnitureData } from '@store/useMyFurnitureStore.ts';
interface FurnitureModelProps {
  data: FurnitureData;
  key?: string | null;
}

export default function FurnitureModel({
  data,
  key = null
}: FurnitureModelProps) {
  const { scene } = useLoader(GLTFLoader, `/models/furniture/${data.path}`);
  const [position, setPosition] = useState(data.position);
  const [rotation, setRotation] = useState(data.rotation);

  const convertedRotation = () =>
    rotation.map((it) => THREE.MathUtils.degToRad(it));

  return (
    <>
      {data.path && (
        <group
          position={position}
          key={key ?? data.id}
          rotation={convertedRotation()}
        >
          <primitive object={scene.clone()} />
        </group>
      )}
    </>
  );
}
