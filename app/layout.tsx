'use client'
import { useEffect, useState } from "react"
// import { auth } from "@/auth"
// import { SessionProvider } from "next-auth/react"
import StyledComponentsRegistry from '@/lib/registry'
import Layout from "../components/Layout"
import dynamic from 'next/dynamic'
import {GlobalStyle, theme} from "@/styles/theme"

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const session = await auth()

  return (
    <html lang="en">
    <GlobalStyle />
      <body>
        {/* Layout UI */}
        <StyledComponentsRegistry>
          {/* <ThemeProvider theme={theme}> */}
            {children}
          {/* </ThemeProvider> */}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}