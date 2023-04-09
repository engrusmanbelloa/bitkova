import * as React from 'react'
import styled from "styled-components"
import {Progress} from "rsuite"
import { useState } from "react"
import {featuredCoures} from "../data"
import {mobile, ipad} from "../responsive"

const Container = styled.div`
  margin-top: 0px;
  ${ipad({
    marginLeft: 0
   })}
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
  margin: 0 0 0 100px;
  width: 100%;
  height: 100%;
  display: flex;
  ${ipad({ width:  560, marginLeft: 10, justifyContent: "flex-start", overflow: "scroll",})}
  ${mobile({ width: 315, marginBottom: 30, marginLeft: 0,})}
`;

const DashItemsBox = styled.div`
  margin-right: 30px;
  border: 1px solid #CDDEFF;
  height: 70%;
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
  ${ipad({
    left: 0, marginRight: 5,
    })}
  ${ipad({
  left: 0, top: 0, marginRight: 5,
  })}
`;

const ImageBox = styled.img`
  width: 100%;
  height: 200px;
  ${ipad({
    width: 240
    })}
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

`;

const MyLearning = (props) => {
    // course progress bar state change
  const [percent, setPercent] = useState(0)
  const increase = () => {
    const value = Math.min(percent + 10, 100)
    setPercent(value)
  }

  return (
    <Container>
     <Heading>{props.title}</Heading>
     <DashBox>
        {featuredCoures.map((course) => (
            <DashItemsBox key={course.id}>
                <ImageBox src={course.img } alt="Picture of the author"/>
                <Title>{course.title}</Title>
                {props.title === "Wishlist" ? 
                  <div>
                    <Paragraph>Price:&nbsp;&nbsp;N{course.price}</Paragraph>
                    <EnrollBtn>Enroll</EnrollBtn>
                  </div> : 
                  <Box> 
                      <Paragraph>{percent}% Completed</Paragraph> 
                      <Progress.Line style={{height: 5,  
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