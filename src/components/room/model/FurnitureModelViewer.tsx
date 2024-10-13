import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

interface FurnitureModelViewer {
  path: string;
}

export default function FurnitureModelViewer({ path }: FurnitureModelViewer) {
  const object = useLoader(GLTFLoader, `/models/furniture/${path}`);

  return (
    <group position={[0, -0.8, 0]}>
      <primitive object={object.scene} />
    </group>
  );
}
