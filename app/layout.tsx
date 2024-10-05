'use client'
import { useEffect, useState } from "react"
// import { auth } from "@/auth"
import { SessionProvider } from "next-auth/react"
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import StyledComponentsRegistry from '@/lib/registry'
import {GlobalStyle, theme} from "@/styles/theme"
import Announcement from "@/components/Announcement"
import Meta from "@/components/Meta"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ipad, mobile } from "@/responsive";
import CarrierCard from "@/components/CarrierCard"

const Container = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding: 0;
  background-color: ${props =>  props.theme.white};
  ${ipad({ width: "768px", })}
  ${mobile({ width: "360px", })}
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
    // <SessionProvider session={session}>
    <html lang="en">
      <body>
      <GlobalStyle />
        {/* Layout UI */}
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <Container>
                <Announcement />
                <Navbar />
                  {children}
                <CarrierCard />
                <Footer />
            </Container>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
    // </SessionProvider>
  )
}