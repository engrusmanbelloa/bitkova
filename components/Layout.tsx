"use client"
import Announcement from "./Announcement"
import Meta from "./Meta"
import Navbar from "./Navbar"
import Footer from "./Footer"
import styled from "styled-components"
import { ipad } from "../responsive"

const Container = styled.div`
  width 95%;
  margin: 0 auto;
  padding: 0;
  ${ipad({ width: "98%" })}
`

const Layout = ({ children }) => {
    return (
        <>
            <Container>
                <Meta />
                <Announcement />
                <Navbar />
                {children}
                <Footer />
            </Container>
        </>
    )
}

export default Layout
