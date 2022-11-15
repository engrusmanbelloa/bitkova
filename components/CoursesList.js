import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/material/Card';
import Typography from '@mui/joy/Typography';
import styled, { keyframes } from "styled-components";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import {featuredCoures} from "../data"


const Container = styled.section`
  margin:0px 0px;
  padding: 0px 10px;
  background-color: #CDDEFF;
  border-radius: 10px;
  letter-spacing: 1px;
`;

const Wrapper = styled.div`
  justify-content: center;
  align-items: center;
  height: 100%;
  display: flex;
`;

const Top = styled.div`
  justify-content: center;
  align-items: center;
  display: flex; 
  color: #fff;
`;

const InfoContainer = styled.div`
  padding: 7px;
  color: white;
  text-align: center;
  background-color: rgba(28, 56, 121);
  borderRadius: 3px;
`;

const Hr = styled.hr`
    margin: 15px 0;
    background: #000;
    width: 100%;
    height: 0.5px;
`;

const Time = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;


const Box = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;

const Button = styled.button`
  flex:1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 30px;
  font-size: 16px;
  font-weight: 600;
  margin: 0 10px 0 0;

  &:hover {
    background-color: #CDDEFF;
  }
`;

const Price = styled.p`
  flex: 0.8;
  margin: 0 10px 0 0;
  font-size: 16px;
  font-weight: 600;
`;

const CoursesList = () => {
  return (
    <Container>
    <Top>
    <Button>Featured courses</Button>
    </Top>
    <AnimationOnScroll animateIn="animate__fadeInUp animate__slower">
    <Wrapper>
    {featuredCoures.map((courses) =>(
    <Card key={courses.id} variant="elevation" elevation={10} 
      sx={{m: 2, ml: 4, mr: 4, padding:0, width: 340, 
      color: "#fff",borderRadius: 3,
      ":&hover":{}
      }}>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={courses.img }
          loading="lazy"
          alt="Picture of the author"
        />
      </AspectRatio>
      <InfoContainer>
      <Typography level="h2" fontWeight="800" fontSize="15px" sx={{ mb: 0.5, }}>
        {courses.title}
      </Typography>
      <Typography level="p" fontWeight="300" fontSize="15px" sx={{ mb: 0.5, mt: 1 }}>
        {courses.desc}
      </Typography>
      <Box>
      <Time>
        <AccessTimeFilledIcon/>
        <span style={{margin: "10px"}}>{courses.time}</span>
      </Time>
      </Box>
      <Box>
      <Time>
        <PeopleAltIcon/>
        <span style={{margin: "10px"}}>{courses.student} Students</span>
      </Time>
      </Box>
      <Hr />
      <Box>
        <Price>
          Price: N{courses.price}
        </Price>
        <Button>
          Enroll
        </Button>
      </Box>
      </InfoContainer>
    </Card>
    ))}
    </Wrapper>
    </AnimationOnScroll>
    <Top>
    <Button>See All Courses</Button>
    </Top>
  </Container>
  );
}

export default CoursesList;