import { useGLTF } from '@react-three/drei';
import {useMemo} from "react";
interface FurnitureModelViewer {
  path: string;
  modelKey: string;
}

export default function FurnitureModelViewer({
  path,
  modelKey
}: FurnitureModelViewer) {
  const { nodes, materials } = useGLTF(`/models/furniture/${path}`);
  const yPos = useMemo(() => Math.min(nodes[modelKey].geometry.boundingBox.max.z - 1.5, -0.3), [nodes]);
  return (
    <group position={[0, yPos , 0]}
           rotation={[0, 0, 0]}>
      {nodes[modelKey] && (
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
