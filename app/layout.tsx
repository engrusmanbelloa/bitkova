"use client"

import { useEffect, useState, Suspense } from "react"
import styled, { ThemeProvider } from "styled-components"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster, toast } from "sonner"
import { SpeedInsights } from "@vercel/speed-insights/next"

import StyledComponentsRegistry from "@/lib/registry"
import { GlobalStyle, theme } from "@/styles/theme"
import { initAppCheck } from "@/lib/firebase/appCheck"
import useSessionRefresh from "@/hooks/useSessionRefresh"
import Announcement from "@/components/home/Announcement"
import Navbar from "@/components/nav/Navbar"
import Footer from "@/components/home/Footer"
import IsLoading from "@/components/IsLoading"
import useNetworkStatus from "@/components/auth/useNetworkStatus"
import { ipad, mobile } from "@/responsive"

const Container = styled.div`
    width: ${(props) => props.theme.widths.dsktopWidth};
    margin: 0 auto;
    padding: 0;
    ${ipad(
        (props: any) => `
            width: ${props.theme.widths.ipadWidth};
        `,
    )}
    ${mobile(
        (props: any) => `
            width: ${props.theme.widths.mobileWidth};
            
        `,
    )}
`
export default function RootLayout({ children }: { children: React.ReactNode }) {
    const isOnline = useNetworkStatus()
    // const queryClient = new QueryClient()
    // const [queryClient] = useState(() => new QueryClient())

    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 2,
                        staleTime: 60_000,
                        gcTime: 5 * 60_000,
                        refetchOnWindowFocus: false,
                        networkMode: "offlineFirst",
                    },
                },
            }),
    )
    // Initialize App Check on mount
    useEffect(() => {
        initAppCheck()
    }, [])

    // Handle session expiration every 30 minutes
    // useSessionRefresh()

    // Network status handler
    useEffect(() => {
        const setOnline = () => {
            queryClient.setDefaultOptions({
                queries: { networkMode: "online" },
            })

            toast.dismiss("offline")
            toast.success("Back online", { id: "online" })
            queryClient.invalidateQueries()
        }

        const setOffline = () => {
            queryClient.setDefaultOptions({
                queries: { networkMode: "offlineFirst" },
            })

            toast.error("You are offline", {
                id: "offline",
                duration: Infinity,
            })
        }

        window.addEventListener("online", setOnline)
        window.addEventListener("offline", setOffline)

        return () => {
            window.removeEventListener("online", setOnline)
            window.removeEventListener("offline", setOffline)
        }
    }, [queryClient])

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
                                        <SpeedInsights />
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
