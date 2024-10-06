"use cleint"
import { useState, useEffect } from "react"
import styled, { keyframes } from "styled-components"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Card from '@mui/material/Card'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll'
import {featuredCoures} from "@/data"
import {CourseType} from "@/types"
import { mobile, ipad} from "@/responsive"
import Button from "@/components/Button"

const Container = styled.section`
  width: ${props => props.theme.heroWidth};
  padding: 0px 10px;
  margin: 50px auto 0;
  padding: 0px;
  border-radius: 8px;
`;
const Wrapper = styled.div<{ $display?: string }>`
  display: ${props => props.$display === 'grid' ? 'grid' : 'flex'};
  grid-template-columns: auto auto auto auto;
  gap: 0px;
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
  margin: 50px auto 0;
  padding: 0;
  color: #fff;
  `;
const StyledCard = styled(Card)`
  margin: 12px;
  padding:0; 
  width: 350px;
  height: 470px; 
  color: #fff; 
  border-radius: 5px
  ${ipad({margin: 5})}
  ${mobile({width: 300, margin: 5 })}
`;
const CourseImg = styled.img`
    width: 100%;
    height: 215px;
`;
const InfoContainer = styled.div`
  padding: 10px;
  height: 100%;
  color: ${props => props.theme.black};
  text-align: start;
  background-color: ${props => props.theme.white};
  borderRadius: 3px;
`;
const Title = styled.h3`
  font-weight: 700;
  margin: 0px;
  text-align: start;
  ${mobile({
    fontSize: '18px',
   })}
`;
const Desc = styled.p`
  margin: 10px 0;
`;
const DurationContainer = styled.div`
  display: flex;
  justify-content: flex-start; 
  margin: 0;
`;
const Time = styled.p`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  margin: 0px;
`;
const Price = styled.p`
  flex: 0.8;
  margin: 0 10px 0 0;
  font-weight: bold;
`;
const Hr = styled.hr`
    margin: 15px 0;
    background: #000;
    width: 100%;
    height: 0.5px;
`;
const Box = styled.div`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
`;
const PriceBox = styled.div`
  display: flex;
  justify-content: center; 
  align-items: center;
  font-size: 16px;
  font-weight: 600;
`;
const PriceBtn = styled.button<{ $priceBtn?: string }>`
  flex:1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 40px;
  align-items: center;
  justify-content: center;
  font-size: ${props => props.$priceBtn ? "16px" : "25px"};
  margin: 0 10px auto;
  color: ${props => props.theme.white};
  background-color: ${props => props.theme.main};
  &::first-letter {
    text-transform: uppercase;
  };
  &:hover {
    animation: pulse;
    animation-duration: 1s;
    background-color: ${props => props.theme.navHover};
    color: ${props => props.theme.main};
  }
`;
const BtnLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.white};
  font-weight: 400;
`;

const CoursesList = (props: { courses: CourseType[], limit: number, title: string, foot: string, $display?: string, priceBtn?: string, onClick?: () => void }) => {
  const router = useRouter()
  const { courses, limit, title, foot, $display } = props
  const [coursesToDisplay, setCoursesToDisplay] = useState([])
  const main = true
  
  return (
    <Container>
      <Wrapper $display={$display}>
        {featuredCoures && featuredCoures.map((course) =>(
          <div key={course._id}>
          {/* <AnimationOnScroll animateIn="animate__pulse animate__slower"> */}
            <StyledCard variant="elevation" elevation={10}>
              <CourseImg src={course.image} alt={course.title} />
              <InfoContainer>
                <Title>
                  {course.title}
                </Title>
                <Desc>
                  {course.shortDesc}
                </Desc>
                <DurationContainer>
                <Box>
                  <Time>
                    <OndemandVideoIcon/>
                    <span style={{margin: "10px"}}>
                      {course.onDemandVideos > 0 ? `${course.onDemandVideos} Videos`: 0}
                    </span>
                  </Time>
                </Box>
                <Box>
                  <Time>
                    <PeopleAltIcon/>
                    <span style={{margin: "10px"}}>{course.students} Students</span>
                  </Time>
                </Box>
                <Box>
                  {/* <Time>
                    <StarHalfIcon/>
                    <span style={{margin: "10px"}}>
                      {
                        course.review.length > 0 ? 
                            course.review.reduce((total, review) => total + review.stars, 0) /
                            course.review.length.toFixed(2)
                           :
                          0
                      }
                    </span>
                  </Time> */}
                  <Time>
                    <StarHalfIcon />
                    <span style={{ margin: "10px" }}>
                      {course.review.length > 0 ? (
                        `${(
                          course.review.reduce((total, review) => total + review.stars, 0) /
                          course.review.length
                        ).toFixed(1)}`
                      ) : (
                        '0'
                      )}
                    </span>
                  </Time>
                </Box>
                </DurationContainer>
                <Hr />
                <Box>
                <Price>
                  {course.price > 0 ? (
                    <span>Price: &#8358;{course.price.toLocaleString('en-US')}</span>
                  ) : (
                    "Free"
                  )}
                </Price>
                  <PriceBtn $priceBtn="PriceBtn" type="button" onClick={() => router.push(`/course/${course._id}`)}>Learn more</PriceBtn>
                </Box>
              </InfoContainer>
            </StyledCard>
          {/* </AnimationOnScroll> */}
          </div>
        ))}
      </Wrapper>
      <Top>
        <Button $main={main} title='Browse all courses' />
      </Top>
  </Container>
  )
}

export default CoursesList