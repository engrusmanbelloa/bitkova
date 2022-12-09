import * as React from 'react';
import styled from "styled-components";
import Card from '@mui/material/Card';
import Newsletter from "../components/Newsletter"
import { mobile } from "../responsive";
import Iframe from 'react-iframe'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 0px 0px 0px;;
  display: flex;
  border-top: 1px solid #CDDEFF;
  ${mobile({ padding: "10px", flexDirection:"column" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 10px;
  margin-top: 30px;
  text-align: justify;
  animation: bounceIn;
  animation-duration: 2s;
`;

const Box = styled.div`
  margin: 0 0 20px;
  width: 70%;
`;
const CheckoutBox = styled.div`
  margin: 0 0 20px;
  width: 25%;
  position: absolute;
  top: 560px;
  right: 70px;
`;

const Desc = styled.p`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 2px;
  line-height: 1.5;
`;

const Button = styled.button`
  height: 50px;
  width: 200px;
  margin: auto;
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

const Title = styled.h1`
  margin: 5px 20px;
`;

const Paragraph = styled.p`
  margin: 15px;
  text-align: left;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
`;

const Image = styled.img`
    width: 100%;
    height: 50vh;
    padding: 10px;
`;

const Learn = styled.ul`
  list-style: square;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const LearnItem = styled.li`
  font-size: 25px;
  font-weight: 400;
  text-align: left;
  margin: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Price = styled.p`
  flex: 0.8;
  margin: 0 10px 0 0;
  font-size: 16px;
  font-weight: 600;
`;


const SingleCourse = () => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <Container>
      <Wrapper>
        <InfoContainer>
          <Title>Certified CryptoCurrency Market Analyst (CCA)</Title>
          <Desc>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
            iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
            tristique tortor pretium ut. Curabitur elit justo, consequat id
            condimentum ac, volutpat ornare.
          </Desc>
          <Button>ENROLL</Button>
        </InfoContainer>
        <Card variant="elevation" elevation={20} sx={{mb: 2, ml: 2, borderRadius: 7, position: "relative"}}>
          <Iframe 
              url="https://player.vimeo.com/video/779663884?h=6e8a3f19ea&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              // src="../trade.png"
              width="1000px"
              height="400px"
              display="block"
              position="relative"
              />
        </Card>
        </Wrapper>
        <Box>
        <Card variant="elevation" elevation={20} sx={{borderRadius: 3, textAlign: "center",}}>
          <Tabs>
            <TabList style={{border: "none"}}>
              <Tab><Title>About the course</Title></Tab>
              <Tab><Title>Course content</Title></Tab>
              <Tab><Title>Review</Title></Tab>
            </TabList>
            <TabPanel>
              <Title style={{textAlign: "left", fontSize: 25}}>About the course</Title>
              <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo amet habitasse orci convallis sodales augue. dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris</Paragraph>
              <Paragraph>A pellentesque proin tincidunt lobortis sit velit velit dui eget. Massa, lectus orci auctor morbi. A nisl vitae, sagittis elementum placerat nullam id integer leo. Diam venenatis amet diam odio ultrices auctor.</Paragraph>
              <Title style={{textAlign: "left", fontSize: 25, marginBottom: 20, marginTop: 40}}>What are you going to learn </Title>
              <Image src="../courses/trading.jpg" alt=""/>
              <Learn>
                <LearnItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dor
                </LearnItem>
                <LearnItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                </LearnItem>
                <LearnItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dor
                </LearnItem>
                <LearnItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dor
                </LearnItem>
              </Learn>
              <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta massa, eget natoque tincidunt quis. Suspendisse vitae vestibulum scelerisque egestas. Volutpat, adipiscing a elit platea amet et. At at metus egestas nunc eget. Tempus sapien, augue laoreet morbi habitasse leo mauris arcu amet. Sapien lectus auctor quis in ut morbi risus. Ornare aliquam phasellus consequat amet velit risus. Amet, diam cras morbi hendrerit vitae pretium in enim.</Paragraph>
            </TabPanel>
            <TabPanel>
            <Title style={{textAlign: "left", fontSize: 25}}>Course outline</Title>
              <Learn style={{display: "flex", flexWrap:"wrap"}}>
                <LearnItem>
                Lorem ipsum dolor sit amet, consectetur
                </LearnItem>
                <LearnItem>
                Lorem ipsum dolor sit amet,
                </LearnItem>
                <LearnItem>
                Lorem ipsum dolor sit amet, consectetur 
                </LearnItem>
                <LearnItem>
                Lorem ipsum dolor sit amet, consectetur a
                </LearnItem>
              </Learn>
              </TabPanel>
            <TabPanel>
              <h2>Any content 3</h2>
            </TabPanel>
          </Tabs>
        </Card>
      </Box>
      <CheckoutBox>
      <Card variant="elevation" elevation={20} sx={{borderRadius: 3, width:500, height:700}}>
          Hello
        </Card>
      </CheckoutBox>
      <Newsletter />
    </Container>
  );
};

export default SingleCourse;