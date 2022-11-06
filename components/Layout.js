import Announcement from "./Announcement"
import Meta from "./Meta"
import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }) => {
  return (
    <>
    <Meta/>
    <Announcement/>
    <Navbar/>
    {children}
    <Footer/>
    </>
  )
}

export default Layout