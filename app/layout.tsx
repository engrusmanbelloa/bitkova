'use client'
import { useEffect, useState } from "react"
// import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import StyledComponentsRegistry from '@/lib/registry'
import dynamic from 'next/dynamic'
import {GlobalStyle, theme} from "@/styles/theme"
import Announcement from "@/components/Announcement"
import Meta from "@/components/Meta"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ipad } from "../responsive";

const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 0;
  background-color: ${props =>  props.theme.white};
  ${ipad({ width: "748px",
  })}
  ${ipad({ width: "360px",
  })}
`;
const Wrapper = styled.div`
  width: 1130px;
  margin: 0 auto;
  padding: 0 10px;
  ${ipad({ width: "748px",
  })}
  ${ipad({ width: "360px",
  })}
`;

// export default function RootLayout({ Component, pageProps: { session, ...pageProps } }) {
  
//   return (
//     <SessionProvider session={session}>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </SessionProvider>
//   )
// }

// export default RootLayout

export default function RootLayout({children}: {children: React.ReactNode}, session) {
  // const session = await auth()

  return (
    <SessionProvider session={session}>
    <html lang="en">
      <body>
      <GlobalStyle />
        {/* Layout UI */}
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <Container>
              <Wrapper>
                <Announcement />
                <Navbar />
                {children}
              </Wrapper>
            </Container>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
    </SessionProvider>
  )
}