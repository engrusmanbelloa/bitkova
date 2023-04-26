import { PaystackButton } from "react-paystack"
import styled from "styled-components"
import { useState, useEffect } from "react"
import {useRouter} from "next/router"
import { getProviders, useSession, signIn, signOut, getCsrfToken, getSession } from "next-auth/react"
import img from "../public/intro.jpg"
import { mobile, ipad} from "../responsive"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 10px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #CDDEFF;
  border-bottom: 1px solid #CDDEFF;
`;

const Info = styled.div`
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  margin: auto;
  border-radius: 5px;
`;


const Price = styled.p`
  font-size: 20px;
  font-weight: 500;
  color: ##1C3879;
  ${ipad({ fontSize: "18px", margin: "0, auto"})}
  ${mobile({ fontSize: "17px", margin: "0, auto"})}
`;

const Button = styled.button`
  width: 150px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 5px 5px #CDDEFF;
  background-color: #1C3879;
  color: white;
  font-size: 20px;
  font-weight: 600;  
  cursor: pointer;
`;

const SetUpdate = styled.div`
  font-size: 18px;
  margin: 10px auto;
  font-weight: 400;
  color: #fff;
  width: 10%;
  padding: 10px;
  border-radius: 5px;
  border: 0.5px solid;
  box-shadow: 5px 5px #CDDEFF;
  text-align: center;
  background: rgba(28, 56, 121, 1);
  ${ipad({width: "80%"})}
  ${mobile({})}
`;

const Success = (props) => {
  const router = useRouter ()
  const { data: session, status } = useSession()

  return (
    <Container>
    {session ? 
      <Wrapper>
        <Info>
          <Image src={img} alt="Picture of the author" />
          <Price>Course purchase successful</Price>
        </Info>
        <Button onClick={router.push("/my-courses")}>Go to learn</Button>
      </Wrapper>
      : <SetUpdate>Unauthorized</SetUpdate>}
    </Container>
  )
}

export default Success