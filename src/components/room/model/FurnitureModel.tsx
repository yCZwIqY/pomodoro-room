import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Outlines, useGLTF } from '@react-three/drei';
import { FurnitureData } from '@store/useMyFurnitureStore.ts';
import useEditModeStore from '@store/useEditModeStore.ts';
import { gsap } from 'gsap';
interface FurnitureModelProps {
  sequenceNo: number;
  data: FurnitureData;
}

export default function FurnitureModel({
  data,
  sequenceNo
}: FurnitureModelProps) {
  const { nodes } = useGLTF(`/models/furniture/${data.path}`);
  const meshes = useMemo(
    () => Object.values(nodes).filter((it) => !it.isGroup),
    [nodes]
  );
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
    lastClickedObject,
    tempPosition
  } = useEditModeStore();
  const canEdit = useMemo(
    () => isEditMode && isMovable,
    [isMovable, isEditMode]
  );

  useEffect(() => {
    objectRef.current.scale.set(0, 0, 0);
    objectRef.current.position.setY(5);

    gsap.to(objectRef.current.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 0.8,
      delay: 1 * (sequenceNo * 0.2),
      ease: 'elastic.out(1,1.2)'
    });

    gsap.to(objectRef.current.position, {
      y: 0,
      duration: 0.8,
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
    tempPosition[data.id].rotation.map((it) =>
      THREE.MathUtils.degToRad(it)
    ) as [number, number, number];

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
        key={data.id}
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
        <group ref={realMeshRef}>
          {meshes.map((it) => (
            <mesh
              key={`${data.id}-${it.name}`}
              castShadow={true}
              receiveShadow={true}
              {...it}
            >
              {(isSelected || isLastSelected || (canEdit && hovered)) && (
                <Outlines
                  thickness={2}
                  color={isSelected ? 'red' : '#228AED'}
                />
              )}
              <meshToonMaterial
                color={
                  tempPosition[data.id].currentColors[it.name] ??
                  it.material.color
                }
              />
            </mesh>
          ))}
        </group>
        <mesh ref={hitBoxRef}>
          <boxGeometry />
          <meshStandardMaterial opacity={0} transparent />
        </mesh>
      </group>
    </>
  );
}
