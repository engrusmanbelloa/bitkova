"use client"
import { useEffect, useState, Suspense } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import StyledComponentsRegistry from "@/lib/registry"
import { GlobalStyle, theme } from "@/styles/theme"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import Announcement from "@/components/Announcement"
import Navbar from "@/components/nav/Navbar"
import Footer from "@/components/Footer"
import { ipad, mobile } from "@/responsive"
import IsLoading from "@/components/IsLoading"

const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding: 0;
    ${ipad({ width: "96%" })}
    ${mobile({ width: "95%" })}
`

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // const session = await auth()

    return (
        <html lang="en">
            <head>
                {/* <meta name="viewport" content="initial-scale=1, width=device-width" /> */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                />
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
                                    <Footer />
                                </Container>
                            </Suspense>
                        </AppRouterCacheProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
