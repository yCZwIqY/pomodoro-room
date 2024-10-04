import {useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from 'three';
import {Outlines, useGLTF} from '@react-three/drei';
import {FurnitureData} from '@store/useMyFurnitureStore.ts';
import useEditModeStore from '@store/useEditModeStore.ts';
import {gsap} from "gsap";
import {useLoader} from "@react-three/fiber";
import {hash} from "three/src/nodes/math/HashNode";

interface FurnitureModelProps {
  sequenceNo: number;
  data: FurnitureData;
}

export default function FurnitureModel({ data, sequenceNo}: FurnitureModelProps) {
  const { nodes, materials: originMaterials } = useGLTF(`/models/furniture/${data.path}`);
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
  const canEdit = useMemo(() => isEditMode && isMovable, [isMovable, isEditMode]);
    const [texturePath, setTexturePath] = useState(null);
    const [materials, setMaterials] = useState(originMaterials['Material'].clone())
    const texture = texturePath  ? useLoader(THREE.TextureLoader, texturePath) : null;


  useEffect(() => {
    objectRef.current.scale.set(0, 0,0);
    objectRef.current.position.setY(5);

    gsap.to(objectRef.current.scale, {
      x:1,
      y:1,
      z:1,
      duration: 0.8,
      delay:  1 * (sequenceNo * 0.2),
      ease: 'elastic.out(1,1.2)',
    });


    gsap.to(objectRef.current.position, {
      y: 0,
      duration: 0.8,
      delay: 1 * (sequenceNo * 0.2),
      ease: 'power3.in',
      onComplete: () => setIsMovable(true)
    });

    setMaterials(originMaterials['Material'].clone())
  }, []);

    useEffect(() => {
        if (data.hasTexture) {
            const path = `textures/furniture/${data.category}/${data.key}/${data.key}_texture_${tempPosition[data.id].currentTexture}.png`;
            setTexturePath(path);
        }

    }, [data, tempPosition[data.id]]);

    useEffect(() => {
        if (texture) {
            console.log('texture update')
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2); // 텍스처의 반복 횟수 조정
            texture.offset.set(2, 2); // 텍스처의 오프셋 설정
            texture.center.set(0, 0); // 텍스처의 중심점 설정
            // texture.rotation = 0; // 필요하다면 텍스처 회전
            // texture.needsUpdate = true;

            materials.map = texture;
        }
    }, [texture]);


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

  const getTexture = () => {
      if(!data.hasTexture) {
          return materials.map
      }
      console.log(data.id, texture?? 'no texture')
      return texture ?? materials.map
  }

  
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
              material={materials}
          >
              {(isSelected || isLastSelected || (canEdit && hovered)) && (
                  <Outlines thickness={2} color={isSelected ? 'red' : '#228AED'}/>
              )}
              <meshToonMaterial
                  map={materials.map}
              />
          </mesh>
          <mesh
              ref={hitBoxRef}
          >
              <boxGeometry/>
              <meshStandardMaterial
              opacity={0}
              transparent
          />
        </mesh>
      </group>
    </>
  );
}
