import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

interface FurnitureModelViewer {
  path: string;
  modelKey: string;
}

export default function FurnitureModelViewer({
  path,
  modelKey
}: FurnitureModelViewer) {
  const { nodes, materials } = useGLTF(`/models/furniture/${path}`);

  return (
    <group position={[0, 0, 0]} rotation={[0, 0, 0]}>
      {modelKey && (
        <mesh
          geometry={nodes[modelKey].geometry}
          scale={nodes[modelKey].scale}
          {...nodes}
          material={materials['Material']}
        ></mesh>
      )}
    </group>
  );
}
