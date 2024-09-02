import { create } from 'zustand';
import furniture from '@data/furniture.json';
import texture from '@data/texture.json';

export interface FurnitureData {
  id: string;
  path: string;
  name: string;
  category: string;
  position: [number, number, number];
  rotation: [number, number, number];
  texturePath?: string;
  hasTexture: boolean;
  count: number;
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
      return newData
    }),
  initFurnitureData: () =>
    set(() => {
      const myFurniture = localStorage.getItem('myFurniture');
      if (myFurniture) {
        return  JSON.parse(myFurniture);
      } else {
        const newData = {
          myFurniture: {
            furniture: [
              { ...furniture.bed['basic_bed'], position: [3.8, 0, -3] },
              { ...furniture.chair['basic_chair'], position: [-3, 0, -3] },
              { ...furniture.desk['basic_desk'], position: [-3, 0, -4] }
            ],
            wallpaper: texture.wallpaper['basic_wallpaper'],
            tile: texture.tile['basic_tile']
          }
        };

        localStorage.setItem('myFurniture', JSON.stringify(newData));
        console.log(newData)
        return newData;
      }
    })
}));

export default useMyFurnitureStore;