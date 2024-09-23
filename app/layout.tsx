import Layout from "../components/Layout"
import '../styles/global.css'
import { SessionProvider } from "next-auth/react"


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
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        <main>{children}</main>
      </body>
    </html>
  )
}