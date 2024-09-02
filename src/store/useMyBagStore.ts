import { FurnitureData } from '@store/useMyFurnitureStore.ts';
import { create } from 'zustand';
import furniture from '@data/furniture.json';
import texture from '@data/texture.json';

const useMyBagStore = create((set) => ({
  myBag: {},
  pull: (category, id) =>
    set((state) => {
      const categoryArr = state[category];
      const newData = {
        ...state,
        [category]: categoryArr.map((it) => {
          if (it.id === id) {
            return { ...it, count: it - 1 };
          }
          return it;
        })
      };

      localStorage.removeItem('myBag');
      localStorage.setItem('myBag', JSON.stringify(newData));

      return newData;
    }),
  put: (category, id) =>
    set((state) => {
      const categoryArr = state[category];
      const newData = {
        ...state,
        [category]: categoryArr.map((it) => {
          if (it.id === id) {
            return { ...it, count: it + 1 };
          }
          return it;
        })
      };

      localStorage.removeItem('myBag');
      localStorage.setItem('myBag', JSON.stringify(newData));

      return newData;
    }),
  buy: (data) =>
    set((state) => {
      const newData = { ...state };
      if (state[data.category].find((it) => it.id === data.id)) {
        newData[data.category] = state[data.category].map((it) => {
          if (it.id === data.id) {
            return { ...it, count: it + 1 };
          }
          return it;
        });
      } else {
        newData[data.category].push({ ...data, count: 1 });
      }

      localStorage.removeItem('myBag');
      localStorage.setItem('myBag', JSON.stringify(newData));
      return newData;
    }),
  init: () =>
    set(() => {
      if (localStorage.getItem('myBag')) {
        return { myBag: JSON.parse(localStorage.getItem('myBag')) };
      } else {
        const newData = {
          bed: [{ ...furniture.bed['basic_bed'], count: 0 }],
          chair: [{ ...furniture.chair['basic_chair'], count: 0 }],
          desk: [{ ...furniture.desk['basic_desk'], count: 0 }],
          wallpaper: [
            {
              ...texture.wallpaper['basic_wallpaper'],
              count: 0
            }
          ],
          tile: [
            {
              ...texture.tile['basic_tile'],
              count: 0
            }
          ]
        };

        localStorage.setItem('myBag', JSON.stringify(newData));
        return { myBag: newData };
      }
    })
}));

export default useMyBagStore;
