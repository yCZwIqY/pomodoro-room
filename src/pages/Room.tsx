import {Canvas} from "@react-three/fiber";
import RoomModel from "@components/room/model/RoomModel.tsx";
import {OrbitControls} from "@react-three/drei";
import styled, {keyframes} from "styled-components";
import Timer from "@components/ui/timer/Timer.tsx";


const roomBgMove = keyframes`
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-50%);
    }
`
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
        background: ${props => props.theme.gradiant['linear-4']};
        animation: ${roomBgMove} 5s linear infinite;
        z-index: -1;
    }
`
export default function Room() {
    return <RoomContainer>
        <Canvas camera={{
            zoom: 0.8,
            near: 0.1,
            far: 1000,
            fov: 20,
            position: [10, 3, 13],
            // rotation:[0, 0, THREE.MathUtils.degToRad(45)]
        }}
                style={{background: 'transparent'}}
        >
            <OrbitControls
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
                minDistance={15}
                maxDistance={35}
            />
            {/*<gridHelper/>*/}
            {/*<axesHelper/>*/}
            <ambientLight intensity={0.5}/>
            <RoomModel/>
        </Canvas>
        <Timer/>
    </RoomContainer>
}
