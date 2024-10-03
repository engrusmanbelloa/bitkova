import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'

export const theme = {
    main: "#356DF1",
    black: "#000000B2",
    white: "#ffffff",
    offWhite: "#C0DCF2",
    navHover: "rgb(53, 109, 241, 0.3)",
    mobileNavBg: "#EAF3FB",
    dsktopWidth: "78%"
  }

export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0px;
    margin: 0px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
        Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }
  
  a {
    text-decoration: none;
    text-transform: lowercase;
  }

  a::first-letter {
      text-transform: uppercase;
  }
  h2 {
    font-size: 24px;
    font-weight: 900;
    line-height: 30px;
  }

  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
  }
  
  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 25px;
  }

  @media (max-width: 768px) {
    h2 {
      font-size: 20px;
      line-height: 17px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
    }
  }

  @media (max-width: 480px) {
    h2 {
      font-size: 20px;
      line-height: 17px;
    }
}
`