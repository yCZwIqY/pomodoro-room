import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { ThemeProvider } from 'styled-components';
import theme from './theme';
import useTokenStore from './store/tokenStore.tsx';
import { useEffect } from 'react';

function App() {
  const { initToken } = useTokenStore();

  useEffect(() => {
    initToken();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
