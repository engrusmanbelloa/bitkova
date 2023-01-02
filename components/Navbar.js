import Badge from "@mui/material/Badge"
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import MenuIcon from '@mui/icons-material/Menu';
import styled from "styled-components";
import { mobile, ipad} from "../responsive";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'
import React, { useState } from 'react';

// ":hover":{color: "white"}

// containers section
const Container = styled.div`
  height: 70px;
  margin: 0;
  padding: 0;
  background: #fff;
  position: sticky;
  top: 0;
  z-index: 99;
  ${ipad({ height: "45px" })}
`;

const Wrapper = styled.nav`
  padding: 0 15px;
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
  margin: 0;
  padding: 0;
`;

const LogoContainer = styled.li`
  margin: 0;
  padding: 0;
`;

const Logo = styled.img`
  width: 140px;
  height: 25px;
  margin-right: 10px;
  ${mobile({ width: 110, height: 20, marginRight: 5 })}
`;

// middle section of the nav bar
const Center = styled.ul`
  flex: 1;
  text-align: center;
  justify-content: center;
  margin: 0;
  padding: 0;
  ${ipad({ flex: 2, height: "70%" })}
`;

const SearchContainer = styled.li`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0;
  padding: 7px;
  border-radius: 15px;
  ${ipad({ height: 18, width: 300 })}
  ${mobile({ height: 16, width: "90%" })}
`;
const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  font-size: 20px;
  ${ipad({ width: "100%", height: "90%", fontSize: "14px" })}

  &:focus{
    outline: none;
  }
`;

// right section of the nav bar
const Right = styled.ul`
  list-style: none;
  flex: 1.6;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${ipad({ 
    flex: 1,
    })}
`;

const MenuItem = styled.li`
  cursor: pointer;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 500;
  height: 18px;
  padding: 10px;
  border: ${props => props.noborder ? "none": "0.3px solid rgba(28, 56, 121, 0.9)"};
  border-radius: 3px;
  background: ${props => props.primary ? "rgba(28, 56, 121, 0.9)": "white"};
  margin-left: 15px;
  color: ${props => props.primary ? "white" : "#000"};

  &:hover {
    background: ${props => props.primary ? "#fff": "#CDDEFF"};
    color: ${props => props.primary ? "rgba(28, 56, 121, 0.9)" : "#000"};
  }

  ${ipad({display: "none" })}
`;

const Smenu = styled.p`
  
`;

const MobileCart = styled.div`
  position: relative;
  right: 20px;
  display: none;
  ${ipad({display: "flex" })}
`;

const Hr = styled.hr`
  color: #CDDEFF;
  width: 100%;
`;

const Title = styled.h2`
  margin: 5px;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 1.5;
`;

const Toggle = styled.div`
  display: none;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  text-align: end;
  background: #fff;
  padding: 5px;
  position: absolute;
  right: 0;
  top: 0px;
  margin: auto 0;
  ${'' /* width: 25%; */}
  border-radius: 5px;
  z-index: 99;
  ${ipad({
    display: "block",
   })}
`;

const Language = styled.span`
  cursor: pointer;
  justify-content: center;
  align-items: center;
`;


const Navbar = () => {
  const router = useRouter()
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <>
    <Container>
      <Wrapper>
        <Left>
            <Link href="/">
              <Logo src="/Logo.png" alt="bitkova Logo"/>
            </Link>
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 24, cursor: "pointer"}} />
          </SearchContainer>
        </Center>
        <Right>
        <MenuItem noborder style={{ width: 120}}type="button" onClick={() => router.push("/my-courses")}>My learning</MenuItem>
          {/* <Link href="#"><MenuItem noborder style={{ width: 120}}>My learning</MenuItem></Link> */}
          <MenuItem noborder type="button" onClick={() => router.push("/cart")}>
            <IconButton aria-label="cart" sx={{color: "rgba(28, 56, 121, 0.9)", paddingTop: 0}}>
              <Badge badgeContent={4}>
                  <ShoppingCartIcon />
              </Badge>
            </IconButton>
            </MenuItem>
          
          <MenuItem primary style={{ width: 100}}type="button" onClick={() => router.push("/login")}>Login</MenuItem>
          <MenuItem style={{ width: 100}}type="button" onClick={() => router.push("/register")}>Sign up</MenuItem>
          <Link href="#">
          <MenuItem>
          <Language><LanguageIcon/></Language>
          </MenuItem>
          </Link>
          <MobileCart>
          <Smenu type="button" onClick={() => router.push("/cart")}>
            <IconButton aria-label="cart" sx={{color: "rgba(28, 56, 121, 0.9)", paddingTop: 0}}>
              <Badge badgeContent={4}>
                  <ShoppingCartIcon />
              </Badge>
            </IconButton>
            </Smenu>
          </MobileCart>
          <Toggle>
            {toggleMenu
            ? <MenuIcon color="#fff" size={27} onClick={() => setToggleMenu(false)} />
            : <MenuIcon color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
          {toggleMenu && (
            <div>
              <Smenu type="button" onClick={() => router.push("/login")}>Login</Smenu>
              <Smenu type="button" onClick={() => router.push("/register")}>Sign up</Smenu>
              <Hr/>
              <Title>Most Popular courses</Title>
              <Smenu type="button" onClick={() => router.push("/login")}>Crypto Market Analytics</Smenu>
              <Smenu type="button" onClick={() => router.push("/login")}>Blockchain UI UX design</Smenu>
              <Smenu type="button" onClick={() => router.push("/login")}>Blockchain marketing</Smenu>
              <Hr/>
              <Smenu type="button" onClick={() => router.push("/login")}>Help</Smenu>
              <Smenu type="button" onClick={() => router.push("/login")}><Language><LanguageIcon/></Language></Smenu>
            </div>
          )}
          </Toggle>
        </Right>
      </Wrapper>
     </Container>
     
     </>
  );
};

export default Navbar;