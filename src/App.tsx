import './App.css';
import {RouterProvider} from 'react-router-dom';
import router from './router';
import {ThemeProvider} from 'styled-components';
import theme from './theme';
import {useEffect, useRef} from 'react';
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

    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    }

    if (navigator.serviceWorker && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then(registration => {
        registration.active?.postMessage({ type: 'SHOW_NOTIFICATION' });
      });
    }

    return () => {
      effectRan.current = true;
    };
  }, []);


  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}/>
    </ThemeProvider>
  );
}

export default App;
