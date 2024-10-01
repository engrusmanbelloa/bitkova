'use client'
import Badge from "@mui/material/Badge"
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import SearchIcon from '@mui/icons-material/Search'
import LanguageIcon from '@mui/icons-material/Language'
import MenuIcon from '@mui/icons-material/Menu'
import styled from "styled-components"
import { mobile, ipad} from "@/responsive"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import useStore from "@/config/store"

// containers section
const Container = styled.div`
  height: 50px;
  width: 78%;
  margin: 0 auto;
  padding: 5px 10px;
  position: sticky;
  top: 0;
  ${ipad({ width: "665px", height: "30px", padding: "5px 0"})}
  ${mobile({ width: "360px"})}
`;
const Wrapper = styled.nav`
  padding: 0;
  margin: 0;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
// left section of the nav bar
const Left = styled.ul`
  flex: 1;
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 60px;
`;
const LogoContainer = styled.li`
  margin: 0;
  padding: 0;
`;
const Logo = styled.h2`
  position: relative;
  &:hover {
    animation: pulse;
    animation-duration: 1s;
  }
  &::first-letter {
      text-transform: uppercase;
  }
  color: ${props => props.theme.main};
  ${mobile({ width: 110, height: 20, marginRight: 5 })}
`;
// middle section of the nav bar
const Center = styled.ul`
  flex: 2.5;
  display: flex;
  justify-content: start;
  align-items: center;
  list-style-type: none;
  width: 657px;
  height: 40px;
  padding: 10px;
  gap: 10px;
`;
const Menu = styled.li`
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  text-align: center;
  padding: 10px 25px;
  border-radius: 5px;
  color: ${props => props.theme.black};
    &:hover {
      animation: pulse;
      animation-duration: 1s;
      background-color: ${props => props.theme.navHover};
      color: ${props => props.theme.main};
  }
    &::first-letter {
      text-transform: uppercase;
  }
    &:focus{
    background-color: ${props => props.theme.main};
  }
  color: ${props => props.theme.black};
  ${ipad({ fontSize: 12, lineHeigh: 14, padding: "5px 10px" })}
  ${mobile({ height: 16, width: "90%" })}
`;
// right section of the nav bar
const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;
const NavBtn = styled.button`
  width: 198px;
  height: 50px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 5px;
  background-color: ${props =>  props.theme.main};
  color: ${props => props.theme.offWhite};
    &:hover {
      animation: pulse;
      animation-duration: 1s;
      background-color: ${props => props.theme.navHover};
      color: ${props => props.theme.main};
  }
  ${ipad({ width: 114, height: 30, fontSize: "12px"})}
`;

const Navbar = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const [toggleMenu, setToggleMenu] = useState(false)

  const menuList = [

  {
    id: 1,
    href: "#",
    title: "Testimonials",
  },
  {
    id: 2,
    href: "#",
    title: "Be a partner",
  },
  {
    id: 3,
    href: "#",
    title: "Offline Class",
  },
  {
    id: 4,
    href: "#",
    title: "Our Hub"
  },
]

  const {cart} = useStore()
  
  return (
    <>
    <Container>
      <Wrapper>
      {/* nav left items container  */}
        <Left>
           <LogoContainer>
            <Link href="/#">
              <Logo>Bitkova</Logo>
            </Link>
           </LogoContainer>
        </Left>
        {/* nav center items container  */}
        <Center>
          {menuList.map((item) => 
            <Link key={item.id} href={item.href}> 
              <Menu >{item.title}</Menu> 
            </Link>
          )}
        </Center>
        {/* nav right items container  */}
        <Right>
          <NavBtn>Browse Courses</NavBtn>
        </Right>
      </Wrapper>
     </Container>
     
     </>
  )
}

export default Navbar