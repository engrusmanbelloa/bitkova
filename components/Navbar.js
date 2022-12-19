import Badge from "@mui/material/Badge"
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import styled from "styled-components";
import { mobile } from "../responsive";
import Image from "next/image";
import Link from "next/link";

// ":hover":{color: "white"}

// containers section
const Container = styled.section`
  height: 70px;
  margin: 0px 0px 0px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.nav`
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

// left section of the nav bar
const Left = styled.ul`
  flex: 1;
  list-style: none;
  display: flex;
  align-items: center;
`;

const Logo = styled.li`
  ${mobile({ fontSize: "24px" })}
`;

// middle section of the nav bar
const Center = styled.ul`
  flex: 1;
  text-align: center;
`;

const SearchContainer = styled.li`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 25px;
  padding: 5px;
  border-radius: 15px;
`;
const Input = styled.input`
  border: none;
  width: 100%;
  font-size: 20px;
  ${mobile({ width: "50px" })}

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
  ${mobile({ flex: 2, justifyContent: "center" })}
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
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}

  &:hover {
    background: ${props => props.primary ? "#fff": "#CDDEFF"};
    color: ${props => props.primary ? "rgba(28, 56, 121, 0.9)" : "#000"};
  }
`;

const Language = styled.span`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  ${mobile({ display: "none" })}
`;


const Navbar = () => {
 
  return (
    <>
    <Container>
      <Wrapper>
        <Left>
            <Link href="/">
              <Logo>
                <Image src="/images/Logo.png" alt="Vercel Logo" width={140} height={25}/>
              </Logo>
            </Link>
        </Left>
        <Center>
          <SearchContainer>
            <Input placeholder="Search" />
            <SearchIcon style={{ color: "gray", fontSize: 20 }} />
          </SearchContainer>
        </Center>
        <Right>
          <Link href="#"><MenuItem noborder style={{ width: 120}}>My learning</MenuItem></Link>
          <Link href="#"><MenuItem noborder >
            <IconButton aria-label="cart" sx={{color: "rgba(28, 56, 121, 0.9)", paddingTop: 0}}>
              <Badge badgeContent={4}>
                  <ShoppingCartIcon />
              </Badge>
            </IconButton>
            </MenuItem>
          </Link>
          <Link href="#">
            <MenuItem primary style={{width: 100}}>Log in</MenuItem>
          </Link>
          <Link href="#">
            <MenuItem style={{ width: 100}}>Sign up</MenuItem>
          </Link>
          <Link href="#">
          <MenuItem>
          <Language><LanguageIcon/></Language>
          </MenuItem>
          </Link>
        </Right>
      </Wrapper>
     </Container>
     
     </>
  );
};

export default Navbar;