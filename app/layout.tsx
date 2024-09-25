// 'use client'
import { auth } from "@/auth"
import StyledComponentsRegistry from '@/lib/registry'
import Layout from "../components/Layout"
import dynamic from 'next/dynamic'
import '../styles/global.css'
import { SessionProvider } from "next-auth/react"
// import { useEffect, useState } from "react"



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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* <main>{children}</main> */}
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}