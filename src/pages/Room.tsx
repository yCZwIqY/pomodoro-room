import {useRef} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import Timer from '@components/ui/timer/Timer.tsx';
import Token from '@components/ui/Token.tsx';
import MyBagComponent from '@components/room/MyBag.tsx';
import useEditModeStore from '@store/useEditModeStore.ts';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';
import styled, {keyframes} from "styled-components";
import {CameraController} from "@components/room/CameraController.tsx";
import RoomModel from "@components/room/model/RoomModel.tsx";
import {SideNavigation} from "@components/ui/SideNavigation.tsx";


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


export default function Room() {
    const {isEditMode, onToggleMode, setReset, tempPosition} = useEditModeStore();
    const {myFurniture, updateFurnitureData} = useMyFurnitureStore();
    const control = useRef(null);

    const onClickEdit = () => {
        onToggleMode();
    };

    const onClickShop = () => {

    };

    const onClickHome = () => {
        setReset();
        onToggleMode();
    };

    const onClickCancel = () => {
        setReset();
    }

    const onClickSave = () => {
        if (tempPosition) {
            const updatedFurniture = myFurniture.furniture.map((item) => {
                if (tempPosition[item.id]) {
                    return {...item, ...tempPosition[item.id]};
                }
                return item;
            });
            updateFurnitureData(updatedFurniture);
        }
    }

    return (
        <RoomContainer>
            <Canvas
                camera={{
                    zoom: 0.3,
                    near: 1,
                    far: 100,
                    fov: 20,
                    position: [10, 8, 13]
                }}
                style={{background: 'transparent'}}
            >
                <CameraController editMode={isEditMode}/>
                <OrbitControls
                    ref={control}
                    minAzimuthAngle={-Math.PI / 2}
                    maxAzimuthAngle={isEditMode ? Math.PI : Math.PI / 2}
                    minPolarAngle={isEditMode ? 0 : Math.PI / 6}
                    maxPolarAngle={Math.PI / 2}
                    minDistance={10}
                    maxDistance={35}
                    enabled={!isEditMode}
                />
                <ambientLight intensity={0.5}/>
                <RoomModel/>
            </Canvas>
            <Timer/>
            <Token/>
            <SideNavigation
                isEditMode={isEditMode}
                onClickHome={onClickHome}
                onClickEdit={onClickEdit}
                onClickShop={onClickShop}
                onClickReset={onClickCancel}
                onClickSave={onClickSave}
            />
            <MyBagComponent/>
        </RoomContainer>
    );
}