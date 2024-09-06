import { useCallback, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Outlines, useGLTF } from '@react-three/drei';
import { FurnitureData } from '@store/useMyFurnitureStore.ts';
import useEditModeStore from '@store/useEditModeStore.ts';

interface FurnitureModelProps {
  data: FurnitureData;
}

export default function FurnitureModel({ data }: FurnitureModelProps) {
  const { nodes, materials } = useGLTF(`/models/furniture/${data.path}`);
  const [rotation, setRotation] = useState(data.rotation);
  const [hovered, setHovered] = useState(false);
  const objectRef = useRef(null);
  const {
    isEditMode,
    targetObject,
    setTargetObject,
    setTempPosition,
    setLastClickedObject,
    lastClickedObject
  } = useEditModeStore();
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
          if (!isEditMode) return;
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
          if (isEditMode) {
            setTargetObject(objectRef.current, data.id);
          }
        }}
        onPointerUp={() => {
          if (isEditMode) {
            if (isSelected) {
              setLastClickedObject(data);
              setTargetObject(null, null);
            }
          }
        }}
      >
        <mesh
          castShadow={true}
          receiveShadow={true}
          geometry={nodes[data.key].geometry}
          onPointerOver={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          scale={nodes[data.key].scale}
          {...nodes}
          material={materials['Material']}
        >
          {(isSelected || isLastSelected || (isEditMode && hovered)) && (
            <Outlines thickness={2} color={isSelected ? 'red' : '#228AED'} />
          )}
          <meshToonMaterial
            map={materials['Material'].map}
            gradientMap={null}
            color={materials['Material'].color}
          />
        </mesh>
      </group>
    </>
  );
}
