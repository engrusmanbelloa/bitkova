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
  margin-right: 0;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 15px;
  text-align: center;
  animation: bounceIn;
  animation-duration: 2s;
`;

const Title = styled.h1`
  font-size: 35px;
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1.5;
`;

const Button = styled.button`
  padding: 10px;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
                <Desc>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra tristique laoreet ut elementum cras cursus. Viverra tristique laoreet ut elementum cras cursus Morbi morbi at diam.</Desc>
                <Link href="#courses" passHref legacyBehavior>
                  <Button>View courses</Button>
                </Link>
            </InfoContainer>
            <ImageContainer>
              <Image src={img} alt="Picture of the author" width={1000} height={500}/>
            </ImageContainer>
            </Wrapper>
            <div id="courses">
             <CoursesList title="Latest courses"/>
            </div>
            <Intro/>
            <Testimonals/>
            <Newsletter/>
         </Container>;
};

export default Courses;