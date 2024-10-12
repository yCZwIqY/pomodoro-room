import { useState, useEffect } from 'react';
import * as THREE from 'three';

export const useTextures = (wallpaperPath: string, tilePath: string) => {
  const [wallPaperTexture, setWallPaperTexture] =
    useState<THREE.Texture | null>(null);
  const [tileTexture, setTileTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    console.log(wallpaperPath)
    const loader = new THREE.TextureLoader();
    loader.load(`/textures/${wallpaperPath}`, setWallPaperTexture);
    loader.load(`/textures/${tilePath}`, setTileTexture);
  }, [wallpaperPath, tilePath]);

  return { wallPaperTexture, tileTexture };
};
