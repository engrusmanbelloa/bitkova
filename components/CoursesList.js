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
  display: flex;
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

const CoursesList = (props) => {
  const [courses, setCourses] = useState([])
  const [count, setCount] = useState(0)
  const [skip, setSkip] = useState(0)
  const [limit, setLimit] = useState(5)
  const router = useRouter()

  useEffect(() => {
    async function fetchCourses() {
      const response = await fetch("/api/courses/getCourses")
      const data = await response.json()
      setCourses(data)
      setCount(data.count)
      // console.log("courses found: ", courses)
    }
    fetchCourses()
  }, [])

  const loadMore = () => {
    setSkip(skip + limit)
  }

  return (
    <Container>
    <Top>
      <Button>{props.title}</Button>
    </Top>
    
    <Wrapper>
      {courses.map((course) =>(
        <div key={course._id}>
        <AnimationOnScroll animateIn="animate__pulse animate__slower">
          <Card variant="elevation" elevation={10} 
            sx={{m: 1, ml: 4, mr: 2, padding:0, width: 365, 
            color: "#fff", borderRadius: 3,
            ":&hover":{},
            '@media screen and (max-width: 768px)': {
              ml: 2, mr: 1,
                },
            '@media screen and (max-width: 600px)': {
              width: "290px", ml: 2, mr: 1,
            },
            }}>
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
                  <span style={{margin: "10px"}}>{course.student} Students</span>
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
          </Card>
        </AnimationOnScroll>
        </div>
      ))}
    </Wrapper>
    <Top>
    <Button><Link href="/courses" passHref style={{color: '#000'}}>{props.foot}</Link></Button>
    </Top>
  </Container>
  )
}

export default CoursesList