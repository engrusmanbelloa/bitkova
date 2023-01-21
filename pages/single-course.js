import * as React from 'react';
import styled from "styled-components";
import Card from '@mui/material/Card';
import Newsletter from "../components/Newsletter"
import { mobile, ipad } from "../responsive";
import Iframe from 'react-iframe'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Rating from '@mui/material/Rating';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import CoursesList from '../components/CoursesList';
import {featuredCoures} from "../data"
import { red } from '@mui/material/colors';


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 0px 10px 0px;
  margin-bottom: 20px;
  display: flex;
  border-top: 1px solid #CDDEFF;
  border-bottom: 1px solid #CDDEFF;
  ${ipad({ padding: "10px", flexDirection:"column" })}
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
  height: 90vh;
  ${ipad({ height: "100%", width: "98%", margin: "20px auto"})}
`;
const CheckoutBox = styled.div`
  margin: 0 0 0 10px;
  width: 25%;
  position: absolute;
  top: 530px;
  right: 70px;
  ${ipad({ position: "relative", top: "10px", right: "0", width: "100%", margin: "auto",})}
`;

const ReviewBox = styled.div`
  margin: 20px;
  border-bottom: 1px solid #CDDEFF;
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
  ${ipad({ fontSize: 25, margin: "5px 0"})}
  ${ipad({ fontSize: 20,})}
`;

const TabsTitle = styled.h1`
  margin: 5px 20px;
`;

const Paragraph = styled.p`
  margin: 15px;
  text-align: left;
  font-size: 25px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
`;

const Image = styled.img`
    width: 90%;
    height: 40vh;
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
  ${mobile({ margin: 10, })}
`;

const Duration = styled.div`
  display: flex;
  justify-content: flex-start; 
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  margin: 20px;
  font-size: 25px;
  font-weight: 500;
   ${mobile({ margin: 8, })}
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
        <Card variant="elevation" elevation={20} sx={{mb: 2, ml: 2, mt: 0, width: 1000, height: 350, borderRadius: 7, position: "relative",
          '@media screen and (max-width: 768px)': {
                  ml: 1, width: 720,
                  },
                  '@media screen and (max-width: 600px)': {
                    width: "100%", height: 250, margin: 0, padding : 0,
                  },
        }}>
          <Iframe 
              url="https://player.vimeo.com/video/779663884?h=6e8a3f19ea&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              // src="../trade.png"
              width="100%"
              height="100%"
              display="block"
              position="relative"
              margin="auto"
              top="0"
              bottom="0"
              />
        </Card>
        </Wrapper>
        <Box>
        <Card variant="elevation" elevation={20} sx={{borderRadius: 3, textAlign: "center",}}>
          <Tabs>
            <TabList style={{background: "#1C3879", color: "#fff", border: "none"}}>
              <Tab><Title>About the course</Title></Tab>
              <Tab><Title>Course content</Title></Tab>
              <Tab><Title>Review</Title></Tab>
            </TabList>
            <TabPanel>
              <Title style={{textAlign: "left", fontSize: 25}}>About the course</Title>
              <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo amet habitasse orci convallis sodales augue. dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris</Paragraph>
              <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodo amet habitasse orci convallis sodales augue. dolor in finibus malesuada, lectus ipsum porta nunc, at iaculis arcu nisi sed mauris</Paragraph>
              <Title style={{textAlign: "left", fontSize: 25, marginBottom: 20, marginTop: 40}}>What you will learn: </Title>
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
                <LearnItem>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dor
                </LearnItem>
              </Learn>
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
            <Title style={{textAlign: "left", fontSize: 25}}>Course reviews</Title>
              <ReviewBox>
                <Rating name="read-only" value={4} readOnly />
                  <Paragraph>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est fringilla morbi mauris gravida. Eu vel arcu neque vitae vitae justo. Sit integer faucibus in dictumst amet hac. Enim amet, elementum faucibus id ultrices facilisis. Integer sed aenean consectetur.”
                  </Paragraph>
                  <Title style={{fontSize: 25}}>Sabiu Muhammad Danfullo</Title>
              </ReviewBox>
              <ReviewBox>
                <Rating name="read-only" value={4} readOnly />
                  <Paragraph>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est fringilla morbi mauris gravida. Eu vel arcu neque vitae vitae justo. Sit integer faucibus in dictumst amet hac. Enim amet, elementum faucibus id ultrices facilisis. Integer sed aenean consectetur.”
                  </Paragraph>
                  <Title style={{fontSize: 25}}>Bilal</Title>
              </ReviewBox>
              <ReviewBox>
                <Rating name="read-only" value={4} readOnly />
                  <Paragraph>
                    “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est fringilla morbi mauris gravida. Eu vel arcu neque vitae vitae justo. Sit integer faucibus in dictumst amet hac. Enim amet, elementum faucibus id ultrices facilisis. Integer sed aenean consectetur.”
                  </Paragraph>
                  <Title style={{fontSize: 25}}>Sunusi Danjuma Ali</Title>
              </ReviewBox>
            </TabPanel>
          </Tabs>
        </Card>
        <CheckoutBox>
          <Card variant="elevation" elevation={20} sx={{borderRadius: 3, textAlign: "center", width:"100%",}}>
          <Button style={{width: "100%", marginBottom: 40}}>Buy This Course</Button>
          <Duration>
            <AccessTimeFilledIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
            <span style={{margin: "10px"}}>Duration: 6H 30min</span>
          </Duration>
          <Duration>
            <OndemandVideoIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
            <span style={{margin: "10px"}}>Ondemand videos: 30</span>
          </Duration>
          <Duration>
            <CloudDownloadIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
            <span style={{margin: "10px"}}>Downloadable files: 15</span>
          </Duration>
          <Duration>
            <PowerSettingsNewIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
            <span style={{margin: "10px"}}>Lifetime Access</span>
          </Duration>
          <Duration>
            <WorkspacePremiumIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
            <span style={{margin: "10px"}}>Certificate Of Completion</span>
          </Duration>
          <Duration>
            <ImportantDevicesIcon style={{margin: "10px", fontSize: 50, color: "#1C3879"}}/>
            <span style={{margin: "10px"}}>Accessable on all devices</span>
          </Duration>
          <Button style={{width: "100%"}}>Enroll</Button>
          </Card>
      </CheckoutBox>
      </Box>
      <CoursesList title="Related courses"/>
      <Newsletter />
    </Container>
  );
};

export default SingleCourse;