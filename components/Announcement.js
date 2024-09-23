'use client'
import styled from "styled-components";
import { mobile, ipad} from "../responsive";

const Container = styled.div`
  height: 45px;
  width: 100%;
  margin: 0;
  padding: 0;
  background-color: rgba(28, 56, 121, 0.9);
  color: white;
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  font-size: 20px;
  letter-spacing: 1.5;

  ${mobile({fontSize: "12px", height: "30px", textAlign: "center"})}
`;

const Announcement = () => {
  return <Container>Skill up in blockchain technology with biktkova, learn now!</Container>;
};

export default Announcement;