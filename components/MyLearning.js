import * as React from 'react';
// import "rsuite/dist/rsuite.min.css";
import styled from "styled-components";
import {Progress} from "rsuite";
import { useState } from "react";
import {featuredCoures} from "../data";

const Container = styled.div`
  width: 100%;
  margin-top: 0px;
`;

const Title = styled.h1`
  margin: 2% 0 0 0;
  line-height: 1.5;
`;

const DashBox = styled.div`
  margin: 0 0 0 100px;
  width: 100%;
  height: 40%;
  display: flex;
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
`;

const ImageBox = styled.img`
  width: 100%;
  height: 200px;
  
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
  const [percent, setPercent] = useState(0);
  const increase = () => {
    const value = Math.min(percent + 10, 100);
    setPercent(value);
  }

  return (
    <Container>
     <Title>{props.title}</Title>
     <DashBox style={{height: "100%"}}>
        {featuredCoures.map((course) => (
            <DashItemsBox key={course.id}>
            <div>
                <ImageBox src={course.img } alt="Picture of the author"/>
                <Title style={{fontSize: 25}}>{course.title}</Title>
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
            </div>
            </DashItemsBox>
        ))}
     </DashBox>
    </Container>
  )
}

export default MyLearning