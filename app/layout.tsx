"use client"
import { useEffect, useState, Suspense } from "react"
import styled, { ThemeProvider, createGlobalStyle } from "styled-components"
import StyledComponentsRegistry from "@/lib/registry"
import { GlobalStyle, theme } from "@/styles/theme"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster, toast } from "sonner"
import Announcement from "@/components/home/Announcement"
import Navbar from "@/components/nav/Navbar"
import Footer from "@/components/home/Footer"
import IsLoading from "@/components/IsLoading"
import useNetworkStatus from "@/components/auth/useNetworkStatus"
import { ipad, mobile } from "@/responsive"
import useSessionRefresh from "@/hooks/useSessionRefresh"

const Container = styled.div`
    width: 1440px;
    margin: 0 auto;
    padding: 0;
    ${ipad({ width: "96%" })}
    ${mobile({ width: "95%" })}
`
export default function RootLayout({ children }: { children: React.ReactNode }) {
    const isOnline = useNetworkStatus()
    const queryClient = new QueryClient()
    // Handle session expiration every 30 minutes
    // useSessionRefresh()
    // Network status handler
    useEffect(() => {
        if (isOnline) {
            toast.dismiss("offline")
            toast.success("Back online!", { id: "online" })
            queryClient.invalidateQueries()
        } else {
            toast.error("You are offline", {
                id: "offline",
                duration: Infinity,
            })
        }
    }, [isOnline])

    if (!isOnline) {
        toast.error("You are offline. Please connect to the internet")
        return (
            <html lang="en">
                <head>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
                    />
                </head>
                <body>
                    <Toaster
                        position="top-center"
                        toastOptions={{
                            style: {
                                background: "#356DF1",
                                color: "#fff",
                            },
                        }}
                    />
                </body>
            </html>
        )
    }

    return (
        <html lang="en">
            <head>
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
                            <QueryClientProvider client={queryClient}>
                                <Suspense fallback={<IsLoading />}>
                                    <Container>
                                        <Announcement />
                                        <Navbar />
                                        {children}
                                        <Footer />
                                    </Container>
                                    <Toaster
                                        position="top-center"
                                        toastOptions={{
                                            style: {
                                                background: "#356DF1",
                                                color: "#fff",
                                            },
                                        }}
                                    />
                                </Suspense>
                            </QueryClientProvider>
                        </AppRouterCacheProvider>
                    </ThemeProvider>
                </StyledComponentsRegistry>
            </body>
        </html>
    )
}
