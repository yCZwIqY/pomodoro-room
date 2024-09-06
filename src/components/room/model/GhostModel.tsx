import { useGLTF } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { gsap } from 'gsap';
import useEditModeStore from '@store/useEditModeStore.ts';

export default function GhostModel() {
  const ghostRef = useRef<THREE.Mesh>(null);
  const { scene } = useGLTF('/models/ghost/ghost.glb');
  const [position, setPosition] = useState([0, 1.5, 0]);
  const { isEditMode } = useEditModeStore();
  const opacity = useRef(0.9);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshToonMaterial({
          color: child.material.color,
          gradientMap: null,
          transparent: true,
          opacity: opacity.current
        });
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (!isEditMode) {
      opacity.current = 0.9;
      const time = clock.getElapsedTime();
      if (ghostRef.current) {
        ghostRef.current.position.y = 1.7 + Math.sin(time) * 0.3;
      }
    } else {
      opacity.current--;
    }
  });

  useEffect(() => {
    if (isEditMode) {
      gsap.to(ghostRef.current.position, {
        y: 10,
        duration: 1,
        delay: 0.8,
        ease: 'power1.out'
      });

      scene.traverse((child) => {
        if (child.isMesh) {
          gsap.to(child.material, {
            duration: 0.5,
            opacity: 0,
            delay: 0.8
          });
        }
      });
    } else {
      gsap.to(ghostRef.current.position, {
        y: 1.5,
        duration: 1.2,
        delay: 0.8
      });

      scene.traverse((child) => {
        if (child.isMesh) {
          gsap.to(child.material, {
            duration: 0.5,
            opacity: 0.9,
            delay: 0.5
          });
        }
      });
    }
  }, [isEditMode]);

  return (
    <group position={position} ref={ghostRef}>
      <primitive object={scene}>
        <meshToonMaterial />
      </primitive>
    </group>
  );
}
