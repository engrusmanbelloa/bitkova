"use client"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import { createTheme } from "@mui/material/styles"
// export const theme = {
//   main: "#356DF1",
//   black: "#000000B2",
//   white: "#ffffff",
//   offWhite: "#ABD0ED",
//   navHover: "rgb(53, 109, 241, 0.08)",
//   mobileNavBg: "#EAF3FB",
//   dsktopWidth: "1140px",
//   heroWidth: "1100px",
//   pagePadding: "5px 15px",
// };

// custom styles types for muiTheme configuration
declare module "@mui/material/styles" {
    interface Theme {
        mobile: {
            mobileNavBg: string
            offWhite: string
        }
        widths: {
            dsktopWidth: string
            heroWidth: string
        }
        paddings: {
            pagePadding: string
        }
    }
    // allow configuration using `createTheme()`
    interface ThemeOptions {
        mobile?: {
            mobileNavBg?: string
            offWhite?: string
        }
        widths?: {
            dsktopWidth: string
            heroWidth: string
        }
        paddings?: {
            pagePadding: string
        }
    }
}

export const theme = createTheme({
    cssVariables: true,
    colorSchemes: {
        dark: true,
    },
    palette: {
        common: {
            black: "#000000B2",
            white: "#ffffff",
        },
        primary: {
            main: "#356DF1",
        },
        action: {
            hover: "rgb(53, 109, 241, 0.08)",
        },
        background: {
            default: "#ffffff",
        },
    },
    shape: {
        borderRadius: 4,
    },
    //   typography: {
    //     fontFamily: "var(--font-roboto)",
    //   },
    mobile: {
        mobileNavBg: "#EAF3FB",
        offWhite: "#ABD0ED",
    },
    widths: {
        dsktopWidth: "1140px",
        heroWidth: "1100px",
    },
    paddings: {
        pagePadding: "5px 15px",
    },
})

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
  h1 {
    font-size: 50px;
    font-weight: 700;
    line-height: 60px;
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
    font-weight: 500;
    line-height: 25px;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 36px;
      line-height: 43px;
    }
    h2 {
      font-size: 20px;
      line-height: 17px;
    }
    p {
      font-size: 14px;
      font-weight: 400;
    }
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 20px;
      line-height: 17px;
    }
}
`

// export default theme;
