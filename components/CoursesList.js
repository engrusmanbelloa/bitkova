import AspectRatio from '@mui/joy/AspectRatio'
import Card from '@mui/material/Card'
import styled, { keyframes } from "styled-components"
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {featuredCoures} from "../data"
import { mobile, ipad} from "../responsive"
import { useState, useEffect } from "react"


const Container = styled.section`
  padding: 0px 10px;
  margin: 0px;
  background-color: #CDDEFF;
  border-radius: 10px;
  letter-spacing: 1px;
`;

const Wrapper = styled.div`
  display: ${props => props.display === 'grid' ? 'grid' : 'flex'};
  grid-template-columns: auto auto auto auto;
  gap: 10px;
  margin: 0 auto;
  padding: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  ${ipad({
    justifyContent: "flex-start",
    overflow: "scroll",
   })}
`;

const Top = styled.div`
  justify-content: center;
  align-items: center;
  display: flex; 
  margin: 0;
  padding: 0;
  width: 100.5%;
  color: #fff;
`;

const InfoContainer = styled.div`
  padding: 7px;
  height: 100%;
  color: white;
  text-align: center;
  background-color: rgba(28, 56, 121);
  borderRadius: 3px;
`;
const Hr = styled.hr`wq3,,il
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

const PriceBox = styled.div`
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
  align-items: center;
  justify-content: center;
  font-size: ${props => props.priceBtn ? "18px" : "25px"};
  font-weight: 600;
  margin: 0 10px 0 0;
  color: #000;

  &:hover {
    background-color: #CDDEFF;
  }
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 800;
  margin-bottom: 5px;
  text-align: center;
  ${mobile({
    fontSize: '18px',
   })}
`;

const CourseImg = styled.img`
    width: 100%;
    height: 200px;
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 5px;
  margin-top: 10px;
  letter-spacing: 1.5;
  line-height: 1.5;
`;

const Price = styled.div`
  flex: 0.8;
  margin: 0 10px 0 0;
  font-size: 16px;
  font-weight: 600;
`;

const StyledCard = styled(Card)`
  margin: 10px 20px;
  padding:0; 
  width: 360px;
  height: 100%; 
  color: #fff; 
  border-radius: 5px
  ${ipad({margin: 5})}
  ${mobile({width: 300, margin: 5 })}
`;

const CoursesList = (props) => {
  const router = useRouter()
  const { courses, limit, title, foot, display } = props
  const [coursesToDisplay, setCoursesToDisplay] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await courses
      setCoursesToDisplay(coursesData.slice(0, limit))
    }
    fetchData()
  }, [courses, limit])

  return (
    <Container>
    <Top>
      <Button>{title}</Button>
    </Top>
    
    <Wrapper display={display}>
      {coursesToDisplay && coursesToDisplay.map((course) =>(
        <div key={course._id}>
        <AnimationOnScroll animateIn="animate__pulse animate__slower">
          <StyledCard variant="elevation" elevation={10}>
            <CourseImg src={course.image} alt={course.title} />
            <InfoContainer>
              <Title>
                {course.title}
              </Title>
              <Desc>
                {course.shortDesc}
              </Desc>
              <Box>
                <Time>
                  <AccessTimeFilledIcon/>
                  <span style={{margin: "10px"}}>
                    {
                      course.duration.hours > 0
                      ? `${course.duration.hours} hours ${course.duration.minutes} mins`
                      : `${course.duration.minutes} mins`
                    }
                  </span>
                </Time>
              </Box>
              <Box>
                <Time>
                  <PeopleAltIcon/>
                  <span style={{margin: "10px"}}>{course.students.length} Students</span>
                </Time>
              </Box>
              <Hr />
              <Box>
                <Price>
                  {course.price > 0 ? <div>Price: &#8358;{course.price.toFixed(2)}</div> : "Free"}
                </Price>
                <Button priceBtn type="button" onClick={() => router.push(`/course/${course._id}`)}>Preview</Button>
              </Box>
            </InfoContainer>
          </StyledCard>
        </AnimationOnScroll>
        </div>
      ))}
    </Wrapper>
    <Top>
    <Button><Link href="/courses" passHref style={{color: '#000'}}>{foot}</Link></Button>
    </Top>
  </Container>
  )
}

export default CoursesList