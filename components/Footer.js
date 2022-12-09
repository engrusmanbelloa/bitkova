import React from 'react'
import styled from "styled-components";
import { mobile } from "../responsive";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Telegram from '@mui/icons-material/Telegram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

const Container = styled.div`
  display: flex;
  color: #fff;
  background: #1A2980;
  background: linear-gradient(to bottom, #26D0CE, #1A2980); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 15px 0px;
  font-size: 20px;
  line-spacing: 1.5;
  line-height: 1.5;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <>
      <Container>
      <Left>
        <Logo>BITKOVA</Logo>
        <Desc>
           There are many variations of passages of Lorem Ipsum available, but
           the majority have suffered alteration in some form, by injected
           humour, or randomised words which dont look even slightly believable.
         </Desc>
         <SocialContainer>
           <SocialIcon>
            <FacebookIcon sx={{color: "#fff"}} />
           </SocialIcon>
           <SocialIcon>
             <InstagramIcon sx={{color: "#E4405F"}} />
           </SocialIcon>
           <SocialIcon>
            <TwitterIcon sx={{color: "#55ACEE"}} />
           </SocialIcon>
          <SocialIcon>
             <Telegram sx={{color: "#1c92d2"}} />
          </SocialIcon>
         </SocialContainer>
        </Left>
        <Center>
          <Title>Useful Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Courses</ListItem>
            <ListItem>Events</ListItem>
            <ListItem>Team</ListItem>
            <ListItem>News</ListItem>
            <ListItem>My learning</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List>
        </Center>
          <Right>
          <Title>Contact</Title>
          <ContactItem>
            <LocationOnIcon style={{marginRight:"10px"}}/> Opposite Baballe ila mosque, Farm center Kano.
          </ContactItem>
          <ContactItem>
            <WhatsAppIcon style={{marginRight:"10px"}}/> +234 803 250 3624
          </ContactItem>
          <ContactItem>
            <MailOutlineIcon style={{marginRight:"10px"}} /> info@bitkova.com
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Picture of the author" />
        </Right>
      </Container>
    </>
  )
}

export default Footer
