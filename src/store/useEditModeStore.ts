import { create } from 'zustand';

const useEditModeStore = create((set) => ({
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
      console.log(pos);
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
    })
}));

export default useEditModeStore;
