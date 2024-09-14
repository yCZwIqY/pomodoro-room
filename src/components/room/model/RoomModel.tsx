import {useEffect, useRef} from 'react';
import {useFrame, useThree} from '@react-three/fiber';
import * as THREE from 'three';
import GhostModel from '@components/room/model/GhostModel.tsx';
import FurnitureModel from '@components/room/model/FurnitureModel.tsx';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';
import useEditModeStore from '@store/useEditModeStore.ts';
import {useTextures} from '@hooks/useTextures.ts';

export default function RoomModel() {
    const {
        tempPosition,
        isEditMode,
        targetObject,
        targetObjectId,
        reset,
        setTempPosition,
        initTempPosition
    } = useEditModeStore();
    const {myFurniture} = useMyFurnitureStore();
    const {scene, raycaster, camera, pointer} = useThree();
    const {wallPaperTexture, tileTexture} = useTextures(
        myFurniture.wallpaper.path,
        myFurniture.tile.path
    );

    const wallGroupRef = useRef<THREE.Group>(null);
    const lightRef = useRef<THREE.SpotLight>(null);
    const furnitureGroupRef = useRef<THREE.Group>(null);
    const mouse = useRef(new THREE.Vector2());

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX;
            mouse.current.y = e.clientY;
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        if (furnitureGroupRef.current) {
            applyTextureToScene();
        }
    }, [furnitureGroupRef, scene]);

    useEffect(() => {
        if (myFurniture.furniture.length > 0) {
            initTempPosition(myFurniture.furniture);
        }
    }, [myFurniture.furniture, isEditMode]);

    useFrame(({pointer}) => {
        if (isEditMode && targetObject) {

            raycaster.setFromCamera(pointer, camera);
            const intersect = raycaster.intersectObject(targetObject, true);
            const {x, z} = intersect[0].point

            const onlyX = Math.floor(camera.position.x) <= 4 && Math.floor(camera.position.y) <= 1;
            const onlyZ = Math.floor(camera.position.z) <= 1 && Math.floor(camera.position.y) <= 1;

            const xPos = onlyZ ? targetObject.position.x : x;
            const zPos = onlyX ? targetObject.position.z : z;

            if (xPos > 5 || xPos < -5 || zPos > 5 || zPos < -5) {
                return;
            }

            targetObject.position.set(xPos, targetObject.position.y, zPos);
            setTempPosition(targetObjectId, {
                ...tempPosition[targetObjectId],
                position: [xPos, targetObject.position.y, zPos],
                rotation: [
                    THREE.MathUtils.radToDeg(targetObject.rotation.x),
                    THREE.MathUtils.radToDeg(targetObject.rotation.y),
                    THREE.MathUtils.radToDeg(targetObject.rotation.z)
                ]
            });
        }
    });

    const applyTextureToScene = () => {
        scene.traverse((child) => {
            if (child.isMesh && child.material.map) {
                child.material = new THREE.MeshToonMaterial({
                    map: child.material.map,
                    opacity: child.material.opacity,
                    gradientMap: null
                });
            }
        });
    };

    return (
        <group>
            {wallPaperTexture && (
                <group ref={wallGroupRef}>
                    <mesh position={[0, 4, -5]} scale={[10, 8, 10]}>
                        <planeGeometry/>
                        <meshToonMaterial map={wallPaperTexture}/>
                    </mesh>
                    <mesh
                        position={[-5, 4, 0]}
                        scale={[10, 8, 10]}
                        rotation={[0, THREE.MathUtils.degToRad(90), 0]}
                    >
                        <planeGeometry/>
                        <meshToonMaterial map={wallPaperTexture}/>
                    </mesh>
                    <mesh
                        position={[5, 4, 0]}
                        scale={[10, 8, 10]}
                        rotation={[0, THREE.MathUtils.degToRad(-90), 0]}
                    >
                        <planeGeometry/>
                        <meshToonMaterial map={wallPaperTexture}/>
                    </mesh>
                    <mesh
                        position={[0, 4, 5]}
                        scale={[10, 8, 10]}
                        rotation={[0, THREE.MathUtils.degToRad(180), 0]}
                    >
                        <planeGeometry/>
                        <meshToonMaterial map={wallPaperTexture}/>
                    </mesh>
                </group>
            )}
            {tileTexture && (
                <mesh
                    position={[0, 0, 0]}
                    scale={[10, 10, 10]}
                    rotation={[THREE.MathUtils.degToRad(-90), 0, 0]}
                >
                    <planeGeometry/>
                    <meshToonMaterial map={tileTexture}/>
                </mesh>
            )}
            <directionalLight ref={lightRef} intensity={1} position={[0, 10, 0]}/>
            <GhostModel/>
            {reset > 0 && (
                <group ref={furnitureGroupRef}>
                    {Object.keys(tempPosition).map((it, idx) => {
                        const data = tempPosition[it];
                        return (
                            <FurnitureModel
                                sequenceNo={idx}
                                data={data}
                                key={data.id}
                                mousePos={mouse.current}
                            />
                        );
                    })}
                </group>
            )}
        </group>
    );
}
