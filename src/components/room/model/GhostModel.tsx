import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function GhostModel() {
  const ghostRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF('/models/ghost/ghost.glb');
  const [position, setPosition] = useState([0, 1.7, 0]);

  useEffect(() => {
    // scene 내의 모든 메쉬를 탐색하여 Toon 셰이더를 적용
    scene.traverse((child) => {
      if (child.isMesh) {
        // 반투명 Toon 셰이더로 메터리얼 설정
        child.material = new THREE.MeshToonMaterial({
          color: child.material.color, // 업로드된 사용자 텍스처를 Toon 셰이더에 적용
          gradientMap: null, // 기본 Toon 색상 맵 사용
          transparent: true, // 반투명 효과를 위해 transparent를 true로 설정
          opacity: 0.9 // 투명도 설정 (0: 완전히 투명, 1: 완전히 불투명)
        });
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    // 시계의 현재 시간에 따라 y 좌표를 변경하여 떠다니는 효과 적용
    const time = clock.getElapsedTime();
    if (ghostRef.current) {
      ghostRef.current.position.y = Math.sin(time) * 0.3; // y 좌표를 주기적으로 변경
    }
  });

  return (
    <group position={position}>
      <primitive ref={ghostRef} object={scene}>
        <meshToonMaterial />
      </primitive>
    </group>
  );
}
