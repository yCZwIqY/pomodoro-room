import {useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from 'three';
import {Outlines, useGLTF} from '@react-three/drei';
import {FurnitureData} from '@store/useMyFurnitureStore.ts';
import useEditModeStore from '@store/useEditModeStore.ts';
import {gsap} from "gsap";

interface FurnitureModelProps {
  sequenceNo: number;
  data: FurnitureData;
}

export default function FurnitureModel({ data, sequenceNo}: FurnitureModelProps) {
  const { nodes, materials } = useGLTF(`/models/furniture/${data.path}`);
  const [rotation, setRotation] = useState(data.rotation);
  const [hovered, setHovered] = useState(false);
  const objectRef = useRef(null);
  const realMeshRef = useRef(null);
  const hitBoxRef = useRef(null);
  const [isMovable, setIsMovable] = useState(false);
  const {
    isEditMode,
    targetObject,
    setTargetObject,
    setTempPosition,
    setLastClickedObject,
    lastClickedObject
  } = useEditModeStore();
  const canEdit = useMemo(() => isEditMode && isMovable, [isMovable, isEditMode]);

  useEffect(() => {
    objectRef.current.scale.set(0, 0,0);
    objectRef.current.position.setY(7);

    gsap.to(objectRef.current.scale, {
      x:1,
      y:1,
      z:1,
      duration: 1,
      delay:  1 * (sequenceNo * 0.1),
      ease: 'elastic.out(1,1.2)',
    });


    gsap.to(objectRef.current.position, {
      y: 0,
      duration: 1,
      delay: 1 * (sequenceNo * 0.2),
      ease: 'power3.in',
      onComplete: () => setIsMovable(true)
    });
  }, []);

    useEffect(() => {
        if (realMeshRef.current) {
            const box = new THREE.Box3().setFromObject(realMeshRef.current);
            const size = new THREE.Vector3();
            box.getSize(size);

            if (hitBoxRef.current) {
                hitBoxRef.current.scale.set(size.x, size.y, size.z);
                hitBoxRef.current.position.set(0, size.y / 2, 0);
            }
        }
    }, [nodes, objectRef]);

  const convertedRotation = () =>
    rotation.map((it) => THREE.MathUtils.degToRad(it));

  const isSelected = useMemo(
    () => targetObject != null && targetObject === objectRef.current,
    [targetObject, objectRef.current]
  );
  const isLastSelected = useMemo(
    () => lastClickedObject?.id === data.id,
    [lastClickedObject]
  );
  
  return (
    <>
      <group
          ref={objectRef}
          position={data.position}
          key={data.id ?? data.key}
          rotation={convertedRotation()}
          onPointerDown={(e) => {
            e.stopPropagation();
            if (!canEdit) return;
            setLastClickedObject(data);
            if (e.button == 2) {
              const deg = (rotation[1] + 90) % 360;
              setRotation([0, deg, 0]);
              setTempPosition(data.id, {
                ...data,
                rotation: [0, deg, 0]
              });
              return;
            }
            if (canEdit) {
              setTargetObject(objectRef.current, data.id);
            }
          }}
          onPointerUp={(e) => {
            e.stopPropagation();
            if (canEdit) {
              if (isSelected) {
                setLastClickedObject(data);
                setTargetObject(null, null);
              }
            }
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerLeave={(e) => {
            e.stopPropagation();
            setHovered(false);

          }}
      >
        <mesh
            ref={realMeshRef}
            castShadow={true}
            receiveShadow={true}
            geometry={nodes[data.key].geometry}
            scale={nodes[data.key].scale}
            {...nodes}
            material={materials['Material']}
        >
          {(isSelected || isLastSelected || (canEdit && hovered)) && (
              <Outlines thickness={2} color={isSelected ? 'red' : '#228AED'}/>
          )}
          <meshToonMaterial
              map={materials['Material'].map}
              gradientMap={null}
              color={materials['Material'].color}
          />
        </mesh>
        <mesh
            ref={hitBoxRef}
        >
          <boxGeometry/>
          <meshStandardMaterial
              color="blue"
              opacity={0}
              transparent
          />
        </mesh>
      </group>
    </>
  );
}
