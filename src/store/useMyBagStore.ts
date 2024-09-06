import { create } from 'zustand';
import furniture from '@data/furniture.json';
import texture from '@data/texture.json';

const useMyBagStore = create((set) => ({
  myBag: {},
  pull: (category, key) =>
    set((state) => {
      const categoryArr = state.myBag[category];
      const newData = {
        ...state,
        myBag: {
          ...state.myBag,
          [category]: categoryArr.map((it) => {
            if (it.key === key) {
              return { ...it, count: it.count - 1, deployed: it.deployed + 1 };
            }
            return it;
          })
        }
      };

      return newData;
    }),
  put: (category, key) =>
    set((state) => {
      const categoryArr = state.myBag[category];
      const newData = {
        ...state,
        myBag: {
          ...state.myBag,
          [category]: categoryArr.map((it) => {
            if (it.key === key) {
              return { ...it, count: it.count + 1, deployed: it.deployed - 1 };
            }
            return it;
          })
        }
      };

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
          bed: [{ ...furniture.bed['basic_bed'], count: 0, deployed: 1 }],
          chair: [{ ...furniture.chair['basic_chair'], count: 0, deployed: 1 }],
          desk: [{ ...furniture.desk['basic_desk'], count: 0, deployed: 1 }],
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
    }),
  saveBag: () =>
    set((state) => {
      localStorage.removeItem('myBag');
      localStorage.setItem('myBag', JSON.stringify(state.myBag));
      return state;
    })
}));

export default useMyBagStore;
