import {create} from 'zustand';
import furniture from '@data/furniture.json';
import texture from '@data/texture.json';

export interface FurnitureData {
    key: string;
    id: string;
    path: string;
    name: string;
    category: string;
    position: [number, number, number];
    rotation: [number, number, number];
    texturePath?: string;
    hasTexture: boolean;
    parts: string[];
    count: number;
    price: number;
    deployed: number;
    currentColors?: { [key: string]: string }
}

interface Texture {
    id: string;
    name: string;
    path: string;
    category: string;
}

interface FurnitureDataStore {
    myFurniture: {
        furniture: FurnitureData[];
        wallpaper: Texture;
        tile: Texture;
    };
    updateFurnitureData: (data: FurnitureData[]) => void;
    initFurnitureData: () => void;

}

const useMyFurnitureStore = create<FurnitureDataStore>((set) => ({
    myFurniture: {
        furniture: [],
        wallpaper: {},
        tile: {}
    },
    updateFurnitureData: (data: FurnitureData[]) =>
        set((state) => {
            const newData = {
                ...state,
                myFurniture: {
                    ...state.myFurniture,
                    furniture: data
                }
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
                            {
                                ...furniture.bed['basic_bed'],
                                position: [3.8, 0, -3],
                                id: 'basic_bed-0',
                            },
                            {
                                ...furniture.chair['basic_chair'],
                                position: [-3, 0, -3],
                                id: 'basic_chair-0'
                            },
                            {
                                ...furniture.desk['basic_desk'],
                                position: [-3, 0, -4],
                                id: 'basic_desk-0'
                            }
                        ],
                        wallpaper: texture.wallpaper['basic_wallpaper'],
                        tile: texture.tile['basic_tile']
                    }
                };

                localStorage.setItem('myFurniture', JSON.stringify(newData));
                return newData;
            }
        })
}));

export default useMyFurnitureStore;
