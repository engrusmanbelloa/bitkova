import Announcement from "./Announcement"
import Meta from "./Meta"
import Navbar from "./Navbar"
import Footer from "./Footer"
import styled from "styled-components";

const Container = styled.div`
  width 95%;
  margin: 0 auto;
`;

const Layout = ({ children }) => {
  return (
    <>
    <Container>
    <Meta/>
    <Announcement/>
    <Navbar/>
    {children}
    <Footer/>
    </Container>
    </>
  )
}

export default Layout