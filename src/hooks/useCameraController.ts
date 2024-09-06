import {useThree} from "@react-three/fiber";
import {useEffect} from "react";
import { gsap } from 'gsap';

export const useCameraController = (editMode: boolean) => {
    const { camera } = useThree();

    useEffect(() => {
        if (editMode) {
            gsap.to(camera.position, {
                x: 0,
                y: 5,
                z: 15,
                ease: 'power3.inOut',
                duration: 0.8,
                onUpdate: () => camera.lookAt(0, 0, 0)
            });
            gsap.to(camera.position, {
                x: 0,
                y: 15,
                z: 0,
                ease: 'power3.inOut',
                delay: 1.2,
                duration: 1,
                onUpdate: () => camera.lookAt(0, 0, 0)
            });
        } else {
            gsap.to(camera.position, {
                x: 10,
                y: 8,
                z: 13,
                onComplete: () => camera.lookAt(0, 0, 0)
            });
        }
    }, [editMode, camera]);
};