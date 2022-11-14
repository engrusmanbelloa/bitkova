import styled, { keyframes } from "styled-components";
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import Image from 'next/image'
import img from "../public/intro.jpg";

const fadeInBottom = keyframes`{
			
  0% {
    transform:translateY(50px);
    opacity:0;
  }
  100% {
    transform:translateY(0);
    opacity:1;
  }
}
`;

const Container = styled.section`
  position: relative;
  animation: 0.6s ${fadeInBottom} cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
  height: 350px;
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  font-size: 12px;
  letter-spacing: 1px;
`;

const ImageContainer = styled.div`
  flex: 1;
  width: 35%;
  padding: 15px;
  margin-left: 5%;
`;

const InfoContainer = styled.div`
  flex: 2.5;
  text-align: justify;
  padding: 15px;
`;

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
`;

const Desc = styled.p`
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 2px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 10px;
  margin: 0px 20px 0px 0px;
  font-size: 20px;
  width: 100%;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(28, 56, 121, 0.5);
    color: #fff;
  }
`;

const Intro = () => {
  return <Container>
            <AnimationOnScroll animateIn="animate__pulse">
            <ImageContainer>
              <Image src={img} alt="Picture of the author" width={300} height={300}/>
            </ImageContainer>
            </AnimationOnScroll>
            <AnimationOnScroll animateIn="animate__fadeInUp">
            <InfoContainer>
              <Title>Why Bitkova</Title>
              <Desc>To fill the need of individuals seeking in-demand crypto and blcockchain skills to improve their standard of living and attaining financial freedom by providing excellent hands-on training for a wider variety of students by offering alternate solutions to conventional schooling utilizing current internet technologies and proven teaching practices implemented by a team of professionals in blcockchain, e-commerce, forex, cryptocurrency, social media marketing and motion/graphics industries.</Desc>
              <Button>Learn more</Button>
            </InfoContainer>
            </AnimationOnScroll>
         </Container>;
};

export default Intro;