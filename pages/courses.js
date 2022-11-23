import styled, { keyframes } from "styled-components";
import "animate.css/animate.min.css";
import Image from 'next/image'
import img from "../public/chd.jpg";
import CoursesList from "../components/CoursesList";
import Link from "next/link";
import Intro from "../components/intro";
import Testimonals from "../components/Testimonals";
import Newsletter from "../components/Newsletter";


const Container = styled.section`
  
`;

const Wrapper = styled.section`
  display: flex;
  height: 70vh;
  margin: 20px;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  letter-spacing: 1px;
`;

const ImageContainer = styled.div`
  flex: 1.3;
  margin-right: 3%;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-left: 3%;
  padding: 15px;
  animation: bounceIn;
  animation-duration: 2s;
`;

const Title = styled.h1`
  font-size: 35px;
  width: 80%;
`;

const Desc = styled.p`
  font-size: 17px;
  font-weight: 300;
  letter-spacing: 2px;
  line-height: 1.5;
  text-align: justify;
  width: 80%;
`;

const Button = styled.button`
  padding: 10px;
  height: 50px;
  width: 150px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 25%;
  background: rgba(28, 56, 121, 1);
  color: #fff;

  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121, 1);
  }
`;

const Courses = (href) => {
  return <Container>
            <Wrapper>
            <InfoContainer>
                <Title>Courses</Title>
                <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra tristique laoreet ut elementum cras cursus. Morbi morbi at diam.</Desc>
                <Link href="#courses" passHref legacyBehavior>
                  <Button>View courses</Button>
                </Link>
            </InfoContainer>
            <ImageContainer>
              <Image src={img} alt="Picture of the author" width={700} height={400}/>
            </ImageContainer>
            </Wrapper>
            {/* <AnimationOnScroll animateIn="animate__fadeInBottomLeft animate__slower">
              
            </AnimationOnScroll> */}
            <div id="courses">
             <CoursesList title="Latest courses"/>
            </div>
            <Intro/>
            <Testimonals/>
            <Newsletter/>
         </Container>;
};

export default Courses;