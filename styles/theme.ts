"use client"
import { createGlobalStyle } from "styled-components"
import { createTheme } from "@mui/material/styles"

// custom styles types for muiTheme configuration
declare module "@mui/material/styles" {
    interface Theme {
        mobile: {
            mobileNavBg: string
            offWhite: string
            horizontalrule: string
            green: string
            orange: string
            orangeShadow: string
            orangeDark: string
            ash: string
        }
        widths: {
            dsktopWidth: string
            heroWidth: string
            ipadWidth: string
            mobileWidth: string
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
            horizontalrule?: string
            green?: string
            orange?: string
            orangeShadow?: string
            orangeDark?: string
            ash?: string
        }
        widths?: {
            dsktopWidth: string
            heroWidth: string
            ipadWidth: string
            mobileWidth: string
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
        horizontalrule: "#cddeff",
        green: "#4caf50",
        orange: "#ff5722",
        orangeShadow: "rgba(255, 87, 34, 0.2)",
        orangeDark: "#e64a19",
        ash: "#c0cfd6ff",
    },
    widths: {
        dsktopWidth: "1140px",
        heroWidth: "1100px",
        ipadWidth: "665px",
        mobileWidth: "350px",
    },
    paddings: {
        pagePadding: "5px 15px",
    },
})
export const GlobalStyle = createGlobalStyle`
  body {
    padding: 0px;
    margin: 0px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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
    font-weight: 600;
    line-height: 30px;
  }
  h3 {
    font-size: 22px;
    font-weight: 500;
    line-height: 25px;
  }
  h4 {
    font-size: 20px;
    font-weight: 500;
    line-height: 25px;
  }
  p {
    font-size: 16px;
    font-weight: 300;
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
      font-weight: 500;
    }
    p {
      font-size: 14px;
      font-weight: 400;
    }
  }

  @media (max-width: 600px) {
    h2 {
      font-size: 20px;
      line-height: 24px;
    }
    h3 {
      font-size: 18px;
      line-height: 20px;
    }
    * {
    box-sizing: border-box;
   }
}
`

// export const theme = {
//     palette: {
//         common: {
//             black: "#000000B2",
//             white: "#ffffff",
//         },
//         primary: {
//             main: "#356DF1",
//         },
//         action: {
//             hover: "rgb(53, 109, 241, 0.08)",
//         },
//         background: {
//             default: "#ffffff",
//         },
//     },
//     shape: {
//         borderRadius: 4,
//     },
//     //   typography: {
//     //     fontFamily: "var(--font-roboto)",
//     //   },
//     mobile: {
//         mobileNavBg: "#EAF3FB",
//         offWhite: "#ABD0ED",
//         horizontalrule: "#cddeff",
//     },
//     widths: {
//         dsktopWidth: "1140px",
//         heroWidth: "1100px",
//         ipadWidth: "665px",
//         mobileWidth: "360px",
//     },
//     paddings: {
//         pagePadding: "5px 15px",
//     },
// }
