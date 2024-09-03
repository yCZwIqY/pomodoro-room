import { create } from 'zustand';

const useEditModeStore = create((set) => ({
  isEditMode: false,
  onToggleMode: () =>
    set((state) => ({
      ...state,
      isEditMode: !state.isEditMode,
      targetObject: null
    })),
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
        tempPosition: { ...state.tempPosition, [id]: pos }
      };
    })
}));

export default useEditModeStore;
