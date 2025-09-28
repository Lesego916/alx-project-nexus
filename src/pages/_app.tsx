import type { AppProps } from 'next/app';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import theme from '../styles/theme';

const GlobalStyle = createGlobalStyle`
  html, body, #__next { height: 100%; }
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: Inter, Roboto, "Helvetica Neue", Arial, sans-serif;
    background: ${theme.colors.bg};
    color: ${theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  a { color: inherit; text-decoration: none; }
  button { font-family: inherit; }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
