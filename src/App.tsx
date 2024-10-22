import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { useEffect, useRef } from 'react';
import useTokenStore from '@store/useTokenStore.tsx';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';
import useMyBagStore from '@store/useMyBagStore.ts';

function App() {
  const { initToken } = useTokenStore();
  const { initFurnitureData } = useMyFurnitureStore();
  const { init } = useMyBagStore();

  const effectRan = useRef(false);

  useEffect(() => {
    window.oncontextmenu = () => false;
    if (!effectRan.current) {
      initToken();
      init();
      initFurnitureData();
    }

    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister();
          });
          navigator.serviceWorker.register('/service-worker.js');
        });
      });
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
