import { create } from 'zustand';
import {
  FurnitureData,
  TempCoveringMaterial,
  Texture
} from '@store/useMyFurnitureStore.ts';

interface TempPosition {
  [id: string]: FurnitureData;
}

interface EditModeStore {
  isEditMode: boolean;
  onToggleMode: () => void;
  lastClickedObject: FurnitureData;
  setLastClickedObject: (id: FurnitureData | null) => void;
  targetObject: object | null;
  targetObjectId: string | null;
  setTargetObject: (obj: any, id: string | null) => void;
  reset: number;
  setReset: () => void;
  tempPosition: TempPosition;
  setTempPosition: (id: string, pos: object) => void;
  initTempPosition: (furniture: Array<{ id: string }>) => void;
  removeTempPosition: (id: string) => void;
  tempCoveringMaterial: TempCoveringMaterial;
  initTempCoveringMaterial: (coveringMaterial: TempCoveringMaterial) => void;
  setTempCoveringMaterial: (
    type: 'wallpaper' | 'tile',
    texture: Texture
  ) => void;
}

const useEditModeStore = create<EditModeStore>((set) => ({
  isEditMode: false,
  onToggleMode: () =>
    set((state) => ({
      ...state,
      isEditMode: !state.isEditMode,
      targetObject: null,
      lastClickedObject: null
    })),
  lastClickedObject: null,
  setLastClickedObject: (id) =>
    set((state) => ({ ...state, lastClickedObject: id })),
  targetObject: null,
  targetObjectId: null,
  setTargetObject: (obj, id) =>
    set((state) => ({
      ...state,
      targetObject: obj,
      targetObjectId: id
    })),
  reset: 1,
  setReset: () => set((state) => ({ ...state, reset: state.reset + 1 })),
  tempPosition: {},
  setTempPosition: (id, pos) =>
    set((state) => {
      return {
        ...state,
        tempPosition: { ...state.tempPosition, [id]: { ...pos, id } }
      };
    }),
  initTempPosition: (furniture) =>
    set((state) => {
      const posMap = {};
      furniture.forEach((it) => {
        posMap[it.id] = it;
      });

      return {
        ...state,
        tempPosition: posMap
      };
    }),
  removeTempPosition: (id) =>
    set((state) => {
      delete state.tempPosition[id];
      return {
        ...state,
        tempPosition: { ...state.tempPosition }
      };
    }),
  tempCoveringMaterial: {
    wallpaper: '',
    tile: ''
  },
  initTempCoveringMaterial: (coveringMaterial) =>
    set((state) => ({
      ...state,
      tempCoveringMaterial: coveringMaterial
    })),
  setTempCoveringMaterial: (category, texture) =>
    set((state) => ({
      ...state,
      tempCoveringMaterial: {
        ...state.tempCoveringMaterial,
        [category]: texture
      }
    }))
}));

export default useEditModeStore;
