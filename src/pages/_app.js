import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "@/theme";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${(props) => props.theme.font.family};
    background-color: ${(props) => props.theme.colors.gray.normal};
    color: ${(props) => props.theme.colors.white};
  }
`;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
