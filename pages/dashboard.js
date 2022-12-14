import * as React from 'react';
import styled from "styled-components";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Newsletter from "../components/Newsletter"
import { mobile } from "../responsive";
import Iframe from 'react-iframe'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import CoursesList from '../components/CoursesList';
import {featuredCoures} from "../data"


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px 0px 10px 0px;
  margin-bottom: 20px;
  display: flex;
  border-top: 1px solid #CDDEFF;
  border-bottom: 1px solid #CDDEFF;
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
  display: flex;
  height: 70vh;
`;
const CheckoutBox = styled.div`
  margin: 0 0 0 10px;
  width: 25%;
  position: absolute;
  top: 590px;
  right: 70px;
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
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
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
`;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


const Dashboard = () => {
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
        {/* <Card variant="elevation" elevation={20} sx={{borderRadius: 3, textAlign: "center",}}> */}
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', height: 300}}
          >
          <Tab label="Dashboard"/>
          <Tab label="Profile"/>
          <Tab label="Enrolled sourses"/>
          <Tab label="Wishlist"/>
          <Tab label="Logout"/>
        </Tabs>
        <TabPanel value={value} index={0}>
          Item One
        </TabPanel>
        <TabPanel value={value} index={1}>
          Item Two
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
        </TabPanel>
        <TabPanel value={value} index={4}>
          Item Five
        </TabPanel>
        {/* </Card> */}
      </Box>
      <CoursesList title="Related courses"/>
      <Newsletter />
    </Container>
  );
};

export default Dashboard;