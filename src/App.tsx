import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { useEffect, useRef } from 'react';
import useTokenStore from '@store/useTokenStore.tsx';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';

function App() {
  const { initToken } = useTokenStore();
  const { initFurnitureData } = useMyFurnitureStore();

  const effectRan = useRef(false);

  useEffect(() => {
    if (!effectRan.current) {
      initToken();
      initFurnitureData();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
