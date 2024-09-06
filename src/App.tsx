import './App.css';
import { RouterProvider, useLocation, useNavigate } from 'react-router-dom';
import router from './router';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import { useEffect, useRef } from 'react';
import useTokenStore from '@store/useTokenStore.tsx';
import useMyFurnitureStore from '@store/useMyFurnitureStore.ts';
import useMyBagStore from '@store/useMyBagStore.ts';

const TransitionView = () => {
  const location = useLocation();
  const prevLocationRef = useRef(location.pathname);

  useEffect(() => {
    if (!document.startViewTransition) return;
    if (prevLocationRef.current !== location.pathname) {
      document.startViewTransition(() => {
        prevLocationRef.current = location.pathname;
      });
    }
  }, [location]);
};

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

    return () => {
      effectRan.current = true;
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <TransitionView />
      </RouterProvider>
    </ThemeProvider>
  );
}

export default App;
