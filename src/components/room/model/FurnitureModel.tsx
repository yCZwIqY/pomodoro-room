import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import * as THREE from 'three';

interface FurnitureModelProps {
  path: string;
}

export default function FurnitureModel({ path }: FurnitureModelProps) {
  const { scene } = useGLTF(path);
  const [position, setPosition] = useState([0, 0.6, 2]);

  return (
    <group position={position}>
      <primitive object={scene} />
    </group>
  );
}
