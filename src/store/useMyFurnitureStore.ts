import { create } from 'zustand';
import furniture from '@data/furniture.json';
import texture from '@data/texture.json';

interface FurnitureData {
  id: string;
  path: string;
  name: string;
  category: string;
  position: [number, number, number];
  rotation: [number, number, number];
  texturePath?: string;
  hasTexture: boolean;
}

interface Texture {
  id: string;
  name: string;
  path: string;
  category: string;
}

interface FurnitureDataStore {
  furniture: FurnitureData[];
  wallPaper: Texture;
  tile: Texture;
}

const useMyFurnitureStore = create<FurnitureDataStore>((set) => ({
  myFurniture: {
    furniture: [],
    wallPaper: {},
    tile: {}
  },
  updateFurnitureData: (data: FurnitureData[]) =>
    set(() => {
      const newData = {
        myFurniture: data
      };

      localStorage.removeItem('myFurniture');
      localStorage.setItem('myFurniture', JSON.stringify(newData));
      return newData;
    }),
  initFurnitureData: () =>
    set(() => {
      const myFurniture = localStorage.getItem('myFurniture');
      if (myFurniture) {
        return JSON.parse(myFurniture);
      } else {
        const newData = {
          myFurniture: {
            furniture: [
              furniture.bed['basic_bed'],
              furniture.chair['basic_chair'],
              furniture.desk['basic_desk']
            ],
            wallpaper: texture.wallpaper['basic_wallpaper'],
            texture: texture.tile['basic_tile']
          }
        };

        localStorage.setItem('myFurniture', JSON.stringify(newData));
        return newData;
      }
    })
}));

export default useMyFurnitureStore;
