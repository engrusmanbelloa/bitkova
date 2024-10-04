'use client'
import React from 'react'
import styled from "styled-components";
import { mobile, ipad } from "@/responsive";
import {Facebook, Twitter, Instagram, Telegram, WhatsApp, LocationOn, MailOutline} from '@mui/icons-material';
import { useRouter } from 'next/navigation'
import Link from "next/link"
import Logo from "@/components/Logo"

const Container = styled.section`
  color: ${props => props.theme.black};
  background: ${props =>  props.theme.white};
  width: ${props => props.theme.dsktopWidth};
  margin: 0 auto 10px;
  ${ipad({ width: "665px", })};
  ${mobile({ width: "360px", flexDirection: "column" })};
`;
const Wrapper = styled.div`
  display: flex;
  ${ipad({})};
  ${mobile({flexDirection: "column" })};
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 10px 0px;
  margin: 0;
  ${ipad({})}
`;
const Desc = styled.p`
  margin: 0px;
  text-align: justify;
  ${ipad({})}
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
  cursor: pointer;
  &:hover {
    animation: pulse;
    animation-duration: 1s;
    background-color: ${props => props.theme.navHover};
    color: ${props => props.theme.main};
  }
   ${ipad({ marginRight: 5})}
`;
const Center = styled.div`
  flex: 1.5;
  padding: 10px 0px;
  margin: 0 40px;
  ${ipad({ flex: 2, margin: "0 30px"})}
  ${mobile({ display: "none" })}
`;
const Title = styled.h4`
  margin-bottom: 18px;
  ${ipad({marginBottom: "10px", marginTop: 12})}
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
  &::first-letter {
    text-transform: uppercase;
  };
  ${ipad({fontWeight: "400"})}
`;
const LinkItem = styled(Link)`
  color: ${props => props.theme.black};
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  ${ipad({})};
  &:hover {color: ${props => props.theme.main};
`;
const Right = styled.div`
  flex: 2;
  padding: 10px 0px;
  margin: 0;
  ${ipad({ flex: 2,})}
  ${mobile({
    borderTop: "1px solid #CDDEFF",
  })}
`;
const ContactItem = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;
const ContactDiv = styled.div`
  display: flex;
  align-items: center;
`;
const IconsData = styled.p`
  margin: 5px;
`;
const Payment = styled.img`
    width: 60%;
    ${ipad({ width: "90%" })}
`;
const Alrights = styled.p`
  margin: 30px auto;
  width: 100%;
  text-align: center;
`;
export default function Footer(){
  const socialIconsData = [
    {
      icon: Facebook,
      onClick: () => window.open("https://web.facebook.com/AcademyBitkova"),
      color: "#1877F2",
    },
    {
      icon: Instagram,
      onClick: () => window.open("https://www.instagram.com/bitkovang/"),
      color: "#E4405F",
    },
    {
      icon: Twitter,
      onClick: () => window.open("https://twitter.com/BitkovaNg"),
      color: "#55ACEE",
    },
    {
      icon: Telegram,
      onClick: () => window.open("https://t.me/bitkovaacademy"),
      color: "#1c92d2",
    },
  ]
  const footerMenuList = [

    {
      id: 1,
      href: "#",
      title: "Communities",
    },
    {
      id: 2,
      href: "#",
      title: "Terms"
    },
    {
      id: 3,
      href: "#",
      title: "Courses",
    },
    {
      id: 4,
      href: "#",
      title: "Privacy"
    },
    {
      id: 5,
      href: "#",
      title: "Our Hub"
    },
    {
      id: 6,
      href: "#",
      title: "Frequent Questions"
    },
  ]
  const contactItemsData = [
    {
      icon: WhatsApp,
      data: "+234 80325-3624",
      color: "#25D366",
    },
    {
      icon: LocationOn,
      data: "D4 Duwa Plaza, Opposite Bauchi Park, Gombe State",
      color: "#000000B2",
    },
    {
      icon: MailOutline,
      data: "info@bitkova.com",
      color: "#000000B2",
    }
  ]
  const router = useRouter()
  const currentYear = new Date().getFullYear()
  return (
    <>
      <Container>
        <Wrapper>
          <Left>
            <Logo />
            <Desc>
              At Bitkova, our primary aim is to equip you with core digital skills  needed to  navigate 
              through the job market and advance in your career.
            </Desc>
            <SocialContainer>
              {socialIconsData.map((iconData, index) => (
                <SocialIcon key={index}><iconData.icon sx={{color: iconData.color}} onClick={iconData.onClick} /></SocialIcon>
              ))}
            </SocialContainer>
          </Left>
          <Center>
            <Title>Useful Links</Title>
            <List>
              {footerMenuList.map((menu, index) => (
                <ListItem key={index}>
                  <LinkItem href={menu.href} onClick={() => router.push(menu.href)}>{menu.title}</LinkItem>
                </ListItem>
              ))}
            </List>
          </Center>
          <Right>
          <Title>Contact</Title>
          <ContactItem>
            {contactItemsData.map((contactItem, index) => (
              <ContactDiv key={index}>
                <contactItem.icon  sx={{color: contactItem.color, marginRight:"10px"}} /> 
                <IconsData> {contactItem.data}</IconsData>
              </ContactDiv>
            ))}
          </ContactItem>
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Picture of the author" />
          </Right>
        </Wrapper>
        <Alrights>
          © {currentYear} Bitkova Academy. All rights reserved.
        </Alrights>
      </Container>
    </>
  )
}
