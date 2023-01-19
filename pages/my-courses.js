import * as React from 'react';
import styled from "styled-components";
import Card from '@mui/material/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Newsletter from "../components/Newsletter"
import MyLearning from "../components/MyLearning";
import {Progress} from "rsuite";
import {mobile, ipad} from "../responsive";
import {featuredCoures} from "../data";
import { useState } from "react";

const Container = styled.div`
  border-top: 1px solid #CDDEFF;
  width: 100%;
  margin-top: 0px;
  padding-top: 50px;
  
`;

const Wrapper = styled.div`
  margin: 20px auto;
  width: 100%;
  display: flex;
  justify-content: center;
  aling-items: center;
`;

const Box = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-right: -30px;
  padding: 10px;
  width: "90%",
  background:"red"
  ${ipad({ marginRight: "0px", })}
  ${mobile({})}
`;

const Title = styled.h1`
  margin: 5px 20px;
  font-size: 25px;
  ${ipad({ fontSize: 20 })}
  ${mobile({ fontSize: 16, margin: "5px 10px" })}
`;

const DashBox = styled.div`
  margin: 0 0 0 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  ${ipad({marginLeft: 0, flexWrap:"wrap"
   })}
   ${mobile({
    width: 300, marginBottom: 30, marginLeft: 0,
    
   })}
`;

const DashItemsBox = styled.div`
  margin-right: 30px;
  border: 1px solid #CDDEFF;
  height: 100%;
  width: 350px;
  flex: 1;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(28, 56, 121, 1);
  color: #fff;

  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121, 1);
  }
  ${ipad({ marginBottom: 10, 
    })}
  ${mobile({marginLeft: 75, width: 280
  })}
`;

const Learning = styled.div`
  
`;

const ImageBox = styled.img`
  width: 100%;
  height: 200px;
  ${ipad({width: 345 })}
    ${ipad({ width: 280})}
`;

const CardBox = styled.div`
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


const MyCourses = (props) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  // course progress bar state change
  const [percent, setPercent] = useState(0);
  const increase = () => {
    const value = Math.min(percent + 10, 100);
    setPercent(value);
  }

  return (
    <Container>
        <Wrapper>
        <Card variant="elevation" elevation={20} sx={{borderRadius: 3, height: "100%", pb: 3,}}>
          <Tabs>
            <TabList style={{background: "#1C3879", color: "#fff", textAlign: "center", border: "none"}}>
              <Tab><Title>My Learning</Title></Tab>
              <Tab><Title>Wishlist</Title></Tab>
              <Tab><Title>Archive</Title></Tab>
            </TabList>
            <Box>
              <TabPanel>
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
                        <CardBox> 
                            <Paragraph>{percent}% Completed</Paragraph> 
                            <Progress.Line style={{height: 5,  
                              borderRadius: 5, margin: 10, padding: 5, display: "flex", 
                              justifyContent: "flex-end", alignItems: "center", 
                              background: "#97D2EC"}} percent={percent}
                              /> 
                        </CardBox>
                          }
                  </DashItemsBox>
              ))}
              </DashBox>
              </TabPanel>
              <TabPanel>
              <DashBox>
              {featuredCoures.map((course) => (
                  <DashItemsBox key={course.id}>
                      <ImageBox src={course.img } alt="Picture of the author"/>
                      <Title>{course.title}</Title>
                        <div>
                          <Paragraph>Price:&nbsp;&nbsp;N{course.price}</Paragraph>
                          <EnrollBtn>Enroll</EnrollBtn>
                        </div> 
                  </DashItemsBox>
              ))}
              </DashBox>
              </TabPanel>
              <TabPanel>
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
                        <CardBox> 
                            <Paragraph>{percent}% Completed</Paragraph> 
                            <Progress.Line style={{height: 5,  
                              borderRadius: 5, margin: 10, padding: 5, display: "flex", 
                              justifyContent: "flex-end", alignItems: "center", 
                              background: "#97D2EC"}} percent={percent}
                              /> 
                        </CardBox>
                          }
                  </DashItemsBox>
              ))}
              </DashBox>
              </TabPanel>
            </Box>
          </Tabs>
        </Card>
      </Wrapper>
      <Newsletter />
    </Container>
  );
};

export default MyCourses;