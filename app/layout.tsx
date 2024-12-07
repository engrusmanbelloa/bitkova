"use client"
import { useEffect, useState, Suspense } from "react"
// import { auth } from "@/auth"
// import { SessionProvider } from "next-auth/react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import StyledComponentsRegistry from "@/lib/registry"
import { GlobalStyle, theme } from "@/styles/theme"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import Announcement from "@/components/Announcement"
import Meta from "@/components/Meta"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { ipad, mobile } from "@/responsive"
import CarrierCard from "@/components/CarrierCard"
import IsLoading from "@/components/IsLoading"

const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding: 0;
    ${ipad({ width: "768px" })}
    ${mobile({ width: "360px" })}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // const session = await auth()

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="initial-scale=1, width=device-width" />
            </head>
            <body>
                <GlobalStyle />
                {/* Layout UI */}
                <StyledComponentsRegistry>
                    <ThemeProvider theme={theme}>
                        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                            <Suspense fallback={<IsLoading />}>
                                <Container>
                                    <Announcement />
                                    <Navbar />
                                    {children}
                                    <CarrierCard />
                                    {/* <Footer /> */}
                                </Container>
                            </Suspense>
                        </AppRouterCacheProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
