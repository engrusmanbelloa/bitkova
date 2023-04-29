import * as React from 'react'
import styled from "styled-components"
import {Progress} from "rsuite"
import { useState, useEffect } from "react"
import {mobile, ipad} from "../responsive"

const Container = styled.div`
  margin-top: 0px;
  ${ipad({ marginLeft: 0 })}
`;

const Title = styled.h1`
  margin: 2% 0 0 0;
  line-height: 1.5;
  font-size: 25px;
  ${ipad({ fontSize: 18, })}
`;

const Heading = styled.h1`
  margin: 2% 0 0 0;
  line-height: 1.5;
  font-size: 25px;
  ${mobile({ fontSize: 18, })}
`;

const DashBox = styled.div`
  ${'' /* margin: 0 0 0 100px; */}
  margin: ${props => props.display === 'grid' ? '0 100px' : '0 0 0 100px'};
  display: ${props => props.display === 'grid' ? 'grid' : 'flex'};
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  ${ipad({ 
    gridTemplateColumns: props => props.display === 'grid' ? 'auto auto' : 'none',
    width:  560,
    marginLeft: 10,
    justifyContent: "flex-start",
    overflow: props => props.display === 'grid' ? 'none' : 'scroll',
  })}
  ${mobile({ 
    width: 300,
    margin: props => props.display === 'grid' ? 'auto' : '0px',
    gridTemplateColumns: props => props.display === 'grid' ? 'auto' : 'none',
    })}
`;

const DashItemsBox = styled.div`
  margin-right: 10px;
  border: 1px solid #CDDEFF;
  height: 100%;
  width: 300px;
  flex: 1;
  position: relative;
  top: 10px;
  left: -100px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(28, 56, 121, 1);
  color: #fff;
  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121, 1);
  }
  ${ipad({ left: 0, marginRight: 5, })}
  ${ipad({ left: 0, top: 0, marginRight: 5, })}
`;

const ImageBox = styled.img`
  width: 100%;
  height: 200px;
  ${ipad({ width: props => props.display === 'grid' ? '100%' : "240px", })}
`;

const Box = styled.div`
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin: 10px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
`;

const EnrollBtn = styled.button`
  height: 30px;
  width: 200px;
  margin-bottom: 15px;
  font-size: 20px;
  font-weight: 600;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  background: #CDDEFF;
  color: rgba(28, 56, 121, 1);
  ${ipad({ fontSize: 18, fontWeight: 400})}

`;

const MyLearning = (props) => {
  const {title, display, limit, courses} = props
  const [coursesToDisplay, setCoursesToDisplay] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await courses
      setCoursesToDisplay(coursesData.slice(0, limit))
    }
    fetchData()
  }, [courses, limit])

  // course progress bar state change
  const [percent, setPercent] = useState(0)
  const increase = () => {
    const value = Math.min(percent + 10, 100)
    setPercent(value)
  }

  return (
    <Container>
     <Heading>{title}</Heading>
     <DashBox display={display}>
        {coursesToDisplay && coursesToDisplay.map((course) => (
            <DashItemsBox key={course._id}>
              <ImageBox src={course.image} alt="Picture of the author"/>
              <Title>{course.title}</Title>
              {title === "Wishlist" ? 
                <div>
                  <Paragraph>{course.price > 0 ? <div>Price: &nbsp; &#8358;{course.price.toFixed(2)}</div> : "Free"}</Paragraph>
                  <EnrollBtn>Enroll</EnrollBtn>
                </div> : 
                <Box> 
                  <Paragraph>{percent}% Completed</Paragraph> 
                  <Progress.Line style={{
                    height: 5,  
                    borderRadius: 5, margin: 10, padding: 5, display: "flex", 
                    justifyContent: "flex-end", alignItems: "center", 
                    background: "#97D2EC"}} percent={percent}
                    /> 
                </Box>
              }
            </DashItemsBox>
        ))}
     </DashBox>
    </Container>
  )
}

export default MyLearning