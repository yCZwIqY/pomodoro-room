import {Canvas} from "@react-three/fiber";
import RoomModel from "@components/room/model/RoomModel.tsx";
import {OrbitControls} from "@react-three/drei";
import Timer from "@components/ui/timer/Timer.tsx";

export default function Room() {
    return <main>
        <Canvas camera={{
            zoom: 0.8,
            near: 0.1,
            far: 1000,
            fov: 75,
            position: [10, 3, 13],
            // rotation:[0, 0, THREE.MathUtils.degToRad(45)]
        }}>
            <OrbitControls
                minAzimuthAngle={-Math.PI / 2}
                maxAzimuthAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
                minDistance={5}
                maxDistance={20}
            />
            {/*<gridHelper/>*/}
            {/*<axesHelper/>*/}
            <ambientLight intensity={0.5}/>
            <RoomModel/>
        </Canvas>
        <Timer/>
    </main>
}
