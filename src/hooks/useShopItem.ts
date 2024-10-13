// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import furniture from '@data/furniture.json';
import texture from '@data/texture.json';
import { useEffect, useState } from 'react';
import { FurnitureData } from '@store/useMyFurnitureStore.ts';

export type Category =
  | 'bed'
  | 'chair'
  | 'desk'
  | 'wallpaper'
  | 'tile'
  | 'all'
  | null
  | undefined;
export const useShopItem = (category: Category) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    switch (category) {
      case 'bed':
      case 'chair':
      case 'desk':
        setItems(Object.values(furniture[category]));
        break;
      case 'wallpaper':
      case 'tile':
        setItems(Object.values(texture[category]));
        break;
      default:
        setItems([
          ...Object.keys(furniture).flatMap((it) =>
            Object.values(furniture[it])
          ),
          ...Object.keys(texture)
            .filter((it) => it !== 'furniture')
            .flatMap((it) => Object.values(texture[it] as FurnitureData))
        ]);
        break;
    }
  }, [category]);

  return items;
};
