import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import { useState } from "react"
import styled from "styled-components"
import { useRouter } from 'next/router'
import { sliderItems } from "../data"
import {mobile, ipad} from "../responsive"
import { AnimationOnScroll } from 'react-animation-on-scroll'

const Container = styled.section`
  width: 100%;
  height: 500px;
  margin: 0px;
  display: flex;
  position: relative;
  overflow: hidden;
  ${ipad({
    height: "370px" 
    })}
 `;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  ${ipad({
    height: "40px",
    width: "40px",
   })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slideIndex * -100}vw);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100%;
  position:relative;
  display: flex;
  align-items: center; 
  background-image: url(${(props) => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #${(props) => props.bg};
`;

const InfoContainer = styled.div`
  flex: 1;
  position: absolute;
  top: 180px;
  left: 80px;
  width: 40%;
  color: white;
  ${ipad({
    position: "relative",
    top: "30px",
    left: "0",
    margin: "30px",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
   })}
`;

const Title = styled.h1`
  font-size: 25px;
  animation: pulse;
  animation-duration: 1s;
  ${ipad({fontSize: "16px"})}
`;

const Desc = styled.p`
  font-size: 16px;
  font-weight: 300;
  letter-spacing: 2px;
  line-height: 1.5;
  animation: pulse;
  animation-duration: 1s;
  ${ipad({fontSize: "11px" })}
   ${mobile({ fontSize: "14px" })}
`;

const Button = styled.button`
  padding: 10px;
  margin: 0px 20px 0px 0px;
  font-size: 20px;
  bacolor: blue;
  background-color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: rgba(28, 56, 121, 0.9);
    color: #fff;
  }
  ${mobile({
    fontSize: "14px",
    padding: "5px",
    marginTop: "5px",
   })}
`;

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };
  const router = useRouter()
  return (
    <Container>
    <Arrow direction="left" onClick={() => handleClick("left")}>
    <ArrowBackIosIcon />
       </Arrow>
       <Wrapper slideIndex={slideIndex}>
        {sliderItems.map((item) => (
           <Slide key={item.id} src={item.img} alt={"Picture of the author"}> 
            <InfoContainer>
              <AnimationOnScroll animateIn="animate__pulse animate__slower" initiallyVisible="true">
                <Title>{item.title}</Title>
              </AnimationOnScroll>
              <AnimationOnScroll animateIn="animate__pulse animate__slower" initiallyVisible="true">
                <Desc>{item.desc}</Desc>
              </AnimationOnScroll>
                <Button type="button" onClick={() => router.push('/courses')}>Our courses</Button>
                <Button type="button" onClick={() => router.push('/')}>About us</Button>
            </InfoContainer>
           </Slide>
         ))}
       </Wrapper>
      <Arrow direction="right" onClick={() => handleClick("right")}>
         <ArrowForwardIosIcon />
       </Arrow> 
    </Container>
  );
};

export default Slider;