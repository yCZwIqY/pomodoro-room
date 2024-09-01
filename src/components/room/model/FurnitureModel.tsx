import { useGLTF } from '@react-three/drei';
import { useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader } from '@react-three/fiber';

interface FurnitureModelProps {
  path: string;
  initialPosition?: number[];
  initialRotation?: number[];
}

export default function FurnitureModel({
  initialPosition = [0, 0, 0],
  initialRotation = [0, 0, 0],
  path
}: FurnitureModelProps) {
  const { scene } = useLoader(GLTFLoader, `/models/furniture/${path}`);
  // const {scene} = useGLTF();
  const [position, setPosition] = useState(initialPosition);
  const [rotation, setRotation] = useState(initialRotation);

  const convertedRotation = () =>
    rotation.map((it) => THREE.MathUtils.degToRad(it));

  return (
    <>
      {path && (
        <group position={position} rotation={convertedRotation()}>
          <primitive object={scene} />
        </group>
      )}
    </>
  );
}
