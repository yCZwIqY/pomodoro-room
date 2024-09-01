import {Canvas, useFrame, useThree} from '@react-three/fiber';
import RoomModel from '@components/room/model/RoomModel.tsx';
import {OrbitControls} from '@react-three/drei';
import styled, {keyframes} from 'styled-components';
import Timer from '@components/ui/timer/Timer.tsx';
import Token from '@components/ui/Token.tsx';
import IconButton from '@components/common/button/IconButton.tsx';
import {useEffect, useRef, useState} from "react";
import {gsap} from "gsap";

const roomBgMove = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-50%);
    }
`;
const RoomContainer = styled.main`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;

    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 400%;
        height: 100%;
        background: ${(props) => props.theme.gradiant['linear-4']};
        animation: ${roomBgMove} 5s linear infinite;
        z-index: -1;
    }
`;

const SideNav = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    position: absolute;
    left: 10px;
    top: 60px;
    height: 100dvh;
`;

function CameraController({editMode}) {
    const {camera, scene} = useThree();


    useEffect(() => {
        if (editMode) {
            gsap.to(camera.position, {
                x: () => 0,
                y: () => 15,
                ease: "power3.inOut",
                duration: 0.5,
                onUpdate: () => camera.lookAt(0, 0, 0),
            })
            gsap.to(camera.position, {
                z: () => 0,
                delay: 0.2,
                ease: "power3.inOut",
                onUpdate: () => camera.lookAt(0, 0, 0),
            })
        } else {
            gsap.to(camera.position, {
                x: () => 10,
                y: () => 8,
                z: () => 13,
                onComplete: () => camera.lookAt(0, 0, 0)
            })
        }
    }, [editMode]);

    return null;
}

export default function Room() {
    const [editMode, setEditMode] = useState(false);
    const control = useRef(null);
    const onClickEdit = () => {
        setEditMode(true);
        // console.dir(camera)
        // camera.lookAt
    };
    const onClickShop = () => {
    };
    const onClickHome = () => {
        setEditMode(false);
    };
    return (
        <RoomContainer>
            <Canvas
                camera={{
                    zoom: 0.3,
                    near: 1,
                    far: 100,
                    fov: 20,
                    position: [10, 8, 13],
                }}
                style={{background: 'transparent'}}
            >
                <CameraController editMode={editMode}/>
                <OrbitControls
                    ref={control}
                    minAzimuthAngle={-Math.PI / 2}
                    maxAzimuthAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={10}
                    maxDistance={35}
                    enabled={!editMode}
                />
                {/*<gridHelper/>*/}
                {/*<axesHelper/>*/}
                <ambientLight intensity={0.5}/>
                <RoomModel editMode={editMode}/>
            </Canvas>
            <Timer/>
            <Token/>
            <SideNav>
                {
                    editMode
                        ? <>
                            <IconButton
                                url={'/icons/home.svg'}
                                onClick={onClickHome}
                                size={'40px'}
                            />
                            <IconButton
                                url={'/icons/box.svg'}
                                onClick={onClickShop}
                                buttonColor={'yellow'}
                                size={'40px'}
                            />
                        </>
                        : <>
                            <IconButton
                                url={'/icons/edit-move.svg'}
                                onClick={onClickEdit}
                                buttonColor={'pink'}
                                size={'40px'}
                            />
                            <IconButton
                                url={'/icons/shop.svg'}
                                onClick={onClickShop}
                                buttonColor={'purple'}
                                size={'40px'}
                            />
                        </>
                }


            </SideNav>
        </RoomContainer>
    );
}
