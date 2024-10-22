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

    if (Notification.permission === 'default') {
      alert('원할한 서비스 사용을 위해 알림권한을 활성화 해주세요!')
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('알림 권한이 부여되었습니다.');
        } else if (permission === 'denied') {
          console.log('알림 권한이 거부되었습니다.');
        }
      });
    }

    if ('serviceWorker' in navigator) {
      if (!navigator.serviceWorker.controller) {
        navigator.serviceWorker.register('/service-worker.js').then(() => {
          console.log('서비스워커 등록');
        }).catch(error => {
          console.error('서비스워커 등록 실패:', error);
        });
      }
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
