import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import {createGlobalStyle, ThemeProvider} from "styled-components";
import themes from '../src/theme'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
};

export default preview;


const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'HakgyoansimDunggeunmisoTTF-B';
    src: url('https://fastly.jsdelivr.net/gh/projectnoonnu/2408-5@1.0/HakgyoansimDunggeunmisoTTF-B.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
  }

  * {
    padding: 0;
    margin: 0;

    font-family: 'HakgyoansimDunggeunmisoTTF-B', serif;
  }
  
  body {
    background-color: grey;
  }
  
  main {
    width: 100vw;
    height: 100vh;
  }
`;

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: themes,
    },
    defaultTheme: 'light',
    Provider: ThemeProvider,
    GlobalStyles,
  })];