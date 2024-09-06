import {useCameraController} from "@hooks/useCameraController.ts";

interface CameraControllerProps {
    editMode: boolean;
}

export const CameraController  = ({ editMode }) => {
    useCameraController(editMode);
    return null;
};